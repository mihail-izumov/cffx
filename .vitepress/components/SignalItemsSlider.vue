<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const signalItems = [
  {
    name: 'Рестораны\nи Кофейни',
    subtitle: '',
    url: '/me/coffee',
    icon: '<path d="M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487"/><path d="M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132"/><path d="M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42"/><path d="M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14"/><path d="M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676"/>',
    gradientId: 'gradient-0'
  },
  {
    name: 'Фитнес-клубы\nи Студии',
    subtitle: '',
    url: '/me/fitness',
    icon: '<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',
    gradientId: 'gradient-1'
  },
  {
    name: 'Как работает',
    subtitle: 'Диалоги с Анной',
    url: '/signals',
    icon: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z M20 2v4 M22 4h-4 M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>',
    gradientId: 'gradient-2'
  }
]

const showLeftGradient = ref(false)
const showRightGradient = ref(false)
const switchersRef = ref(null)

const isActive = (url) => {
  const currentPath = route.path
  const normalizedCurrent = currentPath.replace(/\.html$/, '')
  const normalizedUrl = url.replace(/\.html$/, '')
  
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
          v-for="item in signalItems"
          :key="item.name"
          :href="isActive(item.url) ? undefined : item.url"
          :class="[
            'signal2-switcher',
            { 'signal2-switcher-active': isActive(item.url) },
            { 'signal2-switcher-no-subtitle': !item.subtitle }
          ]"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="signal2-switcher-icon" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            :stroke="`url(#${item.gradientId})`" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            filter="url(#depth-effect)"
          >
            <g v-html="item.icon"></g>
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
  white-space: pre-line;
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
