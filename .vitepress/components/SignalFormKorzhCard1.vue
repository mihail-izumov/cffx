<template>
  <div class="signal-form-wrapper">
    <!-- 1. Success wrapper -->
    <div v-if="formSubmitted" class="signal-success-message">
      <div class="signal-success-text">
        <h3>Готово!</h3>
        <p>Сигнал отправлен. Номер: <strong>{{ formattedTicketNumber }}</strong></p>
      </div>

      <div class="signal-success-actions">
        <a
          :href="`https://t.me/AnnaSignal?text=${rawTicketNumber}`"
          target="_blank"
          class="signal-telegram-button"
        >
          Написать в Telegram
        </a>
        <button type="button" @click="handleShareClick" class="signal-share-btn">
          Поделиться
        </button>
      </div>

      <a href="/signals" target="_blank" class="signal-secondary-link">
        Все сигналы
      </a>
    </div>

    <!-- 2. Form wrapper -->
    <form v-else @submit.prevent="submitForm">
      <div class="signal-form-header">
        <div class="signal-form-title">Signal</div>
        <div class="signal-tech-info">
          <span class="signal-info-item">{{ currentDate }}</span>
          <span class="signal-info-item signal-ticket-display">{{ formattedTicketNumber }}</span>
        </div>
      </div>

      <!-- Выбор точки -->
      <div class="signal-form-section">
        <div class="signal-question-block signal-compact">
          <label class="signal-question-label">Точка</label>
          <p class="signal-question-help">Где это произошло?</p>
          <select v-model="form.coffeeShopAddress" class="signal-address-select" required>
            <option value="" disabled>Выберите точку</option>
            <option value="Кофе, 103">Кофе, 103</option>
            <option value="Кофе, 30">Кофе, 30</option>
            <option value="Кофе, 101">Кофе, 101</option>
            <option value="9 Просека (5-я просека),39 (5-я просека), 3">9 Просека (5-я просека),39 (5-я просека), 3</option>
            <option value="Кофе, 270">Кофе, 270</option>
            <option value="Кофе, 22">Кофе, 22</option>
            <option value="Кофе, 19">Кофе, 19</option>
            <option value="Ново-Садовая, 106">Ново-Садовая, 106</option>
          </select>
        </div>
      </div>

      <div class="signal-separator-line"></div>

      <!-- Гендерный переключатель и инфо -->
      <div class="signal-controls-row">
        <button
          type="button"
          class="signal-info-button"
          :class="{
            'signal-info-female': selectedGender === 'female',
            'signal-info-male': selectedGender === 'male'
          }"
          @click="showInfoModal = true"
        >
          Как это работает?
        </button>

        <div class="signal-gender-switch">
          <div class="signal-gender-container">
            <div
              class="signal-gender-btn signal-gender-female"
              :class="{ 'is-active': selectedGender === 'female' }"
              @click="onGenderClick('female')"
            ></div>
            <div
              class="signal-gender-btn signal-gender-male"
              :class="{ 'is-active': selectedGender === 'male' }"
              @click="onGenderClick('male')"
            ></div>
          </div>
        </div>
      </div>

      <!-- Модальное окно -->
      <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
        <div class="modal">
          <div class="modal-title">Как это работает</div>
          <div class="modal-body">
            Выберите точку, оставьте сигнал. Ответ в течение 24 часа. Анонимно и безопасно.<br><br>
            <a href="https://cffx.ru/signals.html" target="_blank" class="modal-link">
              Подробнее о Signal
            </a>
          </div>
          <div class="modal-footer">
            <button type="button" class="modal-ok" @click="showInfoModal = false">
              Понятно
            </button>
          </div>
        </div>
      </div>

      <!-- УДАЛЕНЫ textarea для emotionalRelease, factualAnalysis, constructiveSuggestions -->

      <!-- Footer с кнопкой -->
      <div class="signal-form-footer">
        <div class="signal-button-section">
          <button
            type="submit"
            class="signal-submit-btn"
            :disabled="!isFormValid || isSubmitting"
          >
            {{ isSubmitting ? 'Отправляю...' : 'Отправить сигнал' }}
          </button>
        </div>
      </div>
    </form>

    <!-- 3. Story Generator -->
    <KorzhStoryGenerator
      ref="storyGeneratorRef"
      :ticket="formattedTicketNumber"
      :date="currentDate.split(' ')[0]"
      :address="form.coffeeShopAddress"
      :all-text="[]"
    />
  </div>
</template>
<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import KorzhStoryGenerator from './KorzhStoryGenerator.vue'

const form = reactive({
  coffeeShopAddress: ''
})

const isSubmitting = ref(false)
const submittedTime = ref('')
const formSubmitted = ref(false)
const rawTicketNumber = ref(null)
const formattedTicketNumber = ref(null)
const currentDate = ref('')
const selectedGender = ref('female')
const showInfoModal = ref(false)

const genderClass = computed(() => {
  return selectedGender.value === 'female' ? 'gender-female' : 'gender-male'
})

// ============ ВСЕ ПОДСКАЗКИ (НЕ ТРОГАЕМ) ============
const baseSuggestions = {
  female: {
    emotions: {
      initial: ['радовалась', 'восхитилась', 'удивилась', 'обрадовалась', 'расстроилась', 'разочаровалась', 'огорчилась', 'возмутилась'],
      'радовалась': ['новому вкусу', 'атмосфере', 'обслуживанию', 'чистоте', 'музыке'],
      'восхитилась': ['сервисом', 'подачей', 'вниманием', 'оформлением'],
      'удивилась': ['скорости', 'качеству', 'выбору', 'чистоте'],
      'обрадовалась': ['акции', 'подарку', 'новинке', 'скидке'],
      'расстроилась': ['ожиданием', 'обслуживанием', 'качеством', 'чистотой'],
      'разочаровалась': ['напитком', 'десертом', 'сервисом', 'атмосферой'],
      'огорчилась': ['грубостью', 'невниманием', 'беспорядком', 'холодом'],
      'возмутилась': ['хамством', 'грязью', 'задержкой', 'отказом']
    }
  },
  male: {
    emotions: {
      initial: ['порадовался', 'впечатлился', 'удивился', 'обрадовался', 'расстроился', 'разочаровался', 'огорчился', 'возмутился'],
      'порадовался': ['новому вкусу', 'атмосфере', 'обслуживанию', 'чистоте', 'музыке'],
      'впечатлился': ['сервисом', 'подачей', 'вниманием', 'оформлением'],
      'удивился': ['скорости', 'качеству', 'выбору', 'чистоте'],
      'обрадовался': ['акции', 'подарку', 'новинке', 'скидке'],
      'расстроился': ['ожиданием', 'обслуживанием', 'качеством', 'чистотой'],
      'разочаровался': ['напитком', 'десертом', 'сервисом', 'атмосферой'],
      'огорчился': ['грубостью', 'невниманием', 'беспорядком', 'холодом'],
      'возмутился': ['хамством', 'грязью', 'задержкой', 'отказом']
    }
  },
  common: {
    emotions: {
      'новому вкусу': ['раф', 'капучино', 'латте', 'флэт уайт'],
      'атмосфере': ['уютно', 'тихо', 'светло', 'комфортно'],
      'обслуживанию': ['быстро', 'вежливо', 'внимательно', 'профессионально'],
      'чистоте': ['столы', 'зал', 'туалет', 'витрина'],
      'музыке': ['приятная', 'негромкая', 'подходящая', 'расслабляющая'],
      'сервисом': ['быстро', 'качественно', 'внимательно', 'профессионально'],
      'подачей': ['красиво', 'аккуратно', 'оригинально', 'эстетично'],
      'вниманием': ['баристы', 'персонала', 'администратора', 'официанта'],
      'оформлением': ['зала', 'витрины', 'меню', 'интерьера'],
      'скорости': ['приготовления', 'обслуживания', 'подачи', 'расчёта'],
      'качеству': ['кофе', 'десертов', 'выпечки', 'продуктов'],
      'выбору': ['напитков', 'десертов', 'выпечки', 'закусок'],
      'акции': ['2+1', 'скидка 20%', 'бонусы', 'подарок'],
      'подарку': ['круассан', 'печенье', 'стикер', 'открытка'],
      'новинке': ['раф', 'десерт', 'сэндвич', 'лимонад'],
      'скидке': ['10%', '15%', '20%', 'по карте'],
      'ожиданием': ['долго', '15 минут', '20 минут', 'очень долго'],
      'качеством': ['кофе', 'десерта', 'выпечки', 'молока'],
      'напитком': ['остыл', 'горький', 'слабый', 'пересластили'],
      'десертом': ['чёрствый', 'несвежий', 'разваливается', 'не тот вкус'],
      'грубостью': ['баристы', 'кассира', 'администратора', 'персонала'],
      'невниманием': ['игнорировали', 'не подошли', 'забыли', 'не ответили'],
      'беспорядком': ['на столах', 'в зале', 'на витрине', 'в туалете'],
      'холодом': ['в зале', 'кофе', 'молоко', 'помещение'],
      'хамством': ['баристы', 'кассира', 'администратора', 'персонала'],
      'грязью': ['столы', 'пол', 'туалет', 'витрина'],
      'задержкой': ['заказа', 'обслуживания', 'расчёта', 'выдачи'],
      'отказом': ['принять карту', 'сделать замену', 'подогреть', 'вернуть деньги']
    },
    facts: {
      initial: ['заказала', 'попросила', 'обратила внимание', 'заметила', 'ждала', 'получила', 'спросила', 'уточнила'],
      'заказала': ['капучино', 'латте', 'раф', 'флэт уайт', 'эспрессо', 'американо'],
      'попросила': ['без сахара', 'на миндальном', 'на кокосовом', 'на соевом', 'горячий', 'тёплый'],
      'обратила внимание': ['на грязный стол', 'на долгое ожидание', 'на невежливость', 'на беспорядок'],
      'заметила': ['грязь на столе', 'очередь 20 минут', 'холодный кофе', 'грубость баристы'],
      'ждала': ['10 минут', '15 минут', '20 минут', '30 минут', 'очень долго'],
      'получила': ['холодный кофе', 'не тот напиток', 'пролитый стакан', 'неправильный заказ'],
      'спросила': ['про акцию', 'про новинки', 'про состав', 'про альтернативное молоко'],
      'уточнила': ['время ожидания', 'стоимость', 'состав', 'условия акции']
    },
    solutions: {
      initial: ['хорошо бы', 'было бы здорово', 'предлагаю', 'можно было бы', 'стоит', 'важно', 'нужно', 'имеет смысл'],
      'хорошо бы': ['проверять температуру', 'ускорить обслуживание', 'чаще убирать столы', 'обучить персонал'],
      'было бы здорово': ['добавить акцию', 'расширить меню', 'улучшить атмосферу', 'обновить интерьер'],
      'предлагаю': ['ввести бонусы', 'добавить новинки', 'улучшить сервис', 'провести обучение'],
      'можно было бы': ['быстрее готовить', 'внимательнее слушать', 'чаще убирать', 'вежливее общаться'],
      'стоит': ['проверить качество', 'обучить персонал', 'улучшить чистоту', 'ускорить процесс'],
      'важно': ['следить за чистотой', 'контролировать качество', 'обучать персонал', 'слушать клиентов'],
      'нужно': ['убирать чаще', 'готовить быстрее', 'общаться вежливее', 'следить за температурой'],
      'имеет смысл': ['пересмотреть процесс', 'провести обучение', 'добавить контроль', 'улучшить сервис']
    }
  }
}

const suggestions = computed(() => {
  const gender = selectedGender.value
  return {
    emotions: [...baseSuggestions[gender].emotions, ...baseSuggestions.common.emotions],
    facts: baseSuggestions.common.facts,
    solutions: baseSuggestions.common.solutions
  }
})

const currentSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
})

const selectedSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
})

const branchCounters = reactive({
  emotions: 0,
  facts: 0,
  solutions: 0
})

function initializeSuggestions() {
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
  currentSuggestions.facts = [...suggestions.value.facts.initial]
  currentSuggestions.solutions = [...suggestions.value.solutions.initial]
}

function onGenderClick(gender) {
  selectedGender.value = gender
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
  selectedSuggestions.emotions = []
  branchCounters.emotions = 0
}

const isFormValid = computed(() => form.coffeeShopAddress.trim())

async function submitForm() {
  if (!isFormValid.value) return

  isSubmitting.value = true

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  submittedTime.value = `${year}-${month}-${day} ${hours}${minutes}${seconds}`

  let clientId = localStorage.getItem('signalclientid')
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + Date.now()
    localStorage.setItem('signalclientid', clientId)
  }

  const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyO-bEv334omRz4i9Dsa4QRMQqx5Wj-67nIbEtLT6suK6MJu7myE1gpjGl7Gc7w0IeeNg/exec'

  const formData = new FormData()
  formData.append('referer', window.location.origin)
  formData.append('clientId', clientId)
  formData.append('ticketNumber', formattedTicketNumber.value)
  formData.append('date', currentDate.value)
  formData.append('submitted', submittedTime.value)
  formData.append('coffeehouse', form.coffeeShopAddress)
  // УДАЛЕНО: name, telegram, emotionalRelease, factualAnalysis, constructiveSuggestions

  try {
    const response = await fetch(API_ENDPOINT, { method: 'POST', body: formData })
    const result = await response.json()

    if (result.status === 'success' || result.processed) {
      console.log('Форма отправлена')
      formSubmitted.value = true
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('Ошибка отправки:', error)
    if (error.message && error.message.includes('quota')) {
      alert('Превышен лимит отправок. Попробуйте через 5 минут.')
    } else {
      alert('Ошибка отправки. Попробуйте ещё раз.')
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  rawTicketNumber.value = String(Math.floor(Math.random() * 900000) + 100000)
  formattedTicketNumber.value = rawTicketNumber.value.slice(0, 3) + '-' + rawTicketNumber.value.slice(3)

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentDate.value = `${year}-${month}-${day} ${hours}${minutes}${seconds}`

  initializeSuggestions()
})

const storyGeneratorRef = ref(null)

const handleShareClick = () => {
  if (storyGeneratorRef.value) {
    storyGeneratorRef.value.generateAndShare()
  }
}
</script>

<style scoped>
:root {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --signal-font-mono: "SF Mono", Monaco, "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace;
}

.signal-form-wrapper {
  font-family: var(--signal-font-sans);
  max-width: 640px;
  margin: 40px auto;
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.signal-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2c2c2f;
}

.signal-form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.signal-tech-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--signal-font-mono);
  font-size: 0.9rem;
  color: #888;
}

.signal-ticket-display {
  background-color: #2a2a2e;
  color: #9b7fb7;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--signal-font-mono);
}

.signal-form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.signal-question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
  border-left: 4px solid var(--accent-color, #444);
}

.signal-question-block.signal-compact {
  padding: 1rem;
  border-left-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.signal-question-label {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  color: #f0f0f0;
  line-height: 1.3;
  width: 100%;
}

.signal-question-help {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.signal-address-select {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--signal-font-sans);
}

.signal-address-select:focus {
  outline: none;
  border-color: #B39DC8;
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px rgba(179, 157, 200, 0.2);
}

.signal-address-select option {
  background-color: #2a2a2e;
  color: #f0f0f0;
}

.signal-address-select option:disabled {
  color: #666;
}

.signal-separator-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, #2c2c2f 20%, #2c2c2f 80%, transparent);
  margin: 2rem 0 1.5rem 0;
}

.signal-controls-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.signal-info-button {
  background: rgba(135, 206, 235, 0.1);
  border: 1px solid rgba(135, 206, 235, 0.3);
  color: #87ceeb;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  height: 32px;
  display: inline-flex;
  align-items: center;
  width: auto;
}

.signal-info-button.signal-info-female {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-info-button.signal-info-female:hover {
  background: rgba(255, 105, 180, 0.2);
  border-color: rgba(255, 105, 180, 0.5);
}

.signal-info-button.signal-info-male {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-info-button.signal-info-male:hover {
  background: rgba(135, 206, 235, 0.2);
  border-color: rgba(135, 206, 235, 0.5);
}

.signal-gender-switch {
  display: flex;
  justify-content: center;
}

.signal-gender-container {
  display: flex;
  background: #2a2a2e;
  border-radius: 20px;
  padding: 4px;
  border: 1px solid #444;
  height: 32px;
  align-items: center;
}

.signal-gender-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 2px;
}

.signal-gender-female {
  background: rgba(255, 105, 180, 0.3);
}

.signal-gender-female.is-active {
  background: #ff69b4;
  box-shadow: 0 0 12px rgba(255, 105, 180, 0.5);
}

.signal-gender-male {
  background: rgba(135, 206, 235, 0.3);
}

.signal-gender-male.is-active {
  background: #87ceeb;
  box-shadow: 0 0 12px rgba(135, 206, 235, 0.5);
}

.signal-gender-btn:hover {
  opacity: 0.7;
  transform: scale(1.05);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.modal {
  background-color: #1E1E20;
  border: 1px solid #2c2c2f;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
}

.modal-body {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-link {
  color: #B39DC8;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.modal-link:hover {
  color: #C5B3D9;
  border-bottom-color: #C5B3D9;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.modal-ok {
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 50%, #C5B3D9 100%);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-size: 200% auto;
  background-position: 25% 50%;
}

.modal-ok:hover {
  background-position: 75% 50%;
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(155, 127, 183, 0.4);
}

.signal-form-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #2c2c2f;
  display: grid;
  grid-template-areas: "button";
  gap: 1.5rem;
  width: 100%;
}

.signal-button-section {
  grid-area: button;
  width: 100%;
}

.signal-submit-btn {
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 50%, #C5B3D9 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  padding: 0.9rem 2rem;
  cursor: pointer;
  transition: all 0.4s ease-out;
  background-size: 200% auto;
  background-position: 25% 50%;
  width: 100%;
  display: block;
}

.signal-submit-btn:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.02);
  box-shadow: 0 10px 20px -5px rgba(155, 127, 183, 0.4);
}

.signal-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Success message */
.signal-success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem 2rem 2rem;
  animation: fadeIn 0.5s ease-out;
}

.signal-success-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.signal-success-text p {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
}

.signal-success-actions {
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;
  width: 100%;
}

.signal-success-actions .signal-telegram-button,
.signal-success-actions .signal-share-btn {
  flex: 1 1 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

.signal-telegram-button {
  background-color: #9b7fb7;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-decoration: none !important;
}

.signal-success-message .signal-telegram-button,
.signal-success-message .signal-telegram-button:hover {
  text-decoration: none !important;
  border-bottom: none !important;
  color: #ffffff !important;
}

.signal-telegram-button:hover {
  background-color: #b399c8;
  transform: scale(1.02);
}

.signal-share-btn {
  background-color: #3a3a3e;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.signal-share-btn:hover {
  background-color: #4a4a4f;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
}

.signal-secondary-link {
  display: block;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #888;
  text-decoration: none;
  border-bottom: none !important;
  transition: color 0.3s;
}

.signal-secondary-link:hover {
  color: #B39DC8;
  text-decoration: underline !important;
  border-bottom: none !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media queries */
@media (max-width: 768px) {
  .signal-form-wrapper {
    padding: 1.5rem;
  }

  .signal-form-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }

  .signal-form-title {
    text-align: center;
  }

  .signal-tech-info {
    justify-content: center;
  }

  .signal-controls-row {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .signal-gender-switch {
    justify-content: center;
  }

  .signal-success-actions {
    flex-direction: column;
  }

  .signal-success-actions .signal-telegram-button,
  .signal-success-actions .signal-share-btn {
    width: 100%;
  }
}
</style>
