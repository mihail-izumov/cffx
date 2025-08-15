<template>
  <div class="pricing-block">
    <div class="pricing-grid">
      <!-- Заголовок -->
      <div class="cell header">Преимущества</div>
      <div class="cell header price">₽390000/год</div>
      <!-- Данные -->
      <div class="cell subtitle">Все, что в Симуляторе и Инсайдере, плюс:</div>
      <div class="cell subtitle-check"></div>
      <div class="cell">Персональные рекомендации для пользователей симулятора</div>
      <div class="cell check">✓</div>
      <div class="cell">Участие в обратной связи по платформе</div>
      <div class="cell check">✓</div>
      <div class="cell">Приоритетный доступ к Чекапам</div>
      <div class="cell check">✓</div>
      <div class="cell">Место в совете BREW</div>
      <div class="cell check">✓</div>
    </div>
  </div>
</template>

<style scoped>
.pricing-block {
  margin: 32px 0;
  border: 2px solid #444;
  border-radius: 16px;
  background: #2a2a2a;
  overflow: hidden;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
}

/* Общие ячейки */
.cell {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  height: 48px;
  border-top: 1px solid #444;
  font: 14px/1.3 var(--vp-font-family-base, sans-serif);
  color: #e0e0e0;
}

/* Убираем верхнюю границу первой строки данных */
.pricing-grid .cell:nth-child(3),
.pricing-grid .cell:nth-child(4) {
  border-top: none;
}

/* Шапка */
.header {
  background: #1b1b1b;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border-top: none;
}

/* Цена */
.price {
  justify-content: center;
  color: #9aff00;
  font-size: 16px;
}

/* Серый подзаголовок */
.subtitle {
  color: #999;
}

/* Пустая ячейка для подзаголовка */
.subtitle-check {
  border-top: none;
}

/* Галочка */
.check {
  justify-content: center;
  color: #9aff00;
  font-size: 18px;
  font-weight: 600;
}
</style>
