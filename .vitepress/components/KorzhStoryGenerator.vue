<template>
  <div>
    <!-- 1. Скрытый шаблон (Улучшенный дизайн) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        <div class="story-content">
          <div class="story-top-section">
            <h1 class="story-main-title">Мой Сигнал в Корж</h1>
            <div class="story-tech-panel">
              <span class="story-tech-date">{{ date }}</span>
              <span class="story-tech-ticket">#{{ ticket }}</span>
            </div>
            <div class="story-address-block">📍 {{ address || 'Кофейня Корж' }}</div>
          </div>
          
          <div class="story-cloud-section">
            <div class="story-tags-container">
              <span v-for="(tag, index) in displayTags" :key="tag" class="story-tag-item" :class="{'tag-accent': index === 0}">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="story-footer">
            <div class="story-link-pill">cffx.ru/korzh</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Модальное окно -->
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
            <!-- Картинка целиком (contain) -->
            <img v-if="generatedImageUrl" :src="generatedImageUrl" class="story-preview-img" alt="Story Preview" />
            <div v-else class="loading-spinner">
              <div class="spinner-icon">⚡️</div>
              <div>Генерация...</div>
            </div>
          </div>

          <div class="story-modal-actions">
            <!-- Кнопка Скачать / Поделиться -->
            <button @click="shareOrDownload" class="action-btn share-btn" :disabled="!generatedImageUrl">
              <span v-if="isMobile">Сохранить картинку 📥</span>
              <span v-else>Скачать картинку 📥</span>
            </button>
            
            <p class="hint-text">
              Сохраните картинку в галерею, а затем выложите в сторис с отметкой <b>@korzh_coffee</b>
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
  return props.tags && props.tags.length > 0 ? props.tags : ['Сигнал'];
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
      backgroundColor: '#1E1E20',
      useCORS: true,
      logging: false,
      width: 1080,
      height: 1920,
      windowWidth: 1080,
      windowHeight: 1920
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

  // Пытаемся пошерить ТОЛЬКО файл (без текста), это повышает шансы в TG
  if (navigator.share && navigator.canShare) {
    const file = new File([generatedBlob.value], `signal-${props.ticket}.png`, { type: 'image/png' });
    try {
      await navigator.share({
        files: [file] // Никакого title или text, только файл
      });
      return;
    } catch (err) {
      console.log('Share failed, downloading...', err);
    }
  }

  // Фолбек - скачивание
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
/* Скрытый блок */
.story-wrapper-hidden { position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -1000; visibility: visible; }
.story-template { width: 1080px; height: 1920px; background: #1E1E20; font-family: -apple-system, BlinkMacSystemFont, sans-serif; box-sizing: border-box; }

/* Дизайн сторис: улучшили градиент, чтобы текст читался */
.story-content { 
  width: 100%; height: 100%; padding: 120px 80px; display: flex; flex-direction: column; justify-content: space-between; 
  background: 
    radial-gradient(circle at top right, rgba(179, 157, 200, 0.25), transparent 50%),
    linear-gradient(180deg, #252529 0%, #151517 100%);
}
.story-top-section { display: flex; flex-direction: column; gap: 50px; }
.story-main-title { font-size: 86px; font-weight: 800; color: #fff; margin: 0; line-height: 1.05; letter-spacing: -2px; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
.story-tech-panel { display: inline-flex; align-items: center; gap: 30px; font-family: monospace; }
.story-tech-date { color: #888; font-size: 36px; }
.story-tech-ticket { background-color: #2a2a2e; color: #B39DC8; font-weight: 700; padding: 16px 36px; border-radius: 24px; font-size: 48px; border: 3px solid #3a3a3e; letter-spacing: 3px; }
.story-address-block { font-size: 48px; color: #ccc; font-weight: 500; margin-top: 20px; }
.story-cloud-section { flex-grow: 1; display: flex; align-items: center; padding: 60px 0; }
.story-tags-container { display: flex; flex-wrap: wrap; gap: 24px; align-content: center; }
.story-tag-item { font-size: 48px; color: #e0e0e0; background: rgba(255, 255, 255, 0.05); border: 3px solid rgba(255, 255, 255, 0.1); padding: 20px 48px; border-radius: 100px; font-weight: 600; line-height: 1; }
.story-tag-item.tag-accent { background: rgba(179, 157, 200, 0.2); border-color: rgba(179, 157, 200, 0.5); color: #fff; box-shadow: 0 0 40px rgba(179, 157, 200, 0.2); }
.story-footer { display: flex; justify-content: center; padding-bottom: 60px; }
.story-link-pill { background: #fff; color: #000; font-size: 56px; font-weight: 800; padding: 30px 80px; border-radius: 100px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); letter-spacing: -1px; }

/* === МОДАЛКА === */
.story-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.9); z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px);
  padding: 20px;
}
.story-modal {
  background: #1E1E20; width: 100%; max-width: 420px;
  max-height: 95vh; /* Ограничиваем высоту */
  border-radius: 24px; border: 1px solid #333;
  display: flex; flex-direction: column; 
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  overflow: hidden; /* Важно для скролла внутри */
}
.story-modal-header {
  padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; flex-shrink: 0;
}
.story-modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }
.close-icon-btn {
  background: rgba(255,255,255,0.1); border: none; color: #fff; 
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
}

.story-preview-container {
  background: #111;
  width: 100%;
  flex-grow: 1; /* Занимает доступное место */
  min-height: 200px;
  position: relative;
  overflow: hidden;
  padding: 20px; /* Отступы вокруг картинки */
  display: flex; align-items: center; justify-content: center;
}
/* Картинка целиком, ничего не обрезается */
.story-preview-img {
  max-width: 100%;
  max-height: 50vh; /* Ограничиваем высоту картинки (50% экрана) */
  object-fit: contain; 
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.loading-spinner { color: #888; font-size: 14px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.spinner-icon { font-size: 24px; animation: spin 1s infinite linear; }

.story-modal-actions { 
  padding: 20px; 
  display: flex; flex-direction: column; gap: 12px; align-items: center; 
  background: #1E1E20;
  border-top: 1px solid #333;
  flex-shrink: 0;
}
.action-btn {
  width: 100%; padding: 14px; border-radius: 12px; border: none; 
  font-weight: 600; font-size: 16px; cursor: pointer;
  background: #fff; color: #000;
}
.action-btn:disabled { opacity: 0.5; }

.hint-text { 
  color: #777; font-size: 13px; margin: 0; text-align: center; line-height: 1.4; 
  max-width: 280px;
}
.hint-text b { color: #ccc; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>
