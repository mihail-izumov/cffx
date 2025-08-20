<!-- PriceCalculator.vue • полностью исправленный компонент -->
<template>
  <div class="calculator">
    <h2>КАЛЬКУЛЯТОР «ЦЕНА БЕЗДЕЙСТВИЯ»</h2>

    <!-- Выбор кофейни -->
    <div class="input-group">
      <label for="cafeSelect">Выберите кофейню:</label>
      <select id="cafeSelect" v-model="selectedCafeId" @change="resultShown = false">
        <option value="">Выбрать</option>
        <option v-for="cafe in cafes" :key="cafe.id" :value="cafe.id">
          {{ cafe.name }}
        </option>
      </select>
    </div>

    <!-- Ввод выручки -->
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

    <!-- Результат -->
    <transition name="fade">
      <div v-if="resultShown" class="result">
        <h3>{{ result.name }} (Индекс {{ result.index }})</h3>

        <p><strong>Потенциал роста:</strong>&nbsp;
           <span class="highlight">{{ format(result.total) }} ₽</span> в год (+{{ result.percent }}%)
        </p>

        <p>
          <strong>На каждую точку ({{ result.points }}):</strong>&nbsp;
          <span class="highlight">{{ format(result.perPoint) }} ₽/год</span>
        </p>

        <p><strong>Время на захват:</strong> {{ result.months }} мес. с BREW | 30 000 ₽/мес.</p>
        <p><strong>Целевые конкуренты:</strong> {{ result.competitors }}</p>
        <p><strong>Сигнал:</strong> {{ result.signal }}</p>
        <p><strong>Решение:</strong> {{ result.solution }}</p>
        <p><strong>Обоснование роста:</strong> {{ result.reasoning }}</p>

        <h4>Почему всё получится:</h4>
        <ul class="why-list">
          <li>Системная аналитика устраняет «слепые зоны» (+5–8 %)</li>
          <li>Оптимизация ценообразования (+3–5 %)</li>
          <li>Бенчмаркинг процессов (+4–6 %)</li>
          <li>Стратегическое планирование (+3–4 %)</li>
          <li>Раннее предупреждение о конкурентах (+2–3 %)</li>
        </ul>
        <p><strong>Итого математически:</strong> 17–26 % обоснованного роста</p>

        <p><strong>Ключевой вопрос:</strong> {{ result.keyQuestion }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* ---------- 18 кофеен ---------- */
const cafes = ref([
  /* … полный массив, как в предыдущем сообщении … */
])

/* ---------- состояния ---------- */
const selectedCafeId = ref('')
const revenueStr     = ref('')
const resultShown    = ref(false)
const result         = ref({})

/* ---------- ввод выручки ---------- */
function onRevenueInput (e) {
  const digits = e.target.value.replace(/\D/g, '')
  revenueStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  resultShown.value = false
}
const revenueNum = computed(() => Number(revenueStr.value.replace(/\s|,/g, '')))

/* ---------- расчёты ---------- */
const W = { potential:.25, stage:.20, innovation:.25, influence:.20, type:.10 }

const canCalculate = computed(() => selectedCafeId.value && revenueNum.value >= 100000)

function calcIQ(p,s,i,v,t){
  return W.potential*p/25 + W.stage*s/20 + W.innovation*i/25 + W.influence*v/20 + W.type*t/10
}
function priceOfInaction(Wm, cafe){
  const IQ   = calcIQ(cafe.potential,cafe.stage,cafe.innovation,cafe.influence,cafe.type)
  const base = Wm * IQ * cafe.K * 0.25 * cafe.points
  return Math.round(base * cafe.scaleFactor)
}
function timeToCapture(iq, K){
  const raw = 6 * (1 - Math.min(iq * (K/10), .9))
  return Math.max(1, Math.round(raw))
}
function format(n){ return new Intl.NumberFormat('ru-RU').format(n) }

function calculate(){
  const cafe = cafes.value.find(c => c.id === Number(selectedCafeId.value))
  if(!cafe) return

  const iq   = calcIQ(cafe.potential,cafe.stage,cafe.innovation,cafe.influence,cafe.type)
  const tot  = priceOfInaction(revenueNum.value, cafe)
  const per  = tot / cafe.points
  const pct  = Math.round(tot / (revenueNum.value * cafe.points * 12) * 100)

  result.value = {
    name      : cafe.name,
    index     : cafe.index,
    total     : tot,
    perPoint  : per,
    months    : timeToCapture(iq, cafe.K),
    percent   : pct,
    points    : cafe.points,              // ← нужно для «(N)»
    competitors: cafe.competitors,
    signal    : cafe.signal,
    solution  : cafe.solution,
    reasoning : cafe.reasoning,
    keyQuestion: cafe.keyQuestion
  }
  resultShown.value = true
}
</script>

<style scoped>
:root{
  --bg-soft      : var(--vp-c-bg-soft , #f7f7f7);
  --bg-base      : var(--vp-c-bg      , #ffffff);
  --bg-alt       : var(--vp-c-bg-alt  , #ffffff);
  --border-color : var(--vp-c-border  , #d8d8d8);
  --text-main    : var(--vp-c-text-1  , #2c3e50);
  --text-fade    : var(--vp-c-text-3  , #9ca3af);
}

/* контейнер */
.calculator{
  max-width:720px;margin:24px auto;padding:24px;
  background:var(--bg-soft);border:1px solid var(--border-color);
  border-radius:12px;color:var(--text-main);
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
}
/* заголовок */
h2{margin:0 0 32px;text-align:center;font-size:28px;font-weight:700;}
/* ввод */
.input-group{margin-bottom:20px;}
label{display:block;margin-bottom:8px;font-weight:600;}
select,input{
  width:100%;padding:12px 16px;font-size:16px;
  background:var(--bg-base);color:var(--text-main);
  border:2px solid var(--border-color);border-radius:8px;
  transition:border-color .3s;
}
select:focus,input:focus{outline:none;border-color:#2c3e50}
/* кнопка */
.btn-calc{
  width:100%;padding:16px 0;margin:32px 0 24px;font-size:20px;
  font-weight:700;text-transform:uppercase;color:#fff;
  background:linear-gradient(135deg,#e74c3c,#c0392b);
  border:none;border-radius:8px;cursor:pointer;transition:all .2s;
}
.btn-calc:disabled{background:var(--text-fade);cursor:not-allowed;}
.btn-calc:hover:not(:disabled){
  background:linear-gradient(135deg,#c0392b,#a93226);transform:translateY(-2px);
}
/* результат */
.result{
  padding:24px;background:var(--bg-alt);
  border:2px solid #2c3e50;border-radius:12px;
  box-shadow:0 8px 30px rgba(44,62,80,.1);
}
.result h3{
  margin:0 0 20px;text-align:center;font-size:26px;font-weight:700;
  border-bottom:2px solid #e74c3c;padding-bottom:12px;
}
.result p{margin:12px 0;font-size:16px;line-height:1.6;}
.highlight{color:#e74c3c;font-weight:700;font-size:18px;}
.why-list{margin:12px 0 0 16px;list-style:disc;}
.why-list li{margin:4px 0;}
/* анимация */
.fade-enter-active,.fade-leave-active{transition:all .5s;}
.fade-enter-from{opacity:0;transform:translateY(20px);}
.fade-leave-to{opacity:0;transform:translateY(-20px);}
/* мобилка */
@media(max-width:768px){
  .calculator{padding:16px;margin:16px;}h2{font-size:24px;}
  .result h3{font-size:22px;}.result p{font-size:15px;}
}
</style>
