<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const emit = defineEmits(['close'])

// --- ДАННЫЕ (Сети и их статусы) ---

const fitness: Record<string, any> = {
  'World Class': {
    listeningStatus: 4.5,
    signalStatus: 3.8
  },
  'FIZ Культура': {
    listeningStatus: 4.3,
    signalStatus: 3.6
  },
  'X-Fit': {
    listeningStatus: 3.5,
    signalStatus: 3.0
  },
  'SMSTRETCHING': {
    listeningStatus: 3.8,
    signalStatus: 2.2
  },
  'SPORTLIFE': {
    listeningStatus: 2.8,
    signalStatus: 2.5
  },
  'Fitness House': {
    listeningStatus: 2.5,
    signalStatus: 2.0
  },
  'DDX': {
    listeningStatus: 1.5,
    signalStatus: 1.2
  }
}

const cafes: Record<string, any> = {
  'Дринкит': {
    listeningStatus: 7.5,
    signalStatus: 7.9
  },
  'Корж': {
    listeningStatus: 7.8,
    signalStatus: 6.5
  },
  'Skuratov Coffee': {
    listeningStatus: 7.8,
    signalStatus: 6.5
  },
  'Surf Coffee': {
    listeningStatus: 6.0,
    signalStatus: 4.5
  },
  'ДаблБи': {
    listeningStatus: 5.2,
    signalStatus: 5.0
  },
  'Green House': {
    listeningStatus: 5.0,
    signalStatus: 4.8
  },
  'Stars Coffee': {
    listeningStatus: 4.0,
    signalStatus: 3.8
  },
  'Cofix': {
    listeningStatus: 3.5,
    signalStatus: 2.8
  },
  'Do.bro Coffee': {
    listeningStatus: 2.5,
    signalStatus: 2.0
  }
}

// --- ЛОГИКА ФОРМЫ ---

const form = ref({
  direction: 'food', 
  selectedNetwork: 'Дринкит'
})

// Инициализируем как числа
const listeningValue = ref(3.5)
const changeValue = ref(4.2)
const networkListeningStatus = ref(0)
const networkSignalStatus = ref(0)

// === TICKET & DATE ===
const rawTicketNumber = ref<string | null>(null)
const formattedTicketNumber = ref<string | null>(null)
const currentDate = ref('')

const availableNetworks = computed(() => {
  if (!form.value.direction) return []
  const source = form.value.direction === 'fitness' ? fitness : cafes
  return Object.keys(source)
})

const getCurrentNetworkData = () => {
  const source = form.value.direction === 'fitness' ? fitness : cafes
  return source[form.value.selectedNetwork]
}

const updateStatusesFromNetwork = () => {
  if (!form.value.direction || !form.value.selectedNetwork) return
  const networkData = getCurrentNetworkData()
  
  if (networkData) {
    networkListeningStatus.value = networkData.listeningStatus
    networkSignalStatus.value = networkData.signalStatus
    // Гарантируем, что присваиваем числа
    listeningValue.value = Number(networkData.listeningStatus)
    changeValue.value = Number(networkData.signalStatus)
  }
}

watch(() => form.value.direction, (newDirection) => {
  const networks = newDirection === 'fitness' ? Object.keys(fitness) : Object.keys(cafes)
  form.value.selectedNetwork = networks[0] || ''
  updateStatusesFromNetwork()
})

watch(() => form.value.selectedNetwork, () => {
  updateStatusesFromNetwork()
})

// === INIT ===
onMounted(() => {
  rawTicketNumber.value = String(Date.now()).slice(-6)
  formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3, 6)}`

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  currentDate.value = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`
  updateStatusesFromNetwork()
})

// --- ЛОГИКА СТАТУСОВ ---

const listeningLabels = ['Принимают', 'Реагируют', 'Общаются']
const changeLabels = ['Оперативно', 'Внимательно', 'Системно']

const getStatusIndex = (val: number | string) => {
  // Принудительное преобразование в число
  const v = Number(val)
  const step = 8 / 3
  if (v < step) return 0
  if (v < step * 2) return 1
  return 2
}

const userListeningIndex = computed(() => getStatusIndex(listeningValue.value))
const userChangeIndex = computed(() => getStatusIndex(changeValue.value))

const networkListeningIndex = computed(() => getStatusIndex(networkListeningStatus.value))
const networkSignalIndex = computed(() => getStatusIndex(networkSignalStatus.value))

const sliderStyle = (value: number | string) => {
  const v = Number(value)
  const percentage = (v / 8) * 100
  return {
    background: `linear-gradient(
      to right,
      var(--track-active) 0%,
      var(--track-active) ${percentage}%,
      var(--track-bg) ${percentage}%,
      var(--track-bg) 100%
    )`,
  }
}

// --- ДИНАМИЧЕСКИЙ ТЕКСТ ---

const feedbackMessage = computed(() => {
  const l = userListeningIndex.value
  const c = userChangeIndex.value

  const messages = [
    [
      'Бизнес только выстраивает систему обратной связи — ваш Сигнал изменит то, как они будут работать с Клиентами.',
      'Бизнес уже меняется внутри и активно следит за обратной связью — ваш Сигнал поможет навести фокус на самое важное.',
      'Бизнес активно меняется, но ещё учится слышать Клиентов — ваш Сигнал поможет связать их внутренние планы с вашим опытом.'
    ],
    [
      'Бизнес слышит Клиентов и открыто к изменениям — ваш Сигнал подскажет, что именно стоит поправить первым.',
      'Бизнес уже реагирует на обратную связь — следите, как он шаг за шагом становится удобнее персонально для вас.',
      'Здесь слушают, а изменения уже идут — ваш Сигнал поможет направить их именно туда, где это важнее всего для вас.'
    ],
    [
      'Бизнес отвечает на каждый Сигнал и формирует систему изменений — ваш Сигнал может задать им ясный вектор.',
      'Ответы здесь превращаются в действия, но система только начала расти — ваш Сигнал зафиксирует этот уровень как новый стандарт.',
      'Здесь ваши Сигналы работают как рычаг — место быстро отвечает и действительно меняется вместе с вами.'
    ]
  ]

  return messages[l][c]
})

// --- ОТПРАВКА ---

const isSubmitting = ref(false)
const isSuccess = ref(false)

const buttonText = computed(() => {
  if (isSuccess.value) return 'Отправлено!'
  if (isSubmitting.value) return 'Отправка...'
  return 'Оценить'
})

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw1d57QWp_dUziYUW4yBuFTpNw-7PbQHj3pRBWpD9OXeUapAT8eJHp-s7NFIiMmxKnf4g/exec'

const submitForm = async () => {
  if (isSubmitting.value || isSuccess.value) return
  if (!form.value.direction || !form.value.selectedNetwork) {
    alert('Пожалуйста, выберите направление и сеть')
    return
  }

  const networkData = getCurrentNetworkData()
  if (!networkData) {
    console.error('Данные для сети не найдены:', form.value.selectedNetwork)
    alert(`Ошибка: данные для сети "${form.value.selectedNetwork}" не найдены.`)
    return
  }

  isSubmitting.value = true

  const currentNetworkListening = networkData.listeningStatus
  const currentNetworkSignal = networkData.signalStatus
  
  const currentNetLIndex = getStatusIndex(currentNetworkListening)
  const currentNetSIndex = getStatusIndex(currentNetworkSignal)
  
  const currentUserLIndex = getStatusIndex(listeningValue.value)
  const currentUserCIndex = getStatusIndex(changeValue.value)

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const submittedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  let clientId = localStorage.getItem('signal_client_id')
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + Date.now()
    localStorage.setItem('signal_client_id', clientId)
  }

  const formData = new FormData()
  formData.append('referer', window.location.origin)
  formData.append('clientId', clientId)
  formData.append('ticketNumber', formattedTicketNumber.value || '000-000')
  formData.append('date', currentDate.value)
  formData.append('submitted', submittedTime)
  formData.append('direction', form.value.direction === 'food' ? 'Рестораны и Кофейни' : 'Фитнес-клубы и Студии')
  formData.append('network', form.value.selectedNetwork)
  formData.append('address', 'Online Assessment')
  formData.append('name', 'Пользователь Readiness')

  // --- ИСПРАВЛЕНО ЗДЕСЬ ---
  // Явно приводим значения к Number перед вызовом toFixed()
  const listVal = Number(listeningValue.value)
  const changeVal = Number(changeValue.value)

  const reviewText = `[Оценка Readiness]
Направление: ${form.value.direction === 'food' ? 'Еда' : 'Фитнес'}
Сеть: ${form.value.selectedNetwork}

[Данные сети]
Статус сети (Listening): ${listeningLabels[currentNetLIndex]} (${currentNetworkListening})
Статус сети (Signal): ${changeLabels[currentNetSIndex]} (${currentNetworkSignal})

[Мнение пользователя]
Как слушают: ${listeningLabels[currentUserLIndex]} (${listVal.toFixed(2)}/8)
Как меняют: ${changeLabels[currentUserCIndex]} (${changeVal.toFixed(2)}/8)

[Комментарий системы]
${feedbackMessage.value}`

  formData.append('review', reviewText)

  console.log('Отправка:', {
    network: form.value.selectedNetwork,
    listVal: listVal,
    changeVal: changeVal
  })

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    
    if (result.status === 'success' && result.processed) {
      isSuccess.value = true
      setTimeout(() => {
        isSuccess.value = false
      }, 3000)
    } else {
      throw new Error(result.message || 'Ошибка обработки данных')
    }
  } catch (error) {
    console.error(error)
    alert('Не удалось отправить данные. Попробуйте позже.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="page-container">
    <h1 class="readiness-title">Ваша Оценка Сегодня</h1>

    <div class="selectors-container">
      <div class="selector-group">
        <label class="selector-label">Выбрать направление</label>
        <div class="select-wrapper">
          <select v-model="form.direction" class="readiness-select">
            <option value="food">Еда</option>
            <option value="fitness">Фитнес</option>
          </select>
          <svg class="select-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>

      <div class="selector-group">
        <label class="selector-label">Выбрать сеть</label>
        <div class="select-wrapper">
          <select v-model="form.selectedNetwork" class="readiness-select">
            <option v-for="network in availableNetworks" :key="network" :value="network">
              {{ network }}
            </option>
          </select>
          <svg class="select-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>

    <div class="readiness-wrapper">
      <div class="card card--purple">
        <div class="card-header">
          <div class="icon-circle icon-circle--purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3"/><path d="M17 13a6 6 0 0 0-6-6"/><path d="M21 13A10 10 0 0 0 11 3"/></svg>
          </div>
          <div class="card-titles">
            <div class="card-title">Как слушают</div>
            <div class="card-subtitle card-subtitle--purple">{{ listeningLabels[networkListeningIndex].toUpperCase() }}</div>
          </div>
        </div>
        <div class="card-body">
          <div class="slider-row">
            <input type="range" min="0" max="8" step="0.02" v-model="listeningValue" class="slider slider--purple" :style="sliderStyle(listeningValue)"/>
          </div>
          <div class="slider-labels">
            <span class="label-left" :class="{ 'active-text': userListeningIndex === 0 }">Принимают</span>
            <span class="label-center" :class="{ 'active-text': userListeningIndex === 1 }">Реагируют</span>
            <span class="label-right" :class="{ 'active-text': userListeningIndex === 2 }">Общаются</span>
          </div>
        </div>
      </div>

      <div class="card card--bronze">
        <div class="card-header">
          <div class="icon-circle icon-circle--bronze">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
          </div>
          <div class="card-titles">
            <div class="card-title">Как действуют</div>
            <div class="card-subtitle card-subtitle--bronze">{{ changeLabels[networkSignalIndex].toUpperCase() }}</div>
          </div>
        </div>
        <div class="card-body">
          <div class="slider-row">
            <input type="range" min="0" max="8" step="0.02" v-model="changeValue" class="slider slider--bronze" :style="sliderStyle(changeValue)"/>
          </div>
          <div class="slider-labels">
            <span class="label-left" :class="{ 'active-text': userChangeIndex === 0 }">Оперативно</span>
            <span class="label-center" :class="{ 'active-text': userChangeIndex === 1 }">Внимательно</span>
            <span class="label-right" :class="{ 'active-text': userChangeIndex === 2 }">Системно</span>
          </div>
        </div>
      </div>
    </div>

    <div class="message-box">
      {{ feedbackMessage }}
    </div>

    <div class="submit-container">
      <button type="button" class="submit-button" :disabled="isSubmitting || isSuccess" @click="submitForm">
        {{ buttonText }}
      </button>
    </div>

  </div>
</template>

<style scoped>
.page-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  position: relative;
}

.readiness-title {
  font-size: 26px;
  font-weight: 700;
  color: #f9fafb;
  text-align: center;
  margin: 8px 0 32px 0;
  padding: 0;
}

/* Селекты */
.selectors-container {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 856px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.selector-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 210px; 
  min-width: 0;
  box-sizing: border-box;
}

.selector-label {
  font-size: 13px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  display: block;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.readiness-select {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 12px 40px 12px 16px;
  font-size: 15px;
  color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  box-sizing: border-box;
  display: block;
  font-family: inherit;
}

.readiness-select:focus {
  outline: none;
  border-color: #ffffff;
  background-color: #2a2a2e;
}

.readiness-select:focus + .select-icon {
  transform: translateY(-50%) rotate(180deg);
  color: #ffffff;
}

.readiness-select option {
  background-color: #1a1a1c;
  color: #f0f0f0;
  padding: 8px;
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  transition: transform 0.3s ease, color 0.3s ease;
}

/* Карточки */
.readiness-wrapper {
  display: flex;
  gap: 16px;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 24px;
  box-sizing: border-box;
}

.card {
  --card-radius: 16px;
  --track-bg: rgba(255, 255, 255, 0.18);
  --track-active: #ffffff;
  --thumb-size: 20px;

  position: relative;
  flex: 1 1 210px;
  max-width: 420px;
  padding: 16px 18px 18px;
  border-radius: var(--card-radius);
  color: #f9fafb;
  overflow: hidden;
  backdrop-filter: blur(18px);
  box-sizing: border-box;
}

.card--purple {
  background: radial-gradient(circle at 0 0, #7c3aed33, transparent 55%),
    radial-gradient(circle at 100% 100%, #22d3ee1f, transparent 60%),
    linear-gradient(135deg, #0b0b21, #15152f);
}

.card--bronze {
  background: radial-gradient(circle at 0 0, #f59e0b33, transparent 55%),
    radial-gradient(circle at 100% 100%, #f973161f, transparent 60%),
    linear-gradient(135deg, #14120c, #262012);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.icon-circle {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  backdrop-filter: blur(4px);
}

.icon-circle svg {
  display: block;
}

.icon-circle--purple { background: rgba(167, 139, 250, 0.20); }
.icon-circle--bronze { background: rgba(251, 191, 36, 0.20); }

.card-titles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.card-title {
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  color: #f3f4f6;
}

.card-subtitle {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1;
}

.card-subtitle--purple { color: #c084fc; }
.card-subtitle--bronze { color: #fbbf24; }

.card-body {
  display: flex;
  flex-direction: column;
  margin-top: 4px;
}

.slider-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
  margin: 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.5);
  cursor: pointer;
  background: radial-gradient(circle, var(--thumb-inner-color) 0%, var(--thumb-inner-color) 35%, #ffffff 36%, #ffffff 100%);
}

.slider::-moz-range-thumb {
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  border: 2px solid rgba(15, 23, 42, 0.2);
  cursor: pointer;
  background: radial-gradient(circle, var(--thumb-inner-color) 0%, var(--thumb-inner-color) 35%, #ffffff 36%, #ffffff 100%);
}

.slider::-moz-range-track {
  height: 6px;
  border-radius: 999px;
  background: transparent;
}

.slider--purple { --thumb-inner-color: #a855f7; }
.slider--bronze { --thumb-inner-color: #fbbf24; }

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-top: 10px;
  color: rgba(229, 231, 235, 0.7);
  position: relative;
  height: 16px;
}

.active-text {
  color: #ffffff !important;
  font-weight: 600;
  transition: color 0.2s ease;
}

.label-left { position: absolute; left: 0; }
.label-center { position: absolute; left: 50%; transform: translateX(-50%); }
.label-right { position: absolute; right: 0; }

/* Сообщение */
.message-box {
  width: 100%;
  max-width: 600px;
  text-align: center;
  color: #e2e8f0;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 24px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* Кнопка */
.submit-container {
  width: 100%;
  max-width: 856px;
  display: flex;
  justify-content: center;
  margin-top: 0;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  background-color: #ffffff;
  color: #0f172a;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.1s ease, opacity 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  box-sizing: border-box;
}

.submit-button:active { transform: scale(0.98); }
.submit-button:disabled { opacity: 0.7; cursor: not-allowed; }

/* Мобильная адаптивность (layout) */
@media (max-width: 480px) {
  .page-container {
    padding: 0 16px !important;
  }
  
  /* Увеличен отступ сверху на 2px */
  :deep(.page-container h1) { margin-top: 2px !important; margin-bottom: 16px !important; }
  
  .readiness-title {
    margin-top: 2px !important;
    margin-bottom: 16px !important;
    font-size: 24px !important;
  }

  .selectors-container {
    flex-direction: column !important;
    margin-bottom: 8px !important;
    gap: 8px !important;
  }

  .selector-group {
    flex: 0 0 auto !important;
    width: 100% !important;
  }

  .readiness-wrapper {
    flex-direction: column !important;
    align-items: center !important;
    margin: 8px 0 16px !important;
    /* Уменьшен отступ между карточками на 5px (16px -> 11px) */
    gap: 11px !important;
  }
  
  .card {
    flex: 1 1 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    padding-bottom: 12px !important;
  }

  .card-header { margin-bottom: 12px !important; }

  .card-body {
    flex-direction: column-reverse !important;
    gap: 16px !important;
  }

  .slider-labels {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    font-size: 13px !important;
  }

  .submit-container {
    padding: 0 0 20px 0 !important;
  }
  
  .message-box {
    font-size: 14px !important;
    padding: 0 8px !important;
    margin-bottom: 16px !important;
  }
}
</style>
