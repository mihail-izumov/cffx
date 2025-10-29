<template>
  <div class="treemap">
    <div
      v-for="(cat, idx) in categories"
      :key="cat.category"
      class="treemap-card"
      :style="cardStyle(cat.percent, idx)"
      @mouseenter="activeIdx = idx"
      @mouseleave="activeIdx = -1"
    >
      <div class="card-title">{{ cat.category }}</div>
      <div class="card-percent">{{ cat.percent }}%</div>
      <transition name="fade">
        <div v-if="activeIdx === idx" class="card-tooltip">{{ cat.desc }}</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeIdx = ref(-1)
const categories = [
  { category: 'Долгое ожидание заказа', percent: 18.3, desc: 'Жалобы на задержку, большие очереди, ожидание >10-20 минут, забыли заказ.' },
  { category: 'Ошибки в заказе', percent: 12.5, desc: 'Неправильный напиток, забыли позицию, перепутали сироп/размер, неверный счет.' },
  { category: 'Качество блюд/напитков', percent: 13.3, desc: 'Кофе холодный или невкусный, несвежая/чёрствая еда.' },
  { category: 'Чистота зала/посуды/уборной', percent: 10.8, desc: 'Грязные столы/пол, волосы в еде, грязная уборная.' },
  { category: 'Грубость и невнимательность персонала', percent: 10.0, desc: 'Официанты хамят, не здороваются, игнорируют просьбы.' },
  { category: 'Проблемы с очередями и обслуживанием', percent: 5.8, desc: 'Нет системы очереди, хаос, путаница заказов.' },
  { category: 'Неуютная атмосфера/музыка/запах', percent: 5.0, desc: 'Шумно, неуютно, неприятно пахнет.' },
  { category: 'Антисанитария/инородные предметы', percent: 6.7, desc: 'Волосы, пластик, тараканы в зале.' },
  { category: 'Упаковка и напитки на вынос', percent: 4.2, desc: 'Проблемы с крышками, проливается, неудобная упаковка.' },
  { category: 'Отсутствие внимания/коммуникации', percent: 4.2, desc: 'Не спросили про аллергию, нет рекомендаций.' },
  { category: 'Цена/акции/выгода', percent: 3.3, desc: 'Дорого, не работает акция.' },
  { category: 'Профессионализм персонала', percent: 2.5, desc: 'Персонал не умеет готовить, не знает меню.' },
  { category: 'Дизайн и интерьер', percent: 1.7, desc: 'Не понравился интерьер, скучно.' },
  { category: 'Парковка и доступность', percent: 1.7, desc: 'Нет парковки, сложно найти вход.' },
]

function cardStyle(percent, idx) {
  // responsive размер + градиент в зависимости от доли
  const baseSize = 90 + percent * 4 // px
  const gradient =
    `linear-gradient(135deg, #23242c ${30 + idx * 3}%, #3a3f48 100%)`
  return {
    width: `${baseSize}px`,
    height: `${baseSize}px`,
    background: gradient,
    color: '#f1f1f1',
    margin: '8px',
    borderRadius: '18px',
    boxShadow: '0 2px 20px 0 rgba(30,30,30,0.2)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s cubic-bezier(.62, .53, .75, .94)'
  }
}
</script>

<style scoped>
.treemap {
  display: flex;
  flex-wrap: wrap;
  max-width: 420px; /* mobile-first */
  gap: 0;
}
.treemap-card {
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
}
.card-title {
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2px;
}
.card-percent {
  font-size: 1.3rem;
  font-weight: 700;
  opacity: 0.7;
}
.card-tooltip {
  position: absolute;
  z-index: 10;
  left: 0; right: 0;
  bottom: -34px;
  background: rgba(44,49,56,0.96);
  color: #f1f1f1;
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 0.93rem;
  box-shadow: 0 3px 12px rgba(30,30,30,0.16);
  max-width: 260px;
  margin: 0 auto;
  opacity: 1;
  transition: opacity 0.23s;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.24s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
@media (min-width: 540px) {
  .treemap { max-width: 600px }
}
</style>
