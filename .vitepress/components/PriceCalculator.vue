<!-- PriceCalculator.vue / VitePress компонент -->
<template>
  <div class="calculator">
    <h2>КАЛЬКУЛЯТОР «ЦЕНА БЕЗДЕЙСТВИЯ»</h2>

    <!-- Выбор кофейни -->
    <div class="input-group">
      <label for="cafeSelect">Выберите кофейню:</label>
      <select id="cafeSelect" v-model="selectedCafeId" @change="resetResult">
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

    <!-- Кнопка расчёта -->
    <button class="btn-calc" :disabled="!canCalculate" @click="calculate">
      РАССЧИТАТЬ
    </button>

    <!-- Блок результата -->
    <transition name="fade">
      <div v-if="resultShown" class="result">
        <h3>{{ result.name }} (Индекс {{ result.index }})</h3>

        <p><strong>Потенциал роста:</strong>
           <span class="highlight">{{ format(result.total) }} ₽</span> в год (+{{ result.percent }}%)
        </p>

        <p><strong>На каждую точку:</strong>
           <span class="highlight">{{ format(result.perPoint) }} ₽/год</span>
        </p>

        <p><strong>Время на захват:</strong> {{ result.months }} мес. с BREW | 30 000 ₽/мес.</p>
        <p><strong>Целевые конкуренты:</strong> {{ result.competitors }}</p>
        <p><strong>Сигнал:</strong> {{ result.signal }}</p>
        <p><strong>Решение:</strong> {{ result.solution }}</p>
        <p><strong>Обоснование роста:</strong> {{ result.reasoning }}</p>

        <h4>Почему всё получится:</h4>
        <ul class="why-list">
          <li>Системная аналитика устраняет «слепые зоны» в управлении (+5–8 %)</li>
          <li>Оптимизация ценообразования на основе конкурентного анализа (+3–5 %)</li>
          <li>Улучшение операционных процессов через бенчмаркинг (+4–6 %)</li>
          <li>Стратегическое планирование вместо реактивного управления (+3–4 %)</li>
          <li>Защита от конкурентов через раннее предупреждение (+2–3 %)</li>
        </ul>
        <p><strong>Итого математически:</strong> 17–26 % обоснованного роста</p>

        <p><strong>Ключевой вопрос:</strong> {{ result.keyQuestion }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* ----- Данные кофеен (18 позиций) ----- */
const cafes = ref([
  { id: 1, name: 'Balance coffee', index: 40, points: 1, reviews: 147,
    potential: 14, stage: 15, innovation: 14, influence: 11, type: 5,
    K: 3.0, scaleFactor: 5.7,
    reasoning: 'Стартап с низким индексом – огромный потенциал базовых улучшений',
    signal: '1 точка и индекс 40 – системная проблема / разрыв между достижениями и признанием',
    solution: 'Системное усиление всех параметров индекса',
    keyQuestion: 'Почему, имея 147+ отзывов, вы не достигли статуса «Растущий 📈»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 2, name: 'Bonfix', index: 45, points: 2, reviews: 143,
    potential: 15, stage: 15, innovation: 14, influence: 10, type: 5,
    K: 3.0, scaleFactor: 5.7,
    reasoning: 'Малая сеть (2 точки) может быстро масштабировать лучшие практики',
    signal: '2 точки и индекс 45 – разрыв между возможностями и признанием',
    solution: 'Системное усиление всех параметров индекса',
    keyQuestion: 'Почему, имея 143+ отзывов, вы не достигли статуса «Сильный 💪»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 3, name: 'Булка нетто', index: 50, points: 3, reviews: 771,
    potential: 15, stage: 15, innovation: 13, influence: 8, type: 5,
    K: 5.0, scaleFactor: 3.6,
    reasoning: 'Популярная у гостей, но низкое влияние – потенциал маркетинга и брендинга',
    signal: '3 точки и 771 отзыв – недооценённая популярность',
    solution: 'Системное усиление всех параметров индекса',
    keyQuestion: 'Почему, имея 771+ отзывов, вы не достигли статуса «Сильный 💪»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 4, name: 'Coffee Bean', index: 45, points: 1, reviews: 1703,
    potential: 15, stage: 15, innovation: 14, influence: 8, type: 5,
    K: 3.0, scaleFactor: 5.9,
    reasoning: 'Локальный феномен (1703 отзыва) – потенциал экспансии и франчайзинга',
    signal: '1 точка и 1 703 отзыва – феномен с большой базой гостей',
    solution: 'Трансформация популярности в системный рост',
    keyQuestion: 'Почему, имея 1 703+ отзывов, вы не достигли статуса «Сильный 💪»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 5, name: 'Cup-cup', index: 53, points: 20, reviews: 1505,
    potential: 8, stage: 25, innovation: 7, influence: 13, type: 5,
    K: 6.0, scaleFactor: 2.9,
    reasoning: 'Крупнейшая сеть (20 точек) в стагнации – эффект от системной оптимизации',
    signal: '20 точек и 1 505 отзывов – системная стагнация',
    solution: 'Реинжиниринг всей сети одновременно',
    keyQuestion: 'Почему, имея 1 505+ отзывов, вы не достигли статуса «Сильный 💪»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 6, name: 'Дринкит', index: 81, points: 2, reviews: 763,
    potential: 24, stage: 15, innovation: 20, influence: 12, type: 8,
    K: 6.0, scaleFactor: 2.1,
    reasoning: 'Высокий потенциал и инновации при франшизной модели – масштабирование',
    signal: '2 точки и 763 отзыва – нереализованный потенциал франшизы',
    solution: 'Агрессивное масштабирование через франчайзинг',
    keyQuestion: 'Почему, имея 763+ отзывов, вы не достигли статуса «Лидер 👑»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 7, name: 'Кофеваркин', index: 30, points: 1, reviews: 185,
    potential: 10, stage: 10, innovation: 7, influence: 5, type: 5,
    K: 3.0, scaleFactor: 9.1,
    reasoning: 'Самый низкий индекс – максимальный потенциал перезапуска',
    signal: '1 точка в стагнации – нужен кардинальный перезапуск',
    solution: 'Полная трансформация концепции и позиционирования',
    keyQuestion: 'Почему, имея 185+ отзывов, вы не достигли статуса «Растущий 📈»?',
    competitors: 'Balance coffee, Days Coffee, Twinz +' },

  { id: 8, name: 'Корж', index: 98, points: 8, reviews: 4520,
    potential: 25, stage: 20, innovation: 25, influence: 20, type: 8,
    K: 0.8, scaleFactor: 12.9,
    reasoning: 'Лидер рынка: рост через экспансию в новые города и форматы',
    signal: '8 точек и 4 520 отзывов – доминирование на рынке',
    solution: 'Защита лидерских позиций и экспансия',
    keyQuestion: 'Как удержать лидерство при входе федеральных игроков?',
    competitors: 'Skuratov Coffee, федеральные сети, новые игроки +' },

  { id: 9, name: 'Lumos barista lab', index: 63, points: 2, reviews: 303,
    potential: 15, stage: 15, innovation: 18, influence: 5, type: 5,
    K: 3.0, scaleFactor: 5.8,
    reasoning: 'Инновации > влияние – нужно конвертировать экспертизу в маркетинг',
    signal: '2 точки с высокими инновациями и низким влиянием',
    solution: 'Усиление маркетингового воздействия',
    keyQuestion: 'Почему, имея 303+ отзывов, вы не достигли статуса «Сильный 💪»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 10, name: 'MB Cafe', index: 45, points: 2, reviews: 199,
    potential: 15, stage: 15, innovation: 14, influence: 6, type: 5,
    K: 3.0, scaleFactor: 6.1,
    reasoning: 'Стандартная модель требует уникализации и дифференциации',
    signal: '2 точки и средние показатели – нужна уникализация',
    solution: 'Системное усиление всех параметров индекса',
    keyQuestion: 'Почему, имея 199+ отзывов, вы не достигли статуса «Сильный 💪»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 11, name: 'Mosaic coffee&tea', index: 91, points: 14, reviews: 2231,
    potential: 24, stage: 20, innovation: 25, influence: 20, type: 8,
    K: 4.0, scaleFactor: 2.6,
    reasoning: 'Крупнейшая независимая сеть – оптимизация для обгона лидера',
    signal: '14 точек и 2 231 отзыв – потенциал лидерства',
    solution: 'Системная оптимизация всей сети',
    keyQuestion: 'Почему, имея 2 231+ отзывов, вы не достигли статуса «Лидер 👑»?',
    competitors: 'Корж, Skuratov Coffee, Surf Coffee +' },

  { id: 12, name: 'Skuratov Coffee', index: 96, points: 6, reviews: 3129,
    potential: 25, stage: 20, innovation: 25, influence: 20, type: 8,
    K: 1.0, scaleFactor: 10.3,
    reasoning: 'Второе место – точечные улучшения для абсолютного лидерства',
    signal: '6 точек и 3 129 отзывов – минимальный отрыв от лидера',
    solution: 'Финальный рывок к лидерству',
    keyQuestion: 'Почему, имея 3 129+ отзывов, вы не достигли статуса «Лидер 👑»?',
    competitors: 'Корж, Mosaic coffee&tea, Surf Coffee +' },

  { id: 13, name: 'Surf Coffee', index: 93, points: 3, reviews: 925,
    potential: 24, stage: 15, innovation: 15, influence: 20, type: 10,
    K: 3.0, scaleFactor: 4.0,
    reasoning: 'Франшиза с недооценённой моделью масштабирования',
    signal: '3 точки франшизы и 925 отзывов',
    solution: 'Агрессивное масштабирование через франшизу',
    keyQuestion: 'Почему, имея 925+ отзывов, вы не достигли статуса «Лидер 👑»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 14, name: 'Uco Coffee Roaster', index: 78, points: 2, reviews: 209,
    potential: 18, stage: 15, innovation: 20, influence: 12, type: 5,
    K: 3.0, scaleFactor: 4.8,
    reasoning: 'Ремесленный подход требует масштабирования без потери качества',
    signal: '2 точки с высокими инновациями',
    solution: 'Сохранение качества при росте',
    keyQuestion: 'Почему, имея 209+ отзывов, вы не достигли статуса «Лидер 👑»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 15, name: 'Vandal coffee', index: 65, points: 3, reviews: 273,
    potential: 15, stage: 15, innovation: 20, influence: 8, type: 5,
    K: 3.0, scaleFactor: 5.3,
    reasoning: 'Высокие инновации → трансформация креатива в рыночную силу',
    signal: '3 точки с инновациями, но низким влиянием',
    solution: 'Трансформация инноваций в преимущество',
    keyQuestion: 'Почему, имея 273+ отзывов, вы не достигли статуса «Лидер 👑»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 16, name: 'White Cup', index: 75, points: 2, reviews: 646,
    potential: 15, stage: 10, innovation: 14, influence: 11, type: 5,
    K: 3.0, scaleFactor: 6.1,
    reasoning: 'Стадия зрелости – переход в новый цикл роста',
    signal: '2 точки и 646 отзывов – игрок в стадии зрелости',
    solution: 'Переход к новому циклу экспансии',
    keyQuestion: 'Почему, имея 646+ отзывов, вы не достигли статуса «Лидер 👑»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 17, name: 'Хюггешная', index: 52, points: 6, reviews: 885,
    potential: 15, stage: 15, innovation: 15, influence: 14, type: 5,
    K: 3.0, scaleFactor: 5.3,
    reasoning: 'Средний эшелон с базой для прорыва в лидеры',
    signal: '6 точек и 885 отзывов – база для роста',
    solution: 'Системное усиление для прорыва',
    keyQuestion: 'Почему, имея 885+ отзывов, вы не достигли статуса «Сильный 💪»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' },

  { id: 18, name: 'Юни', index: 41, points: 3, reviews: 376,
    potential: 10, stage: 15, innovation: 14, influence: 12, type: 5,
    K: 3.0, scaleFactor: 6.0,
    reasoning: 'Системные ограничения – нужна кардинальная перестройка',
    signal: '3 точки с низким потенциалом',
    solution: 'Кардинальная перестройка операционной модели',
    keyQuestion: 'Почему, имея 376+ отзывов, вы не достигли статуса «Сильный 💪»?',
    competitors: 'Корж, Skuratov Coffee, Mosaic coffee&tea +' }
])

/* ----- Состояния ----- */
const selectedCafeId = ref('')
const revenueStr      = ref('')
const resultShown     = ref(false)
const result          = ref({})

/* ----- Ввод выручки с автоформатированием ----- */
function onRevenueInput (e) {
  const digits = e.target.value.replace(/\D/g, '')
  revenueStr.value = digits ? Number(digits).toLocaleString('ru-RU') : ''
  resultShown.value = false
}
const revenueNum = computed(() => Number(revenueStr.value.replace(/\s|,/g, '')))

/* ----- Логика расчёта ----- */
const WEIGHTS = { potential: .25, stage: .20, innovation: .25, influence: .20, type: .10 }

const canCalculate = computed(() =>
  selectedCafeId.value && revenueNum.value >= 100000
)

function calcIQ (p,s,i,v,t) {
  return WEIGHTS.potential*p/25 + WEIGHTS.stage*s/20 +
         WEIGHTS.innovation*i/25 + WEIGHTS.influence*v/20 +
         WEIGHTS.type*t/10
}

function priceOfInaction (W, cafe) {
  const IQ       = calcIQ(cafe.potential, cafe.stage, cafe.innovation, cafe.influence, cafe.type)
  const baseLoss = W * IQ * cafe.K * 0.25 * cafe.points
  return Math.round(baseLoss * cafe.scaleFactor)
}

function timeToCapture (IQ, K) {
  const adjK = K / 10                     // нормируем новый диапазон K
  const raw  = 6 * (1 - Math.min(IQ * adjK, 0.9))
  return Math.max(1, Math.round(raw))
}

function format (n) { return new Intl.NumberFormat('ru-RU').format(n) }

function calculate () {
  const cafe = cafes.value.find(c => c.id === +selectedCafeId.value)
  if (!cafe) return

  const IQ     = calcIQ(cafe.potential, cafe.stage, cafe.innovation, cafe.influence, cafe.type)
  const total  = priceOfInaction(revenueNum.value, cafe)
  const months = timeToCapture(IQ, cafe.K)
  const perPt  = total / cafe.points
  const percent = Math.round(total / (revenueNum.value * cafe.points * 12) * 100)

  result.value = {
    name        : cafe.name,
    index       : cafe.index,
    total,
    perPoint    : perPt,
    months,
    percent,
    competitors : cafe.competitors,
    signal      : cafe.signal,
    solution    : cafe.solution,
    reasoning   : cafe.reasoning,
    keyQuestion : cafe.keyQuestion
  }
  resultShown.value = true
}
</script>

<style scoped>
/* ---- Базовые стили ---- */
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
  margin-bottom: 32px;
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
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  transition: border-color .3s;
}
select:focus, input:focus { outline: none; border-color: #2C3E50; }

/* Кнопка расчёта */
.btn-calc {
  width: 100%;
  padding: 16px 0;
  margin: 32px 0 24px;
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
.result p { margin: 12px 0; font-size: 16px; line-height: 1.6; }
.highlight { color: #E74C3C; font-weight: 700; font-size: 18px; }
.why-list  { margin: 12px 0 0 16px; list-style: disc; }
.why-list li { margin: 4px 0; }

/* Анимация */
.fade-enter-active, .fade-leave-active { transition: all .5s; }
.fade-enter-from                    { opacity: 0; transform: translateY(20px); }
.fade-leave-to                      { opacity: 0; transform: translateY(-20px); }

/* Мобильный вид */
@media (max-width: 768px) {
  .calculator { padding: 16px; margin: 16px; }
  h2          { font-size: 24px; }
  .result h3  { font-size: 22px; }
  .result p   { font-size: 15px; }
}
</style>
