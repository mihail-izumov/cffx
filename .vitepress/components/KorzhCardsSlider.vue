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
      const cardWidth = isMobile.value ? 200 + 12 : 300 + 12  // width + gap
      let next = grid.scrollLeft + cardWidth
      const max = grid.scrollWidth - grid.clientWidth
      if (next >= max) {
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
        <img :src="card.image" alt="" class="kzh-card-image" />
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
.kzh-cards-grid::-webkit-scrollbar { display: none; }

.kzh-card {
  flex: 0 0 300px;
  width: 300px;
  height: 530px;
  border-radius: 28px;
  overflow: hidden;
  scroll-snap-align: center;
  cursor: pointer;
}

.kzh-card-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .kzh-card {
    flex: 0 0 200px;
    width: 200px;
    height: 353px;
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
