<template>
  <div>
    <!-- Шрифт Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- СКРЫТЫЙ ШАБЛОН (1080x1920) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        
        <!-- ФОН (Меньше блюра, чтобы угадывалась локация) -->
        <div 
          class="story-bg-image" 
          :class="!customBgImage ? bgClass : ''"
          :style="customBgImage ? { backgroundImage: `url(${customBgImage})` } : {}"
        ></div>
        
        <!-- ШУМ (Зернистость) -->
        <div class="story-noise"></div>

        <!-- Легкое затемнение, чтобы текст читался, но фон был виден -->
        <div class="story-bg-overlay"></div>

        <div class="story-content">

          <!-- 1. ВЕРХНЯЯ ДАТА-КАПСУЛА -->
          <div class="date-capsule">
             <span class="capsule-icon">🍬</span>
             <span class="capsule-text">Открытка #{{ ticket }}</span>
             <span class="capsule-dot">•</span>
             <span class="capsule-date">{{ date }}</span>
          </div>

          <!-- 2. ЗАГОЛОВОК -->
          <div class="header-text">
             Вы превратили этот момент в<br>уникальное воспоминание
          </div>

          <!-- 3. ГЛАВНАЯ "ПОДАРОЧНАЯ КАРТА" (Glassmorphism) -->
          <div class="gift-card-container">
            
            <!-- ЛЕНТА "ПОДАРОК" -->
            <div class="corner-ribbon">
               <span>ПОДАРОК</span>
            </div>

            <!-- ИЗОБРАЖЕНИЕ ПОДАРКА -->
            <div class="gift-image-wrapper">
               <div class="gift-glow"></div>
               <img v-if="badgeImage" :src="badgeImage" class="gift-main-img" alt="Gift" crossorigin="anonymous" />
            </div>

            <!-- ТЕКСТОВЫЙ БЛОК -->
            <div class="gift-info-block">
                <div class="gift-title">Подарок от Гостя</div>
                
                <div v-if="badgeLabel" class="gift-name">
                   {{ badgeLabel }}
                </div>

                <div class="location-row">
                   <span class="loc-icon">📍</span>
                   <span class="loc-text">{{ address || 'Все кофейни' }}</span>
                </div>
                
                <!-- ЦИТАТА (Без плашки, с фейдом) -->
                <div v-if="formattedText" class="message-text-wrapper">
                   <div class="message-text">"{{ formattedText }}"</div>
                   <!-- Градиент снизу, если текст длинный (визуальный эффект) -->
                   <div class="text-fade-bottom"></div> 
                </div>
            </div>

          </div>

          <!-- НИЗ: ССЫЛКА И СЛОГАН -->
          <div class="footer-group">
             <div class="site-link">cffx.ru/korzh</div>
             <div class="bottom-tagline">ПОДЕЛИТЕСЬ НАСТРОЕНИЕМ</div>
          </div>

        </div>
      </div>
    </div>

    <!-- ... (Модалка без изменений) ... -->
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
              <img src="/favicon.svg" class="spinner-icon" alt="⚡️" />
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
            
            <div class="upload-section">
               <button class="text-btn upload-btn" @click="triggerFileUpload">
                  Загрузить свое фото
               </button>
               <input type="file" ref="fileInputRef" accept="image/*" class="hidden-input" @change="handleFileUpload" />
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
// ... (Скрипт без изменений, вся логика остается той же)
import { ref, defineExpose, computed, nextTick } from 'vue';

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  allText: String,
  badgeImage: String,
  badgeLabel: String
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

const formattedText = computed(() => {
  if (!props.allText || !props.allText.trim()) return '';
  let text = props.allText.trim();
  text = text.replace(/([.,!?;:])([^\s])/g, '$1 $2');
  text = text.replace(/\s+/g, ' ');
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text.length > 140 ? text.slice(0, 137) + '...' : text; // Чуть больше текста влезает без кнопки
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
    await new Promise(r => setTimeout(r, 600)); 

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
* { font-family: 'Inter', -apple-system, sans-serif; box-sizing: border-box; }

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
  filter: blur(8px); /* Уменьшили блюр */
  transform: scale(1.05); /* Чуть меньше зум */
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

/* ШУМ (Grain) */
.story-noise {
  position: absolute; inset: 0; z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
  opacity: 0.6; mix-blend-mode: overlay; pointer-events: none;
}

/* ОВЕРЛЕЙ (Легкий) */
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 3;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);
}

.story-content {
  position: relative; z-index: 10; width: 100%; height: 100%;
  padding: 140px 60px 100px 60px;
  display: flex; flex-direction: column; align-items: center;
}

/* 1. КАПСУЛА С ДАТОЙ */
.date-capsule {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 40px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.15); /* Светлая прозрачность */
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.2);
  margin-bottom: 50px;
}
.capsule-icon { font-size: 32px; }
.capsule-text { font-size: 28px; font-weight: 600; color: #fff; letter-spacing: 0.02em; }
.capsule-dot { font-size: 28px; color: rgba(255,255,255,0.6); }
.capsule-date { font-size: 28px; font-weight: 500; color: rgba(255,255,255,0.9); }

/* 2. ЗАГОЛОВОК */
.header-text {
  font-size: 36px; line-height: 1.4; text-align: center; color: #fff; font-weight: 500;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5); margin-bottom: 50px; opacity: 1;
}

/* 3. КАРТОЧКА (Полупрозрачная) */
.gift-card-container {
  width: 100%; max-width: 860px;
  /* Полупрозрачный градиент */
  background: linear-gradient(135deg, rgba(168, 139, 235, 0.65) 0%, rgba(241, 150, 199, 0.65) 100%);
  backdrop-filter: blur(30px) saturate(140%); /* Эффект матового стекла */
  border-radius: 60px;
  padding: 80px 50px 80px 50px;
  position: relative;
  box-shadow: 0 30px 80px rgba(0,0,0,0.25);
  display: flex; flex-direction: column; align-items: center;
  border: 2px solid rgba(255,255,255,0.3);
}

.corner-ribbon {
  position: absolute; top: 60px; right: -60px;
  background: rgba(255,255,255,0.9);
  width: 300px; height: 60px;
  transform: rotate(45deg);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  color: #8561C5;
}
.corner-ribbon span {
  font-size: 24px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
}

.gift-image-wrapper {
  position: relative; width: 500px; height: 500px; margin-bottom: 20px;
}
.gift-glow {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%); opacity: 0.7; z-index: 1;
}
.gift-main-img {
  width: 100%; height: 100%; object-fit: contain; z-index: 2; position: relative;
  filter: drop-shadow(0 20px 50px rgba(0,0,0,0.4));
}

/* ИНФО БЛОК */
.gift-info-block {
  width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center;
}
.gift-title { font-size: 32px; font-weight: 600; color: rgba(255,255,255,0.95); margin-bottom: 12px; }
.gift-name {
  font-size: 64px; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: 0.02em;
  text-shadow: 0 4px 20px rgba(0,0,0,0.2); margin-bottom: 40px;
}

.location-row {
  display: flex; align-items: center; gap: 12px; margin-bottom: 40px;
  background: rgba(0,0,0,0.15); padding: 12px 30px; border-radius: 50px;
}
.loc-icon { font-size: 32px; }
.loc-text { font-size: 32px; color: #fff; font-weight: 600; }

.message-text-wrapper {
  position: relative; width: 100%;
}
.message-text {
  font-size: 38px; line-height: 1.4; color: #fff; font-style: italic; font-weight: 500;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.text-fade-bottom {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.0) 0%); /* Можно включить если нужно обрезать */
  display: none; 
}

/* НИЗ */
.footer-group {
  margin-top: auto; display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.site-link {
  font-size: 28px; font-weight: 500; color: rgba(255,255,255,0.5); letter-spacing: 0.05em;
}
.bottom-tagline {
  font-size: 36px; font-weight: 700; color: #fff; letter-spacing: 0.15em; text-transform: uppercase;
  text-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

/* МОДАЛКА - стили остаются прежними */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); padding: 20px; }
.modal { background: #1E1E20; width: 100%; max-width: 420px; max-height: 95vh; border-radius: 28px; border: 1px solid #333; display: flex; flex-direction: column; box-shadow: 0 30px 80px rgba(0,0,0,0.7); overflow: hidden; }
.modal-header { padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; background: #252528; }
.modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }
.modal-close { background: rgba(255,255,255,0.1); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.modal-body { background: #000; flex-grow: 1; min-height: 200px; display: flex; align-items: center; justify-content: center; padding: 20px; }
.preview-img { max-width: 100%; max-height: 60vh; object-fit: contain; border-radius: 12px; }
.spinner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.spinner-icon { width: 48px; height: 48px; animation: breathe 3s ease-in-out infinite; }
.spinner-text { color: #888; font-size: 14px; }
.modal-footer { padding: 24px; background: #252528; border-top: 1px solid #333; display: flex; flex-direction: column; gap: 14px; align-items: center; }
.buttons-row { display: flex; gap: 10px; width: 100%; }
.download-btn { flex: 1; padding: 14px; border-radius: 12px; border: none; font-weight: 600; font-size: 15px; cursor: pointer; transition: transform 0.2s; }
.primary-btn { background: #9B7FB7; color: #fff; }
.secondary-btn { background: #444; color: #ccc; }
.upload-section { width: 100%; display: flex; justify-content: center; }
.upload-btn { background: transparent; border: 1px dashed #555; color: #aaa; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; }
.hidden-input { display: none; }
.modal-hint { color: #888; font-size: 13px; margin: 0; text-align: center; line-height: 1.4; max-width: 90%; }
@keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }
</style>
