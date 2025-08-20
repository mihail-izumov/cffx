<!-- PriceCalculator.vue -->
<template>
  <div class="calculator">
    <!-- поля ввода -->
    <div class="input-group">
      <label for="cafeSelect">Выберите кофейню:</label>
      <select id="cafeSelect" v-model="selectedCafeId" @change="shown=false">
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

    <!-- результат -->
    <transition name="fade">
      <div v-if="shown" class="result">
        <h2>{{ res.name }} (Индекс {{ res.index }})</h2>

        <p><strong>Потенциал роста:</strong> {{ fmt(res.total) }} ₽ в год (+{{ res.percent }}%)</p>
        <p><strong>На каждую точку ({{ res.points }}):</strong> {{ fmt(res.perPoint) }} ₽/год</p>
        <p><strong>Время на захват:</strong> {{ res.months }} мес. с BREW | 30 000 ₽/мес.</p>
        <p><strong>Целевые конкуренты:</strong> {{ res.competitors }}</p>
        <p><strong>Сигнал:</strong> {{ res.signal }}</p>
        <p><strong>Решение:</strong> {{ res.solution }}</p>
        <p><strong>Обоснование роста:</strong> {{ res.reasoning }}</p>
        <p><strong>Ключевой вопрос:</strong> {{ res.keyQuestion }}</p>

        <details class="expandable-section">
          <summary><strong>Почему&nbsp;всё&nbsp;получится</strong></summary>
          <ul>
            <li>Системная аналитика устраняет «слепые зоны» (+5–8 %)</li>
            <li>Оптимизация ценообразования (+3–5 %)</li>
            <li>Бенчмаркинг процессов (+4–6 %)</li>
            <li>Стратегическое планирование (+3–4 %)</li>
            <li>Раннее предупреждение о конкурентах (+2–3 %)</li>
          </ul>
          <p><strong>Итого математически: 17–26 % обоснованного роста</strong></p>
        </details>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* ---------- ПОЛНЫЙ СПИСОК 18 КОФЕЕН ---------- */
const cafes = ref([
  {
    id: 1,
    name: 'Balance coffee',
    index: 40,
    points: 1,
    reviews: 147,
    potential: 14,
    stage: 15,
    innovation: 14,
    influence: 11,
    type: 5,
    K: 3.0,
    scaleFactor: 5.7,
    reasoning: 'Стартап с низким индексом…',
    signal: '1 точка и индекс 40…',
    solution: 'Системное усиление…',
    keyQuestion: 'Почему, имея 147+ отзывов…?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +'
  },
  {
    id: 2,
    name: 'Bonfix',
    index: 45,
    points: 2,
    reviews: 143,
    potential: 15,
    stage: 15,
    innovation: 14,
    influence: 10,
    type: 5,
    K: 3.0,
    scaleFactor: 5.7,
    reasoning: 'Малая сеть…',
    signal: '2 точки и индекс 45…',
    solution: 'Системное усиление…',
    keyQuestion: 'Почему, имея 143+ отзывов…?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +'
  },
  /* … остальные 16 объектов из инструкции v4.3 … */
])

/* ---------- реактивные переменные ---------- */
const selectedCafeId = ref('')
const revenueStr     = ref('')
const shown          = ref(false)
const res            = ref({})

/* ---------- форматирование ввода ---------- */
function onRevenueInput (e) {
  const digits = e.target.value.replace(/\D/g, '')
  revenueStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  shown.value = false
}
const revenueNum = computed(() => Number(revenueStr.value.replace(/\s|,/g, '')))

/* ---------- расчёт v4.3 ---------- */
const W = { potential:.25, stage:.20, innovation:.25, influence:.20, type:.10 }
function IQ (c) {
  return W.potential*c.potential/25 + W.stage*c.stage/20 +
         W.innovation*c.innovation/25 + W.influence*c.influence/20 +
         W.type*c.type/10
}
function price (rev, cafe) {
  const base = rev * IQ(cafe) * cafe.K * 0.25 * cafe.points
  return Math.round(base * cafe.scaleFactor)
}
function months (iq, K) {
  return Math.max(1, Math.round(6 * (1 - Math.min(iq * K / 10, .9))))
}
function fmt (n) { return new Intl.NumberFormat('ru-RU').format(n) }

const canCalc = computed(() => selectedCafeId.value && revenueNum.value >= 100000)

/* ---------- запуск расчёта ---------- */
function calculate () {
  const cafe = cafes.value.find(c => c.id === Number(selectedCafeId.value))
  if (!cafe) return

  const iq      = IQ(cafe)
  const total   = price(revenueNum.value, cafe)
  const perPt   = total / cafe.points
  const percent = Math.round(total / (revenueNum.value * cafe.points * 12) * 100)

  res.value = {
    ...cafe,
    total,
    perPoint: perPt,
    percent,
    months : months(iq, cafe.K)
  }
  shown.value = true
}
</script>

<style scoped>
/* те же стили, что и в предыдущей версии (не изменялись) */
</style>
