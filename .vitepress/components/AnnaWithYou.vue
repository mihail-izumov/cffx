<template>
  <div class="anna-features-wrapper">
    <div class="anna-feature-item">
      <h3>Ваш союзник</h3>
      <p>Анна всегда на стороне гостя. Её задача — сделать ваш опыт лучше, а не защищать интересы кофейни. Вы можете быть с ней абсолютно честными.</p>
    </div>
    <div class="anna-feature-item">
      <h3>Говорит просто</h3>
      <p>Никакого технического жаргона или сложных форм. Анна общается как живой человек — задаёт пару уточняющих вопросов и сразу понимает суть.</p>
    </div>
    <div class="anna-feature-item">
      <h3>Действует быстро</h3>
      <p>Пока вы ещё допиваете кофе, Анна уже передаёт ваш запрос менеджеру. К вечеру у вас есть ответ, а завтра — результат.</p>
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
