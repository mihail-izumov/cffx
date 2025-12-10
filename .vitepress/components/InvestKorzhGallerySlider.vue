<template>
  <div :class="$style.imageSlider">
    <div 
      :class="$style.sliderContainer"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div :class="$style.glowBorder"></div>
      
      <!-- ОБЕРТКА ДЛЯ СОХРАНЕНИЯ ПРОПОРЦИЙ (Aspect Ratio) -->
      <div :class="$style.aspectRatioBox">
        <img 
          v-for="(image, index) in images" 
          :key="index"
          :src="image" 
          :alt="`Slide ${index + 1}`"
          :class="[$style.sliderImage, { [$style.active]: currentIndex === index }]"
          loading="lazy"
        />
      </div>
    </div>
    
    <div :class="$style.sliderDots">
      <span 
        v-for="(image, index) in images" 
        :key="index"
        :class="[$style.dot, { [$style.active]: currentIndex === index }]"
        @click="goToSlide(index)"
      />
    </div>
    
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
      '/img/korzh/slider/korzh-slider-1.jpg',
      '/img/korzh/slider/korzh-slider-2.jpg',
      '/img/korzh/slider/korzh-slider-3.jpg',
      '/img/korzh/slider/korzh-slider-4.jpg',
      '/img/korzh/slider/korzh-slider-5.jpg',
      '/img/korzh/slider/korzh-slider-6.jpg',
      '/img/korzh/slider/korzh-slider-7.jpg',
      '/img/korzh/slider/korzh-slider-8.jpg',
      '/img/korzh/slider/korzh-slider-9.jpg',
      '/img/korzh/slider/korzh-slider-10.jpg',
      '/img/korzh/slider/korzh-slider-11.jpg',
      '/img/korzh/slider/korzh-slider-12.jpg',
      '/img/korzh/slider/korzh-slider-13.jpg',
      '/img/korzh/slider/korzh-slider-14.jpg',
      '/img/korzh/slider/korzh-slider-15.jpg',
      '/img/korzh/slider/korzh-slider-16.jpg',
      '/img/korzh/slider/korzh-slider-17.jpg',
      '/img/korzh/slider/korzh-slider-18.jpg',
      '/img/korzh/slider/korzh-slider-19.jpg',
      '/img/korzh/slider/korzh-slider-20.jpg',
      '/img/korzh/slider/korzh-slider-21.jpg',
      '/img/korzh/slider/korzh-slider-22.jpg',
      '/img/korzh/slider/korzh-slider-23.jpg',
      '/img/korzh/slider/korzh-slider-24.jpg',
      '/img/korzh/slider/korzh-slider-25.jpg',
      '/img/korzh/slider/korzh-slider-26.jpg'
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
    if (swipeDistance > 0) nextSlide()
    else prevSlide()
  }
  resetAutoplay()
}

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
  border-radius: 24px;
  background: #1f1f1f;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  overflow: hidden; /* Важно для обрезки углов */
}

/* ИСПРАВЛЕНИЕ КАРТИНОК: Контейнер с пропорциями */
.aspectRatioBox {
  width: 100%;
  /* 
     Задаем пропорции 3:2 (как на фото с фестиваля обычно) или 16:9.
     Если фото разные, можно поставить 66.66% (3:2) или 56.25% (16:9).
     Здесь стоит 66.66% padding-bottom, что соответствует 3:2.
  */
  padding-bottom: 66.66%; 
  position: relative;
}

.glowBorder {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  pointer-events: none;
  z-index: 10;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

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
  height: 100%; /* Занимает всю высоту aspect ratio бокса */
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-drag: none;
}

.sliderImage.active {
  opacity: 1;
  z-index: 1;
}

/* ИСПРАВЛЕНИЕ ТОЧЕК */
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
  
  /* Неактивная: фон через background-color, БЕЗ border, чтобы не было дырок */
  background-color: rgba(142, 124, 195, 0.2); 
  box-shadow: 0 0 0 1px rgba(142, 124, 195, 0.3); /* Имитация бордера через тень */
  
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  /* Убираем overflow, чтобы не резало края */
}

.dot:hover {
  background-color: rgba(142, 124, 195, 0.4);
  box-shadow: 0 0 0 1px rgba(224, 215, 248, 0.5), 0 0 8px rgba(142, 124, 195, 0.4);
  transform: scale(1.1);
}

.dot.active {
  /* Активная: полный градиент без дырок */
  background: #E0D7F8; /* Фоллбэк */
  background: linear-gradient(135deg, #E0D7F8 0%, #8E7CC3 100%);
  width: 12px;
  height: 12px;
  box-shadow: 0 0 12px rgba(142, 124, 195, 0.6); /* Свечение снаружи */
  transform: scale(1.1);
  border: none; /* Явно убираем бордер */
}

.sliderProgressBar {
  display: none;
  width: 100%;
  height: 4px;
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
  background: linear-gradient(90deg, #E0D7F8 0%, #8E7CC3 100%);
  transition: width 0.3s ease;
  border-radius: 4px;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(142, 124, 195, 0.5);
  position: relative;
}

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

@media (max-width: 768px) {
  .sliderDots { display: none; }
  .sliderProgressBar { display: block; }
  
  .sliderContainer { border-radius: 20px; }
  .glowBorder { border-radius: 20px; }
  
  /* Адаптация пропорций для мобилок (можно сделать повыше, например 4:3) */
  .aspectRatioBox {
    padding-bottom: 75%; /* 4:3 */
  }
}
</style>
