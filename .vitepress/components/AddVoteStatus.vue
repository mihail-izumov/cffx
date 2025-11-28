<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// --- ДАННЫЕ ДЛЯ СЕЛЕКТОВ (из paste.txt) ---

const cafes = {
  'Skuratov Coffee': [
    { address: 'ул. Куйбышева, 68/70' },
    { address: 'Московское шоссе, 252' }
  ],
  'Корж': [
    { address: 'ул. Дачная, 2к1' },
    { address: 'ул. Ульяновская, 19' },
    { address: 'ул. Ново-Садовая, 106г' },
    { address: 'ул. Самарская, 270' },
    { address: 'ул. Льва Толстого, 57' },
    { address: 'пр. Масленникова, 19' }
  ],
  'Дринкит': [
    { address: 'ул. Вилоновская, 84' },
    { address: 'ул. Ленинградская, 29' }
  ],
  'Surf Coffee': [
    { address: 'ул. Галактионовская, 40' },
    { address: 'ул. Некрасовская, 57' }
  ]
}

const fitness = {
  'SuperSport': [
    { address: 'Московское шоссе, 4к4' }
  ],
  'DDX Fitness': [
    { address: 'Аврора Молл, ул. Аэродромная, 47А' },
    { address: 'Космопорт, ул. Дыбенко, 30' },
    { address: 'Летоут, Московское шоссе, 18-й км, 25А' }
  ],
  'Fizkultura': [
    { address: 'Галактионовская 157' },
    { address: 'Врубеля 15' }
  ],
  'Luxury Fitness': [
    { address: 'ул. Солнечная, 30' }
  ],
  'Ботек-Велнес': [
    { address: 'ул. Карла Маркса, 55' }
  ]
}

// --- СОСТОЯНИЕ ФОРМЫ ---

const selectedDirection = ref('')
const selectedNetwork = ref('')
// Локацию пока не используем в отправке по вашему ТЗ, но логику можно оставить
const selectedBranch = ref('')

// При смене направления сбрасываем сеть
watch(selectedDirection, () => {
  selectedNetwork.value = ''
  selectedBranch.value = ''
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

const sliderStyle = (value: number | string) => {
  const v = Number(value)
  const percentage = (v / 8) * 100
  return {
    background: `linear-gradient(to right, var(--track-active) 0%, var(--track-active) ${percentage}%, var(--track-bg) ${percentage}%, var(--track-bg) 100%)`,
  }
}

// --- ОТПРАВКА ---

const isSubmitting = ref(false)
const isSuccess = ref(false)

const buttonText = computed(() => {
  if (isSuccess.value) return 'Отправлено!'
  if (isSubmitting.value) return 'Отправка...'
  return 'Отправить'
})

const isFormValid = computed(() => {
  return selectedDirection.value && selectedNetwork.value
})

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxPqW0GLJ7SCJc9J1yC17Bl2di_IxXDyAZEfSxJ7wLvupwjb7_IAIlKVsXlyOL6WcDj/exec'

const submitForm = async () => {
  if (!isFormValid.value || isSubmitting.value || isSuccess.value) return

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
  const ticketNumber = `TICKET-${Date.now().toString().slice(-6)}`
  
  const currentDate = `${year}-${month}-${day}`
  const submittedTime = `${year}-${month}-${day} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`

  const formData = new FormData()
  formData.append('referer', window.location.origin)
  formData.append('clientId', clientId)
  formData.append('ticketNumber', ticketNumber)
  formData.append('date', currentDate)
  formData.append('submitted', submittedTime)
  
  // Данные из селектов
  const directionLabel = selectedDirection.value === 'food' ? 'Рестораны и кофейни' : 'Фитнес-клубы и студии'
  formData.append('network', selectedNetwork.value) // Сеть
  formData.append('name', 'Аноним') // Заглушка

  // Формируем review text с данными из 4х полей
  const reviewText = `
    [Данные формы]
    Направление: ${directionLabel}
    Сеть: ${selectedNetwork.value}
    
    [Статистика Readiness]
    Как слушают: ${listeningLabels[listeningStatusIndex.value]} (${listeningValue.value.toFixed(2)}/8)
    Как меняют: ${changeLabels[changeStatusIndex.value]} (${changeValue.value.toFixed(2)}/8)
    
    [Комментарий системы]
    ${feedbackMessage.value}
  `
  formData.append('review', reviewText.trim())

  try {
    const response = await fetch(API_ENDPOINT, { method: 'POST', body: formData })
    const result = await response.json()
    
    if (result.status === 'success') {
      isSuccess.value = true
      setTimeout(() => { isSuccess.value = false }, 3000)
    } else {
      throw new Error(result.message || 'Ошибка')
    }
  } catch (error) {
    console.error(error)
    alert('Ошибка при отправке')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="page-container">
    
    <!-- 1. Изолированный заголовок -->
    <h2 class="isolated-title">Проверьте готовность к изменениям</h2>

    <!-- 2. Блок с селектами -->
    <div class="selects-container">
      <select v-model="selectedDirection" class="signal-select">
        <option disabled value="">Выбрать направление</option>
        <option value="food">Рестораны и кофейни</option>
        <option value="fitness">Фитнес-клубы и студии</option>
      </select>

      <select
        v-model="selectedNetwork"
        class="signal-select"
        :disabled="!selectedDirection"
      >
        <option disabled value="">Выбрать сеть</option>
        <option
          v-for="(val, name) in (selectedDirection === 'fitness' ? fitness : cafes)"
          :key="name"
          :value="name"
        >
          {{ name }}
        </option>
      </select>
    </div>

    <!-- 3. Карточки слайдеров -->
    <div class="readiness-wrapper">
      <!-- Карточка 1 -->
      <div class="card card--purple">
        <div class="card-header">
          <div class="icon-circle icon-circle--purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-satellite-dish-icon lucide-satellite-dish"><path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3"/><path d="M17 13a6 6 0 0 0-6-6"/><path d="M21 13A10 10 0 0 0 11 3"/></svg>
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

      <!-- Карточка 2 -->
      <div class="card card--bronze">
        <div class="card-header">
          <div class="icon-circle icon-circle--bronze">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
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
        :disabled="!isFormValid || isSubmitting || isSuccess"
        @click="submitForm"
      >
        {{ buttonText }}
      </button>
    </div>

  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Изолированный заголовок */
.isolated-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 24px 0;
  padding: 0;
  border: none;
  line-height: 1.3;
  color: var(--vp-c-text-1, #2c3e50); /* Используем переменную темы или дефолт */
}

/* Контейнер селектов */
.selects-container {
  width: 100%;
  max-width: 420px; /* Ширина как у карточки */
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

/* Стили селекта (как в paste.txt) */
.signal-select {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid rgba(60, 60, 67, 0.29); /* VitePress border color approx */
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft, #f6f6f7);
  color: var(--vp-c-text-1, #2c3e50);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 16px top 50%;
  background-size: 12px auto;
  cursor: pointer;
}

.signal-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Сетка карточек */
.readiness-wrapper {
  display: flex;
  gap: 16px;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 24px;
}

/* Карточка */
.card {
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
  color: #ffffff;
  font-weight: 600;
  transition: color 0.2s ease;
}

.label-left { position: absolute; left: 0; }
.label-center { position: absolute; left: 50%; transform: translateX(-50%); }
.label-right { position: absolute; right: 0; }

/* Блок сообщения */
.message-box {
  width: 100%;
  max-width: 600px;
  text-align: center;
  color: var(--vp-c-text-2, #64748b); /* Цвет текста адаптивный */
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 24px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Кнопка отправки */
.submit-container {
  width: 100%;
  max-width: 856px;
  display: flex;
  justify-content: center;
  margin-top: 0;
}

.submit-button {
  width: 100%;
  background-color: var(--vp-c-brand, #3451b2); /* Цвет бренда VitePress по умолчанию */
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.1s ease, opacity 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.submit-button:active { transform: scale(0.98); }
.submit-button:disabled { opacity: 0.7; cursor: not-allowed; background-color: #94a3b8; }

/* Адаптивность */
@media (max-width: 768px) {
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

  .isolated-title {
    font-size: 20px; /* Чуть меньше на мобилке */
  }
}
</style>
