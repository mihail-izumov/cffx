<template>
  <button class="btn btn-primary" type="button" @click="openModal">
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
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: none;
  transition: all 0.3s ease;
  background-color: transparent;
  color: inherit;
}
.btn:focus {
  outline: none;
}

/* Анимация перелива */
.btn-primary {
  background-image: linear-gradient(-45deg, #c5f946, #85a931, #c5f946, #85a931);
  background-size: 400% 400%;
  animation: liquid-fluid 6s ease infinite;
  color: #000 !important;
  border: none;
}

.btn-primary:hover {
  animation-direction: reverse;
  color: #000 !important;
  font-weight: 700;
  transform: translateY(-2px);
}

@keyframes liquid-fluid {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
