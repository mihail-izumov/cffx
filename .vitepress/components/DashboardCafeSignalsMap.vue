<template>
  <div class="signal-treemap-fix">
    <!-- 2 ряда по 2 крупных карточки -->
    <div class="row row-2">
      <div v-for="(cat, i) in categories.slice(0,2)" :key="cat.category"
           class="card card-large"
           @mouseenter="activeIdx = i"
           @mouseleave="activeIdx = -1"
           tabindex="0">
        <div class="card-inner card-inner-large">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
        </transition>
      </div>
    </div>
    <div class="row row-2">
      <div v-for="(cat, i) in categories.slice(2,4)" :key="cat.category"
           class="card card-large"
           @mouseenter="activeIdx = i+2"
           @mouseleave="activeIdx = -1"
           tabindex="0">
        <div class="card-inner card-inner-large">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+2" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
        </transition>
      </div>
    </div>
    <!-- 3 в ряд (gap одинаковый) -->
    <div class="row row-3">
      <div v-for="(cat, i) in categories.slice(4,7)" :key="cat.category"
           class="card card-mid"
           @mouseenter="activeIdx = i+4"
           @mouseleave="activeIdx = -1"
           tabindex="0">
        <div class="card-inner card-inner-mid">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+4" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
        </transition>
      </div>
    </div>
    <!-- 3 по ширине -->
    <div class="row row-3">
      <div v-for="(cat, i) in categories.slice(7,10)" :key="cat.category"
           class="card card-mid"
           @mouseenter="activeIdx = i+7"
           @mouseleave="activeIdx = -1"
           tabindex="0">
        <div class="card-inner card-inner-mid">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+7" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
        </transition>
      </div>
    </div>
    <!-- по одной карточке (максимальная ширина, минимальная высота, одинаковый отступ) -->
    <div class="column-center">
      <div v-for="(cat, i) in categories.slice(10)" :key="cat.category"
           class="card card-wide"
           @mouseenter="activeIdx = i+10"
           @mouseleave="activeIdx = -1"
           tabindex="0">
        <div class="card-inner card-inner-wide">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+10" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
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
.signal-treemap-fix {
  width: 100%;
  max-width: 920px;
  min-width: 260px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex; flex-direction: column;
  gap: 0; padding: 0;
}
.row {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 6px;
  gap: 6px;
}
.row-2 {gap: 6px;}
.row-3 {gap: 6px;}
.column-center { display: flex; flex-direction: column; align-items: stretch; gap: 6px; }

.card {
  background: #232427;
  color: #eaeaea;
  border-radius: 12px;
  box-shadow: 0 1px 6px #18181a13;
  cursor: pointer;
  min-width: 0;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin: 0;
  word-break: break-word;
  box-sizing: border-box;
}

.card-large {
  flex: 1 1 0px;
  width: 100%;
  min-width: 120px;
  max-width: 100%;
  height: 76px;
  font-size: clamp(0.88rem, 1vw, 1.11rem);
}
.card-mid {
  flex: 1 1 0px;
  width: 100%;
  min-width: 86px;
  max-width: 100%;
  height: 48px;
  font-size: clamp(0.88rem, .88vw, 0.97rem);
}
.card-wide {
  width: 100%;
  max-width: 100%;
  min-width: 140px;
  height: 38px;
  font-size: clamp(0.88rem, .88vw, 0.97rem);
  display: flex;
}
.card-inner,
.card-inner-large,
.card-inner-mid,
.card-inner-wide {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  gap: 0;
  min-height: inherit;
  box-sizing: border-box;
}
.card-inner-wide {justify-content: space-between;}
.card-problem {
  font-weight: 500;
  text-align: left;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.11;
  font-size: 1em;
  flex: 4 1 0;
}
.card-percent {
  font-weight: 500;
  text-align: right;
  font-size: 0.93em;
  margin-left: 8px;
  color: #eaeaea;
  opacity: 0.48;
  min-width: 38px;
  max-width: 70px;
  white-space: nowrap;
  flex: 1 1 0;
}
.card-mediumweight {
  font-weight: 500 !important;
}
.card-tooltip {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  background: #161719ee; color: #ededed;
  border-radius: 12px; z-index: 120;
  box-shadow: 0 4px 16px #16171724;
  display: flex; align-items: flex-start; justify-content: flex-start;
  padding: 11px 8px 8px 13px;
  animation: tooltipPop 0.18s;
}
.tooltip-text {
  font-size: 0.88rem;
  font-weight: 400;
  color: #ededed;
  line-height: 1.31;
  text-align: left;
  max-width: 96%;
  margin: 0;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* Анимации и мобильная адаптация */
.fade-enter-active, .fade-leave-active { transition: opacity 0.19s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
@keyframes tooltipPop {
  0% { opacity: 0.7; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
}

@media (max-width: 700px) {
  .signal-treemap-fix, .row {max-width: 99vw; width: 99vw;}
  .row, .row-2, .row-3, .column-center {gap: 3px; margin-bottom: 3px;}
  .card-large {height: 21vw;font-size:0.92rem;}
  .card-mid {height:12vw;font-size:0.79rem;}
  .card-wide {height:8vw;font-size:0.79rem;}
  .card-inner, .card-inner-large, .card-inner-mid, .card-inner-wide {padding: 0 4px;}
  .tooltip-text {font-size:0.78rem;}
}

@media (max-width: 420px) {
  .card-large {font-size:0.75rem;}
  .card-mid, .card-wide {font-size:0.70rem;}
  .card-inner, .card-inner-large, .card-inner-mid, .card-inner-wide {padding: 0 1px;}
  .tooltip-text {font-size:0.75rem;}
}
</style>
