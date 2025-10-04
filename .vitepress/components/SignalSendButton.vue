<template>
  <button class="btn btn-animated" type="button" @click="openModal">
    <strong>Отправить ⚡ Сигнал</strong>
  </button>

  <!-- Модальное окно БЕЗ собственной кнопки закрытия -->
  <div v-if="isModalOpen" class="signal2-review-modal-overlay" @click="closeModal">
    <div class="signal2-review-modal-content" @click.stop>
      <!-- Компонент теперь сам управляет закрытием -->
      <SignalT9Configurator @close="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'

const isModalOpen = ref(false)

const openModal = () => { isModalOpen.value = true }
const closeModal = () => { isModalOpen.value = false }

watch(isModalOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto'
})
</script>

<style scoped>
/* Стили кнопки остаются прежними */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}
.btn-animated {
  background-image: linear-gradient(-45deg, #c5f946, #85a931, #c5f946, #85a931);
  background-size: 400% 400%;
  animation: liquid-fluid 6s ease infinite;
  color: #000 !important;
}
.btn-animated:hover {
  transform: translateY(-2px);
}
@keyframes liquid-fluid {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Стили модального окна */
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
  display: flex; /* Важно для дочернего компонента */
  flex-direction: column; /* Важно для дочернего компонента */
  overflow: hidden;
}

@media (max-width: 768px) {
  .signal2-review-modal-overlay {
    padding: 0;
  }
  .signal2-review-modal-content {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    max-height: none;
    border-radius: 16px 16px 0 0;
  }
}
</style>
