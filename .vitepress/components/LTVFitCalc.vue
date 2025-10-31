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
        <div class="fitltv-calc-input-group">
          <label for="freqInput" class="fitltv-calc-label">Частота посещений/мес:
            <span class="fitltv-calc-info-icon"
                  @click="showTooltip('freqInput')"
                  @mouseenter="hoverIcon = 'freqInput'"
                  @mouseleave="hoverIcon = null"
                  :class="{ hover: hoverIcon === 'freqInput' }">i</span>
          </label>
          <input id="freqInput" type="text"
            :value="freqStr" placeholder="например, 6-8"
            @input="onFreqInput"
            :class="['fitltv-calc-input', { 'fitltv-calc-error': freqError }]" />
          <div v-if="freqError" class="fitltv-calc-error-message">{{ freqError }}</div>
        </div>
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
            <td class="fitltv-calc-td fitltv-calc-highlight">
              {{ displayResult.clientsWithSignals }} <span class="fitltv-calc-growth-secondary">(+{{ displayResult.retentionBoostPercent }}%)</span>
            </td>
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
            <td class="fitltv-calc-td fitltv-calc-highlight">
              {{ displayResult.frequencyWith }} <span class="fitltv-calc-growth-secondary">(+{{ displayResult.frequencyBoostPercent }}%)</span>
            </td>
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
            <td class="fitltv-calc-td fitltv-calc-highlight">
              ₽{{ displayResult.ltvWithSignals }}<span class="fitltv-calc-growth-secondary"> (+₽{{ displayResult.ltvDiff }})</span>
            </td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalRevenueClub')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenueClub' }">Доп. выручка на клуб/мес</span>
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
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenueNetwork' }">Доп. выручка на сеть/мес</span>
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

const clubsStr = ref('10');
const membersStr = ref('600');
const priceStr = ref('12000');
const freqStr = ref('6');
const periodType = ref('month');
const activeTooltip = ref(null);
const hoverIcon = ref(null);
const clubsError = ref('');
const membersError = ref('');
const priceError = ref('');
const freqError = ref('');
const calculatedResult = ref({});
const hasCalculated = ref(false);
const whyOpen = ref(false);
const systemMonthlyCost = ref(27500);

const constants = {
  baseRetentionRate: 0.62,
  signalsRetentionRate: 0.74,
  freqBase: 6,
  freqSignals: 8,
  periodMonths: { month: 10, year: 12 }
};

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
function validateFreq(v) {
  if (v < 2) return 'Минимум 2 посещения/мес';
  if (v > 30) return 'Максимум 30 посещений/мес';
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
function onFreqInput(e) {
  const digits = e.target.value.replace(/\D/g, '');
  const num = Number(digits);
  freqStr.value = digits ? num.toLocaleString('ru-RU') : '';
  freqError.value = digits ? validateFreq(num) : '';
  activeTooltip.value = null;
}

const clubsNum = computed(() => Number(clubsStr.value.replace(/\s|,/g, '')));
const membersNum = computed(() => Number(membersStr.value.replace(/\s|,/g, '')));
const priceNum = computed(() => Number(priceStr.value.replace(/\s|,/g, '')));
const freqNum = computed(() => Number(freqStr.value.replace(/\s|,/g, '')));
const systemMonthlyCostDisplay = computed(() => formatNumber(systemMonthlyCost.value));
const retentionBoostDisplay = computed(() => Math.round((constants.signalsRetentionRate - constants.baseRetentionRate) * 100));
const canCalculate = computed(() =>
  clubsNum.value >= 1 && clubsNum.value <= 25 &&
  membersNum.value >= 50 && membersNum.value <= 4000 &&
  priceNum.value >= 4000 && priceNum.value <= 80000 &&
  freqNum.value >= 2 && freqNum.value <= 30 &&
  !clubsError.value && !membersError.value && !priceError.value && !freqError.value
);

function formatNumber(n) {
  return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)).replace(/\s/g, '.');
}

function calcFitnessLTV({ clubs, members, price, freq, periodType }) {
  const months = constants.periodMonths[periodType];
  const clientsBase = Math.round(members * constants.baseRetentionRate * clubs);
  const clientsSignals = Math.round(members * constants.signalsRetentionRate * clubs);

  const retentionBoost = Math.round(((clientsSignals - clientsBase) / clientsBase) * 100);

  const freqBase = constants.freqBase;
  const freqSignals = constants.freqSignals;

  const ltvBase = price * freqBase * months;
  const ltvSignals = price * freqSignals * months;
  const ltvDiff = ltvSignals - ltvBase;

  const clientsBaseClub = Math.round(members * constants.baseRetentionRate);
  const clientsSignalsClub = Math.round(members * constants.signalsRetentionRate);
  const additionalRevenueClub = (ltvSignals - ltvBase) * (clientsSignalsClub - clientsBaseClub);
  const additionalRevenueNetwork = additionalRevenueClub * clubs;
  const paybackSignals = "1–2 сигнала";

  return {
    clientsBase: formatNumber(clientsBase),
    clientsWithSignals: formatNumber(clientsSignals),
    retentionBoostPercent: retentionBoost,
    frequencyBase: freqBase + " раз/мес",
    frequencyWith: freqSignals + " раз/мес",
    frequencyBoostPercent: Math.round(((freqSignals - freqBase) / freqBase) * 100),
    ltvBase: formatNumber(ltvBase),
    ltvWithSignals: formatNumber(ltvSignals),
    ltvDiff: formatNumber(ltvDiff),
    additionalRevenueClub: formatNumber(additionalRevenueClub),
    additionalRevenueNetwork: formatNumber(additionalRevenueNetwork),
    paybackSignals
  };
}

const displayResult = computed(() => {
  if (!hasCalculated.value) {
    return calcFitnessLTV({ clubs: 10, members: 600, price: 12000, freq: 6, periodType: 'month' });
  }
  return calculatedResult.value;
});

function calculate() {
  if (!canCalculate.value) return;
  calculatedResult.value = calcFitnessLTV({
    clubs: clubsNum.value,
    members: membersNum.value,
    price: priceNum.value,
    freq: freqNum.value,
    periodType: periodType.value
  });
  hasCalculated.value = true;
  activeTooltip.value = null;
}

function showTooltip(id) { activeTooltip.value = activeTooltip.value === id ? null : id; }
function closeTooltip() { activeTooltip.value = null; }
function toggleWhy() { whyOpen.value = !whyOpen.value; }

const currentTooltip = computed(() => {
  if (!activeTooltip.value) return { title: '', description: '', formula: '' };
  const months = constants.periodMonths[periodType.value];
  const clubs = clubsNum.value || 10;
  const members = membersNum.value || 600;
  const price = priceNum.value || 12000;
  const freqBase = constants.freqBase;
  const freqSignals = constants.freqSignals;
  const clientsBaseClub = Math.round(members * constants.baseRetentionRate);
  const clientsSignalsClub = Math.round(members * constants.signalsRetentionRate);
  const ltvBase = price  * months;
  const ltvSignals = price * months;
  const ltvDiff = ltvSignals - ltvBase;
  const additionalRevenueClub = (ltvSignals - ltvBase) * (clientsSignalsClub - clientsBaseClub);
  const additionalRevenueNetwork = additionalRevenueClub * clubs;
  switch (activeTooltip.value) {
    case 'clientsRetained':
      return {
        title: 'Удержанные клиенты',
        formula: members + ' × ' + formatNumber(constants.baseRetentionRate*100) + '% = <b>' + formatNumber(clientsBaseClub) + '</b><br>' +
          members + ' × ' + formatNumber(constants.signalsRetentionRate*100) + '% = <b>' + formatNumber(clientsSignalsClub) + '</b>',
        description: 'Разница: <b>+' + formatNumber(clientsSignalsClub - clientsBaseClub) + '</b> удержанных (на 1 клуб).'
      };
    case 'frequency':
      return {
        title: 'Частота посещений',
        formula: `Без сигналов: <b>${freqBase} раз/мес</b><br>С сигналами: <b>${freqSignals} раз/мес</b>`,
        description: 'Реальный рост частоты после обработки негатива и диалога.'
      };
    case 'ltv':
  return {
    title: `LTV клиента (${months} мес)`,
    formula:
      `${formatNumber(price)} × ${freqBase} × ${months} = <b>₽${formatNumber(ltvBase)}</b><br>` +
      `${formatNumber(price)} × ${freqSignals} × ${months} = <b>₽${formatNumber(ltvSignals)}</b>`,
    description: `Δ LTV на одного клиента за период: <b>+₽${formatNumber(ltvDiff)}</b>`
  };
    case 'additionalRevenueClub':
      return {
        title: 'Доп. выручка на клуб/мес',
        formula: `Δ LTV × доп. удержанные = <br>₽${formatNumber(ltvDiff)} × ${formatNumber(clientsSignalsClub - clientsBaseClub)} = <b>₽${formatNumber(additionalRevenueClub)}</b>`,
        description: 'Доп. выручка за счёт доп. retention — по 1 клубу за месяц.'
      };
    case 'additionalRevenueNetwork':
      return {
        title: 'Доп. выручка на сеть/мес',
        formula: `${clubs} клуба × <b>₽${formatNumber(additionalRevenueClub)}</b> = <b>₽${formatNumber(additionalRevenueNetwork)}</b>`,
        description: 'Доп. выручка за весь месяц на всю сеть.'
      };
    case 'paybackSignals':
      return {
        title: 'Окупаемость сигнала',
        formula: 'Система окупается после возврата 1–2 клиентов<br>1 сигнал = возврат клиента, средний чек = LTV',
        description: 'После 1–2 сигналов — дальше только чистая прибыль, модель рассчитана по фактическим loss cases.'
      };
    default:
      return { title: '', description: '', formula: '' };
  }
});
</script>

<style scoped>
.fitltv-calc-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #fff;
}
.fitltv-calc-container {margin:0 0 20px;padding:24px;background:#141414;border:1px solid #21272c;border-radius:16px;}
.fitltv-calc-container.fitltv-calc-content {margin-top:0;border:none;border-top-left-radius:0;border-top-right-radius:0;}

.fitltv-calc-input-row {display:flex;gap:16px;margin-bottom:16px;}
.fitltv-calc-input-group {flex:1;position:relative;}
.fitltv-calc-label {display:flex;align-items:center;gap:8px;margin-bottom:6px;font:600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.fitltv-calc-info-icon {display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:#222;border-radius:50%;cursor:pointer;transition:.2s;font-size:12px;font-weight:600;}
.fitltv-calc-info-icon.hover {background:#4dff71}
.fitltv-calc-input {width:100%;height:44px;padding:0 14px;font:500 15px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#191c1b;border:1px solid #333;border-radius:8px;color:#fff;transition:border-color .25s;box-sizing:border-box;}
.fitltv-calc-input:focus{border-color:#37ffac;}
.fitltv-calc-input.fitltv-calc-error{border-color:#ef4444;}
.fitltv-calc-input::placeholder {color:#444;}
.fitltv-calc-error-message { margin-top:3px;font-size:12px;color:#ef4444; }

.fitltv-calc-radio-group {display:flex;flex-direction:column;align-items:flex-start;margin-left:8px;gap:4px;font-size:15px;}

.fitltv-calc-btn {width:100%;height:44px;margin-top:12px;font:700 16px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-transform:uppercase;color:#fff;background:#1f7aff;border:none;border-radius:10px;cursor:pointer;transition:.2s;}
.fitltv-calc-btn:disabled {background:#333;color:#888;cursor:not-allowed;transform:none;}
.fitltv-calc-btn:not(:disabled):hover {background:#4dff71;color:#000;}

.fitltv-calc-header {margin:0 0 20px 0;padding:0;}
.fitltv-calc-title {margin:0;padding:16px 0;font:600 20px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-align:center;color:#4dff71;text-shadow:0 2px 8px #183f41;}
.fitltv-calc-title-mobile {display:none;}

.fitltv-calc-table-container {margin:0 0 20px 0;overflow:hidden;border-radius:12px;border:1px solid #232c25;}
.fitltv-calc-table {width:100%;border-collapse:separate;border-spacing:0;background:#191f22;}
.fitltv-calc-th,.fitltv-calc-td,.fitltv-calc-metric-cell {border:0;padding:11px 16px;vertical-align:middle;}
.fitltv-calc-th {font:600 15px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#4dff71;background:#181e1a;}
.fitltv-calc-td {font:400 15px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;}
.fitltv-calc-metric-cell {display:flex;align-items:center;justify-content:space-between;gap:8px;}
.fitltv-calc-metric-text{cursor:pointer;transition:color .2s;user-select:none;flex:1;}
.fitltv-calc-metric-text:hover,.fitltv-calc-metric-text.fitltv-calc-active{color:#4dff71;}
.fitltv-calc-highlight{color:#4dff71;font-weight:600}
.fitltv-calc-growth-secondary{color:#aaffb8;font-weight:400;font-size:.92em;}

.fitltv-calc-why-toggle {padding:13px 17px;margin:0;background:#232323;border:1px solid #232c25;border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;transition:.2s;}
.fitltv-calc-why-toggle.open {border-bottom-left-radius:0;border-bottom-right-radius:0;}
.fitltv-calc-why-toggle:hover {background:#222d27;border-color:#4dff71;}
.fitltv-calc-why-text {font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.fitltv-calc-why-icon-svg{width:24px;height:24px;color:#4dff71;transition:transform .2s;}
.fitltv-calc-why-toggle.open .fitltv-calc-why-icon-svg{transform:rotate(180deg)}

.fitltv-calc-signal-block,.fitltv-calc-factors-block,.fitltv-calc-payback-explanation,
.fitltv-calc-success-factors {margin:16px 0;padding:16px 12px;border-radius:12px;}
.fitltv-calc-signal-block{background:#2c2511;border:1px solid #ba9700;}
.fitltv-calc-signal-title{font:600 15px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ffe385;margin-bottom:10px;}
.fitltv-calc-factors-block{background:#11171a;border:1px solid #3c4647;}
.fitltv-calc-factors-title{font:600 15px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#61ffd9;margin-bottom:10px;}
.fitltv-calc-payback-explanation{background:#1d2b3d;border:1px solid #2566ad;}
.fitltv-calc-payback-title{font:600 15px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#67c3ff;margin-bottom:10px;}
.fitltv-calc-success-factors{background:#173116;border:1px solid #4adf6a;}
.fitltv-calc-success-title{font:600 15px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#77fa92;margin-bottom:10px;}
.fitltv-chip-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;}
.fitltv-chip{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:8px;color:#fff;font:500 14px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;border:1px solid transparent}
.fitltv-chip-icon{width:18px;height:18px;opacity:.82;}
.fitltv-chip--amber{background:#32270a;border-color:#ba9700;}
.fitltv-chip--slate{background:#232326;border-color:#2c3554;}
.fitltv-chip--blue{background:#102b40;border-color:#2566ad;}
.fitltv-chip--green{background:#152918;border-color:#4adf6a;}

.fitltv-calc-cta-block{margin:16px 0;padding:16px;background:#192f20;border:1px solid #67ffb7;border-radius:8px;}
.fitltv-calc-cta-text{margin:0 0 8px 0;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;}

.fitltv-calc-warning-block{margin:14px 0;padding:13px;background:#372400;border:1px solid #d8c066;border-radius:8px;}
.fitltv-calc-warning-text{margin:0;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ffe385;}
.fitltv-calc-info-block{margin:14px 0;padding:13px;background:#141414;border:1px solid #2b2b2b;border-radius:8px;}
.fitltv-calc-info-text{margin:0 0 12px 0;font:400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#b0b5b6;}
.fitltv-calc-info-text:last-child{margin-bottom:0;}

.fitltv-calc-tooltip-popup {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,.8); display: flex; justify-content: center;
  align-items: center; z-index: 1000; cursor: pointer
}
.fitltv-calc-tooltip-content {
  max-width: 390px; padding: 20px; background: #242628;
  border: 1px solid #308167; border-radius: 13px;
  box-shadow: 0 8px 24px rgba(0,0,0,.4); cursor: default
}
.fitltv-calc-tooltip-title { margin: 0 0 12px 0; font: 600 15px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: #67fff7 }
.fitltv-calc-formula {margin:0 0 12px 0;padding:8px 12px;background:#1a1a1a;border:1px solid #333;border-radius:6px;font:500 14px/1.4 'SF Mono','Monaco','Inconsolata','Roboto Mono',monospace;color:#67fff7;text-align:center;letter-spacing:.025em;}
.fitltv-calc-tooltip-desc {margin:0;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ccc;}
.fitltv-calc-tooltip-anim-enter-active,.fitltv-calc-tooltip-anim-leave-active{transition:opacity .25s}
.fitltv-calc-tooltip-anim-enter-from,.fitltv-calc-tooltip-anim-leave-to{opacity:0}
.fitltv-calc-collapse-enter-active,.fitltv-calc-collapse-leave-active{transition:all .3s ease-in-out;overflow:hidden}
.fitltv-calc-collapse-enter-from,.fitltv-calc-collapse-leave-to{max-height:0;opacity:0}
.fitltv-calc-collapse-enter-to,.fitltv-calc-collapse-leave-from{max-height:2000px;opacity:1}

/* Mobile */
@media (max-width: 768px){
  .fitltv-calc-container{padding:12px 6px;}
  .fitltv-calc-input-row{flex-direction:column;gap:10px;margin-bottom:8px;}
  .fitltv-calc-btn{font-size:15px;}
  .fitltv-calc-header{margin:0 0 9px 0}
  .fitltv-calc-title-desktop{display:none;}
  .fitltv-calc-title-mobile{display:block;font-size:16px}
  .fitltv-calc-title{padding:8px 0}
  .fitltv-calc-table-container{margin-bottom:8px;border-radius:7px}
  .fitltv-calc-th,.fitltv-calc-td,.fitltv-calc-metric-cell{padding:7px 7px;white-space:normal}
  .fitltv-calc-metric-cell{gap:6px;align-items:flex-start}
  .fitltv-calc-info-icon{width:15px;height:15px;font-size:10px;}
  .fitltv-calc-why-toggle{padding:8px;}
  .fitltv-calc-why-text{font-size:13px;}
}
</style>
