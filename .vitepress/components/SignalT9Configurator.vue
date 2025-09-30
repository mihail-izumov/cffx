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
      <!-- Секции 1-4: Поделитесь, Эмоции, Факты, Решение -->
      <div v-if="['share', 'emotions', 'facts', 'solutions'].includes(selectedSection)" class="signal-form-section">
        <div class="signal-question-block" :style="`--accent-color: ${sectionAccentColor}`">
          <!-- ... код для секций 1-4 ... -->
        </div>
      </div>

      <!-- Секция 5: Итого (Умный отзыв) -->
      <div v-if="selectedSection === 'summary'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A98500;">
          <p class="signal-direction-label">Умный отзыв</p>
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">От эмоций до конструктивных предложений</p>
          </div>
          <textarea v-model="form.summaryText" :rows="isMobile ? 10 : 8" :placeholder="getPlaceholderText()"></textarea>
          <p class="signal-example-hint signal-example-hint-white">Конструктивный отзыв = сумма Ваших эмоций, фактов и решений.</p>
        </div>
      </div>

      <!-- Секция 6: Выбрать локацию -->
      <div v-if="selectedSection === 'location'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #00D9FF;">
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
            <option v-for="(branch, index) in selectedNetworkBranches" :key="index" :value="branch.address">{{ branch.address }}</option>
          </select>
        </div>
      </div>

      <!-- Секция 7: Контактная информация -->
      <div v-if="selectedSection === 'contact'" class="signal-form-section">
        <div v-if="formSubmitted" class="signal-success-screen">
          <div class="signal-success-content">
            <h3>Все готово!</h3>
            <p>Нажмите на кнопку ниже, чтобы получить результат вашего запроса.</p>
            <a v-if="form.telegramContact" :href="`https://t.me/Anna_Signal?text=Сигнал%20${rawTicketNumber}`" target="_blank" :class="['signal-telegram-button', selectedGender === 'female' ? 'female' : 'male']">Активировать Сигнал в Telegram</a>
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
          <label class="signal-agreement">С <a href="/terms" target="_blank">Условиями использования</a> согласен/на</label>
        </div>
        <div v-if="!formSubmitted">
          <button class="signal-submit-button" :disabled="submitStatus === 'processing'" @click="submitForm">
            {{ submitStatus === 'processing' ? 'Отправка...' : 'Отправить отзыв в кофейню' }}
          </button>
        </div>
      </div>

      <!-- Кнопки управления -->
      <div v-if="selectedSection !== 'contact'" class="signal-navigation-container">
        <button class="signal-liquid-next-btn" :class="nextButtonClass" @click="goToNextSection()" :disabled="nextStatus === 'processing'">
          <span class="signal-liquid-next-text">Дальше</span>
          <svg class="signal-next-icon" width="20" height="20" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div v-if="selectedSection === 'summary'" class="signal-humanize-button-container">
          <button class="signal-liquid-humanize-btn" @click="summarizeAllContent()" :disabled="humanizeStatus === 'processing'">
            <span class="signal-liquid-humanize-text">{{ humanizeButtonText }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ... (вся логика из предыдущих версий)
import { reactive, ref, onUnmounted, computed, onMounted } from 'vue';

// ... (State, Data, Methods, Computed Properties, Lifecycle Hooks)
// Form state
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

// UI State
const isMobile = ref(false);
const selectedGender = ref('female');
const showInfoModal = ref(false);
const selectedSection = ref('share');
const humanizeStatus = ref('idle');
const nextStatus = ref('idle');
const submitStatus = ref('idle');
const formSubmitted = ref(false);

// Data
const rawTicketNumber = ref(null);
const cafes = { /* ... */ };

// Computed properties
const selectedNetworkBranches = computed(() => { /* ... */ });
const sectionAccentColor = computed(() => { /* ... */ });
const nextButtonClass = computed(() => { /* ... */ });
const humanizeButtonText = computed(() => { /* ... */ });

// Methods
const onGenderClick = (gender) => { /* ... */ };
const goToNextSection = () => { /* ... */ };
const summarizeAllContent = () => { /* ... */ };
const submitForm = async () => { /* ... */ };
// ... (и другие методы)

// Lifecycle hooks
onMounted(() => { /* ... */ });
onUnmounted(() => { /* ... */ });

</script>

<style scoped>
/* Общие стили */
:root { /* ... */ }
.signal-demo-wrapper { /* ... */ }

/* Хлебные крошки и их состояния */
.signal-demo__header { /* ... */ }
.signal-demo__breadcrumbs { /* ... */ }
.signal-breadcrumb-circle { /* ... */ }
.signal-breadcrumb.share.is-active .signal-breadcrumb-circle { background: #6B7280; }
.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle { background: #6F5D9F; } /* Приглушенный */
.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle { background: #3A8862; } /* Приглушенный */
.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle { background: #B88700; } /* Уникальный оранжевый */
.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle { background: linear-gradient(135deg, #a98500, #7a5f00); } /* Матовый золотой */
.signal-breadcrumb.location.is-active .signal-breadcrumb-circle { background: #00D9FF; }
.signal-breadcrumb.contact.is-active .signal-breadcrumb-circle { background: linear-gradient(90deg, #A972FF, #00C2FF, #FFB800); } /* Градиент кнопки */

/* Блок с информацией и гендером */
.signal-controls-row { /* ... */ }
.signal-info-button { /* ... */ }
.signal-gender-switch { /* ... */ }

/* Стили формы */
.signal-demo__form-container { /* ... */ }
.signal-question-block { /* ... */ }
.signal-question-block.contact { border-left-color: #FFB800 !important; }

/* Кнопка "Дальше" */
.signal-navigation-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Расстояние между кнопками */
}
.signal-liquid-next-btn { /* ... */ }
.signal-share-next {
  background: linear-gradient(135deg, #000000, #222222);
  box-shadow: 0 4px 15px rgba(34, 34, 34, 0.4);
  color: #fff;
}
.signal-share-next:hover {
  box-shadow: 0 6px 20px rgba(68, 68, 68, 0.5);
}

/* Кнопка "Обновить" */
.signal-humanize-button-container {
  order: 2; /* Располагаем под кнопкой "Дальше" */
}

/* Экран подтверждения */
.signal-success-screen {
  text-align: center;
}
.signal-telegram-button {
  /* ... */
}
.signal-telegram-button.female { background-color: #ff69b4; }
.signal-telegram-button.male { background-color: #87ceeb; }

/* Соглашение */
.signal-agreement { /* ... */ }
.signal-agreement a {
  text-decoration: underline !important;
  color: #999 !important;
  padding: 0 2px;
}
.signal-agreement a:hover {
  color: #fff !important;
}

/* Медиа-запросы */
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
  
  .signal-suggestions-container {
    gap: 0.4rem;
  }
  
  .signal-suggestion-bubble {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
  }
}

/* Дополнительные стили для telegram кнопки по гендеру */
.signal-telegram-female {
  background-color: #ff69b4 !important;
}

.signal-telegram-male {
  background-color: #87ceeb !important;
}

.signal-telegram-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  transition: all 0.3s;
}

.signal-telegram-button:hover {
  filter: brightness(110%);
  transform: scale(1.05);
}

/* Центрирование экрана успеха */
.signal-success-screen {
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

/* Ссылка с условиями использования */
.signal-agreement label {
  padding: 0;
  margin: 0;
}

.signal-agreement a {
  text-decoration: underline !important;
  padding: 0 2px !important;
  color: #999 !important;
  transition: color 0.3s ease;
  border-bottom: none !important;
}

.signal-agreement a:hover {
  color: #fff !important;
}

/* Последний переключатель - градиент кнопки */
.signal-breadcrumb.contact.is-active .signal-breadcrumb-circle {
  background: linear-gradient(90deg, #A972FF 0%, #00C2FF 50%, #FFB800 100%);
  box-shadow: 0 0 10px rgba(255, 184, 0, 0.5);
}

/* Кнопка "Дальше" на первом экране - темная, сексуальная */
.signal-share-next {
  --accent-color: #111;
}

.signal-liquid-next-btn.signal-share-next {
  background: linear-gradient(135deg, #000000, #222222);
  box-shadow: 0 4px 15px rgba(34, 34, 34, 0.6);
  color: #fff;
}

.signal-liquid-next-btn.signal-share-next:hover:not(:disabled) {
  background: linear-gradient(135deg, #222222, #000000);
  box-shadow: 0 6px 20px rgba(68, 68, 68, 0.7);
  transform: translateY(-2px);
}

.signal-liquid-next-btn.signal-share-next .signal-liquid-next-text,
.signal-liquid-next-btn.signal-share-next .signal-next-icon {
  color: #fff;
}

/* Приглушенные премиальные цвета для экранов 2-5 */
.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle {
  background: #6f5d9f;
}

.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle {
  background: #3a8862;
}

.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle {
  background: #b88700;
}

.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle {
  background: linear-gradient(135deg, #a98500, #7a5f00);
  box-shadow: 0 0 10px rgba(122, 95, 0, 0.5);
}

/* Кнопка "Обновить" строго под кнопкой "Дальше" */
.signal-humanize-button-container {
  margin-top: 0.5rem;
  margin-bottom: 0;
}

/* Полоса слева на последнем экране - цвет кнопки отправки */
.signal-question-block.contact {
  border-left-color: #FFB800 !important;
  border-left-width: 4px;
}

/* Анимация появления */
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

/* Стили для кнопок управления навигацией */
.signal-navigation-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
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

/* Специфичные цвета для каждой секции */
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
  --accent-color: #a98500;
}

.signal-location-next {
  --accent-color: #00D9FF;
}

/* Кнопка отправки */
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

/* Вторичная ссылка */
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

/* Кнопка "Обновить" */
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

/* Колонки формы */
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

.signal-input {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--signal-font-sans);
  margin-bottom: 0.25rem;
}

.signal-input:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
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
  margin-top: 1rem;
}

.signal-agreement input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #6B7280;
  cursor: pointer;
}

/* Select элементы */
.signal-select {
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

.signal-select:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

.signal-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
