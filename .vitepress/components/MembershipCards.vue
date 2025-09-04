<template>
  <div class="pricing-grid">
    <!-- КАРТОЧКА: СИМУЛЯТОР (БЕСПЛАТНО) -->
    <div class="pricing-card">
      <h3 class="card-title card-title--simulator">СТАРТ</h3>
      <p class="card-subtitle">Избежать 3 самых дорогих ошибок новичков</p>
      <div class="card-image-wrapper">
        <img
          src="/simulator-ban.svg"
          alt="Симулятор"
          class="card-image"
        />
      </div>
      <div class="card-price">
        <strong>Бесплатно</strong>
        <div class="payment-type">Регистрация</div>
      </div>
      <ul class="feature-list">
        <li class="feature-item"><CheckIcon /><span><a href="/brew/sim" target="_blank" class="feature-link">Диалоги с данным</a></span></li>
        <li class="feature-item"><CheckIcon /><span><a href="/brew/calc" target="_blank" class="feature-link">Прогноз дохода</a></span></li>
        <li class="feature-item"><CheckIcon /><span>ИИ-ассистент Анна</span></li>
      </ul>
      <a href="/brew/join/free" class="card-button card-button--secondary">
        Начать бесплатно
      </a>
    </div>
    <!-- КАРТОЧКА: ИНСАЙДЕР (ПЛАТНО) -->
    <div class="pricing-card pricing-card--featured">
      <h3 class="card-title card-title--insider">ИНСАЙДЕР</h3>
      <p class="card-subtitle">Отследить, где конкуренты зарабатывают ваши деньги</p>
      <div class="card-image-wrapper">
        <img
          src="/insider-ban.svg"
          alt="Инсайдер"
          class="card-image"
        />
      </div>
      <div class="card-price">
        <strong>₽18,500/кафе</strong>
        <div class="payment-type">Ежемесячная оплата</div>
      </div>
      <p class="includes-all">Все, что в Старте, плюс:</p>
      <ul class="feature-list">
        <li class="feature-item"><CheckIcon /><span><a href="/brew/tickets" target="_blank" class="feature-link">Тикет-система "Сигнал"</a></span></li>
        <li class="feature-item"><CheckIcon /><span><a href="/brew/reports" target="_blank" class="feature-link">Анализ конкурентов</a></span></li>
        <li class="feature-item"><CheckIcon /><span>Индекс Роста: <a href="/smr" target="_blank" class="feature-link">сигналы изменений</a></span></li>
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
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.25em;
  margin: 0 0 8px 0;
  color: #fff;
  border: none;
  text-transform: uppercase;
}

.card-title--insider { font-size: 1.625rem; }
.card-title--simulator { font-size: 1.375rem; }

/* ПОДЗАГОЛОВОК ------------------------------------------------------------ */
.card-subtitle {
  font-size: 1.125rem;
  color: #c0c0c0;
  text-align: center;
  margin: 0 0 32px 0;
  line-height: 1.4;
  font-weight: 400;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}

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
  font-size: 1.425rem;
  color: #fff;
  display: block;
}

.payment-type {
  font-size: 0.925rem;
  color: #a8a8a8;
  margin-top: 4px;
}

/* ДОПОЛНИТЕЛЬНЫЙ ТЕКСТ ---------------------------------------------------- */
.includes-all {
  font-size: 1.025rem;
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
  font-size: 0.938rem;
  line-height: 1.2;
  color: #e0e0e0;
}

.checkmark-icon {
  width: 18px;
  height: 18px;
  color: #c5f946;
  flex-shrink: 0;
}

/* ССЫЛКИ В СПИСКЕ ФУНКЦИЙ ------------------------------------------------- */
.feature-link {
  color: #c5f946;
  text-decoration: none;
  transition: all 0.2s ease;
}

.feature-link:hover {
  color: #fff;
  text-decoration: underline;
}

/* КНОПКИ ------------------------------------------------------------------ */
.card-button {
  margin-top: 48px;
  display: block;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 1.065rem;
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
    font-size: 1.125rem !important;
    line-height: 1.4 !important;
  }
  
  .checkmark-icon {
    width: 20px !important;
    height: 20px !important;
  }
  
  .pricing-card {
    padding: 32px 20px !important;
  }
  
  .card-subtitle {
    font-size: 1.125rem !important;
    max-width: none !important;
  }
}

@media (max-width: 480px) {
  .feature-item {
    font-size: 1.075rem !important;
    line-height: 1.35 !important;
  }
}
</style>
