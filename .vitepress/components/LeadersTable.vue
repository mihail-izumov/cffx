<template>
  <div class="pricing-block">
    <div class="pricing-grid">
      <!-- Заголовок -->
      <div class="cell header">Преимущества</div>
      <div class="cell header price">₽360000/год</div>
      <!-- Данные -->
      <div class="cell subtitle">Все, что в Симуляторе и Инсайдере, плюс:</div>
      <div class="cell subtitle-check"></div>
      
      <div class="cell feature">
        <div class="feature-title">Участие в развитии платформы</div>
        <div class="feature-description">Определяйте приоритеты развития BREW</div>
        <div class="feature-details">Голосование за новые функции и города для анализа</div>
      </div>
      <div class="cell check">✓</div>
      
      <div class="cell feature">
        <div class="feature-title">Персональные сессии с аналитиком BREW</div>
        <div class="feature-description">Отслеживайте прогресс на 90 мин./мес. стратегических сессиях</div>
        <div class="feature-details">Оценка метрик, точки роста, сигналы коррекции</div>
      </div>
      <div class="cell check">✓</div>
      
      <div class="cell feature">
        <div class="feature-title">Темный Режим</div>
        <div class="feature-description">Находите то, что упускают 90% игроков</div>
        <div class="feature-details">Скрытые срезы: паттерны и тренды, невидимые для рынка</div>
      </div>
      <div class="cell check">✓</div>
      
      <div class="cell feature">
        <div class="feature-title">-20% на Чекап Модуля Роста®</div>
        <div class="feature-description">Найти скрытые разрывы в процессах, которые тормозят рост</div>
        <div class="feature-details">3 конкретных улучшения за 30 дней</div>
      </div>
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
  min-height: 48px;
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
/* Стили для функций */
.feature {
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  min-height: auto;
}
.feature-title {
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  margin-bottom: 4px;
}
.feature-description {
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  margin-bottom: 4px;
  line-height: 1.4;
}
.feature-details {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.3;
}
</style>
