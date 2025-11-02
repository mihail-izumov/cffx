<template>
  <div class="fitltv-calc-wrapper">
    <!-- Ввод -->
    <div class="fitltv-calc-container">
      <div class="fitltv-calc-input-row">
        <div class="fitltv-calc-input-group">
          <label for="clubsInput" class="fitltv-calc-label">Число клубов:
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('clubsInput')"
                  @mouseenter="hoverIcon = 'clubsInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'clubsInput' }">i</span>
          </label>
          <input id="clubsInput" type="text"
                 :value="clubsStr" placeholder="например, 10"
                 @input="onClubsInput"
                 :class="['fitltv-calc-input', { 'fitltv-calc-error': clubsError }]" />
          <div v-if="clubsError" class="fitltv-calc-error-message">{{ clubsError }}</div>
        </div>
        <div class="fitltv-calc-input-group">
          <label for="membersInput" class="fitltv-calc-label">Клиентов на клуб (в мес):
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('membersInput')"
                  @mouseenter="hoverIcon = 'membersInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'membersInput' }">i</span>
          </label>
          <input id="membersInput" type="text"
                 :value="membersStr" placeholder="например, 600"
                 @input="onMembersInput"
                 :class="['fitltv-calc-input', { 'fitltv-calc-error': membersError }]" />
          <div v-if="membersError" class="fitltv-calc-error-message">{{ membersError }}</div>
        </div>
        <div class="fitltv-calc-input-group">
          <label for="priceInput" class="fitltv-calc-label">Абонемент (₽):
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('priceInput')"
                  @mouseenter="hoverIcon = 'priceInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'priceInput' }">i</span>
          </label>
          <input id="priceInput" type="text"
                 :value="priceStr" placeholder="например, 12000"
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
        <span class="fitltv-calc-title-desktop">Рост LTV с системой Сигналов</span>
        <span class="fitltv-calc-title-mobile">Эффект Сигналов</span>
      </h3>
    </div>

    <!-- Таблица -->
    <div class="fitltv-calc-table-container">
      <table class="fitltv-calc-table">
        <thead>
          <tr>
            <th class="fitltv-calc-th">Показатель</th>
            <th class="fitltv-calc-th">Без Сигнала</th>
            <th class="fitltv-calc-th">С Сигналами</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('retention')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'retention' }">Retention</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('retention')"
                    @mouseenter="hoverIcon = 'retention'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'retention' }">i</span>
            </td>
            <td class="fitltv-calc-td">{{ displayResult.retentionBase }} мес</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">
              {{ displayResult.retentionSignals }} мес <span class="fitltv-calc-growth-secondary">(+{{ displayResult.retentionBoost }}%)</span>
            </td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('ltv')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'ltv' }">LTV клиента</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('ltv')"
                    @mouseenter="hoverIcon = 'ltv'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'ltv' }">i</span>
            </td>
            <td class="fitltv-calc-td">₽{{ displayResult.ltvBase }}</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">
              ₽{{ displayResult.ltvWithSignals }} <span class="fitltv-calc-growth-secondary">(+₽{{ displayResult.ltvDiff }})</span>
            </td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalClients')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalClients' }">Доп. клиенты</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('additionalClients')"
                    @mouseenter="hoverIcon = 'additionalClients'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'additionalClients' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.additionalClients }} / мес</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('revenuePerMonth')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'revenuePerMonth' }">Доп. выручка / мес / клуб</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('revenuePerMonth')"
                    @mouseenter="hoverIcon = 'revenuePerMonth'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'revenuePerMonth' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.monthlyProfitPerClub }} / мес</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('revenuePerClubYear')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'revenuePerClubYear' }">Доп. выручка / клуб / год</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('revenuePerClubYear')"
                    @mouseenter="hoverIcon = 'revenuePerClubYear'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'revenuePerClubYear' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.additionalRevenueClub }} / год</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('revenueNetworkYear')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'revenueNetworkYear' }">Доп. выручка / сеть / год</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('revenueNetworkYear')"
                    @mouseenter="hoverIcon = 'revenueNetworkYear'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'revenueNetworkYear' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.additionalRevenueNetwork }} / год</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('signalsPerMonth')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'signalsPerMonth' }">Сигналы / мес / клуб</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('signalsPerMonth')"
                    @mouseenter="hoverIcon = 'signalsPerMonth'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'signalsPerMonth' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.signalsMonth }}</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('signalsForPayback')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'signalsForPayback' }">Сигналы для окупаемости</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('signalsForPayback')"
                    @mouseenter="hoverIcon = 'signalsForPayback'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'signalsForPayback' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.signalsForPayback }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ТРИГГЕР РАСКРЫТИЯ -->
    <div class="fitltv-calc-why-toggle"
         :class="{ open: whyOpen }"
         @click="toggleWhy">
      <span class="fitltv-calc-why-text">Почему все получится</span>
      <span class="fitltv-calc-why-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </span>
    </div>

    <!-- РАСКРЫВАЮЩИЙСЯ КОНТЕНТ -->
    <transition name="fitltv-calc-collapse">
      <div v-if="whyOpen" class="fitltv-calc-container fitltv-calc-content">
        <!-- Синие чипы (все 6) -->
        <div class="fitltv-calc-payback-explanation">
          <h4 class="fitltv-calc-payback-title">Все Сигналы после 2-го = чистая прибыль:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>600 × 6 = 3.600 гостей</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>2–3% = 72–108 Сигналов</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>+120 удержанных клиентов</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>+₽12.000 LTV на клиента</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>28 Сигналов = окупаемость</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Решение за 24 часа</span>
            </div>
          </div>
        </div>

        <!-- CTA / Info -->
        <div class="fitltv-calc-cta-block">
          <p class="fitltv-calc-cta-text"><strong>Главное:</strong> Окупаемость наступает сразу — каждый месяц приносит стабильный рост за счет дополнительного retention.</p>
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

    <!-- Тултипы -->
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
const membersStr = ref('600')
const priceStr = ref('12000')
const activeTooltip = ref(null)
const hoverIcon = ref(null)
const clubsError = ref('')
const membersError = ref('')
const priceError = ref('')
const calculatedResult = ref({})
const hasCalculated = ref(false)
const whyOpen = ref(false)

function validateClubs(v) { return v < 1 ? 'Минимум 1 клуб' : v > 99 ? 'Максимум 99 клубов' : '' }
function validateMembers(v) { return v < 50 ? 'Минимум 50 клиентов/мес' : v > 4000 ? 'Максимум 4000 клиентов/мес' : '' }
function validatePrice(v) { return v < 4000 ? 'Минимальная цена 4 000 ₽' : v > 80000 ? 'Максимальная цена 80 000 ₽' : '' }

function onClubsInput(e) { const n = Number(e.target.value.replace(/\D/g, '')); clubsStr.value = n ? n.toLocaleString('ru-RU') : ''; clubsError.value = n ? validateClubs(n) : ''; activeTooltip.value = null }
function onMembersInput(e) { const n = Number(e.target.value.replace(/\D/g, '')); membersStr.value = n ? n.toLocaleString('ru-RU') : ''; membersError.value = n ? validateMembers(n) : ''; activeTooltip.value = null }
function onPriceInput(e) { const n = Number(e.target.value.replace(/\D/g, '')); priceStr.value = n ? n.toLocaleString('ru-RU') : ''; priceError.value = n ? validatePrice(n) : ''; activeTooltip.value = null }

const clubsNum = computed(() => Number(clubsStr.value.replace(/\s/g, '')))
const membersNum = computed(() => Number(membersStr.value.replace(/\s/g, '')))
const priceNum = computed(() => Number(priceStr.value.replace(/\s/g, '')))

const canCalculate = computed(() => {
  const c = clubsNum.value, m = membersNum.value, p = priceNum.value
  return c >= 1 && c <= 99 && m >= 50 && m <= 4000 && p >= 4000 && p <= 80000 && !clubsError.value && !membersError.value && !priceError.value
})

function formatNumber(n) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n))
}

const retentionCurveBase = [1, 0.5, 0.25, 0, 0, 0, 1, 0.5, 0.25, 0, 0, 0]
const retentionCurveSignals = [1, 0.7, 0.49, 0.2, 0.1, 0, 1, 0.7, 0.49, 0.2, 0.1, 0]

function calcFitnessLTV({ clubs, members, price }) {
  const baseMonths = retentionCurveBase.reduce((a, b) => a + b, 0)
  const signalsMonths = retentionCurveSignals.reduce((a, b) => a + b, 0)

  const ltvBase = price * baseMonths + price * 0.1
  const ltvSignals = price * signalsMonths + price * 0.3
  const ltvDiff = ltvSignals - ltvBase

  const clientsBase = Math.round(members * retentionCurveBase[1])
  const clientsSignals = Math.round(members * retentionCurveSignals[1])
  const additionalClients = clientsSignals - clientsBase

  const monthlyLtvDiff = ltvDiff / 12
  const monthlyProfitPerClub = Math.round(additionalClients * monthlyLtvDiff)
  const additionalRevenueClub = monthlyProfitPerClub * 12
  const additionalRevenueNetwork = additionalRevenueClub * clubs

  const guestsPerMonth = members * 6
  const signalsMin = Math.round(guestsPerMonth * 0.02)
  const signalsMax = Math.round(guestsPerMonth * 0.03)

  const systemCostPerClub = 275000 / clubs
  const signalsForPayback = Math.round(systemCostPerClub / monthlyLtvDiff)

  return {
    retentionBase: baseMonths.toFixed(1),
    retentionSignals: signalsMonths.toFixed(1),
    retentionBoost: Math.round((signalsMonths - baseMonths) / baseMonths * 100),
    ltvBase: formatNumber(ltvBase),
    ltvWithSignals: formatNumber(ltvSignals),
    ltvDiff: formatNumber(ltvDiff),
    additionalClients: formatNumber(additionalClients),
    monthlyProfitPerClub: formatNumber(monthlyProfitPerClub),
    additionalRevenueClub: formatNumber(additionalRevenueClub),
    additionalRevenueNetwork: formatNumber(additionalRevenueNetwork),
    signalsMonth: `${formatNumber(signalsMin)}–${formatNumber(signalsMax)}`,
    signalsForPayback: `${formatNumber(signalsForPayback)} Сигналов`,
    curveBase: retentionCurveBase.map(v => (v * 100).toFixed(0) + '%').join(' → '),
    curveSignals: retentionCurveSignals.map(v => (v * 100).toFixed(0) + '%').join(' → ')
  }
}

const displayResult = computed(() => {
  if (!hasCalculated.value) return calcFitnessLTV({ clubs: 10, members: 600, price: 12000 })
  return calculatedResult.value
})

function calculate() {
  if (!canCalculate.value) return
  calculatedResult.value = calcFitnessLTV({ clubs: clubsNum.value, members: membersNum.value, price: priceNum.value })
  hasCalculated.value = true
  activeTooltip.value = null
}

const currentTooltip = computed(() => {
  const r = displayResult.value
  const price = priceNum.value || 12000
  const members = membersNum.value || 600

  const tooltips = {
    clubsInput: { title: 'Число клубов', description: 'Число клубов в сети. От 1 до 99.' },
    membersInput: { title: 'Клиентов на клуб', description: 'Среднее число активных клиентов в месяц. От 50 до 4000.' },
    priceInput: { title: 'Абонемент', description: 'Цена абонемента в месяц. От 4 000 до 80 000 ₽.' },
    retention: {
      title: 'Retention',
      description: 'Retention — это среднее количество месяцев, которое клиент платит за год.<br><br><b>Без Сигналов:</b> 1 → 50% → 25% → 0% → ... → <b>3.5 мес</b><br><b>С Сигналами:</b> 1 → 70% → 49% → 20% → 10% → ... → <b>4.3 мес</b><br><br>Кривая: <b>Без:</b> ' + r.curveBase + '<br><b>С:</b> ' + r.curveSignals
    },
    ltv: {
      title: 'LTV клиента',
      description: 'LTV — это общий доход с одного клиента за год.<br><br><b>Без:</b> ₽ ' + formatNumber(price) + ' × 3.5 мес + 0.1 × ₽ ' + formatNumber(price) + ' = <b>₽ ' + r.ltvBase + '</b><br><b>С:</b> ₽ ' + formatNumber(price) + ' × 4.3 мес + 0.3 × ₽ ' + formatNumber(price) + ' = <b>₽ ' + r.ltvWithSignals + '</b><br>ΔLTV = <b>₽ ' + r.ltvDiff + '</b>'
    },
    additionalClients: { title: 'Доп. клиенты', description: 'Доп. клиенты — это дополнительно удержанные клиенты в месяц.<br><br>600 × (70% – 50%) = <b>120 клиентов</b>' },
    revenuePerMonth: { title: 'Доп. выручка / мес / клуб', description: 'Доп. выручка / мес / клуб — это дополнительная выручка в месяц на клуб от удержания 120 клиентов.<br><br>120 × ₽ 1 000 = <b>₽ ' + r.monthlyProfitPerClub + ' / мес</b>' },
    revenuePerClubYear: { title: 'Доп. выручка / клуб / год', description: 'Доп. выручка / клуб / год — это дополнительная выручка за год на клуб от удержания 120 клиентов в месяц.<br><br>₽ ' + r.monthlyProfitPerClub + ' × 12 = <b>₽ ' + r.additionalRevenueClub + ' / год</b>' },
    revenueNetworkYear: { title: 'Доп. выручка / сеть / год', description: 'Доп. выручка / сеть / год — это дополнительная выручка за год на сеть из 10 клубов.<br><br>10 × ₽ ' + r.additionalRevenueClub + ' = <b>₽ ' + r.additionalRevenueNetwork + ' / год</b>' },
    signalsPerMonth: { title: 'Сигналы / мес / клуб', description: 'Сигналы / мес / клуб — это количество Сигналов в месяц на клуб.<br><br>3 600 гостей × 2–3% = <b>' + r.signalsMonth + '</b>' },
    signalsForPayback: { title: 'Сигналы для окупаемости', description: 'Сигналы для окупаемости — сколько Сигналов нужно обработать, чтобы окупить стоимость системы.<br><br>₽ 27 500 / ₽ 1 000 = <b>' + r.signalsForPayback + '</b>' }
  }

  return tooltips[activeTooltip.value] || { title: '', description: '' }
})

function showTooltip(id) { activeTooltip.value = activeTooltip.value === id ? null : id }
function closeTooltip() { activeTooltip.value = null }
function toggleWhy() { whyOpen.value = !whyOpen.value }
</script>

<style scoped>
/* [ВСЕ СТИЛИ ИЗ ПРЕДЫДУЩЕЙ ВЕРСИИ — БЕЗ ИЗМЕНЕНИЙ] */
.fitltv-calc-wrapper { width:100%; max-width:1200px; margin:0 auto; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fff }
.fitltv-calc-container { margin:0 0 20px; padding:24px; background:#1e1e1e; border:1px solid #2b2b2b; border-radius:12px }
.fitltv-calc-input-row { display:flex; gap:20px; margin-bottom:16px }
.fitltv-calc-input-group { flex:1; position:relative }
.fitltv-calc-label { display:flex; align-items:center; gap:8px; margin-bottom:6px; font:600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fff }
.fitltv-calc-info-icon { display:inline-flex; align-items:center; justify-content:center; width:18px; height:18px; background:#666; border-radius:50%; cursor:pointer; transition:all .2s; font-size:12px; font-weight:600; color:#fff }
.fitltv-calc-info-icon.hover { background:#999 }
.fitltv-calc-info-icon-table { background:none; color:#c5f946 }
.fitltv-calc-input { width:100%; height:44px; padding:0 14px; font:500 15px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:#141414; border:1px solid #333; border-radius:8px; color:#fff; box-sizing:border-box }
.fitltv-calc-input:focus { border-color:#c5f946 }
.fitltv-calc-input.fitltv-calc-error { border-color:#ef4444 }
.fitltv-calc-error-message { position:absolute; top:100%; left:0; margin-top:4px; font-size:12px; color:#ef4444 }
.fitltv-calc-btn { width:100%; height:44px; margin-top:12px; font:700 16px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; text-transform:uppercase; color:#fff; background:#347b6c; border:none; border-radius:8px; cursor:pointer }
.fitltv-calc-btn:disabled { background:#555; color:#ccc; cursor:not-allowed }
.fitltv-calc-btn:not(:disabled):hover { background:#c5f946; color:#000 }
.fitltv-calc-header { margin:0 0 20px; text-align:center }
.fitltv-calc-title { margin:0; font:600 18px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#c5f946 }
.fitltv-calc-title-mobile { display:none }
.fitltv-calc-table-container { margin-bottom:20px; border:1px solid #2b2b2b; border-radius:8px; overflow:hidden }
.fitltv-calc-table { width:100%; border-collapse:collapse; background:#141414 }
.fitltv-calc-th { padding:10px 16px; font:600 14px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#c5f946; background:#1a1a1a; text-align:left }
.fitltv-calc-td { padding:10px 16px; font:400 14px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fff }
.fitltv-calc-metric-cell { display:flex; align-items:center; gap:8px }
.fitltv-calc-metric-text { cursor:pointer; flex:1 }
.fitltv-calc-metric-text:hover, .fitltv-calc-metric-text.fitltv-calc-active { color:#c5f946 }
.fitltv-calc-highlight { color:#c5f946; font-weight:600 }
.fitltv-calc-growth-secondary { color:#888; font-size:.9em }
.fitltv-calc-tooltip-popup { position:fixed; inset:0; background:rgba(0,0,0,.8); display:flex; justify-content:center; align-items:center; z-index:1000; cursor:pointer }
.fitltv-calc-tooltip-content { max-width:420px; padding:20px; background:#2a2a2a; border:1px solid #404040; border-radius:12px }
.fitltv-calc-tooltip-title { margin:0 0 12px; font:600 16px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#c5f946 }
.fitltv-calc-formula { margin:0 0 12px; padding:8px 12px; background:#1a1a1a; border:1px solid #333; border-radius:6px; font:500 14px 'SF Mono',monospace; color:#22c55e }
.fitltv-calc-tooltip-desc { margin:0; font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#ccc }
.fitltv-calc-why-toggle { padding:14px 16px; background:#1e1e1e; border:1px solid #2b2b2b; border-radius:8px; display:flex; justify-content:space-between; align-items:center; cursor:pointer }
.fitltv-calc-why-toggle.open { border-bottom-left-radius:0; border-bottom-right-radius:0 }
.fitltv-calc-why-text { font:600 15px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif }
.fitltv-calc-why-icon svg { width:24px; height:24px; color:#9ca3af; transition:transform .2s }
.fitltv-calc-why-toggle.open .fitltv-calc-why-icon svg { transform:rotate(180deg) }
.fitltv-calc-content { border-top:none; border-top-left-radius:0; border-top-right-radius:0 }
.fitltv-calc-payback-explanation { margin:16px 0; padding:16px; background:#0f1a2a; border:1px solid #1e3a4a; border-radius:8px }
.fitltv-calc-payback-title { margin:0 0 12px; font:600 16px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#60a5fa }
.fitltv-chip-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:10px }
.fitltv-chip { display:flex; align-items:center; gap:8px; padding:10px 12px; background:#0e2138; border:1px solid #1e3a4a; border-radius:10px; color:#fff; font:500 14px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif }
.fitltv-chip-icon { width:18px; height:18px }
.fitltv-calc-cta-block, .fitltv-calc-warning-block, .fitltv-calc-info-block { margin:16px 0; padding:16px; border-radius:8px }
.fitltv-calc-cta-block { background:#1e1e1e; border:1px solid #c5f946 }
.fitltv-calc-warning-block { background:#2a1f0f; border:1px solid #4a3c1e }
.fitltv-calc-info-block { background:#141414; border:1px solid #2b2b2b }
.fitltv-calc-cta-text, .fitltv-calc-warning-text, .fitltv-calc-info-text { margin:0; font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fff }
.fitltv-calc-warning-text { color:#fbbf24 }
.fitltv-calc-info-text { color:#ccc; font-size:13px }
.fitltv-calc-collapse-enter-active, .fitltv-calc-collapse-leave-active { transition:max-height .3s ease, opacity .3s ease; overflow:hidden }
.fitltv-calc-collapse-enter-from, .fitltv-calc-collapse-leave-to { max-height:0; opacity:0 }
.fitltv-calc-collapse-enter-to, .fitltv-calc-collapse-leave-from { max-height:2000px; opacity:1 }
@media (max-width:768px){
  .fitltv-calc-input-row{flex-direction:column}
  .fitltv-calc-title-desktop{display:none}
  .fitltv-calc-title-mobile{display:block;font-size:16px}
}
</style>
