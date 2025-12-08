<template>
  <div>
    <!-- Шрифт Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- СКРЫТЫЙ ШАБЛОН (1080x1920) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        
        <!-- ФОН -->
        <div class="story-bg-image" :class="bgClass"></div>
        <div class="story-bg-overlay"></div>

        <div class="story-content">
          
          <!-- ВЕРХ -->
          <div class="story-header">
            <h1 class="story-main-title">МОЙ СИГНАЛ<br>В КОРЖ</h1>

            <div class="story-info-row">
              <div class="glass-pill-info meta-border">
                <span class="info-icon">⚡️</span>
                <span class="info-ticket">{{ ticket }}</span>
                <span class="info-divider">|</span>
                <span class="info-date">{{ date }}</span>
              </div>
            </div>

            <div class="story-address">{{ address || 'Кофейня Корж' }}</div>
          </div>

          <!-- ЦЕНТР: ПЛАШКА ОТЗЫВА -->
          <div class="story-body">
            <div v-if="formattedText" class="text-card meta-border">
              <p class="text-content">{{ formattedText }}</p>
            </div>
          </div>

          <!-- НИЖНИЙ ГРАДИЕНТ -->
          <div class="bottom-gradient"></div>

          <!-- ФУТЕР (ФИКСИРОВАННОЕ ПОЛОЖЕНИЕ) -->
          <div class="story-footer">
            <div class="link-button meta-border">
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
              <img src="/favicon.svg" class="spinner-icon" alt="" />
              <div class="spinner-text">Создаем магию...</div>
            </div>
          </div>

          <div class="modal-footer">
            <button @click="shareOrDownload" class="download-btn" :disabled="!generatedImageUrl">
              Скачать
            </button>
            <p class="modal-hint">
              Мой Сигнал в Корж ⚡️{{ ticket }}<br>
              Отправить Сигнал: https://cffx.ru/korzh
            </p>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed } from 'vue';

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  allText: String
});

const showModal = ref(false);
const generatedImageUrl = ref(null);
const generatedBlob = ref(null);

// ПРОСТАЯ ЛОГИКА ТЕКСТА: пробелы, заглавные, точка в конце (БЕЗ авто-запятых)
const formattedText = computed(() => {
  if (!props.allText || !props.allText.trim()) return '';
  
  let text = props.allText.trim();
  
  // Пробел после знаков препинания
  text = text.replace(/([.,!?;:])([^\s])/g, '$1 $2');
  // Нормализация пробелов
  text = text.replace(/\s+/g, ' ');
  // Первая буква заглавная
  text = text.charAt(0).toUpperCase() + text.slice(1);
  // Заглавная после точки/!/? + пробел(ы)
  text = text.replace(/([.!?]\s+)([а-яёa-z])/gi, (m, sep, ch) => sep + ch.toUpperCase());
  // Точка в конце, если нет знака
  if (!/[.!?]$/.test(text)) text += '.';
  
  return text;
});

const bgClass = computed(() => {
  if (props.address?.includes('Куйбышева')) return 'bg-1';
  if (props.address?.includes('Льва Толстого')) return 'bg-2';
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

const generateAndShare = async () => {
  showModal.value = true;
  generatedImageUrl.value = null;
  try {
    await loadLibrary();
    await new Promise(r => setTimeout(r, 700));
    const el = document.getElementById('story-capture-area');
    if (!el) return;
    const canvas = await window.html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
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
    console.error('Error:', e);
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
      console.log('Share cancelled');
    }
  }
  const link = document.createElement('a');
  link.download = `signal-${props.ticket}.png`;
  link.href = generatedImageUrl.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const closeModal = () => { showModal.value = false; };

defineExpose({ generateAndShare });
</script>

<style scoped>
* { font-family: 'Inter', -apple-system, sans-serif; }

.story-wrapper-hidden { 
  position: fixed; top: 0; left: 0; width: 0; height: 0; overflow: hidden; z-index: -9999; 
}

.story-template { 
  width: 1080px; height: 1920px; position: relative; background: #000; color: #fff; 
}

/* ФОН */
.story-bg-image { 
  position: absolute; inset: 0; z-index: 1; 
  background-size: cover; background-position: center; 
}
.story-bg-image.bg-default,
.story-bg-image.bg-1,
.story-bg-image.bg-2 {
  background-image: url('https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg');
}

.story-bg-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 60%, #000 100%);
}

/* КОНТЕНТ: центрируем композицию */
.story-content {
  position: relative; z-index: 10; 
  width: 100%; height: 100%;
  padding: 200px 60px 0 60px;
  display: flex; 
  flex-direction: column; 
  align-items: center;
}

/* === ОБЩИЙ КЛАСС МЕТАМОРФОЗ-БОРДЕРА === */
.meta-border {
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  border: 1.8px solid transparent;
}

/* ======================= ВЕРХ ======================= */
.story-header { 
  display: flex; flex-direction: column; align-items: center; 
  gap: 32px;
  text-align: center; width: 100%;
}

.story-main-title {
  font-size: 68px;
  font-weight: 300;
  line-height: 1.1; 
  letter-spacing: 0.15em;
  margin: 0; 
  text-transform: uppercase; 
  color: #fff; 
  text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}

/* Плашка с номером: лёгкий светлый фон + яркая фиолетовая рамка */
.glass-pill-info {
  display: inline-flex; 
  align-items: center; 
  gap: 28px;
  padding: 22px 48px;
  border-radius: 100px;
  font-size: 36px; 
  font-weight: 400; 
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);

  /* Два слоя background: внутренний светлый + внешний градиент-рамка */
  background-image:
    linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.12)),
    linear-gradient(135deg, #E0D7F8 0%, #C1B5F0 50%, #8E7CC3 100%);
}

.info-icon   { font-size: 40px; line-height: 1; }
.info-ticket { color: #ffffff; letter-spacing: 0.1em; font-weight: 500; }
.info-divider{ color: rgba(255,255,255,0.7); }
.info-date   { color: #ffffff; letter-spacing: 0.06em; }

.story-address { 
  font-size: 40px; 
  font-weight: 500; 
  color: rgba(255,255,255,0.95); 
  letter-spacing: 0.05em; 
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

/* ======================= ЦЕНТР ======================= */
.story-body {
  flex: 1;
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: flex-start;
  padding-top: 56px;
  overflow: hidden; /* Если текст очень длинный, он обрезается, не сдвигая футер */
}

/* Карточка отзыва: светлый прозрачный фон + лёгкий сиреневый флер + метаморфоз-рамка */
.text-card {
  width: 98%; 
  border-radius: 48px;
  padding: 56px 46px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 28px 72px rgba(0,0,0,0.5);

  background-image:
    linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0.14)),
    linear-gradient(135deg, #E0D7F8 0%, #C1B5F0 50%, #8E7CC3 100%);
}

.text-content {
  margin: 0; 
  font-size: 48px;
  font-weight: 400;
  line-height: 1.4; 
  color: #F3EEFF;            /* лёгкий сиреневый оттенок для текста */
  text-align: center; 
  letter-spacing: 0.01em;
  text-shadow: 0 2px 10px rgba(0,0,0,0.25);
}

/* НИЖНИЙ ГРАДИЕНТ — чтобы длинный текст красиво уходил в тень */
.bottom-gradient {
  position: absolute; 
  bottom: 0; left: 0; 
  width: 100%; height: 900px; 
  z-index: 20;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.88) 50%, #000 100%);
  pointer-events: none;
}

/* ======================= ФУТЕР (ФИКСИРОВАННЫЙ) ======================= */
.story-footer { 
  position: absolute;
  bottom: 160px;  /* Фиксируем положение относительно низа шаблона */
  left: 0;
  width: 100%;
  z-index: 30; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 28px; 
}

/* Кнопка: градиентная заливка внутри + метаморфоз-рамка снаружи */
.link-button {
  border-radius: 100px; 
  padding: 22px 170px;
  display: flex; 
  align-items: center; 
  justify-content: center;

  background-image:
    linear-gradient(90deg, #E0D7F8 0%, #C1B5F0 100%),
    linear-gradient(135deg, #E0D7F8 0%, #C1B5F0 50%, #8E7CC3 100%);
  box-shadow: 0 18px 52px rgba(142,124,195,0.35);
}

.btn-text {
  font-size: 48px;
  font-weight: 600; 
  color: #1a1a1a; 
  letter-spacing: 0.02em;
}

/* Текст под кнопкой */
.footer-tagline {
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-align: center;
  color: #E0D7F8;
  opacity: 0.9;
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
}

/* ======================= МОДАЛКА ======================= */
.modal-overlay { 
  position: fixed; inset: 0; 
  background: rgba(0,0,0,0.92); 
  z-index: 10000;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  backdrop-filter: blur(10px); 
  padding: 20px;
}

.modal { 
  background: #1E1E20; 
  width: 100%; 
  max-width: 420px; 
  max-height: 95vh;
  border-radius: 28px; 
  border: 1px solid #333; 
  display: flex; 
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(0,0,0,0.7); 
  overflow: hidden;
}

.modal-header { 
  padding: 18px 24px; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  border-bottom: 1px solid #333; 
  background: #252528;
}

.modal-header h3 { 
  margin: 0; 
  font-size: 18px; 
  color: #fff; 
  font-weight: 600; 
}

.modal-close { 
  background: rgba(255,255,255,0.1); 
  border: none; 
  color: #fff; 
  width: 32px; 
  height: 32px; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  cursor: pointer;
}

.modal-body { 
  background: #000; 
  flex-grow: 1; 
  min-height: 200px;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding: 20px;
}

.preview-img { 
  max-width: 100%; 
  max-height: 60vh; 
  object-fit: contain; 
  border-radius: 12px; 
}

.spinner { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 16px; 
}

.spinner-icon { 
  width: 48px; 
  height: 48px; 
  animation: breathe 3s ease-in-out infinite; 
}

.spinner-text { 
  color: #888; 
  font-size: 14px; 
}

.modal-footer { 
  padding: 24px; 
  background: #252528; 
  border-top: 1px solid #333;
  display: flex; 
  flex-direction: column; 
  gap: 14px; 
  align-items: center;
}

.download-btn { 
  width: 100%; 
  padding: 16px; 
  border-radius: 14px; 
  border: none;
  font-weight: 600; 
  font-size: 16px; 
  cursor: pointer; 
  background: #fff; 
  color: #000;
  transition: transform 0.2s;
}

.download-btn:hover:not(:disabled) { 
  transform: scale(1.02); 
}

.download-btn:disabled { 
  opacity: 0.5; 
  cursor: not-allowed; 
}

.modal-hint { 
  color: #888; 
  font-size: 13px; 
  margin: 0; 
  text-align: center; 
  line-height: 1.4; 
  max-width: 90%; 
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50%      { transform: scale(1.1); opacity: 1; }
}
</style>
