<template>
  <div>
    <!-- SVG Фильтры для эффектов (скрыты, но работают) -->
    <svg width="0" height="0" style="position: absolute; pointer-events: none;">
      <defs>
        <linearGradient id="btn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#E0D7F8; stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8E7CC3; stop-opacity:1" />
        </linearGradient>
        <filter id="depth-shadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>

    <!-- СКРЫТЫЙ ШАБЛОН ГЕНЕРАЦИИ (1080x1920) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        
        <!-- ФОН -->
        <div class="story-bg-image" :class="bgClass"></div>
        <div class="story-bg-overlay"></div>

        <div class="story-content safe-area">
          
          <!-- ВЕРХ: ЗАГОЛОВОК И ИНФО -->
          <div class="story-header">
            <h1 class="story-main-title">МОЙ СИГНАЛ<br>В КОРЖ</h1>

            <div class="story-info-row">
              <div class="glass-pill-info">
                <img src="/favicon.svg" class="info-logo" alt="logo" />
                <span class="info-ticket">{{ ticket }}</span>
                <span class="info-divider">|</span>
                <span class="info-date">{{ date }}</span>
              </div>
            </div>

            <div class="story-address">{{ address || 'Кофейня Корж' }}</div>
          </div>

          <!-- ЦЕНТР: ТЕКСТ (УЛУЧШЕННЫЙ ДИЗАЙН) -->
          <div class="story-body-section">
            <div v-if="formattedText" class="text-card-purple">
              <p class="text-card-content">
                {{ formattedText }}
              </p>
            </div>
          </div>

          <!-- ГРАДИЕНТ СНИЗУ -->
          <div class="bottom-fade-gradient"></div>

          <!-- НИЗ: КНОПКА (НОВЫЙ СТИЛЬ) -->
          <div class="story-footer">
            <div class="button-container-3d">
               <span class="btn-text">cffx.ru/korzh</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- МОДАЛКА (БЕЗ ИЗМЕНЕНИЙ) -->
    <transition name="modal-fade">
      <div v-if="showModal" class="story-modal-overlay" @click.self="closeModal">
        <div class="story-modal">
          
          <div class="story-modal-header">
            <h3>Ваша история готова</h3>
            <button class="close-icon-btn" @click="closeModal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="story-preview-container">
            <img v-if="generatedImageUrl" :src="generatedImageUrl" class="story-preview-img" alt="Story Preview" />
            <div v-else class="loading-spinner">
              <img src="/favicon.svg" class="spinner-logo" alt="loading" />
              <div class="spinner-text">Создаем магию...</div>
            </div>
          </div>

          <div class="story-modal-actions">
            <button @click="shareOrDownload" class="action-btn share-btn" :disabled="!generatedImageUrl">
              Скачать
            </button>
            <p class="hint-text">
              Мой Сигнал в Корж ⚡️{{ ticket }}<br>
              Отправить Сигнал: https://cffx.ru/korzh
            </p>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineExpose, onMounted, computed } from 'vue';

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  details: String
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);
const isMobile = ref(false);

// АЛГОРИТМ ОБРАБОТКИ ТЕКСТА
const formattedText = computed(() => {
  if (!props.details) return '';
  let text = props.details.trim();

  // 1. Если текст состоит из слов без пробелов (слипшиеся баблы), пробуем разделить
  // (Эвристика: если много заглавных внутри слов, но мало пробелов — скорее всего баблы)
  // Но проще всего: добавить пробел после каждой точки, если нет.
  text = text.replace(/\.([^\s])/g, '. $1'); 
  text = text.replace(/,([^\s])/g, ', $1');

  // 2. Делаем первую букву заглавной
  text = text.charAt(0).toUpperCase() + text.slice(1);

  // 3. (Опционально) Расставляем запятые перед союзами "а", "но", если нет
  // Это рискованно без NLP, но простейшие случаи можно:
  // text = text.replace(/ ([ано]) /g, ', $1 '); 

  return text;
});

onMounted(() => {
  isMobile.value = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
});

const bgClass = computed(() => {
  if (props.address && props.address.includes('Куйбышева')) return 'bg-location-1';
  if (props.address && props.address.includes('Льва Толстого')) return 'bg-location-2';
  return 'bg-default';
});

const loadLibrary = () => {
  return new Promise((resolve, reject) => {
    if (window.html2canvas) return resolve(window.html2canvas);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = () => resolve(window.html2canvas);
    script.onerror = () => {
      const backup = document.createElement('script');
      backup.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      backup.onload = () => resolve(window.html2canvas);
      backup.onerror = () => reject(new Error('Lib load failed'));
      document.head.appendChild(backup);
    };
    document.head.appendChild(script);
  });
};

const generateAndShare = async () => {
  showModal.value = true;
  generatedImageUrl.value = null;
  try {
    await loadLibrary();
    await new Promise(r => setTimeout(r, 700));
    const element = document.getElementById('story-capture-area');
    if (!element) return;
    const canvas = await window.html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      width: 1080,
      height: 1920,
      windowWidth: 1080,
      windowHeight: 1920,
      backgroundColor: null
    });
    generatedImageUrl.value = canvas.toDataURL('image/png');
    canvas.toBlob((blob) => { generatedBlob.value = blob; }, 'image/png');
  } catch (e) {
    console.error('Gen error:', e);
    showModal.value = false;
    alert('Ошибка генерации.');
  }
};

const shareOrDownload = async () => {
  if (!generatedBlob.value) return;
  if (navigator.share && navigator.canShare) {
    const file = new File([generatedBlob.value], `signal-${props.ticket}.png`, { type: 'image/png' });
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (err) { console.log('Share error', err); }
  }
  const link = document.createElement('a');
  link.download = `signal-${props.ticket}.png`;
  link.href = generatedImageUrl.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const closeModal = () => { showModal.value = false; };

defineExpose({ generateAndShare });
</script>

<style scoped>
.story-wrapper-hidden { position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -1000; visibility: visible; }
.story-template { 
  width: 1080px; height: 1920px; position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box; background: #000; color: #fff;
}

/* ФОН */
.story-bg-image { position: absolute; inset: 0; z-index: 1; background-size: cover; background-position: center; }
.story-bg-image.bg-default, .story-bg-image.bg-location-1, .story-bg-image.bg-location-2 {
  background-image: url('https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg');
}
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.65) 50%, #000 100%);
}

.story-content {
  position: relative; z-index: 10; width: 100%; height: 100%;
  padding: 240px 60px 280px 60px; /* Уменьшил отступы сбоку, чтобы текст был шире */
  display: flex; flex-direction: column; align-items: center; justify-content: space-between;
}

/* ВЕРХ */
.story-header { display: flex; flex-direction: column; align-items: center; gap: 48px; width: 100%; text-align: center; }
.story-main-title {
  font-size: 82px; font-weight: 600; line-height: 1.05; letter-spacing: 0.1em;
  margin: 0; text-transform: uppercase; color: #fff; text-shadow: 0 6px 24px rgba(0,0,0,0.75);
}
.glass-pill-info {
  background: rgba(30, 30, 32, 0.5); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1.5px solid rgba(255, 255, 255, 0.15); border-radius: 100px; padding: 26px 60px;
  display: inline-flex; align-items: center; gap: 36px;
  font-size: 44px; font-weight: 500; font-family: "SF Mono", monospace; box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.info-logo { width: 52px; height: 52px; object-fit: contain; display: block; flex-shrink: 0; }
.info-ticket { color: #fff; letter-spacing: 1.5px; white-space: nowrap; }
.info-divider { color: rgba(255,255,255,0.35); font-weight: 300; }
.info-date { color: rgba(255,255,255,0.9); letter-spacing: 0; white-space: nowrap; }
.story-address { font-size: 46px; font-weight: 600; color: rgba(255,255,255,0.92); letter-spacing: 0.02em; text-shadow: 0 3px 10px rgba(0,0,0,0.65); }

/* ЦЕНТР: ТЕКСТ (Новый стиль) */
.story-body-section {
  flex-grow: 1; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0;
}
.text-card-purple {
  width: 98%; /* Шире */
  padding: 50px 60px;
  border-radius: 60px; /* Сильнее скругление */
  
  /* Фиолетовая гамма */
  background: rgba(30, 20, 45, 0.65); 
  border: 2px solid rgba(142, 124, 195, 0.3);
  
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4); /* Мягкая тень */
}
.text-card-content {
  margin: 0; font-size: 54px; /* Крупнее */
  font-weight: 400; line-height: 1.35; color: #EDEBFF; text-align: center;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5); white-space: pre-wrap;
}

/* ГРАДИЕНТ */
.bottom-fade-gradient {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 800px; z-index: 20;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 50%, #000 100%); pointer-events: none;
}

/* ФУТЕР: НОВАЯ КНОПКА (Стиль "Review Button" из референса) */
.story-footer { position: relative; z-index: 30; width: 100%; display: flex; justify-content: center; margin-top: -140px; }

.button-container-3d {
  background: linear-gradient(90deg, #E0D7F8 0%, #C1B5F0 50%, #8E7CC3 100%);
  border-radius: 36px; /* Как в референсе */
  padding: 32px 100px;
  box-shadow: 0 20px 50px rgba(142, 124, 195, 0.3);
  display: flex; align-items: center; justify-content: center;
  filter: url(#depth-shadow); /* SVG фильтр для объема */
}

.btn-text {
  font-size: 48px; font-weight: 700; color: #1a1a1a; letter-spacing: 0.02em;
}

/* МОДАЛКА */
.story-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); padding: 20px; }
.story-modal { background: #1E1E20; width: 100%; max-width: 420px; max-height: 95vh; border-radius: 28px; border: 1px solid #333; display: flex; flex-direction: column; box-shadow: 0 30px 80px rgba(0,0,0,0.7); overflow: hidden; }
.story-modal-header { padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; background: #252528; }
.story-modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }
.close-icon-btn { background: rgba(255,255,255,0.1); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.story-preview-container { background: #000; flex-grow: 1; min-height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 20px; }
.story-preview-img { max-width: 100%; max-height: 60vh; object-fit: contain; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
.loading-spinner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.spinner-logo { width: 48px; height: 48px; animation: breathe 3s ease-in-out infinite; }
.spinner-text { color: #888; font-size: 14px; }
.story-modal-actions { padding: 24px; background: #252528; border-top: 1px solid #333; display: flex; flex-direction: column; gap: 14px; align-items: center; }
.action-btn { width: 100%; padding: 16px; border-radius: 14px; border: none; font-weight: 600; font-size: 16px; cursor: pointer; background: #fff; color: #000; transition: transform 0.2s; }
.action-btn:hover:not(:disabled) { transform: scale(1.02); }
.action-btn:active:not(:disabled) { transform: scale(0.98); }
.action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.hint-text { color: #888; font-size: 13px; margin: 0; text-align: center; line-height: 1.4; max-width: 90%; }
.hint-text b { color: #ccc; }
@keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }
</style>
