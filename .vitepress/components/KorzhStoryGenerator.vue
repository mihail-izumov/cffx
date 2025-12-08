<template>
  <!-- Контейнер для скриншота. 
       Важно: visibility: visible, но z-index отрицательный, 
       чтобы браузер его "видел" и рендерил -->
  <div class="story-wrapper">
    <div id="story-capture-area" class="story-template">
      <div class="story-content">
        
        <div class="story-top-section">
          <h1 class="story-main-title">Мой Сигнал в Корж</h1>

          <div class="story-tech-panel">
            <span class="story-tech-date">{{ date }}</span>
            <span class="story-tech-ticket">#{{ ticket }}</span>
          </div>

          <div class="story-address-block">
            📍 {{ address || 'Кофейня Корж' }}
          </div>
        </div>

        <div class="story-cloud-section">
          <div class="story-tags-container">
            <span 
              v-for="(tag, index) in displayTags" 
              :key="tag" 
              class="story-tag-item"
              :class="{'tag-accent': index === 0}" 
            >
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
</template>

<script setup>
import { defineExpose, computed } from 'vue';

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  tags: Array
});

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

const generateAndShare = async () => {
  try {
    await loadLibrary();
    
    const element = document.getElementById('story-capture-area');
    if (!element) return;
    
    // Ждем рендера
    await new Promise(r => setTimeout(r, 300));

    const canvas = await window.html2canvas(element, {
      scale: 2, // Улучшаем качество
      backgroundColor: '#1E1E20',
      useCORS: true,
      logging: false,
      width: 1080,
      height: 1920,
      windowWidth: 1080,
      windowHeight: 1920
    });

    canvas.toBlob(async (blob) => {
      if (!blob) throw new Error('Blob creation failed');

      const file = new File([blob], `signal-${props.ticket}.png`, { type: 'image/png' });
      
      const shareData = {
        files: [file],
        title: 'Мой Сигнал',
        text: `Мой Сигнал в Корж ⚡️${props.ticket}`
      };

      // Пытаемся использовать нативный шеринг
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share(shareData);
        } catch (shareError) {
          console.warn('Share API canceled/failed, falling back to download', shareError);
          downloadImage(canvas); // Если отменили или ошибка — качаем
        }
      } else {
        // Если шеринг файлов не поддерживается (например, десктоп)
        downloadImage(canvas);
      }
    }, 'image/png');

  } catch (e) {
    console.error('Story gen error:', e);
    alert('Не удалось создать сторис. Попробуйте еще раз.');
  }
};

const downloadImage = (canvas) => {
  const link = document.createElement('a');
  link.download = `signal-${props.ticket}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

defineExpose({
  generateAndShare
});
</script>

<style scoped>
/* Обертка нулевого размера, чтобы не влиять на поток документа */
.story-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: -1000; /* Прячем под контент */
  visibility: visible; /* Но оставляем видимым для рендера */
}

.story-template {
  width: 1080px;
  height: 1920px;
  background: #1E1E20;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  box-sizing: border-box;
  /* Важно: не display: none */
}

.story-content {
  width: 100%;
  height: 100%;
  padding: 120px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: radial-gradient(circle at top right, rgba(179, 157, 200, 0.15), transparent 45%),
              linear-gradient(180deg, #1E1E20 0%, #151517 100%);
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
</style>
