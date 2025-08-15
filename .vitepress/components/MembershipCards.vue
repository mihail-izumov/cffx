<template>
  <div class="pricing-grid">
    <!-- КАРТОЧКА: СИМУЛЯТОР (БЕСПЛАТНО) -->
    <div class="pricing-card pricing-card--featured">
      <h3 class="card-title">Симулятор</h3>
      <div class="card-image-wrapper">
        <img src="https://via.placeholder.com/400x225/2d2d30/ffffff?text=Simulator" alt="Симулятор" class="card-image">
      </div>
      
      <div class="card-price">
        <strong>Бесплатно</strong>
      </div>

      <ul class="feature-list">
        <li class="feature-item">
          <CheckIcon />
          <span>Симулятор города</span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>Тестирование бизнес-моделей</span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>Делиться чатами с Анной</span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>Доступ к Кофейному Протоколу</span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>Поддержка Анны при старте</span>
        </li>
      </ul>
      
      <a href="/brew/membership" class="card-button">Начать с Симулятора</a>
    </div>

    <!-- КАРТОЧКА: ИНСАЙДЕР (ПЛАТНО) -->
    <div class="pricing-card">
      <h3 class="card-title">Инсайдер</h3>
      <div class="card-image-wrapper">
        <img src="https://via.placeholder.com/400x225/353538/C5F946?text=Insider" alt="Инсайдер" class="card-image">
      </div>

      <div class="card-price">
        <strong>12 000 ₽/мес.</strong>
      </div>
      
      <p class="includes-all">Все, что в Симуляторе, плюс:</p>
      
      <ul class="feature-list">
        <li class="feature-item">
          <CheckIcon />
          <span>Ежемесячный обзор рынка</span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>Доступ к Индексу Роста</span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>Анализ компаний в фокусе</span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>Обновления симулятора</span>
        </li>
      </ul>
      
      <a href="/brew/membership" class="card-button card-button--secondary">Стать Инсайдером</a>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue';

// Компонент для иконки-галочки
const CheckIcon = () =>
  h(
    'svg',
    {
      class: 'checkmark-icon',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [h('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }), h('polyline', { points: '22 4 12 14.01 9 11.01' })]
  );
</script>

<style scoped>
/* --- Базовая сетка --- */
.pricing-grid {
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
  gap: 1.5rem; 
  margin: 2rem 0;
}

/* --- Стиль карточки --- */
.pricing-card {
  background-color: #2d2d30;
  border: 2px solid #444444;
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.pricing-card:hover {
  transform: translateY(-6px);
  border-color: #C5F946;
  box-shadow: 0 12px 35px rgba(197, 249, 70, 0.15);
  background-color: #353538;
}

/* --- Выделение бесплатной карточки --- */
.pricing-card--featured {
  border-color: #666;
}

/* --- Заголовок карточки --- */
.card-title {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 20px 0;
  padding: 0;
  border: none;
  letter-spacing: 0.02em;
}

/* --- Изображение --- */
.card-image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 22px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* --- Блок с ценой --- */
.card-price {
  text-align: center;
  margin-bottom: 24px;
}
.card-price strong {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
}

/* --- Список преимуществ --- */
.includes-all {
  font-size: 0.9rem;
  color: #a8a8a8;
  margin: 0 0 16px 4px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #e0e0e0;
  font-size: 0.95rem;
  line-height: 1.4;
}

.checkmark-icon {
  width: 20px;
  height: 20px;
  color: #C5F946;
  flex-shrink: 0;
}

/* --- Кнопка --- */
.card-button {
  margin-top: 24px;
  background-color: #C5F946;
  color: #000000;
  padding: 14px 18px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.94rem;
  text-align: center;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 2px solid #C5F946;
  box-sizing: border-box;
  display: block;
}

.card-button:hover {
  background-color: #ffffff;
  border-color: #ffffff;
  color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
}

.card-button--secondary {
  background-color: transparent;
  color: #C5F946;
  border-color: #C5F946;
}

.card-button--secondary:hover {
  background-color: #C5F946;
  color: #000000;
  border-color: #C5F946;
}
</style>
