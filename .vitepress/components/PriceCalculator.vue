<!-- PriceCalculator.vue • компонент для VitePress v4.3 -->
<template>
  <div class="calculator">
    <!-- Ввод данных -->
    <div class="input-group">
      <label for="cafeSelect">Выберите кофейню:</label>
      <select id="cafeSelect" v-model="selectedCafeId" @change="reset">
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

    <button class="btn-calc" :disabled="!canCalc" @click="calculate">
      РАССЧИТАТЬ
    </button>

    <!-- Результат -->
    <transition name="fade">
      <div v-if="shown" class="result">
        <h2>{{ r.name }} (Индекс {{ r.index }})</h2>

        <p><strong>Потенциал роста:</strong> {{ fmt(r.total) }} ₽ в год (+{{ r.percent }}%)</p>
        <p><strong>На каждую точку ({{ r.points }}):</strong> {{ fmt(r.perPoint) }} ₽/год</p>
        <p><strong>Время на захват:</strong> {{ r.months }} мес. с BREW | 30 000 ₽/мес.</p>
        <p><strong>Целевые конкуренты:</strong> {{ r.competitors }}</p>
        <p><strong>Сигнал:</strong> {{ r.signal }}</p>
        <p><strong>Решение:</strong> {{ r.solution }}</p>
        <p><strong>Обоснование роста:</strong> {{ r.reasoning }}</p>
        <p><strong>Ключевой вопрос:</strong> {{ r.keyQuestion }}</p>

        <!-- Выпадающий блок -->
        <details class="expandable-section">
          <summary><strong>Почему&nbsp;всё&nbsp;получится</strong></summary>
          <ul>
            <li>Системная аналитика устраняет «слепые зоны» в управлении (+5–8 %)</li>
            <li>Оптимизация ценообразования на основе конкурентного анализа (+3–5 %)</li>
            <li>Улучшение операционных процессов через бенчмаркинг (+4–6 %)</li>
            <li>Стратегическое планирование вместо реактивного управления (+3–4 %)</li>
            <li>Защита от конкурентов через раннее предупреждение (+2–3 %)</li>
          </ul>
          <p><strong>Итого математически: 17–26 % обоснованного роста</strong></p>
        </details>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* ------------------- данные кофеен ------------------- */
const cafes = ref([
  /* ... JSON-массив из инструкции (18 объектов) ... */
])

/* ---------------- состояние ---------------- */
const selectedCafeId = ref('')
const revenueStr     = ref('')
const shown          = ref(false)
const r              = ref({})

/* ---------------- ввод выручки ---------------- */
function onRevenueInput (e) {
  const digits = e.target.value.replace(/\D/g, '')
  revenueStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  shown.value = false
}
const revenueNum = computed(() => Number(revenueStr.value.replace(/\s|,/g, '')))

/* ---------------- алгоритм v4.3 ---------------- */
const W  = { potential:.25, stage:.20, innovation:.25, influence:.20, type:.10 }

function calcIQ (p,s,i,v,t) {
  return W.potential*p/25 + W.stage*s/20 + W.innovation*i/25 + W.influence*v/20 + W.type*t/10
}
function priceOfInaction (rev, cafe) {
  const IQ  = calcIQ(cafe.potential, cafe.stage, cafe.innovation, cafe.influence, cafe.type)
  const base = rev * IQ * cafe.K * 0.25 * cafe.points
  return Math.round(base * cafe.scaleFactor)
}
function monthsToCapture (IQ, K) {
  const m = 6 * (1 - Math.min(IQ * K / 10, .9))
  return Math.max(1, Math.round(m))
}
function fmt (n) { return new Intl.NumberFormat('ru-RU').format(n) }

const canCalc = computed(() => selectedCafeId.value && revenueNum.value >= 100000)

/* ---------------- расчёт ---------------- */
function reset () { shown.value = false }
function calculate () {
  const cafe = cafes.value.find(c => c.id === +selectedCafeId.value)
  if (!cafe) return

  const IQ      = calcIQ(cafe.potential, cafe.stage, cafe.innovation, cafe.influence, cafe.type)
  const total   = priceOfInaction(revenueNum.value, cafe)
  const perPt   = total / cafe.points
  const percent = Math.round(total / (revenueNum.value * cafe.points * 12) * 100)
  const months  = monthsToCapture(IQ, cafe.K)

  r.value = {
    ...cafe,
    total,
    perPoint : perPt,
    percent,
    months
  }
  shown.value = true
}
</script>

<style scoped>
/* --------- базовый контейнер --------- */
.calculator {
  max-width: 720px;
  margin: 24px auto;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
}

/* --------- элементы ввода --------- */
.input-group { margin-bottom: 20px; }
label { display:block;margin-bottom:8px;font-weight:600;color:var(--vp-c-text-1); }

select,input {
  width:100%;padding:12px 16px;font-size:16px;
  background:var(--vp-c-bg);color:var(--vp-c-text-1);
  border:2px solid var(--vp-c-border);border-radius:8px;
  transition:border-color .3s;
}
select:focus,input:focus{outline:none;border-color:#2C3E50}

/* --------- кнопка --------- */
.btn-calc{
  width:100%;padding:16px 0;margin:32px 0 24px;
  font-size:20px;font-weight:700;text-transform:uppercase;
  color:#fff;background:linear-gradient(135deg,#E74C3C,#C0392B);
  border:none;border-radius:8px;cursor:pointer;transition:all .3s;
}
.btn-calc:disabled{background:var(--vp-c-text-3);cursor:not-allowed;}
.btn-calc:hover:not(:disabled){
  background:linear-gradient(135deg,#C0392B,#A93226);transform:translateY(-2px);
}

/* --------- результат --------- */
.result{
  padding:24px;background:var(--vp-c-bg-alt);
  border:2px solid #2C3E50;border-radius:12px;
  box-shadow:0 8px 30px rgba(44,62,80,.1);
}
.result h2{
  margin:0 0 20px;font-size:26px;font-weight:700;text-align:center;color:#2C3E50;
  border-bottom:2px solid #E74C3C;padding-bottom:12px;
}
.result p{margin:12px 0;font-size:16px;line-height:1.6;}
/* выделяем цифры */
.result p strong+span,
.result p .highlight{color:#E74C3C;font-weight:700;font-size:18px;}

/* --------- expandable block --------- */
.expandable-section{
  margin-top:15px;border:1px solid #444;border-radius:5px;padding:10px;
}
.expandable-section summary{
  cursor:pointer;padding:5px;font-weight:bold;
}
.expandable-section summary:hover{
  background:#2C3E50;color:#fff;
}
.expandable-section ul{margin:10px 0 0 18px;}
.expandable-section li{margin:4px 0;}

/* анимация */
.fade-enter-active,.fade-leave-active{transition:all .5s;}
.fade-enter-from{opacity:0;transform:translateY(20px);}
.fade-leave-to{opacity:0;transform:translateY(-20px);}

/* мобильная адаптация */
@media(max-width:768px){
  .calculator{padding:16px;margin:16px;}
  .result h2{font-size:22px;}
  .result p {font-size:15px;}
}
</style>
