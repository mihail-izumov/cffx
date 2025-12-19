<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Карточки (14 штук, с указанным изображением)
const cardTypes = ref([
  { id: 'card1', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card2', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card3', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card4', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card5', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card6', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card7', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card8', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card9', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card10', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card11', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card12', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card13', image: '/img/korzh/usercards/signal-267.png' },
  { id: 'card14', image: '/img/korzh/usercards/signal-267.png' }
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
    if (zoomedImage.value === image) {
      zoomedImage.value = null
    } else {
      zoomedImage.value = image
    }
  }
}

let autoScrollInterval = null

onMounted(() => {
  window.addEventListener('resize', handleResize)
  
  // Авто-слайдер
  autoScrollInterval = setInterval(() => {
    if (gridRef.value) {
      const grid = gridRef.value
      const cardWidth = isMobile.value ? 200 : 300
      const gap = 12
      const step = cardWidth + gap
      let next = grid.scrollLeft + step
      const max = grid.scrollWidth - grid.clientWidth
      if (next > max) {
        next = 0
      }
      grid.scrollTo({ left: next, behavior: 'smooth' })
    }
  }, 3000) // Каждые 3 секунды
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }
})
</script>

<template>
  <div class="kzh-cards-container">
    <div 
      class="kzh-cards-grid"
      ref="gridRef"
    >
      <div 
        v-for="card in cardTypes" 
        :key="card.id"
        class="kzh-card"
        @click="toggleZoom(card.image)"
      >
        <div class="kzh-card-icon">
          <img :src="card.image" alt="" />
        </div>
      </div>
    </div>
  </div>

  <!-- Модал для зума на мобильке -->
  <div v-if="zoomedImage" class="kzh-zoom-modal" @click="toggleZoom(null)">
    <img :src="zoomedImage" alt="Zoomed image" class="kzh-zoomed-image" />
  </div>
</template>

<style scoped>
:root {
  --kzh-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --kzh-color-female: #ff69b4;
  --kzh-color-male: #87ceeb;
}

.kzh-cards-container {
  width: 100%;
}

.kzh-cards-grid {
  display: flex; 
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 25px; 
  padding-top: 20px;    
  padding-left: 15px;   
  margin-left: -15px;
  margin-right: -1.5rem;
  padding-right: 1.5rem;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
}
.kzh-cards-grid::-webkit-scrollbar { display: none; }

.kzh-card {
  position: relative;
  flex: 0 0 300px;
  width: 300px;
  height: 530px;
  background-image: 
    linear-gradient(#2a2a2a, #2a2a2a), /* Нижний слой - серый фон */
    linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1) 50%, transparent); /* Верхний слой - улучшенный градиент для рамки */
  background-clip: padding-box, border-box; /* Обрезка: контент для фона, бордер для градиента */
  border: 3px solid transparent; /* Утолщаем бордер для большей видимости */
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  backdrop-filter: blur(10px);
  scroll-snap-align: start;
}

.kzh-card::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 23px; /* Радиус чуть больше для покрытия */
  background: linear-gradient(135deg, rgba(255,255,255,0.3), transparent);
  pointer-events: none;
  z-index: 1; /* Поверх изображения */
}

.kzh-card-icon {
  width: 100%;
  height: 100%;
}

.kzh-card-icon img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  z-index: 0;
}

/* Медиа-запрос для мобильки */
@media (max-width: 768px) {
  .kzh-card {
    flex: 0 0 200px;
    width: 200px;
    height: 353px;
    border: 2px solid transparent; /* Чуть тоньше на мобильке */
  }

  .kzh-card::before {
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 22px;
  }
}

/* Зум модал */
.kzh-zoom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.kzh-zoomed-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 20px;
}
</style>
