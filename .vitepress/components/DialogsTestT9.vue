<template>
  <div class="signal-domain-switcher">
    <button
      v-for="domain in Object.keys(domains)"
      :key="domain"
      class="signal-domain-btn"
      :class="{ active: domain === selectedDomain }"
      @click="selectedDomain = domain"
      type="button"
    >{{ domains[domain].label }}</button>
  </div>
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
            v-model="form[domainKey].emotionalRelease"
            @focus="startRotation(1)"
            rows="3"
            :placeholder="domains[selectedDomain].placeholders.emotionalRelease"
            required
          ></textarea>
          <div class="signal-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions[domainKey].emotions"
              :key="suggestion"
              class="signal-suggestion-bubble signal-emotion-bubble"
              @click="selectSuggestion('emotionalRelease', suggestion, 'emotions')"
            >{{ suggestion }}</div>
            <div
              v-if="!isInitialSuggestions('emotions')"
              class="signal-suggestion-bubble signal-reset-bubble signal-emotion-bubble"
              @click="resetSuggestions('emotions')"
            >← Ещё варианты</div>
          </div>
          <p class="signal-example-hint" v-html="domains[selectedDomain].hints.emotions"></p>
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
            v-model="form[domainKey].factualAnalysis"
            @focus="startRotation(2)"
            rows="3"
            :placeholder="domains[selectedDomain].placeholders.factualAnalysis"
            required
          ></textarea>
          <div class="signal-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions[domainKey].facts"
              :key="suggestion"
              class="signal-suggestion-bubble signal-fact-bubble"
              @click="selectSuggestion('factualAnalysis', suggestion, 'facts')"
            >{{ suggestion }}</div>
            <div
              v-if="!isInitialSuggestions('facts')"
              class="signal-suggestion-bubble signal-reset-bubble signal-fact-bubble"
              @click="resetSuggestions('facts')"
            >← Ещё варианты</div>
          </div>
          <p class="signal-example-hint" v-html="domains[selectedDomain].hints.facts"></p>
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
            v-model="form[domainKey].constructiveSuggestions"
            @focus="startRotation(3)"
            rows="3"
            :placeholder="domains[selectedDomain].placeholders.constructiveSuggestions"
            required
          ></textarea>
          <div class="signal-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions[domainKey].solutions"
              :key="suggestion"
              class="signal-suggestion-bubble signal-solution-bubble"
              @click="selectSuggestion('constructiveSuggestions', suggestion, 'solutions')"
            >{{ suggestion }}</div>
            <div
              v-if="!isInitialSuggestions('solutions')"
              class="signal-suggestion-bubble signal-reset-bubble signal-solution-bubble"
              @click="resetSuggestions('solutions')"
            >← Ещё варианты</div>
          </div>
          <p class="signal-example-hint" v-html="domains[selectedDomain].hints.solutions"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onUnmounted } from 'vue';

// Подсказки для кофе (ваши старые, сокращены для примера)
const coffeeSuggestions = {
  emotions: { /* ...сюда поместить весь ваш объект подсказок для кофе... */ },
  facts: { /* ... */ },
  solutions: { /* ... */ }
};

// Подсказки для фитнеса (из вашего примера)
const fitnessSuggestions = {
  emotions: {
    // полностью Ваш большой объект из запроса выше
    // ...
  },
  facts: {
    // полностью Ваш большой объект из запроса выше
    // ...
  },
  solutions: {
    // полностью Ваш большой объект из запроса выше
    // ...
  }
};

// Метаданные для визуала и примеров
const domains = {
  coffee: {
    label: "Кофейни",
    hints: {
      emotions: 'Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»',
      facts: 'Пример: «Заказ на два капучино <b>ждал 22 минуты</b>, хотя в кафе был почти один»',
      solutions: 'Пример: «Добавить на кассе <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»',
    },
    placeholders: {
      emotionalRelease: "Разочарован ожиданиями...",
      factualAnalysis: "Опишите факты: что, когда и где произошло...",
      constructiveSuggestions: "Предложите, как это можно исправить..."
    },
    suggestions: coffeeSuggestions
  },
  fitness: {
    label: "Фитнес",
    hints: {
      emotions: 'Пример: «Восхищён профессионализмом тренера и атмосферой клуба»',
      facts: 'Пример: «В раздевалке <b>нет мыла</b>, <b>очень жарко</b> в зале»',
      solutions: 'Пример: «Ввести <b>электронную очередь</b> и <b>тренинг для персонала</b>»'
    },
    placeholders: {
      emotionalRelease: "Опишите эмоции...",
      factualAnalysis: "Факты: что, когда и где произошло...",
      constructiveSuggestions: "Как исправить или улучшить..."
    },
    suggestions: fitnessSuggestions
  }
};

const selectedDomain = ref('coffee');
const domainKey = computed(() => selectedDomain.value);

const sections = [
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' }
];

const selectedSection = ref('emotions');
const isActive = (id) => id === selectedSection.value;

// Раздельные формы под каждый домен
const form = reactive({
  coffee: { emotionalRelease: '', factualAnalysis: '', constructiveSuggestions: '' },
  fitness: { emotionalRelease: '', factualAnalysis: '', constructiveSuggestions: '' }
});

const currentSuggestions = reactive({
  coffee: {
    emotions: [...domains.coffee.suggestions.emotions.initial],
    facts: [...domains.coffee.suggestions.facts.initial],
    solutions: [...domains.coffee.suggestions.solutions.initial]
  },
  fitness: {
    emotions: [...domains.fitness.suggestions.emotions.initial],
    facts: [...domains.fitness.suggestions.facts.initial],
    solutions: [...domains.fitness.suggestions.solutions.initial]
  }
});

const selectedSuggestions = reactive({
  coffee: { emotions: [], facts: [], solutions: [] },
  fitness: { emotions: [], facts: [], solutions: [] }
});
const branchCounters = reactive({
  coffee: { emotions: 0, facts: 0, solutions: 0 },
  fitness: { emotions: 0, facts: 0, solutions: 0 }
});

// Ротация вопросов
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

function isInitialSuggestions(suggestionType) {
  return JSON.stringify(
    currentSuggestions[domainKey.value][suggestionType]
  ) === JSON.stringify(
    domains[selectedDomain.value].suggestions[suggestionType].initial
  );
}
function resetSuggestions(suggestionType) {
  currentSuggestions[domainKey.value][suggestionType] = [...domains[selectedDomain.value].suggestions[suggestionType].initial];
}
function selectSuggestion(fieldName, suggestion, suggestionType) {
  const currentText = form[domainKey.value][fieldName].trim();
  const isNewBranch = isInitialSuggestions(suggestionType);
  if (currentText) {
    if (isNewBranch) {
      form[domainKey.value][fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
      branchCounters[domainKey.value][suggestionType]++;
    } else {
      form[domainKey.value][fieldName] = currentText + ' ' + suggestion;
    }
  } else {
    form[domainKey.value][fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    branchCounters[domainKey.value][suggestionType] = 1;
  }
  selectedSuggestions[domainKey.value][suggestionType].push(suggestion);
  updateSuggestions(suggestionType, suggestion);
}
function updateSuggestions(suggestionType, selectedWord) {
  const nextSuggestions = domains[selectedDomain.value].suggestions[suggestionType][selectedWord];
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[domainKey.value][suggestionType] = [...nextSuggestions];
  } else {
    currentSuggestions[domainKey.value][suggestionType] = [...domains[selectedDomain.value].suggestions[suggestionType].initial];
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
.signal-domain-switcher {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
}
.signal-domain-btn {
  padding: 8px 18px;
  border-radius: 12px;
  border: 2px solid #343454;
  background: #232336;
  color: #a7a7ce;
  cursor: pointer;
  font-weight: 600;
  font-size: 1em;
  letter-spacing: 0.01em;
  transition: all 0.16s;
}
.signal-domain-btn.active, .signal-domain-btn:focus {
  background: #a972ff33;
  color: #A972FF;
  border-color: #A972FF;
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
  transition: background-color 0.15s, border-color 0.15s, color 0.15s, font-weight 0.15s;
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
  line-height: 1.2;
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
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
}

@media (max-width: 480px) {
  .signal-question-block {
    padding: 1rem;
  }
  .signal-rotating-phrase-container {
    height: 44px;
  }
  .signal-example-hint {
    line-height: 1.05;
  }
}

</style>
