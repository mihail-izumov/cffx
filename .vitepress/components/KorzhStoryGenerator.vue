<template>
  <div>
    <!-- 1. Скрытый шаблон для генерации -->
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

    <!-- 2. Модальное окно с результатом -->
    <transition name="modal-fade">
      <div v-if="showModal" class="story-modal-overlay" @click.self="closeModal">
        <div class="story-modal">
          
          <!-- Заголовок с явным крестиком -->
          <div class="story-modal-header">
            <h3>Ваша сторис готова 📸</h3>
            <button class="close-icon-btn" @click="closeModal" aria-label="Закрыть">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <!-- Контейнер с картинкой -->
          <div class="story-preview-container">
            <img v-if="generatedImageUrl" :src="generatedImageUrl" class="story-preview-img" alt="Story Preview" />
            <div v-else class="loading-spinner">
              <div class="spinner-icon">⚡️</div>
              <div>Создаем магию...</div>
            </div>
          </div>

          <!-- Кнопки действий -->
          <div class="story-modal-actions">
            <button @click="shareImage" class="action-btn share-btn" :disabled="!generatedImageUrl">
              <span v-if="canShareNative">Поделиться</span>
              <span v-else>Скачать картинку 📥</span>
            </button>
            
            <p class="hint-text">
              1. Сохраните картинку (или сделайте скриншот)<br>
              2. Выложите в сторис с отметкой <b>@korzh_coffee</b>
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
const canShareNative = ref(false);

const displayTags = computed(() => {
  return props.tags && props.tags.length > 0 ? props.tags : ['Сигнал'];
});

onMounted(() => {
  // Проверяем возможность нативного шеринга файлов
  if (navigator.share && navigator.canShare) {
    // Создаем фиктивный файл для проверки
    const testFile = new File(['foo'], 'foo.txt', { type: 'text/plain' });
    canShareNative.value = navigator.canShare({ files: [testFile] });
  }
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
    await new Promise(r => setTimeout(r, 600)); // Чуть больше времени для надежности

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
    alert('Ошибка генерации. Попробуйте обновить страницу.');
    showModal.value = false;
  }
};

const shareImage = async () => {
  if (!generatedBlob.value) return;

  // Стратегия: Сначала пробуем нативный шеринг
  if (canShareNative.value) {
    const file = new File([generatedBlob.value], `signal-${props.ticket}.png`, { type: 'image/png' });
    const shareData = {
      files: [file],
      // Важно: некоторые браузеры игнорируют text если есть files
      // Но мы все равно передаем ссылку
      title: 'Сигнал в Корж',
    };

    try {
      await navigator.share(shareData);
      return; // Успех
    } catch (err) {
      console.log('Native share failed/cancelled', err);
      // Если не вышло — переходим к скачиванию
    }
  } 

  // Если нативный шеринг недоступен или не сработал — просто скачиваем
  downloadImage();
};

const downloadImage = () => {
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
/* Скрытый блок (без изменений) */
.story-wrapper-hidden { position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -1000; visibility: visible; }
.story-template { width: 1080px; height: 1920px; background: #1E1E20; font-family: -apple-system, BlinkMacSystemFont, sans-serif; box-sizing: border-box; }
.story-content { width: 100%; height: 100%; padding: 120px 80px; display: flex; flex-direction: column; justify-content: space-between; background: radial-gradient(circle at top right, rgba(179, 157, 200, 0.15), transparent 45%), linear-gradient(180deg, #1E1E20 0%, #151517 100%); }
.story-top-section { display: flex; flex-direction: column; gap: 50px; }
.story-main-title { font-size: 86px; font-weight: 800; color: #fff; margin: 0; line-height: 1.05; letter-spacing: -2px; }
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

/* === МОДАЛЬНОЕ ОКНО === */
.story-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.9); z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px);
  padding: 20px;
}

.story-modal {
  background: #1E1E20; width: 100%; max-width: 420px; max-height: 90vh;
  border-radius: 24px; border: 1px solid #333;
  display: flex; flex-direction: column; 
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  overflow-y: auto; /* Чтобы на маленьких экранах можно было скроллить */
}

.story-modal-header {
  padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; 
  border-bottom: 1px solid #333; flex-shrink: 0;
}
.story-modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }

.close-icon-btn {
  background: rgba(255,255,255,0.1); border: none; color: #fff; 
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s;
}
.close-icon-btn:hover { background: rgba(255,255,255,0.2); }

.story-preview-container {
  background: #111;
  width: 100%;
  /* Убираем жесткий aspect-ratio, чтобы не занимало слишком много места, 
     но ограничиваем высоту */
  max-height: 55vh; 
  display: flex; align-items: center; justify-content: center;
  position: relative;
  overflow: hidden;
}
.story-preview-img {
  width: 100%; height: 100%; object-fit: contain; display: block;
}

.loading-spinner { 
  display: flex; flex-direction: column; align-items: center; gap: 10px; color: #888; font-size: 14px; padding: 40px; 
}
.spinner-icon { font-size: 32px; animation: pulse 1s infinite; }

.story-modal-actions { 
  padding: 24px 20px 30px 20px; /* Больше отступа снизу */
  display: flex; flex-direction: column; gap: 16px; align-items: center; 
  background: #1E1E20;
}

.action-btn {
  width: 100%; padding: 16px; border-radius: 14px; border: none; 
  font-weight: 600; font-size: 16px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.share-btn { background: #fff; color: #000; }
.share-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.hint-text { 
  color: #777; font-size: 13px; margin: 0; text-align: center; line-height: 1.5; 
  max-width: 90%;
}
.hint-text b { color: #ccc; }

/* Анимации */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
</style>
