<script setup>
import { ref } from 'vue'

const tariffs = ref([
  {
    title: 'Базовый',
    description: 'Реакция на отзывы',
    isHighlighted: false,
    prices: { '1 месяц': { perMonth: '₽30,000/мес', total: '' }, '3 месяца': { perMonth: '₽22,200/мес', total: '(₽66,600 итого)' }, '6 месяцев': { perMonth: '₽18,000/мес', total: '(₽108,000 итого)' } },
    features: { 'Перехват негатива': '24/5', 'Виджет': 'Базовый', 'Форма': 'Базовый', 'Статистика': 'Ежемесячно', 'Аналитика': 'Базовая', 'Поддержка': 'Стандартная' }
  },
  {
    title: 'Продвинутый',
    description: 'Предвосхищение проблем',
    isHighlighted: true,
    prices: { '1 месяц': { perMonth: '₽50,000/мес', total: '' }, '3 месяца': { perMonth: '₽45,000/мес', total: '(₽135,000 итого)' }, '6 месяцев': { perMonth: '₽40,000/мес', total: '(₽240,000 итого)' } },
    features: { 'Перехват негатива': '24/5', 'Виджет': 'Конструктор', 'Форма': 'Конструктор', 'Статистика': 'Ежемесячно', 'Аналитика': 'Базовая', 'Поддержка': 'Стандартная' }
  },
  {
    title: 'Полный контроль',
    description: 'Стратегическое управление репутацией',
    isHighlighted: false,
    prices: { '1 месяц': { perMonth: '₽90,000/мес', total: '' }, '3 месяца': { perMonth: '₽66,600/мес', total: '(₽199,800 итого)' }, '6 месяцев': { perMonth: '₽54,000/мес', total: '(₽324,000 итого)' } },
    features: { 'Перехват негатива': '24/7', 'Виджет': 'Конструктор', 'Форма': 'Конструктор', 'Статистика': '1 раз/нед.', 'Аналитика': 'Расширенная', 'Поддержка': 'Приоритетная' }
  }
])

const priceDurations = ['1 месяц', '3 месяца', '6 месяцев']
const featureOrder = ['Перехват негатива', 'Виджет', 'Форма', 'Статистика', 'Аналитика', 'Поддержка']
</script>

<template>
  <div class="table-wrapper">
    <div class="pricing-grid">
      <!-- Overlay for Highlight -->
      <div class="highlight-overlay"></div>

      <!-- Headers -->
      <div class="grid-cell grid-header header-feature"></div>
      <div v-for="tariff in tariffs" :key="tariff.title" class="grid-cell grid-header">
        <div class="tariff-title-wrapper">
          <span class="tariff-title">{{ tariff.title }}</span>
        </div>
        <div class="tariff-description-wrapper">
          <span class="tariff-description">{{ tariff.description }}</span>
        </div>
      </div>

      <!-- Prices -->
      <template v-for="(duration, index) in priceDurations">
        <div class="grid-cell cell-feature" :class="{ 'price-separator-top': index === 0 }">{{ duration }}</div>
        <div v-for="tariff in tariffs" :key="tariff.title" class="grid-cell cell-price" :class="{ 'price-separator-top': index === 0 }">
          <span class="price-per-month">{{ tariff.prices[duration].perMonth }}</span>
          <span v-if="tariff.prices[duration].total" class="price-total">{{ tariff.prices[duration].total }}</span>
        </div>
      </template>

      <!-- Separator -->
      <div class="grid-cell-separator"></div>

      <!-- Features -->
      <template v-for="(feature, featureIndex) in featureOrder">
        <div class="grid-cell cell-feature" :class="{ 'last-row-cell': featureIndex === featureOrder.length - 1 }">{{ feature }}</div>
        <div v-for="tariff in tariffs" :key="tariff.title" class="grid-cell cell-value" :class="{ 'last-row-cell': featureIndex === featureOrder.length - 1 }">
          <span>{{ tariff.features[feature] }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 24px 0;
}
.pricing-grid {
  position: relative; /* Needed for the overlay */
  display: grid;
  grid-template-columns: 1fr repeat(3, 1fr); 
  align-items: stretch;
}
.grid-cell {
  padding: 0 16px; /* Padding will be handled by inner wrappers */
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
  min-height: 50px;
}
.pricing-grid > .grid-cell:nth-child(4n) {
  border-right: none;
}
.grid-header {
  border-bottom: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  min-height: 90px;
}
.header-feature {
  background-color: transparent;
  border-bottom: 2px solid var(--vp-c-divider);
}

/* --- СТИЛИ ВЫРАВНИВАНИЯ ЗАГОЛОВКОВ --- */
.tariff-title-wrapper, .tariff-description-wrapper {
  display: flex;
  text-align: center;
  width: 100%;
}
.tariff-title-wrapper {
  flex: 1; /* Pushes description down */
  align-items: center; /* Vertical center for title */
  justify-content: center;
}
.tariff-description-wrapper {
  flex: 1; /* Takes available space */
  align-items: flex-start; /* Aligns description to the top */
  justify-content: center;
}
.tariff-title {
  font-weight: 600;
  font-size: 1.1em;
  color: var(--vp-c-text-1);
}
.tariff-description {
  margin-top: 4px; /* Small space from the red line */
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}
/* ------------------------------------- */

.cell-feature {
  padding: 12px 16px;
  justify-content: center;
  align-items: flex-start;
  font-size: 0.95em;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
}
.cell-price, .cell-value {
  padding: 12px 16px;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.price-per-month {
  font-weight: 600;
  font-size: 1.05em;
}
.price-total {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}
.price-separator-top {
  border-top: 1px solid var(--vp-c-divider);
}
.grid-cell-separator {
  height: 2px;
  background-color: var(--vp-c-divider);
  grid-column: 1 / -1;
  border: none;
}
.last-row-cell {
  border-bottom: none;
}

/* --- НАДЁЖНАЯ ОБВОДКА --- */
.highlight-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  /* Position over the 3rd column (1st is feature, 2nd is basic, 3rd is advanced) */
  grid-column: 3; 
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 6px;
  z-index: 5;
  pointer-events: none; /* Make it non-interactive */
}
</style>
