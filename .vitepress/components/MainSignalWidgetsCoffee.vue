<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'
import AddVoteStatus from './AddVoteStatus.vue'

const cafeNames = [
  'Дринкит', 
  'Корж', 
  'Skuratov Coffee', 
  'Surf Coffee', 
  'ДаблБи', 
  'Green House', 
  'Stars Coffee', 
  'Cofix', 
  'Do.bro Coffee'
]

const cafes = {
  'Дринкит': {
    name: 'Дринкит',
    image: '/widget/surf_widget_bg.jpg', // Используем дефолтный фон
    ListeningStatus: 'Общаются',
    ListeningBadgeText: 'Устойчивый диалог',
    SignalsStatus: 'Системно',
    SignalsBadgeText: 'Процессы отлажены',
    isConnected: false
  },
  'Корж': {
    name: 'Корж',
    image: '/widget/korzh_widget_bg.jpg', // Сохранили оригинальный фон
    ListeningStatus: 'Общаются',
    ListeningBadgeText: 'Устойчивый диалог',
    SignalsStatus: 'Внимательно',
    SignalsBadgeText: 'Гарантируют решение',
    isConnected: true
  },
  'Skuratov Coffee': {
    name: 'Skuratov Coffee',
    image: '/widget/surf_widget_bg.jpg',
    ListeningStatus: 'Общаются',
    ListeningBadgeText: 'Устойчивый диалог',
    SignalsStatus: 'Внимательно',
    SignalsBadgeText: 'Гарантируют решение',
    isConnected: false
  },
  'Surf Coffee': {
    name: 'Surf Coffee',
    image: '/widget/surf_widget_bg.jpg',
    ListeningStatus: 'Общаются',
    ListeningBadgeText: 'Устойчивый диалог',
    SignalsStatus: 'Внимательно',
    SignalsBadgeText: 'Гарантируют решение',
    isConnected: false
  },
  'ДаблБи': {
    name: 'ДаблБи',
    image: '/widget/surf_widget_bg.jpg',
    ListeningStatus: 'Реагируют',
    ListeningBadgeText: 'Обычно отвечают',
    SignalsStatus: 'Внимательно',
    SignalsBadgeText: 'Гарантируют решение',
    isConnected: false
  },
  'Green House': {
    name: 'Green House',
    image: '/widget/surf_widget_bg.jpg',
    ListeningStatus: 'Реагируют',
    ListeningBadgeText: 'Обычно отвечают',
    SignalsStatus: 'Внимательно',
    SignalsBadgeText: 'Гарантируют решение',
    isConnected: false
  },
  'Stars Coffee': {
    name: 'Stars Coffee',
    image: '/widget/surf_widget_bg.jpg',
    ListeningStatus: 'Реагируют',
    ListeningBadgeText: 'Обычно отвечают',
    SignalsStatus: 'Внимательно',
    SignalsBadgeText: 'Гарантируют решение',
    isConnected: false
  },
  'Cofix': {
    name: 'Cofix',
    image: '/widget/surf_widget_bg.jpg',
    ListeningStatus: 'Реагируют',
    ListeningBadgeText: 'Обычно отвечают',
    SignalsStatus: 'Оперативно',
    SignalsBadgeText: 'Живой отклик',
    isConnected: false
  },
  'Do.bro Coffee': {
    name: 'Do.bro Coffee',
    image: '/widget/surf_widget_bg.jpg',
    ListeningStatus: 'Принимают',
    ListeningBadgeText: 'Сигналы доходят',
    SignalsStatus: 'Оперативно',
    SignalsBadgeText: 'Живой отклик',
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
  
  return `<span class="signal2-radio-icon-wrapper"></span>${day}.${month} <span class="signal2-arrow-icon-wrapper"></span> ${monthName} ${year}`;
});

const getCafeConfig = (cafeName) => {
  const normalized = cafeName?.toLowerCase() || ''
  return cafeProfiles[normalized] || { responseTime: { base: 2, min: 1, max: 3 }, resolutionTime: { base: 15, min: 12, max: 18 } }
}

const selectedCafe = ref(cafeNames[0] || 'Корж')

const establishment = computed(() => cafes[selectedCafe.value] || {
  name: '',
  image: '',
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
const showInfoModal = ref(false)

// --- ЛОГИКА СВАЙПА ---
const touchStart = ref({ x: 0, y: 0 })
const touchEnd = ref({ x: 0, y: 0 })

const handleTouchStart = (e) => {
  touchStart.value.x = e.changedTouches[0].screenX
  touchStart.value.y = e.changedTouches[0].screenY
}

const handleTouchEnd = (e) => {
  touchEnd.value.x = e.changedTouches[0].screenX
  touchEnd.value.y = e.changedTouches[0].screenY
  handleSwipe()
}

const handleSwipe = () => {
  const diffX = touchEnd.value.x - touchStart.value.x
  const diffY = touchEnd.value.y - touchStart.value.y
  
  // Если движение по вертикали больше чем по горизонтали - это скролл страницы, игнорируем
  if (Math.abs(diffY) > Math.abs(diffX)) return

  // Порог срабатывания свайпа (50px)
  if (Math.abs(diffX) > 50) {
    const currentIndex = cafeNames.indexOf(selectedCafe.value)
    let newIndex
    
    if (diffX > 0) {
      // Свайп вправо (предыдущая)
      newIndex = currentIndex - 1
      if (newIndex < 0) newIndex = cafeNames.length - 1
    } else {
      // Свайп влево (следующая)
      newIndex = currentIndex + 1
      if (newIndex >= cafeNames.length) newIndex = 0
    }
    
    selectedCafe.value = cafeNames[newIndex]
  }
}
// --- КОНЕЦ ЛОГИКИ СВАЙПА ---

const fetchSystemStatus = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50))
    const currentConfig = cafeConfig.value
    const now = Date.now()
    const responseVariation = (Math.random() - 0.5) * 0.15
    const resolutionVariation = (Math.random() - 0.5) * 1.2

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

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    if (isSignalModalOpen.value) closeSignalModal()
    if (isVoteModalOpen.value) closeVoteModal()
    showInfoModal.value = false
  }
}

const preloadImages = () => {
  const imagesToPreload = Object.values(cafes).map(cafe => cafe.image).filter(Boolean)
  const uniqueImages = [...new Set(imagesToPreload)]
  
  uniqueImages.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

// Автопрокрутка свитчера к активной кофейне
const scrollSwitcherToActive = () => {
  if (!switchersRef.value) return
  const activeBtn = switchersRef.value.querySelector('.signal2-switcher.active')
  if (activeBtn) {
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
}

watch(selectedCafe, (newName) => {
  const newConfig = getCafeConfig(newName)
  systemMetrics.value.responseTime = newConfig.responseTime.base
  systemMetrics.value.resolutionTime = newConfig.resolutionTime.base
  systemMetrics.value.lastUpdate = Date.now()
  fetchSystemStatus()
  
  // Ждем обновления DOM и скроллим свитчер
  nextTick(() => {
    scrollSwitcherToActive()
  })
})

onMounted(() => {
  preloadImages()
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
        <button class="signal2-switcher" :class="{ active: selectedCafe === 'Корж' }" @click="selectedCafe = 'Корж'">Корж</button>
        <button class="signal2-switcher" :class="{ active: selectedCafe === 'MOSAIC' }" @click="selectedCafe = 'MOSAIC'">MOSAIC</button>
        <button class="signal2-switcher" :class="{ active: selectedCafe === 'Surf' }" @click="selectedCafe = 'Surf'">Surf</button>
        <button class="signal2-switcher" :class="{ active: selectedCafe === 'Skuratov' }" @click="selectedCafe = 'Skuratov'">Skuratov</button>
        <button class="signal2-switcher" :class="{ active: selectedCafe === 'Белотурка' }" @click="selectedCafe = 'Белотурка'">Белотурка</button>
        <button class="signal2-switcher" :class="{ active: selectedCafe === 'Кэрри' }" @click="selectedCafe = 'Кэрри'">Кэрри</button>
      </div>
      
      <div class="signal2-switchers-gradient signal2-switchers-gradient-left" :class="{ 'signal2-gradient-visible': showLeftGradient }"></div>
      <div class="signal2-switchers-gradient signal2-switchers-gradient-right" :class="{ 'signal2-gradient-visible': showRightGradient }"></div>
    </div>

    <!-- Добавлена анимация перехода fade -->
    <Transition name="fade" mode="out-in">
      <div 
        v-if="establishment"
        :key="selectedCafe"
        class="signal2-main-card" 
        :style="{ backgroundImage: `url(${establishment.image})` }"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div class="signal2-blur-overlay"></div>
        <div class="signal2-main-card-border"></div>

        <div class="signal2-content-relative">
          <div class="signal2-establishment-header">
            <h3 class="signal2-cafe-name">{{ establishment.name }}</h3>
            <div class="signal2-status-badge" ref="badgeRef">
              <span v-html="todayStatus"></span>
            </div>
          </div>

          <div class="signal2-stats-grid">
            <div class="signal2-stat-card signal2-graphite-stat" 
                 @click="openVoteModal"
                 @mouseenter="!isMobile ? showYandexTooltip = true : null" 
                 @mouseleave="!isMobile ? showYandexTooltip = false : null">
              <div class="signal2-stat-content">
                <div class="signal2-stat-left-group">
                  <div class="signal2-stat-label">КАК СЛУШАЮТ</div>
                  <div class="signal2-stat-value">{{ establishment.ListeningStatus }}</div>
                </div>
                <div class="signal2-stat-badge signal2-graphite-badge">
                  <span class="signal2-badge-text">{{ establishment.ListeningBadgeText }}</span>
                </div>
              </div>
            </div>

            <div class="signal2-stat-card signal2-lime-stat" 
                 @click="openVoteModal"
                 @mouseenter="!isMobile ? showSignalsTooltip = true : null" 
                 @mouseleave="!isMobile ? showSignalsTooltip = false : null">
              <div class="signal2-stat-content">
                <div class="signal2-stat-left-group">
                  <div class="signal2-stat-label">КАК ДЕЙСТВУЮТ</div>
                  <div class="signal2-stat-value">{{ establishment.SignalsStatus }}</div>
                </div>
                <div class="signal2-stat-badge signal2-lime-badge signal-100-badge">
                  <span class="signal2-badge-text">{{ establishment.SignalsBadgeText }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="signal2-system-status-bar">
            <span v-if="establishment.isConnected" class="signal2-status-label"><span class="signal2-emoji">🟢</span> На связи:</span>
            <span v-else class="signal2-status-label-disconnected"><span class="signal2-emoji">🟡</span> Отправим менеджеру кофейни <br class="signal2-mobile-break">и постараемся помочь</span>
            
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
                @click="showInfoModal = true"
              >
                <span class="signal2-info-icon-wrapper"></span>
              </button>
              <span v-if="!isMobile" class="signal2-static-prompt">Поделитесь:</span>
              <div class="signal2-rotating-text-container" :class="{ 'signal2-full-width': isMobile }">
                <span :class="['signal2-rotating-text', { 'signal2-show': showText }]">{{ rotatingQuestions[currentQuestionIndex] }}</span>
              </div>
            </div>

            <div class="signal2-button-container">
              <button @click="openVoteModal" class="signal2-action-button signal2-ticket-button">
                Моя Оценка
                <div class="signal2-button-icon-container">
                  <span class="signal2-settings-icon-wrapper"></span>
                </div>
              </button>
              <button @click="openSignalModal" class="signal2-action-button signal2-review-button">
                Отправить Сигнал
                <div class="signal2-button-icon-container signal2-lime-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a2e05" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div 
      v-if="isVoteModalOpen" 
      class="signal2-review-modal-overlay"
      @click="closeVoteModal"
    >
      <div class="signal2-review-modal-content" @click.stop>
        <button @click="closeVoteModal" class="signal2-modal-close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <div class="signal2-modal-scrollable-content">
          <AddVoteStatus @close="closeVoteModal" />
        </div>
      </div>
    </div>

    <div 
      v-if="isSignalModalOpen" 
      class="signal2-review-modal-overlay"
      @click="closeSignalModal"
    >
      <div class="signal2-review-modal-content" @click.stop>
        <button @click="closeSignalModal" class="signal2-modal-close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div class="signal2-modal-scrollable-content">
          <SignalT9Configurator />
        </div>
        
        <div class="signal2-modal-close-section">
          <button @click="closeSignalModal" class="signal2-modal-close-button">Закрыть и вернуться</button>
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

  </div>
</template>

<style scoped>
/* Анимация перехода */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.signal2-widget-content { padding-top: 20px !important; padding-bottom: 32px; margin-top: 0px !important; }
.signal2-cafe-switchers-container { position: relative; margin-bottom: 32px; }
.signal2-cafe-switchers { display: flex; gap: 12px; padding-bottom: 12px; flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: thin; scrollbar-color: rgba(70, 70, 70, 0.8) transparent; }
.signal2-cafe-switchers::-webkit-scrollbar { height: 2px; }
.signal2-cafe-switchers::-webkit-scrollbar-track { background: transparent; }
.signal2-cafe-switchers::-webkit-scrollbar-thumb { background-color: rgba(70, 70, 70, 0.8); border-radius: 10px; }
.signal2-cafe-switchers::-webkit-scrollbar-thumb:hover { background-color: rgba(85, 85, 85, 0.9); }
.signal2-switcher { border-radius: 50px; padding: 12px 20px; font-size: 15px; font-weight: 700; cursor: pointer; border: none; transition: all 0.3s ease; white-space: nowrap; display: flex; align-items: center; gap: 8px; min-width: fit-content; position: relative; overflow: hidden; background: rgba(70, 70, 70, 0.6); color: rgba(255, 255, 255, 0.9); }
.signal2-switcher::before { content: ''; position: absolute; left: -200%; top: 0; width: 200%; height: 100%; background: linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 60%, transparent 70%, transparent 100%); transition: all 1.2s ease; }
.signal2-switcher:hover::before { left: 100%; }
.signal2-switcher.active { background: rgba(255, 255, 255, 0.95); color: #333; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
.signal2-switcher.active::before { display: none; }
.signal2-switcher-icon { width: 16px; height: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.signal2-switchers-gradient { position: absolute; top: 0; bottom: 12px; width: 60px; pointer-events: none; z-index: 2; opacity: 0; transition: opacity 0.6s ease; }
.signal2-switchers-gradient.signal2-gradient-visible { opacity: 1; }
.signal2-switchers-gradient-left { left: 0; background: linear-gradient( to right, #1b1b1f 0%, #1b1b1f 20%, rgba(27, 27, 31, 0.95) 40%, rgba(27, 27, 31, 0.8) 60%, rgba(27, 27, 31, 0.5) 80%, transparent 100% ); }
.signal2-switchers-gradient-right { right: 0; background: linear-gradient( to left, #1b1b1f 0%, #1b1b1f 20%, rgba(27, 27, 31, 0.95) 40%, rgba(27, 27, 31, 0.8) 60%, rgba(27, 27, 31, 0.5) 80%, transparent 100% ); }
:deep(.signal2-no-vitepress-style) { text-decoration: underline !important; text-decoration-color: rgba(255, 255, 255, 0.3) !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-no-vitepress-style:hover) { text-decoration: underline !important; text-decoration-color: rgba(255, 255, 255, 0.6) !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-no-vitepress-style:visited), :deep(.signal2-no-vitepress-style:focus), :deep(.signal2-no-vitepress-style:active) { text-decoration: underline !important; text-decoration-color: rgba(255, 255, 255, 0.3) !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-modal-link.signal2-no-vitepress-style) { text-decoration: underline !important; text-decoration-color: #a3e635 !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-modal-link.signal2-no-vitepress-style:hover) { text-decoration: underline !important; text-decoration-color: #c5f946 !important; border-bottom: none !important; background: none !important; }

.signal2-radio-icon-wrapper {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: #a3e635;
  -webkit-mask: url(/radio.svg) no-repeat center;
  mask: url(/radio.svg) no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
  vertical-align: middle;
  margin-right: 4px;
}

.signal2-arrow-icon-wrapper {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m12 5 7 7-7 7'/%3E%3C/svg%3E") no-repeat center;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m12 5 7 7-7 7'/%3E%3C/svg%3E") no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
  vertical-align: middle;
  margin: 0 4px;
}

.signal2-info-icon-wrapper {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: currentColor;
  -webkit-mask: url(/info.svg) no-repeat center;
  mask: url(/info.svg) no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
}

.signal2-settings-icon-wrapper {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: currentColor;
  -webkit-mask: url(/settings.svg) no-repeat center;
  mask: url(/settings.svg) no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
}

.signal2-emoji {
  display: inline-block;
  font-size: 0.8em;
  line-height: 1;
}

.signal2-review-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 8px; box-sizing: border-box; }
.signal2-review-modal-content { background: #1e1e20; border-radius: 16px; width: 780px; height: clamp(85vh, 90vh, 85vh); max-width: 95vw; max-height: clamp(85vh, 90vh, 85vh); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); box-sizing: border-box; color: white; display: flex; flex-direction: column; overflow: hidden; position: relative; }

.signal2-modal-scrollable-content { flex: 1; overflow-y: auto; padding: 20px 16px 16px 16px; }
:deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(p), :deep(span), :deep(label), :deep(.title), :deep(.subtitle), :deep(.description), :deep(.example-text), :deep(.hint-text) { text-align: initial !important; padding-left: 0 !important; padding-right: 0 !important; }
:deep(.container), :deep(.content) { padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important; }
:deep(.form-section), :deep(.form-group), :deep(.section-wrapper) { margin-bottom: clamp(10px, 2vw, 10px) !important; }
:deep(.card), :deep(.block), :deep(.content-block) { margin-bottom: clamp(8px, 1.6vw, 8px) !important; }
.signal2-modal-close-section { flex-shrink: 0; padding: 20px 16px 24px 16px; background: #1e1e20; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: center; }
.signal2-branches-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 2px solid var(--vp-c-border); }
.signal2-branches-title-text { margin: 0; color: white; font-size: 26px; font-weight: 700; line-height: 1.2; text-align: center; flex-grow: 1; }
.signal2-internal-close-btn { background: var(--vp-c-bg-mute); border: 2px solid var(--vp-c-border); border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--vp-c-text-2); transition: all 0.3s ease; flex-shrink: 0; }
.signal2-back-btn:hover { background: var(--vp-c-bg-soft); border-color: var(--vp-c-text-2); color: white; }

.signal2-main-card { 
  /* Убран background-color: #2d2d2d, чтобы избежать белых стыков при скруглении */
  background-color: #1e1e20; /* Цвет темного оверлея */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px; 
  position: relative;
  overflow: hidden; 
  padding: 0;
  transform: translateZ(0); 
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* Оверлей без border-radius но с inset 0 */
.signal2-blur-overlay {
  position: absolute;
  inset: 0; /* Полное заполнение */
  background: rgba(18, 18, 20, 0.85);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  z-index: 1;
  /* Убран border-radius, чтобы не конфликтовать с родителем */
  
}
.signal2-main-card-border {
  pointer-events: none;
  border-radius: 20px;
  border: 1.5px solid rgba(190,200,220,0.20);
  position: absolute;
  inset: 0;
  z-index: 2;
  box-sizing: border-box;
  background: transparent;
}


.signal2-content-relative {
  position: relative;
  z-index: 2;
  padding: 20px;
}

.signal2-establishment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.signal2-cafe-name { margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; }
.signal2-status-badge { background: rgba(0,0,0,0.2); backdrop-filter: blur(5px); color: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; white-space: nowrap; box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3); text-transform: uppercase; letter-spacing: 0.5px; position: relative; }
.signal2-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.signal2-stat-card { position: relative; border-radius: 22px; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); overflow: hidden; background: var(--vp-c-bg-soft); cursor: pointer; }
.signal2-stat-card:hover { transform: translateY(-8px); }

.signal2-stat-card::before { content: ''; position: absolute; inset: 0; border-radius: 22px; padding: 1.5px; background: var(--signal2-border-gradient); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; transition: filter 0.4s ease; z-index: 3; }
.signal2-stat-card:hover::before { filter: brightness(2) saturate(1.5); }
.signal2-stat-content { background: radial-gradient(circle at 50% 0%, var(--signal2-glow-color) 0%, transparent 70%); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; text-align: center; box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.3); transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); position: relative; z-index: 2; }
.signal2-stat-card:hover .signal2-stat-content { background: radial-gradient(circle at 50% 0%, var(--signal2-glow-hover-color) 0%, transparent 70%); box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.4); }

.signal2-stat-value { 
  font-family: 'Inter', sans-serif; 
  font-size: 1.8rem; 
  font-weight: 500;
  line-height: 1; 
  color: #fff; 
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.7); 
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); 
}
.signal2-stat-card:hover .signal2-stat-value { transform: scale(1.05); text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.8); }

.signal2-stat-label { 
  font-weight: 700; 
  font-size: 11px; 
  letter-spacing: 0.1em; 
  text-transform: uppercase; 
  margin-bottom: 12px; 
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  background: linear-gradient(135deg, var(--signal2-label-color-1), var(--signal2-label-color-2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.9;
  position: relative;
}
.signal2-stat-card:hover .signal2-stat-label { 
  transform: scale(1.05); 
  opacity: 1;
}

.signal2-stat-badge { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 12px; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.1); margin-top: auto; }
.signal2-badge-emoji { font-size: 16px; line-height: 1; flex-shrink: 0; display: flex; align-items: center; }
.signal2-badge-text { font-size: 11px; font-weight: 600; color: rgba(255, 255, 255, 0.85); letter-spacing: 0.02em; white-space: nowrap; }
.signal2-graphite-badge .signal2-badge-text { color: rgba(160, 174, 192, 1); }
.signal2-orange-badge .signal2-badge-text { color: rgba(252, 211, 77, 1); }
.signal2-lime-badge .signal2-badge-text { color: rgba(197, 249, 70, 1); }
.signal2-system-status-bar { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 20px 0 16px 0; padding: 8px 12px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.06); }
.signal2-status-label { font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.7); margin-right: 6px; flex-shrink: 0; }
.signal2-status-label-disconnected { font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.7); flex-shrink: 0; }
.signal2-status-metrics { display: flex; align-items: center; gap: 8px; }
.signal2-status-metric { display: flex; align-items: baseline; gap: 4px; }
.signal2-metric-time { font-size: 14px; font-weight: 700; color: rgba(255, 255, 255, 0.9); font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace; min-width: 32px; text-align: right; transition: all 0.3s ease; }
.signal2-metric-text { font-size: 14px; font-weight: 500; color: rgba(255, 255, 255, 0.6); }
.signal2-status-separator { color: rgba(255, 255, 255, 0.3); font-size: 14px; margin: 0 4px; }
.signal2-control-panel { margin-top: 24px; }

.signal2-control-panel-header { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  margin-bottom: 12px; 
  padding: 0 8px; 
  font-size: 14px; 
  font-weight: 600; 
  line-height: 1.5;
}
.signal2-info-link { color: rgba(255, 255, 255, 0.5); display: flex; align-items: center; transition: color 0.3s ease; flex-shrink: 0; }
.signal2-info-link:hover, .signal2-info-link:focus { color: white; }

.signal2-info-button { 
  background: transparent !important; 
  border: none !important;
  width: auto !important; 
  height: auto !important; 
  display: flex !important; 
  align-items: center !important; 
  justify-content: center !important; 
  transition: all 0.3s ease !important; 
  flex-shrink: 0 !important; 
  cursor: pointer; 
  padding: 0 !important;
}
.signal2-info-button:hover { 
  transform: scale(1.1) !important; 
}

.signal2-static-prompt { 
  color: white; 
  margin-right: 8px; 
  flex-shrink: 0; 
  line-height: 1.5;
}
.signal2-rotating-text-container { 
  flex-grow: 1; 
  text-align: left; 
  color: rgba(255, 255, 255, 0.7); 
  min-height: 36px; 
  display: flex; 
  align-items: center; 
}
.signal2-rotating-text-container.signal2-full-width { text-align: center; justify-content: center; }
.signal2-rotating-text { 
  transition: opacity 0.5s ease-in-out; 
  line-height: 1.5;
}
.signal2-rotating-text:not(.signal2-show) { opacity: 0; }
.signal2-button-container { display: flex; gap: 6px; background-color: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 20px; padding: 6px; }
.signal2-action-button { flex: 1; padding: 14px 20px; border-radius: 16px; border: none; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 8px; }

.signal2-ticket-button { 
  background: linear-gradient(135deg, rgba(70, 70, 70, 0.9), rgba(113, 128, 150, 0.7));
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 12px rgba(70, 70, 70, 0.3);
}
.signal2-ticket-button:hover { 
  background: linear-gradient(135deg, rgba(85, 85, 85, 0.95), rgba(128, 142, 165, 0.8));
  color: white; 
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(70, 70, 70, 0.4);
}

.signal2-review-button { background: linear-gradient(135deg, #a3e635, #c5f946); color: #1a2e05; box-shadow: 0 4px 12px rgba(163, 230, 53, 0.3); }
.signal2-review-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(163, 230, 53, 0.4); }
.signal2-button-icon-container { width: 32px; height: 32px; border-radius: 50%; background: rgba(50, 50, 50, 0.9); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.3s ease; }
.signal2-lime-icon-container { background: rgba(100, 150, 30, 0.4) !important; }
.signal2-button-icon { transition: transform 0.3s ease; color: currentColor; }
.signal2-review-button:hover .signal2-button-icon { transform: translateX(2px); }
.signal2-ticket-button:hover .signal2-button-icon-container { background: rgba(35, 35, 35, 1); transform: scale(1.05); }
.signal2-review-button:hover .signal2-lime-icon-container { background: rgba(120, 180, 40, 0.5) !important; transform: scale(1.05); }
.signal2-branches-content { flex-grow: 1; }
.signal2-branches-subtitle { margin: 0 0 16px 0; font-size: 16px; color: var(--vp-c-text-2); }
.signal2-branches-list { padding: 0; }
.signal2-branch-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 18px; margin-bottom: 12px; background: var(--vp-c-bg-soft); border: 2px solid var(--vp-c-border); border-radius: 16px; cursor: pointer; transition: all 0.3s ease; text-align: left; }
.signal2-branch-item:hover { background: var(--vp-c-bg-soft); border-color: rgba(255, 255, 255, 0.5); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); transform: translateX(4px); }
.signal2-branch-info { display: flex; align-items: center; gap: 16px; flex: 1; overflow: hidden; }
.signal2-branch-number { background: rgba(70, 70, 70, 0.8); color: rgba(255, 255, 255, 0.9); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; transition: all 0.3s ease; box-shadow: none; }
.signal2-branch-item:hover .signal2-branch-number { background: rgba(85, 85, 85, 0.9); box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4); }
.signal2-branch-address { font-weight: 600; font-size: 16px; color: var(--vp-c-text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.signal2-branch-action { color: rgba(255, 255, 255, 0.5); transition: transform 0.3s ease; margin-left: 12px; }
.signal2-branch-item:hover .signal2-branch-action { transform: translateX(4px); }
.signal2-modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.signal2-modal { background: var(--vp-c-bg, #111); color: var(--vp-c-text-1, #fff); border: 1px solid var(--vp-c-border, rgba(255, 255, 255, 0.12)); border-radius: 12px; width: min(520px, 96vw); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4); padding: 32px; }
.signal2-modal-header { display: flex; align-items: center; justify-content: flex-start; gap: 12px; }
.signal2-modal-title { font-weight: 700; font-size: 16px; }
.signal2-modal-body { margin-top: 16px; font-size: 14px; color: var(--vp-c-text-1); line-height: 1.5; }
.signal2-modal-link { color: #a3e635; text-decoration: underline; text-decoration-color: #a3e635 !important; font-weight: 600; transition: all 0.3s ease; cursor: pointer; }
.signal2-modal-link:hover { color: #c5f946; text-decoration: underline; text-decoration-color: #c5f946 !important; }
.signal2-modal-footer { margin-top: 24px; display: flex; justify-content: flex-end; }
.signal2-modal-ok { background: var(--vp-c-bg-mute, #222); border: 1px solid var(--vp-c-border); color: var(--vp-c-text-1); border-radius: 8px; padding: 10px 16px; cursor: pointer; font-weight: 500; }
.signal2-modal-ok:hover { background: var(--vp-c-bg-soft, #333); }

.signal2-mobile-break { display: none; }

.signal2-modal-close-icon {
  display: flex;
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}


@media (max-width: 768px) {
  .signal2-switcher::before, 
  .signal2-switcher:hover::before { display: none; }
  
  .signal2-widget-content { padding-top: 10px !important; margin-top: 0; }
  
  .signal2-content-relative {
    padding: 16px;
    padding-top: 20px;
  }
  
  .signal2-main-card { padding: 0; }
  
  .signal2-stats-grid { grid-template-columns: 1fr; gap: 16px; }
  
  .signal2-stat-card { 
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 12px; 
    transition: none;
    min-height: 70px;
  }
  
  .signal2-stat-card::before {
    border-radius: 12px;
  }
  
  .signal2-stat-card:hover { transform: none; }
  
  .signal2-stat-content { 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    width: 100%; 
    background: none !important; 
    box-shadow: none !important;
    gap: 12px;
  }
  
  .signal2-stat-left-group { 
    display: flex; 
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .signal2-stat-value { 
    font-size: 1rem !important; 
    font-weight: 500 !important;
    margin: 0;
    line-height: 1.1;
  }
  
  .signal2-stat-label { 
    font-size: 11px !important;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0;
    order: -1;
    line-height: 1;
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
  
  .signal2-rotating-text-container { 
    text-align: center !important; 
    justify-content: center !important; 
    width: 100%;
    min-height: 44px !important;
  }
  
  .signal2-rotating-text {
    text-align: center;
    width: 100%;
  }
  
  .signal2-review-modal-overlay { padding: 4px; z-index: 9999; }
  .signal2-review-modal-content { width: 95vw; height: clamp(85vh, 90vh, 85vh); max-width: 95vw; max-height: clamp(85vh, 90vh, 85vh); position: relative; }
  .signal2-modal-scrollable-content { padding: 20px 12px 12px 12px; }
  
  .signal2-modal-close-button { display: block !important; width: 100%; justify-content: center; font-size: 14px; padding: 12px 20px; }
  .signal2-modal-close-section { display: flex !important; padding: 12px; border-top: 1px solid rgba(255,255,255,0.1); background: #1e1e20; }
  
  .signal2-mobile-break { display: block; }
  
  .signal2-status-label-disconnected {
    text-align: center;
    line-height: 1.4;
  }
  
  
}
@media (max-width: 700px) {
  .signal2-review-modal-content { width: 95vw; height: 85vh; }
  .signal2-modal-scrollable-content { padding: 20px 12px 12px 12px; }
}
@media (max-width: 480px) {
  .signal2-widget-content { padding-top: 10px !important; margin-top: 0; }
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
  --signal2-label-color-1: rgba(140, 155, 180, 1);
  --signal2-label-color-2: rgba(180, 194, 212, 0.9);
}
.signal2-lime-stat {
  --signal2-border-gradient: linear-gradient(135deg, #4d7c0f, #a3e635, #c5f946);
  --signal2-glow-color: rgba(197, 249, 70, 0.25);
  --signal2-glow-hover-color: rgba(197, 249, 70, 0.6);
  --signal2-label-color-1: rgba(183, 250, 73, 1);
  --signal2-label-color-2: rgba(217, 255, 100, 0.9);
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
  color: #000 !important;
  font-weight: 700;
}

.signal-100-badge .signal2-badge-emoji {
  filter: brightness(0);
}
</style>
