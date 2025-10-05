<template>
  <div class="image-slider">
    <div class="slider-container">
      <transition name="fade" mode="out-in">
        <img 
          :key="currentIndex" 
          :src="images[currentIndex]" 
          :alt="`Slide ${currentIndex + 1}`"
          class="slider-image"
        />
      </transition>
    </div>
    
    <!-- Точки для десктопа -->
    <div class="slider-dots">
      <span 
        v-for="(image, index) in images" 
        :key="index"
        :class="['dot', { active: currentIndex === index }]"
        @click="goToSlide(index)"
      />
    </div>
    
    <!-- Полоса прогресса для мобильных -->
    <div class="slider-progress-bar">
      <div 
        class="progress-fill"
        :style="{ width: progressWidth + '%' }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ]
  },
  autoplayDelay: {
    type: Number,
    default: 4000
  }
})

const currentIndex = ref(0)
let timer = null

const progressWidth = computed(() => {
  return ((currentIndex.value + 1) / props.images.length) * 100
})

const goToSlide = (index) => {
  currentIndex.value = index
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const startAutoplay = () => {
  timer = setInterval(nextSlide, props.autoplayDelay)
}

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.image-slider {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  background: #f0f0f0;
}

.slider-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
  object-fit: cover;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Точки для десктопа */
.slider-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:hover {
  background-color: #888;
  transform: scale(1.2);
}

.dot.active {
  background-color: #333;
  width: 12px;
  height: 12px;
}

/* Полоса прогресса для мобильных */
.slider-progress-bar {
  display: none;
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin-top: 16px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #333;
  transition: width 0.3s ease;
  border-radius: 2px;
}

/* Медиа-запрос для мобильных устройств */
@media (max-width: 768px) {
  .slider-dots {
    display: none;
  }
  
  .slider-progress-bar {
    display: block;
  }
}
</style>
