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

// === СЛОВАРЬ ПОДСКАЗОК (ВАШ ОРИГИНАЛЬНЫЙ СПИСОК) ===
const baseSuggestions = {
  female: {
    emotions: {
      initial: ['довольна', 'восхищена', 'благодарна', 'удивлена', 'расстроена', 'разочарована', 'недовольна', 'возмущена'],
      'довольна': ['качеством кофе', 'скоростью обслуживания', 'вежливостью персонала', 'атмосферой заведения', 'чистотой помещения'],
      'восхищена': ['мастерством бариста', 'качеством десертов', 'дизайном интерьера', 'музыкальным сопровождением', 'ароматом кофе'],
      'благодарна': ['за внимание к деталям', 'за решение проблемы', 'за рекомендацию напитка', 'за уютную обстановку', 'за профессионализм'],
      'удивлена': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком', 'отношением'],
      'расстроена': ['долго ждала', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
      'разочарована': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
      'недовольна': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
      'возмущена': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами']
    }
  },
  male: {
    emotions: {
      initial: ['доволен', 'восхищён', 'благодарен', 'удивлён', 'расстроен', 'разочарован', 'недоволен', 'возмущён'],
      'доволен': ['качеством кофе', 'скоростью обслуживания', 'вежливостью персонала', 'атмосферой заведения', 'чистотой помещения'],
      'восхищён': ['мастерством бариста', 'качеством десертов', 'дизайном интерьера', 'музыкальным сопровождением', 'ароматом кофе'],
      'благодарен': ['за внимание к деталям', 'за решение проблемы', 'за рекомендацию напитка', 'за уютную обстановку', 'за профессионализм'],
      'удивлён': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком', 'отношением'],
      'расстроен': ['долго ждал', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
      'разочарован': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
      'недоволен': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
      'возмущён': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами']
    }
  },
  // Гендерно-нейтральные подсказки (общие для всех)
  common: {
    emotions: {
      'долго ждал': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
      'долго ждала': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
      'грязная посуда': ['следы помады', 'остатки еды', 'жирные пятна', 'засохший кофе', 'странный запах'],
      'холодный кофе': ['едва теплый', 'совсем остыл', 'подали холодным', 'температура комнатная'],
      'грубый персонал': ['не поздоровались', 'хамили', 'игнорировали', 'были раздражены', 'повысили голос'],
      'забыли заказ': ['через 40 минут', 'не записали', 'потеряли чек', 'не передали на кухню'],
      'качеством': ['хуже чем обычно', 'не соответствует цене', 'испортилось за месяц', 'как в фастфуде', 'совсем не то'],
      'сервисом': ['медленный', 'невнимательный', 'равнодушный', 'непрофессиональный', 'хаотичный'],
      'ожиданиями': ['по отзывам лучше', 'раньше было вкуснее', 'не оправдал репутацию'],
      'атмосферой': ['шумно и грязно', 'неуютно', 'холодно', 'плохая музыка', 'неприятные запахи'],
      'чистотой': ['грязные столы', 'липкий пол', 'немытая посуда', 'пыль везде', 'антисанитария'],
      'обслуживанием': ['долгое ожидание', 'путаница в заказах', 'невежливость', 'игнорирование', 'ошибки кассира'],
      'очередью': ['не двигалась', 'час ожидания', 'нет системы', 'хаос', 'всех пропускают'],
      'ошибкой в заказе': ['не тот напиток', 'забыли позицию', 'неправильный размер', 'другой сироп', 'перепутали'],
      'температурой блюд': ['холодные', 'остывшие', 'чуть теплые', 'не разогрели', 'ледяные'],
      'упаковкой': ['протекающие крышки', 'слабые пакеты', 'разорвалась', 'неудобная', 'грязная'],
      'антисанитарией': ['грязные руки', 'упал и подали', 'на полу готовят', 'мухи', 'тараканы'],
      'хамством': ['нагрубили', 'оскорбили', 'накричали', 'показали характер', 'послали'],
      'обманом': ['не тот объем', 'обвесили', 'скрыли стоимость', 'навязали', 'обсчитали'],
      'некачественной едой': ['испорченная', 'несвежая', 'странный вкус', 'горькая', 'кислая'],
      'инородными предметами': ['волосы в еде', 'пластик в круассане', 'проволока', 'нитки', 'жук'],
      'таким сервисом': ['впервые такое', 'шокирован', 'не верю', 'ужасно'],
      'проблемами': ['постоянные', 'одни и те же', 'системные', 'не решаются', 'игнорируются'],
      'невниманием': ['не слушают', 'не реагируют', 'все равно', 'безразличие', 'не заботятся'],
      'беспорядком': ['хаос', 'непорядок', 'бардак', 'неорганизованность', 'суета'],
      'отношением': ['пренебрежение', 'высокомерие', 'равнодушие', 'неуважение', 'хамство'],
      'качеством кофе': ['идеальная температура', 'богатый аромат', 'сбалансированный вкус', 'красивая подача', 'свежая обжарка'],
      'скоростью обслуживания': ['заказ за 3 минуты', 'мгновенная подача', 'нет очередей', 'четкая организация', 'быстрая оплата'],
      'вежливостью персонала': ['улыбчивые сотрудники', 'внимательное отношение', 'помощь в выборе', 'вежливое общение', 'профессионализм'],
      'атмосферой заведения': ['уютный интерьер', 'приятная музыка', 'комфортные места', 'теплое освещение', 'спокойная обстановка'],
      'чистотой помещения': ['сверкающая посуда', 'чистые столы', 'порядок везде', 'свежий воздух', 'аккуратность'],
      'мастерством бариста': ['красивый латте-арт', 'точные пропорции', 'умение готовить', 'знание рецептов', 'творческий подход'],
      'качеством десертов': ['свежая выпечка', 'идеальный вкус', 'красивая презентация', 'домашний вкус', 'качественные ингредиенты'],
      'дизайном интерьера': ['стильное оформление', 'продуманные детали', 'современный дизайн', 'удобная мебель', 'гармоничные цвета'],
      'музыкальным сопровождением': ['приятная фоновая музыка', 'подходящий плейлист', 'комфортная громкость', 'качественный звук', 'атмосферные композиции'],
      'ароматом кофе': ['насыщенный запах', 'свежемолотые зерна', 'манящий аромат', 'качественные сорта', 'профессиональная обжарка'],
      'за внимание к деталям': ['запомнили предпочтения', 'учли пожелания', 'индивидуальный подход', 'забота о госте', 'персональный сервис'],
      'за решение проблемы': ['быстро исправили ошибку', 'заменили напиток', 'извинились за неудобство', 'предложили компенсацию', 'проявили понимание'],
      'за рекомендацию напитка': ['подобрали по вкусу', 'посоветовали новинку', 'объяснили особенности', 'учли предпочтения', 'помогли выбрать'],
      'за уютную обстановку': ['домашняя атмосфера', 'теплый прием', 'комфортные условия', 'располагающая обстановка', 'приятное времяпрепровождение'],
      'за профессионализм': ['высокий уровень сервиса', 'компетентность', 'качественная работа', 'внимание к деталям', 'превосходное обслуживание']
    },
    facts: {
      initial: ['ожидание', 'ошибка в заказе', 'качество блюд', 'чистота', 'персонал'],
      'ожидание': ['20 минут', '30 минут', 'более часа', 'забыли заказ', 'очередь не двигалась'],
      'ошибка в заказе': ['не тот напиток', 'не доложили позицию', 'неправильный соус', 'перепутали объём', 'другое молоко'],
      'качество блюд': ['холодный кофе', 'невкусная еда', 'недоваренный рис', 'комочки в матче', 'чёрствая выпечка'],
      'чистота': ['грязная посуда', 'волосы в еде', 'грязная уборная', 'насекомые', 'пластик в круассане'],
      'персонал': ['грубость', 'невнимательность', 'некомпетентность', 'трогали еду руками', 'не извинились'],
      '20 минут': ['засекал по часам', 'спросил у соседнего стола', 'заказал в 14:30, получил в 14:50', 'долгое ожидание для простого заказа', 'других обслужили быстрее'],
      '30 минут': ['полчаса точно', 'дважды подходил узнать', 'успел прочитать новости'],
      'более часа': ['час и 10 минут', 'полтора часа ждал', 'с 12:00 до 13:15', 'весь обед потратил', 'опоздал на встречу'],
      'забыли заказ': ['не записали', 'потеряли чек', 'не передали на кухню', 'перепутали с другим', 'готовили не то'],
      'очередь не двигалась': ['стоял полчаса', 'один кассир на всех', 'касса сломалась', 'менялись местами', 'хаос'],
      'не тот напиток': ['заказал латте, принесли капучино', 'просил без сахара, был сладкий', 'хотел большой, дали маленький', 'другой сироп добавили', 'обычное молоко вместо овсяного'],
      'не доложили позицию': ['забыли десерт', 'нет половины заказа', 'пропали сэндвичи', 'только кофе принесли', 'блинчики не было'],
      'неправильный соус': ['положили не тот соус к тыквенным панкейкам', 'острый вместо сладкого', 'майонез вместо сметаны', 'кетчуп забыли', 'соус отдельно не дали'],
      'перепутали объём': ['несоответствие объема напитков', 'маленький вместо большого', 'дали меньше чем заказал', 'размер не тот', 'обманули с порцией'],
      'другое молоко': ['обычное вместо овсяного', 'соевое вместо миндального', 'с лактозой дали', 'не предупредили', 'аллергия может быть'],
      'холодный кофе': ['градусов 40-50', 'можно было пить сразу', 'не обжигал язык', 'как будто стоял долго', 'температура комнатная'],
      'невкусная еда': ['пересоленная', 'недосоленная', 'горькая', 'кислая', 'странный вкус'],
      'недоваренный рис': ['жесткий', 'сырой', 'хрустит на зубах', 'не доварили'],
      'комочки в матче': ['комочки в матче', 'не размешали', 'порошок не растворился', 'комки муки', 'неоднородная масса'],
      'чёрствая выпечка': ['как камень', 'вчерашняя', 'сухая', 'твердая', 'невозможно откусить'],
      'грязная посуда': ['на чашке помада', 'жирные разводы на тарелке', 'крошки от предыдущих гостей', 'капли кофе на блюдце', 'следы от губной помады'],
      'волосы в еде': ['черный волос в редисе', 'длинный волос в салате', 'волосы на булочке', 'в супе волос', 'противно есть'],
      'грязная уборная': ['не убирали', 'бумаги нет', 'воняет', 'лужи на полу', 'грязь везде'],
      'насекомые': ['тараканы бегают', 'муха в кофе', 'жук в салате', 'паук на стене', 'противно смотреть'],
      'пластик в круассане': ['кусочек пластика в круассане', 'твердый кусок', 'чуть не сломал зуб', 'опасно', 'мог подавиться'],
      'грубость': ['не поздоровались', 'ответили резко', 'закатили глаза', 'проигнорировали вопрос', 'были явно недовольны'],
      'невнимательность': ['не слушали', 'переспрашивали', 'отвлекались', 'забыли просьбу', 'записали неправильно'],
      'некомпетентность': ['не знали меню', 'не умели готовить', 'путались в кнопках', 'долго соображали', 'спрашивали у коллег'],
      'трогали еду руками': ['трогали трубочку грязными руками', 'лапали булочки', 'без перчаток', 'грязными руками', 'неаккуратно'],
      'не извинились': ['даже не извинились', 'было все равно', 'сделали вид что нормально', 'проигнорировали', 'сказали что так и надо']
    },
    solutions: {
      initial: ['таймер ожидания', 'обучение персонала', 'контроль качества', 'система проверки', 'стандарты сервиса'],
      'таймер ожидания': ['визуальный контроль бариста/старшего бариста', 'с номерами заказов', 'видимый гостям', 'контроль времени', 'сигналы на баре', 'обратная связь от гостей'],
      'обучение персонала': ['по сервису', 'по санитарии', 'по качеству', 'по коммуникации', 'регулярные тренинги'],
      'контроль качества': ['проверка блюд', 'температурный контроль', 'свежесть продуктов', 'упаковка', 'дегустация'],
      'система проверки': ['чек-лист качества', 'двойная проверка', 'контроль чистоты', 'стандарты подачи', 'фото блюд'],
      'стандарты сервиса': ['вежливость', 'скорость', 'точность', 'чистота', 'профессионализм'],
      'визуальный контроль бариста/старшего бариста': ['песочные часы на стойке', 'отчёты по среднему времени заказа', 'замеры скорости обслуживания менеджером', 'сравнение с нормой', 'обсуждение на пятиминутке'],
      'с номерами заказов': ['в мобильном приложении', 'на чеке QR-код', 'на чеке номер заказа'],
      'видимый гостям': ['в мобильном приложении', 'на чеке QR-код', 'на чеке номер заказа'],
      'контроль времени': ['стандарт 7 минут', 'красная зона после 10 мин', 'автоотсчёт от момента пробития чека'],
      'сигналы на баре': ['цветовые индикаторы готовности', 'звуковой таймер для бариста'],
      'обратная связь от гостей': ['опрос о времени ожидания', 'кнопка "долго жду" в приложении', 'комментарий в чеке QR-кодом'],
      'по сервису': ['тренинги вежливости', 'ролевые игры', 'работа с жалобами', 'стандарты общения', 'мотивация персонала'],
      'по санитарии': ['мытье посуды', 'уборка столов', 'проверка чистоты', 'гигиена рук', 'контроль температуры'],
      'по качеству': ['дегустация напитков', 'проверка ингредиентов', 'температура подачи', 'внешний вид блюд', 'сроки годности'],
      'по коммуникации': ['активное слушание', 'решение конфликтов', 'извинения и компенсации', 'позитивное общение', 'работа с негативом'],
      'регулярные тренинги': ['раз в месяц', 'новых сотрудников', 'переаттестация', 'мастер-классы', 'обмен опытом'],
      'проверка блюд': ['перед подачей', 'температура напитков', 'внешний вид', 'соответствие заказу', 'свежесть ингредиентов'],
      'температурный контроль': ['термометр для кофе', '85-90 градусов', 'горячие блюда', 'холодные напитки', 'контроль каждый час'],
      'свежесть продуктов': ['ежедневная поставка', 'сроки годности', 'ротация товара', 'маркировка даты', 'утилизация просрочки'],
      'упаковка': ['герметичные крышки', 'качественные пакеты', 'стаканы не протекают', 'салфетки в комплекте', 'удобная переноска'],
      'дегустация': ['каждая партия', 'новые рецепты', 'мнение гостей', 'тестирование вкуса', 'корректировка рецептур'],
      'чек-лист качества': ['для каждого заказа', 'проверка температуры', 'чистота посуды', 'правильность состава', 'время подачи'],
      'двойная проверка': ['готовящий и подающий', 'кассир и бариста', 'менеджер и персонал', 'фото готового блюда', 'подпись ответственного'],
      'контроль чистоты': ['каждый час', 'чек-лист уборки', 'дезинфекция', 'мытье рук', 'чистая форма'],
      'стандарты подачи': ['правильная посуда', 'украшение блюд', 'салфетки и приборы', 'температура подачи', 'презентация'],
      'фото блюд': ['перед подачей', 'контроль качества', 'обучение персонала', 'соцсети', 'архив образцов'],
      'вежливость': ['приветствие с улыбкой', 'благодарность гостю', 'извинения за ошибки', 'помощь в выборе', 'прощание'],
      'скорость': ['стандарт 10 минут', 'быстрое принятие заказа', 'оперативная готовка', 'мгновенная подача', 'ускоренная оплата'],
      'точность': ['записывать заказы', 'повторять вслух', 'проверять чек', 'уточнять детали', 'контроль состава'],
      'чистота': ['мытье рук каждые 30 мин', 'чистая форма', 'дезинфекция поверхностей', 'порядок на рабочем месте', 'свежая посуда'],
      'профессионализм': ['знание меню', 'умение готовить', 'решение проблем', 'работа в команде', 'развитие навыков']
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
