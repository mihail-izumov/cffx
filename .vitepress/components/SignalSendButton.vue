<template>
  <div class="page-container">
    <!-- 
      Это обертка для вашего основного контента.
      Разместите здесь всё, что должно быть прижато к верху на мобильных устройствах.
    -->
    <div class="content-wrapper">
      <h1>Заголовок</h1>
      <p>Ваш контент здесь...</p>
      <p>Этот блок будет растягиваться, чтобы оттолкнуть кнопку вниз на мобильных устройствах.</p>
    </div>

    <!-- Блок с кнопкой, который останется внизу -->
    <div class="bottom-button-block">
      <button class="btn btn-animated" type="button" @click="openModal">
        <strong>Отправить ⚡ Сигнал</strong>
      </button>
    </div>
  </div>
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
/* Стили для мобильной верстки */
@media (max-width: 768px) {
  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Занимает как минимум всю высоту экрана */
  }

  .content-wrapper {
    flex-grow: 1; /* Заставляет этот блок занять всё доступное пространство */
  }
  
  .bottom-button-block {
    padding: 16px;
    width: 100%;
    /* Можно добавить фон, если страница не белая */
    /* background-color: var(--vp-c-bg); */
  }

  .bottom-button-block .btn {
    width: 100%; /* Растягиваем кнопку на всю ширину */
  }
}

/* Ваши оригинальные стили для кнопки */
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
