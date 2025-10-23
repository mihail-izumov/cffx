<script setup>
import { ref, nextTick, onMounted } from 'vue'

const cafeNames = ['Корж', 'MOSAIC', 'Surf', 'Skuratov', 'Белотурка', 'Кэрри']

const selectedCafe = ref(cafeNames[0] || 'Корж')
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
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Корж' }"
          @click="selectedCafe = 'Корж'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
          </svg>
          Корж
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'MOSAIC' }"
          @click="selectedCafe = 'MOSAIC'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
          MOSAIC
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Surf' }"
          @click="selectedCafe = 'Surf'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
          Surf
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Skuratov' }"
          @click="selectedCafe = 'Skuratov'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
          Skuratov
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Белотурка' }"
          @click="selectedCafe = 'Белотурка'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
          Белотурка
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Кэрри' }"
          @click="selectedCafe = 'Кэрри'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
          Кэрри
        </button>
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
  padding: 32px 0; 
}

.signal2-cafe-switchers-container { 
  position: relative; 
  margin-bottom: 32px; 
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
  border-radius: 50px; 
  padding: 12px 20px; 
  font-size: 15px; 
  font-weight: 700; 
  cursor: pointer; 
  border: none; 
  transition: all 0.3s ease; 
  white-space: nowrap; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  min-width: fit-content; 
  position: relative; 
  overflow: hidden; 
  background: rgba(70, 70, 70, 0.6); 
  color: rgba(255, 255, 255, 0.9); 
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

.signal2-switcher-icon { 
  width: 16px; 
  height: 16px; 
  flex-shrink: 0; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
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
    padding: 24px 0; 
  }
}

@media (max-width: 480px) {
  .signal2-widget-content { 
    padding: 20px 0; 
  }
}
</style>
