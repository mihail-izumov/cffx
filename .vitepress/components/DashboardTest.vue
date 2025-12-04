<template>
  <div class="signal-treemap-reset">
    <!-- Ряд 1: 2 крупные -->
    <div class="row row-2">
      <div
        v-for="(cat, i) in categories.slice(0, 2)"
        :key="cat.category"
        class="card card-large"
        @click="toggle(i)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i)"
        @keydown.space.prevent="toggle(i)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Ряд 2: 2 крупные -->
    <div class="row row-2">
      <div
        v-for="(cat, i) in categories.slice(2, 4)"
        :key="cat.category"
        class="card card-large"
        @click="toggle(i + 2)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i + 2)"
        @keydown.space.prevent="toggle(i + 2)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i + 2" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Ряд 3: 3 средние -->
    <div class="row row-3">
      <div
        v-for="(cat, i) in categories.slice(4, 7)"
        :key="cat.category"
        class="card card-mid"
        @click="toggle(i + 4)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i + 4)"
        @keydown.space.prevent="toggle(i + 4)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i + 4" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Ряд 4: 3 средние -->
    <div class="row row-3">
      <div
        v-for="(cat, i) in categories.slice(7, 10)"
        :key="cat.category"
        class="card card-mid"
        @click="toggle(i + 7)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i + 7)"
        @keydown.space.prevent="toggle(i + 7)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i + 7" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Нижние 4 карточки — компактные -->
    <div class="column-center">
      <div
        v-for="(cat, i) in categories.slice(10)"
        :key="cat.category"
        class="card card-wide"
        @click="toggle(i + 10)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i + 10)"
        @keydown.space.prevent="toggle(i + 10)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i + 10" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIdx = ref(-1)

// Функция для переключения состояния по клику
const toggle = (index) => {
  if (activeIdx.value === index) {
    activeIdx.value = -1 // Закрыть, если кликнули по уже открытому
  } else {
    activeIdx.value = index // Открыть новый
  }
}

const categories = [
  // 1 строка
  { category: 'Долгое ожидание заказа', percent: 18.3, desc: 'Слишком долгое приготовление, очереди, заказ забыли, выдача затянулась на 10–20 минут и более.' },
  { category: 'Качество блюд/напитков', percent: 13.3, desc: 'Неудовлетворительный вкус и температура кофе или еды, несвежий продукт, комочки, странный привкус, блюда не соответствуют стандарту.' },

  // 2 строка
  { category: 'Ошибки в заказе', percent: 12.5, desc: 'Выдан не тот напиток или блюдо, забыли позицию, перепутали размер или ингредиент, заказ собрали с ошибками.' },
  { category: 'Чистота зала/посуды/уборной', percent: 10.8, desc: 'Грязные столы, посуда, мусор на полу, волосы или насекомые в еде, неубранная уборная.' },

  // 3 строка
  { category: 'Грубость и невнимательность персонала', percent: 10.0, desc: 'Персонал был невежлив, не поздоровался, игнорировал просьбы, проявил хамство или раздражение.' },
  { category: 'Антисанитария/инородные предметы', percent: 6.7, desc: 'Волосы, пластик, нитки, мухи или тараканы в еде, плохо вымытые руки персонала.' },
  { category: 'Проблемы с очередями и обслуживанием', percent: 5.8, desc: 'Путаница чей заказ, нет системы, хаотичная очередь — кто-то нарушает порядок, кассир путается.' },

  // 4 строка
  { category: 'Неуютная атмосфера/музыка/запах', percent: 5.0, desc: 'Шум, некомфортная посадка, неприятный запах, неудачная музыка, слишком громко или холодно.' },
  { category: 'Упаковка и напитки на вынос', percent: 4.2, desc: 'Неудобная упаковка, напитки проливаются, крышки неплотно закрыты, сложно унести.' },
  { category: 'Отсутствие внимания/коммуникации', percent: 4.2, desc: 'Сотрудник ничего не объяснил, не помог с выбором, не рассказал про меню или не предложил помощь.' },

  // Нижние (4 шт.)
  { category: 'Цена/акции/выгода', percent: 3.3, desc: 'Цены высокие, акции не работают, скидку не предоставили, обманули с ценой.' },
  { category: 'Профессионализм персонала', percent: 2.5, desc: 'Сотрудник не знал меню, не разбирался в кофе, ошибки в приготовлении.' },
  { category: 'Дизайн и интерьер', percent: 1.7, desc: 'Скучный, неуютный интерьер, неудобная мебель, плохое освещение.' },
  { category: 'Парковка и доступность', percent: 1.7, desc: 'Отсутствие парковки, сложно найти вход, неудобная локация.' },
]
</script>

<style scoped>
/* === Контейнер === */
.signal-treemap-reset {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 4px;
  box-sizing: border-box;
  font-family: inherit;
}

/* === Ряды === */
.row,
.row-2,
.row-3 {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 6px;
  margin: 0;
}

.column-center {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

/* === Карточки === */
.card {
  background: #232427;
  color: #eaeaea;
  border-radius: 11px;
  box-shadow: 0 1px 3px rgba(24, 24, 26, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  transition: transform 0.14s ease, box-shadow 0.14s ease;
  /* Убрал outline по умолчанию, добавляйте focus-visible при необходимости */
  outline: none; 
}

.card:hover,
.card:focus {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(24, 24, 26, 0.18);
}

/* 2 крупные карточки */
.card-large {
  flex: 1 1 calc(50% - 3px);
  min-width: 0;
  min-height: 90px; /* Было 74px -> Увеличено */
  height: auto;
  font-size: clamp(0.92rem, 1.75vw, 1.12rem);
}

/* 3 средние карточки */
.card-mid {
  flex: 1 1 calc(33.333% - 4px);
  min-width: 0;
  min-height: 70px; /* Было 54px -> Увеличено */
  height: auto;
  font-size: clamp(0.78rem, 1.5vw, 0.92rem);
}

/* Нижние */
.card-wide {
  flex: 1 1 100%;
  min-width: 0;
  min-height: 45px; /* Было 28px -> Увеличено */
  height: auto;
  font-size: clamp(0.76rem, 1.45vw, 0.90rem);
}

/* === ОСНОВНЫЕ КАРТОЧКИ === */
.card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 5px;
  gap: 6px;
  width: 100%;
  height: 100%; /* Чтобы контент занимал всю высоту */
  box-sizing: border-box;
}

.card-problem {
  font-weight: 500;
  font-size: 1em;
  line-height: 1.18;
  white-space: normal;
  overflow-wrap: anywhere;
  flex: 1;
  text-align: left;
}

.card-percent {
  font-weight: 400;
  font-size: 0.86em;
  color: #eaeaea;
  opacity: 0.58;
  white-space: nowrap;
  min-width: 34px;
  text-align: right;
}

/* === ТУЛТИП === */
.card-tooltip {
  position: absolute;
  inset: 0;
  background: #161719;
  color: #ededed;
  border-radius: 11px;
  z-index: 10;
  padding: 8px 10px;
  display: flex;
  align-items: flex-start; /* Текст начинается сверху */
  animation: tooltipPop 0.28s ease-out;
  box-shadow: 0 3px 10px rgba(22, 23, 25, 0.32);
  overflow-y: auto; /* На случай, если текста слишком много даже для новой высоты */
}

.tooltip-text {
  font-size: 0.84rem;
  font-weight: 400;
  line-height: 1.32;
  white-space: normal;
  overflow-wrap: anywhere;
  max-width: 100%;
}

/* === Анимации === */
.fade-smooth-enter-active,
.fade-smooth-leave-active {
  transition: opacity 0.28s ease;
}

.fade-smooth-enter-from,
.fade-smooth-leave-to {
  opacity: 0;
}

@keyframes tooltipPop {
  0% { opacity: 0.92; transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1); }
}

/* === Адаптивность === */
@media (max-width: 720px) {
  .signal-treemap-reset { padding: 0 3px; }
  .row, .row-2, .row-3 { gap: 5px; }
  
  .card-large { 
    flex: 1 1 calc(50% - 2.5px); 
    min-height: 80px; /* Немного меньше чем на десктопе, но больше чем было */
  }
  .card-mid { 
    flex: 1 1 calc(50% - 2.5px); 
    min-height: 65px; 
  }
  
  .card-inner { padding: 7px 4px; }
  .card-tooltip { padding: 7px 9px; }
}

@media (max-width: 480px) {
  .card-large,
  .card-mid {
    flex: 1 1 100%;
    min-height: 70px; /* Достаточно места для описания на мобилке */
    font-size: clamp(0.78rem, 2.1vw, 0.88rem);
  }
  .card-wide { min-height: 45px; } 
  .card-inner { padding: 7px 4px; gap: 5px; }
  .card-tooltip { padding: 7px 9px; }
  .card-percent { font-size: 0.80em; min-width: 30px; }
  .tooltip-text { font-size: 0.80rem; }
}
</style>
