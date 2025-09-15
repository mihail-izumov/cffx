<template>
  <div class="roi-calc-container">
    <!-- Поля ввода в одну строку -->
    <div class="roi-calc-input-row">
      <div class="roi-calc-input-group">
        <label for="guestsInput" class="roi-calc-label">
          Кол-во гостей (сред. в мес.):
          <span class="roi-calc-info-icon" @click="showTooltip('guestsInput')" @mouseenter="hoverIcon = 'guestsInput'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'guestsInput' }">
            i
          </span>
        </label>
        <input
          id="guestsInput"
          type="text"
          :value="guestsStr"
          placeholder="например, 1,000"
          @input="onGuestsInput"
          :class="['roi-calc-input', { 'roi-calc-error': guestsError }]"
        />
        <div v-if="guestsError" class="roi-calc-error-message">{{ guestsError }}</div>
      </div>
      <div class="roi-calc-input-group">
        <label for="averageCheckInput" class="roi-calc-label">
          Средний чек (₽):
          <span class="roi-calc-info-icon" @click="showTooltip('averageCheckInput')" @mouseenter="hoverIcon = 'averageCheckInput'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'averageCheckInput' }">
            i
          </span>
        </label>
        <input
          id="averageCheckInput"
          type="text"
          :value="averageCheckStr"
          placeholder="например, 500"
          @input="onAverageCheckInput"
          :class="['roi-calc-input', { 'roi-calc-error': checkError }]"
        />
        <div v-if="checkError" class="roi-calc-error-message">{{ checkError }}</div>
      </div>
    </div>
    
    <button class="roi-calc-btn" :disabled="!canCalculate" @click="calculate">
      РАССЧИТАТЬ LTV
    </button>
  </div>
  <!-- Заголовок вынесен из блока -->
  <div class="roi-calc-header">
    <h3 class="roi-calc-title">
      <span class="roi-calc-title-desktop">Рост LTV с системой Сигналов</span>
      <span class="roi-calc-title-mobile">Эффект Сигналов</span>
    </h3>
  </div>
  <!-- Таблица вынесена из основного блока -->
  <div class="roi-calc-table-container">
    <table class="roi-calc-table">
      <thead>
        <tr>
          <th class="roi-calc-th">Показатель</th>
          <th class="roi-calc-th">Без Сигнала</th>
          <th class="roi-calc-th">С ⚡ Сигналом</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('loyalGuests')"
              :class="{ 'roi-calc-active': activeTooltip === 'loyalGuests' }"
            >
              Лояльные гости/мес.
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('loyalGuests')" @mouseenter="hoverIcon = 'loyalGuests'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'loyalGuests' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">{{ displayResult.loyalWithout }} гостей</td>
          <td class="roi-calc-td roi-calc-highlight">
            {{ displayResult.loyalIncrease }} 
            <span class="roi-calc-growth-secondary">({{ displayResult.loyaltyGrowthDisplay }})</span>
          </td>
        </tr>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('frequency')"
              :class="{ 'roi-calc-active': activeTooltip === 'frequency' }"
            >
              Частота посещений
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('frequency')" @mouseenter="hoverIcon = 'frequency'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'frequency' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">{{ displayResult.frequencyWithout }} раз/мес</td>
          <td class="roi-calc-td roi-calc-highlight">
            {{ displayResult.frequencyWith }} 
            <span class="roi-calc-growth-secondary">({{ displayResult.frequencyGrowthDisplay }})</span>
          </td>
        </tr>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('ltv')"
              :class="{ 'roi-calc-active': activeTooltip === 'ltv' }"
            >
              LTV одного гостя за 10 мес.
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('ltv')" @mouseenter="hoverIcon = 'ltv'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'ltv' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">₽{{ displayResult.ltvWithoutFormatted }}</td>
          <td class="roi-calc-td roi-calc-highlight">
            ₽{{ displayResult.ltvWithFormatted }} 
            <span class="roi-calc-growth-secondary">(+₽{{ displayResult.ltvGrowthFormatted }})</span>
          </td>
        </tr>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('revenue')"
              :class="{ 'roi-calc-active': activeTooltip === 'revenue' }"
            >
              Доп. выручка/мес.
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('revenue')" @mouseenter="hoverIcon = 'revenue'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'revenue' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">—</td>
          <td class="roi-calc-td roi-calc-highlight">₽{{ displayResult.additionalMonthlyRevenueFormatted }}</td>
        </tr>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('payback')"
              :class="{ 'roi-calc-active': activeTooltip === 'payback' }"
            >
              Окупаемость
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('payback')" @mouseenter="hoverIcon = 'payback'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'payback' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">—</td>
          <td class="roi-calc-td roi-calc-highlight">{{ displayResult.paybackSignals }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Остальной контент -->
  <div class="roi-calc-container roi-calc-content">
    <!-- Каждый Сигнал = возможность вернуть клиента -->
    <div class="roi-calc-signal-block">
      <h4 class="roi-calc-signal-title">Каждый Сигнал = возможность вернуть клиента:</h4>
      <ul class="roi-calc-signal-list">
        <li>✓ Недовольный отзыв в 2ГИС/Google до публикации</li>
        <li>✓ Жалоба в социальных сетях</li>
        <li>✓ Негативный комментарий о сервисе</li>
        <li>✓ Проблема с качеством продукта</li>
      </ul>
    </div>
    
    <!-- Почему кофейни особенные -->
    <div class="roi-calc-coffee-specifics">
      <h4 class="roi-calc-coffee-title">Почему кофейни особенные:</h4>
      <ul class="roi-calc-coffee-list">
        <li>✓ Выше базовая лояльность — люди привыкают к "своему" месту</li>
        <li>✓ Чаще посещения — кофе нужен каждый день</li>
        <li>✓ Сильнее влияние привычки и удобного расположения</li>
        <li>✓ Быстрее распространение сарафанного радио среди друзей</li>
      </ul>
    </div>
    
    <!-- Тултипы -->
    <transition name="roi-calc-tooltip">
      <div v-if="activeTooltip" class="roi-calc-tooltip-popup" @click="closeTooltip">
        <div class="roi-calc-tooltip-content" @click.stop>
          <h4 class="roi-calc-tooltip-title">{{ currentTooltip.title }}</h4>
          <div v-if="currentTooltip.formula" class="roi-calc-formula" v-html="currentTooltip.formula"></div>
          <p class="roi-calc-tooltip-desc" v-html="currentTooltip.description"></p>
        </div>
      </div>
    </transition>
    
    <!-- Все сигналы после 2-го = чистая прибыль -->
    <div class="roi-calc-payback-explanation">
      <h4 class="roi-calc-payback-title">Все сигналы после 2-го = чистая прибыль:</h4>
      <ul class="roi-calc-payback-list">
        <li>✓ Стоимость системы: от ₽30.000/мес</li>
        <li>✓ Средняя стоимость предотвращенного ухода: от ₽{{ dynamicPreventedLoss }}</li>
        <li>✓ Система окупается после {{ displayResult.paybackSignals }}</li>
      </ul>
    </div>
    
    <!-- Ключевые факторы успеха -->
    <div class="roi-calc-success-factors">
      <h4 class="roi-calc-success-title">Ключевые факторы успеха:</h4>
      <ul class="roi-calc-success-list">
        <li>✓ Время ответа на жалобу < 30 минут</li>
        <li>✓ Нематериальная компенсация</li>
        <li>✓ Персонализация предложений</li>
        <li>✓ Мониторинг качества сервиса</li>
      </ul>
    </div>
    
    <!-- Призыв к действию -->
    <div class="roi-calc-cta-block">
      <p class="roi-calc-cta-text"><strong>Главное:</strong> Система окупается мгновенно, а каждый месяц приносит стабильный рост выручки в ₽{{ dynamicRevenueMillion }}+ млн.</p>
      <p class="roi-calc-cta-text">Следующий шаг → <a href="https://cffx.ru/brew/membership.html" class="roi-calc-cta-link">Получить QR-код</a></p>
    </div>
    
    <!-- Предупреждение -->
    <div class="roi-calc-warning-block">
      <p class="roi-calc-warning-text"><strong>Важно:</strong> Результаты достигаются только при качественном внедрении Диалогов с Сигналами и обучении персонала. Показаны консервативные оценки на основе анализа 100+ кофеен.</p>
    </div>
    
    <!-- Дополнительная информация -->
    <div class="roi-calc-info-block">
      <p class="roi-calc-info-text">
        <strong>Как работает расчет:</strong> Диалоги с Сигналами помогают быстро решать проблемы гостей, 
        превращая потенциальные жалобы в возможности для повышения лояльности. 
        Довольные клиенты посещают кофейню чаще и приводят друзей.
      </p>
      <p class="roi-calc-info-text">
        <strong>Основа расчетов:</strong> Данные основаны на анализе 100+ кофеен. В расчет включены затраты на Диалоги с Сигналами (от ₽30.000/мес). Консервативные оценки гарантируют реалистичность прогнозов.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const guestsStr = ref('1000')
const averageCheckStr = ref('500')
const activeTooltip = ref(null)
const hoverIcon = ref(null)
const guestsError = ref('')
const checkError = ref('')
const calculatedResult = ref({})
const hasCalculated = ref(false)

const constants = {
  loyaltyRateWithoutSystem: 0.42,
  loyaltyRateWithSystem: 0.65,
  frequencyWithoutSystem: 4,
  frequencyWithSystem: 7,
  loyaltyPeriod: 10,
  systemCostMonthly: 30000,
  avgPreventedLoss: 25000,
  marginPercentage: 0.40
}

const dynamicRevenueMillion = computed(() => {
  if (!hasCalculated.value) return '1.4'
  const revenue = calculatedResult.value.additionalMonthlyRevenue || 1435000
  return (revenue / 1000000).toFixed(1)
})

const dynamicPreventedLoss = computed(() => {
  if (!hasCalculated.value) return '25.000'
  const ltvWith = calculatedResult.value.ltvWith || 35000
  const preventedLoss = Math.round(ltvWith * 0.7)
  return formatNumber(preventedLoss)
})

const formatNumber = (n) => new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)).replace(/\s/g, '.')

const generateDynamicTooltips = (guests, check) => {
  const loyal_without = guests * constants.loyaltyRateWithoutSystem
  const loyal_with = guests * constants.loyaltyRateWithSystem
  const loyal_increase = loyal_with - loyal_without
  const loyalty_percent = Math.round(((loyal_increase) / loyal_without) * 100)
  const ltv_without = check * constants.frequencyWithoutSystem * constants.loyaltyPeriod
  const ltv_with = check * constants.frequencyWithSystem * constants.loyaltyPeriod
  const revenue_without = loyal_without * constants.frequencyWithoutSystem * check
  const revenue_with = loyal_with * constants.frequencyWithSystem * check
  const additional_revenue = revenue_with - revenue_without
  const prevented_loss = Math.round(ltv_with * 0.7)

  return {
    guestsInput: { title: 'Количество гостей в месяц', description: 'Среднее количество уникальных посетителей вашей кофейни за месяц. Диапазон: 50-10,000 гостей/мес.' },
    averageCheckInput: { title: 'Средний чек', description: 'Средняя сумма одного заказа в вашей кофейне. Диапазон: 100-5,000 ₽.' },
    loyalGuests: { title: 'Прирост постоянных клиентов', formula: `${formatNumber(guests)} × 42% = ${formatNumber(loyal_without)}<br>${formatNumber(guests)} × 65% = ${formatNumber(loyal_with)}`, description: `<strong>Без Сигнала:</strong> ${formatNumber(loyal_without)}<br><strong>С Сигналом:</strong> ${formatNumber(loyal_with)}<br><strong>Прирост:</strong> +${formatNumber(loyal_increase)} (+${loyalty_percent}%)` },
    frequency: { title: 'Как часто ходят лояльные гости', formula: `4 → 7 раз/мес (+75%)`, description: `Довольные клиенты посещают кофейню чаще.` },
    ltv: { title: 'Сколько денег приносит один лояльный гость', formula: `Без: ${check}×4×10 = ₽${formatNumber(ltv_without)}<br>С: ${check}×7×10 = ₽${formatNumber(ltv_with)}`, description: `LTV показывает полную ценность клиента.` },
    revenue: { title: 'Дополнительная выручка каждый месяц', formula: `₽${formatNumber(revenue_with)} - ₽${formatNumber(revenue_without)}`, description: `Разница между выручкой с системой и без нее.` },
    payback: { title: 'Окупаемость системы', formula: `₽30.000 ÷ ₽${formatNumber(prevented_loss)} ≈ 1-2 сигнала`, description: `После 2-го сигнала система приносит чистую прибыль.` }
  }
}

const currentTooltip = computed(() => {
  if (!activeTooltip.value) return {}
  const guests = guestsNum.value || 1000
  const check = averageCheckNum.value || 500
  return generateDynamicTooltips(guests, check)[activeTooltip.value] || {}
})

function validateGuests(value) { return value < 50 ? 'Минимум 50' : value > 10000 ? 'Максимум 10,000' : '' }
function validateCheck(value) { return value < 100 ? 'Минимум 100' : value > 5000 ? 'Максимум 5,000' : '' }

function onGuestsInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  guestsStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  guestsError.value = digits ? validateGuests(Number(digits)) : ''
}
function onAverageCheckInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  averageCheckStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  checkError.value = digits ? validateCheck(Number(digits)) : ''
}

function showTooltip(tooltipId) { activeTooltip.value = activeTooltip.value === tooltipId ? null : tooltipId }
function closeTooltip() { activeTooltip.value = null }

const guestsNum = computed(() => Number(guestsStr.value.replace(/\s/g, '')))
const averageCheckNum = computed(() => Number(averageCheckStr.value.replace(/\s/g, '')))

const canCalculate = computed(() => !guestsError.value && !checkError.value && guestsStr.value && averageCheckStr.value)

function calculateROI(monthlyGuests, averageCheck) {
  const loyalWithout = monthlyGuests * constants.loyaltyRateWithoutSystem
  const loyalWith = monthlyGuests * constants.loyaltyRateWithSystem
  const loyalIncrease = loyalWith - loyalWithout
  const revenueWithout = loyalWithout * constants.frequencyWithoutSystem * averageCheck
  const revenueWith = loyalWith * constants.frequencyWithSystem * averageCheck
  const ltvWithout = averageCheck * constants.frequencyWithoutSystem * constants.loyaltyPeriod
  const ltvWith = averageCheck * constants.frequencyWithSystem * constants.loyaltyPeriod
  const paybackSignals = Math.ceil(constants.systemCostMonthly / constants.avgPreventedLoss)

  return {
    loyalWithout: Math.round(loyalWithout),
    loyalIncrease: Math.round(loyalIncrease),
    loyalIncreasePercent: Math.round((loyalIncrease / loyalWithout) * 100),
    frequencyWithout: constants.frequencyWithoutSystem,
    frequencyWith: constants.frequencyWithSystem,
    ltvWithout: ltvWithout,
    ltvWith: ltvWith,
    ltvGrowth: ltvWith - ltvWithout,
    additionalMonthlyRevenue: Math.round(revenueWith - revenueWithout),
    paybackSignals: `${paybackSignals-1}-${paybackSignals} сигнала`
  }
}

const defaultResult = {
  loyalWithout: '420',
  loyalIncrease: '+230 гостей',
  loyaltyGrowthDisplay: '+55%',
  frequencyWithout: '4',
  frequencyWith: '7 раз/мес',
  frequencyGrowthDisplay: '+75%',
  ltvWithoutFormatted: '20.000',
  ltvWithFormatted: '35.000',
  ltvGrowthFormatted: '15.000',
  additionalMonthlyRevenueFormatted: '1.435.000',
  paybackSignals: '1-2 сигнала'
}

const displayResult = computed(() => {
  if (!hasCalculated.value) return defaultResult
  const result = calculatedResult.value
  return {
    loyalWithout: result.loyalWithout,
    loyalIncrease: `+${result.loyalIncrease} гостей`,
    loyaltyGrowthDisplay: `+${result.loyalIncreasePercent}%`,
    frequencyWithout: result.frequencyWithout,
    frequencyWith: `${result.frequencyWith} раз/мес`,
    frequencyGrowthDisplay: `+${Math.round(((result.frequencyWith - result.frequencyWithout) / result.frequencyWithout) * 100)}%`,
    ltvWithoutFormatted: formatNumber(result.ltvWithout),
    ltvWithFormatted: formatNumber(result.ltvWith),
    ltvGrowthFormatted: formatNumber(result.ltvGrowth),
    additionalMonthlyRevenueFormatted: formatNumber(result.additionalMonthlyRevenue),
    paybackSignals: result.paybackSignals
  }
})

function calculate() {
  if (!canCalculate.value) return
  calculatedResult.value = calculateROI(guestsNum.value, averageCheckNum.value)
  hasCalculated.value = true
}
</script>

<style scoped>
.roi-calc-container { 
  margin: 0 auto 20px; 
  padding: 24px; 
  background: #1e1e1e; 
  border: 1px solid #2b2b2b; 
  border-radius: 12px; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.roi-calc-input-row { display: flex; gap: 20px; margin-bottom: 16px; }
.roi-calc-input-group { flex: 1; position: relative; }
.roi-calc-label { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-weight: 600; font-size: 14px; }
.roi-calc-info-icon { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; background: #666; border-radius: 50%; cursor: pointer; font-size: 12px; font-weight: 600; }
.roi-calc-input { width: 100%; height: 44px; padding: 0 14px; font-size: 15px; background: #141414; border: 1px solid #333; border-radius: 8px; color: #fff; }
.roi-calc-input:focus { border-color: #c5f946; outline: 0; }
.roi-calc-input.roi-calc-error { border-color: #ef4444; }
.roi-calc-error-message { position: absolute; top: 100%; margin-top: 4px; font-size: 12px; color: #ef4444; }
.roi-calc-btn { width: 100%; height: 44px; margin-top: 12px; font-weight: 700; text-transform: uppercase; color: #000; background: #c5f946; border: none; border-radius: 8px; cursor: pointer; }
.roi-calc-btn:disabled { background: #555; color: #ccc; cursor: not-allowed; }
.roi-calc-header { margin: 0 0 20px 0; }
.roi-calc-title { padding: 16px 0; font-size: 18px; text-align: center; color: #c5f946; }
.roi-calc-title-mobile { display: none; }
.roi-calc-table-container { margin: 0 0 20px 0; border-radius: 8px; border: 1px solid #2b2b2b; overflow: hidden; }
.roi-calc-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #141414; }
.roi-calc-th { padding: 12px 16px; font-weight: 600; color: #c5f946; background: #1a1a1a; text-align: left; border-bottom: 1px solid #2b2b2b; white-space: nowrap; }
.roi-calc-td { padding: 12px 16px; color: #fff; border-bottom: 1px solid #2b2b2b; white-space: nowrap; }
.roi-calc-table tr:last-child .roi-calc-td, .roi-calc-table tr:last-child .roi-calc-metric-cell { border-bottom: none; }
.roi-calc-metric-cell { padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; gap: 8px; background: transparent; }
.roi-calc-metric-text { cursor: pointer; flex: 1; }
.roi-calc-highlight { color: #c5f946; font-weight: 600; }
.roi-calc-growth-secondary { color: #888; font-weight: 400; font-size: 0.9em; }
.roi-calc-signal-block, .roi-calc-coffee-specifics, .roi-calc-payback-explanation, .roi-calc-success-factors, .roi-calc-cta-block, .roi-calc-warning-block, .roi-calc-info-block { margin: 16px 0; padding: 16px; border-radius: 8px; }
.roi-calc-signal-block { background: #1f1a0f; border: 1px solid #3a2e1e; }
.roi-calc-coffee-specifics { background: #1a1a1a; border: 1px solid #2b2b2b; }
.roi-calc-payback-explanation { background: #0f1a2a; border: 1px solid #1e3a4a; }
.roi-calc-success-factors { background: #0f2a1e; border: 1px solid #1e3a32; }
.roi-calc-cta-block { border: 1px solid #c5f946; }
.roi-calc-warning-block { background: #2a1f0f; border: 1px solid #4a3c1e; }
.roi-calc-info-block { background: #141414; border: 1px solid #2b2b2b; }
.roi-calc-signal-title, .roi-calc-coffee-title, .roi-calc-payback-title, .roi-calc-success-title { margin-bottom: 12px; font-weight: 600; }
.roi-calc-signal-list, .roi-calc-coffee-list, .roi-calc-payback-list, .roi-calc-success-list { padding: 0; list-style: none; }
.roi-calc-cta-link { color: #c5f946; text-decoration: none; font-weight: 600; }
.roi-calc-tooltip-popup { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.roi-calc-tooltip-content { max-width: 400px; padding: 20px; background: #2a2a2a; border: 1px solid #404040; border-radius: 12px; }
.roi-calc-tooltip-title { margin-bottom: 12px; color: #c5f946; }
.roi-calc-formula { margin-bottom: 12px; padding: 8px 12px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; font-family: monospace; }
.roi-calc-tooltip-desc { color: #ccc; }
@media(max-width: 768px) {
  .roi-calc-input-row { flex-direction: column; gap: 12px; }
  .roi-calc-title-desktop { display: none; }
  .roi-calc-title-mobile { display: block; }
}
@media(min-width: 769px) { .roi-calc-title-mobile { display: none; } }
</style>
