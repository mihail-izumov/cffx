<template>
  <div>
    <!-- 1. СКРЫТЫЙ ШАБЛОН ДЛЯ ГЕНЕРАЦИИ -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        
        <!-- Фоновая картинка -->
        <div class="story-bg-image"></div>
        <div class="story-bg-overlay"></div>

        <div class="story-content safe-area">
          
          <!-- ВЕРХНЯЯ ЧАСТЬ -->
          <div class="story-header">
            <!-- Заголовок -->
            <h1 class="story-main-title">
              Мой Сигнал<br>в Корж
            </h1>

            <!-- Блок с номером и датой -->
            <div class="story-info-row">
              <div class="glass-pill-info">
                <span class="info-icon">⚡️</span>
                <span class="info-ticket">{{ ticket }}</span>
                <span class="info-divider">|</span>
                <span class="info-date">{{ date }}</span>
              </div>
            </div>

            <!-- Адрес -->
            <div class="story-address">
              {{ address || 'Кофейня Корж' }}
            </div>
          </div>

          <!-- ЦЕНТРАЛЬНАЯ ЧАСТЬ (Облако тегов) -->
          <div class="story-tags-section">
            <div class="tags-wrapper">
              <span 
                v-for="(tag, index) in displayTags" 
                :key="tag" 
                class="tag-pill"
                :class="{ 'tag-highlight': index % 3 === 0 }" 
              >
                {{ tag }}
              </span>
            </div>
            <!-- Градиент, скрывающий лишние теги снизу -->
            <div class="tags-fade-gradient"></div>
          </div>

          <!-- НИЖНЯЯ ЧАСТЬ (Ссылка) -->
          <div class="story-footer">
            <div class="glass-pill-link">
              cffx.ru/korzh
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 2. МОДАЛЬНОЕ ОКНО ПРЕДПРОСМОТРА -->
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
              <div class="spinner-icon">⚡️</div>
              <div>Создаем магию...</div>
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
  tags: Array
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);
const isMobile = ref(false);

const displayTags = computed(() => {
  // Если тегов нет, показываем дефолтные
  if (!props.tags || props.tags.length === 0) {
    return ['Сигнал', 'Впечатление', 'Корж'];
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
    await new Promise(r => setTimeout(r, 500)); 

    const element = document.getElementById('story-capture-area');
    if (!element) return;

    const canvas = await window.html2canvas(element, {
      scale: 2,
      useCORS: true, // Важно для загрузки картинки фона
      logging: false,
      width: 1080,
      height: 1920,
      windowWidth: 1080,
      windowHeight: 1920,
      backgroundColor: null // Прозрачный, чтобы фон работал
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
  background: #111;
  color: #fff;
}

/* ФОН */
.story-bg-image {
  position: absolute; inset: 0; z-index: 1;
  background-image: url('https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg');
  background-size: cover; background-position: center;
}
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 2;
  /* Темное затемнение для читаемости + фиолетовый оттенок снизу */
  background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 40%, rgba(20,10,30,0.8) 100%);
}

/* КОНТЕНТ (SAFE AREA) */
.story-content {
  position: relative; z-index: 10;
  width: 100%; height: 100%;
  /* Safe Area: отступы под интерфейс сторис (сверху и снизу по ~250px) */
  padding: 240px 60px 280px 60px; 
  display: flex; flex-direction: column; align-items: center; justify-content: space-between;
}

/* === ВЕРХНЯЯ ЧАСТЬ === */
.story-header { display: flex; flex-direction: column; align-items: center; gap: 32px; width: 100%; text-align: center; }

.story-main-title {
  font-size: 82px; font-weight: 800; line-height: 1.05; letter-spacing: -2px;
  margin: 0; text-transform: uppercase;
  background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
}

/* СТЕКЛЯННАЯ ПЛАШКА ИНФО */
.glass-pill-info {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  padding: 18px 42px;
  display: inline-flex; align-items: center; gap: 20px;
  font-size: 38px; font-weight: 600; font-family: "SF Mono", monospace;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.info-icon { font-size: 38px; }
.info-ticket { color: #fff; letter-spacing: 1px; }
.info-divider { color: rgba(255,255,255,0.3); font-weight: 300; }
.info-date { color: rgba(255,255,255,0.8); }

.story-address {
  font-size: 42px; color: rgba(255,255,255,0.9); font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* === ОБЛАКО ТЕГОВ === */
.story-tags-section {
  width: 100%; position: relative;
  flex-grow: 1; /* Занимает все свободное место в центре */
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; /* Обрезает слишком длинный список */
  margin: 40px 0;
}
.tags-wrapper {
  display: flex; flex-wrap: wrap; justify-content: center; align-content: center; gap: 24px;
}

.tag-pill {
  font-size: 42px; font-weight: 600; color: #e0e0e0;
  padding: 18px 40px; border-radius: 100px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

/* Подсветка каждого 3-го тега (или первого) */
.tag-highlight {
  background: rgba(224, 215, 248, 0.25); /* Фиолетовый оттенок из вашего примера */
  border-color: rgba(224, 215, 248, 0.6);
  color: #fff;
  box-shadow: 0 0 30px rgba(142, 124, 195, 0.3);
}

/* Градиент снизу, чтобы "растворить" лишние теги */
.tags-fade-gradient {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 150px;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.01)); 
  /* На темном фоне можно сделать более явное затемнение, если нужно */
}

/* === ФУТЕР (ССЫЛКА) === */
.story-footer { width: 100%; display: flex; justify-content: center; }

.glass-pill-link {
  background: #fff; color: #000;
  font-size: 48px; font-weight: 700;
  padding: 28px 70px; border-radius: 100px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  letter-spacing: -0.5px;
}

/* === МОДАЛКА (то же самое) === */
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
  box-shadow: 0 30px 80px rgba(0,0,0,0.7);
  overflow: hidden;
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
.loading-spinner { color: #888; font-size: 14px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.spinner-icon { font-size: 28px; animation: spin 1s infinite linear; }
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
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>
