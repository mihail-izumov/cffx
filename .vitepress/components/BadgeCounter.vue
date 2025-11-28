<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(0)
let timer = null

const updateCount = () => {
  const now = new Date()
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes()
  const intervalIndex = Math.floor(minutesSinceMidnight / 90)
  const totalIntervals = 15
  const calculated = Math.round((intervalIndex / totalIntervals) * 47)
  count.value = Math.min(47, Math.max(0, calculated))
}

onMounted(() => {
  updateCount()
  timer = setInterval(updateCount, 60 * 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="signal-badge">
    <div class="signal-content">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="signal-icon"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/>
      </svg>
      
      <span class="signal-text">
        {{ count }} оценок и Сигналов отправлено сегодня
      </span>
    </div>
  </div>
</template>

<style scoped>
.signal-badge {
  display: inline-flex;
  align-items: center;
  background-color: #191B1A;
  border-radius: 9999px;
  padding: 7px 18px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
}

.signal-content {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #D3FF5C;
  white-space: nowrap;
}

.signal-text {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  user-select: none;
}

.signal-icon {
  width: 20px;
  height: 20px;
  color: inherit;
  display: block;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .signal-badge {
    padding: 6px 14px;
  }
  
  .signal-content {
    gap: 8px;
  }
  
  .signal-text {
    font-size: 13px;
  }
  
  .signal-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .signal-badge {
    padding: 5px 12px;
  }
  
  .signal-content {
    gap: 6px;
  }
  
  .signal-text {
    font-size: 12px;
  }
  
  .signal-icon {
    width: 15px;
    height: 15px;
  }
}
</style>
