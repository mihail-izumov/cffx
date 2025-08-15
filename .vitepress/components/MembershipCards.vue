<template>
  <div class="pricing-grid">
    <!-- КАРТОЧКА: СИМУЛЯТОР (БЕСПЛАТНО) — те-перь первая -->
    <div class="pricing-card">
      <h3 class="card-title card-title--simulator">СИМУЛЯТОР</h3>

      <div class="card-image-wrapper">
        <img
          src="/simulator-ban.svg"
          alt="Симулятор"
          class="card-image"
        />
      </div>

      <div class="card-price">
        <strong>Бесплатно</strong>
      </div>

      <ul class="feature-list">
        <li class="feature-item"><CheckIcon /><span>Симулятор города</span></li>
        <li class="feature-item"><CheckIcon /><span>Тестирование бизнес-моделей</span></li>
        <li class="feature-item"><CheckIcon /><span>Делиться чатами с Анной</span></li>
        <li class="feature-item"><CheckIcon /><span>Доступ к Кофейному Протоколу</span></li>
        <li class="feature-item"><CheckIcon /><span>Поддержка Анны при старте</span></li>
      </ul>

      <a href="/brew/join/free" class="card-button card-button--secondary">
        Начать с Симулятора
      </a>
    </div>

    <!-- КАРТОЧКА: ИНСАЙДЕР (ПЛАТНО) — теперь вторая -->
    <div class="pricing-card pricing-card--featured">
      <h3 class="card-title card-title--insider">ИНСАЙДЕР</h3>

      <div class="card-image-wrapper">
        <img
          src="/insider-ban.svg"
          alt="Инсайдер"
          class="card-image"
        />
      </div>

      <div class="card-price">
        <strong>₽12500/мес.</strong>
      </div>

      <p class="includes-all">Все, что в Симуляторе, плюс:</p>

      <ul class="feature-list">
        <li class="feature-item"><CheckIcon /><span>Ежемесячный обзор рынка</span></li>
        <li class="feature-item"><CheckIcon /><span>Доступ к Индексу Роста</span></li>
        <li class="feature-item"><CheckIcon /><span>Анализ компаний в фокусе</span></li>
        <li class="feature-item"><CheckIcon /><span>Обновления симулятора</span></li>
      </ul>

      <a href="/brew/join/insider" class="card-button">Стать Инсайдером</a>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

/* Простая SVG-галочка */
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
      'stroke-linejoin': 'round'
    },
    [
      h('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
      h('polyline', { points: '22 4 12 14.01 9 11.01' })
    ]
  )
</script>

<style scoped>
/* СЕТКА ------------------------------------------------------------------- */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

/* КАРТОЧКИ ---------------------------------------------------------------- */
.pricing-card {
  background: #2d2d30;
  border: 2px solid #444;
  border-radius: 18px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-6px);
  border-color: #c5f946;
  box-shadow: 0 12px 35px rgba(197, 249, 70, 0.15);
  background: #353538;
}

/* Выделяем ИНСАЙДЕР зелёной рамкой */
.pricing-card--featured {
  border-color: #c5f946;
}

/* ЗАГОЛОВКИ --------------------------------------------------------------- */
.card-title {
  font-weight: 300;
  text-align: center;
  letter-spacing: 0.2em;
  margin: 0 0 40px 0;
  color: #fff;
  border: none;
}

.card-title--insider { font-size: 1.5rem; }
.card-title--simulator { font-size: 1.25rem; }

/* ИЗОБРАЖЕНИЕ ------------------------------------------------------------- */
.card-image-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 22px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ЦЕНА -------------------------------------------------------------------- */
.card-price {
  text-align: center;
  margin-bottom: 24px;
}

.card-price strong {
  font-weight: 600;
  font-size: 1.3rem;
  color: #fff;
}

/* ДОПОЛНИТЕЛЬНЫЙ ТЕКСТ ---------------------------------------------------- */
.includes-all {
  font-size: 0.9rem;
  color: #a8a8a8;
  margin: 0 0 16px 4px;
}

/* СПИСОК ------------------------------------------------------------------ */
.feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.813rem;
  line-height: 1.2;
  color: #e0e0e0;
}

.checkmark-icon {
  width: 18px;
  height: 18px;
  color: #c5f946;
  flex-shrink: 0;
}

/* КНОПКИ ------------------------------------------------------------------ */
.card-button {
  margin-top: 48px;
  display: block;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 0.94rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 2px solid #c5f946;
  box-sizing: border-box;
}

.card-button {
  background: #c5f946;
  color: #000;
}

.card-button:hover {
  background: #fff;
  border-color: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
}

/* «СИМУЛЯТОР» — вторичная кнопка */
.card-button--secondary {
  background: transparent;
  color: #c5f946;
}

.card-button--secondary:hover {
  background: #c5f946;
  color: #000;
}

/* МОБИЛЬНАЯ ВЕРСИЯ -------------------------------------------------------- */
@media (max-width: 768px) {
  .feature-item {
    font-size: 1rem !important;
    line-height: 1.4 !important;
  }
  
  .checkmark-icon {
    width: 20px !important;
    height: 20px !important;
  }
  
  .pricing-card {
    padding: 32px 20px !important;
  }
}

@media (max-width: 480px) {
  .feature-item {
    font-size: 0.95rem !important;
    line-height: 1.35 !important;
  }
}
</style>
