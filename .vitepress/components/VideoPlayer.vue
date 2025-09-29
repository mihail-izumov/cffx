<template>
  <div class="video-player-container">
    <div class="video-wrapper">
      <video 
        ref="videoElement"
        :poster="poster"
        controls
        preload="metadata"
        crossorigin="anonymous"
        @loadstart="onLoadStart"
        @canplay="onCanPlay"
        @loadedmetadata="onLoadedMetadata"
        @progress="onProgress"
        @waiting="onWaiting"
        @playing="onPlaying"
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
      
      <!-- Индикатор буферизации -->
      <div v-if="isBuffering" class="buffering-overlay">
        <div class="buffering-spinner"></div>
        <div class="buffering-text">Буферизация...</div>
      </div>
      
      <!-- Индикатор загрузки -->
      <div v-if="loading && !isBuffering" class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">Загрузка видео...</div>
      </div>
      
      <!-- Прогресс-бар загрузки -->
      <div v-if="showBufferProgress" class="buffer-progress">
        <div class="buffer-bar">
          <div 
            v-for="range in bufferedRanges" 
            :key="range.start"
            class="buffer-segment"
            :style="{
              left: range.startPercent + '%',
              width: range.widthPercent + '%'
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'

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
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: 'auto'
  },
  preloadMode: {
    type: String,
    default: 'metadata', // 'none', 'metadata', 'auto'
    validator: value => ['none', 'metadata', 'auto'].includes(value)
  }
})

const videoElement = ref(null)
const selectedQuality = ref('hd')
const loading = ref(false)
const isBuffering = ref(false)
const currentTime = ref(0)
const wasPlaying = ref(false)
const duration = ref(0)
const bufferedRanges = ref([])
const showBufferProgress = ref(false)

const videoSources = computed(() => [
  {
    src: props.hdSrc,
    quality: 'hd',
    label: 'HD (1080p)',
    type: 'video/mp4'
  },
  {
    src: props.sdSrc,
    quality: 'sd',
    label: 'SD (720p)',
    type: 'video/mp4'
  }
])

const updateBufferedRanges = () => {
  if (!videoElement.value || !duration.value) return
  
  const buffered = videoElement.value.buffered
  const ranges = []
  
  for (let i = 0; i < buffered.length; i++) {
    const start = buffered.start(i)
    const end = buffered.end(i)
    
    ranges.push({
      start,
      end,
      startPercent: (start / duration.value) * 100,
      widthPercent: ((end - start) / duration.value) * 100
    })
  }
  
  bufferedRanges.value = ranges
}

const changeQuality = async () => {
  if (!videoElement.value) return
  
  // Сохраняем текущее состояние
  currentTime.value = videoElement.value.currentTime
  wasPlaying.value = !videoElement.value.paused
  
  loading.value = true
  isBuffering.value = false
  
  // Находим выбранный источник
  const selectedSource = videoSources.value.find(
    source => source.quality === selectedQuality.value
  )
  
  if (selectedSource) {
    // Меняем источник видео
    videoElement.value.src = selectedSource.src
    
    // Устанавливаем preload для немедленной загрузки метаданных
    videoElement.value.preload = 'metadata'
    
    videoElement.value.load()
    
    // Восстанавливаем позицию и состояние воспроизведения
    const handleLoadedData = async () => {
      try {
        videoElement.value.currentTime = currentTime.value
        
        if (wasPlaying.value) {
          await videoElement.value.play()
        }
        
        loading.value = false
        videoElement.value.removeEventListener('loadeddata', handleLoadedData)
      } catch (error) {
        console.error('Ошибка при воспроизведении:', error)
        loading.value = false
      }
    }
    
    videoElement.value.addEventListener('loadeddata', handleLoadedData)
  }
}

const onLoadStart = () => {
  loading.value = true
  isBuffering.value = false
  showBufferProgress.value = true
}

const onLoadedMetadata = () => {
  if (videoElement.value) {
    duration.value = videoElement.value.duration
    updateBufferedRanges()
  }
}

const onCanPlay = () => {
  loading.value = false
  isBuffering.value = false
  updateBufferedRanges()
}

const onProgress = () => {
  updateBufferedRanges()
}

const onWaiting = () => {
  isBuffering.value = true
}

const onPlaying = () => {
  isBuffering.value = false
  loading.value = false
}

// Предзагрузка метаданных при наведении мыши
const handleMouseEnter = () => {
  if (videoElement.value && videoElement.value.preload === 'none') {
    videoElement.value.preload = 'metadata'
  }
}

onMounted(() => {
  if (videoElement.value) {
    // Устанавливаем режим предзагрузки
    videoElement.value.preload = props.preloadMode
    
    // Добавляем обработчик наведения мыши для ленивой загрузки
    if (props.preloadMode === 'none') {
      videoElement.value.addEventListener('mouseenter', handleMouseEnter)
    }
    
    if (props.autoplay) {
      // Для автовоспроизведения устанавливаем preload="metadata"
      videoElement.value.preload = 'metadata'
      
      const tryAutoplay = async () => {
        try {
          await videoElement.value.play()
        } catch (error) {
          console.warn('Автовоспроизведение заблокировано:', error)
        }
      }
      
      if (videoElement.value.readyState >= 3) {
        tryAutoplay()
      } else {
        videoElement.value.addEventListener('canplay', tryAutoplay, { once: true })
      }
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

.quality-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.quality-select option {
  background: #333;
  color: white;
}

/* Overlay для буферизации */
.buffering-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 15;
}

.buffering-spinner {
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  margin-bottom: 8px;
}

.buffering-text {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

/* Overlay для загрузки */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  margin-bottom: 12px;
}

.loading-text {
  color: white;
  font-size: 16px;
  font-weight: 500;
}

/* Прогресс-бар буферизации */
.buffer-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 5;
}

.buffer-bar {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
}

.buffer-segment {
  position: absolute;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  transition: width 0.3s ease;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 768px) {
  .video-controls {
    top: 5px;
    right: 5px;
  }
  
  .quality-select {
    font-size: 11px;
    padding: 3px 6px;
  }
  
  .buffering-text,
  .loading-text {
    font-size: 12px;
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .video-player-container {
    background: var(--vp-c-bg-soft);
  }
}
</style>
