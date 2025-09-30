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
      <!-- Кнопка "Как работает" -->
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
        Как работает
      </button>

      <!-- Переключатель пола -->
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

    <!-- Информационное модальное окно -->
    <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
      <div class="modal" role="dialog" aria-modal="true" id="signal-dialog" aria-label="Информация о Сигнале">
        <div class="modal-header">
          <div class="modal-title">Ваши отзывы меняют всё.</div>
        </div>
        <div class="modal-body">
          Каждый отзыв делает любимую кофейню еще лучше, а Сигнал помогает решить Вашу проблему за 24 часа. Почувствуйте силу настоящих перемен.<br><br>
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
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestionShare" class="signal-question-label">{{ currentQuestionShare }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.shareExperience" 
            @focus="startRotation('share')" 
            :rows="isMobile ? 5 : 3"
            placeholder="Поделитесь своим впечатлением...">
          </textarea>
          
          <p class="signal-example-hint">Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»</p>
        </div>
      </div>

      <!-- Секция "Эмоции и чувства" -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #6f5d9f;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1" class="signal-question-label" ref="questionRef1">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.emotionalRelease" 
            @focus="startRotation(1)" 
            :rows="isMobile ? 5 : 3"
            :placeholder="selectedGender === 'female' ? 'Разочарована ожиданиями...' : 'Разочарован ожиданиями...'">
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
        <div class="signal-question-block" style="--accent-color: #3a8862;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion2" class="signal-question-label" ref="questionRef2">{{ currentQuestion2 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.factualAnalysis" 
            @focus="startRotation(2)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Опишите факты: что, когда и где произошло...">
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
        <div class="signal-question-block" style="--accent-color: #b88700;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion3" class="signal-question-label" ref="questionRef3">{{ currentQuestion3 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.constructiveSuggestions" 
            @focus="startRotation(3)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Предложите, как это можно исправить...">
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
        <div class="signal-question-block" style="--accent-color: #a98500;">
          <p class="signal-direction-label">Умный отзыв</p>
          
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">От эмоций до конструктивных предложений</p>
          </div>
          
          <textarea 
            v-model="form.summaryText" 
            :rows="isMobile ? 10 : 8"
            :placeholder="getPlaceholderText()"
          ></textarea>
                    
          <p class="signal-example-hint signal-example-hint-white">Конструктивный отзыв = сумма Ваших эмоций, фактов и решений.</p>
        </div>
      </div>
      
      <!-- Секция "Выбрать локацию" - НОВАЯ -->
      <div v-if="selectedSection === 'location'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #00D9FF;">
          <p class="signal-direction-label">Выбрать локацию</p>
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">В какой кофейне разобрать этот отзыв?</p>
          </div>
          <select 
            v-model="form.selectedNetwork" 
            @change="form.selectedBranch = ''"
            class="signal-select"
          >
            <option disabled value="">Выберите сеть</option>
            <option v-for="(cafe, name) in cafes" :key="name" :value="name">
              {{ name }}
            </option>
          </select>
          <select 
            v-model="form.selectedBranch" 
            class="signal-select"
            :disabled="!form.selectedNetwork"
          >
            <option disabled value="">Выберите адрес</option>
            <option 
              v-for="(branch, index) in selectedNetworkBranches" 
              :key="index" 
              :value="branch.address"
            >
              {{ branch.address }}
            </option>
          </select>
        </div>
      </div>

      <!-- Секция "Останемся на связи?" - НОВАЯ -->
      <div v-if="selectedSection === 'contact'" class="signal-form-section">
        <!-- Экран успешной отправки -->
        <div v-if="formSubmitted" class="signal-success-screen">
          <div class="signal-success-content">
            <h3>Все готово!</h3>
            <p>Нажмите на кнопку ниже, чтобы отправить ваш уникальный код ассистенту Анне и получить результат вашего запроса.</p>
            <a v-if="form.telegramContact" :href="`https://t.me/Anna_Signal?text=Сигнал%20${rawTicketNumber}`" target="_blank" :class="['signal-telegram-button', selectedGender === 'female' ? 'female' : 'male']">Активировать Сигнал в Telegram</a>
            <a v-if="form.telegramContact" href="/signals#знакомьтесь-–-анна" target="_blank" class="signal-secondary-link">Кто Анна и как работает</a>
          </div>
        </div>

        <!-- Основная форма -->
        <div v-if="!formSubmitted" class="signal-question-block contact" style="--accent-color: #FFB800;">
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
                С <a href="/terms" target="_blank" class="signal-policy-link">Условиями использования</a> согласен/на
            </label>
        </div>

        <div v-if="!formSubmitted">
            <button 
              class="signal-submit-button" 
              :disabled="submitStatus === 'processing'" 
              @click="submitForm"
            >
              {{ submitStatus === 'processing' ? 'Отправка...' : 'Отправить отзыв в кофейню' }}
            </button>
        </div>
      </div>

      <!-- КНОПКА ДАЛЬШЕ - для всех секций кроме последней -->
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
          :disabled="nextStatus === 'processing'"
        >
          <span class="signal-liquid-next-text">Дальше</span>
          <svg class="signal-next-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- КНОПКА ОБНОВИТЬ - только в секции Итого, СТРОГО ПОД кнопкой Дальше -->
        <div v-if="selectedSection === 'summary'" class="signal-humanize-button-container">
          <button 
            class="signal-liquid-humanize-btn"
            @click="summarizeAllContent()"
            :disabled="humanizeStatus === 'processing'"
          >
            <span class="signal-liquid-humanize-text">
              {{ 
                humanizeStatus === 'completed' ? 'Готово' : 
                humanizeStatus === 'processing' ? 'Обновление...' : 
                'Обновить'
              }}
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
const questionRef1 = ref(null);
const questionRef2 = ref(null);
const questionRef3 = ref(null);
const selectedGender = ref('female');
const humanizeStatus = ref('idle');
const nextStatus = ref('idle');
const showInfoModal = ref(false);
const submitStatus = ref('idle');
const formSubmitted = ref(false);
const rawTicketNumber = ref(null);
const currentDate = ref('');

const cafes = {
  'Корж': {
    name: 'Корж',
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
    name: 'MOSAIC',
    branches: [
      { address: 'Бывшая гостиница "Националь" ' },
      { address: 'Волжский просп., 50' },
      { address: 'Речной вокзал' },
      { address: 'Максима Горького, 82' },
      { address: 'Волжский просп., 40' },
      { address: 'ЖК Ботанический' },
      { address: 'ТЦ Аквариум ' },
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
    name: 'Skuratov',
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
    name: 'Surf',
    branches: [
      { address: 'Некрасовская, 57' },
      { address: 'Полевая, 54' },
      { address: 'Куйбышева, 100' }
    ]
  },
  'Белотурка': {
    name: 'Белотурка',
    branches: [
      { address: 'Куйбышева, 99' },
      { address: 'Молодогвардейская, 153' },
      { address: 'Ново-Садовая, 106' },
      { address: 'Московское шоссе, 41 (РДЦ)' },
      { address: 'Московское шоссе, 81Б (Парк Хаус)' }
    ]
  },
  'Кэрри': {
    name: 'Кэрри',
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
  
  rawTicketNumber.value = String(Date.now()).slice(-6);
  const now = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  currentDate.value = now.toLocaleString('ru-RU', options).replace(',', '');
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
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

const getPlaceholderText = () => {
  return "Здесь появится Ваш Умный Отзыв ...";
};

const goToNextSection = async () => {
  const currentIndex = sections.findIndex(s => s.id === selectedSection.value);
  
  if (selectedSection.value === 'solutions') {
    nextStatus.value = 'processing';
    summarizeAllContent();
    nextStatus.value = 'idle';
  }
  
  if (currentIndex < sections.length - 1) {
    selectedSection.value = sections[currentIndex + 1].id;
  }
};

const CYR = 'А-Яа-яЁё';
const beforeBoundary = `(^|[^${CYR}])`;
const afterBoundary = `(?=[^${CYR}]|$)`;
const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const capitalizeLike = (src, target) => {
  if (!src) return target;
  const isUpper = src[0] === src[0].toUpperCase();
  return isUpper ? target[0].toUpperCase() + target.slice(1) : target;
};

const genderMap = {
  female: [
    ['разочарован', 'разочарована'],
    ['недоволен', 'недовольна'],
    ['расстроен', 'расстроена'],
    ['огорчён', 'огорчена'], ['огорчен', 'огорчена'],
    ['возмущён', 'возмущена'], ['возмущен', 'возмущена'],
    ['удивлён', 'удивлена'], ['удивлен', 'удивлена'],
    ['доволен', 'довольна'],
    ['восхищён', 'восхищена'], ['восхищен', 'восхищена'],
    ['благодарен', 'благодарна'],
    ['был', 'была'],
    ['заказал', 'заказала'],
    ['ожидал', 'ожидала'],
    ['засекал', 'засекала']
  ],
  male: [
    ['разочарована', 'разочарован'],
    ['недовольна', 'недоволен'],
    ['расстроена', 'расстроен'],
    ['огорчена', 'огорчён'], ['огорчена', 'огорчен'],
    ['возмущена', 'возмущён'], ['возмущена', 'возмущен'],
    ['удивлена', 'удивлён'], ['удивлена', 'удивлен'],
    ['довольна', 'доволен'],
    ['восхищена', 'восхищён'], ['восхищена', 'восхищен'],
    ['благодарна', 'благодарен'],
    ['была', 'был'],
    ['заказала', 'заказал'],
    ['ожидала', 'ожидал'],
    ['засекала', 'засекал']
  ]
};

function applyGenderCorrection(text, gender) {
  if (!text) return text;
  const rules = gender === 'male' ? genderMap.male : genderMap.female;
  const sorted = [...rules].sort((a, b) => b[0].length - a[0].length);

  let out = text;
  for (const [fromRaw, toRaw] of sorted) {
    const pat = new RegExp(`${beforeBoundary}(${escape(fromRaw)})${afterBoundary}`, 'gi');
    out = out.replace(pat, (m, p1, p2) => `${p1}${capitalizeLike(p2, toRaw)}`);
  }
  return out;
}

function removeDuplicates(text) {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 3);
  const uniqueSentences = [];
  const seen = new Set();
  
  sentences.forEach(sentence => {
    const normalized = sentence.toLowerCase().replace(/\s+/g, ' ');
    if (!seen.has(normalized) && normalized.length > 5) {
      seen.add(normalized);
      uniqueSentences.push(sentence);
    }
  });
  
  return uniqueSentences.join('. ') + (uniqueSentences.length > 0 ? '.' : '');
}

function structureAndCleanText(shareText, emotionalText, factualText, solutionsText, gender) {
  let result = '';
  
  if (shareText.trim()) {
    let userText = applyGenderCorrection(shareText.trim(), gender);
    if (!userText.match(/[.!?]$/)) {
      userText += '.';
    }
    result += `МОЙ ОТЗЫВ СЕЙЧАС: ${userText.charAt(0).toUpperCase() + userText.slice(1)}`;
  } else {
    result += `МОЙ ОТЗЫВ СЕЙЧАС: (можно дополнить)`;
  }
  
  if (emotionalText || factualText || solutionsText) {
    if (result) result += '\n\n';
    result += '---\nМожно улучшить:\n---';
  }
  
  if (emotionalText) {
    const emotions = applyGenderCorrection(emotionalText.trim(), gender);
    const sentences = emotions.split(/[.!]/).map(s => s.trim()).filter(s => s);
    
    const positiveEmotions = [];
    const neutralEmotions = [];
    const negativeEmotions = [];
    
    sentences.forEach(sentence => {
      const lower = sentence.toLowerCase();
      if (lower.includes('доволь') || lower.includes('восхищ') || lower.includes('благодар')) {
        const parts = sentence.split(' ');
        if (parts.length > 3) {
          const formatted = parts.slice(0, 3).join(' ') + ' – ' + parts.slice(3).join(' ');
          positiveEmotions.push(formatted);
        } else {
          positiveEmotions.push(sentence);
        }
      } else if (lower.includes('удивл')) {
        neutralEmotions.push(sentence);
      } else {
        const parts = sentence.split(' ');
        if (parts.length > 3) {
          const formatted = parts.slice(0, 3).join(' ') + ' – ' + parts.slice(3).join(' ');
          negativeEmotions.push(formatted);
        } else {
          negativeEmotions.push(sentence);
        }
      }
    });
    
    let emotionText = '';
    if (positiveEmotions.length > 0) emotionText += positiveEmotions.join('. ') + '. ';
    if (neutralEmotions.length > 0) emotionText += neutralEmotions.join('. ') + '. ';
    if (negativeEmotions.length > 0) emotionText += negativeEmotions.join('. ') + '.';
    
    emotionText = removeDuplicates(emotionText);
    if (result) result += '\n\n';
    result += `ВПЕЧАТЛЕНИЯ\n${emotionText}`;
  } else {
    if (result) result += '\n\n';
    result += `ВПЕЧАТЛЕНИЯ\n(можно дополнить)`;
  }
  
  if (factualText) {
    if (result) result += '\n\n';
    
    const facts = factualText.trim();
    const sentences = facts.split(/[.!]/).map(s => s.trim()).filter(s => s);
    const factGroups = {};
    
    sentences.forEach(sentence => {
      let category = '';
      
      if (sentence.toLowerCase().includes('ожидан') || sentence.toLowerCase().includes('ждал')) {
        category = 'Ожидание';
      } else if (sentence.toLowerCase().includes('заказ') || sentence.toLowerCase().includes('доложи')) {
        category = 'Ошибка в заказе';
      } else if (sentence.toLowerCase().includes('качество') || sentence.toLowerCase().includes('кофе') || sentence.toLowerCase().includes('еда')) {
        category = 'Качество блюд';
      } else if (sentence.toLowerCase().includes('чист') || sentence.toLowerCase().includes('посуда')) {
        category = 'Чистота';
      } else if (sentence.toLowerCase().includes('персонал') || sentence.toLowerCase().includes('сотрудн')) {
        category = 'Персонал';
      } else {
        const words = sentence.split(' ');
        category = words.slice(0, 2).join(' ');
      }
      
      if (!factGroups[category]) factGroups[category] = [];
      
      let details = sentence;
      if (sentence.toLowerCase().startsWith(category.toLowerCase())) {
        details = sentence.substring(category.length).replace(/^[\s:,-]+/, '');
      }
      
      if (details && details.length > 3) {
        factGroups[category].push(details);
      }
    });
    
    let factText = '';
    Object.keys(factGroups).forEach(category => {
      if (factGroups[category].length > 0) {
        const uniqueDetails = [...new Set(factGroups[category])];
        factText += `${category}: ${uniqueDetails.join(', ')}. `;
      }
    });
    
    factText = removeDuplicates(factText);
    result += `ПРОБЛЕМЫ\n${factText}`;
  } else {
    if (result) result += '\n\n';
    result += `ПРОБЛЕМЫ\n(можно дополнить)`;
  }
  
  if (solutionsText) {
    if (result) result += '\n\n';
    
    const solutions = solutionsText.trim();
    const sentences = solutions.split(/[.!]/).map(s => s.trim()).filter(s => s);
    const solutionGroups = {};
    
    sentences.forEach(sentence => {
      let category = '';
      
      if (sentence.toLowerCase().includes('таймер') || sentence.toLowerCase().includes('контроль времени')) {
        category = 'Таймер ожидания';
      } else if (sentence.toLowerCase().includes('обучение')) {
        category = 'Обучение персонала';
      } else if (sentence.toLowerCase().includes('контроль качества')) {
        category = 'Контроль качества';
      } else if (sentence.toLowerCase().includes('проверк')) {
        category = 'Система проверки';
      } else if (sentence.toLowerCase().includes('стандарт')) {
        category = 'Стандарты сервиса';
      } else {
        const words = sentence.split(' ');
        category = words.slice(0, 2).join(' ');
      }
      
      if (!solutionGroups[category]) solutionGroups[category] = [];
      
      let details = sentence;
      if (sentence.toLowerCase().startsWith(category.toLowerCase())) {
        details = sentence.substring(category.length).replace(/^[\s:,-]+/, '');
      }
      
      if (details && details.length > 3) {
        solutionGroups[category].push(details);
      }
    });
    
    let solutionText = '';
    Object.keys(solutionGroups).forEach(category => {
      if (solutionGroups[category].length > 0) {
        const uniqueDetails = [...new Set(solutionGroups[category])];
        solutionText += `${category}: ${uniqueDetails.join(', ')}. `;
      }
    });
    
    solutionText = removeDuplicates(solutionText);
    result += `ПРЕДЛОЖЕНИЯ\n${solutionText}`;
  } else {
    if (result) result += '\n\n';
    result += `ПРЕДЛОЖЕНИЯ\n(можно дополнить)`;
  }
  
  return result;
}

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
    console.error('Ошибка суммирования:', error);
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error('Ошибка сервера');
    
    formSubmitted.value = true;
    submitStatus.value = 'idle';
  } catch (error) {
    console.error('Ошибка отправки:', error);
    alert('Не удалось отправить отзыв. Попробуйте позже.');
    submitStatus.value = 'idle';
  }
}

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
    'долго ждала': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'пустая кофейня'],
    'грязная посуда': ['следы помады', 'остатки еды', 'жирные пятна', 'засохший кофе', 'странный запах'],
    'холодный кофе': ['едва теплый', 'совсем остыл', 'подали холодным', 'остыл пока ждала', 'температура комнатная']
  },
  facts: {
    initial: ['ожидание', 'качество', 'заказ', 'чистота', 'персонал'],
    'ожидание': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'пустая кофейня'],
    'качество': ['холодный кофе', 'пережаренные зерна', 'водянистый напиток', 'горький вкус', 'несвежая выпечка'],
    'заказ': ['неправильный напиток', 'забыли позицию', 'другой размер', 'не тот сироп', 'перепутали'],
    'чистота': ['грязные столы', 'немытая посуда', 'липкий пол', 'пыль на полках', 'мусор у входа'],
    'персонал': ['грубость', 'игнорирование', 'невнимательность', 'раздражение', 'хамство']
  },
  solutions: {
    initial: ['таймер ожидания', 'контроль качества', 'обучение персонала', 'система проверки', 'стандарты сервиса'],
    'таймер ожидания': ['видимый счетчик', 'уведомления о готовности', 'бонус за ожидание', 'прозрачность процесса'],
    'контроль качества': ['проверка температуры', 'дегустация бариста', 'свежесть продуктов', 'стандарты приготовления'],
    'обучение персонала': ['тренинги по сервису', 'работа с жалобами', 'стандарты общения', 'мотивация команды'],
    'система проверки': ['чек-листы чистоты', 'mystery shopper', 'обратная связь', 'контроль менеджера'],
    'стандарты сервиса': ['протоколы приготовления', 'правила общения', 'SOP процедуры', 'корпоративная культура']
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
  
  const nextLevel = baseSuggestions[category][suggestion];
  if (nextLevel) {
    currentSuggestions[category] = nextLevel;
  }
}

function isInitialSuggestions(category) {
  return currentSuggestions[category] === baseSuggestions[category].initial;
}

function resetSuggestions(category) {
  currentSuggestions[category] = baseSuggestions[category].initial;
}

function updateSuggestionsForGender() {
  if (selectedGender.value === 'male') {
    currentSuggestions.emotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'];
  } else {
    currentSuggestions.emotions = baseSuggestions.emotions.initial;
  }
}

const questionsShare = [
  'Что произошло?',
  'Расскажите о ситуации',
  'Опишите вашу проблему'
];

const questions1 = {
  female: [
    'Что вы почувствовали?',
    'Какие эмоции испытали?',
    'Что вас расстроило?'
  ],
  male: [
    'Что вы почувствовали?',
    'Какие эмоции испытали?',
    'Что вас расстроило?'
  ]
};

const questions2 = [
  'Что именно произошло?',
  'Какие детали важны?',
  'Опишите факты'
];

const questions3 = [
  'Как это исправить?',
  'Что может помочь?',
  'Ваши предложения?'
];

const currentQuestionShare = ref(questionsShare[0]);
const currentQuestion1 = ref(questions1.female[0]);
const currentQuestion2 = ref(questions2[0]);
const currentQuestion3 = ref(questions3[0]);

let rotationInterval = null;

function startRotation(questionNum) {
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }
  
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

.signal-breadcrumb.is-active .signal-breadcrumb-circle {
  width: 24px;
  height: 8px;
  border-radius: 4px;
}

/* ПРАВКА 4: Цвет последнего переключателя - градиент кнопки отправки */
.signal-breadcrumb.contact.is-active .signal-breadcrumb-circle {
  background: linear-gradient(90deg, #A972FF 0%, #00C2FF 50%, #FFB800 100%);
  box-shadow: 0 0 10px rgba(255, 184, 0, 0.5);
}

.signal-breadcrumb.share.is-active .signal-breadcrumb-circle {
  background: #6B7280;
}

/* ПРАВКА 6: Приглушенные премиальные цвета для экранов 2-5 */
.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle {
  background: #6f5d9f;
}

.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle {
  background: #3a8862;
}

/* ПРАВКА 7: Уникальный оранжевый цвет для переключателя 4 */
.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle {
  background: #b88700;
}

/* ПРАВКА 8: Матовый золотой с градиентом для переключателя 5 */
.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle {
  background: linear-gradient(135deg, #a98500, #7a5f00);
  box-shadow: 0 0 10px rgba(122, 95, 0, 0.5);
}

.signal-breadcrumb.location.is-active .signal-breadcrumb-circle {
  background: #00D9FF;
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

/* ПРАВКА 9: Полоса слева на последнем экране */
.signal-question-block.contact {
  border-left-color: #FFB800 !important;
  border-left-width: 4px;
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

.signal-rotating-fixed-height {
  min-height: 2.6em;
}

.signal-question-label {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  color: #f0f0f0;
  line-height: 1.3;
  width: 100%;
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
  resize: vertical;
  margin-bottom: 0.75rem;
}

textarea:focus, .signal-input:focus, .signal-select:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

.signal-select {
  margin-bottom: 0.75rem;
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

.signal-example-hint-white {
  color: #f0f0f0 !important;
  margin: 0.5rem 0 0 0rem !important;
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
}

/* ПРАВКА 8: Кнопка "Обновить" СТРОГО под кнопкой "Дальше" */
.signal-next-button-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.signal-humanize-button-container {
  order: 2;
  margin-top: 0;
  margin-bottom: 0;
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

.signal-liquid-humanize-text {
  position: relative;
  z-index: 3;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.signal-liquid-next-btn {
  position: relative;
  width: 100%;
  height: 56px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-family: var(--signal-font-sans);
  white-space: nowrap;
  background: linear-gradient(135deg, var(--accent-color), color-mix(in srgb, var(--accent-color) 70%, white));
  box-shadow: 0 4px 15px color-mix(in srgb, var(--accent-color) 30%, transparent);
  order: 1;
}

.signal-liquid-next-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--accent-color) 40%, transparent);
}

.signal-liquid-next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.signal-next-icon {
  position: relative;
  z-index: 3;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  color: #fff;
}

.signal-liquid-next-text {
  position: relative;
  z-index: 3;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
}

/* ПРАВКА 5: Темная сексуальная кнопка "Дальше" на первом экране */
.signal-share-next {
  --accent-color: #000;
  background: linear-gradient(135deg, #000000, #1a1a1a, #000000) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
}

.signal-share-next:hover:not(:disabled) {
  background: linear-gradient(135deg, #1a1a1a, #000000, #1a1a1a) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-3px);
}

.signal-emotion-next {
  --accent-color: #6f5d9f;
}

.signal-fact-next {
  --accent-color: #3a8862;
}

.signal-solution-next {
  --accent-color: #b88700;
}

.signal-summary-next {
  --accent-color: #8a7000;
}

.signal-location-next {
  --accent-color: #00D9FF;
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
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #ccc;
  cursor: pointer;
}

.signal-agreement input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #6B7280;
  cursor: pointer;
}

/* ПРАВКА 3: Ссылка условий - подчеркнута, белая при ховере, без отступов */
.signal-policy-link {
  color: #999 !important;
  text-decoration: underline !important;
  padding: 0 2px !important;
  transition: color 0.3s ease;
  border-bottom: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.signal-policy-link:hover {
  color: #fff !important;
  text-decoration: underline !important;
  border-bottom: none !important;
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
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.4s ease-out;
  margin-top: 1rem;
}

.signal-submit-button:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.02);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
}

.signal-submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ПРАВКА 1: Центрирование экрана подтверждения */
.signal-success-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem 2rem 2rem;
  animation: fadeIn 0.5s ease-out;
}

.signal-success-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.signal-success-content p {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

/* ПРАВКА 2: Цвет кнопки telegram по гендеру */
.signal-telegram-button {
  display: inline-block;
  background-color: #C5F946;
  color: #000000;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s;
}

.signal-telegram-button.female {
  background-color: #ff69b4 !important;
  color: #fff !important;
}

.signal-telegram-button.male {
  background-color: #87ceeb !important;
  color: #000 !important;
}

.signal-telegram-button:hover {
  filter: brightness(110%);
  transform: scale(1.05);
}

.signal-secondary-link {
  display: block;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #888;
  text-decoration: none;
  border-bottom: none !important;
  transition: color 0.3s;
}

.signal-secondary-link:hover {
  color: #C5F946;
  text-decoration: underline !important;
  border-bottom: none !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .signal-demo-wrapper {
    padding: 0.75rem;
  }
  
  .signal-controls-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .signal-info-button {
    width: 100%;
    text-align: center;
  }
  
  .signal-gender-switch {
    justify-content: center;
    margin-top: 0.75rem;
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
  
  .signal-liquid-next-btn {
    gap: 12px;
  }
  
  .signal-next-icon {
    width: 16px;
    height: 16px;
  }
  
  .signal-rotating-fixed-height {
    min-height: 2.8em;
  }
  
  .signal-question-label {
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .signal-columns {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
