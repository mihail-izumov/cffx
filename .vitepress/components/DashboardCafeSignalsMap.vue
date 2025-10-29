<template>
  <div class="signal-treemap-reset">
    <!-- Ряд 1: 2 крупные -->
    <div class="row row-2">
      <div
        v-for="(cat, i) in categories.slice(0, 2)"
        :key="cat.category"
        class="card card-large"
        @mouseenter="activeIdx = i"
        @mouseleave="activeIdx = -1"
        @focus="activeIdx = i"
        @blur="activeIdx = -1"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
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
        @mouseenter="activeIdx = i + 2"
        @mouseleave="activeIdx = -1"
        @focus="activeIdx = i + 2"
        @blur="activeIdx = -1"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
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
        @mouseenter="activeIdx = i + 4"
        @mouseleave="activeIdx = -1"
        @focus="activeIdx = i + 4"
        @blur="activeIdx = -1"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
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
        @mouseenter="activeIdx = i + 7"
        @mouseleave="activeIdx = -1"
        @focus="activeIdx = i + 7"
        @blur="activeIdx = -1"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
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

    <!-- Нижние 3 карточки — в колонке, компактные -->
    <div class="column-center">
      <div
        v-for="(cat, i) in categories.slice(10)"
        :key="cat.category"
        class="card card-wide"
        @mouseenter="activeIdx = i + 10"
        @mouseleave="activeIdx = -1"
        @focus="activeIdx = i + 10"
        @blur="activeIdx = -1"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
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

const categories = [
  { category: 'Качество блюд/напитков', percent: 13.3, desc: 'Кофе невкусный или остыл, еда несвежая, странный привкус, комочки.' },
  { category: 'Чистота зала/посуды/уборной', percent: 10.8, desc: 'Грязные столы, посуда, волосы в еде, уборная, насекомые.' },
  { category: 'Грубость и невнимательность персонала', percent: 10.0, desc: 'Официанты хамят, не обращают внимания, невежливы.' },
  { category: 'Ошибки в заказе', percent: 12.5, desc: 'Неправильный напиток, забытая позиция, перепутали сироп или размер.' },
  { category: 'Антисанитария/инородные предметы', percent: 6.7, desc: 'Волосы, пластик, грязные руки, тараканы.' },
  { category: 'Проблемы с очередями и обслуживанием', percent: 5.8, desc: 'Нет системы очереди, путаница, хаос.' },
  { category: 'Неуютная атмосфера/музыка/запах', percent: 5.0, desc: 'Шумно, неприятный запах, громкая музыка, неуютно.' },
  { category: 'Упаковка и напитки на вынос', percent: 4.2, desc: 'Проблемы с упаковкой, неудобные стаканы, проливается.' },
  { category: 'Отсутствие внимания/коммуникации', percent: 4.2, desc: 'Не объяснили детали, не помогли с выбором.' },
  { category: 'Цена/акции/выгода', percent: 3.3, desc: 'Дорого, не действует акция.' },
  { category: 'Профессионализм персонала', percent: 2.5, desc: 'Не знают меню, не различают сорта кофе.' },
  { category: 'Дизайн и интерьер', percent: 1.7, desc: 'Не понравился интерьер, мало света, неудобная мебель.' },
  { category: 'Парковка и доступность', percent: 1.7, desc: 'Нет парковки, сложно добраться.' },
]
</script>

<style scoped>
/* === Общие стили === */
.signal-treemap-reset {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 6px;
  box-sizing: border-box;
  font-family: inherit;
}

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
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(24, 24, 26, 0.08);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:hover,
.card:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(24, 24, 26, 0.15);
}

/* 2 крупные карточки в ряд */
.card-large {
  flex: 1 1 calc(50% - 3px);
  min-width: 0;
  min-height: 76px;
  height: auto;
  font-size: clamp(0.94rem, 1.8vw, 1.14rem);
}

/* 3 средние карточки в ряд */
.card-mid {
  flex: 1 1 calc(33.333% - 4px);
  min-width: 0;
  min-height: 56px;
  height: auto;
  font-size: clamp(0.84rem, 1.6vw, 0.98rem);
}

/* Нижние — компактные, одна на строку */
.card-wide {
  flex: 1 1 100%;
  min-width: 0;
  min-height: 42px;
  height: auto;
  font-size: clamp(0.84rem, 1.6vw, 0.98rem);
}

/* === Внутренний контент === */
.card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 11px;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}

.card-problem {
  font-weight: 500;
  font-size: 1em;
  line-height: 1.2;
  white-space: normal;
  overflow-wrap: anywhere;
  flex: 1;
  text-align: left;
}

.card-percent {
  font-weight: 400;
  font-size: 0.88em;
  color: #eaeaea;
  opacity: 0.55;
  white-space: nowrap;
  min-width: 38px;
  text-align: right;
}

/* === Тултип — 100% непрозрачный === */
.card-tooltip {
  position: absolute;
  inset: 0;
  background: #161719;
  color: #ededed;
  border-radius: 12px;
  z-index: 10;
  padding: 10px 11px;
  display: flex;
  align-items: flex-start;
  animation: tooltipPop 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(22, 23, 25, 0.3);
}

.tooltip-text {
  font-size: 0.88rem;
  font-weight: 400;
  line-height: 1.35;
  white-space: normal;
  overflow-wrap: anywhere;
  max-width: 100%;
}

/* === Анимации === */
.fade-smooth-enter-active,
.fade-smooth-leave-active {
  transition: opacity 0.3s ease;
}

.fade-smooth-enter-from,
.fade-smooth-leave-to {
  opacity: 0;
}

@keyframes tooltipPop {
  0% { opacity: 0.9; transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1); }
}

/* === Адаптивность === */
@media (max-width: 720px) {
  .signal-treemap-reset { padding: 0 4px; }
  .row, .row-2, .row-3 { gap: 5px; }
  .card-large { flex: 1 1 calc(50% - 2.5px); min-height: 68px; }
  .card-mid { flex: 1 1 calc(50% - 2.5px); min-height: 54px; }
  .card-inner, .card-tooltip { padding: 9px 10px; }
}

@media (max-width: 480px) {
  .card-large,
  .card-mid {
    flex: 1 1 100%;
    min-height: 62px;
    font-size: clamp(0.82rem, 2.3vw, 0.9rem);
  }
  .card-wide { min-height: 40px; }
  .card-inner, .card-tooltip { padding: 8px 9px; gap: 6px; }
  .card-percent { font-size: 0.84em; min-width: 34px; }
  .tooltip-text { font-size: 0.82rem; }
}
</style>
