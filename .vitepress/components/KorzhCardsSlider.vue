<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Карточки
const cardTypes = ref([
  { id: 'card1', image: '/img/korzh/usercards/signal-card-22-12-2025-92.jpg' },
  { id: 'card2', image: '/img/korzh/usercards/signal-card-22-12-2025-114.jpg' },
  { id: 'card3', image: '/img/korzh/usercards/signal-card-22-12-2025-122.jpg' },
  { id: 'card4', image: '/img/korzh/usercards/signal-card-22-12-2025-163.jpg' },
  { id: 'card5', image: '/img/korzh/usercards/signal-card-22-12-2025-54.jpg' },
  { id: 'card6', image: '/img/korzh/usercards/signal-card-22-12-2025-91.jpg' },
  { id: 'card7', image: '/img/korzh/usercards/signal-card-22-12-2025-131.jpg' },
  { id: 'card8', image: '/img/korzh/usercards/signal-card-22-12-2025-150.jpg' },
  { id: 'card9', image: '/img/korzh/usercards/signal-card-22-12-2025-170.jpg' },
  { id: 'card10', image: '/img/korzh/usercards/signal-card-22-12-2025-192.jpg' },
  { id: 'card11', image: '/img/korzh/usercards/signal-card-22-12-2025-195.jpg' },
  { id: 'card12', image: '/img/korzh/usercards/signal-card-22-12-2025-198.jpg' }
])

// Ref для контейнера слайдера
const gridRef = ref(null)

// Зум для мобильки
const zoomedImage = ref(null)
const isMobile = ref(window.innerWidth < 768)

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

const toggleZoom = (image) => {
  if (isMobile.value) {
    zoomedImage.value = zoomedImage.value === image ? null : image
  }
}

// Предзагрузка всех изображений
const preloadImages = () => {
  cardTypes.value.forEach(card => {
    const img = new Image()
    img.src = card.image
  })
}

let autoScrollInterval = null

onMounted(() => {
  // Предзагружаем изображения как можно раньше
  preloadImages()

  window.addEventListener('resize', handleResize)

  // Авто-слайдер
  autoScrollInterval = setInterval(() => {
    if (gridRef.value) {
      const grid = gridRef.value
      const cardWidth = isMobile.value ? 200 + 12 : 300 + 12 // width + gap
      let next = grid.scrollLeft + cardWidth
      const max = grid.scrollWidth - grid.clientWidth
      if (next >= max) {
        next = 0
      }
      grid.scrollTo({ left: next, behavior: 'smooth' })
    }
  }, 3000)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (autoScrollInterval) clearInterval(autoScrollInterval)
})
</script>

<template>
  <div class="kzh-cards-container">
    <div class="kzh-cards-grid" ref="gridRef">
      <div
        v-for="card in cardTypes"
        :key="card.id"
        class="kzh-card"
        @click="toggleZoom(card.image)"
      >
        <!-- Скелетон-placeholder -->
        <div class="kzh-card-placeholder"></div>

        <!-- Основное изображение -->
        <img
          :src="card.image"
          alt=""
          class="kzh-card-image"
          loading="eager"
          @load="$event.target.classList.add('loaded')"
        />
      </div>
    </div>
  </div>

  <!-- Модал для зума на мобильке -->
  <div v-if="zoomedImage" class="kzh-zoom-modal" @click="toggleZoom(null)">
    <img :src="zoomedImage" alt="Zoomed image" class="kzh-zoomed-image" />
  </div>
</template>

<style scoped>
.kzh-cards-container {
  width: 100%;
  padding: 20px 0;
}

.kzh-cards-grid {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 20px;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}

.kzh-cards-grid::-webkit-scrollbar {
  display: none;
}

.kzh-card {
  position: relative;
  flex: 0 0 300px;
  width: 300px;
  height: 530px;
  border-radius: 28px;
  overflow: hidden;
  scroll-snap-align: center;
  cursor: pointer;
  background: #e0e0e0; /* fallback цвет скелетона */
}

/* Скелетон с анимацией шиммера */
.kzh-card-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite;
  border-radius: 28px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.kzh-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* Когда изображение загрузилось — показываем его, скрываем placeholder */
.kzh-card-image.loaded {
  opacity: 1;
}

.kzh-card-image.loaded ~ .kzh-card-placeholder,
.kzh-card-image.loaded + .kzh-card-placeholder {
  opacity: 0;
  pointer-events: none;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .kzh-card {
    flex: 0 0 200px;
    width: 200px;
    height: 353px;
    border-radius: 24px;
  }

  .kzh-card-placeholder {
    border-radius: 24px;
  }
}

/* Зум модал */
.kzh-zoom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(12px);
}

.kzh-zoomed-image {
  max-width: 92%;
  max-height: 92%;
  object-fit: contain;
  border-radius: 28px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}
</style>
