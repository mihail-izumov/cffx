<template>
  <div class="ltv-calculator-card">
    <!-- Поле ввода -->
    <div class="input-group">
      <label for="averageCheckInput">Средний чек (₽):</label>
      <input
        id="averageCheckInput"
        type="text"
        :value="averageCheckStr"
        placeholder="например, 450"
        @input="onAverageCheckInput"
      />
    </div>
    
    <button class="btn-calc" :disabled="!canCalculate" @click="calculate">
      РАССЧИТАТЬ LTV [₽]
    </button>
    
    <!-- Блок результата -->
    <transition name="fade">
      <div v-if="resultShown" class="result">
        <p class="result-text">
          Возврат выручки: 
          <span 
            class="ltv-amount" 
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
            @click="showTooltip = !showTooltip"
            ref="amountRef"
          >
            {{ format(result.totalLTV) }} ₽
          </span> 
          за 6 мес.
        </p>
        
        <!-- Tooltip с детализацией -->
        <transition name="tooltip">
          <div v-if="showTooltip" class="tooltip-popup">
            <h4>LTV на гостя</h4>
            <div class="ltv-formula">
              {{ format(result.totalLTV) }} ₽ = {{ format(result.directRevenue) }} ₽ + {{ format(result.referralRevenue) }} ₽
            </div>
            <p class="ltv-description">
              Чистый доход, который приносит один лояльный гость в течение полугода, 
              включая деньги его друзей, пришедших по рекомендации.
            </p>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const averageCheckStr = ref('')
const resultShown = ref(false)
const showTooltip = ref(false)
const result = ref({})
const amountRef = ref(null)

function onAverageCheckInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  averageCheckStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  resultShown.value = false
  showTooltip.value = false
}

const averageCheckNum = computed(() => Number(averageCheckStr.value.replace(/\s|,/g, '')))

const canCalculate = computed(() => averageCheckNum.value >= 100)

const format = (n) => new Intl.NumberFormat('ru-RU').format(Math.round(n))

function calculate() {
  if (!canCalculate.value) return
  
  const avgCheck = averageCheckNum.value
  
  // Расчет LTV:
  // - 12 визитов за 6 месяцев (2 в месяц)
  // - 30% дополнительного дохода от рекомендаций
  const visitsPerPeriod = 12
  const directRevenue = avgCheck * visitsPerPeriod
  const referralRevenue = directRevenue * 0.3
  const totalLTV = directRevenue + referralRevenue
  
  result.value = {
    directRevenue,
    referralRevenue,
    totalLTV
  }
  
  resultShown.value = true
}
</script>

<style scoped>
.ltv-calculator-card { 
  width: 100%; 
  max-width: 480px; 
  margin: 0 auto 32px; 
  padding: 20px 24px; 
  background: #1e1e1e !important; 
  border: 1px solid #2b2b2b !important; 
  border-radius: 12px; 
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); 
  color: #ffffff !important; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
}

.input-group { 
  margin-bottom: 16px; 
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
  margin-top: 20px; 
  padding: 20px; 
  background: #141414 !important; 
  border: 1px solid #2b2b2b !important; 
  border-radius: 10px;
  position: relative;
}

.result-text {
  margin: 0;
  font: 400 16px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
  text-align: center;
}

.ltv-amount {
  font-weight: 700;
  color: #22c55e !important;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  user-select: none;
}

.ltv-amount:hover {
  background-color: rgba(34, 197, 94, 0.1);
}

.tooltip-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  padding: 16px;
  background: #2a2a2a !important;
  border: 1px solid #404040 !important;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  min-width: 280px;
  max-width: 320px;
  z-index: 1000;
}

.tooltip-popup::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #404040;
}

.tooltip-popup h4 {
  margin: 0 0 12px 0;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #c5f946 !important;
  text-align: center;
}

.ltv-formula {
  margin: 0 0 12px 0;
  padding: 8px 12px;
  background: #1a1a1a !important;
  border: 1px solid #333333 !important;
  border-radius: 6px;
  font: 500 14px/1.4 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  color: #22c55e !important;
  text-align: center;
  letter-spacing: 0.025em;
}

.ltv-description {
  margin: 0;
  font: 400 13px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #cccccc !important;
  text-align: left;
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
  transition: opacity 0.25s, transform 0.25s;
}

.tooltip-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}

.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}

/* Мобильные устройства */
@media(max-width: 768px) {
  .ltv-calculator-card {
    padding: 16px 18px;
    margin-bottom: 24px;
  }
  
  input {
    height: 38px;
    font-size: 14px;
    line-height: 38px;
  }
  
  .btn-calc {
    height: 40px;
    font-size: 15px;
    line-height: 40px;
  }
  
  .result {
    padding: 16px;
  }
  
  .result-text {
    font-size: 15px;
  }
  
  .tooltip-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 0;
    min-width: 260px;
    max-width: calc(100vw - 32px);
  }
  
  .tooltip-popup::before {
    display: none;
  }
}
</style>
