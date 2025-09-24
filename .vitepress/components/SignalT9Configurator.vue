<template>
  <div class="signal-demo-wrapper">
    <!-- Переключатель секций над формой -->
    <div class="signal-demo__header">
      <div class="signal-demo__switch" role="tablist" aria-label="Секции формы">
        <button
          v-for="section in sections"
          :key="section.id"
          class="signal-demo__switch-btn"
          :class="[isActive(section.id) ? 'is-active' : '', section.id]"
          type="button"
          role="tab"
          :aria-selected="isActive(section.id)"
          @click="selectedSection = section.id"
        >
          {{ section.title }}
        </button>
      </div>
    </div>

    <!-- Контейнер с формой -->
    <div class="signal-demo__form-container">
      <!-- Секция "Эмоции и чувства" -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
          <p class="signal-direction-label">Эмоции и чувства</p>
          
          <div class="signal-rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1" class="signal-question-label">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.emotionalRelease" 
            @focus="startRotation(1)" 
            rows="3" 
            placeholder="Разочарован ожиданиями..." 
            required>
          </textarea>
          
          <!-- Подсказки-баблы для эмоций -->
          <div class="signal-suggestions-container">
            <div 
              v-for="suggestion in currentSuggestions.emotions" 
              :key="suggestion"
              class="signal-suggestion-bubble signal-emotion-bubble"
              @click="selectSuggestion('emotionalRelease', suggestion, 'emotions')"
            >
              {{ suggestion }}
            </div>
            <!-- Кнопка возврата к начальным вариантам -->
            <div 
              v-if="!isInitialSuggestions('emotions')"
              class="signal-suggestion-bubble signal-reset-bubble signal-emotion-bubble"
              @click="resetSuggestions('emotions')"
            >
              ← Ещё варианты
            </div>
          </div>
          
          <p class="signal-example-hint" v-html="'Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»'"></p>
        </div>
      </div>

      <!-- Секция "Детали проблемы" -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #3DDC84;">
          <p class="signal-direction-label">Детали проблемы</p>
          
          <div class="signal-rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion2" class="signal-question-label">{{ currentQuestion2 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.factualAnalysis" 
            @focus="startRotation(2)" 
            rows="3" 
            placeholder="Опишите факты: что, когда и где произошло..." 
            required>
          </textarea>
          
          <!-- Подсказки-баблы для деталей -->
          <div class="signal-suggestions-container">
            <div 
              v-for="suggestion in currentSuggestions.facts" 
              :key="suggestion"
              class="signal-suggestion-bubble signal-fact-bubble"
              @click="selectSuggestion('factualAnalysis', suggestion, 'facts')"
            >
              {{ suggestion }}
            </div>
            <!-- Кнопка возврата к начальным вариантам -->
            <div 
              v-if="!isInitialSuggestions('facts')"
              class="signal-suggestion-bubble signal-reset-bubble signal-fact-bubble"
              @click="resetSuggestions('facts')"
            >
              ← Ещё варианты
            </div>
          </div>
          
          <p class="signal-example-hint" v-html="'Пример: «Заказ на два капучино <b>ждал 22 минуты</b>, хотя в кафе был почти один»'"></p>
        </div>
      </div>

      <!-- Секция "Предложение решения" -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FFB800;">
          <p class="signal-direction-label">Предложение решения</p>
          
          <div class="signal-rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion3" class="signal-question-label">{{ currentQuestion3 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.constructiveSuggestions" 
            @focus="startRotation(3)" 
            rows="3" 
            placeholder="Предложите, как это можно исправить..." 
            required>
          </textarea>
          
          <!-- Подсказки-баблы для решений -->
          <div class="signal-suggestions-container">
            <div 
              v-for="suggestion in currentSuggestions.solutions" 
              :key="suggestion"
              class="signal-suggestion-bubble signal-solution-bubble"
              @click="selectSuggestion('constructiveSuggestions', suggestion, 'solutions')"
            >
              {{ suggestion }}
            </div>
            <!-- Кнопка возврата к начальным вариантам -->
            <div 
              v-if="!isInitialSuggestions('solutions')"
              class="signal-suggestion-bubble signal-reset-bubble signal-solution-bubble"
              @click="resetSuggestions('solutions')"
            >
              ← Ещё варианты
            </div>
          </div>
          
          <p class="signal-example-hint" v-html="'Пример: «Добавить на кассе <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»'"></p>
        </div>
      </div>

      <!-- БОЛЬШАЯ LIQUID BUBBLE КНОПКА КОПИРОВАНИЯ ВНИЗУ - ВСЕГДА ВИДНА -->
      <div class="signal-copy-button-container">
        <button 
          class="signal-liquid-copy-btn signal-main-copy"
          :class="[
            selectedSection === 'emotions' ? 'signal-emotion-copy' : '',
            selectedSection === 'facts' ? 'signal-fact-copy' : '',
            selectedSection === 'solutions' ? 'signal-solution-copy' : '',
            !hasAnyText ? 'signal-copy-disabled' : ''
          ]"
          @click="hasAnyText ? copyCurrentSectionText() : null"
          :disabled="copyStatus.main === 'copying' || !hasAnyText"
        >
          <!-- SVG иконка буфера обмена -->
          <svg class="signal-copy-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" fill="none"/>
            <path v-if="copyStatus.main === 'copied'" d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
            <path v-else-if="copyStatus.main === 'copying'" d="M12 6v6l4-4-4-4" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          
          <span class="signal-liquid-copy-text">
            {{ 
              !hasAnyText ? 'Введите текст для копирования' :
              copyStatus.main === 'copied' ? 'Скопировано' : 
              copyStatus.main === 'copying' ? 'Копирование...' : 
              'Скопировать' 
            }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onUnmounted, computed } from 'vue';

const form = reactive({ 
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: ''
});

// Состояние кнопок копирования
const copyStatus = reactive({
  main: 'idle', // 'idle', 'copying', 'copied'
});

const sections = [
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' }
];

const selectedSection = ref('emotions');
const isActive = (id) => id === selectedSection.value;

// Проверяем, есть ли текст в любом из полей
const hasAnyText = computed(() => {
  return form.emotionalRelease.trim() || form.factualAnalysis.trim() || form.constructiveSuggestions.trim();
});

// Функция копирования текста текущей секции
const copyCurrentSectionText = async () => {
  if (!hasAnyText.value) return;
  
  let textToCopy = '';
  
  if (selectedSection.value === 'emotions' && form.emotionalRelease.trim()) {
    textToCopy = form.emotionalRelease.trim();
  } else if (selectedSection.value === 'facts' && form.factualAnalysis.trim()) {
    textToCopy = form.factualAnalysis.trim();
  } else if (selectedSection.value === 'solutions' && form.constructiveSuggestions.trim()) {
    textToCopy = form.constructiveSuggestions.trim();
  }
  
  if (!textToCopy) return;
  
  copyStatus.main = 'copying';
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    copyStatus.main = 'copied';
    
    // Сброс статуса через 2 секунды
    setTimeout(() => {
      copyStatus.main = 'idle';
    }, 2000);
  } catch (err) {
    console.error('Ошибка копирования:', err);
    copyStatus.main = 'idle';
    
    // Fallback для старых браузеров
    try {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      
      copyStatus.main = 'copied';
      setTimeout(() => {
        copyStatus.main = 'idle';
      }, 2000);
    } catch (fallbackError) {
      console.error('Fallback копирование не удалось:', fallbackError);
    }
  }
};

// ПОЛНАЯ 3-УРОВНЕВАЯ система подсказок из исходного кода
const suggestions = reactive({
  emotions: {
    // УРОВЕНЬ 1: Основные эмоции
    initial: ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён'],
    
    // УРОВЕНЬ 2: Причины эмоций
    'расстроен': ['долго ждал', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
    'разочарован': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
    'недоволен': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
    'возмущён': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами'],
    'удивлён': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком', 'отношением'],
    
    // УРОВЕНЬ 3: Детали эмоциональных переживаний
    'долго ждал': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
    'грязная посуда': ['следы помады', 'остатки еды', 'жирные пятна', 'засохший кофе', 'странный запах'],
    'холодный кофе': ['едва теплый', 'совсем остыл', 'подали холодным', 'остыл пока ждал', 'температура комнатная'],
    'грубый персонал': ['не поздоровались', 'хамили', 'игнорировали', 'были раздражены', 'повысили голос'],
    'забыли заказ': ['через 40 минут', 'не записали', 'потеряли чек', 'не передали на кухню', 'сидел и ждал'],
    'качеством': ['хуже чем обычно', 'не соответствует цене', 'испортилось за месяц', 'как в фастфуде', 'совсем не то'],
    'сервисом': ['медленный', 'невнимательный', 'равнодушный', 'непрофессиональный', 'хаотичный'],
    'ожиданиями': ['ждал большего', 'по отзывам лучше', 'раньше было вкуснее', 'не оправдал репутацию', 'переоценил место'],
    'атмосферой': ['шумно и грязно', 'неуютно', 'холодно', 'плохая музыка', 'неприятные запахи'],
    'чистотой': ['грязные столы', 'липкий пол', 'немытая посуда', 'пыль везде', 'антисанитария'],
    'обслуживанием': ['долгое ожидание', 'путаница в заказах', 'невежливость', 'игнорирование', 'ошибки кассира'],
    'очередью': ['не двигалась', 'час стоял', 'нет системы', 'хаос', 'всех пропускают'],
    'ошибкой в заказе': ['не тот напиток', 'забыли позицию', 'неправильный размер', 'другой сироп', 'перепутали'],
    'температурой блюд': ['холодные', 'остывшие', 'чуть теплые', 'не разогрели', 'ледяные'],
    'упаковкой': ['протекающие крышки', 'слабые пакеты', 'разорвалась', 'неудобная', 'грязная'],
    'антисанитарией': ['грязные руки', 'упал и подали', 'на полу готовят', 'мухи', 'тараканы'],
    'хамством': ['нагрубили', 'оскорбили', 'накричали', 'показали характер', 'послали'],
    'обманом': ['не тот объем', 'обвесили', 'скрыли стоимость', 'навязали', 'обсчитали'],
    'некачественной едой': ['испорченная', 'несвежая', 'странный вкус', 'горькая', 'кислая'],
    'инородными предметами': ['волосы в еде', 'пластик в круассане', 'проволока', 'нитки', 'жук'],
    'таким сервисом': ['впервые такое', 'не ожидал', 'шокирован', 'не верю', 'ужасно'],
    'проблемами': ['постоянные', 'одни и те же', 'системные', 'не решаются', 'игнорируются'],
    'невниманием': ['не слушают', 'не реагируют', 'все равно', 'безразличие', 'не заботятся'],
    'беспорядком': ['хаос', 'непорядок', 'бардак', 'неорганизованность', 'суета'],
    'отношением': ['пренебрежение', 'высокомерие', 'равнодушие', 'неуважение', 'хамство']
  },
  
  facts: {
    // УРОВЕНЬ 1: Основные категории проблем
    initial: ['ожидание', 'ошибка в заказе', 'качество блюд', 'чистота', 'персонал'],
    
    // УРОВЕНЬ 2: Детали проблем
    'ожидание': ['20 минут', '30 минут', 'более часа', 'забыли заказ', 'очередь не двигалась'],
    'ошибка в заказе': ['не тот напиток', 'не доложили позицию', 'неправильный соус', 'перепутали объём', 'другое молоко'],
    'качество блюд': ['холодный кофе', 'невкусная еда', 'недоваренный рис', 'комочки в матче', 'чёрствая выпечка'],
    'чистота': ['грязная посуда', 'волосы в еде', 'грязная уборная', 'насекомые', 'пластик в круассане'],
    'персонал': ['грубость', 'невнимательность', 'некомпетентность', 'трогали еду руками', 'не извинились'],
    
    // УРОВЕНЬ 3: Конкретные детали инцидентов
    '20 минут': ['засекал по часам', 'спросил у соседнего стола', 'заказал в 14:30, получил в 14:50', 'долгое ожидание для простого заказа', 'других обслужили быстрее'],
    '30 минут': ['полчаса точно', 'с 15:00 до 15:30', 'дважды подходил узнать', 'время на телефоне показало', 'успел прочитать новости'],
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
    'недоваренный рис': ['недоваренный рис, не свежий лайм и черный волос в редисе', 'жесткий', 'сырой', 'хрустит на зубах', 'не доварили'],
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
    // УРОВЕНЬ 1: Основные направления решений
    initial: ['таймер ожидания', 'обучение персонала', 'контроль качества', 'система проверки', 'стандарты сервиса'],
    
    // УРОВЕНЬ 2: Конкретные решения
    'таймер ожидания': ['на кассе', 'видимый гостям', 'с уведомлениями', 'контроль времени', 'цифровая очередь'],
    'обучение персонала': ['по сервису', 'по санитарии', 'по качеству', 'по коммуникации', 'регулярные тренинги'],
    'контроль качества': ['проверка блюд', 'температурный контроль', 'свежесть продуктов', 'упаковка', 'дегустация'],
    'система проверки': ['чек-лист качества', 'двойная проверка', 'контроль чистоты', 'стандарты подачи', 'фото блюд'],
    'стандарты сервиса': ['вежливость', 'скорость', 'точность', 'чистота', 'профессионализм'],
    
    // УРОВЕНЬ 3: Детальные технические решения
    'на кассе': ['большой дисплей', 'видимый всем', 'с номерами заказов', 'обновляется в реальном времени', 'со звуковым сигналом'],
    'видимый гостям': ['на стене', 'над барной стойкой', 'в мобильном приложении', 'на столике с номером', 'на чеке QR-код'],
    'с уведомлениями': ['СМС о готовности', 'push в приложении', 'звонок менеджера', 'вибрация трекера', 'email уведомления'],
    'контроль времени': ['стандарт 10 минут', 'красная зона после 15 мин', 'автоматический сигнал', 'статистика по сменам', 'штрафы за превышение'],
    'цифровая очередь': ['номерки электронные', 'бронь времени', 'предзаказ', 'онлайн статус', 'мобильная очередь'],
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
});

// Текущие подсказки для каждого поля
const currentSuggestions = reactive({
  emotions: [...suggestions.emotions.initial],
  facts: [...suggestions.facts.initial],
  solutions: [...suggestions.solutions.initial]
});

// Выбранные подсказки (для построения цепочек)
const selectedSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});

// Счетчики веток для улучшенного разделения текста
const branchCounters = reactive({
  emotions: 0,
  facts: 0,
  solutions: 0
});

const phrasesForQuestion1 = ['Что вас расстроило сегодня?', 'Какое впечатление осталось после визита?', 'Оправдались ли ваши ожидания?'];
const phrasesForQuestion2 = ['Что конкретно пошло не так?', 'Опишите факты: что, когда и где произошло.', 'Кто-то из персонала был вовлечен?'];
const phrasesForQuestion3 = ['Как бы вы это исправили?', 'Что могло бы предотвратить эту ситуацию?', 'Какое одно изменение сделало бы ваш опыт идеальным?'];

const currentQuestion1 = ref(phrasesForQuestion1[0]);
const currentQuestion2 = ref(phrasesForQuestion2[0]);
const currentQuestion3 = ref(phrasesForQuestion3[0]);

let rotationInterval = null;
let currentQuestionIndex1 = 0;
let currentQuestionIndex2 = 0;
let currentQuestionIndex3 = 0;

// Проверка, являются ли текущие подсказки начальными
function isInitialSuggestions(suggestionType) {
  return JSON.stringify(currentSuggestions[suggestionType]) === JSON.stringify(suggestions[suggestionType].initial);
}

// Сброс подсказок к начальным вариантам
function resetSuggestions(suggestionType) {
  currentSuggestions[suggestionType] = [...suggestions[suggestionType].initial];
}

// УЛУЧШЕННАЯ функция выбора подсказки с разделением веток
function selectSuggestion(fieldName, suggestion, suggestionType) {
  const currentText = form[fieldName].trim();
  
  // Определяем, начинается ли новая ветка
  const isNewBranch = isInitialSuggestions(suggestionType);
  
  if (currentText) {
    if (isNewBranch) {
      // Новая ветка - добавляем с точкой и заглавной буквы
      form[fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
      branchCounters[suggestionType]++;
    } else {
      // Продолжение ветки - добавляем через пробел
      form[fieldName] = currentText + ' ' + suggestion;
    }
  } else {
    // Первый выбор
    form[fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    branchCounters[suggestionType] = 1;
  }
  
  // Сохраняем выбранную подсказку
  selectedSuggestions[suggestionType].push(suggestion);
  
  // Обновляем доступные подсказки на основе выбора
  updateSuggestions(suggestionType, suggestion);
}

// Обновление подсказок на основе выбора
function updateSuggestions(suggestionType, selectedWord) {
  const nextSuggestions = suggestions[suggestionType][selectedWord];
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions];
  } else {
    // Если нет продолжения цепочки, показываем начальные подсказки
    currentSuggestions[suggestionType] = [...suggestions[suggestionType].initial];
  }
}

function startRotation(questionNum) {
  clearInterval(rotationInterval);
  rotationInterval = setInterval(() => {
    if (questionNum === 1) {
      currentQuestionIndex1 = (currentQuestionIndex1 + 1) % phrasesForQuestion1.length;
      currentQuestion1.value = phrasesForQuestion1[currentQuestionIndex1];
    } else if (questionNum === 2) {
      currentQuestionIndex2 = (currentQuestionIndex2 + 1) % phrasesForQuestion2.length;
      currentQuestion2.value = phrasesForQuestion2[currentQuestionIndex2];
    } else if (questionNum === 3) {
      currentQuestionIndex3 = (currentQuestionIndex3 + 1) % phrasesForQuestion3.length;
      currentQuestion3.value = phrasesForQuestion3[currentQuestionIndex3];
    }
  }, 3000);
}

onUnmounted(() => {
  clearInterval(rotationInterval);
});
</script>

<style scoped>
:root {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.signal-demo-wrapper {
  font-family: var(--signal-font-sans);
  width: 100%;
  max-width: none;
  margin: 0;
}

.signal-demo__header {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.signal-demo__switch {
  display: flex;
  gap: 8px;
  padding: 0;
  background: transparent;
  margin: 0;
}

.signal-demo__switch-btn {
  appearance: none;
  border: 2px solid #2c2c2f;
  background: transparent;
  color: #f0f0f0;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, font-weight 0.15s ease;
  font-family: var(--signal-font-sans);
  text-transform: none;
}

.signal-demo__switch-btn.emotions.is-active {
  background: rgba(169, 114, 255, 0.14);
  border-color: #A972FF;
  font-weight: 700;
  color: #A972FF;
}

.signal-demo__switch-btn.facts.is-active {
  background: rgba(61, 220, 132, 0.14);
  border-color: #3DDC84;
  font-weight: 700;
  color: #3DDC84;
}

.signal-demo__switch-btn.solutions.is-active {
  background: rgba(255, 184, 0, 0.14);
  border-color: #FFB800;
  font-weight: 700;
  color: #FFB800;
}

.signal-demo__switch-btn:hover {
  border-color: #A972FF;
}

.signal-demo__form-container {
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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

.signal-direction-label {
  font-weight: 600;
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  display: block;
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

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

textarea {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--signal-font-sans);
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

::placeholder { color: #666; }

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
}

.signal-fact-bubble {
  background: rgba(61, 220, 132, 0.1);
  border-color: rgba(61, 220, 132, 0.3);
  color: #3DDC84;
}

.signal-fact-bubble:hover {
  background: #3DDC84;
  color: #000;
}

.signal-solution-bubble {
  background: rgba(255, 184, 0, 0.1);
  border-color: rgba(255, 184, 0, 0.3);
  color: #FFB800;
}

.signal-solution-bubble:hover {
  background: #FFB800;
  color: #000;
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
  line-height: 1.2; /* Уменьшено с обычного 1.4-1.5 до 1.2 для более плотного расположения строк */
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
}

/* БОЛЬШАЯ LIQUID BUBBLE КНОПКА КОПИРОВАНИЯ ВНИЗУ - ВСЕГДА ВИДНА */
.signal-copy-button-container {
  margin-top: 2rem;
}

.signal-liquid-copy-btn.signal-main-copy {
  position: relative;
  width: 100%;
  height: 56px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: var(--signal-font-sans);
  white-space: nowrap;
}

.signal-liquid-copy-btn.signal-main-copy::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, var(--accent-color), rgba(255, 255, 255, 0.2));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: filter 0.4s ease;
  z-index: 1;
}

.signal-liquid-copy-btn.signal-main-copy::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 18px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 70%),
              #2a2a2e;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.signal-copy-icon {
  position: relative;
  z-index: 3;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.signal-liquid-copy-text {
  position: relative;
  z-index: 3;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* НЕАКТИВНОЕ СОСТОЯНИЕ КНОПКИ */
.signal-copy-disabled {
  --accent-color: #666;
  opacity: 0.5;
  cursor: not-allowed !important;
}

.signal-copy-disabled .signal-copy-icon,
.signal-copy-disabled .signal-liquid-copy-text {
  color: #666 !important;
}

.signal-copy-disabled::before {
  background: linear-gradient(135deg, #666, rgba(102, 102, 102, 0.3)) !important;
}

.signal-copy-disabled::after {
  background: radial-gradient(circle at 30% 30%, rgba(102, 102, 102, 0.1) 0%, transparent 70%),
              #2a2a2e !important;
}

.signal-copy-disabled:hover::before {
  filter: none !important;
}

.signal-copy-disabled:hover::after {
  background: radial-gradient(circle at 30% 30%, rgba(102, 102, 102, 0.1) 0%, transparent 70%),
              #2a2a2e !important;
}

.signal-copy-disabled:hover .signal-copy-icon {
  transform: none !important;
}

.signal-copy-disabled:hover .signal-liquid-copy-text {
  color: #666 !important;
}

/* Цветовые вариации для разных секций */
.signal-emotion-copy:not(.signal-copy-disabled) {
  --accent-color: #A972FF;
}

.signal-emotion-copy:not(.signal-copy-disabled) .signal-copy-icon,
.signal-emotion-copy:not(.signal-copy-disabled) .signal-liquid-copy-text {
  color: #A972FF;
}

.signal-emotion-copy:not(.signal-copy-disabled):hover::before {
  filter: brightness(1.5) saturate(1.3);
}

.signal-emotion-copy:not(.signal-copy-disabled):hover::after {
  background: radial-gradient(circle at 30% 30%, rgba(169, 114, 255, 0.2) 0%, rgba(169, 114, 255, 0.05) 100%),
              #2a2a2e;
}

.signal-emotion-copy:not(.signal-copy-disabled):hover .signal-copy-icon {
  transform: scale(1.2);
}

.signal-emotion-copy:not(.signal-copy-disabled):hover .signal-liquid-copy-text {
  color: rgba(169, 114, 255, 0.9);
}

.signal-fact-copy:not(.signal-copy-disabled) {
  --accent-color: #3DDC84;
}

.signal-fact-copy:not(.signal-copy-disabled) .signal-copy-icon,
.signal-fact-copy:not(.signal-copy-disabled) .signal-liquid-copy-text {
  color: #3DDC84;
}

.signal-fact-copy:not(.signal-copy-disabled):hover::before {
  filter: brightness(1.5) saturate(1.3);
}

.signal-fact-copy:not(.signal-copy-disabled):hover::after {
  background: radial-gradient(circle at 30% 30%, rgba(61, 220, 132, 0.2) 0%, rgba(61, 220, 132, 0.05) 100%),
              #2a2a2e;
}

.signal-fact-copy:not(.signal-copy-disabled):hover .signal-copy-icon {
  transform: scale(1.2);
}

.signal-fact-copy:not(.signal-copy-disabled):hover .signal-liquid-copy-text {
  color: rgba(61, 220, 132, 0.9);
}

.signal-solution-copy:not(.signal-copy-disabled) {
  --accent-color: #FFB800;
}

.signal-solution-copy:not(.signal-copy-disabled) .signal-copy-icon,
.signal-solution-copy:not(.signal-copy-disabled) .signal-liquid-copy-text {
  color: #FFB800;
}

.signal-solution-copy:not(.signal-copy-disabled):hover::before {
  filter: brightness(1.5) saturate(1.3);
}

.signal-solution-copy:not(.signal-copy-disabled):hover::after {
  background: radial-gradient(circle at 30% 30%, rgba(255, 184, 0, 0.2) 0%, rgba(255, 184, 0, 0.05) 100%),
              #2a2a2e;
}

.signal-solution-copy:not(.signal-copy-disabled):hover .signal-copy-icon {
  transform: scale(1.2);
}

.signal-solution-copy:not(.signal-copy-disabled):hover .signal-liquid-copy-text {
  color: rgba(255, 184, 0, 0.9);
}

/* Состояние disabled для процесса копирования */
.signal-liquid-copy-btn:disabled:not(.signal-copy-disabled) {
  cursor: not-allowed;
  opacity: 0.6;
}

.signal-liquid-copy-btn:disabled:not(.signal-copy-disabled)::before {
  filter: grayscale(1);
}

.signal-liquid-copy-btn:disabled:not(.signal-copy-disabled):hover::after {
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 70%),
              #2a2a2e;
}

.signal-liquid-copy-btn:disabled:not(.signal-copy-disabled):hover .signal-copy-icon {
  transform: none;
}

@media (max-width: 768px) {
  .signal-demo__form-container {
    padding: 1.5rem;
  }
  .signal-rotating-phrase-container {
    height: 65px;
  }
  .signal-question-label {
    font-size: 0.95rem;
  }
  .signal-suggestions-container {
    gap: 0.4rem;
  }
  .signal-suggestion-bubble {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
  }
  .signal-demo__switch {
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
  }
  .signal-demo__switch-btn {
    font-size: 0.85em;
    padding: 6px 10px;
  }
  .signal-copy-button-container {
    margin-top: 1.5rem;
  }
  .signal-liquid-copy-btn.signal-main-copy {
    height: 52px;
    gap: 10px;
  }
  .signal-copy-icon {
    width: 16px;
    height: 16px;
  }
  .signal-liquid-copy-text {
    font-size: 15px;
  }
  .signal-example-hint {
    line-height: 1.1; /* Еще более плотно на мобильных */
  }
}

@media (max-width: 480px) {
  .signal-liquid-copy-btn.signal-main-copy {
    height: 48px;
    gap: 8px;
  }
  .signal-copy-icon {
    width: 15px;
    height: 15px;
  }
  .signal-liquid-copy-text {
    font-size: 14px;
  }
  .signal-example-hint {
    line-height: 1.05; /* Минимальное межстрочное расстояние на очень маленьких экранах */
  }
}
</style>
