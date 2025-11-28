<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'

const cafeNames = ['Корж', 'MOSAIC', 'Surf', 'Skuratov', 'Белотурка', 'Кэрри']

// Данные о кофейнях
const cafes = {
  'Корж': {
    name: 'Корж',
    ListeningStatus: 'Подключены',
    ListeningBadgeText: 'Отвечают быстро',
    SignalsStatus: 'Действуют',
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
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3e635" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="signal2-radio-icon" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><path d="M16.247 7.761a6 6 0 0 1 0 8.478"/><path d="M19.075 4.933a10 10 0 0 1 0 14.134"/><path d="M4.925 19.067a10 10 0 0 1 0-14.134"/><path d="M7.753 16.239a6 6 0 0 1 0-8.478"/>ircle cx="12" cy="12" r="2"/></svg> ${day}.${month} → ${monthName} ${year}`;
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
const isReviewModalOpen = ref(false)

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

const openReviewModal = () => {
  isReviewModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeReviewModal = () => {
  isReviewModalOpen.value = false
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
const currentQuestionIndex = ref(0)
const showText = ref(true)
let intervalId = null
let metricsIntervalId = null

const cycleText = () => {
  showText.value = false
  setTimeout(() => {
    currentQuestionIndex.value = (currentQuestionIndex.value + 1) % rotatingQuestions.length
    showText.value = true
  }, 1000)
}

const showInfoModal = ref(false)
const showGrowthModal = ref(false)

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    if (isReviewModalOpen.value) {
      closeReviewModal()
    } else {
      showInfoModal.value = false
      showGrowthModal.value = false
    }
  }
}

const openYandexModal = () => {
  if (isMobile.value) return
  showYandexTooltip.value = false
  showGrowthModal.value = true
}

const openSignalsModal = () => {
  if (isMobile.value) {
    showInfoModal.value = true
  } else {
    showSignalsTooltip.value = false
    showInfoModal.value = true
  }
}

watch(selectedCafe, (newName) => {
  const newConfig = getCafeConfig(newName)
  systemMetrics.value.responseTime = newConfig.responseTime.base
  systemMetrics.value.resolutionTime = newConfig.resolutionTime.base
  systemMetrics.value.lastUpdate = Date.now()
  fetchSystemStatus()
})

onMounted(() => {
  intervalId = setInterval(cycleText, 7000)
  metricsIntervalId = setInterval(fetchSystemStatus, 45000)
  fetchSystemStatus()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', checkMobile)
  checkMobile()
  
  nextTick(() => {
    handleSwitcherScroll()
  })
})

onUnmounted(() => {
  clearInterval(intervalId)
  clearInterval(metricsIntervalId)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="signal2-widget-content" ref="widgetContentRef">
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

    <div v-if="establishment">
      <div class="signal2-main-card">
        <div class="signal2-establishment-header">
          <h3 class="signal2-cafe-name">{{ establishment.name }}</h3>
          <div 
            class="signal2-status-badge"
            ref="badgeRef"
          >
            <span v-html="todayStatus"></span>
          </div>
        </div>

        <div class="signal2-stats-grid">
          <div 
            class="signal2-stat-card signal2-graphite-stat"
            @mouseenter="!isMobile ? showYandexTooltip = true : null"
            @mouseleave="!isMobile ? showYandexTooltip = false : null"
            @click="openYandexModal"
          >
            <div class="signal2-stat-content">
              <div class="signal2-stat-left-group">
                <div class="signal2-stat-value">{{ establishment.ListeningStatus }}</div>
                <div class="signal2-stat-label">Как слушают</div>
              </div>
              <div class="signal2-stat-badge signal2-graphite-badge">
                <span class="signal2-badge-emoji">💬</span>
                <span class="signal2-badge-text">{{ establishment.ListeningBadgeText }}</span>
              </div>
            </div>
          </div>

          <div 
            class="signal2-stat-card signal2-lime-stat" 
            @mouseenter="!isMobile ? showSignalsTooltip = true : null"
            @mouseleave="!isMobile ? showSignalsTooltip = false : null"
            @click="openSignalsModal"
          >
            <div class="signal2-stat-content">
              <div class="signal2-stat-left-group">
                <div class="signal2-stat-value">{{ establishment.SignalsStatus }}</div>
                <div class="signal2-stat-label">Как меняют</div>
              </div>
              <div class="signal2-stat-badge signal2-lime-badge">
                <span class="signal2-badge-emoji">⚡</span>
                <span class="signal2-badge-text">{{ establishment.SignalsBadgeText }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="signal2-system-status-bar">
          <span v-if="establishment.isConnected" class="signal2-status-label">🟢 На связи:</span>
          <span v-else class="signal2-status-label-disconnected">🟡 Отправим менеджеру кофейни <br class="signal2-mobile-break">и постараемся помочь</span>
          
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
              :aria-expanded="showInfoModal ? 'true' : 'false'\"\n              @click=\"showInfoModal = true\"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                ircle cx="12" cy="12" r="10" />
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
            <button @click="openYandexModal" class="signal2-action-button signal2-ticket-button">
              Отзыв Яндекс/2ГИС
              <div class="signal2-button-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/>ircle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></svg>
              </div>
            </button>
            <button @click="openReviewModal" class="signal2-action-button signal2-review-button">
              Отправить Сигнал
              <div class="signal2-button-icon-container signal2-lime-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a2e05" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
              </div>
            </button>
          </div>
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
          <button @click="closeReviewModal" class="signal2-modal-close-icon" aria-label="Закрыть">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
          <button @click="closeReviewModal" class="signal2-modal-close-button">Закрыть и вернуться</button>
        </div>
      </div>
    </div>

    <div v-if="showInfoModal" class="signal2-modal-overlay" @click.self="showInfoModal = false">
      <div class="signal2-modal" role="dialog" aria-modal="true" aria-label="Сигналы">
        <div class="signal2-modal-header">
          <div class="signal2-modal-title">Сигналы</div>
        </div>
        <div class="signal2-modal-body">
          Быстрая помощь и решение проблем за 24 часа. Ваш сигнал мгновенно поступает в работу управляющему кофейни, и вы получаете не просто ответ, а реальный результат.
        </div>
        <div class="signal2-modal-footer">
          <button class="signal2-modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>

    <div v-if="showGrowthModal" class="signal2-modal-overlay" @click.self="showGrowthModal = false">
      <div class="signal2-modal" role="dialog" aria-modal="true" aria-label="Отзыв Яндекс/2ГИС">
        <div class="signal2-modal-header">
          <div class="signal2-modal-title">Отзыв Яндекс/2ГИС</div>
        </div>
        <div class="signal2-modal-body">
          Это пустое модальное окно
        </div>
        <div class="signal2-modal-footer">
          <button class="signal2-modal-ok" type="button" @click="showGrowthModal = false">Понятно</button>
        </div>
      </div>
    </div>

  </div>
</template>
