<template>
  <button class="btn btn-animated" type="button" @click="openModal">
    <strong>Отправить ⚡ Сигнал</strong>
  </button>
</template>

<script setup>
const openModal = () => {
  if (window.openSignalModal) {
    window.openSignalModal()
  } else {
    console.error('Modal function not available')
  }
}
</script>

<style scoped>
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.4rem;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  color: #000;
  background: none;
  background-color: unset;
}

/* Градиент и анимация как в навигации */
.btn-animated {
  background-image: linear-gradient(-45deg, #c5f946, #85a931, #c5f946, #85a931);
  background-size: 400% 400%;
  animation: liquid-fluid 6s ease infinite;
  color: #000 !important;
}

.btn-animated:hover {
  animation-direction: reverse;
  transform: translateY(-2px);
  color: #000 !important;
}

@keyframes liquid-fluid {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
