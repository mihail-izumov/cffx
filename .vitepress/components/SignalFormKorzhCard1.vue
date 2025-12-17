<script setup>
import { reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import KorzhStoryGenerator from './KorzhStoryGenerator.vue'

const form = reactive({
  coffeeShopAddress: '',
  emotionalRelease: '', 
})

const isSubmitting = ref(false)
const submittedTime = ref('')
const formSubmitted = ref(false)
const rawTicketNumber = ref(null)
const formattedTicketNumber = ref(null)
const currentDate = ref('')

// Ротация вопросов (оставляем только для 1-го блока - эмоций)
const activeRotator = ref(0) 

// Гендер (оставляем, так как от него зависят подсказки эмоций)
const selectedGender = ref('female') 
const showInfoModal = ref(false)

const genderClass = computed(() => {
  return selectedGender.value === 'female' ? 'gender-female' : 'gender-male'
})

// ПОЛНАЯ 3-УРОВНЕВАЯ система подсказок (Виральная версия + Базовые сценарии)
const baseSuggestions = {
  female: {
    emotions: {
      initial: [
        'поздравляю', 'желаю', 'шлю', 'дарю', 
        'наслаждаюсь', 'ловлю', 'официально заявляю', 'признаюсь',
        'мой муд', 'виновата', 'вместо психолога', 'этот кофе'
      ],
      // LEVEL 2 (FEMALE)
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
      // LEVEL 2 (MALE)
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

  // ОБЩИЕ ПРАВИЛА ДЛЯ УРОВНЯ 3 (ПРОДОЛЖЕНИЯ)
  common: {
    emotions: {
      // === СЦЕНАРИИ: ЛОЯЛЬНОСТЬ И БРЕНД ===
      'любимую кофейню': ['с Новым годом', 'и Рождеством!', 'с днем рождения', 'с классным сервисом', 'с расширением'],
      'мой девиз': ['— Жить любить кофе пить', '— ни дня без кофе', '— и пусть весь мир подождет'],
      'команду': ['вы супер', 'люблю вас!', 'так держать', 'с праздником', 'спасибо за труд'],
      'лайк': ['команде', 'за атмосферу', 'от души', 'вашему кофе', 'не глядя'],

      // === СЦЕНАРИИ: АТМОСФЕРА И СОСТОЯНИЕ ===
      'этой зимой': ['здесь и сейчас', 'и снегом', 'из окна', 'уютной', 'сказочной'],
      'дзен': ['посреди хаоса', 'города', 'в чашке кофе', 'и гармонию', 'сейчас'],
      'себе': ['лёгкости', 'бытия', 'с перерывом', 'с бодрым утром', 'с правильным выбором'],
      
      // === СЦЕНАРИИ: СОЦИУМ ===
      'лучи добра': ['вас', 'просто так', 'всем вокруг', 'персонально вам', 'этому дню'],
      'всех': ['Жить любить кофе пить', 'с праздником', 'вокруг', 'с новой жизнью', 'кто это читает'],
      'сердечко': ['команде', 'люблю вас!', 'бариста', 'этому городу', 'друзьям'],
      
      // === СЦЕНАРИИ: ЮМОР И ЖИЗА (Ж) ===
      'патчи не спасли': ['вся надежда на кофе', 'нужен фильтр', 'но капучино спасет', 'день тяжелый'],
      'согрешили с десертом': ['и не стыдно', 'было вкусно', 'каюсь', 'отработаем в зале'],
      'дедлайны горят': ['а я пью кофе', 'и пусть весь мир подождет', 'но пусть подождут', 'гори они огнем'],
      
      // === СЦЕНАРИИ: ЮМОР И ЖИЗА (М) ===
      'спасся кофеином': ['от зомби-апокалипсиса', 'от сна', 'верните меня к жизни', 'батарейка заряжена'],
      'у меня растущий организм': ['требует калорий', 'это на массу', 'в ширину', 'силе нужно питание'],

      // === НОВЫЕ ВИРАЛЬНЫЕ СЦЕНАРИИ (ASTROLOGY, EX, PSYCHOLOGY) ===
      'Ретроградный Меркурий': ['поэтому мне нужен этот латте', 'бессилен против кофе', 'испортил планы', 'виноват во всем'],
      'энергия главной героини': ['требует кофе', 'активирована', 'в этом платье', 'сияет'],
      'шальная императрица': ['хочет круассан', 'гуляет', 'на троне', 'отдыхает'],
      'у меня бариста': ['берет дешевле', 'выслушает', 'знает, что мне нужно', 'лечит душу'],
      'лучше, чем бывший': ['однозначно', 'и горячее', 'и не предает', '100%'],
      'лучше, чем сон': ['и вкуснее', 'бодрит мощнее', 'однозначно', 'работает'],
      'волк с уолл-стрит': ['заряжен кофеином', 'делает деньги', 'на перерыве', 'строит империю'],
      
      // === ВСПОМОГАТЕЛЬНЫЕ КЛЮЧИ (ЧТОБЫ НЕ БЫЛО БИТЫХ ССЫЛОК) ===
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
      
      // Male specific aux
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
      
      // Additional requested fillers
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


// Вычисляем актуальные подсказки только для эмоций
const suggestions = computed(() => {
  const gender = selectedGender.value
  return {
    emotions: {
      ...baseSuggestions[gender].emotions,
      ...baseSuggestions.common.emotions // Если используете общие
    }
  }
})

const currentSuggestions = reactive({
  emotions: [], // Только эмоции
})

const selectedSuggestions = reactive({
  emotions: [],
})

const branchCounters = reactive({
  emotions: 0,
})

// Фразы только для первого вопроса
const phrasesForQuestion1 = [
  "Как ты себя чувствуешь?",
  "Что у тебя на душе?",
  "Какое настроение?"
]

const currentQuestion1 = ref(phrasesForQuestion1[0])
let rotationInterval = null
let currentQuestionIndex1 = 0

// Инициализация
function initializeSuggestions() {
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
}

// Смена пола
function onGenderClick(gender) {
  selectedGender.value = gender
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
  selectedSuggestions.emotions = []
  branchCounters.emotions = 0
}

// Проверка на "начальные" подсказки
function isInitialSuggestions(suggestionType) {
  if (suggestionType !== 'emotions') return false
  return JSON.stringify(currentSuggestions.emotions) === JSON.stringify(suggestions.value.emotions.initial)
}

// Сброс
function resetSuggestions(suggestionType) {
  if (suggestionType !== 'emotions') return
  currentSuggestions.emotions = [...suggestions.value.emotions.initial]
}

// Выбор подсказки (оставили логику только для emotions)
function selectSuggestion(fieldName, suggestion, suggestionType) {
  if (suggestionType !== 'emotions') return // Игнорируем вызовы других типов

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

// Обновление списка подсказок
function updateSuggestions(suggestionType, selectedWord) {
  if (suggestionType !== 'emotions') return

  const nextSuggestions = suggestions.value[suggestionType][selectedWord]
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions]
  } else {
    currentSuggestions[suggestionType] = [...suggestions.value[suggestionType].initial]
  }
}

// Ротация вопросов (только для 1 блока)
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

// Валидация: Только адрес и эмоции
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

  // ID rate limiting
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
  // Отправляем эмоции
  formData.append('emotionalRelease', form.emotionalRelease)
  
  // Пустые поля для совместимости со скриптом (если скрипт их требует)
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

// Для генератора историй (если используется)
const storyGeneratorRef = ref(null)
const handleShareClick = () => {
  if (storyGeneratorRef.value) {
    storyGeneratorRef.value.generateAndShare()
  }
}
</script>
```

### 2. Template
Здесь оставлен только выбор точки, переключатель пола и блок с эмоциями.

```vue
<template>
  <div class="signal-form-wrapper">
    <!-- 1. Success Message Wrapper -->
    <div v-if="formSubmitted" class="signal-success-message">
      <div class="signal-success-text">
        <h3>Принято!</h3>
        <p>Ваш сигнал: <strong class="strong">{{ formattedTicketNumber }}</strong></p>
      </div>

      <div class="signal-success-actions">
        <!-- Кнопка Telegram оставлена только в финальном экране как "Написать", если нужно -->
        <a
          :href="`https://t.me/AnnaSignal?text=${rawTicketNumber}`"
          target="_blank"
          class="signal-telegram-button"
        >
          Написать в Telegram
        </a>
        
        <!-- Кнопка Share для истории (если генератор остался) -->
        <button
           type="button"
           @click="handleShareClick"
           class="signal-share-btn"
        >
          Поделиться
        </button>
      </div>
      
      <div>
        <a href="/signals" target="_blank" class="signal-secondary-link">Вернуться</a>
      </div>
    </div>

    <!-- 2. Form Wrapper -->
    <form v-else @submit.prevent="submitForm">
      <div class="signal-form-header">
        <div class="signal-form-title">Signal</div>
        <div class="signal-tech-info">
          <span class="signal-info-item">{{ currentDate }}</span>
          <span class="signal-info-item signal-ticket-display">{{ formattedTicketNumber }}</span>
        </div>
      </div>

      <div class="signal-form-section">
        <!-- АДРЕС -->
        <div class="signal-question-block signal-compact">
          <label class="signal-question-label">Точка</label>
          <p class="signal-question-help">Выберите адрес</p>

          <select v-model="form.coffeeShopAddress" class="signal-address-select" required>
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
        
        <div class="signal-separator-line"></div>

        <!-- ГЕНДЕР (нужен для эмоций) -->
        <div class="signal-controls-row">
          <button 
            type="button" 
            class="signal-info-button"
            :class="[
              selectedGender === 'female' ? 'signal-info-female' : 'signal-info-male'
            ]"
            @click="showInfoModal = true"
          >
            Инфо
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
        
        <!-- МОДАЛКА ИНФО -->
        <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
           <div class="modal">
              <div class="modal-title">О Сигнале</div>
              <div class="modal-body">
                 Это система прямой связи. Мы реагируем на каждый сигнал в течение 24 часов.
                 <br><br>
                 <a href="https://cffx.ru/signals.html" target="_blank" class="modal-link">Подробнее о системе</a>
              </div>
              <div class="modal-footer">
                 <button type="button" class="modal-ok" @click="showInfoModal = false">Понятно</button>
              </div>
           </div>
        </div>

        <!-- ЭМОЦИИ (СОХРАНЕНО ПОЛНОСТЬЮ С ЦЕПОЧКАМИ) -->
        <div 
          class="signal-question-block" 
          :class="genderClass"
          style="--accent-color: #A972FF;"
        >
          <p class="signal-direction-label">Эмоциональный фон</p>
          
          <div class="signal-rotating-phrase-container">
             <transition name="fade" mode="out-in">
               <p :key="currentQuestion1" class="signal-question-label">{{ currentQuestion1 }}</p>
             </transition>
          </div>

          <textarea
            v-model="form.emotionalRelease"
            @focus="startRotation(1)"
            rows="3"
            placeholder="Нажмите на слова ниже или пишите сами..."
          ></textarea>

          <!-- Пузырьки подсказок -->
          <div class="signal-suggestions-container">
            <div 
               v-for="suggestion in currentSuggestions.emotions" 
               :key="suggestion"
               class="signal-suggestion-bubble signal-emotion-bubble"
               @click="selectSuggestion('emotionalRelease', suggestion, 'emotions')"
            >
               {{ suggestion }}
            </div>
            
            <div 
               v-if="!isInitialSuggestions('emotions')"
               class="signal-suggestion-bubble signal-reset-bubble signal-emotion-bubble"
               @click="resetSuggestions('emotions')"
            >
               Сброс
            </div>
          </div>
          
          <p class="signal-example-hint" v-html="'<b>Нажимайте</b>, чтобы строить фразы'"></p>
        </div>

        <!-- ДРУГИЕ БЛОКИ (ФАКТЫ, РЕШЕНИЯ) УДАЛЕНЫ -->
        
        <!-- ЛИЧНЫЕ ДАННЫЕ И СОГЛАСИЕ УДАЛЕНЫ -->

        <div class="signal-form-footer" style="grid-template-areas: 'button';">
           <div class="signal-button-section">
              <button
                 type="submit"
                 class="signal-submit-btn"
                 :disabled="!isFormValid || isSubmitting"
              >
                 {{ isSubmitting ? 'Отправка...' : 'Отправить сигнал' }}
              </button>
           </div>
        </div>
      </div>
    </form>
    
    <!-- 3. Генератор истории (Скрытый helper) -->
    <!-- Передаем только то, что осталось. Если компонент требует solutions, передаем пустые строки или удаляем пропсы -->
    <KorzhStoryGenerator
       ref="storyGeneratorRef"
       :ticket="formattedTicketNumber"
       :date="currentDate.split(' ')[0]"
       :address="form.coffeeShopAddress"
       :all-text="[form.emotionalRelease].filter(t => t && t.trim()).join(' ')"
    />
  </div>
</template>
```

### 3. Style (Scoped)
Убраны стили для удаленных инпутов (input#name, input#telegramPhone), чекбоксов и бабблов фактов/решений (fact-bubble, solution-bubble), чтобы почистить CSS.

```vue
<style scoped>
:root {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --signal-font-mono: "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace;
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

.signal-direction-label {
  font-weight: 600;
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  display: block;
}

.signal-question-help {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.signal-rotating-phrase-container {
  height: 52px;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}

.signal-question-label {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  color: #f0f0f0;
  line-height: 1.3;
  width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
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

.signal-question-block.gender-female {
  border-left-color: #ff69b4 !important;
}

.signal-question-block.gender-female .signal-emotion-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-question-block.gender-female .signal-emotion-bubble:hover {
  background: #ff69b4;
  color: #fff;
}

.signal-question-block.gender-male {
  border-left-color: #87ceeb !important;
}

.signal-question-block.gender-male .signal-emotion-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-question-block.gender-male .signal-emotion-bubble:hover {
  background: #87ceeb;
  color: #000;
}

.signal-question-block.gender-female textarea:focus {
  border-color: #ff69b4 !important;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2) !important;
}

.signal-question-block.gender-male textarea:focus {
  border-color: #87ceeb !important;
  box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2) !important;
}

/* Modal */
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
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
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

textarea, input {
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

textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

.signal-suggestions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.signal-suggestion-bubble {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  user-select: none;
}

.signal-emotion-bubble {
  background: rgba(169, 114, 255, 0.1);
  border-color: rgba(169, 114, 255, 0.3);
  color: #A972FF;
}

.signal-emotion-bubble:hover {
  background: #A972FF;
  color: #000;
  transform: scale(1.05);
}

.signal-reset-bubble {
  font-weight: 600;
  opacity: 0.8;
  font-size: 0.75rem;
  border-style: dashed !important;
}

.signal-reset-bubble:hover {
  opacity: 1;
}

.signal-example-hint {
  font-size: 0.8rem;
  color: #777;
  margin: 0.5rem 0 0 0.25rem;
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .signal-form-wrapper { padding: 1.5rem; }
  .signal-form-header { flex-direction: column; align-items: center; text-align: center; gap: 0.5rem; }
  .signal-tech-info { justify-content: center; }
  .signal-rotating-phrase-container { height: 65px; }
  .signal-question-label { font-size: 0.95rem; }
  .signal-suggestions-container { gap: 0.4rem; }
  .signal-suggestion-bubble { font-size: 0.75rem; padding: 0.3rem 0.7rem; }
  .signal-controls-row { flex-direction: column; align-items: center; gap: 0.75rem; }
  .signal-gender-switch { justify-content: center; }
  .signal-success-actions { flex-direction: column; }
  .signal-success-actions .signal-telegram-button,
  .signal-success-actions .signal-share-btn { width: 100%; }
}
</style>
