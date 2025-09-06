<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const ROTATION_INTERVAL_MS = 7000
const FADE_DURATION_MS = 1000

const establishment = {
  name: 'Не просто рейтинг',
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
    <!-- УБРАН блок widget-header -->
    
    <div class="main-card">
      <div class="establishment-header">
        <div>
          <h3 class="cafe-name">{{ establishment.name }}</h3>
          <!-- ДОБАВЛЕН подзаголовок под название -->
          <p class="cafe-subtitle">Данные лидера рынка: сеть «Корж».</p>
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
        <div class="stat-card index-card">
          <div class="stat-content">
            <div class="stat-top">
              <div class="stat-emoji">⚡</div>
              <div class="stat-title">Индекс</div>
            </div>
            <div class="value-slab">
              <div class="stat-value">{{ establishment.index }}</div>
            </div>
            <div class="stat-caption">Score всего бизнеса</div>
          </div>
        </div>

        <!-- 🧩 Потенциал -->
        <div class="stat-card branches-card">
          <div class="stat-content">
            <div class="stat-top">
              <div class="stat-emoji">🧩</div>
              <div class="stat-title">Потенциал</div>
            </div>
            <div class="value-slab">
              <div class="stat-value range">
                <span class="from">{{ establishment.currentPoints }}</span>
                <span class="arrow">→</span>
                <span class="to">{{ establishment.targetPoints }}</span>
              </div>
            </div>
            <div class="stat-caption">Точек сейчас и целевой масштаб сети</div>
          </div>
        </div>

        <!-- 🌐 Влияние -->
        <div class="stat-card reviews-card">
          <div class="stat-content">
            <div class="stat-top">
              <div class="stat-emoji">🌐</div>
              <div class="stat-title">Влияние</div>
            </div>
            <div class="value-slab">
              <span class="stat-badge">{{ establishment.influenceLevel }}</span>
            </div>
            <div class="stat-caption">Сила эффекта на рынок</div>
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
/* ИСПРАВЛЕНО: убран скролл и max-height, полная ширина */
.reviews-widget-content { 
  padding: 0; 
  width: 100%; 
  box-sizing: border-box;
}

.main-card { 
  background: var(--vp-c-bg-soft); 
  border-radius: 12px; /* Как у других виджетов на странице */
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}

.establishment-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start; /* ИСПРАВЛЕНО для подзаголовка */
  margin-bottom: 24px; 
}

.cafe-name { 
  margin: 0; 
  color: #FFFFFF; 
  font-size: 24px; 
  font-weight: 600; 
}

/* ДОБАВЛЕН стиль подзаголовка */
.cafe-subtitle { 
  margin: 6px 0 0 0; 
  font-size: 14px; 
  color: var(--vp-c-text-2); 
  line-height: 1.4; 
  font-weight: 400;
}

/* Бейдж актуальности */
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

/* Стильные карточки */
.stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.stat-card {
  position: relative;
  border-radius: 22px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.stat-card:hover {
  transform: translateY(-8px);
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 2px;
  background: var(--border-gradient);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: filter 0.4s ease;
  z-index: 3;
}

.stat-card:hover::before {
  filter: brightness(2) saturate(1.5);
}

.branches-card {
  --border-gradient: linear-gradient(135deg, #3730a3, #8b5cf6, #c4b5fd);
  --glow-color: rgba(139, 92, 246, 0.25);
  --glow-hover-color: rgba(139, 92, 246, 0.6);
}

.index-card {
  --border-gradient: linear-gradient(135deg, #4d7c0f, #a3e635, #C5F946);
  --glow-color: rgba(197, 249, 70, 0.25);
  --glow-hover-color: rgba(197, 249, 70, 0.6);
}

.reviews-card {
  --border-gradient: linear-gradient(135deg, #b45309, #f59e0b, #fcd34d);
  --glow-color: rgba(245, 158, 11, 0.25);
  --glow-hover-color: rgba(245, 158, 11, 0.6);
}

.stat-content {
  background: radial-gradient(circle at 50% 0%, var(--glow-color) 0%, transparent 70%);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  z-index: 2;
}

.stat-card:hover .stat-content {
  background: radial-gradient(circle at 50% 0%, var(--glow-hover-color) 0%, transparent 70%);
  box-shadow: 0 25px 50px -10px rgba(0,0,0,0.4);
}

.stat-top { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.stat-emoji { 
  font-size: 28px; 
  opacity: 0.8; 
  height: 32px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.stat-card:hover .stat-emoji { transform: scale(1.2); }

.stat-title { 
  font-size: 14px; 
  font-weight: 700; 
  color: rgba(255,255,255,0.9); 
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value-slab {
  width: 100%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 16px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0;
}

.stat-value {
  font-family: 'Inter', sans-serif;
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.7);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.stat-card:hover .stat-value {
  transform: scale(1.15);
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.8);
}

.stat-value.range .arrow { 
  display: inline-block; 
  padding: 0 8px; 
  font-size: 2.4rem; 
  opacity: 0.9; 
}

.stat-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
  border: 1px solid rgba(255,255,255,0.18);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5px;
  font-size: 18px;
  white-space: nowrap;
}

.stat-caption {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.stat-card:hover .stat-caption { transform: scale(1.05); }

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
.review-button { background: linear-gradient(135deg, #f59e0b, #fcd34d); color: #422006; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); }
.review-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4); }
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

/* ИСПРАВЛЕННАЯ мобильная адаптация */
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
    min-height: auto;
  }
  .stat-card:hover { transform: none; }
  
  /* КОМПАКТНЫЕ горизонтальные карточки */
  .stat-content { 
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center; 
    padding: 16px 18px;
    min-height: 80px; /* Намного компактнее */
    background: radial-gradient(circle at 20% 50%, var(--glow-color) 0%, transparent 70%) !important;
    box-shadow: 0 8px 20px -8px rgba(0,0,0,0.3) !important;
  }
  
  .stat-top { 
    flex-direction: column; 
    align-items: flex-start; 
    gap: 2px; 
    min-width: 80px;
    flex-shrink: 0;
  }
  .stat-emoji { 
    font-size: 24px; 
    line-height: 1; 
  }
  .stat-title { 
    font-size: 12px; 
    font-weight: 700;
    color: rgba(255,255,255,0.9);
  }
  
  .value-slab {
    min-width: 60px;
    padding: 8px;
    margin: 0 8px;
    flex-shrink: 0;
    border-radius: 8px;
  }
  
  .stat-value { 
    font-size: 1.6rem; 
    font-weight: 700; 
  }
  .stat-value.range .arrow { font-size: 1.2rem; padding: 0 3px; }
  .stat-badge { 
    font-size: 12px; 
    padding: 4px 8px; 
  }
  
  .stat-caption { 
    font-size: 10px; 
    text-align: right;
    flex: 1;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.1;
  }
  
  .button-container { flex-direction: column; gap: 8px; }
  .action-button:hover { transform: none; }
}

@media (max-width: 480px) {
  .reviews-widget-content { padding: 0; }
  .main-card { padding: 16px; }
  .cafe-name { font-size: 20px; }
  .cafe-subtitle { font-size: 13px; }
  
  .stat-content { 
    padding: 14px 16px;
    min-height: 70px; 
  }
  .value-slab { 
    min-width: 50px; 
    padding: 6px; 
  }
  .stat-value { font-size: 1.4rem; }
  .stat-caption { font-size: 9px; }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .stats-grid { gap: 14px; }
  .stat-content { padding: 18px 16px; }
  .stat-value { font-size: 2.8rem; }
}
</style>
