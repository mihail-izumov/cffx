<template>
  <div class="form-wrapper">
    <!-- Успешное сообщение -->
    <div v-if="formSubmitted" class="success-message">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="success-text">
        <h3>Сигнал принят!</h3>
        <p>Спасибо, что помогаете стать лучше. Ассистент Анна изучит ваш отзыв и свяжется с вами в Telegram по итогам.</p>
      </div>
    </div>

    <!-- Основная форма -->
    <form v-else @submit.prevent="submitForm">
      
      <!-- СЕКЦИЯ 1: ОСНОВНЫЕ ВОПРОСЫ -->
      <div class="form-section">
        <div class="question-block" style="--accent-color: #A972FF;">
          <label class="question-label">1. Что вас расстроило сегодня?</label>
          <RotatingPhrases :phrases="phrasesForQuestion1" />
          <textarea v-model="form.emotionalRelease" rows="3" placeholder="Опишите свои чувства и впечатления..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»'"></p>
        </div>

        <div class="question-block" style="--accent-color: #3DDC84;">
          <label class="question-label">2. Что конкретно пошло не так?</label>
          <RotatingPhrases :phrases="phrasesForQuestion2" />
          <textarea v-model="form.factualAnalysis" rows="3" placeholder="Опишите факты: что, когда и где произошло..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Заказ на два капучино <b>ждал 22 минуты</b>, хотя в кафе был почти один»'"></p>
        </div>

        <div class="question-block" style="--accent-color: #FFB800;">
          <label class="question-label">3. Как бы вы это исправили?</label>
          <RotatingPhrases :phrases="phrasesForQuestion3" />
          <textarea v-model="form.constructiveSuggestions" rows="3" placeholder="Предложите решение..." required></textarea>
          <p class="example-hint" v-html="'Пример: «Добавить на кассу <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»'"></p>
        </div>
      </div>
      
      <div class="section-divider"><span>Останемся на связи?</span></div>

      <!-- СЕКЦИЯ 2: ЛИЧНЫЕ ДАННЫЕ -->
      <div class="form-section personal-data-section">
        <div class="question-block compact">
          <label for="name" class="question-label">Ваше имя</label>
          <p class="question-help">Для персонального общения с ИИ-ассистентом Анной.</p>
          <input type="text" id="name" v-model="form.name" placeholder="Как к вам обращаться?" required>
        </div>
        
        <div class="question-block compact">
          <label for="telegramPhone" class="question-label">Ваш контакт в Telegram</label>
          <p class="question-help">Чтобы получать обновления и видеть результат.</p>
          <input type="tel" id="telegramPhone" v-model="form.telegramPhone" placeholder="+7 (___) ___-__-__" required>
        </div>
      </div>

      <!-- ФУТЕР -->
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
import { reactive, ref, computed, h, onMounted, onUnmounted, Transition } from 'vue';

// --- Компонент анимированных подсказок (исправленная версия) ---
const RotatingPhrases = {
  props: { phrases: Array, rotationIntervalMs: { type: Number, default: 4000 } },
  setup(props) {
    const currentPhraseIndex = ref(0);
    let intervalId = null;
    const cyclePhrases = () => { currentPhraseIndex.value = (currentPhraseIndex.value + 1) % props.phrases.length; };
    onMounted(() => { if (props.phrases && props.phrases.length > 1) { intervalId = setInterval(cyclePhrases, props.rotationIntervalMs); } });
    onUnmounted(() => { clearInterval(intervalId); });
    // Используем слоты в render-функции h() - это самый надежный способ для Transitions
    return () => h('div', { class: 'rotating-phrase-container' }, [
      h(Transition, { name: 'fade-up', mode: 'out-in' }, {
        default: () => h('p', { key: currentPhraseIndex.value, class: 'rotating-phrase' }, props.phrases[currentPhraseIndex.value])
      })
    ]);
  }
};

const phrasesForQuestion1 = ['Что вы почувствовали в первую очередь?', 'Какое впечатление осталось после визита?', 'Оправдались ли ваши ожидания?'];
const phrasesForQuestion2 = ['Что именно произошло? Опишите ситуацию.', 'Кто-то из персонала был вовлечен?', 'Это связано с продуктом, сервисом или атмосферой?'];
const phrasesForQuestion3 = ['Что могло бы предотвратить эту ситуацию?', 'Как бы вы поступили на месте менеджера?', 'Какое одно изменение сделало бы ваш опыт идеальным?'];

const form = reactive({ emotionalRelease: '', factualAnalysis: '', constructiveSuggestions: '', name: '', telegramPhone: '', consent: false });
const isSubmitting = ref(false);
const formSubmitted = ref(false);

const isFormValid = computed(() => form.emotionalRelease.trim() && form.factualAnalysis.trim() && form.constructiveSuggestions.trim() && form.name.trim() && form.telegramPhone.trim() && form.consent);

async function submitForm() {
  if (!isFormValid.value) return;
  isSubmitting.value = true;
  const formData = { _subject: `Новый Сигнал от ${form.name}`, "Имя": form.name, "1. Эмоции": form.emotionalRelease, "2. Факты": form.factualAnalysis, "3. Предложения": form.constructiveSuggestions, "Контакт в Telegram": form.telegramPhone };
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
.form-section { display: flex; flex-direction: column; gap: 1.5rem; }
.personal-data-section { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.question-block { background-color: #2a2a2e; border-radius: 16px; padding: 1.25rem; border: 1px solid #3a3a3e; border-left: 4px solid var(--accent-color, #444); }
.question-block.compact { padding: 1rem; border-left-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
.question-label { font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; display: block; }
.question-help { font-size: 0.8rem; color: #888; margin-bottom: 0.75rem; line-height: 1.4; }

.rotating-phrase-container { min-height: 20px; margin-bottom: 0.75rem; position: relative; }
.rotating-phrase { font-size: 0.9rem; color: #999; margin: 0; font-style: italic; }
.fade-up-enter-active, .fade-up-leave-active { transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out; }
.fade-up-enter-from { opacity: 0; transform: translateY(10px); }
.fade-up-leave-to { opacity: 0; transform: translateY(-10px); }
.fade-up-leave-active { position: absolute; width: 100%; }

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

/* Улучшенная анимация кнопки "Вжух!" */
.submit-btn { background: linear-gradient(90deg, #A972FF 0%, #00C2FF 50%, #FFB800 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 12px; padding: 0.8rem 2rem; cursor: pointer; transition: all 0.4s ease-out; background-size: 200% 200%; background-position: 25% 50%; }
.submit-btn:hover:not(:disabled) { background-position: 75% 50%; transform: scale(1.03); box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.success-message { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2rem; animation: fadeIn 0.5s ease-out; }
.success-icon { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(90deg, #A972FF, #00C2FF, #FFB800); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; animation: popIn 0.5s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) backwards; }
.success-icon svg { width: 32px; height: 32px; color: white; }
.success-text h3 { font-size: 1.5rem; font-weight: 600; color: #fff; margin: 0 0 0.5rem 0; }
.success-text p { color: #b0b0b0; line-height: 1.6; margin: 0; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
@media (max-width: 768px) { .form-wrapper { padding: 1.5rem; } .personal-data-section { grid-template-columns: 1fr; } .form-footer { flex-direction: column; align-items: stretch; gap: 1rem; } .submit-btn { width: 100%; } }
</style>
