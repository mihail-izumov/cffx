<template>
  <div>
    <!-- Шрифт Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- СКРЫТЫЙ ШАБЛОН (1080x1920) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        
        <!-- ФОН (Базовый) -->
        <div class="story-bg-base"></div>

        <!-- ФОН-КАРТИНКА -->
        <div 
          :key="bgKey"
          class="story-bg-image" 
          :class="!customBgImage ? bgClass : ''"
          :style="customBgImage ? { backgroundImage: `url(${customBgImage})` } : {}"
        ></div>
        
        <!-- ШУМ (Grain) -->
        <div class="story-noise"></div>

        <!-- ОВЕРЛЕЙ -->
        <div class="story-bg-overlay"></div>

        <div class="story-content">

          <!-- ВЕРХНИЙ ЗАГОЛОВОК -->
          <div class="header-text">
             Вы превратили этот момент в<br>уникальное воспоминание
          </div>

          <!-- КАРТОЧКА ПОДАРКА -->
          <div class="gift-card-container">
            
            <!-- ЛОКАЦИЯ (Внутри карточки, левый верхний угол) -->
            <div class="card-inner-location">
              {{ address || 'Все кофейни' }}
            </div>

            <!-- ЛЕНТА-УГОЛОК (Темный объемный треугольник) -->
            <div class="corner-tag-triangle">
               <span>GIFT</span>
            </div>

            <!-- ИЗОБРАЖЕНИЕ -->
            <div class="gift-image-wrapper">
               <div class="gift-glow"></div>
               <img v-if="badgeImage" :src="badgeImage" class="gift-main-img" alt="Gift" crossorigin="anonymous" />
            </div>

            <!-- ИНФО БЛОК -->
            <div class="gift-info-block">
                
                <!-- ОТ КОГО (Со склонением) -->
                <div class="meta-from">
                   Подарок от {{ formattedName }}
                </div>
                
                <!-- НАЗВАНИЕ ПОДАРКА -->
                <div class="gift-name" v-if="badgeLabel">
                   {{ badgeLabel }}
                </div>

                <!-- НОМЕР И ДАТА (Градиент, непрозрачный, по центру) -->
                <div class="meta-gradient-badge">
                   <span class="mb-icon">🎁</span>
                   <span class="mb-num">{{ ticket }}</span>
                   <span class="mb-sep">•</span>
                   <span class="mb-date">{{ date }}</span>
                </div>

            </div>
            
            <div class="card-bottom-spacer"></div>
          </div>

          <!-- ОТДЕЛЬНАЯ КАРТОЧКА СООБЩЕНИЯ -->
          <div v-if="formattedText" class="message-card-container">
             <div class="message-header">Делюсь настроением:</div>
             <div class="message-body">
                {{ formattedText }}
             </div>
          </div>

          <!-- FOOTER (Крупнее и выше) -->
          <div class="story-footer-text">
             Сделано в Сигнале
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
               <button class="text-btn upload-btn" @click.prevent="triggerFileUpload">
                  Загрузить свое фото
               </button>
               <!-- Скрытый инпут -->
               <input 
                  type="file" 
                  ref="fileInputRef" 
                  accept="image/*" 
                  style="display: none;" 
                  @change="handleFileUpload" 
               />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed, nextTick, watch } from 'vue';

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  allText: String,
  badgeImage: String,
  badgeLabel: String,
  userName: String 
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);
const customBgImage = ref(null);
const fileInputRef = ref(null);
const bgKey = ref(0); 
const canShare = ref(false);

if (typeof navigator !== 'undefined') {
   canShare.value = !!(navigator.share && navigator.canShare);
}

watch(customBgImage, () => {
  bgKey.value++;
  generatedImageUrl.value = null;
});

// === ЛОГИКА СКЛОНЕНИЯ ИМЕНИ ===
function getGenitiveName(name) {
  if (!name) return 'Гостя';
  const n = name.trim();
  if (!n) return 'Гостя';

  // Простая эвристика для русского языка (Родительный падеж)
  const lastChar = n.slice(-1).toLowerCase();
  // const lastTwo = n.slice(-2).toLowerCase(); // можно расширить для 'ия' -> 'ии'

  // Женские и мягкие окончания
  if (lastChar === 'а') return n.slice(0, -1) + 'ы'; // Елена -> Елены
  if (lastChar === 'я') return n.slice(0, -1) + 'и'; // Мария -> Марии, Аня -> Ани
  if (lastChar === 'ь') return n.slice(0, -1) + 'и'; // Любовь -> Любви

  // Мужские окончания
  if (lastChar === 'й') return n.slice(0, -1) + 'я'; // Андрей -> Андрея
  if (/[бвгджзклмнпрстфхцчшщ]/.test(lastChar)) return n + 'а'; // Иван -> Ивана

  // Если не попало под правила (иностранные, несклоняемые или оканчивается на гласную не а/я)
  return n; 
}

const formattedName = computed(() => {
  if (props.userName && props.userName.trim() !== '') {
    return getGenitiveName(props.userName);
  }
  return 'Гостя';
});

const formattedText = computed(() => {
  if (!props.allText || !props.allText.trim()) return '';
  let text = props.allText.trim();
  text = text.replace(/([.,!?;:])([^\s])/g, '$1 $2');
  text = text.replace(/\s+/g, ' ');
  text = text.charAt(0).toUpperCase() + text.slice(1);
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

const waitForImages = async (element) => {
  const imgs = element.querySelectorAll('img');
  const promises = Array.from(imgs).map(img => {
    if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); 
    });
  });
  await Promise.all(promises);
};

const waitForFonts = async () => {
   if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
   }
};

const generateImageInternal = async () => {
  generatedImageUrl.value = null;
  try {
    await loadLibrary();
    await nextTick();
    
    const el = document.getElementById('story-capture-area');
    if (!el) return;

    await waitForFonts();
    await waitForImages(el);
    await new Promise(r => setTimeout(r, 600));

    const canvas = await window.html2canvas(el, {
      scale: 2,
      useCORS: true, 
      allowTaint: true,
      logging: false,
      width: 1080,
      height: 1920,
      windowWidth: 1080,
      windowHeight: 1920,
      backgroundColor: null,
      ignoreElements: (element) => element.tagName === 'SCRIPT'
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
  bgKey.value++; 
  await generateImageInternal();
};

const triggerFileUpload = () => {
  // Исправлено: прямой вызов click без .stop в шаблоне, .prevent добавлен
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      customBgImage.value = e.target.result;
      setTimeout(() => {
        generateImageInternal();
      }, 500);
    }
    reader.readAsDataURL(file);
  }
  // Сброс value, чтобы можно было загрузить тот же файл повторно
  event.target.value = '';
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
.story-bg-base { position: absolute; inset: 0; background: #1a1a1a; z-index: 0; }
.story-bg-image { 
  position: absolute; inset: 0; z-index: 1; 
  background-size: cover; background-position: center; 
  filter: blur(8px); 
  transform: scale(1.05); 
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

/* ОВЕРЛЕЙ */
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 3;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%);
}

.story-content {
  position: relative; z-index: 10; width: 100%; height: 100%;
  padding: 160px 60px 100px 60px;
  display: flex; flex-direction: column; align-items: center;
}

/* ЗАГОЛОВОК */
.header-text {
  font-size: 36px; line-height: 1.4; text-align: center; color: #fff; font-weight: 500;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5); margin-bottom: 50px; margin-top: 40px;
}

/* КАРТОЧКА ПОДАРКА */
.gift-card-container {
  width: 100%; max-width: 860px;
  background: rgba(168, 139, 235, 0.65); 
  backdrop-filter: blur(35px) saturate(120%);
  border-radius: 60px;
  padding: 0; 
  position: relative;
  box-shadow: 0 40px 100px -10px rgba(0,0,0,0.3);
  display: flex; flex-direction: column; align-items: center;
  border: 4px solid rgba(255,255,255,0.3); 
  overflow: hidden; 
  margin-bottom: 30px; 
}

/* ЛОКАЦИЯ (Внутри карточки) */
.card-inner-location {
  position: absolute;
  top: 40px;
  left: 45px;
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  letter-spacing: 0.02em;
  z-index: 25;
}

/* УГОЛОК (Темный треугольник) */
.corner-tag-triangle {
  position: absolute;
  top: 0;
  right: 0;
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #2a2a2e 0%, #151515 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  z-index: 20;
  box-shadow: -5px 5px 15px rgba(0,0,0,0.5); 
}
.corner-tag-triangle span {
  position: absolute;
  top: 35px;
  right: 35px;
  transform: rotate(45deg);
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.1em;
  z-index: 21;
}

/* ИЗОБРАЖЕНИЕ */
.gift-image-wrapper {
  position: relative; width: 100%; height: 500px;
  display: flex; align-items: center; justify-content: center;
  margin-top: 40px;
}
.gift-glow {
  position: absolute; width: 450px; height: 450px; 
  background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%); opacity: 0.6;
}
.gift-main-img {
  width: 440px; height: 440px; object-fit: contain; z-index: 2; position: relative;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.35));
}

/* БЛОК ИНФОРМАЦИИ */
.gift-info-block {
  width: 100%; padding: 0 50px 40px 50px;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  position: relative; z-index: 5;
}

/* ОТ КОГО */
.meta-from {
  font-size: 30px; font-weight: 500; color: rgba(255,255,255,0.9);
  margin-bottom: 16px;
}

/* НАЗВАНИЕ */
.gift-name {
  font-size: 58px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 0.02em;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2); line-height: 1.1;
  margin-bottom: 24px;
}

/* ГРАДИЕНТНЫЙ БЛОК (НОМЕР + ДАТА) - Непрозрачный */
.meta-gradient-badge {
  display: inline-flex; align-items: center; justify-content: center; gap: 12px;
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 100%);
  padding: 12px 32px; border-radius: 50px;
  box-shadow: 0 10px 20px -5px rgba(155, 127, 183, 0.4);
}
.mb-icon { font-size: 26px; }
.mb-num { font-size: 28px; font-weight: 800; color: #fff; }
.mb-sep { font-size: 24px; color: rgba(255,255,255,0.6); }
.mb-date { font-size: 28px; font-weight: 600; color: #fff; }

/* СПЕЙСЕР ВНИЗУ ПОДАРКА */
.card-bottom-spacer { height: 40px; width: 100%; }


/* ОТДЕЛЬНАЯ КАРТОЧКА СООБЩЕНИЯ */
.message-card-container {
  width: 100%; max-width: 860px;
  background: rgba(30, 30, 35, 0.4); 
  backdrop-filter: blur(25px);
  border: 2px solid rgba(255,255,255,0.15);
  border-radius: 40px;
  padding: 40px 50px;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.message-header {
  font-size: 24px; font-weight: 600; color: rgba(255,255,255,0.6);
  margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em;
}

.message-body {
  font-size: 36px; line-height: 1.4; color: #fff; font-weight: 500;
  text-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* FOOTER (Крупнее и выше) */
.story-footer-text {
  position: absolute; bottom: 80px;
  font-size: 48px; 
  color: rgba(255,255,255,0.5);
  font-weight: 500; 
  letter-spacing: 0.02em;
}

/* МОДАЛКА */
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
@keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }
</style>
