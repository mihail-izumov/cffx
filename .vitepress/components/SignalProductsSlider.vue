<script setup>
import { ref, nextTick, onMounted } from 'vue'

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

const selectedCafe = ref(null)
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
  border-radius: 12px; 
  padding: 16px 20px; 
  font-size: 15px; 
  cursor: pointer; 
  border: none; 
  transition: background 0.5s ease, box-shadow 0.5s ease; 
  white-space: nowrap; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  gap: 12px; 
  min-width: 140px;
  max-width: 140px;
  width: 140px;
  position: relative; 
  overflow: hidden; 
  background: rgba(70, 70, 70, 0.65); 
  color: rgba(255, 255, 255, 0.9); 
  text-decoration: none;
  height: 120px;
}

.signal2-switcher:hover { 
  background: rgba(90, 90, 90, 0.85); 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
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
  width: 80px; 
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
    #1b1b1f 30%, 
    rgba(27, 27, 31, 0.95) 50%, 
    rgba(27, 27, 31, 0.8) 70%, 
    rgba(27, 27, 31, 0.5) 85%, 
    transparent 100%
  );
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
}

.signal2-gradient-arrow {
  width: 2px;
  height: 60%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 1px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signal2-gradient-arrow svg {
  position: absolute;
  right: -9px;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .signal2-widget-content { 
    padding: 10px 0; 
  }

  .signal2-switcher {
    height: 110px;
    padding: 14px 16px;
    min-width: 130px;
    max-width: 130px;
    width: 130px;
  }

  .signal2-switcher-icon {
    width: 28px;
    height: 28px;
  }

  .signal2-switcher-title {
    font-size: 12px;
  }

  .signal2-switcher-subtitle {
    font-size: 10px;
    max-width: 110px;
  }
}

@media (max-width: 480px) {
  .signal2-widget-content { 
    padding: 8px 0; 
  }

  .signal2-switcher {
    height: 100px;
    padding: 12px 14px;
    gap: 10px;
    min-width: 120px;
    max-width: 120px;
    width: 120px;
  }

  .signal2-switcher-icon {
    width: 26px;
    height: 26px;
  }

  .signal2-switcher-title {
    font-size: 11px;
  }

  .signal2-switcher-subtitle {
    font-size: 9px;
    max-width: 100px;
  }

  .signal2-gradient-arrow svg {
    width: 18px;
    height: 18px;
  }
}
</style>
