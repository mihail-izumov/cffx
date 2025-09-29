<template>
  <div class="video-player-container">
    <div class="video-wrapper">
      <video 
        ref="videoElement"
        :poster="poster"
        controls
        preload="metadata"
        @loadstart="onLoadStart"
        @canplay="onCanPlay"
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
      
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

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
  }
})

const videoElement = ref(null)
const selectedQuality = ref('hd')
const loading = ref(false)
const currentTime = ref(0)
const wasPlaying = ref(false)

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

const changeQuality = () => {
  if (!videoElement.value) return
  
  // Сохраняем текущее состояние
  currentTime.value = videoElement.value.currentTime
  wasPlaying.value = !videoElement.value.paused
  
  loading.value = true
  
  // Находим выбранный источник
  const selectedSource = videoSources.value.find(
    source => source.quality === selectedQuality.value
  )
  
  if (selectedSource) {
    // Меняем источник видео
    videoElement.value.src = selectedSource.src
    videoElement.value.load()
    
    // Восстанавливаем позицию и состояние воспроизведения
    videoElement.value.addEventListener('loadeddata', () => {
      videoElement.value.currentTime = currentTime.value
      if (wasPlaying.value) {
        videoElement.value.play()
      }
      loading.value = false
    }, { once: true })
  }
}

const onLoadStart = () => {
  loading.value = true
}

const onCanPlay = () => {
  loading.value = false
}

onMounted(() => {
  if (props.autoplay && videoElement.value) {
    videoElement.value.play()
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

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
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
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .video-player-container {
    background: var(--vp-c-bg-soft);
  }
}
</style>
