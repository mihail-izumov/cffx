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
            <th class="fitltv-calc-th">Без Сигналов</th>
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
              {{ displayResult.retentionSignals }} мес <span class="fitltv-calc-growth-secondary">(+{{ displayResult.retentionBoostPercent }}%)</span>
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
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.additionalClients }}</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalRevenueMonthClub')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenueMonthClub' }">Доп. выручка / мес / клуб</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('additionalRevenueMonthClub')"
                    @mouseenter="hoverIcon = 'additionalRevenueMonthClub'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'additionalRevenueMonthClub' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.additionalRevenueMonthClub }} / мес</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalRevenueYearClub')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenueYearClub' }">Доп. выручка / клуб / год</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('additionalRevenueYearClub')"
                    @mouseenter="hoverIcon = 'additionalRevenueYearClub'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'additionalRevenueYearClub' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.additionalRevenueYearClub }} / год</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('additionalRevenueYearNetwork')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'additionalRevenueYearNetwork' }">Доп. выручка / сеть / год</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('additionalRevenueYearNetwork')"
                    @mouseenter="hoverIcon = 'additionalRevenueYearNetwork'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'additionalRevenueYearNetwork' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">₽{{ displayResult.additionalRevenueYearNetwork }} / год</td>
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
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.signalsRange }} (2-3% гостей)</td>
          </tr>
          <tr>
            <td class="fitltv-calc-metric-cell">
              <span class="fitltv-calc-metric-text" @click="showTooltip('paybackSignals')"
                    :class="{ 'fitltv-calc-active': activeTooltip === 'paybackSignals' }">Сигналы для окупаемости</span>
              <span class="fitltv-calc-info-icon fitltv-calc-info-icon-table"
                    @click.stop="showTooltip('paybackSignals')"
                    @mouseenter="hoverIcon = 'paybackSignals'"
                    @mouseleave="hoverIcon = null"
                    :class="{ hover: hoverIcon === 'paybackSignals' }">i</span>
            </td>
            <td class="fitltv-calc-td">—</td>
            <td class="fitltv-calc-td fitltv-calc-highlight">{{ displayResult.paybackSignals }} / 5-7 дней</td>
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
              <span>{{ displayResult.membersNum }} × 6 = {{ displayResult.guestsPerMonth }} гостей</span>
            </div>
            <div class="fitltv-chip fitltv-chip--amber">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>2–3% = {{ displayResult.signalsRange }} Сигналов</span>
            </div>
            <div class="fitltv-chip fitltv-chip--amber">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>+{{ displayResult.additionalClients }} удержанных</span>
            </div>
            <div class="fitltv-chip fitltv-chip--amber">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>+₽{{ displayResult.ltvDiff }} LTV</span>
            </div>
          </div>
        </div>

        <!-- Тёмные -->
        <div class="fitltv-calc-factors-block">
          <h4 class="fitltv-calc-factors-title">Почему фитнес-клубы особенные:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Высокая частота посещений (6 раз/мес)</span></div>
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>70% retention вместо 50%</span></div>
            <div class="fitltv-chip fitltv-chip--slate"><svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg><span>Оперативное решение жалоб</span></div>
          </div>
        </div>

        <!-- Синие -->
        <div class="fitltv-calc-payback-explanation">
          <h4 class="fitltv-calc-payback-title">Окупаемость системы Сигналов:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>{{ displayResult.paybackSignals }} Сигналов = окупаемость</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Стоимость: ₽{{ displayResult.systemCostPerClub }}/мес на клуб</span>
            </div>
            <div class="fitltv-chip fitltv-chip--blue">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Окупаемость: 5-7 дней</span>
            </div>
          </div>
        </div>

        <!-- Зелёные -->
        <div class="fitltv-calc-success-factors">
          <h4 class="fitltv-calc-success-title">Ключевые факторы успеха:</h4>
          <div class="fitltv-chip-grid">
            <div class="fitltv-chip fitltv-chip--green">
              <svg class="fitltv-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              <span>Решение за 24 часа</span>
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
              <span>+₽{{ displayResult.ltvDiff }} LTV на клиента</span>
            </div>
          </div>
        </div>

        <!-- CTA / Info -->
        <div class="fitltv-calc-cta-block">
          <p class="fitltv-calc-cta-text"><strong>Главное:</strong> Система окупается за 5-7 дней. Каждый месяц приносит стабильный рост за счет повышения retention с 50% до 70%.</p>
        </div>
        <div class="fitltv-calc-warning-block">
          <p class="fitltv-calc-warning-text"><strong>Внимание:</strong> Результат зависит от качества внедрения и обучения команды.</p>
        </div>
        <div class="fitltv-calc-info-block">
          <p class="fitltv-calc-info-text"><strong>Как работает расчет:</strong> Оперативное закрытие Сигналов (жалоб, пропусков, запросов) увеличивает retention и LTV клиентов. Клиенты платят дольше и приводят больше друзей.</p>
          <p class="fitltv-calc-info-text"><strong>Основа расчетов:</strong> Реальные отраслевые метрики с учетом типа абонемента, частоты посещений и рефералов.</p>
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
  clubsNum.value >= 1 && clubsNum.value <= 99 &&
  membersNum.value >= 50 && membersNum.value <= 4000 &&
  priceNum.value >= 4000 && priceNum.value <= 80000 &&
  !clubsError.value && !membersError.value && !priceError.value
);

function formatNumber(n) {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(Math.round(n)).replace(/\s/g, '.');
}

function calcFitnessLTV({ clubs, members, price }) {
  // Retention curve из документа:
  // Без: 1 + 0.5 + 0.25 + 1 + 0.5 + 0.25 = 3.5 мес
  // С: 1 + 0.7 + 0.49 + 0.2 + 0.1 + 1 + 0.7 + 0.49 = 4.3 мес
  const retentionBase = 3.5;
  const retentionSignals = 4.3;
  const retentionBoostPercent = 23;

  // Рефералы
  const referralsBase = 0.1;
  const referralsSignals = 0.3;
  
  // LTV = абонемент × retention + рефералы × цена
  const ltvBase = price * retentionBase + referralsBase * price;
  const ltvSignals = price * retentionSignals + referralsSignals * price;
  const ltvDiff = ltvSignals - ltvBase;

  // Доп. клиенты: 600 × (70% – 50%) = 120
  const additionalClients = Math.round(members * 0.20); // 20% = 70% - 50%

  // Доп. выручка / мес / клуб: 120 × 1.000 = 120.000
  const monthlyLtvBoost = ltvDiff / 12;
  const additionalRevenueMonthClub = Math.round(additionalClients * monthlyLtvBoost);
  
  // Доп. выручка / клуб / год: 120.000 × 12 = 1.440.000
  const additionalRevenueYearClub = additionalRevenueMonthClub * 12;
  
  // Доп. выручка / сеть / год: 10 × 1.440.000 = 14.400.000
  const additionalRevenueYearNetwork = additionalRevenueYearClub * clubs;

  // Сигналы / мес / клуб: гостей = 600 × 6 = 3.600
  const guestsPerMonth = members * 6;
  const signalsMin = Math.round(guestsPerMonth * 0.02); // 2%
  const signalsMax = Math.round(guestsPerMonth * 0.03); // 3%
  const signalsRange = `${signalsMin}-${signalsMax}`;

  // Окупаемость: стоимость на клуб / прибыль = 27.500 / 1.000 = 28 Сигналов
  const systemCostPerClub = systemMonthlyCost.value / clubs;
  const paybackSignals = Math.round(systemCostPerClub / monthlyLtvBoost);

  return {
    retentionBase: retentionBase.toFixed(1),
    retentionSignals: retentionSignals.toFixed(1),
    retentionBoostPercent,
    ltvBase: formatNumber(ltvBase),
    ltvWithSignals: formatNumber(ltvSignals),
    ltvDiff: formatNumber(ltvDiff),
    additionalClients: formatNumber(additionalClients),
    additionalRevenueMonthClub: formatNumber(additionalRevenueMonthClub),
    additionalRevenueYearClub: formatNumber(additionalRevenueYearClub),
    additionalRevenueYearNetwork: formatNumber(additionalRevenueYearNetwork),
    guestsPerMonth: formatNumber(guestsPerMonth),
    signalsRange,
    signalsMin,
    signalsMax,
    paybackSignals: formatNumber(paybackSignals),
    systemCostPerClub: formatNumber(systemCostPerClub),
    monthlyLtvBoost: formatNumber(monthlyLtvBoost),
    membersNum: formatNumber(members),
    referralsBase,
    referralsSignals
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
  clubsInput: { 
    title: 'Число клубов', 
    description: 'Число действующих клубов <b>в сети</b>. Диапазон: от 1 до 99.' 
  },
  membersInput: { 
    title: 'Клиентов на клуб (в мес)', 
    description: 'Среднее количество новых клиентов на 1 клуб в месяц. Диапазон: от 50 до 4000.' 
  },
  priceInput: { 
    title: 'Абонемент (₽)', 
    description: 'Средняя цена абонемента (руб./мес) на 1 месяц. Диапазон: 4 000 — 80 000 ₽.' 
  }
};

const currentTooltip = computed(() => {
  if (tooltipHelpers[activeTooltip.value]) return tooltipHelpers[activeTooltip.value];

  const r = displayResult.value;
  const members = membersNum.value || 600;
  const price = priceNum.value || 12000;
  const clubs = clubsNum.value || 10;

  switch (activeTooltip.value) {
    case 'retention':
      return {
        title: 'Retention',
        formula: `<b>Расчёт:</b><br>Без: 1 + 0.5 + 0.25 + 1 + 0.5 + 0.25 = 3.5 мес<br>С: 1 + 0.7 + 0.49 + 0.2 + 0.1 + 1 + 0.7 + 0.49 = 4.3 мес<br>Δ = +23%`,
        description: `<b>Словами:</b><br>Это среднее количество месяцев, которое клиент платит за год.<br>Без Сигналов клиент остаётся ${r.retentionBase} месяца.<br>С Сигналами — ${r.retentionSignals} месяца.<br>Это означает, что каждый клиент платит на 0.8 месяца дольше.<br>Разница в 23% — это результат оперативного реагирования на Сигналы.`
      };
    case 'ltv':
      return {
        title: 'LTV клиента',
        formula: `<b>Без:</b><br>Абонемент: ₽${formatNumber(price)} × 3.5 мес = ₽${formatNumber(price * 3.5)}<br>Рефералы: 0.1 × ₽${formatNumber(price)} = ₽${formatNumber(price * 0.1)}<br>→ LTV = ₽${r.ltvBase}<br><br><b>С:</b><br>Абонемент: ₽${formatNumber(price)} × 4.3 мес = ₽${formatNumber(price * 4.3)}<br>Рефералы: 0.3 × ₽${formatNumber(price)} = ₽${formatNumber(price * 0.3)}<br>→ LTV = ₽${r.ltvWithSignals}<br><br>ΔLTV = ₽${r.ltvDiff}`,
        description: `<b>Словами:</b><br>LTV — это общий доход с одного клиента за год.<br>Без Сигналов клиент платит 3.5 месяца и приводит 1 нового за 10.<br>С Сигналами клиент платит 4.3 месяца и приводит 3 новых за 10 — потому что доволен.<br>Разница в доходе с одного клиента: +₽${r.ltvDiff} за год.`
      };
    case 'additionalClients':
      return {
        title: 'Доп. клиенты',
        formula: `${members} × (70% – 50%) = ${r.additionalClients}`,
        description: `<b>Словами:</b><br>Каждый месяц в клуб приходит ${members} новых клиентов.<br>Без Сигналов: только ${Math.round(members * 0.5)} остаются на второй месяц.<br>С Сигналами: ${Math.round(members * 0.7)} остаются.<br>→ Сигналы удерживают дополнительно ${r.additionalClients} клиентов каждый месяц.`
      };
    case 'additionalRevenueMonthClub':
      return {
        title: 'Доп. выручка / мес / клуб',
        formula: `${r.additionalClients} × ${r.monthlyLtvBoost} = ₽${r.additionalRevenueMonthClub}`,
        description: `<b>Словами:</b><br>Каждый из ${r.additionalClients} удержанных клиентов приносит +₽${r.monthlyLtvBoost} в месяц.<br>Это не новые продажи — это те же клиенты, которые дольше платят.<br>Клуб не расширяется — просто меньше людей уходят.<br>Это чистый прирост выручки.`
      };
    case 'additionalRevenueYearClub':
      return {
        title: 'Доп. выручка / клуб / год',
        formula: `₽${r.additionalRevenueMonthClub} × 12 = ₽${r.additionalRevenueYearClub}`,
        description: `<b>Словами:</b><br>За год накопленная дополнительная выручка от удержания ${r.additionalClients} клиентов в месяц.<br>Это не разовая акция — это постоянный эффект.`
      };
    case 'additionalRevenueYearNetwork':
      return {
        title: 'Доп. выручка / сеть / год',
        formula: `${clubs} × ₽${r.additionalRevenueYearClub} = ₽${r.additionalRevenueYearNetwork}`,
        description: `<b>Словами:</b><br>Если Сигналы работают во всех ${clubs} клубах — общий прирост выручки за год.<br>Это масштабируемый эффект.`
      };
    case 'signalsPerMonth':
      return {
        title: 'Сигналы / мес / клуб',
        formula: `Гостей: ${members} × 6 = ${r.guestsPerMonth}<br>2% = ${r.signalsMin} Сигнала<br>3% = ${r.signalsMax} Сигналов<br>→ ${r.signalsRange} Сигналов`,
        description: `<b>Словами:</b><br>Каждый клиент ходит в среднем 6 раз в месяц — это 1.5 тренировки в неделю.<br>Всего посещений: ${r.guestsPerMonth}.<br>2-3% гостей отправляют Сигнал: пропуск, жалоба, запрос на звонок или оценка.<br>Каждый Сигнал = гарантированное решение проблемы за 24 часа.`
      };
    case 'paybackSignals':
      return {
        title: 'Сигналы для окупаемости',
        formula: `Стоимость Сигналов на клуб: ₽${formatNumber(systemMonthlyCost.value)} / ${clubs} = ₽${r.systemCostPerClub}<br>ΔLTV в месяц = ₽${r.monthlyLtvBoost}<br>Сигналов нужно: ₽${r.systemCostPerClub} / ₽${r.monthlyLtvBoost} ≈ ${r.paybackSignals}`,
        description: `<b>Словами:</b><br>Сигналы стоят ₽${r.systemCostPerClub} в месяц на клуб.<br>Каждый удержанный клиент приносит +₽${r.monthlyLtvBoost} в месяц.<br>Чтобы окупить стоимость, нужно удержать ${r.paybackSignals} клиентов.<br>При ${r.signalsMin} Сигналах в месяц — нужно удержать ${Math.round(parseFloat(r.paybackSignals.replace(/\./g, '')) / r.signalsMin * 100)}%.<br>При ${r.signalsMax} — всего ${Math.round(parseFloat(r.paybackSignals.replace(/\./g, '')) / r.signalsMax * 100)}%.<br>Это реально. Окупаемость: 5-7 дней.`
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
.fitltv-calc-tooltip-content { max-width:500px; padding:20px; background:#2a2a2a; border:1px solid #404040; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,.4); cursor:default }
.fitltv-calc-tooltip-title { margin:0 0 12px 0; font:600 16px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#c5f946 }
.fitltv-calc-formula { margin:0 0 12px 0; padding:8px 12px; background:#1a1a1a; border:1px solid #333; border-radius:6px; font:500 13px/1.6 'SF Mono','Monaco','Inconsolata','Roboto Mono',monospace; color:#22c55e; text-align:left; letter-spacing:.025em }
.fitltv-calc-tooltip-desc { margin:0; font:400 14px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#ccc }
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
