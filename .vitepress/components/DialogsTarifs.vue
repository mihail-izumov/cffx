<script setup>
import { ref } from 'vue'

// Данные тарифов остаются без изменений
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
    <div class="brew-pricing__grid">
      <!-- Feature Column -->
      <div class="brew-pricing__column">
        <div class="brew-pricing__cell brew-pricing__cell--header-placeholder"></div>
        <div class="brew-pricing__separator"></div>
        <div v-for="duration in priceDurations" :key="duration" class="brew-pricing__cell brew-pricing__cell--feature-name">
          {{ duration }}
        </div>
        <div class="brew-pricing__separator"></div>
        <div v-for="feature in featureOrder" :key="feature" class="brew-pricing__cell brew-pricing__cell--feature-name">
          {{ feature }}
        </div>
      </div>

      <!-- Tariff Columns -->
      <div v-for="tariff in tariffs" :key="tariff.title"
           class="brew-pricing__column"
           :class="{ 'brew-pricing__column--highlighted': tariff.isHighlighted }">
        
        <div v-if="tariff.isHighlighted" class="brew-pricing__badge">Популярный</div>

        <div class="brew-pricing__cell brew-pricing__cell--header">
          <span class="brew-pricing__title">{{ tariff.title }}</span>
          <span class="brew-pricing__description">{{ tariff.description }}</span>
        </div>
        <div class="brew-pricing__separator"></div>

        <div v-for="duration in priceDurations" :key="duration" class="brew-pricing__cell brew-pricing__cell--price">
          <span class="brew-pricing__price-main">{{ tariff.prices[duration].perMonth }}</span>
          <span v-if="tariff.prices[duration].total" class="brew-pricing__price-sub">{{ tariff.prices[duration].total }}</span>
        </div>
        
        <div class="brew-pricing__separator"></div>
        
        <div v-for="feature in featureOrder" :key="feature" class="brew-pricing__cell brew-pricing__cell--value">
          <span>{{ tariff.features[feature] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles ensure this CSS only applies to this component. */
/* BEM naming with a unique prefix `brew-pricing` prevents any possible style conflicts. */

:root {
  --brew-pricing-highlight-border: var(--vp-c-brand-1);
  --brew-pricing-highlight-bg: var(--vp-c-bg-soft);
}

.dark {
  --brew-pricing-highlight-bg: #242c37;
}

.brew-pricing {
  margin: 48px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.brew-pricing__grid {
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  position: relative;
  min-width: 700px;
}

.brew-pricing__column {
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
}

.brew-pricing__column:not(:first-child):not(:last-child) {
  border-left: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
}

.brew-pricing__column--highlighted {
  transform: translateY(-24px);
  background-color: var(--brew-pricing-highlight-bg);
  border: 2px solid var(--brew-pricing-highlight-border);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.brew-pricing__column--highlighted .brew-pricing__cell {
  border-color: transparent;
}

.brew-pricing__badge {
  position: absolute;
  top: -16px;
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

.brew-pricing__cell {
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid var(--vp-c-divider);
  min-height: 50px;
}
.brew-pricing__column .brew-pricing__cell:last-child {
  border-bottom: none;
}

.brew-pricing__cell--header {
  min-height: 90px;
  text-align: center;
  justify-content: center;
}

.brew-pricing__cell--header-placeholder {
  min-height: 90px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.brew-pricing__title {
  font-weight: 600;
  font-size: 1.15em;
  color: var(--vp-c-text-1);
}
.brew-pricing__description {
  margin-top: 6px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.brew-pricing__cell--feature-name {
  font-size: 0.95em;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
  justify-content: flex-start;
}

.brew-pricing__cell--price, .brew-pricing__cell--value {
  text-align: center;
  align-items: center;
  white-space: nowrap;
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
.brew-pricing__cell--value {
  font-size: 1em;
}

.brew-pricing__separator {
  height: 2px;
  min-height: 2px;
  padding: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.brew-pricing__column--highlighted .brew-pricing__separator {
   background-color: var(--vp-c-divider);
   border-bottom: none;
}
</style>
