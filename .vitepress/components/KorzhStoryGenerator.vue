<template>
  <div>
    <!-- 1. Скрытый шаблон для генерации (он нужен, чтобы создать картинку) -->
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
    <div v-if="showModal" class="story-modal-overlay" @click.self="closeModal">
      <div class="story-modal">
        <div class="story-modal-header">
          <h3>Ваша сторис готова 📸</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        
        <div class="story-preview-container">
          <!-- Сюда вставится картинка -->
          <img v-if="generatedImageUrl" :src="generatedImageUrl" class="story-preview-img" alt="Story Preview" />
          <div v-else class="loading-spinner">Генерация...</div>
        </div>

        <div class="story-modal-actions">
          <button @click="shareImage" class="action-btn share-btn" :disabled="!generatedImageUrl">
            Поделиться / Скачать
          </button>
          <p class="hint-text">Если кнопка не работает, зажмите картинку, чтобы сохранить</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed } from 'vue';

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  tags: Array
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);

const displayTags = computed(() => {
  return props.tags && props.tags.length > 0 ? props.tags : ['Сигнал'];
});

// Загрузчик библиотеки
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

// 1. Открываем модалку и запускаем генерацию
const generateAndShare = async () => {
  showModal.value = true;
  generatedImageUrl.value = null; // Сброс
  
  try {
    await loadLibrary();
    // Даем браузеру отрисовать скрытый DOM
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

    // Конвертируем в URL для отображения
    generatedImageUrl.value = canvas.toDataURL('image/png');
    
    // Конвертируем в Blob для шеринга
    canvas.toBlob((blob) => {
      generatedBlob.value = blob;
    }, 'image/png');

  } catch (e) {
    console.error('Gen error:', e);
    alert('Ошибка генерации. Попробуйте снова.');
    showModal.value = false;
  }
};

// 2. Логика кнопки "Поделиться" внутри модалки
const shareImage = async () => {
  if (!generatedBlob.value) return;

  const file = new File([generatedBlob.value], `signal-${props.ticket}.png`, { type: 'image/png' });
  const shareData = {
    files: [file],
    title: 'Мой Сигнал',
    text: `Мой Сигнал в Корж ⚡️${props.ticket}` // Телеграм часто игнорирует текст при файле, но оставим
  };

  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Share closed/failed', err);
      // Если не вышло пошерить нативно — просто скачиваем
      downloadImage();
    }
  } else {
    downloadImage();
  }
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
/* Скрытый блок генерации */
.story-wrapper-hidden {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: -1000;
  visibility: visible; 
}
.story-template {
  width: 1080px;
  height: 1920px;
  background: #1E1E20;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  box-sizing: border-box;
}
/* Стили контента (те же самые) */
.story-content {
  width: 100%; height: 100%; padding: 120px 80px; display: flex; flex-direction: column; justify-content: space-between;
  background: radial-gradient(circle at top right, rgba(179, 157, 200, 0.15), transparent 45%), linear-gradient(180deg, #1E1E20 0%, #151517 100%);
}
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

/* === МОДАЛЬНОЕ ОКНО ПРЕДПРОСМОТРА === */
.story-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.85); z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(5px);
  padding: 20px;
}
.story-modal {
  background: #1E1E20; width: 100%; max-width: 400px;
  border-radius: 24px; border: 1px solid #333;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  animation: modalUp 0.3s ease-out;
}
.story-modal-header {
  padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;
}
.story-modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }
.close-btn { background: none; border: none; color: #888; font-size: 28px; cursor: pointer; padding: 0; line-height: 1; }

.story-preview-container {
  background: #000;
  width: 100%;
  aspect-ratio: 9/16; /* Пропорция сторис */
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.story-preview-img {
  width: 100%; height: 100%; object-fit: contain;
}
.loading-spinner { color: #888; font-size: 14px; }

.story-modal-actions { padding: 20px; display: flex; flex-direction: column; gap: 10px; align-items: center; }
.action-btn {
  width: 100%; padding: 14px; border-radius: 12px; border: none; font-weight: 600; font-size: 16px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.share-btn { background: #fff; color: #000; }
.share-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.hint-text { color: #666; font-size: 12px; margin: 0; text-align: center; }

@keyframes modalUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
