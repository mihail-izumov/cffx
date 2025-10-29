<template>
  <div class="signal-treemap-flex">
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
.signal-treemap-flex {
  width: 100%;
  max-width: 920px;
  min-width: 260px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex; flex-direction: column; gap: 0; padding: 0;
}
.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  gap: 8px;
}
.row-2 .card {
  flex: 1 1 350px;
  min-width: 220px;
  max-width: 100%;
  height: auto;
}
.row-3 .card {
  flex: 1 1 220px;
  min-width: 180px;
  max-width: calc(33% - 10px);
  height: auto;
}
.column-center { display: flex; flex-direction: column; align-items: stretch; gap: 10px; }
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
  width: 100%;
  max-width: 100%;
}
.card-large {
  font-size: clamp(0.96rem, 1vw, 1.18rem);
  min-height: 84px;
  padding: 8px 0;
}
.card-mid {
  font-size: 0.98rem;
  min-height: 72px;
  padding: 7px 0;
}
.card-wide {
  font-size: 0.98rem;
  width: 100%;
  max-width: 100%;
  min-width: 180px;
  min-height: 52px;
  padding: 5px 0;
  display: flex;
}
.card-inner {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 10px;
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
  line-height: 1.13;
  font-size: 1em;
  flex: 4 1 0;
  padding-left: 0;
}
.card-percent {
  font-weight: 500;
  text-align: right;
  font-size: 0.93em;
  margin-left: 6px;
  color: #eaeaea;
  opacity: 0.48;
  min-width: 45px;
  max-width: 70px;
  white-space: nowrap;
  flex: 1 1 0;
  padding-right: 0;
}
.card-mediumweight { font-weight: 500 !important; }
.card-tooltip {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  background: #161719ee; color: #ededed;
  border-radius: 12px; z-index: 120;
  box-shadow: 0 4px 16px #16171724;
  display: flex; align-items: flex-start; justify-content: flex-start;
  padding: 14px 10px 10px 10px;
  animation: tooltipPop 0.65s;
}
.tooltip-text {
  font-size: 0.97rem;
  font-weight: 400;
  color: #ededed;
  line-height: 1.33;
  text-align: left;
  max-width: 96%;
  margin: 0;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
  padding-left: 0;
}
/* Fade плавнее */
.fade-smooth-enter-active, .fade-smooth-leave-active {
  transition: opacity 0.65s cubic-bezier(.49,0,.14,1);
}
.fade-smooth-enter-from, .fade-smooth-leave-to { opacity: 0 }
@keyframes tooltipPop {
  0% { opacity: 0.4; transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1); }
}

/* Мобильная адаптация: перенос карточек, уменьшение min-width, авто-высота */
@media(max-width: 800px){
  .signal-treemap-flex,
  .row,
  .card {
    max-width: 100vw;
    width: 100vw;
    box-sizing: border-box;
  }
  .row-2 .card, .row-3 .card {
    flex-basis: 100%;
    min-width: 80vw;
    max-width: 100vw;
  }
  .card-large {min-height: 17vw;}
  .card-mid {min-height: 15vw;}
  .card-wide {min-height:13vw;}
  .card-inner, .card-tooltip {padding: 2vw;}
  .tooltip-text {font-size:0.89rem;}
}

/* Очень маленькие экраны: карточки 1 в строку */
@media(max-width: 520px){
  .row {margin-bottom: 5px; gap: 5px;}
  .card-large,
  .card-mid,
  .card-wide {font-size:0.82rem;}
  .card-inner, .card-tooltip{padding:1vw;}
  .tooltip-text{font-size:0.82rem;}
}
</style>
