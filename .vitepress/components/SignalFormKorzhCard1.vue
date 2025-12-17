<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import KorzhStoryGenerator from './KorzhStoryGenerator.vue'

const form = reactive({
  coffeeShopAddress: '',
  emotionalRelease: '',
  badge: '' // выбранная карточка
})

const isSubmitting = ref(false)
const submittedTime = ref('')
const formSubmitted = ref(false)
const rawTicketNumber = ref(null)
const formattedTicketNumber = ref(null)
const currentDate = ref('')

// Ротация вопросов
const activeRotator = ref(0)

// Гендер
const selectedGender = ref('female')
const showInfoModal = ref(false)

const genderClass = computed(() => {
  return selectedGender.value === 'female' ? 'korzhcard-gender-female' : 'korzhcard-gender-male'
})

// КАРТОЧКИ (бейджи)
const cardTypes = [
  { id: 'taste', label: 'Вкус' },
  { id: 'service', label: 'Сервис' },
  { id: 'atmosphere', label: 'Атмосфера' }
]

function toggleCard(id) {
  if (form.badge === id) {
    form.badge = '' // повторный клик снимает выбор
  } else {
    form.badge = id // выбираем одну карточку
  }
}

// ПОДСКАЗКИ
const baseSuggestions = {
  female: {
    emotions: {
      initial: [
        'поздравляю', 'желаю', 'шлю', 'дарю',
        'наслаждаюсь', 'ловлю', 'официально заявляю', 'признаюсь',
        'мой муд', 'виновата', 'вместо психолога', 'этот кофе'
      ],
      'поздравляю': ['любимую кофейню', 'команду', 'себя', 'всех', 'этот мир'],
      'желаю': ['себе', 'лёгкости', 'вдохновения', 'чуда', 'денег'],
      'шлю': ['лучи добра', 'сердечко', 'обнимашки', 'сигнал в космос', 'вайб успеха'],
      'дарю': ['лайк', 'улыбку', 'этот момент', 'пять звезд'],
      'наслаждаюсь': ['этой зимой', 'моментом', 'тишиной', 'свободой', 'вкусом'],
      'ловлю': ['дзен', 'инсайт', 'удачу', 'взгляды', 'поток'],
      'официально заявляю': ['мой девиз', 'дедлайны горят', 'я на диете', 'я счастлива', 'мне вкусно'],
      'признаюсь': ['патчи не спасли', 'согрешили с десертом', 'я влюбилась', 'без кофе кусаюсь', 'режим зомби вкл'],
      'мой муд': ['шальная императрица', 'энергия главной героини', 'сложный люкс', 'осень', 'хочу на ручки'],
      'виновата': ['Ретроградный Меркурий', 'магнитная буря', 'моя сладкая жизнь', 'красивая бариста'],
      'вместо психолога': ['у меня бариста', 'у меня этот латте', 'я ем круассан'],
      'этот кофе': ['лучше, чем бывший', 'моя новая любовь', 'спасает жизни', 'произведение искусства']
    }
  },
  male: {
    emotions: {
      initial: [
        'поздравляю', 'желаю', 'шлю', 'дарю',
        'кайфую от', 'ловлю', 'официально заявляю', 'признаюсь',
        'мой муд', 'виноват', 'вместо психолога', 'этот кофе'
      ],
      'поздравляю': ['любимую кофейню', 'команду', 'себя', 'всех', 'этот мир'],
      'желаю': ['себе', 'мощи', 'прорыва', 'успеха', 'драйва'],
      'шлю': ['лучи добра', 'респект', 'салют', 'сигнал в космос', 'вайб успеха'],
      'дарю': ['лайк', 'отзыв', 'благодарность', 'пять звезд'],
      'кайфую от': ['тишины', 'атмосферы', 'вкуса', 'этой паузы', 'музыки'],
      'ловлю': ['дзен', 'инсайт', 'удачу', 'идеи', 'поток'],
      'официально заявляю': ['мой девиз', 'дедлайны горят', 'у меня растущий организм', 'я заряжен', 'кофе топ'],
      'признаюсь': ['спасся кофеином', 'съел два десерта', 'это шедевр', 'не хочу работать', 'залип тут'],
      'мой муд': ['волк с уолл-стрит', 'тотальный дзен', 'режим терминатора', 'на чилле', 'победитель'],
      'виноват': ['Ретроградный Меркурий', 'вкусный кофе', 'мой аппетит', 'тяжелый люкс'],
      'вместо психолога': ['у меня бариста', 'у меня эспрессо', 'я просто ем'],
      'этот кофе': ['лучше, чем сон', 'топливо для ракеты', 'моя прелесть', 'решает вопросы']
    }
  },
  common: {
    emotions: {
      'любимую кофейню': ['с Новым годом', 'и Рождеством!', 'с днем рождения', 'с классным сервисом', 'с расширением'],
      'мой девиз': ['— Жить любить кофе пить', '— ни дня без кофе', '— и пусть весь мир подождет'],
      'команду': ['вы супер', 'люблю вас!', 'так держать', 'с праздником', 'спасибо за труд'],
      'лайк': ['команде', 'за атмосферу', 'от души', 'вашему кофе', 'не глядя'],
      'этой зимой': ['здесь и сейчас', 'и снегом', 'из окна', 'уютной', 'сказочной'],
      'дзен': ['посреди хаоса', 'города', 'в чашке кофе', 'и гармонию', 'сейчас'],
      'себе': ['лёгкости', 'бытия', 'с перерывом', 'с бодрым утром', 'с правильным выбором'],
      'лучи добра': ['вас', 'просто так', 'всем вокруг', 'персонально вам', 'этому дню'],
      'всех': ['Жить любить кофе пить', 'с праздником', 'вокруг', 'с новой жизнью', 'кто это читает'],
      'сердечко': ['команде', 'люблю вас!', 'бариста', 'этому городу', 'друзьям'],
      'патчи не спасли': ['вся надежда на кофе', 'нужен фильтр', 'но капучино спасет', 'день тяжелый'],
      'согрешили с десертом': ['и не стыдно', 'было вкусно', 'каюсь', 'отработаем в зале'],
      'дедлайны горят': ['а я пью кофе', 'и пусть весь мир подождет', 'но пусть подождут', 'гори они огнем'],
      'спасся кофеином': ['от зомби-апокалипсиса', 'от сна', 'верните меня к жизни', 'батарейка заряжена'],
      'у меня растущий организм': ['требует калорий', 'это на массу', 'в ширину', 'силе нужно питание'],
      'Ретроградный Меркурий': ['поэтому мне нужен этот латте', 'бессилен против кофе', 'испортил планы', 'виноват во всем'],
      'энергия главной героини': ['требует кофе', 'активирована', 'в этом платье', 'сияет'],
      'шальная императрица': ['хочет круассан', 'гуляет', 'на троне', 'отдыхает'],
      'у меня бариста': ['берет дешевле', 'выслушает', 'знает, что мне нужно', 'лечит душу'],
      'лучше, чем бывший': ['однозначно', 'и горячее', 'и не предает', '100%'],
      'лучше, чем сон': ['и вкуснее', 'бодрит мощнее', 'однозначно', 'работает'],
      'волк с уолл-стрит': ['заряжен кофеином', 'делает деньги', 'на перерыве', 'строит империю'],
      'этот мир': ['с моим пробуждением', 'с красотой', 'с новым годом', 'с любовью', 'позитивом'],
      'лёгкости': ['бытия', 'в решениях', 'в каждом шаге', 'как пенка', 'в голове'],
      'вдохновения': ['творить', 'на новые свершения', 'жить ярко', 'каждый день'],
      'чуда': ['новогоднего', 'в каждом дне', 'своими руками', 'внезапного'],
      'денег': ['чемодан', 'на все мечты', 'легких', 'мешок', 'и власти'],
      'сигнал в космос': ['все будет супер', 'я здесь', 'прием', 'желание отправлено'],
      'вайб успеха': ['заразительный', 'для всех', 'мощный', '100%', 'бесплатный'],
      'улыбку': ['вам в ответ', 'на удачу', 'всему миру', 'на память'],
      'этот момент': ['в копилку', 'на память', 'тебе', 'миру'],
      'пять звезд': ['в рейтинг', 'заслуженно', 'за сервис', 'без вопросов'],
      'моментом': ['здесь и сейчас', 'пока кофе горячий', 'остановки времени', 'истины'],
      'тишиной': ['внутри меня', 'посреди шума', 'и покоем', 'перед стартом'],
      'свободой': ['от суеты', 'от телефона', 'мыслить', 'быть собой'],
      'вкусом': ['арабики', 'десерта', 'настоящим', 'любимым', 'жизни'],
      'инсайт': ['гениальный', 'внезапно', 'под кофе', 'для бизнеса'],
      'удачу': ['за хвост', 'в делах', 'сегодня', 'крупную'],
      'я на диете': ['но это не считается', 'с понедельника', 'была 5 минут назад', 'но круассан сам пришел'],
      'я счастлива': ['здесь и сейчас', 'без причины', 'с этим кофе', 'абсолютно'],
      'мне вкусно': ['и точка', 'как никогда', 'очень', 'безумно'],
      'я влюбилась': ['в этот раф', 'в бариста', 'в этот вид', 'в эту булку'],
      'без кофе кусаюсь': ['но сейчас подобрела', 'осторожно', 'срочно латте', 'спасайтесь'],
      'режим зомби вкл': ['нужен антидот', 'мозг оффлайн', 'поднимите мне веки', 'утро добрым не бывает'],
      'магнитная буря': ['не помеха', 'виновата', 'отменяется', 'пройдет'],
      'моя сладкая жизнь': ['начинается здесь', 'в приоритете', 'требует десерта'],
      'красивая бариста': ['сделала мой день', 'улыбнулась', 'варит божественно'],
      'у меня этот латте': ['и мне хорошо', 'вместо тысячи слов', 'лечит нервы'],
      'я ем круассан': ['и пусть весь мир подождет', 'терапевтический', 'молча'],
      'моя новая любовь': ['с первого глотка', 'в чашке', 'навеки'],
      'спасает жизни': ['по утрам', 'уставших людей', 'бухгалтеров', 'молодых мам'],
      'произведение искусства': ['в чашке', 'на тарелке', 'от бариста', 'достойно музея'],
      'мощи': ['для рывка', 'в делах', 'характера', 'и силы', 'безлимитной'],
      'прорыва': ['в бизнесе', 'в жизни', 'к новым высотам', 'прямо сейчас'],
      'успеха': ['во всем', 'громкого', 'заслуженного', 'стабильного'],
      'драйва': ['от жизни', 'на работе', 'в каждом дне', 'бешеного'],
      'респект': ['за качество', 'за скорость', 'мастерам', 'за подход'],
      'салют': ['всем нашим', 'команде', 'городу', 'друзьям'],
      'отзыв': ['честный', 'позитивный', 'на память', 'в книгу жалоб'],
      'благодарность': ['за уют', 'за вкус', 'за прием', 'безмерную'],
      'атмосферы': ['уюта', 'праздника', 'творчества', 'доверия'],
      'этой паузы': ['в делах', 'для себя', 'необходимой', 'сладкой'],
      'музыки': ['в наушниках', 'фоновой', 'любимой', 'в душе'],
      'идеи': ['на миллион', 'для стартапа', 'свежие', 'крутые'],
      'поток': ['энергии', 'творчества', 'мыслей', 'созидания'],
      'я заряжен': ['на успех', 'энергией', 'на 100%', 'кофеином'],
      'кофе топ': ['однозначно', 'лучший в городе', 'рекомендую', 'как всегда'],
      'съел два десерта': ['и не лопнул', 'вместо обеда', 'для мозга', 'без сожалений'],
      'это шедевр': ['без преувеличений', 'кулинарии', 'искусства', 'в моей жизни'],
      'не хочу работать': ['хочу кофе', 'хочу на ручки', 'сегодня выходной', 'ищу вдохновение'],
      'залип тут': ['надолго', 'с комфортом', 'в телефоне', 'смотря в окно'],
      'тотальный дзен': ['пойман', 'достигнут', 'в этом кресле', 'не нарушать'],
      'режим терминатора': ['активирован', 'после эспрессо', 'вкл', 'загрузка...'],
      'на чилле': ['на расслабоне', 'пью кофе', 'и десерт', 'полном'],
      'победитель': ['по жизни', 'голода', 'дедлайнов', 'скуки'],
      'вкусный кофе': ['меня заставил', 'соблазнил', 'виноват', 'причина всего'],
      'мой аппетит': ['разыгрался', 'виноват', 'не остановить', 'знает толк'],
      'тяжелый люкс': ['в деталях', 'этот завтрак', 'я это заслужил', 'моя жизнь'],
      'у меня эспрессо': ['двойной', 'и тишина', 'аргумент', 'вместо сердца'],
      'я просто ем': ['не отвлекайте', 'вкусно', 'и молчу', 'счастье'],
      'топливо для ракеты': ['залито', 'готово', 'поехали', 'высший сорт'],
      'моя прелесть': ['горячая', 'в чашке', 'никому не дам', 'моя'],
      'решает вопросы': ['с утра', 'сложные', 'быстро', 'без слов'],
      'обнимашки': ['всем котикам', 'команде', 'друзьям', 'крепкие-крепкие'],
      'вас': ['просто так', 'с наступающим', 'с новым днем', 'от души'],
      'своими руками': ['создаем', 'творим', 'делаем'],
      'внезапного': ['и приятного', 'как этот кофе', 'сегодня'],
      'новогоднего': ['настроения', 'чуда', 'счастья', 'волшебства'],
      'в каждом дне': ['ищите радость', 'будьте счастливы', 'улыбайтесь'],
      'взгляды': ['восхищенные', 'на себе', 'прохожих', 'загадочные'],
      'сложный люкс': ['мое второе имя', 'в действии', 'требует кофе', 'это я'],
      'осень': ['в душе', 'за окном', 'требует какао', 'такая осень'],
      'хочу на ручки': ['и кофе', 'и шоколадку', 'прямо сейчас', 'и заботы']
    }
  }
}

const suggestions = computed(() => {
  const gender = selectedGender.value
  return {
    emotions: {
      ...baseSuggestions[gender].emotions,
      ...baseSuggestions.common.emotions
    }
  }
})

const currentSuggestions = reactive({
  emotions: []
})

const selectedSuggestions = reactive({
  emotions: []
})

const branchCounters = reactive({
  emotions: 0
})

const phrasesForQuestion1 = [
  'Как ты себя чувствуешь?',
  'Что у тебя на душе?',
  'Какое настроение?'
]

const currentQuestion1 = ref(phrasesForQuestion1[0])
let rotationInterval = null
let currentQuestionIndex1 = 0

function initializeSuggestions() {
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
}

function onGenderClick(gender) {
  selectedGender.value = gender
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
  selectedSuggestions.emotions = []
  branchCounters.emotions = 0
}

function isInitialSuggestions(suggestionType) {
  if (suggestionType !== 'emotions') return false
  return JSON.stringify(currentSuggestions.emotions) === JSON.stringify(
    suggestions.value.emotions.initial
  )
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
      form[fieldName] =
        currentText +
        '. ' +
        suggestion.charAt(0).toUpperCase() +
        suggestion.slice(1)
      branchCounters[suggestionType]++
    } else {
      form[fieldName] = currentText + ' ' + suggestion
    }
  } else {
    form[fieldName] =
      suggestion.charAt(0).toUpperCase() + suggestion.slice(1)
    branchCounters[suggestionType] = 1
  }

  selectedSuggestions[suggestionType].push(suggestion)
  updateSuggestions(suggestionType, suggestion)
}

function updateSuggestions(suggestionType, selectedWord) {
  if (suggestionType !== 'emotions') return

  const nextSuggestions = suggestions.value[suggestionType][selectedWord]
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions]
  } else {
    currentSuggestions[suggestionType] = [
      ...suggestions.value[suggestionType].initial
    ]
  }
}

function startRotation(questionNum) {
  stopRotation()
  activeRotator.value = questionNum

  if (questionNum === 1) {
    rotationInterval = setInterval(() => {
      currentQuestionIndex1 =
        (currentQuestionIndex1 + 1) % phrasesForQuestion1.length
      currentQuestion1.value = phrasesForQuestion1[currentQuestionIndex1]
    }, 3000)
  }
}

function stopRotation() {
  if (rotationInterval) clearInterval(rotationInterval)
  activeRotator.value = 0
}

// Валидация: адрес + эмоции
const isFormValid = computed(() => {
  return (
    form.coffeeShopAddress.trim().length > 0 &&
    form.emotionalRelease.trim().length > 0
  )
})

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

  submittedTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  let clientId = localStorage.getItem('signalclientid')
  if (!clientId) {
    clientId =
      'client_' +
      Math.random().toString(36).substring(2, 15) +
      '_' +
      Date.now()
    localStorage.setItem('signalclientid', clientId)
  }

  const APIENDPOINT =
    'https://script.google.com/macros/s/AKfycbyO-bEv334omRz4i9Dsa4QRMQqx5Wj-67nIbEtLT6suK6MJu7myE1gpjGl7Gc7w0IeeNg/exec'

  const formData = new FormData()
  formData.append('referer', window.location.origin)
  formData.append('clientId', clientId)
  formData.append('ticketNumber', formattedTicketNumber.value)
  formData.append('date', currentDate.value)
  formData.append('submitted', submittedTime.value)
  formData.append('coffeehouse', form.coffeeShopAddress)
  formData.append('emotionalRelease', form.emotionalRelease)
  formData.append('badge', form.badge)

  formData.append('name', '')
  formData.append('telegram', '')
  formData.append('factualAnalysis', '')
  formData.append('constructiveSuggestions', '')

  try {
    const response = await fetch(APIENDPOINT, {
      method: 'POST',
      body: formData
    })
    const result = await response.json()

    if (result.status === 'success' || result.processed) {
      console.log('Success:', result)
      formSubmitted.value = true
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('Submission error:', error)
    if (error.message && error.message.includes('quota')) {
      alert('Слишком много запросов. Подождите пару минут.')
    } else {
      alert('Ошибка при отправке. Попробуйте еще раз.')
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  rawTicketNumber.value = String(
    Math.floor(Math.random() * 900000) + 100000
  )
  formattedTicketNumber.value =
    rawTicketNumber.value.slice(0, 3) +
    '-' +
    rawTicketNumber.value.slice(3)

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentDate.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  initializeSuggestions()
})

onUnmounted(() => {
  stopRotation()
})

const storyGeneratorRef = ref(null)
const handleShareClick = () => {
  if (storyGeneratorRef.value) {
    storyGeneratorRef.value.generateAndShare()
  }
}
</script>

<template>
  <div class="korzhcard-form-wrapper">
    <!-- 1. Success Message Wrapper -->
    <div v-if="formSubmitted" class="korzhcard-success-message">
      <div class="korzhcard-success-text">
        <h3>Принято!</h3>
        <p>Ваш сигнал: <strong>{{ formattedTicketNumber }}</strong></p>
      </div>

      <div class="korzhcard-success-actions">
        <a
          :href="`https://t.me/AnnaSignal?text=${rawTicketNumber}`"
          target="_blank"
          class="korzhcard-telegram-button"
        >
          Написать в Telegram
        </a>

        <button
          type="button"
          @click="handleShareClick"
          class="korzhcard-share-btn"
        >
          Поделиться
        </button>
      </div>

      <div>
        <a
          href="/signals"
          target="_blank"
          class="korzhcard-secondary-link"
        >
          Вернуться
        </a>
      </div>
    </div>

    <!-- 2. Form Wrapper -->
    <form v-else @submit.prevent="submitForm">
      <div class="korzhcard-form-header">
        <div class="korzhcard-form-title">Открытка в Корж</div>
        <div class="korzhcard-tech-info">
          <span class="korzhcard-info-item">{{ currentDate }}</span>
          <span class="korzhcard-info-item korzhcard-ticket-display">
            {{ formattedTicketNumber }}
          </span>
        </div>
      </div>

      <div class="korzhcard-form-section">
        <!-- ЕДИНСТВЕННЫЙ РАЗДЕЛИТЕЛЬ -->
        <div class="korzhcard-separator-line"></div>

        <!-- ЛОКАЦИЯ: только селект -->
        <select
          v-model="form.coffeeShopAddress"
          class="korzhcard-address-select"
          required
        >
          <option value="" disabled>Выберите точку</option>
          <option value="Кофе, 103">Кофе, 103</option>
          <option value="Кофе, 30">Кофе, 30</option>
          <option value="Кофе, 101">Кофе, 101</option>
          <option value="9 Просека 5-я линия, 3">
            9 Просека 5-я линия, 3
          </option>
          <option value="Кофе, 270">Кофе, 270</option>
          <option value="Кофе, 22">Кофе, 22</option>
          <option value="Кофе, 19">Кофе, 19</option>
          <option value="Садовая-Спасская, 106">
            Садовая-Спасская, 106
          </option>
        </select>

        <!-- БЛОК КАРТОЧЕК -->
        <div class="korzhcard-cards-block">
          <div class="korzhcard-cards-title">Отправьте подарок</div>

          <div class="korzhcard-cards-grid">
            <div
              v-for="card in cardTypes"
              :key="card.id"
              class="korzhcard-card"
              :class="{
                'is-active': form.badge === card.id,
                'korzhcard-card-female': selectedGender === 'female',
                'korzhcard-card-male': selectedGender === 'male'
              }"
              :style="{
                '--korzhcard-gender-color':
                  selectedGender === 'female' ? '#ff69b4' : '#87ceeb'
              }"
              @click="toggleCard(card.id)"
            >
              <div class="korzhcard-card-inner">
                <div class="korzhcard-card-icon">
                  <img src="/korzh_badge.svg" alt="" />
                </div>
                <div class="korzhcard-card-label">
                  {{ card.label }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ЭМОЦИИ -->
        <div
          class="korzhcard-question-block"
          :class="genderClass"
          style="--accent-color: #A972FF;"
        >
          <div class="korzhcard-rotating-phrase-container">
            <transition name="korzhcard-fade" mode="out-in">
              <p
                :key="currentQuestion1"
                class="korzhcard-question-label"
              >
                {{ currentQuestion1 }}
              </p>
            </transition>
          </div>

          <textarea
            v-model="form.emotionalRelease"
            @focus="startRotation(1)"
            rows="3"
            placeholder="Нажмите на слова ниже или пишите сами..."
          ></textarea>

          <div class="korzhcard-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions.emotions"
              :key="suggestion"
              class="korzhcard-suggestion-bubble korzhcard-emotion-bubble"
              @click="
                selectSuggestion(
                  'emotionalRelease',
                  suggestion,
                  'emotions'
                )
              "
            >
              {{ suggestion }}
            </div>

            <div
              v-if="!isInitialSuggestions('emotions')"
              class="korzhcard-suggestion-bubble korzhcard-reset-bubble korzhcard-emotion-bubble"
              @click="resetSuggestions('emotions')"
            >
              Сброс
            </div>
          </div>

          <p
            class="korzhcard-example-hint"
            v-html="'<b>Нажимайте</b>, чтобы строить фразы'"
          ></p>
        </div>

        <!-- ИНФО + ПЕРЕКЛЮЧАТЕЛЬ ГЕНДЕРА (ПОД ПОДСКАЗКАМИ) -->
        <div class="korzhcard-controls-row">
          <button
            type="button"
            class="korzhcard-info-button"
            :class="[
              selectedGender === 'female'
                ? 'korzhcard-info-female'
                : 'korzhcard-info-male'
            ]"
            @click="showInfoModal = true"
          >
            Инфо
          </button>

          <div class="korzhcard-gender-switch">
            <div class="korzhcard-gender-container">
              <div
                class="korzhcard-gender-btn korzhcard-gender-female"
                :class="{
                  'is-active': selectedGender === 'female'
                }"
                @click="onGenderClick('female')"
              ></div>
              <div
                class="korzhcard-gender-btn korzhcard-gender-male"
                :class="{
                  'is-active': selectedGender === 'male'
                }"
                @click="onGenderClick('male')"
              ></div>
            </div>
          </div>
        </div>

        <!-- МОДАЛКА ИНФО -->
        <div
          v-if="showInfoModal"
          class="korzhcard-modal-overlay"
          @click.self="showInfoModal = false"
        >
          <div class="korzhcard-modal">
            <div class="korzhcard-modal-title">О Сигнале</div>
            <div class="korzhcard-modal-body">
              Это система прямой связи. Мы реагируем на каждый
              сигнал в течение 24 часов.
              <br /><br />
              <a
                href="https://cffx.ru/signals.html"
                target="_blank"
                class="korzhcard-modal-link"
              >
                Подробнее о системе
              </a>
            </div>
            <div class="korzhcard-modal-footer">
              <button
                type="button"
                class="korzhcard-modal-ok"
                @click="showInfoModal = false"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>

        <div
          class="korzhcard-form-footer"
          style="grid-template-areas: 'button';"
        >
          <div class="korzhcard-button-section">
            <button
              type="submit"
              class="korzhcard-submit-btn"
              :disabled="!isFormValid || isSubmitting"
            >
              {{ isSubmitting ? 'Отправка...' : 'Отправить сигнал' }}
            </button>
          </div>
        </div>
      </div>
    </form>

    <!-- 3. Генератор истории -->
    <KorzhStoryGenerator
      ref="storyGeneratorRef"
      :ticket="formattedTicketNumber"
      :date="currentDate.split(' ')[0]"
      :address="form.coffeeShopAddress"
      :all-text="[form.emotionalRelease]
        .filter(t => t && t.trim())
        .join(' ')"
    />
  </div>
</template>

<style scoped>
:root {
  --korzhcard-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Helvetica, Arial, sans-serif;
  --korzhcard-font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code',
    'Droid Sans Mono', 'Source Code Pro', monospace;
}

.korzhcard-form-wrapper {
  font-family: var(--korzhcard-font-sans);
  max-width: 640px;
  margin: 40px auto;
  background-color: #1e1e20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.korzhcard-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2c2c2f;
}

.korzhcard-form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.korzhcard-tech-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--korzhcard-font-mono);
  font-size: 0.9rem;
  color: #888;
}

.korzhcard-info-item {
  opacity: 0.9;
}

.korzhcard-ticket-display {
  background-color: #2a2a2e;
  color: #9b7fb7;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--korzhcard-font-mono);
}

.korzhcard-form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ЕДИНСТВЕННЫЙ РАЗДЕЛИТЕЛЬ */
.korzhcard-separator-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(44, 44, 47, 0) 0%,
    rgba(44, 44, 47, 1) 50%,
    rgba(44, 44, 47, 0) 100%
  );
  margin: 0 0 1rem 0;
}

/* Селект локаций */
.korzhcard-address-select {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--korzhcard-font-sans);
}

.korzhcard-address-select:focus {
  outline: none;
  border-color: #b39dc8;
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px rgba(179, 157, 200, 0.2);
}

.korzhcard-address-select option {
  background-color: #2a2a2e;
  color: #f0f0f0;
}

/* КАРТОЧКИ БЕЙДЖЕЙ */
.korzhcard-cards-block {
  margin-top: 0.5rem;
}

.korzhcard-cards-title {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.75rem;
}

.korzhcard-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.korzhcard-card {
  position: relative;
  background: radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.05),
      transparent 55%
    ),
    #242426;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease,
    background 0.35s ease;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Метаморфоз‑обводка */
.korzhcard-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: conic-gradient(
    from 140deg,
    rgba(255, 255, 255, 0) 0deg,
    rgba(255, 255, 255, 0.02) 60deg,
    color-mix(
      in srgb,
      var(--korzhcard-gender-color, #a972ff) 70%,
      transparent
    )
      120deg,
    rgba(255, 255, 255, 0.02) 210deg,
    rgba(255, 255, 255, 0) 360deg
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.6;
  transform: scale(1);
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
}

.korzhcard-card-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: radial-gradient(
      circle at bottom right,
      rgba(169, 114, 255, 0.12),
      transparent 55%
    ),
    rgba(36, 36, 38, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* Картинка в 5 раз больше (с ограничением по карточке) */
.korzhcard-card-icon img {
  width: 200px;
  height: 200px;
  max-width: 80%;
  max-height: 80%;
  display: block;
  opacity: 0.9;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.korzhcard-card-label {
  font-size: 0.8rem;
  color: #ffffff;
  opacity: 0.55;
  font-weight: 500;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

/* Ховер и активное состояние — эффект метаморфоз */
.korzhcard-card:hover,
.korzhcard-card.is-active {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.45);
  background: radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.08),
      transparent 60%
    ),
    #27272a;
}

.korzhcard-card:hover::before,
.korzhcard-card.is-active::before {
  opacity: 1;
  transform: scale(1.03);
  animation: korzhcard-metaborder 2.4s linear infinite;
}

.korzhcard-card:hover .korzhcard-card-icon img,
.korzhcard-card.is-active .korzhcard-card-icon img {
  opacity: 1;
  transform: scale(1.02);
}

.korzhcard-card:hover .korzhcard-card-label,
.korzhcard-card.is-active .korzhcard-card-label {
  opacity: 0.95;
  transform: translateY(1px);
}

/* Цвет бордера по гендеру (через переменную) */
.korzhcard-card-female {
  --korzhcard-gender-color: #ff69b4;
}

.korzhcard-card-male {
  --korzhcard-gender-color: #87ceeb;
}

@keyframes korzhcard-metaborder {
  0% {
    transform: scale(1.03) rotate(0deg);
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  100% {
    transform: scale(1.03) rotate(0deg);
  }
}

/* Ротирующий вопрос */
.korzhcard-rotating-phrase-container {
  height: 52px;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}

.korzhcard-question-label {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  color: #f0f0f0;
  line-height: 1.3;
  width: 100%;
}

/* Транзишн для текста */
.korzhcard-fade-enter-active,
.korzhcard-fade-leave-active {
  transition: opacity 0.5s ease;
}
.korzhcard-fade-enter-from,
.korzhcard-fade-leave-to {
  opacity: 0;
}

/* Блок с эмоциями */
.korzhcard-question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
  border-left: 4px solid var(--accent-color, #444);
}

/* Гендерные окраски */
.korzhcard-question-block.korzhcard-gender-female {
  border-left-color: #ff69b4 !important;
}

.korzhcard-question-block.korzhcard-gender-female
  .korzhcard-emotion-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.korzhcard-question-block.korzhcard-gender-female
  .korzhcard-emotion-bubble:hover {
  background: #ff69b4;
  color: #fff;
}

.korzhcard-question-block.korzhcard-gender-male {
  border-left-color: #87ceeb !important;
}

.korzhcard-question-block.korzhcard-gender-male
  .korzhcard-emotion-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.korzhcard-question-block.korzhcard-gender-male
  .korzhcard-emotion-bubble:hover {
  background: #87ceeb;
  color: #000;
}

.korzhcard-question-block.korzhcard-gender-female textarea:focus {
  border-color: #ff69b4 !important;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2) !important;
}

.korzhcard-question-block.korzhcard-gender-male textarea:focus {
  border-color: #87ceeb !important;
  box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2) !important;
}

/* Текстовые поля */
textarea,
input {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--korzhcard-font-sans);
}

textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--accent-color) 20%, transparent);
}

/* Подсказки */
.korzhcard-suggestions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.korzhcard-suggestion-bubble {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  user-select: none;
}

.korzhcard-emotion-bubble {
  background: rgba(169, 114, 255, 0.1);
  border-color: rgba(169, 114, 255, 0.3);
  color: #a972ff;
}

.korzhcard-emotion-bubble:hover {
  background: #a972ff;
  color: #000;
  transform: scale(1.05);
}

.korzhcard-reset-bubble {
  font-weight: 600;
  opacity: 0.8;
  font-size: 0.75rem;
  border-style: dashed !important;
}

.korzhcard-reset-bubble:hover {
  opacity: 1;
}

.korzhcard-example-hint {
  font-size: 0.8rem;
  color: #777;
  margin: 0.5rem 0 0 0.25rem;
}

.korzhcard-example-hint b {
  color: #aaa;
  font-weight: 600;
}

/* Инфо + переключатель гендера */
.korzhcard-controls-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.korzhcard-info-button {
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

.korzhcard-info-button.korzhcard-info-female {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.korzhcard-info-button.korzhcard-info-female:hover {
  background: rgba(255, 105, 180, 0.2);
  border-color: rgba(255, 105, 180, 0.5);
}

.korzhcard-info-button.korzhcard-info-male {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.korzhcard-info-button.korzhcard-info-male:hover {
  background: rgba(135, 206, 235, 0.2);
  border-color: rgba(135, 206, 235, 0.5);
}

.korzhcard-gender-switch {
  display: flex;
  justify-content: center;
}

.korzhcard-gender-container {
  display: flex;
  background: #2a2a2e;
  border-radius: 20px;
  padding: 4px;
  border: 1px solid #444;
  height: 32px;
  align-items: center;
}

.korzhcard-gender-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 2px;
}

.korzhcard-gender-female {
  background: rgba(255, 105, 180, 0.3);
}

.korzhcard-gender-female.is-active {
  background: #ff69b4;
  box-shadow: 0 0 12px rgba(255, 105, 180, 0.5);
}

.korzhcard-gender-male {
  background: rgba(135, 206, 235, 0.3);
}

.korzhcard-gender-male.is-active {
  background: #87ceeb;
  box-shadow: 0 0 12px rgba(135, 206, 235, 0.5);
}

.korzhcard-gender-btn:hover {
  opacity: 0.7;
  transform: scale(1.05);
}

/* Модалка */
.korzhcard-modal-overlay {
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

.korzhcard-modal {
  background-color: #1e1e20;
  border: 1px solid #2c2c2f;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: korzhcard-modal-fade-in 0.3s ease-out;
}

@keyframes korzhcard-modal-fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.korzhcard-modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
}

.korzhcard-modal-body {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.korzhcard-modal-link {
  color: #b39dc8;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.korzhcard-modal-link:hover {
  color: #c5b3d9;
  border-bottom-color: #c5b3d9;
}

.korzhcard-modal-footer {
  display: flex;
  justify-content: center;
}

.korzhcard-modal-ok {
  background: linear-gradient(
    90deg,
    #9b7fb7 0%,
    #b39dc8 50%,
    #c5b3d9 100%
  );
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

.korzhcard-modal-ok:hover {
  background-position: 75% 50%;
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(155, 127, 183, 0.4);
}

/* Футер формы */
.korzhcard-form-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #2c2c2f;
  display: grid;
  grid-template-areas: 'button';
  gap: 1.5rem;
  width: 100%;
}

.korzhcard-button-section {
  grid-area: button;
  width: 100%;
}

.korzhcard-submit-btn {
  background: linear-gradient(
    90deg,
    #9b7fb7 0%,
    #b39dc8 50%,
    #c5b3d9 100%
  );
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

.korzhcard-submit-btn:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.02);
  box-shadow: 0 10px 20px -5px rgba(155, 127, 183, 0.4);
}

.korzhcard-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Success‑экран */
.korzhcard-success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem 2rem 2rem;
  animation: korzhcard-fade-in 0.5s ease-out;
}

.korzhcard-success-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.korzhcard-success-text p {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
}

.korzhcard-success-actions {
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;
  width: 100%;
}

.korzhcard-success-actions .korzhcard-telegram-button,
.korzhcard-success-actions .korzhcard-share-btn {
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

.korzhcard-telegram-button {
  background-color: #9b7fb7;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-decoration: none !important;
}

.korzhcard-telegram-button:hover {
  background-color: #b399c8;
  transform: scale(1.02);
}

.korzhcard-share-btn {
  background-color: #3a3a3e;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.korzhcard-share-btn:hover {
  background-color: #4a4a4f;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
}

.korzhcard-secondary-link {
  display: block;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #888;
  text-decoration: none;
  border-bottom: none !important;
  transition: color 0.3s;
}

.korzhcard-secondary-link:hover {
  color: #b39dc8;
  text-decoration: underline !important;
  border-bottom: none !important;
}

@keyframes korzhcard-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптив */
@media (max-width: 768px) {
  .korzhcard-form-wrapper {
    padding: 1.5rem;
  }
  .korzhcard-form-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
  .korzhcard-tech-info {
    justify-content: center;
  }
  .korzhcard-rotating-phrase-container {
    height: 65px;
  }
  .korzhcard-question-label {
    font-size: 0.95rem;
  }
  .korzhcard-suggestions-container {
    gap: 0.4rem;
  }
  .korzhcard-suggestion-bubble {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
  }
  /* Инфо + гендер в одну строку */
  .korzhcard-controls-row {
    flex-direction: row;
    justify-content: center;
  }
  .korzhcard-success-actions {
    flex-direction: column;
  }
  .korzhcard-success-actions .korzhcard-telegram-button,
  .korzhcard-success-actions .korzhcard-share-btn {
    width: 100%;
  }
}
</style>
