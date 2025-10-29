<template>
  <div class="signal-treemap">
    <!-- 2 ряда по 2 крупных карточки -->
    <div class="row row-2">
      <div
        v-for="(cat, i) in categories.slice(0,2)"
        :key="cat.category"
        class="card card-large"
        @mouseenter="activeIdx = i"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>
    <div class="row row-2">
      <div
        v-for="(cat, i) in categories.slice(2,4)"
        :key="cat.category"
        class="card card-large"
        @mouseenter="activeIdx = i+2"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+2" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>
    <!-- Средние и центровка -->
    <div class="row row-3">
      <div
        v-for="(cat, i) in categories.slice(4,7)"
        :key="cat.category"
        class="card card-medium"
        @mouseenter="activeIdx = i+4"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+4" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>
    <!-- Компактный блок из трех карточек в ряд по центру -->
    <div class="row row-3 center-row">
      <div
        v-for="(cat, i) in categories.slice(7, 10)"
        :key="cat.category"
        class="card card-mini"
        @mouseenter="activeIdx = i+7"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+7" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>
    <!-- Оставшиеся в столбик по центру -->
    <div class="row column-center">
      <div
        v-for="(cat, i) in categories.slice(10)"
        :key="cat.category"
        class="card card-line"
        @mouseenter="activeIdx = i+10"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+10" class="card-tooltip">
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
.signal-treemap {
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0; background: none;
}

.row {
  display: flex;
  width: 100%;
}

.row-2 { justify-content: flex-start; gap: 14px; margin-bottom: 6px; }
.row-3 { justify-content: center; gap: 10px; margin-bottom: 5px; }
.center-row { justify-content: center; }
.column-center { flex-direction: column; align-items: center; margin-top: 2px; gap: 4px; }

.card {
  background: #232427;
  color: #eaeaea;
  border-radius: 13px;
  box-shadow: 0 1px 6px #18181a13;
  transition: box-shadow 0.14s, transform 0.14s;
  cursor: pointer;
  min-width: 0;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: background .10s;
  margin: 0;
}

.card-large {
  flex: 1 1 0;
  min-width: 170px;
  max-width: 440px;
  height: 82px;
  font-size: clamp(0.91rem, 2vw, 1.27rem);
}
.card-medium {
  flex: 1 1 0;
  min-width: 110px;
  max-width: 320px;
  height: 62px;
  font-size: clamp(0.8rem, 1.5vw, 1.06rem);
}
.card-mini {
  flex: 1 1 0;
  min-width: 90px;
  max-width: 210px;
  height: 48px;
  font-size: clamp(0.77rem, 1.3vw, 0.97rem);
}
.card-line {
  min-width: 150px;
  max-width: 460px;
  width: 44vw;
  font-size: clamp(0.79rem, 1.3vw, 1.07rem);
  height: 41px;
  margin-bottom: 2px;
}

.card-inner {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 14px;
  height: 100%;
  box-sizing: border-box;
}

.card-problem {
  font-weight: 500;
  text-align: left;
  flex: 1 1 auto;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.2;
  font-size: 1em;
}

.card-percent {
  font-weight: 400;
  text-align: right;
  font-size: 0.95em;
  margin-left: 8px;
  color: #eaeaea;
  opacity: 0.47;
  min-width: 44px;
  line-height: 1.21;
  white-space: nowrap;
}

.card-tooltip {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #161719ee;
  color: #ededed;
  border-radius: 13px;
  z-index: 120;
  box-shadow: 0 4px 16px #16171724;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 14px 18px 14px 16px;
  animation: tooltipPop 0.18s;
}
.tooltip-text {
  font-size: clamp(0.92rem, 1.16vw, 1.09rem);
  font-weight: 400;
  color: #ededed;
  line-height: 1.34;
  text-align: left;
  letter-spacing: 0.01em;
  padding: 0;
  max-width: 98%;
  margin: 0;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.19s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
@keyframes tooltipPop {
  0% { opacity: 0.6; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
}

/* Мобайл и tablet адаптация */
@media (max-width: 680px) {
  .signal-treemap, .signal-treemap .row {max-width: 100vw; width: 100vw;}
  .signal-treemap {margin-left: 0;}
  .row-2 {gap: 6px;}
  .row-3, .center-row {gap: 5px;}
  .card-large {height: 52vw; font-size: 1rem; min-width: 42vw;}
  .card-medium {height: 38vw; font-size: 0.92rem; min-width: 27vw;}
  .card-mini {height: 27vw; font-size: 0.88rem; min-width: 18vw;}
  .card-line {height: 14vw; min-width: 110px; width: 90vw; font-size: 0.9rem;}
  .card-inner {padding: 0 8px;}
  .card-tooltip {font-size: 1.01rem; padding: 2.5vw 2vw;}
}
</style>
