<template>
  <button class="btn btn-animated" type="button" @click="openModal">
    <strong>Отправить ⚡ Сигнал</strong>
  </button>

  <!-- Модальное окно -->
  <div v-if="isModalOpen" class="signal2-review-modal-overlay" @click="closeModal">
    <div class="signal2-review-modal-content" @click.stop>
      <div class="signal2-modal-scrollable-content">
        <SignalT9Configurator />
      </div>
      <div class="signal2-modal-close-section">
        <button @click="closeModal" class="signal2-modal-close-button">
          Закрыть и вернуться
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
/* Стили только для кнопки - оставляем scoped */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.05rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: none;
  transition: all 0.3s ease;
  background-color: unset;
  color: inherit;
}

.btn-animated {
  background-image: linear-gradient(-45deg, #c5f946, #85a931, #c5f946, #85a931);
  background-size: 400% 400%;
  animation: liquid-fluid 6s ease infinite;
  color: #000 !important;
  border: none;
}

.btn-animated:hover {
  animation-direction: reverse;
  color: #000 !important;
  font-weight: 700;
  transform: translateY(-2px);
}

@keyframes liquid-fluid {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>

<style>
/* Стили для модального окна - БЕЗ scoped */
.signal2-review-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 8px;
  box-sizing: border-box;
}

.signal2-review-modal-content {
  background: #1e1e20;
  border-radius: 16px;
  width: 650px;
  height: clamp(85vh, 90vh, 85vh);
  max-width: 95vw;
  max-height: clamp(85vh, 90vh, 85vh);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.signal2-modal-scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px 16px 16px;
}

.signal2-modal-close-section {
  flex-shrink: 0;
  padding: 20px 16px 24px 16px;
  background: #1e1e20;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
}

.signal2-modal-close-button {
  background-color: #272727;
  border: none;
  color: #888;
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.signal2-modal-close-button:hover {
  background-color: #333333;
  color: #fff;
  transform: translateY(-2px);
}

/* Мобильные стили */
@media (max-width: 768px) {
  .signal2-review-modal-overlay {
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }

  .signal2-review-modal-content {
    margin-top: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
    height: auto;
    max-height: none;
  }

  .signal2-modal-scrollable-content {
    padding-bottom: 70px !important;
  }

  .signal2-modal-close-section {
    position: static;
    flex-shrink: 0;
    padding-top: 16px;
  }
}
</style>
