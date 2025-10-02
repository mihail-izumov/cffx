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
              Закрыть и вернуться
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Анимация */
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
  transition: all 0.3s ease;
}
.modal-fade-enter-from .signal-modal-container,
.modal-fade-leave-to .signal-modal-container {
  transform: scale(0.95);
  opacity: 0;
}

/* Оверлей */
.signal-modal-overlay {
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
  backdrop-filter: blur(8px);
  padding: 20px;
  box-sizing: border-box;
}

/* Контейнер модального окна */
.signal-modal-container {
  background: #1e1e21;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Содержимое с прокруткой */
.signal-modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

/* Стилизация скроллбара */
.signal-modal-content::-webkit-scrollbar {
  width: 6px;
}
.signal-modal-content::-webkit-scrollbar-track {
  background: transparent;
}
.signal-modal-content::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

/* Футер */
.signal-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: #242427;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

/* Кнопка "Закрыть" */
.signal-modal-close-btn {
  width: 100%;
  padding: 12px;
  background: #3a3a3c;
  color: #c7c7cc;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.signal-modal-close-btn:hover {
  background: #48484a;
  color: white;
}

/* Адаптивность */
@media (max-width: 768px) {
  .signal-modal-overlay {
    padding: 0;
  }
  .signal-modal-container {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    width: 100%;
    border-radius: 0;
    border: none;
  }
  .signal-modal-footer {
    padding: 12px 16px 24px 16px;
    border-radius: 0;
  }
}
</style>
