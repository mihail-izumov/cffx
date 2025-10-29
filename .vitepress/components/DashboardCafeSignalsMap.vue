<template>
  <div class="clean-treemap">
    <!-- 2 ряда по 2 крупные карточки -->
    <div class="row">
      <div
        v-for="(cat, i) in categories.slice(0,2)"
        :key="cat.category"
        class="card card-large"
        @mouseenter="activeIdx = i"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <div class="card-problem">{{ cat.category }}</div>
          <div class="card-percent">{{ cat.percent }}%</div>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i" class="card-tooltip card-tooltip-large">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(cat, i) in categories.slice(2,4)"
        :key="cat.category"
        class="card card-large"
        @mouseenter="activeIdx = i+2"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <div class="card-problem">{{ cat.category }}</div>
          <div class="card-percent">{{ cat.percent }}%</div>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+2" class="card-tooltip card-tooltip-large">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>
    <!-- Ряд из трех средних карточек -->
    <div class="row row-three">
      <div
        v-for="(cat, i) in categories.slice(4,7)"
        :key="cat.category"
        class="card card-medium"
        @mouseenter="activeIdx = i+4"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <div class="card-problem">{{ cat.category }}</div>
          <div class="card-percent">{{ cat.percent }}%</div>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+4" class="card-tooltip card-tooltip-medium">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>
    <!-- Остальные карточки — одна в строке -->
    <div
      v-for="(cat, i) in categories.slice(7)"
      :key="cat.category"
      class="row"
    >
      <div
        class="card card-long"
        @mouseenter="activeIdx = i+7"
        @mouseleave="activeIdx = -1"
        tabindex="0"
      >
        <div class="card-inner">
          <div class="card-problem">{{ cat.category }}</div>
          <div class="card-percent">{{ cat.percent }}%</div>
        </div>
        <transition name="fade">
          <div v-if="activeIdx === i+7" class="card-tooltip card-tooltip-long">
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
.clean-treemap {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 12px 32px 12px;
  background: #222324;
  border-radius: 22px;
  box-shadow: 0 5px 50px #2223241a;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 24px;
  margin-bottom: 16px;
}
.row-three {justify-content: space-between;}

.card {
  background: #292b2d;
  color: #eaeaea;
  border-radius: 18px;
  box-shadow: 0 2px 12px #2d2d2d1c;
  transition: box-shadow 0.18s cubic-bezier(.55,.18,1,.7), transform 0.22s;
  cursor: pointer;
  min-height: 64px;
  min-width: 0;
  width: 100%;
  max-width: none;
  display: flex;
  align-items: center;
  position: relative;
  overflow: visible;
  transition: background .16s;
}

.card-large {
  height: 120px;
  font-size: 1.53rem;
  min-width: 0;
}
.card-medium {
  height: 94px;
  font-size: 1.23rem;
  min-width: 0;
}
.card-long {
  width: 100%;
  height: 72px;
  font-size: 1.08rem;
  margin-bottom: 13px;
}

.card-inner {
  width: 100%;
  padding: 0 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.card-problem {
  font-weight: 500;
  text-align: left;
  flex: 1;
  font-size: inherit;
  letter-spacing: 0.01em;
  line-height: 1.13;
}

.card-percent {
  font-weight: 400;
  text-align: right;
  font-size: 1em;
  margin-left: 14px;
  color: #eaeaea;
  opacity: 0.58;
  letter-spacing: 0.02em;
  min-width: 54px;
}

.card-tooltip {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 100%;
  background: #232426fd;
  color: #ededed;
  border-radius: 16px;
  z-index: 120;
  box-shadow: 0 4px 32px #16171724;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 18px 32px 18px 28px;
  animation: tooltipPop 0.22s cubic-bezier(.62,.54,.78,.99);
}
.tooltip-text {
  font-size: 1.15rem;
  font-weight: 430;
  color: #ededed;
  line-height: 1.42;
  text-align: left;
  letter-spacing: 0.01em;
  padding: 0;
  max-width: 90%;
  margin: 0;
}

.card-tooltip-large {padding-top: 32px;}
.card-tooltip-medium {padding-top: 18px;}
.card-tooltip-long {padding-top: 10px;}

.fade-enter-active, .fade-leave-active { transition: opacity 0.28s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
@keyframes tooltipPop {
  0% { opacity: 0.7; transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1); }
}

/* Мобильная адаптация */
@media (max-width: 720px) {
  .clean-treemap { padding: 9px 2vw 14vw 2vw; max-width: 99vw; }
  .row { gap: 6px; margin-bottom: 9px; }
  .card-large {height: 84px; font-size: 1.1rem;}
  .card-medium {height: 74px; font-size: 0.93rem;}
  .card-long {height: 56px; font-size: 0.83rem;}
  .card-inner {padding: 0 7vw;}
  .card-tooltip, .card-tooltip-large, .card-tooltip-medium, .card-tooltip-long {
    padding: 6vw 8vw;
    font-size: 1.03rem;
  }
}

</style>
