<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const cafeItems = [
  {
    name: 'Сигнал<br>для Бизнеса',
    subtitle: '',
    url: '/pro1',
    icon: 'M12 5 m-9 0 a9 3 0 1 0 18 0 a9 3 0 1 0 -18 0 M3 5V19A9 3 0 0 0 15 21.84 M21 5V8 M21 12L18 17H22L19 22 M3 12A9 3 0 0 0 14.59 14.87',
    gradientId: 'gradient-0'
  },
  {
    name: 'Сигнал Диалоги',
    subtitle: '',
    url: '/pro/dialogs1',
    icon: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1',
    gradientId: 'gradient-1'
  },
  {
    name: 'Сигнал Макс',
    subtitle: '',
    url: '/pro/max',
    icon: 'M19.07 4.93A10 10 0 0 0 6.99 3.34 M4 6h.01 M2.29 9.62A10 10 0 1 0 21.31 8.35 M16.24 7.76A6 6 0 1 0 8.23 16.67 M12 18h.01 M17.99 11.66A6 6 0 0 1 15.77 16.67 M12 12 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M13.41 10.59l5.66-5.66',
    gradientId: 'gradient-2'
  },
  {
    name: 'Тест-драйв',
    subtitle: 'Старт Бесплатно',
    url: '/pro/customize',
    icon: 'M4 10a7.31 7.31 0 0 0 10 10Z M9 15l3-3 M17 13a6 6 0 0 0-6-6 M21 13A10 10 0 0 0 11 3',
    gradientId: 'gradient-4'
  },
  {
    name: 'Анна',
    subtitle: 'ИИ-ассистент',
    url: '/pro/anna',
    icon: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z M20 2v4 M22 4h-4 M4 20 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0',
    gradientId: 'gradient-3'
  },
  {
    name: 'Тикеты',
    subtitle: '',
    url: '/pro/tickets',
    icon: 'M3 3 h18 v18 h-18 z M3 3 a2 2 0 0 1 2 -2 M21 3 a2 2 0 0 0 -2 -2 M3 21 a2 2 0 0 0 2 2 M21 21 a2 2 0 0 1 -2 2 M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21',
    gradientId: 'gradient-6'
  },
  {
    name: 'Аналитика',
    subtitle: '',
    url: '/pro/analytics',
    icon: 'M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z M7 16.5l-4.74-2.85 M7 16.5l5-3 M7 16.5v5.17 M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z M17 16.5l-5-3 M17 16.5l4.74-2.85 M17 16.5v5.17 M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z M12 8L7.26 5.15 M12 8l4.74-2.85 M12 13.5V8',
    gradientId: 'gradient-7'
  },
  {
    name: 'Спецификация',
    subtitle: '',
    url: '/pro/specs',
    icon: 'M12 20v2 M12 2v2 M17 20v2 M17 2v2 M2 12h2 M2 17h2 M2 7h2 M20 12h2 M20 17h2 M20 7h2 M7 20v2 M7 2v2 M4 4 h16 v16 h-16 z M4 4 a2 2 0 0 1 2 -2 M20 4 a2 2 0 0 0 -2 -2 M4 20 a2 2 0 0 0 2 2 M20 20 a2 2 0 0 1 -2 2 M8 8 h8 v8 h-8 z M8 8 a1 1 0 0 1 1 -1 M16 8 a1 1 0 0 0 -1 -1 M8 16 a1 1 0 0 0 1 1 M16 16 a1 1 0 0 1 -1 1',
    gradientId: 'gradient-5'
  }
]

const showLeftGradient = ref(false)
const showRightGradient = ref(false)
const switchersRef = ref(null)

// Проверяем активную страницу (более гибкое сравнение)
const isActive = (url) => {
  const currentPath = route.path
  // Убираем расширение .html если есть
  const normalizedCurrent = currentPath.replace(/\.html$/, '')
  const normalizedUrl = url.replace(/\.html$/, '')
  
  // Точное совпадение или начало пути
  return normalizedCurrent === normalizedUrl || 
         normalizedCurrent.startsWith(normalizedUrl + '/') ||
         normalizedCurrent + '.html' === normalizedUrl ||
         normalizedCurrent === normalizedUrl + '.html'
}

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
  
  // Отладка - покажет текущий путь в консоли
  console.log('Current route path:', route.path)
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
      <linearGradient id="gradient-0" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" style="stop-color:#545454;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#5c5c5c;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#646464;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#6c6c6c;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#747474;stop-opacity:1" />
      </linearGradient>
      
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
      
      <linearGradient id="gradient-5" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:#525252;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#5a5a5a;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#626262;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#6a6a6a;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#727272;stop-opacity:1" />
      </linearGradient>
      
      <linearGradient id="gradient-6" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:#505050;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#585858;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#606060;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#686868;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#707070;stop-opacity:1" />
      </linearGradient>
      
      <linearGradient id="gradient-7" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#4e4e4e;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#565656;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#5e5e5e;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#666666;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#6e6e6e;stop-opacity:1" />
      </linearGradient>
      
      <!-- Фильтр для создания эффекта объема -->
      <filter id="depth-effect">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
        <feOffset dx="0" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="depth-effect-hover">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="0" dy="3" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
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
          :href="isActive(item.url) ? undefined : item.url"
          :class="[
            'signal2-switcher',
            { 'signal2-switcher-active': isActive(item.url) },
            { 'signal2-switcher-no-subtitle': !item.subtitle }
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="`url(#${item.gradientId})`" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#depth-effect)">
            <path :d="item.icon"/>
          </svg>
          <div class="signal2-switcher-text">
            <div class="signal2-switcher-title">{{ item.name }}</div>
            <div v-if="item.subtitle" class="signal2-switcher-subtitle">{{ item.subtitle }}</div>
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
  padding: 16px 16px; 
  font-size: 15px; 
  cursor: pointer; 
  border: none; 
  transition: all 0.3s ease; 
  white-space: nowrap; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  gap: 12px; 
  min-width: 145px;
  max-width: 145px;
  width: 145px;
  position: relative; 
  overflow: hidden; 
  background: rgba(40, 40, 40, 0.6); 
  color: rgba(255, 255, 255, 0.6); 
  text-decoration: none;
  height: 120px;
}

.signal2-switcher:hover:not(.signal2-switcher-active) { 
  background: rgba(50, 50, 50, 0.95); 
  color: rgba(255, 255, 255, 0.9);
}

/* Активная карточка */
.signal2-switcher-active {
  background: rgba(40, 40, 40, 0.85);
  color: rgba(255, 255, 255, 0.9);
  cursor: default;
  pointer-events: none;
}

/* Карточка без подзаголовка - центрируем контент */
.signal2-switcher-no-subtitle {
  justify-content: center;
}

.signal2-switcher-icon {
  width: 32px; 
  height: 32px; 
  flex-shrink: 0; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: url(#depth-effect) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  opacity: 0.5;
}

.signal2-switcher-active .signal2-switcher-icon {
  opacity: 1;
}

.signal2-switcher:hover:not(.signal2-switcher-active) .signal2-switcher-icon {
  filter: url(#depth-effect-hover) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  transform: translateY(-2px) scale(1.08);
  opacity: 1;
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
  color: inherit;
  transition: color 0.3s ease;
  white-space: normal;
}

.signal2-switcher-subtitle {
  font-size: 11px;
  font-weight: 400;
  color: #d4ff6b;
  line-height: 1.3;
  white-space: normal;
  max-width: 115px;
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.signal2-switcher-active .signal2-switcher-subtitle {
  opacity: 1;
}

.signal2-switcher:hover:not(.signal2-switcher-active) .signal2-switcher-subtitle {
  opacity: 1;
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
    padding: 16px 14px;
    min-width: 145px;
    max-width: 145px;
    width: 145px;
  }
}

@media (max-width: 480px) {
  .signal2-switcher {
    height: 125px;
    padding: 14px 12px;
    gap: 10px;
    min-width: 145px;
    max-width: 145px;
    width: 145px;
  }
  
  .signal2-switcher-subtitle {
    max-width: 115px;
  }
}
</style>
