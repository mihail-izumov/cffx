<template>
  <div class="signal-treemap-reset">
    <!-- Ряд 1: 2 крупные карточки -->
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

    <!-- Ряд 2: 2 крупные карточки -->
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

    <!-- Ряд 3: 3 средние карточки -->
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
        <div class="card-inner card-inner-mid">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i + 4" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Ряд 4: 3 средние карточки -->
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
        <div class="card-inner card-inner-mid">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
        </div>
        <transition name="fade-smooth">
          <div v-if="activeIdx === i + 7" class="card-tooltip">
            <div class="tooltip-text">{{ cat.desc }}</div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Нижний блок: 3 широкие карточки -->
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
        <div class="card-inner card-inner-wide">
          <span class="card-problem card-mediumweight">{{ cat.category }}</span>
          <span class="card-percent card-mediumweight">{{ cat.percent }}%</span>
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
.signal-treemap-reset {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0 8px;
  background: none;
  box-sizing: border-box;
  font-family: inherit;
}

.row,
.row-2,
.row-3 {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  margin-bottom: 4px;
}

.column-center {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
}

.card {
  background: #232427;
  color: #eaeaea;
  border-radius: 13px;
  box-shadow: 0 1px 6px #18181a13;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  word-break: break-word;
  transition: transform 0.15s ease;
}

.card:hover,
.card:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px #18181a1a;
}

/* Крупные карточки (2 в ряд) */
.card-large {
  flex: 1 1 calc(50% - 4px);
  min-width: 0;
  min-height: 78px;
  height: auto;
  font-size: clamp(0.92rem, 1.8vw, 1.15rem);
}

/* Средние карточки (3 в ряд) */
.card-mid {
  flex: 1 1 calc(33.333% - 5.333px);
  min-width: 0;
  min-height: 56px;
  height: auto;
  font-size: clamp(0.84rem, 1.6vw, 0.98rem);
}

/* Широкие карточки (1 на строку) */
.card-wide {
  flex: 1 1 100%;
  min-width: 0;
  min-height: 48px;
  height: auto;
  font-size: clamp(0.86rem, 1.7vw, 1rem);
}

.card-inner,
.card-inner-mid,
.card-inner-wide {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  box-sizing: border-box;
  gap: 8px;
}

.card-inner-wide {
  justify-content: center;
}

.card-problem {
  font-weight: 500;
  text-align: left;
  white-space: normal;
  line-height: 1.2;
  font-size: 1em;
  flex: 4 1 0;
  overflow-wrap: anywhere;
}

.card-percent {
  font-weight: 400;
  text-align: right;
  font-size: 0.9em;
  color: #eaeaea;
  opacity: 0.5;
  white-space: nowrap;
  flex: 1 1 0;
  min-width: 38px;
}

.card-mediumweight {
  font-weight: 500 !important;
}

.card-tooltip {
  position: absolute;
  inset: 0;
  background: #161719ee;
  color: #ededed;
  border-radius: 13px;
  z-index: 10;
  box-shadow: 0 4px 16px #16171724;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px 14px;
  animation: tooltipPop 0.32s ease-out;
}

.tooltip-text {
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.35;
  text-align: left;
  white-space: normal;
  overflow-wrap: anywhere;
  max-width: 100%;
}

.fade-smooth-enter-active,
.fade-smooth-leave-active {
  transition: opacity 0.38s cubic-bezier(0.55, 0, 0.2, 1);
}

.fade-smooth-enter-from,
.fade-smooth-leave-to {
  opacity: 0;
}

@keyframes tooltipPop {
  0% {
    opacity: 0.75;
    transform: scale(0.97);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* === Адаптивность === */

/* Средние экраны: 2 карточки в ряд */
@media (max-width: 720px) {
  .signal-treemap-reset {
    padding: 0 4px;
  }
  .row,
  .row-2,
  .row-3 {
    gap: 6px;
  }
  .card-large {
    flex: 1 1 calc(50% - 3px);
    min-height: 70px;
    font-size: clamp(0.86rem, 2.2vw, 1rem);
  }
  .card-mid {
    flex: 1 1 calc(50% - 3px);
    min-height: 58px;
    font-size: clamp(0.8rem, 2vw, 0.92rem);
  }
  .card-inner,
  .card-inner-mid,
  .card-inner-wide {
    padding: 8px 10px;
  }
  .card-tooltip {
    padding: 10px 12px;
  }
  .tooltip-text {
    font-size: 0.84rem;
  }
}

/* Маленькие экраны: 1 карточка в ряд */
@media (max-width: 480px) {
  .card-large,
  .card-mid {
    flex: 1 1 100%;
    min-height: 64px;
    font-size: clamp(0.82rem, 2.4vw, 0.9rem);
  }
  .card-wide {
    min-height: 52px;
    font-size: clamp(0.82rem, 2.4vw, 0.9rem);
  }
  .card-inner,
  .card-inner-mid,
  .card-inner-wide {
    padding: 8px 8px;
    gap: 6px;
  }
  .card-percent {
    font-size: 0.86em;
    min-width: 36px;
  }
  .card-tooltip {
    padding: 8px 10px;
  }
  .tooltip-text {
    font-size: 0.8rem;
    line-height: 1.3;
  }
}
</style>
