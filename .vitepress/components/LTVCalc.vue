<template>
  <div class="roi-calc-container">
    <!-- Поля ввода в одну строку -->
    <div class="roi-calc-input-row">
      <div class="roi-calc-input-group">
        <label for="guestsInput" class="roi-calc-label">
          Кол-во гостей (сред. в мес.):
          <span class="roi-calc-info-icon" @click="showTooltip('guestsInput')" @mouseenter="hoverIcon = 'guestsInput'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'guestsInput' }">
            i
          </span>
        </label>
        <input
          id="guestsInput"
          type="text"
          :value="guestsStr"
          placeholder="например, 1,000"
          @input="onGuestsInput"
          :class="['roi-calc-input', { 'roi-calc-error': guestsError }]"
        />
        <div v-if="guestsError" class="roi-calc-error-message">{{ guestsError }}</div>
      </div>
      <div class="roi-calc-input-group">
        <label for="averageCheckInput" class="roi-calc-label">
          Средний чек (₽):
          <span class="roi-calc-info-icon" @click="showTooltip('averageCheckInput')" @mouseenter="hoverIcon = 'averageCheckInput'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'averageCheckInput' }">
            i
          </span>
        </label>
        <input
          id="averageCheckInput"
          type="text"
          :value="averageCheckStr"
          placeholder="например, 500"
          @input="onAverageCheckInput"
          :class="['roi-calc-input', { 'roi-calc-error': checkError }]"
        />
        <div v-if="checkError" class="roi-calc-error-message">{{ checkError }}</div>
      </div>
    </div>
    
    <button class="roi-calc-btn" :disabled="!canCalculate" @click="calculate">
      РАССЧИТАТЬ ROI
    </button>
    
    <!-- Блок результата с таблицей (всегда показан) -->
    <div class="roi-calc-result">
      <h3 class="roi-calc-title">ROI Диалогов с Сигналами для кофейни</h3>
      
      <div class="roi-calc-table-wrapper">
        <table class="roi-calc-table">
          <thead>
            <tr>
              <th class="roi-calc-th">Показатель</th>
              <th class="roi-calc-th">Без Сигнала</th>
              <th class="roi-calc-th">С ⚡️ Сигналом</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td 
                class="roi-calc-metric-name" 
                @click="showTooltip('loyalGuests')"
                :class="{ 'roi-calc-active': activeTooltip === 'loyalGuests' }"
              >
                Лояльные гости/мес. (чел.)
                <span class="roi-calc-info-icon" @click="showTooltip('loyalGuests')" @mouseenter="hoverIcon = 'loyalGuests'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'loyalGuests' }">
                  i
                </span>
              </td>
              <td class="roi-calc-td">{{ displayResult.loyalWithout }}</td>
              <td class="roi-calc-td roi-calc-highlight">
                {{ displayResult.loyalIncrease }} 
                <span class="roi-calc-growth-secondary">({{ displayResult.loyaltyGrowthDisplay }})</span>
              </td>
            </tr>
            <tr>
              <td 
                class="roi-calc-metric-name" 
                @click="showTooltip('frequency')"
                :class="{ 'roi-calc-active': activeTooltip === 'frequency' }"
              >
                Частота посещений
                <span class="roi-calc-info-icon" @click="showTooltip('frequency')" @mouseenter="hoverIcon = 'frequency'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'frequency' }">
                  i
                </span>
              </td>
              <td class="roi-calc-td">{{ displayResult.frequencyWithout }} раз/мес</td>
              <td class="roi-calc-td roi-calc-highlight">
                {{ displayResult.frequencyWith }} раз/мес 
                <span class="roi-calc-growth-secondary">({{ displayResult.frequencyGrowthDisplay }})</span>
              </td>
            </tr>
            <tr>
              <td 
                class="roi-calc-metric-name" 
                @click="showTooltip('ltv')"
                :class="{ 'roi-calc-active': activeTooltip === 'ltv' }"
              >
                LTV одного гостя за 10 мес. (₽)
                <span class="roi-calc-info-icon" @click="showTooltip('ltv')" @mouseenter="hoverIcon = 'ltv'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'ltv' }">
                  i
                </span>
              </td>
              <td class="roi-calc-td">{{ displayResult.ltvWithoutFormatted }} ₽</td>
              <td class="roi-calc-td roi-calc-highlight">
                {{ displayResult.ltvWithFormatted }} ₽ 
                <span class="roi-calc-growth-secondary">(+{{ displayResult.ltvGrowthFormatted }} ₽)</span>
              </td>
            </tr>
            <tr>
              <td 
                class="roi-calc-metric-name" 
                @click="showTooltip('revenue')"
                :class="{ 'roi-calc-active': activeTooltip === 'revenue' }"
              >
                Доп. выручка/мес. (₽)
                <span class="roi-calc-info-icon" @click="showTooltip('revenue')" @mouseenter="hoverIcon = 'revenue'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'revenue' }">
                  i
                </span>
              </td>
              <td class="roi-calc-td"><a href="https://cffx.ru/brew/membership.html" class="roi-calc-link">→</a></td>
              <td class="roi-calc-td roi-calc-highlight roi-calc-revenue-monthly">{{ displayResult.additionalMonthlyRevenueFormatted }} ₽</td>
            </tr>
            <tr>
              <td 
                class="roi-calc-metric-name" 
                @click="showTooltip('profit')"
                :class="{ 'roi-calc-active': activeTooltip === 'profit' }"
              >
                Доп. выручка/год (₽)
                <span class="roi-calc-info-icon" @click="showTooltip('profit')" @mouseenter="hoverIcon = 'profit'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'profit' }">
                  i
                </span>
              </td>
              <td class="roi-calc-td"><a href="https://cffx.ru/brew/membership.html" class="roi-calc-link">→</a></td>
              <td class="roi-calc-td roi-calc-highlight">{{ displayResult.totalAdditionalProfitFormatted }} ₽</td>
            </tr>
            <tr>
              <td 
                class="roi-calc-metric-name" 
                @click="showTooltip('payback')"
                :class="{ 'roi-calc-active': activeTooltip === 'payback' }"
              >
                Окупаемость
                <span class="roi-calc-info-icon" @click="showTooltip('payback')" @mouseenter="hoverIcon = 'payback'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'payback' }">
                  i
                </span>
              </td>
              <td class="roi-calc-td"><a href="https://cffx.ru/brew/membership.html" class="roi-calc-link">→</a></td>
              <td class="roi-calc-td roi-calc-highlight">{{ displayResult.paybackSignals }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Что такое Сигнал -->
      <div class="roi-calc-signal-block">
        <h4 class="roi-calc-signal-title">🚨 Что такое Сигнал:</h4>
        <ul class="roi-calc-signal-list">
          <li>• Недовольный отзыв в 2ГИС/Google до публикации</li>
          <li>• Жалоба в социальных сетях</li>
          <li>• Негативный комментарий о сервисе</li>
          <li>• Проблема с качеством продукта</li>
          <li>• <strong>Каждый Сигнал = возможность вернуть клиента</strong></li>
        </ul>
      </div>
      
      <!-- Почему кофейни особенные -->
      <div class="roi-calc-coffee-specifics">
        <h4 class="roi-calc-coffee-title">☕ Почему кофейни особенные:</h4>
        <ul class="roi-calc-coffee-list">
          <li>✓ Выше базовая лояльность — люди привыкают к "своему" месту</li>
          <li>✓ Чаще посещения — кофе нужен каждый день</li>
          <li>✓ Сильнее влияние привычки и удобного расположения</li>
          <li>✓ Быстрее распространение сарафанного радио среди коллег</li>
        </ul>
      </div>
      
      <!-- Тултипы -->
      <transition name="roi-calc-tooltip">
        <div v-if="activeTooltip" class="roi-calc-tooltip-popup" @click="closeTooltip">
          <div class="roi-calc-tooltip-content" @click.stop>
            <h4 class="roi-calc-tooltip-title">{{ tooltips[activeTooltip].title }}</h4>
            <div v-if="activeTooltip === 'ltv' && calculatedResult.ltvWith" class="roi-calc-ltv-formula">
              {{ formatNumber(calculatedResult.ltvWith) }} ₽ = {{ formatNumber(calculatedResult.ltvDirectPart) }} ₽
            </div>
            <p class="roi-calc-tooltip-desc" v-html="tooltips[activeTooltip].description"></p>
          </div>
        </div>
      </transition>
      
      <!-- Окупаемость через сигналы -->
      <div class="roi-calc-payback-explanation">
        <h4 class="roi-calc-payback-title">💡 Окупаемость через сигналы:</h4>
        <ul class="roi-calc-payback-list">
          <li>• Стоимость системы: 30 000 ₽/мес</li>
          <li>• Средняя стоимость предотвращенного ухода: 25 000 ₽</li>
          <li>• Система окупается после {{ displayResult.paybackSignals }}</li>
          <li>• <strong>Все сигналы после 2-го = чистая прибыль</strong></li>
        </ul>
      </div>
      
      <!-- Ключевые факторы успеха -->
      <div class="roi-calc-success-factors">
        <h4 class="roi-calc-success-title">🎯 Ключевые факторы успеха:</h4>
        <ul class="roi-calc-success-list">
          <li>✓ Время ответа на жалобу &lt; 30 минут</li>
          <li>✓ Компенсация при проблемах (новый напиток)</li>
          <li>✓ Персонализация предложений</li>
          <li>✓ Мониторинг качества сервиса</li>
        </ul>
      </div>
      
      <!-- Призыв к действию -->
      <div class="roi-calc-cta-block">
        <p class="roi-calc-cta-text">🎯 <strong>Главное:</strong> Система окупается мгновенно, а каждый месяц приносит стабильный рост выручки в 1,4+ млн рублей.</p>
        <p class="roi-calc-cta-text">Следующий шаг → <a href="https://cffx.ru/brew/membership.html" class="roi-calc-cta-link">Получить демо системы Сигналов</a></p>
      </div>
      
      <!-- Предупреждение -->
      <div class="roi-calc-warning-block">
        <p class="roi-calc-warning-text">⚠️ <strong>Важно:</strong> Результаты достигаются только при качественном внедрении Диалогов с Сигналами и обучении персонала. Показаны консервативные оценки на основе анализа 100+ кофеен.</p>
      </div>
      
      <!-- Дополнительная информация -->
      <div class="roi-calc-info-block">
        <p class="roi-calc-info-text">
          💡 <strong>Как работает расчет:</strong> Диалоги с Сигналами помогают быстро решать проблемы гостей, 
          превращая потенциальные жалобы в возможности для повышения лояльности. 
          Довольные клиенты посещают кофейню чаще и приводят друзей.
        </p>
        <p class="roi-calc-info-text">
          📊 <strong>Основа расчетов:</strong> Данные основаны на анализе 100+ кофеен. В расчет включены затраты на Диалоги с Сигналами (30 000 ₽/мес). Консервативные оценки гарантируют реалистичность прогнозов.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const guestsStr = ref('1000')
const averageCheckStr = ref('500')
const activeTooltip = ref(null)
const hoverIcon = ref(null)
const guestsError = ref('')
const checkError = ref('')
const calculatedResult = ref({})
const hasCalculated = ref(false)

// Исправленные константы для кофеен
const constants = {
  loyaltyRateWithoutSystem: 0.42,      // 42% базовая лояльность кофеен
  loyaltyRateWithSystem: 0.65,         // 65% с системой сигналов  
  frequencyWithoutSystem: 4,           // 4 раза/мес без системы
  frequencyWithSystem: 7,              // 7 раз/мес с системой
  loyaltyPeriod: 10,                   // 10 месяцев период лояльности
  systemCostMonthly: 30000,            // 30,000 ₽/мес стоимость
  avgPreventedLoss: 25000,             // средние потери от ухода
  annualDiscount: 0.38,                // 38% скидка для годового расчета (сезонность)
  marginPercentage: 0.40               // маржинальность 40%
}

// Обновленные тултипы
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
    title: '👥 Прирост постоянных клиентов',
    description: `<strong>Без Сигнала:</strong> 1000 × 42% = 420 лояльных гостей<br>
                  <strong>С Сигналом:</strong> 1000 × 65% = 650 лояльных гостей<br>
                  <strong>Прирост:</strong> +230 гостей (+55%)<br><br>
                  Сигналы помогают удерживать недовольных клиентов, превращая их из потенциальных "уходящих" в лояльных постоянных гостей.`
  },
  frequency: {
    title: '📅 Как часто ходят лояльные гости',
    description: `<strong>Без системы:</strong> 4 раза в месяц (еженедельно)<br>
                  <strong>С системой:</strong> 7 раз в месяц (почти через день)<br><br>
                  Довольные клиенты, чьи проблемы быстро решаются, посещают кофейню чаще. Это эффект "сверхлояльности" после положительного разрешения конфликта.`
  },
  ltv: {
    title: '💰 Сколько денег приносит один лояльный гость',
    description: `<strong>Формула:</strong> Средний чек × Частота × Период лояльности<br><br>
                  <strong>Без Сигнала:</strong><br>500 ₽ × 4 раза/мес × 10 мес = 20,000 ₽<br><br>
                  <strong>С Сигналом:</strong><br>500 ₽ × 7 раз/мес × 10 мес = 35,000 ₽<br><br>
                  LTV показывает полную ценность клиента за время его "дружбы" с кофейней.`
  },
  revenue: {
    title: '📈 Дополнительная выручка каждый месяц',
    description: `<strong>Расчет:</strong> (Прирост лояльных) × (Частота с системой) × (Средний чек)<br>
                  230 гостей × 7 раз/мес × 500 ₽ = 805,000 ₽<br><br>
                  <strong>ПЛЮС</strong> повышенная частота у существующих лояльных:<br>
                  420 гостей × (7-4) раз/мес × 500 ₽ = 630,000 ₽<br><br>
                  <strong>Итого:</strong> 1,435,000 ₽ дополнительной выручки в месяц`
  },
  profit: {
    title: '🎯 Годовой эффект от системы',
    description: `1,435,000 ₽/мес × 12 месяцев = 17,220,000 ₽<br><br>
                  Но консервативно берем 6,528,000 ₽ с учетом:<br>
                  • Сезонных колебаний (летний спад)<br>
                  • Времени на внедрение системы (2-3 месяца)<br>
                  • Обучения персонала работе с Сигналами<br><br>
                  Реальный результат может быть выше.`
  },
  payback: {
    title: '⚡ Мгновенная окупаемость системы',
    description: `<strong>Стоимость системы:</strong> 30,000 ₽/мес<br>
                  <strong>Средние потери от ухода клиента:</strong> 25,000 ₽<br><br>
                  <strong>Окупаемость:</strong> 30,000 ÷ 25,000 = 1.2 сигнала<br><br>
                  <strong>Что входит в потери 25,000 ₽:</strong><br>
                  • LTV ушедшего клиента: 35,000 ₽ за 10 мес<br>
                  • Негативные отзывы отпугивают 2-3 новых клиентов<br>
                  • Потеря сарафанного радио и рекомендаций<br><br>
                  <strong>Вывод:</strong> После 2-го предотвращенного ухода все остальные сигналы приносят чистую прибыль!`
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
  activeTooltip.value = null
}

function onAverageCheckInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  const num = Number(digits)
  averageCheckStr.value = digits ? num.toLocaleString('ru-RU') : ''
  checkError.value = digits ? validateCheck(num) : ''
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

const formatNumber = (n) => new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(Math.round(n))

function calculateROI(monthlyGuests, averageCheck) {
  // Базовые показатели
  const loyalWithout = monthlyGuests * constants.loyaltyRateWithoutSystem
  const loyalWith = monthlyGuests * constants.loyaltyRateWithSystem
  const loyalIncrease = loyalWith - loyalWithout
  
  // LTV расчеты
  const ltvWithout = averageCheck * constants.frequencyWithoutSystem * constants.loyaltyPeriod
  const ltvWith = averageCheck * constants.frequencyWithSystem * constants.loyaltyPeriod
  
  // Дополнительная выручка
  const additionalRevenueMonthly = 
    (loyalIncrease * constants.frequencyWithSystem * averageCheck) + 
    (loyalWithout * (constants.frequencyWithSystem - constants.frequencyWithoutSystem) * averageCheck)
  
  const additionalRevenueAnnual = additionalRevenueMonthly * 12 * constants.annualDiscount
  
  // Окупаемость  
  const paybackSignals = Math.ceil(constants.systemCostMonthly / constants.avgPreventedLoss)
  
  return {
    loyalWithout: Math.round(loyalWithout),
    loyalIncrease: Math.round(loyalIncrease),
    loyalIncreasePercent: Math.round((loyalIncrease / loyalWithout) * 100),
    frequencyWithout: constants.frequencyWithoutSystem,
    frequencyWith: constants.frequencyWithSystem,
    ltvWithout: ltvWithout,
    ltvWith: ltvWith,
    ltvDirectPart: ltvWith,
    ltvGrowth: ltvWith - ltvWithout,
    additionalMonthlyRevenue: Math.round(additionalRevenueMonthly),
    totalAdditionalProfit: Math.round(additionalRevenueAnnual),
    paybackSignals: `${paybackSignals-1}-${paybackSignals} сигнала`
  }
}

// Дефолтные значения для отображения (ссылки вместо стрелок)
const defaultResult = {
  loyalWithout: '420',
  loyalIncrease: '+230 гостей',
  loyaltyGrowthDisplay: '+55%',
  frequencyWithout: '4',
  frequencyWith: '7 раз/мес',
  frequencyGrowthDisplay: '+75%',
  ltvWithoutFormatted: '20 000',
  ltvWithFormatted: '35 000',
  ltvGrowthFormatted: '15 000',
  additionalMonthlyRevenueFormatted: '1 435 000',
  totalAdditionalProfitFormatted: '6 528 000',
  paybackSignals: '1-2 сигнала'
}

const displayResult = computed(() => {
  if (!hasCalculated.value) {
    return defaultResult
  }
  
  const result = calculatedResult.value
  return {
    loyalWithout: result.loyalWithout,
    loyalIncrease: `+${result.loyalIncrease} гостей`,
    loyaltyGrowthDisplay: `+${result.loyalIncreasePercent}%`,
    frequencyWithout: result.frequencyWithout,
    frequencyWith: `${result.frequencyWith} раз/мес`,
    frequencyGrowthDisplay: `+${Math.round(((result.frequencyWith - result.frequencyWithout) / result.frequencyWithout) * 100)}%`,
    ltvWithoutFormatted: formatNumber(result.ltvWithout),
    ltvWithFormatted: formatNumber(result.ltvWith),
    ltvGrowthFormatted: formatNumber(result.ltvGrowth),
    additionalMonthlyRevenueFormatted: formatNumber(result.additionalMonthlyRevenue),
    totalAdditionalProfitFormatted: formatNumber(result.totalAdditionalProfit),
    paybackSignals: result.paybackSignals
  }
})

function calculate() {
  if (!canCalculate.value) return
  
  calculatedResult.value = calculateROI(guestsNum.value, averageCheckNum.value)
  hasCalculated.value = true
  activeTooltip.value = null
}
</script>

<style scoped>
.roi-calc-container { 
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

.roi-calc-input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.roi-calc-input-group { 
  flex: 1;
  position: relative;
}

.roi-calc-label { 
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px; 
  font: 600 14px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
  color: #ffffff !important; 
}

.roi-calc-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #666666;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  flex-shrink: 0;
}

.roi-calc-info-icon.hover {
  background: #999999;
}

.roi-calc-input { 
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

.roi-calc-input:focus { 
  border-color: #c5f946 !important; 
  outline: 0; 
}

.roi-calc-input.roi-calc-error {
  border-color: #ef4444 !important;
}

.roi-calc-input::placeholder { 
  color: #888888 !important; 
}

.roi-calc-error-message {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  font-size: 12px;
  color: #ef4444 !important;
}

.roi-calc-btn {
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

.roi-calc-btn:disabled { 
  background: #555555 !important; 
  color: #cccccc !important; 
  cursor: not-allowed; 
}

.roi-calc-btn:not(:disabled):hover { 
  background: #347b6c !important; 
  color: #ffffff !important; 
  transform: translateY(-2px); 
}

.roi-calc-result { 
  margin-top: 24px; 
}

.roi-calc-title {
  margin: 0 0 20px;
  font: 600 18px/1.3 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-align: center;
  color: #c5f946 !important;
}

.roi-calc-table-wrapper {
  overflow-x: auto;
  margin-bottom: 20px;
  width: 100%;
}

.roi-calc-table {
  width: 100%;
  border-collapse: collapse;
  background: #141414 !important;
  border: 1px solid #2b2b2b !important;
  border-radius: 8px;
  overflow: hidden;
  table-layout: fixed;
}

.roi-calc-th {
  padding: 12px 16px;
  font: 600 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #c5f946 !important;
  background: #1a1a1a !important;
  text-align: left;
  border-bottom: 1px solid #2b2b2b !important;
}

.roi-calc-th:nth-child(1) { width: 40%; }
.roi-calc-th:nth-child(2) { width: 30%; }
.roi-calc-th:nth-child(3) { width: 30%; }

.roi-calc-td {
  padding: 10px 16px;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
  border-bottom: 1px solid #2b2b2b !important;
}

.roi-calc-table tr:last-child .roi-calc-td {
  border-bottom: none;
}

.roi-calc-metric-name {
  cursor: pointer;
  transition: background-color 0.2s ease;
  user-select: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}

.roi-calc-metric-name:hover {
  background-color: rgba(197, 249, 70, 0.1);
}

.roi-calc-metric-name.roi-calc-active {
  background-color: rgba(197, 249, 70, 0.2);
}

.roi-calc-highlight {
  color: #c5f946 !important;
  font-weight: 600;
}

.roi-calc-revenue-monthly {
  font-size: 16px;
}

.roi-calc-growth-secondary {
  color: #888888 !important;
  font-weight: 400;
  font-size: 0.9em;
}

.roi-calc-link {
  color: #c5f946 !important;
  text-decoration: none;
  font-weight: 600;
}

.roi-calc-link:hover {
  text-decoration: underline;
}

.roi-calc-signal-block {
  margin: 16px 0;
  padding: 16px;
  background: #1f1a0f !important;
  border: 1px solid #3a2e1e !important;
  border-radius: 8px;
}

.roi-calc-signal-title {
  margin: 0 0 12px;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #fbbf24 !important;
}

.roi-calc-signal-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.roi-calc-signal-list li {
  margin: 8px 0;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
}

.roi-calc-coffee-specifics {
  margin: 16px 0;
  padding: 16px;
  background: #1a1a1a !important;
  border: 1px solid #2b2b2b !important;
  border-radius: 8px;
}

.roi-calc-coffee-title {
  margin: 0 0 12px;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #d97706 !important;
}

.roi-calc-coffee-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.roi-calc-coffee-list li {
  margin: 8px 0;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
}

.roi-calc-payback-explanation {
  margin: 16px 0;
  padding: 16px;
  background: #0f1a2a !important;
  border: 1px solid #1e3a4a !important;
  border-radius: 8px;
}

.roi-calc-payback-title {
  margin: 0 0 12px;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #60a5fa !important;
}

.roi-calc-payback-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.roi-calc-payback-list li {
  margin: 8px 0;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
}

.roi-calc-success-factors {
  margin: 16px 0;
  padding: 16px;
  background: #0f2a1e !important;
  border: 1px solid #1e4a32 !important;
  border-radius: 8px;
}

.roi-calc-success-title {
  margin: 0 0 12px;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #22c55e !important;
}

.roi-calc-success-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.roi-calc-success-list li {
  margin: 8px 0;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
}

.roi-calc-cta-block {
  margin: 16px 0;
  padding: 16px;
  background: #1e1e1e !important;
  border: 1px solid #c5f946 !important;
  border-radius: 8px;
}

.roi-calc-cta-text {
  margin: 0 0 8px 0;
  font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
}

.roi-calc-cta-text:last-child {
  margin-bottom: 0;
}

.roi-calc-cta-link {
  color: #c5f946 !important;
  text-decoration: none;
  font-weight: 600;
}

.roi-calc-cta-link:hover {
  text-decoration: underline;
}

.roi-calc-warning-block {
  margin: 16px 0;
  padding: 16px;
  background: #2a1f0f !important;
  border: 1px solid #4a3c1e !important;
  border-radius: 8px;
}

.roi-calc-warning-text {
  margin: 0;
  font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #fbbf24 !important;
}

.roi-calc-tooltip-popup {
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

.roi-calc-tooltip-content {
  max-width: 400px;
  padding: 20px;
  background: #2a2a2a !important;
  border: 1px solid #404040 !important;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  cursor: default;
}

.roi-calc-tooltip-title {
  margin: 0 0 12px 0;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #c5f946 !important;
}

.roi-calc-ltv-formula {
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

.roi-calc-tooltip-desc {
  margin: 0;
  font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #cccccc !important;
}

.roi-calc-info-block {
  padding: 16px;
  background: #141414 !important;
  border: 1px solid #2b2b2b !important;
  border-radius: 8px;
}

.roi-calc-info-text {
  margin: 0 0 12px 0;
  font: 400 13px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #cccccc !important;
}

.roi-calc-info-text:last-child {
  margin-bottom: 0;
}

/* Анимации */
.roi-calc-tooltip-enter-active, .roi-calc-tooltip-leave-active {
  transition: opacity 0.25s;
}

.roi-calc-tooltip-enter-from, .roi-calc-tooltip-leave-to {
  opacity: 0;
}

/* Мобильные устройства */
@media(max-width: 768px) {
  .roi-calc-container {
    padding: 20px;
  }
  
  .roi-calc-input-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .roi-calc-input {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
  }
  
  .roi-calc-btn {
    height: 42px;
    font-size: 15px;
    line-height: 42px;
  }
  
  .roi-calc-title {
    font-size: 16px;
  }
  
  .roi-calc-th,
  .roi-calc-td {
    padding: 8px 12px;
    font-size: 13px;
    line-height: 1.2;
  }
  
  .roi-calc-metric-name {
    font-size: 13px;
    line-height: 1.2;
    gap: 6px;
  }
  
  .roi-calc-info-icon {
    width: 16px;
    height: 16px;
    font-size: 10px;
  }
  
  .roi-calc-revenue-monthly {
    font-size: 14px;
  }
  
  .roi-calc-tooltip-content {
    max-width: calc(100vw - 40px);
    margin: 20px;
  }
  
  .roi-calc-signal-block,
  .roi-calc-coffee-specifics,
  .roi-calc-payback-explanation,
  .roi-calc-success-factors,
  .roi-calc-cta-block,
  .roi-calc-warning-block,
  .roi-calc-info-block {
    padding: 12px;
  }
  
  .roi-calc-signal-title,
  .roi-calc-coffee-title,
  .roi-calc-payback-title,
  .roi-calc-success-title {
    font-size: 14px;
  }
  
  .roi-calc-signal-list li,
  .roi-calc-coffee-list li,
  .roi-calc-payback-list li,
  .roi-calc-success-list li,
  .roi-calc-cta-text,
  .roi-calc-warning-text,
  .roi-calc-info-text {
    font-size: 12px;
  }
}

@media(max-width: 480px) {
  .roi-calc-th,
  .roi-calc-td {
    padding: 6px 8px;
    font-size: 12px;
  }
  
  .roi-calc-metric-name {
    font-size: 12px;
  }
  
  .roi-calc-revenue-monthly {
    font-size: 13px;
  }
}
</style>
