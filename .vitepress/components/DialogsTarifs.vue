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
  <div class="table-wrapper">
    <div class="pricing-grid">
      <!-- Заголовки -->
      <div class="grid-cell grid-header header-feature"></div>
      <div
        v-for="(tariff, colIndex) in tariffs"
        :key="tariff.title"
        class="grid-cell grid-header"
        :class="{
          highlighted: tariff.isHighlighted,
          'is-last-col': colIndex === tariffs.length - 1
        }"
      >
        <div class="title-wrap">
          <span class="tariff-title">{{ tariff.title }}</span>
        </div>
        <div class="desc-wrap">
          <span class="tariff-description">{{ tariff.description }}</span>
        </div>
      </div>

      <!-- Цены -->
      <template v-for="(duration, rowIndex) in priceDurations" :key="duration">
        <div class="grid-cell cell-feature" :class="{ 'price-separator-top': rowIndex === 0 }">
          {{ duration }}
        </div>
        <div
          v-for="(tariff, colIndex) in tariffs"
          :key="tariff.title + duration"
          class="grid-cell cell-price"
          :class="{
            'price-separator-top': rowIndex === 0,
            highlighted: tariff.isHighlighted,
            'is-last-col': colIndex === tariffs.length - 1
          }"
        >
          <span class="price-per-month">{{ tariff.prices[duration].perMonth }}</span>
          <span v-if="tariff.prices[duration].total" class="price-total">{{ tariff.prices[duration].total }}</span>
        </div>
      </template>

      <!-- Разделитель -->
      <div class="grid-cell-separator"></div>

      <!-- Характеристики -->
      <template v-for="(feature, featureIndex) in featureOrder" :key="feature">
        <div class="grid-cell cell-feature" :class="{ 'last-row-cell': featureIndex === featureOrder.length - 1 }">
          {{ feature }}
        </div>
        <div
          v-for="(tariff, colIndex) in tariffs"
          :key="tariff.title + feature"
          class="grid-cell cell-value"
          :class="{
            'last-row-cell': featureIndex === featureOrder.length - 1,
            highlighted: tariff.isHighlighted,
            'is-last-col': colIndex === tariffs.length - 1
          }"
        >
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

/* Базовые ячейки */
.grid-cell {
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
  min-height: 52px;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}

/* СНИМАЕМ правую границу только у последнего столбца (без nth-child) */
.grid-cell.is-last-col { border-right: none; }

/* Заголовки: больше воздуха и точное выравнивание */
.grid-header {
  border-bottom: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  min-height: 120px;              /* больше воздуха */
  padding-top: 14px;               /* верхний воздух */
  padding-bottom: 14px;            /* нижний воздух */
}

/* Две зоны: название по центру строки, подпись к верхнему краю */
.title-wrap {
  min-height: 50px;                /* зона синей линии (центр) */
  display: flex;
  align-items: center;              /* по центру по вертикали */
  justify-content: center;
  text-align: center;
}
.desc-wrap {
  min-height: 44px;                /* зона под красной линией (верх) */
  display: flex;
  align-items: flex-start;          /* к верхнему краю */
  justify-content: center;
  text-align: center;
}

.tariff-title {
  font-weight: 600;
  font-size: 1.12em;
  color: var(--vp-c-text-1);
}
.tariff-description {
  margin-top: 4px;
  font-size: 0.92em;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

/* Левая колонка с названиями строк */
.cell-feature {
  padding: 12px 16px;
  justify-content: center;
  align-items: flex-start;
  font-size: 0.95em;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
}

/* Данные */
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

/* Разделители строк */
.price-separator-top { border-top: 1px solid var(--vp-c-divider); }
.grid-cell-separator {
  height: 2px;
  background-color: var(--vp-c-divider);
  grid-column: 1 / -1;
  border: none;
}
.last-row-cell { border-bottom: none; }

/* Аккуратная рамка второго тарифа без перекрытия перегородок */
.highlighted {
  position: relative;
  z-index: 0;                       /* не ломаем внутренние линии */
  border-left: 2px solid var(--vp-c-brand-1);
  border-right: 2px solid var(--vp-c-brand-1);
}
.grid-header.highlighted {
  border-top: 2px solid var(--vp-c-brand-1);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.last-row-cell.highlighted {
  border-bottom: 2px solid var(--vp-c-brand-1);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
