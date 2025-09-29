<template>
  <div class="features-container">
    <div class="feature-card">
      <h3>Отзыв Яндекс/2ГИС</h3>
      <p>Ваше мнение увидят все, но кофейня может не ответить</p>
    </div>
    <div class="feature-card">
      <h3>Умный Отзыв</h3>
      <p>Мы передадим вашу проблему менеджеру и постараемся помочь</p>
    </div>
    <div class="feature-card">
      <h3>⚡ Сигнал</h3>
      <p>Работает в кофейнях-партнёрах, гарантия решения за 24 часа</p>
    </div>
  </div>
</template>

<script setup>
// Компонент статичен, логика не требуется
</script>

<style scoped>
/* Контейнер для карточек */
.features-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 32px 0;
}

/* Обновлённые стили карточки */
.feature-card {
  background-color: #f6f6f7;
  border: none;
  border-radius: 12px;
  padding: 24px 20px;
  height: 100%;
}

/* Стили для тёмной темы */
:root.dark .feature-card {
  background-color: var(--vp-c-bg-soft);
}

/* Обновлённые стили заголовка */
.feature-card h3 {
  color: var(--vp-c-text-1);
  font-size: 15px;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
}

/* Цвет заголовка для тёмной темы */
:root.dark .feature-card h3 {
  color: #c5f946;
}

.feature-card p {
  color: var(--vp-c-text-2); 
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .features-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
