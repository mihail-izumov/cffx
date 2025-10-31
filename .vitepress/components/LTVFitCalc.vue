<template>
  <div class="fitltv-calc-wrapper">
    <div class="fitltv-calc-container">
      <div class="fitltv-calc-input-row">
        <!-- Клубы -->
        <div class="fitltv-calc-input-group">
          <label for="clubsInput" class="fitltv-calc-label">Число клубов:
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('clubsInput')"
                  @mouseenter="hoverIcon = 'clubsInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'clubsInput' }">i</span>
          </label>
          <input id="clubsInput" type="text" :value="clubsStr" placeholder="например, 1–20"
                 @input="onClubsInput"
                 :class="['fitltv-calc-input', { 'fitltv-calc-error': clubsError }]" />
          <div v-if="clubsError" class="fitltv-calc-error-message">{{ clubsError }}</div>
        </div>
        <!-- Клиенты -->
        <div class="fitltv-calc-input-group">
          <label for="membersInput" class="fitltv-calc-label">Клиентов на клуб (в мес):
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('membersInput')"
                  @mouseenter="hoverIcon = 'membersInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'membersInput' }">i</span>
          </label>
          <input id="membersInput" type="text" :value="membersStr" placeholder="например, 800"
                 @input="onMembersInput"
                 :class="['fitltv-calc-input', { 'fitltv-calc-error': membersError }]" />
          <div v-if="membersError" class="fitltv-calc-error-message">{{ membersError }}</div>
        </div>
        <!-- Абонемент -->
        <div class="fitltv-calc-input-group">
          <label for="priceInput" class="fitltv-calc-label">Абонемент (₽):
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
        <!-- Частота посещений -->
        <div class="fitltv-calc-input-group">
          <label for="freqInput" class="fitltv-calc-label">
            Частота посещений/мес:
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('freqInput')"
                  @mouseenter="hoverIcon = 'freqInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'freqInput' }">i</span>
          </label>
          <input id="freqInput" type="text" :value="freqStr" placeholder="например, 8"
                 @input="onFreqInput"
                 :class="['fitltv-calc-input', { 'fitltv-calc-error': freqError }]" />
          <div v-if="freqError" class="fitltv-calc-error-message">{{ freqError }}</div>
        </div>
        <!-- Переключатель месяц/год -->
        <div class="fitltv-calc-radio-group">
          <label>
            <input type="radio" value="month" v-model="periodType" /> Месяц
          </label>
          <label>
            <input type="radio" value="year" v-model="periodType" /> Год
          </label>
        </div>
      </div>
      <button class="fitltv-calc-btn" :disabled="!canCalculate" @click="calculate">
        РАССЧИТАТЬ LTV
      </button>
    </div>

    <div class="fitltv-calc-header">
      <h3 class="fitltv-calc-title">
        <span class="fitltv-calc-title-desktop">Рост LTV с системой сигналов</span>
        <span class="fitltv-calc-title-mobile">Эффект сигналов: фитнес</span>
      </h3>
    </div>

    <!-- Таблица: все динамические строки сохранены -->
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
              <span class="fitltv-calc-metric-text" @click="showTooltip('clientsRetained')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'clientsRetained' }">Удержанные клиенты/мес</span>
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
              <span class="fitltv-calc-metric-text" @click="showTooltip('frequency')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'frequency' }">Частота посещений</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('frequency')"
                    @mouseenter="hoverIcon = 'frequency'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'frequency' }">i</span>
            </td>
            <td class="fitltv-calc-td">{{ displayResult.frequencyBase }}</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.frequencyWith }} <span class="fitltv-calc-growth-secondary">(+{{ displayResult.frequencyBoostPercent }}%)</span></td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('ltv')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'ltv' }">LTV клиента ({{ periodType === 'month' ? '10 мес' : '1 год' }})</span>
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
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalRevenue')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenue' }">Доп. выручка/{{ periodType === 'month' ? 'мес' : 'год' }}</span>
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
              <span class="fitltv-calc-metric-text" @click="showTooltip('paybackSignals')"
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
    <!-- Динамические секции: Почему получится, успехи, окупаемость -->
    <div class="fitltv-calc-why-toggle" :class="{ open: whyOpen }" @click="toggleWhy"
         :aria-expanded="whyOpen.toString()" role="button" tabindex="0">
      <span class="fitltv-calc-why-text">Почему все получится</span>
      <span class="fitltv-calc-why-icon" aria-hidden="true">
        <svg class="fitltv-calc-why-icon-svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </span>
    </div>
    <transition name="fitltv-calc-collapse">
      <div v-if="whyOpen" class="fitltv-calc-container fitltv-calc-content">
        <div class="fitltv-calc-signal-block">
          <h4 class="fitltv-calc-signal-title">Каждый сигнал = шанс вернуть клиента:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--amber"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Недовольство тренера/группы</div>
            <div class="fitltv-chip fitltv-chip--amber"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Жалоба на сервис/чистоту</div>
            <div class="fitltv-chip fitltv-chip--amber"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Комментарий о расписании</div>
            <div class="fitltv-chip fitltv-chip--amber"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Проблема с оплатой/тарифом</div>
          </div>
        </div>
        <div class="fitltv-calc-factors-block">
          <h4 class="fitltv-calc-factors-title">Почему фитнес отличается:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Высокая стоимость удержания</div>
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Решающий фактор — лояльность</div>
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Сарафанное радио работает медленно</div>
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Частые возвраты после жалоб</div>
          </div>
        </div>
        <div class="fitltv-calc-payback-explanation">
          <h4 class="fitltv-calc-payback-title">Все сигналы после 2-го = чистая прибыль:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--blue"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Стоимость системы: от ₽{{ systemMonthlyCostDisplay }}/мес на клуб</div>
            <div class="fitltv-chip fitltv-chip--blue"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Прирост удержания: +{{ retentionBoostDisplay }}%</div>
            <div class="fitltv-chip fitltv-chip--blue"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Система окупается после {{ displayResult.paybackSignals }}</div>
          </div>
        </div>
        <div class="fitltv-calc-success-factors">
          <h4 class="fitltv-calc-success-title">Ключевые факторы успеха:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Время ответа на жалобу &lt; 30 мин</div>
            <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Персонализация предложений</div>
            <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Мониторинг качества сервиса</div>
            <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>Нематериальная компенсация</div>
          </div>
        </div>
        <div class="fitltv-calc-cta-block">
          <p class="fitltv-calc-cta-text"><strong>Главное:</strong> Окупаемость наступает сразу, а каждый месяц приносит стабильный рост дохода за счет доп. retention.</p>
        </div>
        <div class="fitltv-calc-warning-block">
          <p class="fitltv-calc-warning-text"><strong>Внимание:</strong> Результат зависит от качества внедрения и обучения команды.</p>
        </div>
        <div class="fitltv-calc-info-block">
          <p class="fitltv-calc-info-text"><strong>Как работает расчет:</strong> Оперативное закрытие проблем и предоставление ценности увеличивают retention и LTV клиентов.</p>
          <p class="fitltv-calc-info-text"><strong>Основа расчетов:</strong> Используются реальные отраслевые метрики с учетом типа абонемента и тарифов.</p>
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
const membersStr = ref('800')
const priceStr = ref('12000')
const freqStr = ref('8')
const periodType = ref('month')
const activeTooltip = ref(null)
const hoverIcon = ref(null)
const clubsError = ref('')
const membersError = ref('')
const priceError = ref('')
const freqError = ref('')
const calculatedResult = ref({})
const hasCalculated = ref(false)
const whyOpen = ref(false)
const systemMonthlyCost = ref(27500) // Цена за 1 клуб

const constants = {
  baseRetentionRate: 0.62,
  signalsRetentionBoost: 0.12,
  periodMonths: { month: 10, year: 12 },
  freqBoost: 0.1 // Частота увеличивается на 10% при внедрении сигналов
}

function showTooltip(id) { activeTooltip.value = activeTooltip.value === id ? null : id }
function closeTooltip() { activeTooltip.value = null }
function toggleWhy() { whyOpen.value = !whyOpen.value }
const clubsNum = computed(() => Number(clubsStr.value.replace(/\s|,/g, '')))
const membersNum = computed(() => Number(membersStr.value.replace(/\s|,/g, '')))
const priceNum = computed(() => Number(priceStr.value.replace(/\s|,/g, '')))
const freqNum = computed(() => Number(freqStr.value.replace(/\s|,/g, '')))
const systemMonthlyCostDisplay = computed(() => formatNumber(systemMonthlyCost.value))
const retentionBoostDisplay = computed(() => Math.round(constants.signalsRetentionBoost * 100))

const canCalculate = computed(() =>
  clubsNum.value >= 1 && clubsNum.value <= 25 &&
  membersNum.value >= 50 && membersNum.value <= 4000 &&
  priceNum.value >= 4000 && priceNum.value <= 80000 &&
  freqNum.value >= 2 && freqNum.value <= 30 &&
  !clubsError.value && !membersError.value && !priceError.value && !freqError.value
)

function validateClubs(v) {
  if (v < 1) return 'Минимум 1 клуб'
  if (v > 25) return 'Максимум 25 клубов'
  return ''
}
function validateMembers(v) {
  if (v < 50) return 'Минимум 50 клиентов/мес'
  if (v > 4000) return 'Максимум 4000 клиентов/мес'
  return ''
}
function validatePrice(v) {
  if (v < 4000) return 'Минимальная цена абонемента 4 000 ₽'
  if (v > 80000) return 'Максимальная цена абонемента 80 000 ₽'
  return ''
}
function validateFreq(v) {
  if (v < 2) return 'Минимум 2 посещения/мес'
  if (v > 30) return 'Максимум 30 посещений/мес'
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
function onFreqInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  const num = Number(digits)
  freqStr.value = digits ? num.toLocaleString('ru-RU') : ''
  freqError.value = digits ? validateFreq(num) : ''
  activeTooltip.value = null
}
const formatNumber = (n) => new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 0, maximumFractionDigits: 0
}).format(Math.round(n)).replace(/\s/g, '.')

const generateDynamicTooltips = (clubs, members, price, freq, periodTypeVal) => {
  const months = constants.periodMonths[periodTypeVal]
  const retentionBase = constants.baseRetentionRate
  const retentionWith = retentionBase + constants.signalsRetentionBoost
  const loyalBase = members * retentionBase
  const loyalWith = members * retentionWith
  const loyalIncrease = loyalWith - loyalBase
  const loyalPercent = Math.round(((loyalWith - loyalBase) / loyalBase) * 100)
  const freqBase = freq
  const freqWith = freqBase + Math.round(freqBase * constants.freqBoost)
  const freqIncreasePercent = Math.round(constants.freqBoost * 100)
  const ltvBase = price * freqBase * months
  const ltvWithSignals = price * freqWith * months
  const ltvDiff = ltvWithSignals - ltvBase
  const additionalRevenue = (ltvWithSignals - ltvBase) * loyalWith * clubs
  const preventedChurnClients = members * clubs * constants.signalsRetentionBoost
  const paybackSignals = Math.max(1, Math.ceil(systemMonthlyCost.value / ((preventedChurnClients * ltvWithSignals) / months)))
  return {
    clubsInput: { title: 'Клубы', description: 'Число ваших фитнес-клубов. Диапазон: 1–25.' },
    membersInput: { title: 'Клиентов на клуб/мес', description: 'Среднее кол-во уникальных клиентов по абонементам.' },
    priceInput: { title: 'Абонемент', description: 'Стоимость абонемента месячного или годового. Диапазон: 4 000–80 000.' },
    freqInput: { title: 'Частота посещений', description: 'Среднее посещений на клиента в месяц.' },
    clientsRetained: { title: 'Динамика retention',
      formula: `${members} × ${formatNumber(retentionBase * 100)}% = ${formatNumber(loyalBase)}<br>${members} × ${formatNumber(retentionWith * 100)}% = ${formatNumber(loyalWith)}`,
      description: `Прирост: +${formatNumber(loyalIncrease)} клиентов (+${loyalPercent}%).`
    },
    frequency: { title: 'Частота посещений',
      formula: `${freqBase} → ${freqWith} (+${freqIncreasePercent}%)`,
      description: 'Больше позитивных кейсов — выше частота посещений.'
    },
    ltv: { title: `LTV клиента (${months} мес)`,
      formula: `${price} × ${freqBase} × ${months} = ₽${formatNumber(ltvBase)}<br>${price} × ${freqWith} × ${months} = ₽${formatNumber(ltvWithSignals)}`,
      description: `Рост: +₽${formatNumber(ltvDiff)}`
    },
    additionalRevenue: { title: `Доп. выручка/${periodTypeVal === 'month' ? 'мес' : 'год'}`,
      formula: `На всех удержанных: (${formatNumber(loyalWith)} × ${clubs}) × (₽${formatNumber(ltvWithSignals - ltvBase)}) = ₽${formatNumber(additionalRevenue)}`,
      description: `Доп. выручка с усиленным retention и частотой посещений.`
    },
    paybackSignals: { title: 'Окупаемость',
      formula: `₽${systemMonthlyCost.value} ÷ ((${formatNumber(preventedChurnClients)} × ${formatNumber(ltvWithSignals)} / ${months})) = ${paybackSignals}`,
      description: `После ${paybackSignals} предотвращённых уходов — чистая прибыль.`
    }
  }
}

const currentTooltip = computed(() => {
  if (!activeTooltip.value) return { title: '', description: '', formula: '' }
  const t = generateDynamicTooltips(clubsNum.value, membersNum.value, priceNum.value, freqNum.value, periodType.value)
  return t[activeTooltip.value] || { title: '', description: '', formula: '' }
})

function calcFitnessLTV({ clubsCount, avgClientsPerClubMonthly, avgMembershipPrice, freq, baseRetentionRate, signalsRetentionBoost, periodTypeVal, systemMonthlyCost }) {
  const months = constants.periodMonths[periodTypeVal]
  const retentionBase = baseRetentionRate
  const retentionWith = baseRetentionRate + signalsRetentionBoost
  const loyalBase = avgClientsPerClubMonthly * retentionBase
  const loyalWith = avgClientsPerClubMonthly * retentionWith
  const loyalPercent = Math.round((loyalWith - loyalBase) / loyalBase * 100)
  const freqBase = freq
  const freqWith = freqBase + Math.round(freqBase * constants.freqBoost)
  const freqIncreasePercent = Math.round(constants.freqBoost * 100)
  const ltvBase = avgMembershipPrice * freqBase * months
  const ltvWithSignals = avgMembershipPrice * freqWith * months
  const ltvDiff = ltvWithSignals - ltvBase
  const additionalRevenue = (ltvWithSignals - ltvBase) * loyalWith * clubsCount
  const preventedChurnClients = avgClientsPerClubMonthly * clubsCount * signalsRetentionBoost
  const paybackSignals = Math.max(1, Math.ceil(systemMonthlyCost / ((preventedChurnClients * ltvWithSignals) / months)))
  return {
    clientsBase: formatNumber(loyalBase * clubsCount),
    clientsWithSignals: formatNumber(loyalWith * clubsCount),
    retentionBoostPercent: loyalPercent,
    frequencyBase: `${freqBase} раз/мес`,
    frequencyWith: `${freqWith} раз/мес`,
    frequencyBoostPercent: freqIncreasePercent,
    ltvBase: formatNumber(ltvBase),
    ltvWithSignals: formatNumber(ltvWithSignals),
    ltvDiff: formatNumber(ltvDiff),
    additionalRevenue: formatNumber(additionalRevenue),
    paybackSignals
  }
}

const defaultResult = {
  clientsBase: '6.200',
  clientsWithSignals: '7.384',
  retentionBoostPercent: '12',
  frequencyBase: '8 раз/мес',
  frequencyWith: '9 раз/мес',
  frequencyBoostPercent: '12',
  ltvBase: '960.000',
  ltvWithSignals: '1.080.000',
  ltvDiff: '120.000',
  additionalRevenue: '141.120.000',
  paybackSignals: '1'
}

const displayResult = computed(() => {
  if (!hasCalculated.value) return defaultResult
  return calculatedResult.value
})

function calculate() {
  if (!canCalculate.value) return
  calculatedResult.value = calcFitnessLTV({
    clubsCount: clubsNum.value,
    avgClientsPerClubMonthly: membersNum.value,
    avgMembershipPrice: priceNum.value,
    freq: freqNum.value,
    baseRetentionRate: constants.baseRetentionRate,
    signalsRetentionBoost: constants.signalsRetentionBoost,
    periodTypeVal: periodType.value,
    systemMonthlyCost: systemMonthlyCost.value
  })
  hasCalculated.value = true
  activeTooltip.value = null
}
</script>

<style scoped>
.fitltv-calc-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #fff;
}

.fitltv-calc-container {
  margin: 0 0 20px;
  padding: 24px;
  background: #1e1e1e;
  border: 1px solid #2b2b2b;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,.25);
}
.fitltv-calc-container.fitltv-calc-content {
  margin-top: 0;
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/* Inputs */
.fitltv-calc-input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.fitltv-calc-input-group {
  flex: 1;
  position: relative;
  min-width: 210px;
}
.fitltv-calc-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font: 600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  color: #fff;
}
.fitltv-calc-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px; height: 18px;
  background: #666;
  border-radius: 50%;
  cursor: pointer;
  transition: all .2s;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
}
.fitltv-calc-info-icon.hover { background: #ccc }
.fitltv-calc-info-icon-table { border: none }
.fitltv-calc-input {
  width: 100%; height: 44px;
  padding: 0 14px;
  font: 500 15px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  background: #141414;
  border: 1px solid #333;
  border-radius: 8px;
  color: #fff;
  transition: border-color .25s;
  box-sizing: border-box;
}
.fitltv-calc-input:focus { border-color: #46f88e; outline: 0 }
.fitltv-calc-input.fitltv-calc-error { border-color: #ef4444 }
.fitltv-calc-input::placeholder { color: #888 }
.fitltv-calc-error-message {
  position: absolute; top: 100%; left: 0; margin-top: 4px;
  font-size: 12px; color: #ef4444;
}
.fitltv-calc-radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
  gap: 4px;
  font-size: 15px;
}

.fitltv-calc-btn {
  width: 100%; height: 44px; margin-top: 12px;
  font: 700 16px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  text-transform: uppercase; color: #fff; background: #2183f9;
  border: none; border-radius: 8px; cursor: pointer;
  transition: background .2s,transform .2s,color .2s
}
.fitltv-calc-btn:disabled { background: #555; color: #ccc; cursor: not-allowed; transform: none }
.fitltv-calc-btn:not(:disabled):hover { background: #46f88e; color: #000; transform: translateY(-2px) }

.fitltv-calc-header { margin: 0 0 20px 0; padding: 0 }
.fitltv-calc-title {
  margin: 0; padding: 16px 0;
  font: 600 18px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  text-align: center; color: #46f88e;
}
.fitltv-calc-title-mobile { display: none; }

.fitltv-calc-table-container { margin: 0 0 20px 0; overflow: hidden; border-radius: 8px; border: 1px solid #2b2b2b }
.fitltv-calc-table {
  width: 100%; border-collapse: separate; border-spacing: 0;
  background: #141414; table-layout: auto; margin: 0; padding: 0;
}
.fitltv-calc-th,.fitltv-calc-td,.fitltv-calc-metric-cell {
  border: 0;
  padding: 10px 16px;
  vertical-align: middle; line-height: 1.35;
}
.fitltv-calc-th {
  font: 600 14px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  color: #46f88e; background: #1a1a1a; text-align: left; white-space: nowrap;
}
.fitltv-calc-td { font: 400 14px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #fff; white-space: nowrap; }
.fitltv-calc-metric-cell {
  display: flex; align-items: center; justify-content: space-between; gap: 8px; white-space: nowrap;
}
.fitltv-calc-metric-text { cursor: pointer; transition: color .2s; user-select: none; flex: 1; }
.fitltv-calc-metric-text:hover, .fitltv-calc-metric-text.fitltv-calc-active { color: #46f88e }
.fitltv-calc-highlight { color: #46f88e; font-weight: 600 }
.fitltv-calc-growth-secondary { color: #888; font-weight: 400; font-size: .9em; }

.fitltv-calc-why-toggle {
  padding: 14px 16px;
  margin: 0; background: #1e1e1e;
  border: 1px solid #2b2b2b;
  border-radius: 8px; color: #fff;
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer; user-select: none;
  transition: background .2s ease, border-color .2s ease;
}
.fitltv-calc-why-toggle.open { border-bottom-left-radius: 0; border-bottom-right-radius: 0 }
.fitltv-calc-why-toggle:hover { background: #232323; border-color: #46f88e }
.fitltv-calc-why-text { font: 600 15px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif }
.fitltv-calc-why-icon-svg { width: 24px; height: 24px; color: #46f88e; transition: transform .2s ease,color .2s ease }
.fitltv-calc-why-toggle:hover .fitltv-calc-why-icon-svg { color: #2183f9 }
.fitltv-calc-why-toggle.open .fitltv-calc-why-icon-svg { transform: rotate(180deg) }

.fitltv-calc-signal-block { margin: 16px 0; padding: 16px; background: #332507; border: 1px solid #967623; border-radius: 8px }
.fitltv-calc-signal-title { margin: 0 0 12px; font: 600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #e4bb6a }
.fitltv-calc-factors-block { margin: 16px 0; padding: 16px; background: #21272c; border: 1px solid #414a58; border-radius: 8px }
.fitltv-calc-factors-title { margin: 0 0 12px; font: 600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #46f88e }
.fitltv-calc-payback-explanation { margin: 16px 0; padding: 16px; background: #182848; border: 1px solid #335577; border-radius: 8px }
.fitltv-calc-payback-title { margin: 0 0 12px; font: 600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #46cbfa }
.fitltv-calc-success-factors { margin: 16px 0; padding: 16px; background: #11331a; border: 1px solid #1e4a32; border-radius: 8px }
.fitltv-calc-success-title { margin: 0 0 12px; font: 600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #63f968 }
.fitltv-chip-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 10px }
.fitltv-chip { display: inline-flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; color: #fff; font: 500 14px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; border: 1px solid transparent }
.fitltv-chip-icon { width: 18px; height: 18px; opacity: .9; }
.fitltv-chip--amber { background: #3e2c0b; border-color: #967623 }
.fitltv-chip--slate { background: #262b34; border-color: #414a58 }
.fitltv-chip--blue { background: #263362; border-color: #335577 }
.fitltv-chip--green { background: #13341a; border-color: #1e4a32 }

/* CTA/Info/Warning */
.fitltv-calc-cta-block {
  margin: 16px 0; padding: 16px;
  background: #1e1e1e; border: 1px solid #46f88e;
  border-radius: 8px;
}
.fitltv-calc-cta-text { margin: 0 0 8px 0; font: 400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #fff }
.fitltv-calc-warning-block {
  margin: 16px 0; padding: 16px;
  background: #2a1f0f; border: 1px solid #4a3c1e; border-radius: 8px
}
.fitltv-calc-warning-text { margin: 0; font: 400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #e4bb6a }
.fitltv-calc-info-block {
  margin: 16px 0; padding: 16px;
  background: #141414; border: 1px solid #2b2b2b; border-radius: 8px;
}
.fitltv-calc-info-text { margin: 0 0 12px 0; font: 400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #ccc }
.fitltv-calc-info-text:last-child { margin-bottom: 0 }

.fitltv-calc-tooltip-popup {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,.8); display: flex; justify-content: center;
  align-items: center; z-index: 1000; cursor: pointer
}
.fitltv-calc-tooltip-content {
  max-width: 400px; padding: 20px; background: #2a2a2a;
  border: 1px solid #404040; border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,.4); cursor: default
}
.fitltv-calc-tooltip-title { margin: 0 0 12px 0; font: 600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #46f88e }
.fitltv-calc-formula {
  margin: 0 0 12px 0; padding: 8px 12px;
  background: #1a1a1a; border: 1px solid #333; border-radius: 6px;
  font: 500 14px/1.4 'SF Mono','Monaco','Inconsolata','Roboto Mono',monospace;
  color: #37ccfe; text-align: center; letter-spacing: .025em
}
.fitltv-calc-tooltip-desc { margin: 0; font: 400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #ccc }
.fitltv-calc-tooltip-anim-enter-active,.fitltv-calc-tooltip-anim-leave-active { transition: opacity .25s }
.fitltv-calc-tooltip-anim-enter-from,.fitltv-calc-tooltip-anim-leave-to { opacity: 0 }
.fitltv-calc-collapse-enter-active,.fitltv-calc-collapse-leave-active { transition: all .3s ease-in-out; overflow: hidden }
.fitltv-calc-collapse-enter-from,.fitltv-calc-collapse-leave-to { max-height: 0; opacity: 0 }
.fitltv-calc-collapse-enter-to,.fitltv-calc-collapse-leave-from { max-height: 2000px; opacity: 1 }

/* Mobile */
@media (max-width: 768px) {
  .fitltv-calc-container { padding: 16px; margin-bottom: 12px }
  .fitltv-calc-input-row { flex-direction: column; gap: 12px; margin-bottom: 12px }
  .fitltv-calc-btn { height: 48px; font-size: 16px; line-height: 48px; margin-top: 8px }
  .fitltv-calc-title-desktop { display: none; }
  .fitltv-calc-title-mobile { display: block; font-size: 16px }
  .fitltv-calc-title { padding: 12px 0 }
  .fitltv-calc-header { margin: 0 0 12px 0 }
  .fitltv-calc-table-container { margin-bottom: 12px; border-radius: 6px }
  .fitltv-calc-th,.fitltv-calc-td,.fitltv-calc-metric-cell { padding: 8px 10px; white-space: normal }
  .fitltv-calc-th:nth-child(1) { width: 50% }
  .fitltv-calc-th:nth-child(2),.fitltv-calc-th:nth-child(3) { width: 25% }
  .fitltv-calc-metric-cell { gap: 6px; align-items: flex-start }
  .fitltv-calc-info-icon { width: 16px; height: 16px; font-size: 10px; margin-top: 2px }
  .fitltv-calc-table tbody tr::after { left: 10px; right: 10px }
  .fitltv-calc-why-toggle { padding: 12px }
  .fitltv-calc-why-text { font-size: 14px }
}
</style>
