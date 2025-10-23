<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const cafeItems = [
  {
    name: 'Диалоги',
    subtitle: 'Окупается с первых Сигналов',
    url: '/dialogi',
    active: true
  },
  {
    name: 'Система',
    subtitle: 'Поток связи → метрики и рост',
    url: '/sistema',
    active: true
  },
  {
    name: 'Настроить Сигнал',
    subtitle: 'Старт за 48 часов. Бесплатно.',
    url: '/nastroit-signal',
    active: true
  },
  {
    name: 'Спецификация',
    subtitle: 'Дьявол в деталях',
    url: '/specifikacija',
    active: true
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
            <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
            <path d="M8 12h.01"/>
            <path d="M12 12h.01"/>
            <path d="M16 12h.01"/>
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
  scrollbar-width: none; /* Firefox */
}

.signal2-cafe-switchers::-webkit-scrollbar { 
  display: none; /* Safari and Chrome */
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
  min-width: 150px;
  max-width: 150px;
  width: 150px;
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
.signal2-switcher-title,
.signal2-switcher-subtitle {
  transition: all 0.3s ease;
}

.signal2-switcher:hover .signal2-switcher-icon,
.signal2-switcher:hover .signal2-switcher-title,
.signal2-switcher:hover .signal2-switcher-subtitle {
  color: rgba(255, 255, 255, 0.9);
  opacity: 1;
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
  opacity: 0.7;
  line-height: 1.3;
  white-space: normal;
  max-width: 120px;
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
    min-width: 140px;
    max-width: 140px;
    width: 140px;
  }
}

@media (max-width: 480px) {
  .signal2-switcher {
    height: 100px;
    padding: 12px 14px;
    gap: 10px;
    min-width: 130px;
    max-width: 130px;
    width: 130px;
  }
}
</style>
