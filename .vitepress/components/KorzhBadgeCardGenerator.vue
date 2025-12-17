<script setup>
import { ref, nextTick, computed } from 'vue'
import html2canvas from 'html2canvas'

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  allText: String,
  badgeImage: String // Новый пропс для картинки бейджа
})

const showModal = ref(false)
const generatedImage = ref(null)
const storyElement = ref(null)
const isGenerating = ref(false)

// Фон по умолчанию (можно поменять путь на свой дефолтный)
const defaultBg = '/korzh_story_bg.jpg'
const currentBg = ref(defaultBg)
const fileInput = ref(null)

// Открытие диалога выбора файла
const triggerFileUpload = () => {
  fileInput.value.click()
}

// Обработка загрузки файла
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      currentBg.value = e.target.result
      // После смены фона перегенерируем картинку, чтобы она обновилась в превью
      // Даем тик, чтобы Vue обновил DOM, потом генерим
      nextTick(() => {
         generateImage()
      })
    }
    reader.readAsDataURL(file)
  }
}

// Функция генерации
const generateImage = async () => {
  if (!storyElement.value) return
  
  isGenerating.value = true
  try {
    // Ждем полной отрисовки (особенно картинки фона)
    await nextTick()
    
    const canvas = await html2canvas(storyElement.value, {
      useCORS: true,
      scale: 2, // Высокое качество
      backgroundColor: null,
    })
    generatedImage.value = canvas.toDataURL('image/png')
  } catch (e) {
    console.error('Ошибка генерации:', e)
  } finally {
    isGenerating.value = false
  }
}

// Публичный метод для родителя
const generateAndShare = () => {
  showModal.value = true
  // Сбрасываем фон на дефолтный при новом открытии (или можно оставить, если хотите сохранять выбор)
  currentBg.value = defaultBg 
  
  // Генерируем с небольшой задержкой, чтобы модалка открылась
  setTimeout(() => {
    generateImage()
  }, 500)
}

// Скачивание
const downloadImage = () => {
  if (!generatedImage.value) return
  const link = document.createElement('a')
  link.href = generatedImage.value
  link.download = `korzh-card-${props.ticket}.png`
  link.click()
}

// Шаринг (Web Share API)
const shareImage = async () => {
  if (!generatedImage.value) return

  try {
    const blob = await (await fetch(generatedImage.value)).blob()
    const file = new File([blob], `korzh-card-${props.ticket}.png`, { type: 'image/png' })

    if (navigator.share) {
      await navigator.share({
        title: 'Моя открытка в Корж',
        text: 'Лови мое настроение!',
        files: [file]
      })
    } else {
      alert('Ваш браузер не поддерживает прямой шеринг. Просто сохраните картинку.')
    }
  } catch (error) {
    console.error('Ошибка шаринга:', error)
    // Фолбек на скачивание, если шаринг отменили или сломался
    downloadImage()
  }
}

defineExpose({
  generateAndShare
})
</script>

<template>
  <div v-if="showModal" class="story-modal-overlay" @click.self="showModal = false">
    <div class="story-modal">
      <div class="story-header">
        <h3>Ваша открытка готова</h3>
        <button class="close-btn" @click="showModal = false">×</button>
      </div>

      <div class="story-preview-container">
        <!-- Скрытый DOM элемент для рендера (HTML версия) -->
        <!-- Мы его показываем пользователю как "превью", но поверх кладем сгенерированный скриншот -->
        <!-- Или можно скрывать HTML и показывать только скриншот. Здесь показываем HTML для интерактивности смены фона -->
        <div 
          ref="storyElement" 
          class="story-render-area"
          :style="{ backgroundImage: `url(${currentBg})` }"
        >
          <!-- Оверлей градиента -->
          <div class="story-gradient-overlay"></div>

          <!-- Контент -->
          <div class="story-content">
            <!-- Большая буква К (фоновая) -->
            <div class="big-k">K</div>

            <!-- Заголовок -->
            <div class="main-title">
              МОЯ ОТКРЫТКА<br>В КОРЖ
            </div>

            <!-- Инфо-строка -->
            <div class="info-pill">
              <span class="lightning">🎄</span> 
              <span class="ticket-num">{{ ticket }}</span>
              <span class="divider">|</span>
              <span class="date-str">{{ date }}</span>
            </div>

            <div class="address-str">{{ address }}</div>

            <!-- Блок с текстом -->
            <div class="text-message-box">
              {{ allText }}
            </div>

            <!-- БЕЙДЖ (Новый элемент) -->
            <div v-if="badgeImage" class="badge-sticker">
               <img :src="badgeImage" alt="Badge" />
            </div>

            <!-- Ссылка-кнопка -->
            <div class="link-btn">
              cffx.ru/korzh
            </div>
          </div>
        </div>
      </div>

      <div class="story-actions">
        <p class="share-hint">Поделитесь настроением</p>
        
        <div class="buttons-row">
           <button class="action-btn download-btn" @click="downloadImage">
             Скачать
           </button>
           <button class="action-btn share-btn" @click="shareImage">
             Поделиться
           </button>
        </div>
        
        <!-- Кнопка смены фона -->
        <div class="upload-section">
           <button class="text-btn upload-btn" @click="triggerFileUpload">
              Загрузить свое фото
           </button>
           <input 
             type="file" 
             ref="fileInput" 
             accept="image/*" 
             class="hidden-input"
             @change="handleFileUpload"
           />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');

.story-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.85);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}

.story-modal {
  background: #1E1E20;
  width: 100%;
  max-width: 420px;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-height: 95vh;
  overflow-y: auto;
}

.story-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.story-header h3 {
  color: #fff;
  font-size: 1.2rem;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.close-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
}

/* === ОБЛАСТЬ РЕНДЕРА (СТОРИЗ) === */
.story-preview-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.story-render-area {
  width: 320px; /* Фиксированная ширина сториз */
  height: 568px; /* 9:16 aspect ratio (примерно) */
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 12px; /* Скругление только для превью */
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.story-gradient-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(100, 70, 140, 0.4) 0%,   /* Фиолетовый оттенок сверху */
    rgba(30, 30, 35, 0.1) 40%,    /* Прозрачный центр */
    rgba(20, 20, 25, 0.8) 85%,    /* Темный низ */
    rgba(10, 10, 15, 0.95) 100%
  );
  z-index: 1;
}

.story-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  color: #fff;
}

/* Буква К */
.big-k {
  position: absolute;
  top: 40px;
  left: 30px;
  font-size: 180px;
  font-weight: 800;
  color: rgba(179, 157, 200, 0.3); /* Полупрозрачный фиолетовый */
  z-index: -1;
  line-height: 1;
}

.main-title {
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
  margin-bottom: 15px;
  line-height: 1.3;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.info-pill {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.3);
  margin-bottom: 10px;
  font-size: 14px;
}

.lightning { margin-right: 8px; font-size: 14px; } /* Елочка */
.divider { margin: 0 8px; opacity: 0.6; }

.address-str {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 40px;
  text-shadow: 0 2px 5px rgba(0,0,0,0.7);
}

.text-message-box {
  width: 85%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 20px;
  font-size: 18px;
  line-height: 1.4;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  margin-bottom: 20px;
}

/* БЕЙДЖ */
.badge-sticker {
  margin-bottom: auto; /* Толкает все, что ниже (кнопку), вниз */
  margin-top: -10px;   /* Чуть заходим на текст для слитности */
  transform: rotate(-6deg);
  z-index: 10;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.4));
}
.badge-sticker img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.link-btn {
  margin-bottom: 60px; /* Отступ от низа */
  background: #E0D4EC; /* Светлый лавандовый */
  color: #000;
  font-weight: 700;
  padding: 12px 40px;
  border-radius: 30px;
  font-size: 16px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
}

/* === УПРАВЛЕНИЕ === */
.story-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.share-hint {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.buttons-row {
  display: flex;
  gap: 12px;
  width: 100%;
}

.action-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.action-btn:active { transform: scale(0.98); }

.download-btn {
  background: #333;
  color: #fff;
}
.share-btn {
  background: #9B7FB7;
  color: #fff;
}

.upload-section {
  width: 100%;
  text-align: center;
  margin-top: 5px;
}

.upload-btn {
  background: transparent;
  border: 1px dashed #555;
  color: #aaa;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
}
.upload-btn:hover { border-color: #777; color: #ccc; }

.hidden-input { display: none; }
</style>
