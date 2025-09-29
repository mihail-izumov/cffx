<template>
  <div class="video-player-container">
    <div class="video-wrapper">
      <video 
        ref="videoElement"
        :poster="poster"
        controls
        preload="metadata"
        @loadstart="onLoadStart"
        @loadedmetadata="onLoadedMetadata"
        @canplay="onCanPlay"
        @canplaythrough="onCanPlayThrough"
        @progress="onProgress"
        @waiting="onWaiting"
        @error="onError"
        crossorigin="anonymous"
      >
        <source 
          v-for="source in videoSources" 
          :key="source.quality"
          :src="source.src"
          :type="source.type"
          :data-quality="source.quality"
        />
        Ваш браузер не поддерживает видео элемент.
      </video>
      
      <div class="video-controls">
        <div class="quality-selector">
          <select 
            v-model="selectedQuality" 
            @change="changeQuality"
            class="quality-select"
            :disabled="isLoading"
          >
            <option 
              v-for="source in videoSources" 
              :key="source.quality"
              :value="source.quality"
            >
              {{ source.label }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Загрузка метаданных -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <div class="loading-text">{{ loadingText }}</div>
          <div v-if="showProgress" class="loading-percentage">
            {{ Math.round(loadedPercentage) }}%
          </div>
        </div>
      </div>
      
      <!-- Ошибка загрузки -->
      <div v-if="hasError" class="error-overlay">
        <div class="error-content">
          <div class="error-icon">⚠️</div>
          <div class="error-text">Ошибка загрузки видео</div>
          <button @click="retryLoad" class="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

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
const selectedQuality = ref('sd') // Начинаем с SD для быстрой загрузки
const isLoading = ref(true)
const hasError = ref(false)
const loadingText = ref('Подготовка видео...')
const loadedPercentage = ref(0)
const showProgress = ref(false)
const currentTime = ref(0)
const wasPlaying = ref(false)

const videoSources = computed(() => [
  {
    src: props.sdSrc,
    quality: 'sd',
    label: 'SD (720p)',
    type: 'video/mp4'
  },
  {
    src: props.hdSrc,
    quality: 'hd',
    label: 'HD (1080p)',
    type: 'video/mp4'
  }
])

// Предзагрузка видео с timeout
const preloadVideo = (src, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.src = src
    
    const timeoutId = setTimeout(() => {
      reject(new Error('Timeout'))
    }, timeout)
    
    video.addEventListener('loadedmetadata', () => {
      clearTimeout(timeoutId)
      resolve(video)
    })
    
    video.addEventListener('error', () => {
      clearTimeout(timeoutId)
      reject(new Error('Load error'))
    })
  })
}

const changeQuality = async () => {
  if (!videoElement.value) return
  
  currentTime.value = videoElement.value.currentTime
  wasPlaying.value = !videoElement.value.paused
  
  isLoading.value = true
  loadingText.value = 'Переключение качества...'
  hasError.value = false
  
  const selectedSource = videoSources.value.find(
    source => source.quality === selectedQuality.value
  )
  
  if (selectedSource) {
    try {
      await preloadVideo(selectedSource.src, 8000)
      
      videoElement.value.src = selectedSource.src
      videoElement.value.load()
      
      videoElement.value.addEventListener('loadeddata', () => {
        videoElement.value.currentTime = currentTime.value
        if (wasPlaying.value) {
          videoElement.value.play()
        }
      }, { once: true })
      
    } catch (error) {
      console.error('Ошибка смены качества:', error)
      hasError.value = true
      isLoading.value = false
    }
  }
}

const onLoadStart = () => {
  isLoading.value = true
  loadingText.value = 'Загрузка видео...'
  hasError.value = false
  showProgress.value = true
}

const onLoadedMetadata = () => {
  loadingText.value = 'Подготовка к воспроизведению...'
}

const onProgress = () => {
  if (!videoElement.value) return
  
  const video = videoElement.value
  if (video.buffered.length > 0 && video.duration) {
    const bufferedEnd = video.buffered.end(video.buffered.length - 1)
    loadedPercentage.value = (bufferedEnd / video.duration) * 100
  }
}

const onCanPlay = () => {
  loadingText.value = 'Почти готово...'
}

const onCanPlayThrough = () => {
  isLoading.value = false
  showProgress.value = false
  hasError.value = false
}

const onWaiting = () => {
  if (!isLoading.value) {
    loadingText.value = 'Буферизация...'
    isLoading.value = true
  }
}

const onError = (event) => {
  console.error('Ошибка видео:', event)
  hasError.value = true
  isLoading.value = false
  loadingText.value = 'Ошибка загрузки'
}

const retryLoad = () => {
  hasError.value = false
  isLoading.value = true
  if (videoElement.value) {
    videoElement.value.load()
  }
}

// Инициализация с SD качеством
onMounted(async () => {
  if (videoElement.value) {
    // Начинаем с SD для быстрой загрузки
    const sdSource = videoSources.value.find(s => s.quality === 'sd')
    if (sdSource) {
      videoElement.value.src = sdSource.src
    }
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
  min-height: 200px;
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

.quality-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.loading-content {
  text-align: center;
  color: white;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 16px;
}

.loading-text {
  font-size: 16px;
  margin-bottom: 8px;
}

.loading-percentage {
  font-size: 14px;
  opacity: 0.8;
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
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-text {
  font-size: 18px;
  margin-bottom: 16px;
}

.retry-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.retry-button:hover {
  background: #0056b3;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
