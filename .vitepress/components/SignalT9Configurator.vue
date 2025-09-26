<template>
  <div class="signal-demo-wrapper">
    <!-- Хлебные крошки -->
    <div class="signal-demo__header">
      <div class="signal-demo__breadcrumbs" role="tablist" aria-label="Секции формы">
        <button
          v-for="section in sections"
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

    <!-- Кнопка инфо + гендер -->
    <div class="signal-controls-row">
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

    <!-- Модалка -->
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

    <!-- Форма -->
    <div class="signal-demo__form-container">
      <!-- Поделитесь -->
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
            placeholder="Поделитесь своим впечатлением..." 
            required>
          </textarea>
          <p class="signal-example-hint">Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»</p>
        </div>
      </div>

      <!-- Эмоции -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
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
        </div>
      </div>

      <!-- Факты -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #3DDC84;">
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
        </div>
      </div>

      <!-- Решения -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FFB800;">
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
        </div>
      </div>

      <!-- Итого -->
      <div v-if="selectedSection === 'summary'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FF6B6B;">
          <p class="signal-direction-label">План умного отзыва</p>
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">От эмоций до конструктивных предложений</p>
          </div>

          <textarea 
            v-model="form.summaryText" 
            :rows="isMobile ? 10 : 8"
            :placeholder="getPlaceholderText()"
          ></textarea>

          <div class="signal-hint-separator">
            <hr class="signal-hint-line">
            <p class="signal-hint-text">Сейчас ваш отзыв выглядит как спам из-за работы алгоритмов, но вы можете сделать текст более личным, используя план отзыва и подсказки.</p>
          </div>
          <p class="signal-example-hint signal-example-hint-white">Конструктивный отзыв = сумма Ваших эмоций, фактов и решений.</p>
        </div>

        <div class="signal-humanize-button-container">
          <button 
            class="signal-liquid-humanize-btn"
            @click="hasAnyForSummary ? summarizeAllContent() : null"
            :disabled="humanizeStatus === 'processing' || !hasAnyForSummary"
          >
            <span class="signal-liquid-humanize-text">
              {{ 
                !hasAnyForSummary ? 'Заполните вкладки' :
                humanizeStatus === 'completed' ? 'Готово' : 
                humanizeStatus === 'processing' ? 'Обновление...' : 
                'Обновить'
              }}
            </span>
          </button>
        </div>

        <div class="signal-copy-button-container">
          <button 
            class="signal-liquid-copy-btn signal-main-copy signal-summary-copy"
            :class="{ 'signal-copy-disabled': !form.summaryText.trim() }"
            @click="form.summaryText.trim() ? copyCurrentSectionText() : null"
            :disabled="copyStatus.main === 'copying' || !form.summaryText.trim()"
          >
            <svg class="signal-copy-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
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

      <!-- Дальше -->
      <div v-if="selectedSection !== 'summary'" class="signal-next-button-container">
        <button 
          class="signal-liquid-next-btn"
          :class="[
            selectedSection === 'share' ? 'signal-share-next' : '',
            selectedSection === 'emotions' ? 'signal-emotion-next' : '',
            selectedSection === 'facts' ? 'signal-fact-next' : '',
            selectedSection === 'solutions' ? 'signal-solution-next' : '',
            !hasCurrentSectionText ? 'signal-next-disabled' : '',
            selectedSection === 'share' && hasCurrentSectionText ? 'signal-share-active' : ''
          ]"
          @click="hasCurrentSectionText ? goToNextSection() : null"
          :disabled="nextStatus === 'processing' || !hasCurrentSectionText"
        >
          <span class="signal-liquid-next-text">Дальше</span>
          <svg class="signal-next-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue';

const form = reactive({ 
  shareExperience: '',
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  summaryText: ''
});

const isMobile = ref(false);
const selectedGender = ref('female');
const humanizeStatus = ref('idle');
const nextStatus = ref('idle');
const showInfoModal = ref(false);

onMounted(() => {
  const checkMobile = () => { isMobile.value = window.innerWidth <= 768; };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') showInfoModal.value = false; });
  updateSuggestionsForGender();
});
onUnmounted(() => { window.removeEventListener('resize', () => {}); });

const copyStatus = reactive({ main: 'idle' });

const sections = [
  { id: 'share', title: 'Поделитесь' },
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' },
  { id: 'summary', title: 'Итого' }
];
const selectedSection = ref('share');
const isActive = id => id === selectedSection.value;

const hasCurrentSectionText = computed(() => {
  if (selectedSection.value === 'share') return form.shareExperience.trim();
  if (selectedSection.value === 'emotions') return form.emotionalRelease.trim();
  if (selectedSection.value === 'facts') return form.factualAnalysis.trim();
  if (selectedSection.value === 'solutions') return form.constructiveSuggestions.trim();
  return false;
});

const hasAnyForSummary = computed(() =>
  form.shareExperience.trim() ||
  form.emotionalRelease.trim() ||
  form.factualAnalysis.trim() ||
  form.constructiveSuggestions.trim()
);

const getPlaceholderText = () => "Здесь появится план вашего отзыва...";

const goToNextSection = () => {
  const idx = sections.findIndex(s => s.id === selectedSection.value);
  if (selectedSection.value === 'solutions') {
    nextStatus.value = 'processing';
    summarizeAllContent();
    nextStatus.value = 'idle';
  }
  if (idx < sections.length - 1) selectedSection.value = sections[idx + 1].id;
};

/* ===================== Гендерная коррекция (обновлено) ===================== */
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
/* ========================================================================== */

/* ===== Вспомогательные ===== */
function removeDuplicates(text) {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 2);
  const seen = new Set();
  const uniq = [];
  for (const s of sentences) {
    const key = s.toLowerCase();
    if (!seen.has(key)) { seen.add(key); uniq.push(s); }
  }
  return uniq.join('. ') + (uniq.length ? '.' : '');
}

/* ===== Сбор итогового текста (меняли только гендер и разделитель) ===== */
function structureAndCleanText(shareText, emotionalText, factualText, solutionsText, gender) {
  let result = '';

  // Мой отзыв сейчас — применяем гендер прямо к тексту пользователя
  if (shareText.trim()) {
    let s = applyGenderCorrection(shareText.trim(), gender);
    if (!/[.!?]$/.test(s)) s += '.';
    result += `МОЙ ОТЗЫВ СЕЙЧАС: ${s[0]?.toUpperCase() ?? ''}${s.slice(1)}`;
  } else {
    result += `МОЙ ОТЗЫВ СЕЙЧАС: (можно дополнить)`;
  }

  // Разделитель и заголовок (замена '--- ... ---' на просто заголовок)
  result += `\n\nМожно улучшить:\n`;

  // ВПЕЧАТЛЕНИЯ
  result += '\n';
  if (emotionalText.trim()) {
    const src = applyGenderCorrection(emotionalText.trim(), gender);
    const parts = src.split(/[.!]/).map(s => s.trim()).filter(Boolean);
    const pos = [], neu = [], neg = [];
    for (const sentence of parts) {
      const lower = sentence.toLowerCase();
      if (lower.includes('доволь') || lower.includes('восхищ') || lower.includes('благодар')) {
        const w = sentence.split(' ');
        pos.push(w.length > 3 ? `${w.slice(0,3).join(' ')} – ${w.slice(3).join(' ')}` : sentence);
      } else if (lower.includes('удивл')) {
        neu.push(sentence);
      } else {
        const w = sentence.split(' ');
        neg.push(w.length > 3 ? `${w.slice(0,3).join(' ')} – ${w.slice(3).join(' ')}` : sentence);
      }
    }
    let emotionText = '';
    if (pos.length) emotionText += pos.join('. ') + '. ';
    if (neu.length) emotionText += neu.join('. ') + '. ';
    if (neg.length) emotionText += neg.join('. ') + '.';
    emotionText = removeDuplicates(emotionText);
    result += `ВПЕЧАТЛЕНИЯ\n${emotionText}`;
  } else {
    result += `ВПЕЧАТЛЕНИЯ\n(можно дополнить)`;
  }

  // ПРОБЛЕМЫ
  result += '\n\n';
  if (factualText.trim()) {
    const facts = factualText.trim();
    const sentences = facts.split(/[.!]/).map(s => s.trim()).filter(Boolean);
    const groups = {};
    for (const s of sentences) {
      let cat = '';
      const low = s.toLowerCase();
      if (low.includes('ожидан') || low.includes('ждал')) cat = 'Ожидание';
      else if (low.includes('заказ') || low.includes('доложи')) cat = 'Ошибка в заказе';
      else if (low.includes('качество') || low.includes('кофе') || low.includes('еда')) cat = 'Качество блюд';
      else if (low.includes('чист') || low.includes('посуда')) cat = 'Чистота';
      else if (low.includes('персонал') || low.includes('сотрудн')) cat = 'Персонал';
      else cat = s.split(' ').slice(0,2).join(' ');
      (groups[cat] ??= []).push(s);
    }
    let out = '';
    for (const cat of Object.keys(groups)) {
      const uniq = [...new Set(groups[cat])];
      out += `${cat}: ${uniq.join(', ')}. `;
    }
    out = removeDuplicates(out);
    result += `ПРОБЛЕМЫ\n${out}`;
  } else {
    result += `ПРОБЛЕМЫ\n(можно дополнить)`;
  }

  // ПРЕДЛОЖЕНИЯ
  result += '\n\n';
  if (solutionsText.trim()) {
    const sols = solutionsText.trim();
    const sentences = sols.split(/[.!]/).map(s => s.trim()).filter(Boolean);
    const groups = {};
    for (const s of sentences) {
      const low = s.toLowerCase();
      let cat = '';
      if (low.includes('таймер') || low.includes('контроль времени')) cat = 'Таймер ожидания';
      else if (low.includes('обучение')) cat = 'Обучение персонала';
      else if (low.includes('контроль качества')) cat = 'Контроль качества';
      else if (low.includes('проверк')) cat = 'Система проверки';
      else if (low.includes('стандарт')) cat = 'Стандарты сервиса';
      else cat = s.split(' ').slice(0,2).join(' ');
      (groups[cat] ??= []).push(s);
    }
    let out = '';
    for (const cat of Object.keys(groups)) {
      const uniq = [...new Set(groups[cat])];
      out += `${cat}: ${uniq.join(', ')}. `;
    }
    out = removeDuplicates(out);
    result += `ПРЕДЛОЖЕНИЯ\n${out}`;
  } else {
    result += `ПРЕДЛОЖЕНИЯ\n(можно дополнить)`;
  }

  return result;
}

/* ===== Обновить/суммировать (оставлено, но с гендерным проходом) ===== */
function summarizeAllContent() {
  humanizeStatus.value = 'processing';
  try {
    let txt = structureAndCleanText(
      form.shareExperience,
      form.emotionalRelease,
      form.factualAnalysis,
      form.constructiveSuggestions,
      selectedGender.value
    );
    // Принудительная коррекция ещё раз ко всему тексту
    txt = applyGenderCorrection(txt, selectedGender.value);
    form.summaryText = txt;
    humanizeStatus.value = 'completed';
    setTimeout(() => { humanizeStatus.value = 'idle'; }, 800);
  } catch (e) {
    console.error('summarize error', e);
    humanizeStatus.value = 'idle';
  }
}

/* ===== Применение пола по клику (пересчёт итога) ===== */
function onGenderClick(gender) {
  selectedGender.value = gender;
  updateSuggestionsForGender();
  if (selectedSection.value === 'summary' && hasAnyForSummary.value) {
    summarizeAllContent(); // пересобираем весь итог с учётом пола, включая "МОЙ ОТЗЫВ СЕЙЧАС"
  } else if (selectedSection.value === 'summary' && form.summaryText.trim()) {
    form.summaryText = applyGenderCorrection(form.summaryText, selectedGender.value);
  }
}

/* ===== Подсказки (ваши списки остаются как есть) ===== */
const baseSuggestions = {
  emotions: {
    initial: ['расстроена', 'разочарована', 'недовольна', 'возмущена', 'удивлена', 'довольна', 'восхищена', 'благодарна'],
    'расстроена': ['долго ждала', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
    'довольна': ['качеством кофе', 'скоростью обслуживания', 'вежливостью персонала', 'атмосферой заведения', 'чистотой помещения']
  },
  facts: { initial: ['ожидание', 'ошибка в заказе', 'качество блюд', 'чистота', 'персонал'] },
  solutions: { initial: ['таймер ожидания', 'обучение персонала', 'контроль качества', 'система проверки', 'стандарты сервиса'] }
};

const currentSuggestions = reactive({
  emotions: [...baseSuggestions.emotions.initial],
  facts: [...(baseSuggestions.facts.initial || [])],
  solutions: [...(baseSuggestions.solutions.initial || [])]
});
const selectedFirstLevelSuggestions = reactive({ emotions: [], facts: [], solutions: [] });

function updateSuggestionsForGender() {
  if (selectedGender.value === 'male') {
    const male = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'];
    currentSuggestions.emotions = male.filter(item => !selectedFirstLevelSuggestions.emotions.includes(item));
  } else {
    currentSuggestions.emotions = baseSuggestions.emotions.initial.filter(item => !selectedFirstLevelSuggestions.emotions.includes(item));
  }
}
function isInitialSuggestions(type) {
  const initial = type === 'emotions' && selectedGender.value === 'male'
    ? ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен']
    : baseSuggestions[type].initial || [];
  return JSON.stringify(currentSuggestions[type]) === JSON.stringify(initial.filter(i => !selectedFirstLevelSuggestions[type].includes(i)));
}
function resetSuggestions(type) {
  selectedFirstLevelSuggestions[type] = [];
  updateSuggestionsForGender();
}
function selectSuggestion(field, suggestion, type) {
  const cur = form[field].trim();
  const newBranch = isInitialSuggestions(type);
  if (cur) {
    form[field] = newBranch ? cur + '. ' + capitalize(suggestion) : cur + ' ' + suggestion;
  } else {
    form[field] = capitalize(suggestion);
  }
  if ((baseSuggestions[type].initial || []).includes(suggestion)) {
    if (!selectedFirstLevelSuggestions[type].includes(suggestion)) selectedFirstLevelSuggestions[type].push(suggestion);
  }
  const next = baseSuggestions[type][suggestion];
  if (next?.length) currentSuggestions[type] = [...next];
  else updateSuggestionsForGender();
}
const capitalize = s => s ? s[0].toUpperCase() + s.slice(1) : s;

/* ===== Ротаторы ===== */
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
function startRotation(num) {
  clearInterval(rotationInterval);
  rotationInterval = setInterval(() => {
    if (num === 'share') {
      const i = phrasesForShare.indexOf(currentQuestionShare.value);
      currentQuestionShare.value = phrasesForShare[(i + 1) % phrasesForShare.length];
    } else if (num === 1) {
      const i = phrasesForQuestion1.indexOf(currentQuestion1.value);
      currentQuestion1.value = phrasesForQuestion1[(i + 1) % phrasesForQuestion1.length];
    } else if (num === 2) {
      const i = phrasesForQuestion2.indexOf(currentQuestion2.value);
      currentQuestion2.value = phrasesForQuestion2[(i + 1) % phrasesForQuestion2.length];
    } else if (num === 3) {
      const i = phrasesForQuestion3.indexOf(currentQuestion3.value);
      currentQuestion3.value = phrasesForQuestion3[(i + 1) % phrasesForQuestion3.length];
    }
  }, 3000);
}
</script>

<style scoped>
:root { --signal-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

.signal-demo-wrapper { font-family: var(--signal-font-sans); width: 100%; max-width: none; margin: 0; }
.signal-demo__header { display: flex; justify-content: center; margin-bottom: 24px; }

/* Хлебные крошки */
.signal-demo__breadcrumbs { display: flex; gap: 12px; align-items: center; }
.signal-breadcrumb { appearance: none; border: none; background: transparent; cursor: pointer; padding: 0; display: flex; align-items: center; transition: all 0.3s ease; }
.signal-breadcrumb-circle { width: 12px; height: 12px; border-radius: 50%; background: #444; transition: all 0.3s ease; }
.signal-breadcrumb.is-active .signal-breadcrumb-circle { width: 24px; height: 8px; border-radius: 4px; }
.signal-breadcrumb.share.is-active .signal-breadcrumb-circle { background: #6B7280; }
.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle { background: #A972FF; }
.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle { background: #3DDC84; }
.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle { background: #FFB800; }
.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle { background: #FF6B6B; }

/* Инфо + гендер */
.signal-controls-row { display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 20px; }
.signal-info-button { background: rgba(135, 206, 235, 0.1); border: 1px solid rgba(135, 206, 235, 0.3); color: #87ceeb; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; white-space: nowrap; height: 32px; display: flex; align-items: center; }
.signal-info-button.signal-info-female { background: rgba(255, 105, 180, 0.1); border-color: rgba(255, 105, 180, 0.3); color: #ff69b4; }
.signal-info-button.signal-info-male { background: rgba(135, 206, 235, 0.1); border-color: rgba(135, 206, 235, 0.3); color: #87ceeb; }

.signal-gender-switch { display: flex; justify-content: center; }
.signal-gender-container { display: flex; background: #2a2a2e; border-radius: 20px; padding: 4px; border: 1px solid #444; height: 32px; align-items: center; }
.signal-gender-btn { width: 24px; height: 24px; border-radius: 50%; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent; margin: 0 2px; }
.signal-gender-female { background: rgba(255, 105, 180, 0.3); }
.signal-gender-female.is-active { background: #ff69b4; box-shadow: 0 0 12px rgba(255, 105, 180, 0.5); }
.signal-gender-male { background: rgba(135, 206, 235, 0.3); }
.signal-gender-male.is-active { background: #87ceeb; box-shadow: 0 0 12px rgba(135, 206, 235, 0.5); }

/* Модалка */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #111; color: #fff; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; width: min(520px,96vw); box-shadow: 0 20px 60px rgba(0,0,0,0.4); padding: 32px; }
.modal-header { display: flex; align-items: center; gap: 12px; }
.modal-title { font-weight: 700; font-size: 16px; }
.modal-body { margin-top: 16px; font-size: 14px; line-height: 1.5; }
.modal-footer { margin-top: 24px; display: flex; justify-content: flex-end; }
.modal-ok { background: #222; border: 1px solid rgba(255,255,255,0.12); color: #fff; border-radius: 8px; padding: 10px 16px; cursor: pointer; font-weight: 500; }
.modal-ok:hover { background: #333; }

/* Контейнер */
.signal-demo__form-container { background-color: #1E1E20; border-radius: 24px; padding: 2rem; color: #f0f0f0; border: 1px solid #2c2c2f; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.signal-form-section { display: flex; flex-direction: column; gap: 1.5rem; }
.signal-question-block { background-color: #2a2a2e; border-radius: 16px; padding: 1.25rem; border: 1px solid #3a3a3e; border-left: 4px solid var(--accent-color,#444); }

.signal-direction-label { font-weight: 600; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: .05em; margin-bottom: .5rem; display: block; }

/* Ротатор */
.signal-rotating-phrase-container { min-height: 1.3em; margin-bottom: .6rem; display: flex; align-items: flex-start; overflow: hidden; }
.signal-rotating-fixed-height { min-height: 2.6em; }
.signal-question-label { font-weight: 500; font-size: 1rem; margin: 0; color: #f0f0f0; line-height: 1.3; width: 100%; }
.fade-enter-active,.fade-leave-active { transition: opacity .5s ease; } .fade-enter-from,.fade-leave-to { opacity: 0; }

/* Поля */
textarea { width: 100%; background-color: #242426; border: 1px solid #444; border-radius: 10px; padding: .75rem 1rem; font-size: .95rem; color: #f0f0f0; transition: all .3s ease; font-family: var(--signal-font-sans); resize: vertical; }
textarea:focus { outline: none; border-color: var(--accent-color); background-color: #2a2a2e; box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent); }
::placeholder { color: #666; }

/* Подсказки */
.signal-suggestions-container { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem; margin-bottom: .5rem; }
.signal-suggestion-bubble { padding: .35rem .85rem; border-radius: 20px; font-size: .8rem; font-weight: 500; cursor: pointer; transition: all .2s ease; border: 1px solid transparent; user-select: none; }
.signal-emotion-bubble { background: rgba(169,114,255,.1); border-color: rgba(169,114,255,.3); color: #A972FF; }
.signal-fact-bubble { background: rgba(61,220,132,.1); border-color: rgba(61,220,132,.3); color: #3DDC84; }
.signal-solution-bubble { background: rgba(255,184,0,.1); border-color: rgba(255,184,0,.3); color: #FFB800; }
.signal-reset-bubble { font-weight: 600; opacity: .8; font-size: .75rem; border-style: dashed !important; }

/* Хинты */
.signal-example-hint { font-size: .8rem; color: #777; margin: .5rem 0 0 .25rem; line-height: 1.15; }
.signal-example-hint-white { color: #f0f0f0 !important; margin: .5rem 0 0 0 !important; }

.signal-hint-separator { margin: 1rem 0; }
.signal-hint-line { border: none; height: 1px; background: rgba(255,255,255,.2); margin-bottom: .75rem; }
.signal-hint-text { font-size: .8rem; color: rgba(255,255,255,.6); line-height: 1.4; margin: 0; font-style: italic; }

/* Кнопки итога */
.signal-humanize-button-container { margin-top: .75rem; margin-bottom: .25rem; }
.signal-liquid-humanize-btn { position: relative; width: 100%; height: 56px; border-radius: 18px; border: 2px solid #444; background: #2a2a2e; color: #888; cursor: pointer; overflow: hidden; transition: all .3s ease; display: flex; align-items: center; justify-content: center; gap: 12px; white-space: nowrap; }
.signal-liquid-humanize-btn:disabled { opacity: .5; cursor: not-allowed; }
.signal-liquid-humanize-text { font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }

.signal-copy-button-container { margin-top: .25rem; }
.signal-liquid-copy-btn.signal-main-copy { position: relative; width: 100%; height: 56px; border-radius: 20px; border: none; cursor: pointer; overflow: hidden; transition: all .4s cubic-bezier(.2,.8,.2,1); display: flex; align-items: center; justify-content: center; gap: 12px; white-space: nowrap; }
.signal-liquid-copy-btn.signal-main-copy::before { content: ''; position: absolute; inset: 0; border-radius: 20px; padding: 2px; background: linear-gradient(135deg, var(--accent-color), rgba(255,255,255,.2)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; z-index: 1; }
.signal-liquid-copy-btn.signal-main-copy::after { content: ''; position: absolute; inset: 2px; border-radius: 18px; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.12) 0%, transparent 70%), #2a2a2e; z-index: 2; }
.signal-copy-icon { position: relative; z-index: 3; }
.signal-liquid-copy-text { position: relative; z-index: 3; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
.signal-copy-disabled { --accent-color: #666; opacity: .5; cursor: not-allowed !important; }
.signal-summary-copy:not(.signal-copy-disabled) { --accent-color: #FF6B6B; }
.signal-summary-copy:not(.signal-copy-disabled) .signal-copy-icon, 
.signal-summary-copy:not(.signal-copy-disabled) .signal-liquid-copy-text { color: #FF6B6B; }

/* Дальше */
.signal-next-button-container { margin-top: 1rem; }
.signal-liquid-next-btn { position: relative; width: 100%; height: 56px; border-radius: 20px; border: none; cursor: pointer; overflow: hidden; transition: all .4s cubic-bezier(.2,.8,.2,1); display: flex; align-items: center; justify-content: center; gap: 16px; white-space: nowrap; }
.signal-liquid-next-btn::before { content: ''; position: absolute; inset: 0; border-radius: 20px; padding: 2px; background: linear-gradient(135deg, var(--accent-color), rgba(255,255,255,.2)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; z-index: 1; }
.signal-liquid-next-btn::after { content: ''; position: absolute; inset: 2px; border-radius: 18px; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.12) 0%, transparent 70%), #2a2a2e; z-index: 2; }
.signal-next-icon { position: relative; z-index: 3; }
.signal-liquid-next-text { position: relative; z-index: 3; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }

.signal-share-next:not(.signal-next-disabled) { --accent-color: #6B7280; }
.signal-emotion-next:not(.signal-next-disabled) { --accent-color: #A972FF; }
.signal-fact-next:not(.signal-next-disabled) { --accent-color: #3DDC84; }
.signal-solution-next:not(.signal-next-disabled) { --accent-color: #FFB800; }
.signal-next-disabled { --accent-color: #666; opacity: .5; cursor: not-allowed !important; }

@media (max-width: 768px) {
  .signal-controls-row { flex-direction: column; gap: 12px; }
  .signal-demo__form-container { padding: 1.5rem; }
  .signal-breadcrumb-circle { width: 10px; height: 10px; }
  .signal-breadcrumb.is-active .signal-breadcrumb-circle { width: 20px; height: 6px; border-radius: 3px; }
  .signal-liquid-next-btn { gap: 12px; }
  .signal-next-icon { width: 16px; height: 16px; }
  .signal-rotating-fixed-height { min-height: 2.8em; }
  .signal-question-label { font-size: .95rem; line-height: 1.4; }
}
</style>
