<script setup>
import { ref, computed } from 'vue'

// SVG-иконка для чекмарка (dot)
const IconCheck = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dot-dashed-icon lucide-circle-dot-dashed"><path d="M10.1 2.18a9.93 9.93 0 0 1 3.8 0"/><path d="M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7"/><path d="M21.82 10.1a9.93 9.93 0 0 1 0 3.8"/><path d="M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69"/><path d="M13.9 21.82a9.94 9.94 0 0 1-3.8 0"/><path d="M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7"/><path d="M2.18 13.9a9.93 9.93 0 0 1 0-3.8"/><path d="M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69"/><circle cx="12" cy="12" r="1"/></svg>
`

// SVG-иконка для прочерка (dashed)
const IconDash = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dashed-icon lucide-circle-dashed"><path d="M10.1 2.182a10 10 0 0 1 3.8 0"/><path d="M13.9 21.818a10 10 0 0 1-3.8 0"/><path d="M17.609 3.721a10 10 0 0 1 2.69 2.7"/><path d="M2.182 13.9a10 10 0 0 1 0-3.8"/><path d="M20.279 17.609a10 10 0 0 1-2.7 2.69"/><path d="M21.818 10.1a10 10 0 0 1 0 3.8"/><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69"/><path d="M6.391 20.279a10 10 0 0 1-2.69-2.7"/></svg>
`

function renderIcon(val) {
  if (val === '✓') return IconCheck
  if (val === '—') return IconDash
  return val
}

const tariffs = ref([
  {
    title: '«Сигнал Диалоги»',
    description: 'Для старта (1-3 точки)',
    isHighlighted: false,
    prices: {
      '1 месяц': { perMonth: '₽72,500/мес', total: '' },
      '3 месяца': { perMonth: '₽69,000/мес', total: '(₽207,000 итого)' },
      '6 месяцев': { perMonth: '₽65,500/мес', total: '(₽393,000 итого)' }
    },
    setup: {
      '1 месяц': '₽50,000',
      '3 месяца': 'Бесплатно',
      '6 месяцев': 'Бесплатно'
    },
    features_text: {
      'ИИ-ассистент «Анна»': 'Базовая версия',
      'Виджет и Умная форма': 'Базовая версия',
      'Поддержка оператора': 'Будни, 9:00–18:00',
      'Аналитика и отчёты': 'Базовая статистика'
    },
    features_icon: {
      'Тикет-система': '✓',
      'Персональный аналитик': '—',
      'Стратегические сессии': '—'
    }
  },
  {
    title: '«Сигнал Макс»',
    description: 'Для сетей (4+ точки)',
    isHighlighted: true,
    prices: {
      '1 месяц': { perMonth: '₽275,000/мес', total: '' },
      '3 месяца': { perMonth: '₽261,500/мес', total: '(₽784,500 итого)' },
      '6 месяцев': { perMonth: '₽247,500/мес', total: '(₽1,485,000 итого)' }
    },
    setup: {
      '1 месяц': '₽150,000',
      '3 месяца': 'Бесплатно',
      '6 месяцев': 'Бесплатно'
    },
    features_text: {
      'ИИ-ассистент «Анна»': 'Продвинутая настройка',
      'Виджет и Умная форма': 'Продвинутая настройка',
      'Поддержка оператора': 'Приоритетная',
      'Аналитика и отчёты': 'Аналитика 360° и еженедельные отчёты'
    },
    features_icon: {
      'Тикет-система': '✓',
      'Персональный аналитик': '✓',
      'Стратегические сессии': '✓'
    }
  }
])

const durations = ['1 месяц', '3 месяца', '6 месяцев']
const selected = ref('1 месяц')
const currentLabel = computed(() => {
  if (selected.value === '3 месяца') return '3 месяца (скидка ~5%)'
  if (selected.value === '6 месяцев') return '6 месяцев (скидка ~10%)'
  return '1 месяц'
})
const isActive = d => d === selected.value

// Списки для порядка — сначала текст, потом иконки
const textFeatures = ['ИИ-ассистент «Анна»','Виджет и Умная форма','Поддержка оператора','Аналитика и отчёты']
const iconFeatures = ['Тикет-система','Персональный аналитик','Стратегические сессии']
</script>

<template>
  <div class="brp">
    <div class="brp__header">
      <div class="brp__switch" role="tablist" aria-label="Срок подписки">
        <button
          v-for="d in durations"
          :key="d"
          class="brp__switch-btn"
          :class="{ 'is-active': isActive(d) }"
          type="button"
          role="tab"
          :aria-selected="isActive(d)"
          @click="selected = d"
        >
          {{ d }}
        </button>
      </div>
    </div>
    <div class="brp__table">
      <div class="brp__grid">
        <!-- Пустая шапка -->
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
        <!-- Цены абонплаты -->
        <div class="brp__cell brp__cell--label brp--no-bg brp--top-sep">
          {{ currentLabel }}
        </div>
        <div
          v-for="(tariff, colIndex) in tariffs"
          :key="tariff.title + selected"
          class="brp__cell brp__cell--price brp--top-sep"
          :class="{
            'brp--highlight': tariff.isHighlighted,
            'brp--last-col': colIndex === tariffs.length - 1
          }"
        >
          <span class="brp__price-main">{{ tariff.prices[selected].perMonth }}</span>
          <span v-if="tariff.prices[selected].total" class="brp__price-sub">
            {{ tariff.prices[selected].total }}
          </span>
        </div>
        <!-- Внедрение и настройка -->
        <div class="brp__cell brp__cell--label brp--no-bg brp--top-sep">
          Внедрение и настройка
        </div>
        <div
          v-for="(tariff, colIndex) in tariffs"
          :key="tariff.title + 'setup-' + selected"
          class="brp__cell brp__cell--price brp--top-sep"
          :class="{
            'brp--highlight': tariff.isHighlighted,
            'brp--last-col': colIndex === tariffs.length - 1
          }"
        >
          <span class="brp__price-main">{{ tariff.setup[selected] }}</span>
        </div>
        
        <!-- Строки TEXT -->
        <template v-for="(feature, featureIndex) in textFeatures" :key="'ftxt-'+feature">
          <div
            class="brp__cell brp__cell--label"
            :class="{ 'brp__cell--last': false }"
          >
            {{ feature }}
          </div>
          <div
            v-for="(tariff, colIndex) in tariffs"
            :key="tariff.title + feature"
            class="brp__cell brp__cell--value"
            :class="{
              'brp__cell--last': false,
              'brp--highlight': tariff.isHighlighted,
              'brp--last-col': colIndex === tariffs.length - 1
            }"
          >
            <span>{{ tariff.features_text[feature] }}</span>
          </div>
        </template>

        <!-- Строки ICON -->
        <template v-for="(feature, featureIndex) in iconFeatures" :key="'ficon-'+feature">
          <div
            class="brp__cell brp__cell--label"
            :class="{ 'brp__cell--last': featureIndex === iconFeatures.length - 1 }"
          >
            {{ feature }}
          </div>
          <div
            v-for="(tariff, colIndex) in tariffs"
            :key="tariff.title + feature"
            class="brp__cell brp__cell--value"
            :class="{
              'brp__cell--last': featureIndex === iconFeatures.length - 1,
              'brp--highlight': tariff.isHighlighted,
              'brp--last-col': colIndex === tariffs.length - 1
            }"
          >
            <span v-html="renderIcon(tariff.features_icon[feature])"></span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brp {
  margin: 24px 0;
}
.brp__header {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}
.brp__switch {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0;
  background: transparent;
  margin: 0;
}
.brp__switch-btn {
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
.brp__switch-btn:hover { border-color: var(--vp-c-brand-1); }
.brp__switch-btn.is-active {
  background: color-mix(in oklab, var(--vp-c-brand-1) 14%, transparent);
  border-color: var(--vp-c-brand-1);
  font-weight: 700;
}
.brp__table {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.brp__grid {
  display: grid;
  grid-template-columns: 1fr repeat(2, 1fr);
  align-items: stretch;
}
.brp__cell {
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
  min-height: 52px;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}
.brp--last-col { border-right: none; }
.brp__cell--header {
  border-bottom: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  min-height: 120px;
  padding-top: 16px;
  padding-bottom: 16px;
}
.brp__cell--header-placeholder { background-color: transparent; }
.brp__title-wrap {
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.brp__desc-wrap {
  min-height: 46px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
}
.brp__title { font-weight: 600; font-size: 1.12em; color: var(--vp-c-text-1); }
.brp__desc  { margin-top: 4px; font-size: 0.92em; color: var(--vp-c-text-2); line-height: 1.3; }
.brp__cell--label {
  padding: 12px 16px;
  justify-content: center;
  align-items: flex-start;
  font-size: 0.95em;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
}
.brp--no-bg { background-color: transparent; }
.brp__cell--price,
.brp__cell--value {
  padding: 12px 16px;
  text-align: center;
  align-items: center;
  justify-content: center;
}
/* svg в таблице */
.brp__cell--value svg {
  display: inline-block;
  vertical-align: middle;
  height: 1.5em;
  width: 1.5em;
  stroke: var(--vp-c-brand-1);
}
.brp__price-main { font-weight: 600; font-size: 1.05em; }
.brp__price-sub  { font-size: 0.85em; color: var(--vp-c-text-2); margin-top: 2px; }
.brp--top-sep { border-top: 1px solid var(--vp-c-divider); }
.brp__row-sep  { height: 2px; background-color: var(--vp-c-divider); grid-column: 1 / -1; border: none; }
.brp__cell--last { border-bottom: none; }
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

