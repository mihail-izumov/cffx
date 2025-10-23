<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const cafeItems = [
  {
    name: 'Диалоги',
    subtitle: 'Окупается с первых Сигналов',
    url: '/dialogi',
    icon: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1'
  },
  {
    name: 'Система',
    subtitle: 'Поток связи → метрики и рост',
    url: '/sistema',
    icon: 'M19.07 4.93A10 10 0 0 0 6.99 3.34 M4 6h.01 M2.29 9.62A10 10 0 1 0 21.31 8.35 M16.24 7.76A6 6 0 1 0 8.23 16.67 M12 18h.01 M17.99 11.66A6 6 0 0 1 15.77 16.67 M12 12 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M13.41 10.59l5.66-5.66'
  },
  {
    name: 'Настроить Сигнал',
    subtitle: 'Старт за 48 часов. Бесплатно.',
    url: '/nastroit-signal',
    icon: 'M4 10a7.31 7.31 0 0 0 10 10Z M9 15l3-3 M17 13a6 6 0 0 0-6-6 M21 13A10 10 0 0 0 11 3'
  },
  {
    name: 'Спецификация',
    subtitle: 'Дьявол в деталях',
    url: '/specifikacija',
    icon: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z M20 2v4 M22 4h-4 M4 20 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0'
  }
]

const showLeftGradient = ref(false)
const showRightGradient = ref(false)
const switchersRef = ref(null)

const handleSwitcherScroll = () => {
  if (!switchersRef.value) return
  
  const container = switchersRef.value
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth
  const clientWidth = container.clientWidth
  
  showLeftGradient.value = scrollLeft > 10
  showRightGradient.value = scrollLeft < (scrollWidth - clientWidth - 10)
}

onMounted(() => {
  const container = switchersRef.value
  if (container) {
    nextTick(() => {
      handleSwitcherScroll()
    })
    container.addEventListener('scroll', handleSwitcherScroll)
    window.addEventListener('resize', handleSwitcherScroll)
  }
})

onUnmounted(() => {
  const container = switchersRef.value;
  if (container) {
    container.removeEventListener('scroll', handleSwitcherScroll)
    window.removeEventListener('resize', handleSwitcherScroll)
  }
})
</script>

<template>
  <div class="signal2-widget-content">
    <div class="signal2-cafe-switchers-container">
      <div 
        class="signal2-cafe-switchers" 
        ref="switchersRef"
      >
        <a
          v-for="item in cafeItems"
          :key="item.name"
          :href="item.url"
          class="signal2-switcher"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.icon"/>
          </svg>
          <div class="signal2-switcher-text">
            <div class="signal2-switcher-title">{{ item.name }}</div>
            <div class="signal2-switcher-subtitle">{{ item.subtitle }}</div>
          </div>
        </a>
      </div>
      
      <div 
        class="signal2-switchers-gradient signal2-switchers-gradient-left"
        :class="{ 'signal2-gradient-visible': showLeftGradient }"
      >
        <div class="signal2-gradient-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>

      <div 
        class="signal2-switchers-gradient signal2-switchers-gradient-right"
        :class="{ 'signal2-gradient-visible': showRightGradient }"
      >
        <div class="signal2-gradient-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signal2-widget-content { 
  padding: 12px 0; 
}

.signal2-cafe-switchers-container { 
  position: relative; 
  margin-bottom: 16px; 
}

.signal2-cafe-switchers { 
  display: flex; 
  gap: 12px; 
  padding-bottom: 12px;
  padding-right: 12px;
  flex-wrap: nowrap; 
  overflow-x: auto; 
  -webkit-overflow-scrolling: touch; 
  scrollbar-width: none; 
}

.signal2-cafe-switchers::-webkit-scrollbar { 
  display: none; 
}

.signal2-switcher { 
  border-radius: 12px; 
  padding: 16px 20px; 
  font-size: 15px; 
  cursor: pointer; 
  border: none; 
  transition: background 0.3s ease, box-shadow 0.3s ease; 
  white-space: nowrap; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  gap: 12px; 
  min-width: 160px;
  max-width: 160px;
  width: 160px;
  position: relative; 
  overflow: hidden; 
  background: rgba(55, 55, 55, 0.75); 
  color: rgba(255, 255, 255, 0.9); 
  text-decoration: none;
  height: 120px;
}

.signal2-switcher:hover { 
  background: rgba(75, 75, 75, 0.85); 
}

.signal2-switcher-icon,
.signal2-switcher-title {
  transition: all 0.3s ease;
}

.signal2-switcher:hover .signal2-switcher-icon,
.signal2-switcher:hover .signal2-switcher-title {
  color: rgba(255, 255, 255, 0.9);
}

.signal2-switcher-icon { 
  width: 32px; 
  height: 32px; 
  flex-shrink: 0; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
}

.signal2-switcher-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.signal2-switcher-title {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.2;
  color: rgba(255, 255, 255, 1);
}

.signal2-switcher-subtitle {
  font-size: 11px;
  font-weight: 400;
  color: #d4ff6b;
  line-height: 1.3;
  white-space: normal;
  max-width: 130px;
}

.signal2-switchers-gradient { 
  position: absolute; 
  top: 0; 
  bottom: 12px; 
  width: 60px; 
  pointer-events: none; 
  z-index: 2; 
  opacity: 0; 
  transition: opacity 0.4s ease; 
  display: flex;
  align-items: center;
}

.signal2-switchers-gradient.signal2-gradient-visible { 
  opacity: 1; 
}

.signal2-switchers-gradient-left { 
  left: -1px; 
  justify-content: flex-start;
  background: linear-gradient(
    to right, 
    #1b1b1f 0%, 
    #1b1b1f 30%, 
    rgba(27, 27, 31, 0) 100%
  ); 
}

.signal2-switchers-gradient-right { 
  right: 0; 
  justify-content: flex-end;
  background: linear-gradient(
    to left, 
    #1b1b1f 0%, 
    #1b1b1f 30%, 
    rgba(27, 27, 31, 0) 100%
  ); 
}

.signal2-gradient-arrow {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 10px;
}

@media (max-width: 768px) {
  .signal2-switcher {
    height: 110px;
    padding: 14px 16px;
    min-width: 150px;
    max-width: 150px;
    width: 150px;
  }
}

@media (max-width: 480px) {
  .signal2-switcher {
    height: 100px;
    padding: 12px 14px;
    gap: 10px;
    min-width: 140px;
    max-width: 140px;
    width: 140px;
  }
}
</style>
