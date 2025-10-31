<template>
  <div class="fitltv-calc-wrapper">
    <!-- Ввод -->
    <div class="fitltv-calc-container">
      <div class="fitltv-calc-input-row">
        <div class="fitltv-calc-input-group">
          <label for="clubsInput" class="fitltv-calc-label">
            Клубов в сети:
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('clubsInput')"
                  @mouseenter="hoverIcon = 'clubsInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'clubsInput' }">i</span>
          </label>
          <input id="clubsInput" type="text" :value="clubsStr" placeholder="например, 10"
                 @input="onClubsInput"
                 :class="['fitltv-calc-input', { 'fitltv-calc-error': clubsError }]" />
          <div v-if="clubsError" class="fitltv-calc-error-message">{{ clubsError }}</div>
        </div>
        <div class="fitltv-calc-input-group">
          <label for="membersInput" class="fitltv-calc-label">
            Клиентов на клуб/мес:
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('membersInput')"
                  @mouseenter="hoverIcon = 'membersInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'membersInput' }">i</span>
          </label>
          <input id="membersInput" type="text" :value="membersStr" placeholder="например, 300"
                 @input="onMembersInput"
                 :class="['fitltv-calc-input', { 'fitltv-calc-error': membersError }]" />
          <div v-if="membersError" class="fitltv-calc-error-message">{{ membersError }}</div>
        </div>
        <div class="fitltv-calc-input-group">
          <label for="priceInput" class="fitltv-calc-label">
            Средний абонемент (₽):
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('priceInput')"
                  @mouseenter="hoverIcon = 'priceInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'priceInput' }">i</span>
          </label>
          <input id="priceInput" type="text" :value="priceStr" placeholder="например, 12000"
                 @input="onPriceInput"
                 :class="['fitltv-calc-input', { 'fitltv-calc-error': priceError }]" />
          <div v-if="priceError" class="fitltv-calc-error-message">{{ priceError }}</div>
        </div>
      </div>
      <button class="fitltv-calc-btn" :disabled="!canCalculate" @click="calculate">
        РАССЧИТАТЬ LTV
      </button>
    </div>

    <!-- Заголовок -->
    <div class="fitltv-calc-header">
      <h3 class="fitltv-calc-title">
        <span class="fitltv-calc-title-desktop">Рост LTV с системой сигналов</span>
        <span class="fitltv-calc-title-mobile">Эффект сигналов: фитнес</span>
      </h3>
    </div>

    <!-- Таблица -->
    <div class="fitltv-calc-table-container">
      <table class="fitltv-calc-table">
        <thead>
          <tr>
            <th class="fitltv-calc-th">Показатель</th>
            <th class="fitltv-calc-th">Без сигналов</th>
            <th class="fitltv-calc-th">С ⚡ сигналами</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text"
                    @click="showTooltip('clientsRetained')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'clientsRetained' }">Клиентов, оставшихся после продления</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('clientsRetained')"
                    @mouseenter="hoverIcon = 'clientsRetained'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'clientsRetained' }">i</span>
            </td>
            <td class="fitltv-calc-td">{{ displayResult.clientsBase }}</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.clientsWithSignals }} <span class="fitltv-calc-growth-secondary">(+{{ displayResult.retentionBoostPercent }}%)</span></td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text"
                    @click="showTooltip('ltv')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'ltv' }">LTV одного клиента (12 мес)</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('ltv')"
                    @mouseenter="hoverIcon = 'ltv'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'ltv' }">i</span>
            </td>
            <td class="fitltv-calc-td">₽{{ displayResult.ltvBase }}</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.ltvWithSignals }}<span class="fitltv-calc-growth-secondary"> (+₽{{ displayResult.ltvDiff }})</span></td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text"
                    @click="showTooltip('upsellRevenue')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'upsellRevenue' }">Доп. доход от апсейла/продаж</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('upsellRevenue')"
                    @mouseenter="hoverIcon = 'upsellRevenue'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'upsellRevenue' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.upsellRevenue }}</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text"
                    @click="showTooltip('additionalRevenue')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenue' }">Доп. выручка/год</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('additionalRevenue')"
                    @mouseenter="hoverIcon = 'additionalRevenue'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'additionalRevenue' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.additionalRevenue }}</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text"
                    @click="showTooltip('paybackSignals')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'paybackSignals' }">Окупаемость</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('paybackSignals')"
                    @mouseenter="hoverIcon = 'paybackSignals'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'paybackSignals' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.paybackSignals }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Триггер раскрытия -->
    <div class="fitltv-calc-why-toggle" :class="{ open: whyOpen }" @click="toggleWhy"
         :aria-expanded="whyOpen.toString()" role="button" tabindex="0">
      <span class="fitltv-calc-why-text">Почему это работает</span>
      <span class="fitltv-calc-why-icon" aria-hidden="true">
        <svg class="fitltv-calc-why-icon-svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </span>
    </div>
    <transition name="fitltv-calc-collapse">
      <div v-if="whyOpen" class="fitltv-calc-container fitltv-calc-content">
        <div class="fitltv-calc-factors-block">
          <h4 class="fitltv-calc-factors-title">Факторы успеха фитнеса:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Скорость обратной связи</span></div>
            <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Персонализация программы</span></div>
            <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Апсейлы и спецпредложения</span></div>
            <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Контроль оттока</span></div>
          </div>
        </div>
        <div class="fitltv-calc-cta-block">
          <p class="fitltv-calc-cta-text"><strong>Главное:</strong> Система сигналов увеличивает продления, снижает отток и даёт рост дохода для всей сети.</p>
        </div>
        <div class="fitltv-calc-warning-block">
          <p class="fitltv-calc-warning-text"><strong>Важное уточнение:</strong> Эффективность зависит от внедрения обратной связи и качества персонала.</p>
        </div>
        <div class="fitltv-calc-info-block">
          <p class="fitltv-calc-info-text"><strong>Как работает расчет:</strong> Быстрое реагирование на проблемы повышает retention и LTV клиентов.</p>
        </div>
      </div>
    </transition>
    <transition name="fitltv-calc-tooltip-anim">
      <div v-if="activeTooltip" class="fitltv-calc-tooltip-popup" @click="closeTooltip">
        <div class="fitltv-calc-tooltip-content" @click.stop>
          <h4 class="fitltv-calc-tooltip-title">{{ currentTooltip.title }}</h4>
          <div v-if="currentTooltip.formula" class="fitltv-calc-formula" v-html="currentTooltip.formula"></div>
          <p class="fitltv-calc-tooltip-desc" v-html="currentTooltip.description"></p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const clubsStr = ref('10')
const membersStr = ref('300')
const priceStr = ref('12000')
const activeTooltip = ref(null)
const hoverIcon = ref(null)
const clubsError = ref('')
const membersError = ref('')
const priceError = ref('')
const calculatedResult = ref({})
const hasCalculated = ref(false)
const whyOpen = ref(false)

const constants = {
  baseRetentionRate: 0.62,
  signalsRetentionBoost: 0.12,
  avgUpsellPerClientMonthly: 1200,
  ltvPeriodMonths: 12,
  systemMonthlyCost: 50000
}

function showTooltip(id) { activeTooltip.value = activeTooltip.value === id ? null : id }
function closeTooltip() { activeTooltip.value = null }
function toggleWhy() { whyOpen.value = !whyOpen.value }

const clubsNum = computed(() => Number(clubsStr.value.replace(/\s|,/g, '')))
const membersNum = computed(() => Number(membersStr.value.replace(/\s|,/g, '')))
const priceNum = computed(() => Number(priceStr.value.replace(/\s|,/g, '')))

const canCalculate = computed(() =>
  clubsNum.value >= 1 && clubsNum.value <= 100 &&
  membersNum.value >= 20 && membersNum.value <= 1000 &&
  priceNum.value >= 5000 && priceNum.value <= 30000 &&
  !clubsError.value && !membersError.value && !priceError.value
)

function validateClubs(v) {
  if (v < 1) return 'Минимум 1 клуб'
  if (v > 100) return 'Максимум 100 клубов'
  return ''
}
function validateMembers(v) {
  if (v < 20) return 'Минимум 20 клиентов на клуб'
  if (v > 1000) return 'Максимум 1000 клиентов на клуб'
  return ''
}
function validatePrice(v) {
  if (v < 5000) return 'Минимальная цена абонемента 5 000 ₽'
  if (v > 30000) return 'Максимальная цена абонемента 30 000 ₽'
  return ''
}
function onClubsInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  const num = Number(digits)
  clubsStr.value = digits ? num.toLocaleString('ru-RU') : ''
  clubsError.value = digits ? validateClubs(num) : ''
  activeTooltip.value = null
}
function onMembersInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  const num = Number(digits)
  membersStr.value = digits ? num.toLocaleString('ru-RU') : ''
  membersError.value = digits ? validateMembers(num) : ''
  activeTooltip.value = null
}
function onPriceInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  const num = Number(digits)
  priceStr.value = digits ? num.toLocaleString('ru-RU') : ''
  priceError.value = digits ? validatePrice(num) : ''
  activeTooltip.value = null
}

const formatNumber = (n) => new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 0, maximumFractionDigits: 0
}).format(Math.round(n)).replace(/\s/g, '.')

const generateDynamicTooltips = (clubs, members, price) => {
  const { baseRetentionRate, signalsRetentionBoost, avgUpsellPerClientMonthly, ltvPeriodMonths, systemMonthlyCost } = constants

  const clientsBase = members * clubs * baseRetentionRate
  const clientsWithSignals = members * clubs * (baseRetentionRate + signalsRetentionBoost)
  const ltvBase = price * baseRetentionRate * ltvPeriodMonths
  const ltvWithSignals = price * (baseRetentionRate + signalsRetentionBoost) * ltvPeriodMonths
  const additionalRevenue = (ltvWithSignals - ltvBase) * clientsWithSignals
  const upsellRevenue = avgUpsellPerClientMonthly * clientsWithSignals * ltvPeriodMonths
  const preventedChurnClients = members * clubs * signalsRetentionBoost
  const paybackSignals = Math.ceil(systemMonthlyCost / ((preventedChurnClients * ltvWithSignals) / ltvPeriodMonths))

  return {
    clubsInput: { title: 'Клубы сети', description: 'Укажите количество клубов. Диапазон: 1-100.' },
    membersInput: { title: 'Клиентов на клуб', description: 'Среднее количество клиентов, посещающих один клуб в месяц. 20–1000.' },
    priceInput: { title: 'Средняя цена абонемента', description: 'Средняя стоимость абонемента за месяц. Диапазон: 5 000–30 000 ₽.' },
    clientsRetained: {
      title: 'Клиентов, продливших абонемент',
      formula: `${members} × ${clubs} × 62% = ${formatNumber(clientsBase)}<br>
                ${members} × ${clubs} × 74% = ${formatNumber(clientsWithSignals)}`,
      description: `Дополнительно удержано +${formatNumber(clientsWithSignals - clientsBase)} клиентов с сигналами.`
    },
    ltv: {
      title: 'LTV клиента за 12 мес.',
      formula: `${price} × 0.62 × 12 = ₽${formatNumber(ltvBase)}<br>
                ${price} × 0.74 × 12 = ₽${formatNumber(ltvWithSignals)}`,
      description: `Рост: +₽${formatNumber(ltvWithSignals - ltvBase)}`
    },
    upsellRevenue: {
      title: 'Доход от апсейлов',
      formula: `₽${formatNumber(avgUpsellPerClientMonthly)} × ${formatNumber(clientsWithSignals)} × 12 = ₽${formatNumber(upsellRevenue)}`,
      description: `Апсейлы: выздоровительные услуги, персональные тренировки, мерч.`
    },
    additionalRevenue: {
      title: 'Дополнительная выручка/год',
      formula: `₽${formatNumber(ltvWithSignals)} - ₽${formatNumber(ltvBase)} = ₽${formatNumber(ltvWithSignals-ltvBase)}<br>
                На всех удержанных: ₽${formatNumber(additionalRevenue)}`,
      description: `Разница между выручкой без/с системой на удержанных клиентах.`
    },
    paybackSignals: {
      title: 'Окупаемость сигнальной системы',
      formula: `₽${systemMonthlyCost} ÷ ((${formatNumber(preventedChurnClients)} × ${formatNumber(ltvWithSignals)} / 12)) = ${paybackSignals}`,
      description: `Система окупается после ${paybackSignals} предотвращенных уходов.`
    }
  }
}

const currentTooltip = computed(() => {
  if (!activeTooltip.value) return { title: '', description: '', formula: '' }
  const t = generateDynamicTooltips(clubsNum.value || 10, membersNum.value || 300, priceNum.value || 12000)
  return t[activeTooltip.value] || { title: '', description: '', formula: '' }
})

function calcFitnessLTV({
  clubsCount,
  avgClientsPerClubMonthly,
  avgMembershipPrice,
  baseRetentionRate,
  signalsRetentionBoost,
  avgUpsellPerClientMonthly,
  ltvPeriodMonths,
  systemMonthlyCost
}) {
  const clientsBase = avgClientsPerClubMonthly * clubsCount * baseRetentionRate
  const clientsWithSignals = avgClientsPerClubMonthly * clubsCount * (baseRetentionRate + signalsRetentionBoost)
  const ltvBase = avgMembershipPrice * baseRetentionRate * ltvPeriodMonths
  const ltvWithSignals = avgMembershipPrice * (baseRetentionRate + signalsRetentionBoost) * ltvPeriodMonths
  const additionalRevenue = (ltvWithSignals - ltvBase) * clientsWithSignals
  const upsellRevenue = avgUpsellPerClientMonthly * clientsWithSignals * ltvPeriodMonths
  const preventedChurnClients = avgClientsPerClubMonthly * clubsCount * signalsRetentionBoost
  const paybackSignals = Math.ceil(systemMonthlyCost / ((preventedChurnClients * ltvWithSignals) / ltvPeriodMonths))
  return {
    clientsBase: formatNumber(clientsBase),
    clientsWithSignals: formatNumber(clientsWithSignals),
    retentionBoostPercent: Math.round(signalsRetentionBoost * 100),
    ltvBase: formatNumber(ltvBase),
    ltvWithSignals: formatNumber(ltvWithSignals),
    ltvDiff: formatNumber(ltvWithSignals - ltvBase),
    additionalRevenue: formatNumber(additionalRevenue),
    upsellRevenue: formatNumber(upsellRevenue),
    paybackSignals
  }
}

const defaultResult = {
  clientsBase: '1.860',
  clientsWithSignals: '2.220',
  retentionBoostPercent: '12',
  ltvBase: '89.280',
  ltvWithSignals: '106.560',
  ltvDiff: '17.280',
  additionalRevenue: '6.955.200',
  upsellRevenue: '31.968.000',
  paybackSignals: '1'
}

const displayResult = computed(() => {
  if (!hasCalculated.value) return defaultResult
  const r = calculatedResult.value
  return r
})

function calculate() {
  if (!canCalculate.value) return
  calculatedResult.value = calcFitnessLTV({
    clubsCount: clubsNum.value,
    avgClientsPerClubMonthly: membersNum.value,
    avgMembershipPrice: priceNum.value,
    baseRetentionRate: constants.baseRetentionRate,
    signalsRetentionBoost: constants.signalsRetentionBoost,
    avgUpsellPerClientMonthly: constants.avgUpsellPerClientMonthly,
    ltvPeriodMonths: constants.ltvPeriodMonths,
    systemMonthlyCost: constants.systemMonthlyCost
  })
  hasCalculated.value = true
  activeTooltip.value = null
}
</script>

<!-- Оставьте вашу стилизацию, но используйте уникальные фитнес-классы: -->

<style scoped>
/* Wrapper */
.fitltv-calc-wrapper{width:100%;max-width:1200px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff}

.fitltv-calc-container{margin:0 0 20px;padding:24px;background:#23272c;border:1px solid #2b2b2b;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,.25)}
.fitltv-calc-container.fitltv-calc-content{margin-top:0;border-top:none;border-top-left-radius:0;border-top-right-radius:0}

.fitltv-calc-input-row{display:flex;gap:20px;margin-bottom:16px}
.fitltv-calc-input-group{flex:1;position:relative}
.fitltv-calc-label{display:flex;align-items:center;gap:8px;margin-bottom:6px;font:600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff}
.fitltv-calc-info-icon{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:#2183f9;border-radius:50%;cursor:pointer;transition:all .2s;font-size:12px;font-weight:600;color:#fff;flex-shrink:0}
.fitltv-calc-info-icon.hover{background:#37ccfe}
.fitltv-calc-info-icon-table{border:none}
.fitltv-calc-input{width:100%;height:44px;padding:0 14px;font:500 15px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#222;border:1px solid #333;border-radius:8px;color:#fff;transition:border-color .25s;box-sizing:border-box}
.fitltv-calc-input:focus{border-color:#2183f9;outline:0}
.fitltv-calc-input.fitltv-calc-error{border-color:#ef4444}
.fitltv-calc-input::placeholder{color:#888}
.fitltv-calc-error-message{position:absolute;top:100%;left:0;margin-top:4px;font-size:12px;color:#ef4444}

.fitltv-calc-btn{width:100%;height:44px;margin-top:12px;font:700 16px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-transform:uppercase;color:#fff;background:#37ccfe;border:none;border-radius:8px;cursor:pointer;transition:background .2s,transform .2s,color .2s}
.fitltv-calc-btn:disabled{background:#555;color:#ccc;cursor:not-allowed;transform:none}
.fitltv-calc-btn:not(:disabled):hover{background:#2183f9;color:#fff;transform:translateY(-2px)}

.fitltv-calc-header{margin:0 0 20px 0;padding:0}
.fitltv-calc-title{margin:0;padding:16px 0;font:600 18px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-align:center;color:#37ccfe}
.fitltv-calc-title-mobile{display:none}

.fitltv-calc-table-container{margin:0 0 20px 0;overflow:hidden;border-radius:8px;border:1px solid #2b2b2b}

.fitltv-calc-table{width:100%;border-collapse:separate;border-spacing:0;background:#141414;table-layout:auto;margin:0;padding:0}
.fitltv-calc-table tr{position:relative}
.fitltv-calc-table thead tr::after{content:none}
.fitltv-calc-table tbody tr::after{content:"";position:absolute;left:16px;right:16px;bottom:0;height:1px;background:#2b2b2b;transform:translateZ(0)}
.fitltv-calc-table tbody tr:last-child::after{display:none}

.fitltv-calc-th,.fitltv-calc-td,.fitltv-calc-metric-cell{border:0;padding:10px 16px;vertical-align:middle;line-height:1.35}
.fitltv-calc-th{font:600 14px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#37ccfe;background:#21272c;text-align:left;white-space:nowrap}
.fitltv-calc-th:nth-child(1){width:45%}
.fitltv-calc-th:nth-child(2){width:27.5%}
.fitltv-calc-th:nth-child(3){width:27.5%}
.fitltv-calc-td{font:400 14px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;white-space:nowrap}
.fitltv-calc-metric-cell{display:flex;align-items:center;justify-content:space-between;gap:8px;white-space:nowrap}
.fitltv-calc-metric-text{cursor:pointer;transition:color .2s;user-select:none;flex:1}
.fitltv-calc-metric-text:hover{color:rgba(55,204,254,.8)}
.fitltv-calc-metric-text.fitltv-calc-active{color:#37ccfe}
.fitltv-calc-highlight{color:#37ccfe;font-weight:600}
.fitltv-calc-growth-secondary{color:#888;font-weight:400;font-size:.9em}

/* Toggle */
.fitltv-calc-why-toggle{padding:14px 16px;margin:0;background:#23272c;border:1px solid #2b2b2b;border-radius:8px;color:#fff;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;transition:background .2s ease,border-color .2s ease}
.fitltv-calc-why-toggle.open{border-bottom-left-radius:0;border-bottom-right-radius:0}
.fitltv-calc-why-toggle:hover{background:#253249;border-color:#3a3a3a}
.fitltv-calc-why-text{font:600 15px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.fitltv-calc-why-icon-svg{width:24px;height:24px;color:#37ccfe;transition:transform .2s ease,color .2s ease}
.fitltv-calc-why-toggle:hover .fitltv-calc-why-icon-svg{color:#1666c1}
.fitltv-calc-why-toggle.open .fitltv-calc-why-icon-svg{transform:rotate(180deg)}

.fitltv-calc-factors-block{margin:16px 0;padding:16px;background:#164d5c;border:1px solid #3a2e1e;border-radius:8px}
.fitltv-calc-factors-title{margin:0 0 12px;font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#37ccfe}
.fitltv-chip-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.fitltv-chip{display:inline-flex;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;color:#fff;font:500 14px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;border:1px solid transparent}
.fitltv-chip-icon{width:18px;height:18px;opacity:.9}
.fitltv-chip--green{background:#243e28;border-color:#1e4a32}

/* CTA/Info/Warning */
.fitltv-calc-cta-block{margin:16px 0;padding:16px;background:#23272c;border:1px solid #37ccfe;border-radius:8px}
.fitltv-calc-cta-text{margin:0 0 8px 0;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff}
.fitltv-calc-warning-block{margin:16px 0;padding:16px;background:#2d263a;border:1px solid #4a3c1e;border-radius:8px}
.fitltv-calc-warning-text{margin:0;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#37ccfe}
.fitltv-calc-info-block{margin:16px 0;padding:16px;background:#141414;border:1px solid #2b2b2b;border-radius:8px}
.fitltv-calc-info-text{margin:0 0 12px 0;font:400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ccc}
.fitltv-calc-info-text:last-child{margin-bottom:0}

.fitltv-calc-tooltip-popup{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);display:flex;justify-content:center;align-items:center;z-index:1000;cursor:pointer}
.fitltv-calc-tooltip-content{max-width:400px;padding:20px;background:#2a2a2a;border:1px solid #404040;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.4);cursor:default}
.fitltv-calc-tooltip-title{margin:0 0 12px 0;font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#37ccfe}
.fitltv-calc-formula{margin:0 0 12px 0;padding:8px 12px;background:#1a1a1a;border:1px solid #333;border-radius:6px;font:500 14px/1.4 'SF Mono','Monaco','Inconsolata','Roboto Mono',monospace;color:#37ccfe;text-align:center;letter-spacing:.025em}
.fitltv-calc-tooltip-desc{margin:0;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ccc}
.fitltv-calc-tooltip-anim-enter-active,.fitltv-calc-tooltip-anim-leave-active{transition:opacity .25s}
.fitltv-calc-tooltip-anim-enter-from,.fitltv-calc-tooltip-anim-leave-to{opacity:0}
.fitltv-calc-collapse-enter-active,.fitltv-calc-collapse-leave-active{transition:all .3s ease-in-out;overflow:hidden}
.fitltv-calc-collapse-enter-from,.fitltv-calc-collapse-leave-to{max-height:0;opacity:0}
.fitltv-calc-collapse-enter-to,.fitltv-calc-collapse-leave-from{max-height:2000px;opacity:1}

@media (max-width:768px){
  .fitltv-calc-container{padding:16px;margin-bottom:12px}
  .fitltv-calc-input-row{flex-direction:column;gap:12px;margin-bottom:12px}
  .fitltv-calc-btn{height:48px;font-size:16px;line-height:48px;margin-top:8px}
  .fitltv-calc-title-desktop{display:none}
  .fitltv-calc-title-mobile{display:block;font-size:16px}
  .fitltv-calc-title{padding:12px 0}
  .fitltv-calc-header{margin:0 0 12px 0}
  .fitltv-calc-table-container{margin-bottom:12px;border-radius:6px}
  .fitltv-calc-th,.fitltv-calc-td,.fitltv-calc-metric-cell{padding:8px 10px;white-space:normal}
  .fitltv-calc-th:nth-child(1){width:50%}
  .fitltv-calc-th:nth-child(2),.fitltv-calc-th:nth-child(3){width:25%}
  .fitltv-calc-metric-cell{gap:6px;align-items:flex-start}
  .fitltv-calc-info-icon{width:16px;height:16px;font-size:10px;margin-top:2px}
  .fitltv-calc-table tbody tr::after{left:10px;right:10px}
  .fitltv-calc-why-toggle{padding:12px}
  .fitltv-calc-why-text{font-size:14px}
}
@media (min-width:769px){
  .fitltv-calc-title-mobile{display:none}
  .fitltv-calc-title-desktop{display:block}
}
</style>
