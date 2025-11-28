<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'
import AddVoteStatus from './AddVoteStatus.vue'

const cafeNames = ['Корж', 'MOSAIC', 'Surf', 'Skuratov', 'Белотурка', 'Кэрри']

// Данные о кофейнях
const cafes = {
  'Корж': {
    name: 'Корж',
    ListeningStatus: '67 отзывов',
    ListeningBadgeText: 'Отвечают быстро',
    SignalsStatus: '1 сигнал',
    SignalsBadgeText: 'Решение: 100%',
    isConnected: true
  },
  'MOSAIC': {
    name: 'MOSAIC',
    ListeningStatus: '3 отзыва',
    ListeningBadgeText: 'Ответ: 42%',
    SignalsStatus: '0 сигналов',
    SignalsBadgeText: 'Без решений',
    isConnected: false
  },
  'Skuratov': {
    name: 'Skuratov',
    ListeningStatus: '3 отзыва',
    ListeningBadgeText: 'Ответ: 89%',
    SignalsStatus: '0 сигналов',
    SignalsBadgeText: 'Без решений',
    isConnected: false
  },
  'Surf': {
    name: 'Surf',
    ListeningStatus: '1 отзыв',
    ListeningBadgeText: 'Ответ: 100%',
    SignalsStatus: '0 сигналов',
    SignalsBadgeText: 'Без решений',
    isConnected: false
  },
  'Белотурка': {
    name: 'Белотурка',
    ListeningStatus: '8 отзывов',
    ListeningBadgeText: 'Ответ: 1%',
    SignalsStatus: '0 сигналов',
    SignalsBadgeText: 'Без решений',
    isConnected: false
  },
  'Кэрри': {
    name: 'Кэрри',
    ListeningStatus: '4 отзыва',
    ListeningBadgeText: 'Ответ: 97%',
    SignalsStatus: '0 сигналов',
    SignalsBadgeText: 'Без решений',
    isConnected: false
  }
}

const cafeProfiles = {
  'корж': { responseTime: { base: 2.3, min: 1.8, max: 2.8 }, resolutionTime: { base: 17.5, min: 15, max: 20 } },
  'mosaic': { responseTime: { base: 1.4, min: 1.0, max: 1.9 }, resolutionTime: { base: 14.7, min: 12, max: 17 } },
  'skuratov': { responseTime: { base: 1.6, min: 1.2, max: 2.1 }, resolutionTime: { base: 15.2, min: 13, max: 18 } },
  'surf': { responseTime: { base: 3.1, min: 2.5, max: 3.8 }, resolutionTime: { base: 20.3, min: 18, max: 23 } },
  'белотурка': { responseTime: { base: 2.7, min: 2.2, max: 3.2 }, resolutionTime: { base: 18.8, min: 16, max: 22 } },
  'кэрри': { responseTime: { base: 2.0, min: 1.5, max: 2.6 }, resolutionTime: { base: 16.4, min: 14, max: 19 } }
}

const todayStatus = computed(() => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  
  const monthNames = [
    'ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ',
    'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'
  ];
  
  const monthName = monthNames[today.getMonth()];
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3e635" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="signal2-radio-icon" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><path d="M16.247 7.761a6 6 0 0 1 0 8.478"/><path d="M19.075 4.933a10 10 0 0 1 0 14.134"/><path d="M4.925 19.067a10 10 0 0 1 0-14.134"/><path d="M7.753 16.239a6 6 0 0 1 0-8.478"></path><circle cx="12" cy="12" r="2"></circle></svg> ${day}.${month} → ${monthName} ${year}`;
});

const getCafeConfig = (cafeName) => {
  const normalized = cafeName?.toLowerCase() || ''
  return cafeProfiles[normalized] || { responseTime: { base: 2, min: 1, max: 3 }, resolutionTime: { base: 15, min: 12, max: 18 } }
}

const selectedCafe = ref(cafeNames[0] || 'Корж')

const establishment = computed(() => cafes[selectedCafe.value] || {
  name: '',
  ListeningStatus: '',
  ListeningBadgeText: '',
  SignalsStatus: '',
  SignalsBadgeText: '',
  isConnected: false
})

const cafeConfig = computed(() => getCafeConfig(selectedCafe.value))

const systemMetrics = ref({
  responseTime: cafeConfig.value.responseTime.base,
  resolutionTime: cafeConfig.value.resolutionTime.base,
  lastUpdate: Date.now()
})

const showLeftGradient = ref(false)
const showRightGradient = ref(false)
const isMobile = ref(false)
const isSignalModalOpen = ref(false)
const isVoteModalOpen = ref(false)

const showYandexTooltip = ref(false)
const showSignalsTooltip = ref(false)

const fetchSystemStatus = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50))
    const currentConfig = cafeConfig.value
    const now = Date.now()
    const hourOfDay = new Date().getHours()
    const isBusinessHours = hourOfDay >= 9 && hourOfDay <= 21
    const loadFactor = isBusinessHours ? 0.8 : 1.2
    const responseVariation = (Math.random() - 0.5) * 0.15 * loadFactor
    const resolutionVariation = (Math.random() - 0.5) * 1.2 * loadFactor

    systemMetrics.value.responseTime = Math.max(
      currentConfig.responseTime.min,
      Math.min(currentConfig.responseTime.max,
        systemMetrics.value.responseTime + responseVariation
      )
    )

    systemMetrics.value.resolutionTime = Math.max(
      currentConfig.resolutionTime.min,
      Math.min(currentConfig.resolutionTime.max,
        systemMetrics.value.resolutionTime + resolutionVariation
      )
    )

    systemMetrics.value.lastUpdate = now
  } catch (error) {
    // ignore
  }
}

const formatTime = (hours) => {
  if (hours < 1) return `${Math.round(hours * 60)}мин`
  return `${hours.toFixed(1)}ч`
}

const widgetContentRef = ref(null)
const switchersRef = ref(null)
const badgeRef = ref(null)

const openSignalModal = () => {
  isSignalModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeSignalModal = () => {
  isSignalModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const openVoteModal = () => {
  isVoteModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeVoteModal = () => {
  isVoteModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const handleSwitcherScroll = () => {
  if (!switchersRef.value) return
  
  const container = switchersRef.value
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth
  const clientWidth = container.clientWidth
  
  showLeftGradient.value = scrollLeft > 5
  showRightGradient.value = scrollLeft < (scrollWidth - clientWidth - 5)
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const rotatingQuestions = [
  "\"Что почувствовали в эту минуту?\"",
  "\"Что вызвало улыбку или напряжение?\"",
  "\"Какой момент хотелось бы изменить?\"",
  "\"Что дало ощущение уюта/суеты?\"",
  "\"Одно слово, которое осталось после визита?\""
]

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  if (switchersRef.value) switchersRef.value.addEventListener('scroll', handleSwitcherScroll)
  handleSwitcherScroll()
  fetchSystemStatus()
  const interval = setInterval(fetchSystemStatus, 1000)
  return () => clearInterval(interval)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  if (switchersRef.value) switchersRef.value.removeEventListener('scroll', handleSwitcherScroll)
})

</script>

<template>
  <div class="signal2-widget-content" ref="widgetContentRef">
    <div class="signal2-switchers-container">
      <div class="signal2-left-gradient" v-if="showLeftGradient"></div>
      <div class="signal2-switchers" ref="switchersRef">
        <button class="signal2-switcher" v-for="cafe in cafeNames" :key="cafe" :class="{ 'signal2-active-switcher': selectedCafe === cafe }" @click="selectedCafe = cafe">
          {{ cafe }}
        </button>
      </div>
      <div class="signal2-right-gradient" v-if="showRightGradient"></div>
    </div>
    <div class="signal2-main-card">
      <div class="signal2-header">
        <h2 class="signal2-cafe-name">{{ establishment.name }}</h2>
        <div class="signal2-status-badge" v-html="todayStatus"></div>
      </div>
      <div class="signal2-stats-grid">
        <div class="signal2-stat-card signal2-graphite-stat" @mouseover="showYandexTooltip = true" @mouseleave="showYandexTooltip = false">
          <div class="signal2-stat-content">
            <div class="signal2-stat-left-group">
              <div class="signal2-stat-label">КАК СЛУШАЮТ</div>
              <div class="signal2-stat-value">{{ establishment.ListeningStatus }}</div>
            </div>
            <div class="signal2-stat-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3"/><path d="M17 13a6 6 0 0 0-6-6"/><path d="M21 13A10 10 0 0 0 11 3"/></svg>
              {{ establishment.ListeningBadgeText }}
            </div>
          </div>
        </div>
        <div class="signal2-stat-card signal2-lime-stat" @mouseover="showSignalsTooltip = true" @mouseleave="showSignalsTooltip = false">
          <div class="signal2-stat-content">
            <div class="signal2-stat-left-group">
              <div class="signal2-stat-label">КАК МЕНЯЮТ</div>
              <div class="signal2-stat-value">{{ establishment.SignalsStatus }}</div>
            </div>
            <div class="signal2-stat-badge signal-100-badge" ref="badgeRef">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
              {{ establishment.SignalsBadgeText }}
            </div>
          </div>
        </div>
      </div>
      <div class="signal2-system-status-bar" v-if="establishment.isConnected">
        <span class="signal2-status-label">
          <span class="signal2-status-indicator"></span>
          На связи:
        </span>
        <div class="signal2-status-metrics">
          <span class="signal2-metric-time">{{ formatTime(systemMetrics.responseTime) }}</span>
          <span class="signal2-metric-text">→ ответ</span>
          <span class="signal2-metric-time">{{ formatTime(systemMetrics.resolutionTime) }}</span>
          <span class="signal2-metric-text">→ решение</span>
        </div>
      </div>
      <div class="signal2-system-status-bar" v-else>
        <span class="signal2-status-label-disconnected">
          Нет связи <span class="signal2-mobile-break"></span>с системой
        </span>
      </div>
      <div class="signal2-question-section">
        <div class="signal2-info-circle">i</div>
        <span class="signal2-question-text">Поделитесь: {{ rotatingQuestions[0] }}</span>
      </div>
      <div class="signal2-button-container">
        <button class="signal2-action-button signal2-graphite-button" @click="openVoteModal">
          Оценить место
          <div class="signal2-button-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
        </button>
        <button class="signal2-action-button signal2-lime-button" @click="openSignalModal">
          Отправить Сигнал
          <div class="signal2-button-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
          </div>
        </button>
      </div>
    </div>
  </div>
  <div class="signal2-review-modal-overlay" v-if="isVoteModalOpen" @click="closeVoteModal">
    <div class="signal2-review-modal-content" @click.stop>
      <button class="signal2-modal-close-icon" @click="closeVoteModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="signal2-modal-scrollable-content">
        <AddVoteStatus />
      </div>
      <div class="signal2-modal-close-section">
        <button class="signal2-modal-close-button" @click="closeVoteModal">Закрыть</button>
      </div>
    </div>
  </div>
  <div class="signal2-review-modal-overlay" v-if="isSignalModalOpen" @click="closeSignalModal">
    <div class="signal2-review-modal-content" @click.stop>
      <button class="signal2-modal-close-icon" @click="closeSignalModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="signal2-modal-scrollable-content">
        <SignalT9Configurator />
      </div>
      <div class="signal2-modal-close-section">
        <button class="signal2-modal-close-button" @click="closeSignalModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<style>
.signal2-widget-content { padding: 24px 0; }
.signal2-main-card { padding: 16px; }
.signal2-stats-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
.signal2-stat-card { 
  border-radius: 16px; 
  transition: transform 0.3s ease;
}
.signal2-stat-card:hover { transform: translateY(-4px); }
.signal2-stat-content { 
  flex-direction: column;
  padding: 12px 16px;
}
.signal2-stat-label { 
  font-size: 14px;
  font-weight: 600;
  color: #888;
  text-transform: none;
  letter-spacing: 0.02em;
  margin-bottom: 4px;
}
.signal2-stat-value { 
  font-size: 2.4rem; 
  font-weight: 600; 
  margin: 0;
}
.signal2-stat-badge { margin-top: 8px; }

.signal2-radio-icon { display: inline-block; vertical-align: middle; margin-right: 4px; }

/* Базовые стили — крестик скрыт на десктопе, перенос скрыт */
.signal2-mobile-break { display: none; }
.signal2-modal-close-icon { display: none; }

@media (max-width: 768px) {
  .signal2-switcher::before, 
  .signal2-switcher:hover::before { display: none; }
  
  .signal2-widget-content { padding: 24px 0; }
  .signal2-main-card { padding: 16px; }
  .signal2-stats-grid { grid-template-columns: 1fr; gap: 12px; }
  
  .signal2-stat-card { 
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 16px; 
    transition: none; 
  }
  
  .signal2-stat-card:hover { transform: none; }
  
  .signal2-stat-content { 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    width: 100%; 
    background: none !important; 
    box-shadow: none !important;
  }
  
  .signal2-stat-left-group { 
    display: flex; 
    align-items: center; 
    gap: 12px;
  }
  
  .signal2-stat-value { 
    font-size: 2rem; 
    font-weight: 600; 
    margin: 0;
  }
  
  .signal2-stat-label { 
    font-size: 14px;
    font-weight: 600;
    color: #888;
    text-transform: none;
    letter-spacing: 0.02em;
    margin-bottom: 0;
  }
  
  .signal2-stat-badge { 
    flex-shrink: 0;
    margin-top: 0;
  }
  
  .signal2-button-container { flex-direction: column; gap: 8px; }
  .signal2-action-button:hover { transform: none; }
  .signal2-system-status-bar { flex-direction: column; align-items: center; padding: 8px 12px; gap: 4px; margin: 16px 0 12px 0; }
  .signal2-status-label, .signal2-status-label-disconnected { font-size: 14px; font-weight: 600; margin-right: 0; }
  .signal2-status-metrics { gap: 12px; justify-content: center; }
  .signal2-metric-time, .signal2-metric-text { font-size: 14px; }
  .signal2-button-icon-container { width: 28px; height: 28px; }
  .signal2-action-button { justify-content: center !important; }
  .signal2-button-icon-container { margin-left: 8px !important; margin-right: -8px; }
  .signal2-review-modal-overlay { padding: 4px; }
  .signal2-review-modal-content { width: 95vw; height: clamp(85vh, 90vh, 85vh); max-width: 95vw; max-height: clamp(85vh, 90vh, 85vh); }
  .signal2-modal-scrollable-content { padding: 20px 12px 12px 12px; }
  .signal2-modal-close-button { width: 100%; justify-content: center; font-size: 14px; padding: 12px 20px; }
  .signal2-modal-close-section { padding: 12px; }
  
  .signal2-mobile-break { display: block; }
  
  .signal2-status-label-disconnected {
    text-align: center;
    line-height: 1.4;
  }
  
/* Крестик для мобильной версии */
.signal2-modal-close-icon {
  display: flex !important;
  position: fixed !important;
  top: 2vh !important;
  right: 2.5vw !important;
  width: 44px !important;
  height: 44px !important;
  background: #1a1a1c !important;
  border: none !important;
  border-radius: 8px !important;
  color: #4a4a4c !important;
  cursor: pointer !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.3s ease;
  z-index: 10001 !important;
  backdrop-filter: none !important;
  opacity: 1 !important;
}

.signal2-modal-close-icon:hover {
  background: #252527 !important;
  color: #6a6a6c !important;
  transform: scale(1.05) !important;
}

.signal2-modal-close-icon svg {
  stroke-width: 2.5 !important;
}

/* Скрываем текстовую кнопку на мобильных */
.signal2-modal-close-button {
  display: none;
}
  
  /* Убираем фон секции */
  .signal2-modal-close-section {
    padding: 0;
    border-top: none;
    background: transparent;
  }
}
@media (max-width: 700px) {
  .signal2-review-modal-content { width: 95vw; height: 85vh; }
  .signal2-modal-scrollable-content { padding: 20px 12px 12px 12px; }
}
@media (max-width: 480px) {
  .signal2-widget-content { padding: 20px 0; }
  .signal2-branches-title-text { font-size: 22px; text-align: center; }
  .signal2-branches-subtitle { font-size: 14px; }
  .signal2-cafe-name { font-size: 20px; }
  .signal2-status-badge { padding: 4px 12px; font-size: 10px; }
  .signal2-status-metrics { gap: 8px; }
  .signal2-metric-time { font-size: 13px; min-width: 28px; }
  .signal2-metric-text { font-size: 13px; }
  .signal2-modal { padding: 24px; }
  .signal2-modal-body { margin-top: 12px; }
  .signal2-modal-footer { margin-top: 20px; }
  .signal2-review-modal-content { height: 85vh; }
  .signal2-modal-scrollable-content { padding: 16px 10px 10px 10px; }
}
@media screen and (max-height: 700px) {
  .signal2-review-modal-content { height: 80vh !important; max-height: 80vh !important; }
}
@media screen and (max-height: 600px) {
  .signal2-review-modal-content { height: 75vh !important; max-height: 75vh !important; }
}
.signal2-graphite-stat {
  --signal2-border-gradient: linear-gradient(135deg, rgba(70, 70, 70, 0.8), rgba(113, 128, 150, 0.6), rgba(70, 70, 70, 0.8));
  --signal2-glow-color: rgba(70, 70, 70, 0.25);
  --signal2-glow-hover-color: rgba(113, 128, 150, 0.4);
}
.signal2-lime-stat {
  --signal2-border-gradient: linear-gradient(135deg, #4d7c0f, #a3e635, #c5f946);
  --signal2-glow-color: rgba(197, 249, 70, 0.25);
  --signal2-glow-hover-color: rgba(197, 249, 70, 0.6);
}

@keyframes liquid-fluid {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.signal2-modal-close-button {
  background-color: #272727;
  border: none;
  color: #888;
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: none;
  animation: none;
}

.signal2-modal-close-button:hover {
  background-color: #333333;
  color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  transform: translateY(-2px);
}

.signal-100-badge {
  background-image: linear-gradient(-45deg, #c5f946, #85a931, #c5f946, #85a931);
  background-size: 400% 400%;
  animation: liquid-fluid 6s ease infinite;
  border: none;
}

.signal-100-badge .signal2-badge-text {
  color: #fff;
  font-weight: 700;
}

.signal-100-badge .signal2-badge-emoji {
  filter: brightness(0);
}
</style>
