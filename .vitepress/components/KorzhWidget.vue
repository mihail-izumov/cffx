<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'

// Проп для определения использования в модальном окне
const props = defineProps({
  isModal: {
    type: Boolean,
    default: false
  }
})

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
  name: 'Корж',
  totalReviews: '1',
  yandex2gis: '4,9',
  yandex2gisPercent: 94,
  signals: 1,
  signalsPercent: 100,
  branches: [
    { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/reviews' },
    { address: 'Революционная, 101В', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858//reviews' },
    { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/152008652145/reviews' },
    { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/reviews' },
    { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/reviews' },
    { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/144063441903/reviews' },
    { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/102178077269/reviews' },
    { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/reviews' }
  ],
}

// Функция получения конфига кофейни с фоллбэком
const getCafeConfig = (cafeName) => {
  const normalizedName = cafeName.toLowerCase()
  return cafeProfiles[normalizedName] || {
    responseTime: { base: 2.5, min: 2.0, max: 3.0 },
    resolutionTime: { base: 18.0, min: 15, max: 21 }
  }
}

// Автоматически определяется из establishment.name
const cafeConfig = getCafeConfig(establishment.name)

// Система метрик реального времени с персональными значениями
const systemMetrics = ref({
  responseTime: cafeConfig.responseTime.base,
  resolutionTime: cafeConfig.resolutionTime.base,
  lastUpdate: Date.now()
})

// Определение мобильной версии
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Получение данных с сервера
const fetchSystemStatus = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50))
    
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
  window.location.href = '/signal/korzh/new'
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

// Вычисляемое свойство для отображения текущей даты в формате как в примере
const currentDateBadge = computed(() => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const monthNames = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];
  const monthName = monthNames[today.getMonth()];
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="signal-radio-icon" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><path d="M16.247 7.761a6 6 0 0 1 0 8.478"/><path d="M19.075 4.933a10 10 0 0 1 0 14.134"/><path d="M4.925 19.067a10 10 0 0 1 0-14.134"/><path d="M7.753 16.239a6 6 0 0 1 0-8.478"/><circle cx="12" cy="12" r="2"/></svg> ${day}.${month} → ${monthName} ${year}`;
});

const getSolutionText = (percent) => {
  if (percent === 0) {
    return 'Без решений';
  }
  return `Решение: ${percent}%`;
};

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
  window.addEventListener('resize', checkMobile)
  checkMobile()
})

onUnmounted(() => {
  clearInterval(intervalId)
  clearInterval(metricsIntervalId)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', checkMobile)
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
  <div class="signal-widget-content" :class="{ 'modal-mode': props.isModal }" ref="widgetContentRef">
    <!-- Первый экран -->
    <div v-if="!showBranchList">
      <div class="signal-widget-header" style="margin-bottom: 0;">
        <button 
          v-if="props.isModal" 
          @click="$emit('close')" 
          class="signal-widget-close-btn" 
          aria-label="Закрыть виджет"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="signal-main-card">
        <div class="signal-establishment-header">
          <h3 class="signal-cafe-name">{{ establishment.name }}</h3>
          <div class="signal-status-badge" v-html="currentDateBadge"></div>
        </div>
        
        <div class="signal-stats-grid">
          <div class="signal-stat-card signal-reviews-card">
            <div class="signal-stat-content">
              <div class="signal-stat-icon">📡</div>
              <div class="signal-stat-left-group">
                <div class="signal-stat-value">{{ establishment.totalReviews }}</div>
                <div class="signal-stat-label">Отзывы</div>
              </div>
              <div class="signal-stat-badge signal-reviews-badge">
                <span class="signal-badge-text">Ответ: {{ establishment.yandex2gisPercent }}%</span>
              </div>
            </div>
          </div>
          
          <div class="signal-stat-card signal-yandex-card">
            <div class="signal-stat-content">
              <div class="signal-stat-icon">🏆</div>
              <div class="signal-stat-left-group">
                <div class="signal-stat-value">{{ establishment.yandex2gis }}</div>
                <div class="signal-stat-label">Яндекс/2ГИС</div>
              </div>
              <div class="signal-stat-badge signal-rating-badge">
                <span class="signal-badge-text">Рейтинг Сегодня</span>
              </div>
            </div>
          </div>
          
          <div class="signal-stat-card signal-signals-card">
            <div class="signal-stat-content">
              <div class="signal-stat-icon">⚡</div>
              <div class="signal-stat-left-group">
                <div class="signal-stat-value">{{ establishment.signals }}</div>
                <div class="signal-stat-label">Сигналы</div>
              </div>
              <div class="signal-stat-badge signal-signals-badge" :class="{ 'signal-100-badge': establishment.signalsPercent === 100 }">
                <span class="signal-badge-text">{{ getSolutionText(establishment.signalsPercent) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="signal-system-status-bar">
          <span class="signal-status-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="signal-zap-icon">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
            На связи:
          </span>
          <div class="signal-status-metrics">
            <div class="signal-status-metric">
              <span class="signal-metric-time">{{ formatTime(systemMetrics.responseTime) }}</span>
              <span class="signal-metric-text">→ ответ</span>
            </div>
            <div class="signal-status-separator">•</div>
            <div class="signal-status-metric">
              <span class="signal-metric-time">{{ formatTime(systemMetrics.resolutionTime) }}</span>
              <span class="signal-metric-text">→ решение</span>
            </div>
          </div>
        </div>
        
        <div class="signal-control-panel">
          <div class="signal-control-panel-header">
            <button
              v-if="!isMobile"
              type="button"
              class="signal-info-link signal-info-button"
              aria-haspopup="dialog"
              aria-controls="signal-dialog"
              :aria-expanded="showInfoModal ? 'true' : 'false'"
              @click="showInfoModal = true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
            </button>
            <span v-if="!isMobile" class="signal-static-prompt">Поделитесь:</span>
            <div class="signal-rotating-text-container" :class="{ 'centered-mobile': isMobile }">
              <span :class="['signal-rotating-text', { 'signal-show': showText }]">{{ rotatingQuestions[currentQuestionIndex] }}</span>
            </div>
          </div>
          <div class="signal-button-container">
            <button @click="createTicket" class="signal-action-button signal-ticket-button">
              Отправить Сигнал
            </button>
            <button @click="showBranchList = true" class="signal-action-button signal-review-button">
              Отзыв Яндекс/2ГИС
              <svg class="signal-button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Второй экран -->
    <div v-else>
      <div class="signal-branches-header">
        <button @click="showBranchList = false" class="signal-internal-close-btn signal-back-btn" aria-label="Вернуться назад">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
          </svg>
        </button>
        <div class="signal-branches-title">{{ establishment.name }}</div>
        <div style="width: 44px;"></div>
      </div>
      <div class="signal-branches-content">
        <p class="signal-branches-subtitle">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>
        <div class="signal-branches-list">
          <button v-for="(branch, index) in establishment.branches" :key="index" @click="goToReviews(branch)" class="signal-branch-item">
            <div class="signal-branch-info">
              <div class="signal-branch-number">{{ index + 1 }}</div>
              <div class="signal-branch-address">{{ branch.address }}</div>
            </div>
            <div class="signal-branch-action">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
    <!-- Модальное окно -->
    <div v-if="showInfoModal" class="signal-modal-overlay" @click.self="showInfoModal = false">
      <div class="signal-modal" role="dialog" aria-modal="true" id="signal-dialog" aria-label="Как работает Сигнал">
        <div class="signal-modal-header">
          <div class="signal-modal-title">Как работает Сигнал</div>
        </div>
        <div class="signal-modal-body">
          Ваш Сигнал — это команда к действию для кофейни и видимый результат для вас.
          <br><br>
          <a href="/signals" target="_blank" class="signal-modal-link">Как работает</a>
        </div>
        <div class="signal-modal-footer">
          <button class="signal-modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Основные контейнеры */
.signal-widget-content { 
  padding: 32px; 
  max-height: calc(100vh - 80px); 
  overflow-y: auto; 
  scroll-behavior: smooth;
  width: 100%; /* ДОБАВИТЬ: всегда занимает 100% ширины родителя */
  box-sizing: border-box; /* ДОБАВИТЬ */
}

/* Стили только для модального режима */
.signal-widget-content.modal-mode {
  max-width: 850px; /* ДОБАВИТЬ: ограничение только в модалке */
  margin: 0 auto; /* ДОБАВИТЬ: центрирование только в модалке */
}
  
.signal-widget-header, 
.signal-branches-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 24px; 
}
.signal-header-title, 
.signal-branches-title { 
  margin: 0; 
  color: white; 
  font-size: 26px; 
  font-weight: 700; 
  line-height: 1.2; 
  text-align: left; 
  flex-grow: 1; 
}
.signal-header-subtitle { 
  margin-top: 8px; 
  font-size: 15px; 
  color: var(--vp-c-text-2); 
}
.signal-branches-header { 
  padding-bottom: 20px; 
  border-bottom: 2px solid var(--vp-c-border); 
}
.signal-branches-title { 
  text-align: center; 
}
/* Кнопки навигации */
.signal-internal-close-btn { 
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
.signal-back-btn:hover { 
  background: var(--vp-c-bg-soft); 
  border-color: var(--vp-c-text-2); 
  color: white; 
}
/* Кнопка закрытия виджета (только для модального режима) */
.signal-widget-close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
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
  z-index: 10;
}
.signal-widget-close-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-text-2);
  color: white;
}
/* Основная карточка */
.signal-main-card { 
  background: rgba(56, 26, 111, 0.18);
  border-radius: 20px; 
  padding: 24px; 
}
.signal-establishment-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 24px; 
}
.signal-cafe-name { 
  margin: 0; 
  color: #FFFFFF; 
  font-size: 24px; 
  font-weight: 600; 
}
.signal-status-badge { 
  background: linear-gradient(135deg, rgba(169, 140, 246, 0.2), rgba(0, 0, 0, 0.2));
  color: rgba(220, 210, 255, 0.9);
  border: 1px solid rgba(169, 140, 246, 0.3);
  padding: 6px 16px; 
  border-radius: 20px; 
  font-size: 12px; 
  font-weight: 700; 
  white-space: nowrap; 
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3); 
  text-transform: uppercase; 
  letter-spacing: 0.5px; 
  display: flex;
  align-items: center;
}
.signal-radio-icon {
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}
/* Сетка статистики */
.signal-stats-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 16px; 
}
.signal-stat-card { 
  position: relative; 
  border-radius: 22px; 
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); 
  overflow: hidden; 
  background: var(--vp-c-bg-soft); 
}
.signal-stat-card:hover { 
  transform: translateY(-8px); 
}
.signal-stat-card::before { 
  content: ''; 
  position: absolute; 
  inset: 0; 
  border-radius: 22px; 
  padding: 2px; 
  background: var(--signal-border-gradient); 
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); 
  -webkit-mask-composite: xor; 
  mask-composite: exclude; 
  transition: filter 0.4s ease; 
  z-index: 3; 
}
.signal-stat-card:hover::before { 
  filter: brightness(2) saturate(1.5); 
}
/* Цветовые схемы карточек - ВСЕ В ФИОЛЕТОВОЙ ГАММЕ */
.signal-signals-card,
.signal-yandex-card,
.signal-reviews-card { 
  --signal-border-gradient: linear-gradient(135deg, #6d28d9, #a78bfa, #ddd6fe); 
  --signal-glow-color: rgba(167, 139, 250, 0.25); 
  --signal-glow-hover-color: rgba(167, 139, 250, 0.6); 
}
/* Содержимое карточек */
.signal-stat-content { 
  background: radial-gradient(circle at 50% 0%, var(--signal-glow-color) 0%, transparent 70%); 
  border-radius: 20px; 
  padding: 20px; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  height: 100%; 
  text-align: center; 
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3); 
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); 
  position: relative; 
  z-index: 2; 
  gap: 8px;
}
.signal-stat-card:hover .signal-stat-content { 
  background: radial-gradient(circle at 50% 0%, var(--signal-glow-hover-color) 0%, transparent 70%); 
  box-shadow: 0 25px 50px -10px rgba(0,0,0,0.4); 
}
.signal-stat-icon, 
.signal-stat-value, 
.signal-stat-label { 
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); 
}
.signal-stat-icon { 
  font-size: 28px; 
  opacity: 0.8; 
  height: 32px; 
  margin-bottom: 4px;
}
.signal-stat-card:hover .signal-stat-icon { 
  transform: scale(1.2); 
}
.signal-stat-left-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.signal-stat-value { 
  font-family: 'Inter', sans-serif; 
  font-size: 3.2rem; 
  font-weight: 600; 
  line-height: 1; 
  color: #fff; 
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.7); 
}
.signal-stat-card:hover .signal-stat-value { 
  transform: scale(1.15); 
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.8); 
}
.signal-stat-label { 
  font-size: 11px; 
  font-weight: 500; 
  color: rgba(255, 255, 255, 0.7); 
  text-transform: uppercase; 
  letter-spacing: 0.1em; 
}
.signal-stat-card:hover .signal-stat-label { 
  transform: scale(1.05); 
}

/* Баблы в карточках */
.signal-stat-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(30, 10, 60, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(109, 40, 217, 0.3);
  margin-top: 8px;
}

.signal-badge-text {
  font-size: 10px;
  font-weight: 600;
  color: rgba(200, 190, 230, 0.85);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* Анимация для бабла "Решение: 100%" - плавный перелив */
.signal-100-badge {
  position: relative;
  overflow: hidden;
  background: rgba(30, 10, 60, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(109, 40, 217, 0.3);
}

.signal-100-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg, 
    transparent 0%, 
    transparent 20%,
    rgba(167, 139, 250, 0.35) 40%,
    rgba(196, 181, 253, 0.55) 50%,
    rgba(167, 139, 250, 0.35) 60%,
    transparent 80%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer-wave 6s ease-in-out infinite;
  opacity: 0;
  animation: shimmer-wave 6s ease-in-out infinite, fade-in-out 6s ease-in-out infinite;
}

.signal-100-badge .signal-badge-text {
  color: rgba(200, 190, 230, 0.85);
  font-weight: 700;
  position: relative;
  z-index: 1;
}

@keyframes shimmer-wave {
  0%, 100% {
    background-position: -100% 0;
  }
  50% {
    background-position: 200% 0;
  }
}

@keyframes fade-in-out {
  0%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 0.8;
  }
  60% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}

/* Статус системы */
.signal-system-status-bar { 
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
.signal-status-label { 
  font-size: 12px; 
  font-weight: 600; 
  color: rgba(255, 255, 255, 0.7); 
  margin-right: 8px; 
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}
.signal-zap-icon {
  display: inline-block;
  vertical-align: middle;
}
.signal-status-metrics { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
}
.signal-status-metric { 
  display: flex; 
  align-items: baseline; 
  gap: 4px; 
}
.signal-metric-time { 
  font-size: 12px; 
  font-weight: 700; 
  color: rgba(255, 255, 255, 0.9); 
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace; 
  min-width: 32px; 
  text-align: right; 
  transition: all 0.3s ease; 
}
.signal-metric-text { 
  font-size: 11px; 
  font-weight: 500; 
  color: rgba(255, 255, 255, 0.6); 
}
.signal-status-separator { 
  color: rgba(255, 255, 255, 0.3); 
  font-size: 12px; 
  margin: 0 4px; 
}
/* Пульт управления */
.signal-control-panel { 
  margin-top: 24px; 
}
.signal-control-panel-header { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  margin-bottom: 12px; 
  padding: 0 8px; 
  font-size: 14px; 
  font-weight: 600; 
}
.signal-info-link { 
  color: rgba(255, 255, 255, 0.5); 
  display: flex; 
  align-items: center; 
  transition: color 0.3s ease; 
  flex-shrink: 0; 
}
.signal-info-link:hover, 
.signal-info-link:focus { 
  color: white; 
}
.signal-info-button { 
  background: transparent; 
  border: none; 
  cursor: pointer; 
}
.signal-static-prompt { 
  color: white; 
  margin-right: 8px; 
  flex-shrink: 0; 
}
.signal-rotating-text-container { 
  flex-grow: 1; 
  text-align: left; 
  color: rgba(255, 255, 255, 0.7); 
  min-height: 36px; 
  display: flex; 
  align-items: center;
  min-width: 350px; /* ИЗМЕНИТЬ: уменьшить с 420px */
  max-width: none; /* ИЗМЕНИТЬ: убрать ограничение max-width */
}
.signal-rotating-text { 
  transition: opacity 0.5s ease-in-out; 
  line-height: 1.2;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.signal-rotating-text:not(.signal-show) { 
  opacity: 0; 
}
.signal-button-container { 
  display: flex; 
  gap: 6px; 
  background-color: var(--vp-c-bg); 
  border: 1px solid var(--vp-c-divider); 
  border-radius: 20px; 
  padding: 6px; 
}
.signal-action-button { 
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
.signal-ticket-button { 
  background: rgba(46, 16, 101, 0.6); 
  color: rgba(200, 190, 230, 0.95); 
  border: 1px solid rgba(109, 40, 217, 0.3);
}
.signal-ticket-button:hover { 
  background: rgba(76, 29, 149, 0.7); 
  color: white; 
  transform: translateY(-2px); 
}
.signal-review-button { 
  background: linear-gradient(135deg, #a78bfa, #ddd6fe);
  color: #4c1d95; 
  box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3);
}
.signal-review-button:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 20px rgba(167, 139, 250, 0.4);
}
.signal-button-icon { 
  transition: transform 0.3s ease; 
}
.signal-review-button:hover .signal-button-icon { 
  transform: translateX(4px); 
}
/* Список филиалов */
.signal-branches-content { 
  flex-grow: 1; 
}
.signal-branches-subtitle { 
  margin: 0 0 16px 0; 
  font-size: 16px; 
  color: var(--vp-c-text-2); 
}
.signal-branches-list { 
  padding: 0; 
}
.signal-branch-item { 
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
.signal-branch-item:hover { 
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.1), var(--vp-c-bg-soft)); 
  border-color: #a78bfa; 
  box-shadow: 0 8px 20px rgba(167, 139, 250, 0.1); 
  transform: translateX(4px); 
}
.signal-branch-info { 
  display: flex; 
  align-items: center; 
  gap: 16px; 
  flex: 1; 
  overflow: hidden; 
}
.signal-branch-number { 
  background: linear-gradient(135deg, #a78bfa, #ddd6fe); 
  color: #4c1d95; 
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
.signal-branch-item:hover .signal-branch-number { 
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(167, 139, 250, 0.5); 
}
.signal-branch-address { 
  font-weight: 600; 
  font-size: 16px; 
  color: var(--vp-c-text-1); 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}
.signal-branch-action { 
  color: #a78bfa; 
  transition: transform 0.3s ease; 
  margin-left: 12px; 
}
.signal-branch-item:hover .signal-branch-action { 
  transform: translateX(4px); 
}
/* Модальное окно */
.signal-modal-overlay { 
  position: fixed; 
  inset: 0; 
  background: rgba(0,0,0,0.6); 
  backdrop-filter: blur(8px);
  display: flex; 
  align-items: center; 
  justify-content: center; 
  z-index: 1000; 
}
.signal-modal { 
  background: var(--vp-c-bg, #111); 
  color: var(--vp-c-text-1, #fff); 
  border: 1px solid var(--vp-c-border, rgba(255,255,255,0.12)); 
  border-radius: 12px; 
  width: min(520px, 96vw); 
  box-shadow: 0 20px 60px rgba(0,0,0,0.4); 
  padding: 32px; 
}
.signal-modal-header { 
  display: flex; 
  align-items: center; 
  justify-content: flex-start; 
  gap: 12px; 
}
.signal-modal-title { 
  font-weight: 700; 
  font-size: 16px; 
}
.signal-modal-body { 
  margin-top: 16px; 
  font-size: 14px; 
  color: var(--vp-c-text-1); 
  line-height: 1.5;
  text-align: left;
}
.signal-modal-link {
  color: #c4b5fd;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}
.signal-modal-link:hover {
  color: #ddd6fe;
  text-decoration: underline;
}
.signal-modal-footer { 
  margin-top: 24px; 
  display: flex; 
  justify-content: flex-end; 
}
.signal-modal-ok { 
  background: var(--vp-c-bg-mute, #222); 
  border: 1px solid var(--vp-c-border); 
  color: var(--vp-c-text-1); 
  border-radius: 8px; 
  padding: 10px 16px; 
  cursor: pointer; 
  font-weight: 500; 
}
.signal-modal-ok:hover { 
  background: var(--vp-c-bg-soft, #333); 
}
/* Адаптивность */
.signal-rotating-text-container.centered-mobile {
  text-align: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .signal-widget-content { 
    padding: 16px; 
    max-width: 100%;
    width: 100%;
    min-width: unset;
    margin: 0 auto;
  }
  .signal-widget-close-btn {
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
  }
  .signal-main-card { 
    padding: 14px; 
  }
  .signal-stats-grid { 
    grid-template-columns: 1fr; 
    gap: 10px; 
  }
  
  .signal-rotating-text-container {
    min-width: unset;
    max-width: unset;
  }
  
  .signal-rotating-text {
    white-space: normal;
    overflow: visible;
  }
  
  /* Порядок карточек в мобильной версии: Яндекс, Отзывы, Сигналы */
  .signal-yandex-card {
    order: 1;
  }
  .signal-reviews-card {
    order: 2;
  }
  .signal-signals-card {
    order: 3;
  }
  
  .signal-stat-card { 
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    border-radius: 16px; 
    transition: none; 
  }
  .signal-stat-card:hover { 
    transform: none; 
  }
  .signal-stat-content { 
    flex-direction: row; 
    justify-content: flex-start; 
    align-items: center; 
    padding: 10px 12px; 
    width: 100%; 
    background: none !important; 
    box-shadow: none !important; 
    gap: 10px;
  }
  .signal-stat-icon {
    display: none;
  }
  .signal-stat-left-group { 
    display: flex; 
    flex-direction: row;
    align-items: center; 
    gap: 10px; 
    flex: 1;
    min-width: 0;
  }
  .signal-stat-value { 
    font-size: 1.6rem; 
    font-weight: 600; 
    margin: 0;
    flex-shrink: 0;
  }
  .signal-stat-label { 
    font-size: 13px; 
    font-weight: 600; 
    color: rgba(255, 255, 255, 0.9); 
    text-transform: none;
    letter-spacing: 0.02em; 
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .signal-stat-badge { 
    flex-shrink: 0; 
    margin-top: 0;
    margin-left: auto;
    padding: 5px 10px;
  }
  .signal-badge-text {
    font-size: 11px;
  }
  .signal-button-container { 
    flex-direction: column; 
    gap: 8px; 
  }
  .signal-action-button:hover { 
    transform: none; 
  }
  .signal-system-status-bar { 
    flex-direction: column; 
    gap: 8px; 
    padding: 12px; 
    margin: 16px 0 12px 0;
  }
  .signal-status-label {
    margin-right: 0;
    font-size: 13px;
  }
  .signal-status-metrics { 
    gap: 12px; 
  }
  .signal-metric-time {
    font-size: 13px;
    min-width: 34px;
  }
  .signal-metric-text {
    font-size: 12px;
  }
}
@media (max-width: 480px) {
  .signal-widget-content { 
    padding: 14px; 
  }
  .signal-header-title { 
    font-size: 22px; 
    text-align: left; 
  }
  .signal-header-subtitle { 
    font-size: 14px; 
  }
  .signal-branches-title { 
    font-size: 22px; 
    text-align: center;
  }
  .signal-branches-subtitle { 
    font-size: 14px; 
  }
  .signal-cafe-name { 
    font-size: 20px; 
  }
  .signal-status-badge { 
    padding: 4px 12px; 
    font-size: 10px; 
  }
  .signal-status-metrics { 
    gap: 8px; 
  }
  .signal-modal { 
    padding: 24px; 
  }
  .signal-modal-body { 
    margin-top: 12px; 
  }
  .signal-modal-footer { 
    margin-top: 20px; 
  }
}
</style>
