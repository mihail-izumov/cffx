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

    <!-- Переключатель пола -->
    <div class="signal-gender-switch">
      <div class="signal-gender-container">
        <div 
          class="signal-gender-btn signal-gender-female"
          :class="{ 'is-active': selectedGender === 'female' }"
          @click="selectedGender = 'female'"
        ></div>
        <div 
          class="signal-gender-btn signal-gender-male"
          :class="{ 'is-active': selectedGender === 'male' }"
          @click="selectedGender = 'male'"
        ></div>
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
              <p :key="currentQuestion1" class="signal-question-label" ref="questionRef1">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.emotionalRelease" 
            @focus="startRotation(1)" 
            :rows="isMobile ? 5 : 3"
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
              <p :key="currentQuestion2" class="signal-question-label" ref="questionRef2">{{ currentQuestion2 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.factualAnalysis" 
            @focus="startRotation(2)" 
            :rows="isMobile ? 5 : 3"
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
              <p :key="currentQuestion3" class="signal-question-label" ref="questionRef3">{{ currentQuestion3 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.constructiveSuggestions" 
            @focus="startRotation(3)" 
            :rows="isMobile ? 5 : 3"
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

      <!-- Секция "Итого" -->
      <div v-if="selectedSection === 'summary'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FF6B6B;">
          <p class="signal-direction-label">Итоговый отзыв</p>
          
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">Готовый отзыв для публикации</p>
          </div>
          <textarea 
            v-model="form.summaryText" 
            :rows="isMobile ? 8 : 6"
            placeholder="Здесь появится готовый отзыв..." 
            readonly>
          </textarea>
          
          <p class="signal-example-hint">Отзыв будет составлен из заполненных вкладок с учетом выбранного пола</p>
        </div>

        <!-- КНОПКА СУММИРОВАТЬ - только в секции Итого -->
        <div class="signal-humanize-button-container">
          <button 
            class="signal-liquid-humanize-btn"
            @click="hasAnyText ? summarizeAllContent() : null"
            :disabled="humanizeStatus === 'processing' || !hasAnyText"
          >
            <!-- SVG иконка суммирования -->
            <svg class="signal-humanize-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            
            <span class="signal-liquid-humanize-text">
              {{ 
                !hasAnyText ? 'Суммировать' :
                humanizeStatus === 'completed' ? 'Готово' : 
                humanizeStatus === 'processing' ? 'Суммирование...' : 
                'Суммировать отзыв'
              }}
            </span>
          </button>
        </div>
      </div>

      <!-- КНОПКА КОПИРОВАНИЯ - всегда видна для всех секций -->
      <div class="signal-copy-button-container">
        <button 
          class="signal-liquid-copy-btn signal-main-copy"
          :class="[
            selectedSection === 'emotions' ? 'signal-emotion-copy' : '',
            selectedSection === 'facts' ? 'signal-fact-copy' : '',
            selectedSection === 'solutions' ? 'signal-solution-copy' : '',
            selectedSection === 'summary' ? 'signal-summary-copy' : '',
            !hasAnyText ? 'signal-copy-disabled' : ''
          ]"
          @click="hasAnyText ? copyCurrentSectionText() : null"
          :disabled="copyStatus.main === 'copying' || !hasAnyText"
        >
          <!-- SVG иконка буфера обмена -->
          <svg class="signal-copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" fill="none"/>
            <path v-if="copyStatus.main === 'copied'" d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
            <path v-else-if="copyStatus.main === 'copying'" d="M12 6v6l4-4-4-4" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          
          <span class="signal-liquid-copy-text">
            {{ 
              !hasAnyText ? 'Скопировать' :
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
import { reactive, ref, onUnmounted, computed, onMounted, nextTick } from 'vue';

const form = reactive({ 
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  summaryText: ''
});

// Определение мобильного устройства
const isMobile = ref(false);

// Refs для элементов вопросов
const questionRef1 = ref(null);
const questionRef2 = ref(null);
const questionRef3 = ref(null);

// Пол пользователя
const selectedGender = ref('female');

// Состояние кнопки суммирования
const humanizeStatus = ref('idle'); // 'idle', 'processing', 'completed'

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

// Состояние кнопок копирования
const copyStatus = reactive({
  main: 'idle', // 'idle', 'copying', 'copied'
});

const sections = [
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' },
  { id: 'summary', title: 'Итого' }
];

const selectedSection = ref('emotions');
const isActive = (id) => id === selectedSection.value;

// Проверяем, есть ли текст в любом из полей (кроме итогового)
const hasAnyText = computed(() => {
  if (selectedSection.value === 'summary') {
    return form.summaryText.trim();
  }
  return form.emotionalRelease.trim() || form.factualAnalysis.trim() || form.constructiveSuggestions.trim();
});

// Проверяем, заполнено ли больше одного поля для суммирования
const hasMultipleFields = computed(() => {
  const fieldsCount = [
    form.emotionalRelease.trim(),
    form.factualAnalysis.trim(), 
    form.constructiveSuggestions.trim()
  ].filter(text => text.length > 0).length;
  
  return fieldsCount > 1;
});

// Получение текущего текста
const getCurrentSectionText = () => {
  if (selectedSection.value === 'emotions') return form.emotionalRelease.trim();
  if (selectedSection.value === 'facts') return form.factualAnalysis.trim();  
  if (selectedSection.value === 'solutions') return form.constructiveSuggestions.trim();
  if (selectedSection.value === 'summary') return form.summaryText.trim();
  return '';
};

// Гендерная коррекция слов
const genderSpecificWords = {
  female: {
    'разочарован': 'разочарована',
    'недоволен': 'недовольна', 
    'расстроен': 'расстроена',
    'огорчён': 'огорчена',
    'возмущён': 'возмущена',
    'удивлён': 'удивлена',
    'был': 'была',
    'заказал': 'заказала',
    'ожидал': 'ожидала',
    'думал': 'думала',
    'хотел': 'хотела',
    'пришёл': 'пришла',
    'сел': 'села',
    'поел': 'поела',  
    'поехал': 'поехала',
    'остался': 'осталась',
    'получил': 'получила',
    'попросил': 'попросила'
  },
  male: {
    'разочарована': 'разочарован',
    'недовольна': 'недоволен',
    'расстроена': 'расстроен',
    'огорчена': 'огорчён',
    'возмущена': 'возмущён',
    'удивлена': 'удивлён',
    'была': 'был',
    'заказала': 'заказал',
    'ожидала': 'ожидал',
    'думала': 'думал',
    'хотела': 'хотел',
    'пришла': 'пришёл',
    'села': 'сел',
    'поела': 'поел',
    'поехала': 'поехал',
    'осталась': 'остался',
    'получила': 'получил',
    'попросила': 'попросил'
  }
};

// Применение гендерной коррекции
function applyGenderCorrection(text, gender) {
  let result = text;
  const corrections = genderSpecificWords[gender] || {};
  
  Object.keys(corrections).forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, corrections[word]);
  });
  
  return result;
}

// Функция очистки и обрезания до 7 предложений
function cleanAndLimitText(text) {
  if (!text) return '';
  
  // Разбивает на предложения
  let sentences = text.split(/\.\s+/);
  
  // Удаляем пустые предложения и обрезки
  sentences = sentences.filter(sentence => {
    const cleaned = sentence.trim();
    return cleaned.length > 10 && cleaned.includes(' '); // Минимум 10 символов и содержит пробел
  });
  
  // Ограничиваем до 7 предложений
  sentences = sentences.slice(0, 7);
  
  // Убираем повторяющиеся фразы "ведь это важно", "так как это важно", "потому что это важно"
  sentences = sentences.map(sentence => {
    return sentence
      .replace(/,?\s*(ведь|так как|потому что)\s+это\s+важно/gi, '')
      .replace(/,?\s*дело в том, что\s*/gi, '. ')
      .replace(/\s+/g, ' ')
      .trim();
  }).filter(sentence => sentence.length > 5);
  
  return sentences.join('. ') + (sentences.length > 0 ? '.' : '');
}

// Улучшенная функция суммирования
const smartSummarizeAllFields = () => {
  const emotionalText = form.emotionalRelease.trim();
  const factualText = form.factualAnalysis.trim();
  const solutionsText = form.constructiveSuggestions.trim();
  
  const parts = [];
  
  if (emotionalText) parts.push(emotionalText);
  if (factualText) parts.push(factualText);
  if (solutionsText) parts.push(solutionsText);
  
  if (parts.length === 0) return '';
  
  // Простое соединение с точками
  let result = parts.join('. ');
  
  // Применяем гендерную коррекцию
  result = applyGenderCorrection(result, selectedGender.value);
  
  // Очищаем и ограничиваем
  result = cleanAndLimitText(result);
  
  // Делаем первую букву заглавной
  if (result) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  return result;
};

// Основная функция суммирования
async function summarizeAllContent() {
  const hasContent = form.emotionalRelease.trim() || form.factualAnalysis.trim() || form.constructiveSuggestions.trim();
  if (!hasContent) return;
  
  humanizeStatus.value = 'processing';
  
  try {
    // Имитируем обработку
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Генерируем суммированный текст
    const summarizedText = smartSummarizeAllFields();
    
    // Обновляем поле итогового отзыва
    form.summaryText = summarizedText;
    
    humanizeStatus.value = 'completed';
    
    // Сброс статуса через 3 секунды
    setTimeout(() => {
      humanizeStatus.value = 'idle';
    }, 3000);
    
  } catch (error) {
    console.error('Ошибка суммирования:', error);
    humanizeStatus.value = 'idle';
  }
}

// Функция копирования текста текущей секции
const copyCurrentSectionText = async () => {
  if (!hasAnyText.value) return;
  
  let textToCopy = getCurrentSectionText();
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

// ПОЛНАЯ 3-УРОВНЕВАЯ система подсказок из файла
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
    'таймер ожидания': ['визуальный контроль бариста/старшего бариста', 'с номерами заказов', 'видимый гостям', 'контроль времени', 'сигналы на баре', 'обратная связь от гостей'],
    'обучение персонала': ['по сервису', 'по санитарии', 'по качеству', 'по коммуникации', 'регулярные тренинги'],
    'контроль качества': ['проверка блюд', 'температурный контроль', 'свежесть продуктов', 'упаковка', 'дегустация'],
    'система проверки': ['чек-лист качества', 'двойная проверка', 'контроль чистоты', 'стандарты подачи', 'фото блюд'],
    'стандарты сервиса': ['вежливость', 'скорость', 'точность', 'чистота', 'профессионализм'],
    
    // УРОВЕНЬ 3: Детальные технические решения
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

.signal-demo__switch-btn.summary.is-active {
  background: rgba(255, 107, 107, 0.14);
  border-color: #FF6B6B;
  font-weight: 700;
  color: #FF6B6B;
}

.signal-demo__switch-btn:hover {
  border-color: #A972FF;
}

/* Переключатель пола - liquid bubble стиль */
.signal-gender-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.signal-gender-container {
  display: flex;
  background: #2a2a2e;
  border-radius: 20px;
  padding: 4px;
  border: 1px solid #444;
}

.signal-gender-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
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
  min-height: 1.3em;
  margin-bottom: 0.6rem;
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

textarea[readonly] {
  background-color: #1a1a1c;
  border-color: #333;
  cursor: default;
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
  line-height: 1.15;
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
}

/* КНОПКА СУММИРОВАНИЯ */
.signal-humanize-button-container {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.signal-liquid-humanize-btn {
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 18px;
  border: 2px solid #444;
  background: #2a2a2e;
  color: #888;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: var(--signal-font-sans);
  white-space: nowrap;
}

.signal-liquid-humanize-btn:not(:disabled):hover {
  border-color: #666;
  color: #bbb;
  background: #333;
}

.signal-liquid-humanize-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.signal-humanize-icon {
  position: relative;
  z-index: 3;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.signal-liquid-humanize-text {
  position: relative;
  z-index: 3;
  font-size: 15px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

/* Цветовые вариации для разных секций */
.signal-emotion-copy:not(.signal-copy-disabled) {
  --accent-color: #A972FF;
}

.signal-emotion-copy:not(.signal-copy-disabled) .signal-copy-icon,
.signal-emotion-copy:not(.signal-copy-disabled) .signal-liquid-copy-text {
  color: #A972FF;
}

.signal-fact-copy:not(.signal-copy-disabled) {
  --accent-color: #3DDC84;
}

.signal-fact-copy:not(.signal-copy-disabled) .signal-copy-icon,
.signal-fact-copy:not(.signal-copy-disabled) .signal-liquid-copy-text {
  color: #3DDC84;
}

.signal-solution-copy:not(.signal-copy-disabled) {
  --accent-color: #FFB800;
}

.signal-solution-copy:not(.signal-copy-disabled) .signal-copy-icon,
.signal-solution-copy:not(.signal-copy-disabled) .signal-liquid-copy-text {
  color: #FFB800;
}

.signal-summary-copy:not(.signal-copy-disabled) {
  --accent-color: #FF6B6B;
}

.signal-summary-copy:not(.signal-copy-disabled) .signal-copy-icon,
.signal-summary-copy:not(.signal-copy-disabled) .signal-liquid-copy-text {
  color: #FF6B6B;
}

/* Hover эффекты */
.signal-emotion-copy:not(.signal-copy-disabled):hover::before {
  filter: brightness(1.5) saturate(1.3);
}

.signal-fact-copy:not(.signal-copy-disabled):hover::before {
  filter: brightness(1.5) saturate(1.3);
}

.signal-solution-copy:not(.signal-copy-disabled):hover::before {
  filter: brightness(1.5) saturate(1.3);
}

.signal-summary-copy:not(.signal-copy-disabled):hover::before {
  filter: brightness(1.5) saturate(1.3);
}

.signal-emotion-copy:not(.signal-copy-disabled):hover .signal-copy-icon,
.signal-fact-copy:not(.signal-copy-disabled):hover .signal-copy-icon,
.signal-solution-copy:not(.signal-copy-disabled):hover .signal-copy-icon,
.signal-summary-copy:not(.signal-copy-disabled):hover .signal-copy-icon {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .signal-demo__form-container {
    padding: 1.5rem;
  }
  .signal-rotating-phrase-container {
    min-height: 2.6em;
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
    width: 12px;
    height: 12px;
  }
  .signal-liquid-copy-text {
    font-size: 15px;
  }
  .signal-example-hint {
    line-height: 1.1;
  }
  .signal-gender-btn {
    width: 20px;
    height: 20px;
  }
  .signal-humanize-button-container {
    margin-top: 1.5rem;
  }
  .signal-liquid-humanize-btn {
    height: 48px;
    gap: 10px;
  }
  .signal-humanize-icon {
    width: 12px;
    height: 12px;
  }
  .signal-liquid-humanize-text {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .signal-liquid-copy-btn.signal-main-copy {
    height: 48px;
    gap: 8px;
  }
  .signal-copy-icon {
    width: 11px;
    height: 11px;
  }
  .signal-liquid-copy-text {
    font-size: 14px;
  }
  .signal-example-hint {
    line-height: 1.05;
  }
  .signal-gender-btn {
    width: 18px;
    height: 18px;
  }
  .signal-liquid-humanize-btn {
    height: 46px;
    gap: 8px;
  }
  .signal-humanize-icon {
    width: 11px;
    height: 11px;
  }
  .signal-liquid-humanize-text {
    font-size: 13px;
  }
}
</style>
