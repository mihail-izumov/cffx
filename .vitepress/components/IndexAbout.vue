<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const ROTATION_INTERVAL_MS = 7000
const FADE_DURATION_MS = 1000

const establishment = {
  name: 'Лидерство Коржа подтверждают конкретные цифры',
  index: 98,
  currentPoints: 8,
  targetPoints: 12,
  influenceLevel: 'Высокое'
}

const rotatingMessages = [
  'Смотреть Индекс — полный срез рынка.',
  'Получать Пульс — еженедельные изменения и возможности.',
  'Это данные лидера сейчас. Хотите видеть свой прогресс — подпишитесь.'
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

const showTooltip = ref(false)
let longPressTimer = null

const onBadgeTouchStart = () => {
  longPressTimer = setTimeout(() => { showTooltip.value = true }, 500)
}
const onBadgeTouchEnd = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  setTimeout(() => { showTooltip.value = false }, 150)
}

const showInfoModal = ref(false)
const onKeydown = (e) => {
  if (e.key === 'Escape') {
    showInfoModal.value = false
  }
}

onMounted(() => {
  rotatorInterval = setInterval(cycleRotatorText, ROTATION_INTERVAL_MS)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  clearInterval(rotatorInterval)
  if (longPressTimer) clearTimeout(longPressTimer)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="reviews-widget-content">
    <div class="main-card">
      <div class="establishment-header">
        <div>
          <h3 class="cafe-name">{{ establishment.name }}</h3>
          <p class="cafe-subtitle">Индекс 98, потенциал 8(12+), высокое влияние. Карточки демонстрируют текущий расклад сил. Полный рейтинг раскроет динамику и возможности для роста.</p>
        </div>
        
        <div class="status-badge-wrapper">
          <button
            type="button"
            class="status-badge"
            aria-describedby="badge-tip"
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
            @focus="showTooltip = true"
            @blur="showTooltip = false"
            @touchstart.passive="onBadgeTouchStart"
            @touchend.passive="onBadgeTouchEnd"
            @touchcancel.passive="onBadgeTouchEnd"
          >
            Актуально: 06.09.2025
          </button>
          <div id="badge-tip" role="tooltip" class="tooltip" :class="{ show: showTooltip }">
            Обновляем каждую пятницу, 15:00 (МСК)
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <!-- ⚡ Индекс -->
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-header">
              <svg class="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
              </svg>
              <div class="stat-title">Индекс</div>
            </div>
            <div class="stat-value-section">
              <div class="stat-value main-value">{{ establishment.index }}</div>
              <div class="stat-description">Score всего бизнеса</div>
            </div>
          </div>
        </div>

        <!-- 🧩 Потенциал -->
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-header">
              <svg class="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/>
              </svg>
              <div class="stat-title">Потенциал</div>
            </div>
            <div class="stat-value-section">
              <div class="stat-value potential-value">
                <span class="current">{{ establishment.currentPoints }}</span>
                <span class="potential">({{ establishment.targetPoints }}+)</span>
              </div>
              <div class="stat-description">Точек сейчас и целевой масштаб сети</div>
            </div>
          </div>
        </div>

        <!-- 🌐 Влияние -->
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-header">
              <svg class="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
              <div class="stat-title">Влияние</div>
            </div>
            <div class="stat-value-section">
              <div class="stat-metric-badge">{{ establishment.influenceLevel }}</div>
              <div class="stat-description">Сила эффекта на рынок</div>
            </div>
          </div>
        </div>
      </div>

      <div class="control-panel">
        <div class="control-panel-header">
          <button
            type="button"
            class="info-link info-button"
            aria-haspopup="dialog"
            aria-controls="index-dialog"
            :aria-expanded="showInfoModal ? 'true' : 'false'"
            @click="showInfoModal = true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
          </button>
          <span class="static-prompt">Поделитесь:</span>
          <div class="rotating-text-container">
            <span :class="['rotating-text', { 'show': showText }]">
              {{ rotatingMessages[currentMessageIndex] }}
            </span>
          </div>
        </div>

        <div class="button-container">
          <a href="/smr" class="action-button ticket-button">Смотреть Индекс</a>
          <a href="/brew/run" class="action-button review-button">
            Получать Пульс
            <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
      <div class="modal" role="dialog" aria-modal="true" id="index-dialog" aria-label="Что такое Индекс Роста">
        <div class="modal-header">
          <div class="modal-title">Что такое Индекс Роста</div>
          <button class="modal-close" type="button" @click="showInfoModal = false" aria-label="Закрыть">✕</button>
        </div>
        <div class="modal-body">Интегральный score по десяткам показателей.</div>
        <div class="modal-footer">
          <button class="modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-widget-content { 
  padding: 0; 
  width: 100%; 
  box-sizing: border-box;
}

.main-card { 
  background: var(--vp-c-bg-soft); 
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}

.establishment-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start;
  margin-bottom: 24px; 
}

.cafe-name { 
  margin: 0; 
  color: #FFFFFF; 
  font-size: 24px; 
  font-weight: 600; 
}

.cafe-subtitle { 
  margin: 6px 0 0 0; 
  font-size: 14px; 
  color: var(--vp-c-text-2); 
  line-height: 1.3;
  font-weight: 400;
}

.status-badge-wrapper { position: relative; display: flex; align-items: center; }
.status-badge {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: help;
}
.tooltip {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.2;
  max-width: 280px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-2px);
  transition: opacity .15s ease, transform .15s ease, visibility .15s ease;
  z-index: 10;
}
.status-badge:hover + .tooltip,
.status-badge:focus + .tooltip,
.tooltip.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* ИСПРАВЛЕННЫЕ Desktop карточки */
.stats-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 16px; 
}

.stat-card {
  position: relative;
  border-radius: 22px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.stat-card::before {
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

.stat-card:hover {
  transform: translateY(-8px);
}

.stat-card:hover::before {
  filter: brightness(1.5) saturate(1.3);
}

/* ПРОСТАЯ структура контента без сложного grid */
.stat-content {
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

.stat-card:hover .stat-content {
  background: radial-gradient(circle at 50% 0%, rgba(163, 230, 53, 0.3) 0%, transparent 70%);
  box-shadow: 0 25px 50px -10px rgba(0,0,0,0.4);
}

.stat-header { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 8px;
  margin-bottom: 16px;
}

.stat-icon { 
  color: #A3E635;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  flex-shrink: 0;
}

.stat-card:hover .stat-icon { 
  transform: scale(1.2);
  color: #C5F946;
}

.stat-title { 
  font-size: 14px; 
  font-weight: 700; 
  color: rgba(255,255,255,0.9); 
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.stat-card:hover .stat-title { 
  transform: scale(1.05);
  color: #A3E635;
}

.stat-value-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
}

.stat-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.main-value {
  font-size: clamp(3rem, 6vw, 4.5rem);
}

.potential-value {
  font-size: clamp(3rem, 6vw, 4.5rem);
  display: flex;
  align-items: baseline;
  gap: 4px;
  justify-content: center;
}

.potential-value .current {
  font-size: clamp(3rem, 6vw, 4.5rem);
}

.potential-value .potential {
  font-size: clamp(2rem, 4vw, 3rem);
  opacity: 0.6;
  font-weight: 500;
  margin-left: 2px;
}

.stat-card:hover .stat-value {
  transform: scale(1.05);
  text-shadow: 0 0 30px rgba(163, 230, 53, 0.5);
  color: #A3E635;
}

.stat-metric-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: clamp(16px, 3vw, 20px);
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  text-transform: uppercase;
}

.stat-card:hover .stat-metric-badge {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
}

.stat-description {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.3;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  letter-spacing: 0.02em;
  max-width: 180px;
}

.stat-card:hover .stat-description { 
  transform: scale(1.02);
  color: rgba(163, 230, 53, 0.9);
}

/* Пульт управления */
.control-panel { margin-top: 24px; }
.control-panel-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; padding: 0 8px; font-size: 14px; font-weight: 600; }
.info-link { color: rgba(255, 255, 255, 0.5); display: flex; align-items: center; transition: color 0.3s ease; flex-shrink: 0; }
.info-link:hover, .info-link:focus { color: white; }
.info-button { background: transparent; border: none; cursor: pointer; }
.static-prompt { color: white; margin-right: 8px; flex-shrink: 0; }
.rotating-text-container { flex-grow: 1; text-align: left; color: rgba(255, 255, 255, 0.7); min-height: 36px; display: flex; align-items: center;}
.rotating-text { transition: opacity 0.5s ease-in-out; line-height: 1.2; }
.rotating-text:not(.show) { opacity: 0; }

.button-container { display: flex; gap: 6px; background-color: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 20px; padding: 6px; }
.action-button { flex: 1; padding: 14px 20px; border-radius: 16px; border: none; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; }
.ticket-button { background: rgba(70, 70, 70, 0.8); color: rgba(255, 255, 255, 0.9); }
.ticket-button:hover { background: rgba(85, 85, 85, 0.9); color: white; transform: translateY(-2px); }
.review-button { 
  background: linear-gradient(135deg, #A3E635, #C5F946); 
  color: #1a2e05; 
  box-shadow: 0 4px 12px rgba(163, 230, 53, 0.3); 
}
.review-button:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 20px rgba(163, 230, 53, 0.5); 
  background: linear-gradient(135deg, #C5F946, #A3E635);
}
.button-icon { transition: transform 0.3s ease; }
.review-button:hover .button-icon { transform: translateX(4px); }

/* Модал */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: var(--vp-c-bg, #111); color: var(--vp-c-text-1, #fff); border: 1px solid var(--vp-c-border, rgba(255,255,255,0.12)); border-radius: 12px; width: min(520px, 96vw); box-shadow: 0 20px 60px rgba(0,0,0,0.4); padding: 16px; }
.modal-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.modal-title { font-weight: 700; font-size: 16px; }
.modal-close { background: transparent; border: 1px solid var(--vp-c-border); border-radius: 8px; color: var(--vp-c-text-2); padding: 6px 10px; cursor: pointer; }
.modal-close:hover { color: white; border-color: white; }
.modal-body { margin-top: 8px; font-size: 14px; color: var(--vp-c-text-1); }
.modal-footer { margin-top: 12px; display: flex; justify-content: flex-end; }
.modal-ok { background: var(--vp-c-bg-mute, #222); border: 1px solid var(--vp-c-border); color: var(--vp-c-text-1); border-radius: 8px; padding: 8px 12px; cursor: pointer; }
.modal-ok:hover { background: var(--vp-c-bg-soft, #333); }

/* МОБИЛЬНАЯ версия без изменений */
@media (max-width: 768px) {
  .reviews-widget-content { padding: 0; }
  .main-card { padding: 20px; border-radius: 12px; }
  
  .establishment-header { 
    flex-direction: column; 
    align-items: flex-start; 
    gap: 12px; 
    margin-bottom: 20px; 
  }
  
  .status-badge-wrapper { align-self: flex-end; }
  
  .stats-grid { 
    grid-template-columns: 1fr; 
    gap: 12px; 
  }
  
  .stat-card { 
    border-radius: 16px; 
    transition: none;
  }
  .stat-card:hover { transform: none; }
  
  .stat-content { 
    display: flex;
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: flex-start; 
    padding: 20px 18px 20px 18px;
    min-height: auto;
    background: radial-gradient(circle at 20% 50%, rgba(163, 230, 53, 0.15) 0%, transparent 70%) !important;
    gap: 16px;
  }
  
  .stat-header { 
    flex-direction: row; 
    align-items: center; 
    gap: 8px; 
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 0;
  }
  
  .stat-icon { width: 20px; height: 20px; }
  .stat-title { font-size: 11px; margin: 0; }
  
  .stat-value-section {
    width: 100%;
    gap: 12px;
  }
  
  .main-value {
    font-size: 2rem !important;
    font-weight: 500 !important;
    margin: 0;
    line-height: 1;
  }
  
  .potential-value {
    font-size: 2rem !important;
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }
  
  .potential-value .current {
    font-size: 2rem !important;
    font-weight: 500 !important;
    line-height: 1;
  }
  
  .potential-value .potential {
    font-size: 1.4rem !important;
    opacity: 0.6;
    font-weight: 400;
    margin-left: 2px;
  }
  
  .stat-metric-badge { 
    font-size: 2rem !important;
    font-weight: 500 !important;
    padding: 8px 14px; 
    color: #fff;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    line-height: 1;
    transition: color 0.3s ease, background-color 0.3s ease;
  }
  
  .stat-metric-badge:hover {
    color: #A3E635 !important;
    background: rgba(163, 230, 53, 0.1);
  }
  
  .stat-description { 
    font-size: 14px !important;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.3;
    text-align: left;
    margin: 0;
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
  
  .button-container { flex-direction: column; gap: 8px; }
  .action-button:hover { transform: none; }
}

@media (max-width: 480px) {
  .main-card { padding: 16px; }
  .cafe-name { font-size: 20px; }
  .cafe-subtitle { font-size: 13px; }
  
  .stat-content { 
    padding: 18px 16px 18px 16px;
    gap: 14px;
  }
  
  .main-value { font-size: 1.8rem !important; }
  .potential-value { font-size: 1.8rem !important; }
  .potential-value .current { font-size: 1.8rem !important; }
  .potential-value .potential { font-size: 1.2rem !important; }
  .stat-metric-badge { font-size: 1.8rem !important; }
  .stat-description { font-size: 13px !important; }
}
</style>
