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

    <!-- Контейнер с формой -->
    <div class="signal-demo__form-container">
      <!-- Секция 1: Поделитесь -->
      <div v-if="selectedSection === 'share'" class="signal-form-section">
        <div class="signal-question-block share-block" style="--accent-color: #fff;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestionShare" class="signal-question-label">{{ currentQuestionShare }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.shareExperience" 
            @focus="startRotation('share')" 
            :rows="isMobile ? 5 : 3"
            placeholder="Поделитесь своим впечатлением..."
          ></textarea>
          <p class="signal-example-hint">Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»</p>
        </div>
      </div>

      <!-- Секция 2: Эмоции -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #6f5d9f;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1" class="signal-question-label">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.emotionalRelease" 
            @focus="startRotation(1)" 
            :rows="isMobile ? 5 : 3"
            :placeholder="selectedGender === 'female' ? 'Разочарована ожиданиями...' : 'Разочарован ожиданиями...'"
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
              <p :key="currentQuestion2" class="signal-question-label">{{ currentQuestion2 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.factualAnalysis" 
            @focus="startRotation(2)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Опишите факты: что, когда и где произошло..."
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
              <p :key="currentQuestion3" class="signal-question-label">{{ currentQuestion3 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.constructiveSuggestions" 
            @focus="startRotation(3)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Предложите, как это можно исправить..."
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
          <p class="signal-direction-label">Умный отзыв</p>
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">От эмоций до конструктивных предложений</p>
          </div>
          <textarea 
            v-model="form.summaryText" 
            :rows="isMobile ? 10 : 8"
            placeholder="Здесь появится Ваш Умный Отзыв ..."
          ></textarea>
          <p class="signal-example-hint signal-example-hint-white">Конструктивный отзыв = сумма Ваших эмоций, фактов и решений.</p>
        </div>
      </div>

      <!-- Секция 6: Локация -->
      <div v-if="selectedSection === 'location'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #5A9FB8;">
          <p class="signal-direction-label">Выбрать локацию</p>
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">В какой кофейне разобрать этот отзыв?</p>
          </div>
          <select v-model="form.selectedNetwork" @change="form.selectedBranch = ''" class="signal-select">
            <option disabled value="">Выберите сеть</option>
            <option v-for="(cafe, name) in cafes" :key="name" :value="name">{{ name }}</option>
          </select>
          <select v-model="form.selectedBranch" class="signal-select" :disabled="!form.selectedNetwork">
            <option disabled value="">Выберите адрес</option>
            <option v-for="(branch, index) in selectedNetworkBranches" :key="index" :value="branch.address">
              {{ branch.address }}
            </option>
          </select>
        </div>
      </div>

      <!-- Секция 7: Контакт -->
      <div v-if="selectedSection === 'contact'" class="signal-form-section">
        <!-- ПРАВКА 1, 2: Экран подтверждения -->
        <div v-if="formSubmitted" class="signal-success-screen">
          <div class="signal-success-content">
            <!-- ПРАВКА 1: Убрать "Все готово" -->
            <h3>Отзыв отправлен</h3>
            <!-- ПРАВКА 1: Больше серого поля для тикета -->
            <div class="signal-success-ticket-info">
              <span class="signal-success-date">{{ currentDate }}</span>
              <span class="signal-success-ticket">{{ formattedTicketNumber }}</span>
            </div>
            
            <!-- ПРАВКА 2: Текст по центру -->
            <p class="signal-success-description">Нажмите на кнопку ниже, чтобы отправить ваш тикет ассистенту Анне и получить результат вашего запроса.</p>
            <!-- ПРАВКА 4: Новый текст кнопки -->
            <a :href="`https://t.me/Anna_Signal?text=Тикет%20${rawTicketNumber}`" target="_blank" :class="['signal-telegram-button', selectedGender === 'female' ? 'female' : 'male']">Отправить тикет Анне</a>
            <a href="/signals#знакомьтесь-–-анна" target="_blank" class="signal-secondary-link no-double-underline">Кто Анна и как работает</a>
          </div>
        </div>

        <div v-if="!formSubmitted" class="signal-question-block contact" style="--accent-color: #00C2A8;">
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">Останемся на связи?</p>
          </div>
          <div class="signal-columns">
            <div class="signal-column">
              <label>Ваше имя</label>
              <input v-model="form.userName" class="signal-input" placeholder="Как к вам обращаться?" />
              <p class="signal-input-hint">Для персонального общения с ИИ-ассистентом Анной.</p>
            </div>
            <div class="signal-column">
              <label>Ваш контакт в Telegram</label>
              <input v-model="form.telegramContact" class="signal-input" placeholder="+7 (___) ___-__-__" />
              <p class="signal-input-hint">Чтобы получать обновления и видеть результат.</p>
            </div>
          </div>
          <label class="signal-agreement">
            <input type="checkbox" v-model="form.agreedToTerms" />
            <span>С <a href="/terms" target="_blank" class="signal-policy-link no-double-underline">Условиями использования</a> согласен/на</span>
          </label>
        </div>

        <div v-if="!formSubmitted">
          <button class="signal-submit-button" :disabled="submitStatus === 'processing'" @click="submitForm">
            {{ submitStatus === 'processing' ? 'Отправка...' : 'Отправить отзыв в кофейню' }}
          </button>
        </div>
      </div>

      <!-- Кнопки навигации -->
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
          @click="goToNextSection()"
          :disabled="selectedSection === 'location' && (!form.selectedNetwork || !form.selectedBranch)"
        >
          <span class="signal-liquid-next-text">Дальше</span>
          <svg class="signal-next-icon" width="20" height="20" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
import { reactive, ref, onUnmounted, computed, onMounted } from 'vue';

const form = reactive({ 
  shareExperience: '',
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  summaryText: '',
  selectedNetwork: '',
  selectedBranch: '',
  userName: '',
  telegramContact: '',
  agreedToTerms: true
});

const isMobile = ref(false);
const selectedGender = ref('female');
const humanizeStatus = ref('idle');
const showInfoModal = ref(false);
const submitStatus = ref('idle');
const formSubmitted = ref(false);
const rawTicketNumber = ref(null);
const formattedTicketNumber = ref(null);
const currentDate = ref('');

const cafes = {
  'Корж': {
    branches: [
      { address: 'Куйбышева, 103' },
      { address: 'Революционная, 101В' },
      { address: '9 просека 5-я малая линия, 3б' },
      { address: 'Льва Толстого, 30Б' },
      { address: 'Самарская, 270' },
      { address: 'Дачная, 2к2' },
      { address: 'Ульяновская, 19' },
      { address: 'Ново-Садовая, 106б' }
    ]
  },
  'MOSAIC': {
    branches: [
      { address: 'Бывшая гостиница "Националь"' },
      { address: 'Волжский просп., 50' },
      { address: 'Речной вокзал' },
      { address: 'Максима Горького, 82' },
      { address: 'Волжский просп., 40' },
      { address: 'ЖК Ботанический' },
      { address: 'ТЦ Аквариум' },
      { address: 'ТЦ Аврора' },
      { address: 'ТЦ Самолет' },
      { address: 'Волгина, 127А' },
      { address: 'БЦ ЗИМ' },
      { address: '5-я просека' },
      { address: 'Красноармейский спуск' },
      { address: 'Напротив ЦСКА' }
    ]
  },
  'Skuratov': {
    branches: [
      { address: 'Самарская, 190' },
      { address: 'Молодогвардейская, 80' },
      { address: 'Максима Горького, 129' },
      { address: 'Красноармейская, 133' },
      { address: 'Первомайская, 29' },
      { address: 'Куйбышева, 68/70' }
    ]
  },
  'Surf': {
    branches: [
      { address: 'Некрасовская, 57' },
      { address: 'Полевая, 54' },
      { address: 'Куйбышева, 100' }
    ]
  },
  'Белотурка': {
    branches: [
      { address: 'Куйбышева, 99' },
      { address: 'Молодогвардейская, 153' },
      { address: 'Ново-Садовая, 106' },
      { address: 'Московское шоссе, 41 (РДЦ)' },
      { address: 'Московское шоссе, 81Б (Парк Хаус)' }
    ]
  },
  'Кэрри': {
    branches: [
      { address: 'Ново-Садовая ул., 160М' },
      { address: 'Московское шоссе, 252' },
      { address: 'Дачная ул., 2, корп. 1' },
      { address: 'Дыбенко, 30 (Космопорт)' }
    ]
  }
};

const selectedNetworkBranches = computed(() => {
  if (!form.selectedNetwork) return [];
  return cafes[form.selectedNetwork]?.branches || [];
});

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') showInfoModal.value = false;
  });
  updateSuggestionsForGender();
  
  rawTicketNumber.value = String(Date.now()).slice(-6);
  formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3, 6)}`;
  const now = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  currentDate.value = now.toLocaleString('ru-RU', options).replace(',', '');
});

const sections = [
  { id: 'share', title: 'Поделитесь' },
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' },
  { id: 'summary', title: 'Итого' },
  { id: 'location', title: 'Локация' },
  { id: 'contact', title: 'Связь' }
];

const selectedSection = ref('share');
const isActive = (id) => id === selectedSection.value;

const goToNextSection = () => {
  const currentIndex = sections.findIndex(s => s.id === selectedSection.value);
  if (selectedSection.value === 'solutions') {
    summarizeAllContent();
  }
  if (currentIndex < sections.length - 1) {
    selectedSection.value = sections[currentIndex + 1].id;
  }
};

function summarizeAllContent() {
  humanizeStatus.value = 'processing';
  try {
    const structuredText = structureAndCleanText(
      form.shareExperience.trim(),
      form.emotionalRelease.trim(),
      form.factualAnalysis.trim(),
      form.constructiveSuggestions.trim(),
      selectedGender.value
    );
    form.summaryText = applyGenderCorrection(structuredText, selectedGender.value);
    humanizeStatus.value = 'completed';
    setTimeout(() => {
      humanizeStatus.value = 'idle';
    }, 2000);
  } catch (error) {
    console.error('Ошибка:', error);
    humanizeStatus.value = 'idle';
  }
}

function onGenderClick(gender) {
  selectedGender.value = gender;
  updateSuggestionsForGender();
  if (selectedSection.value === 'summary') {
    summarizeAllContent();
  }
}

async function submitForm() {
  submitStatus.value = 'processing';
  const formData = {
    _subject: `Новый отзыв от ${form.userName || 'Аноним'}`,
    "Дата": currentDate.value,
    "Код тикета": rawTicketNumber.value,
    "Сеть": form.selectedNetwork,
    "Адрес": form.selectedBranch,
    "Имя": form.userName,
    "Telegram": form.telegramContact,
    "Отзыв": form.summaryText
  };
  try {
    const response = await fetch('https://formspree.io/f/mdkzjopz', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error('Ошибка');
    formSubmitted.value = true;
    submitStatus.value = 'idle';
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Не удалось отправить отзыв. Попробуйте позже.');
    submitStatus.value = 'idle';
  }
}

const baseSuggestions = {
  emotions: {
    initial: ['расстроена', 'разочарована', 'недовольна', 'возмущена', 'удивлена']
  },
  facts: {
    initial: ['ожидание', 'качество', 'заказ', 'чистота', 'персонал']
  },
  solutions: {
    initial: ['таймер ожидания', 'контроль качества', 'обучение персонала', 'система проверки']
  }
};

const currentSuggestions = reactive({
  emotions: baseSuggestions.emotions.initial,
  facts: baseSuggestions.facts.initial,
  solutions: baseSuggestions.solutions.initial
});

function selectSuggestion(field, suggestion, category) {
  const currentText = form[field].trim();
  const newText = currentText ? `${currentText}. ${suggestion}` : suggestion;
  form[field] = newText;
}

function isInitialSuggestions(category) {
  return currentSuggestions[category] === baseSuggestions[category].initial;
}

function resetSuggestions(category) {
  currentSuggestions[category] = baseSuggestions[category].initial;
}

function updateSuggestionsForGender() {
  if (selectedGender.value === 'male') {
    currentSuggestions.emotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён'];
  } else {
    currentSuggestions.emotions = baseSuggestions.emotions.initial;
  }
}

const questionsShare = ['Что произошло?', 'Расскажите о ситуации', 'Опишите вашу проблему'];
const questions1 = { 
  female: ['Что вы почувствовали?', 'Какие эмоции испытали?', 'Что вас расстроило?'],
  male: ['Что вы почувствовали?', 'Какие эмоции испытали?', 'Что вас расстроило?']
};
const questions2 = ['Что именно произошло?', 'Какие детали важны?', 'Опишите факты'];
const questions3 = ['Как это исправить?', 'Что может помочь?', 'Ваши предложения?'];

const currentQuestionShare = ref(questionsShare[0]);
const currentQuestion1 = ref(questions1.female[0]);
const currentQuestion2 = ref(questions2[0]);
const currentQuestion3 = ref(questions3[0]);

let rotationInterval = null;

function startRotation(questionNum) {
  if (rotationInterval) clearInterval(rotationInterval);
  
  let questions, currentQuestion;
  
  if (questionNum === 'share') {
    questions = questionsShare;
    currentQuestion = currentQuestionShare;
  } else if (questionNum === 1) {
    questions = selectedGender.value === 'female' ? questions1.female : questions1.male;
    currentQuestion = currentQuestion1;
  } else if (questionNum === 2) {
    questions = questions2;
    currentQuestion = currentQuestion2;
  } else if (questionNum === 3) {
    questions = questions3;
    currentQuestion = currentQuestion3;
  }
  
  let currentIndex = questions.indexOf(currentQuestion.value);
  
  rotationInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % questions.length;
    currentQuestion.value = questions[currentIndex];
  }, 3000);
}

function applyGenderCorrection(text, gender) {
  return text;
}

function structureAndCleanText(share, emotional, factual, solutions, gender) {
  let result = '';
  if (share) result += `МОЙ ОТЗЫВ: ${share}\n\n`;
  if (emotional) result += `ВПЕЧАТЛЕНИЯ\n${emotional}\n\n`;
  if (factual) result += `ПРОБЛЕМЫ\n${factual}\n\n`;
  if (solutions) result += `ПРЕДЛОЖЕНИЯ\n${solutions}`;
  return result;
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
  background: rgba(74, 144, 226, 0.1);
  border-color: rgba(74, 144, 226, 0.3);
  color: #4A90E2;
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
  margin: 0.5rem 0 0 0.25rem;
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
  gap: 16px;
  transition: all 0.3s ease;
  order: 1;
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
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.signal-share-next {
  background: #fff !important;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.signal-share-next .signal-liquid-next-text,
.signal-share-next .signal-next-icon {
  color: #000 !important;
}

.signal-share-next:hover {
  background: #f5f5f5 !important;
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
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
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.25rem;
  line-height: 1.2;
}

.signal-agreement {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
  cursor: pointer;
  margin: 0;
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
  padding: 1rem 5rem !important;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--signal-font-mono);
  font-size: 1.1rem;
}

.signal-success-description {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  text-align: center !important;  /* ← ДОБАВИТЬ !important */
  width: 100% !important;          /* ← ДОБАВИТЬ !important */
  display: block !important;       /* ← ДОБАВИТЬ ЭТУ СТРОКУ */
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
  .signal-controls-row {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .signal-demo__form-container {
    padding: 1.5rem;
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
</style>
