<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'

const props = defineProps({
  establishment: {
    type: Object,
    required: true
  },
  cafeConfig: {
    type: Object,
    required: true
  },
  systemMetrics: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['show-branches', 'open-info-modal', 'open-growth-modal'])

const todayStatus = computed(() => {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()
  
  const monthNames = [
    'ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ',
    'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'
  ]
  
  const monthName = monthNames[today.getMonth()]
  
  return `🟢 ${day}.${month} → ${monthName} ${year}`
})

const getSolutionText = (percent) => {
  if (percent === 0) {
    return 'Без решений'
  }
  return `Решение: ${percent}%`
}

const formatTime = (hours) => {
  if (hours < 1) return `${Math.round(hours * 60)}мин`
  return `${hours.toFixed(1)}ч`
}

const isMobile = ref(false)
const isReviewModalOpen = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const openReviewModal = () => {
  isReviewModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeReviewModal = () => {
  isReviewModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const openSignalNew = () => {
  window.location.href = '/signal/new'
}

const rotatingQuestions = [
  "\"Что почувствовали в эту минуту?\"",
  "\"Что вызвало улыбку или напряжение?\"",
  "\"Какой момент хотелось бы изменить?\"",
  "\"Что дало ощущение уюта/суеты?\"",
  "\"Одно слово, которое осталось после визита?\""
]

const currentQuestionIndex = ref(0)
const showText = ref(true)
let intervalId = null

const cycleText = () => {
  showText.value = false
  setTimeout(() => {
    currentQuestionIndex.value = (currentQuestionIndex.value + 1) % rotatingQuestions.length
    showText.value = true
  }, 1000)
}

const onKeydown = (e) => {
  if (e.key === 'Escape' && isReviewModalOpen.value) {
    closeReviewModal()
  }
}

onMounted(() => {
  intervalId = setInterval(cycleText, 7000)
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', checkMobile)
  checkMobile()
})

onUnmounted(() => {
  clearInterval(intervalId)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="signal2-main-card">
    <div class="signal2-establishment-header">
      <h3 class="signal2-cafe-name">{{ establishment.name }}</h3>
      <div class="signal2-status-badge">
        {{ todayStatus }}
      </div>
    </div>

    <div class="signal2-stats-grid">
      <div class="signal2-stat-card signal2-graphite-stat">
        <div class="signal2-stat-content">
          <div class="signal2-stat-left-group">
            <div class="signal2-stat-value">{{ establishment.yandex2gis }}</div>
            <div class="signal2-stat-label">Яндекс/2ГИС</div>
          </div>
          <div class="signal2-stat-badge signal2-graphite-badge">
            <span class="signal2-badge-emoji">💬</span>
            <span class="signal2-badge-text">Ответ: {{ establishment.yandex2gisPercent }}%</span>
          </div>
        </div>
      </div>

      <div class="signal2-stat-card signal2-orange-stat" @click="emit('open-growth-modal')">
        <div class="signal2-stat-content">
          <div class="signal2-stat-left-group">
            <div class="signal2-stat-value">{{ establishment.smartReviews }}</div>
            <div class="signal2-stat-label">Умные Отзывы</div>
          </div>
          <div class="signal2-stat-badge signal2-orange-badge">
            <span class="signal2-badge-emoji">🪶</span>
            <span class="signal2-badge-text">{{ getSolutionText(establishment.smartReviewsPercent) }}</span>
          </div>
        </div>
      </div>

      <div class="signal2-stat-card signal2-lime-stat" @click="isMobile ? emit('open-info-modal') : null">
        <div class="signal2-stat-content">
          <div class="signal2-stat-left-group">
            <div class="signal2-stat-value">{{ establishment.signals }}</div>
            <div class="signal2-stat-label">Сигналы</div>
          </div>
          <div 
            class="signal2-stat-badge signal2-lime-badge" 
            :class="{ 'signal-100-badge': establishment.signalsPercent === 100 }"
          >
            <span class="signal2-badge-emoji">⚡</span>
            <span class="signal2-badge-text">{{ getSolutionText(establishment.signalsPercent) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="signal2-system-status-bar">
      <span v-if="establishment.isConnected" class="signal2-status-label">🟢 На связи:</span>
      <span v-else class="signal2-status-label-disconnected">🔴 Не подключен к Сигналу</span>
      
      <div v-if="establishment.isConnected" class="signal2-status-metrics">
        <div class="signal2-status-metric">
          <span class="signal2-metric-time">{{ formatTime(systemMetrics.responseTime) }}</span>
          <span class="signal2-metric-text">→ ответ</span>
        </div>
        <div class="signal2-status-separator">•</div>
        <div class="signal2-status-metric">
          <span class="signal2-metric-time">{{ formatTime(systemMetrics.resolutionTime) }}</span>
          <span class="signal2-metric-text">→ решение</span>
        </div>
      </div>
    </div>

    <div class="signal2-control-panel">
      <div class="signal2-control-panel-header">
        <button
          v-if="!isMobile"
          type="button"
          class="signal2-info-link signal2-info-button"
          aria-haspopup="dialog"
          aria-controls="signal2-signal-dialog"
          @click="emit('open-info-modal')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </button>
        <span v-if="!isMobile" class="signal2-static-prompt">Поделитесь:</span>
        <div class="signal2-rotating-text-container" :class="{ 'signal2-full-width': isMobile }">
          <span :class="['signal2-rotating-text', { 'signal2-show': showText }]">{{ rotatingQuestions[currentQuestionIndex] }}</span>
        </div>
      </div>

      <div class="signal2-button-container">
        <button @click="emit('show-branches')" class="signal2-action-button signal2-ticket-button">
          Отправить Яндекс/ГИС
          <div class="signal2-button-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/>
              <circle cx="12" cy="8" r="2"/>
              <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/>
            </svg>
          </div>
        </button>
        <button @click="openReviewModal" class="signal2-action-button signal2-review-button">
          Отправить Умный Отзыв
          <div class="signal2-button-icon-container signal2-golden-icon-container">
            <svg class="signal2-button-icon signal2-white-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#422006" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </button>
      </div>

      <div v-if="establishment.isConnected" class="signal2-signal-section">
        <div class="signal2-signal-description">
          Просто скажите, что не так и мы поможем решить любую проблему за 24 часа.
        </div>
        
        <div class="signal2-mystery-button-container">
          <button @click="openSignalNew" class="signal2-mystery-button signal2-lime-button">
            <span class="signal2-mystery-glow"></span>
            <span class="signal2-mystery-text">Отправить ⚡ Сигнал</span>
          </button>
        </div>
        
        <div class="signal2-signal-link">
          <a href="/signals" target="_blank" class="signal2-how-it-works-link signal2-no-vitepress-style">Как Работает</a>
        </div>
      </div>
    </div>

    <div 
      v-if="isReviewModalOpen" 
      class="signal2-review-modal-overlay"
      @click="closeReviewModal"
    >
      <div 
        class="signal2-review-modal-content"
        @click.stop
      >
        <div class="signal2-modal-scrollable-content">
          <SignalT9Configurator />
        </div>
        
        <div class="signal2-modal-close-section">
          <button @click="closeReviewModal" class="signal2-modal-close-button">Закрыть и вернуться</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signal2-main-card { background: var(--vp-c-bg-soft); border-radius: 20px; padding: 24px; }
.signal2-establishment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.signal2-cafe-name { margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; }
.signal2-status-badge { background: rgba(0,0,0,0.2); backdrop-filter: blur(5px); color: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; white-space: nowrap; box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3); text-transform: uppercase; letter-spacing: 0.5px; position: relative; }
@keyframes signal2-tooltip-fade-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
.signal2-stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.signal2-stat-card { position: relative; border-radius: 22px; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); overflow: hidden; background: var(--vp-c-bg-soft); }
.signal2-stat-card:hover { transform: translateY(-8px); }
.signal2-stat-card::before { content: ''; position: absolute; inset: 0; border-radius: 22px; padding: 2px; background: var(--signal2-border-gradient); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; transition: filter 0.4s ease; z-index: 3; }
.signal2-stat-card:hover::before { filter: brightness(2) saturate(1.5); }
.signal2-stat-card.signal2-orange-stat, .signal2-stat-card.signal2-lime-stat { cursor: pointer; }
.signal2-stat-content { background: radial-gradient(circle at 50% 0%, var(--signal2-glow-color) 0%, transparent 70%); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; text-align: center; box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.3); transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); position: relative; z-index: 2; }
.signal2-stat-card:hover .signal2-stat-content { background: radial-gradient(circle at 50% 0%, var(--signal2-glow-hover-color) 0%, transparent 70%); box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.4); }
.signal2-stat-left-group { display: flex; flex-direction: column; align-items: center; width: 100%; }
.signal2-stat-value { font-family: 'Inter', sans-serif; font-size: 3.2rem; font-weight: 600; line-height: 1; color: #fff; margin-bottom: 8px; text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.7); transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.signal2-stat-card:hover .signal2-stat-value { transform: scale(1.15); text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.8); }
.signal2-stat-label { color: #ffffff; font-weight: 700; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.signal2-stat-card:hover .signal2-stat-label { transform: scale(1.05); }
.signal2-stat-badge { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 12px; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.1); margin-top: auto; }
.signal2-badge-emoji { font-size: 16px; line-height: 1; flex-shrink: 0; }
.signal2-badge-text { font-size: 12px; font-weight: 600; color: rgba(255, 255, 255, 0.9); letter-spacing: 0.3px; }
.signal2-graphite-stat { --signal2-border-gradient: linear-gradient(135deg, rgba(100, 100, 100, 0.8) 0%, rgba(150, 150, 150, 0.8) 50%, rgba(100, 100, 100, 0.8) 100%); --signal2-glow-color: rgba(100, 100, 100, 0.1); --signal2-glow-hover-color: rgba(120, 120, 120, 0.15); }
.signal2-orange-stat { --signal2-border-gradient: linear-gradient(135deg, rgba(255, 165, 0, 0.8) 0%, rgba(255, 140, 0, 0.8) 50%, rgba(255, 165, 0, 0.8) 100%); --signal2-glow-color: rgba(255, 165, 0, 0.1); --signal2-glow-hover-color: rgba(255, 140, 0, 0.15); }
.signal2-lime-stat { --signal2-border-gradient: linear-gradient(135deg, rgba(163, 230, 53, 0.8) 0%, rgba(132, 204, 22, 0.8) 50%, rgba(163, 230, 53, 0.8) 100%); --signal2-glow-color: rgba(163, 230, 53, 0.1); --signal2-glow-hover-color: rgba(132, 204, 22, 0.15); }
.signal-100-badge { background: rgba(163, 230, 53, 0.2) !important; border-color: rgba(163, 230, 53, 0.4) !important; box-shadow: 0 0 15px rgba(163, 230, 53, 0.2) !important; }
.signal-100-badge .signal2-badge-text { color: #a3e635 !important; }
.signal2-system-status-bar { background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 12px 20px; margin: 20px 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; backdrop-filter: blur(8px); }
.signal2-status-label { font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.9); }
.signal2-status-label-disconnected { font-size: 14px; font-weight: 600; color: rgba(255, 100, 100, 0.9); }
.signal2-status-metrics { display: flex; align-items: center; gap: 12px; font-size: 13px; }
.signal2-status-metric { display: flex; align-items: center; gap: 4px; }
.signal2-metric-time { font-weight: 700; color: #a3e635; }
.signal2-metric-text { color: rgba(255, 255, 255, 0.7); font-weight: 500; }
.signal2-status-separator { color: rgba(255, 255, 255, 0.4); font-weight: 500; }
.signal2-control-panel { margin-top: 24px; }
.signal2-control-panel-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.signal2-info-button { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: rgba(255, 255, 255, 0.7); transition: all 0.3s ease; flex-shrink: 0; }
.signal2-info-button:hover { background: rgba(255, 255, 255, 0.2); color: white; }
.signal2-static-prompt { font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.7); white-space: nowrap; }
.signal2-rotating-text-container { flex: 1; min-height: 20px; display: flex; align-items: center; overflow: hidden; }
.signal2-full-width { width: 100%; }
.signal2-rotating-text { font-size: 14px; font-weight: 500; color: rgba(255, 255, 255, 0.8); font-style: italic; opacity: 0; transform: translateY(10px); transition: all 1s cubic-bezier(0.4, 0, 0.2, 1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.signal2-rotating-text.signal2-show { opacity: 1; transform: translateY(0); }
.signal2-button-container { display: flex; gap: 12px; margin-bottom: 24px; }
.signal2-action-button { flex: 1; display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-radius: 16px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; border: none; position: relative; overflow: hidden; }
.signal2-ticket-button { background: rgba(70, 70, 70, 0.8); color: rgba(255, 255, 255, 0.9); }
.signal2-ticket-button:hover { background: rgba(85, 85, 85, 0.9); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); }
.signal2-review-button { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #422006; }
.signal2-review-button:hover { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4); }
.signal2-button-icon-container { background: rgba(0, 0, 0, 0.2); border-radius: 8px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
.signal2-golden-icon-container { background: rgba(66, 32, 6, 0.3); }
.signal2-signal-section { text-align: center; }
.signal2-signal-description { font-size: 14px; color: rgba(255, 255, 255, 0.8); line-height: 1.5; margin-bottom: 20px; }
.signal2-mystery-button-container { margin-bottom: 16px; position: relative; }
.signal2-mystery-button { background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%); color: #1a2e05; border: none; border-radius: 16px; padding: 16px 32px; font-size: 16px; font-weight: 700; cursor: pointer; position: relative; overflow: hidden; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; }
.signal2-mystery-button:hover { background: linear-gradient(135deg, #bef264 0%, #a3e635 100%); transform: translateY(-2px); box-shadow: 0 12px 24px rgba(163, 230, 53, 0.4); }
.signal2-mystery-glow { position: absolute; inset: -2px; border-radius: 18px; padding: 2px; background: linear-gradient(45deg, #a3e635, #84cc16, #65a30d, #84cc16, #a3e635); background-size: 300% 300%; animation: signal2-glow-rotate 3s linear infinite; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0.6; }
@keyframes signal2-glow-rotate { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.signal2-mystery-text { position: relative; z-index: 1; }
.signal2-signal-link { margin-top: 12px; }
.signal2-how-it-works-link { color: rgba(255, 255, 255, 0.6); font-size: 13px; font-weight: 500; text-decoration: underline; text-decoration-color: rgba(255, 255, 255, 0.3); }
:deep(.signal2-no-vitepress-style) { text-decoration: underline !important; text-decoration-color: rgba(255, 255, 255, 0.3) !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-no-vitepress-style:hover) { text-decoration: underline !important; text-decoration-color: rgba(255, 255, 255, 0.6) !important; border-bottom: none !important; background: none !important; }
.signal2-review-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 8px; box-sizing: border-box; }
.signal2-review-modal-content { background: #1e1e20; border-radius: 16px; width: 650px; height: clamp(85vh, 90vh, 85vh); max-width: 95vw; max-height: clamp(85vh, 90vh, 85vh); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); box-sizing: border-box; color: white; display: flex; flex-direction: column; overflow: hidden; }
.signal2-modal-scrollable-content { flex: 1; overflow-y: auto; padding: 20px 16px 16px 16px; }
:deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(p), :deep(span), :deep(label), :deep(.title), :deep(.subtitle), :deep(.description), :deep(.example-text), :deep(.hint-text) { text-align: initial !important; padding-left: 0 !important; padding-right: 0 !important; }
:deep(.container), :deep(.content) { padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important; }
:deep(.form-section), :deep(.form-group), :deep(.section-wrapper) { margin-bottom: clamp(10px, 2vw, 10px) !important; }
:deep(.card), :deep(.block), :deep(.content-block) { margin-bottom: clamp(8px, 1.6vw, 8px) !important; }
.signal2-modal-close-section { flex-shrink: 0; padding: 20px 16px 24px 16px; background: #1e1e20; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: center; }
.signal2-modal-close-button { background: rgba(70, 70, 70, 0.8); border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.9); border-radius: 12px; padding: 12px 24px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.3s ease; }
.signal2-modal-close-button:hover { background: rgba(85, 85, 85, 0.9); border-color: rgba(255, 255, 255, 0.4); color: white; }
@media (max-width: 768px) {
  .signal2-stats-grid { grid-template-columns: 1fr; gap: 12px; }
  .signal2-button-container { flex-direction: column; }
  .signal2-control-panel-header { justify-content: center; }
  .signal2-static-prompt { display: none; }
  .signal2-info-button { display: none; }
}
@media (max-width: 480px) {
  .signal2-main-card { padding: 20px; }
  .signal2-establishment-header { flex-direction: column; gap: 12px; align-items: flex-start; }
  .signal2-cafe-name { font-size: 20px; }
  .signal2-system-status-bar { flex-direction: column; align-items: flex-start; gap: 8px; }
  .signal2-status-metrics { justify-content: center; width: 100%; }
}
</style>
