<template>
  <div class="treemap-full">
    <div
      v-for="(cat, idx) in categories"
      :key="cat.category"
      class="treemap-card"
      :class="cardClass(cat.percent)"
      :style="cardStyle(cat.percent, idx)"
      @mouseenter="activeIdx = idx"
      @mouseleave="activeIdx = -1"
      tabindex="0"
    >
      <div class="card-content">
        <div class="card-title">{{ cat.category }}</div>
        <div class="card-percent">{{ cat.percent }}%</div>
      </div>
      <transition name="fade">
        <div v-if="activeIdx === idx" class="card-tooltip">
          <div class="tooltip-text">{{ cat.desc }}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeIdx = ref(-1)

const categories = [
  { category: 'Долгое ожидание заказа', percent: 18.3, desc: 'Жалобы на задержку более 10-20 минут, очереди, забыли заказ.' },
  { category: 'Ошибки в заказе', percent: 12.5, desc: 'Неправильный напиток, забытая позиция, перепутали сироп или размер, неверный счет.' },
  { category: 'Качество блюд/напитков', percent: 13.3, desc: 'Кофе невкусный или остыл, еда несвежая или странная, комочки, недоварено.' },
  { category: 'Чистота зала/посуды/уборной', percent: 10.8, desc: 'Грязные столы, волосы в еде, грязная уборная, насекомые.' },
  { category: 'Грубость и невнимательность персонала', percent: 10.0, desc: 'Официанты хамят, не обращают внимания, игнорируют просьбы.' },
  { category: 'Антисанитария/инородные предметы', percent: 6.7, desc: 'Волосы, пластик, грязные руки, тараканы.' },
  { category: 'Проблемы с очередями и обслуживанием', percent: 5.8, desc: 'Нет системы очереди, путаница заказов, хаос.' },
  { category: 'Неуютная атмосфера/музыка/запах', percent: 5.0, desc: 'Шумно, неприятный запах, плохая музыка, неуютно.' },
  { category: 'Упаковка и напитки на вынос', percent: 4.2, desc: 'Проблемы с упаковкой, неудобные стаканы, проливается.' },
  { category: 'Отсутствие внимания/коммуникации', percent: 4.2, desc: 'Не объяснили детали, не помогли с выбором.' },
  { category: 'Цена/акции/выгода', percent: 3.3, desc: 'Дорого, не действует акция или скидка.' },
  { category: 'Профессионализм персонала', percent: 2.5, desc: 'Не знают меню, не разбираются в кофе.' },
  { category: 'Дизайн и интерьер', percent: 1.7, desc: 'Не понравился интерьер, мало света, неудобная мебель.' },
  { category: 'Парковка и доступность', percent: 1.7, desc: 'Нет парковки, проблемно добраться или попасть в кафе.' },
]

function cardClass(percent) {
  if (percent >= 12.5) return 'large-card'
  if (percent >= 7) return 'medium-card'
  return 'small-card'
}

function cardStyle(percent, idx) {
  // Размер карточки: крупные 50%, средние 30%, мелкие 20% визуально по площади
  let size, base;
  if (percent >= 12.5) { size = 'calc((100% - 32px) / 3 * 1.07)'; base = 0.07 }
  else if (percent >= 7) { size = 'calc((100% - 32px) / 3 * 0.86)'; base = 0.13 }
  else { size = 'calc((100% - 32px) / 3 * 0.65)'; base = 0.23 }
  // Градиент: умеренно-графитовый, легкий оттенок lime для акцентов
  const gradient = idx % 3 === 0
    ? 'linear-gradient(135deg, #323339 66%, #43434a 100%)'
    : idx % 5 === 0
    ? 'linear-gradient(135deg, #232423 60%, #4b4e50 100%)'
    : 'linear-gradient(120deg, #2e3034 70%, #37393a 100%)'
  return {
    width: size,
    minWidth: '120px',
    maxWidth: '360px',
    aspectRatio: '1/1',
    background: gradient,
    color: '#f2f2f2',
    margin: '10px',
    borderRadius: '18px',
    boxShadow: '0 3px 18px 0 rgba(30,30,30,0.10)',
    transition: 'all 0.32s cubic-bezier(.63,.31,.53,1.02)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: idx < 3 ? '2.4px solid #A5FF34' : '1.2px solid #2f2f34',
    outline: idx < 2 ? '1.8px solid #cdf95544' : 'none',
    zIndex: 1
  }
}
</script>

<style scoped>
.treemap-full {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1080px; /* stretch all */
  margin: 0 auto;
  gap: 0;
  min-height: 520px;
  background: linear-gradient(124deg, #232426 0%, #303134 100%);
  padding: 18px 2px 32px 2px;
}
.treemap-card {
  box-sizing: border-box;
  cursor: pointer;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  min-height: 120px;
}

.large-card .card-content { font-size: 1.33rem; font-weight: 700 }
.medium-card .card-content { font-size: 1.08rem; font-weight: 600 }
.small-card .card-content { font-size: 0.97rem; font-weight: 550 }

.card-content {
  width: 100%;
  text-align: center;
  max-width: 210px;
  padding: 0 11px 0 11px;
  line-height: 1.23;
  letter-spacing: 0.01em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-title {
  font-weight: 700;
  font-size: 1em;
  margin-bottom: 2px;
  color: #e9e9e9;
  line-height: 1.21;
  text-shadow: 0 1px 4px #23232330;
}

.card-percent {
  font-size: 1.05em;
  color: #A5FF34;
  letter-spacing: 0.03em;
  font-weight: 680;
  margin-top: 2.5px;
  margin-bottom: 0;
  opacity: 0.9;
  text-shadow: 0 1.8px 11px #23232317;
}

.card-tooltip {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 101.6%;
  height: 101.6%;
  background: linear-gradient(135deg, #30343a 70%, #232926 100%);
  border-radius: 16px;
  color: #F2FFEF;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 38px #2f2f3455;
  z-index: 180;
  text-align: center;
  animation: tooltipPop 0.25s cubic-bezier(.61,.49,.98,.95);
  border: 2.8px solid #A5FF34cc;
}
.tooltip-text {
  max-width: 410px;
  padding: 28px 12px;
  font-size: 1.18rem;
  line-height: 1.45;
  font-weight: 600;
  color: #D6FFD7;
  letter-spacing: 0.01em;
  filter: drop-shadow(0 3px 16px #74db4440);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.27s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
@media (max-width: 720px) {
  .treemap-full { max-width: 99vw; padding: 9px 0 18px 0; min-height: 350px; }
  .treemap-card { min-width: 98px; min-height: 76px }
  .large-card .card-content { font-size: 1em }
  .medium-card .card-content { font-size: 0.87em }
  .small-card .card-content { font-size: 0.77em }
  .card-tooltip { padding: 0 }
}
@keyframes tooltipPop {
  0% { opacity: 0.5; transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1); }
}
</style>
