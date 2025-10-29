<template>
  <div class="signal-treemap-reset">
    <div class="row row-2">
      <div v-for="(cat, i) in categories.slice(0,2)" :key="cat.category" class="card card-large" @mouseenter="activeIdx = i" @mouseleave="activeIdx = -1" tabindex="0">
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
        </transition>
      </div>
    </div>
    <div class="row row-2">
      <div v-for="(cat, i) in categories.slice(2,4)" :key="cat.category" class="card card-large" @mouseenter="activeIdx = i+2" @mouseleave="activeIdx = -1" tabindex="0">
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i+2" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
        </transition>
      </div>
    </div>
    <div class="row row-3">
      <div v-for="(cat, i) in categories.slice(4,7)" :key="cat.category" class="card card-mid" @mouseenter="activeIdx = i+4" @mouseleave="activeIdx = -1" tabindex="0">
        <div class="card-inner card-inner-mid">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i+4" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
        </transition>
      </div>
    </div>
    <div class="row row-3">
      <div v-for="(cat, i) in categories.slice(7,10)" :key="cat.category" class="card card-mid" @mouseenter="activeIdx = i+7" @mouseleave="activeIdx = -1" tabindex="0">
        <div class="card-inner card-inner-mid">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i+7" class="card-tooltip"><div class="tooltip-text">{{ cat.desc }}</div></div>
        </transition>
      </div>
    </div>
    <div class="column-center">
      <div v-for="(cat, i) in categories.slice(10)" :key="cat.category" class="card card-wide" @mouseenter="activeIdx = i+10" @mouseleave="activeIdx = -1" tabindex="0">
        <div class="card-inner card-inner-wide">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
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
.signal-treemap-reset {
  width: 100%;
  max-width: 900px;
  min-width: 300px;
  margin: 0 auto;
  display: flex; flex-direction: column; gap: 0; padding: 0; background: none;
}
.row {
  display: flex;
  width: 100%;
  gap: 12px;
  margin-bottom: 7px;
}
.row-3 {margin-bottom:4px;}
.column-center { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.card {
  background: #232427;
  color: #eaeaea;
  border-radius: 13px;
  box-shadow: 0 1px 6px #18181a13;
  cursor: pointer;
  min-width: 0;
  display: flex; align-items: center;
  position: relative;
  overflow: hidden;
  margin: 0;
  word-break: break-word;
  box-sizing: border-box;
}
.card-large {
  flex: 1 1 0;
  min-width: 210px;
  max-width: 100%;
  height: 86px;
  font-size: clamp(0.93rem, 2vw, 1.18rem);
}
.card-mid {
  flex: 1 1 0;
  min-width: 130px;
  max-width: 100%;
  height: 57px;
  font-size: 1rem;
}
.card-wide {
  width: 100%;
  max-width: 100%;
  min-width: 210px;
  height: 48px;
  font-size: 1rem;
  margin-bottom: 0;
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
  padding: 0 14px;
  min-height: inherit;
  box-sizing: border-box;
  gap: 0;
}
.card-inner-wide {justify-content: center;}
.card-problem {
  font-weight: 500;
  text-align: left;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.13;
  font-size: 1em;
  flex: 4 1 0;
}
.card-percent {
  font-weight: 400;
  text-align: right;
  font-size: 0.91em;
  margin-left: 8px;
  color: #eaeaea;
  opacity: 0.47;
  min-width: 42px;
  max-width: 70px;
  white-space: nowrap;
  flex: 1 1 0;
}
.card-mediumweight { font-weight: 500 !important; }
.card-tooltip {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  background: #161719ee; color: #ededed;
  border-radius: 13px; z-index: 120;
  box-shadow: 0 4px 16px #16171724;
  display: flex; align-items: flex-start; justify-content: flex-start;
  padding: 12px 10px 10px 14px;
  animation: tooltipPop 0.34s;
}
.tooltip-text {
  font-size: 0.93rem;
  font-weight: 400;
  color: #ededed;
  line-height: 1.31;
  text-align: left;
  max-width: 98%;
  margin: 0; white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
}
.fade-smooth-enter-active, .fade-smooth-leave-active {
  transition: opacity 0.44s cubic-bezier(.55,0,.2,1);
}
.fade-smooth-enter-from, .fade-smooth-leave-to { opacity: 0 }
@keyframes tooltipPop {
  0% { opacity: 0.7; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
}
@media (max-width: 700px) {
  .signal-treemap-reset, .row {max-width: 99vw; width: 99vw;}
  .row, .row-2, .row-3, .column-center {gap: 4px; margin-bottom: 5px;}
  .card-large {height: 15vw; font-size:0.92rem;}
  .card-mid {height: 10vw; font-size:0.87rem;}
  .card-wide {height:8vw; font-size:0.87rem;}
  .card-inner, .card-inner-large, .card-inner-mid, .card-inner-wide {padding: 0 6px;}
  .card-tooltip {padding: 10px 3vw;}
  .tooltip-text {font-size:0.82rem;}
}
@media (max-width: 420px) {
  .card-large {font-size:0.77rem;}
  .card-mid, .card-wide {font-size:0.70rem;}
  .card-inner, .card-inner-large, .card-inner-mid, .card-inner-wide {padding: 0 2px;}
  .card-tooltip {padding: 5px 2vw;}
  .tooltip-text {font-size:0.72rem;}
}
</style>

