<script setup>
import { ref, computed } from 'vue'

// Фикс: Теперь systemMonthlyCost определён!
const systemMonthlyCost = ref(27500);

// Примерные retention curve для фитнеса SM Stretching (настрой под твои данные!)
const retentionCurveBase = [1, 0.5, 0.25, 0.12, 0.08, 0.04];
const retentionCurveSignals = [1, 0.66, 0.39, 0.22, 0.15, 0.08];

const clubsStr = ref('10');
const membersStr = ref('600');
const priceStr = ref('12000');
const activeTooltip = ref(null);
const hoverIcon = ref(null);
const clubsError = ref('');
const membersError = ref('');
const priceError = ref('');
const calculatedResult = ref({});
const hasCalculated = ref(false);
const whyOpen = ref(false);

function validateClubs(v) {
  if (v < 1) return 'Минимум 1 клуб';
  if (v > 25) return 'Максимум 25 клубов';
  return '';
}
function validateMembers(v) {
  if (v < 50) return 'Минимум 50 клиентов/мес';
  if (v > 4000) return 'Максимум 4000 клиентов/мес';
  return '';
}
function validatePrice(v) {
  if (v < 4000) return 'Минимальная цена абонемента 4 000 ₽';
  if (v > 80000) return 'Максимальная цена абонемента 80 000 ₽';
  return '';
}

function onClubsInput(e) {
  const digits = e.target.value.replace(/\D/g, '');
  const num = Number(digits);
  clubsStr.value = digits ? num.toLocaleString('ru-RU') : '';
  clubsError.value = digits ? validateClubs(num) : '';
  activeTooltip.value = null;
}
function onMembersInput(e) {
  const digits = e.target.value.replace(/\D/g, '');
  const num = Number(digits);
  membersStr.value = digits ? num.toLocaleString('ru-RU') : '';
  membersError.value = digits ? validateMembers(num) : '';
  activeTooltip.value = null;
}
function onPriceInput(e) {
  const digits = e.target.value.replace(/\D/g, '');
  const num = Number(digits);
  priceStr.value = digits ? num.toLocaleString('ru-RU') : '';
  priceError.value = digits ? validatePrice(num) : '';
  activeTooltip.value = null;
}

const clubsNum = computed(() => Number(clubsStr.value.replace(/\s|,/g, '')));
const membersNum = computed(() => Number(membersStr.value.replace(/\s|,/g, '')));
const priceNum = computed(() => Number(priceStr.value.replace(/\s|,/g, '')));
const canCalculate = computed(() =>
  clubsNum.value >= 1 && clubsNum.value <= 25 &&
  membersNum.value >= 50 && membersNum.value <= 4000 &&
  priceNum.value >= 4000 && priceNum.value <= 80000 &&
  !clubsError.value && !membersError.value && !priceError.value
);
function formatNumber(n) {
  return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)).replace(/\s/g, '.');
}
function averageRetention(curve) {
  let sum = 0;
  for (let i = 0; i < curve.length; i++) sum += curve[i];
  return sum;
}
function calcFitnessLTV({ clubs, members, price }) {
  const baseMonths = averageRetention(retentionCurveBase);
  const signalsMonths = averageRetention(retentionCurveSignals);

  const ltvBase = price * baseMonths;
  const ltvSignals = price * signalsMonths;
  const ltvDiff = ltvSignals - ltvBase;

  const clubBase = Math.round(members * retentionCurveBase[1]);
  const clubSignals = Math.round(members * retentionCurveSignals[1]);
  const additionalRevenueClub = Math.round(ltvDiff * (clubSignals - clubBase));
  const additionalRevenueNetwork = additionalRevenueClub * clubs;

  return {
    clientsBase: formatNumber(clubBase),
    clientsWithSignals: formatNumber(clubSignals),
    retentionBoostPercent: Math.round((clubSignals - clubBase) / clubBase * 100),
    ltvBase: formatNumber(ltvBase),
    ltvWithSignals: formatNumber(ltvSignals),
    ltvDiff: formatNumber(ltvDiff),
    additionalRevenueClub: formatNumber(additionalRevenueClub),
    additionalRevenueNetwork: formatNumber(additionalRevenueNetwork),
    paybackSignals: ltvDiff > 0 ? Math.max(1, Math.round(systemMonthlyCost.value / ltvDiff)) + " сигналов" : "—",
    ltvBaseMonths: baseMonths,
    ltvSignalsMonths: signalsMonths,
    systemMonthlyCostDisplay: formatNumber(systemMonthlyCost.value),
    retentionBoostDisplay: Math.round((signalsMonths - baseMonths) / baseMonths * 100)
  };
}
const displayResult = computed(() => {
  if (!hasCalculated.value) {
    return calcFitnessLTV({ clubs: 10, members: 600, price: 12000 });
  }
  return calculatedResult.value;
});
function calculate() {
  if (!canCalculate.value) return;
  calculatedResult.value = calcFitnessLTV({
    clubs: clubsNum.value,
    members: membersNum.value,
    price: priceNum.value
  });
  hasCalculated.value = true;
  activeTooltip.value = null;
}
const currentTooltip = computed(() => {
  if (!activeTooltip.value) return { title: '', description: '', formula: '' };
  const clubs = clubsNum.value || 10;
  const members = membersNum.value || 600;
  const price = priceNum.value || 12000;
  const ltvBaseMonths = displayResult.value.ltvBaseMonths;
  const ltvSignalsMonths = displayResult.value.ltvSignalsMonths;
  const ltvBase = price * ltvBaseMonths;
  const ltvSignals = price * ltvSignalsMonths;
  const ltvDiff = ltvSignals - ltvBase;
  const clubBase = Math.round(members * retentionCurveBase[1]);
  const clubSignals = Math.round(members * retentionCurveSignals[1]);
  const additionalRevenueClub = ltvDiff * (clubSignals - clubBase);
  const additionalRevenueNetwork = additionalRevenueClub * clubs;
  switch (activeTooltip.value) {
    case 'clientsRetained':
      return {
        title: 'Удержанные клиенты через 1 месяц',
        formula: `${members} × ${retentionCurveBase[1] * 100}% = <b>${formatNumber(clubBase)}</b><br>`
          + `${members} × ${retentionCurveSignals[1] * 100}% = <b>${formatNumber(clubSignals)}</b>`,
        description: `Разница: <b>+${formatNumber(clubSignals - clubBase)}</b> удержанных (на 1 клуб через месяц)`
      };
    case 'ltv':
      return {
        title: `LTV клиента за жизненный цикл`,
        formula:
          `${formatNumber(price)} × ${ltvBaseMonths.toFixed(2)} мес ≈ <b>₽${formatNumber(ltvBase)}</b><br>` +
          `${formatNumber(price)} × ${ltvSignalsMonths.toFixed(2)} мес ≈ <b>₽${formatNumber(ltvSignals)}</b>`,
        description: `Δ LTV на одного клиента за цикл: <b>+₽${formatNumber(ltvDiff)}</b>`
      };
    case 'additionalRevenueClub':
      return {
        title: 'Доп. выручка на клуб',
        formula: `Δ LTV × доп. удержанные =<br>₽${formatNumber(ltvDiff)} × ${formatNumber(clubSignals-clubBase)} = <b>₽${formatNumber(additionalRevenueClub)}</b>`,
        description: 'Доп. выручка за счет удержания в 1 клубе за жизненный цикл.'
      };
    case 'additionalRevenueNetwork':
      return {
        title: 'Доп. выручка на сеть',
        formula: `${clubs} клуба × <b>₽${formatNumber(additionalRevenueClub)}</b> = <b>₽${formatNumber(additionalRevenueNetwork)}</b>`,
        description: 'Доп. выручка по всей сети за жизненный цикл удержания.'
      };
    case 'paybackSignals':
      return {
        title: 'Окупаемость сигнала',
        formula: `Стоимость / ΔLTV = ${displayResult.value.systemMonthlyCostDisplay} / ${formatNumber(ltvDiff)} ≈ <b>${displayResult.value.paybackSignals}</b>`,
        description: 'Примерное число сигналов для окупаемости системы.'
      };
    default:
      return { title: '', description: '', formula: '' };
  }
});
function showTooltip(id) { activeTooltip.value = activeTooltip.value === id ? null : id; }
function closeTooltip() { activeTooltip.value = null; }
function toggleWhy() { whyOpen.value = !whyOpen.value; }
</script>

<template>
  <div class="fitltv-calc-wrapper">
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

    <div class="fitltv-calc-header">
      <h3 class="fitltv-calc-title">
        <span class="fitltv-calc-title-desktop">Рост LTV с системой сигналов</span>
        <span class="fitltv-calc-title-mobile">Эффект сигналов: фитнес</span>
      </h3>
    </div>
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
                    :class="{ 'fitltv-calc-active': activeTooltip === 'clientsRetained' }">Удержанные клиенты через 1 мес</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('clientsRetained')"
                    @mouseenter="hoverIcon = 'clientsRetained'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'clientsRetained' }">i</span>
            </td>
            <td class="fitltv-calc-td">{{ displayResult.clientsBase }}</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">
              {{ displayResult.clientsWithSignals }} <span class="fitltv-calc-growth-secondary">(+{{ displayResult.retentionBoostPercent }}%)</span>
            </td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('ltv')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'ltv' }">LTV клиента (жизненный цикл)</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('ltv')"
                    @mouseenter="hoverIcon = 'ltv'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'ltv' }">i</span>
            </td>
            <td class="fitltv-calc-td">₽{{ displayResult.ltvBase }}</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">
              ₽{{ displayResult.ltvWithSignals }}<span class="fitltv-calc-growth-secondary"> (+₽{{ displayResult.ltvDiff }})</span>
            </td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalRevenueClub')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenueClub' }">Доп. выручка на клуб</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('additionalRevenueClub')"
                    @mouseenter="hoverIcon = 'additionalRevenueClub'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'additionalRevenueClub' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">
              ₽{{ displayResult.additionalRevenueClub }}
            </td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalRevenueNetwork')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenueNetwork' }">Доп. выручка на сеть</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('additionalRevenueNetwork')"
                    @mouseenter="hoverIcon = 'additionalRevenueNetwork'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'additionalRevenueNetwork' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">
              ₽{{ displayResult.additionalRevenueNetwork }}
            </td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('paybackSignals')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'paybackSignals' }">Окупаемость сигнала</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('paybackSignals')"
                    @mouseenter="hoverIcon = 'paybackSignals'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'paybackSignals' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">
              {{ displayResult.paybackSignals }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

<style scoped>
.fitltv-calc-wrapper{width:100%;max-width:1200px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff}

.fitltv-calc-container{margin:0 0 20px;padding:24px;background:#1e1e1e;border:1px solid #2b2b2b;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,.25)}
.fitltv-calc-container.fitltv-calc-content{margin-top:0;border-top:none;border-top-left-radius:0;border-top-right-radius:0}

.fitltv-calc-input-row{display:flex;gap:20px;margin-bottom:16px}
.fitltv-calc-input-group{flex:1;position:relative}
.fitltv-calc-label{display:flex;align-items:center;gap:8px;margin-bottom:6px;font:600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff}
.fitltv-calc-info-icon{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:#666;border-radius:50%;cursor:pointer;transition:all .2s;font-size:12px;font-weight:600;color:#fff;flex-shrink:0}
.fitltv-calc-info-icon.hover{background:#999}
.fitltv-calc-info-icon-table{border:none}
.fitltv-calc-input{width:100%;height:44px;padding:0 14px;font:500 15px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#141414;border:1px solid #333;border-radius:8px;color:#fff;transition:border-color .25s;box-sizing:border-box}
.fitltv-calc-input:focus{border-color:#c5f946;outline:0}
.fitltv-calc-input.fitltv-calc-error{border-color:#ef4444}
.fitltv-calc-input::placeholder{color:#888}
.fitltv-calc-error-message{position:absolute;top:100%;left:0;margin-top:4px;font-size:12px;color:#ef4444}

.fitltv-calc-btn{width:100%;height:44px;margin-top:12px;font:700 16px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-transform:uppercase;color:#fff;background:#347b6c;border:none;border-radius:8px;cursor:pointer;transition:background .2s,transform .2s,color .2s}
.fitltv-calc-btn:disabled{background:#555;color:#ccc;cursor:not-allowed;transform:none}
.fitltv-calc-btn:not(:disabled):hover{background:#c5f946;color:#000;transform:translateY(-2px)}

.fitltv-calc-header{margin:0 0 20px 0;padding:0}
.fitltv-calc-title{margin:0;padding:16px 0;font:600 18px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-align:center;color:#c5f946}
.fitltv-calc-title-mobile{display:none}

.fitltv-calc-table-container{margin:0 0 20px 0;overflow:hidden;border-radius:8px;border:1px solid #2b2b2b}
.fitltv-calc-table{width:100%;border-collapse:separate;border-spacing:0;background:#141414;table-layout:auto;margin:0;padding:0}
.fitltv-calc-table tr{position:relative}
.fitltv-calc-table tbody tr::after{content:"";position:absolute;left:16px;right:16px;bottom:0;height:1px;background:#2b2b2b;transform:translateZ(0)}
.fitltv-calc-table tbody tr:last-child::after{display:none}

.fitltv-calc-th, .fitltv-calc-td, .fitltv-calc-metric-cell{border:0;padding:10px 16px;vertical-align:middle;line-height:1.35}
.fitltv-calc-th{font:600 14px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#c5f946;background:#1a1a1a;text-align:left;white-space:nowrap}
.fitltv-calc-th:nth-child(1){width:45%}
.fitltv-calc-th:nth-child(2){width:27.5%}
.fitltv-calc-th:nth-child(3){width:27.5%}
.fitltv-calc-td{font:400 14px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;white-space:nowrap}
.fitltv-calc-metric-cell{display:flex;align-items:center;justify-content:space-between;gap:8px;white-space:nowrap}
.fitltv-calc-metric-text{cursor:pointer;transition:color .2s;user-select:none;flex:1}
.fitltv-calc-metric-text:hover{color:rgba(197,249,70,.8)}
.fitltv-calc-metric-text.fitltv-calc-active{color:#c5f946}
.fitltv-calc-highlight{color:#c5f946;font-weight:600}
.fitltv-calc-growth-secondary{color:#888;font-weight:400;font-size:.9em}

/* Tooltip & animations */
.fitltv-calc-tooltip-popup{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);display:flex;justify-content:center;align-items:center;z-index:1000;cursor:pointer}
.fitltv-calc-tooltip-content{max-width:400px;padding:20px;background:#2a2a2a;border:1px solid #404040;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.4);cursor:default}
.fitltv-calc-tooltip-title{margin:0 0 12px 0;font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#c5f946}
.fitltv-calc-formula{margin:0 0 12px 0;padding:8px 12px;background:#1a1a1a;border:1px solid #333;border-radius:6px;font:500 14px/1.4 'SF Mono','Monaco','Inconsolata','Roboto Mono',monospace;color:#22c55e;text-align:center;letter-spacing:.025em}
.fitltv-calc-tooltip-desc{margin:0;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ccc}
.fitltv-calc-tooltip-anim-enter-active,.fitltv-calc-tooltip-anim-leave-active{transition:opacity .25s}
.fitltv-calc-tooltip-anim-enter-from,.fitltv-calc-tooltip-anim-leave-to{opacity:0}
.fitltv-calc-collapse-enter-active,.fitltv-calc-collapse-leave-active{transition:all .3s ease-in-out;overflow:hidden}
.fitltv-calc-collapse-enter-from,.fitltv-calc-collapse-leave-to{max-height:0;opacity:0}
.fitltv-calc-collapse-enter-to,.fitltv-calc-collapse-leave-from{max-height:2000px;opacity:1}

/* Responsive */
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
}
@media (min-width:769px){
  .fitltv-calc-title-mobile{display:none}
  .fitltv-calc-title-desktop{display:block}
}
</style>
