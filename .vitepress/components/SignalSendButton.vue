<template>
  <button class="btn btn-animated" type="button" @click="openModal">
    <strong>Отправить ⚡ Сигнал</strong>
  </button>

  <ReviewModal :is-open="isModalOpen" @close="closeModal">
    <template #content>
      <SignalT9Configurator />
    </template>
    <template #footer>
      <button @click="closeModal" class="signal2-modal-close-button">
        Закрыть и вернуться
      </button>
    </template>
  </ReviewModal>
</template>

<script setup>
import { ref } from 'vue';
import ReviewModal from './ReviewModal.vue';
import SignalT9Configurator from './SignalT9Configurator.vue';

const isModalOpen = ref(false);

const openModal = () => { isModalOpen.value = true; };
const closeModal = () => { isModalOpen.value = false; };
</script>

<style scoped>
/* Стили для основной кнопки "Отправить сигнал" */
.btn-animated {
  background-image: linear-gradient(-45deg, #c5f946, #85a931, #c5f946, #85a931);
  background-size: 400% 400%;
  animation: liquid-fluid 6s ease infinite;
  color: #000 !important;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.btn-animated:hover {
  transform: translateY(-2px);
}
@keyframes liquid-fluid {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Стили для кнопки "Закрыть", передаваемой в футер */
.signal2-modal-close-button {
  background-color: #272727;
  border: none;
  color: #888;
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}
.signal2-modal-close-button:hover {
  background-color: #333333;
  color: #fff;
}
</style>
