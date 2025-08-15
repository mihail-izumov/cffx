<template>
  <div class="pricing-block">
    <div class="pricing-grid">
      <!-- Заголовок -->
      <div class="cell header">Преимущества</div>
      <div class="cell header price">₽390000/год</div>
      <!-- Данные -->
      <div class="cell">Все, что в Симуляторе и Инсайдере, плюс:</div>
      <div class="cell check">✓</div>
      <div class="cell">Персональные рекомендации для пользователей симулятора</div>
      <div class="cell check">✓</div>
      <div class="cell">Участие в обратной связи по платформе</div>
      <div class="cell check">✓</div>
      <div class="cell">Приоритетный доступ к Чекапам</div>
      <div class="cell check">✓</div>
      <div class="cell">Место в совете BREW</div>
      <div class="cell check">✓</div>
    </div>
    <button class="partner-btn">Приглашение для партнёра</button>
  </div>
</template>

<style scoped>
.pricing-block {
  margin: 32px 0;
  border: 2px solid var(--vp-c-divider, #444);
  border-radius: 16px;
  background: var(--vp-c-bg-base, #2a2a2a);
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
  border-top: 1px solid var(--vp-c-divider, #444);
  font: 14px/1.3 var(--vp-font-family-base, sans-serif);
  color: var(--vp-c-text-1, #e0e0e0);
}

/* Убираем верхнюю границу первой строки данных */
.pricing-grid .cell:nth-child(3) {
  border-top: none;
}

/* Шапка */
.header {
  background: var(--vp-c-bg-emphasis, #1b1b1b);
  color: var(--vp-c-text-base, #fff);
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

/* Галочка */
.check {
  justify-content: center;
  color: #9aff00;
  font-size: 18px;
  font-weight: 600;
}

/* Кнопка */
.partner-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px 0;
  font: 600 16px/1 var(--vp-font-family-base, sans-serif);
  border: 2px solid #9aff00;
  border-radius: 8px;
  background: transparent;
  color: #9aff00;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.partner-btn:hover {
  background: #9aff00;
  color: #1a1a1a;
}
</style>
