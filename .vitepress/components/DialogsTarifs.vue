<script setup>
import { ref } from 'vue'

const tariffs = ref([
  {
    title: 'Базовый',
    description: 'Реакция на отзывы',
    isHighlighted: false,
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
    isHighlighted: true,
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
  <div class="brew-pricing">
    <div class="brew-pricing__grid-container">
      <div class="brew-pricing__grid">
        <!-- Headers -->
        <div class="brew-pricing__cell brew-pricing__cell--feature"></div>
        <div v-for="(tariff, index) in tariffs" :key="tariff.title"
             class="brew-pricing__cell brew-pricing__cell--header"
             :class="{ 'brew-pricing__cell--highlighted': tariff.isHighlighted }">
          
          <div v-if="tariff.isHighlighted" class="brew-pricing__badge">Популярный</div>
          
          <span class="brew-pricing__title">{{ tariff.title }}</span>
          <span class="brew-pricing__description">{{ tariff.description }}</span>
        </div>

        <!-- Price Separator -->
        <div class="brew-pricing__separator" style="grid-column: 1 / -1;"></div>

        <!-- Prices -->
        <template v-for="duration in priceDurations">
          <div class="brew-pricing__cell brew-pricing__cell--feature">{{ duration }}</div>
          <div v-for="tariff in tariffs" :key="tariff.title"
               class="brew-pricing__cell brew-pricing__cell--price"
               :class="{ 'brew-pricing__cell--highlighted': tariff.isHighlighted }">
            <span class="brew-pricing__price-main">{{ tariff.prices[duration].perMonth }}</span>
            <span v-if="tariff.prices[duration].total" class="brew-pricing__price-sub">{{ tariff.prices[duration].total }}</span>
          </div>
        </template>
        
        <!-- Feature Separator -->
        <div class="brew-pricing__separator" style="grid-column: 1 / -1;"></div>

        <!-- Features -->
        <template v-for="feature in featureOrder">
          <div class="brew-pricing__cell brew-pricing__cell--feature">{{ feature }}</div>
          <div v-for="tariff in tariffs" :key="tariff.title"
               class="brew-pricing__cell"
               :class="{ 'brew-pricing__cell--highlighted': tariff.isHighlighted }">
            <span>{{ tariff.features[feature] }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --brew-pricing-highlight-border: var(--vp-c-brand-1);
  --brew-pricing-highlight-bg: var(--vp-c-bg-soft);
  --brew-pricing-lift: -20px;
}
.dark {
  --brew-pricing-highlight-bg: #242c37;
}

.brew-pricing {
  margin-top: calc(24px - var(--brew-pricing-lift));
  padding-top: calc(1px - var(--brew-pricing-lift));
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.brew-pricing__grid-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  min-width: 700px;
}

.brew-pricing__grid {
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
}

.brew-pricing__cell {
  position: relative;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.brew-pricing__grid > .brew-pricing__cell:not(:nth-child(4n)) {
  border-right: 1px solid var(--vp-c-divider);
}
/* Remove bottom border from last row */
.brew-pricing__grid > .brew-pricing__cell:nth-last-child(-n+4) {
  border-bottom: none;
}

.brew-pricing__cell--feature {
  align-items: flex-start;
  text-align: left;
  font-size: 0.95em;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
}

.brew-pricing__cell--header {
  min-height: 100px;
}

.brew-pricing__cell--price {
  white-space: nowrap;
}

.brew-pricing__title {
  font-weight: 600;
  font-size: 1.15em;
}
.brew-pricing__description {
  margin-top: 6px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}
.brew-pricing__price-main {
  font-weight: 600;
  font-size: 1.1em;
}
.brew-pricing__price-sub {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.brew-pricing__separator {
  height: 2px;
  background-color: var(--vp-c-divider);
  border: none;
}

/* Highlighted Column Styles */
.brew-pricing__cell--highlighted {
  background-color: var(--brew-pricing-highlight-bg);
}

.brew-pricing__grid .brew-pricing__cell--highlighted {
  transform: translateY(var(--brew-pricing-lift));
  border-left-color: var(--brew-pricing-highlight-border);
  border-right-color: var(--brew-pricing-highlight-border);
}
.brew-pricing__grid > .brew-pricing__cell.brew-pricing__cell--highlighted:first-of-type {
  border-top: 2px solid var(--brew-pricing-highlight-border);
  border-left: 2px solid var(--brew-pricing-highlight-border);
  border-top-left-radius: 8px;
}
.brew-pricing__grid > .brew-pricing__cell.brew-pricing__cell--highlighted:nth-of-type(3) {
  border-top: 2px solid var(--brew-pricing-highlight-border);
  border-right: 2px solid var(--brew-pricing-highlight-border);
  border-top-right-radius: 8px;
}
.brew-pricing__grid > .brew-pricing__cell.brew-pricing__cell--highlighted {
    border-left: 2px solid var(--brew-pricing-highlight-border);
    border-right: 2px solid var(--brew-pricing-highlight-border);
}
.brew-pricing__grid > .brew-pricing__cell--highlighted:nth-last-child(2) {
    border-bottom: 2px solid var(--brew-pricing-highlight-border);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.brew-pricing__badge {
  position: absolute;
  top: calc(var(--brew-pricing-lift) - 16px);
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--brew-pricing-highlight-border);
  color: #fff;
  padding: 5px 15px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 20;
}
</style>
