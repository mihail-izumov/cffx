<script setup>
import { ref, computed } from 'vue'

const tariffs = ref([
  {
    title: 'Базовый',
    description: 'Забрать гостей у конкурентов',
    isHighlighted: false,
    prices: {
      '1 месяц': { perMonth: '₽33,500/мес', total: '' },
      '3 месяца': { perMonth: '₽30,000/мес', total: '(₽90,000 итого)' },
      '6 месяцев': { perMonth: '₽26,700/мес', total: '(₽160,200 итого)' }
    },
    features: {
      'Конкуренты': '3',
      'Отзывы 2ГИС/Яндекс': '30 дн',
      'Аналитика': 'Базовая',
      'Поддержка': 'По запросу'
    }
  },
  {
    title: 'Расширенный',
    description: 'Создавать новые правила игры на рынке',
    isHighlighted: true,
    prices: {
      '1 месяц': { perMonth: '₽60,000/мес', total: '' },
      '3 месяца': { perMonth: '₽44,400/мес', total: '(₽133,200 итого)' },
      '6 месяцев': { perMonth: '₽36,000/мес', total: '(₽216,000 итого)' }
    },
    features: {
      'Конкуренты': '9',
      'Отзывы 2ГИС/Яндекс': '90 дн',
      'Аналитика': 'Расширенная',
      'Поддержка': 'Трекинг с Аналитиком'
    }
  }
])

const durations = ['1 месяц', '3 месяца', '6 месяцев']
const selected = ref('1 месяц')
const currentLabel = computed(() => selected.value)
const isActive = d => d === selected.value
</script>

<template>
  <div class="tariff-pricing-widget">
    <!-- Переключатели над таблицей, вне бордюра -->
    <div class="tariff-pricing-widget__header">
      <div class="tariff-pricing-widget__switch" role="tablist" aria-label="Срок подписки">
        <button
          v-for="d in durations"
          :key="d"
          class="tariff-pricing-widget__switch-btn"
          :class="{ 'tariff-pricing-widget--switch-active': isActive(d) }"
          type="button"
          role="tab"
          :aria-selected="isActive(d)"
          @click="selected = d"
        >
          {{ d }}
        </button>
      </div>
    </div>

    <!-- Отдельный контейнер с бордюром и скруглением только для таблицы -->
    <div class="tariff-pricing-widget__table">
      <div class="tariff-pricing-widget__grid">
        <!-- Пустая шапка -->
        <div class="tariff-pricing-widget__cell tariff-pricing-widget__cell--header tariff-pricing-widget__cell--header-placeholder"></div>

        <!-- Заголовки тарифов -->
        <div
          v-for="(tariff, colIndex) in tariffs"
          :key="tariff.title"
          class="tariff-pricing-widget__cell tariff-pricing-widget__cell--header"
          :class="{
            'tariff-pricing-widget--highlight': tariff.isHighlighted,
            'tariff-pricing-widget--last-col': colIndex === tariffs.length - 1
          }"
        >
          <div class="tariff-pricing-widget__title-wrap">
            <span class="tariff-pricing-widget__title">{{ tariff.title }}</span>
          </div>
          <div class="tariff-pricing-widget__desc-wrap">
            <span class="tariff-pricing-widget__desc">{{ tariff.description }}</span>
          </div>
        </div>

        <!-- Одна строка цен (по выбранному сроку) -->
        <div class="tariff-pricing-widget__cell tariff-pricing-widget__cell--label tariff-pricing-widget--no-bg tariff-pricing-widget--top-sep">
          {{ currentLabel }}
        </div>
        <div
          v-for="(tariff, colIndex) in tariffs"
          :key="tariff.title + selected"
          class="tariff-pricing-widget__cell tariff-pricing-widget__cell--price tariff-pricing-widget--top-sep"
          :class="{
            'tariff-pricing-widget--highlight': tariff.isHighlighted,
            'tariff-pricing-widget--last-col': colIndex === tariffs.length - 1
          }"
        >
          <span class="tariff-pricing-widget__price-main">{{ tariff.prices[selected].perMonth }}</span>
          <span v-if="tariff.prices[selected].total" class="tariff-pricing-widget__price-sub">
            {{ tariff.prices[selected].total }}
          </span>
        </div>

        <!-- Разделитель -->
        <div class="tariff-pricing-widget__row-sep"></div>

        <!-- Особенности -->
        <template v-for="(feature, featureIndex) in ['Конкуренты','Отзывы 2ГИС/Яндекс','Аналитика','Поддержка']" :key="feature">
          <div
            class="tariff-pricing-widget__cell tariff-pricing-widget__cell--label"
            :class="{ 'tariff-pricing-widget__cell--last': featureIndex === 3 }"
          >
            {{ feature }}
          </div>

          <div
            v-for="(tariff, colIndex) in tariffs"
            :key="tariff.title + feature"
            class="tariff-pricing-widget__cell tariff-pricing-widget__cell--value"
            :class="{
              'tariff-pricing-widget__cell--last': featureIndex === 3,
              'tariff-pricing-widget--highlight': tariff.isHighlighted,
              'tariff-pricing-widget--last-col': colIndex === tariffs.length - 1
            }"
          >
            <span>{{ tariff.features[feature] }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Внешний обёртчик без бордюра */
.tariff-pricing-widget {
  margin: 24px 0;
}

/* Хедер с переключателями над таблицей */
.tariff-pricing-widget__header {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

/* Переключатель по центру, без фоновой плашки */
.tariff-pricing-widget__switch {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0;
  background: transparent;
  margin: 0;
}
.tariff-pricing-widget__switch-btn {
  appearance: none;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-1);
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease, color .15s ease, font-weight .15s ease;
}
.tariff-pricing-widget__switch-btn:hover { border-color: var(--vp-c-brand-1); }
.tariff-pricing-widget--switch-active {
  background: color-mix(in oklab, var(--vp-c-brand-1) 14%, transparent);
  border-color: var(--vp-c-brand-1);
  font-weight: 700;
}

/* Контейнер таблицы с бордюром и прокруткой */
.tariff-pricing-widget__table {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

/* Сетка для двух тарифов */
.tariff-pricing-widget__grid {
  display: grid;
  grid-template-columns: 1fr repeat(2, 1fr);
  align-items: stretch;
}

/* Базовые ячейки */
.tariff-pricing-widget__cell {
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
  min-height: 52px;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}
.tariff-pricing-widget--last-col { border-right: none; }

/* Шапка */
.tariff-pricing-widget__cell--header {
  border-bottom: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  min-height: 120px;
  padding-top: 16px;
  padding-bottom: 16px;
}
.tariff-pricing-widget__cell--header-placeholder { background-color: transparent; }

/* Выравнивание заголовков */
.tariff-pricing-widget__title-wrap {
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tariff-pricing-widget__desc-wrap {
  min-height: 46px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
}
.tariff-pricing-widget__title { font-weight: 600; font-size: 1.12em; color: var(--vp-c-text-1); }
.tariff-pricing-widget__desc  { margin-top: 4px; font-size: 0.92em; color: var(--vp-c-text-2); line-height: 1.3; }

/* Левая колонка */
.tariff-pricing-widget__cell--label {
  padding: 12px 16px;
  justify-content: center;
  align-items: flex-start;
  font-size: 0.95em;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
}
.tariff-pricing-widget--no-bg { background-color: transparent; }

/* Значения */
.tariff-pricing-widget__cell--price,
.tariff-pricing-widget__cell--value {
  padding: 12px 16px;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.tariff-pricing-widget__price-main { font-weight: 600; font-size: 1.05em; }
.tariff-pricing-widget__price-sub  { font-size: 0.85em; color: var(--vp-c-text-2); margin-top: 2px; }

/* Разделители */
.tariff-pricing-widget--top-sep { border-top: 1px solid var(--vp-c-divider); }
.tariff-pricing-widget__row-sep  { height: 2px; background-color: var(--vp-c-divider); grid-column: 1 / -1; border: none; }
.tariff-pricing-widget__cell--last { border-bottom: none; }

/* Рамка вокруг выделенного тарифа */
.tariff-pricing-widget--highlight {
  border-left: 2px solid var(--vp-c-brand-1);
  border-right: 2px solid var(--vp-c-brand-1);
}
.tariff-pricing-widget__cell--header.tariff-pricing-widget--highlight {
  border-top: 2px solid var(--vp-c-brand-1);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.tariff-pricing-widget__cell--last.tariff-pricing-widget--highlight {
  border-bottom: 2px solid var(--vp-c-brand-1);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
