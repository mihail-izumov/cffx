<template>
  <div :class="$style.imageSlider">
    <!-- Основной контейнер с изображениями + обводка в стиле Корж -->
    <div 
      :class="$style.sliderContainer"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div :class="$style.glowBorder"></div> <!-- Добавил "магическую" обводку -->
      <img 
        v-for="(image, index) in images" 
        :key="index"
        :src="image" 
        :alt="`Slide ${index + 1}`"
        :class="[$style.sliderImage, { [$style.active]: currentIndex === index }]"
        loading="eager"
      />
    </div>
    
    <!-- Точки для десктопа -->
    <div :class="$style.sliderDots">
      <span 
        v-for="(image, index) in images" 
        :key="index"
        :class="[$style.dot, { [$style.active]: currentIndex === index }]"
        @click="goToSlide(index)"
      />
    </div>
    
    <!-- Интерактивная полоса прогресса для мобильных -->
    <div 
      :class="$style.sliderProgressBar"
      @click="handleProgressClick"
      @touchstart="handleProgressTouchStart"
      @touchmove="handleProgressTouchMove"
      @touchend="handleProgressTouchEnd"
    >
      <div 
        :class="$style.progressFill"
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
      '/fest2025/OST06122.jpg',
      '/fest2025/OST06021.jpg',
      '/fest2025/OST06039.jpg',
      '/fest2025/OST06176.jpg',
      '/fest2025/OST06111.jpg',
      '/fest2025/OST06197.jpg',
      '/fest2025/OST06187.jpg',
      '/fest2025/OST06007.jpg',
      '/fest2025/OST06045.jpg',
      '/fest2025/OST06067.jpg',
      '/fest2025/OST06073.jpg',
      '/fest2025/OST06086.jpg',
      '/fest2025/OST06092.jpg',
      '/fest2025/OST06106.jpg',
      '/fest2025/OST06117.jpg',
      '/fest2025/OST06210.jpg',
      '/fest2025/OST06260.jpg',
      '/fest2025/OST06276.jpg'
    ]
  },
  autoplayDelay: {
    type: Number,
    default: 5000
  }
})

const currentIndex = ref(0)
let timer = null
let touchStartX = 0
let touchEndX = 0
let isDraggingProgress = false

const progressWidth = computed(() => {
  return ((currentIndex.value + 1) / props.images.length) * 100
})

const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoplay()
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

// Свайп изображений пальцем
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
  stopAutoplay()
}

const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const swipeDistance = touchStartX - touchEndX
  const minSwipeDistance = 50
  
  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
  
  resetAutoplay()
}

// Взаимодействие с полосой прогресса
const handleProgressClick = (e) => {
  const progressBar = e.currentTarget
  const clickPosition = e.offsetX
  const barWidth = progressBar.offsetWidth
  const clickPercent = clickPosition / barWidth
  const newIndex = Math.floor(clickPercent * props.images.length)
  
  currentIndex.value = Math.min(newIndex, props.images.length - 1)
  resetAutoplay()
}

const handleProgressTouchStart = (e) => {
  isDraggingProgress = true
  stopAutoplay()
  e.stopPropagation()
}

const handleProgressTouchMove = (e) => {
  if (!isDraggingProgress) return
  
  const progressBar = e.currentTarget
  const touch = e.touches[0]
  const rect = progressBar.getBoundingClientRect()
  const touchPosition = touch.clientX - rect.left
  const barWidth = progressBar.offsetWidth
  const touchPercent = Math.max(0, Math.min(1, touchPosition / barWidth))
  const newIndex = Math.floor(touchPercent * props.images.length)
  
  currentIndex.value = Math.min(newIndex, props.images.length - 1)
  e.preventDefault()
  e.stopPropagation()
}

const handleProgressTouchEnd = (e) => {
  isDraggingProgress = false
  resetAutoplay()
  e.stopPropagation()
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

const resetAutoplay = () => {
  stopAutoplay()
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style module>
.imageSlider {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.sliderContainer {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 24px; /* Чуть больше скругление (как в других виджетах) */
  background: #1f1f1f; /* Темный фон подложки */
  touch-action: pan-y pinch-zoom;
  /* Тень для объема */
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* Магическая обводка поверх контейнера */
.glowBorder {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  pointer-events: none;
  z-index: 10;
  /* Градиентная обводка: сверху фиолетовая, снизу прозрачная */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Дополнительный блик сверху */
.glowBorder::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(224, 215, 248, 0.3) 50%, transparent 100%);
}

.sliderImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 24px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* Более плавный переход */
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.sliderImage:first-child {
  position: relative;
}

.sliderImage.active {
  opacity: 1;
  z-index: 1;
}

/* Точки для десктопа */
.sliderDots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  
  /* Неактивная: полупрозрачный фиолетовый + бордер */
  background-color: rgba(142, 124, 195, 0.1); 
  border: 1px solid rgba(142, 124, 195, 0.3);
  
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
}

.dot:hover {
  background-color: rgba(142, 124, 195, 0.3);
  border-color: rgba(224, 215, 248, 0.5);
  transform: scale(1.1);
  box-shadow: 0 0 8px rgba(142, 124, 195, 0.4);
}

.dot.active {
  /* Активная: Фиолетовый градиент Корж */
  background: linear-gradient(135deg, #E0D7F8 0%, #8E7CC3 100%);
  border-color: transparent;
  width: 12px;
  height: 12px;
  box-shadow: 0 0 12px rgba(142, 124, 195, 0.6);
  transform: scale(1.1);
}

/* Интерактивная полоса прогресса для мобильных */
.sliderProgressBar {
  display: none;
  width: 100%;
  height: 4px; /* Чуть толще для удобства */
  
  /* Фон бара: темный с едва заметным фиолетовым оттенком */
  background-color: rgba(142, 124, 195, 0.15);
  
  border-radius: 2px;
  margin-top: 16px;
  overflow: hidden;
  cursor: pointer;
  touch-action: none;
  position: relative;
}

.progressFill {
  height: 100%;
  
  /* Заполнение: Фиолетовый градиент Корж */
  background: linear-gradient(90deg, #E0D7F8 0%, #8E7CC3 100%);
  
  transition: width 0.3s ease;
  border-radius: 4px;
  pointer-events: none;
  
  /* Свечение прогресс-бара */
  box-shadow: 0 0 10px rgba(142, 124, 195, 0.5);
  position: relative;
}

/* Блик на конце прогресс-бара */
.progressFill::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background: rgba(255,255,255,0.8);
  filter: blur(4px);
  opacity: 0.6;
}

/* Медиа-запрос для мобильных устройств */
@media (max-width: 768px) {
  .sliderDots {
    display: none;
  }
  
  .sliderProgressBar {
    display: block;
  }
  
  .sliderContainer {
    border-radius: 20px; /* Чуть меньше на мобильных */
  }
  
  .sliderImage {
    border-radius: 20px;
  }
  
  .glowBorder {
    border-radius: 20px;
  }
}
</style>
