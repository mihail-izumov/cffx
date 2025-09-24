<template>
  <div class="anna-features-wrapper">
    <div class="anna-feature-item">
      <h3>Быстрое заполнение</h3>
      <p>Клик по баблам автоматически формирует связный текст.</p>
    </div>
    <div class="anna-feature-item">
      <h3>Гибкость</h3>
      <p>Можно писать вручную или комбинировать с подсказками.</p>
    </div>
    <div class="anna-feature-item">
      <h3>Синхронизация</h3>
      <p>Качественные данные для анализа обратной связи.</p>
    </div>
  </div>
</template>

<script setup>
// Компонент статичен, логика не требуется
</script>

<style scoped>
/* Контейнер для карточек Анны */
.anna-features-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 32px 0;
}

/* Карточка с описанием особенности Анны */
.anna-feature-item {
  background-color: #f6f6f7;
  border: none;
  border-radius: 12px;
  padding: 24px 20px;
  height: 100%;
}

/* Стили для тёмной темы */
:root.dark .anna-feature-item {
  background-color: var(--vp-c-bg-soft);
}

/* Заголовок карточки Анны */
.anna-feature-item h3 {
  color: var(--vp-c-text-1);
  font-size: 15px;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
}

/* Цвет заголовка для тёмной темы */
:root.dark .anna-feature-item h3 {
  color: #c5f946;
}

/* Описание в карточке */
.anna-feature-item p {
  color: var(--vp-c-text-2); 
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .anna-features-wrapper {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
