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
  <div class="brp">
    <div class="brp__grid">
      <!-- Пустая ячейка в шапке -->
      <div class="brp__cell brp__cell--header brp__cell--header-placeholder"></div>

      <!-- Заголовки тарифов -->
      <div
        v-for="(tariff, colIndex) in tariffs"
        :key="tariff.title"
        class="brp__cell brp__cell--header"
        :class="{
          'brp--highlight': tariff.isHighlighted,
          'brp--last-col': colIndex === tariffs.length - 1
        }"
      >
        <div class="brp__title-wrap">
          <span class="brp__title">{{ tariff.title }}</span>
        </div>
        <div class="brp__desc-wrap">
          <span class="brp__desc">{{ tariff.description }}</span>
        </div>
      </div>

      <!-- Цены -->
      <template v-for="(duration, rowIndex) in priceDurations" :key="duration">
        <div
          class="brp__cell brp__cell--label brp--no-bg"
          :class="{ 'brp--top-sep': rowIndex === 0 }"
        >
          {{ duration }}
        </div>

        <div
          v-for="(tariff, colIndex) in tariffs"
          :key="tariff.title + duration"
          class="brp__cell brp__cell--price"
          :class="{
            'brp--top-sep': rowIndex === 0,
            'brp--highlight': tariff.isHighlighted,
            'brp--last-col': colIndex === tariffs.length - 1
          }"
        >
          <span class="brp__price-main">{{ tariff.prices[duration].perMonth }}</span>
          <span v-if="tariff.prices[duration].total" class="brp__price-sub">
            {{ tariff.prices[duration].total }}
          </span>
        </div>
      </template>

      <!-- Разделитель -->
      <div class="brp__row-sep"></div>

      <!-- Особенности -->
      <template v-for="(feature, featureIndex) in featureOrder" :key="feature">
        <div
          class="brp__cell brp__cell--label"
          :class="{ 'brp__cell--last': featureIndex === featureOrder.length - 1 }"
        >
          {{ feature }}
        </div>

        <div
          v-for="(tariff, colIndex) in tariffs"
          :key="tariff.title + feature"
          class="brp__cell brp__cell--value"
          :class="{
            'brp__cell--last': featureIndex === featureOrder.length - 1,
            'brp--highlight': tariff.isHighlighted,
            'brp--last-col': colIndex === tariffs.length - 1
          }"
        >
          <span>{{ tariff.features[feature] }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Контейнер */
.brp {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 24px 0;
}

/* Сетка */
.brp__grid {
  display: grid;
  grid-template-columns: 1fr repeat(3, 1fr);
  align-items: stretch;
}

/* Ячейка по умолчанию */
.brp__cell {
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
  min-height: 52px;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}

/* Убираем правую границу только у последнего столбца (без nth-child) */
.brp--last-col {
  border-right: none;
}

/* Шапка */
.brp__cell--header {
  border-bottom: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  min-height: 120px;
  padding-top: 16px;
  padding-bottom: 16px;
}

/* Пустая шапка слева — без фона */
.brp__cell--header-placeholder {
  background-color: transparent;
}

/* Две зоны контроля выравнивания */
.brp__title-wrap {
  min-height: 56px;              /* зона для названия (центр) */
  display: flex;
  align-items: center;            /* по вертикали центр */
  justify-content: center;
  text-align: center;
}
.brp__desc-wrap {
  min-height: 46px;              /* зона для подписи (к верху) */
  display: flex;
  align-items: flex-start;        /* к верхнему краю */
  justify-content: center;
  text-align: center;
}

.brp__title {
  font-weight: 600;
  font-size: 1.12em;
  color: var(--vp-c-text-1);
}
.brp__desc {
  margin-top: 4px;
  font-size: 0.92em;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

/* Левая колонка-метки */
.brp__cell--label {
  padding: 12px 16px;
  justify-content: center;
  align-items: flex-start;
  font-size: 0.95em;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
}

/* Убираем фон у верхних левых ячеек (1/3/6 месяцев) */
.brp--no-bg {
  background-color: transparent;
}

/* Значения */
.brp__cell--price,
.brp__cell--value {
  padding: 12px 16px;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.brp__price-main {
  font-weight: 600;
  font-size: 1.05em;
}
.brp__price-sub {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

/* Разделители строк */
.brp--top-sep {
  border-top: 1px solid var(--vp-c-divider);
}
.brp__row-sep {
  height: 2px;
  background-color: var(--vp-c-divider);
  grid-column: 1 / -1;
  border: none;
}
.brp__cell--last {
  border-bottom: none;
}

/* Рамка второго тарифа: всегда поверх внутренних линий, без ломания перегородок */
.brp--highlight {
  border-left: 2px solid var(--vp-c-brand-1);
  border-right: 2px solid var(--vp-c-brand-1);
}
.brp__cell--header.brp--highlight {
  border-top: 2px solid var(--vp-c-brand-1);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.brp__cell--last.brp--highlight {
  border-bottom: 2px solid var(--vp-c-brand-1);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
