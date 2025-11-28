<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// --- ДАННЫЕ НАПРАВЛЕНИЙ И СЕТЕЙ (из paste.txt) ---

const fitness = {
  'SMSTRETCHING': {
    branches: [
      { address: 'г. Самара, ул. Ново-Садовая, 9' },
      { address: 'г. Самара, пр. К. Маркса, 24 (ТЦ Пирамида)' },
      { address: 'г. Самара, ул. Димитрова, 247 (ТЦ METRO)' }
    ]
  },
  'FiZ': {
    branches: [
      { address: 'г. Самара, пр-кт. Кирова, 11' },
      { address: 'г. Самара, ул. Мориса Тореза, 160' }
    ]
  }
}

const cafes = {
  'Корж': {
    branches: [
      { address: 'г. Самара, ТРЦ Гудок, Московское шоссе, 103' },
      { address: 'г. Самара, ТРЦ Амбар, Московское шоссе, 101' }
    ]
  },
  'MOSAIC': {
    branches: [
      { address: 'г. Самара, Московское шоссе, 4а' },
      { address: 'г. Самара, ул. Ново-Садовая, 50' }
    ]
  },
  'Skuratov': {
    branches: [
      { address: 'г. Самара, ул. Ленинградская, 190' },
      { address: 'г. Самара, ул. Ново-Садовая, 80' }
    ]
  },
  'Surf Coffee': {
    branches: [
      { address: 'г. Самара, ул. Мичурина, 57' },
      { address: 'г. Самара, ул. Мичурина, 54' }
    ]
  },
  'Старик Хоттабыч': {
    branches: [
      { address: 'г. Самара, ул. Чапаевская, 99' },
      { address: 'г. Самара, ул. Ленинская, 153' }
    ]
  }
}

// --- ЛОГИКА ФОРМЫ ---

const form = ref({
  direction: '',
  selectedNetwork: ''
})

// Список сетей в зависимости от направления
const availableNetworks = computed(() => {
  if (!form.value.direction) return []
  const source = form.value.direction === 'fitness' ? fitness : cafes
  return Object.keys(source)
})

// Сброс сети при смене направления
watch(() => form.value.direction, () => {
  form.value.selectedNetwork = ''
})

// --- ЛОГИКА СЛАЙДЕРОВ ---

const listeningValue = ref(3.5)
const changeValue = ref(4.2)

const listeningLabels = ['Подключены', 'Слышат', 'Отвечают']
const changeLabels = ['Открыты', 'Действуют', 'Меняют']

const getStatusIndex = (val: number) => {
  const step = 8 / 3
  if (val < step) return 0
  if (val < step * 2) return 1
  return 2
}

const listeningStatusIndex = computed(() => getStatusIndex(listeningValue.value))
const changeStatusIndex = computed(() => getStatusIndex(changeValue.value))

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
  const l = listeningStatusIndex.value
  const c = changeStatusIndex.value

  const messages = [
    [
      'Место только выстраивает систему обратной связи — ваш Сигнал войдёт в основу того, как они будут работать с Клиентами.',
      'Они уже что‑то меняют внутри, хотя только подключились к Сигналам — ваш Сигнал поможет навести фокус на самом важном.',
      'Бизнес активно меняется, но ещё учится слышать Сигналы — ваш Сигнал может связать их внутренние планы с вашим опытом.'
    ],
    [
      'Место слышит Клиентов и открыто к доработкам — ваш Сигнал подскажет, что именно стоит поправить первым.',
      'Бизнес уже реагирует на обратную связь — следите, как он шаг за шагом становится удобнее лично для вас.',
      'Клиентов здесь реально слушают, и изменения уже идут — ваш Сигнал поможет направить эти изменения именно туда, где это важнее всего для вас.'
    ],
    [
      'Команда отвечает на каждый Сигнал и только формирует систему изменений — ваш Сигнал может задать им ясный вектор.',
      'Ответы здесь превращаются в действия, но система ещё в росте — ваш Сигнал помогает закрепить этот уровень как новый стандарт.',
      'Здесь ваши Сигналы работают как рычаг — место быстро отвечает и действительно меняется вместе с вами.'
    ]
  ]

  return messages[l][c]
})

// --- ОТПРАВКА ФОРМЫ ---

const isSubmitting = ref(false)
const isSuccess = ref(false)
const buttonText = computed(() => {
  if (isSuccess.value) return 'Отправлено!'
  if (isSubmitting.value) return 'Отправка...'
  return 'Отправить'
})

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxPqW0GLJ7SCJc9J1yC17Bl2di_IxXDyAZEfSxJ7wLvupwjb7_IAIlKVsXlyOL6WcDj/exec'

const submitForm = async () => {
  if (isSubmitting.value || isSuccess.value) return
  if (!form.value.direction || !form.value.selectedNetwork) {
    alert('Пожалуйста, выберите направление и сеть')
    return
  }

  isSubmitting.value = true

  let clientId = localStorage.getItem('signal_client_id')
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + Date.now()
    localStorage.setItem('signal_client_id', clientId)
  }

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  
  const currentDate = `${year}-${month}-${day}`
  const submittedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  const ticketNumber = `TICKET-${Date.now().toString().slice(-6)}`

  const formData = new FormData()
  formData.append('referer', window.location.origin)
  formData.append('clientId', clientId)
  formData.append('ticketNumber', ticketNumber)
  formData.append('date', currentDate)
  formData.append('submitted', submittedTime)
  
  // Основные данные
  formData.append('direction', form.value.direction === 'food' ? 'Еда' : 'Фитнес')
  formData.append('network', form.value.selectedNetwork)
  formData.append('address', 'Online Assessment') // Можно оставить пустым
  formData.append('name', 'Пользователь Readiness')

  // Формируем отзыв
  const reviewText = `
[Оценка Readiness]
Направление: ${form.value.direction === 'food' ? 'Еда' : 'Фитнес'}
Сеть: ${form.value.selectedNetwork}

Как слушают: ${listeningLabels[listeningStatusIndex.value]} (${listeningValue.value.toFixed(2)}/8)
Как меняют: ${changeLabels[changeStatusIndex.value]} (${changeValue.value.toFixed(2)}/8)

[Комментарий системы]
${feedbackMessage.value}
  `
  formData.append('review', reviewText.trim())

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    
    if (result.status === 'success') {
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
    
    <!-- Заголовок -->
    <h1 class="readiness-title">Где Вас Слушают?</h1>

    <!-- Селекты направления и сети -->
    <div class="selectors-container">
      <div class="selector-group">
        <label class="selector-label">Выбрать направление</label>
        <select v-model="form.direction" class="readiness-select">
          <option disabled value="">Выберите направление</option>
          <option value="food">Еда</option>
          <option value="fitness">Фитнес</option>
        </select>
      </div>

      <div class="selector-group">
        <label class="selector-label">Выбрать сеть</label>
        <select 
          v-model="form.selectedNetwork" 
          class="readiness-select"
          :disabled="!form.direction"
        >
          <option disabled value="">Выберите сеть</option>
          <option 
            v-for="network in availableNetworks" 
            :key="network" 
            :value="network"
          >
            {{ network }}
          </option>
        </select>
      </div>
    </div>

    <!-- Карточки со слайдерами -->
    <div class="readiness-wrapper">
      <div class="card card--purple">
        <div class="card-header">
          <div class="icon-circle icon-circle--purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3"/><path d="M17 13a6 6 0 0 0-6-6"/><path d="M21 13A10 10 0 0 0 11 3"/></svg>
          </div>
          <div class="card-titles">
            <div class="card-title">Как слушают</div>
            <div class="card-subtitle card-subtitle--purple">ПОДКЛЮЧЕНЫ</div>
          </div>
        </div>
        <div class="card-body">
          <div class="slider-row">
            <input type="range" min="0" max="8" step="0.02" v-model="listeningValue" class="slider slider--purple" :style="sliderStyle(listeningValue)"/>
          </div>
          <div class="slider-labels">
            <span class="label-left" :class="{ 'active-text': listeningStatusIndex === 0 }">Подключены</span>
            <span class="label-center" :class="{ 'active-text': listeningStatusIndex === 1 }">Слышат</span>
            <span class="label-right" :class="{ 'active-text': listeningStatusIndex === 2 }">Отвечают</span>
          </div>
        </div>
      </div>

      <div class="card card--bronze">
        <div class="card-header">
          <div class="icon-circle icon-circle--bronze">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
          </div>
          <div class="card-titles">
            <div class="card-title">Как меняют</div>
            <div class="card-subtitle card-subtitle--bronze">ДЕЙСТВУЮТ</div>
          </div>
        </div>
        <div class="card-body">
          <div class="slider-row">
            <input type="range" min="0" max="8" step="0.02" v-model="changeValue" class="slider slider--bronze" :style="sliderStyle(changeValue)"/>
          </div>
          <div class="slider-labels">
            <span class="label-left" :class="{ 'active-text': changeStatusIndex === 0 }">Открыты</span>
            <span class="label-center" :class="{ 'active-text': changeStatusIndex === 1 }">Действуют</span>
            <span class="label-right" :class="{ 'active-text': changeStatusIndex === 2 }">Меняют</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Динамический текст -->
    <div class="message-box">
      {{ feedbackMessage }}
    </div>

    <!-- Кнопка отправки -->
    <div class="submit-container">
      <button 
        class="submit-button" 
        :disabled="isSubmitting || isSuccess || !form.direction || !form.selectedNetwork"
        @click="submitForm"
      >
        {{ buttonText }}
      </button>
    </div>

  </div>
</template>

<style scoped>
/* Сброс VitePress стилей */
.page-container * {
  all: revert;
}

.page-container {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* Заголовок */
.readiness-title {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #f9fafb;
  text-align: center;
  margin: 0 0 32px 0;
  padding: 0;
}

/* Контейнер селектов */
.selectors-container {
  all: initial;
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 856px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.selector-group {
  all: initial;
  display: flex;
  flex-direction: column;
  flex: 1 1 320px;
  min-width: 250px;
  box-sizing: border-box;
}

.selector-label {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  display: block;
}

.readiness-select {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 15px;
  color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23f0f0f0' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
  box-sizing: border-box;
  display: block;
}

.readiness-select:focus {
  outline: none;
  border-color: #7c3aed;
  background-color: #2a2a2e;
}

.readiness-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.readiness-select option {
  background-color: #1a1a1c;
  color: #f0f0f0;
  padding: 8px;
}

/* Сетка карточек */
.readiness-wrapper {
  all: initial;
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
  all: initial;
  --card-radius: 16px;
  --track-bg: rgba(255, 255, 255, 0.18);
  --track-active: #ffffff;
  --thumb-size: 20px;

  position: relative;
  flex: 1 1 320px;
  max-width: 420px;
  padding: 16px 18px 18px;
  border-radius: var(--card-radius);
  color: #f9fafb;
  overflow: hidden;
  backdrop-filter: blur(18px);
  box-sizing: border-box;
  display: block;
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
  all: initial;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.icon-circle {
  all: initial;
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
  all: initial;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.card-title {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  color: #f3f4f6;
  display: block;
}

.card-subtitle {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1;
  display: block;
}

.card-subtitle--purple { color: #c084fc; }
.card-subtitle--bronze { color: #fbbf24; }

.card-body {
  all: initial;
  display: flex;
  flex-direction: column;
  margin-top: 4px;
}

.slider-row {
  all: initial;
  display: flex;
  align-items: center;
  width: 100%;
}

.slider {
  all: initial;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
  margin: 0;
  display: block;
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
  all: initial;
  display: flex;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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

/* Блок сообщения */
.message-box {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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

/* Кнопка отправки */
.submit-container {
  all: initial;
  width: 100%;
  max-width: 856px;
  display: flex;
  justify-content: center;
  margin-top: 0;
  box-sizing: border-box;
}

.submit-button {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
  display: block;
  box-sizing: border-box;
}

.submit-button:active { transform: scale(0.98); }
.submit-button:disabled { opacity: 0.7; cursor: not-allowed; }

/* Адаптивность */
@media (max-width: 768px) {
  .readiness-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .selectors-container {
    flex-direction: column;
    margin-bottom: 24px;
  }

  .selector-group {
    width: 100%;
  }

  .readiness-wrapper {
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .card {
    flex: 1 1 auto; 
    width: 100%;
    max-width: 100%;
    padding-bottom: 16px;
  }

  .card-header { margin-bottom: 12px; }

  .card-body {
    flex-direction: column-reverse;
    gap: 16px; 
  }

  .slider-labels {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 13px;
  }

  .submit-container {
    width: 100%;
    max-width: 100%;
    padding: 0 0 20px 0;
  }
  
  .message-box {
    font-size: 14px;
    padding: 0 8px;
  }
}
</style>
