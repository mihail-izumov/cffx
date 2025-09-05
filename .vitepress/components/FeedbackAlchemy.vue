<template>
  <div class="form-wrapper">
    <!-- Экран успешной отправки -->
    <div v-if="formSubmitted" class="success-message">
      <div class="success-text">
        <h3>Все готово!</h3>
        <p>Нажмите на кнопку ниже, чтобы отправить ваш уникальный код ассистенту Анне и активировать ваш запрос.</p>
        <a :href="`https://t.me/Anna_runScale?text=Сигнал%20${rawTicketNumber}`" target="_blank" class="telegram-button">Активировать Сигнал в Telegram</a>
        <a href="/signals#знакомьтесь-–-анна" target="_blank" class="secondary-link">Кто такая Анна и как она работает?</a>
      </div>
    </div>

    <!-- Основная форма -->
    <form v-else @submit.prevent="submitForm">
      <div class="form-header">
        <div class="form-title">Новый Сигнал</div>
        <div class="tech-info">
          <span class="info-item">{{ currentDate }}</span>
          <span class="info-item ticket-display">{{ formattedTicketNumber }}</span>
        </div>
      </div>

      <!-- Секция выбора кофейни -->
      <div class="form-section">
        <div class="question-block compact">
          <label class="question-label">Ваша кофейня "Корж"</label>
          <p class="question-help">Выберите адрес, где произошла ситуация</p>
          <select v-model="form.coffeeShopAddress" class="address-select" required>
            <option value="">Выберите адрес</option>
            <option value="Куйбышева, 103">Куйбышева, 103</option>
            <option value="Революционная, 101В" disabled>Революционная, 101В</option>
            <option value="9 просека 5-я малая линия,3б" disabled>9 просека 5-я малая линия, 3б</option>
            <option value="Льва Толстого, 30Б" disabled>Льва Толстого, 30Б</option>
            <option value="Самарская, 270" disabled>Самарская, 270</option>
            <option value="Дачная, 2к2" disabled>Дачная, 2к2</option>
            <option value="Ульяновская, 19" disabled>Ульяновская, 19</option>
            <option value="Ново-Садовая, 106Б" disabled>Ново-Садовая, 106Б</option>
          </select>
        </div>
      </div>

      <!-- Разделительная линия между адресом и вопросами -->
      <div class="separator-line"></div>

      <!-- Секция с вопросами -->
      <div class="form-section">
        <div class="question-block" style="--accent-color: #A972FF;">
          <p class="direction-label">Эмоции и чувства</p>
          <div class="rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1" class="question-label">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea v-model="form.emotionalRelease" @focus="startRotation(1)" rows="3" placeholder="Опишите свои чувства и впечатления..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»'"></p>
        </div>
        
        <div class="question-block" style="--accent-color: #3DDC84;">
          <p class="direction-label">Детали проблемы</p>
          <div class="rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion2" class="question-label">{{ currentQuestion2 }}</p>
            </transition>
          </div>
          <textarea v-model="form.factualAnalysis" @focus="startRotation(2)" rows="3" placeholder="Опишите факты: что, когда и где произошло..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Заказ на два капучино <b>ждал 22 минуты</b>, хотя в кафе был почти один»'"></p>
        </div>
        
        <div class="question-block" style="--accent-color: #FFB800;">
          <p class="direction-label">Предложение решения</p>
          <div class="rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion3" class="question-label">{{ currentQuestion3 }}</p>
            </transition>
          </div>
          <textarea v-model="form.constructiveSuggestions" @focus="startRotation(3)" rows="3" placeholder="Предложите, как это можно исправить..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Добавить на кассу <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»'"></p>
        </div>
      </div>
      
      <div class="section-divider"><span>Останемся на связи?</span></div>
      <div class="form-section personal-data-section">
        <div class="question-block compact">
          <label class="question-label">Ваше имя</label>
          <p class="question-help">Для персонального общения с ИИ-ассистентом Анной.</p>
          <input type="text" id="name" v-model="form.name" @focus="stopRotation()" placeholder="Как к вам обращаться?" required>
        </div>
        <div class="question-block compact">
          <label class="question-label">Ваш контакт в Telegram</label>
          <p class="question-help">Чтобы получать обновления и видеть результат.</p>
          <input type="tel" id="telegramPhone" v-model="form.telegramPhone" @focus="stopRotation()" placeholder="+7 (___) ___-__-__" required>
        </div>
      </div>
      <div class="form-footer">
        <div class="checkbox-group">
          <input type="checkbox" id="consent" v-model="form.consent" required>
          <label for="consent">Согласен с <a href="/terms/policy" target="_blank" class="policy-link">политикой конфиденциальности</a>.</label>
        </div>
        <button type="submit" class="submit-btn" :disabled="!isFormValid || isSubmitting">
          {{ isSubmitting ? 'Отправка...' : 'Отправить Сигнал' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue';

const form = reactive({ 
  coffeeShopAddress: '',
  emotionalRelease: '', 
  factualAnalysis: '', 
  constructiveSuggestions: '', 
  name: '', 
  telegramPhone: '', 
  consent: false 
});
const isSubmitting = ref(false);
const formSubmitted = ref(false);
const rawTicketNumber = ref(null);
const formattedTicketNumber = ref(null);
const currentDate = ref('');
const activeRotator = ref(0);

const phrasesForQuestion1 = ['Что вас расстроило сегодня?', 'Какое впечатление осталось после визита?', 'Оправдались ли ваши ожидания?'];
const phrasesForQuestion2 = ['Что конкретно пошло не так?', 'Опишите факты: что, когда и где произошло.', 'Кто-то из персонала был вовлечен?'];
const phrasesForQuestion3 = ['Как бы вы это исправили?', 'Что могло бы предотвратить эту ситуацию?', 'Какое одно изменение сделало бы ваш опыт идеальным?'];

const currentQuestion1 = ref(phrasesForQuestion1[0]);
const currentQuestion2 = ref(phrasesForQuestion2[0]);
const currentQuestion3 = ref(phrasesForQuestion3[0]);

let rotationInterval = null;
let currentQuestionIndex1 = 0;
let currentQuestionIndex2 = 0;
let currentQuestionIndex3 = 0;

function startRotation(questionNum) {
  stopRotation();
  activeRotator.value = questionNum;
  
  rotationInterval = setInterval(() => {
    if (questionNum === 1) {
      currentQuestionIndex1 = (currentQuestionIndex1 + 1) % phrasesForQuestion1.length;
      currentQuestion1.value = phrasesForQuestion1[currentQuestionIndex1];
    } else if (questionNum === 2) {
      currentQuestionIndex2 = (currentQuestionIndex2 + 1) % phrasesForQuestion2.length;
      currentQuestion2.value = phrasesForQuestion2[currentQuestionIndex2];
    } else if (questionNum === 3) {
      currentQuestionIndex3 = (currentQuestionIndex3 + 1) % phrasesForQuestion3.length;
      currentQuestion3.value = phrasesForQuestion3[currentQuestionIndex3];
    }
  }, 3000);
}

function stopRotation() {
  clearInterval(rotationInterval);
  activeRotator.value = 0;
}

onMounted(() => {
  rawTicketNumber.value = String(Date.now()).slice(-6);
  formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3, 6)}`;
  const now = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  currentDate.value = now.toLocaleString('ru-RU', options).replace(',', '');
});

onUnmounted(() => {
  stopRotation();
});

const isFormValid = computed(() => 
  form.coffeeShopAddress.trim() && 
  form.emotionalRelease.trim() && 
  form.factualAnalysis.trim() && 
  form.constructiveSuggestions.trim() && 
  form.name.trim() && 
  form.telegramPhone.trim() && 
  form.consent
);

async function submitForm() {
  if (!isFormValid.value) return;
  isSubmitting.value = true;
  
  const formData = { 
    _subject: `Новый Сигнал ${formattedTicketNumber.value} от ${form.name} (Корж, ${form.coffeeShopAddress})`, 
    "Код тикета": rawTicketNumber.value, 
    "Дата": currentDate.value, 
    "Кофейня": `Корж, ${form.coffeeShopAddress}`,
    "Имя": form.name, 
    "1. Эмоции": form.emotionalRelease, 
    "2. Детали": form.factualAnalysis, 
    "3. Решение": form.constructiveSuggestions, 
    "Контакт в Telegram": form.telegramPhone 
  };
  
  try {
    const response = await fetch('https://formspree.io/f/mdkzjopz', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (!response.ok) throw new Error('Ошибка сервера');
    formSubmitted.value = true;
  } catch (error) {
    console.error('Ошибка отправки:', error);
    alert('Не удалось отправить отзыв. Попробуйте позже.');
  } finally { isSubmitting.value = false; }
}
</script>

<style scoped>
:root { --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Source Code Pro', monospace; }
.form-wrapper { font-family: var(--font-sans); max-width: 640px; margin: 40px auto; background-color: #1E1E20; border-radius: 24px; padding: 2rem; color: #f0f0f0; border: 1px solid #2c2c2f; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }
.form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #2c2c2f; }
.form-title { font-size: 1.5rem; font-weight: 600; color: #fff; margin: 0; }
.tech-info { display: flex; align-items: center; gap: 1rem; font-family: var(--font-mono); font-size: 0.9rem; color: #888; }
.ticket-display { background-color: #2a2a2e; color: #C5F946; font-weight: 700; padding: 0.5rem 1rem; border-radius: 12px; letter-spacing: 1px; font-family: var(--font-mono); }
.form-section { display: flex; flex-direction: column; gap: 1.5rem; }
.personal-data-section { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.question-block { background-color: #2a2a2e; border-radius: 16px; padding: 1.25rem; border: 1px solid #3a3a3e; border-left: 4px solid var(--accent-color, #444); }
.question-block.compact { padding: 1rem; border-left-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
.direction-label { font-weight: 600; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: block; }
.question-help { font-size: 0.8rem; color: #888; margin-bottom: 0.75rem; line-height: 1.4; }
.rotating-phrase-container { min-height: 26px; margin-bottom: 0.75rem; }
.question-label { font-weight: 500; font-size: 1rem; margin: 0; color: #f0f0f0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.address-select { width: 100%; background-color: #242426; border: 1px solid #444; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.95rem; color: #f0f0f0; transition: all 0.3s ease; font-family: var(--font-sans); }
.address-select:focus { outline: none; border-color: #C5F946; background-color: #2a2a2e; box-shadow: 0 0 0 3px rgba(197, 249, 70, 0.2); }
.address-select option { background-color: #2a2a2e; color: #f0f0f0; }
.address-select option:disabled { color: #666; }

/* Разделительная линия между адресом и вопросами */
.separator-line { height: 1px; background: linear-gradient(90deg, transparent, #2c2c2f 20%, #2c2c2f 80%, transparent); margin: 2rem 0 1.5rem 0; }

textarea, input { width: 100%; background-color: #242426; border: 1px solid #444; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.95rem; color: #f0f0f0; transition: all 0.3s ease; font-family: var(--font-sans); }
textarea:focus, input:focus { outline: none; border-color: var(--accent-color); background-color: #2a2a2e; box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent); }
::placeholder { color: #666; }
.example-hint { font-size: 0.8rem; color: #777; margin: 0.5rem 0 0 0.25rem; }
.example-hint b { color: #aaa; font-weight: 600; }
.section-divider { margin: 2.5rem 0; text-align: center; position: relative; color: #888; font-weight: 500; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
.section-divider::before, .section-divider::after { content: ''; position: absolute; top: 50%; width: calc(50% - 90px); height: 1px; background: #2c2c2f; }
.section-divider::before { left: 0; } .section-divider::after { right: 0; }
.form-footer { margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
.checkbox-group { display: flex; align-items: center; gap: 0.5rem; }
.checkbox-group input { accent-color: #00C2FF; flex-shrink: 0; }
.checkbox-group label { font-size: 0.8rem; color: #999; line-height: 1.3; }
.policy-link { color: #b0b0b0; text-decoration: none; } .policy-link:hover { text-decoration: underline; }
.submit-btn { background: linear-gradient(90deg, #A972FF 0%, #00C2FF 50%, #FFB800 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 12px; padding: 0.8rem 2rem; cursor: pointer; transition: all 0.4s ease-out; background-size: 200% auto; background-position: 25% 50%; }
.submit-btn:hover:not(:disabled) { background-position: 75% 50%; transform: scale(1.03); box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.success-message { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 4rem 2rem 2rem 2rem; animation: fadeIn 0.5s ease-out; }
.success-text h3 { font-size: 1.5rem; font-weight: 600; color: #fff; margin: 0 0 0.5rem 0; }
.success-text p { color: #b0b0b0; line-height: 1.6; margin: 0; }
.telegram-button { display: inline-block; background-color: #C5F946; color: #000000; text-decoration: none; padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 600; margin-top: 1.5rem; transition: background-color 0.3s, transform 0.3s; }
.telegram-button:hover { background-color: #d6ff6a; transform: scale(1.05); }
.secondary-link { display: block; margin-top: 1.5rem; font-size: 0.85rem; color: #888; text-decoration: none; border-bottom: none !important; transition: color 0.3s; }
.secondary-link:hover { color: #C5F946; text-decoration: underline !important; border-bottom: none !important; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 768px) { .form-wrapper { padding: 1.5rem; } .personal-data-section { grid-template-columns: 1fr; } .form-footer { flex-direction: column; align-items: stretch; gap: 1rem; } .submit-btn { width: 100%; } .form-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; } }
</style>
