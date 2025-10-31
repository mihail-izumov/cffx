<script setup>
import { ref, computed } from 'vue'

const IconCheck = `<svg class="checkmark-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
const IconDash = `<svg class="checkmark-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" stroke-dasharray="2 4"/></svg>`
const ArrowRightIcon = `<svg class="arrow-right-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`

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
    features: [
      { icon: IconCheck, label: 'Тикет-система', tooltipKey: 'ticket' },
      { icon: IconCheck, label: 'Анна (базовая версия)', tooltipKey: 'anna' },
      { icon: IconCheck, label: 'Виджет и Умная форма', tooltipKey: 'widget' },
      { icon: IconCheck, label: 'Поддержка оператора (будни, 9-18)', tooltipKey: 'support' },
      { icon: IconCheck, label: 'Базовая статистика', tooltipKey: 'stats' },
      { icon: IconDash, label: 'Персональный аналитик', tooltipKey: null },
      { icon: IconDash, label: 'Стратегические сессии', tooltipKey: null }
    ]
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
    features: [
      { icon: IconCheck, label: 'Тикет-система', tooltipKey: 'ticket' },
      { icon: IconCheck, label: 'Анна (продвинутая настройка)', tooltipKey: 'annaMax' },
      { icon: IconCheck, label: 'Виджет и Умная форма (расширенная)', tooltipKey: 'widgetMax' },
      { icon: IconCheck, label: 'Приоритетная поддержка', tooltipKey: 'priority' },
      { icon: IconCheck, label: 'Аналитика 360° и еженедельные отчёты', tooltipKey: 'analytics' },
      { icon: IconCheck, label: 'Персональный аналитик и стратегические сессии', tooltipKey: 'analyst' }
    ]
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

const isModalOpen = ref(false)
const currentTariff = ref('')
const currentFeatureKey = ref('')
const modalContent = ref({ title: '', text: '', link: '' })
const tooltipData = {
  ticket: {
    title: 'Тикет-система',
    text: 'Приём обращений 24/7. Фиксация, история решений, уведомления.',
    link: '/pro/dialogs'
  },
  anna: {
    title: 'Анна (базовая версия)',
    text: 'Автоматический диалог, сбор информации и тикетизация.',
    link: '/pro/dialogs'
  },
  widget: {
    title: 'Виджет и Умная форма',
    text: 'Публичная страница, быстрый отзыв в Яндекс/2ГИС, брендинг.',
    link: '/pro/dialogs'
  },
  support: {
    title: 'Поддержка оператора (будни, 9-18)',
    text: 'Реальные люди обрабатывают тикеты в рабочие часы.',
    link: '/pro/dialogs'
  },
  stats: {
    title: 'Базовая статистика',
    text: 'Ежемесячная сводка и простая аналитика.',
    link: '/pro/dialogs'
  },
  analytics: {
    title: 'Аналитика 360° и еженедельные отчёты',
    text: 'Глубокий разбор кейсов и стратегические выводы.',
    link: '/pro/sistema'
  },
  annaMax: {
    title: 'Анна (продвинутая настройка)',
    text: 'Тон, продукты, кейсы — персонализация без доплат.',
    link: '/pro/sistema'
  },
  widgetMax: {
    title: 'Виджет и Умная форма (расширенная)',
    text: 'Мультивиджеты и аналитика конверсии.',
    link: '/pro/sistema'
  },
  priority: {
    title: 'Приоритетная поддержка',
    text: 'Выделенный оператор и индивидуальные графики.',
    link: '/pro/sistema'
  },
  analyst: {
    title: 'Персональный аналитик и стратегические сессии',
    text: 'Регулярные встречи и системные рекомендации.',
    link: '/pro/sistema'
  }
}

function openModal(tariff, key) {
  currentTariff.value = tariff
  currentFeatureKey.value = key
  modalContent.value = tooltipData[key] || { title: '', text: '', link: '' }
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <div class="brp">
    <!-- Переключатели -->
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
        <!-- Тарифы -->
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
        <!-- Строки с фичами -->
        <template v-for="featureIndex in Math.max(tariffs[0].features.length, tariffs[1].features.length)" :key="'row-'+featureIndex">
          <div class="brp__cell brp__cell--label"
            :class="{ 'brp__cell--last': featureIndex === Math.max(tariffs[0].features.length, tariffs[1].features.length) - 1 }"
          >
            <span>
              {{ tariffs[0].features[featureIndex]?.label || tariffs[1].features[featureIndex]?.label }}
            </span>
          </div>
          <div
            v-for="(tariff, colIndex) in tariffs"
            :key="tariff.title + '-' + featureIndex"
            class="brp__cell brp__cell--value"
            :class="{
              'brp__cell--last': featureIndex === Math.max(tariffs[0].features.length, tariffs[1].features.length) - 1,
              'brp--highlight': tariff.isHighlighted,
              'brp--last-col': colIndex === tariffs.length - 1
            }"
          >
            <!-- Если есть tooltipKey то кнопка и иконка, иначе просто иконка + текст -->
            <button
              v-if="tariff.features[featureIndex]?.tooltipKey"
              class="feature-link"
              @click="openModal(tariff.title, tariff.features[featureIndex].tooltipKey)"
            >
              <span v-html="tariff.features[featureIndex].icon" />
              {{ tariff.features[featureIndex].label }}
            </button>
            <span v-else>
              <span v-html="tariff.features[featureIndex].icon" />
              <span>{{ tariff.features[featureIndex].label }}</span>
            </span>
          </div>
        </template>
      </div>
    </div>
    <!-- МОДАЛКА -->
    <Teleport to="body">
      <Transition name="pricing-modal">
        <div v-if="isModalOpen" class="pricing-modal-overlay" @click="closeModal">
          <div class="pricing-modal-window" @click.stop>
            <button class="pricing-modal-close" @click="closeModal" aria-label="Закрыть">✕</button>
            <div class="pricing-modal-header">{{ currentTariff }}</div>
            <h2 class="pricing-modal-title">{{ modalContent.title }}</h2>
            <div class="pricing-modal-body">
              {{ modalContent.text }}
              <a v-if="modalContent.link" :href="modalContent.link" class="pricing-modal-link" target="_blank">
                Узнать больше
                <span v-html="ArrowRightIcon" />
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.feature-link {
  background: none;
  border: none;
  color: inherit;
  text-decoration: underline dotted;
  cursor: pointer;
  font: inherit;
  padding: 0;
}
.checkmark-icon {
  width: 1.4em;
  height: 1.4em;
  vertical-align: middle;
  margin-right: 6px;
}
.arrow-right-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-left: 7px;
  color: #1d1d1f;
}
.pricing-modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(10px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 10000 !important;
  padding: 20px !important;
}
.pricing-modal-window {
  background: #f5f5f7 !important;
  border-radius: 28px !important;
  width: 420px !important;
  max-width: 96vw !important;
  max-height: 88vh !important;
  position: relative !important;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
}
.pricing-modal-close {
  position: absolute !important;
  top: 16px !important;
  right: 16px !important;
  width: 44px !important;
  height: 44px !important;
  border-radius: 50% !important;
  background: #1d1d1f !important;
  border: none !important;
  color: #f5f5f7 !important;
  font-size: 2rem !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.pricing-modal-header {
  font-size: 1rem !important;
  color: #6e6e73 !important;
  margin-bottom: 12px !important;
  font-weight: 500 !important;
  letter-spacing: 0.08em !important;
  margin-top: 44px !important;
  padding: 0 32px !important;
  flex-shrink: 0 !important;
}
.pricing-modal-title {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  color: #1d1d1f !important;
  margin: 0 0 24px 0 !important;
  line-height: 1.1 !important;
  padding: 0 32px !important;
  flex-shrink: 0 !important;
}
.pricing-modal-body {
  padding: 0 32px 32px !important;
  overflow-y: auto !important;
  font-size: 1.125rem !important;
  color: #444 !important;
}
.pricing-modal-link {
  margin-top: 1.5em !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  color: #1d1d1f !important;
  font-size: 1.125rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
}
.pricing-modal-enter-active,
.pricing-modal-leave-active {
  transition: opacity .3s;
}
.pricing-modal-enter-from,
.pricing-modal-leave-to {
  opacity: 0;
}
</style>
