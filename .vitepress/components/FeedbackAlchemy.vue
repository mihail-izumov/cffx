<template>
  <div class="form-wrapper">
    <!-- Сообщение об успехе -->
    <div v-if="formSubmitted" class="success-message">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="success-text">
        <h3>Ваш Сигнал запущен в работу</h3>
        <p>Чтобы активировать ваш Сигнал, откройте диалог с ассистентом Анной в Telegram и отправьте ей ваш уникальный код:</p>
        <div class="ticket-code-container">
          <span class="ticket-code">{{ formattedTicketNumber }}</span>
        </div>
        <a :href="'https://t.me/YourBotUsername'" target="_blank" class="telegram-button">Перейти в диалог с Анной</a>
      </div>
    </div>

    <!-- Основная форма -->
    <form v-else @submit.prevent="submitForm">
      
      <!-- Заголовок с номером сигнала -->
      <div class="form-header">
        <h2 class="form-title">Новый Сигнал</h2>
        <div class="ticket-display">#{{ formattedTicketNumber }}</div>
      </div>

      <!-- Секция с вопросами -->
      <div class="form-section">
        <div class="question-block" style="--accent-color: #A972FF;">
          <label class="direction-label">Эмоции и чувства</label>
          <RotatingPhrases :phrases="phrasesForQuestion1" :is-active="activeRotator === 1" />
          <textarea v-model="form.emotionalRelease" @focus="activeRotator = 1" rows="3" placeholder="Опишите свои чувства и впечатления..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»'"></p>
        </div>
        <div class="question-block" style="--accent-color: #3DDC84;">
          <label class="direction-label">Детали проблемы</label>
          <RotatingPhrases :phrases="phrasesForQuestion2" :is-active="activeRotator === 2" />
          <textarea v-model="form.factualAnalysis" @focus="activeRotator = 2" rows="3" placeholder="Опишите факты: что, когда и где произошло..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Заказ на два капучино <b>ждал 22 минуты</b>, хотя в кафе был почти один»'"></p>
        </div>
        <div class="question-block" style="--accent-color: #FFB800;">
          <label class="direction-label">Предложение решения</label>
          <RotatingPhrases :phrases="phrasesForQuestion3" :is-active="activeRotator === 3" />
          <textarea v-model="form.constructiveSuggestions" @focus="activeRotator = 3" rows="3" placeholder="Предложите, как это можно исправить..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Добавить на кассу <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»'"></p>
        </div>
      </div>
      
      <div class="section-divider"><span>Останемся на связи?</span></div>

      <!-- Секция с личными данными -->
      <div class="form-section personal-data-section">
        <div class="question-block compact">
          <label class="question-label">Ваше имя</label>
          <p class="question-help">Для персонального общения с ИИ-ассистентом Анной.</p>
          <input type="text" id="name" v-model="form.name" @focus="activeRotator = 0" placeholder="Как к вам обращаться?" required>
        </div>
        <div class="question-block compact">
          <label class="question-label">Ваш контакт в Telegram</label>
          <p class="question-help">Чтобы получать обновления и видеть результат.</p>
          <input type="tel" id="telegramPhone" v-model="form.telegramPhone" @focus="activeRotator = 0" placeholder="+7 (___) ___-__-__" required>
        </div>
      </div>

      <!-- Футер -->
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
import { reactive, ref, computed, h, onMounted, onUnmounted, watch, Transition } from 'vue';

const FADE_DURATION_MS = 800;

const RotatingPhrases = {
  props: { phrases: Array, isActive: Boolean, rotationIntervalMs: { type: Number, default: 4500 } },
  setup(props) {
    const currentPhraseIndex = ref(0);
    let intervalId = null;
    const startRotation = () => {
      stopRotation();
      if (props.phrases && props.phrases.length > 1) {
        intervalId = setInterval(() => { currentPhraseIndex.value = (currentPhraseIndex.value + 1) % props.phrases.length; }, props.rotationIntervalMs);
      }
    };
    const stopRotation = () => clearInterval(intervalId);
    watch(() => props.isActive, (newValue) => { if (newValue) startRotation(); else stopRotation(); }, { immediate: true });
    onUnmounted(stopRotation);
    return () => h('div', { class: 'rotating-phrase-container' }, [ h(Transition, { name: 'fade', mode: 'out-in' }, { default: () => h('p', { key: currentPhraseIndex.value, class: 'rotating-phrase' }, props.phrases[currentPhraseIndex.value]) }) ]);
  }
};

const phrasesForQuestion1 = ['Что вы почувствовали в первую очередь?', 'Какое впечатление осталось после визита?', 'Оправдались ли ваши ожидания?'];
const phrasesForQuestion2 = ['Что именно произошло? Опишите ситуацию.', 'Кто-то из персонала был вовлечен?', 'Это связано с продуктом, сервисом или атмосферой?'];
const phrasesForQuestion3 = ['Что могло бы предотвратить эту ситуацию?', 'Как бы вы поступили на месте менеджера?', 'Какое одно изменение сделало бы ваш опыт идеальным?'];

const activeRotator = ref(0);
const form = reactive({ emotionalRelease: '', factualAnalysis: '', constructiveSuggestions: '', name: '', telegramPhone: '', consent: false });
const isSubmitting = ref(false);
const formSubmitted = ref(false);
const rawTicketNumber = ref(null);
const formattedTicketNumber = ref(null);

onMounted(() => {
  rawTicketNumber.value = String(Date.now()).slice(-6);
  formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3, 6)}`;
});

const isFormValid = computed(() => form.emotionalRelease.trim() && form.factualAnalysis.trim() && form.constructiveSuggestions.trim() && form.name.trim() && form.telegramPhone.trim() && form.consent);

async function submitForm() {
  if (!isFormValid.value) return;
  isSubmitting.value = true;
  const formData = { _subject: `Новый Сигнал #${rawTicketNumber.value} от ${form.name}`, "Код тикета": rawTicketNumber.value, "Имя": form.name, "1. Эмоции": form.emotionalRelease, "2. Детали": form.factualAnalysis, "3. Решение": form.constructiveSuggestions, "Контакт в Telegram": form.telegramPhone };
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
:root { --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }
.form-wrapper { font-family: var(--font-family); max-width: 640px; margin: 40px auto; background-color: #1E1E20; border-radius: 24px; padding: 2rem; color: #f0f0f0; border: 1px solid #2c2c2f; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }

.form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.form-title { font-size: 1.5rem; font-weight: 600; color: #fff; margin: 0; }
.ticket-display { background-color: #2a2a2e; color: #C5F946; font-family: 'monospace'; font-weight: 700; padding: 0.5rem 1rem; border-radius: 12px; font-size: 1rem; letter-spacing: 1px; }

.form-section { display: flex; flex-direction: column; gap: 1.5rem; }
.personal-data-section { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.question-block { background-color: #2a2a2e; border-radius: 16px; padding: 1.25rem; border: 1px solid #3a3a3e; border-left: 4px solid var(--accent-color, #444); }
.question-block.compact { padding: 1rem; border-left-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
.direction-label { font-weight: 600; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: block; }
.question-label { font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; display: block; }
.question-help { font-size: 0.8rem; color: #888; margin-bottom: 0.75rem; line-height: 1.4; }

.rotating-phrase-container { min-height: 20px; margin-bottom: 0.75rem; position: relative; }
.rotating-phrase { font-size: 0.9rem; color: #999; margin: 0; font-style: italic; }
.fade-enter-active, .fade-leave-active { transition: opacity v-bind("`${FADE_DURATION_MS / 1000}s`") ease-in-out; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-leave-active { position: absolute; }

textarea, input { width: 100%; background-color: #242426; border: 1px solid #444; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.95rem; color: #f0f0f0; transition: all 0.3s ease; font-family: var(--font-family); }
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

.success-message { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2rem; animation: fadeIn 0.5s ease-out; }
.success-icon { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(90deg, #A972FF, #00C2FF, #FFB800); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; animation: popIn 0.5s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) backwards; }
.success-icon svg { width: 32px; height: 32px; color: white; }
.success-text h3 { font-size: 1.5rem; font-weight: 600; color: #fff; margin: 0 0 0.5rem 0; }
.success-text p { color: #b0b0b0; line-height: 1.6; margin: 0; }
.ticket-code-container { background-color: #2a2a2e; border: 1px solid #444; border-radius: 12px; padding: 1rem; margin: 1.5rem auto; max-width: 250px; }
.ticket-code { font-family: 'monospace'; font-size: 1.25rem; font-weight: 700; color: #C5F946; letter-spacing: 2px; }
.telegram-button { display: inline-block; background-color: #0088cc; color: white; text-decoration: none; padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 600; margin-top: 1rem; transition: background-color 0.3s, transform 0.3s; }
.telegram-button:hover { background-color: #0099e6; transform: scale(1.05); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
@media (max-width: 768px) { .form-wrapper { padding: 1.5rem; } .personal-data-section { grid-template-columns: 1fr; } .form-footer { flex-direction: column; align-items: stretch; gap: 1rem; } .submit-btn { width: 100%; } }
</style>
