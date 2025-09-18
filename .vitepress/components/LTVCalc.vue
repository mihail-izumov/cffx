<template>
  <div class="cffx-roi-calc-wrapper">
    <!-- Блок ввода данных -->
    <div class="cffx-roi-calc-container">
      <div class="cffx-roi-calc-input-row">
        <div class="cffx-roi-calc-input-group">
          <label for="guestsInput" class="cffx-roi-calc-label">
            Кол-во гостей (сред. в мес.):
            <span class="cffx-roi-calc-info-icon" @click="showTooltip('guestsInput')" @mouseenter="hoverIcon = 'guestsInput'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'guestsInput' }">i</span>
          </label>
          <input
            id="guestsInput"
            type="text"
            :value="guestsStr"
            placeholder="например, 1,000"
            @input="onGuestsInput"
            :class="['cffx-roi-calc-input', { 'cffx-roi-calc-error': guestsError }]"
          />
          <div v-if="guestsError" class="cffx-roi-calc-error-message">{{ guestsError }}</div>
        </div>
        <div class="cffx-roi-calc-input-group">
          <label for="averageCheckInput" class="cffx-roi-calc-label">
            Средний чек (₽):
            <span class="cffx-roi-calc-info-icon" @click="showTooltip('averageCheckInput')" @mouseenter="hoverIcon = 'averageCheckInput'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'averageCheckInput' }">i</span>
          </label>
          <input
            id="averageCheckInput"
            type="text"
            :value="averageCheckStr"
            placeholder="например, 500"
            @input="onAverageCheckInput"
            :class="['cffx-roi-calc-input', { 'cffx-roi-calc-error': checkError }]"
          />
          <div v-if="checkError" class="cffx-roi-calc-error-message">{{ checkError }}</div>
        </div>
      </div>
      <button class="cffx-roi-calc-btn" :disabled="!canCalculate" @click="calculate">
        РАССЧИТАТЬ LTV
      </button>
    </div>

    <!-- Заголовок таблицы -->
    <div class="cffx-roi-calc-header">
      <h3 class="cffx-roi-calc-title">
        <span class="cffx-roi-calc-title-desktop">Рост LTV с системой Сигналов</span>
        <span class="cffx-roi-calc-title-mobile">Эффект Сигналов</span>
      </h3>
    </div>

    <!-- Таблица результатов -->
    <div class="cffx-roi-calc-table-container">
      <table class="cffx-roi-calc-table">
        <thead>
          <tr>
            <th class="cffx-roi-calc-th">Показатель</th>
            <th class="cffx-roi-calc-th">Без Сигнала</th>
            <th class="cffx-roi-calc-th">С ⚡ Сигналом</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="cffx-roi-calc-metric-cell">
              <span class="cffx-roi-calc-metric-text" @click="showTooltip('loyalGuests')" :class="{ 'cffx-roi-calc-active': activeTooltip === 'loyalGuests' }">Лояльные гости/мес.</span>
              <span class="cffx-roi-calc-info-icon cffx-roi-calc-info-icon-table" @click.stop="showTooltip('loyalGuests')" @mouseenter="hoverIcon = 'loyalGuests'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'loyalGuests' }">i</span>
            </td>
            <td class="cffx-roi-calc-td">{{ displayResult.loyalWithout }} гостей</td>
            <td class="cffx-roi-calc-td cffx-roi-calc-highlight">{{ displayResult.loyalIncrease }} <span class="cffx-roi-calc-growth-secondary">({{ displayResult.loyaltyGrowthDisplay }})</span></td>
          </tr>
          <tr>
            <td class="cffx-roi-calc-metric-cell">
              <span class="cffx-roi-calc-metric-text" @click="showTooltip('frequency')" :class="{ 'cffx-roi-calc-active': activeTooltip === 'frequency' }">Частота посещений</span>
              <span class="cffx-roi-calc-info-icon cffx-roi-calc-info-icon-table" @click.stop="showTooltip('frequency')" @mouseenter="hoverIcon = 'frequency'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'frequency' }">i</span>
            </td>
            <td class="cffx-roi-calc-td">{{ displayResult.frequencyWithout }} раз/мес</td>
            <td class="cffx-roi-calc-td cffx-roi-calc-highlight">{{ displayResult.frequencyWith }} <span class="cffx-roi-calc-growth-secondary">({{ displayResult.frequencyGrowthDisplay }})</span></td>
          </tr>
          <tr>
            <td class="cffx-roi-calc-metric-cell">
              <span class="cffx-roi-calc-metric-text" @click="showTooltip('ltv')" :class="{ 'cffx-roi-calc-active': activeTooltip === 'ltv' }">LTV одного гостя за 10 мес.</span>
              <span class="cffx-roi-calc-info-icon cffx-roi-calc-info-icon-table" @click.stop="showTooltip('ltv')" @mouseenter="hoverIcon = 'ltv'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'ltv' }">i</span>
            </td>
            <td class="cffx-roi-calc-td">₽{{ displayResult.ltvWithoutFormatted }}</td>
            <td class="cffx-roi-calc-td cffx-roi-calc-highlight">₽{{ displayResult.ltvWithFormatted }} <span class="cffx-roi-calc-growth-secondary">(+₽{{ displayResult.ltvGrowthFormatted }})</span></td>
          </tr>
          <tr>
            <td class="cffx-roi-calc-metric-cell">
              <span class="cffx-roi-calc-metric-text" @click="showTooltip('revenue')" :class="{ 'cffx-roi-calc-active': activeTooltip === 'revenue' }">Доп. выручка/мес.</span>
              <span class="cffx-roi-calc-info-icon cffx-roi-calc-info-icon-table" @click.stop="showTooltip('revenue')" @mouseenter="hoverIcon = 'revenue'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'revenue' }">i</span>
            </td>
            <td class="cffx-roi-calc-td">—</td>
            <td class="cffx-roi-calc-td cffx-roi-calc-highlight">₽{{ displayResult.additionalMonthlyRevenueFormatted }}</td>
          </tr>
          <tr>
            <td class="cffx-roi-calc-metric-cell">
              <span class="cffx-roi-calc-metric-text" @click="showTooltip('payback')" :class="{ 'cffx-roi-calc-active': activeTooltip === 'payback' }">Окупаемость</span>
              <span class="cffx-roi-calc-info-icon cffx-roi-calc-info-icon-table" @click.stop="showTooltip('payback')" @mouseenter="hoverIcon = 'payback'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'payback' }">i</span>
            </td>
            <td class="cffx-roi-calc-td">—</td>
            <td class="cffx-roi-calc-td cffx-roi-calc-highlight">{{ displayResult.paybackSignals }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Переключатель для раскрывающегося блока -->
    <div class="cffx-roi-calc-why-toggle" @click="toggleWhy" :aria-expanded="whyOpen.toString()" role="button" tabindex="0">
      <span class="cffx-roi-calc-why-text">Почему все получится</span>
      <span class="cffx-roi-calc-why-icon" :class="{ open: whyOpen }">▾</span>
    </div>

    <!-- Раскрывающийся контент -->
    <transition name="cffx-roi-calc-collapse">
      <div v-if="whyOpen" class="cffx-roi-calc-container cffx-roi-calc-content">
        <div class="cffx-roi-calc-signal-block">
          <h4 class="cffx-roi-calc-signal-title">Каждый Сигнал = возможность вернуть клиента:</h4>
          <ul class="cffx-roi-calc-signal-list">
            <li>✓ Недовольный отзыв в 2ГИС/Google до публикации</li>
            <li>✓ Жалоба в социальных сетях</li>
            <li>✓ Негативный комментарий о сервисе</li>
            <li>✓ Проблема с качеством продукта</li>
          </ul>
        </div>
        <div class="cffx-roi-calc-coffee-specifics">
          <h4 class="cffx-roi-calc-coffee-title">Почему кофейни особенные:</h4>
          <ul class="cffx-roi-calc-coffee-list">
            <li>✓ Выше базовая лояльность — люди привыкают к "своему" месту</li>
            <li>✓ Чаще посещения — кофе нужен каждый день</li>
            <li>✓ Сильнее влияние привычки и удобного расположения</li>
            <li>✓ Быстрее распространение сарафанного радио среди друзей</li>
          </ul>
        </div>
        <div class="cffx-roi-calc-payback-explanation">
          <h4 class="cffx-roi-calc-payback-title">Все сигналы после 2-го = чистая прибыль:</h4>
          <ul class="cffx-roi-calc-payback-list">
            <li>✓ Стоимость системы: от ₽30.000/мес</li>
            <li>✓ Средняя стоимость предотвращенного ухода: от ₽{{ dynamicPreventedLoss }}</li>
            <li>✓ Система окупается после {{ displayResult.paybackSignals }}</li>
          </ul>
        </div>
        <div class="cffx-roi-calc-success-factors">
          <h4 class="cffx-roi-calc-success-title">Ключевые факторы успеха:</h4>
          <ul class="cffx-roi-calc-success-list">
            <li>✓ Время ответа на жалобу < 30 минут</li>
            <li>✓ Нематериальная компенсация</li>
            <li>✓ Персонализация предложений</li>
            <li>✓ Мониторинг качества сервиса</li>
          </ul>
        </div>
        <div class="cffx-roi-calc-cta-block">
          <p class="cffx-roi-calc-cta-text"><strong>Главное:</strong> Система окупается мгновенно, а каждый месяц приносит стабильный рост выручки в ₽{{ dynamicRevenueMillion }}+ млн.</p>
          <p class="cffx-roi-calc-cta-text">Следующий шаг → <a href="https://cffx.ru/brew/membership.html" class="cffx-roi-calc-cta-link">Получить QR-код</a></p>
        </div>
        <div class="cffx-roi-calc-warning-block">
          <p class="cffx-roi-calc-warning-text"><strong>Важно:</strong> Результаты достигаются только при качественном внедрении Диалогов с Сигналами и обучении персонала. Показаны консервативные оценки на основе анализа 100+ кофеен.</p>
        </div>
        <div class="cffx-roi-calc-info-block">
          <p class="cffx-roi-calc-info-text"><strong>Как работает расчет:</strong> Диалоги с Сигналами помогают быстро решать проблемы гостей, превращая потенциальные жалобы в возможности для повышения лояльности. Довольные клиенты посещают кофейню чаще и приводят друзей.</p>
          <p class="cffx-roi-calc-info-text"><strong>Основа расчетов:</strong> Данные основаны на анализе 100+ кофеен. В расчет включены затраты на Диалоги с Сигналами (от ₽30.000/мес). Консервативные оценки гарантируют реалистичность прогнозов.</p>
        </div>
      </div>
    </transition>

    <!-- Тултипы -->
    <transition name="cffx-roi-calc-tooltip-anim">
      <div v-if="activeTooltip" class="cffx-roi-calc-tooltip-popup" @click="closeTooltip">
        <div class="cffx-roi-calc-tooltip-content" @click.stop>
          <h4 class="cffx-roi-calc-tooltip-title">{{ currentTooltip.title }}</h4>
          <div v-if="currentTooltip.formula" class="cffx-roi-calc-formula" v-html="currentTooltip.formula"></div>
          <p class="cffx-roi-calc-tooltip-desc" v-html="currentTooltip.description"></p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State for inputs and UI
const guestsStr = ref('1000')
const averageCheckStr = ref('500')
const activeTooltip = ref(null)
const hoverIcon = ref(null)
const guestsError = ref('')
const checkError = ref('')
const calculatedResult = ref({})
const hasCalculated = ref(false)
const whyOpen = ref(false)

// Business logic constants
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

// UI Toggles
function showTooltip(tooltipId) {
  activeTooltip.value = activeTooltip.value === tooltipId ? null : tooltipId
}
function closeTooltip() {
  activeTooltip.value = null
}
function toggleWhy() {
  whyOpen.value = !whyOpen.value
}

// Computed values for dynamic text
const guestsNum = computed(() => Number(guestsStr.value.replace(/\s|,/g, '')))
const averageCheckNum = computed(() => Number(averageCheckStr.value.replace(/\s|,/g, '')))

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

// Input handling and validation
const canCalculate = computed(() => 
  guestsNum.value >= 50 && guestsNum.value <= 10000 && 
  averageCheckNum.value >= 100 && averageCheckNum.value <= 5000 &&
  !guestsError.value && !checkError.value
)

function validateGuests(value) {
  if (value < 50) return 'Минимум 50 гостей в месяц'
  if (value > 10000) return 'Максимум 10,000 гостей в месяц'
  return ''
}

function validateCheck(value) {
  if (value < 100) return 'Минимальный чек 100 ₽'
  if (value > 5000) return 'Максимальный чек 5,000 ₽'
  return ''
}

function onGuestsInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  const num = Number(digits)
  guestsStr.value = digits ? num.toLocaleString('ru-RU') : ''
  guestsError.value = digits ? validateGuests(num) : ''
  activeTooltip.value = null
}

function onAverageCheckInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  const num = Number(digits)
  averageCheckStr.value = digits ? num.toLocaleString('ru-RU') : ''
  checkError.value = digits ? validateCheck(num) : ''
  activeTooltip.value = null
}

// Number formatting utility
const formatNumber = (n) => new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(Math.round(n)).replace(/\s/g, '.')

// Tooltip content generator
const generateDynamicTooltips = (guests, check) => {
  const loyal_without = guests * constants.loyaltyRateWithoutSystem
  const loyal_with = guests * constants.loyaltyRateWithSystem
  const loyal_increase = loyal_with - loyal_without
  const loyalty_percent = Math.round(((loyal_with - loyal_without) / loyal_without) * 100)
  const ltv_without = check * constants.frequencyWithoutSystem * constants.loyaltyPeriod
  const ltv_with = check * constants.frequencyWithSystem * constants.loyaltyPeriod
  const revenue_without = loyal_without * constants.frequencyWithoutSystem * check
  const revenue_with = loyal_with * constants.frequencyWithSystem * check
  const additional_revenue = revenue_with - revenue_without
  const prevented_loss = Math.round(ltv_with * 0.7)
  const formatNum = (n) => formatNumber(n)

  return {
    guestsInput: { title: 'Количество гостей в месяц', description: 'Среднее количество уникальных посетителей вашей кофейни за месяц. Диапазон: 50-10,000 гостей/мес.' },
    averageCheckInput: { title: 'Средний чек', description: 'Средняя сумма одного заказа в вашей кофейне. Диапазон: 100-5,000 ₽.' },
    loyalGuests: { title: 'Прирост постоянных клиентов', formula: `${formatNum(guests)} × 42% = ${formatNum(loyal_without)}<br>${formatNum(guests)} × 65% = ${formatNum(loyal_with)}<br>${formatNum(loyal_with)} - ${formatNum(loyal_without)} = +${formatNum(loyal_increase)}`, description: `<strong>Без Сигнала:</strong> ${formatNum(guests)} × 42% = ${formatNum(loyal_without)} лояльных гостей<br><strong>С Сигналом:</strong> ${formatNum(guests)} × 65% = ${formatNum(loyal_with)} лояльных гостей<br><strong>Прирост:</strong> +${formatNum(loyal_increase)} гостей (+${loyalty_percent}%)<br><br>Сигналы помогают удерживать недовольных клиентов, превращая их в лояльных.` },
    frequency: { title: 'Как часто ходят лояльные гости', formula: `4 раз/мес → 7 раз/мес<br>7 - 4 = +3 раза<br>(3 ÷ 4) × 100% = +75%`, description: `<strong>Без системы:</strong> 4 раза в месяц (еженедельно)<br><strong>С системой:</strong> 7 раз в месяц (почти через день)<br><br>Довольные клиенты, чьи проблемы быстро решаются, посещают кофейню чаще.` },
    ltv: { title: 'Сколько денег приносит один лояльный гость', formula: `Без: ${check} × 4 × 10 = ₽${formatNum(ltv_without)}<br>С: ${check} × 7 × 10 = ₽${formatNum(ltv_with)}<br>Рост: +₽${formatNum(ltv_with - ltv_without)}`, description: `<strong>Формула:</strong> Средний чек × Частота × Период лояльности<br><br><strong>Без Сигнала:</strong><br>₽${check} × 4 раза/мес × 10 мес = ₽${formatNum(ltv_without)}<br><br><strong>С Сигналом:</strong><br>₽${check} × 7 раз/мес × 10 мес = ₽${formatNum(ltv_with)}<br><br>LTV показывает полную ценность клиента.` },
    revenue: { title: 'Дополнительная выручка каждый месяц', formula: `₽${formatNum(revenue_with)} - ₽${formatNum(revenue_without)} = ₽${formatNum(additional_revenue)}`, description: `<strong>Выручка без системы:</strong><br>${formatNum(loyal_without)} лояльных × 4 раза/мес × ₽${check} = ₽${formatNum(revenue_without)}<br><br><strong>Выручка с системой:</strong><br>${formatNum(loyal_with)} лояльных × 7 раз/мес × ₽${check} = ₽${formatNum(revenue_with)}<br><br><strong>Прирост выручки:</strong> ₽${formatNum(additional_revenue)}/мес` },
    payback: { title: 'Мгновенная окупаемость системы', formula: `₽30.000 ÷ ₽${formatNum(prevented_loss)} = ${(30000/prevented_loss).toFixed(1)}<br>Округляем: 1-2 сигнала`, description: `<strong>Стоимость системы:</strong> от ₽30.000/мес<br><strong>Средние потери от ухода клиента:</strong> от ₽${formatNum(prevented_loss)}<br><br><strong>Окупаемость:</strong> ₽30.000 ÷ ₽${formatNum(prevented_loss)} ≈ ${(30000/prevented_loss).toFixed(1)} сигнала<br><br><strong>Вывод:</strong> После 2-го предотвращенного ухода система приносит чистую прибыль.` }
  }
}

const currentTooltip = computed(() => {
  if (!activeTooltip.value) return { title: '', description: '', formula: '' }
  const tooltips = generateDynamicTooltips(guestsNum.value || 1000, averageCheckNum.value || 500)
  return tooltips[activeTooltip.value] || { title: '', description: '', formula: '' }
})

// Core calculation logic
function calculateROI(monthlyGuests, averageCheck) {
  const loyalWithout = monthlyGuests * constants.loyaltyRateWithoutSystem
  const loyalWith = monthlyGuests * constants.loyaltyRateWithSystem
  const loyalIncrease = loyalWith - loyalWithout
  const revenueWithout = loyalWithout * constants.frequencyWithoutSystem * averageCheck
  const revenueWith = loyalWith * constants.frequencyWithSystem * averageCheck
  const additionalRevenue = revenueWith - revenueWithout
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
    additionalMonthlyRevenue: Math.round(additionalRevenue),
    paybackSignals: `${paybackSignals-1}-${paybackSignals} сигнала`
  }
}

function calculate() {
  if (!canCalculate.value) return
  calculatedResult.value = calculateROI(guestsNum.value, averageCheckNum.value)
  hasCalculated.value = true
  activeTooltip.value = null
}

// Display logic
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
  if (!hasCalculated.value) {
    return defaultResult
  }
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
</script>

<style scoped>
.cffx-roi-calc-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff;
}

.cffx-roi-calc-container { 
  margin: 0 0 20px; 
  padding: 24px; 
  background: #1e1e1e; 
  border: 1px solid #2b2b2b; 
  border-radius: 12px; 
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); 
}

.cffx-roi-calc-container.cffx-roi-calc-content {
  margin-top: 0;
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.cffx-roi-calc-input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.cffx-roi-calc-input-group { 
  flex: 1;
  position: relative;
}

.cffx-roi-calc-label { 
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px; 
  font: 600 14px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
  color: #ffffff; 
}

.cffx-roi-calc-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #666666;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  flex-shrink: 0;
}
.cffx-roi-calc-info-icon.hover { background: #999999; }
.cffx-roi-calc-info-icon-table { border: none !important; }

.cffx-roi-calc-input { 
  width: 100%; 
  height: 44px; 
  padding: 0 14px; 
  font: 500 15px/44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
  background: #141414; 
  border: 1px solid #333333; 
  border-radius: 8px; 
  color: #ffffff; 
  transition: border-color 0.25s ease; 
  box-sizing: border-box;
}
.cffx-roi-calc-input:focus { border-color: #c5f946; outline: 0; }
.cffx-roi-calc-input.cffx-roi-calc-error { border-color: #ef4444; }
.cffx-roi-calc-input::placeholder { color: #888888; }

.cffx-roi-calc-error-message {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  font-size: 12px;
  color: #ef4444;
}

.cffx-roi-calc-btn {
  width: 100%;
  height: 44px;
  margin-top: 12px;
  font: 700 16px/44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-transform: uppercase;
  color: #ffffff;
  background: #347b6c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, color 0.2s;
}
.cffx-roi-calc-btn:disabled { 
  background: #555555; 
  color: #cccccc; 
  cursor: not-allowed; 
  transform: none;
}
.cffx-roi-calc-btn:not(:disabled):hover { 
  background: #c5f946; 
  color: #000000; 
  transform: translateY(-2px); 
}

.cffx-roi-calc-header {
  margin: 0 0 20px 0;
  padding: 0;
}
.cffx-roi-calc-title {
  margin: 0;
  padding: 16px 0;
  font: 600 18px/1.3 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-align: center;
  color: #c5f946;
}
.cffx-roi-calc-title-mobile { display: none; }

.cffx-roi-calc-table-container {
  margin: 0 0 20px 0;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #2b2b2b;
}
.cffx-roi-calc-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #141414;
}
.cffx-roi-calc-th {
  padding: 12px 16px;
  font: 600 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #c5f946;
  background: #1a1a1a;
  text-align: left;
  border-bottom: 1px solid #2b2b2b;
  white-space: nowrap;
}
.cffx-roi-calc-th:nth-child(1) { width: 45%; }
.cffx-roi-calc-th:nth-child(2) { width: 27.5%; }
.cffx-roi-calc-th:nth-child(3) { width: 27.5%; }
.cffx-roi-calc-td {
  padding: 12px 16px;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff;
  border-bottom: 1px solid #2b2b2b;
  white-space: nowrap;
}
.cffx-roi-calc-table tr:last-child .cffx-roi-calc-td,
.cffx-roi-calc-table tr:last-child .cffx-roi-calc-metric-cell {
  border-bottom: none;
}

.cffx-roi-calc-metric-cell {
  padding: 12px 16px;
  font: 500 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff;
  border-bottom: 1px solid #2b2b2b;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.cffx-roi-calc-metric-text {
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  flex: 1;
}
.cffx-roi-calc-metric-text:hover { color: rgba(197, 249, 70, 0.8); }
.cffx-roi-calc-metric-text.cffx-roi-calc-active { color: #c5f946; }
.cffx-roi-calc-highlight { color: #c5f946; font-weight: 600; }
.cffx-roi-calc-growth-secondary { color: #888888; font-weight: 400; font-size: 0.9em; }

.cffx-roi-calc-why-toggle {
  padding: 14px 16px;
  margin: -1px 0 12px 0;
  background: #1e1e1e;
  border: 1px solid #2b2b2b;
  border-radius: 8px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.cffx-roi-calc-why-toggle:hover { background: #232323; border-color: #3a3a3a; }
.cffx-roi-calc-why-text { font: 600 15px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
.cffx-roi-calc-why-icon { transition: transform 0.2s ease; }
.cffx-roi-calc-why-icon.open { transform: rotate(180deg); }

.cffx-roi-calc-signal-block, .cffx-roi-calc-coffee-specifics, .cffx-roi-calc-payback-explanation,
.cffx-roi-calc-success-factors, .cffx-roi-calc-cta-block, .cffx-roi-calc-warning-block,
.cffx-roi-calc-info-block {
  margin: 16px 0;
  padding: 16px;
  border-radius: 8px;
}
.cffx-roi-calc-signal-block { background: #1f1a0f; border: 1px solid #3a2e1e; }
.cffx-roi-calc-coffee-specifics { background: #1a1a1a; border: 1px solid #2b2b2b; }
.cffx-roi-calc-payback-explanation { background: #0f1a2a; border: 1px solid #1e3a4a; }
.cffx-roi-calc-success-factors { background: #0f2a1e; border: 1px solid #1e4a32; }
.cffx-roi-calc-cta-block { border: 1px solid #c5f946; background: #1e1e1e;}
.cffx-roi-calc-warning-block { background: #2a1f0f; border: 1px solid #4a3c1e; }
.cffx-roi-calc-info-block { background: #141414; border: 1px solid #2b2b2b; }

.cffx-roi-calc-signal-title, .cffx-roi-calc-coffee-title, .cffx-roi-calc-payback-title, .cffx-roi-calc-success-title {
  margin: 0 0 12px;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.cffx-roi-calc-signal-title { color: #fbbf24; }
.cffx-roi-calc-coffee-title { color: #d97706; }
.cffx-roi-calc-payback-title { color: #60a5fa; }
.cffx-roi-calc-success-title { color: #22c55e; }

.cffx-roi-calc-signal-list, .cffx-roi-calc-coffee-list, .cffx-roi-calc-payback-list, .cffx-roi-calc-success-list {
  margin: 0; padding: 0; list-style: none;
}
.cffx-roi-calc-signal-list li, .cffx-roi-calc-coffee-list li, .cffx-roi-calc-payback-list li, .cffx-roi-calc-success-list li {
  margin: 8px 0; font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #ffffff;
}

.cffx-roi-calc-cta-text { margin: 0 0 8px 0; font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #ffffff; }
.cffx-roi-calc-cta-text:last-child { margin-bottom: 0; }
.cffx-roi-calc-cta-link { color: #c5f946; text-decoration: none; font-weight: 600; }
.cffx-roi-calc-cta-link:hover { text-decoration: underline; }
.cffx-roi-calc-warning-text { margin: 0; font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #fbbf24; }
.cffx-roi-calc-info-text { margin: 0 0 12px 0; font: 400 13px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #cccccc; }
.cffx-roi-calc-info-text:last-child { margin-bottom: 0; }

.cffx-roi-calc-tooltip-popup {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.8); display: flex; justify-content: center;
  align-items: center; z-index: 1000; cursor: pointer;
}
.cffx-roi-calc-tooltip-content {
  max-width: 400px; padding: 20px; background: #2a2a2a;
  border: 1px solid #404040; border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); cursor: default;
}
.cffx-roi-calc-tooltip-title { margin: 0 0 12px 0; font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #c5f946; }
.cffx-roi-calc-formula {
  margin: 0 0 12px 0; padding: 8px 12px; background: #1a1a1a;
  border: 1px solid #333333; border-radius: 6px;
  font: 500 14px/1.4 'SF Mono', 'Monaco', monospace;
  color: #22c55e; text-align: center; letter-spacing: 0.025em;
}
.cffx-roi-calc-tooltip-desc { margin: 0; font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #cccccc; }

/* Animations */
.cffx-roi-calc-tooltip-anim-enter-active, .cffx-roi-calc-tooltip-anim-leave-active { transition: opacity 0.25s; }
.cffx-roi-calc-tooltip-anim-enter-from, .cffx-roi-calc-tooltip-anim-leave-to { opacity: 0; }
.cffx-roi-calc-collapse-enter-active, .cffx-roi-calc-collapse-leave-active { transition: all 0.3s ease-in-out; overflow: hidden; }
.cffx-roi-calc-collapse-enter-from, .cffx-roi-calc-collapse-leave-to { max-height: 0; opacity: 0; margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; border-width: 0; }
.cffx-roi-calc-collapse-enter-to, .cffx-roi-calc-collapse-leave-from { max-height: 2000px; opacity: 1; }


/* Responsive Styles */
@media(max-width: 768px) {
  .cffx-roi-calc-container { padding: 16px; margin-bottom: 12px; }
  .cffx-roi-calc-input-row { flex-direction: column; gap: 12px; margin-bottom: 12px; }
  .cffx-roi-calc-btn { height: 48px; font-size: 16px; line-height: 48px; margin-top: 8px; }
  .cffx-roi-calc-title-desktop { display: none; }
  .cffx-roi-calc-title-mobile { display: block; font-size: 16px; }
  .cffx-roi-calc-title { padding: 12px 0; }
  .cffx-roi-calc-header { margin: 0 0 12px 0; }
  .cffx-roi-calc-table-container { margin-bottom: 12px; border-radius: 6px; }
  .cffx-roi-calc-th, .cffx-roi-calc-td { padding: 8px 10px; font-size: 12px; white-space: normal; }
  .cffx-roi-calc-th:nth-child(1) { width: 50%; }
  .cffx-roi-calc-th:nth-child(2), .cffx-roi-calc-th:nth-child(3) { width: 25%; }
  .cffx-roi-calc-metric-cell { padding: 8px 10px; font-size: 12px; gap: 4px; flex-direction: column; align-items: stretch; }
  .cffx-roi-calc-metric-text { margin-bottom: 4px; }
  .cffx-roi-calc-info-icon { width: 16px; height: 16px; font-size: 10px; align-self: flex-end; margin-top: -20px; }
  .cffx-roi-calc-tooltip-content { max-width: calc(100vw - 32px); margin: 16px; padding: 16px; }
  .cffx-roi-calc-why-toggle { padding: 12px; margin-bottom: 10px; }
  .cffx-roi-calc-why-text { font-size: 14px; }
  .cffx-roi-calc-signal-block, .cffx-roi-calc-coffee-specifics, .cffx-roi-calc-payback-explanation, .cffx-roi-calc-success-factors, .cffx-roi-calc-cta-block, .cffx-roi-calc-warning-block, .cffx-roi-calc-info-block {
    padding: 12px; margin: 10px 0;
  }
  .cffx-roi-calc-signal-title, .cffx-roi-calc-coffee-title, .cffx-roi-calc-payback-title, .cffx-roi-calc-success-title { font-size: 14px; margin-bottom: 8px; }
  .cffx-roi-calc-signal-list li, .cffx-roi-calc-coffee-list li, .cffx-roi-calc-payback-list li, .cffx-roi-calc-success-list li, .cffx-roi-calc-cta-text, .cffx-roi-calc-warning-text, .cffx-roi-calc-info-text {
    font-size: 12px; line-height: 1.4;
  }
}

@media (min-width: 769px) {
  .cffx-roi-calc-title-mobile { display: none; }
  .cffx-roi-calc-title-desktop { display: block; }
}
</style>
