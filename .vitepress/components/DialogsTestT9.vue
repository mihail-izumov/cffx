<template>
  <div class="signal-demo-wrapper">
    <!-- Переключатель секций над формой -->
    <div class="signal-demo__header">
      <div class="signal-demo__switch" role="tablist" aria-label="Секции формы">
        <button
          v-for="section in sections"
          :key="section.id"
          class="signal-demo__switch-btn"
          :class="{ 'is-active': isActive(section.id) }"
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
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onUnmounted } from 'vue';

const form = reactive({ 
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: ''
});

// Секции формы для переключателя
const sections = [
  { id: 'emotions', title: 'Эмоции и чувства' },
  { id: 'facts', title: 'Детали проблемы' },
  { id: 'solutions', title: 'Предложение решения' }
];

const selectedSection = ref('emotions');
const isActive = (sectionId) => sectionId === selectedSection.value;

// Полная 3-уровневая система подсказок для всех секций
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
    'забыли заказ': ['через 40 минут', 'не записали', 'потеряли чек', 'не передали на кухню', 'сидел и ждал']
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
    'более часа': ['час и 10 минут', 'полтора часа ждал', 'с 12:00 до 13:15', 'весь обед потратил', 'опоздал на встречу']
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
    'с уведомлениями': ['СМС о готовности', 'push в приложении', 'звонок менеджера', 'вибрация трекера', 'email уведомления']
  }
});

// Текущие подсказки для каждого поля
const currentSuggestions = reactive({
  emotions: [...suggestions.emotions.initial],
  facts: [...suggestions.facts.initial],
  solutions: [...suggestions.solutions.initial]
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

// Функция выбора подсказки
function selectSuggestion(fieldName, suggestion, suggestionType) {
  const currentText = form[fieldName].trim();
  
  // Определяем, начинается ли новая ветка
  const isNewBranch = isInitialSuggestions(suggestionType);
  
  if (currentText) {
    if (isNewBranch) {
      // Новая ветка - добавляем с точкой и заглавной буквы
      form[fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    } else {
      // Продолжение ветки - добавляем через пробел
      form[fieldName] = currentText + ' ' + suggestion;
    }
  } else {
    // Первый выбор
    form[fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
  }
  
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

/* Внешний обёртчик */
.signal-demo-wrapper {
  font-family: var(--signal-font-sans); 
  width: 100%; 
  max-width: none; 
  margin: 0; 
}

/* Хедер с переключателями над формой */
.signal-demo__header {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

/* Переключатель по центру */
.signal-demo__switch {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0;
  background: transparent;
  margin: 0;
}

.signal-demo__switch-btn {
  appearance: none;
  border: 1px solid #2c2c2f;
  background: transparent;
  color: #f0f0f0;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease, color .15s ease, font-weight .15s ease;
  font-family: var(--signal-font-sans);
}

.signal-demo__switch-btn:hover { 
  border-color: #A972FF; 
}

.signal-demo__switch-btn.is-active {
  background: rgba(169, 114, 255, 0.14);
  border-color: #A972FF;
  font-weight: 700;
}

/* Контейнер формы с бордюром */
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
}

textarea:focus { 
  outline: none; 
  border-color: var(--accent-color); 
  background-color: #2a2a2e; 
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent); 
}

::placeholder { color: #666; }

/* Стили для подсказок-баблов */
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

.signal-fact-bubble {
  background: rgba(61, 220, 132, 0.1);
  border-color: rgba(61, 220, 132, 0.3);
  color: #3DDC84;
}

.signal-fact-bubble:hover {
  background: #3DDC84;
  color: #000;
  transform: scale(1.05);
}

.signal-solution-bubble {
  background: rgba(255, 184, 0, 0.1);
  border-color: rgba(255, 184, 0, 0.3);
  color: #FFB800;
}

.signal-solution-bubble:hover {
  background: #FFB800;
  color: #000;
  transform: scale(1.05);
}

/* Кнопка сброса к начальным вариантам */
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
  }

  .signal-demo__switch-btn {
    font-size: 0.85em;
    padding: 6px 10px;
  }
}
</style>
