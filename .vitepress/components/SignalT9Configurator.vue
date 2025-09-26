<template>
  <div class="signal-demo-wrapper" v-if="mounted">
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
          @click="changeGender('female')"
        ></div>
        <div 
          class="signal-gender-btn signal-gender-male"
          :class="{ 'is-active': selectedGender === 'male' }"
          @click="changeGender('male')"
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
            @click="hasContentToSummarize ? summarizeAllContent() : null"
            :disabled="humanizeStatus === 'processing' || !hasContentToSummarize"
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
                !hasContentToSummarize ? 'Заполните вкладки' :
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
import { reactive, ref, onUnmounted, computed, onMounted } from 'vue';

// SSR защита
const mounted = ref(false);

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
  mounted.value = true;
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  // Инициализируем подсказки под пол
  updateSuggestionsForGender();
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

// Проверяем, есть ли контент для суммирования 
const hasContentToSummarize = computed(() => {
  return form.emotionalRelease.trim() || form.factualAnalysis.trim() || form.constructiveSuggestions.trim();
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
    'попросил': 'попросила',
    'засекал': 'засекала',
    'спросил': 'спросила',
    'заказал в': 'заказала в',
    'получил в': 'получила в',
    'подходил': 'подходила',
    'успел': 'успела',
    'ждал': 'ждала',
    'потратил': 'потратила',
    'опоздал': 'опоздала'
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
    'попросила': 'попросил',
    'засекала': 'засекал',
    'спросила': 'спросил',
    'заказала в': 'заказал в',
    'получила в': 'получил в',
    'подходила': 'подходил',
    'успела': 'успел',
    'ждала': 'ждал',
    'потратила': 'потратил',
    'опоздала': 'опоздал'
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

// Улучшенная функция структурирования текста
function structureAndCleanText(emotionalText, factualText, solutionsText, gender) {
  let result = '';
  
  // 1. Эмоциональная часть
  if (emotionalText) {
    const emotions = emotionalText.trim();
    const correctedEmotions = applyGenderCorrection(emotions, gender);
    result += `**Впечатления:** ${correctedEmotions}`;
  }
  
  // 2. Фактологическая часть
  if (factualText) {
    const facts = factualText.trim();
    if (result) result += '\n\n';
    result += `**Проблемы:** ${facts}`;
  }
  
  // 3. Решения
  if (solutionsText) {
    const solutions = solutionsText.trim();
    if (result) result += '\n\n';
    result += `**Предложения:** ${solutions}`;
  }
  
  // 4. Краткий вывод
  if (emotionalText || factualText || solutionsText) {
    if (result) result += '\n\n';
    const conclusion = generateConclusion(emotionalText, factualText, solutionsText, gender);
    result += `**Вывод:** ${conclusion}`;
  }
  
  return result;
}

// Генерация краткого вывода
function generateConclusion(emotions, facts, solutions, gender) {
  const hasEmotions = emotions && emotions.trim();
  const hasFacts = facts && facts.trim();  
  const hasSolutions = solutions && solutions.trim();
  
  let conclusion = '';
  
  if (hasEmotions && hasFacts && hasSolutions) {
    conclusion = gender === 'female' ? 
      'Посещение не оправдало ожиданий, однако проблемы решаемы при должном внимании руководства.' :
      'Посещение не оправдало ожиданий, однако проблемы решаемы при должном внимании руководства.';
  } else if (hasEmotions && hasFacts) {
    conclusion = gender === 'female' ?
      'Была разочарована качеством обслуживания по указанным причинам.' :
      'Был разочарован качеством обслуживания по указанным причинам.';
  } else if (hasEmotions && hasSolutions) {
    conclusion = gender === 'female' ?
      'Надеюсь, что предложенные улучшения помогут избежать подобных ситуаций.' :
      'Надеюсь, что предложенные улучшения помогут избежать подобных ситуаций.';
  } else if (hasFacts && hasSolutions) {
    conclusion = 'Описанные проблемы требуют внимания для улучшения сервиса.';
  } else {
    conclusion = gender === 'female' ?
      'Делюсь опытом для улучшения качества обслуживания.' :
      'Делюсь опытом для улучшения качества обслуживания.';
  }
  
  return conclusion;
}

// Основная функция суммирования
async function summarizeAllContent() {
  const hasContent = form.emotionalRelease.trim() || form.factualAnalysis.trim() || form.constructiveSuggestions.trim();
  if (!hasContent) return;
  
  humanizeStatus.value = 'processing';
  
  try {
    // Имитируем обработку
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    //
