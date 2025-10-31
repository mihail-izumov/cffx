<script setup>
import { ref, computed } from 'vue'

// --- Продвинутая retention curve из SM Stretching (жизненный цикл 8,0-9,5 мес)
const retentionCurveBase = [1, 0.76, 0.62, 0.53, 0.44, 0.38, 0.35, 0.29, 0.25, 0.21, 0.17, 0.13];
const retentionCurveSignals = [1, 0.86, 0.75, 0.67, 0.58, 0.51, 0.47, 0.41, 0.36, 0.31, 0.26, 0.22];

const systemMonthlyCost = ref(27500);

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
  !clubsError.value && !membersError.value && !priceError.value
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
  const baseMonths = averageRetention(retentionCurveBase);
  const signalsMonths = averageRetention(retentionCurveSignals);

  const ltvBase = price * baseMonths;
  const ltvSignals = price * signalsMonths;
  const ltvDiff = ltvSignals - ltvBase;

  const clubBase = Math.round(members * retentionCurveBase[1]); // клиенты на 2й месяц
  const clubSignals = Math.round(members * retentionCurveSignals[1]);
  const additionalRevenueClub = Math.round(ltvDiff * (clubSignals - clubBase));
  const additionalRevenueNetwork = additionalRevenueClub * clubs;

  // Окупаемость (через тире) — например, 2–3 сигнала
  let paybackMin = Math.max(1, Math.floor(systemMonthlyCost.value / ltvDiff));
  let paybackMax = Math.max(1, Math.ceil(systemMonthlyCost.value / ltvDiff));
  let paybackSignals = (ltvDiff > 0) ? `${paybackMin}-${paybackMax} сигналов` : '—';

  return {
    clientsBase: formatNumber(clubBase),
    clientsWithSignals: formatNumber(clubSignals),
    retentionBoostPercent: Math.round((clubSignals - clubBase) / clubBase * 100),
    ltvBase: formatNumber(ltvBase),
    ltvWithSignals: formatNumber(ltvSignals),
    ltvDiff: formatNumber(ltvDiff),
    additionalRevenueClub: formatNumber(additionalRevenueClub),
    additionalRevenueNetwork: formatNumber(additionalRevenueNetwork),
    paybackSignals,
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

// --- TOOLTIP-логика: тултипы input-и, поля
const tooltipHelpers = {
  clubsInput: {
    title: 'Число клубов',
    description: 'Число действующих клубов <b>в сети</b>. Диапазон: от 1 до 25.',
  },
  membersInput: {
    title: 'Клиентов на клуб (в мес)',
    description: 'Среднее количество активных клиентов на 1 клуб в месяц (режим SM Stretching). Диапазон: от 50 до 4000.'
  },
  priceInput: {
    title: 'Абонемент (₽)',
    description: 'Средняя цена абонемента (руб./мес) на 1 месяц. Диапазон: 4 000 — 80 000 ₽.'
  }
};

const currentTooltip = computed(() => {
  if (tooltipHelpers[activeTooltip.value]) return tooltipHelpers[activeTooltip.value];

  // Динамические тултипы для таблицы
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
        title: 'Удержанные клиенты (через 2 мес)',
        formula:
          `${members} × ${(retentionCurveBase[1]*100).toFixed(1)}% = <b>${formatNumber(clubBase)}</b><br>`
          + `${members} × ${(retentionCurveSignals[1]*100).toFixed(1)}% = <b>${formatNumber(clubSignals)}</b>`,
        description: `Считается по retention curve — % клиентов, оставшихся после 2 мес работы клуба.`
      };
    case 'ltv':
      return {
        title: 'LTV клиента за жизненный цикл',
        formula:
          `${formatNumber(price)} × ${ltvBaseMonths.toFixed(2)} мес ≈ <b>₽${formatNumber(ltvBase)}</b><br>` +
          `${formatNumber(price)} × ${ltvSignalsMonths.toFixed(2)} мес ≈ <b>₽${formatNumber(ltvSignals)}</b>`,
        description: `Жизненный цикл: ${ltvBaseMonths.toFixed(2)}–${ltvSignalsMonths.toFixed(2)} мес.<br>
        <b>Жизненный цикл</b> — сумма retention curve (см. исходные данные SM Stretching). Формула: сумма процентных остатков клиентов по каждому месяцу (например, 0 мес: 100%, 1 мес: 76%, 2 мес: 62% ...).`
      };
    case 'additionalRevenueClub':
      return {
        title: 'Доп. выручка на клуб',
        formula: `Δ LTV × доп. удержанные =<br>₽${formatNumber(ltvDiff)} × ${formatNumber(clubSignals-clubBase)} = <b>₽${formatNumber(additionalRevenueClub)}</b>`,
        description: 'Разница за полный retention-цикл на 1 клуб.'
      };
    case 'additionalRevenueNetwork':
      return {
        title: 'Доп. выручка на сеть',
        formula: `${clubs} клуба × <b>₽${formatNumber(additionalRevenueClub)}</b> = <b>₽${formatNumber(additionalRevenueNetwork)}</b>`,
        description: 'Суммарно по всем клубам за retention-цикл.'
      };
    case 'paybackSignals':
      return {
        title: 'Окупаемость сигнала',
        formula: `Стоимость / ΔLTV = ${displayResult.value.systemMonthlyCostDisplay} / ${formatNumber(ltvDiff)} ≈ <b>${displayResult.value.paybackSignals}</b>`,
        description: 'Число сигналов, окупающих систему, зависит от разницы LTV. Всегда считано через диапазон (округление вниз — вверх).'
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
        <span class="fitltv-calc-title-desktop">Рост LTV с системой Сигналов</span>
        <span class="fitltv-calc-title-mobile">Эффект Сигналов</span>
      </h3>
    </div>
    <div class="fitltv-calc-table-container">
      <table class="fitltv-calc-table">
        <thead>
          <tr>
            <th class="fitltv-calc-th">Показатель</th>
            <th class="fitltv-calc-th">Без Сигнала</th>
            <th class="fitltv-calc-th">С ⚡ Сигналами</th>
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

    <!-- Триггер раскрытия -->
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

    <!-- "Почему всё получится" блок: ДАЛЕЕ -->
    <transition name="fitltv-calc-collapse">
      <div v-if="whyOpen" class="fitltv-calc-container fitltv-calc-content">
          <!-- Янтарные -->
  <div class="fitltv-calc-signal-block">
    <h4 class="fitltv-calc-signal-title">Каждый Сигнал = шанс вернуть клиента:</h4>
    <div class="fitltv-chip-grid">
      <div class="fitltv-chip fitltv-chip--amber">
        <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
        <span>Недовольство тренера/группы</span>
      </div>
      <div class="fitltv-chip fitltv-chip--amber">
        <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
        <span>Жалоба на сервис/чистоту</span>
      </div>
      <div class="fitltv-chip fitltv-chip--amber">
        <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
        <span>Комментарий о расписании</span>
      </div>
      <div class="fitltv-chip fitltv-chip--amber">
        <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
        <span>Проблема с оплатой/тарифом</span>
      </div>
    </div>
  </div>

  <!-- Серые -->
  <div class="fitltv-calc-factors-block">
    <h4 class="fitltv-calc-factors-title">Почему фитнес отличается:</h4>
    <div class="fitltv-chip-grid">
      <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Высокая стоимость удержания</span></div>
      <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Решающий фактор — лояльность</span></div>
      <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Сарафанное радио работает медленно</span></div>
      <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Частые возвраты после жалоб</span></div>
    </div>
  </div>

  <!-- Синие -->
  <div class="fitltv-calc-payback-explanation">
    <h4 class="fitltv-calc-payback-title">Все сигналы после 2-го = чистая прибыль:</h4>
    <div class="fitltv-chip-grid">
      <div class="fitltv-chip fitltv-chip--blue"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Стоимость системы: от ₽{{ displayResult.systemMonthlyCostDisplay }}/мес</span></div>
      <div class="fitltv-chip fitltv-chip--blue"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Прирост жизненного цикла клиента: +{{ displayResult.retentionBoostDisplay }}%</span></div>
      <div class="fitltv-chip fitltv-chip--blue"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Система окупается после {{ displayResult.paybackSignals }}</span></div>
    </div>
  </div>

  <!-- Зеленые -->
  <div class="fitltv-calc-success-factors">
    <h4 class="fitltv-calc-success-title">Ключевые факторы успеха:</h4>
    <div class="fitltv-chip-grid">
      <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Время ответа на жалобу &lt; 30 мин</span></div>
      <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Персонализация предложений</span></div>
      <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Мониторинг качества сервиса</span></div>
      <div class="fitltv-chip fitltv-chip--green"><svg class="fitltv-chip-icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg><span>Нематериальная компенсация</span></div>
    </div>
  </div>

  <!-- Желтый CTA -->
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

