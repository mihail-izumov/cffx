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
              <span class="fitltv-calc-metric-text" @click="showTooltip('clientsRetained')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'clientsRetained' }">Удержанные клиенты через 2 мес</span>
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
                    :class="{ hover: hoverIcon = 'ltv' }">i</span>
            </td>
            <td class="fitltv-calc-td">₽{{ displayResult.ltvBase }}</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">
              ₽{{ displayResult.ltvWithSignals }} <span class="fitltv-calc-growth-secondary">(+{{ displayResult.retentionBoostDisplay }}%)</span>
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
                    :class="{ hover: hoverIcon = 'additionalRevenueClub' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.additionalRevenueClub }}</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalRevenueNetwork')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenueNetwork' }">Доп. выручка на сеть</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('additionalRevenueNetwork')"
                    @mouseenter="hoverIcon = 'additionalRevenueNetwork'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon = 'additionalRevenueNetwork' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.additionalRevenueNetwork }}</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('paybackSignals')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'paybackSignals' }">Окупаемость сигнала</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('paybackSignals')"
                    @mouseenter="hoverIcon = 'paybackSignals'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon = 'paybackSignals' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.paybackSignals }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ТРИГГЕР РАСКРЫТИЯ -->
    <div class="fitltv-calc-why-toggle"
         :class="{ open: whyOpen }"
         @click="toggleWhy"
         role="button"
         tabindex="0"
         aria-expanded="whyOpen.toString()">
      <span class="fitltv-calc-why-text">Почему все получится</span>
      <span class="fitltv-calc-why-icon" aria-hidden="true">
        <svg class="fitltv-calc-why-icon-svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </span>
    </div>

    <!-- РАСКРЫВАЮЩИЙСЯ КОНТЕНТ -->
    <transition name="fitltv-calc-collapse">
      <div v-if="whyOpen" class="fitltv-calc-container fitltv-calc-content">
        <!-- Янтарные -->
        <div class="fitltv-calc-signal-block">
          <h4 class="fitltv-calc-signal-title">Каждый Сигнал = возможность вернуть клиента:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--amber">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Недовольный отзыв в 2ГИС/Google до публикации</span>
            </div>
            <div class="fitltv-chip fitltv-chip--amber">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Жалоба в социальных сетях</span>
            </div>
            <div class="fitltv-chip fitltv-chip--amber">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Негативный комментарий о сервисе</span>
            </div>
            <div class="fitltv-chip fitltv-chip--amber">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Проблема с качеством продукта</span>
            </div>
          </div>
        </div>

        <!-- Тёмные -->
        <div class="fitltv-calc-factors-block">
          <h4 class="fitltv-calc-factors-title">Почему фитнес-клубы особенные:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Высокая частота посещений</span></div>
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Сарафанное радио работает медленно</span></div>
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Частые возвраты после жалоб</span></div>
          </div>
        </div>

        <!-- Синие -->
        <div class="fitltv-calc-payback-explanation">
          <h4 class="fitltv-calc-payback-title">Все сигналы после 2-го = чистая прибыль:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Стоимость системы: от ₽{{ displayResult.systemMonthlyCostDisplay }}/мес</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Прирост жизненного цикла клиента: +{{ displayResult.retentionBoostDisplay }}%</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Система окупается после {{ displayResult.paybackSignals }}</span>
            </div>
          </div>
        </div>

        <!-- Зелёные -->
        <div class="fitltv-calc-success-factors">
          <h4 class="fitltv-calc-success-title">Ключевые факторы успеха:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--green">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Время ответа на жалобу less than 30 мин</span>
            </div>
            <div class="fitltv-chip fitltv-chip--green">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Персонализация предложений</span>
            </div>
            <div class="fitltv-chip fitltv-chip--green">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Мониторинг качества сервиса</span>
            </div>
            <div class="fitltv-chip fitltv-chip--green">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Нематериальная компенсация</span>
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

// --- Продвинутая retention curve (жизненный цикл 8,0-9,5 мес)
const retentionCurveBase = [1, 0.76, 0.62, 0.53, 0.44, 0.38, 0.35, 0.29, 0.25, 0.21, 0.17, 0.13];
const retentionCurveSignals = [1, 0.86, 0.75, 0.67, 0.58, 0.51, 0.47, 0.41, 0.36, 0.31, 0.26, 0.22];

const systemMonthlyCost = ref(275000);

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
  if (v > 99) return 'Максимум 99 клубов';
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
function pluralS(n) {
  n = Math.abs(n) % 100;
  let n1 = n % 10;
  if (n > 10 && n < 20) return 'Сигналов';
  if (n1 > 1 && n1 < 5) return 'Сигнала';
  if (n1 == 1) return 'Сигнал';
  return 'Сигналов';
}

// --- Обработчики инпутов (с очищением ошибок)
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
  !clubsError.value && !membersError.value && priceError.value
);

function formatNumber(n) {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(Math.round(n)).replace(/\s/g, '.');
}

// --- Средний retention (жизненный цикл в месяцах)
function averageRetention(curve) {
  let sum = 0;
  for (let i = 0; i < curve.length; i++) sum += curve[i];
  return sum;
}

function calcFitnessLTV({ clubs, members, price }) {
  // === НОВАЯ RETENTION CURVE ===
  const newRetentionBase = [1, 0.5, 0.25, 0, 0, 0, 1, 0.5, 0.25, 0, 0, 0];
  const newRetentionSignals = [1, 0.7, 0.49, 0.2, 0.1, 0, 1, 0.7, 0.49, 0.2, 0.1, 0];
  
  const baseMonths = newRetentionBase.reduce((a, b) => a + b, 0);
  const signalsMonths = newRetentionSignals.reduce((a, b) => a + b, 0);

  const referralsBase = 0.1;
  const referralsSignals = 0.3;
  
  const ltvBase = price * baseMonths + referralsBase * price;
  const ltvSignals = price * signalsMonths + referralsSignals * price;
  const ltvDiff = ltvSignals - ltvBase;

  const clubBase = Math.round(members * newRetentionBase[1]);
  const clubSignals = Math.round(members * newRetentionSignals[1]);
  const additionalClients = clubSignals - clubBase;

  const monthlyLtvDiff = ltvDiff / 12;
  const monthlyProfitPerClub = additionalClients * monthlyLtvDiff;

  const additionalRevenueClub = Math.round(additionalClients * ltvDiff);
  const additionalRevenueNetwork = additionalRevenueClub * clubs;

  const systemCostPerClub = systemMonthlyCost.value / clubs;
  const paybackDays = Math.ceil(systemCostPerClub / (monthlyProfitPerClub / 30));

  const guestsPerMonth = members * 6;
  const signalsMin = Math.round(guestsPerMonth * 0.02);
  const signalsMax = Math.round(guestsPerMonth * 0.03);

  const signalsForPayback = Math.round(systemCostPerClub / monthlyLtvDiff);

  return {
    clientsBase: formatNumber(clubBase),
    clientsWithSignals: formatNumber(clubSignals),
    retentionBoostPercent: clubBase > 0 ? Math.round((clubSignals - clubBase) / clubBase * 100) : 0,
    ltvBase: formatNumber(ltvBase),
    ltvWithSignals: formatNumber(ltvSignals),
    ltvDiff: formatNumber(ltvDiff),
    additionalClients: formatNumber(additionalClients),
    monthlyProfitPerClub: formatNumber(monthlyProfitPerClub),
    additionalRevenueClub: formatNumber(additionalRevenueClub),
    additionalRevenueNetwork: formatNumber(additionalRevenueNetwork),
    paybackSignals: `${paybackDays} дней`,
    signalsMin: formatNumber(signalsMin),
    signalsMax: formatNumber(signalsMax),
    signalsForPayback: formatNumber(signalsForPayback),
    ltvBaseMonths: baseMonths,
    ltvSignalsMonths: signalsMonths,
    referralsBase,
    referralsSignals,
    systemMonthlyCostDisplay: formatNumber(systemMonthlyCost.value),
    retentionBoostDisplay: baseMonths > 0 ? Math.round((signalsMonths - baseMonths) / baseMonths * 100) : 0,
    systemCostPerClub: formatNumber(systemCostPerClub),
    monthlyLtvDiff: formatNumber(monthlyLtvDiff),
    guestsPerMonth: formatNumber(guestsPerMonth)
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

// --- TOOLTIP-логика
const tooltipHelpers = {
  clubsInput: { title: 'Число клубов', description: 'Число действующих клубов <b>в сети</b>. Диапазон: от 1 до 25.' },
  membersInput: { title: 'Клиентов на клуб (в мес)', description: 'Среднее количество активных клиентов на 1 клуб в месяц (режим SM Stretching). Диапазон: от 50 до 4000.' },
  priceInput: { title: 'Абонемент (₽)', description: 'Средняя цена абонемента (руб./мес) на 1 месяц. Диапазон: 4 000 — 80 000 ₽.' }
};

const currentTooltip = computed(() => {
  if (tooltipHelpers[activeTooltip.value]) return tooltipHelpers[activeTooltip.value];

  const r = displayResult.value
  const clubs = clubsNum.value || 10;
  const members = membersNum.value || 600;
  const price = priceNum.value || 12000;

  switch (activeTooltip.value) {
    case 'clientsRetained':
      return {
        title: 'Удержанные клиенты (через 2 мес)',
        formula: `Базовый: <b>${r.clientsBase}</b><br>С Сигналами: <b>${r.clientsWithSignals}</b>`,
        description: `<b>Расчёт:</b> 600 × (70% – 50%) = 120<br><b>Словами:</b> Каждый месяц в клуб приходит 600 новых клиентов. Без Сигналов: только 300 остаются на второй месяц. С Сигналами: 420 остаются. → Сигналы удерживают дополнительно 120 клиентов каждый месяц.`
      };
    case 'ltv':
      return {
        title: 'LTV клиента за жизненный цикл (12 месяцев)',
        formula: `<b>Без:</b><br>Абонемент: ₽${formatNumber(price)} × ${r.ltvBaseMonths.toFixed(1)} мес = ₽${formatNumber(price * r.ltvBaseMonths)}<br>Рефералы: ${r.referralsBase} × ₽${formatNumber(price)} = ₽${formatNumber(r.referralsBase * price)}<br>Итого: <b>₽${r.ltvBase}</b><br><br><b>С:</b><br>Абонемент: ₽${formatNumber(price)} × ${r.ltvSignalsMonths.toFixed(1)} мес = ₽${formatNumber(price * r.ltvSignalsMonths)}<br>Рефералы: ${r.referralsSignals} × ₽${formatNumber(price)} = ₽${formatNumber(r.referralsSignals * price)}<br>Итого: <b>₽${r.ltvWithSignals}</b><br>ΔLTV = ₽${r.ltvDiff}`,
        description: `<b>Словами:</b> LTV — это общий доход с одного клиента за год. Без Сигналов клиент платит 3.5 месяца и приводит 1 нового за 10. С Сигналами клиент платит 4.3 месяца и приводит 3 новых за 10 — потому что доволен. Разница в доходе с одного клиента: +₽12.000 за год.`
      };
    case 'additionalRevenueClub':
      return {
        title: 'Доп. выручка на клуб',
        formula: `ΔLTV × доп. удержанные =<br>₽${r.ltvDiff} × ${r.additionalClients} = <b>₽${r.additionalRevenueClub}</b>`,
        description: `<b>Расчёт:</b> 120 × ₽1.000 = ₽120.000 / мес<br><b>Словами:</b> Каждый из 120 удержанных клиентов приносит +₽1.000 в месяц. Это не новые продажи — это те же клиенты, которые дольше платят. Клуб не расширяется — просто меньше людей уходят. Это чистый прирост выручки.`
      };
    case 'additionalRevenueNetwork':
      return {
        title: 'Доп. выручка на сеть',
        formula: `${clubs} клубов × <b>₽${r.additionalRevenueClub}</b> = <b>₽${r.additionalRevenueNetwork}</b>`,
        description: `<b>Словами:</b> Если Сигналы работают во всех 10 клубах — общий прирост выручки за год. Это масштабируемый эффект.`
      };
    case 'paybackSignals':
      return {
        title: 'Окупаемость Сигнала',
        formula: `Стоимость Сигналов на клуб / (Доп. выручка в месяц на клуб) =<br>₽${r.systemCostPerClub} / ₽${r.monthlyProfitPerClub} = 6.87 дней<br>Округлено до 5–7 дней с запасом на возможные задержки.`,
        description: `<b>Словами:</b> Сигналы стоят ₽27.500 в месяц на клуб. Каждый месяц приносят ₽120.000 дополнительной выручки. Это значит, что за 6.87 дней выручка покроет всю стоимость. Округлено до 5–7 дней — с запасом на задержки.`
      };
    default:
      return { title: '', description: '', formula: '' };
  }
});

function showTooltip(id) { activeTooltip.value = activeTooltip.value === id ? null : id; }
function closeTooltip() { activeTooltip.value = null; }
function toggleWhy() { whyOpen.value = !whyOpen.value; }
</script>

<style scoped>
/* ---------------------- ВСЁ, ЧТО НЕ КАСАЕТСЯ ТОГГЛА ---------------------- */
.fitltv-calc-wrapper { width:100%; max-width:1200px; margin:0 auto; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fff }
.fitltv-calc-container { margin:0 0 20px; padding:24px; background:#1e1e1e; border:1px solid #2b2b2b; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,.25) }
.fitltv-calc-container.fitltv-calc-content { margin-top:0; border-top:none; border-top-left-radius:0; border-top-right-radius:0 }
.fitltv-calc-input-row { display:flex; gap:20px; margin-bottom:16px }
.fitltv-calc-input-group { flex:1; position:relative }
.fitltv-calc-label { display:flex; align-items:center; gap:8px; margin-bottom:6px; font:600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fff }
.fitltv-calc-info-icon { display:inline-flex; align-items:center; justify-content:center; width:18px; height:18px; background:#666; border-radius:50%; cursor:pointer; transition:all .2s; font-size:12px; font-weight:600; color:#fff; flex-shrink:0 }
.fitltv-calc-info-icon.hover { background:#999 }
.fitltv-calc-info-icon-table { border:none }
.fitltv-calc-input { width:100%; height:44px; padding:0 14px; font:500 15px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:#141414; border:1px solid #333; border-radius:8px; color:#fff; transition:border-color .25s; box-sizing:border-box }
.fitltv-calc-input:focus { border-color:#c5f946; outline:0 }
.fitltv-calc-input.fitltv-calc-error { border-color:#ef4444 }
.fitltv-calc-input::placeholder { color:#888 }
.fitltv-calc-error-message { position:absolute; top:100%; left:0; margin-top:4px; font-size:12px; color:#ef4444 }
.fitltv-calc-btn { width:100%; height:44px; margin-top:12px; font:700 16px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; text-transform:uppercase; color:#fff; background:#347b6c; border:none; border-radius:8px; cursor:pointer; transition:background .2s,transform .2s,color .2s }
.fitltv-calc-btn:disabled { background:#555; color:#ccc; cursor:not-allowed; transform:none }
.fitltv-calc-btn:not(:disabled):hover { background:#c5f946; color:#000; transform:translateY(-2px) }
.fitltv-calc-header { margin:0 0 20px 0; padding:0 }
.fitltv-calc-title { margin:0; padding:16px 0; font:600 18px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; text-align:center; color:#c5f946 }
.fitltv-calc-title-mobile { display:none }
.fitltv-calc-table-container { margin:0 0 20px 0; overflow:hidden; border-radius:8px; border:1px solid #2b2b2b }
.fitltv-calc-table { width:100%; border-collapse:separate; border-spacing:0; background:#141414; table-layout:auto; margin:0; padding:0 }
.fitltv-calc-table tr { position:relative }
.fitltv-calc-table tbody tr::after { content:""; position:absolute; left:16px; right:16px; bottom:0; height:1px; background:#2b2b2b; transform:translateZ(0) }
.fitltv-calc-table tbody tr:last-child::after { display:none }
.fitltv-calc-th, .fitltv-calc-td, .fitltv-calc-metric-cell { border:0; padding:10px 16px; vertical-align:middle; line-height:1.35 }
.fitltv-calc-th { font:600 14px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#c5f946; background:#1a1a1a; text-align:left; white-space:nowrap }
.fitltv-calc-th:nth-child(1) { width:45% }
.fitltv-calc-th:nth-child(2) { width:27.5% }
.fitltv-calc-th:nth-child(3) { width:27.5% }
.fitltv-calc-td { font:400 14px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fff; white-space:nowrap }
.fitltv-calc-metric-cell { display:flex; align-items:center; justify-content:space-between; gap:8px; white-space:nowrap }
.fitltv-calc-metric-text { cursor:pointer; transition:color .2s; user-select:none; flex:1 }
.fitltv-calc-metric-text:hover { color:rgba(197,249,70,.8) }
.fitltv-calc-metric-text.fitltv-calc-active { color:#c5f946 }
.fitltv-calc-highlight { color:#c5f946; font-weight:600 }
.fitltv-calc-growth-secondary { color:#888; font-weight:400; font-size:.9em }
.fitltv-calc-tooltip-popup { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,.8); display:flex; justify-content:center; align-items:center; z-index:1000; cursor:pointer }
.fitltv-calc-tooltip-content { max-width:400px; padding:20px; background:#2a2a2a; border:1px solid #404040; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,.4); cursor:default }
.fitltv-calc-tooltip-title { margin:0 0 12px 0; font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#c5f946 }
.fitltv-calc-formula { margin:0 0 12px 0; padding:8px 12px; background:#1a1a1a; border:1px solid #333; border-radius:6px; font:500 14px/1.4 'SF Mono','Monaco','Inconsolata','Roboto Mono',monospace; color:#22c55e; text-align:left; letter-spacing:.025em }
.fitltv-calc-tooltip-desc { margin:0; font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#ccc }
.fitltv-calc-tooltip-anim-enter-active, .fitltv-calc-tooltip-anim-leave-active { transition:opacity .25s }
.fitltv-calc-tooltip-anim-enter-from, .fitltv-calc-tooltip-anim-leave-to { opacity:0 }
.fitltv-calc-collapse-enter-active, .fitltv-calc-collapse-leave-active { transition:all .3s ease-in-out; overflow:hidden }
.fitltv-calc-collapse-enter-from, .fitltv-calc-collapse-leave-to { max-height:0; opacity:0 }
.fitltv-calc-collapse-enter-to, .fitltv-calc-collapse-leave-from { max-height:2000px; opacity:1 }

/* ---------------------- ТОЛЬКО ТОГГЛ И СТРЕЛКА ---------------------- */
.fitltv-calc-why-toggle {
  padding:14px 16px;
  margin:0;
  background:#1e1e1e;
  border:1px solid #2b2b2b;
  border-radius:8px;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:space-between;
  cursor:pointer;
  user-select:none;
  transition:background .2s ease,border-color .2s ease;
}
.fitltv-calc-why-toggle.open {
  border-bottom-left-radius:0;
  border-bottom-right-radius:0;
}
.fitltv-calc-why-toggle:hover {
  background:#232323;
  border-color:#3a3a3a;
}
.fitltv-calc-why-text {
  font:600 15px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}
.fitltv-calc-why-icon-svg {
  width:24px;
  height:24px;
  color:#9ca3af;
  transition:transform .2s ease,color .2s ease;
}
.fitltv-calc-why-toggle:hover .fitltv-calc-why-icon-svg {
  color:#b0b7c3;
}
.fitltv-calc-why-toggle.open .fitltv-calc-why-icon-svg {
  transform:rotate(180deg);
}

/* ---------------------- ОСТАЛЬНЫЕ БЛОКИ (чипы, CTA и т.д.) ---------------------- */
.fitltv-calc-signal-block { margin:16px 0; padding:16px; background:#1f1a0f; border:1px solid #3a2e1e; border-radius:8px }
.fitltv-calc-factors-block { margin:16px 0; padding:16px; background:#1a1a1a; border:1px solid #2b2b2b; border-radius:8px }
.fitltv-calc-payback-explanation { margin:16px 0; padding:16px; background:#0f1a2a; border:1px solid #1e3a4a; border-radius:8px }
.fitltv-calc-success-factors { margin:16px 0; padding:16px; background:#0f2a1e; border:1px solid #1e4a32; border-radius:8px }
.fitltv-calc-signal-title { margin:0 0 12px; font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fbbf24 }
.fitltv-calc-factors-title { margin:0 0 12px; font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#d97706 }
.fitltv-calc-payback-title { margin:0 0 12px; font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#60a5fa }
.fitltv-calc-success-title { margin:0 0 12px; font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#22c55e }
.fitltv-chip-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:10px }
.fitltv-chip { display:inline-flex; align-items:center; gap:8px; padding:10px 12px; border-radius:10px; color:#fff; font:500 14px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; border:1px solid transparent }
.fitltv-chip-icon { width:18px; height:18px; opacity:.9 }
.fitltv-chip--amber { background:#2b220f; border-color:#3a2e1e }
.fitltv-chip--slate { background:#1f1f1f; border-color:#2b2b2b }
.fitltv-chip--blue { background:#0e2138; border-color:#1e3a4a }
.fitltv-chip--green { background:#0f271e; border-color:#1e4a32 }
.fitltv-calc-cta-block { margin:16px 0; padding:16px; background:#1e1e1e; border:1px solid #c5f946; border-radius:8px }
.fitltv-calc-cta-text { margin:0 0 8px 0; font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fff }
.fitltv-calc-warning-block { margin:16px 0; padding:16px; background:#2a1f0f; border:1px solid #4a3c1e; border-radius:8px }
.fitltv-calc-warning-text { margin:0; font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#fbbf24 }
.fitltv-calc-info-block { margin:16px 0; padding:16px; background:#141414; border:1px solid #2b2b2b; border-radius:8px }
.fitltv-calc-info-text { margin:0 0 12px 0; font:400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#ccc }
.fitltv-calc-info-text:last-child { margin-bottom:0 }
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
