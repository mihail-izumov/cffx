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

    <!-- Блок с кнопкой информации и переключателем пола -->
    <div class="signal-controls-row">
      <button 
        type="button" 
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

    <!-- Информационное модальное окно -->
    <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
      <div class="modal">
        <div class="modal-title">Ваши отзывы меняют всё.</div>
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
        <div class="signal-question-block" style="--accent-color: #6F5D9F;">
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

      <!-- Секция "Детали проблемы" -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #3A8862;">
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

      <!-- Секция "Предложение решения" -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #B88700;">
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

      <!-- Секция "Итого" -->
      <div v-if="selectedSection === 'summary'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A98500;">
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

      <!-- Секция "Выбрать локацию" -->
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
            <option v-for="(cafe, name) in cafes" :key="name" :value="name">{{ name }}</option>
          </select>
          <select 
            v-model="form.selectedBranch" 
            class="signal-select"
            :disabled="!form.selectedNetwork"
          >
            <option disabled value="">Выберите адрес</option>
            <option v-for="(branch, index) in selectedNetworkBranches" :key="index" :value="branch.address">{{ branch.address }}</option>
          </select>
        </div>
      </div>

      <!-- Секция "Останемся на связи?" -->
      <div v-if="selectedSection === 'contact'" class="signal-form-section">
        <div v-if="formSubmitted" class="signal-success-screen">
          <div class="signal-success-content">
            <h3>Все готово!</h3>
            <p>Нажмите на кнопку ниже, чтобы получить результат вашего запроса.</p>
            <a v-if="form.telegramContact" :href="`https://t.me/Anna_Signal?text=Сигнал%20${rawTicketNumber}`" target="_blank" :class="['signal-telegram-button', selectedGender]">Активировать Сигнал в Telegram</a>
            <a v-if="form.telegramContact" href="/signals#знакомьтесь-–-анна" target="_blank" class="signal-secondary-link">Кто Анна и как работает</a>
          </div>
        </div>
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
          <div class="signal-agreement">
            <label>С <a href="/terms" target="_blank">Условиями использования</a> согласен/на</label>
          </div>
        </div>
        <div v-if="!formSubmitted">
          <button class="signal-submit-button" :disabled="submitStatus === 'processing'" @click="submitForm">
            {{ submitStatus === 'processing' ? 'Отправка...' : 'Отправить отзыв в кофейню' }}
          </button>
        </div>
      </div>
      
      <!-- Кнопки управления (Дальше и Обновить) -->
      <div v-if="selectedSection !== 'contact'" class="signal-navigation-container">
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
  agreedToTerms: true,
});

const isMobile = ref(false);
const selectedGender = ref('female');
const showInfoModal = ref(false);
const selectedSection = ref('share');

const humanizeStatus = ref('idle');
const nextStatus = ref('idle');
const submitStatus = ref('idle');
const formSubmitted = ref(false);

const rawTicketNumber = ref(null);
const currentDate = ref('');

const cafes = {
  'Корж': { branches: [ { address: 'Куйбышева, 103' }, { address: 'Революционная, 101В' } /* ... */ ] },
  'MOSAIC': { branches: [ { address: 'Бывшая гостиница "Националь" ' }, { address: 'Волжский просп., 50' } /* ... */ ] },
  'Skuratov': { branches: [ { address: 'Самарская, 190' }, { address: 'Молодогвардейская, 80' } /* ... */ ] },
  'Surf': { branches: [ { address: 'Некрасовская, 57' }, { address: 'Полевая, 54' } /* ... */ ] },
  'Белотурка': { branches: [ { address: 'Куйбышева, 99' }, { address: 'Молодогвардейская, 153' } /* ... */ ] },
  'Кэрри': { branches: [ { address: 'Ново-Садовая ул., 160М' }, { address: 'Московское шоссе, 252' } /* ... */ ] }
};

const selectedNetworkBranches = computed(() => {
  return form.selectedNetwork ? cafes[form.selectedNetwork]?.branches || [] : [];
});

const onKeydown = (e) => {
  if (e.key === 'Escape') showInfoModal.value = false;
};

onMounted(() => {
  const checkMobile = () => { isMobile.value = window.innerWidth <= 768; };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('keydown', onKeydown);
  
  rawTicketNumber.value = String(Date.now()).slice(-6);
  const now = new Date();
  currentDate.value = now.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');
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

const isActive = (id) => id === selectedSection.value;
const getPlaceholderText = () => "Здесь появится Ваш Умный Отзыв ...";

const goToNextSection = async () => {
  const currentIndex = sections.findIndex(s => s.id === selectedSection.value);
  if (selectedSection.value === 'solutions') {
    summarizeAllContent();
  }
  if (currentIndex < sections.length - 1) {
    selectedSection.value = sections[currentIndex + 1].id;
  }
};

const onGenderClick = (gender) => {
  selectedGender.value = gender;
};

const submitForm = async () => {
  submitStatus.value = 'processing';
  // Логика отправки
  setTimeout(() => {
    submitStatus.value = 'idle';
    formSubmitted.value = true;
  }, 1500);
};

// ... Остальная логика (summarizeAllContent, ротация вопросов, система подсказок)
// Эта логика остается без изменений с прошлой версии
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

.signal-demo__header, .signal-controls-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
}

.signal-demo__breadcrumbs {
  display: flex;
  gap: 12px;
}

.signal-breadcrumb {
  background: none;
  border: none;
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

/* --- Цвета индикаторов --- */
.signal-breadcrumb.share.is-active .signal-breadcrumb-circle { background: #6B7280; }
.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle { background: #6F5D9F; }
.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle { background: #3A8862; }
.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle { background: #B88700; }
.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle { background: linear-gradient(135deg, #a98500, #7a5f00); }
.signal-breadcrumb.location.is-active .signal-breadcrumb-circle { background: #00D9FF; }
.signal-breadcrumb.contact.is-active .signal-breadcrumb-circle { background: linear-gradient(90deg, #A972FF, #00C2FF, #FFB800); }

/* ... Стили для кнопок, модальных окон, инпутов ... */

.signal-demo__form-container {
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.signal-question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
  border-left: 4px solid var(--accent-color, #444);
}
.signal-question-block.contact {
  border-left-color: #FFB800 !important;
}

.signal-navigation-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column-reverse; /* Меняем порядок кнопок */
  gap: 0.75rem;
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
  background: linear-gradient(135deg, var(--accent-color), color-mix(in srgb, var(--accent-color) 70%, white));
  box-shadow: 0 4px 15px color-mix(in srgb, var(--accent-color) 30%, transparent);
}
.signal-liquid-next-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--accent-color) 40%, transparent);
}
.signal-liquid-next-text, .signal-next-icon {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}

/* --- Сексуальная кнопка "Дальше" --- */
.signal-share-next {
  background: linear-gradient(135deg, #222, #000);
  box-shadow: inset 0 0 1.5px 1px #333, 0 5px 15px rgba(0,0,0,0.4);
  color: #fff;
  text-shadow: 0 0 5px #fff;
}
.signal-share-next:hover:not(:disabled) {
  box-shadow: inset 0 0 1.5px 1px #444, 0 8px 25px rgba(0,0,0,0.5);
}

.signal-summary-next {
  --accent-color: #a98500;
  background: linear-gradient(135deg, #a98500, #7a5f00);
}

/* Кнопка "Обновить" */
.signal-humanize-button-container {
  width: 100%;
}
.signal-liquid-humanize-btn {
  /* ... */
}

/* Экран успеха */
.signal-success-screen {
  text-align: center;
  padding: 2rem 1rem;
}
.signal-success-content h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
.signal-success-content p { color: #b0b0b0; line-height: 1.6; margin-bottom: 1.5rem; }
.signal-telegram-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  transition: all 0.3s;
}
.signal-telegram-button.female { background-color: #ff69b4; }
.signal-telegram-button.male { background-color: #87ceeb; }
.signal-telegram-button:hover {
  filter: brightness(1.1);
  transform: scale(1.05);
}
.signal-secondary-link {
  display: block;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #888;
  text-decoration: none;
}
.signal-secondary-link:hover { color: #C5F946; text-decoration: underline; }

/* Соглашение */
.signal-agreement label {
  color: #ccc;
}
.signal-agreement a {
  color: #999;
  text-decoration: underline;
  transition: color 0.3s ease;
}
.signal-agreement a:hover {
  color: #fff;
}

/* --- Медиа-запросы --- */
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
