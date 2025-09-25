<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'

const cafeNames = ['Корж', 'Skuratov', 'Surf', 'Mosaic', 'Белотурка', 'Кэрри']

const cafes = {
  'Корж': {
    name: 'Корж',
    totalReviews: '4,520',
    status: 'Лидер 👑',
    index: 98,
    branches: [
      { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/' },
      { address: 'Революционная, 101В, к1', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858/' },
      { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618', yandexUrl: 'https://yandex.ru/maps/51/samara/house/9_ya_proseka_5_ya_malaya_liniya_3b/YUkYdw5hQUAAQFtpfX52dXVgZw==/' },
      { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/' },
      { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/' },
      { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045', yandexUrl: 'https://yandex.ru/maps/51/samara/house/dachnaya_ulitsa_2k2/YUkYdwNhSEcOQFtpfX5xcHpkZQ==/' },
      { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071', yandexUrl: 'https://yandex.ru/maps/51/samara/chain/korz/23062014558/' },
      { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/' }
    ]
  },
  'Skuratov': {
    name: 'Skuratov',
    totalReviews: '3,320',
    status: '',
    index: 87,
    branches: [
      { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/' },
      { address: 'Революционная, 101В, к1', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858/' }
    ]
  },
  'Surf': {
    name: 'Surf',
    totalReviews: '2,011',
    status: '',
    index: 83,
    branches: [
      { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/' },
      { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/' }
    ]
  },
  'Mosaic': {
    name: 'Mosaic',
    totalReviews: '2,410',
    status: '',
    index: 85,
    branches: [
      { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618', yandexUrl: 'https://yandex.ru/maps/51/samara/house/9_ya_proseka_5_ya_malaya_liniya_3b/YUkYdw5hQUAAQFtpfX52dXVgZw==/' },
      { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045', yandexUrl: 'https://yandex.ru/maps/51/samara/house/dachnaya_ulitsa_2k2/YUkYdwNhSEcOQFtpfX5xcHpkZQ==/' }
    ]
  },
  'Белотурка': {
    name: 'Белотурка',
    totalReviews: '2,910',
    status: '',
    index: 88,
    branches: [
      { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/' },
      { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071', yandexUrl: 'https://yandex.ru/maps/51/samara/chain/korz/23062014558/' }
    ]
  },
  'Кэрри': {
    name: 'Кэрри',
    totalReviews: '2,110',
    status: '',
    index: 82,
    branches: [
      { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/' }
    ]
  }
};

const cafeProfiles = {
  'корж': { responseTime: { base: 2.3, min: 1.8, max: 2.8 }, resolutionTime: { base: 17.5, min: 15, max: 20 } },
  'skuratov': { responseTime: { base: 1.6, min: 1.2, max: 2.1 }, resolutionTime: { base: 15.2, min: 13, max: 18 } },
  'surf': { responseTime: { base: 3.1, min: 2.5, max: 3.8 }, resolutionTime: { base: 20.3, min: 18, max: 23 } },
  'mosaic': { responseTime: { base: 1.4, min: 1.0, max: 1.9 }, resolutionTime: { base: 14.7, min: 12, max: 17 } },
  'белотурка': { responseTime: { base: 2.7, min: 2.2, max: 3.2 }, resolutionTime: { base: 18.8, min: 16, max: 22 } },
  'кэрри': { responseTime: { base: 2.0, min: 1.5, max: 2.6 }, resolutionTime: { base: 16.4, min: 14, max: 19 } }
};

const getCafeConfig = (cafeName) => {
  const normalized = cafeName?.toLowerCase() || ''
  return cafeProfiles[normalized] || { responseTime: { base: 2, min: 1, max: 3 }, resolutionTime: { base: 15, min: 12, max: 18 } }
}

const selectedCafe = ref(cafeNames[0] || 'Корж')

const establishment = computed(() => cafes[selectedCafe.value] || {
  name: '',
  totalReviews: '',
  status: '',
  index: 0,
  branches: []
})

const cafeConfig = computed(() => getCafeConfig(selectedCafe.value))

const systemMetrics = ref({
  responseTime: cafeConfig.value.responseTime.base,
  resolutionTime: cafeConfig.value.resolutionTime.base,
  lastUpdate: Date.now()
})

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
  }, 1000)
}
const showInfoModal = ref(false)
const onKeydown = (e) => {
  if (e.key === 'Escape') showInfoModal.value = false
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
  <div class="signal2-widget-content" ref="widgetContentRef">
    <div class="signal2-cafe-switchers">
      <button
        v-for="name in cafeNames"
        :key="name"
        class="signal2-switcher"
        :class="{ active: selectedCafe === name }"
        @click="selectedCafe = name"
      >{{ name }}</button>
    </div>

    <div v-if="establishment">
      <div v-if="!showBranchList">
        <div class="signal2-widget-header">
          <div>
            <h2 class="signal2-header-title">Отправьте Сигнал</h2>
            <p class="signal2-header-subtitle">Каждая чашка кофе делает Вашу любимую кофейню еще лучше.</p>
          </div>
          <button @click="$emit('close')" class="signal2-internal-close-btn signal2-close-btn" aria-label="Закрыть окно">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          </button>
        </div>

        <div class="signal2-main-card">
          <div class="signal2-establishment-header">
            <h3 class="signal2-cafe-name">{{ establishment.name }}</h3>
            <div v-if="establishment.status" class="signal2-status-badge">{{ establishment.status }}</div>
          </div>

          <div class="signal2-stats-grid">
            <div class="signal2-stat-card signal2-branches-card">
              <div class="signal2-stat-content">
                <div class="signal2-stat-left-group">
                  <div class="signal2-stat-icon">☕</div>
                  <div class="signal2-stat-value">{{ establishment.branches.length }}</div>
                </div>
                <div class="signal2-stat-label">Кофейни</div>
              </div>
            </div>

            <div class="signal2-stat-card signal2-index-card">
              <div class="signal2-stat-content">
                <div class="signal2-stat-left-group">
                  <div class="signal2-stat-icon">⚡</div>
                  <div class="signal2-stat-value">{{ establishment.index }}</div>
                </div>
                <div class="signal2-stat-label">Индекс роста</div>
              </div>
            </div>

            <div class="signal2-stat-card signal2-reviews-card">
              <div class="signal2-stat-content">
                <div class="signal2-stat-left-group">
                  <div class="signal2-stat-icon">📡</div>
                  <div class="signal2-stat-value">{{ establishment.totalReviews }}</div>
                </div>
                <div class="signal2-stat-label">Отзывы</div>
              </div>
            </div>
          </div>

          <div class="signal2-system-status-bar">
            <span class="signal2-status-label">🟢 На связи:</span>
            <div class="signal2-status-metrics">
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
                type="button"
                class="signal2-info-link signal2-info-button"
                aria-haspopup="dialog"
                aria-controls="signal2-signal-dialog"
                :aria-expanded="showInfoModal ? 'true' : 'false'"
                @click="showInfoModal = true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </button>
              <span class="signal2-static-prompt">Поделитесь:</span>
              <div class="signal2-rotating-text-container">
                <span :class="['signal2-rotating-text', { 'signal2-show': showText }]">{{ rotatingQuestions[currentQuestionIndex] }}</span>
              </div>
            </div>

            <div class="signal2-button-container">
              <button @click="createTicket" class="signal2-action-button signal2-ticket-button">
                Сообщить о проблеме
              </button>
              <button @click="showBranchList = true" class="signal2-action-button signal2-review-button">
                Мне понравилось
                <svg class="signal2-button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="signal2-branches-header">
          <button @click="showBranchList = false" class="signal2-internal-close-btn signal2-back-btn" aria-label="Вернуться назад">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          <h2 class="signal2-branches-title">{{ establishment.name }}</h2>

          <div style="width: 44px;"></div>
        </div>

        <div class="signal2-branches-content">
          <p class="signal2-branches-subtitle">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>

          <div class="signal2-branches-list">
            <button v-for="(branch, index) in establishment.branches" :key="index" @click="goToReviews(branch)" class="signal2-branch-item">
              <div class="signal2-branch-info">
                <div class="signal2-branch-number">{{ index + 1 }}</div>
                <div class="signal2-branch-address">{{ branch.address }}</div>
              </div>

              <div class="signal2-branch-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showInfoModal" class="signal2-modal-overlay" @click.self="showInfoModal = false">
      <div class="signal2-modal" role="dialog" aria-modal="true" id="signal2-signal-dialog" aria-label="Диалоги Сигнала">
        <div class="signal2-modal-header">
          <div class="signal2-modal-title">Диалоги Сигнала</div>
        </div>
        <div class="signal2-modal-body">
          Ваш Сигнал — это команда к действию для кофейни и видимый результат для вас.
          <br /><br />
          <a href="/signals" target="_blank" class="signal2-modal-link">Как работает</a>
        </div>
        <div class="signal2-modal-footer">
          <button class="signal2-modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signal2-widget-content {
  padding: 32px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  scroll-behavior: smooth;
}
.signal2-cafe-switchers {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.signal2-switcher {
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 8px 24px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  border: 1px solid var(--vp-c-border);
  transition: background 0.3s, color 0.3s;
}
.signal2-switcher.active {
  background: #f59e0b;
  color: #222;
}
/* основной CSS префикс signal2- (копия вашего стиля review2 с префиксом) */
.signal2-widget-header,
.signal2-branches-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.signal2-header-title,
.signal2-branches-title {
  margin: 0;
  color: white;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  flex-grow: 1;
}
.signal2-header-subtitle {
  margin-top: 8px;
  font-size: 15px;
  color: var(--vp-c-text-2);
}
.signal2-branches-header {
  padding-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
}
.signal2-branches-title {
  text-align: center;
}
.signal2-internal-close-btn {
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
.signal2-close-btn:hover {
  background: linear-gradient(135deg, #991b1b, #ef4444);
  border-color: #ef4444;
  color: white;
  transform: rotate(90deg);
}
.signal2-back-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-text-2);
  color: white;
}
.signal2-main-card {
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  padding: 24px;
}
.signal2-establishment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.signal2-cafe-name {
  margin: 0;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
}
.signal2-status-badge {
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
.signal2-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
.signal2-stat-card {
  position: relative;
  border-radius: 22px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}
.signal2-stat-card:hover {
  transform: translateY(-8px);
}
.signal2-stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 2px;
  background: var(--signal2-border-gradient);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: filter 0.4s ease;
  z-index: 3;
}
.signal2-stat-card:hover::before {
  filter: brightness(2) saturate(1.5);
}
.signal2-branches-card {
  --signal2-border-gradient: linear-gradient(135deg, #3730a3, #8b5cf6, #c4b5fd);
  --signal2-glow-color: rgba(139, 92, 246, 0.25);
  --signal2-glow-hover-color: rgba(139, 92, 246, 0.6);
}
.signal2-index-card {
  --signal2-border-gradient: linear-gradient(135deg, #4d7c0f, #a3e635, #c5f946);
  --signal2-glow-color: rgba(197, 249, 70, 0.25);
  --signal2-glow-hover-color: rgba(197, 249, 70, 0.6);
}
.signal2-reviews-card {
  --signal2-border-gradient: linear-gradient(135deg, #b45309, #f59e0b, #fcd34d);
  --signal2-glow-color: rgba(245, 158, 11, 0.25);
  --signal2-glow-hover-color: rgba(245, 158, 11, 0.6);
}
.signal2-stat-content {
  background: radial-gradient(circle at 50% 0%, var(--signal2-glow-color) 0%, transparent 70%);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  z-index: 2;
}
.signal2-stat-card:hover .signal2-stat-content {
  background: radial-gradient(circle at 50% 0%, var(--signal2-glow-hover-color) 0%, transparent 70%);
  box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.4);
}
.signal2-stat-icon,
.signal2-stat-value,
.signal2-stat-label {
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.signal2-stat-icon {
  font-size: 28px;
  opacity: 0.8;
  height: 32px;
}
.signal2-stat-card:hover .signal2-stat-icon {
  transform: scale(1.2);
}
.signal2-stat-value {
  font-family: 'Inter', sans-serif;
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  margin: 12px 0;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.7);
}
.signal2-stat-card:hover .signal2-stat-value {
  transform: scale(1.15);
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.8);
}
.signal2-stat-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.signal2-stat-card:hover .signal2-stat-label {
  transform: scale(1.05);
}
.signal2-system-status-bar {
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
.signal2-status-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 8px;
  flex-shrink: 0;
}
.signal2-status-metrics {
  display: flex;
  align-items: center;
  gap: 8px;
}
.signal2-status-metric {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.signal2-metric-time {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  min-width: 32px;
  text-align: right;
  transition: all 0.3s ease;
}
.signal2-metric-text {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}
.signal2-status-separator {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  margin: 0 4px;
}
.signal2-control-panel {
  margin-top: 24px;
}
.signal2-control-panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 600;
}
.signal2-info-link {
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  flex-shrink: 0;
}
.signal2-info-link:hover,
.signal2-info-link:focus {
  color: white;
}
.signal2-info-button {
  background: transparent;
  border: none;
  cursor: pointer;
}
.signal2-static-prompt {
  color: white;
  margin-right: 8px;
  flex-shrink: 0;
}
.signal2-rotating-text-container {
  flex-grow: 1;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  min-height: 36px;
  display: flex;
  align-items: center;
}
.signal2-rotating-text {
  transition: opacity 0.5s ease-in-out;
  line-height: 1.2;
}
.signal2-rotating-text:not(.signal2-show) {
  opacity: 0;
}
.signal2-button-container {
  display: flex;
  gap: 6px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 6px;
}
.signal2-action-button {
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
.signal2-ticket-button {
  background: rgba(70, 70, 70, 0.8);
  color: rgba(255, 255, 255, 0.9);
}
.signal2-ticket-button:hover {
  background: rgba(85, 85, 85, 0.9);
  color: white;
  transform: translateY(-2px);
}
.signal2-review-button {
  background: linear-gradient(135deg, #f59e0b, #fcd34d);
  color: #422006;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}
.signal2-review-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
}
.signal2-button-icon {
  transition: transform 0.3s ease;
}
.signal2-review-button:hover .signal2-button-icon {
  transform: translateX(4px);
}
.signal2-branches-content {
  flex-grow: 1;
}
.signal2-branches-subtitle {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: var(--vp-c-text-2);
}
.signal2-branches-list {
  padding: 0;
}
.signal2-branch-item {
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
.signal2-branch-item:hover {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), var(--vp-c-bg-soft));
  border-color: #f59e0b;
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.1);
  transform: translateX(4px);
}
.signal2-branch-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}
.signal2-branch-number {
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
.signal2-branch-item:hover .signal2-branch-number {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 0 10px rgba(245, 158, 11, 0.5);
}
.signal2-branch-address {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.signal2-branch-action {
  color: #f59e0b;
  transition: transform 0.3s ease;
  margin-left: 12px;
}
.signal2-branch-item:hover .signal2-branch-action {
  transform: translateX(4px);
}
.signal2-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.signal2-modal {
  background: var(--vp-c-bg, #111);
  color: var(--vp-c-text-1, #fff);
  border: 1px solid var(--vp-c-border, rgba(255, 255, 255, 0.12));
  border-radius: 12px;
  width: min(520px, 96vw);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  padding: 32px;
}
.signal2-modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}
.signal2-modal-title {
  font-weight: 700;
  font-size: 16px;
}
.signal2-modal-body {
  margin-top: 16px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}
.signal2-modal-link {
  color: #a3e635;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}
.signal2-modal-link:hover {
  color: #c5f946;
  text-decoration: underline;
}
.signal2-modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}
.signal2-modal-ok {
  background: var(--vp-c-bg-mute, #222);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
}
.signal2-modal-ok:hover {
  background: var(--vp-c-bg-soft, #333);
}
@media (max-width: 768px) {
  .signal2-widget-content {
    padding: 24px;
  }
  .signal2-main-card {
    padding: 16px;
  }
  .signal2-stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .signal2-stat-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 16px;
    transition: none;
  }
  .signal2-stat-card:hover {
    transform: none;
  }
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
    gap: 16px;
  }
  .signal2-stat-icon {
    font-size: 28px;
    line-height: 1;
    display: flex;
    align-items: center;
  }
  .signal2-stat-value {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }
  .signal2-stat-label {
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .signal2-button-container {
    flex-direction: column;
    gap: 8px;
  }
  .signal2-action-button:hover {
    transform: none;
  }
  .signal2-system-status-bar {
    flex-direction: column;
    gap: 8px;
    padding: 12px;
  }
  .signal2-status-metrics {
    gap: 12px;
  }
}
@media (max-width: 480px) {
  .signal2-widget-content {
    padding: 20px;
  }
  .signal2-header-title {
    font-size: 22px;
    text-align: left;
  }
  .signal2-header-subtitle {
    font-size: 14px;
  }
  .signal2-branches-title {
    font-size: 22px;
    text-align: center;
  }
  .signal2-branches-subtitle {
    font-size: 14px;
  }
  .signal2-cafe-name {
    font-size: 20px;
  }
  .signal2-status-badge {
    padding: 4px 12px;
    font-size: 10px;
  }
  .signal2-status-metrics {
    gap: 8px;
  }
  .signal2-metric-time {
    font-size: 11px;
    min-width: 28px;
  }
  .signal2-metric-text {
    font-size: 10px;
  }
  .signal2-modal {
    padding: 24px;
  }
  .signal2-modal-body {
    margin-top: 12px;
  }
  .signal2-modal-footer {
    margin-top: 20px;
  }
}
</style>
