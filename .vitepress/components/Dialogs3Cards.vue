<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const ROTATION_INTERVAL_MS = 7000
const FADE_DURATION_MS = 1000

const rotatingMessages = [
  'Перехватывает негатив в 2ГИС/Яндекс до публикации',
  'Помогает решить проблемы с гостями в два клика'
]

const currentMessageIndex = ref(0)
const showText = ref(true)
let rotatorInterval = null

const cycleRotatorText = () => {
  showText.value = false
  setTimeout(() => {
    currentMessageIndex.value = (currentMessageIndex.value + 1) % rotatingMessages.length
    showText.value = true
  }, FADE_DURATION_MS)
}

onMounted(() => {
  rotatorInterval = setInterval(cycleRotatorText, ROTATION_INTERVAL_MS)
})

onUnmounted(() => {
  clearInterval(rotatorInterval)
})
</script>

<template>
  <div class="rw-reviews-widget-content">
    <div class="rw-main-card">
      <!-- Ротатор перенесен наверх -->
      <div class="rw-control-panel">
        <div class="rw-control-panel-header">
          <span class="rw-static-prompt">24/7:</span>
          <div class="rw-rotating-text-container">
            <span :class="['rw-rotating-text', { 'rw-show': showText }]">
              {{ rotatingMessages[currentMessageIndex] }}
            </span>
          </div>
        </div>
      </div>

      <div class="rw-stats-grid">
        <!-- Отправка Сигнала -->
        <div class="rw-stat-card">
          <div class="rw-stat-content">
            <div class="rw-stat-header">
              <svg class="rw-stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
              <div class="rw-stat-title">отправка сигнала</div>
            </div>
            <div class="rw-stat-main">
              <div class="rw-stat-value">30 сек</div>
            </div>
            <div class="rw-stat-description">Умная форма ускоряет процесс</div>
          </div>
        </div>

        <!-- Уточняет детали -->
        <div class="rw-stat-card">
          <div class="rw-stat-content">
            <div class="rw-stat-header">
              <svg class="rw-stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <div class="rw-stat-title">уточняет детали</div>
            </div>
            <div class="rw-stat-main">
              <div class="rw-stat-value">3 ч</div>
            </div>
            <div class="rw-stat-description">обработка, персональное уточнение, формирование тикета</div>
          </div>
        </div>

        <!-- Поиск решения -->
        <div class="rw-stat-card">
          <div class="rw-stat-content">
            <div class="rw-stat-header">
              <svg class="rw-stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <div class="rw-stat-title">поиск решения</div>
            </div>
            <div class="rw-stat-main">
              <div class="rw-stat-value">24 ч</div>
            </div>
            <div class="rw-stat-description">уточнение тикета, доставка результата, оценка NPS</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rw-reviews-widget-content { 
  padding: 0; 
  width: 100%; 
  box-sizing: border-box;
}

.rw-main-card { 
  background: var(--vp-c-bg-soft); 
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}

.rw-control-panel { 
  margin-bottom: 24px; 
}

.rw-control-panel-header { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  padding: 0 8px; 
  font-size: 14px; 
  font-weight: 600; 
}

.rw-static-prompt { 
  color: white; 
  margin-right: 8px; 
  flex-shrink: 0; 
}

.rw-rotating-text-container { 
  flex-grow: 1; 
  text-align: left; 
  color: rgba(255, 255, 255, 0.7); 
  min-height: 36px; 
  display: flex; 
  align-items: center;
}

.rw-rotating-text { 
  transition: opacity 0.5s ease-in-out; 
  line-height: 1.2; 
}

.rw-rotating-text:not(.rw-show) { 
  opacity: 0; 
}

.rw-stats-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 16px; 
}

.rw-stat-card {
  position: relative;
  border-radius: 22px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.rw-stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 2px;
  background: linear-gradient(135deg, #4d7c0f, #A3E635, #C5F946);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: filter 0.4s ease;
  z-index: 1;
}

.rw-stat-card:hover {
  transform: translateY(-8px);
}

.rw-stat-card:hover::before {
  filter: brightness(1.5) saturate(1.3);
}

.rw-stat-content {
  background: radial-gradient(circle at 50% 0%, rgba(163, 230, 53, 0.15) 0%, transparent 70%);
  border-radius: 20px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 280px;
  text-align: center;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  z-index: 2;
}

.rw-stat-card:hover .rw-stat-content {
  background: radial-gradient(circle at 50% 0%, rgba(163, 230, 53, 0.3) 0%, transparent 70%);
  box-shadow: 0 25px 50px -10px rgba(0,0,0,0.4);
}

.rw-stat-header { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 8px;
  height: 60px;
  justify-content: flex-start;
}

.rw-stat-icon { 
  color: #A3E635;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  flex-shrink: 0;
}

.rw-stat-card:hover .rw-stat-icon { 
  transform: scale(1.2);
  color: #C5F946;
}

.rw-stat-title { 
  font-size: 12px;
  font-weight: 700; 
  color: rgba(255,255,255,0.9); 
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  white-space: nowrap;
}

.rw-stat-card:hover .rw-stat-title { 
  transform: scale(1.05);
  color: #A3E635;
}

.rw-stat-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rw-stat-value {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  white-space: nowrap;
}

.rw-stat-card:hover .rw-stat-value {
  transform: scale(1.05);
  text-shadow: 0 0 30px rgba(163, 230, 53, 0.5);
  color: #A3E635;
}

.rw-stat-description {
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.3;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  letter-spacing: 0.02em;
  max-width: 180px;
  margin: 0 auto;
}

.rw-stat-card:hover .rw-stat-description { 
  transform: scale(1.02);
  color: rgba(163, 230, 53, 0.9);
}

/* Мобильная версия */
@media (max-width: 768px) {
  .rw-reviews-widget-content { 
    padding: 0; 
  }
  
  .rw-main-card { 
    padding: 20px; 
    border-radius: 12px; 
  }

  .rw-control-panel { 
    margin-bottom: 20px; 
  }
  
  .rw-stats-grid { 
    grid-template-columns: 1fr; 
    gap: 12px; 
  }
  
  .rw-stat-card { 
    border-radius: 16px; 
    transition: none;
  }
  
  .rw-stat-card:hover { 
    transform: none; 
  }
  
  .rw-stat-content { 
    display: flex;
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: flex-start; 
    padding: 20px 18px 20px 18px;
    min-height: auto;
    background: radial-gradient(circle at 20% 50%, rgba(163, 230, 53, 0.15) 0%, transparent 70%) !important;
    gap: 16px;
  }
  
  .rw-stat-header { 
    flex-direction: row; 
    align-items: center; 
    gap: 8px; 
    width: 100%;
    justify-content: flex-start;
    height: auto;
  }
  
  .rw-stat-icon { 
    width: 20px; 
    height: 20px; 
  }
  
  .rw-stat-title { 
    font-size: 11px; 
    margin: 0; 
  }
  
  .rw-stat-main {
    width: 100%;
    flex: none;
  }
  
  .rw-stat-value {
    font-size: 2rem !important;
    font-weight: 500 !important;
    margin: 0;
    line-height: 1;
  }
  
  .rw-stat-description { 
    font-size: 13px !important;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.3;
    text-align: left;
    margin: 0;
    width: 100%;
    height: auto;
    align-items: flex-start;
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .rw-main-card { 
    padding: 16px; 
  }
  
  .rw-control-panel { 
    margin-bottom: 16px; 
  }
  
  .rw-stat-content { 
    padding: 18px 16px 18px 16px;
    gap: 14px;
  }
  
  .rw-stat-value { 
    font-size: 1.8rem !important; 
  }
  
  .rw-stat-description { 
    font-size: 12px !important; 
  }
}
</style>
