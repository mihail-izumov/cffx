<template>
  <div class="features-container">
    <div class="feature-card">
      <h3>Прозрачность</h3>
      <p>Вы видите реальные цифры и принимаете решения на основе данных</p>
    </div>
    <div class="feature-card">
      <h3>Предсказуемость</h3>
      <p>Вы можете прогнозировать рост и избегать дорогих ошибок</p>
    </div>
    <div class="feature-card">
      <h3>Власть</h3>
      <p>Вы контролируете рынок и получаете максимальную прибыль от каждой инвестиции</p>
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
