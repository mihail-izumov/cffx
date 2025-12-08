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

          <!-- ЦЕНТР: Контент (Текст -> Баблы) -->
          <div class="story-body-section">
            <div class="content-scroll-wrapper">
              
              <!-- 1. Текст пользователя (если есть) -->
              <div v-if="details" class="user-details-text">
                {{ details }}
              </div>

              <!-- 2. Теги (компактные и фиолетовые) -->
              <div v-if="displayTags && displayTags.length > 0" class="tags-wrapper">
                <span 
                  v-for="tag in displayTags" 
                  :key="tag" 
                  class="tag-pill-purple"
                >
                  {{ tag }}
                </span>
              </div>

            </div>
          </div>

          <!-- ГРАДИЕНТ (Черный снизу) -->
          <div class="bottom-fade-gradient"></div>

          <!-- НИЗ: Кнопка (Ваш дизайн) -->
          <div class="story-footer">
            <button class="glass-pill-button">
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
  details: String // Важно: убедитесь, что родитель передает этот проп!
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);
const isMobile = ref(false);

const displayTags = computed(() => {
  // Если нет ни тегов, ни текста — показываем заглушки
  if ((!props.tags || props.tags.length === 0) && !props.details) {
    return ['Сигнал', 'Впечатление'];
  }
  return props.tags || [];
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
.story-wrapper-hidden { position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -1000; visibility: visible; }

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
  background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 50%, #000 100%);
}

.story-content {
  position: relative; z-index: 10; width: 100%; height: 100%;
  padding: 240px 60px 240px 60px;
  display: flex; flex-direction: column; align-items: center; 
}

/* ВЕРХНЯЯ ЧАСТЬ */
.story-header { display: flex; flex-direction: column; align-items: center; gap: 40px; width: 100%; text-align: center; margin-bottom: 50px; }

.story-main-title {
  font-size: 72px; font-weight: 600; line-height: 1.1; letter-spacing: 0.1em;
  margin: 0; text-transform: uppercase; color: #fff;
  text-shadow: 0 4px 16px rgba(0,0,0,0.6);
}

.glass-pill-info {
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  padding: 16px 48px;
  display: inline-flex; align-items: center; gap: 24px;
  font-size: 34px; font-weight: 500; font-family: "SF Mono", monospace;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.info-logo { width: 40px; height: 40px; object-fit: contain; }
.info-ticket { color: #fff; letter-spacing: 1px; }
.info-divider { color: rgba(255,255,255,0.3); }
.info-date { color: rgba(255,255,255,0.8); }

.story-address {
  font-size: 40px; color: rgba(255,255,255,0.95); font-weight: 400; letter-spacing: 0.02em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* СЕКЦИЯ КОНТЕНТА (ТЕКСТ + БАБЛЫ) */
.story-body-section {
  flex-grow: 1; width: 100%; position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
  overflow: hidden;
}
.content-scroll-wrapper {
  display: flex; flex-direction: column; align-items: center; gap: 40px; width: 100%;
}

.user-details-text {
  font-size: 48px; line-height: 1.35; color: #fff; text-align: center;
  font-weight: 400; font-style: italic; opacity: 1;
  max-width: 90%;
  text-shadow: 0 4px 12px rgba(0,0,0,0.9);
  white-space: pre-wrap; margin-bottom: 20px;
}

.tags-wrapper {
  display: flex; flex-wrap: wrap; justify-content: center; align-content: center; 
  gap: 16px; /* Уменьшено расстояние между баблами */
}
/* Единый стиль для всех баблов (фиолетовый) */
.tag-pill-purple {
  font-size: 38px; font-weight: 500; color: #fff;
  padding: 16px 40px; border-radius: 100px;
  background: rgba(224, 215, 248, 0.15); /* Легкий фиолетовый фон */
  border: 2px solid rgba(224, 215, 248, 0.4); /* Фиолетовая обводка */
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* ГРАДИЕНТ (ЧЕРНЫЙ СНИЗУ) */
.bottom-fade-gradient {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 650px; z-index: 20;
  /* Плотный черный градиент */
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 60%, #000 100%);
  pointer-events: none;
}

/* ФУТЕР (КНОПКА) */
.story-footer { 
  position: relative; z-index: 30; width: 100%; display: flex; justify-content: center; 
  margin-top: -80px; 
}

/* КНОПКА (Glass Pill Button - копия вашего стиля) */
.glass-pill-button {
  position: relative;
  background: rgba(20, 20, 24, 0.3);
  backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
  border: none;
  border-radius: 9999px;
  padding: 32px 110px; /* Большие паддинги для масштаба */
  font-weight: 600;
  font-size: 48px;
  color: #fff; /* Белый цвет текста */
  text-shadow: 0 1px 3px rgba(0,0,0,0.6);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  letter-spacing: 0.02em;
}
.glass-pill-button::before {
  content: ''; position: absolute; inset: 0; border-radius: 9999px; padding: 2px;
  background: radial-gradient(60% 50% at 50% 0%, rgba(224, 215, 248, 1) 0%, transparent 100%),
              linear-gradient(rgba(142, 124, 195, 0.4), rgba(142, 124, 195, 0.4));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}

/* МОДАЛЬНОЕ ОКНО */
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
.spinner-logo { width: 48px; height: 48px; animation: breathe 3s ease-in-out infinite; }
.spinner-text { color: #888; font-size: 14px; }
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
@keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }
</style>
