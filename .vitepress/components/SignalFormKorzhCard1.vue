<template>
  <div class="signal-form-wrapper">
    <!-- 1. Сообщение об успехе -->
    <div v-if="formSubmitted" class="signal-success-message">
      <div class="signal-success-text">
        <h3>Готово!</h3>
        <p>Сигнал отправлен. Номер: <strong>{{ formattedTicketNumber }}</strong></p>
      </div>
      <div class="signal-success-actions">
        <a :href="`https://t.me/AnnaSignal?text=${rawTicketNumber}`" target="_blank" class="signal-telegram-button">Написать в Telegram</a>
        <a href="/signals" target="_blank" class="signal-secondary-link">Вернуться</a>
      </div>
    </div>

    <!-- 2. Форма -->
    <form v-else @submit.prevent="submitForm">
      <div class="signal-form-header">
        <div class="signal-form-title">Signal</div>
        <div class="signal-tech-info">
          <span class="signal-info-item">{{ currentDate }}</span>
          <span class="signal-info-item signal-ticket-display">{{ formattedTicketNumber }}</span>
        </div>
      </div>

      <div class="signal-separator-line"></div>

      <div class="signal-form-section">
        <!-- Блок выбора кофейни -->
        <div class="signal-question-block signal-compact">
          <label class="signal-question-label">Точка</label>
          <p class="signal-question-help">Выберите адрес кофейни</p>
          <select v-model="form.coffeeShopAddress" class="signal-address-select" required>
             <option value="" disabled>Выберите точку</option>
             <option value="Кофе, 103">Кофе, 103</option>
             <option value="Кофе, 30">Кофе, 30</option>
             <option value="Кофе, 101">Кофе, 101</option>
             <option value="Кофе, 9 5-я линия,39">Кофе, 9 5-я линия,39</option>
             <option value="Кофе, 270">Кофе, 270</option>
             <option value="Кофе, 22">Кофе, 22</option>
             <option value="Кофе, 19">Кофе, 19</option>
             <option value="Кофе, -106">-106</option>
          </select>
        </div>

        <div class="signal-controls-row">
            <button type="button" :class="['signal-info-button', selectedGender === 'female' ? 'signal-info-female' : 'signal-info-male']" @click="showInfoModal = true">Что это?</button>
            <div class="signal-gender-switch">
                <div class="signal-gender-container">
                    <div :class="['signal-gender-btn', 'signal-gender-female', {'is-active': selectedGender === 'female'}]" @click="onGenderClick('female')"></div>
                    <div :class="['signal-gender-btn', 'signal-gender-male', {'is-active': selectedGender === 'male'}]" @click="onGenderClick('male')"></div>
                </div>
            </div>
        </div>

        <!-- Модальное окно с информацией -->
        <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
            <div class="modal">
                <div class="modal-title">О системе</div>
                <div class="modal-body">Это новая система сбора обратной связи, подробнее можно прочитать в <a href="https://cffx.ru/signals.html" target="_blank" class="modal-link">статье</a>.</div>
                <div class="modal-footer">
                    <button type="button" class="modal-ok" @click="showInfoModal = false">Понятно</button>
                </div>
            </div>
        </div>

        <!-- Блок Эмоций (ОСТАВЛЕН) -->
        <div class="signal-form-section">
            <div :class="['signal-question-block', genderClass]" style="--accent-color: #A972FF;">
                <p class="signal-direction-label">Что вы почувствовали?</p>
                <div class="signal-rotating-phrase-container">
                    <transition name="fade" mode="out-in">
                        <p :key="currentQuestion1" class="signal-question-label">{{ currentQuestion1 }}</p>
                    </transition>
                </div>
                <textarea v-model="form.emotionalRelease" @focus="startRotation(1)" rows="3" placeholder="Я почувствовал(а)..."></textarea>
                <div class="signal-suggestions-container">
                    <div v-for="suggestion in currentSuggestions.emotions" :key="suggestion" class="signal-suggestion-bubble signal-emotion-bubble" @click="selectSuggestion('emotionalRelease', suggestion, 'emotions')">{{ suggestion }}</div>
                    <div v-if="!isInitialSuggestions('emotions')" class="signal-suggestion-bubble signal-reset-bubble signal-emotion-bubble" @click="resetSuggestions('emotions')">↩</div>
                </div>
                <p class="signal-example-hint" v-html="'Например: <b>разочарование</b>, <b>недоумение</b>'"></p>
            </div>
        </div>

        <!-- Блок Фактов (УДАЛЁН) -->
        <!-- Блок Решений (УДАЛЁН) -->
      </div>
      
      <div class="signal-section-divider"><span>↓</span></div>
      
      <!-- Секция персональных данных (УДАЛЕНА) -->

      <!-- Футер с кнопкой -->
      <div class="signal-form-footer">
        <div class="signal-button-section">
          <button type="submit" class="signal-submit-btn" :disabled="!isFormValid || isSubmitting">
            {{ isSubmitting ? 'Отправляю…' : 'Отправить' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue';

// --- Состояние формы (сокращено) ---
const form = reactive({
  coffeeShopAddress: '',
  emotionalRelease: '',
});

// --- Системные состояния ---
const isSubmitting = ref(false);
const formSubmitted = ref(false);
const submittedTime = ref(null);
const rawTicketNumber = ref(null);
const formattedTicketNumber = ref(null);
const currentDate = ref('');
const activeRotator = ref(0);
const selectedGender = ref('female');
const showInfoModal = ref(false);
const genderClass = computed(() => (selectedGender.value === 'female' ? 'gender-female' : 'gender-male'));

// --- Логика подсказок (сокращена) ---
const baseSuggestions = {
  female: {
    emotions: { initial: ["разочарование", "недоумение", "радость", "удивление", "спокойствие", "благодарность", "тревогу", "раздражение", "любопытство"], /* ... */ },
  },
  male: {
    emotions: { initial: ["досаду", "непонимание", "удовлетворение", "интерес", "спокойствие", "признательность", "беспокойство", "раздражение", "любопытство"], /* ... */ },
  },
  common: {
    emotions: { /* ... */ },
    // Объекты facts и solutions удалены
  }
};

const suggestions = computed(() => {
    const gender = selectedGender.value;
    return {
        emotions: { ...baseSuggestions[gender].emotions, ...baseSuggestions.common.emotions },
    };
});

const currentSuggestions = reactive({ emotions: [] });
const selectedSuggestions = reactive({ emotions: [] });
const branchCounters = reactive({ emotions: 0 });

// --- Логика смены вопросов (сокращена) ---
const phrasesForQuestion1 = ["Что вы почувствовали?", "Какая эмоция была основной?", "Опишите свои ощущения."];
const currentQuestion1 = ref(phrasesForQuestion1[0]);
let rotationInterval = null;
let currentQuestionIndex1 = 0;

function startRotation(questionNum) {
    stopRotation();
    activeRotator.value = questionNum;
    rotationInterval = setInterval(() => {
        if (questionNum === 1) {
            currentQuestionIndex1 = (currentQuestionIndex1 + 1) % phrasesForQuestion1.length;
            currentQuestion1.value = phrasesForQuestion1[currentQuestionIndex1];
        }
    }, 3000);
}

function stopRotation() {
    clearInterval(rotationInterval);
    activeRotator.value = 0;
}

// --- Функции для работы с подсказками (без изменений) ---
function initializeSuggestions() {
    currentSuggestions.emotions = [...suggestions.value.emotions.initial];
}
function onGenderClick(gender) {
    selectedGender.value = gender;
    currentSuggestions.emotions = [...suggestions.value.emotions.initial];
    selectedSuggestions.emotions = [];
    branchCounters.emotions = 0;
}
function isInitialSuggestions(suggestionType) {
    return JSON.stringify(currentSuggestions[suggestionType]) === JSON.stringify(suggestions.value[suggestionType].initial);
}
function resetSuggestions(suggestionType) {
    currentSuggestions[suggestionType] = [...suggestions.value[suggestionType].initial];
}
function selectSuggestion(fieldName, suggestion, suggestionType) {
    const currentText = form[fieldName].trim();
    const isNewBranch = isInitialSuggestions(suggestionType);
    if (currentText) {
        form[fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    } else {
        form[fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    }
}

// --- Валидация и отправка (сокращены) ---
const isFormValid = computed(() => {
  return form.coffeeShopAddress.trim() && form.emotionalRelease.trim();
});

async function submitForm() {
  if (!isFormValid.value) return;
  isSubmitting.value = true;
  
  const now = new Date();
  submittedTime.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
  let clientId = localStorage.getItem('signalclientid') || ('client_' + Math.random().toString(36).substring(2, 15) + Date.now());
  localStorage.setItem('signalclientid', clientId);

  const APIENDPOINT = 'https://script.google.com/macros/s/AKfycbyO-bEv334omRz4i9Dsa4QRMQqx5Wj-67nIbEtLT6suK6MJu7myE1gpjGl7Gc7w0IeeNg/exec';
  const formData = new FormData();

  formData.append('referer', window.location.origin);
  formData.append('clientId', clientId);
  formData.append('ticketNumber', formattedTicketNumber.value);
  formData.append('date', currentDate.value);
  formData.append('submitted', submittedTime.value);
  formData.append('coffeehouse', form.coffeeShopAddress);
  formData.append('emotionalRelease', form.emotionalRelease);
  // Поля factualAnalysis, constructiveSuggestions, name, telegram удалены из отправки

  try {
    const response = await fetch(APIENDPOINT, { method: 'POST', body: formData });
    const result = await response.json();
    if (result.status === 'success' || result.processed) {
      console.log('Form submitted successfully:', result);
      formSubmitted.value = true;
    } else {
      throw new Error(result.message || 'Server error');
    }
  } catch (error) {
    console.error('Submission Error:', error);
    alert('Ошибка при отправке. Пожалуйста, попробуйте снова.');
  } finally {
    isSubmitting.value = false;
  }
}

// --- Хуки жизненного цикла ---
onMounted(() => {
  rawTicketNumber.value = String(Math.floor(Math.random() * 900000) + 100000);
  formattedTicketNumber.value = rawTicketNumber.value.slice(0, 3) + '-' + rawTicketNumber.value.slice(3);
  
  const now = new Date();
  currentDate.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  initializeSuggestions();
});

onUnmounted(() => {
  stopRotation();
});

watch(selectedGender, () => {
    initializeSuggestions();
});

</script>

<style scoped>
:root {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --signal-font-mono: "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace;
}

.signal-form-wrapper {
  font-family: var(--signal-font-sans);
  max-width: 640px;
  margin: 40px auto;
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.signal-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2c2c2f;
}

.signal-form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.signal-tech-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--signal-font-mono);
  font-size: 0.9rem;
  color: #888;
}

.signal-ticket-display {
  background-color: #2a2a2e;
  color: #9b7fb7;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  letter-spacing: 1px;
  font-family: var(--signal-font-mono);
}

.signal-form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.signal-personal-data-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.signal-question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
  border-left: 4px solid var(--accent-color, #444);
}

.signal-question-block.signal-compact {
  padding: 1rem;
  border-left-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.signal-question-help {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.signal-rotating-phrase-container {
  height: 52px;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}

.signal-question-label {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  color: #f0f0f0;
  line-height: 1.3;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.signal-address-select {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--signal-font-sans);
}

.signal-address-select:focus {
  outline: none;
  border-color: #B39DC8;
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px rgba(179, 157, 200, 0.2);
}

.signal-address-select option {
  background-color: #2a2a2e;
  color: #f0f0f0;
}

.signal-address-select option:disabled {
  color: #666;
}

.signal-separator-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, #2c2c2f 20%, #2c2c2f 80%, transparent);
  margin: 2rem 0 1.5rem 0;
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

.signal-gender-btn:hover {
  opacity: 0.7;
  transform: scale(1.05);
}

.signal-question-block.gender-female {
  border-left-color: #ff69b4 !important;
}

.signal-question-block.gender-female .signal-emotion-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-question-block.gender-female .signal-emotion-bubble:hover {
  background: #ff69b4;
  color: #fff;
}

.signal-question-block.gender-female .signal-fact-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-question-block.gender-female .signal-fact-bubble:hover {
  background: #ff69b4;
  color: #fff;
}

.signal-question-block.gender-female .signal-solution-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-question-block.gender-female .signal-solution-bubble:hover {
  background: #ff69b4;
  color: #fff;
}

.signal-question-block.gender-male {
  border-left-color: #87ceeb !important;
}

.signal-question-block.gender-male .signal-emotion-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-question-block.gender-male .signal-emotion-bubble:hover {
  background: #87ceeb;
  color: #000;
}

.signal-question-block.gender-female textarea:focus {
  border-color: #ff69b4 !important;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2) !important;
}

.signal-question-block.gender-male textarea:focus {
  border-color: #87ceeb !important;
  box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2) !important;
}

.signal-question-block.gender-male .signal-fact-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-question-block.gender-male .signal-fact-bubble:hover {
  background: #87ceeb;
  color: #000;
}

.signal-question-block.gender-male .signal-solution-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-question-block.gender-male .signal-solution-bubble:hover {
  background: #87ceeb;
  color: #000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.modal {
  background-color: #1E1E20;
  border: 1px solid #2c2c2f;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
}

.modal-body {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-link {
  color: #B39DC8;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.modal-link:hover {
  color: #C5B3D9;
  border-bottom-color: #C5B3D9;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.modal-ok {
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 50%, #C5B3D9 100%);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-size: 200% auto;
  background-position: 25% 50%;
}

.modal-ok:hover {
  background-position: 75% 50%;
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(155, 127, 183, 0.4);
}

textarea,
input {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--signal-font-sans);
}

textarea:focus,
input:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mixin(in srgb, var(--accent-color) 20%, transparent);
}

input#name:focus,
input#telegramPhone:focus {
  border-color: #B39DC8 !important;
  box-shadow: 0 0 0 3px rgba(179, 157, 200, 0.2) !important;
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
  transform: scale(1.05);
}

.signal-fact-bubble {
  background: rgba(61, 220, 132, 0.1);
  border-color: rgba(61, 220, 132, 0.3);
  color: #3DDC84;
}

.signal-fact-bubble:hover {
  background: #3DDC84;
  color: #000;
  transform: scale(1.05);
}

.signal-solution-bubble {
  background: rgba(255, 184, 0, 0.1);
  border-color: rgba(255, 184, 0, 0.3);
  color: #FFB800;
}

.signal-solution-bubble:hover {
  background: #FFB800;
  color: #000;
  transform: scale(1.05);
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
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
}

.signal-section-divider {
  margin: 2.5rem 0;
  text-align: center;
  position: relative;
  color: #888;
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.signal-section-divider::before,
.signal-section-divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: calc(50% - 90px);
  height: 1px;
  background: #2c2c2f;
}

.signal-section-divider::before {
  left: 0;
}

.signal-section-divider::after {
  right: 0;
}

.signal-form-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #2c2c2f;
  display: grid;
  grid-template-areas:
    "terms"
    "button";
  gap: 1.5rem;
  width: 100%;
}

.signal-terms-section {
  grid-area: terms;
  width: 100%;
}

.signal-button-section {
  grid-area: button;
  width: 100%;
}

.signal-checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.signal-checkbox-group input {
  accent-color: #B39DC8;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.signal-checkbox-group label {
  font-size: 0.85rem;
  color: #999;
  line-height: 1.4;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.signal-policy-link {
  color: #b0b0b0;
  text-decoration: none !important;
  border-bottom: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.signal-policy-link:hover {
  text-decoration: underline !important;
  border-bottom: none !important;
  color: #C5F946;
}

.signal-policy-link:focus {
  text-decoration: none !important;
  border-bottom: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.signal-policy-link:visited {
  color: #b0b0b0;
  text-decoration: none !important;
  border-bottom: none !important;
}

.signal-policy-link:active {
  text-decoration: none !important;
  border-bottom: none !important;
}

.signal-checkbox-group a {
  text-decoration: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
  outline: none !important;
}

.signal-checkbox-group a:hover {
  text-decoration: underline !important;
  border-bottom: none !important;
}

.signal-submit-btn {
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 50%, #C5B3D9 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  padding: 0.9rem 2rem;
  cursor: pointer;
  transition: all 0.4s ease-out;
  background-size: 200% auto;
  background-position: 25% 50%;
  width: 100%;
  display: block;
}

.signal-submit-btn:hover:not(:disabled) {
  background-position: 75% 50%;
  transform: scale(1.02);
  box-shadow: 0 10px 20px -5px rgba(155, 127, 183, 0.4);
}

.signal-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ЭКРАН УСПЕХА */
.signal-success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem 2rem 2rem;
  animation: fadeIn 0.5s ease-out;
}

.signal-success-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.signal-success-text p {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
}

/* === НОВЫЕ СТИЛИ КНОПОК УСПЕХА === */

/* Контейнер для двух кнопок */
.signal-success-actions {
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;
  width: 100%;
}

/* Общие стили для обеих кнопок */
.signal-success-actions .signal-telegram-button,
.signal-success-actions .signal-share-btn {
  flex: 1 1 0; /* Делим ширину поровну */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

/* 1. Кнопка "Получить ответ" */
.signal-telegram-button {
  background-color: #9b7fb7;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Убираем артефакты VitePress и фиксируем цвет текста при ховере */
.signal-success-message .signal-telegram-button,
.signal-success-message .signal-telegram-button:hover {
  text-decoration: none !important;
  border-bottom: none !important;
  color: #ffffff !important;
}

.signal-telegram-button:hover {
  background-color: #b399c8; /* Только осветление фона */
  transform: scale(1.02);
}

/* 2. Кнопка "Поделиться в Истории" */
.signal-share-btn {
  background-color: #3a3a3e;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.signal-share-btn:hover {
  background-color: #4a4a4f;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
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
  color: #B39DC8;
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

/* АДАПТИВ */
@media (max-width: 768px) {
  .signal-form-wrapper {
    padding: 1.5rem;
  }

  .signal-personal-data-section {
    grid-template-columns: 1fr;
  }

  .signal-form-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }

  .signal-form-title {
    text-align: center;
  }

  .signal-tech-info {
    justify-content: center;
  }

  .signal-rotating-phrase-container {
    height: 65px;
  }

  .signal-question-label {
    font-size: 0.95rem;
  }

  .signal-suggestions-container {
    gap: 0.4rem;
  }

  .signal-suggestion-bubble {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
  }

  .signal-controls-row {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .signal-gender-switch {
    justify-content: center;
  }

  .signal-checkbox-group {
    gap: 0.5rem;
  }

  .signal-checkbox-group input {
    width: 16px;
    height: 16px;
  }

  .signal-checkbox-group label {
    font-size: 0.8rem;
  }

  /* АДАПТИВ КНОПОК УСПЕХА */
  .signal-success-actions {
    flex-direction: column;
  }

  .signal-success-actions .signal-telegram-button,
  .signal-success-actions .signal-share-btn {
    width: 100%;
  }
}
</style>
