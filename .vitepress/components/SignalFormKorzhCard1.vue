<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import KorzhStoryGenerator from './KorzhStoryGenerator.vue'

const form = reactive({
  coffeeShopAddress: '',
  emotionalRelease: '',
  badge: '' // (10) было signalType -> badge
})

const isSubmitting = ref(false)
const submittedTime = ref('')
const formSubmitted = ref(false)
const rawTicketNumber = ref(null)
const formattedTicketNumber = ref(null)
const currentDate = ref('')

/* Ротация вопросов (только эмоции) */
const activeRotator = ref(0)
const phrasesForQuestion1 = ["Как ты себя чувствуешь?", "Что у тебя на душе?", "Какое настроение?"]
const currentQuestion1 = ref(phrasesForQuestion1[0])
let rotationInterval = null
let currentQuestionIndex1 = 0

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

/* Гендер */
const selectedGender = ref('female')
const showInfoModal = ref(false)

const genderClass = computed(() => {
  return selectedGender.value === 'female' ? 'kp-gender-female' : 'kp-gender-male'
})

const cardAccent = computed(() => {
  return selectedGender.value === 'female' ? '#ff69b4' : '#87ceeb'
})

function onGenderClick(gender) {
  selectedGender.value = gender
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
  selectedSuggestions.emotions = []
  branchCounters.emotions = 0
}

/* (1)(4)(6) Карточки-подарки */
const badgeCards = [
  { id: 'taste', label: 'Вкус' },
  { id: 'service', label: 'Сервис' },
  { id: 'atmosphere', label: 'Атмосфера' }
]

function toggleBadge(id) {
  form.badge = form.badge === id ? '' : id
}

/* Подсказки (ваш исходный набор) */
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

const currentSuggestions = reactive({ emotions: [] })
const selectedSuggestions = reactive({ emotions: [] })
const branchCounters = reactive({ emotions: 0 })

function initializeSuggestions() {
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
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
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions]
  } else {
    currentSuggestions[suggestionType] = [...suggestions.value[suggestionType].initial]
  }
}

/* Валидация */
const isFormValid = computed(() => {
  return form.coffeeShopAddress.trim().length > 0 && form.emotionalRelease.trim().length > 0
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
    const response = await fetch(APIENDPOINT, { method: 'POST', body: formData })
    const result = await response.json()

    if (result.status === 'success' || result.processed) {
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

/* Story generator */
const storyGeneratorRef = ref(null)
const handleShareClick = () => {
  if (storyGeneratorRef.value) storyGeneratorRef.value.generateAndShare()
}
</script>

<template>
  <div class="kp-wrapper" :style="{ '--kp-card-accent': cardAccent }">
    <!-- Success -->
    <div v-if="formSubmitted" class="kp-success">
      <div class="kp-success-text">
        <h3>Принято!</h3>
        <p>Ваш сигнал: <strong class="kp-strong">{{ formattedTicketNumber }}</strong></p>
      </div>

      <div class="kp-success-actions">
        <a
          :href="`https://t.me/AnnaSignal?text=${rawTicketNumber}`"
          target="_blank"
          class="kp-telegram-btn"
        >
          Написать в Telegram
        </a>

        <button type="button" @click="handleShareClick" class="kp-share-btn">
          Поделиться
        </button>
      </div>

      <div>
        <a href="/signals" target="_blank" class="kp-secondary-link">Вернуться</a>
      </div>
    </div>

    <!-- Form -->
    <form v-else class="kp-form" @submit.prevent="submitForm">
      <div class="kp-header">
        <!-- (3) -->
        <div class="kp-title">Открытка в Корж</div>
        <div class="kp-tech">
          <span class="kp-tech-item">{{ currentDate }}</span>
          <span class="kp-ticket">{{ formattedTicketNumber }}</span>
        </div>
      </div>

      <!-- (9) единственный разделитель — над локацией -->
      <div class="kp-sep"></div>

      <!-- (2) Только выпадающий список -->
      <select v-model="form.coffeeShopAddress" class="kp-select" required>
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

      <!-- (7) Заголовок над карточками -->
      <div class="kp-small-title">Отправьте подарок</div>

      <!-- Cards -->
      <div class="kp-cards">
        <button
          v-for="card in badgeCards"
          :key="card.id"
          type="button"
          class="kp-card"
          :class="{ 'is-active': form.badge === card.id }"
          @click="toggleBadge(card.id)"
        >
          <span class="kp-card-bg" aria-hidden="true"></span>

          <span class="kp-card-content">
            <!-- (1) Картинка в 5 раз больше -->
            <span class="kp-card-icon">
              <img src="/korzh_badge.svg" alt="" />
            </span>

            <!-- Полупрозрачная подпись снизу -->
            <span class="kp-card-label">{{ card.label }}</span>
          </span>
        </button>
      </div>

      <!-- (9) Убрали "Эмоциональный фон", подняли контент -->
      <div class="kp-block" :class="genderClass">
        <div class="kp-rotator">
          <transition name="kp-fade" mode="out-in">
            <p :key="currentQuestion1" class="kp-question">{{ currentQuestion1 }}</p>
          </transition>
        </div>

        <textarea
          v-model="form.emotionalRelease"
          class="kp-textarea"
          @focus="startRotation(1)"
          rows="3"
          placeholder="Нажмите на слова ниже или пишите сами..."
        ></textarea>

        <div class="kp-bubbles">
          <div
            v-for="suggestion in currentSuggestions.emotions"
            :key="suggestion"
            class="kp-bubble"
            @click="selectSuggestion('emotionalRelease', suggestion, 'emotions')"
          >
            {{ suggestion }}
          </div>

          <div
            v-if="!isInitialSuggestions('emotions')"
            class="kp-bubble kp-bubble-reset"
            @click="resetSuggestions('emotions')"
          >
            Сброс
          </div>
        </div>

        <p class="kp-hint" v-html="'<b>Нажимайте</b>, чтобы строить фразы'"></p>
      </div>

      <!-- (8) Инфо + гендер вниз под подсказки -->
      <div class="kp-controls">
        <button
          type="button"
          class="kp-info-btn"
          :class="[selectedGender === 'female' ? 'is-female' : 'is-male']"
          @click="showInfoModal = true"
        >
          Инфо
        </button>

        <div class="kp-gender">
          <div class="kp-gender-wrap">
            <div
              class="kp-gender-dot kp-gender-female"
              :class="{ 'is-active': selectedGender === 'female' }"
              @click="onGenderClick('female')"
              role="button"
              tabindex="0"
            ></div>
            <div
              class="kp-gender-dot kp-gender-male"
              :class="{ 'is-active': selectedGender === 'male' }"
              @click="onGenderClick('male')"
              role="button"
              tabindex="0"
            ></div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showInfoModal" class="kp-modal-overlay" @click.self="showInfoModal = false">
        <div class="kp-modal">
          <div class="kp-modal-title">О Сигнале</div>
          <div class="kp-modal-body">
            Это система прямой связи. Мы реагируем на каждый сигнал в течение 24 часов.
            <br /><br />
            <a href="https://cffx.ru/signals.html" target="_blank" class="kp-modal-link">Подробнее о системе</a>
          </div>
          <div class="kp-modal-footer">
            <button type="button" class="kp-modal-ok" @click="showInfoModal = false">Понятно</button>
          </div>
        </div>
      </div>

      <div class="kp-footer">
        <button type="submit" class="kp-submit" :disabled="!isFormValid || isSubmitting">
          {{ isSubmitting ? 'Отправка...' : 'Отправить сигнал' }}
        </button>
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
/* (11) Изоляция: все классы с префиксом kp- */
.kp-wrapper {
  --kp-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --kp-font-mono: "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace;

  --kp-bg: #1E1E20;
  --kp-surface: #2a2a2e;
  --kp-border: #3a3a3e;
  --kp-muted: #888;

  /* меняется из template */
  --kp-card-accent: #ff69b4;

  font-family: var(--kp-font-sans);
  max-width: 640px;
  margin: 40px auto;
  background-color: var(--kp-bg);
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.kp-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Header (без горизонтальных линий) */
.kp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.kp-title {
  font-size: 1.35rem;
  font-weight: 650;
  color: #fff;
}

.kp-tech {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--kp-font-mono);
  font-size: 0.9rem;
  color: var(--kp-muted);
}

.kp-ticket {
  background-color: #242426;
  color: #9b7fb7;
  font-weight: 750;
  padding: 0.5rem 0.85rem;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--kp-font-mono);
}

/* (9) Единственный разделитель: прозрачные края -> плотный центр */
.kp-sep {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #2c2c2f 50%, transparent 100%);
  margin-top: 6px;
}

/* Select без обертки */
.kp-select {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 12px;
  padding: 0.9rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.25s ease;
  font-family: var(--kp-font-sans);
}

.kp-select:focus {
  outline: none;
  border-color: color-mix(in srgb, var(--kp-card-accent) 60%, #444);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--kp-card-accent) 22%, transparent);
  background-color: #2a2a2e;
}

.kp-select option {
  background: #2a2a2e;
  color: #f0f0f0;
}

.kp-small-title {
  font-size: 0.8rem;
  color: #b0b0b0;
  opacity: 0.85;
  letter-spacing: 0.02em;
  margin-top: 2px;
}

/* (1)(4)(6) Cards grid */
.kp-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.kp-card {
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  border: 1px solid color-mix(in srgb, var(--kp-card-accent) 38%, var(--kp-border));
  background: var(--kp-surface);
  border-radius: 18px;
  padding: 14px;
  cursor: pointer;

  /* (1) квадрат */
  aspect-ratio: 1 / 1;
  width: 100%;

  position: relative;
  overflow: hidden;

  transition:
    transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1),
    border-color 0.45s ease,
    box-shadow 0.45s ease,
    background-color 0.45s ease;
}

.kp-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--kp-card-accent) 28%, transparent);
}

/* Метаморфоза: слой-фон, который "перетекает" */
.kp-card-bg {
  position: absolute;
  inset: -40%;
  content: "";
  background:
    radial-gradient(closest-side, color-mix(in srgb, var(--kp-card-accent) 45%, transparent), transparent 70%),
    radial-gradient(closest-side, rgba(155, 127, 183, 0.35), transparent 70%);
  filter: blur(26px);
  opacity: 0.55;
  transform: translate3d(-8%, -6%, 0) scale(0.95) rotate(-10deg);
  transition:
    transform 0.55s cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 0.55s ease;
}

.kp-card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* (1) Иконка в 5 раз больше */
.kp-card-icon {
  width: var(--kp-badge-size, 200px);
  height: var(--kp-badge-size, 200px);
  display: grid;
  place-items: center;
  margin-top: 6px;
}

.kp-card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  opacity: 0.95;
  transform: translateZ(0);
  transition: transform 0.55s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.kp-card-label {
  margin-top: auto;
  font-size: 0.8rem;
  color: #fff;
  opacity: 0.5;
  font-weight: 520;
  padding-top: 8px;
  transition: opacity 0.35s ease;
}

/* Hover = Active (5) "зависание" ховера при выборе */
.kp-card:hover,
.kp-card.is-active {
  transform: translateY(-2px);
  background-color: #323236;
  border-color: var(--kp-card-accent);
  box-shadow:
    0 14px 34px rgba(0, 0, 0, 0.35),
    0 0 0 1px color-mix(in srgb, var(--kp-card-accent) 35%, transparent),
    0 0 26px color-mix(in srgb, var(--kp-card-accent) 18%, transparent);
}

.kp-card:hover .kp-card-bg,
.kp-card.is-active .kp-card-bg {
  opacity: 0.75;
  transform: translate3d(6%, 4%, 0) scale(1.08) rotate(12deg);
}

.kp-card:hover .kp-card-icon img,
.kp-card.is-active .kp-card-icon img {
  transform: scale(1.03);
}

.kp-card:hover .kp-card-label,
.kp-card.is-active .kp-card-label {
  opacity: 0.85;
}

/* Emotion block */
.kp-block {
  background-color: var(--kp-surface);
  border-radius: 18px;
  padding: 1rem;
  border: 1px solid var(--kp-border);
}

/* (6) Обводка пузырьков остаётся по гендеру, как было */
.kp-block.kp-gender-female {
  --kp-emo-accent: #ff69b4;
}
.kp-block.kp-gender-male {
  --kp-emo-accent: #87ceeb;
}

.kp-rotator {
  min-height: 46px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.kp-question {
  margin: 0;
  font-weight: 520;
  font-size: 1rem;
  line-height: 1.3;
  color: #f0f0f0;
}

.kp-fade-enter-active,
.kp-fade-leave-active {
  transition: opacity 0.5s ease;
}
.kp-fade-enter-from,
.kp-fade-leave-to {
  opacity: 0;
}

.kp-textarea {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.25s ease;
  font-family: var(--kp-font-sans);
  resize: vertical;
}

.kp-textarea:focus {
  outline: none;
  border-color: var(--kp-emo-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--kp-emo-accent) 20%, transparent);
  background-color: #2a2a2e;
}

.kp-bubbles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.kp-bubble {
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 520;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid color-mix(in srgb, var(--kp-emo-accent) 35%, transparent);
  background: color-mix(in srgb, var(--kp-emo-accent) 10%, transparent);
  color: var(--kp-emo-accent);
  user-select: none;
}

.kp-bubble:hover {
  background: var(--kp-emo-accent);
  color: #111;
  transform: scale(1.05);
}

.kp-bubble-reset {
  font-weight: 650;
  opacity: 0.85;
  border-style: dashed;
}

.kp-hint {
  font-size: 0.8rem;
  color: #777;
  margin: 0.5rem 0 0 0.25rem;
}
.kp-hint b {
  color: #aaa;
  font-weight: 650;
}

/* (8) Controls moved below */
.kp-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.kp-info-btn {
  border-radius: 999px;
  font-size: 13px;
  font-weight: 560;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  height: 34px;
  padding: 0 16px;
  background: rgba(135, 206, 235, 0.1);
  border: 1px solid rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.kp-info-btn.is-female {
  background: rgba(255, 105, 180, 0.12);
  border-color: rgba(255, 105, 180, 0.32);
  color: #ff69b4;
}

.kp-info-btn.is-male {
  background: rgba(135, 206, 235, 0.12);
  border-color: rgba(135, 206, 235, 0.32);
  color: #87ceeb;
}

.kp-info-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.kp-gender {
  display: flex;
  justify-content: center;
}

.kp-gender-wrap {
  display: flex;
  background: var(--kp-surface);
  border-radius: 999px;
  padding: 5px;
  border: 1px solid #444;
  height: 34px;
  align-items: center;
  gap: 6px;
}

.kp-gender-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s ease;
}

.kp-gender-female {
  background: rgba(255, 105, 180, 0.32);
}
.kp-gender-female.is-active {
  background: #ff69b4;
  box-shadow: 0 0 12px rgba(255, 105, 180, 0.5);
}

.kp-gender-male {
  background: rgba(135, 206, 235, 0.32);
}
.kp-gender-male.is-active {
  background: #87ceeb;
  box-shadow: 0 0 12px rgba(135, 206, 235, 0.5);
}

.kp-gender-dot:hover {
  opacity: 0.85;
  transform: scale(1.06);
}

/* Footer (без разделителя) */
.kp-footer {
  margin-top: 6px;
}

.kp-submit {
  width: 100%;
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 50%, #C5B3D9 100%);
  color: #fff;
  font-weight: 650;
  font-size: 1rem;
  border: none;
  border-radius: 14px;
  padding: 0.95rem 1.25rem;
  cursor: pointer;
  transition: all 0.35s ease;
  background-size: 200% auto;
  background-position: 25% 50%;
}

.kp-submit:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.01);
  box-shadow: 0 10px 20px -5px rgba(155, 127, 183, 0.4);
}

.kp-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Modal */
.kp-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.kp-modal {
  background-color: var(--kp-bg);
  border: 1px solid #2c2c2f;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: kpModalIn 0.25s ease-out;
}

@keyframes kpModalIn {
  from { opacity: 0; transform: translateY(-18px); }
  to { opacity: 1; transform: translateY(0); }
}

.kp-modal-title {
  font-size: 1.35rem;
  font-weight: 750;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
}

.kp-modal-body {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.kp-modal-link {
  color: #B39DC8;
  text-decoration: none;
  font-weight: 650;
  border-bottom: 1px solid transparent;
  transition: all 0.25s ease;
}

.kp-modal-link:hover {
  color: #C5B3D9;
  border-bottom-color: #C5B3D9;
}

.kp-modal-footer {
  display: flex;
  justify-content: center;
}

.kp-modal-ok {
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 50%, #C5B3D9 100%);
  color: #fff;
  font-weight: 650;
  font-size: 0.95rem;
  border: none;
  border-radius: 12px;
  padding: 0.85rem 2rem;
  cursor: pointer;
  transition: all 0.25s ease;
  background-size: 200% auto;
  background-position: 25% 50%;
}

.kp-modal-ok:hover {
  background-position: 75% 50%;
  transform: scale(1.03);
  box-shadow: 0 8px 20px rgba(155, 127, 183, 0.35);
}

/* Success */
.kp-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem 2rem 2rem;
  animation: kpFadeIn 0.5s ease-out;
}

@keyframes kpFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.kp-success-text h3 {
  font-size: 1.5rem;
  font-weight: 650;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.kp-success-text p {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
}

.kp-strong {
  color: #fff;
  font-weight: 800;
}

.kp-success-actions {
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;
  width: 100%;
}

.kp-telegram-btn,
.kp-share-btn {
  flex: 1 1 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.1rem;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 650;
  text-align: center;
  cursor: pointer;
}

.kp-telegram-btn {
  background-color: #9b7fb7;
  color: #ffffff;
  border: none;
  text-decoration: none !important;
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.kp-telegram-btn:hover {
  background-color: #b399c8;
  transform: scale(1.01);
}

.kp-share-btn {
  background-color: #3a3a3e;
  color: #ffffff;
  border: none;
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.kp-share-btn:hover {
  background-color: #4a4a4f;
  transform: scale(1.01);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
}

.kp-secondary-link {
  display: block;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #888;
  text-decoration: none;
  border-bottom: none !important;
  transition: color 0.25s ease;
}

.kp-secondary-link:hover {
  color: #B39DC8;
  text-decoration: underline !important;
}

/* Responsive */
@media (max-width: 768px) {
  .kp-wrapper { padding: 1.5rem; }
  .kp-header { flex-direction: column; align-items: center; text-align: center; }
  .kp-tech { justify-content: center; flex-wrap: wrap; }

  /* (8) На мобиле инфо + гендер в одной строке */
  .kp-controls {
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }

  /* (1) уменьшение иконки, чтобы 3 карточки влезали */
  .kp-card { border-radius: 16px; }
  .kp-card-icon { --kp-badge-size: 120px; }

  .kp-success-actions { flex-direction: column; }
  .kp-telegram-btn, .kp-share-btn { width: 100%; }
}
</style>
