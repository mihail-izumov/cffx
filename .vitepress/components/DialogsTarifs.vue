<script setup>
import { ref } from 'vue'

const tariffs = ref([
  {
    title: 'Базовый',
    description: 'Реакция на отзывы',
    isHighlighted: false, // Добавлено для управления подсветкой
    prices: {
      '1 месяц': { perMonth: '₽30,000/мес', total: '' },
      '3 месяца': { perMonth: '₽22,200/мес', total: '(₽66,600 итого)' },
      '6 месяцев': { perMonth: '₽18,000/мес', total: '(₽108,000 итого)' }
    },
    features: {
      'Перехват негатива': '24/5',
      'Виджет': 'Базовый',
      'Форма': 'Базовый',
      'Статистика': 'Ежемесячно',
      'Аналитика': 'Базовая',
      'Поддержка': 'Стандартная'
    }
  },
  {
    title: 'Продвинутый',
    description: 'Предвосхищение проблем',
    isHighlighted: true, // Этот тариф будет подсвечен
    prices: {
      '1 месяц': { perMonth: '₽50,000/мес', total: '' },
      '3 месяца': { perMonth: '₽45,000/мес', total: '(₽135,000 итого)' },
      '6 месяцев': { perMonth: '₽40,000/мес', total: '(₽240,000 итого)' }
    },
    features: {
      'Перехват негатива': '24/5',
      'Виджет': 'Конструктор',
      'Форма': 'Конструктор',
      'Статистика': 'Ежемесячно',
      'Аналитика': 'Базовая',
      'Поддержка': 'Стандартная'
    }
  },
  {
    title: 'Полный контроль',
    description: 'Стратегическое управление репутацией',
    isHighlighted: false,
    prices: {
      '1 месяц': { perMonth: '₽90,000/мес', total: '' },
      '3 месяца': { perMonth: '₽66,600/мес', total: '(₽199,800 итого)' },
      '6 месяцев': { perMonth: '₽54,000/мес', total: '(₽324,000 итого)' }
    },
    features: {
      'Перехват негатива': '24/7',
      'Виджет': 'Конструктор',
      'Форма': 'Конструктор',
      'Статистика': '1 раз/нед.',
      'Аналитика': 'Расширенная',
      'Поддержка': 'Приоритетная'
    }
  }
])

const priceDurations = ['1 месяц', '3 месяца', '6 месяцев']
const featureOrder = ['Перехват негатива', 'Виджет', 'Форма', 'Статистика', 'Аналитика', 'Поддержка']
</script>

<template>
  <div class="table-wrapper">
    <div class="pricing-grid">
      <!-- Заголовки тарифов -->
      <div class="grid-cell grid-header header-feature"></div>
      <div v-for="tariff in tariffs" :key="tariff.title" 
           class="grid-cell grid-header"
           :class="{ 'highlighted-cell': tariff.isHighlighted }">
        <span class="tariff-title">{{ tariff.title }}</span>
        <span class="tariff-description">{{ tariff.description }}</span>
      </div>

      <!-- Цены -->
      <template v-for="(duration, index) in priceDurations" :key="duration">
        <div 
          class="grid-cell cell-feature price-label"
          :class="{ 'price-separator-top': index === 0 }">{{ duration }}</div>
        <div 
          v-for="tariff in tariffs" :key="tariff.title" 
          class="grid-cell cell-price"
          :class="{ 'price-separator-top': index === 0, 'highlighted-cell': tariff.isHighlighted }">
          <span class="price-per-month">{{ tariff.prices[duration].perMonth }}</span>
          <span v-if="tariff.prices[duration].total" class="price-total">{{ tariff.prices[duration].total }}</span>
        </div>
      </template>

      <!-- Разделитель -->
      <div class="grid-cell-separator" :style="{ 'grid-column': '1 / -1' }"></div>

      <!-- Характеристики -->
      <template v-for="(feature, featureIndex) in featureOrder" :key="feature">
        <div 
          class="grid-cell cell-feature"
          :class="{ 'last-row-cell': featureIndex === featureOrder.length - 1 }">{{ feature }}</div>
        <div 
          v-for="(tariff, checkIndex) in tariffs" :key="checkIndex" 
          class="grid-cell cell-value"
          :class="{ 'last-row-cell': featureIndex === featureOrder.length - 1, 'highlighted-cell': tariff.isHighlighted }">
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
  display: grid;
  grid-template-columns: 1fr repeat(3, 1fr); 
  align-items: stretch;
}
.grid-cell {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  min-height: 80px;
  /* ИЗМЕНЕНИЯ ДЛЯ ЦЕНТРИРОВАНИЯ */
  text-align: center;
  align-items: center;
}
.header-feature {
  background-color: transparent;
  border-bottom: 2px solid var(--vp-c-divider);
}
.tariff-title {
  font-weight: 600;
  font-size: 1.1em;
  color: var(--vp-c-text-1);
}
.tariff-description {
  margin-top: 4px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}
.cell-feature {
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 0.95em;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
}
.price-label {
  background-color: transparent;
}
.cell-price {
  text-align: center;
  align-items: center;
  white-space: nowrap;
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
.cell-value {
  text-align: center;
  align-items: center;
  font-size: 0.95em;
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

/* СТИЛИ ДЛЯ ПОДСВЕТКИ */
.highlighted-cell {
  border-left: 2px solid var(--vp-c-brand-1);
  border-right: 2px solid var(--vp-c-brand-1);
}
.grid-header.highlighted-cell {
  border-top: 2px solid var(--vp-c-brand-1);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.last-row-cell.highlighted-cell {
  border-bottom: 2px solid var(--vp-c-brand-1);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
