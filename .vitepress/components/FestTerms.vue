<template>
  <div class="pricing-block">
    <div class="pricing-grid">
      <!-- Заголовок -->
      <div class="cell header">Условия участия</div>
      <div class="cell header price">15 000 ₽</div>
      
      <!-- Данные -->
      <div class="cell feature">
        <div class="feature-title">Организация площадки</div>
        <div class="feature-description">Готовое место с полным техническим оснащением</div>
        <div class="feature-details">Звук, свет, мебель, регистрация гостей</div>
      </div>
      <div class="cell check">✓</div>
      
      <div class="cell feature">
        <div class="feature-title">Инфоподдержка</div>
        <div class="feature-description">Анонсы и освещение в официальных каналах</div>
        <div class="feature-details">Соцсети, сайт, пресс-релизы, медиапартнеры</div>
      </div>
      <div class="cell check">✓</div>
      
      <div class="cell feature">
        <div class="feature-title">Включение в программу фестиваля</div>
        <div class="feature-description">Официальный статус участника события</div>
        <div class="feature-details">Расписание, афиша, навигация по площадке</div>
      </div>
      <div class="cell check">✓</div>
      
      <div class="cell feature">
        <div class="feature-title">PR-материалы</div>
        <div class="feature-description">Размещение логотипа и информации о компании</div>
        <div class="feature-details">Буклеты, баннеры, презентации, партнерские материалы</div>
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
  font-size: 16px;
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
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.3;
}
</style>
