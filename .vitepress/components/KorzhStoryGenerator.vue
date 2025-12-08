<template>
  <div>
    <!-- 1. СКРЫТЫЙ ШАБЛОН (Рендер) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        
        <!-- Фон -->
        <div class="story-bg-image"></div>
        <div class="story-bg-overlay"></div>

        <div class="story-content safe-area">
          
          <!-- ВЕРХ: Заголовок и Инфо -->
          <div class="story-header">
            <h1 class="story-main-title">
              МОЙ СИГНАЛ<br>В КОРЖ
            </h1>

            <div class="story-info-row">
              <div class="glass-pill-info">
                <img src="/favicon.svg" class="info-logo" alt="logo" />
                <span class="info-ticket">{{ ticket }}</span>
                <span class="info-divider">|</span>
                <span class="info-date">{{ date }}</span>
              </div>
            </div>

            <div class="story-address">
              {{ address || 'Кофейня Корж' }}
            </div>
          </div>

          <!-- ЦЕНТР: Теги + Текст пользователя -->
          <div class="story-body-section">
            <div class="content-scroll-wrapper">
              
              <!-- Теги -->
              <div class="tags-wrapper">
                <span 
                  v-for="(tag, index) in displayTags" 
                  :key="tag" 
                  class="tag-pill"
                  :class="{ 'tag-highlight': index === 0 }" 
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Текст пользователя (Детали) -->
              <div v-if="details" class="user-details-text">
                {{ details }}
              </div>
            
            </div>
          </div>

          <!-- ГРАДИЕНТ (Перекрывает текст перед кнопкой) -->
          <div class="bottom-fade-gradient"></div>

          <!-- НИЗ: Кнопка-ссылка (Glass Pill) -->
          <div class="story-footer">
            <button class="glass-pill static-pill">
              cffx.ru/korzh
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- 2. МОДАЛЬНОЕ ОКНО -->
    <transition name="modal-fade">
      <div v-if="showModal" class="story-modal-overlay" @click.self="closeModal">
        <div class="story-modal">
          
          <div class="story-modal-header">
            <h3>Ваша сторис готова 📸</h3>
            <button class="close-icon-btn" @click="closeModal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div class="story-preview-container">
            <img v-if="generatedImageUrl" :src="generatedImageUrl" class="story-preview-img" alt="Story Preview" />
            
            <!-- Лоадер -->
            <div v-else class="loading-spinner">
              <img src="/favicon.svg" class="spinner-logo" alt="loading" />
              <div class="spinner-text">Создаем магию...</div>
            </div>
          </div>

          <div class="story-modal-actions">
            <button @click="shareOrDownload" class="action-btn share-btn" :disabled="!generatedImageUrl">
              <span v-if="isMobile">Сохранить картинку 📥</span>
              <span v-else>Скачать картинку 📥</span>
            </button>
            <p class="hint-text">
              Сохраните картинку и выложите в сторис с отметкой <b>@korzh_coffee</b>
            </p>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed, onMounted } from 'vue';

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  tags: Array,
  details: String // Текст от пользователя
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);
const isMobile = ref(false);

const displayTags = computed(() => {
  if (!props.tags || props.tags.length === 0) {
    return ['Сигнал', 'Впечатление'];
  }
  return props.tags;
});

onMounted(() => {
  isMobile.value = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
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
    // Небольшая задержка, чтобы DOM точно отрисовался (включая картинки)
    await new Promise(r => setTimeout(r, 600)); 

    const element = document.getElementById('story-capture-area');
    if (!element) return;

    const canvas = await window.html2canvas(element, {
      scale: 2,
      useCORS: true,
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
    } catch (err) {
      console.log('Share failed, downloading...', err);
    }
  }

  const link = document.createElement('a');
  link.download = `signal-${props.ticket}.png`;
  link.href = generatedImageUrl.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const closeModal = () => {
  showModal.value = false;
};

defineExpose({
  generateAndShare
});
</script>

<style scoped>
/* СКРЫТЫЙ БЛОК */
.story-wrapper-hidden { position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -1000; visibility: visible; }

/* ШАБЛОН 1080x1920 */
.story-template { 
  width: 1080px; height: 1920px; position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box;
  background: #000; color: #fff;
}

/* ФОН */
.story-bg-image {
  position: absolute; inset: 0; z-index: 1;
  background-image: url('https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg');
  background-size: cover; background-position: center;
}
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 2;
  /* Легкое затемнение сверху, сильное снизу */
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, #000 100%);
}

/* КОНТЕНТ */
.story-content {
  position: relative; z-index: 10; width: 100%; height: 100%;
  padding: 240px 60px 240px 60px; /* Safe Area */
  display: flex; flex-direction: column; align-items: center; 
}

/* ВЕРХ */
.story-header { display: flex; flex-direction: column; align-items: center; gap: 40px; width: 100%; text-align: center; margin-bottom: 60px; }

.story-main-title {
  font-size: 72px; font-weight: 600; line-height: 1.1; letter-spacing: 0.1em;
  margin: 0; text-transform: uppercase; color: #fff;
  text-shadow: 0 4px 16px rgba(0,0,0,0.6);
}

.glass-pill-info {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  padding: 16px 48px;
  display: inline-flex; align-items: center; gap: 24px;
  font-size: 36px; font-weight: 500; font-family: "SF Mono", monospace;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.info-logo { width: 42px; height: 42px; object-fit: contain; }
.info-ticket { color: #fff; letter-spacing: 1px; }
.info-divider { color: rgba(255,255,255,0.3); }
.info-date { color: rgba(255,255,255,0.7); }

.story-address {
  font-size: 40px; color: rgba(255,255,255,0.9); font-weight: 400; letter-spacing: 0.02em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* ЦЕНТР (ТЕГИ + ТЕКСТ) */
.story-body-section {
  flex-grow: 1; width: 100%; position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
  overflow: hidden; /* Обрезаем контент */
}
.content-scroll-wrapper {
  display: flex; flex-direction: column; align-items: center; gap: 50px; width: 100%;
}

.tags-wrapper {
  display: flex; flex-wrap: wrap; justify-content: center; align-content: center; gap: 24px;
}
.tag-pill {
  font-size: 40px; font-weight: 500; color: #e0e0e0;
  padding: 20px 48px; border-radius: 100px;
  background: rgba(20, 20, 20, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
}
.tag-highlight {
  background: rgba(224, 215, 248, 0.2); 
  border-color: rgba(224, 215, 248, 0.5);
  color: #fff;
  box-shadow: 0 0 40px rgba(142, 124, 195, 0.25);
}

.user-details-text {
  font-size: 44px; line-height: 1.4; color: #fff; text-align: center;
  font-weight: 400; font-style: italic; opacity: 0.9;
  max-width: 90%;
  text-shadow: 0 2px 8px rgba(0,0,0,0.8);
  white-space: pre-wrap;
}

/* ГРАДИЕНТ (ЧЕРНЫЙ СНИЗУ) */
.bottom-fade-gradient {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 500px; z-index: 20;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 60%, #000 100%);
  pointer-events: none;
}

/* ФУТЕР (КНОПКА) - Поверх градиента */
.story-footer { 
  position: relative; z-index: 30; /* Выше градиента */
  width: 100%; display: flex; justify-content: center; 
  margin-top: -60px; /* Чуть подтягиваем вверх, чтобы кнопка лежала в черной зоне */
}

/* КНОПКА GLASS PILL (Копия стилей) */
.glass-pill {
  position: relative;
  background: rgba(20, 20, 24, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  border-radius: 9999px;
  padding: 32px 100px; /* Увеличил паддинги для масштаба 1080p */
  font-weight: 600;
  font-size: 48px; /* Увеличил шрифт для масштаба */
  color: #E0D7F8;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  letter-spacing: 0.02em;
}
.glass-pill::before {
  content: ''; position: absolute; inset: 0; border-radius: 9999px; padding: 2px; /* толщина обводки для большого экрана */
  background: radial-gradient(60% 50% at 50% 0%, rgba(224, 215, 248, 1) 0%, transparent 100%),
              linear-gradient(rgba(142, 124, 195, 0.4), rgba(142, 124, 195, 0.4));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
/* Статичная кнопка на картинке не должна иметь hover-эффектов, 
   но визуально должна выглядеть "дорого" сразу */
.static-pill {
  box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(142, 124, 195, 0.2);
  background: rgba(30,30,35,0.5); 
}

/* === МОДАЛКА === */
.story-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.92); z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(10px); padding: 20px;
}
.story-modal {
  background: #1E1E20; width: 100%; max-width: 420px; max-height: 95vh;
  border-radius: 28px; border: 1px solid #333;
  display: flex; flex-direction: column; 
  box-shadow: 0 30px 80px rgba(0,0,0,0.7); overflow: hidden;
}
.story-modal-header {
  padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; 
  border-bottom: 1px solid #333; background: #252528;
}
.story-modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }
.close-icon-btn {
  background: rgba(255,255,255,0.1); border: none; color: #fff; 
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
}
.story-preview-container {
  background: #000; flex-grow: 1; min-height: 200px;
  display: flex; align-items: center; justify-content: center; position: relative;
  overflow: hidden; padding: 20px;
}
.story-preview-img {
  max-width: 100%; max-height: 60vh; object-fit: contain; 
  border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);
}
.loading-spinner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.spinner-logo { width: 48px; height: 48px; animation: breathe 3s ease-in-out infinite; filter: drop-shadow(0 0 10px rgba(224,215,248,0.5)); }
.spinner-text { color: #888; font-size: 14px; font-weight: 500; }

.story-modal-actions { 
  padding: 24px; background: #252528; border-top: 1px solid #333;
  display: flex; flex-direction: column; gap: 14px; align-items: center; 
}
.action-btn {
  width: 100%; padding: 16px; border-radius: 14px; border: none; 
  font-weight: 600; font-size: 16px; cursor: pointer;
  background: #fff; color: #000; transition: transform 0.2s;
}
.action-btn:active { transform: scale(0.98); }
.hint-text { color: #888; font-size: 13px; margin: 0; text-align: center; line-height: 1.4; max-width: 90%; }
.hint-text b { color: #ccc; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@keyframes breathe { 
  0%, 100% { transform: scale(1); opacity: 0.8; filter: drop-shadow(0 0 5px rgba(224,215,248,0.3)); } 
  50% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 15px rgba(224,215,248,0.8)); } 
}
</style>
