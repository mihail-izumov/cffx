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
      РАССЧИТАТЬ [+₽↑]
    </button>
    <!-- Блок результата -->
    <transition name="fade">
      <div v-if="resultShown" class="result">
        <h3 class="result-title">{{ result.name }} (Индекс {{ result.index }})</h3>
        <!-- Блок 1: Основные показатели -->
        <div class="result-block">
          <p><strong>Потенциал роста:</strong>&nbsp;<span class="highlight">{{ format(result.total) }} ₽</span> в год (+{{ result.percent }}%)</p>
          <p><strong>На каждую точку ({{ result.points }}):</strong>&nbsp;<span class="highlight">{{ format(result.perPoint) }} ₽/год</span></p>
          <p>
            <strong>Захват ({{ result.months }} мес.):</strong>&nbsp;
            <a href="/brew/membership" class="link-membership">{{ membershipFee }} ₽/мес.</a> с Сигналом
          </p>
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
        <!-- Надежный выпадающий блок -->
        <div class="why-section">
          <button
            class="why-summary"
            :class="{ 'is-open': isWhyOpen }"
            @click="isWhyOpen = !isWhyOpen"
          >
            Почему всё получится
          </button>
          <transition name="slide-fade">
            <div v-if="isWhyOpen" class="why-content">
              <ul class="why-list">
                <li>↑ 5–8%&nbsp; Системная аналитика устраняет «слепые зоны»</li>
                <li>↑ 3–5%&nbsp; Оптимизация ценообразования</li>
                <li>↑ 4–6%&nbsp; Бенчмаркинг процессов</li>
                <li>↑ 3–4%&nbsp; Стратегическое планирование</li>
                <li>↑ 2–3%&nbsp; Раннее предупреждение о конкурентах</li>
              </ul>
              <p class="why-total">Итого: 17–26 % обоснованного роста</p>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isWhyOpen = ref(false)
const cafes = ref([
  { id: 1, name: 'Balance coffee', index: 40, points: 1, reviews: 147, potential: 14, stage: 15, innovation: 14, influence: 11, type: 5, K: 3.0, scaleFactor: 5.7, reasoning: 'Стартап с низким индексом — огромный потенциал базовых улучшений', signal: '1 точка и индекс 40 — разрыв между достижениями и признанием', solution: 'Системное усиление всех параметров индекса', keyQuestion: { prefix: 'Почему, имея 147+ отзывов, вы не достигли статуса', status: 'Растущий 📈', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 2, name: 'Bonfix', index: 45, points: 2, reviews: 143, potential: 15, stage: 15, innovation: 14, influence: 10, type: 5, K: 3.0, scaleFactor: 5.7, reasoning: 'Малая сеть может быстро масштабировать лучшие практики', signal: '2 точки и индекс 45 — разрыв между возможностями и признанием', solution: 'Системное усиление всех параметров индекса', keyQuestion: { prefix: 'Почему, имея 143+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 3, name: 'Булка нетто', index: 50, points: 3, reviews: 771, potential: 15, stage: 15, innovation: 13, influence: 8, type: 5, K: 5.0, scaleFactor: 3.6, reasoning: 'Популярна у гостей, но низкое влияние — нужен маркетинг', signal: '3 точки и 771 отзыв — недооценённая популярность', solution: 'Системное усиление всех параметров индекса', keyQuestion: { prefix: 'Почему, имея 771+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 4, name: 'Coffee Bean', index: 45, points: 1, reviews: 1703, potential: 15, stage: 15, innovation: 14, influence: 8, type: 5, K: 3.0, scaleFactor: 5.9, reasoning: 'Локальный феномен — потенциал экспансии и франчайзинга', signal: '1 точка и 1 703 отзыва', solution: 'Трансформация популярности в системный рост', keyQuestion: { prefix: 'Почему, имея 1 703+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 5, name: 'Cup-cup', index: 53, points: 20, reviews: 1505, potential: 8, stage: 25, innovation: 7, influence: 13, type: 5, K: 6.0, scaleFactor: 2.9, reasoning: 'Крупнейшая сеть в стагнации — нужен реинжиниринг', signal: '20 точек и 1 505 отзывов', solution: 'Реинжиниринг всей сети', keyQuestion: { prefix: 'Почему, имея 1 505+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 6, name: 'Дринкит', index: 81, points: 2, reviews: 763, potential: 24, stage: 15, innovation: 20, influence: 12, type: 8, K: 6.0, scaleFactor: 2.1, reasoning: 'Высокий потенциал при франшизной модели', signal: '2 точки и 763 отзыва', solution: 'Агрессивное масштабирование через франчайзинг', keyQuestion: { prefix: 'Почему, имея 763+ отзывов, вы не достигли статуса', status: 'Лидер 👑', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 7, name: 'Кофеваркин', index: 30, points: 1, reviews: 185, potential: 10, stage: 10, innovation: 7, influence: 5, type: 5, K: 3.0, scaleFactor: 9.1, reasoning: 'Самый низкий индекс — максимальный потенциал перезапуска', signal: '1 точка в стагнации', solution: 'Полная трансформация концепции', keyQuestion: { prefix: 'Почему, имея 185+ отзывов, вы не достигли статуса', status: 'Растущий 📈', suffix: '?' }, competitors: 'Balance coffee, Days Coffee, Twinz +' },
  { id: 8, name: 'Корж', index: 98, points: 8, reviews: 4520, potential: 25, stage: 20, innovation: 25, influence: 20, type: 8, K: 0.8, scaleFactor: 12.9, reasoning: 'Лидер рынка — фокус на экспансии и защите позиций', signal: '8 точек и 4 520 отзывов', solution: 'Защита позиций и экспансия', keyQuestion: { prefix: 'Как удержать лидерство при входе федеральных игроков?', status: null, suffix: '' }, competitors: 'Skuratov Coffee, федеральные сети, новые игроки +' },
  { id: 9, name: 'Lumos barista lab', index: 63, points: 2, reviews: 303, potential: 15, stage: 15, innovation: 18, influence: 5, type: 5, K: 3.0, scaleFactor: 5.8, reasoning: 'Инновации > влияние — нужна маркетинговая прокачка', signal: '2 точки с высокими инновациями и низким влиянием', solution: 'Усиление маркетингового воздействия', keyQuestion: { prefix: 'Почему, имея 303+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 10, name: 'MB Cafe', index: 45, points: 2, reviews: 199, potential: 15, stage: 15, innovation: 14, influence: 6, type: 5, K: 3.0, scaleFactor: 6.1, reasoning: 'Стандартная модель требует уникализации и дифференциации', signal: '2 точки и средние показатели', solution: 'Системное усиление всех параметров индекса', keyQuestion: { prefix: 'Почему, имея 199+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 11, name: 'Mosaic coffee&tea', index: 91, points: 14, reviews: 2231, potential: 24, stage: 20, innovation: 25, influence: 20, type: 8, K: 4.0, scaleFactor: 2.6, reasoning: 'Крупнейшая независимая сеть — на гребне лидерства', signal: '14 точек и 2 231 отзыв', solution: 'Системная оптимизация всей сети', keyQuestion: { prefix: 'Почему, имея 2 231+ отзывов, вы не достигли статуса', status: 'Лидер 👑', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Surf Coffee +' },
  { id: 12, name: 'Skuratov Coffee', index: 96, points: 6, reviews: 3129, potential: 25, stage: 20, innovation: 25, influence: 20, type: 8, K: 1.0, scaleFactor: 10.3, reasoning: 'Второе место — точечные улучшения для абсолютного лидерства', signal: '6 точек и 3 129 отзывов', solution: 'Финальный рывок к лидерству', keyQuestion: { prefix: 'Почему, имея 3 129+ отзывов, вы не достигли статуса', status: 'Лидер 👑', suffix: '?' }, competitors: 'Корж, Mosaic coffee&tea, Surf Coffee +' },
  { id: 13, name: 'Surf Coffee', index: 93, points: 3, reviews: 925, potential: 24, stage: 15, innovation: 15, influence: 20, type: 10, K: 3.0, scaleFactor: 4.0, reasoning: 'Федеральная франшиза с недооценённой моделью масштабирования', signal: '3 точки франшизы и 925 отзывов', solution: 'Агрессивное масштабирование франшизы', keyQuestion: { prefix: 'Почему, имея 925+ отзывов, вы не достигли статуса', status: 'Лидер 👑', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 14, name: 'Uco Coffee Roaster', index: 78, points: 2, reviews: 209, potential: 18, stage: 15, innovation: 20, influence: 12, type: 5, K: 3.0, scaleFactor: 4.8, reasoning: 'Ремесленный подход — нужно масштабироваться без потери качества', signal: '2 точки с высокими инновациями', solution: 'Сохранение качества при росте', keyQuestion: { prefix: 'Почему, имея 209+ отзывов, вы не достигли статуса', status: 'Лидер 👑', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 15, name: 'Vandal coffee', index: 65, points: 3, reviews: 273, potential: 15, stage: 15, innovation: 20, influence: 8, type: 5, K: 3.0, scaleFactor: 5.3, reasoning: 'Креативность не конвертируется в влияние — нужна трансформация', signal: '3 точки с инновациями, но низким влиянием', solution: 'Трансформация инноваций в преимущество', keyQuestion: { prefix: 'Почему, имея 273+ отзывов, вы не достигли статуса', status: 'Лидер 👑', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 16, name: 'White Cup', index: 75, points: 2, reviews: 646, potential: 15, stage: 10, innovation: 14, influence: 11, type: 5, K: 3.0, scaleFactor: 6.1, reasoning: 'Игрок в зрелости — пора запускать новый цикл роста', signal: '2 точки и 646 отзывов', solution: 'Переход к новому циклу экспансии', keyQuestion: { prefix: 'Почему, имея 646+ отзывов, вы не достигли статуса', status: 'Лидер 👑', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 17, name: 'Хюггешная', index: 52, points: 6, reviews: 885, potential: 15, stage: 15, innovation: 15, influence: 14, type: 5, K: 3.0, scaleFactor: 5.3, reasoning: 'Средний эшелон с базой для прорыва', signal: '6 точки и 885 отзывов', solution: 'Системное усиление для прорыва', keyQuestion: { prefix: 'Почему, имея 885+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },
  { id: 18, name: 'Юни', index: 41, points: 3, reviews: 376, potential: 10, stage: 15, innovation: 14, influence: 12, type: 5, K: 3.0, scaleFactor: 6.0, reasoning: 'Системные ограничения — нужна перестройка модели', signal: '3 точки с низким потенциалом', solution: 'Кардинальная перестройка операционной модели', keyQuestion: { prefix: 'Почему, имея 376+ отзывов, вы не достигли статуса', status: 'Сильный 💪', suffix: '?' }, competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' }
])
const selectedCafeId = ref('')
const revenueStr = ref('')
const resultShown = ref(false)
const result = ref({})

function onRevenueInput(e) {
  const digits = e.target.value.replace(/\D/g, '')
  revenueStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  resultShown.value = false
}

const revenueNum = computed(() => Number(revenueStr.value.replace(/\s|,/g, '')))
const W = { potential: 0.25, stage: 0.2, innovation: 0.25, influence: 0.2, type: 0.1 }
const canCalculate = computed(() => selectedCafeId.value && revenueNum.value >= 100000)

const membershipFee = computed(() => {
  const fee = revenueNum.value * 0.04
  return format(fee)
})

function calcIQ(c) {
  return W.potential * c.potential / 25 + W.stage * c.stage / 20 + W.innovation * c.innovation / 25 + W.influence * c.influence / 20 + W.type * c.type / 10
}

function priceOfInaction(w, cafe) {
  const base = w * calcIQ(cafe) * cafe.K * 0.25 * cafe.points
  return Math.round(base * cafe.scaleFactor)
}

function timeToCapture(iq, K) {
  const months = 6 * (1 - Math.min(iq * (K / 10), 0.9))
  return Math.max(1, Math.round(months))
}

const format = (n) => new Intl.NumberFormat('ru-RU').format(Math.round(n))

function calculate() {
  const cafe = cafes.value.find(c => c.id === Number(selectedCafeId.value))
  if (!cafe) return

  const iq = calcIQ(cafe)
  const total = priceOfInaction(revenueNum.value, cafe)
  const perPoint = total / cafe.points
  const percent = Math.round((total / (revenueNum.value * cafe.points * 12)) * 100)

  result.value = {
    ...cafe,
    total,
    perPoint,
    percent,
    months: timeToCapture(iq, cafe.K),
  }
  resultShown.value = true
}
</script>

<style scoped>
.calculator-card { width: 100%; max-width: 720px; margin: 0 auto 32px; padding: 20px 24px; background: #1e1e1e !important; border: 1px solid #2b2b2b !important; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
.input-group { margin-bottom: 16px; }
label { display: block; margin-bottom: 6px; font: 600 14px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #ffffff !important; }
select, input { width: 100%; height: 44px; padding: 0 14px; font: 500 15px/44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #141414 !important; border: 1px solid #333333 !important; border-radius: 8px; color: #ffffff !important; transition: border-color 0.25s ease; }
select:focus, input:focus { border-color: #c5f946 !important; outline: 0; }
input::placeholder { color: #888888 !important; }
select option { background: #141414 !important; color: #ffffff !important; }
.btn-calc {
  width: 100%;
  height: 44px;
  margin-top: 12px;
  font: 700 16px/44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-transform: uppercase; /* Текст заглавными */
  color: #000000 !important;
  background: #c5f946 !important;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.btn-calc:disabled { background: #555555 !important; color: #cccccc !important; cursor: not-allowed; }
.btn-calc:not(:disabled):hover { background: #347b6c !important; color: #ffffff !important; transform: translateY(-2px); }
.result { margin-top: 20px; padding: 20px; background: #141414 !important; border: 1px solid #2b2b2b !important; border-radius: 10px; }
.result-title { margin: 0 0 20px; font: 600 18px/1.3 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; text-align: center; color: #c5f946 !important; }
.result-block { margin: 0 0 16px; padding: 12px 16px; background: #1a1a1a !important; border: 1px solid #2b2b2b !important; border-radius: 8px; }
.result-block:last-of-type { margin-bottom: 20px; }
.result-block p { margin: 8px 0; font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #ffffff !important; }
.result-block p:first-child { margin-top: 0; }
.result-block p:last-child { margin-bottom: 0; }
.highlight {
  color: #c5f946 !important;
  font-weight: 600;
}
.link-membership {
  color: #c5f946 !important;
  font-weight: 600;
  text-decoration: none;
}
.link-membership:hover {
  text-decoration: underline;
}
.badge-status { display: inline-block; background: #347b6c !important; color: #d0f0d0 !important; border-radius: 50px; padding: 2px 8px; font-size: 0.85em; white-space: nowrap; vertical-align: baseline; margin: 0 2px; }
/* ---------- УПРОЩЕННЫЙ БЛОК "ПОЧЕМУ ВСЁ ПОЛУЧИТСЯ" ---------- */
.why-section {
  overflow: hidden;
  border-radius: 8px;
  background: #347b6c;
}
.why-summary {
  width: 100%;
  padding: 14px 16px;
  margin: 0;
  font: 600 16px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
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
.why-summary.is-open::before {
  transform: translateY(-50%) rotate(180deg);
}
.why-content {
  padding: 8px 16px 18px;
  background: #347b6c;
}
.why-list {
  list-style-type: none;
  padding: 0;
  margin: 0 0 12px 0;
}
.why-list li {
  position: relative;
  /* padding-left: 18px; */
  margin: 8px 0;
  font: 400 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff;
}
.why-list li::before {
  content: '';
}
.why-total {
  margin: 0;
  padding: 8px 0 0;
  font: 600 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff;
  text-align: left;
}
/* ---------- АНИМАЦИИ ---------- */
.fade-enter-active, .fade-leave-active { transition: opacity 0.35s, transform 0.35s; }
.fade-enter-from { opacity: 0; transform: translateY(12px); }
.fade-leave-to { opacity: 0; transform: translateY(-12px); }
.slide-fade-enter-active { transition: all 0.3s ease-out; }
.slide-fade-leave-active { transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
/* ---------- МОБИЛЬНЫЙ ---------- */
@media(max-width:768px){
  .calculator-card{padding:16px 18px;margin-bottom:24px}
  select,input{height:38px;font-size:14px;line-height:38px}
  .btn-calc{height:40px;font-size:15px;line-height:40px}
  .result{padding:16px}
  .result-title{font-size:16px}
  .result-block{padding:10px 12px}
  .result-block p{font-size:13px}
  .why-summary{ font-size:15px; padding:12px 14px; }
  .why-list li{font-size:13px}
  .why-total{font-size:13px}
  .badge-status{font-size:0.8em;padding:1px 6px}
}
</style>
