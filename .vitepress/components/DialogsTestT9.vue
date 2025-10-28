<template>
  <div class="signal-demo-wrapper">
    <!-- Tesla-style переключатель: Общепит / Фитнес -->
    <div class="signal-theme-toggle">
      <button
        class="signal-theme-btn"
        :class="{ active: selectedTheme === 'cafe' }"
        @click="selectedTheme = 'cafe'"
      >
        Общепит
      </button>
      <button
        class="signal-theme-btn"
        :class="{ active: selectedTheme === 'fitness' }"
        @click="selectedTheme = 'fitness'"
      >
        Фитнес
      </button>
      <div class="signal-theme-slider" :style="{ left: sliderLeft }"></div>
    </div>

    <!-- Твой родной переключатель: Эмоции / Факты / Решение -->
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

    <!-- Форма -->
    <div class="signal-demo__form-container">
      <!-- Эмоции -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" :style="{ '--accent-color': colors.emotions }">
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
            :placeholder="placeholders.emotions"
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
          <p class="signal-example-hint" v-html="examples.emotions"></p>
        </div>
      </div>

      <!-- Факты -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" :style="{ '--accent-color': colors.facts }">
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
            :placeholder="placeholders.facts"
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
          <p class="signal-example-hint" v-html="examples.facts"></p>
        </div>
      </div>

      <!-- Решение -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" :style="{ '--accent-color': colors.solutions }">
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
            :placeholder="placeholders.solutions"
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
          <p class="signal-example-hint" v-html="examples.solutions"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue';

// === Режимы ===
const selectedTheme = ref('cafe'); // 'cafe' | 'fitness'

// === Секции ===
const sections = [
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' }
];
const selectedSection = ref('emotions');
const isActive = (id) => id === selectedSection.value;

// === Конфиги ===
const configs = {
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
const currentConfig = computed(() => configs[selectedTheme.value]);
const colors = computed(() => currentConfig.value.colors);
const placeholders = computed(() => currentConfig.value.placeholders);
const examples = computed(() => currentConfig.value.examples);

// === Форма ===
const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: ''
});

// === Подсказки ===
const suggestions = reactive({});
const currentSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});
const selectedSuggestions = reactive({ emotions: [], facts: [], solutions: [] });
const branchCounters = reactive({ emotions: 0, facts: 0, solutions: 0 });

// === Вопросы ===
const currentQuestion1 = ref('');
const currentQuestion2 = ref('');
const currentQuestion3 = ref('');
const currentQuestionIndex1 = ref(0);
const currentQuestionIndex2 = ref(0);
const currentQuestionIndex3 = ref(0);
let rotationInterval = null;

// === Слайдер ===
const sliderLeft = computed(() => selectedTheme.value === 'cafe' ? '0%' : '50%');

// === Сброс при смене темы ===
watch(selectedTheme, () => {
  resetAll();
}, { immediate: true });

// === Инициализация ===
function resetAll() {
  const cfg = currentConfig.value;

  // Форма
  Object.keys(form).forEach(k => form[k] = '');

  // Подсказки
  Object.assign(suggestions, {
    emotions: { ...cfg.suggestions.emotions },
    facts: { ...cfg.suggestions.facts },
    solutions: { ...cfg.suggestions.solutions }
  });

  currentSuggestions.emotions = [...cfg.suggestions.emotions.initial];
  currentSuggestions.facts = [...cfg.suggestions.facts.initial];
  currentSuggestions.solutions = [...cfg.suggestions.solutions.initial];

  selectedSuggestions.emotions = [];
  selectedSuggestions.facts = [];
  selectedSuggestions.solutions = [];

  branchCounters.emotions = 0;
  branchCounters.facts = 0;
  branchCounters.solutions = 0;

  // Вопросы
  currentQuestion1.value = cfg.questions[1][0];
  currentQuestion2.value = cfg.questions[2][0];
  currentQuestion3.value = cfg.questions[3][0];

  currentQuestionIndex1.value = 0;
  currentQuestionIndex2.value = 0;
  currentQuestionIndex3.value = 0;

  selectedSection.value = 'emotions';
  clearInterval(rotationInterval);
}

// === Логика ===
function isInitialSuggestions(type) {
  return JSON.stringify(currentSuggestions[type]) === JSON.stringify(suggestions[type].initial);
}

function resetSuggestions(type) {
  currentSuggestions[type] = [...suggestions[type].initial];
}

function selectSuggestion(field, suggestion, type) {
  const text = form[field].trim();
  const isNew = isInitialSuggestions(type);
  const cap = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
  form[field] = text ? (isNew ? `${text}. ${cap}` : `${text} ${suggestion}`) : cap;
  if (!text) branchCounters[type] = 1;
  selectedSuggestions[type].push(suggestion);
  updateSuggestions(type, suggestion);
}

function updateSuggestions(type, word) {
  const next = suggestions[type][word];
  currentSuggestions[type] = next && next.length > 0 ? [...next] : [...suggestions[type].initial];
}

function startRotation(num) {
  clearInterval(rotationInterval);
  const questions = currentConfig.value.questions[num];
  let index = num === 1 ? currentQuestionIndex1 : num === 2 ? currentQuestionIndex2 : currentQuestionIndex3;
  const set = (i) => {
    if (num === 1) currentQuestion1.value = questions[i];
    if (num === 2) currentQuestion2.value = questions[i];
    if (num === 3) currentQuestion3.value = questions[i];
  };
  set(index.value);
  rotationInterval = setInterval(() => {
    index.value = (index.value + 1) % questions.length;
    set(index.value);
  }, 3000);
}

onUnmounted(() => clearInterval(rotationInterval));
</script>

<style scoped>
:root { --signal-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

.signal-demo-wrapper { font-family: var(--signal-font-sans); width: 100%; max-width: none; margin: 0; }

/* Tesla-style переключатель — с отступами и нейтральным цветом */
.signal-theme-toggle {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 420px;
  margin: 0 auto 28px;
  background: #2a2a2e;
  border-radius: 16px;
  padding: 6px;
  border: 1px solid #3a3a3e;
  overflow: hidden;
}
.signal-theme-btn {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #ccc;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 2;
  position: relative;
}
.signal-theme-btn.active {
  color: #fff;
  font-weight: 700;
}
.signal-theme-slider {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 0;
  width: 50%;
  background: #fff;
  border-radius: 12px;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* ТВОЙ ОРИГИНАЛЬНЫЙ ДИЗАЙН — 1:1 */
.signal-demo__header { display: flex; justify-content: center; margin-bottom: 16px; }
.signal-demo__switch { display: flex; gap: 8px; padding: 0; background: transparent; margin: 0; }
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
  text-transform: none;
}
.signal-demo__switch-btn.emotions.is-active { background: rgba(169,114,255,0.14); border-color: #A972FF; color: #A972FF; font-weight: 700; }
.signal-demo__switch-btn.facts.is-active { background: rgba(61,220,132,0.14); border-color: #3DDC84; color: #3DDC84; font-weight: 700; }
.signal-demo__switch-btn.solutions.is-active { background: rgba(255,184,0,0.14); border-color: #FFB800; color: #FFB800; font-weight: 700; }

.signal-demo__form-container { background-color: #1E1E20; border-radius: 24px; padding: 2rem; color: #f0f0f0; border: 1px solid #2c2c2f; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.signal-form-section { display: flex; flex-direction: column; gap: 1.5rem; }
.signal-question-block { background-color: #2a2a2e; border-radius: 16px; padding: 1.25rem; border: 1px solid #3a3a3e; border-left: 4px solid var(--accent-color, #444); }
.signal-direction-label { font-weight: 600; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: block; }
.signal-rotating-phrase-container { height: 52px; margin-bottom: 0.75rem; display: flex; align-items: flex-start; overflow: hidden; }
.signal-question-label { font-weight: 500; font-size: 1rem; margin: 0; color: #f0f0f0; line-height: 1.3; width: 100%; }

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
  resize: vertical;
}
textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}
::placeholder { color: #666; }

.signal-suggestions-container { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; margin-bottom: 0.5rem; }
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
.signal-emotion-bubble { background: rgba(169,114,255,0.1); border-color: rgba(169,114,255,0.3); color: #A972FF; }
.signal-emotion-bubble:hover { background: #A972FF; color: #000; }
.signal-fact-bubble { background: rgba(61,220,132,0.1); border-color: rgba(61,220,132,0.3); color: #3DDC84; }
.signal-fact-bubble:hover { background: #3DDC84; color: #000; }
.signal-solution-bubble { background: rgba(255,184,0,0.1); border-color: rgba(255,184,0,0.3); color: #FFB800; }
.signal-solution-bubble:hover { background: #FFB800; color: #000; }
.signal-reset-bubble { font-weight: 600; opacity: 0.8; font-size: 0.75rem; border-style: dashed !important; }
.signal-reset-bubble:hover { opacity: 1; }

.signal-example-hint { font-size: 0.8rem; color: #777; margin: 0.5rem 0 0 0.25rem; line-height: 1.2; }
.signal-example-hint b { color: #aaa; font-weight: 600; }

@media (max-width: 768px) {
  .signal-demo__form-container { padding: 1.5rem; }
  .signal-rotating-phrase-container { height: 65px; }
  .signal-question-label { font-size: 0.95rem; }
  .signal-suggestions-container { gap: 0.4rem; }
  .signal-suggestion-bubble { font-size: 0.75rem; padding: 0.3rem 0.7rem; }
  .signal-demo__switch { flex-wrap: wrap; gap: 6px; justify-content: center; }
  .signal-demo__switch-btn { font-size: 0.85em; padding: 6px 10px; }
}
@media (max-width: 480px) {
  .signal-question-block { padding: 1rem; }
  .signal-rotating-phrase-container { height: 44px; }
  .signal-example-hint { line-height: 1.05; }
}
</style>
