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
      РАССЧИТАТЬ LTV
    </button>
  </div>

  <!-- Заголовок вынесен из блока -->
  <div class="roi-calc-header">
    <h3 class="roi-calc-title">
      <span class="roi-calc-title-desktop">Рост LTV с системой Сигналов</span>
      <span class="roi-calc-title-mobile">Эффект Сигналов</span>
    </h3>
  </div>
  
  <!-- Таблица вынесена из основного блока -->
  <div class="roi-calc-table-container">
    <table class="roi-calc-table">
      <thead>
        <tr>
          <th class="roi-calc-th">Показатель</th>
          <th class="roi-calc-th">Без Сигнала</th>
          <th class="roi-calc-th">С ⚡ Сигналом</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('loyalGuests')"
              :class="{ 'roi-calc-active': activeTooltip === 'loyalGuests' }"
            >
              Лояльные гости/мес.
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('loyalGuests')" @mouseenter="hoverIcon = 'loyalGuests'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'loyalGuests' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">{{ displayResult.loyalWithout }} гостей</td>
          <td class="roi-calc-td roi-calc-highlight">
            {{ displayResult.loyalIncrease }} 
            <span class="roi-calc-growth-secondary">({{ displayResult.loyaltyGrowthDisplay }})</span>
          </td>
        </tr>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('frequency')"
              :class="{ 'roi-calc-active': activeTooltip === 'frequency' }"
            >
              Частота посещений
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('frequency')" @mouseenter="hoverIcon = 'frequency'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'frequency' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">{{ displayResult.frequencyWithout }} раз/мес</td>
          <td class="roi-calc-td roi-calc-highlight">
            {{ displayResult.frequencyWith }} 
            <span class="roi-calc-growth-secondary">({{ displayResult.frequencyGrowthDisplay }})</span>
          </td>
        </tr>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('ltv')"
              :class="{ 'roi-calc-active': activeTooltip === 'ltv' }"
            >
              LTV одного гостя за 10 мес.
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('ltv')" @mouseenter="hoverIcon = 'ltv'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'ltv' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">₽{{ displayResult.ltvWithoutFormatted }}</td>
          <td class="roi-calc-td roi-calc-highlight">
            ₽{{ displayResult.ltvWithFormatted }} 
            <span class="roi-calc-growth-secondary">(+₽{{ displayResult.ltvGrowthFormatted }})</span>
          </td>
        </tr>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('revenue')"
              :class="{ 'roi-calc-active': activeTooltip === 'revenue' }"
            >
              Доп. выручка/мес.
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('revenue')" @mouseenter="hoverIcon = 'revenue'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'revenue' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">—</td>
          <td class="roi-calc-td roi-calc-highlight">₽{{ displayResult.additionalMonthlyRevenueFormatted }}</td>
        </tr>
        <tr>
          <td class="roi-calc-metric-cell">
            <span 
              class="roi-calc-metric-text" 
              @click="showTooltip('payback')"
              :class="{ 'roi-calc-active': activeTooltip === 'payback' }"
            >
              Окупаемость
            </span>
            <span class="roi-calc-info-icon roi-calc-info-icon-table" @click.stop="showTooltip('payback')" @mouseenter="hoverIcon = 'payback'" @mouseleave="hoverIcon = null" :class="{ hover: hoverIcon === 'payback' }">
              i
            </span>
          </td>
          <td class="roi-calc-td">—</td>
          <td class="roi-calc-td roi-calc-highlight">{{ displayResult.paybackSignals }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Остальной контент -->
  <div class="roi-calc-container roi-calc-content">
    <!-- Каждый Сигнал = возможность вернуть клиента -->
    <div class="roi-calc-signal-block">
      <h4 class="roi-calc-signal-title">Каждый Сигнал = возможность вернуть клиента:</h4>
      <ul class="roi-calc-signal-list">
        <li>✓ Недовольный отзыв в 2ГИС/Google до публикации</li>
        <li>✓ Жалоба в социальных сетях</li>
        <li>✓ Негативный комментарий о сервисе</li>
        <li>✓ Проблема с качеством продукта</li>
      </ul>
    </div>
    
    <!-- Почему кофейни особенные -->
    <div class="roi-calc-coffee-specifics">
      <h4 class="roi-calc-coffee-title">Почему кофейни особенные:</h4>
      <ul class="roi-calc-coffee-list">
        <li>✓ Выше базовая лояльность — люди привыкают к "своему" месту</li>
        <li>✓ Чаще посещения — кофе нужен каждый день</li>
        <li>✓ Сильнее влияние привычки и удобного расположения</li>
        <li>✓ Быстрее распространение сарафанного радио среди друзей</li>
      </ul>
    </div>
    
    <!-- Тултипы -->
    <transition name="roi-calc-tooltip">
      <div v-if="activeTooltip" class="roi-calc-tooltip-popup" @click="closeTooltip">
        <div class="roi-calc-tooltip-content" @click.stop>
          <h4 class="roi-calc-tooltip-title">{{ currentTooltip.title }}</h4>
          <div v-if="currentTooltip.formula" class="roi-calc-formula" v-html="currentTooltip.formula"></div>
          <p class="roi-calc-tooltip-desc" v-html="currentTooltip.description"></p>
        </div>
      </div>
    </transition>
    
    <!-- Все сигналы после 2-го = чистая прибыль -->
    <div class="roi-calc-payback-explanation">
      <h4 class="roi-calc-payback-title">Все сигналы после 2-го = чистая прибыль:</h4>
      <ul class="roi-calc-payback-list">
        <li>✓ Стоимость системы: от ₽30.000/мес</li>
        <li>✓ Средняя стоимость предотвращенного ухода: от ₽{{ dynamicPreventedLoss }}</li>
        <li>✓ Система окупается после {{ displayResult.paybackSignals }}</li>
      </ul>
    </div>
    
    <!-- Ключевые факторы успеха -->
    <div class="roi-calc-success-factors">
      <h4 class="roi-calc-success-title">Ключевые факторы успеха:</h4>
      <ul class="roi-calc-success-list">
        <li>✓ Время ответа на жалобу < 30 минут</li>
        <li>✓ Нематериальная компенсация</li>
        <li>✓ Персонализация предложений</li>
        <li>✓ Мониторинг качества сервиса</li>
      </ul>
    </div>
    
    <!-- Призыв к действию -->
    <div class="roi-calc-cta-block">
      <p class="roi-calc-cta-text"><strong>Главное:</strong> Система окупается мгновенно, а каждый месяц приносит стабильный рост выручки в ₽{{ dynamicRevenueMillion }}+ млн.</p>
      <p class="roi-calc-cta-text">Следующий шаг → <a href="https://cffx.ru/brew/membership.html" class="roi-calc-cta-link">Получить QR-код</a></p>
    </div>
    
    <!-- Предупреждение -->
    <div class="roi-calc-warning-block">
      <p class="roi-calc-warning-text"><strong>Важно:</strong> Результаты достигаются только при качественном внедрении Диалогов с Сигналами и обучении персонала. Показаны консервативные оценки на основе анализа 100+ кофеен.</p>
    </div>
    
    <!-- Дополнительная информация -->
    <div class="roi-calc-info-block">
      <p class="roi-calc-info-text">
        <strong>Как работает расчет:</strong> Диалоги с Сигналами помогают быстро решать проблемы гостей, 
        превращая потенциальные жалобы в возможности для повышения лояльности. 
        Довольные клиенты посещают кофейню чаще и приводят друзей.
      </p>
      <p class="roi-calc-info-text">
        <strong>Основа расчетов:</strong> Данные основаны на анализе 100+ кофеен. В расчет включены затраты на Диалоги с Сигналами (от ₽30.000/мес). Консервативные оценки гарантируют реалистичность прогнозов.
      </p>
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
  marginPercentage: 0.40               // маржинальность 40%
}

// Динамические значения для текстов
const dynamicRevenueMillion = computed(() => {
  if (!hasCalculated.value) return '1.4'
  
  const revenue = calculatedResult.value.additionalMonthlyRevenue || 1435000
  return (revenue / 1000000).toFixed(1)
})

// Динамическая стоимость предотвращенного ухода
const dynamicPreventedLoss = computed(() => {
  if (!hasCalculated.value) return '25.000'
  
  const ltvWith = calculatedResult.value.ltvWith || 35000
  // Стоимость предотвращенного ухода = 70% от LTV с системой
  const preventedLoss = Math.round(ltvWith * 0.7)
  return formatNumber(preventedLoss)
})

// Функция для генерации динамических тултипов
const generateDynamicTooltips = (guests, check) => {
  const loyal_without = guests * constants.loyaltyRateWithoutSystem
  const loyal_with = guests * constants.loyaltyRateWithSystem
  const loyal_increase = loyal_with - loyal_without
  const loyalty_percent = Math.round(((loyal_with - loyal_without) / loyal_without) * 100)
  
  const ltv_without = check * constants.frequencyWithoutSystem * constants.loyaltyPeriod
  const ltv_with = check * constants.frequencyWithSystem * constants.loyaltyPeriod
  
  const revenue_without = loyal_without * constants.frequencyWithoutSystem * check
  const revenue_with = loyal_with * constants.frequencyWithSystem * check
  const additional_revenue = revenue_with - revenue_without
  
  // Динамическая стоимость предотвращенного ухода
  const prevented_loss = Math.round(ltv_with * 0.7)
  
  const formatNum = (n) => new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(n)).replace(/\s/g, '.')

  return {
    guestsInput: {
      title: 'Количество гостей в месяц',
      description: 'Среднее количество уникальных посетителей вашей кофейни за месяц. Учитывайте только первичные визиты, без повторных посещений. Диапазон: 50-10,000 гостей/мес.'
    },
    averageCheckInput: {
      title: 'Средний чек',
      description: 'Средняя сумма одного заказа в вашей кофейне. Рассчитывается как общая выручка, деленная на количество заказов. Диапазон: 100-5,000 ₽.'
    },
    loyalGuests: {
      title: 'Прирост постоянных клиентов',
      formula: `${formatNum(guests)} × 42% = ${formatNum(loyal_without)}<br>${formatNum(guests)} × 65% = ${formatNum(loyal_with)}<br>${formatNum(loyal_with)} - ${formatNum(loyal_without)} = +${formatNum(loyal_increase)}`,
      description: `<strong>Без Сигнала:</strong> ${formatNum(guests)} × 42% = ${formatNum(loyal_without)} лояльных гостей<br>
                    <strong>С Сигналом:</strong> ${formatNum(guests)} × 65% = ${formatNum(loyal_with)} лояльных гостей<br>
                    <strong>Прирост:</strong> +${formatNum(loyal_increase)} гостей (+${loyalty_percent}%)<br><br>
                    Сигналы помогают удерживать недовольных клиентов, превращая их из потенциальных "уходящих" в лояльных постоянных гостей.`
    },
    frequency: {
      title: 'Как часто ходят лояльные гости',
      formula: `4 раз/мес → 7 раз/мес<br>7 - 4 = +3 раза<br>(3 ÷ 4) × 100% = +75%`,
      description: `<strong>Без системы:</strong> 4 раза в месяц (еженедельно)<br>
                    <strong>С системой:</strong> 7 раз в месяц (почти через день)<br><br>
                    Довольные клиенты, чьи проблемы быстро решаются, посещают кофейню чаще. Это эффект "сверхлояльности" после положительного разрешения конфликта.`
    },
    ltv: {
      title: 'Сколько денег приносит один лояльный гость',
      formula: `Без: ${check} × 4 × 10 = ₽${formatNum(ltv_without)}<br>С: ${check} × 7 × 10 = ₽${formatNum(ltv_with)}<br>Рост: ₽${formatNum(ltv_with)} - ₽${formatNum(ltv_without)} = +₽${formatNum(ltv_with - ltv_without)}`,
      description: `<strong>Формула:</strong> Средний чек × Частота × Период лояльности<br><br>
                    <strong>Без Сигнала:</strong><br>₽${check} × 4 раза/мес × 10 мес = ₽${formatNum(ltv_without)}<br><br>
                    <strong>С Сигналом:</strong><br>₽${check} × 7 раз/мес × 10 мес = ₽${formatNum(ltv_with)}<br><br>
                    LTV показывает полную ценность клиента за время его "дружбы" с кофейней.`
    },
    revenue: {
      title: 'Дополнительная выручка каждый месяц',
      formula: `${formatNum(loyal_without)} × 4 × ${check} = ₽${formatNum(revenue_without)}<br>${formatNum(loyal_with)} × 7 × ${check} = ₽${formatNum(revenue_with)}<br>₽${formatNum(revenue_with)} - ₽${formatNum(revenue_without)} = ₽${formatNum(additional_revenue)}`,
      description: `<strong>Выручка без системы:</strong><br>
                    ${formatNum(loyal_without)} лояльных × 4 раза/мес × ₽${check} = ₽${formatNum(revenue_without)}<br><br>
                    <strong>Выручка с системой:</strong><br>
                    ${formatNum(loyal_with)} лояльных × 7 раз/мес × ₽${check} = ₽${formatNum(revenue_with)}<br><br>
                    <strong>Прирост выручки:</strong> ₽${formatNum(additional_revenue)}/мес<br><br>
                    Это разница между текущим состоянием и ожидаемым результатом при внедрении системы Сигналов.`
    },
    payback: {
      title: 'Мгновенная окупаемость системы',
      formula: `₽30.000 ÷ ₽${formatNum(prevented_loss)} = ${(30000/prevented_loss).toFixed(1)}<br>Округляем: 1-2 сигнала`,
      description: `<strong>Стоимость системы:</strong> от ₽30.000/мес<br>
                    <strong>Средние потери от ухода клиента:</strong> от ₽${formatNum(prevented_loss)}<br><br>
                    <strong>Окупаемость:</strong> ₽30.000 ÷ ₽${formatNum(prevented_loss)} = ${(30000/prevented_loss).toFixed(1)} сигнала<br><br>
                    <strong>Что входит в потери ₽${formatNum(prevented_loss)}:</strong><br>
                    ✓ LTV ушедшего клиента: ₽${formatNum(ltv_with)} за 10 мес<br>
                    ✓ Негативные отзывы отпугивают 2-3 новых клиентов<br>
                    ✓ Потеря сарафанного радио и рекомендаций<br><br>
                    <strong>Вывод:</strong> После 2-го предотвращенного ухода все остальные сигналы приносят чистую прибыль!`
    }
  }
}

// Вычисляемое свойство для текущего тултипа
const currentTooltip = computed(() => {
  if (!activeTooltip.value) return { title: '', description: '', formula: '' }
  
  const tooltips = generateDynamicTooltips(guestsNum.value || 1000, averageCheckNum.value || 500)
  return tooltips[activeTooltip.value] || { title: '', description: '', formula: '' }
})

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
}).format(Math.round(n)).replace(/\s/g, '.')

// Исправленная функция расчета по новому методу
function calculateROI(monthlyGuests, averageCheck) {
  // Базовые показатели
  const loyalWithout = monthlyGuests * constants.loyaltyRateWithoutSystem
  const loyalWith = monthlyGuests * constants.loyaltyRateWithSystem
  const loyalIncrease = loyalWith - loyalWithout
  
  // Выручка по состояниям (ИСПРАВЛЕНО)
  const revenueWithout = loyalWithout * constants.frequencyWithoutSystem * averageCheck
  const revenueWith = loyalWith * constants.frequencyWithSystem * averageCheck
  const additionalRevenue = revenueWith - revenueWithout
  
  // LTV расчеты
  const ltvWithout = averageCheck * constants.frequencyWithoutSystem * constants.loyaltyPeriod
  const ltvWith = averageCheck * constants.frequencyWithSystem * constants.loyaltyPeriod
  
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
    ltvGrowth: ltvWith - ltvWithout,
    additionalMonthlyRevenue: Math.round(additionalRevenue),
    paybackSignals: `${paybackSignals-1}-${paybackSignals} сигнала`
  }
}

// Дефолтные значения для отображения
const defaultResult = {
  loyalWithout: '420',
  loyalIncrease: '+230 гостей',
  loyaltyGrowthDisplay: '+55%',
  frequencyWithout: '4',
  frequencyWith: '7 раз/мес',
  frequencyGrowthDisplay: '+75%',
  ltvWithoutFormatted: '20.000',
  ltvWithFormatted: '35.000',
  ltvGrowthFormatted: '15.000',
  additionalMonthlyRevenueFormatted: '1.435.000',
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
/* БАЗОВЫЕ СТИЛИ КОМПОНЕНТА - остальное в custom.css */
.roi-calc-container { 
  margin: 0 auto 20px; 
  padding: 24px; 
  background: #1e1e1e !important; 
  border: 1px solid #2b2b2b !important; 
  border-radius: 12px; 
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); 
  color: #ffffff !important; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
}

.roi-calc-container.roi-calc-content {
  margin-top: 0;
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
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
  border: none !important;
  outline: none !important;
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

/* ЗАГОЛОВОК */
.roi-calc-header {
  margin: 0 0 20px 0;
  padding: 0;
}

.roi-calc-title {
  margin: 0;
  padding: 16px 0;
  font: 600 18px/1.3 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-align: center;
  color: #c5f946 !important;
}

.roi-calc-title-mobile {
  display: none;
}

/* ТАБЛИЦА */
.roi-calc-table-container {
  margin: 0 0 20px 0;
  padding: 0;
  border-radius: 8px;
  border: 1px solid #2b2b2b;
}

.roi-calc-table {
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: separate;
  border-spacing: 0;
  background: #141414 !important;
  border: none !important;
}

.roi-calc-th {
  padding: 12px 16px;
  font: 600 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #c5f946 !important;
  background: #1a1a1a !important;
  text-align: left;
  border: none !important;
  border-bottom: 1px solid #2b2b2b !important;
  white-space: nowrap;
}

.roi-calc-th:nth-child(1) { width: 45%; }
.roi-calc-th:nth-child(2) { width: 27.5%; }
.roi-calc-th:nth-child(3) { width: 27.5%; }

.roi-calc-td {
  padding: 12px 16px;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
  border: none !important;
  border-bottom: 1px solid #2b2b2b !important;
  white-space: nowrap;
}

.roi-calc-table tr:last-child .roi-calc-td,
.roi-calc-table tr:last-child .roi-calc-metric-cell {
  border-bottom: none !important;
}

.roi-calc-metric-cell {
  padding: 12px 16px;
  font: 500 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff !important;
  border: none !important;
  border-bottom: 1px solid #2b2b2b !important;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: transparent !important;
}

.roi-calc-metric-text {
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  flex: 1;
  border: none !important;
  outline: none !important;
  background: transparent !important;
}

.roi-calc-metric-text:hover {
  color: rgba(197, 249, 70, 0.8) !important;
}

.roi-calc-metric-text.roi-calc-active {
  color: #c5f946 !important;
}

.roi-calc-highlight {
  color: #c5f946 !important;
  font-weight: 600;
}

.roi-calc-growth-secondary {
  color: #888888 !important;
  font-weight: 400;
  font-size: 0.9em;
}

/* БЛОКИ КОНТЕНТА */
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

/* ТУЛТИПЫ */
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

.roi-calc-formula {
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

/* АНИМАЦИИ */
.roi-calc-tooltip-enter-active, .roi-calc-tooltip-leave-active {
  transition: opacity 0.25s;
}

.roi-calc-tooltip-enter-from, .roi-calc-tooltip-leave-to {
  opacity: 0;
}

/* АДАПТИВНОСТЬ - базовые правила, остальное в custom.css */
@media(max-width: 768px) {
  .roi-calc-container {
    padding: 16px;
  }
  
  .roi-calc-input-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .roi-calc-title-desktop {
    display: none;
  }
  
  .roi-calc-title-mobile {
    display: block;
    font-size: 16px;
  }
}

@media(min-width: 769px) {
  .roi-calc-title-mobile {
    display: none;
  }
  
  .roi-calc-title-desktop {
    display: block;
  }
}
</style>
