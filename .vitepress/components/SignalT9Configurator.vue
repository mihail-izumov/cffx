<template>
  <div class="signal-demo-wrapper">
    <!-- Переключатель секций - хлебные крошки -->
    <div class="signal-demo__header">
      <div class="signal-demo__breadcrumbs" role="tablist" aria-label="Секции формы">
        <button
          v-for="(section, index) in sections"
          :key="section.id"
          class="signal-breadcrumb"
          :class="[section.id, isActive(section.id) ? 'is-active' : '']"
          type="button"
          role="tab"
          :aria-selected="isActive(section.id)"
          @click="selectedSection = section.id"
        >
          <div class="signal-breadcrumb-circle"></div>
        </button>
      </div>
    </div>

    <!-- Блок с кнопкой информации и переключателем пола в одну строку -->
    <div class="signal-controls-row">
      <!-- Кнопка "Как сделать лучше" -->
      <button 
        type="button" 
        class="signal-info-button"
        :class="{ 
          'signal-info-female': selectedGender === 'female',
          'signal-info-male': selectedGender === 'male'
        }"
        aria-haspopup="dialog" 
        aria-controls="signal-dialog" 
        :aria-expanded="showInfoModal ? 'true' : 'false'"
        @click="showInfoModal = true"
      >
        Как сделать лучше
      </button>

      <!-- Переключатель пола -->
      <div class="signal-gender-switch">
        <div class="signal-gender-container">
          <div 
            class="signal-gender-btn signal-gender-female"
            :class="{ 'is-active': selectedGender === 'female' }"
            @click="selectedGender = 'female'; updateSuggestionsForGender()"
          ></div>
          <div 
            class="signal-gender-btn signal-gender-male"
            :class="{ 'is-active': selectedGender === 'male' }"
            @click="selectedGender = 'male'; updateSuggestionsForGender()"
          ></div>
        </div>
      </div>
    </div>

    <!-- Информационное модальное окно -->
    <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
      <div class="modal" role="dialog" aria-modal="true" id="signal-dialog" aria-label="Информация о Сигнале">
        <div class="modal-header">
          <div class="modal-title">Сделайте этот отзыв персональным.</div>
        </div>
        <div class="modal-body">
          Сейчас ваш отзыв выглядит как спам из-за работы алгоритмов, но вы можете сделать текст более личным, используя план отзыва и подсказки.<br><br>
          <a href="https://cffx.ru/signals.html" target="_blank" class="modal-link no-vitepress-style">Как Работает Сигнал</a>
        </div>
        <div class="modal-footer">
          <button class="modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>

    <!-- Контейнер с формой -->
    <div class="signal-demo__form-container">
      <!-- Секция "Поделитесь" -->
      <div v-if="selectedSection === 'share'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #6B7280;">
          <div class="signal-rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestionShare" class="signal-question-label">{{ currentQuestionShare }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.shareExperience" 
            @focus="startRotation('share')" 
            :rows="isMobile ? 5 : 3"
            placeholder="Поделитесь своим впечатлением..." 
            required>
          </textarea>
          
          <p class="signal-example-hint">Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»</p>
        </div>
      </div>

      <!-- Секция "Эмоции и чувства" -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
          <div class="signal-rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1" class="signal-question-label" ref="questionRef1">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.emotionalRelease" 
            @focus="startRotation(1)" 
            :rows="isMobile ? 5 : 3"
            :placeholder="selectedGender === 'female' ? 'Разочарована ожиданиями...' : 'Разочарован ожиданиями...'" 
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
        </div>
      </div>

      <!-- Секция "Детали проблемы" -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #3DDC84;">
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
        </div>
      </div>

      <!-- Секция "Предложение решения" -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FFB800;">
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
        </div>
      </div>

      <!-- Секция "Итого" -->
      <div v-if="selectedSection === 'summary'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FF6B6B;">
          <p class="signal-direction-label">План вашего отзыва</p>
          
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">От эмоций до конструктивных предложений</p>
          </div>
          <textarea 
            v-model="form.summaryText" 
            :rows="isMobile ? 8 : 6"
            placeholder="Здесь появится план вашего отзыва..."
          ></textarea>
          
          <p class="signal-example-hint">Конструктивный отзыв = сумма Ваших эмоций, фактов и решений.</p>
        </div>

        <!-- КНОПКА СУММИРОВАТЬ - только в секции Итого -->
        <div class="signal-humanize-button-container">
          <button 
            class="signal-liquid-humanize-btn"
            @click="hasContentToSummarize ? summarizeAllContent() : null"
            :disabled="humanizeStatus === 'processing' || !hasContentToSummarize"
          >
            <svg class="signal-humanize-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            
            <span class="signal-liquid-humanize-text">
              {{ 
                !hasContentToSummarize ? 'Заполните вкладки' :
                humanizeStatus === 'completed' ? 'Готово' : 
                humanizeStatus === 'processing' ? 'Суммирование...' : 
                'Суммировать отзыв'
              }}
            </span>
          </button>
        </div>

        <!-- КНОПКА КОПИРОВАНИЯ - только на вкладке Итого -->
        <div class="signal-copy-button-container">
          <button 
            class="signal-liquid-copy-btn signal-main-copy signal-summary-copy"
            :class="{ 'signal-copy-disabled': !form.summaryText.trim() }"
            @click="form.summaryText.trim() ? copyCurrentSectionText() : null"
            :disabled="copyStatus.main === 'copying' || !form.summaryText.trim()"
          >
            <svg class="signal-copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" fill="none"/>
              <path v-if="copyStatus.main === 'copied'" d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
              <path v-else-if="copyStatus.main === 'copying'" d="M12 6v6l4-4-4-4" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            
            <span class="signal-liquid-copy-text">
              {{ 
                !form.summaryText.trim() ? 'Скопировать' :
                copyStatus.main === 'copied' ? 'Скопировано' : 
                copyStatus.main === 'copying' ? 'Копирование...' : 
                'Скопировать' 
              }}
            </span>
          </button>
        </div>
      </div>

      <!-- КНОПКА ДАЛЬШЕ - для всех секций кроме Итого -->
      <div v-if="selectedSection !== 'summary'" class="signal-next-button-container">
        <button 
          class="signal-liquid-next-btn"
          :class="[
            selectedSection === 'share' ? 'signal-share-next' : '',
            selectedSection === 'emotions' ? 'signal-emotion-next' : '',
            selectedSection === 'facts' ? 'signal-fact-next' : '',
            selectedSection === 'solutions' ? 'signal-solution-next' : '',
            !hasCurrentSectionText ? 'signal-next-disabled' : ''
          ]"
          @click="hasCurrentSectionText ? goToNextSection() : null"
          :disabled="nextStatus === 'processing' || !hasCurrentSectionText"
        >
          <span class="signal-liquid-next-text">Дальше</span>
          <svg class="signal-next-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onUnmounted, computed, onMounted } from 'vue';

const form = reactive({ 
  shareExperience: '',
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  summaryText: ''
});

const isMobile = ref(false);
const questionRef1 = ref(null);
const questionRef2 = ref(null);
const questionRef3 = ref(null);
const selectedGender = ref('female');
const humanizeStatus = ref('idle');
const nextStatus = ref('idle');
const showInfoModal = ref(false);

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    showInfoModal.value = false;
  }
};

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('keydown', onKeydown);
  updateSuggestionsForGender();
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});

const copyStatus = reactive({
  main: 'idle'
});

const sections = [
  { id: 'share', title: 'Поделитесь' },
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' },
  { id: 'summary', title: 'Итого' }
];

const selectedSection = ref('share');
const isActive = (id) => id === selectedSection.value;

// Проверяем, есть ли текст в текущей секции
const hasCurrentSectionText = computed(() => {
  if (selectedSection.value === 'share') return form.shareExperience.trim();
  if (selectedSection.value === 'emotions') return form.emotionalRelease.trim();
  if (selectedSection.value === 'facts') return form.factualAnalysis.trim();
  if (selectedSection.value === 'solutions') return form.constructiveSuggestions.trim();
  return false;
});

const hasContentToSummarize = computed(() => {
  return form.emotionalRelease.trim() || form.factualAnalysis.trim() || form.constructiveSuggestions.trim();
});

const getCurrentSectionText = () => {
  if (selectedSection.value === 'summary') return form.summaryText.trim();
  return '';
};

// Переход к следующей секции
const goToNextSection = async () => {
  const currentIndex = sections.findIndex(s => s.id === selectedSection.value);
  
  if (selectedSection.value === 'solutions') {
    // Запускаем суммирование при переходе с "Решение"
    nextStatus.value = 'processing';
    await summarizeAllContent();
    nextStatus.value = 'idle';
  }
  
  if (currentIndex < sections.length - 1) {
    selectedSection.value = sections[currentIndex + 1].id;
  }
};

// Гендерная коррекция слов
const genderSpecificWords = {
  female: {
    'разочарован': 'разочарована', 'недоволен': 'недовольна', 'расстроен': 'расстроена',
    'огорчён': 'огорчена', 'возмущён': 'возмущена', 'удивлён': 'удивлена',
    'доволен': 'довольна', 'восхищён': 'восхищена', 'благодарен': 'благодарна',
    'был': 'была', 'заказал': 'заказала', 'ожидал': 'ожидала', 'засекал': 'засекала'
  },
  male: {
    'разочарована': 'разочарован', 'недовольна': 'недоволен', 'расстроена': 'расстроен',
    'огорчена': 'огорчён', 'возмущена': 'возмущён', 'удивлена': 'удивлён',
    'довольна': 'доволен', 'восхищена': 'восхищён', 'благодарна': 'благодарен',
    'была': 'был', 'заказала': 'заказал', 'ожидала': 'ожидал', 'засекала': 'засекал'
  }
};

function applyGenderCorrection(text, gender) {
  let result = text;
  const corrections = genderSpecificWords[gender] || {};
  
  Object.keys(corrections).forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, corrections[word]);
  });
  
  return result;
}

// УЛУЧШЕННАЯ функция структурирования БЕЗ ВЫВОДА
function structureAndCleanText(shareText, emotionalText, factualText, solutionsText, gender) {
  let result = '';
  
  // 1. Сначала текст из "Поделитесь"
  if (shareText) {
    result += shareText.trim();
  }
  
  // Функция для добавления знаков препинания
  function addPunctuation(text) {
    // Разбиваем на предложения и добавляем запятые, тире
    const sentences = text.split(/[.!]/).map(s => s.trim()).filter(s => s);
    return sentences.join(', ') + '.';
  }
  
  // 2. Эмоциональная часть
  if (emotionalText) {
    const emotions = applyGenderCorrection(emotionalText.trim(), gender);
    const emotionsFormatted = addPunctuation(emotions);
    if (result) result += ' ';
    result += emotionsFormatted;
  }
  
  // 3. Фактологическая часть
  if (factualText) {
    const facts = factualText.trim();
    const factsFormatted = addPunctuation(facts);
    if (result) result += ' ';
    result += factsFormatted;
  }
  
  // 4. Решения
  if (solutionsText) {
    const solutions = solutionsText.trim();
    const solutionsFormatted = addPunctuation(solutions);
    if (result) result += ' ';
    result += solutionsFormatted;
  }
  
  return result;
}

async function summarizeAllContent() {
  const hasContent = form.emotionalRelease.trim() || form.factualAnalysis.trim() || form.constructiveSuggestions.trim();
  if (!hasContent) return;
  
  humanizeStatus.value = 'processing';
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const structuredText = structureAndCleanText(
      form.shareExperience.trim(),
      form.emotionalRelease.trim(),
      form.factualAnalysis.trim(),
      form.constructiveSuggestions.trim(),
      selectedGender.value
    );
    
    form.summaryText = structuredText;
    humanizeStatus.value = 'completed';
    
    setTimeout(() => {
      humanizeStatus.value = 'idle';
    }, 3000);
    
  } catch (error) {
    console.error('Ошибка суммирования:', error);
    humanizeStatus.value = 'idle';
  }
}

const copyCurrentSectionText = async () => {
  if (!form.summaryText.trim()) return;
  
  copyStatus.main = 'copying';
  
  try {
    await navigator.clipboard.writeText(form.summaryText.trim());
    copyStatus.main = 'copied';
    
    setTimeout(() => {
      copyStatus.main = 'idle';
    }, 2000);
  } catch (err) {
    console.error('Ошибка копирования:', err);
    copyStatus.main = 'idle';
  }
};

// ПОЛНАЯ система подсказок
const baseSuggestions = {
  emotions: {
    initial: ['расстроена', 'разочарована', 'недовольна', 'возмущена', 'удивлена', 'довольна', 'восхищена', 'благодарна'],
    
    'расстроена': ['долго ждала', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
    'разочарована': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
    'недовольна': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
    'возмущена': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами'],
    'удивлена': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком', 'отношением'],
    
    'довольна': ['качеством кофе', 'скоростью обслуживания', 'вежливостью персонала', 'атмосферой заведения', 'чистотой помещения'],
    'восхищена': ['мастерством бариста', 'качеством десертов', 'дизайном интерьера', 'музыкальным сопровождением', 'ароматом кофе'],
    'благодарна': ['за внимание к деталям', 'за решение проблемы', 'за рекомендацию напитка', 'за уютную обстановку', 'за профессионализм'],
    
    // Уровень 3 (сокращенный для краткости)
    'долго ждала': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
    'качеством кофе': ['идеальная температура', 'богатый аромат', 'сбалансированный вкус', 'красивая подача', 'свежая обжарка']
  },
  
  facts: {
    initial: ['ожидание', 'ошибка в заказе', 'качество блюд', 'чистота', 'персонал'],
    'ожидание': ['20 минут', '30 минут', 'более часа', 'забыли заказ', 'очередь не двигалась'],
    'ошибка в заказе': ['не тот напиток', 'не доложили позицию', 'неправильный соус', 'перепутали объём', 'другое молоко']
  },
  
  solutions: {
    initial: ['таймер ожидания', 'обучение персонала', 'контроль качества', 'система проверки', 'стандарты сервиса'],
    'таймер ожидания': ['визуальный контроль бариста', 'с номерами заказов', 'видимый гостям', 'контроль времени', 'сигналы на баре'],
    'обучение персонала': ['по сервису', 'по санитарии', 'по качеству', 'по коммуникации', 'регулярные тренинги']
  }
};

const currentSuggestions = reactive({
  emotions: [...baseSuggestions.emotions.initial],
  facts: [...baseSuggestions.facts.initial],
  solutions: [...baseSuggestions.solutions.initial]
});

const selectedFirstLevelSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});

const updateSuggestionsForGender = () => {
  if (selectedGender.value === 'male') {
    currentSuggestions.emotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'].filter(
      item => !selectedFirstLevelSuggestions.emotions.includes(item.replace('ен', 'ена').replace('н', 'на'))
    );
  } else {
    currentSuggestions.emotions = baseSuggestions.emotions.initial.filter(
      item => !selectedFirstLevelSuggestions.emotions.includes(item)
    );
  }
};

// Фразы для ротатора вопросов
const phrasesForShare = [
  'Что вызвало улыбку или напряжение?',
  'Какой момент хотелось бы изменить?', 
  'Что дало ощущение уюта/суеты?',
  'Одно слово, которое осталось после визита?'
];

const phrasesForQuestion1 = [
  'Что почувствовали в эту минуту?',
  'Что вас расстроило сегодня?', 
  'Какое впечатление осталось?', 
  'Оправдались ли ожидания?'
];

const phrasesForQuestion2 = ['Что конкретно пошло не так?', 'Опишите факты происшедшего', 'Кто был вовлечен?'];
const phrasesForQuestion3 = ['Как это исправить?', 'Что предотвратит проблему?', 'Ваши предложения?'];

const currentQuestionShare = ref(phrasesForShare[0]);
const currentQuestion1 = ref(phrasesForQuestion1[0]);
const currentQuestion2 = ref(phrasesForQuestion2[0]);
const currentQuestion3 = ref(phrasesForQuestion3[0]);

let rotationInterval = null;

function isInitialSuggestions(suggestionType) {
  const initialSuggs = suggestionType === 'emotions' && selectedGender.value === 'male' 
    ? ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен']
    : baseSuggestions[suggestionType].initial;
  return JSON.stringify(currentSuggestions[suggestionType]) === JSON.stringify(initialSuggs.filter(
    item => !selectedFirstLevelSuggestions[suggestionType].includes(item)
  ));
}

function resetSuggestions(suggestionType) {
  selectedFirstLevelSuggestions[suggestionType] = [];
  
  if (suggestionType === 'emotions' && selectedGender.value === 'male') {
    currentSuggestions.emotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'];
  } else {
    currentSuggestions[suggestionType] = [...baseSuggestions[suggestionType].initial];
  }
}

function selectSuggestion(fieldName, suggestion, suggestionType) {
  const currentText = form[fieldName].trim();
  const isNewBranch = isInitialSuggestions(suggestionType);
  
  if (currentText) {
    if (isNewBranch) {
      form[fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    } else {
      form[fieldName] = currentText + ' ' + suggestion;
    }
  } else {
    form[fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
  }
  
  if (baseSuggestions[suggestionType].initial.includes(suggestion) || 
     (suggestionType === 'emotions' && ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'].includes(suggestion))) {
    if (!selectedFirstLevelSuggestions[suggestionType].includes(suggestion)) {
      selectedFirstLevelSuggestions[suggestionType].push(suggestion);
    }
  }
  
  updateSuggestions(suggestionType, suggestion);
}

function updateSuggestions(suggestionType, selectedWord) {
  const nextSuggestions = baseSuggestions[suggestionType][selectedWord];
  
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions];
  } else {
    if (suggestionType === 'emotions' && selectedGender.value === 'male') {
      const maleEmotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'];
      const remaining = maleEmotions.filter(item => !selectedFirstLevelSuggestions.emotions.includes(item));
      
      if (remaining.length === 0) {
        selectedFirstLevelSuggestions.emotions = [];
        currentSuggestions.emotions = [...maleEmotions];
      } else {
        currentSuggestions.emotions = remaining;
      }
    } else {
      const remaining = baseSuggestions[suggestionType].initial.filter(
        item => !selectedFirstLevelSuggestions[suggestionType].includes(item)
      );
      
      if (remaining.length === 0) {
        selectedFirstLevelSuggestions[suggestionType] = [];
        currentSuggestions[suggestionType] = [...baseSuggestions[suggestionType].initial];
      } else {
        currentSuggestions[suggestionType] = remaining;
      }
    }
  }
}

function startRotation(questionNum) {
  clearInterval(rotationInterval);
  rotationInterval = setInterval(() => {
    if (questionNum === 'share') {
      const index = phrasesForShare.indexOf(currentQuestionShare.value);
      const nextIndex = (index + 1) % phrasesForShare.length;
      currentQuestionShare.value = phrasesForShare[nextIndex];
    } else if (questionNum === 1) {
      const index = phrasesForQuestion1.indexOf(currentQuestion1.value);
      const nextIndex = (index + 1) % phrasesForQuestion1.length;
      currentQuestion1.value = phrasesForQuestion1[nextIndex];
    } else if (questionNum === 2) {
      const index = phrasesForQuestion2.indexOf(currentQuestion2.value);
      const nextIndex = (index + 1) % phrasesForQuestion2.length;
      currentQuestion2.value = phrasesForQuestion2[nextIndex];
    } else if (questionNum === 3) {
      const index = phrasesForQuestion3.indexOf(currentQuestion3.value);
      const nextIndex = (index + 1) % phrasesForQuestion3.length;
      currentQuestion3.value = phrasesForQuestion3[nextIndex];
    }
  }, 3000);
}
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
  margin-bottom: 24px;
}

/* Хлебные крошки как в квизах */
.signal-demo__breadcrumbs {
  display: flex;
  gap: 12px;
  align-items: center;
}

.signal-breadcrumb {
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.signal-breadcrumb-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #444;
  transition: all 0.3s ease;
}

/* Активная вкладка - скругленная черта */
.signal-breadcrumb.is-active .signal-breadcrumb-circle {
  width: 24px;
  height: 8px;
  border-radius: 4px;
}

/* Цвета для разных секций */
.signal-breadcrumb.share.is-active .signal-breadcrumb-circle {
  background: #6B7280;
}

.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle {
  background: #A972FF;
}

.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle {
  background: #3DDC84;
}

.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle {
  background: #FFB800;
}

.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle {
  background: #FF6B6B;
}

/* Блок с кнопкой информации и переключателем пола в одну строку */
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
  font-family: var(--signal-font-sans);
  height: 32px;
  display: flex;
  align-items: center;
}

.signal-info-button.signal-info-female {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-info-button.signal-info-female:hover {
  background: rgba(255, 105, 180, 0.2);
  border-color: rgba(255, 105, 180, 0.5);
  color: #ff1493;
}

.signal-info-button.signal-info-male {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-info-button.signal-info-male:hover {
  background: rgba(135, 206, 235, 0.2);
  border-color: rgba(135, 206, 235, 0.5);
  color: #4682b4;
}

/* Переключатель пола */
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

/* Модальное окно */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #111;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  width: min(520px, 96vw);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  padding: 32px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.modal-title {
  font-weight: 700;
  font-size: 16px;
}

.modal-body {
  margin-top: 16px;
  font-size: 14px;
  color: #fff;
  line-height: 1.5;
}

.modal-link {
  color: #a3e635;
  text-decoration: underline;
  text-decoration-color: #a3e635 !important;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.modal-link:hover {
  color: #c5f946;
  text-decoration: underline;
  text-decoration-color: #c5f946 !important;
}

.no-vitepress-style {
  text-decoration: underline !important;
  text-decoration-color: #a3e635 !important;
  border-bottom: none !important;
  background: none !important;
}

.no-vitepress-style:hover {
  text-decoration: underline !important;
  text-decoration-color: #c5f946 !important;
  border-bottom: none !important;
  background: none !important;
}

.modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.modal-ok {
  background: #222;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
}

.modal-ok:hover {
  background: #333;
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
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.signal-liquid-humanize-btn {
  position: relative;
  width: 100%;
  height: 56px;
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
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* КНОПКА КОПИРОВАНИЯ - только на Итого */
.signal-copy-button-container {
  margin-top: 1rem;
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

.signal-copy-disabled {
  --accent-color: #666;
  opacity: 0.5;
  cursor: not-allowed !important;
}

.signal-summary-copy:not(.signal-copy-disabled) {
  --accent-color: #FF6B6B;
}

.signal-summary-copy:not(.signal-copy-disabled) .signal-copy-icon,
.signal-summary-copy:not(.signal-copy-disabled) .signal-liquid-copy-text {
  color: #FF6B6B;
}

/* КНОПКА ДАЛЬШЕ */
.signal-next-button-container {
  margin-top: 1rem;
}

.signal-liquid-next-btn {
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

.signal-liquid-next-btn::before {
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

.signal-liquid-next-btn::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 18px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 70%),
              #2a2a2e;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.signal-next-icon {
  position: relative;
  z-index: 3;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.signal-liquid-next-text {
  position: relative;
  z-index: 3;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Цвета для разных секций */
.signal-share-next:not(.signal-next-disabled) {
  --accent-color: #6B7280;
}

.signal-share-next:not(.signal-next-disabled) .signal-next-icon,
.signal-share-next:not(.signal-next-disabled) .signal-liquid-next-text {
  color: #6B7280;
}

.signal-emotion-next:not(.signal-next-disabled) {
  --accent-color: #A972FF;
}

.signal-emotion-next:not(.signal-next-disabled) .signal-next-icon,
.signal-emotion-next:not(.signal-next-disabled) .signal-liquid-next-text {
  color: #A972FF;
}

.signal-fact-next:not(.signal-next-disabled) {
  --accent-color: #3DDC84;
}

.signal-fact-next:not(.signal-next-disabled) .signal-next-icon,
.signal-fact-next:not(.signal-next-disabled) .signal-liquid-next-text {
  color: #3DDC84;
}

.signal-solution-next:not(.signal-next-disabled) {
  --accent-color: #FFB800;
}

.signal-solution-next:not(.signal-next-disabled) .signal-next-icon,
.signal-solution-next:not(.signal-next-disabled) .signal-liquid-next-text {
  color: #FFB800;
}

.signal-next-disabled {
  --accent-color: #666;
  opacity: 0.5;
  cursor: not-allowed !important;
}

.signal-next-disabled .signal-next-icon,
.signal-next-disabled .signal-liquid-next-text {
  color: #666 !important;
}

@media (max-width: 768px) {
  .signal-controls-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .signal-demo__form-container {
    padding: 1.5rem;
  }
  
  .signal-breadcrumb-circle {
    width: 10px;
    height: 10px;
  }
  
  .signal-breadcrumb.is-active .signal-breadcrumb-circle {
    width: 20px;
    height: 6px;
    border-radius: 3px;
  }
}
</style>
