<template>
  <div>
    <!-- Шрифт Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Шрифт Montserrat для нового дизайна -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">

    <!-- СКРЫТЫЙ ШАБЛОН (1080x1920) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        
        <!-- ФОН (Динамический: либо дефолтный класс, либо пользовательская картинка) -->
        <!-- Если есть customBgImage, используем его через style, иначе через класс -->
        <div 
          class="story-bg-image" 
          :class="!customBgImage ? bgClass : ''"
          :style="customBgImage ? { backgroundImage: `url(${customBgImage})` } : {}"
        ></div>
        
        <!-- МАСКА (Градиент) -->
        <div class="story-bg-overlay"></div>

        <div class="story-content">
          
          <!-- ВЕРХ -->
          <div class="story-header">
            <!-- Большая буква К на фоне -->
            <div class="big-k-bg">K</div>

            <h1 class="story-main-title">МОЯ ОТКРЫТКА<br>В КОРЖ</h1>

            <div class="story-info-row">
              <div class="glass-pill-info">
                <span class="info-icon">🎄</span>
                <span class="info-ticket">{{ ticket }}</span>
                <span class="info-divider">|</span>
                <span class="info-date">{{ date }}</span>
              </div>
            </div>

            <div class="story-address">{{ address || 'Кофейня Корж' }}</div>
          </div>

          <!-- ЦЕНТР: ПЛАШКА ОТЗЫВА -->
          <div class="story-body">
            <div v-if="formattedText" class="text-card">
              <p class="text-content">{{ formattedText }}</p>
            </div>
          </div>

          <!-- БЕЙДЖ (Вставляем между текстом и футером) -->
          <div v-if="badgeImage" class="story-badge-container">
             <img :src="badgeImage" class="story-badge-img" alt="Badge" />
          </div>

          <!-- НИЖНИЙ ГРАДИЕНТ -->
          <div class="bottom-gradient"></div>

          <!-- ФУТЕР (ФИКСИРОВАН) -->
          <div class="story-footer">
            <div class="link-button">
               <span class="btn-text">cffx.ru/korzh</span>
            </div>
            <div class="footer-tagline">Поделитесь настроением</div>
          </div>

        </div>
      </div>
    </div>

    <!-- МОДАЛКА -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          
          <div class="modal-header">
            <h3>Ваша открытка готова</h3>
            <button class="modal-close" @click="closeModal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <img v-if="generatedImageUrl" :src="generatedImageUrl" class="preview-img" alt="" />
            <div v-else class="spinner">
              <!-- Простой CSS спиннер, если картинки нет -->
              <div class="simple-loader"></div>
              <div class="spinner-text">Создаем магию...</div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="buttons-row">
               <button @click="shareOrDownload" class="download-btn primary-btn" :disabled="!generatedImageUrl">
                 {{ canShare ? 'Поделиться' : 'Скачать' }}
               </button>
               <button @click="downloadFile" class="download-btn secondary-btn" :disabled="!generatedImageUrl" v-if="canShare">
                 Скачать
               </button>
            </div>

            <!-- Загрузка фона -->
            <div class="upload-section">
               <button class="text-btn upload-btn" @click="triggerFileUpload">
                  Загрузить свое фото
               </button>
               <input 
                 type="file" 
                 ref="fileInputRef" 
                 accept="image/*" 
                 class="hidden-input"
                 @change="handleFileUpload"
               />
            </div>

            <p class="modal-hint">
              Моя открытка в Корж 🎄{{ ticket }}<br>
              Поделиться: [cffx.ru/korzh](https://cffx.ru/korzh)
            </p>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed, nextTick } from 'vue';

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  allText: String,
  badgeImage: String // Пропс для картинки бейджа
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);
const customBgImage = ref(null); // Для хранения пользовательского фона
const fileInputRef = ref(null);
const canShare = ref(false);

// Проверка поддержки Web Share API
if (typeof navigator !== 'undefined') {
   canShare.value = !!(navigator.share && navigator.canShare);
}

// Мягкая логика текста
const formattedText = computed(() => {
  if (!props.allText || !props.allText.trim()) return '';
  
  let text = props.allText.trim();
  text = text.replace(/([.,!?;:])([^\s])/g, '$1 $2');
  text = text.replace(/\s+/g, ' ');
  text = text.charAt(0).toUpperCase() + text.slice(1);
  text = text.replace(/([.!?]\s+)([а-яёa-z])/gi, (m, sep, ch) => sep + ch.toUpperCase());
  if (!/[.!?]$/.test(text)) text += '.';
  return text;
});

const bgClass = computed(() => {
  const a = props.address || '';
  if (a.includes('Куйбышева')) return 'bg-1';
  if (a.includes('Льва Толстого')) return 'bg-2';
  if (a.includes('Революционная')) return 'bg-3';
  if (a.includes('9 просека')) return 'bg-4';
  if (a.includes('Самарская')) return 'bg-5';
  if (a.includes('Дачная')) return 'bg-6';
  if (a.includes('Ульяновская')) return 'bg-7';
  if (a.includes('Ново-Садовая')) return 'bg-8';
  return 'bg-default';
});

// Загрузчик библиотеки html2canvas (CDN)
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
      backup.onerror = () => reject(new Error('Failed'));
      document.head.appendChild(backup);
    };
    document.head.appendChild(script);
  });
};

// Функция генерации изображения
const generateImageInternal = async () => {
  generatedImageUrl.value = null; // Сброс превью
  try {
    await loadLibrary();
    // Ждем отрисовки фона (если он сменился)
    await nextTick();
    await new Promise(r => setTimeout(r, 500)); // Небольшая пауза для рендера картинок

    const el = document.getElementById('story-capture-area');
    if (!el) return;
    
    const canvas = await window.html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true, // Разрешаем "грязный" canvas для внешних картинок (важно для пользовательских фото)
      logging: false,
      width: 1080,
      height: 1920,
      windowWidth: 1080,
      windowHeight: 1920,
      backgroundColor: null
    });
    
    generatedImageUrl.value = canvas.toDataURL('image/png');
    canvas.toBlob(b => { generatedBlob.value = b; }, 'image/png');
  } catch (e) {
    console.error('Error generating image:', e);
    alert('Ошибка генерации открытки.');
  }
};

const generateAndShare = async () => {
  showModal.value = true;
  customBgImage.value = null; // Сброс фона при новом открытии
  await generateImageInternal();
};

// Обработка загрузки файла
const triggerFileUpload = () => {
  fileInputRef.value.click();
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      customBgImage.value = e.target.result;
      // После установки фона, перегенерируем canvas
      await generateImageInternal();
    }
    reader.readAsDataURL(file);
  }
}

const shareOrDownload = async () => {
  if (!generatedBlob.value) return;
  
  if (canShare.value) {
    const file = new File([generatedBlob.value], `korzh-card-${props.ticket}.png`, { type: 'image/png' });
    try {
      await navigator.share({ 
         title: 'Моя открытка',
         files: [file] 
      });
      return;
    } catch (err) {
      console.log('Share cancelled or failed', err);
    }
  }
  // Фолбек на скачивание
  downloadFile();
};

const downloadFile = () => {
  if (!generatedImageUrl.value) return;
  const link = document.createElement('a');
  link.download = `korzh-card-${props.ticket}.png`;
  link.href = generatedImageUrl.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const closeModal = () => { showModal.value = false; };

defineExpose({ generateAndShare });
</script>

<style scoped>
/* Сброс стилей внутри компонента */
* { font-family: 'Montserrat', 'Inter', sans-serif; box-sizing: border-box; }

.story-wrapper-hidden { position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -9999; opacity: 0; }
.story-template { 
  width: 1080px; height: 1920px; 
  position: relative; 
  background: #000; color: #fff; 
  overflow: hidden;
}

/* ФОНЫ */
.story-bg-image { 
  position: absolute; inset: 0; z-index: 1; 
  background-size: cover; background-position: center; 
}
.story-bg-image.bg-default { background-image: url('https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg'); }
.story-bg-image.bg-1 { background-image: url('/img/korzh/korzh-kuybisheva103-1080x1920(2).jpg'); }
.story-bg-image.bg-2 { background-image: url('/img/korzh/korzh-lva-tolstogo-1080x1920.jpg'); }
.story-bg-image.bg-3 { background-image: url('/img/korzh/korzh-revolucionnaya-1080x1920.jpg'); }
.story-bg-image.bg-4 { background-image: url('/img/korzh/korzh-9proseka-1080x1920.jpg'); }
.story-bg-image.bg-5 { background-image: url('/img/korzh/korzh-samarskaya-1080x1920.jpg'); }
.story-bg-image.bg-6 { background-image: url('/img/korzh/korzh-dachnaya-1080x1920.jpg'); }
.story-bg-image.bg-7 { background-image: url('/img/korzh/korzh-ulyanovskaya-1080x1920.jpg'); }
.story-bg-image.bg-8 { background-image: url('/img/korzh/korzh-novo-sadovaya-1080x1920.jpg'); }

/* МАСКА (Более темная снизу для текста) */
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(65, 45, 100, 0.2) 0%,
    rgba(40, 30, 70, 0.4) 50%,
    rgba(20, 15, 30, 0.9) 100%
  );
}

/* Контейнер */
.story-content {
  position: relative; z-index: 10; width: 100%; height: 100%;
  padding: 180px 60px 180px 60px;
  display: flex; flex-direction: column; align-items: center;
}

/* ВЕРХ */
.story-header { 
  margin-top: 60px; 
  display: flex; flex-direction: column; align-items: center; 
  gap: 30px;
  text-align: center; width: 100%;
  position: relative;
}

.big-k-bg {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 500px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.05);
  z-index: -1;
  pointer-events: none;
}

.story-main-title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1; 
  letter-spacing: 0.05em;
  margin: 0; text-transform: uppercase; color: #fff; 
  text-shadow: 0 4px 30px rgba(0,0,0,0.5);
  font-family: 'Montserrat', sans-serif;
}

/* ПЛАШКА С НОМЕРОМ */
.glass-pill-info {
  display: inline-flex; align-items: center; gap: 26px;
  padding: 18px 50px;
  border-radius: 100px;
  font-size: 36px; font-weight: 600; 
  
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

.info-icon   { font-size: 40px; line-height: 1; }
.info-ticket { color: #fff; letter-spacing: 0.1em; }
.info-divider{ color: rgba(255,255,255,0.4); }
.info-date   { color: #fff; opacity: 0.9; }

.story-address { 
  font-size: 38px; font-weight: 500; color: rgba(255,255,255,0.8); 
  letter-spacing: 0.02em; text-transform: uppercase;
}

/* ЦЕНТР */
.story-body {
  flex: 1;
  width: 100%; 
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  margin-bottom: 50px;
}

/* КАРТОЧКА ОТЗЫВА */
.text-card {
  width: 95%; 
  border-radius: 40px;
  padding: 60px 50px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.text-content {
  margin: 0; 
  font-size: 52px;
  font-weight: 500;
  line-height: 1.4; 
  color: #fff;
  text-align: center; 
}

/* БЕЙДЖ */
.story-badge-container {
  position: absolute;
  bottom: 480px; /* Позиционируем над кнопкой */
  left: 50%;
  transform: translateX(-50%) rotate(-6deg); /* Поворот для небрежности */
  z-index: 40; /* Поверх всего */
  filter: drop-shadow(0 15px 30px rgba(0,0,0,0.5));
}

.story-badge-img {
  width: 350px; /* Крупный размер для 1080px */
  height: 350px;
  object-fit: contain;
}

/* НИЖНИЙ ГРАДИЕНТ */
.bottom-gradient {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 800px; z-index: 20;
  background: linear-gradient(to bottom, transparent 0%, #100a18 100%);
  pointer-events: none;
}

/* ФУТЕР */
.story-footer { 
  position: absolute;
  bottom: 180px;
  left: 0;
  width: 100%;
  z-index: 50; 
  display: flex; flex-direction: column; align-items: center; gap: 30px; 
}

.link-button {
  border-radius: 100px; 
  padding: 24px 140px;
  background: #E0D4EC;
  color: #1A1A1A;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.btn-text {
  font-size: 44px;
  font-weight: 700; 
  letter-spacing: 0.02em;
}

.footer-tagline {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* МОДАЛКА */
.modal-overlay { 
  position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 10000;
  display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); padding: 20px;
}
.modal { 
  background: #1E1E20; width: 100%; max-width: 420px; max-height: 90vh;
  border-radius: 24px; border: 1px solid #333; display: flex; flex-direction: column;
  box-shadow: 0 40px 100px rgba(0,0,0,0.8); overflow: hidden;
}
.modal-header { 
  padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #333; background: #252528;
}
.modal-header h3 { margin: 0; font-size: 16px; color: #fff; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.modal-close { 
  background: rgba(255,255,255,0.1); border: none; color: #fff; 
  width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}
.modal-body { 
  background: #121212; flex-grow: 1; min-height: 200px;
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.preview-img { max-width: 100%; max-height: 55vh; object-fit: contain; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

/* Спиннер */
.simple-loader {
  border: 4px solid #333;
  border-top: 4px solid #9B7FB7;
  border-radius: 50%;
  width: 40px; height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.spinner { display: flex; flex-direction: column; align-items: center; }
.spinner-text { color: #888; font-size: 14px; }

.modal-footer { 
  padding: 20px; background: #252528; border-top: 1px solid #333;
  display: flex; flex-direction: column; gap: 12px; align-items: center;
}

.buttons-row {
  display: flex; gap: 10px; width: 100%;
}
.download-btn { 
  flex: 1; padding: 14px; border-radius: 12px; border: none;
  font-weight: 600; font-size: 15px; cursor: pointer; transition: transform 0.2s;
}
.primary-btn { background: #9B7FB7; color: #fff; }
.secondary-btn { background: #444; color: #ccc; }
.download-btn:active { transform: scale(0.98); }
.download-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.upload-section { width: 100%; display: flex; justify-content: center; }
.upload-btn {
  background: transparent; border: 1px dashed #555; color: #aaa;
  padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px;
}
.upload-btn:hover { color: #fff; border-color: #888; }
.hidden-input { display: none; }

.modal-hint { color: #666; font-size: 12px; margin: 0; text-align: center; line-height: 1.4; }
.modal-hint a { color: #888; text-decoration: none; }
</style>
