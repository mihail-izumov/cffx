<template>
  <div class="signal-demo-wrapper">

    <!-- Переключатель секций -->
    <div class="signal-demo__header">
      <div class="signal-demo__breadcrumbs" role="tablist">
        <button
          v-for="section in sections"
          :key="section.id"
          class="signal-breadcrumb"
          :class="[section.id, isActive(section.id) ? 'is-active' : '']"
          @click="selectedSection = section.id"
        >
          <div class="signal-breadcrumb-circle"></div>
        </button>
      </div>
    </div>

    <!-- Кнопка информации и переключатель пола -->
    <div class="signal-controls-row">
      <button 
        class="signal-info-button"
        :class="{ 
          'signal-info-female': selectedGender === 'female',
          'signal-info-male': selectedGender === 'male'
        }"
        @click="showInfoModal = true"
      >
        Как работает
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

    <!-- Модальное окно -->
    <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
      <div class="modal">
        <div class="modal-title">Ваши отзывы меняют всё.</div>
        <div class="modal-body">
          Каждый отзыв делает любимую кофейню еще лучше, а Сигнал помогает решить Вашу проблему за 24 часа. Почувствуйте силу настоящих перемен.<br><br>
          <a href="https://cffx.ru/signals.html" target="_blank" class="modal-link no-double-underline">Как Работает Сигнал</a>
        </div>
        <div class="modal-footer">
          <button class="modal-ok" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>

    <div class="signal-demo__form-container">

<!-- Секция 6: Локация + выбор направления в виде выпадающего меню -->
<div v-if="selectedSection === 'location'" class="signal-form-section">
  <div class="signal-question-block" style="--accent-color: #5A9FB8;">
    <div class="signal-rotating-phrase-container">
      <p class="signal-question-label" style="margin-bottom: 24px;">
        Где разобрать Ваш Сигнал?
      </p>
    </div>
    <div style="display: flex; flex-direction: column; gap: 7px;">
      <select v-model="form.direction" class="signal-select">
        <option disabled value="">Выбрать направление</option>
        <option value="food">Общепит</option>
        <option value="fitness">Фитнес</option>
      </select>
      <select
        v-model="form.selectedNetwork"
        class="signal-select"
        :disabled="!form.direction"
      >
        <option disabled value="">Выбрать сеть</option>
        <option
          v-for="(club, name) in form.direction === 'fitness' ? fitness : cafes"
          :key="name"
          :value="name"
        >{{ name }}</option>
      </select>
      <select
        v-model="form.selectedBranch"
        class="signal-select"
        :disabled="!form.selectedNetwork"
      >
        <option disabled value="">Выбрать локацию</option>
        <option
          v-for="(branch, index) in selectedNetworkBranches"
          :key="index"
          :value="branch.address"
        >{{ branch.address }}</option>
      </select>
    </div>
  </div>
</div>

      <!-- Секция 2: Эмоции -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #6f5d9f;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1.value" class="signal-question-label">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.emotionalRelease" 
            @focus="startRotation(1)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Или напишите своими словами ..."
          ></textarea>
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
        </div>
      </div>

      <!-- Секция 3: Факты -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #3a8862;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion2.value" class="signal-question-label">{{ currentQuestion2 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.factualAnalysis" 
            @focus="startRotation(2)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Несколько фактов: что и когда произошло ..."
          ></textarea>
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
        </div>
      </div>

      <!-- Секция 4: Решение -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #4A90E2;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion3.value" class="signal-question-label">{{ currentQuestion3 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.constructiveSuggestions" 
            @focus="startRotation(3)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Дайте честный совет ..."
          ></textarea>
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
        </div>
      </div>

      <!-- Секция 5: Итого -->
      <div v-if="selectedSection === 'summary'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FFB800;">
          <p class="signal-direction-label">Ваш Сигнал</p>
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">Что должно измениться?</p>
          </div>
          <textarea 
            v-model="form.summaryText" 
            :rows="isMobile ? 8 : 6"
            placeholder="Перемены начинаются здесь ..."
          ></textarea>
          <p class="signal-example-hint signal-example-hint-white">Команда к действию для бизнеса и видимый результат для вас</p>
        </div>
      </div>

      <!-- Секция 7: Контакт -->
      <div v-if="selectedSection === 'contact'" class="signal-form-section">
        <div v-if="formSubmitted" class="signal-success-screen">
          <div class="signal-success-content">
            <h3>Сигнал отправлен ⚡</h3>
            <div class="signal-success-ticket-info">
              <span class="signal-success-date">{{ currentDate }}</span>
              <span class="signal-success-ticket">{{ formattedTicketNumber }}</span>
            </div>
            <p class="signal-success-description">Отправьте тикет Анне, чтобы получить результат в Телеграм.</p>
            <a :href="`https://t.me/Anna_Signal?text=Тикет%20${rawTicketNumber}`"
               target="_blank"
               :class="['signal-telegram-button', selectedGender === 'female' ? 'female' : 'male']">
              Получить Ответ
            </a>
            <a href="/signals#знакомьтесь-–-анна" target="_blank" class="signal-secondary-link no-double-underline">
              Кто Анна и как работает
            </a>
          </div>
        </div>
        <div v-else>
          <div class="signal-question-block contact" style="--accent-color: #00C2A8;">
            <div class="signal-rotating-phrase-container">
              <p class="signal-question-label">Отправьте Сигнал</p>
            </div>
            <div v-if="!form.isIncognito" class="signal-name-field">
              <label>Для персонального разбора</label>
              <input v-model="form.userName" class="signal-input" placeholder="Ваше Имя" />
            </div>
            <div class="signal-incognito-toggle">
              <label class="signal-toggle-label">
                <input type="checkbox" v-model="form.isIncognito" class="signal-toggle-checkbox" />
                <span class="signal-toggle-slider"></span>
                <span class="signal-toggle-text">Анонимно</span>
              </label>
            </div>
            <p class="signal-input-hint">
              {{ form.isIncognito 
                ? 'Кофейня (или клуб) получит Сигнал. Ответ по запросу у Анны.'
                : 'Кофейня (или клуб) ответит. Анна вернёт и поможет уточнить.' }}
            </p>
          </div>
          <label class="signal-agreement">
            <input type="checkbox" v-model="form.agreedToTerms" />
            <span>Подтверждаю согласие с
              <a href="/terms" target="_blank" class="signal-policy-link no-double-underline">Условиями использования</a>
            </span>
          </label>
          <button 
            class="signal-submit-button" 
            :disabled="submitStatus === 'processing' || !form.agreedToTerms || !isEmotionFilled"
            @click="submitForm"
          >
            <span class="signal-liquid-next-text">{{ submitButtonText }}</span>
          </button>
        </div>
      </div>

      <!-- Кнопки навигации по шагам -->
      <div v-if="selectedSection !== 'contact'" class="signal-next-button-container">
  <button
    class="signal-liquid-next-btn"
    :class="[
      selectedSection === 'share' ? 'signal-share-next' : '',
      selectedSection === 'emotions' ? 'signal-emotion-next' : '',
      selectedSection === 'facts' ? 'signal-fact-next' : '',
      selectedSection === 'solutions' ? 'signal-solution-next' : '',
      selectedSection === 'summary' ? 'signal-summary-next' : '',
      selectedSection === 'location' ? 'signal-location-next' : ''
    ]"
    @click="goToNextSection"
    :disabled="
      (selectedSection === 'emotions' && !isEmotionFilled)
      || (selectedSection === 'summary' && (!form.summaryText || !form.summaryText.trim()))
      || (selectedSection === 'location' && (!form.direction || !form.selectedNetwork || !form.selectedBranch))
    "
  >
    <span class="signal-liquid-next-text">{{ currentSectionData.buttonText }}</span>
    <CupFillIcon
      class="signal-next-icon"
      :step-index="sections.findIndex(s => s.id === selectedSection)"
      :steps-total="6"
      :size="22"
    />
  </button>

        <div v-if="selectedSection === 'summary'" class="signal-humanize-button-container">
          <button class="signal-liquid-humanize-btn" @click="summarizeAllContent()" :disabled="humanizeStatus === 'processing'">
            <span class="signal-liquid-humanize-text">
              {{ humanizeStatus === 'completed' ? 'Готово' : humanizeStatus === 'processing' ? 'Обновление...' : 'Обновить' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'

// ====== Стейт формы ======
const form = reactive({
  direction: '', // 'food' или 'fitness'
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  summaryText: '',
  selectedNetwork: '',
  selectedBranch: '',
  userName: '',
  isIncognito: false,
  agreedToTerms: false,
});

// Сброс сети и локации при изменении направления
watch(
  () => form.direction,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      form.selectedNetwork = '';
      form.selectedBranch = '';
    }
  }
);

// Сброс локации при изменении сети
watch(
  () => form.selectedNetwork,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      form.selectedBranch = '';
    }
  }
);

// Для проп-шагов (пример: если используются табы или плавный скролл)
const isMobile = ref(false);
onMounted(() => {
  const checkMobile = () => { isMobile.value = window.innerWidth <= 768 }
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

const selectedGender = ref('female');
const showInfoModal = ref(false);
const formSubmitted = ref(false);
const submitStatus = ref('idle');
const rawTicketNumber = ref(null);
const formattedTicketNumber = ref(null);
const currentDate = ref('');
const humanizeStatus = ref('idle');

  onMounted(() => {
  // Генерируем номер тикета и дату при запуске формы
  rawTicketNumber.value = String(Date.now()).slice(-6);
  formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3, 6)}`;

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  currentDate.value = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
});


// Массивы сетей и филиалов
const fitness = {
  'X-Fit': {
    branches: [
      { address: 'Московское шоссе, 19' },
      { address: 'Полевая, 120А' }
    ]
  },
  'Alex Fitness': {
    branches: [
      { address: 'Куйбышева, 133' }
    ]
  }
};

const cafes = {
  'Корж': {
    branches: [
      { address: 'Куйбышева, 103' },
      { address: 'Революционная, 101В' }
    ]
  },
  // ...другие сети
};

// Список локаций для выбранной сети
const selectedNetworkBranches = computed(() => {
  if (!form.direction || !form.selectedNetwork) return [];
  const source = form.direction === 'fitness' ? fitness : cafes;
  return source[form.selectedNetwork]?.branches || [];
});

// computed для блокировки кнопки "Начать"
const isLocationStepComplete = computed(() =>
  !!form.direction && !!form.selectedNetwork && !!form.selectedBranch
);

// ====== Подсказки для двух направлений ======
const baseSuggestions = {
  food: {
    emotions: {
      male: ['расстроен', 'разочарован', 'доволен', 'удивлён'],
      female: ['расстроена', 'разочарована', 'довольна', 'удивлена']
    },
    facts: {
      initial: ['Долго ждал', 'Перепутали заказ', 'Не вернули сдачу'],
      // добавляй уровни если хочешь ротацию
    },
    solutions: {
      initial: ['Ускорить обслуживание', 'Контролировать качество', 'Обучить персонал'],
      // добавляй уровни если нужны “глубже”
    }
  },
  fitness: {
    emotions: {
      male: ['нет мотивации', 'устал', 'не вдохновлен'],
      female: ['нет мотивации', 'устала', 'не вдохновлена']
    },
    facts: {
      initial: ['Тренер не ответил', 'Мало групповых занятий'],
    },
    solutions: {
      initial: ['Добавить групповые', 'Персональный подход', 'Мотивирующие акции'],
    }
  }
};

function getInitialSuggestions(type) {
  if (type === 'emotions') {
    return baseSuggestions[form.direction]?.emotions[selectedGender.value] || [];
  }
  return baseSuggestions[form.direction]?.[type]?.initial || [];
}

const currentSuggestions = reactive({
  emotions: getInitialSuggestions('emotions'),
  facts: getInitialSuggestions('facts'),
  solutions: getInitialSuggestions('solutions')
});

const selectedFirstLevelSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});

watch([() => form.direction, selectedGender], () => {
  currentSuggestions.emotions = getInitialSuggestions('emotions');
  currentSuggestions.facts = getInitialSuggestions('facts');
  currentSuggestions.solutions = getInitialSuggestions('solutions');
  selectedFirstLevelSuggestions.emotions = [];
  selectedFirstLevelSuggestions.facts = [];
  selectedFirstLevelSuggestions.solutions = [];
});


// ====== Основная “цепочная” логика ======
function selectSuggestion(fieldName, suggestion, type) {
  const currentText = form[fieldName].trim();
  const isNewBranch = isInitialSuggestions(type);

  if (currentText) {
    if (isNewBranch) {
      form[fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    } else {
      form[fieldName] = currentText + ' ' + suggestion;
    }
  } else {
    form[fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
  }

  if (!selectedFirstLevelSuggestions[type].includes(suggestion)) {
    selectedFirstLevelSuggestions[type].push(suggestion);
  }

  updateSuggestions(type, suggestion);
}

function updateSuggestions(type, selectedWord) {
  // Пример простой ротации — если нужны многослойные уровни, доработай сам
  // Выбрали любой suggestion — он пропадает из списка. Когда все выбраны — сбросить
  const initial = getInitialSuggestions(type);
  const filtered = initial.filter(item => !selectedFirstLevelSuggestions[type].includes(item));
  currentSuggestions[type] = filtered.length > 0 ? filtered : [...initial];
  if (filtered.length === 0) selectedFirstLevelSuggestions[type] = [];
}

function resetSuggestions(type) {
  selectedFirstLevelSuggestions[type] = [];
  currentSuggestions[type] = getInitialSuggestions(type);
}

function isInitialSuggestions(type) {
  const initialSuggs = getInitialSuggestions(type);
  const unusedInitial = initialSuggs.filter(
    item => !selectedFirstLevelSuggestions[type].includes(item)
  );
  return JSON.stringify(currentSuggestions[type]) === JSON.stringify(unusedInitial);
}

// ====== Остальные функции — оставить как было ======
function onGenderClick(gender) {
  selectedGender.value = gender;
}
function chooseDirection(dir) {
  form.direction = dir;
  selectedSection.value = 'location';
}
const sections = [
  { id: 'location', title: 'Локация', buttonText: 'Начать' },
  { id: 'emotions', title: 'Эмоции', buttonText: 'Дальше к фактам' },
  { id: 'facts', title: 'Факты', buttonText: 'К решению ситуации' },
  { id: 'solutions', title: 'Решения', buttonText: 'Сформировать Сигнал' },
  { id: 'summary', title: 'Резюме', buttonText: 'Формат ответа' },
  { id: 'contact', title: 'Контакт', buttonText: '' }
];
const selectedSection = ref('location');
const isActive = id => id === selectedSection.value;
const currentSectionData = computed(() => sections.find(s => s.id === selectedSection.value));
const goToNextSection = () => {
  const idx = sections.findIndex(s => s.id === selectedSection.value);
  if (selectedSection.value === 'solutions') summarizeAllContent();
  if (idx < sections.length - 1) {
    selectedSection.value = sections[idx + 1].id
  }
};
// ======== МАССИВЫ ВОПРОСОВ ДЛЯ КАЖДОГО НАПРАВЛЕНИЯ =======

const questions1 = {
  food: [
    'Что вас расстроило или впечатлило в заведении?',
    'Какие были эмоции?',
    'Что показалось необычным или приятным?',
    'Что заставило задуматься или улыбнуться?'
  ],
  fitness: [
    'Что вы почувствовали во время тренировки?',
    'Что мотивировало или демотивировало на занятии?',
    'Какие ощущения после тренировки?',
    'Что понравилось или удивило в клубе?'
  ]
};
const questions2 = {
  food: [
    'Что конкретно произошло — где, когда, с кем?',
    'Можете описать детали ситуации?',
    'Что удивило или огорчило в сервисе?',
    'Есть ли факты, которые стоит отметить?'
  ],
  fitness: [
    'Какие события или детали показались важными?',
    'Были ли трудности или позитивные моменты?',
    'Какие факты или мелочи стоит озвучить?',
    'Что из произошедшего особенно запомнилось?'
  ]
};
const questions3 = {
  food: [
    'Что стоит изменить в заведении, чтобы вам захотелось вернуться?',
    'Какой совет вы бы дали управляющему?',
    'Что стоит улучшить для гостей?',
    'Чем можно порадовать новых посетителей?'
  ],
  fitness: [
    'Ваш совет или пожелание клубу?',
    'Что поможет сделать занятия комфортнее?',
    'Ваше предложение по улучшению сервиса?',
    'Как мотивировать вас возвращаться снова?'
  ]
};

// ======== АКТИВНЫЙ ВОПРОС (ДЛЯ ПОКАЗА/АНИМАЦИИ) ========
const currentQuestion1 = ref(questions1.food[0]);
const currentQuestion2 = ref(questions2.food[0]);
const currentQuestion3 = ref(questions3.food[0]);

// ======== АНИМАЦИЯ/РОТАЦИЯ ВОПРОСОВ ========

let rotationInterval = null;

function startRotation(questionNum) {
  if (rotationInterval) clearInterval(rotationInterval);

  let questions, currentQuestion;

  if (questionNum === 1) {
    questions = questions1[form.direction] || questions1.food;
    currentQuestion = currentQuestion1;
  } else if (questionNum === 2) {
    questions = questions2[form.direction] || questions2.food;
    currentQuestion = currentQuestion2;
  } else if (questionNum === 3) {
    questions = questions3[form.direction] || questions3.food;
    currentQuestion = currentQuestion3;
  } else {
    return;
  }

  let currentIndex = questions.indexOf(currentQuestion.value);
  rotationInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % questions.length;
    currentQuestion.value = questions[currentIndex];
  }, 3000);
}

// Останавливаем анимацию при размонтировании
import { onUnmounted } from 'vue';
onUnmounted(() => {
  if (rotationInterval) clearInterval(rotationInterval);
});

// ====== АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ ПРИ СМЕНЕ НАПРАВЛЕНИЯ ======
watch(() => form.direction, () => {
  currentQuestion1.value = questions1[form.direction]?.[0] || questions1.food[0];
  currentQuestion2.value = questions2[form.direction]?.[0] || questions2.food[0];
  currentQuestion3.value = questions3[form.direction]?.[0] || questions3.food[0];
});

const isEmotionFilled = computed(() => form.emotionalRelease && form.emotionalRelease.trim().length > 0);
const submitButtonText = computed(() =>
  submitStatus.value === 'processing'
    ? '⏳ Отправляется...'
    : form.selectedNetwork
      ? `Отправить в ${form.selectedNetwork}`
      : 'Отправить в заведение'
);

// Склонение кофейни
function getAccusativeCase(networkName) {
  if (!networkName) return '';
  const lastChar = networkName.slice(-1).toLowerCase();
  const lowerCaseName = networkName.toLowerCase();

  const exceptions = ['корж', 'skuratov', 'surf'];
  if (exceptions.includes(lowerCaseName)) {
    return networkName;
  }

  if (lastChar === 'а') {
    return networkName.slice(0, -1) + 'у';
  }

  if (lastChar === 'я') {
    return networkName.slice(0, -1) + 'ю';
  }
  return networkName;
}

// Сборка итога для поля summaryText (можете сохранить свою реализацию или заменить на более универсальную)
function summarizeAllContent() {
  humanizeStatus.value = 'processing';
  // Сборка итогового текста из полей (вы можете переписать под свой стиль вывода)
  let parts = [];
  if (form.emotionalRelease) parts.push(form.emotionalRelease.trim());
  if (form.factualAnalysis) parts.push(form.factualAnalysis.trim());
  if (form.constructiveSuggestions) parts.push(form.constructiveSuggestions.trim());
  form.summaryText = parts.join('. ');
  humanizeStatus.value = 'completed';
  setTimeout(() => { humanizeStatus.value = 'idle'; }, 2000);
}

// Отправка формы (оставлен ваш исходник, только адаптировано на summaryText)
async function submitForm() {
  submitStatus.value = 'processing';

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const submittedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  let clientId = localStorage.getItem('signal_client_id');
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + Date.now();
    localStorage.setItem('signal_client_id', clientId);
  }

  const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxPqW0GLJ7SCJc9J1yC17Bl2di_IxXDyAZEfSxJ7wLvupwjb7_IAIlKVsXlyOL6WcDj/exec';
  
  const formData = new FormData();
  formData.append('referer', window.location.origin);
  formData.append('clientId', clientId);
  formData.append('ticketNumber', formattedTicketNumber.value);
  formData.append('date', currentDate.value);
  formData.append('submitted', submittedTime);
  formData.append('network', form.selectedNetwork);
  formData.append('address', form.selectedBranch);
  formData.append('name', form.userName || 'Аноним');
  formData.append('review', form.summaryText);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (result.status === 'success' && result.processed) {
      formSubmitted.value = true;
      submitStatus.value = 'idle';
    } else {
      throw new Error(result.message || 'Ошибка обработки данных');
    }
  } catch (error) {
    alert('Не удалось отправить отзыв. Пожалуйста, попробуйте позже.');
    submitStatus.value = 'idle';
  }
}

function applyGenderCorrection(text, gender) {
  return text;
}

function structureAndCleanText(share, emotional, factual, solutions, gender) {
  let result = '';

  // Набор устойчивых пар и словосочетаний, которые нельзя разрывать запятой
  const protectedBigrams = new Set([
    'нет системы',
    'мгновенная подача',
    'длинный волос',
    'архив образцов',
    'по санитарии',
    'качественный звук',
    'идеальный вкус',
    'точные пропорции',
    'за решение',
    'за внимание',
    'за профессионализм',
    'за рекомендацию',
    'за уютную',
    'по качеству',
    'по сервису',
    'по коммуникации',
    'по времени',
    'чистая посуда',
    'грязная посуда',
    'холодный кофе',
    'волосы в',
    'ошибка в',
  ]);

  // Попытаться склеить устойчивые пары внутри строки (чтобы не резать запятой)
  function joinProtectedBigrams(text) {
    let words = text.trim().split(/\s+/);
    if (words.length < 2) return text.trim();

    const joined = [];
    for (let i = 0; i < words.length; i++) {
      const bigram = (words[i] + ' ' + (words[i + 1] || '')).toLowerCase();
      if (i < words.length - 1 && protectedBigrams.has(bigram)) {
        joined.push(words[i] + ' ' + words[i + 1]);
        i += 1;
      } else {
        joined.push(words[i]);
      }
    }
    return joined.join(' ');
  }

  // Разбор «цепочки» на уровни: ожидаем 1–3 блока
  // Мы формируем уровни по логике ввода: первая лексема — уровень1, далее — уровень2 (одно или два слова),
  // остальное — уровень3 (детали). Для улучшения читаемости допускаем 2 слова в уровне2, если это устойчивое сочетание.
  function splitIntoLevels(sentence) {
    const cleaned = sentence.trim().replace(/\s+/g, ' ');
    let words = cleaned.split(' ');
    if (words.length === 0) return { l1: '', l2: '', l3: '' };

    const l1 = words[0]; // всегда первое слово — уровень1
    words = words.slice(1);

    if (words.length === 0) return { l1, l2: '', l3: '' };

    // кандидаты для l2: одно слово как минимум
    let l2 = words[0];
    let remainder = words.slice(1);

    // если первые два слова образуют защищённую пару — берём их как уровень2
    if (remainder.length >= 1) {
      const candidateBigram = (l2 + ' ' + remainder[0]).toLowerCase();
      if (protectedBigrams.has(candidateBigram)) {
        l2 = l2 + ' ' + remainder[0];
        remainder = remainder.slice(1);
      }
    }

    const l3 = remainder.join(' '); // всё, что осталось — детали
    return { l1, l2, l3 };
  }

  // Форматирование одной «цепочки» с корректной пунктуацией
  function formatChain(sentence) {
    // Склеиваем устойчивые пары, чтобы не рвать их запятой
    const normalized = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    const glued = joinProtectedBigrams(normalized);
    const { l1, l2, l3 } = splitIntoLevels(glued);

    if (!l1) return '';

    // 1 уровень
    if (!l2 && !l3) {
      return l1;
    }

    // 1 + 2 уровни
    if (l2 && !l3) {
      return `${l1} ${l2}:`;
    }

    // 1 + 2 + 3 уровни
    // Внутри l3 попробуем поставить ОДНУ запятую, если есть явные два смысловых блока
    // Критерии: ищем короткое служебное слово (<=3) примерно в середине или защищенную биграмму — запятую ставим ДО неё
    let l3Words = l3.split(/\s+/);
    let commaIdx = -1;

    // попытка: найти служебное/короткое слово во второй трети — поставить запятую перед ним
    for (let i = 1; i < l3Words.length - 1; i++) {
      const w = l3Words[i].toLowerCase();
      if (w.length <= 3 && i >= Math.floor(l3Words.length / 3)) {
        commaIdx = i;
        break;
      }
    }

    if (commaIdx === -1 && l3Words.length >= 4) {
      // запасной вариант: запятая на 2/3
      commaIdx = Math.floor(l3Words.length * 0.66);
    }

    // НО: не разрывать защищённые биграммы
    if (commaIdx > 0) {
      const leftBigram = (l3Words[commaIdx - 1] + ' ' + l3Words[commaIdx]).toLowerCase();
      if (protectedBigrams.has(leftBigram) && commaIdx < l3Words.length - 1) {
        // если запятая попала внутрь биграммы — сдвигаем вправо
        commaIdx += 1;
      }
    }

    let l3Formatted;
    if (commaIdx > 0 && commaIdx < l3Words.length - 1) {
      l3Formatted = l3Words.slice(0, commaIdx).join(' ') + ', ' + l3Words.slice(commaIdx).join(' ');
    } else {
      l3Formatted = l3; // не разобрали — оставляем как есть
    }

    return `${l1} ${l2}: ${l3Formatted}`;
  }

  // Удаление дублей между цепочками
  function formatSection(text) {
    const lines = text.split('. ').map(s => s.trim()).filter(Boolean);
    const seen = new Set();
    const out = [];
    for (const line of lines) {
      const key = line.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const formatted = formatChain(line);
      if (formatted) out.push(`• ${formatted}`);
    }
    return out.join('\n');
  }

  // МОЙ ОТЗЫВ
  if (share) {
    result += `МОЙ ОТЗЫВ\n${share}\n\n`;
  }

  // ВПЕЧАТЛЕНИЯ
  if (emotional) {
    result += `ВПЕЧАТЛЕНИЯ\n`;
    result += formatSection(emotional) + '\n\n';
  }

  // ПРОБЛЕМЫ
  if (factual) {
    result += `ПРОБЛЕМЫ\n`;
    result += formatSection(factual) + '\n\n';
  }

  // ПРЕДЛОЖЕНИЯ
  if (solutions) {
    result += `ПРЕДЛОЖЕНИЯ\n`;
    result += formatSection(solutions);
  }

  return result.trim();
}

onUnmounted(() => {
  if (rotationInterval) clearInterval(rotationInterval);
});
</script>

<style scoped>
:root {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --signal-font-mono: 'SF Mono', 'Monaco', monospace;
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
}

.signal-breadcrumb-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #444;
  transition: all 0.3s ease;
}

.signal-breadcrumb.is-active .signal-breadcrumb-circle {
  width: 24px;
  height: 8px;
  border-radius: 4px;
}

.signal-breadcrumb.contact.is-active .signal-breadcrumb-circle {
  background: linear-gradient(90deg, #00C2FF 0%, #00C2A8 100%);
  box-shadow: 0 0 10px rgba(0, 194, 168, 0.5);
}

.signal-breadcrumb.share.is-active .signal-breadcrumb-circle {
  background: #fff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle {
  background: #6f5d9f;
}

.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle {
  background: #3a8862;
}

.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle {
  background: #4A90E2;
}

.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle {
  background: #FFB800;
}

.signal-breadcrumb.location.is-active .signal-breadcrumb-circle {
  background: #5A9FB8;
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

.modal-title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
}

.modal-body {
  font-size: 14px;
  line-height: 1.5;
}

.modal-link {
  color: #fff !important;
  font-weight: 600;
  transition: all 0.3s ease;
}

.modal-link:hover {
  color: #ddd !important;
}

.no-double-underline {
  text-decoration: none !important;
  border-bottom: 1px solid currentColor !important;
  padding-bottom: 1px !important;
}

.no-double-underline:hover {
  border-bottom: 1px solid currentColor !important;
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
  transition: all 0.3s ease;
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

.signal-question-block.contact {
  border-left-color: #00C2A8 !important;
  border-left-width: 4px;
}

.signal-direction-label {
  font-weight: 600;
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.signal-rotating-phrase-container {
  min-height: 1.3em;
  margin-bottom: 0.6rem;
}

.signal-rotating-fixed-height {
  min-height: 2.6em;
}

.signal-question-label {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  color: #f0f0f0;
  line-height: 1.3;
}

.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.5s ease; 
}

.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
}

textarea, .signal-input, .signal-select {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--signal-font-sans);
  margin-bottom: 0.75rem;
}

textarea:focus, .signal-input:focus, .signal-select:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
}

::placeholder { 
  color: #666; 
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
}

.signal-emotion-bubble {
  background: rgba(169, 114, 255, 0.1);
  border-color: rgba(169, 114, 255, 0.3);
  color: #A972FF;
}

.signal-fact-bubble {
  background: rgba(61, 220, 132, 0.1);
  border-color: rgba(61, 220, 132, 0.3);
  color: #3DDC84;
}

.signal-solution-bubble {
  background: rgba(74, 144, 226, 0.1);
  border-color: rgba(74, 144, 226, 0.3);
  color: #4A90E2;
}

/* Применяем ховер-эффекты только для устройств с мышью */
@media (hover: hover) and (pointer: fine) {
  .signal-emotion-bubble:hover {
    background: #A972FF;
    color: #000;
  }

  .signal-fact-bubble:hover {
    background: #3DDC84;
    color: #000;
  }
  
  /* Добавляем недостающий hover для .signal-solution-bubble */
  .signal-solution-bubble:hover {
    background: #4A90E2;
    color: #fff;
  }
}


.signal-solution-bubble:hover {
  background: #4A90E2;
  color: #fff;
}

.signal-reset-bubble {
  font-weight: 600;
  opacity: 0.8;
  font-size: 0.75rem;
  border-style: dashed !important;
}

.signal-example-hint {
  font-size: 0.8rem;
  color: #777;
  margin: 0.4rem 0 0 0.5rem;
  line-height: 1.15;
}

.signal-example-hint-white {
  color: #f0f0f0 !important;
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
}

.signal-next-button-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.signal-humanize-button-container {
  order: 2;
}

.signal-liquid-humanize-btn {
  width: 100%;
  height: 56px;
  border-radius: 18px;
  border: 2px solid #444;
  background: #2a2a2e;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signal-liquid-humanize-btn:not(:disabled):hover {
  border-color: #666;
  color: #bbb;
  background: #333;
}

.signal-liquid-humanize-text {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.signal-liquid-next-btn {
  width: 100%;
  height: 56px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  order: 1;
  font-size: 0;
}

.signal-liquid-next-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.signal-liquid-next-btn:not(:disabled):hover {
  transform: translateY(-2px);
}

.signal-liquid-next-text {
  font-size: 16px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
  line-height: 1;
  display: flex;
  align-items: center;
}

.signal-next-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  vertical-align: middle;
  transform: translate(0, 0px);
}

.signal-next-icon .signal-coffee-fill {
  fill: currentColor;
  opacity: 1;
  transition: height 0.3s ease-in-out, y 0.3s ease-in-out;
}


.signal-emotion-next {
  background: linear-gradient(135deg, #6f5d9f, #8a7ab8);
}

.signal-emotion-next .signal-liquid-next-text,
.signal-emotion-next .signal-next-icon {
  color: #fff;
}

.signal-fact-next {
  background: linear-gradient(135deg, #3a8862, #4fa87a);
}

.signal-fact-next .signal-liquid-next-text,
.signal-fact-next .signal-next-icon {
  color: #fff;
}

.signal-solution-next {
  background: linear-gradient(135deg, #4A90E2, #6BA8F0);
}

.signal-solution-next .signal-liquid-next-text,
.signal-solution-next .signal-next-icon {
  color: #fff;
}

.signal-summary-next {
  background: linear-gradient(135deg, #FFB800, #FFC933);
}

.signal-summary-next .signal-liquid-next-text,
.signal-summary-next .signal-next-icon {
  color: #000;
}

.signal-location-next {
  background: linear-gradient(135deg, #5A9FB8, #7AB8CD);
}

.signal-location-next .signal-liquid-next-text,
.signal-location-next .signal-next-icon {
  color: #fff;
}

.signal-columns {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.signal-column {
  flex: 1;
}

.signal-column label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #aaa;
  margin-bottom: 0.5rem;
}

.signal-input-hint {
  font-size: 0.9rem;
  color: #777;
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.2;
}

.signal-agreement {
  margin: 20px 0 24px 0;;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
  cursor: pointer;
  padding: 0;
}

.signal-agreement input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #00C2A8;
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;
}

.signal-agreement span {
  margin: 0;
  padding: 0;
  line-height: 1.4;
}

.signal-policy-link {
  color: #999 !important;
  padding: 0 !important;
  margin: 0 !important;
  transition: color 0.3s ease;
}

.signal-policy-link:hover {
  color: #fff !important;
}

.signal-submit-button {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, #A972FF 0%, #00C2FF 50%, #FFB800 100%);
  background-size: 200% auto;
  background-position: 25% 50%;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease-out;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0;    /* Убрать любые паддинги */
}

.signal-submit-button .signal-liquid-next-text {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.signal-submit-button:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.02);
}

.signal-submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ПРАВКА 1, 2: Экран подтверждения */
.signal-success-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  width: 100%;
}

.signal-success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 600px;
}

.signal-success-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

/* ПРАВКА 1: Больше серого поля для тикета */
.signal-success-ticket-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.signal-success-date {
  font-family: var(--signal-font-mono);
  font-size: 0.9rem;
  color: #888;
}

.signal-success-ticket {
  background-color: #2a2a2e;
  color: #fff;
  font-weight: 700;
  padding: 0.7rem 2.5rem !important;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--signal-font-mono);
  font-size: 1.1rem;
}

.signal-success-description {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  text-align: center !important;
  width: 100% !important;
  display: block !important;
}

/* ПРАВКА 3, 4: Кнопка без артефактов */
.signal-telegram-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  transition: all 0.3s;
}

.signal-telegram-button.female {
  background-color: #ff69b4;
  color: #fff;
}

.signal-telegram-button.male {
  background-color: #87ceeb;
  color: #000;
}

.signal-telegram-button:hover {
  filter: brightness(110%);
  transform: scale(1.05);
  text-decoration: none !important;
  border: none !important;
}

.signal-secondary-link {
  display: block;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #888;
  transition: color 0.3s;
}

.signal-secondary-link:hover {
  color: #fff !important;
}

@media (max-width: 768px) {
  .signal-demo__header {
    margin-bottom: 12px;
  }

  .signal-controls-row {
    margin-bottom: 12px;
  }

  /* Увеличиваем ширину основного контейнера формы */
  .signal-demo__form-container {
    padding: 1rem 0.75rem; /* Уменьшаем боковые отступы */
    max-width: 100%; /* Используем всю доступную ширину */
  }
  
  /* Увеличиваем ширину блока с вопросами */
  .signal-question-block {
    padding: 1rem 0.85rem; /* Уменьшаем внутренние отступы */
  }

  /* Увеличиваем ширину кнопки "Дальше" */
  .signal-liquid-next-btn {
    width: 100%;
    height: 52px; /* Можно немного уменьшить высоту для мобильных */
  }

  /* Увеличиваем размер шрифта в баблах подсказок */
  .signal-suggestion-bubble {
    font-size: 0.85rem; /* Немного больше для удобства нажатия */
    padding: 0.4rem 0.9rem;
  }
  
  .signal-columns {
    flex-direction: column;
    gap: 1rem;
  }

  .signal-success-ticket-info {
    flex-direction: column;
    gap: 0.75rem;
  }

  .signal-success-ticket {
    padding: 0.6rem 2rem;
  }
}

  .signal-incognito-toggle {
  margin-bottom: 12px;
}

.signal-toggle-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.signal-toggle-checkbox {
  display: none;
}

.signal-toggle-slider {
  position: relative;
  width: 48px;
  height: 26px;
  background-color: #444;
  border-radius: 26px;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.signal-toggle-slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  top: 3px;
  left: 3px;
  transition: transform 0.3s ease;
}

.signal-toggle-checkbox:checked + .signal-toggle-slider {
  background-color: #00C2A8;
}

.signal-toggle-checkbox:checked + .signal-toggle-slider::before {
  transform: translateX(22px);
}

.signal-toggle-text {
  font-size: 0.95rem;
  font-weight: 500;
  color: #ccc;
}

.signal-name-field {
  margin-bottom: 12px;
}

.signal-name-field label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

/* Плавная смена иконок */
.signal-next-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transform: translateY(1px);
  transition: opacity 0.2s ease-in-out; /* ← ДОБАВИТЬ */
}

</style>
