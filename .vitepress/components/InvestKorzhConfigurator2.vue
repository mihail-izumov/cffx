<template>
  <div class="signal-demo-wrapper">

    <!-- Переключатель секций (Хедер) -->
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

    <div class="signal-demo__form-container">

      <!-- Секция 1: Эмоции -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1" class="signal-question-label">
                {{ currentQuestion1 }}
              </p>
            </transition>
          </div>

          <textarea 
            v-model="form.emotionalRelease" 
            @focus="stopRotation"
            @blur="startRotation(1)"
            :rows="isMobile ? 5 : 3"
            placeholder="Опишите ваши впечатления..."
          ></textarea>
        </div>
      </div>

      <!-- Секция 2: Факты -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion2" class="signal-question-label">
                {{ currentQuestion2 }}
              </p>
            </transition>
          </div>
          <textarea 
            v-model="form.factualAnalysis" 
            @focus="stopRotation" 
            @blur="startRotation(2)"
            :rows="isMobile ? 5 : 3"
            :placeholder="isMobile 
              ? 'Что и когда произошло...' 
              : 'Несколько фактов: что и когда произошло...'"
          ></textarea>
        </div>
      </div>

      <!-- Секция 3: Решение -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion3" class="signal-question-label">
                {{ currentQuestion3 }}
              </p>
            </transition>
          </div>
          <textarea 
            v-model="form.constructiveSuggestions" 
            @focus="stopRotation" 
            @blur="startRotation(3)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Ваш совет или предложение..."
          ></textarea>
        </div>
      </div>

      <!-- Секция 4: Итого (Резюме) -->
      <div v-if="selectedSection === 'summary'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
          <p class="signal-direction-label">Ваш Сигнал</p>
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">Что должно измениться?</p>
          </div>
          <textarea 
            v-model="form.summaryText" 
            :rows="isMobile ? 8 : 6"
            placeholder="Главный вывод..."
          ></textarea>
          <p class="signal-example-hint signal-example-hint-white">Команда к действию и видимый результат для вас</p>
        </div>
      </div>

      <!-- Секция 5: Контакт -->
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
               class="signal-telegram-button">
              Начать чат с Анной
            </a>
            <a href="/signals#знакомьтесь-–-анна" target="_blank" class="signal-secondary-link no-double-underline">
              Кто Анна и как работает
            </a>
          </div>
        </div>
        <div v-else>
          <div class="signal-question-block contact" style="--accent-color: #A972FF;">
            <div class="signal-rotating-phrase-container">
              <p class="signal-question-label">Отправьте Ваш Сигнал</p>
            </div>
            <div class="signal-name-field">
              <label>Для персонального разбора</label>
              <input v-model="form.userName" class="signal-input" placeholder="Ваше Имя" />
            </div>
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
            <span class="signal-liquid-next-text">{{ submitStatus === 'processing' ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ СИГНАЛ' }}</span>
          </button>
        </div>
      </div>

      <!-- Кнопки навигации по шагам -->
      <div v-if="selectedSection !== 'contact'" class="signal-next-button-container">
        <button
          class="signal-liquid-next-btn"
          @click="goToNextSection"
          :disabled="
            (selectedSection === 'emotions' && !isEmotionFilled)
            || (selectedSection === 'summary' && (!form.summaryText || !form.summaryText.trim()))
          "
        >
          <span class="signal-liquid-next-text">{{ currentSectionData.buttonText }}</span>
          <CupFillIcon
            class="signal-next-icon"
            :step-index="sections.findIndex(s => s.id === selectedSection)"
            :steps-total="5"
            :size="22"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue'

// ====== Стейт формы ======
const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  summaryText: '',
  userName: '',
  agreedToTerms: false,
});

const isMobile = ref(false);
const formSubmitted = ref(false);
const submitStatus = ref('idle');
const rawTicketNumber = ref(null);
const formattedTicketNumber = ref(null);
const currentDate = ref('');
const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxPqW0GLJ7SCJc9J1yC17Bl2diIxXDyAZEfSxJ7wLvupwjb7IAIlKVsXlyOL6WcDjex/exec';

// Валидация
const isEmotionFilled = computed(() => !!form.emotionalRelease.trim());

// Секции
const sections = [
  { id: 'emotions', title: 'Эмоции', buttonText: 'Дальше к фактам' },
  { id: 'facts', title: 'Факты', buttonText: 'К решению ситуации' },
  { id: 'solutions', title: 'Решения', buttonText: 'Суммировать' },
  { id: 'summary', title: 'Резюме', buttonText: 'Готово, к отправке' },
  { id: 'contact', title: 'Контакт', buttonText: '' }
];
const selectedSection = ref('emotions');
const isActive = id => id === selectedSection.value;
const currentSectionData = computed(() => sections.find(s => s.id === selectedSection.value));

const goToNextSection = () => {
  const idx = sections.findIndex(s => s.id === selectedSection.value);
  if (selectedSection.value === 'solutions') summarizeAllContent();
  if (idx < sections.length - 1) {
    selectedSection.value = sections[idx + 1].id
  }
};

// Вопросы
const questions1 = ['Что вы почувствовали?', 'Какие эмоции испытали?', 'Что расстроило или порадовало?', 'Ваше первое впечатление?'];
const questions2 = ['Что именно произошло?', 'Какие детали важны?', 'Когда это случилось?', 'Что запомнилось больше всего?'];
const questions3 = ['Что можно сделать лучше?', 'Ваш совет управляющему?', 'Как исправить ситуацию?', 'Предложения по улучшению?'];

const currentQuestion1 = ref(questions1[0]);
const currentQuestion2 = ref(questions2[0]);
const currentQuestion3 = ref(questions3[0]);

// Ротация
let rotationInterval = null;

function startRotation(questionNum) {
  // Защита для SSG: не запускаем таймеры на сервере
  if (typeof window === 'undefined') return;
  
  stopRotation();

  let questionsArray = [];
  let currentRef = null;

  if (questionNum === 1) { questionsArray = questions1; currentRef = currentQuestion1; }
  else if (questionNum === 2) { questionsArray = questions2; currentRef = currentQuestion2; }
  else if (questionNum === 3) { questionsArray = questions3; currentRef = currentQuestion3; }
  else return;
  
  rotationInterval = setInterval(() => {
    const currentIndex = questionsArray.indexOf(currentRef.value);
    const nextIndex = (currentIndex + 1) % questionsArray.length;
    currentRef.value = questionsArray[nextIndex];
  }, 4000); 
}

function stopRotation() {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
}

// Слежение за секцией БЕЗ immediate: true для SSG безопасности
watch(selectedSection, (newSection) => {
  stopRotation();
  if (newSection === 'emotions') startRotation(1);
  else if (newSection === 'facts') startRotation(2);
  else if (newSection === 'solutions') startRotation(3);
});

// Lifecycle
let checkMobile;

onMounted(() => {
  // Вся работа с window/DOM строго здесь
  checkMobile = () => { isMobile.value = window.innerWidth <= 768 }
  checkMobile();
  window.addEventListener('resize', checkMobile);

  // Данные тикета
  rawTicketNumber.value = String(Date.now()).slice(-6);
  formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3, 6)}`;
  
  const now = new Date();
  const d = n => String(n).padStart(2, '0');
  currentDate.value = `${d(now.getDate())}.${d(now.getMonth()+1)}.${now.getFullYear()}, ${d(now.getHours())}:${d(now.getMinutes())}:${d(now.getSeconds())}`;

  // Ручной запуск первой анимации на клиенте
  if (selectedSection.value === 'emotions') {
    startRotation(1);
  }
});

onUnmounted(() => {
  stopRotation();
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile);
  }
});

function summarizeAllContent() {
  if (form.summaryText.trim()) return;
  const emotional = form.emotionalRelease.trim();
  const factual = form.factualAnalysis.trim();
  const solutions = form.constructiveSuggestions.trim();

  let result = '';
  if (emotional) result += `Эмоции: ${emotional}\n\n`;
  if (factual) result += `Факты: ${factual}\n\n`;
  if (solutions) result += `Предложения: ${solutions}`;
  form.summaryText = result.trim();
}

async function submitForm() {
  if (typeof window === 'undefined') return;

  submitStatus.value = 'processing';

  // LocalStorage безопасно
  let clientId = localStorage.getItem('signal_client_id');
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + Date.now();
    localStorage.setItem('signal_client_id', clientId);
  }

  const now = new Date();
  const d = n => String(n).padStart(2, '0');
  const submittedTime = `${now.getFullYear()}-${d(now.getMonth()+1)}-${d(now.getDate())} ${d(now.getHours())}:${d(now.getMinutes())}:${d(now.getSeconds())}`;

  const formData = new FormData();
  formData.append('referer', window.location.origin);
  formData.append('clientId', clientId);
  formData.append('ticketNumber', formattedTicketNumber.value);
  formData.append('date', currentDate.value);
  formData.append('submitted', submittedTime);
  formData.append('network', ''); 
  formData.append('address', ''); 
  formData.append('name', form.userName);
  formData.append('review', form.summaryText);

  try {
    const response = await fetch(API_ENDPOINT, { method: 'POST', body: formData });
    const result = await response.json();
    
    if (result.status === 'success' && result.processed) {
      formSubmitted.value = true;
      submitStatus.value = 'idle';
    } else {
      throw new Error(result.message || 'Ошибка отправки');
    }
  } catch (error) {
    console.error(error);
    alert('Произошла ошибка при отправке. Попробуйте ещё раз.');
    submitStatus.value = 'idle';
  }
}

// Компонент иконки
const CupFillIcon = {
  props: ['stepIndex', 'stepsTotal', 'size'],
  template: `
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  `
}
</script>

<style scoped>
:root {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --signal-font-mono: 'SF Mono', 'Monaco', monospace;
  --submit-gradient: linear-gradient(90deg, #A972FF 0%, #D8B4FE 50%, #A972FF 100%); 
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
  padding-top: 20px; 
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
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.signal-breadcrumb.is-active .signal-breadcrumb-circle {
  width: 24px;
  height: 8px;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}

.signal-breadcrumb:hover .signal-breadcrumb-circle {
  background: rgba(255, 255, 255, 0.6);
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
  background: #2a2a2e;
  border-radius: 16px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color, #A972FF);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
}

.signal-rotating-phrase-container {
  height: 24px;
  position: relative;
  overflow: hidden;
  margin-bottom: 4px;
}
.signal-rotating-fixed-height {
  min-height: 24px;
}

.signal-question-label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  margin: 0;
  position: absolute;
  width: 100%;
  left: 0; 
  top: 0;
}

.signal-direction-label {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #888;
  margin-bottom: -0.5rem;
  font-weight: 700;
}

textarea, .signal-input {
  width: 100%;
  background: #18181a;
  border: 1px solid #444;
  border-radius: 12px;
  padding: 1rem;
  color: #fff;
  font-size: 1rem;
  resize: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-family: inherit;
}

textarea:focus, .signal-input:focus {
  outline: none;
  border-color: #A972FF;
  box-shadow: 0 0 0 2px rgba(169, 114, 255, 0.2);
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

.signal-agreement {
  margin: 20px 0 24px 0;
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
  accent-color: #A972FF;
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;
}

.signal-policy-link {
  color: #999 !important;
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
  background: var(--submit-gradient);
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
}
.signal-submit-button:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.02);
}
.signal-submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.signal-next-button-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 1rem;
}

.signal-liquid-next-btn {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: none;
  background: rgba(169, 114, 255, 0.15); 
  color: #D8B4FE;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  transition: all 0.3s ease;
}

.signal-liquid-next-btn:hover:not(:disabled) {
  background: rgba(169, 114, 255, 0.3);
  color: #fff;
  transform: translateY(-2px);
}
.signal-liquid-next-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.05);
  color: #666;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.signal-example-hint {
  font-size: 0.85rem;
  color: #888;
  line-height: 1.4;
  margin: 0.25rem 0 0.5rem 0.5rem;
}
.signal-example-hint-white {
  color: #f0f0f0 !important;
}

.signal-success-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  width: 100%;
}
.signal-success-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 1.5rem 0;
}
.signal-success-ticket-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
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
  padding: 0.7rem 2.5rem;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--signal-font-mono);
  font-size: 1.1rem;
}
.signal-success-description {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.signal-telegram-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none !important;
  background-color: #A972FF;
  color: #fff;
  transition: all 0.3s;
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
  transition: color 0.3s;
}
.signal-secondary-link:hover {
  color: #fff !important;
}

.no-double-underline {
  text-decoration: none !important;
  border-bottom: 1px solid currentColor !important;
  padding-bottom: 1px !important;
}

@media (max-width: 768px) {
  .signal-demo__header {
    margin-bottom: 12px;
  }
  .signal-demo-wrapper {
    width: 100%;
    margin: 0 auto;
  }
  .signal-demo__form-container {
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0 !important; 
    margin: 0 !important;
    width: 100%;
  }
  .signal-question-block {
    padding: 1rem 0.5rem !important; 
  }
  .signal-liquid-next-btn {
    width: 100%;
    height: 52px;
  }
  .signal-success-ticket-info {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
