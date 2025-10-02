<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SignalT9Configurator from '../../components/SignalT9Configurator.vue'

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
  // Экспортируем функцию глобально
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
    <Transition name="modal-fade">
      <div 
        v-if="isReviewModalOpen" 
        class="signal-modal-overlay"
        @click="closeReviewModal"
      >
        <div 
          class="signal-modal-container"
          @click.stop
        >
          <div class="signal-modal-content">
            <SignalT9Configurator />
          </div>
          
          <div class="signal-modal-footer">
            <button 
              @click="closeReviewModal" 
              class="signal-modal-close-btn"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Анимация появления */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .signal-modal-container,
.modal-fade-leave-active .signal-modal-container {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .signal-modal-container,
.modal-fade-leave-to .signal-modal-container {
  transform: translateY(20px);
}

/* Overlay */
.signal-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  padding: 20px;
  box-sizing: border-box;
}

/* Контейнер модального окна */
.signal-modal-container {
  background: #1a1a1c;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Содержимое с прокруткой */
.signal-modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

/* Кастомная прокрутка */
.signal-modal-content::-webkit-scrollbar {
  width: 8px;
}

.signal-modal-content::-webkit-scrollbar-track {
  background: #2a2a2c;
  border-radius: 4px;
}

.signal-modal-content::-webkit-scrollbar-thumb {
  background: #3b3b3d;
  border-radius: 4px;
}

.signal-modal-content::-webkit-scrollbar-thumb:hover {
  background: #4a4a4c;
}

/* Футер с кнопкой */
.signal-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: #202124;
}

.signal-modal-close-btn {
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

.signal-modal-close-btn:hover {
  background: #454546;
  color: #c5f946;
  transform: translateY(-1px);
}

/* Мобильная версия */
@media (max-width: 768px) {
  .signal-modal-overlay {
    padding: 10px;
  }
  
  .signal-modal-container {
    max-width: 100%;
    max-height: 95vh;
    border-radius: 8px;
  }
  
  .signal-modal-footer {
    padding: 12px 16px;
  }
}
</style>
