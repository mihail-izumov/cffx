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
    <div class="column-center">
      <div
        v-for="(cat, i) in categories.slice(10)"
        :key="cat.category"
        class="card card-line"
        @mouseenter="activeIdx = i+10"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner card-inner-center">
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
  width: 100%;
  max-width: 1196px;
  margin: 0 auto;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  background: none;
}
.row {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 2px;
}
.row-2 { justify-content: flex-start; gap: 9px; }
.row-3, .center-row { justify-content: center; gap: 7px; margin-bottom: 2px; }
.center-row {justify-content: center;}
.column-center { display: flex; flex-direction: column; align-items: center; gap: 4px; }
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
  min-width: 200px;
  max-width: 550px;
  min-height: 88px;
  height: auto;
  font-size: clamp(0.88rem, 2vw, 1.25rem);
  display: flex;
}
.card-medium {
  flex: 1 1 0;
  min-width: 120px;
  max-width: 365px;
  min-height: 72px;
  height: auto;
  font-size: clamp(0.76rem, 1.6vw, 1rem);
  display: flex;
}
.card-mini {
  flex: 1 1 0;
  min-width: 110px;
  max-width: 230px;
  min-height: 47px;
  height: auto;
  font-size: clamp(0.75rem, 1.15vw, 0.91rem);
  display: flex;
}
.card-line {
  min-width: 180px;
  max-width: 622px;
  width: 62vw;
  height: auto;
  min-height: 43px;
  margin-bottom: 2px;
  font-size: clamp(0.79rem, 1.2vw, 1.07rem);
  display: flex;
}
/* card-inner для длинных карточек c центрированием */
.card-inner-center {
  justify-content: center !important;
  gap: 10vw;
}
.card-inner {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 11px;
  min-height: inherit;
  box-sizing: border-box;
}
.card-problem {
  font-weight: 500;
  text-align: left;
  flex: 2 1 0;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.17;
  font-size: 1em;
}
.card-percent {
  font-weight: 400;
  text-align: right;
  font-size: 0.96em;
  margin-left: 11px;
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
  padding: 17px 18px 14px 16px;
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
@media (max-width: 900px) {
  .signal-treemap, .signal-treemap .row {max-width: 99vw; width: 99vw;}
  .signal-treemap {margin-left: 0;}
  .row-2 {gap: 4px;}
  .row-3, .center-row {gap: 4px;}
  .card-large {min-height: 21vw;font-size: 1.02rem; min-width: 39vw;}
  .card-medium {min-height: 16vw;font-size: 0.9rem;min-width: 24vw;}
  .card-mini {min-height: 11vw;font-size: 0.82rem;min-width: 12vw;}
  .card-line {min-height: 10vw;min-width: 44vw;width:98vw;font-size:0.92rem;}
  .card-inner, .card-inner-center {padding: 0 7px;}
  .card-tooltip {font-size: 1.01rem; padding: 2vw 2vw;}
}

@media (max-width: 520px) {
  .card-large {font-size:0.83rem;}
  .card-medium {font-size:0.76rem;}
  .card-mini {font-size:0.7rem;}
  .card-line {font-size:0.77rem;}
  .card-inner, .card-inner-center {padding: 0 2px;}
  .card-tooltip {font-size: 0.92rem; padding: 3vw 1vw;}
}
</style>
