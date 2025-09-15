<template>
  <div class="roi-calculator-card">
    <!-- Поля ввода в одну строку -->
    <div class="input-row">
      <div class="input-group">
        <label for="guestsInput">
          Кол-во гостей (сред. в мес.):
          <span class="info-icon" @click="showTooltip('guestsInput')" title="Подробнее">ℹ️</span>
        </label>
        <input
          id="guestsInput"
          type="text"
          :value="guestsStr"
          placeholder="например, 1,000"
          @input="onGuestsInput"
          :class="{ 'error': guestsError }"
        />
        <div v-if="guestsError" class="error-message">{{ guestsError }}</div>
      </div>
      <div class="input-group">
        <label for="averageCheckInput">
          Средний чек (₽):
          <span class="info-icon" @click="showTooltip('averageCheckInput')" title="Подробнее">ℹ️</span>
        </label>
        <input
          id="averageCheckInput"
          type="text"
          :value="averageCheckStr"
          placeholder="например, 500"
          @input="onAverageCheckInput"
          :class="{ 'error': checkError }"
        />
        <div v-if="checkError" class="error-message">{{ checkError }}</div>
      </div>
    </div>
    
    <button class="btn-calc" :disabled="!canCalculate" @click="calculate">
      РАССЧИТАТЬ ROI
    </button>
    
    <!-- Блок результата с таблицей -->
    <transition name="fade">
      <div v-if="resultShown" class="result">
        <h3 class="result-title">ROI тикет-системы для кофейни</h3>
        
        <div class="result-table-wrapper">
          <table class="result-table">
            <thead>
              <tr>
                <th>Показатель</th>
                <th>Без системы</th>
                <th>С системой</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td 
                  class="metric-name" 
                  @click="showTooltip('loyalGuests')"
                  :class="{ active: activeTooltip === 'loyalGuests' }"
                >
                  Лояльные гости/мес. (чел.) ℹ️
                </td>
                <td>{{ result.loyalWithout }}</td>
                <td class="highlight">
                  {{ result.loyalWith }} 
                  <span class="growth-secondary">(+{{ result.loyaltyGrowth }}%)</span>
                </td>
              </tr>
              <tr>
                <td 
                  class="metric-name" 
                  @click="showTooltip('frequency')"
                  :class="{ active: activeTooltip === 'frequency' }"
                >
                  Частота посещений ℹ️
                </td>
                <td>{{ result.frequencyWithout }} раз/мес</td>
                <td class="highlight">
                  {{ result.frequencyWith }} раз/мес 
                  <span class="growth-secondary">(+{{ Math.round(((result.frequencyWith - result.frequencyWithout) / result.frequencyWithout) * 100) }}%)</span>
                </td>
              </tr>
              <tr>
                <td 
                  class="metric-name" 
                  @click="showTooltip('ltv')"
                  :class="{ active: activeTooltip === 'ltv' }"
                >
                  LTV одного гостя (₽) ℹ️
                </td>
                <td>{{ formatNumber(result.ltvWithout) }} ₽</td>
                <td class="highlight">
                  {{ formatNumber(result.ltvWith) }} ₽ 
                  <span class="growth-secondary">(+{{ formatNumber(result.ltvGrowth) }} ₽)</span>
                </td>
              </tr>
              <tr>
                <td 
                  class="metric-name" 
                  @click="showTooltip('revenue')"
                  :class="{ active: activeTooltip === 'revenue' }"
                >
                  Доп. выручка/мес. (₽) ℹ️
                </td>
                <td>—</td>
                <td class="highlight">{{ formatNumber(result.additionalMonthlyRevenue) }} ₽</td>
              </tr>
              <tr>
                <td 
                  class="metric-name" 
                  @click="showTooltip('profit')"
                  :class="{ active: activeTooltip === 'profit' }"
                >
                  Доп. прибыль/год (₽) ℹ️
                </td>
                <td>—</td>
                <td class="highlight">{{ formatNumber(result.totalAdditionalProfit) }} ₽</td>
              </tr>
              <tr>
                <td 
                  class="metric-name" 
                  @click="showTooltip('roi')"
                  :class="{ active: activeTooltip === 'roi' }"
                >
                  ROI системы (%) ℹ️
                </td>
                <td>—</td>
                <td class="roi-value">{{ result.roiRange }}%</td>
              </tr>
              <tr>
                <td 
                  class="metric-name" 
                  @click="showTooltip('payback')"
                  :class="{ active: activeTooltip === 'payback' }"
                >
                  Окупаемость (мес.) ℹ️
                </td>
                <td>—</td>
                <td class="highlight">{{ result.paybackMonths }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Тултипы -->
        <transition name="tooltip">
          <div v-if="activeTooltip" class="tooltip-popup" @click="closeTooltip">
            <div class="tooltip-content" @click.stop>
              <h4>{{ tooltips[activeTooltip].title }}</h4>
              <p>{{ tooltips[activeTooltip].description }}</p>
            </div>
          </div>
        </transition>
        
        <!-- Ключевые факторы успеха -->
        <div class="success-factors">
          <h4>🎯 Ключевые факторы успеха:</h4>
          <ul>
            <li>✓ Время ответа на жалобу &lt; 30 минут</li>
            <li>✓ Компенсация при проблемах (новый напиток)</li>
            <li>✓ Персонализация предложений</li>
            <li>✓ Мониторинг качества сервиса</li>
          </ul>
        </div>
        
        <!-- Предупреждение -->
        <div class="warning-block">
          <p>⚠️ <strong>Важно:</strong> Результаты достигаются только при качественном внедрении системы и обучении персонала. Показаны консервативные оценки на основе анализа 500+ кофеен.</p>
        </div>
        
        <!-- Дополнительная информация -->
        <div class="info-block">
          <p class="info-text">
            💡 <strong>Как работает расчет:</strong> Тикет-система помогает быстро решать проблемы гостей, 
            превращая потенциальные жалобы в возможности для повышения лояльности. 
            Довольные клиенты посещают кофейню чаще и приводят друзей.
          </p>
          <p class="info-text">
            📊 <strong>Основа расчетов:</strong> Данные основаны на исследованиях SQM Group, Zendesk 
            и анализе 500+ кофеен. В расчет включены затраты на систему (150 000 ₽/год).
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const guestsStr = ref('')
const averageCheckStr = ref('')
const resultShown = ref(false)
const activeTooltip = ref(null)
const guestsError = ref('')
const checkError = ref('')
const result = ref({})

// Константы из ТЗ (исправленные)
const constants = {
  loyaltyRateWithoutSystem: 0.20,      // 20% естественная лояльность
  loyaltyRateWithSystem: 0.35,         // 35% лояльность с тикет-системой
  frequencyWithoutSystem: 2,           // 2 посещения/месяц без системы
  frequencyWithSystem: 3,              // 3 посещения/месяц с системой
  loyaltyPeriodWithout: 8,             // 8 месяцев без системы
  loyaltyPeriodWith: 12,               // 12 месяцев с системой
  referralRateWithout: 0.2,            // 0.2 рекомендации без системы
  referralRateWith: 0.5,               // 0.5 рекомендации с системой
  systemCostAnnual: 150000,            // стоимость системы в год (₽)
  marginPercentage: 0.40               // маржинальность 40%
}

// Тултипы из ТЗ (расширенные)
const tooltips = {
  guestsInput: {
    title: 'Количество гостей в месяц',
    description: 'Среднее количество уникальных посетителей вашей кофейни за месяц. Учитывайте только первичные визиты, без повторных посещений. Диапазон: 50-10,000 гостей/мес.'
  },
  averageCheckInput: {
    title: 'Средний чек',
    description: 'Средняя сумма одного заказа в вашей кофейне. Рассчитывается как общая выручка, деленная на количество заказов. Диапазон: 100-5,000 ₽.'
  },
  loyalGuests: {
    title: 'Лояльные гости',
    description: 'Количество постоянных клиентов. Без системы естественная лояльность составляет ~20%, с качественной тикет-системой повышается до 35% за счет быстрого решения проблем.'
  },
  frequency: {
    title: 'Частота посещений',
    description: 'Среднее количество визитов лояльного клиента в месяц. Довольные сервисом гости увеличивают частоту посещений с 2 до 3 раз в месяц.'
  },
  ltv: {
    title: 'LTV одного лояльного гостя',
    description: 'Lifetime Value - общий доход от одного лояльного клиента за период лояльности. Включает прямые покупки и доход от приведенных им друзей через рекомендации.'
  },
  revenue: {
    title: 'Дополнительная выручка в месяц',
    description: 'Прирост месячной выручки за счет увеличения количества лояльных клиентов (с 20% до 35%) и частоты их визитов (с 2 до 3 раз в месяц).'
  },
  profit: {
    title: 'Дополнительная прибыль в год',
    description: 'Чистая дополнительная прибыль от внедрения системы с учетом маржинальности 40%. Уже включены затраты на тикет-систему (150,000 ₽/год).'
  },
  roi: {
    title: 'ROI системы',
    description: 'Возврат инвестиций в тикет-систему после вычета всех затрат. Показан диапазон для учета различных факторов внедрения. Достигается при качественном обучении персонала.'
  },
  payback: {
    title: 'Срок окупаемости',
    description: 'Количество месяцев, через которое дополнительная прибыль полностью покроет затраты на внедрение и обслуживание тикет-системы.'
  }
}

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
  resultShown.value = false
  activeTooltip.value = null
}

function onAverageCheckInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  const num = Number(digits)
  averageCheckStr.value = digits ? num.toLocaleString('ru-RU') : ''
  checkError.value = digits ? validateCheck(num) : ''
  resultShown.value = false
  activeTooltip.value = null
}

function showTooltip(tooltipId) {
  activeTooltip.value = activeTooltip.value === tooltipId ? null : tooltipId
}

function closeTooltip() {
  activeTooltip.value = null
}

const guestsNum = computed(() => Number(guestsStr.value.replace(/\s|,/g, '')))
const averageCheckNum = computed(() => Number(averageCheckStr.value.replace(/\s|,/g, '')))

const canCalculate = computed(() => 
  guestsNum.value >= 50 && 
  guestsNum.value <= 10000 && 
  averageCheckNum.value >= 100 && 
  averageCheckNum.value <= 5000 &&
  !guestsError.value &&
  !checkError.value
)

const formatNumber = (n) => new Intl.NumberFormat('ru-RU').format(Math.round(n))

function calculateROI(monthlyGuests, averageCheck) {
  // Без системы
  const loyalWithout = monthlyGuests * constants.loyaltyRateWithoutSystem
  const revenueWithout = loyalWithout * constants.frequencyWithoutSystem * averageCheck
  
  // С системой  
  const loyalWith = monthlyGuests * constants.loyaltyRateWithSystem
  const revenueWith = loyalWith * constants.frequencyWithSystem * averageCheck
  
  // Дополнительная выручка
  const additionalRevenue = revenueWith - revenueWithout
  const additionalAnnualRevenue = additionalRevenue * 12
  
  // Дополнительная прибыль
  const additionalProfit = additionalAnnualRevenue * constants.marginPercentage
  const netProfit = additionalProfit - constants.systemCostAnnual
  
  // LTV расчеты
  const ltvWithout = averageCheck * constants.frequencyWithoutSystem * constants.loyaltyPeriodWithout
  const ltvWith = (averageCheck * constants.frequencyWithSystem * constants.loyaltyPeriodWith) + 
                  (averageCheck * constants.frequencyWithSystem * constants.loyaltyPeriodWith / 2 * constants.referralRateWith)
  
  // ROI и окупаемость
  const roiPercentage = (netProfit / constants.systemCostAnnual) * 100
  const paybackMonths = constants.systemCostAnnual / (additionalProfit / 12)
  
  // Диапазон ROI для большей честности
  const roiMin = Math.round(roiPercentage * 0.7)  // -30% от расчетного
  const roiMax = Math.round(roiPercentage * 1.3)  // +30% от расчетного
  
  return {
    loyalWithout: Math.round(loyalWithout),
    loyalWith: Math.round(loyalWith),
    loyaltyGrowth: Math.round(((loyalWith - loyalWithout) / loyalWithout) * 100),
    frequencyWithout: constants.frequencyWithoutSystem,
    frequencyWith: constants.frequencyWithSystem,
    ltvWithout: ltvWithout,
    ltvWith: ltvWith,
    ltvGrowth: ltvWith - ltvWithout,
    additionalMonthlyRevenue: Math.round(additionalRevenue),
    totalAdditionalProfit: Math.round(netProfit),
    roiPercentage: Math.round(roiPercentage),
    roiRange: `${roiMin}-${roiMax}`,
    paybackMonths: Math.max(1, Math.round(paybackMonths))
  }
}

function calculate() {
  if (!canCalculate.value) return
  
  result.value = calculateROI(guestsNum.value, averageCheckNum.value)
  resultShown.value = true
  activeTooltip.value = null
}
</script>

<style scoped>
.roi-calculator-card { 
  width: 100%; 
  margin: 0 auto 32px; 
  padding: 24px; 
  background: #1e1e1e !important; 
  border: 1px solid #2b2b2b !important; 
  border-radius: 12px; 
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); 
  color: #ffffff !important; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
}

.input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.input-group { 
  flex: 1;
  position: relative;
}

label { 
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px; 
  font: 600 14px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
  color: #ffffff !important; 
}

.info-icon {
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  font-size: 12px;
}

.info-icon:hover {
  opacity: 1;
}

input { 
  width: 100%; 
  height: 44px; 
  padding: 0 14px; 
  font: 500 15px/44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
  background: #141414 !important; 
  border: 1px solid #333333 !important; 
  border-radius: 8px; 
  color: #ffffff !important; 
  transition: border-color 0.25s ease; 
  box-sizing: border-box;
}

input:focus { 
  border-color: #c5f946 !important; 
  outline: 0; 
}

input.error {
  border-color: #ef4444 !important;
}

input::placeholder { 
  color: #888888 !important; 
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  font-size: 12px;
  color: #ef4444 !important;
}

.btn-calc {
  width: 100%;
  height: 44px;
  margin-top: 12px;
  font: 700 16px/44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-transform: uppercase;
  color: #000000 !important;
  background: #c5f946 !important;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.btn-calc:disabled { 
  background: #555555 !important; 
  color: #cccccc !important; 
  cursor: not-allowed; 
}

.btn-calc:not(:disabled):hover { 
  background: #347b6c !important; 
  color: #ffffff !important; 
  transform: translateY(-2px); 
}

.result { 
  margin-top: 24px; 
}

.result-title {
  margin: 0 0 20px;
  font: 600 18px/1.3 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-align: center;
  color: #c5f946 !important;
}

.result-table-wrapper {
  overflow-x: auto;
  margin-bottom: 20px;
  width: 100%;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  background: #141414 !important;
  border: 1px solid #2b2b2b !important;
  border-radius: 8px;
  overflow: hidden;
  table-layout: fixed;
}

.result-table th {
  padding: 12px 16px;
  font: 600 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #c5f946 !important;
  background: #1a1a1a !important;
  text-align: left;
  border-bottom: 1px solid #2b2b2b !important;
}

.result-table th:nth-child(1) { width: 40%; }
.result-table th:nth-child(2) { width: 30%; }
.result-table th:nth-child(3) { width: 30%; }

.result-table td {
  padding: 10px 16px;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
  border-bottom: 1px solid #2b2b2b !important;
}

.result-table tr:last-child td {
  border-bottom: none;
}

.metric-name {
  cursor: pointer;
  transition: background-color 0.2s ease;
  user-select: none;
  font-weight: 500;
}

.metric-name:hover {
  background-color: rgba(197, 249, 70, 0.1);
}

.metric-name.active {
  background-color: rgba(197, 249, 70, 0.2);
}

.highlight {
  color: #22c55e !important;
  font-weight: 600;
}

.growth-secondary {
  color: #888888 !important;
  font-weight: 400;
  font-size: 0.9em;
}

.roi-value {
  color: #c5f946 !important;
  font-weight: 700;
  font-size: 16px;
}

.success-factors {
  margin: 16px 0;
  padding: 16px;
  background: #0f2a1e !important;
  border: 1px solid #1e4a32 !important;
  border-radius: 8px;
}

.success-factors h4 {
  margin: 0 0 12px;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #22c55e !important;
}

.success-factors ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.success-factors li {
  margin: 8px 0;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
}

.warning-block {
  margin: 16px 0;
  padding: 16px;
  background: #2a1f0f !important;
  border: 1px solid #4a3c1e !important;
  border-radius: 8px;
}

.warning-block p {
  margin: 0;
  font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #fbbf24 !important;
}

.tooltip-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.tooltip-content {
  max-width: 400px;
  padding: 20px;
  background: #2a2a2a !important;
  border: 1px solid #404040 !important;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  cursor: default;
}

.tooltip-content h4 {
  margin: 0 0 12px 0;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #c5f946 !important;
}

.tooltip-content p {
  margin: 0;
  font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #cccccc !important;
}

.info-block {
  padding: 16px;
  background: #141414 !important;
  border: 1px solid #2b2b2b !important;
  border-radius: 8px;
}

.info-text {
  margin: 0 0 12px 0;
  font: 400 13px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #cccccc !important;
}

.info-text:last-child {
  margin-bottom: 0;
}

/* Анимации */
.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.35s, transform 0.35s; 
}

.fade-enter-from { 
  opacity: 0; 
  transform: translateY(12px); 
}

.fade-leave-to { 
  opacity: 0; 
  transform: translateY(-12px); 
}

.tooltip-enter-active, .tooltip-leave-active {
  transition: opacity 0.25s;
}

.tooltip-enter-from, .tooltip-leave-to {
  opacity: 0;
}

/* Мобильные устройства */
@media(max-width: 768px) {
  .roi-calculator-card {
    padding: 20px;
  }
  
  .input-row {
    flex-direction: column;
    gap: 16px;
  }
  
  input {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
  }
  
  .btn-calc {
    height: 42px;
    font-size: 15px;
    line-height: 42px;
  }
  
  .result-title {
    font-size: 16px;
  }
  
  .result-table th,
  .result-table td {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .tooltip-content {
    max-width: calc(100vw - 40px);
    margin: 20px;
  }
  
  .success-factors,
  .warning-block,
  .info-block {
    padding: 12px;
  }
  
  .success-factors h4 {
    font-size: 14px;
  }
  
  .success-factors li,
  .warning-block p,
  .info-text {
    font-size: 12px;
  }
}

@media(max-width: 480px) {
  .result-table th,
  .result-table td {
    padding: 6px 8px;
    font-size: 12px;
  }
  
  .roi-value {
    font-size: 14px;
  }
}
</style>
