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
          @click="tryGoToSection(section.id)" 
          :disabled="!canNavigateTo(section.id)"
        >
          <div class="korzh-invest-form-breadcrumb-circle"></div>
        </button>
      </div>
    </div>

    <div class="korzh-invest-form__container">

      <!-- Секция 1: Философия -->
      <div v-if="selectedSection === 'emotions'" class="korzh-invest-form-section">
        <div class="korzh-invest-form-block">
          <div class="korzh-invest-form-rotating-container korzh-invest-form-fixed-height">
            <transition name="korzh-fade" mode="out-in">
              <p :key="currentQuestion1" class="korzh-invest-form-label">
                {{ currentQuestion1 }}
              </p>
            </transition>
          </div>

          <div class="korzh-input-wrapper">
             <textarea 
              v-model="form.emotionalRelease" 
              class="korzh-invest-form-textarea"
              @focus="stopRotation"
              @blur="startRotation(1)"
              :rows="isMobile ? 8 : 6"
              placeholder='Например: Я ваш постоянный гость с 2018 года, обожаю "тот самый" раф и сырники. Мне близка идея "тишины внутри", и я хочу помочь сети расти органично...'
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Секция 2: Цели -->
      <div v-if="selectedSection === 'facts'" class="korzh-invest-form-section">
        <div class="korzh-invest-form-block">
          <div class="korzh-invest-form-rotating-container korzh-invest-form-fixed-height">
            <transition name="korzh-fade" mode="out-in">
              <p :key="currentQuestion2" class="korzh-invest-form-label">
                {{ currentQuestion2 }}
              </p>
            </transition>
          </div>
          <div class="korzh-input-wrapper">
            <textarea 
              v-model="form.factualAnalysis" 
              class="korzh-invest-form-textarea"
              @focus="stopRotation" 
              @blur="startRotation(2)"
              :rows="isMobile ? 8 : 6"
              :placeholder="isMobile 
                ? 'Ваши цели и ожидания...' 
                : 'Напишите честно: Ищу надежный актив с пассивным доходом. Или: Хочу участвовать в развитии сообщества и открывать новые родные места в городе...'"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Секция 3: Ресурсы (Слайдер + Инпут) -->
      <div v-if="selectedSection === 'solutions'" class="korzh-invest-form-section">
        <div class="korzh-invest-form-block korzh-block-purple">
          
          <!-- Хедер с текстом слева и иконкой справа -->
          <div class="korzh-slider-header">
            <div class="korzh-slider-titles">
              <div class="korzh-slider-title">Сколько хотели бы инвестировать?</div>
              <div class="korzh-slider-subtitle">Помогите Коржу рассчитать предложение</div>
            </div>
            
            <div class="korzh-icon-circle" :class="{ 'pulse-animation': isSliderAnimating }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/>
              </svg>
            </div>
          </div>

          <div class="korzh-slider-body">
            <!-- Отображение текущей суммы (слайдер) -->
            <div class="korzh-slider-value">{{ formatMoney(form.investmentAmount) }}</div>
            
            <div class="korzh-slider-row">
              <input 
                type="range" 
                :min="sliderMin" 
                :max="sliderMax" 
                :step="sliderStep" 
                v-model.number="form.investmentAmount" 
                class="korzh-slider-input" 
                :style="sliderStyle"
                @input="onSliderInput"
              />
            </div>
            
            <div class="korzh-slider-labels">
              <span :class="{ 'active-label': form.investmentAmount >= 10000 }">10К</span>
              <span :class="{ 'active-label': form.investmentAmount >= 5000000 }">5 МЛН</span>
              <span :class="{ 'active-label': form.investmentAmount >= 10000000 }">10 МЛН</span>
              <span :class="{ 'active-label': form.investmentAmount >= 15000000 }">15 МЛН</span>
            </div>

            <!-- Поле ручного ввода -->
            <div class="korzh-manual-input-wrapper">
              <div class="korzh-manual-currency">₽</div>
              <input 
                type="text" 
                :value="manualInputValue"
                @input="onManualInput"
                class="korzh-manual-input" 
                placeholder="Или напишите свою сумму ..."
              />
            </div>

          </div>

        </div>
      </div>

      <!-- Секция 4: Резюме -->
      <div v-if="selectedSection === 'summary'" class="korzh-invest-form-section">
        <div class="korzh-invest-form-block">
          <p class="korzh-invest-form-direction-label korzh-pale-purple-text">Заявка в Корж</p>
          <div class="korzh-invest-form-rotating-container">
            <p class="korzh-invest-form-label">Ваше видение партнерства</p>
          </div>
          <div class="korzh-input-wrapper">
            <textarea 
              v-model="form.summaryText" 
              class="korzh-invest-form-textarea"
              :rows="isMobile ? 8 : 6"
              placeholder="Суммирую ваши пожелания..."
            ></textarea>
          </div>
          <p class="korzh-invest-form-hint korzh-invest-form-hint-white">Не оферта. Вы делитесь своими данными с Коржем, чтобы получить возможность персонального предложения.</p>
        </div>
      </div>

      <!-- Секция 5: Контакт -->
      <div v-if="selectedSection === 'contact'" class="korzh-invest-form-section">
        <div v-if="formSubmitted" class="korzh-invest-form-success">
          <div class="korzh-invest-form-success-content">
            <h3>Заявка отправлена ⚡</h3>
            <div class="korzh-invest-form-ticket-info">
              <!-- Сначала ТИКЕТ, потом ДАТА -->
              <span class="korzh-invest-form-ticket">{{ formattedTicketNumber }}</span>
              <span class="korzh-invest-form-date">{{ currentDate }}</span>
            </div>
            
            <p class="korzh-invest-form-desc">
              Корж получит вашу заявку. Как только предложение будет готово – ваш персональный ИИ-помощник Анна сообщит в Телеграм. 
              <strong>Начните чат, чтобы быть в курсе событий.</strong>
            </p>
            
            <!-- Кнопка как основная -->
            <a :href="`https://t.me/Anna_Signal?text=⚡️${formattedTicketNumber}%20${encodedProjectName}`"
               target="_blank"
               class="korzh-invest-form-telegram-btn">
              Начать чат с Анной
            </a>
            
            <a href="/invest/pulse" target="_blank" class="korzh-invest-form-link korzh-custom-underline">
              Другие возможности инвестировать
            </a>
          </div>
        </div>
        <div v-else>
          <div class="korzh-invest-form-block contact">
            <p class="korzh-invest-form-direction-label korzh-pale-purple-text">Отправьте заявку</p>
            
            <!-- Поле Имя -->
            <div class="korzh-invest-form-field">
              <label>Для персонального предложения</label>
              <div class="korzh-input-wrapper">
                <input v-model="form.userName" class="korzh-invest-form-input" placeholder="Ваше Имя" />
              </div>
            </div>

            <!-- Поле Telegram -->
            <div class="korzh-invest-form-field">
              <label>Ваш контакт в Telegram</label>
              <div class="korzh-input-wrapper">
                <input v-model="form.userContact" class="korzh-invest-form-input" placeholder="Ник или Номер телефона" />
              </div>
            </div>

          </div>
          
          <label class="korzh-invest-form-agreement">
            <input type="checkbox" v-model="form.agreedToTerms" />
            <span>
              Я согласен с 
              <a href="/terms/policy" target="_blank" class="korzh-invest-form-policy">политикой конфиденциальности</a> 
              и 
              <a href="/terms/privacy" target="_blank" class="korzh-invest-form-policy">обработкой персональных данных</a>
            </span>
          </label>
          
          <button 
            class="korzh-invest-form-main-btn" 
            :disabled="submitStatus === 'processing' || !canProceed"
            @click="submitForm"
          >
            <span class="korzh-invest-form-btn-text">{{ submitStatus === 'processing' ? 'ОТПРАВКА...' : 'ПОДТВЕРЖДАЮ ИНТЕРЕС' }}</span>
          </button>
        </div>
      </div>

      <!-- Кнопки навигации по шагам -->
      <div v-if="selectedSection !== 'contact'" class="korzh-invest-form-nav">
        <button
          class="korzh-invest-form-main-btn"
          @click="goToNextSection"
          :disabled="!canProceed"
        >
          <span class="korzh-invest-form-btn-text">{{ currentSectionData.buttonText }}</span>
          
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

// ====== Внутренний компонент иконки чашки (SVG) ======
const CupFillIcon = {
  props: ['stepIndex', 'stepsTotal', 'size'],
  setup(props) {
    const fillPercent = computed(() => {
      const p = ((props.stepIndex + 1) / props.stepsTotal) * 100;
      return Math.min(Math.max(p, 0), 100);
    });
    
    const maxLiquidHeight = 13; 
    const currentHeight = computed(() => (fillPercent.value / 100) * maxLiquidHeight);
    const yPos = computed(() => 21 - currentHeight.value);
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
      h('defs', [
        h('clipPath', { id: clipId }, [
          h('path', { d: 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z' })
        ])
      ]),
      h('rect', {
        x: '0', 
        y: yPos.value, 
        width: '24', 
        height: currentHeight.value,
        fill: 'currentColor', 
        stroke: 'none',
        'clip-path': `url(#${clipId})`, 
        style: { transition: 'all 0.5s ease' }
      }),
      h('path', { d: 'M18 8h1a4 4 0 0 1 0 8h-1', stroke: 'currentColor' }),
      h('path', { d: 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z', stroke: 'currentColor' }),
      h('line', { x1: '6', y1: '1', x2: '6', y2: '4', stroke: 'currentColor' }),
      h('line', { x1: '10', y1: '1', x2: '10', y2: '4', stroke: 'currentColor' }),
      h('line', { x1: '14', y1: '1', x2: '14', y2: '4', stroke: 'currentColor' })
    ])
  }
}

// ====== Стейт формы ======
const sliderMin = 10000;
const sliderMax = 15000000;
const sliderStep = 10000;
// Название проекта для отправки в бот
const projectName = 'КОРЖ – Инвестиции';
const encodedProjectName = 'КОРЖ%20–%20ИНВЕСТИЦИИ'; // В верхнем регистре для URL

const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  investmentAmount: sliderMin,
  summaryText: '',
  userName: '',
  userContact: '', 
  agreedToTerms: false,
});

const isMobile = ref(false);
const formSubmitted = ref(false);
const submitStatus = ref('idle');
const formattedTicketNumber = ref(null);
const currentDate = ref('');
const isSliderAnimating = ref(false);
let sliderTimeout = null;

const hasInteractedWithAmount = ref(false);

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyKgDYv13x9CLNzGeVxUE7fDOLHbFZpafgZqmAdxAkO3P06M2k3LPJvCfRNq30vDGzjpA/exec';

const sections = [
  { id: 'emotions', title: 'Философия', buttonText: 'Дальше: Мои цели' },
  { id: 'facts', title: 'Цели', buttonText: 'Настроить бюджет' },
  { id: 'solutions', title: 'Ресурсы', buttonText: 'Собрать заявку' },
  { id: 'summary', title: 'Резюме', buttonText: 'Всё верно' },
  { id: 'contact', title: 'Контакт', buttonText: '' }
];
const selectedSection = ref('emotions');
const isActive = id => id === selectedSection.value;
const currentSectionData = computed(() => sections.find(s => s.id === selectedSection.value));

const sliderStyle = computed(() => {
  const val = form.investmentAmount;
  let percentage = 0;
  if (val >= sliderMin) {
    percentage = ((val - sliderMin) / (sliderMax - sliderMin)) * 100;
  }
  return {
    background: `linear-gradient(to right, #E9D5FF 0%, #7E22CE ${percentage}%, rgba(255, 255, 255, 0.15) ${percentage}%, rgba(255, 255, 255, 0.15) 100%)`
  };
});

const formatMoney = (val) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(val);
}

const formatNumberWithSpaces = (val) => {
  if (!val && val !== 0) return '';
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const manualInputValue = computed(() => {
  if (!hasInteractedWithAmount.value || !form.investmentAmount || form.investmentAmount === 0) return '';
  return formatNumberWithSpaces(form.investmentAmount);
});

const onManualInput = (e) => {
  hasInteractedWithAmount.value = true;
  let val = e.target.value.replace(/\s/g, '');
  val = val.replace(/[^0-9]/g, '');
  
  if (val === '') {
    form.investmentAmount = 0;
    return;
  }
  
  let num = parseInt(val, 10);
  if (isNaN(num)) num = 0;
  if (num > sliderMax) num = sliderMax;
  
  form.investmentAmount = num;
  e.target.value = formatNumberWithSpaces(num);
};

const onSliderInput = () => {
  hasInteractedWithAmount.value = true;
};

const canProceed = computed(() => {
  if (selectedSection.value === 'emotions') return !!form.emotionalRelease.trim();
  if (selectedSection.value === 'facts') return !!form.factualAnalysis.trim();
  if (selectedSection.value === 'solutions') return true; 
  if (selectedSection.value === 'summary') return !!form.summaryText.trim();
  if (selectedSection.value === 'contact') {
    return form.agreedToTerms && !!form.userName.trim() && !!form.userContact.trim();
  }
  return false;
});

function goToNextSection() {
  if (!canProceed.value) return;
  const idx = sections.findIndex(s => s.id === selectedSection.value);
  if (idx < sections.length - 1) {
    selectedSection.value = sections[idx + 1].id;
  }
}

function tryGoToSection(id) {
  if (canNavigateTo(id)) {
    selectedSection.value = id;
  }
}

function canNavigateTo(targetId) {
  const targetIdx = sections.findIndex(s => s.id === targetId);
  const currentIdx = sections.findIndex(s => s.id === selectedSection.value);
  if (targetIdx <= currentIdx) return true;
  if (targetIdx === currentIdx + 1 && canProceed.value) return true;
  return false; 
}

const questions1 = [
  'Почему именно Корж?', 
  'Вас покорила атмосфера?', 
  'Любовь к продукту или расчет?', 
  'Хотите стать частью истории?'
];

const questions2 = [
  'Что для вас важнее всего?', 
  'Доверие команде или контроль?', 
  'Быстрый возврат или игра в долгую?', 
  'Пассивный доход или участие?'
];

const currentQuestion1 = ref(questions1[0]);
const currentQuestion2 = ref(questions2[0]);

let rotationInterval = null;

function startRotation(questionNum) {
  if (typeof window === 'undefined') return;
  stopRotation();
  let questionsArray = [];
  let currentRef = null;

  if (questionNum === 1) { questionsArray = questions1; currentRef = currentQuestion1; }
  else if (questionNum === 2) { questionsArray = questions2; currentRef = currentQuestion2; }
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

function formatSentence(text) {
  if (!text || !text.trim()) return '';
  let clean = text.trim();
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  if (!/[.!?]$/.test(clean)) {
    clean += '.';
  }
  return clean;
}

function updateSummary() {
  const parts = [];
  if (form.emotionalRelease.trim()) parts.push(formatSentence(form.emotionalRelease));
  if (form.factualAnalysis.trim()) parts.push(formatSentence(form.factualAnalysis));
  
  if (form.investmentAmount && form.investmentAmount > 0) {
    parts.push(`Хочу инвестировать: ${formatMoney(form.investmentAmount)}.`);
  } else {
    parts.push('Сумма инвестиций не определена, но мне интересно.');
  }
  
  form.summaryText = parts.join(' ');
}

watch(selectedSection, (newSection) => {
  stopRotation();
  if (newSection === 'emotions') startRotation(1);
  else if (newSection === 'facts') startRotation(2);
  
  if (newSection === 'summary') {
    updateSummary();
  }
}, { immediate: true });

watch(() => form.investmentAmount, () => {
  isSliderAnimating.value = true;
  if (sliderTimeout) clearTimeout(sliderTimeout);
  sliderTimeout = setTimeout(() => {
    isSliderAnimating.value = false;
  }, 300);
});

let checkMobile;

onMounted(() => {
  checkMobile = () => { isMobile.value = window.innerWidth <= 768 }
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  // Генерируем случайное число от 10 до 99
  formattedTicketNumber.value = String(Math.floor(Math.random() * 90) + 10);
  
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
  formData.append('project', projectName); // Передаем название проекта
  formData.append('referer', window.location.origin);
  formData.append('clientId', clientId);
  formData.append('ticketNumber', formattedTicketNumber.value);
  formData.append('date', currentDate.value);
  formData.append('submitted', submittedTime);
  formData.append('network', ''); 
  formData.append('address', ''); 
  formData.append('name', form.userName);
  formData.append('contact', form.userContact);
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
  margin-bottom: 40px; 
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
.korzh-invest-form-breadcrumb:disabled {
  cursor: not-allowed;
  opacity: 0.5;
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

.korzh-invest-form-breadcrumb:hover:not(:disabled) .korzh-invest-form-breadcrumb-circle {
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

/* Стандартный блок */
.korzh-invest-form-block {
  background: #2a2a2e;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
}

/* Блок для слайдера (Purple/Pink Style) */
.korzh-block-purple {
  background: radial-gradient(circle at 0 0, rgba(124, 58, 237, 0.2), transparent 55%),
              radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.15), transparent 60%),
              linear-gradient(135deg, #1A1A24, #2D2D3F);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

/* Слайдер Хедер */
.korzh-slider-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 1rem;
}

.korzh-slider-titles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 48px; 
  gap: 6px; 
}

.korzh-slider-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
}

.korzh-slider-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6); 
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.4;
}

.korzh-icon-circle {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  background: rgba(167, 139, 250, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.korzh-icon-circle.pulse-animation {
  animation: pulse-scale 0.3s ease;
}

@keyframes pulse-scale {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* Слайдер Тело */
.korzh-slider-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.korzh-slider-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
  font-variant-numeric: tabular-nums;
}

.korzh-slider-row {
  width: 100%;
  display: flex;
  align-items: center;
}

.korzh-slider-input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
  margin: 0;
}

.korzh-slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.5);
  cursor: pointer;
  background: radial-gradient(circle, #a855f7 0%, #a855f7 35%, #ffffff 36%, #ffffff 100%);
  transition: transform 0.1s;
}
.korzh-slider-input::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.korzh-slider-input::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(15, 23, 42, 0.2);
  cursor: pointer;
  background: radial-gradient(circle, #a855f7 0%, #a855f7 35%, #ffffff 36%, #ffffff 100%);
}

.korzh-slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
  margin-top: 4px;
  transition: all 0.3s ease;
}

.active-label {
  color: #ffffff !important;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* Поле ручного ввода */
.korzh-manual-input-wrapper {
  display: flex;
  align-items: stretch;
  background: #18181a;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
  transition: border-color 0.3s;
}
.korzh-manual-input-wrapper:focus-within {
  border-color: rgba(168, 85, 247, 0.7);
}

.korzh-manual-currency {
  background: #2a2a2e;
  color: #F3E8FF;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  font-weight: 600;
  font-size: 1.1rem;
  border-right: 1px solid rgba(139, 92, 246, 0.3);
}

.korzh-manual-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  padding: 1rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  width: 100%;
}
.korzh-manual-input::placeholder {
  color: #666;
}

/* --- Остальные стили формы --- */

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

.korzh-pale-purple-text {
  color: #F3E8FF !important;
  opacity: 0.9;
}

.korzh-input-wrapper {
  position: relative;
  border-radius: 12px;
  background: #2a2a2a; 
  padding: 1px; 
  transition: all 0.3s ease;
}

.korzh-input-wrapper:focus-within {
  background: transparent;
  background-image: linear-gradient(#2a2a2a, #2a2a2a), 
                    linear-gradient(135deg, rgba(169, 114, 255, 0.8), rgba(169, 114, 255, 0));
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 0 0 15px rgba(169, 114, 255, 0.3);
}

.korzh-invest-form-textarea, .korzh-invest-form-input {
  width: 100%;
  background: #18181a;
  border: 1px solid #444; 
  border-radius: 11px; 
  padding: 1rem;
  color: #fff;
  font-size: 1rem;
  resize: none;
  font-family: inherit;
  display: block;
  transition: border-color 0.3s;
}

.korzh-invest-form-textarea:focus, .korzh-invest-form-input:focus {
  outline: none;
  border-color: transparent; 
  background: #18181a; 
}

.korzh-invest-form-field {
  margin-bottom: 12px;
}
.korzh-invest-form-field label {
  display: block;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  font-style: normal;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.korzh-invest-form-agreement {
  margin: 20px 0 24px 0;
  display: flex;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #ccc;
  cursor: pointer;
  padding: 0;
  line-height: 1.4;
}

.korzh-invest-form-agreement input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #52525b; 
  cursor: pointer;
  flex-shrink: 0;
  margin: 0;
  filter: grayscale(1);
}

@media (min-width: 769px) {
  .korzh-invest-form-agreement {
    align-items: center;
  }
}

@media (max-width: 768px) {
  .korzh-invest-form-agreement {
    align-items: flex-start;
  }
  .korzh-invest-form-agreement input[type="checkbox"] {
    margin-top: 2px; 
  }
}

.korzh-invest-form-policy {
  color: #999 !important;
  text-decoration: none !important;
  border-bottom: 1px solid #999;
  padding-bottom: 0px;
  transition: all 0.3s ease;
}
.korzh-invest-form-policy:hover {
  color: #fff !important;
  border-bottom-color: #fff;
}

.korzh-invest-form-main-btn {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #7c68b0 0%, #8e7bbd 50%, #7c68b0 100%) !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: 0 0 20px rgba(124, 104, 176, 0.2);
  color: #FFFFFF !important;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease-out;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 0 24px;
  gap: 12px;
  position: relative;
  z-index: 5;
}

.korzh-invest-form-main-btn:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 5px 25px rgba(124, 104, 176, 0.4);
}
.korzh-invest-form-main-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(0.5);
  box-shadow: none;
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
  color: #FFFFFF; 
}

.korzh-invest-form-btn-text {
  flex-grow: 0; 
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
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

/* ============ Стили успеха ============ */

/* Важно: Контейнер для выравнивания */
.korzh-invest-form-success-content {
  display: flex;
  flex-direction: column; /* Всегда вертикально */
  align-items: center; /* Центрируем по горизонтали */
  justify-content: center;
  width: 100%;
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

/* Блок Тикет + Дата */
.korzh-invest-form-ticket-info {
  display: flex;
  flex-direction: column; /* Вертикально */
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}
.korzh-invest-form-date {
  font-family: var(--korzh-font-mono);
  font-size: 0.9rem;
  color: #888;
  order: 2; 
}
.korzh-invest-form-ticket {
  background-color: #2a2a2e;
  color: #fff;
  font-weight: 700;
  padding: 0.7rem 2.5rem;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--korzh-font-mono);
  font-size: 1.5rem; 
  order: 1; 
}

/* Описание */
.korzh-invest-form-desc {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0 0 2rem 0; 
  max-width: 500px;
}
.korzh-invest-form-desc strong {
  color: #fff;
  font-weight: 600;
}

/* Кнопка Телеграм */
.korzh-invest-form-telegram-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none !important;
  background: linear-gradient(135deg, #7c68b0 0%, #8e7bbd 50%, #7c68b0 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 20px rgba(124, 104, 176, 0.2);
  transition: all 0.4s ease-out;
  text-transform: uppercase;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  border: none;
  margin-bottom: 0; /* Убираем лишний маржин, если был */
}
.korzh-invest-form-telegram-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 5px 25px rgba(124, 104, 176, 0.4);
  color: #FFFFFF !important;
}

/* Нижняя ссылка */
.korzh-invest-form-link {
  display: inline-block;
  margin-top: 1.5rem; /* Отступ от кнопки */
  font-size: 0.85rem;
  color: #888;
  transition: color 0.3s;
}

/* Кастомное подчеркивание (ближе к тексту) */
.korzh-custom-underline {
  text-decoration: none !important;
  border-bottom: 1px solid rgba(136, 136, 136, 0.5) !important;
  padding-bottom: 1px !important; /* Уменьшили до 1px */
  line-height: 1.2;
}

.korzh-custom-underline:hover {
  color: #fff !important;
  border-bottom-color: #fff !important;
}

@media (max-width: 768px) {
  .korzh-invest-form__header {
    margin-bottom: 20px; 
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
    padding: 1.5rem 1rem !important; 
  }
  .korzh-invest-form-main-btn {
    width: 100%;
    height: 52px;
  }
  .korzh-invest-form-ticket-info {
    gap: 0.5rem;
  }
  .korzh-slider-value {
    font-size: 1.3rem;
  }
}
</style>
