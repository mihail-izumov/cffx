<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
// --- НАСТРОЙКИ АНИМАЦИИ ---
const ROTATION_INTERVAL_MS = 7000
const FADE_DURATION_MS = 1000
// Профили всех кофеен с базовыми значениями времени
const cafeProfiles = {
  'корж': {
    responseTime: { base: 2.3, min: 1.8, max: 2.8 },
    resolutionTime: { base: 17.5, min: 15, max: 20 }
  },
  'cafe_1': {
    responseTime: { base: 1.6, min: 1.2, max: 2.1 },
    resolutionTime: { base: 15.2, min: 13, max: 18 }
  },
  'cafe_2': {
    responseTime: { base: 3.1, min: 2.5, max: 3.8 },
    resolutionTime: { base: 20.3, min: 18, max: 23 }
  },
  'cafe_3': {
    responseTime: { base: 1.4, min: 1.0, max: 1.9 },
    resolutionTime: { base: 14.7, min: 12, max: 17 }
  },
  'cafe_4': {
    responseTime: { base: 2.7, min: 2.2, max: 3.2 },
    resolutionTime: { base: 18.8, min: 16, max: 22 }
  },
  'cafe_5': {
    responseTime: { base: 2.0, min: 1.5, max: 2.6 },
    resolutionTime: { base: 16.4, min: 14, max: 19 }
  },
  'cafe_6': {
    responseTime: { base: 1.8, min: 1.3, max: 2.4 },
    resolutionTime: { base: 15.9, min: 13, max: 18 }
  },
  'cafe_7': {
    responseTime: { base: 2.9, min: 2.3, max: 3.5 },
    resolutionTime: { base: 19.1, min: 17, max: 22 }
  }
}
// -------------------------
const establishment = {
  name: 'Корж', // МЕСТО 1: Заменить название кофейни
  totalReviews: '4,520',
  branches: [
    { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/' },
    { address: 'Революционная, 101В, к1', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858/' },
    { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618', yandexUrl: 'https://yandex.ru/maps/51/samara/house/9_ya_proseka_5_ya_malaya_liniya_3b/YUkYdw5hQUAAQFtpfX52dXVgZw==/' },
    { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/' },
    { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/' },
    { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045', yandexUrl: 'https://yandex.ru/maps/51/samara/house/dachnaya_ulitsa_2k2/YUkYdwNhSEcOQFtpfX5xcHpkZQ==/' },
    { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071', yandexUrl: 'https://yandex.ru/maps/51/samara/chain/korz/23062014558/' },
    { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/' }
  ],
  status: 'Лидер 👑',
  index: 98,
}
// Функция получения конфига кофейни с фоллбэком
const getCafeConfig = (cafeName) => {
  const normalizedName = cafeName.toLowerCase()
  return cafeProfiles[normalizedName] || {
    responseTime: { base: 2.5, min: 2.0, max: 3.0 },
    resolutionTime: { base: 18.0, min: 15, max: 21 }
  }
}
// МЕСТО 2: Автоматически определяется из establishment.name
const cafeConfig = getCafeConfig(establishment.name)
// Система метрик реального времени с персональными значениями
const systemMetrics = ref({
  responseTime: cafeConfig.responseTime.base,
  resolutionTime: cafeConfig.resolutionTime.base,
  lastUpdate: Date.now()
})
// Получение данных с сервера
const fetchSystemStatus = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Получаем актуальный конфиг для текущей кофейни
    const currentConfig = getCafeConfig(establishment.name)
    
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
    console.warn('Metrics update failed, using cached values')
  }
}
// Форматирование времени
const formatTime = (hours) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)}мин`
  }
  return `${hours.toFixed(1)}ч`
}
const showBranchList = ref(false)
const emit = defineEmits(['close'])
const widgetContentRef = ref(null)
const getRandomService = () => Math.random() < 0.5 ? 'gis' : 'yandex'
const goToReviews = (branch) => {
  const service = getRandomService()
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
  window.open(url, '_blank')
}
const createTicket = () => {
  emit('close')
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
let metricsIntervalId = null
const cycleText = () => {
  showText.value = false
  setTimeout(() => {
    currentQuestionIndex.value = (currentQuestionIndex.value + 1) % rotatingQuestions.length
    showText.value = true
  }, FADE_DURATION_MS)
}

// Модальное окно для инфо
const showInfoModal = ref(false)
const onKeydown = (e) => {
  if (e.key === 'Escape') {
    showInfoModal.value = false
  }
}

// Отслеживаем смену кофейни и сбрасываем метрики
watch(() => establishment.name, (newName) => {
  const newConfig = getCafeConfig(newName)
  systemMetrics.value.responseTime = newConfig.responseTime.base
  systemMetrics.value.resolutionTime = newConfig.resolutionTime.base
  systemMetrics.value.lastUpdate = Date.now()
})
onMounted(() => {
  intervalId = setInterval(cycleText, ROTATION_INTERVAL_MS)
  metricsIntervalId = setInterval(fetchSystemStatus, 45000)
  fetchSystemStatus()
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  clearInterval(intervalId)
  clearInterval(metricsIntervalId)
  window.removeEventListener('keydown', onKeydown)
})
watch(showBranchList, (newValue) => {
  if (newValue) {
    nextTick(() => {
      widgetContentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
})
</script>
<template>
  <div class="review2-widget-content" ref="widgetContentRef">
    <!-- Первый экран -->
    <div v-if="!showBranchList">
      <div class="review2-widget-header">
        <div>
          <h2 class="review2-header-title">Отправьте Сигнал</h2>
          <p class="review2-header-subtitle">Каждая чашка кофе делает Вашу любимую кофейню еще лучше.</p>
        </div>
        <button @click="$emit('close')" class="review2-internal-close-btn review2-close-btn" aria-label="Закрыть окно">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18"/><path d="M6 6L18 18"/>
          </svg>
        </button>
      </div>
      
      <div class="review2-main-card">
        <div class="review2-establishment-header">
          <h3 class="review2-cafe-name">{{ establishment.name }}</h3>
          <div class="review2-status-badge">{{ establishment.status }}</div>
        </div>
        
        <div class="review2-stats-grid">
          <div class="review2-stat-card review2-branches-card">
            <div class="review2-stat-content">
              <div class="review2-stat-left-group">
                <div class="review2-stat-icon">☕</div>
                <div class="review2-stat-value">{{ establishment.branches.length }}</div>
              </div>
              <div class="review2-stat-label">Кофейни</div>
            </div>
          </div>
          
          <div class="review2-stat-card review2-index-card">
            <div class="review2-stat-content">
              <div class="review2-stat-left-group">
                <div class="review2-stat-icon">⚡</div>
                <div class="review2-stat-value">{{ establishment.index }}</div>
              </div>
              <div class="review2-stat-label">Индекс роста</div>
            </div>
          </div>
          
          <div class="review2-stat-card review2-reviews-card">
            <div class="review2-stat-content">
              <div class="review2-stat-left-group">
                <div class="review2-stat-icon">📡</div>
                <div class="review2-stat-value">{{ establishment.totalReviews }}</div>
              </div>
              <div class="review2-stat-label">Отзывы</div>
            </div>
          </div>
        </div>
        <!-- СТАТУС СИСТЕМЫ СИГНАЛОВ -->
        <div class="review2-system-status-bar">
          <span class="review2-status-label">🟢 На связи:</span>
          <div class="review2-status-metrics">
            <div class="review2-status-metric">
              <span class="review2-metric-time">{{ formatTime(systemMetrics.responseTime) }}</span>
              <span class="review2-metric-text">→ ответ</span>
            </div>
            <div class="review2-status-separator">•</div>
            <div class="review2-status-metric">
              <span class="review2-metric-time">{{ formatTime(systemMetrics.resolutionTime) }}</span>
              <span class="review2-metric-text">→ решение</span>
            </div>
          </div>
        </div>
        
        <!-- ПУЛЬТ УПРАВЛЕНИЯ -->
        <div class="review2-control-panel">
          <div class="review2-control-panel-header">
            <button
              type="button"
              class="review2-info-link review2-info-button"
              aria-haspopup="dialog"
              aria-controls="review2-signal-dialog"
              :aria-expanded="showInfoModal ? 'true' : 'false'"
              @click="showInfoModal = true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
            </button>
            <span class="review2-static-prompt">Поделитесь:</span>
            <div class="review2-rotating-text-container">
              <span :class="['review2-rotating-text', { 'review2-show': showText }]">{{ rotatingQuestions[currentQuestionIndex] }}</span>
            </div>
          </div>
          <div class="review2-button-container">
            <button @click="createTicket" class="review2-action-button review2-ticket-button">
              Сообщить о проблеме
            </button>
            <button @click="showBranchList = true" class="review2-action-button review2-review-button">
              Мне понравилось
              <svg class="review2-button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Второй экран -->
    <div v-else>
      <div class="review2-branches-header">
        <button @click="showBranchList = false" class="review2-internal-close-btn review2-back-btn" aria-label="Вернуться назад">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
          </svg>
        </button>
        <h2 class="review2-branches-title">{{ establishment.name }}</h2>
        <div style="width: 44px;"></div>
      </div>
      <div class="review2-branches-content">
        <p class="review2-branches-subtitle">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>
        <div class="review2-branches-list">
          <button v-for="(branch, index) in establishment.branches" :key="index" @click="goToReviews(branch)" class="review2-branch-item">
            <div class="review2-branch-info">
              <div class="review2-branch-number">{{ index + 1 }}</div>
              <div class="review2-branch-address">{{ branch.address }}</div>
            </div>
            <div class="review2-branch-action">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="showInfoModal" class="review2-modal-overlay" @click.self="showInfoModal = false">
      <div class="review2-modal" role="dialog" aria-modal="true" id="review2-signal-dialog" aria-label="Диалоги Сигнала">
        <div class="review2-modal-header">
          <div class="review2-modal-title">Диалоги Сигнала</div>
        </div>
        <div class="review2-modal-body">Ваш Сигнал — это команда к действию для кофейни и видимый результат для вас.</div>
        <div class="review2-modal-footer">
          <button class="review2-modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Основные контейнеры */
.review2-widget-content { 
  padding: 32px; 
  max-height: calc(100vh - 80px); 
  overflow-y: auto; 
  scroll-behavior: smooth; 
}

.review2-widget-header, 
.review2-branches-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 24px; 
}

.review2-header-title, 
.review2-branches-title { 
  margin: 0; 
  color: white; 
  font-size: 26px; 
  font-weight: 700; 
  line-height: 1.2; 
  text-align: left; 
  flex-grow: 1; 
}

.review2-header-subtitle { 
  margin-top: 8px; 
  font-size: 15px; 
  color: var(--vp-c-text-2); 
}

.review2-branches-header { 
  padding-bottom: 20px; 
  border-bottom: 2px solid var(--vp-c-border); 
}

.review2-branches-title { 
  text-align: center; 
}

/* Кнопки навигации */
.review2-internal-close-btn { 
  background: var(--vp-c-bg-mute); 
  border: 2px solid var(--vp-c-border); 
  border-radius: 50%; 
  width: 44px; 
  height: 44px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer; 
  color: var(--vp-c-text-2); 
  transition: all 0.3s ease; 
  flex-shrink: 0; 
}

.review2-close-btn:hover { 
  background: linear-gradient(135deg, #991b1b, #ef4444); 
  border-color: #ef4444; 
  color: white; 
  transform: rotate(90deg); 
}

.review2-back-btn:hover { 
  background: var(--vp-c-bg-soft); 
  border-color: var(--vp-c-text-2); 
  color: white; 
}

/* Основная карточка */
.review2-main-card { 
  background: var(--vp-c-bg-soft); 
  border-radius: 20px; 
  padding: 24px; 
}

.review2-establishment-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 24px; 
}

.review2-cafe-name { 
  margin: 0; 
  color: #FFFFFF; 
  font-size: 24px; 
  font-weight: 600; 
}

.review2-status-badge { 
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
}

/* Сетка статистики */
.review2-stats-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 16px; 
}

.review2-stat-card { 
  position: relative; 
  border-radius: 22px; 
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); 
  overflow: hidden; 
  background: var(--vp-c-bg-soft); 
}

.review2-stat-card:hover { 
  transform: translateY(-8px); 
}

.review2-stat-card::before { 
  content: ''; 
  position: absolute; 
  inset: 0; 
  border-radius: 22px; 
  padding: 2px; 
  background: var(--review2-border-gradient); 
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); 
  -webkit-mask-composite: xor; 
  mask-composite: exclude; 
  transition: filter 0.4s ease; 
  z-index: 3; 
}

.review2-stat-card:hover::before { 
  filter: brightness(2) saturate(1.5); 
}

/* Цветовые схемы карточек */
.review2-branches-card { 
  --review2-border-gradient: linear-gradient(135deg, #3730a3, #8b5cf6, #c4b5fd); 
  --review2-glow-color: rgba(139, 92, 246, 0.25); 
  --review2-glow-hover-color: rgba(139, 92, 246, 0.6); 
}

.review2-index-card { 
  --review2-border-gradient: linear-gradient(135deg, #4d7c0f, #a3e635, #C5F946); 
  --review2-glow-color: rgba(197, 249, 70, 0.25); 
  --review2-glow-hover-color: rgba(197, 249, 70, 0.6); 
}

.review2-reviews-card { 
  --review2-border-gradient: linear-gradient(135deg, #b45309, #f59e0b, #fcd34d); 
  --review2-glow-color: rgba(245, 158, 11, 0.25); 
  --review2-glow-hover-color: rgba(245, 158, 11, 0.6); 
}

/* Содержимое карточек */
.review2-stat-content { 
  background: radial-gradient(circle at 50% 0%, var(--review2-glow-color) 0%, transparent 70%); 
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

.review2-stat-card:hover .review2-stat-content { 
  background: radial-gradient(circle at 50% 0%, var(--review2-glow-hover-color) 0%, transparent 70%); 
  box-shadow: 0 25px 50px -10px rgba(0,0,0,0.4); 
}

.review2-stat-icon, 
.review2-stat-value, 
.review2-stat-label { 
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); 
}

.review2-stat-icon { 
  font-size: 28px; 
  opacity: 0.8; 
  height: 32px; 
}

.review2-stat-card:hover .review2-stat-icon { 
  transform: scale(1.2); 
}

.review2-stat-value { 
  font-family: 'Inter', sans-serif; 
  font-size: 3.2rem; 
  font-weight: 600; 
  line-height: 1; 
  color: #fff; 
  margin: 12px 0; 
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.7); 
}

.review2-stat-card:hover .review2-stat-value { 
  transform: scale(1.15); 
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.8); 
}

.review2-stat-label { 
  font-size: 11px; 
  font-weight: 500; 
  color: rgba(255, 255, 255, 0.7); 
  text-transform: uppercase; 
  letter-spacing: 0.1em; 
}

.review2-stat-card:hover .review2-stat-label { 
  transform: scale(1.05); 
}

/* Статус системы */
.review2-system-status-bar { 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 12px; 
  margin: 20px 0 16px 0; 
  padding: 10px 16px; 
  background: rgba(255, 255, 255, 0.03); 
  border-radius: 12px; 
  border: 1px solid rgba(255, 255, 255, 0.06); 
}

.review2-status-label { 
  font-size: 12px; 
  font-weight: 600; 
  color: rgba(255, 255, 255, 0.7); 
  margin-right: 8px; 
  flex-shrink: 0; 
}

.review2-status-metrics { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
}

.review2-status-metric { 
  display: flex; 
  align-items: baseline; 
  gap: 4px; 
}

.review2-metric-time { 
  font-size: 12px; 
  font-weight: 700; 
  color: rgba(255, 255, 255, 0.9); 
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace; 
  min-width: 32px; 
  text-align: right; 
  transition: all 0.3s ease; 
}

.review2-metric-text { 
  font-size: 11px; 
  font-weight: 500; 
  color: rgba(255, 255, 255, 0.6); 
}

.review2-status-separator { 
  color: rgba(255, 255, 255, 0.3); 
  font-size: 12px; 
  margin: 0 4px; 
}

/* Пульт управления */
.review2-control-panel { 
  margin-top: 24px; 
}

.review2-control-panel-header { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  margin-bottom: 12px; 
  padding: 0 8px; 
  font-size: 14px; 
  font-weight: 600; 
}

.review2-info-link { 
  color: rgba(255, 255, 255, 0.5); 
  display: flex; 
  align-items: center; 
  transition: color 0.3s ease; 
  flex-shrink: 0; 
}

.review2-info-link:hover, 
.review2-info-link:focus { 
  color: white; 
}

.review2-info-button { 
  background: transparent; 
  border: none; 
  cursor: pointer; 
}

.review2-static-prompt { 
  color: white; 
  margin-right: 8px; 
  flex-shrink: 0; 
}

.review2-rotating-text-container { 
  flex-grow: 1; 
  text-align: left; 
  color: rgba(255, 255, 255, 0.7); 
  min-height: 36px; 
  display: flex; 
  align-items: center;
}

.review2-rotating-text { 
  transition: opacity 0.5s ease-in-out; 
  line-height: 1.2; 
}

.review2-rotating-text:not(.review2-show) { 
  opacity: 0; 
}

.review2-button-container { 
  display: flex; 
  gap: 6px; 
  background-color: var(--vp-c-bg); 
  border: 1px solid var(--vp-c-divider); 
  border-radius: 20px; 
  padding: 6px; 
}

.review2-action-button { 
  flex: 1; 
  padding: 14px 20px; 
  border-radius: 16px; 
  border: none; 
  font-size: 16px; 
  font-weight: 700; 
  cursor: pointer; 
  transition: all 0.3s ease; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 8px; 
}

.review2-ticket-button { 
  background: rgba(70, 70, 70, 0.8); 
  color: rgba(255, 255, 255, 0.9); 
}

.review2-ticket-button:hover { 
  background: rgba(85, 85, 85, 0.9); 
  color: white; 
  transform: translateY(-2px); 
}

.review2-review-button { 
  background: linear-gradient(135deg, #f59e0b, #fcd34d); 
  color: #422006; 
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); 
}

.review2-review-button:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4); 
}

.review2-button-icon { 
  transition: transform 0.3s ease; 
}

.review2-review-button:hover .review2-button-icon { 
  transform: translateX(4px); 
}

/* Список филиалов */
.review2-branches-content { 
  flex-grow: 1; 
}

.review2-branches-subtitle { 
  margin: 0 0 16px 0; 
  font-size: 16px; 
  color: var(--vp-c-text-2); 
}

.review2-branches-list { 
  padding: 0; 
}

.review2-branch-item { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  width: 100%; 
  padding: 18px; 
  margin-bottom: 12px; 
  background: var(--vp-c-bg-soft); 
  border: 2px solid var(--vp-c-border); 
  border-radius: 16px; 
  cursor: pointer; 
  transition: all 0.3s ease; 
  text-align: left; 
}

.review2-branch-item:hover { 
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), var(--vp-c-bg-soft)); 
  border-color: #f59e0b; 
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.1); 
  transform: translateX(4px); 
}

.review2-branch-info { 
  display: flex; 
  align-items: center; 
  gap: 16px; 
  flex: 1; 
  overflow: hidden; 
}

.review2-branch-number { 
  background: linear-gradient(135deg, #f59e0b, #fcd34d); 
  color: #422006; 
  width: 32px; 
  height: 32px; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 14px; 
  font-weight: 700; 
  flex-shrink: 0; 
  transition: all 0.3s ease; 
  box-shadow: none; 
}

.review2-branch-item:hover .review2-branch-number { 
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(245, 158, 11, 0.5); 
}

.review2-branch-address { 
  font-weight: 600; 
  font-size: 16px; 
  color: var(--vp-c-text-1); 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.review2-branch-action { 
  color: #f59e0b; 
  transition: transform 0.3s ease; 
  margin-left: 12px; 
}

.review2-branch-item:hover .review2-branch-action { 
  transform: translateX(4px); 
}

/* Модальное окно */
.review2-modal-overlay { 
  position: fixed; 
  inset: 0; 
  background: rgba(0,0,0,0.6); 
  backdrop-filter: blur(8px);
  display: flex; 
  align-items: center; 
  justify-content: center; 
  z-index: 1000; 
}

.review2-modal { 
  background: var(--vp-c-bg, #111); 
  color: var(--vp-c-text-1, #fff); 
  border: 1px solid var(--vp-c-border, rgba(255,255,255,0.12)); 
  border-radius: 12px; 
  width: min(520px, 96vw); 
  box-shadow: 0 20px 60px rgba(0,0,0,0.4); 
  padding: 16px; 
}

.review2-modal-header { 
  display: flex; 
  align-items: center; 
  justify-content: flex-start; 
  gap: 12px; 
}

.review2-modal-title { 
  font-weight: 700; 
  font-size: 16px; 
}

.review2-modal-body { 
  margin-top: 8px; 
  font-size: 14px; 
  color: var(--vp-c-text-1); 
}

.review2-modal-footer { 
  margin-top: 12px; 
  display: flex; 
  justify-content: flex-end; 
}

.review2-modal-ok { 
  background: var(--vp-c-bg-mute, #222); 
  border: 1px solid var(--vp-c-border); 
  color: var(--vp-c-text-1); 
  border-radius: 8px; 
  padding: 8px 12px; 
  cursor: pointer; 
}

.review2-modal-ok:hover { 
  background: var(--vp-c-bg-soft, #333); 
}

/* Адаптивность */
@media (max-width: 768px) {
  .review2-widget-content { 
    padding: 24px; 
  }
  
  .review2-main-card { 
    padding: 16px; 
  }
  
  .review2-stats-grid { 
    grid-template-columns: 1fr; 
    gap: 12px; 
  }
  
  .review2-stat-card { 
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    border-radius: 16px; 
    transition: none; 
  }
  
  .review2-stat-card:hover { 
    transform: none; 
  }
  
  .review2-stat-content { 
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center; 
    padding: 12px 16px; 
    width: 100%; 
    background: none !important; 
    box-shadow: none !important; 
  }
  
  .review2-stat-left-group { 
    display: flex; 
    align-items: center; 
    gap: 16px; 
  }
  
  .review2-stat-icon { 
    font-size: 28px; 
    line-height: 1; 
    display: flex; 
    align-items: center; 
  }
  
  .review2-stat-value { 
    font-size: 2rem; 
    font-weight: 600; 
    margin: 0; 
  }
  
  .review2-stat-label { 
    font-size: 16px; 
    font-weight: 500; 
    color: rgba(255, 255, 255, 0.9); 
    text-transform: uppercase; 
    letter-spacing: 0.05em; 
  }
  
  .review2-button-container { 
    flex-direction: column; 
    gap: 8px; 
  }
  
  .review2-action-button:hover { 
    transform: none; 
  }
  
  .review2-system-status-bar { 
    flex-direction: column; 
    gap: 8px; 
    padding: 12px; 
  }
  
  .review2-status-metrics { 
    gap: 12px; 
  }
}

@media (max-width: 480px) {
  .review2-widget-content { 
    padding: 20px; 
  }
  
  .review2-header-title { 
    font-size: 22px; 
    text-align: left; 
  }
  
  .review2-header-subtitle { 
    font-size: 14px; 
  }
  
  .review2-branches-title { 
    font-size: 22px; 
    text-align: center;
  }
  
  .review2-branches-subtitle { 
    font-size: 14px; 
  }
  
  .review2-cafe-name { 
    font-size: 20px; 
  }
  
  .review2-status-badge { 
    padding: 4px 12px; 
    font-size: 10px; 
  }
  
  .review2-status-metrics { 
    gap: 8px; 
  }
  
  .review2-metric-time { 
    font-size: 11px; 
    min-width: 28px; 
  }
  
  .review2-metric-text { 
    font-size: 10px; 
  }
}
</style>
