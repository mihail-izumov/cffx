<script setup>
import { ref, computed } from 'vue'

// SVG: точка (dot)
const iconDot = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.1 2.18a9.93 9.93 0 0 1 3.8 0"/><path d="M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7"/><path d="M21.82 10.1a9.93 9.93 0 0 1 0 3.8"/><path d="M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69"/><path d="M13.9 21.82a9.94 9.94 0 0 1-3.8 0"/><path d="M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7"/><path d="M2.18 13.9a9.93 9.93 0 0 1 0-3.8"/><path d="M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69"/><circle cx="12" cy="12" r="1"/></svg>`
const iconDashed = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.1 2.182a10 10 0 0 1 3.8 0"/><path d="M13.9 21.818a10 10 0 0 1-3.8 0"/><path d="M17.609 3.721a10 10 0 0 1 2.69 2.7"/><path d="M2.182 13.9a10 10 0 0 1 0-3.8"/><path d="M20.279 17.609a10 10 0 0 1-2.7 2.69"/><path d="M21.818 10.1a10 10 0 0 1 0 3.8"/><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69"/><path d="M6.391 20.279a10 10 0 0 1-2.69-2.7"/></svg>`

function renderIcon(val) {
  if (val === '✓') return iconDot
  if (val === '—') return iconDashed
  return ''
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
    features: {
      'Тикет-система': '✓',
      'ИИ-ассистент «Анна»': 'Базовая версия',
      'Виджет и Умная форма': 'Базовая версия',
      'Статистика': 'Базовая',
      'Поддержка оператора': 'Будни, 9:00–18:00',
      'Аналитика и отчёты': '—',
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
    features: {
      'Тикет-система': '✓',
      'ИИ-ассистент «Анна»': 'Продвинутая настройка',
      'Виджет и Умная форма': 'Продвинутая настройка',
      'Статистика': '✓',
      'Поддержка оператора': 'Приоритетная',
      'Аналитика и отчёты': 'Аналитика 360° и еженедельные отчёты',
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
        <div class="brp__cell brp__cell--header brp__cell--header-placeholder"></div>
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

        <div class="brp__row-sep"></div>

        <!-- Особенности -->
        <template v-for="(feature, featureIndex) in ['Тикет-система','ИИ-ассистент «Анна»','Виджет и Умная форма','Статистика','Поддержка оператора','Аналитика и отчёты','Персональный аналитик','Стратегические сессии']" :key="feature">
          <div
            class="brp__cell brp__cell--label"
            :class="{ 'brp__cell--last': featureIndex === 7 }"
          >
            {{ feature }}
          </div>

          <div
            v-for="(tariff, colIndex) in tariffs"
            :key="tariff.title + feature"
            class="brp__cell brp__cell--value"
            :class="{
              'brp__cell--last': featureIndex === 7,
              'brp--highlight': tariff.isHighlighted,
              'brp--last-col': colIndex === tariffs.length - 1
            }"
          >
            <span v-if="tariff.features[feature] === '✓'" v-html="iconDot"></span>
            <span v-else-if="tariff.features[feature] === '—'" v-html="iconDashed"></span>
            <span v-else>{{ tariff.features[feature] }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Стили остаются прежними */
</style>
