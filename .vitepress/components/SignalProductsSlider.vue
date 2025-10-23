<script setup>
import { ref, nextTick, onMounted } from 'vue'

const cafeItems = [
  {
    name: 'Диалоги',
    subtitle: 'Окупается с первых Сигналов',
    url: '/dialogi',
    active: false
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
    active: false
  },
  {
    name: 'Спецификация',
    subtitle: 'Дьявол в деталях',
    url: '/specifikacija',
    active: false
  }
]

const selectedCafe = ref('Система')
const showLeftGradient = ref(false)
const showRightGradient = ref(false)
const switchersRef = ref(null)

const handleSwitcherScroll = () => {
  if (!switchersRef.value) return
  
  const container = switchersRef.value
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth
  const clientWidth = container.clientWidth
  
  showLeftGradient.value = scrollLeft > 5
  showRightGradient.value = scrollLeft < (scrollWidth - clientWidth - 5)
}

onMounted(() => {
  nextTick(() => {
    handleSwitcherScroll()
  })
})
</script>

<template>
  <div class="signal2-widget-content">
    <div class="signal2-cafe-switchers-container">
      <div 
        class="signal2-cafe-switchers" 
        ref="switchersRef"
        @scroll="handleSwitcherScroll"
      >
        <a
          v-for="item in cafeItems"
          :key="item.name"
          :href="item.url"
          class="signal2-switcher"
          :class="{ active: item.active, disabled: !item.active && item.name === 'Диалоги' }"
          @click.prevent="item.active && (selectedCafe = item.name)"
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
      ></div>
      <div 
        class="signal2-switchers-gradient signal2-switchers-gradient-right"
        :class="{ 'signal2-gradient-visible': showRightGradient }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.signal2-widget-content { 
  padding: 24px 0; 
}

.signal2-cafe-switchers-container { 
  position: relative; 
  margin-bottom: 24px; 
}

.signal2-cafe-switchers { 
  display: flex; 
  gap: 12px; 
  padding-bottom: 12px; 
  flex-wrap: nowrap; 
  overflow-x: auto; 
  -webkit-overflow-scrolling: touch; 
  scrollbar-width: thin; 
  scrollbar-color: rgba(70, 70, 70, 0.8) transparent; 
}

.signal2-cafe-switchers::-webkit-scrollbar { 
  height: 2px; 
}

.signal2-cafe-switchers::-webkit-scrollbar-track { 
  background: transparent; 
}

.signal2-cafe-switchers::-webkit-scrollbar-thumb { 
  background-color: rgba(70, 70, 70, 0.8); 
  border-radius: 10px; 
}

.signal2-cafe-switchers::-webkit-scrollbar-thumb:hover { 
  background-color: rgba(85, 85, 85, 0.9); 
}

.signal2-switcher { 
  border-radius: 5px; 
  padding: 16px 20px; 
  font-size: 15px; 
  font-weight: 700; 
  cursor: pointer; 
  border: none; 
  transition: all 0.3s ease; 
  white-space: nowrap; 
  display: flex; 
  align-items: center; 
  gap: 16px; 
  min-width: fit-content; 
  position: relative; 
  overflow: hidden; 
  background: rgba(70, 70, 70, 0.6); 
  color: rgba(255, 255, 255, 0.9); 
  text-decoration: none;
  height: 80px;
}

.signal2-switcher::before { 
  content: ''; 
  position: absolute; 
  left: -200%; 
  top: 0; 
  width: 200%; 
  height: 100%; 
  background: linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 60%, transparent 70%, transparent 100%); 
  transition: all 1.2s ease; 
}

.signal2-switcher:hover::before { 
  left: 100%; 
}

.signal2-switcher.active { 
  background: rgba(255, 255, 255, 0.95); 
  color: #333; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
}

.signal2-switcher.active::before { 
  display: none; 
}

.signal2-switcher.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
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
  align-items: flex-start;
  gap: 4px;
  text-align: left;
}

.signal2-switcher-title {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
}

.signal2-switcher-subtitle {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
  line-height: 1.2;
  white-space: normal;
  max-width: 200px;
}

.signal2-switcher.active .signal2-switcher-subtitle {
  opacity: 0.6;
}

.signal2-switchers-gradient { 
  position: absolute; 
  top: 0; 
  bottom: 12px; 
  width: 60px; 
  pointer-events: none; 
  z-index: 2; 
  opacity: 0; 
  transition: opacity 0.6s ease; 
}

.signal2-switchers-gradient.signal2-gradient-visible { 
  opacity: 1; 
}

.signal2-switchers-gradient-left { 
  left: 0; 
  background: linear-gradient(
    to right, 
    #1b1b1f 0%, 
    #1b1b1f 20%, 
    rgba(27, 27, 31, 0.95) 40%, 
    rgba(27, 27, 31, 0.8) 60%, 
    rgba(27, 27, 31, 0.5) 80%, 
    transparent 100%
  ); 
}

.signal2-switchers-gradient-right { 
  right: 0; 
  background: linear-gradient(
    to left, 
    #1b1b1f 0%, 
    #1b1b1f 20%, 
    rgba(27, 27, 31, 0.95) 40%, 
    rgba(27, 27, 31, 0.8) 60%, 
    rgba(27, 27, 31, 0.5) 80%, 
    transparent 100%
  ); 
}

@media (max-width: 768px) {
  .signal2-switcher::before, 
  .signal2-switcher:hover::before { 
    display: none; 
  }
  
  .signal2-widget-content { 
    padding: 20px 0; 
  }

  .signal2-switcher {
    height: 70px;
    padding: 12px 16px;
  }

  .signal2-switcher-icon {
    width: 28px;
    height: 28px;
  }

  .signal2-switcher-subtitle {
    font-size: 11px;
    max-width: 180px;
  }
}

@media (max-width: 480px) {
  .signal2-widget-content { 
    padding: 16px 0; 
  }

  .signal2-switcher {
    height: 65px;
    padding: 10px 14px;
    gap: 12px;
  }

  .signal2-switcher-icon {
    width: 26px;
    height: 26px;
  }

  .signal2-switcher-title {
    font-size: 14px;
  }

  .signal2-switcher-subtitle {
    font-size: 10px;
    max-width: 160px;
  }
}
</style>
