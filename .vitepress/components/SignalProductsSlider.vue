<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const cafeItems = [
  {
    name: 'Диалоги',
    subtitle: 'Окупается с первых Сигналов',
    url: '/dialogi',
    icon: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1',
    gradientId: 'gradient-1'
  },
  {
    name: 'Система',
    subtitle: 'Поток связи → метрики и рост',
    url: '/sistema',
    icon: 'M19.07 4.93A10 10 0 0 0 6.99 3.34 M4 6h.01 M2.29 9.62A10 10 0 1 0 21.31 8.35 M16.24 7.76A6 6 0 1 0 8.23 16.67 M12 18h.01 M17.99 11.66A6 6 0 0 1 15.77 16.67 M12 12 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M13.41 10.59l5.66-5.66',
    gradientId: 'gradient-2'
  },
  {
    name: 'Настроить Сигнал',
    subtitle: 'Старт за 48 часов. Бесплатно.',
    url: '/nastroit-signal',
    icon: 'M4 10a7.31 7.31 0 0 0 10 10Z M9 15l3-3 M17 13a6 6 0 0 0-6-6 M21 13A10 10 0 0 0 11 3',
    gradientId: 'gradient-3'
  },
  {
    name: 'Спецификация',
    subtitle: 'Дьявол в деталях',
    url: '/specifikacija',
    icon: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z M20 2v4 M22 4h-4 M4 20 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0',
    gradientId: 'gradient-4'
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
  <svg width="0" height="0" style="position: absolute;">
    <defs>
      <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#585858;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#606060;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#686868;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#707070;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#787878;stop-opacity:1" />
      </linearGradient>
      
      <linearGradient id="gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#5a5a5a;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#626262;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#6a6a6a;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#727272;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7a7a7a;stop-opacity:1" />
      </linearGradient>
      
      <linearGradient id="gradient-3" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#565656;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#5e5e5e;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#666666;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#6e6e6e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#767676;stop-opacity:1" />
      </linearGradient>
      
      <linearGradient id="gradient-4" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:#5c5c5c;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#646464;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#6c6c6c;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#747474;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7c7c7c;stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>

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
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="`url(#${item.gradientId})`" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  border: 1px solid rgba(60, 60, 60, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
  white-space: nowrap; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  gap: 12px; 
  min-width: 175px;
  max-width: 175px;
  width: 175px;
  position: relative; 
  overflow: hidden; 
  background: linear-gradient(135deg, rgba(40, 40, 40, 0.9) 0%, rgba(35, 35, 35, 0.95) 100%);
  color: rgba(255, 255, 255, 0.9); 
  text-decoration: none;
  height: 120px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.signal2-switcher::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    transparent 100%
  );
  opacity: 0.6;
}

.signal2-switcher::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    transparent 50%, 
    rgba(255, 255, 255, 0.03) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.signal2-switcher:hover { 
  background: linear-gradient(135deg, rgba(50, 50, 50, 0.95) 0%, rgba(45, 45, 45, 1) 100%);
  border-color: rgba(70, 70, 70, 0.6);
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.4),
    0 8px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.signal2-switcher-icon {
  width: 32px; 
  height: 32px; 
  flex-shrink: 0; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.signal2-switcher:hover .signal2-switcher-icon {
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
  transform: scale(1.05);
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
  color: rgba(255, 255, 255, 0.95);
  transition: color 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.signal2-switcher:hover .signal2-switcher-title {
  color: rgba(255, 255, 255, 1);
}

.signal2-switcher-subtitle {
  font-size: 11px;
  font-weight: 400;
  color: #d4ff6b;
  line-height: 1.3;
  white-space: normal;
  max-width: 145px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
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
    height: 130px;
    padding: 16px 18px;
    min-width: 175px;
    max-width: 175px;
    width: 175px;
  }
}

@media (max-width: 480px) {
  .signal2-switcher {
    height: 125px;
    padding: 14px 16px;
    gap: 10px;
    min-width: 175px;
    max-width: 175px;
    width: 175px;
  }
  
  .signal2-switcher-subtitle {
    max-width: 145px;
  }
}
</style>
