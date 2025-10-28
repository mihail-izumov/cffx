<template>
  <div class="signal-demo-wrapper">
    <!-- Переключатель тем (Общепит / Фитнес) -->
    <div class="signal-demo__theme-switch">
      <button
        v-for="theme in themes"
        :key="theme.id"
        class="signal-demo__theme-btn"
        :class="{ 'is-active': selectedTheme === theme.id }"
        @click="selectedTheme = theme.id"
      >
        {{ theme.title }}
      </button>
    </div>

    <!-- Переключатель секций внутри темы -->
    <div class="signal-demo__header">
      <div class="signal-demo__switch" role="tablist">
        <button
          v-for="section in currentSections"
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
        <div class="signal-question-block" :style="{ '--accent-color': currentThemeConfig.colors.emotions }">
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
            :placeholder="currentThemeConfig.placeholders.emotions"
            required>
          </textarea>
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
              ← Ещё варианты
            </div>
          </div>
          <p class="signal-example-hint" v-html="currentThemeConfig.examples.emotions"></p>
        </div>
      </div>

      <!-- Секция "Детали проблемы" -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" :style="{ '--accent-color': currentThemeConfig.colors.facts }">
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
            :placeholder="currentThemeConfig.placeholders.facts"
            required>
          </textarea>
          <div class="signal-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions.facts"
              :key="suggestion"
              class="signal-suggestion-bubble signal-fact-bubble"
              @click="selectSuggestion('factualAnalysis', suggestion, 'facts')"
            >
              {{ suggestion }}
            </div>
            <div
              v-if="!isInitialSuggestions('facts')"
              class="signal-suggestion-bubble signal-reset-bubble signal-fact-bubble"
              @click="resetSuggestions('facts')"
            >
              ← Ещё варианты
            </div>
          </div>
          <p class="signal-example-hint" v-html="currentThemeConfig.examples.facts"></p>
        </div>
      </div>

      <!-- Секция "Предложение решения" -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" :style="{ '--accent-color': currentThemeConfig.colors.solutions }">
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
            :placeholder="currentThemeConfig.placeholders.solutions"
            required>
          </textarea>
          <div class="signal-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions.solutions"
              :key="suggestion"
              class="signal-suggestion-bubble signal-solution-bubble"
              @click="selectSuggestion('constructiveSuggestions', suggestion, 'solutions')"
            >
              {{ suggestion }}
            </div>
            <div
              v-if="!isInitialSuggestions('solutions')"
              class="signal-suggestion-bubble signal-reset-bubble signal-solution-bubble"
              @click="resetSuggestions('solutions')"
            >
              ← Ещё варианты
            </div>
          </div>
          <p class="signal-example-hint" v-html="currentThemeConfig.examples.solutions"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onUnmounted } from 'vue';

// === Темы ===
const themes = [
  { id: 'cafe', title: 'Общепит' },
  { id: 'fitness', title: 'Фитнес' }
];
const selectedTheme = ref('cafe');

// === Секции ===
const baseSections = [
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' }
];
const currentSections = computed(() => baseSections);

const selectedSection = ref('emotions');
const isActive = (id) => id === selectedSection.value;

// === Форма ===
const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: ''
});

// === Конфиги по темам ===
const themeConfigs = {
  cafe: {
    colors: { emotions: '#A972FF', facts: '#3DDC84', solutions: '#FFB800' },
    placeholders: {
      emotions: 'Разочарован ожиданиями...',
      facts: 'Опишите факты: что, когда и где произошло...',
      solutions: 'Предложите, как это можно исправить...'
    },
    examples: {
      emotions: 'Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»',
      facts: 'Пример: «Заказ на два капучино <b>ждал 22 минуты</b>, хотя в кафе был почти один»',
      solutions: 'Пример: «Добавить на кассе <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»'
    },
    questions: {
      1: ['Что вас расстроило сегодня?', 'Какое впечатление осталось после визита?', 'Оправдались ли ваши ожидания?'],
      2: ['Что конкретно пошло не так?', 'Опишите факты: что, когда и где произошло.', 'Кто-то из персонала был вовлечен?'],
      3: ['Как бы вы это исправили?', 'Что могло бы предотвратить эту ситуацию?', 'Какое одно изменение сделало бы ваш опыт идеальным?']
    },
    suggestions: {
      emotions: { initial: ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён'] },
      facts: { initial: ['ожидание', 'ошибка в заказе', 'качество блюд', 'чистота', 'персонал'] },
      solutions: { initial: ['таймер ожидания', 'обучение персонала', 'контроль качества', 'система проверки', 'стандарты сервиса'] }
    }
  },
  fitness: {
    colors: { emotions: '#FF6B6B', facts: '#4ECDC4', solutions: '#FFD93D' },
    placeholders: {
      emotions: 'Разочарован тренировкой...',
      facts: 'Опишите, что произошло на занятии...',
      solutions: 'Как улучшить тренировку...'
    },
    examples: {
      emotions: 'Пример: «Тренер <b>опоздал на 15 минут</b> и <b>не извинился</b>»',
      facts: 'Пример: «Музыка была <b>слишком громкой</b>, а в зале <b>душно</b>»',
      solutions: 'Пример: «Добавить <b>вентиляцию</b> и <b>таймер начала</b>»'
    },
    questions: {
      1: ['Что вас расстроило на тренировке?', 'Как прошли занятия?', 'Ожидали большего?'],
      2: ['Что пошло не так?', 'Опишите детали: время, зал, тренер.', 'Были ли нарушения?'],
      3: ['Как это исправить?', 'Что улучшит тренировку?', 'Какое одно изменение поможет?']
    },
    suggestions: {
      emotions: { initial: ['расстроен', 'разочарован', 'устал', 'возмущён', 'удивлён'] },
      facts: { initial: ['тренер опоздал', 'грязный зал', 'сломанный тренажёр', 'громкая музыка', 'душно'] },
      solutions: { initial: ['вентиляция', 'таймер начала', 'ремонт оборудования', 'тише музыка', 'уборка'] }
    }
  }
};

// === Текущая конфигурация ===
const currentThemeConfig = computed(() => themeConfigs[selectedTheme.value]);

// === Подсказки ===
const suggestions = reactive({
  emotions: { ...themeConfigs.cafe.suggestions.emotions },
  facts: { ...themeConfigs.cafe.suggestions.facts },
  solutions: { ...themeConfigs.cafe.suggestions.solutions }
});

const currentSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});

const selectedSuggestions = reactive({
  emotions: [], facts: [], solutions: []
});

const branchCounters = reactive({
  emotions: 0, facts: 0, solutions: 0
});

// === Вопросы ===
const currentQuestion1 = ref('');
const currentQuestion2 = ref('');
const currentQuestion3 = ref('');

let rotationInterval = null;
const currentQuestionIndex1 = ref(0);
const currentQuestionIndex2 = ref(0);
const currentQuestionIndex3 = ref(0);

// === Инициализация ===
watch(selectedTheme, () => {
  resetAll();
}, { immediate: true });

function resetAll() {
  // Сброс формы
  form.emotionalRelease = '';
  form.factualAnalysis = '';
  form.constructiveSuggestions = '';

  // Сброс подсказок
  const config = currentThemeConfig.value;
  suggestions.emotions = { ...config.suggestions.emotions };
  suggestions.facts = { ...config.suggestions.facts };
  suggestions.solutions = { ...config.suggestions.solutions };

  currentSuggestions.emotions = [...config.suggestions.emotions.initial];
  currentSuggestions.facts = [...config.suggestions.facts.initial];
  currentSuggestions.solutions = [...config.suggestions.solutions.initial];

  selectedSuggestions.emotions = [];
  selectedSuggestions.facts = [];
  selectedSuggestions.solutions = [];

  branchCounters.emotions = 0;
  branchCounters.facts = 0;
  branchCounters.solutions = 0;

  // Сброс вопросов
  currentQuestion1.value = config.questions[1][0];
  currentQuestion2.value = config.questions[2][0];
  currentQuestion3.value = config.questions[3][0];

  currentQuestionIndex1.value = 0;
  currentQuestionIndex2.value = 0;
  currentQuestionIndex3.value = 0;

  selectedSection.value = 'emotions';
  clearInterval(rotationInterval);
}

// === Логика подсказок ===
function isInitialSuggestions(type) {
  return JSON.stringify(currentSuggestions[type]) === JSON.stringify(suggestions[type].initial);
}

function resetSuggestions(type) {
  currentSuggestions[type] = [...suggestions[type].initial];
}

function selectSuggestion(field, suggestion, type) {
  const text = form[field].trim();
  const isNew = isInitialSuggestions(type);
  const capitalized = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);

  if (text) {
    form[field] = isNew ? `${text}. ${capitalized}` : `${text} ${suggestion}`;
  } else {
    form[field] = capitalized;
    branchCounters[type] = 1;
  }

  selectedSuggestions[type].push(suggestion);
  updateSuggestions(type, suggestion);
}

function updateSuggestions(type, word) {
  const next = suggestions[type][word];
  currentSuggestions[type] = next && next.length > 0 ? [...next] : [...suggestions[type].initial];
}

// === Вращение вопросов ===
function startRotation(num) {
  clearInterval(rotationInterval);
  const questions = currentThemeConfig.value.questions[num];
  let index = num === 1 ? currentQuestionIndex1 : num === 2 ? currentQuestionIndex2 : currentQuestionIndex3;
  const setQuestion = (i) => {
    if (num === 1) currentQuestion1.value = questions[i];
    if (num === 2) currentQuestion2.value = questions[i];
    if (num === 3) currentQuestion3.value = questions[i];
  };

  setQuestion(index.value);
  rotationInterval = setInterval(() => {
    index.value = (index.value + 1) % questions.length;
    setQuestion(index.value);
  }, 3000);
}

onUnmounted(() => clearInterval(rotationInterval));
</script>

<style scoped>
:root { --signal-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

.signal-demo-wrapper { font-family: var(--signal-font-sans); width: 100%; margin: 0; }

/* Темы */
.signal-demo__theme-switch {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}
.signal-demo__theme-btn {
  padding: 10px 20px;
  border: 2px solid #444;
  background: #2a2a2e;
  color: #ccc;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.signal-demo__theme-btn.is-active {
  background: #3a3a3e;
  border-color: #666;
  color: #fff;
}

/* Остальные стили — как в оригинале */
.signal-demo__header { display: flex; justify-content: center; margin-bottom: 16px; }
.signal-demo__switch { display: flex; gap: 8px; }
.signal-demo__switch-btn { /* ... оригинал ... */ }
.signal-demo__form-container { background: #1E1E20; border-radius: 24px; padding: 2rem; border: 1px solid #2c2c2f; box-shadow: 0 20px 40px rgba(0,0,0,0.2); color: #f0f0f0; }
/* ... остальные стили без изменений ... */
.signal-question-block { background: #2a2a2e; border-radius: 16px; padding: 1.25rem; border: 1px solid #3a3a3e; border-left: 4px solid var(--accent-color, #444); }
/* ... и так далее — копируй из оригинала ... */
</style>
