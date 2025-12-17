<template>
  <div>
    <!-- Шрифт Inter (оригинальный) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- СКРЫТЫЙ ШАБЛОН (1080x1920) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        
        <!-- ФОН (Динамический: либо дефолтный класс, либо пользовательская картинка) -->
        <div 
          class="story-bg-image" 
          :class="!customBgImage ? bgClass : ''"
          :style="customBgImage ? { backgroundImage: `url(${customBgImage})` } : {}"
        ></div>
        
        <!-- МАСКА (Оригинальная) -->
        <div class="story-bg-overlay"></div>

        <!-- Контент -->
        <div class="story-content">
          
          <!-- Большая буква К (фоновая, как в оригинале) -->
          <div class="big-k-bg">K</div>

          <!-- ВЕРХ -->
          <div class="story-header">
            <h1 class="story-main-title">МОЙ СИГНАЛ<br>В КОРЖ</h1>

            <div class="story-info-row">
              <div class="glass-pill-info">
                <span class="info-icon">⚡️</span> <!-- Вернули молнию -->
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

          <!-- БЕЙДЖ (Новый элемент, вписанный в старый дизайн) -->
          <div v-if="badgeImage" class="story-badge-container">
             <img :src="badgeImage" class="story-badge-img" alt="Badge" />
          </div>

          <!-- НИЖНИЙ ГРАДИЕНТ -->
          <div class="bottom-gradient"></div>

          <!-- ФУТЕР (Оригинальный) -->
          <div class="story-footer">
            <div class="link-button">
               <span class="btn-text">cffx.ru/korzh</span>
            </div>
            <div class="footer-tagline">Ваш Сигнал – тому кто решает</div>
          </div>

        </div>
      </div>
    </div>

    <!-- МОДАЛКА -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          
          <div class="modal-header">
            <h3>Ваша история готова</h3>
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
              <!-- Вернули иконку сигнала в прелоадер -->
              <img src="/favicon.svg" class="spinner-icon" alt="⚡️" />
              <div class="spinner-text">Создаем магию...</div>
            </div>
          </div>

          <div class="modal-footer">
            <!-- Кнопки управления (новые) -->
            <div class="buttons-row">
               <button @click="shareOrDownload" class="download-btn primary-btn" :disabled="!generatedImageUrl">
                 {{ canShare ? 'Поделиться' : 'Скачать' }}
               </button>
               <button @click="downloadFile" class="download-btn secondary-btn" :disabled="!generatedImageUrl" v-if="canShare">
                 Скачать
               </button>
            </div>

            <!-- Загрузка фона (новая фича) -->
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
              Мой Сигнал в Корж ⚡️{{ ticket }}<br>
              Отправить Сигнал: [https://cffx.ru/korzh](https://cffx.ru/korzh)
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
const customBgImage = ref(null);
const fileInputRef = ref(null);
const canShare = ref(false);

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

const generateImageInternal = async () => {
  generatedImageUrl.value = null;
  try {
    await loadLibrary();
    await nextTick();
    await new Promise(r => setTimeout(r, 500)); 

    const el = document.getElementById('story-capture-area');
    if (!el) return;
    
    const canvas = await window.html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
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
    alert('Ошибка генерации.');
  }
};

const generateAndShare = async () => {
  showModal.value = true;
  customBgImage.value = null; 
  await generateImageInternal();
};

const triggerFileUpload = () => {
  fileInputRef.value.click();
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      customBgImage.value = e.target.result;
      await generateImageInternal();
    }
    reader.readAsDataURL(file);
  }
}

const shareOrDownload = async () => {
  if (!generatedBlob.value) return;
  if (canShare.value) {
    const file = new File([generatedBlob.value], `signal-${props.ticket}.png`, { type: 'image/png' });
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (err) {
      console.log('Share cancelled');
    }
  }
  downloadFile();
};

const downloadFile = () => {
  if (!generatedImageUrl.value) return;
  const link = document.createElement('a');
  link.download = `signal-${props.ticket}.png`;
  link.href = generatedImageUrl.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const closeModal = () => { showModal.value = false; };

defineExpose({ generateAndShare });
</script>

<style scoped>
/* Сброс стилей: шрифт Inter */
* { font-family: 'Inter', -apple-system, sans-serif; box-sizing: border-box; }

.story-wrapper-hidden { position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -9999; opacity: 0; }
.story-template { 
  width: 1080px; height: 1920px; 
  position: relative; 
  background: #000; color: #fff; 
  overflow: hidden;
}

/* ФОНЫ */
.story-bg-image { position: absolute; inset: 0; z-index: 1; background-size: cover; background-position: center; }
.story-bg-image.bg-default { background-image: url('https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg'); }
.story-bg-image.bg-1 { background-image: url('/img/korzh/korzh-kuybisheva103-1080x1920(2).jpg'); }
.story-bg-image.bg-2 { background-image: url('/img/korzh/korzh-lva-tolstogo-1080x1920.jpg'); }
.story-bg-image.bg-3 { background-image: url('/img/korzh/korzh-revolucionnaya-1080x1920.jpg'); }
.story-bg-image.bg-4 { background-image: url('/img/korzh/korzh-9proseka-1080x1920.jpg'); }
.story-bg-image.bg-5 { background-image: url('/img/korzh/korzh-samarskaya-1080x1920.jpg'); }
.story-bg-image.bg-6 { background-image: url('/img/korzh/korzh-dachnaya-1080x1920.jpg'); }
.story-bg-image.bg-7 { background-image: url('/img/korzh/korzh-ulyanovskaya-1080x1920.jpg'); }
.story-bg-image.bg-8 { background-image: url('/img/korzh/korzh-novo-sadovaya-1080x1920.jpg'); }

/* МАСКА (Оригинальная) */
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(65, 45, 100, 0.35) 0%,
    rgba(40, 30, 70, 0.6) 60%,
    #1A1025 100%
  );
  mix-blend-mode: multiply;
}

/* Большая буква К (фоновая) - восстановлена */
.big-k-bg {
  position: absolute;
  top: 40px;
  left: 30px;
  font-size: 600px;
  font-weight: 800;
  color: rgba(179, 157, 200, 0.25); 
  z-index: 5;
  line-height: 1;
  pointer-events: none;
}

/* Контейнер */
.story-content {
  position: relative; z-index: 10; width: 100%; height: 100%;
  padding: 280px 60px 180px 60px; /* Отступы как в оригинале */
  display: flex; flex-direction: column; align-items: center;
}

/* ВЕРХ */
.story-header { 
  margin-top: 40px; 
  display: flex; flex-direction: column; align-items: center; 
  gap: 30px;
  text-align: center; width: 100%;
}

.story-main-title {
  font-size: 66px;
  font-weight: 400;
  line-height: 1.2; 
  letter-spacing: 0.20em;
  margin: 0; text-transform: uppercase; color: #fff; 
  text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}

/* ПЛАШКА С НОМЕРОМ */
.glass-pill-info {
  display: inline-flex; align-items: center; gap: 26px;
  padding: 20px 48px;
  border-radius: 100px;
  font-size: 34px; font-weight: 400; 
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(35px);
  border: 1px solid rgba(224, 215, 248, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.info-icon   { font-size: 40px; line-height: 1; }
.info-ticket { color: #ffffff; letter-spacing: 0.1em; font-weight: 500; }
.info-divider{ color: rgba(255,255,255,0.6); }
.info-date   { color: #ffffff; letter-spacing: 0.06em; }

.story-address { 
  font-size: 40px; font-weight: 500; color: rgba(255,255,255,0.95); 
  letter-spacing: 0.05em; text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

/* ЦЕНТР */
.story-body {
  flex: 1;
  width: 100%; 
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
  padding-top: 56px;
}

/* КАРТОЧКА ОТЗЫВА (Оригинальная: широкая, с рамкой) */
.text-card {
  width: 98%; 
  border-radius: 48px;
  padding: 54px 44px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: 2px solid rgba(220, 210, 255, 0.65);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
}

.text-content {
  margin: 0; 
  font-size: 48px;
  font-weight: 400;
  line-height: 1.4; 
  color: #E8DDFF;
  text-align: center; 
  letter-spacing: 0.01em;
  text-shadow: 0 0 15px rgba(180, 150, 255, 0.35); 
}

/* БЕЙДЖ (Вписан в старую структуру) */
.story-badge-container {
  position: absolute;
  bottom: 400px; /* Позиционируем над футером */
  left: 50%;
  transform: translateX(-50%) rotate(-6deg);
  z-index: 40;
  filter: drop-shadow(0 15px 30px rgba(0,0,0,0.5));
}

.story-badge-img {
  width: 380px; /* Крупный бейдж */
  height: 380px;
  object-fit: contain;
}

/* НИЖНИЙ ГРАДИЕНТ */
.bottom-gradient {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 900px; z-index: 20;
  background: linear-gradient(to bottom, transparent 0%, rgba(20, 10, 30, 0.9) 55%, #0F0518 100%);
  pointer-events: none;
}

/* ФУТЕР (Оригинальный) */
.story-footer { 
  position: absolute;
  bottom: 220px;
  left: 0;
  width: 100%;
  z-index: 50; 
  display: flex; flex-direction: column; align-items: center; gap: 26px; 
}

.link-button {
  border-radius: 100px; 
  padding: 20px 170px;
  display: flex; align-items: center; justify-content: center;
  background: #D9D0F0;
  box-shadow: 0 16px 50px rgba(160, 130, 220, 0.4);
}

.btn-text {
  font-size: 46px;
  font-weight: 700; 
  color: #1A1A1A;   
  letter-spacing: 0.01em;
}

.footer-tagline {
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-align: center;
  color: #D9D0F0; 
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0,0,0,0.8);
}

/* МОДАЛКА */
.modal-overlay { 
  position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 10000;
  display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); padding: 20px;
}
.modal { 
  background: #1E1E20; width: 100%; max-width: 420px; max-height: 95vh;
  border-radius: 28px; border: 1px solid #333; display: flex; flex-direction: column;
  box-shadow: 0 30px 80px rgba(0,0,0,0.7); overflow: hidden;
}
.modal-header { 
  padding: 18px 24px; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #333; background: #252528;
}
.modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }
.modal-close { 
  background: rgba(255,255,255,0.1); border: none; color: #fff; 
  width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}
.modal-body { 
  background: #000; flex-grow: 1; min-height: 200px;
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.preview-img { max-width: 100%; max-height: 60vh; object-fit: contain; border-radius: 12px; }

/* Спиннер с иконкой */
.spinner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.spinner-icon { width: 48px; height: 48px; animation: breathe 3s ease-in-out infinite; }
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50%      { transform: scale(1.1); opacity: 1; }
}
.spinner-text { color: #888; font-size: 14px; }

.modal-footer { 
  padding: 24px; background: #252528; border-top: 1px solid #333;
  display: flex; flex-direction: column; gap: 14px; align-items: center;
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

.modal-hint { color: #888; font-size: 13px; margin: 0; text-align: center; line-height: 1.4; max-width: 90%; }
.modal-hint a { color: #888; text-decoration: none; }
</style>
