<template>
  <div>
    <!-- ГЛОБАЛЬНЫЕ СТИЛИ ДЛЯ ШРИФТА INTER -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- SVG Definitions (Фильтры для эффекта "Метаморфоз") -->
    <svg width="0" height="0" style="position: absolute; pointer-events: none;">
      <defs>
        <!-- Градиент для обводок -->
        <linearGradient id="purple-matte-gradient-fixed" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style="stop-color:#E0D7F8; stop-opacity:1" />
          <stop offset="45%" style="stop-color:#C1B5F0; stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8E7CC3; stop-opacity:1" />
        </linearGradient>

        <!-- Мягкая тень/объем -->
        <filter id="depth-effect-soft">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="0" dy="1.5" result="offsetblur" />
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
                <!-- МОЛНИЯ ВМЕСТО ЛОГО -->
                <span class="info-icon">⚡️</span>
                <span class="info-ticket">{{ ticket }}</span>
                <span class="info-divider">|</span>
                <span class="info-date">{{ date }}</span>
              </div>
            </div>

            <div class="story-address">{{ address || 'Кофейня Корж' }}</div>
          </div>

          <!-- ЦЕНТР: БАБЛЫ + ТЕКСТ -->
          <div class="story-body-section">
            
            <!-- 1. Баблы эмоций (если есть) -->
            <div v-if="emotionsList.length > 0" class="emotions-row">
              <div v-for="(tag, i) in emotionsList" :key="i" class="emotion-bubble-meta">
                {{ tag }}
              </div>
            </div>

            <!-- 2. Основной текст (поднят выше) -->
            <div v-if="formattedText" class="text-card-meta">
              <p class="text-card-content">
                {{ formattedText }}
              </p>
            </div>
          </div>

          <!-- ГРАДИЕНТ СНИЗУ -->
          <div class="bottom-fade-gradient"></div>

          <!-- НИЗ: КНОПКА (Стиль Метаморфоз + SVG Favicon) -->
          <div class="story-footer">
            <div class="button-meta">
               <!-- SVG Favicon (Векторный) -->
               <svg class="btn-icon" width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Простая "К" или узор, имитирующий логотип Коржа (заглушка под вектор) -->
                  <rect width="100" height="100" rx="20" fill="#E0D7F8"/>
                  <path d="M30 20V80M30 50H70M70 20V80" stroke="#1E1E20" stroke-width="8" stroke-linecap="round"/>
               </svg>
               <span class="btn-text">cffx.ru/korzh</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- МОДАЛКА (Без изменений) -->
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
              <div class="spinner-circle"></div>
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
  emotions: String, // Строка эмоций
  details: String   // Остальной текст
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);
const isMobile = ref(false);

// Парсинг эмоций в массив для баблов
const emotionsList = computed(() => {
  if (!props.emotions) return [];
  // Разбиваем по запятым или пробелам, если это отдельные слова
  // Если это цельное предложение — выводим как один бабл, но лучше разбить если это теги
  // Эвристика: если есть запятые - бьем по ним.
  if (props.emotions.includes(',')) {
     return props.emotions.split(',').map(s => s.trim()).filter(Boolean);
  }
  // Иначе возвращаем как есть (или можно разбить по словам, если нужно)
  return [props.emotions.trim()];
});

// Обработка основного текста
const formattedText = computed(() => {
  if (!props.details) return '';
  let text = props.details.trim();

  // 1. Ставим пробел после знаков препинания, если нет
  text = text.replace(/([.,!?;])([^\s])/g, '$1 $2');

  // 2. Первая буква заглавная
  text = text.charAt(0).toUpperCase() + text.slice(1);

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
/* Глобальный сброс для Inter */
.story-template, .story-template * { font-family: 'Inter', sans-serif; }

.story-wrapper-hidden { position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -1000; visibility: visible; }
.story-template { 
  width: 1080px; height: 1920px; position: relative;
  box-sizing: border-box; background: #000; color: #fff;
}

/* ФОН */
.story-bg-image { position: absolute; inset: 0; z-index: 1; background-size: cover; background-position: center; }
.story-bg-image.bg-default, .story-bg-image.bg-location-1, .story-bg-image.bg-location-2 {
  background-image: url('https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg');
}
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 60%, #000 100%);
}

.story-content {
  position: relative; z-index: 10; width: 100%; height: 100%;
  /* Подняли верхний отступ, чтобы блок был выше */
  padding: 180px 60px 240px 60px; 
  display: flex; flex-direction: column; align-items: center; justify-content: space-between;
}

/* --- ВЕРХ --- */
.story-header { display: flex; flex-direction: column; align-items: center; gap: 40px; width: 100%; text-align: center; }

.story-main-title {
  font-size: 72px; /* Чуть меньше */
  font-weight: 300; /* Тонкий (Premium) */
  line-height: 1.1; 
  letter-spacing: 0.15em; /* Большой кернинг */
  margin: 0; text-transform: uppercase; color: #fff; 
  text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}

.glass-pill-info {
  background: rgba(30, 30, 32, 0.4); 
  backdrop-filter: blur(24px); 
  border: 1px solid rgba(255, 255, 255, 0.12); 
  border-radius: 100px; 
  padding: 24px 50px;
  display: inline-flex; align-items: center; gap: 32px;
  font-size: 40px; font-weight: 400; font-family: 'Inter', monospace; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.info-icon { font-size: 42px; line-height: 1; }
.info-ticket { color: #fff; letter-spacing: 0.1em; }
.info-divider { color: rgba(255,255,255,0.3); font-weight: 300; }
.info-date { color: rgba(255,255,255,0.85); letter-spacing: 0.05em; }

.story-address { 
  font-size: 42px; 
  font-weight: 500; /* Чуть жирнее заголовка */
  color: rgba(255,255,255,0.95); 
  letter-spacing: 0.05em; 
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

/* --- ЦЕНТР: БАБЛЫ + ТЕКСТ (Meta-Style) --- */
.story-body-section {
  flex-grow: 1; width: 100%; 
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start; /* Поднимаем к верху */
  gap: 40px; 
  padding-top: 60px; /* Отступ от адреса */
}

/* Баблы эмоций */
.emotions-row {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;
  max-width: 95%;
}
.emotion-bubble-meta {
  background: rgba(224, 215, 248, 0.15); /* Пастельный фиолетовый */
  border: 1px solid rgba(224, 215, 248, 0.3);
  backdrop-filter: blur(12px);
  padding: 20px 48px;
  border-radius: 100px;
  font-size: 42px; font-weight: 500; color: #E0D7F8;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

/* Карточка текста (Meta-Style) */
.text-card-meta {
  width: 98%; 
  position: relative;
  background: #1f1f1f; /* Темная подложка как в референсе */
  border-radius: 48px;
  padding: 60px 50px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.5);
  margin-top: 20px;
}

/* Метаморфозная обводка через псевдо-элемент */
.text-card-meta::before {
  content: ''; position: absolute; inset: 0; border-radius: 48px; padding: 2px;
  background: linear-gradient(135deg, rgba(224, 215, 248, 0.4) 0%, rgba(193, 181, 240, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}

.text-card-content {
  margin: 0; 
  font-size: 52px; 
  font-weight: 400; 
  line-height: 1.4; 
  color: #e0e0e0; /* Светло-серый, не белый */
  text-align: center;
  letter-spacing: 0.01em;
}

/* ГРАДИЕНТ */
.bottom-fade-gradient {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 700px; z-index: 20;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 50%, #000 100%); pointer-events: none;
}

/* --- ФУТЕР: КНОПКА (Meta-Style + SVG) --- */
.story-footer { position: relative; z-index: 30; width: 100%; display: flex; justify-content: center; margin-top: -120px; }

.button-meta {
  /* Пастельный фиолетовый градиент */
  background: linear-gradient(90deg, #E0D7F8 0%, #C1B5F0 100%);
  border-radius: 100px;
  padding: 36px 100px;
  display: flex; align-items: center; justify-content: center; gap: 32px;
  box-shadow: 0 20px 60px rgba(142, 124, 195, 0.25);
  /* SVG-фильтр объема (depth-effect-soft) */
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.btn-icon {
  width: 64px; height: 64px; display: block;
}

.btn-text {
  font-size: 50px; 
  font-weight: 600; 
  color: #1a1a1a; /* Темный текст на светлом фоне */
  letter-spacing: 0.04em; /* Нормальное расстояние */
}

/* --- МОДАЛКА --- */
.story-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); padding: 20px; }
.story-modal { background: #1E1E20; width: 100%; max-width: 420px; max-height: 95vh; border-radius: 28px; border: 1px solid #333; display: flex; flex-direction: column; box-shadow: 0 30px 80px rgba(0,0,0,0.7); overflow: hidden; }
.story-modal-header { padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; background: #252528; }
.story-modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }
.close-icon-btn { background: rgba(255,255,255,0.1); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.story-preview-container { background: #000; flex-grow: 1; min-height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 20px; }
.story-preview-img { max-width: 100%; max-height: 60vh; object-fit: contain; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
.loading-spinner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.spinner-circle { width: 48px; height: 48px; border: 4px solid rgba(255,255,255,0.1); border-top-color: #E0D7F8; border-radius: 50%; animation: spin 1s linear infinite; }
.spinner-text { color: #888; font-size: 14px; }
.story-modal-actions { padding: 24px; background: #252528; border-top: 1px solid #333; display: flex; flex-direction: column; gap: 14px; align-items: center; }
.action-btn { width: 100%; padding: 16px; border-radius: 14px; border: none; font-weight: 600; font-size: 16px; cursor: pointer; background: #fff; color: #000; transition: transform 0.2s; }
.action-btn:hover:not(:disabled) { transform: scale(1.02); }
.action-btn:disabled { opacity: 0.5; }
.hint-text { color: #888; font-size: 13px; margin: 0; text-align: center; line-height: 1.4; max-width: 90%; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
