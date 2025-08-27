<template>
  <div class="calculator-card">
    <!-- Поля ввода -->
    <div class="input-group">
      <label for="cafeSelect">Выберите кофейню:</label>
      <select id="cafeSelect" v-model="selectedCafeId" @change="resultShown = false">
        <option value="">Выбрать</option>
        <option v-for="cafe in cafes" :key="cafe.id" :value="cafe.id">
          {{ cafe.name }}
        </option>
      </select>
    </div>
    <div class="input-group">
      <label for="revenueInput">Выручка точка/мес. (сред. ₽):</label>
      <input
        id="revenueInput"
        type="text"
        :value="revenueStr"
        placeholder="например, 1,200,000"
        @input="onRevenueInput"
      />
    </div>
    <button class="btn-calc" :disabled="!canCalculate" @click="calculate">
      РАССЧИТАТЬ
    </button>
    <!-- Блок результата -->
    <transition name="fade">
      <div v-if="resultShown" class="result">
        <h3 class="result-title">{{ result.name }} (Индекс {{ result.index }})</h3>
        <!-- Блок 1: Основные показатели -->
        <div class="result-block">
          <p><strong>Потенциал роста:</strong>&nbsp;<span class="highlight">{{ format(result.total) }} ₽</span> в год (+{{ result.percent }}%)</p>
          <p><strong>На каждую точку ({{ result.points }}):</strong>&nbsp;<span class="highlight">{{ format(result.perPoint) }} ₽/год</span></p>
          <p><strong>Время на захват:</strong>&nbsp;{{ result.months }} мес. с BREW | 30 000 ₽/мес.</p>
        </div>
        <!-- Блок 2: Анализ конкуренции -->
        <div class="result-block">
          <p><strong>Целевые конкуренты:</strong>&nbsp;{{ result.competitors }}</p>
          <p><strong>Сигнал:</strong>&nbsp;{{ result.signal }}</p>
          <p><strong>Решение:</strong>&nbsp;{{ result.solution }}</p>
        </div>
        <!-- Блок 3: Обоснование -->
        <div class="result-block">
          <p><strong>Обоснование роста:</strong>&nbsp;{{ result.reasoning }}</p>
          <p>
            <strong>Ключевой вопрос:</strong>&nbsp;
            <span>{{ result.keyQuestion.prefix }}&nbsp;</span>
            <span v-if="result.keyQuestion.status" class="badge-status">
              {{ result.keyQuestion.status }}
            </span>
            <span>{{ result.keyQuestion.suffix }}</span>
          </p>
        </div>
        <!-- "Почему всё получится" -->
        <details class="why-section">
          <summary class="why-summary">Почему всё получится</summary>
          <div class="why-content">
            <ul class="why-list">
              <li>Системная аналитика устраняет «слепые зоны» (+5–8 %)</li>
              <li>Оптимизация ценообразования (+3–5 %)</li>
              <li>Бенчмаркинг процессов (+4–6 %)</li>
              <li>Стратегическое планирование (+3–4 %)</li>
              <li>Раннее предупреждение о конкурентах (+2–3 %)</li>
            </ul>
            <p class="why-total">Итого: 17–26 % обоснованного роста</p>
          </div>
        </details>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const cafes = ref([
  { id: 1, name: 'Balance coffee', index: 40, points: 1, reviews: 147, potential: 14, stage: 15, innovation: 14, influence: 11, type: 5, K: 3.0, scaleFactor: 5.7, reasoning: 'Стартап с низким индексом — огромный потенциал базовых улучшений', signal: '1 точка и индекс 40 — разрыв между достижениями и признанием', solution: 'Системное усиление всех параметров индекса', keyQuestion: { prefix: 'Почему, имея 147+ отзывов, вы не достигли статуса', status: 'Растущий 📈', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 2, name: 'Bonfix', index: 45, points: 2, reviews: 143, potential: 15, stage: 15, innovation: 14, influence: 10, type: 5, K: 3.0, scaleFactor: 5.7, reasoning: 'Малая сеть может быстро масштабировать лучшие практики', signal: '2 точки и индекс 45 — разрыв между возможностями и признанием', solution: 'Системное усиление всех параметров индекса', keyQuestion: { prefix: 'Почему, имея 143+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  // ...оставьте остальные точки без изменений...
])
const selectedCafeId = ref('')
const revenueStr     = ref('')
const resultShown    = ref(false)
const result         = ref({})

function onRevenueInput (e) {
  const digits = e.target.value.replace(/\D/g, '')
  revenueStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  resultShown.value = false
}
const revenueNum = computed(() => Number(revenueStr.value.replace(/\s|,/g, '')))
const W = { potential: .25, stage: .20, innovation: .25, influence: .20, type: .10 }
const canCalculate = computed(() => selectedCafeId.value && revenueNum.value >= 100000)

function calcIQ (c) {
  return W.potential  * c.potential  / 25 +
         W.stage      * c.stage      / 20 +
         W.innovation * c.innovation / 25 +
         W.influence  * c.influence  / 20 +
         W.type       * c.type       / 10
}
function priceOfInaction (w, cafe) {
  const base = w * calcIQ(cafe) * cafe.K * 0.25 * cafe.points
  return Math.round(base * cafe.scaleFactor)
}
function timeToCapture (iq, K) {
  const months = 6 * (1 - Math.min(iq * (K / 10), 0.9))
  return Math.max(1, Math.round(months))
}
const format = (n) => new Intl.NumberFormat('ru-RU').format(Math.round(n))
function calculate () {
  const cafe = cafes.value.find(c => c.id === Number(selectedCafeId.value))
  if (!cafe) return
  const iq      = calcIQ(cafe)
  const total   = priceOfInaction(revenueNum.value, cafe)
  const perPoint = total / cafe.points
  const percent = Math.round((total / (revenueNum.value * cafe.points * 12)) * 100)
  result.value = {
    ...cafe,
    total,
    perPoint,
    percent,
    months: timeToCapture(iq, cafe.K)
  }
  resultShown.value = true
}
</script>

<style scoped>
.calculator-card{
  width:100%;
  max-width:720px;
  margin:0 auto 32px;
  padding:20px 24px;
  background:#1e1e1e !important;
  border:1px solid #2b2b2b !important;
  border-radius:12px;
  box-shadow:0 4px 16px rgba(0,0,0,.25);
  color:#ffffff !important;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}
.input-group{margin-bottom:16px}
label{
  display:block;
  margin-bottom:6px;
  font:600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  color:#ffffff !important;
}
select,
input{
  width:100%;
  height:44px;
  padding:0 14px;
  font:500 15px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  background:#141414 !important;
  border:1px solid #333333 !important;
  border-radius:8px;
  color:#ffffff !important;
  transition:border-color .25s ease;
}
select:focus,input:focus{
  border-color:#C5F946 !important;
  outline:0;
}
input::placeholder{color:#888888 !important;}
select option{
  background:#141414 !important;
  color:#ffffff !important;
}
.btn-calc{
  width:100%;
  height:44px;
  margin-top:12px;
  font:700 16px/44px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  text-transform:uppercase;
  color:#000000 !important;
  background:#C5F946 !important;
  border:none;
  border-radius:8px;
  cursor:pointer;
  transition:background .2s,transform .2s;
}
.btn-calc:disabled{
  background:#555555 !important;
  color:#cccccc !important;
  cursor:not-allowed;
}
.btn-calc:not(:disabled):hover{
  background:#347b6c !important;
  color:#ffffff !important;
  transform:translateY(-2px);
}
.result{
  margin-top:20px;
  padding:20px;
  background:#141414 !important;
  border:1px solid #2b2b2b !important;
  border-radius:10px;
}
.result-title{
  margin:0 0 20px;
  font:600 18px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  text-align:center;
  color:#C5F946 !important;
}
.result-block{
  margin:0 0 16px;
  padding:12px 16px;
  background:#1a1a1a !important;
  border:1px solid #2b2b2b !important;
  border-radius:8px;
}
.result-block:last-of-type{margin-bottom:20px}
.result-block p{
  margin:8px 0;
  font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  color:#ffffff !important;
}
.result-block p:first-child{margin-top:0}
.result-block p:last-child{margin-bottom:0}
.highlight{
  color:#C5F946 !important;
  font-weight:600;
}
.badge-status{
  display:inline-block;
  background:#347b6c !important;
  color:#d0f0d0 !important;
  border-radius:50px;
  padding:2px 8px;
  font-size:0.85em;
  white-space:nowrap;
  vertical-align:baseline;
  margin:0 2px;
}

/* ---------- ПРОБЛЕМНЫЙ БЛОК. Новый полностью ---------- */
.why-section {
  overflow: hidden;
  margin: 0;
  border-radius: 8px;
  background: #347b6c !important;
}
.why-summary {
  display: block;
  position: relative;
  padding: 14px 16px;
  margin: 0;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont,'Segoe UI',sans-serif;
  color: #fff !important;
  cursor: pointer;
  user-select: none !important;
  outline: none !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
  -webkit-touch-callout: none !important;
}
.why-summary:focus,
.why-summary:active,
.why-summary:hover {
  outline: none !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}
.why-summary::-webkit-details-marker { display: none !important; }
.why-summary::-moz-focus-inner { border: 0 !important; padding: 0 !important; outline: none !important; }
.why-summary::selection { background: transparent !important; }
.why-summary::-moz-selection { background: transparent !important; }
.why-summary::before {
  content: '';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #ffffff;
  transition: transform 0.3s ease;
}
.why-section[open] > .why-summary::before {
  transform: translateY(-50%) rotate(180deg);
}
.why-content {
  padding: 8px 16px 18px;
  background: #347b6c !important;
}
.why-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 12px 0 !important;
}
.why-list li {
  position: relative;
  padding-left: 18px;
  margin: 3px 0;
  font: 400 14px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  color: #ffffff !important;
  list-style: none !important;
}
.why-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1.2em;
  line-height: 1;
  color: #ffffff;
}
.why-total {
  margin: 0;
  padding: 8px 0 0;
  font: 600 14px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  color: #ffffff !important;
  text-align: left;
}

/* ---------- АДАПТИВНОСТЬ ---------- */
@media(max-width:768px){
  .calculator-card{padding:16px 18px;margin-bottom:24px}
  select,input{height:38px;font-size:14px;line-height:38px}
  .btn-calc{height:40px;font-size:15px;line-height:40px}
  .result{padding:16px}
  .result-title{font-size:16px}
  .result-block{padding:10px 12px}
  .result-block p{font-size:13px}
  .why-summary{font-size:15px;padding:12px 14px}
  .why-list li{font-size:13px}
  .why-total{font-size:13px}
  .badge-status{font-size:0.8em;padding:1px 6px}
}
</style>
