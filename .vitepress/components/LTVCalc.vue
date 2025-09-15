<template>
  <div class="roi-calculator-card">
    <!-- Поля ввода в одну строку -->
    <div class="input-row">
      <div class="input-group">
        <label for="guestsInput">Кол-во гостей (сред. в мес.):</label>
        <input
          id="guestsInput"
          type="text"
          :value="guestsStr"
          placeholder="например, 1,000"
          @input="onGuestsInput"
        />
      </div>
      <div class="input-group">
        <label for="averageCheckInput">Средний чек (₽):</label>
        <input
          id="averageCheckInput"
          type="text"
          :value="averageCheckStr"
          placeholder="например, 500"
          @input="onAverageCheckInput"
        />
      </div>
    </div>
    
    <button class="btn-calc" :disabled="!canCalculate" @click="calculate">
      РАССЧИТАТЬ ROI [📈]
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
                <th>Прирост</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Лояльные гости/мес.</td>
                <td>{{ result.loyalWithout }}</td>
                <td class="highlight">{{ result.loyalWith }}</td>
                <td class="growth">+{{ result.loyaltyGrowth }}%</td>
              </tr>
              <tr>
                <td>LTV одного гостя (₽)</td>
                <td>{{ format(result.ltvWithout) }} ₽</td>
                <td class="highlight">{{ format(result.ltvWith) }} ₽</td>
                <td class="growth">+{{ format(result.ltvGrowth) }} ₽</td>
              </tr>
              <tr>
                <td>Доп. выручка/мес. (₽)</td>
                <td>—</td>
                <td class="highlight">{{ format(result.additionalMonthlyRevenue) }} ₽</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Доп. прибыль/год (₽)</td>
                <td>—</td>
                <td class="highlight">{{ format(result.totalAdditionalProfit) }} ₽</td>
                <td>—</td>
              </tr>
              <tr>
                <td>ROI системы (%)</td>
                <td>—</td>
                <td class="roi-value">{{ result.roiPercentage }}%</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Окупаемость (мес.)</td>
                <td>—</td>
                <td class="highlight">{{ result.paybackMonths }}</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
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
            и анализе 500+ кофеен. Консервативные оценки гарантируют реалистичность прогнозов.
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
const result = ref({})

// Константы из ТЗ
const constants = {
  loyaltyRateWithoutSystem: 0.20,      // 20% естественная лояльность
  loyaltyRateWithSystem: 0.35,         // 35% лояльность с тикет-системой
  frequencyWithoutSystem: 2,           // 2 посещения/месяц без системы
  frequencyWithSystem: 3,              // 3 посещения/месяц с системой
  loyaltyPeriodMonths: 12,             // период лояльности 12 месяцев
  referralRate: 0.5,                   // 0.5 новых клиентов от рекомендаций
  systemCostAnnual: 150000,            // стоимость системы в год (₽)
  marginPercentage: 0.40               // маржинальность 40%
}

function onGuestsInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  guestsStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  resultShown.value = false
}

function onAverageCheckInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  averageCheckStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  resultShown.value = false
}

const guestsNum = computed(() => Number(guestsStr.value.replace(/\s|,/g, '')))
const averageCheckNum = computed(() => Number(averageCheckStr.value.replace(/\s|,/g, '')))

const canCalculate = computed(() => guestsNum.value >= 50 && averageCheckNum.value >= 100)

const format = (n) => new Intl.NumberFormat('ru-RU').format(Math.round(n))

function calculateROI(monthlyGuests, averageCheck) {
  // Без системы
  const loyalWithout = monthlyGuests * constants.loyaltyRateWithoutSystem
  const revenueWithout = loyalWithout * constants.frequencyWithoutSystem * averageCheck * 12
  
  // С системой
  const loyalWith = monthlyGuests * constants.loyaltyRateWithSystem
  const revenueDirect = loyalWith * constants.frequencyWithSystem * averageCheck * 12
  const referralRevenue = loyalWith * constants.referralRate * averageCheck * constants.frequencyWithSystem * 6 // полгода на привлечение
  const totalRevenueWith = revenueDirect + referralRevenue
  
  // LTV расчеты
  const ltvWithout = averageCheck * constants.frequencyWithoutSystem * 12
  const ltvWith = (averageCheck * constants.frequencyWithSystem * 12) + (averageCheck * constants.frequencyWithSystem * 6 * constants.referralRate)
  
  // ROI расчеты
  const additionalRevenue = totalRevenueWith - revenueWithout
  const additionalProfit = additionalRevenue * constants.marginPercentage
  const roiPercentage = ((additionalProfit - constants.systemCostAnnual) / constants.systemCostAnnual) * 100
  
  return {
    loyalWithout: Math.round(loyalWithout),
    loyalWith: Math.round(loyalWith),
    loyaltyGrowth: Math.round(((loyalWith - loyalWithout) / loyalWithout) * 100),
    ltvWithout: ltvWithout,
    ltvWith: ltvWith,
    ltvGrowth: ltvWith - ltvWithout,
    additionalMonthlyRevenue: Math.round(additionalRevenue / 12),
    totalAdditionalProfit: Math.round(additionalProfit),
    roiPercentage: Math.round(roiPercentage),
    paybackMonths: Math.round(constants.systemCostAnnual / (additionalProfit / 12))
  }
}

function calculate() {
  if (!canCalculate.value) return
  
  result.value = calculateROI(guestsNum.value, averageCheckNum.value)
  resultShown.value = true
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
}

.input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.input-group { 
  flex: 1;
}

label { 
  display: block; 
  margin-bottom: 6px; 
  font: 600 14px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
  color: #ffffff !important; 
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

input::placeholder { 
  color: #888888 !important; 
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
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  background: #141414 !important;
  border: 1px solid #2b2b2b !important;
  border-radius: 8px;
  overflow: hidden;
}

.result-table th {
  padding: 12px 16px;
  font: 600 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #c5f946 !important;
  background: #1a1a1a !important;
  text-align: left;
  border-bottom: 1px solid #2b2b2b !important;
}

.result-table td {
  padding: 10px 16px;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
  border-bottom: 1px solid #2b2b2b !important;
}

.result-table tr:last-child td {
  border-bottom: none;
}

.result-table td:first-child {
  font-weight: 500;
}

.highlight {
  color: #22c55e !important;
  font-weight: 600;
}

.growth {
  color: #c5f946 !important;
  font-weight: 600;
}

.roi-value {
  color: #c5f946 !important;
  font-weight: 700;
  font-size: 16px;
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
