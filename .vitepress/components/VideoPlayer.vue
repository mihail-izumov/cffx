<template>
  <div class="video-player-container">
    <div class="video-wrapper">
      <video 
        ref="videoElement"
        :poster="poster"
        controls
        preload="none"
        @loadstart="onLoadStart"
        @loadeddata="onLoadedData"
        @canplay="onCanPlay"
        @error="onError"
        @play="onPlay"
        @pause="onPause"
      >
        <source 
          :src="currentVideoSrc"
          type="video/mp4"
        />
        Ваш браузер не поддерживает видео элемент.
      </video>
      
      <div class="video-controls">
        <div class="quality-selector">
          <select 
            v-model="selectedQuality" 
            @change="changeQuality"
            class="quality-select"
          >
            <option value="sd">SD (720p)</option>
            <option value="hd">HD (1080p)</option>
          </select>
        </div>
      </div>
      
      <!-- Простой индикатор загрузки -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">Загрузка...</div>
      </div>
      
      <!-- Ошибка с диагностикой -->
      <div v-if="hasError" class="error-overlay">
        <div class="error-content">
          <div class="error-icon">⚠️</div>
          <div class="error-text">Не удалось загрузить видео</div>
          <div class="error-details">{{ errorMessage }}</div>
          <div class="error-actions">
            <button @click="retryLoad" class="retry-button">
              Попробовать снова
            </button>
            <a :href="currentVideoSrc" target="_blank" class="direct-link">
              Открыть напрямую
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  poster: {
    type: String,
    default: ''
  },
  hdSrc: {
    type: String,
    required: true
  },
  sdSrc: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: false
  }
})

const videoElement = ref(null)
const selectedQuality = ref('sd')
const isLoading = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const currentTime = ref(0)
const isPlaying = ref(false)

const currentVideoSrc = computed(() => {
  return selectedQuality.value === 'hd' ? props.hdSrc : props.sdSrc
})

const changeQuality = () => {
  if (!videoElement.value) return
  
  // Сохраняем состояние
  currentTime.value = videoElement.value.currentTime
  isPlaying.value = !videoElement.value.paused
  
  // Сбрасываем ошибки
  hasError.value = false
  errorMessage.value = ''
  
  // Загружаем новое видео
  videoElement.value.load()
  
  // Восстанавливаем позицию после загрузки
  videoElement.value.addEventListener('loadeddata', () => {
    if (currentTime.value > 0) {
      videoElement.value.currentTime = currentTime.value
    }
    if (isPlaying.value) {
      videoElement.value.play().catch(e => {
        console.log('Autoplay заблокирован:', e)
      })
    }
  }, { once: true })
}

const onLoadStart = () => {
  isLoading.value = true
  hasError.value = false
  errorMessage.value = ''
}

const onLoadedData = () => {
  isLoading.value = false
  hasError.value = false
}

const onCanPlay = () => {
  isLoading.value = false
  hasError.value = false
}

const onError = (event) => {
  console.error('Ошибка видео:', event)
  isLoading.value = false
  hasError.value = true
  
  const video = event.target
  const error = video.error
  
  if (error) {
    switch (error.code) {
      case error.MEDIA_ERR_ABORTED:
        errorMessage.value = 'Загрузка прервана пользователем'
        break
      case error.MEDIA_ERR_NETWORK:
        errorMessage.value = 'Ошибка сети при загрузке'
        break
      case error.MEDIA_ERR_DECODE:
        errorMessage.value = 'Ошибка декодирования видео'
        break
      case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        errorMessage.value = 'Формат видео не поддерживается'
        break
      default:
        errorMessage.value = 'Неизвестная ошибка'
    }
  } else {
    errorMessage.value = 'Проверьте доступность файла'
  }
}

const onPlay = () => {
  isPlaying.value = true
}

const onPause = () => {
  isPlaying.value = false
}

const retryLoad = () => {
  hasError.value = false
  errorMessage.value = ''
  isLoading.value = true
  
  if (videoElement.value) {
    videoElement.value.load()
  }
}

// Отслеживаем изменения источника
watch(currentVideoSrc, () => {
  if (videoElement.value) {
    videoElement.value.load()
  }
})
</script>

<style scoped>
.video-player-container {
  position: relative;
  max-width: 100%;
  margin: 1rem 0;
}

.video-wrapper {
  position: relative;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  min-height: 300px;
}

video {
  width: 100%;
  height: auto;
  display: block;
}

.video-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.quality-selector {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 4px;
  backdrop-filter: blur(10px);
}

.quality-select {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  outline: none;
}

.quality-select:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

.loading-text {
  color: white;
  font-size: 16px;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 25;
}

.error-content {
  text-align: center;
  color: white;
  padding: 20px;
  max-width: 400px;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.error-details {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 20px;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.retry-button, .direct-link {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
}

.retry-button:hover, .direct-link:hover {
  background: #0056b3;
}

.direct-link {
  background: #28a745;
}

.direct-link:hover {
  background: #1e7e34;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .retry-button, .direct-link {
    width: 100%;
    max-width: 200px;
  }
}
</style>
