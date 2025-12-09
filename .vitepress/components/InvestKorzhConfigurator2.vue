<template>
  <div class="korzh-invest-form-wrapper">

    <!-- Переключатель секций (Хедер) -->
    <div class="korzh-invest-form__header">
      <div class="korzh-invest-form__breadcrumbs" role="tablist">
        <button
          v-for="section in sections"
          :key="section.id"
          class="korzh-invest-form-breadcrumb"
          :class="[section.id, isActive(section.id) ? 'is-active' : '']"
          @click="selectedSection = section.id"
        >
          <div class="korzh-invest-form-breadcrumb-circle"></div>
        </button>
      </div>
    </div>

    <div class="korzh-invest-form__container">

      <!-- Секция 1: Эмоции -->
      <div v-if="selectedSection === 'emotions'" class="korzh-invest-form-section">
        <div class="korzh-invest-form-block" style="--accent-color: #ff69b4;">
          <div class="korzh-invest-form-rotating-container korzh-invest-form-fixed-height">
            <transition name="korzh-fade" mode="out-in">
              <p :key="currentQuestion1" class="korzh-invest-form-label">
                {{ currentQuestion1 }}
              </p>
            </transition>
          </div>

          <textarea 
            v-model="form.emotionalRelease" 
            class="korzh-invest-form-textarea"
            @focus="stopRotation"
            @blur="startRotation(1)"
            :rows="isMobile ? 5 : 3"
            placeholder="Опишите ваши впечатления..."
          ></textarea>
        </div>
      </div>

      <!-- Секция 2: Факты -->
      <div v-if="selectedSection === 'facts'" class="korzh-invest-form-section">
        <div class="korzh-invest-form-block" style="--accent-color: #ff69b4;">
          <div class="korzh-invest-form-rotating-container korzh-invest-form-fixed-height">
            <transition name="korzh-fade" mode="out-in">
              <p :key="currentQuestion2" class="korzh-invest-form-label">
                {{ currentQuestion2 }}
              </p>
            </transition>
          </div>
          <textarea 
            v-model="form.factualAnalysis" 
            class="korzh-invest-form-textarea"
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
      <div v-if="selectedSection === 'solutions'" class="korzh-invest-form-section">
        <div class="korzh-invest-form-block" style="--accent-color: #ff69b4;">
          <div class="korzh-invest-form-rotating-container korzh-invest-form-fixed-height">
            <transition name="korzh-fade" mode="out-in">
              <p :key="currentQuestion3" class="korzh-invest-form-label">
                {{ currentQuestion3 }}
              </p>
            </transition>
          </div>
          <textarea 
            v-model="form.constructiveSuggestions" 
            class="korzh-invest-form-textarea"
            @focus="stopRotation" 
            @blur="startRotation(3)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Ваш совет или предложение..."
          ></textarea>
        </div>
      </div>

      <!-- Секция 4: Итого (Резюме) -->
      <div v-if="selectedSection === 'summary'" class="korzh-invest-form-section">
        <div class="korzh-invest-form-block" style="--accent-color: #ff69b4;">
          <p class="korzh-invest-form-direction-label">Ваш Сигнал</p>
          <div class="korzh-invest-form-rotating-container">
            <p class="korzh-invest-form-label">Что должно измениться?</p>
          </div>
          <textarea 
            v-model="form.summaryText" 
            class="korzh-invest-form-textarea"
            :rows="isMobile ? 8 : 6"
            placeholder="Главный вывод..."
          ></textarea>
          <p class="korzh-invest-form-hint korzh-invest-form-hint-white">Команда к действию и видимый результат для вас</p>
        </div>
      </div>

      <!-- Секция 5: Контакт -->
      <div v-if="selectedSection === 'contact'" class="korzh-invest-form-section">
        <div v-if="formSubmitted" class="korzh-invest-form-success">
          <div class="korzh-invest-form-success-content">
            <h3>Сигнал отправлен ⚡</h3>
            <div class="korzh-invest-form-ticket-info">
              <span class="korzh-invest-form-date">{{ currentDate }}</span>
              <span class="korzh-invest-form-ticket">{{ formattedTicketNumber }}</span>
            </div>
            <p class="korzh-invest-form-desc">Отправьте тикет Анне, чтобы получить результат в Телеграм.</p>
            <a :href="`https://t.me/Anna_Signal?text=Тикет%20${rawTicketNumber}`"
               target="_blank"
               class="korzh-invest-form-telegram-btn">
              Начать чат с Анной
            </a>
            <a href="/signals#знакомьтесь-–-анна" target="_blank" class="korzh-invest-form-link no-double-underline">
              Кто Анна и как работает
            </a>
          </div>
        </div>
        <div v-else>
          <div class="korzh-invest-form-block contact" style="--accent-color: #ff69b4;">
            <div class="korzh-invest-form-rotating-container">
              <p class="korzh-invest-form-label">Отправьте Ваш Сигнал</p>
            </div>
            <div class="korzh-invest-form-field">
              <label>Для персонального разбора</label>
              <input v-model="form.userName" class="korzh-invest-form-input" placeholder="Ваше Имя" />
            </div>
          </div>
          <label class="korzh-invest-form-agreement">
            <input type="checkbox" v-model="form.agreedToTerms" />
            <span>Подтверждаю согласие с
              <a href="/terms" target="_blank" class="korzh-invest-form-policy no-double-underline">Условиями использования</a>
            </span>
          </label>
          <button 
            class="korzh-invest-form-main-btn" 
            :disabled="submitStatus === 'processing' || !form.agreedToTerms || !isEmotionFilled"
            @click="submitForm"
          >
            <span class="korzh-invest-form-btn-text">{{ submitStatus === 'processing' ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ СИГНАЛ' }}</span>
          </button>
        </div>
      </div>

      <!-- Кнопки навигации по шагам -->
      <div v-if="selectedSection !== 'contact'" class="korzh-invest-form-nav">
        <button
          class="korzh-invest-form-main-btn"
          @click="goToNextSection"
          :disabled="
            (selectedSection === 'emotions' && !isEmotionFilled)
            || (selectedSection === 'summary' && (!form.summaryText || !form.summaryText.trim()))
          "
        >
          <!-- Текст и иконка центрируются вместе (flex-grow убран) -->
          <span class="korzh-invest-form-btn-text">{{ currentSectionData.buttonText }}</span>
          
          <!-- Исправленная иконка: использует clipPath для идеального заполнения без дырок -->
          <CupFillIcon
            class="korzh-invest-form-icon"
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
import { reactive, ref, computed, onMounted, onUnmounted, watch, h } from 'vue'

// ====== Внутренний компонент иконки чашки (Исправленный SVG) ======
const CupFillIcon = {
  props: ['stepIndex', 'stepsTotal', 'size'],
  setup(props) {
    const fillPercent = computed(() => {
      const p = ((props.stepIndex + 1) / props.stepsTotal) * 100;
      return Math.min(Math.max(p, 0), 100);
    });
    
    // Максимальная высота жидкости внутри чашки (примерно 13px от дна)
    const maxLiquidHeight = 13; 
    const currentHeight = computed(() => (fillPercent.value / 100) * maxLiquidHeight);
    // Y координата верхней границы жидкости (дно чашки на Y=21)
    const yPos = computed(() => 21 - currentHeight.value);

    // Уникальный ID для clipPath, чтобы не конфликтовал при множественном использовании
    const clipId = `cup-clip-${Math.random().toString(36).substr(2, 9)}`;

    return () => h('svg', {
      width: props.size,
      height: props.size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      // 1. Определение маски по форме чашки
      h('defs', [
        h('clipPath', { id: clipId }, [
          h('path', { d: 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z' })
        ])
      ]),
      
      // 2. Жидкость (Прямоугольник, обрезанный маской чашки)
      h('rect', {
        x: '0', 
        y: yPos.value, 
        width: '24', 
        height: currentHeight.value,
        fill: 'currentColor',
        stroke: 'none',
        'clip-path': `url(#${clipId})`, // Магия здесь: жидкость только внутри чашки
        style: { transition: 'all 0.5s ease' }
      }),

      // 3. Контур чашки (Рисуется поверх жидкости)
      h('path', { d: 'M18 8h1a4 4 0 0 1 0 8h-1', stroke: 'currentColor' }), // Ручка
      h('path', { d: 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z', stroke: 'currentColor' }), // Чаша
      
      // 4. Пар
      h('line', { x1: '6', y1: '1', x2: '6', y2: '4', stroke: 'currentColor' }),
      h('line', { x1: '10', y1: '1', x2: '10', y2: '4', stroke: 'currentColor' }),
      h('line', { x1: '14', y1: '1', x2: '14', y2: '4', stroke: 'currentColor' })
    ])
  }
}

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

watch(selectedSection, (newSection) => {
  stopRotation();
  if (newSection === 'emotions') startRotation(1);
  else if (newSection === 'facts') startRotation(2);
  else if (newSection === 'solutions') startRotation(3);
}, { immediate: true });

// Lifecycle
let checkMobile;

onMounted(() => {
  checkMobile = () => { isMobile.value = window.innerWidth <= 768 }
  checkMobile();
  window.addEventListener('resize', checkMobile);

  rawTicketNumber.value = String(Date.now()).slice(-6);
  formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3, 6)}`;
  
  const now = new Date();
  const d = n => String(n).padStart(2, '0');
  currentDate.value = `${d(now.getDate())}.${d(now.getMonth()+1)}.${now.getFullYear()}, ${d(now.getHours())}:${d(now.getMinutes())}:${d(now.getSeconds())}`;
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
</script>

<style scoped>
:root {
  --korzh-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --korzh-font-mono: 'SF Mono', 'Monaco', monospace;
  /* Розовый градиент (Женская тема) */
  --korzh-submit-gradient: linear-gradient(90deg, #ffb6da 0%, #ff69b4 50%, #ff1493 100%);
}

.korzh-invest-form-wrapper {
  font-family: var(--korzh-font-sans);
  width: 100%;
  max-width: none;
  margin: 0;
}

.korzh-invest-form__header {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  padding-top: 50px; 
}

.korzh-invest-form__breadcrumbs {
  display: flex;
  gap: 12px;
  align-items: center;
}

.korzh-invest-form-breadcrumb {
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

.korzh-invest-form-breadcrumb-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.korzh-invest-form-breadcrumb.is-active .korzh-invest-form-breadcrumb-circle {
  width: 24px;
  height: 8px;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}

.korzh-invest-form-breadcrumb:hover .korzh-invest-form-breadcrumb-circle {
  background: rgba(255, 255, 255, 0.6);
}

.korzh-invest-form__container {
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.korzh-invest-form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.korzh-invest-form-block {
  background: #2a2a2e;
  border-radius: 16px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color, #ff69b4);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
}

.korzh-invest-form-rotating-container {
  height: 24px;
  position: relative;
  overflow: hidden;
  margin-bottom: 4px;
}
.korzh-invest-form-fixed-height {
  min-height: 24px;
}

.korzh-invest-form-label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  margin: 0;
  position: absolute;
  width: 100%;
  left: 0; 
  top: 0;
}

.korzh-invest-form-direction-label {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #888;
  margin-bottom: -0.5rem;
  font-weight: 700;
}

.korzh-invest-form-textarea, .korzh-invest-form-input {
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

/* Розовая подсветка (Женская тема) */
.korzh-invest-form-textarea:focus, .korzh-invest-form-input:focus {
  outline: none;
  border-color: #ff69b4;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2);
}

.korzh-invest-form-field {
  margin-bottom: 12px;
}
.korzh-invest-form-field label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.korzh-invest-form-agreement {
  margin: 20px 0 24px 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
  cursor: pointer;
  padding: 0;
}

.korzh-invest-form-agreement input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #ff69b4;
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;
}

.korzh-invest-form-policy {
  color: #999 !important;
  transition: color 0.3s ease;
}
.korzh-invest-form-policy:hover {
  color: #fff !important;
}

/* Единый стиль кнопок (розовый градиент), центровка вместе */
.korzh-invest-form-main-btn {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: none;
  background: var(--korzh-submit-gradient);
  background-size: 200% auto;
  background-position: 25% 50%;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease-out;
  margin-top: 1rem;
  /* Центрируем содержимое (текст + иконка) единым блоком */
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 0 24px;
  gap: 12px; /* Отступ между текстом и чашкой */
}

.korzh-invest-form-main-btn:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.02);
}
.korzh-invest-form-main-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

.korzh-invest-form-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 1rem;
}

.korzh-invest-form-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: currentColor; 
}

/* Текст внутри кнопки больше не растягивается, сидит рядом с иконкой */
.korzh-invest-form-btn-text {
  flex-grow: 0; 
}

.korzh-fade-enter-active,
.korzh-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.korzh-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.korzh-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.korzh-invest-form-hint {
  font-size: 0.85rem;
  color: #888;
  line-height: 1.4;
  margin: 0.25rem 0 0.5rem 0.5rem;
}
.korzh-invest-form-hint-white {
  color: #f0f0f0 !important;
}

.korzh-invest-form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  width: 100%;
}
.korzh-invest-form-success-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 1.5rem 0;
}
.korzh-invest-form-ticket-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
.korzh-invest-form-date {
  font-family: var(--korzh-font-mono);
  font-size: 0.9rem;
  color: #888;
}
.korzh-invest-form-ticket {
  background-color: #2a2a2e;
  color: #fff;
  font-weight: 700;
  padding: 0.7rem 2.5rem;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--korzh-font-mono);
  font-size: 1.1rem;
}
.korzh-invest-form-desc {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.korzh-invest-form-telegram-btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none !important;
  background-color: #ff69b4;
  color: #fff;
  transition: all 0.3s;
}
.korzh-invest-form-telegram-btn:hover {
  filter: brightness(110%);
  transform: scale(1.05);
}

.korzh-invest-form-link {
  display: block;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #888;
  transition: color 0.3s;
}
.korzh-invest-form-link:hover {
  color: #fff !important;
}

.no-double-underline {
  text-decoration: none !important;
  border-bottom: 1px solid currentColor !important;
  padding-bottom: 1px !important;
}

@media (max-width: 768px) {
  .korzh-invest-form__header {
    margin-bottom: 12px;
  }
  .korzh-invest-form-wrapper {
    width: 100%;
    margin: 0 auto;
  }
  .korzh-invest-form__container {
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0 !important; 
    margin: 0 !important;
    width: 100%;
  }
  .korzh-invest-form-block {
    padding: 1rem 0.5rem !important; 
  }
  .korzh-invest-form-main-btn {
    width: 100%;
    height: 52px;
  }
  .korzh-invest-form-ticket-info {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
