<!-- PriceCalculator.vue -->
<template>
  <div class="calculator">
    <h2>КАЛЬКУЛЯТОР «ЦЕНА БЕЗДЕЙСТВИЯ»</h2>

    <!-- Выбор кофейни -->
    <div class="input-group">
      <label for="cafeSelect">Выберите вашу кофейню:</label>
      <select id="cafeSelect" v-model="selectedCafeId" @change="resetResult">
        <option value="">— Выберите кофейню —</option>
        <option v-for="cafe in cafes" :key="cafe.id" :value="cafe.id">
          {{ cafe.name }}
        </option>
      </select>
    </div>

    <!-- Ввод средней выручки -->
    <div class="input-group">
      <label for="revenueInput">Средняя выручка на 1 точку в месяц (₽):</label>
      <input
        id="revenueInput"
        type="number"
        v-model.number="revenue"
        placeholder="Введите число от 100 000"
        min="100000"
        @input="resetResult"
      />
    </div>

    <!-- Кнопка расчёта -->
    <button
      class="btn-calc"
      :disabled="!canCalculate"
      @click="calculate"
    >
      РАССЧИТАТЬ
    </button>

    <!-- Блок результата -->
    <transition name="fade">
      <div v-if="resultShown" class="result">
        <h3>{{ resultData.name }} (Индекс {{ resultData.index }})</h3>

        <p>
          <strong>Потенциал роста:</strong>
          W × IQ × K × (1 − R<sub>norm</sub>) × myf × {{ resultData.multiplier }}
          = <span class="highlight">{{ format(resultData.total) }}₽</span> в год
          (+{{ resultData.percent }}%)
        </p>

        <p>
          <strong>На каждую точку:</strong>
          CB<sub>total</sub> / myf = <span class="highlight">{{ format(resultData.perPoint) }}₽/год</span>
        </p>

        <p><strong>Время на захват:</strong> {{ resultData.months }} мес. с BREW | 30 000 ₽/мес.</p>
        <p><strong>Целевые конкуренты:</strong> {{ resultData.competitors }}</p>
        <p><strong>Сигнал:</strong> {{ resultData.signal }}</p>
        <p><strong>Решение:</strong> {{ resultData.solution }}</p>
        <p><strong>Ключевой вопрос:</strong> {{ resultData.keyQuestion }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* ---------- Константы и данные ---------- */
const MAX_REVIEWS = 4520
const SCALE_FACTOR_DEFAULT = 8.5
const SCALE_FACTOR_LEADER  = 4.0
const WEIGHTS = {
  potential : 0.25,
  stage     : 0.20,
  innovation: 0.25,
  influence : 0.20,
  type      : 0.10
}

/* Полный список 18 кофеен */
const cafes = ref([
  { id: 1,  name: 'Balance coffee',       index: 40, points: 1,  reviews: 147,  potential: 14, stage: 15, innovation: 14, influence: 11, type: 5,  K: 0.30, signal: '1 точка и индекс 40 - системная проблема / разрыв между реальными достижениями и признанием',                       solution: 'Системное усиление всех параметров индекса', nextStatus: 'Растущий 📈' },
  { id: 2,  name: 'Bonfix',               index: 45, points: 2,  reviews: 143,  potential: 15, stage: 15, innovation: 14, influence: 10, type: 5,  K: 0.30, signal: '2 точки и индекс 45 - разрыв между операционными возможностями и признанием',                         solution: 'Системное усиление всех параметров индекса', nextStatus: 'Сильный 💪' },
  { id: 3,  name: 'Булка нетто',          index: 50, points: 3,  reviews: 771,  potential: 15, stage: 15, innovation: 13, influence:  8, type: 5,  K: 0.50, signal: '3 точки и 771 отзыв - недооцененная популярность у гостей',                                         solution: 'Системное усиление всех параметров индекса', nextStatus: 'Сильный 💪' },
  { id: 4,  name: 'Coffee Bean',          index: 45, points: 1,  reviews: 1703, potential: 15, stage: 15, innovation: 14, influence:  8, type: 5,  K: 0.30, signal: '1 точка и 1 703 отзыва - локальный феномен с огромной базой гостей',                                      solution: 'Трансформация популярности в системный рост',  nextStatus: 'Сильный 💪' },
  { id: 5,  name: 'Cup-cup',              index: 53, points: 20, reviews: 1505, potential:  8, stage: 25, innovation:  7, influence: 13, type: 5,  K: 0.60, signal: '20 точек и 1 505 отзывов - крупнейшая сеть в системной стагнации',                                      solution: 'Реинжиниринг всей сети одновременно',          nextStatus: 'Сильный 💪' },
  { id: 6,  name: 'Дринкит',              index: 81, points: 2,  reviews: 763,  potential: 24, stage: 15, innovation: 20, influence: 12, type: 8,  K: 0.60, signal: '2 точки и 763 отзыва - франшизная модель с нереализованным потенциалом',                               solution: 'Агрессивное масштабирование через франчайзинг', nextStatus: 'Лидер 👑' },
  { id: 7,  name: 'Кофеваркин',           index: 30, points: 1,  reviews: 185,  potential: 10, stage: 10, innovation:  7, influence:  5, type: 5,  K: 0.30, signal: '1 точка в стагнации - нужен кардинальный перезапуск',                                               solution: 'Полная трансформация концепции и позиционирования', nextStatus: 'Растущий 📈' },
  { id: 8,  name: 'Корж',                index: 98, points: 8,  reviews: 4520, potential: 25, stage: 20, innovation: 25, influence: 20, type: 8,  K: 0.08, signal: '8 точек и 4 520 отзывов - вы доминируете на рынке',                                                   solution: 'Защита лидерских позиций и экспансия в новые города', nextStatus: 'Лидер 👑' },
  { id: 9,  name: 'Lumos barista lab',    index: 63, points: 2,  reviews: 303,  potential: 15, stage: 15, innovation: 18, influence:  5, type: 5,  K: 0.30, signal: '2 точки с высокими инновациями, но низким влиянием - экспертиза не конвертируется в признание',        solution: 'Усиление маркетингового воздействия и влияния на рынок', nextStatus: 'Сильный 💪' },
  { id: 10, name: 'MB Cafe',              index: 45, points: 2,  reviews: 199,  potential: 15, stage: 15, innovation: 14, influence:  6, type: 5,  K: 0.30, signal: '2 точки и средние показатели - стандартная модель требует уникализации',                           solution: 'Системное усиление всех параметров индекса',   nextStatus: 'Сильный 💪' },
  { id: 11, name: 'Mosaic coffee&tea',    index: 91, points: 14, reviews: 2231, potential: 24, stage: 20, innovation: 25, influence: 20, type: 8,  K: 0.40, signal: '14 точек и 2 231 отзыв - самая крупная независимая сеть с потенциалом лидерства',                     solution: 'Системная оптимизация всей сети для захвата лидерских позиций', nextStatus: 'Лидер 👑' },
  { id: 12, name: 'Skuratov Coffee',      index: 96, points: 6,  reviews: 3129, potential: 25, stage: 20, innovation: 25, influence: 20, type: 8,  K: 0.10, signal: '6 точек и 3 129 отзывов - вы на втором месте с минимальным отрывом от лидера',                      solution: 'Финальный рывок к абсолютному лидерству через точечные улучшения', nextStatus: 'Лидер 👑' },
  { id: 13, name: 'Surf Coffee',          index: 93, points: 3,  reviews: 925,  potential: 24, stage: 15, innovation: 15, influence: 20, type: 10, K: 0.30, signal: '3 точки франшизы и 925 отзывов - модель масштабирования недооценена рынком',                       solution: 'Агрессивное масштабирование через франшизу',   nextStatus: 'Лидер 👑' },
  { id: 14, name: 'Uco Coffee Roaster',   index: 78, points: 2,  reviews: 209,  potential: 18, stage: 15, innovation: 20, influence: 12, type: 5,  K: 0.30, signal: '2 точки с высокими инновациями - ремесленный подход требует масштабирования',                       solution: 'Сохранение качества при увеличении охвата и влияния', nextStatus: 'Лидер 👑' },
  { id: 15, name: 'Vandal coffee',        index: 65, points: 3,  reviews: 273,  potential: 15, stage: 15, innovation: 20, influence:  8, type: 5,  K: 0.30, signal: '3 точки с высокими инновациями, но низким влиянием - креативность не конвертируется в рыночную силу', solution: 'Трансформация инноваций в маркетинговое преимущество', nextStatus: 'Лидер 👑' },
  { id: 16, name: 'White Cup',            index: 75, points: 2,  reviews: 646,  potential: 15, stage: 10, innovation: 14, influence: 11, type: 5,  K: 0.30, signal: '2 точки и 646 отзывов - качественный игрок в стадии зрелости',                                   solution: 'Переход из зрелости в новый цикл роста и экспансии',   nextStatus: 'Лидер 👑' },
  { id: 17, name: 'Хюггешная',            index: 52, points: 6,  reviews: 885,  potential: 15, stage: 15, innovation: 15, influence: 14, type: 5,  K: 0.30, signal: '6 точек и 885 отзывов - средний эшелон с хорошей базой для роста',                            solution: 'Системное усиление для прорыва в лидирующий сегмент', nextStatus: 'Сильный 💪' },
  { id: 18, name: 'Юни',                 index: 41, points: 3,  reviews: 376,  potential: 10, stage: 15, innovation: 14, influence: 12, type: 5,  K: 0.30, signal: '3 точки с низким потенциалом - системные ограничения тормозят развитие',                            solution: 'Кардинальная перестройка операционной модели', nextStatus: 'Сильный 💪' }
])

/* ---------- Состояния ---------- */
const selectedCafeId = ref('')
const revenue         = ref(0)
const resultShown     = ref(false)
const resultData      = ref({})

/* ---------- Вспомогательные функции ---------- */
const calcIQ = (p,s,i,v,t) =>
  WEIGHTS.potential*p/25 + WEIGHTS.stage*s/20 + WEIGHTS.innovation*i/25 +
  WEIGHTS.influence*v/20 + WEIGHTS.type*t/10

function priceOfInaction (W, IQ, K, reviews, points, cafeName) {
  const R_norm     = Math.min(reviews / MAX_REVIEWS, 1)
  const baseLoss   = W * IQ * K * (1 - R_norm) * points
  const multiplier = cafeName === 'Корж' ? SCALE_FACTOR_LEADER : SCALE_FACTOR_DEFAULT
  return { total: baseLoss * multiplier, multiplier }
}

const timeToCapture = (IQ, K) => Math.min(Math.floor(6 * (1 - IQ * K)), 6)
const growthPercent = (total, W, points) => Math.round(total / (W * points * 12) * 100)
const format        = v => Math.round(v).toLocaleString('ru-RU')

function getCompetitors (cafe) {
  if (cafe.name === 'Корж')        return 'Skuratov Coffee, федеральные сети, новые игроки +'
  if (cafe.index < 40)             return 'Balance coffee, Days Coffee, Twinz +'
  return 'Корж, Skuratov Coffee, Mosaic coffee&tea +'
}

/* ---------- Расчёт ---------- */
const canCalculate = computed(() => selectedCafeId.value && revenue.value >= 100000)

function resetResult () { resultShown.value = false }

function calculate () {
  const cafe = cafes.value.find(c => c.id === Number(selectedCafeId.value))
  if (!cafe) return

  const IQ = calcIQ(cafe.potential, cafe.stage, cafe.innovation, cafe.influence, cafe.type)
  const { total, multiplier } = priceOfInaction(revenue.value, IQ, cafe.K, cafe.reviews, cafe.points, cafe.name)
  const months   = timeToCapture(IQ, cafe.K)
  const percent  = growthPercent(total, revenue.value, cafe.points)
  const perPoint = total / cafe.points

  resultData.value = {
    name       : cafe.name,
    index      : cafe.index,
    total,
    perPoint,
    months,
    percent,
    multiplier,
    competitors: getCompetitors(cafe),
    signal     : cafe.signal,
    solution   : cafe.solution,
    keyQuestion: cafe.name === 'Корж'
      ? 'Как удержать лидерство при входе федеральных игроков?'
      : `Почему, имея ${cafe.reviews.toLocaleString('ru-RU')}+ отзывов, вы не достигли статуса '${cafe.nextStatus}'?`
  }

  resultShown.value = true
}
</script>

<style scoped>
/* ---------- Базовая раскладка ---------- */
.calculator {
  max-width: 720px;
  margin: 24px auto;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Заголовок */
h2 {
  margin: 0 0 32px;
  text-align: center;
  color: #2C3E50;
  font-size: 28px;
  font-weight: 700;
}

/* Группы ввода */
.input-group { margin-bottom: 20px; }
label       { display: block; margin-bottom: 8px; font-weight: 600; color: var(--vp-c-text-1); }

select,
input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  transition: border-color .3s;
}
select:focus,
input:focus { outline: none; border-color: #2C3E50; }

/* Кнопка расчёта */
.btn-calc {
  width: 100%;
  margin: 32px 0 24px;
  padding: 16px 0;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg,#E74C3C,#C0392B);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all .3s;
  text-transform: uppercase;
}
.btn-calc:disabled { background: var(--vp-c-text-3); cursor: not-allowed; }
.btn-calc:hover:not(:disabled) {
  background: linear-gradient(135deg,#C0392B,#A93226);
  transform: translateY(-2px);
}

/* Результат */
.result {
  padding: 24px;
  background: var(--vp-c-bg-alt);
  border: 2px solid #2C3E50;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(44,62,80,.1);
}
.result h3 {
  margin: 0 0 20px;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  color: #2C3E50;
  border-bottom: 2px solid #E74C3C;
  padding-bottom: 12px;
}
.result p { margin: 12px 0; font-size: 16px; line-height: 1.6; color: var(--vp-c-text-1); }
.highlight { color: #E74C3C; font-weight: 700; font-size: 18px; }

/* Анимация появления */
.fade-enter-active,
.fade-leave-active { transition: all .5s; }
.fade-enter-from   { opacity: 0; transform: translateY(20px); }
.fade-leave-to     { opacity: 0; transform: translateY(-20px); }

/* Мобильная адаптация */
@media (max-width: 768px) {
  .calculator { padding: 16px; margin: 16px; }
  h2          { font-size: 24px; }
  .result h3  { font-size: 22px; }
  .result p   { font-size: 15px; }
}
</style>
