<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import KorzhStoryGenerator from './KorzhStoryGenerator.vue'

// Данные формы
const form = reactive({
  coffeeShopAddress: '',
  emotionalRelease: '',
  badge: '' // Бывший signalType
})

const isSubmitting = ref(false)
const submittedTime = ref('')
const formSubmitted = ref(false)
const rawTicketNumber = ref(null)
const formattedTicketNumber = ref(null)
const currentDate = ref('')

// Ротация вопросов
const activeRotator = ref(0) 

// Гендер (по умолчанию женский)
const selectedGender = ref('female') 
const showInfoModal = ref(false)

// Динамические классы для цветов гендера
const genderThemeClass = computed(() => {
  return selectedGender.value === 'female' ? 'kzh-theme-female' : 'kzh-theme-male'
})

// === КАРТОЧКИ ===
const cardTypes = [
  { id: 'taste', label: 'Вкус' },
  { id: 'service', label: 'Сервис' },
  { id: 'atmosphere', label: 'Атмосфера' }
]

function toggleCard(id) {
  if (form.badge === id) {
    form.badge = '' 
  } else {
    form.badge = id 
  }
}

// === СИСТЕМА ПОДСКАЗОК ===
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
};

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
  emotions: [],
})

const selectedSuggestions = reactive({
  emotions: [],
})

const branchCounters = reactive({
  emotions: 0,
})

const phrasesForQuestion1 = [
  "Как ты себя чувствуешь?",
  "Что у тебя на душе?",
  "Какое настроение?"
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
  return JSON.stringify(currentSuggestions.emotions) === JSON.stringify(suggestions.value.emotions.initial)
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
      form[fieldName] = currentText + ". " + suggestion.charAt(0).toUpperCase() + suggestion.slice(1)
      branchCounters[suggestionType]++
    } else {
      form[fieldName] = currentText + " " + suggestion
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
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions]
  } else {
    currentSuggestions[suggestionType] = [...suggestions.value[suggestionType].initial]
  }
}

function startRotation(questionNum) {
  stopRotation()
  activeRotator.value = questionNum
  
  if (questionNum === 1) {
    rotationInterval = setInterval(() => {
      currentQuestionIndex1 = (currentQuestionIndex1 + 1) % phrasesForQuestion1.length
      currentQuestion1.value = phrasesForQuestion1[currentQuestionIndex1]
    }, 3000)
  }
}

function stopRotation() {
  if (rotationInterval) clearInterval(rotationInterval)
  activeRotator.value = 0
}

const isFormValid = computed(() => {
  return form.coffeeShopAddress.trim().length > 0 && 
         form.emotionalRelease.trim().length > 0
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
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now()
    localStorage.setItem('signalclientid', clientId)
  }

  const APIENDPOINT = 'https://script.google.com/macros/s/AKfycbyO-bEv334omRz4i9Dsa4QRMQqx5Wj-67nIbEtLT6suK6MJu7myE1gpjGl7Gc7w0IeeNg/exec'

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
  rawTicketNumber.value = String(Math.floor(Math.random() * 900000) + 100000)
  formattedTicketNumber.value = rawTicketNumber.value.slice(0, 3) + '-' + rawTicketNumber.value.slice(3)

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
  <!-- Обертка компонента с динамической темой (kzh-theme-female / kzh-theme-male) -->
  <div class="kzh-form-wrapper" :class="genderThemeClass">
    
    <!-- SUCCESS SCREEN -->
    <div v-if="formSubmitted" class="kzh-success-message">
      <div class="kzh-success-text">
        <h3>Принято!</h3>
        <p>Ваш сигнал: <strong class="kzh-strong">{{ formattedTicketNumber }}</strong></p>
      </div>

      <div class="kzh-success-actions">
        <a
          :href="`https://t.me/AnnaSignal?text=${rawTicketNumber}`"
          target="_blank"
          class="kzh-telegram-button"
        >
          Написать в Telegram
        </a>
        
        <button
           type="button"
           @click="handleShareClick"
           class="kzh-share-btn"
        >
          Поделиться
        </button>
      </div>
      
      <div>
        <a href="/signals" target="_blank" class="kzh-secondary-link">Вернуться</a>
      </div>
    </div>

    <!-- FORM SCREEN -->
    <form v-else @submit.prevent="submitForm">
      <div class="kzh-form-header">
        <div class="kzh-form-title">Открытка в Корж</div>
        <div class="kzh-tech-info">
          <span class="kzh-info-item">{{ currentDate }}</span>
          <span class="kzh-info-item kzh-ticket-display">{{ formattedTicketNumber }}</span>
        </div>
      </div>

      <div class="kzh-form-section">
        
        <!-- КАРТОЧКИ -->
         <div class="kzh-cards-label">Отправьте подарок</div>
         <div class="kzh-cards-grid">
           <div 
             v-for="card in cardTypes" 
             :key="card.id"
             class="kzh-card"
             :class="{ 'is-active': form.badge === card.id }"
             @click="toggleCard(card.id)"
           >
              <div class="kzh-card-icon">
                 <img src="/korzh_badge.svg" alt="" />
              </div>
              <div class="kzh-card-label">{{ card.label }}</div>
           </div>
        </div>

        <!-- ТЕКСТОВЫЙ БЛОК -->
        <div class="kzh-question-block" :class="genderThemeClass">
          <!-- Заголовок "Эмоциональный фон" убран, фраза сразу идет -->
          <div class="kzh-rotating-phrase-container">
             <transition name="kzh-fade" mode="out-in">
               <p :key="currentQuestion1" class="kzh-question-label">{{ currentQuestion1 }}</p>
             </transition>
          </div>

          <textarea
            v-model="form.emotionalRelease"
            @focus="startRotation(1)"
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

        <!-- ГЕНДЕР И ИНФО (Снизу) -->
        <div class="kzh-controls-row">
          <button 
            type="button" 
            class="kzh-info-button"
            :class="[
              selectedGender === 'female' ? 'kzh-info-female' : 'kzh-info-male'
            ]"
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

        <!-- РАЗДЕЛИТЕЛЬ -->
        <div class="kzh-separator-line"></div>

        <!-- ЛОКАЦИЯ (Только селект) -->
        <div class="kzh-location-pure">
          <select v-model="form.coffeeShopAddress" class="kzh-address-select" required>
            <option value="" disabled>Выберите точку</option>
            <option value="Кофе, 103">Кофе, 103</option>
            <option value="Кофе, 30">Кофе, 30</option>
            <option value="Кофе, 101">Кофе, 101</option>
            <option value="9 Просека 5-я линия, 3">9 Просека 5-я линия, 3</option>
            <option value="Кофе, 270">Кофе, 270</option>
            <option value="Кофе, 22">Кофе, 22</option>
            <option value="Кофе, 19">Кофе, 19</option>
            <option value="Садовая-Спасская, 106">Садовая-Спасская, 106</option>
          </select>
        </div>
        
        <!-- МОДАЛКА ИНФО -->
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
                 {{ isSubmitting ? 'Отправка...' : 'Отправить открытку' }}
              </button>
           </div>
        </div>
      </div>
    </form>
    
    <KorzhStoryGenerator
       ref="storyGeneratorRef"
       :ticket="formattedTicketNumber"
       :date="currentDate.split(' ')[0]"
       :address="form.coffeeShopAddress"
       :all-text="[form.emotionalRelease].filter(t => t && t.trim()).join(' ')"
    />
  </div>
</template>

<style scoped>
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

/* === КАРТОЧКИ (SQUARE + LARGE ICON + METAMORPHOSIS + GENDER COLOR) === */
.kzh-cards-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #bbb;
  margin-bottom: 0.5rem;
  text-align: center;
}

.kzh-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 0.5rem;
}

.kzh-card {
  position: relative;
  aspect-ratio: 1 / 1; /* Квадратные */
  background: rgba(42, 42, 46, 0.6); /* Полупрозрачный фон */
  border: 1px solid #3a3a3e;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  backdrop-filter: blur(10px); /* Эффект стекла */
}

/* Иконки в 5 раз больше */
.kzh-card-icon img {
  width: 120px; /* Было 40px -> 200px (слишком много для квадрата, ставим разумный максимум) */
  height: 120px;
  display: block;
  opacity: 0.8;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
  object-fit: contain;
}

/* Эффект Метаморфоз при ховере */
.kzh-card:hover {
  background: rgba(60, 60, 65, 0.4);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.kzh-card:hover .kzh-card-icon img {
  transform: scale(1.15) rotate(5deg);
  opacity: 1;
  filter: drop-shadow(0 0 15px rgba(255,255,255,0.2));
}

/* Активное состояние зависит от темы (гендера) */
.kzh-theme-female .kzh-card.is-active {
  border-color: var(--kzh-color-female);
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.3), inset 0 0 20px rgba(255, 105, 180, 0.1);
}

.kzh-theme-male .kzh-card.is-active {
  border-color: var(--kzh-color-male);
  box-shadow: 0 0 20px rgba(135, 206, 235, 0.3), inset 0 0 20px rgba(135, 206, 235, 0.1);
}

.kzh-card.is-active .kzh-card-icon img {
  opacity: 1;
  transform: scale(1.1);
}

.kzh-card-label {
  position: absolute;
  bottom: 12px;
  font-size: 0.85rem;
  color: #fff;
  opacity: 0.5;
  font-weight: 500;
  transition: opacity 0.3s ease;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8); /* Тень для читаемости поверх большой картинки */
}

.kzh-card:hover .kzh-card-label,
.kzh-card.is-active .kzh-card-label {
  opacity: 0.9;
}

/* === ТЕКСТОВЫЙ БЛОК === */
.kzh-question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
  border-left: 4px solid #444; /* Default */
}

/* Цвета левой полоски блока */
.kzh-theme-female .kzh-question-block {
  border-left-color: var(--kzh-color-female);
}

.kzh-theme-male .kzh-question-block {
  border-left-color: var(--kzh-color-male);
}

.kzh-rotating-phrase-container {
  height: 24px;
  margin-bottom: 0.5rem;
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

.kzh-fade-enter-active, .kzh-fade-leave-active {
  transition: opacity 0.5s ease;
}
.kzh-fade-enter-from, .kzh-fade-leave-to {
  opacity: 0;
}

textarea.kzh-address-select, /* фикс для сброса стилей */
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
}

/* Фокус текстового поля зависит от темы */
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
  user-select: none;
}

/* Цвета бабблов */
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
  color: #000;
  transform: scale(1.05);
}

.kzh-reset-bubble {
  font-weight: 600;
  opacity: 0.8;
  font-size: 0.75rem;
  border-style: dashed !important;
}

.kzh-example-hint {
  font-size: 0.8rem;
  color: #777;
  margin: 0.5rem 0 0 0.25rem;
}

/* === ГЕНДЕР И ИНФО (НИЖНИЙ БЛОК) === */
.kzh-controls-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 0.5rem;
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
  display: inline-flex;
  align-items: center;
}

.kzh-info-female { color: var(--kzh-color-female); border-color: rgba(255, 105, 180, 0.3); }
.kzh-info-male { color: var(--kzh-color-male); border-color: rgba(135, 206, 235, 0.3); }

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

/* === РАЗДЕЛИТЕЛЬ (ГРАДИЕНТ) === */
.kzh-separator-line {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #444 50%, transparent 100%);
  margin: 2rem 0;
  opacity: 0.6;
}

/* === ЛОКАЦИЯ (ЧИСТАЯ) === */
.kzh-location-pure {
  width: 100%;
}

.kzh-address-select {
  width: 100%;
  background-color: transparent; /* Без фона */
  border: 1px solid #444;
  border-radius: 12px;
  padding: 0.9rem 1rem;
  font-size: 1rem;
  color: #fff;
  transition: all 0.3s ease;
  font-family: var(--kzh-font-sans);
  cursor: pointer;
}

.kzh-address-select:focus {
  outline: none;
  border-color: #9B7FB7;
  background-color: #242426;
}
.kzh-address-select option { background-color: #1E1E20; color: #fff; }

/* === FOOTER & BUTTON === */
.kzh-form-footer {
  margin-top: 1rem;
  width: 100%;
}

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

/* === SUCCESS SCREEN === */
.kzh-success-message {
  display: flex; flex-direction: column; align-items: center; text-align: center; padding: 4rem 2rem 2rem 2rem;
  animation: kzhFadeIn 0.5s ease-out;
}
.kzh-success-text h3 { font-size: 1.5rem; color: #fff; margin-bottom: 0.5rem; }
.kzh-success-text p { color: #b0b0b0; margin: 0; }
.kzh-success-actions { display: flex; gap: 12px; margin-top: 1.5rem; width: 100%; }
.kzh-telegram-button, .kzh-share-btn { flex: 1; padding: 0.9rem; border-radius: 12px; font-weight: 600; cursor: pointer; text-align: center; }
.kzh-telegram-button { background-color: #9b7fb7; color: #fff; text-decoration: none; border: none; }
.kzh-share-btn { background-color: #3a3a3e; color: #fff; border: none; }
.kzh-secondary-link { display: block; margin-top: 1.5rem; font-size: 0.85rem; color: #888; text-decoration: none; }

@keyframes kzhFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .kzh-form-wrapper { padding: 1.5rem; }
  .kzh-form-header { flex-direction: column; text-align: center; gap: 0.5rem; }
  .kzh-tech-info { justify-content: center; }
  .kzh-controls-row { flex-direction: row; justify-content: space-between; width: 100%; }
  .kzh-card-icon img { width: 80px; height: 80px; } /* Чуть меньше на моб */
}
</style>
