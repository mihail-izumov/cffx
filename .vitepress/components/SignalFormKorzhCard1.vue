<script setup>
import { reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import KorzhBadgeCardGenerator from './KorzhBadgeCardGenerator.vue'

// Данные формы
const form = reactive({
  coffeeShopAddress: 'Все кофейни',
  userName: '',
  emotionalRelease: '',
  badge: ''
})

const isSubmitting = ref(false)
const rawTicketNumber = ref('000')
const formattedTicketNumber = ref('000')
const currentDate = ref('')

const badgeCounts = reactive({
  badge1: 0,
  badge2: 0,
  badge3: 0
})

// Ротация
const activeRotator = ref(0)
let rotationInterval = null
const rotationPaused = ref(false)
const phrasesForQuestion1 = [
  'Как ты себя чувствуешь?',
  'Что у тебя на душе?',
  'Какое настроение?'
]
const currentQuestion1 = ref(phrasesForQuestion1[0])
let currentQuestionIndex1 = 0

// Гендер
const selectedGender = ref('female')
const showInfoModal = ref(false)

const genderThemeClass = computed(() => {
  return selectedGender.value === 'female' ? 'kzh-theme-female' : 'kzh-theme-male'
})

// Карточки
const cardTypes = [
  { id: 'badge1', label: 'Сигналка', image: '/img/korzh/badge/korzh-cffx-cup.png' },
  { id: 'badge2', label: 'Круассанчик', image: '/img/korzh/badge/korzh-cffx-cup.png' },
  { id: 'badge3', label: 'Котик', image: '/img/korzh/badge/korzh-cffx-cup.png' }
]

// Трекинг тачей
const touchState = reactive({ startX: 0, startY: 0, isScroll: false })

function handleTouchStart(event) {
  const t = event.touches[0]
  touchState.startX = t.clientX
  touchState.startY = t.clientY
  touchState.isScroll = false
}

function handleTouchMove(event) {
  const t = event.touches[0]
  const deltaX = Math.abs(t.clientX - touchState.startX)
  const deltaY = Math.abs(t.clientY - touchState.startY)
  if (deltaX > 10 || deltaY > 10) touchState.isScroll = true
}

function handleTouchEnd(id) {
  if (touchState.isScroll) return
  toggleCard(id)
}

// Логика переключения карточек
function toggleCard(id) {
  const oldLabel = form.badge ? cardTypes.find(c => c.id === form.badge)?.label : null
  const newLabel = cardTypes.find(c => c.id === id)?.label

  if (oldLabel) {
    const oldPhrase = `Дарю: ${oldLabel} `
    if (form.emotionalRelease.startsWith(oldPhrase)) {
      form.emotionalRelease = form.emotionalRelease.replace(oldPhrase, '')
    }
  }

  if (form.badge === id) {
    form.badge = ''
  } else {
    form.badge = id
    const newPhrase = `Дарю: ${newLabel} `
    form.emotionalRelease = newPhrase + form.emotionalRelease
  }
}

const selectedBadgeImage = computed(() => {
  const card = cardTypes.find(c => c.id === form.badge)
  return card ? card.image : null
})

const selectedBadgeLabel = computed(() => {
  const card = cardTypes.find(c => c.id === form.badge)
  return card ? card.label : null
})

/* =========================
   Алгоритм счетчиков (4–7/день)
   ========================= */

// Детерминированный "random" на основе seed (чтобы у всех было стабильно в пределах дня)
function seededRandom01(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getDayOfYearUTC() {
  const now = new Date()
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0))
  const diff = now - start
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

// Сколько "добавить" за конкретный день для конкретной карточки: 4..7
function dailyGrowthForBadge(dayOfYear, badgeId) {
  // разные badgeId -> разные последовательности
  const badgeSalt =
    badgeId === 'badge1' ? 101 :
    badgeId === 'badge2' ? 202 :
    303

  const r = seededRandom01(dayOfYear * 1000 + badgeSalt) // 0..1
  return 4 + Math.floor(r * 4) // 4..7
}

// Суммарный прирост за период: сумма dailyGrowthForBadge по дням
function sumGrowth(startDayInclusive, endDayInclusive, badgeId) {
  let total = 0
  for (let d = startDayInclusive; d <= endDayInclusive; d++) {
    total += dailyGrowthForBadge(d, badgeId)
  }
  return total
}

function initBadgeCounts() {
  const day = getDayOfYearUTC()
  const startDay = 351 // как было
  const daysPassed = Math.max(0, day - startDay)

  // База роста: 4-7/день, детерминированно
  const growthBase = daysPassed > 0
    ? sumGrowth(startDay + 1, day, 'badge1') // временно, пересчитаем ниже по каждому
    : 0

  // Почасовой бонус тоже сделаем в рамках 0..(добавка за день),
  // чтобы в течение дня числа "шевелились", но не улетали в +10 как раньше.
  const now = new Date()
  const hours = now.getUTCHours()
  const dayProgress = Math.min(1, Math.max(0, hours / 24))

  const savedLocal = localStorage.getItem('korzh_user_clicks')
  let userClicks = { badge1: 0, badge2: 0, badge3: 0 }
  if (savedLocal) {
    try { userClicks = JSON.parse(savedLocal) } catch (e) { console.error(e) }
  }

  // Для каждой карточки:
  // - сумма по дням (4-7/день)
  // - + "часть сегодняшнего дневного шага" (плавно в течение суток)
  // - + небольшая константа (как у вас было: 4/1/7) для различимости
  // - + клики пользователя
  const baseOffsets = { badge1: 4, badge2: 1, badge3: 7 }

  for (const badgeId of Object.keys(badgeCounts)) {
    const totalDaysGrowth = daysPassed > 0 ? sumGrowth(startDay + 1, day, badgeId) : 0
    const todayGrowth = dailyGrowthForBadge(day, badgeId)
    const timeBonus = Math.floor(todayGrowth * dayProgress)

    badgeCounts[badgeId] =
      totalDaysGrowth +
      timeBonus +
      baseOffsets[badgeId] +
      (userClicks[badgeId] || 0)
  }
}

function incrementBadgeCount(id) {
  if (badgeCounts[id] !== undefined) {
    badgeCounts[id]++
    const savedLocal = localStorage.getItem('korzh_user_clicks')
    let userClicks = { badge1: 0, badge2: 0, badge3: 0 }
    if (savedLocal) {
      try { userClicks = JSON.parse(savedLocal) } catch (e) {}
    }
    userClicks[id] = (userClicks[id] || 0) + 1
    localStorage.setItem('korzh_user_clicks', JSON.stringify(userClicks))
  }
}

// === ПОДСКАЗКИ ===
const baseSuggestions = {
  female: {
    emotions: {
      initial: ['поздравляю', 'желаю', 'шлю', 'мой муд', 'официально заявляю', 'признаюсь'],
      'поздравляю': ['любимую кофейню', 'команду', 'себя', 'всех', 'этот мир'],
      'желаю': ['себе', 'лёгкости', 'вдохновения', 'чуда', 'денег'],
      'шлю': ['лучи добра', 'сердечко', 'обнимашки', 'сигнал в космос', 'вайб успеха'],
      'мой муд': ['зимняя сказка', 'шальная императрица', 'энергия главной героини', 'сложный люкс', 'хочу на ручки'],
      'официально заявляю': ['вместо психолога', 'этот кофе', 'мой девиз', 'дедлайны горят', 'я на диете'],
      'признаюсь': ['виню Меркурий', 'согрешила с десертом', 'патчи не спасли', 'я влюбилась', 'без кофе кусаюсь']
    }
  },
  male: {
    emotions: {
      initial: ['поздравляю', 'желаю', 'шлю', 'мой муд', 'официально заявляю', 'признаюсь'],
      'поздравляю': ['любимую кофейню', 'команду', 'себя', 'всех', 'этот мир'],
      'желаю': ['себе', 'мощи', 'прорыва', 'успеха', 'драйва'],
      'шлю': ['лучи добра', 'респект', 'салют', 'сигнал в космос', 'вайб успеха'],
      'мой муд': ['зимняя спячка', 'волк с уолл-стрит', 'тотальный дзен', 'режим терминатора', 'победитель'],
      'официально заявляю': ['вместо психолога', 'этот кофе', 'мой девиз', 'дедлайны горят', 'у меня растущий организм'],
      'признаюсь': ['виню Меркурий', 'съел два десерта', 'спасся кофеином', 'это шедевр', 'не хочу работать']
    }
  },
  common: {
    emotions: {
      'любимую кофейню': ['с Новым годом', 'и Рождеством!', 'с днем рождения', 'с классным сервисом'],
      'команду': ['вы супер', 'люблю вас!', 'так держать', 'с праздником', 'спасибо за труд'],
      'мой девиз': ['— Жить любить кофе пить', '— ни дня без кофе', '— и пусть весь мир подождет'],
      'всех': ['Жить любить кофе пить', 'с праздником', 'вокруг', 'с новой жизнью', 'кто это читает'],
      'этот мир': ['с моим пробуждением', 'с красотой', 'с новым годом', 'с любовью', 'позитивом'],
      'себе': ['лёгкости', 'бытия', 'с перерывом', 'с бодрым утром', 'с правильным выбором'],
      'лучи добра': ['вас', 'просто так', 'всем вокруг', 'персонально вам', 'этому дню'],
      'сердечко': ['команде', 'люблю вас!', 'милому бариста', 'этому городу', 'друзьям'],
      'обнимашки': ['всем котикам', 'команде', 'друзьям', 'крепкие-крепкие'],
      'сигнал в космос': ['все будет супер', 'я здесь', 'прием', 'желание отправлено'],
      'вайб успеха': ['заразительный', 'для всех', 'мощный', '100%', 'бесплатный'],
      'респект': ['за качество', 'за скорость', 'мастерам', 'за подход'],
      'салют': ['всем нашим', 'команде', 'городу', 'друзьям'],
      'зимняя сказка': ['вокруг', 'требует какао', 'за окном', 'начинается здесь'],
      'зимняя спячка': ['отменяется', 'подождет', 'требует кофе', 'до весны'],
      'шальная императрица': ['хочет круассан', 'гуляет', 'на троне', 'отдыхает'],
      'энергия главной героини': ['требует кофе', 'активирована', 'в этом платье', 'сияет'],
      'сложный люкс': ['мое второе имя', 'в действии', 'требует кофе', 'это я'],
      'хочу на ручки': ['и кофе', 'и шоколадку', 'прямо сейчас', 'и заботы'],
      'волк с уолл-стрит': ['заряжен кофеином', 'делает деньги', 'на перерыве', 'строит империю'],
      'тотальный дзен': ['пойман', 'достигнут', 'в этом кресле', 'не нарушать'],
      'режим терминатора': ['активирован', 'после эспрессо', 'вкл', 'загрузка...'],
      'победитель': ['по жизни', 'голода', 'дедлайнов', 'скуки'],
      'вместо психолога': ['у меня бариста', 'у меня этот латте', 'я ем круассан', 'я просто ем'],
      'этот кофе': ['лучше, чем бывший', 'моя новая любовь', 'лучше, чем сон', 'топливо для ракеты'],
      'дедлайны горят': ['а я пью кофе', 'и пусть весь мир подождет', 'но пусть подождут', 'гори они огнем'],
      'я на диете': ['но это не считается', 'с понедельника', 'была 5 минут назад', 'но круассан сам пришел'],
      'у меня растущий организм': ['требует калорий', 'это на массу', 'в ширину', 'силе нужно питание'],
      'виню Меркурий': ['в моем аппетите', 'что мне так вкусно', 'в третьей чашке', 'во всем'],
      'согрешила с десертом': ['и не стыдно', 'было вкусно', 'каюсь', 'отработаем в зале'],
      'патчи не спасли': ['вся надежда на кофе', 'нужен фильтр', 'но капучино спасет', 'день тяжелый'],
      'я влюбилась': ['в этот раф', 'в милого бариста', 'в этот вид', 'в эту булку'],
      'без кофе кусаюсь': ['но сейчас подобрела', 'осторожно', 'срочно латте', 'спасайтесь'],
      'съел два десерта': ['и не лопнул', 'вместо обеда', 'для мозга', 'без сожалений'],
      'спасся кофеином': ['от зомби-апокалипсиса', 'от сна', 'верните меня к жизни', 'батарейка заряжена'],
      'это шедевр': ['без преувеличений', 'кулинарии', 'искусства', 'в моей жизни'],
      'не хочу работать': ['хочу кофе', 'хочу на ручки', 'сегодня выходной', 'ищу вдохновение'],
      'лёгкости': ['бытия', 'в решениях', 'в каждом шаге', 'как пенка', 'в голове'],
      'вдохновения': ['творить', 'на новые свершения', 'жить ярко', 'каждый день'],
      'чуда': ['новогоднего', 'в каждом дне', 'своими руками', 'внезапного'],
      'денег': ['чемодан', 'на все мечты', 'легких', 'мешок', 'и власти'],
      'мощи': ['для рывка', 'в делах', 'характера', 'и силы', 'безлимитной'],
      'прорыва': ['в бизнесе', 'в жизни', 'к новым высотам', 'прямо сейчас'],
      'успеха': ['во всем', 'громкого', 'заслуженного', 'стабильного'],
      'драйва': ['от жизни', 'на работе', 'в каждом дне', 'бешеного']
    }
  }
}

const suggestions = computed(() => {
  const gender = selectedGender.value
  return { emotions: { ...baseSuggestions[gender].emotions, ...baseSuggestions.common.emotions } }
})

const currentSuggestions = reactive({ emotions: [] })
const selectedSuggestions = reactive({ emotions: [] })
const branchCounters = reactive({ emotions: 0 })

function initializeSuggestions() {
  if (suggestions.value && suggestions.value.emotions) filterInitialSuggestions()
}

function filterInitialSuggestions() {
  const allInitial = [...suggestions.value.emotions.initial]
  const currentText = form.emotionalRelease.toLowerCase()
  const filtered = allInitial.filter(phrase => !currentText.includes(phrase.toLowerCase()))
  currentSuggestions.emotions = filtered.length === 0 ? [...allInitial] : filtered
}

watch(() => form.emotionalRelease, () => {
  if (isInitialSuggestions('emotions')) filterInitialSuggestions()
})

watch(selectedGender, () => {
  selectedSuggestions.emotions = []
  branchCounters.emotions = 0
  initializeSuggestions()
})

function onGenderClick(gender) {
  selectedGender.value = gender
}

function isInitialSuggestions(suggestionType) {
  if (suggestionType !== 'emotions') return false
  const initialSet = new Set(suggestions.value.emotions.initial)
  return currentSuggestions.emotions.some(s => initialSet.has(s))
}

function resetSuggestions(suggestionType) {
  if (suggestionType !== 'emotions') return
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
}

function selectSuggestion(fieldName, suggestion, suggestionType) {
  if (suggestionType !== 'emotions') return
  const currentText = form[fieldName].trim()
  const isNewBranch = isInitialSuggestions(suggestionType)

  if (currentText) {
    if (isNewBranch) {
      form[fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1)
      branchCounters[suggestionType]++
    } else {
      form[fieldName] = currentText + ' ' + suggestion
    }
  } else {
    form[fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1)
    branchCounters[suggestionType] = 1
  }

  selectedSuggestions[suggestionType].push(suggestion)
  updateSuggestions(suggestionType, suggestion)
}

function updateSuggestions(suggestionType, selectedWord) {
  if (suggestionType !== 'emotions') return
  const nextSuggestions = suggestions.value[suggestionType][selectedWord]
  if (nextSuggestions && nextSuggestions.length > 0) currentSuggestions[suggestionType] = [...nextSuggestions]
  else filterInitialSuggestions()
}

function startRotation() {
  stopRotation()
  if (rotationPaused.value) return
  rotationInterval = setInterval(() => {
    currentQuestionIndex1 = (currentQuestionIndex1 + 1) % phrasesForQuestion1.length
    currentQuestion1.value = phrasesForQuestion1[currentQuestionIndex1]
  }, 3000)
}

function stopRotation() {
  if (rotationInterval) clearInterval(rotationInterval)
}

function onTextFocus() {
  rotationPaused.value = true
  stopRotation()
}

function onTextBlur() {
  rotationPaused.value = false
  startRotation()
}

const isFormValid = computed(() => {
  return form.coffeeShopAddress.trim().length > 0 &&
    form.emotionalRelease.trim().length > 0
})

function resetForm() {
  form.emotionalRelease = ''
  form.userName = ''
  initializeSuggestions()
}

async function submitForm() {
  if (!isFormValid.value) return
  isSubmitting.value = true
  if (form.badge) incrementBadgeCount(form.badge)

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const submittedTimeValue = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  let clientId = localStorage.getItem('signalclientid')
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now()
    localStorage.setItem('signalclientid', clientId)
  }

  const APIENDPOINT = 'https://script.google.com/macros/s/AKfycbwV-WN52hpuPxCBAIdP9ltrOQ_wYcKFI0u-x7VMFtORdytgVVKHVtMOLt0o-zME2uNY0A/exec'

  const formData = new FormData()
  formData.append('referer', window.location.origin)
  formData.append('clientId', clientId)
  formData.append('ticketNumber', formattedTicketNumber.value)
  formData.append('date', currentDate.value)
  formData.append('submitted', submittedTimeValue)
  formData.append('coffeehouse', form.coffeeShopAddress)
  formData.append('name', form.userName)
  formData.append('emotionalRelease', form.emotionalRelease)
  formData.append('badge', form.badge)
  formData.append('telegram', '')
  formData.append('factualAnalysis', '')
  formData.append('constructiveSuggestions', '')

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(APIENDPOINT, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const result = await response.json()

    if (result.status === 'success' || result.processed) {
      handleShareClick()
      setTimeout(resetForm, 1000)
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    if (error.name === 'AbortError') alert('Большой поток открыток. Попробуйте еще через минуту.')
    else { console.error('Submission error:', error); alert('Ошибка при отправке. Попробуйте еще раз.') }
  } finally {
    isSubmitting.value = false
  }
}

let metaViewport = null
function disableZoom() {
  metaViewport = document.querySelector('meta[name="viewport"]')
  if (metaViewport) {
    metaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
  } else {
    metaViewport = document.createElement('meta')
    metaViewport.name = 'viewport'
    metaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    document.head.appendChild(metaViewport)
  }
}
function enableZoom() {
  if (metaViewport) metaViewport.content = 'width=device-width, initial-scale=1'
}

onMounted(() => {
  disableZoom()

  const randomNum = Math.floor(Math.random() * 901) + 99
  rawTicketNumber.value = String(randomNum)
  formattedTicketNumber.value = rawTicketNumber.value

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentDate.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  initializeSuggestions()
  initBadgeCounts()
  startRotation()
})

onUnmounted(() => {
  enableZoom()
  stopRotation()
})

const storyGeneratorRef = ref(null)
const handleShareClick = () => {
  if (storyGeneratorRef.value) storyGeneratorRef.value.generateAndShare()
}
</script>

<template>
  <div class="kzh-form-wrapper" :class="genderThemeClass" style="touch-action: pan-x pan-y;">
    <form @submit.prevent="submitForm">
      <div class="kzh-form-header">
        <div class="kzh-form-title">Открытка в Корж</div>
        <div class="kzh-tech-info">
          <span class="kzh-info-item">{{ currentDate }}</span>
          <span class="kzh-info-item kzh-ticket-display">{{ formattedTicketNumber }}</span>
        </div>
      </div>

      <div class="kzh-form-section">
        <div class="kzh-location-pure">
          <div class="kzh-select-wrapper">
            <select v-model="form.coffeeShopAddress" class="kzh-address-select" required>
              <option value="Все кофейни">Все кофейни</option>
              <option value="Куйбышева, 103">Куйбышева, 103</option>
              <option value="Льва Толстого, 30Б">Льва Толстого, 30Б</option>
              <option value="Революционная, 101В">Революционная, 101В</option>
              <option value="9 просека 5-я малая линия, 3б">9 просека 5-я малая линия, 3б</option>
              <option value="Самарская, 270">Самарская, 270</option>
              <option value="Дачная, 2к2">Дачная, 2к2</option>
              <option value="Ульяновская, 19">Ульяновская, 19</option>
              <option value="Ново-Садовая, 106Б">Ново-Садовая, 106Б</option>
            </select>
            <div class="kzh-select-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-down-icon lucide-chevron-down">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <div class="kzh-name-input-wrapper">
            <input
              type="text"
              v-model="form.userName"
              class="kzh-address-select"
              placeholder="Ваше имя (необязательно)"
            />
          </div>
        </div>

        <div class="kzh-cards-label first-label">Выберите подарок</div>

        <div class="kzh-cards-container">
          <div
            class="kzh-cards-grid"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
          >
            <div
              v-for="card in cardTypes"
              :key="card.id"
              class="kzh-card"
              :class="{ 'is-active': form.badge === card.id }"
              @click="toggleCard(card.id)"
              @touchend.prevent="handleTouchEnd(card.id)"
            >
              <div class="kzh-card-icon">
                <img :src="card.image" alt="" />
              </div>
              <div class="kzh-card-label">{{ card.label }}</div>
              <div class="kzh-card-count">{{ badgeCounts[card.id] }}</div>
            </div>
          </div>
        </div>

        <div class="kzh-cards-label mood-label">Поделитесь настроением</div>

        <div class="kzh-question-block kzh-no-border">
          <div class="kzh-rotating-phrase-container">
            <transition name="kzh-fade" mode="out-in">
              <p :key="currentQuestion1" class="kzh-question-label">{{ currentQuestion1 }}</p>
            </transition>
          </div>

          <textarea
            v-model="form.emotionalRelease"
            @focus="onTextFocus"
            @blur="onTextBlur"
            rows="3"
            placeholder="Нажмите на слова ниже или пишите сами..."
          ></textarea>

          <div class="kzh-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions.emotions"
              :key="suggestion"
              class="kzh-suggestion-bubble kzh-emotion-bubble"
              @click="selectSuggestion('emotionalRelease', suggestion, 'emotions')"
            >
              {{ suggestion }}
            </div>

            <div
              v-if="!isInitialSuggestions('emotions')"
              class="kzh-suggestion-bubble kzh-reset-bubble kzh-emotion-bubble"
              @click="resetSuggestions('emotions')"
            >
              Сброс
            </div>
          </div>

          <p class="kzh-example-hint" v-html="'<b>Нажимайте</b>, чтобы строить фразы'"></p>
        </div>

        <div class="kzh-bottom-controls-wrapper">
          <div class="kzh-controls-row">
            <button
              type="button"
              class="kzh-info-button"
              @click="showInfoModal = true"
            >
              Инфо
            </button>

            <div class="kzh-gender-switch">
              <div class="kzh-gender-container">
                <div
                  class="kzh-gender-btn kzh-gender-female"
                  :class="{ 'is-active': selectedGender === 'female' }"
                  @click="onGenderClick('female')"
                ></div>
                <div
                  class="kzh-gender-btn kzh-gender-male"
                  :class="{ 'is-active': selectedGender === 'male' }"
                  @click="onGenderClick('male')"
                ></div>
              </div>
            </div>
          </div>

          <p class="kzh-micro-hint">Выберите гендер и подсказки изменятся</p>
        </div>

        <div v-if="showInfoModal" class="kzh-modal-overlay" @click.self="showInfoModal = false">
          <div class="kzh-modal">
            <div class="kzh-modal-title">О Сигнале</div>
            <div class="kzh-modal-body">
              Это система прямой связи. Мы реагируем на каждый сигнал в течение 24 часов.
              <br><br>
              <a href="https://cffx.ru/signals.html" target="_blank" class="kzh-modal-link">Подробнее о системе</a>
            </div>
            <div class="kzh-modal-footer">
              <button type="button" class="kzh-modal-ok" @click="showInfoModal = false">Понятно</button>
            </div>
          </div>
        </div>

        <div class="kzh-form-footer">
          <div class="kzh-button-section">
            <button
              type="submit"
              class="kzh-submit-btn"
              :disabled="!isFormValid || isSubmitting"
            >
              {{ isSubmitting ? 'Создаем магию...' : 'Создать открытку' }}
            </button>
          </div>
        </div>
      </div>
    </form>

    <KorzhBadgeCardGenerator
      ref="storyGeneratorRef"
      :ticket="formattedTicketNumber"
      :date="currentDate.split(' ')[0]"
      :address="form.coffeeShopAddress"
      :all-text="[form.emotionalRelease].filter(t => t && t.trim()).join(' ')"
      :badge-image="selectedBadgeImage"
      :badge-label="selectedBadgeLabel"
      :user-name="form.userName"
    />
  </div>
</template>

<style scoped>
.kzh-name-input-wrapper { margin-top: 12px; }

:root {
  --kzh-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --kzh-font-mono: "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace;
  --kzh-color-female: #ff69b4;
  --kzh-color-male: #87ceeb;
}

.kzh-form-wrapper {
  font-family: var(--kzh-font-sans);
  max-width: 640px;
  margin: 40px auto;
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  user-select: none;
}

.kzh-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2c2c2f;
}

.kzh-form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.kzh-tech-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--kzh-font-mono);
  font-size: 0.9rem;
  color: #888;
}

.kzh-ticket-display {
  background-color: #2a2a2e;
  color: #9b7fb7;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--kzh-font-mono);
}

.kzh-form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* === СЕЛЕКТ И ИКОНКА === */
.kzh-location-pure { width: 100%; margin-bottom: 24px; }

.kzh-select-wrapper { position: relative; width: 100%; }

.kzh-address-select {
  width: 100%;
  background-color: transparent;
  border: 1px solid #444;
  border-radius: 12px;
  padding: 0.9rem 1rem;
  font-size: 1rem;
  color: #fff;
  transition: all 0.3s ease;
  font-family: var(--kzh-font-sans);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}
.kzh-address-select:focus {
  outline: none;
  border-color: #9B7FB7;
  background-color: #242426;
}
.kzh-address-select option { background-color: #1E1E20; color: #fff; }

.kzh-select-icon {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
}
.kzh-address-select:focus + .kzh-select-icon {
  transform: translateY(-50%) rotate(180deg);
  color: #9B7FB7;
}

/* === КАРТОЧКИ === */
.kzh-cards-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
  text-align: center;
}

.mood-label { margin-top: 16px; margin-bottom: 6px; }

.first-label { margin-bottom: 8px; position: relative; z-index: 5; }

.kzh-cards-container { width: 100%; }

/* ВАЖНО: теперь и на десктопе — горизонтальный скролл/слайдер в один ряд */
.kzh-cards-grid {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 25px;
  padding-top: 20px;
  padding-left: 15px;
  margin-left: -15px;
  margin-right: -1.5rem;
  padding-right: 1.5rem;
  scrollbar-width: none;

  /* “прилипание” к карточкам */
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.kzh-cards-grid::-webkit-scrollbar { display: none; }

.kzh-card {
  position: relative;
  aspect-ratio: 1 / 1;
  background: rgba(42, 42, 46, 0.6);
  border: 1px solid #3a3a3e;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transform: translateZ(0);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);

  /* ширина карточки в слайдере */
  min-width: 140px;
  width: 140px;

  /* snap point */
  scroll-snap-align: start;
}

.kzh-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to bottom, transparent 0%, rgba(30, 30, 32, 0.6) 40%, #1e1e20 100%);
  z-index: 1;
  pointer-events: none;
}

.kzh-card-icon img {
  width: 120px;
  height: 120px;
  display: block;
  opacity: 0.8;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
  object-fit: contain;
  z-index: 0;
}

@media (hover: hover) {
  .kzh-card:hover {
    background: rgba(60, 60, 65, 0.4);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  }
  .kzh-card:hover .kzh-card-icon img {
    transform: scale(1.15) rotate(5deg);
    opacity: 1;
    filter: drop-shadow(0 0 15px rgba(255,255,255,0.2));
  }
  .kzh-theme-female .kzh-card:hover { border-color: rgba(255, 105, 180, 0.3); }
  .kzh-theme-male .kzh-card:hover { border-color: rgba(135, 206, 235, 0.3); }
}

.kzh-theme-female .kzh-card.is-active {
  border-color: var(--kzh-color-female);
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.3), inset 0 0 20px rgba(255, 105, 180, 0.1);
  transform: translateY(-4px) scale(1.02);
}
.kzh-theme-male .kzh-card.is-active {
  border-color: var(--kzh-color-male);
  box-shadow: 0 0 20px rgba(135, 206, 235, 0.3), inset 0 0 20px rgba(135, 206, 235, 0.1);
  transform: translateY(-4px) scale(1.02);
}

.kzh-card.is-active .kzh-card-icon img { opacity: 1; transform: scale(1.1); }

.kzh-card-label {
  position: absolute;
  bottom: 12px;
  font-size: 0.85rem;
  color: #fff;
  opacity: 0.8;
  font-weight: 500;
  transition: opacity 0.3s ease;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}
.kzh-card:hover .kzh-card-label,
.kzh-card.is-active .kzh-card-label { opacity: 1; }

/* ЦИФРЫ: прозрачнее + меньше на 3px (было 0.85rem) */
.kzh-card-count {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: calc(0.85rem - 3px);
  color: rgba(255, 255, 255, 0.62);
  font-weight: 600;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

/* === ТЕКСТОВЫЙ БЛОК === */
.kzh-question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
}
.kzh-no-border { border-left: none; }

.kzh-rotating-phrase-container {
  height: 24px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.kzh-question-label {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  color: #f0f0f0;
  line-height: 1.3;
  width: 100%;
}

.kzh-fade-enter-active, .kzh-fade-leave-active { transition: opacity 0.5s ease; }
.kzh-fade-enter-from, .kzh-fade-leave-to { opacity: 0; }

textarea.kzh-address-select,
textarea {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--kzh-font-sans);
  user-select: text !important;
  resize: none;
}

.kzh-theme-female textarea:focus {
  outline: none;
  border-color: var(--kzh-color-female);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2);
}
.kzh-theme-male textarea:focus {
  outline: none;
  border-color: var(--kzh-color-male);
  box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2);
}

/* === БАББЛЫ === */
.kzh-suggestions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.kzh-suggestion-bubble {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.kzh-theme-female .kzh-emotion-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: var(--kzh-color-female);
}
.kzh-theme-female .kzh-emotion-bubble:hover {
  background: var(--kzh-color-female);
  color: #fff;
  transform: scale(1.05);
}

.kzh-theme-male .kzh-emotion-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: var(--kzh-color-male);
}
.kzh-theme-male .kzh-emotion-bubble:hover {
  background: var(--kzh-color-male);
  color: #fff !important;
  transform: scale(1.05);
}

.kzh-reset-bubble {
  font-weight: 600;
  opacity: 0.8;
  border: 1px dashed rgba(255, 255, 255, 0.4) !important;
  color: rgba(255, 255, 255, 0.6) !important;
  background: transparent !important;
}
.kzh-reset-bubble:hover {
  border-color: #fff !important;
  color: #fff !important;
}

.kzh-example-hint {
  font-size: 0.8rem;
  color: #777;
  margin: 0.5rem 0 0 0.25rem;
}

/* === ГЕНДЕР И ИНФО === */
.kzh-bottom-controls-wrapper {
  margin-top: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kzh-controls-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 0;
  padding: 0;
}

.kzh-micro-hint {
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  margin: 4px 0 0 0;
  padding: 0;
  position: relative;
  top: -2px;
}

.kzh-info-button {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  height: 32px;
  color: #ccc;
  display: inline-flex;
  align-items: center;
}
.kzh-info-button:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }

.kzh-gender-switch { display: flex; justify-content: center; }

.kzh-gender-container {
  display: flex;
  background: #2a2a2e;
  border-radius: 20px;
  padding: 4px;
  border: 1px solid #444;
  height: 32px;
  align-items: center;
}

.kzh-gender-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 2px;
}
.kzh-gender-female { background: rgba(255, 105, 180, 0.3); }
.kzh-gender-female.is-active { background: #ff69b4; box-shadow: 0 0 12px rgba(255, 105, 180, 0.5); }
.kzh-gender-male { background: rgba(135, 206, 235, 0.3); }
.kzh-gender-male.is-active { background: #87ceeb; box-shadow: 0 0 12px rgba(135, 206, 235, 0.5); }

/* === FOOTER === */
.kzh-form-footer { margin-top: 1rem; width: 100%; }
.kzh-submit-btn {
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
  width: 100%;
  display: block;
}
.kzh-submit-btn:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.02);
  box-shadow: 0 10px 20px -5px rgba(155, 127, 183, 0.4);
}
.kzh-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* === MODAL === */
.kzh-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex; justify-content: center; align-items: center;
  z-index: 9999; backdrop-filter: blur(4px);
}
.kzh-modal {
  background-color: #1E1E20;
  border: 1px solid #2c2c2f;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: kzhModalFadeIn 0.3s ease-out;
}
@keyframes kzhModalFadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.kzh-modal-title { font-size: 1.4rem; font-weight: 700; color: #fff; margin-bottom: 1rem; text-align: center; }
.kzh-modal-body { font-size: 0.95rem; line-height: 1.6; color: #b0b0b0; margin-bottom: 1.5rem; text-align: center; }
.kzh-modal-link { color: #B39DC8; text-decoration: none; font-weight: 600; }
.kzh-modal-footer { display: flex; justify-content: center; }
.kzh-modal-ok { background: #9B7FB7; color: #fff; border: none; border-radius: 10px; padding: 0.75rem 2rem; cursor: pointer; }

/* Мобилка: оставляем то же поведение (оно теперь совпадает с десктопом) */
@media (max-width: 768px) {
  .kzh-form-wrapper { padding: 1.5rem; }
  .kzh-form-header { flex-direction: column; text-align: center; gap: 0.5rem; }
  .kzh-tech-info { justify-content: center; }

  .first-label { margin-bottom: -16px; }
  textarea { min-height: 180px; }
  .kzh-controls-row { flex-direction: row; justify-content: center; width: 100%; gap: 16px; }
  .kzh-card-icon img { width: 90px; height: 90px; }

  .kzh-info-button { font-size: 17px; height: 42px; padding: 8px 20px; }
  .kzh-gender-container { height: 42px; padding: 5px; }
  .kzh-gender-btn { width: 31px; height: 31px; }
}
</style>
