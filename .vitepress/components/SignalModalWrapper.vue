<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'

const isReviewModalOpen = ref(false)

const openReviewModal = () => {
  isReviewModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeReviewModal = () => {
  isReviewModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isReviewModalOpen.value) {
    closeReviewModal()
  }
}

onMounted(() => {
  // Экспортируем функцию глобально для вызова из кнопки
  (window as any).openSignalModal = openReviewModal
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <Teleport to="body">
    <div 
      v-if="isReviewModalOpen" 
      class="signal2-review-modal-overlay"
      @click="closeReviewModal"
    >
      <div 
        class="signal2-review-modal-content"
        @click.stop
      >
        <div class="signal2-modal-scrollable-content">
          <SignalT9Configurator />
        </div>
        
        <div class="signal2-modal-close-section">
          <button 
            @click="closeReviewModal" 
            class="signal2-modal-close-button"
          >
            Закрыть и вернуться
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.signal2-review-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.signal2-review-modal-content {
  background: #202124;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px); 
  }
  to { 
    opacity: 1;
    transform: translateY(0); 
  }
}

.signal2-modal-scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.signal2-modal-close-section {
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: #1a1a1c;
}

.signal2-modal-close-button {
  width: 100%;
  padding: 12px 24px;
  background: #3b3b3d;
  color: #f0f0f0;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.signal2-modal-close-button:hover {
  background: #454546;
  color: #c5f946;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .signal2-review-modal-content {
    width: 95%;
    max-height: 85vh;
  }
  
  .signal2-modal-scrollable-content {
    padding: 20px;
  }
}
</style>
