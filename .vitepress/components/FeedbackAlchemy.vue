<template>
  <div class="form-wrapper">
    <!-- Успешное сообщение (стили тоже обновлены) -->
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
      
      <!-- === СЕКЦИЯ 1: ОСНОВНЫЕ ВОПРОСЫ === -->
      <div class="form-section">
        <div class="question-block" style="--accent-color: #A972FF;">
          <label class="question-label">1. Что вас расстроило сегодня?</label>
          <RotatingPhrases :phrases="phrasesForQuestion1" :rotation-interval-ms="5000" />
          <textarea v-model="form.emotionalRelease" rows="3" placeholder="Пример: «Кофе был холодный, а бариста не обратил внимания»" required></textarea>
        </div>

        <div class="question-block" style="--accent-color: #3DDC84;">
          <label class="question-label">2. Что конкретно пошло не так?</label>
          <RotatingPhrases :phrases="phrasesForQuestion2" :rotation-interval-ms="5500" />
          <textarea v-model="form.factualAnalysis" rows="3" placeholder="Пример: «Заказ на два капучино ждал 22 минуты, хотя в кафе был почти один»" required></textarea>
        </div>

        <div class="question-block" style="--accent-color: #FFB800;">
          <label class="question-label">3. Как бы вы это исправили?</label>
          <RotatingPhrases :phrases="phrasesForQuestion3" :rotation-interval-ms="6000" />
          <textarea v-model="form.constructiveSuggestions" rows="3" placeholder="Пример: «Добавить на кассу таймер, чтобы бариста видел время ожидания заказа»" required></textarea>
        </div>
      </div>
      
      <!-- Визуальный разделитель -->
      <div class="section-divider">
        <span>Личные данные</span>
      </div>

      <!-- === СЕКЦИЯ 2: ЛИЧНЫЕ ДАННЫЕ === -->
      <div class="form-section personal-data-section">
        <div class="question-block compact">
          <label for="name" class="question-label">Ваше имя</label>
          <p class="question-help">Чтобы мы знали, как к вам обращаться.</p>
          <input type="text" id="name" v-model="form.name" placeholder="Иван" required>
        </div>
        
        <div class="question-block compact">
          <label for="telegramPhone" class="question-label">Ваш контакт в Telegram</label>
          <p class="question-help">Сюда ИИ-ассистент Анна пришлёт результат.</p>
          <input type="tel" id="telegramPhone" v-model="form.telegramPhone" placeholder="+7 (999) 000-00-00" required>
        </div>
      </div>

      <!-- Блок согласия и кнопка -->
      <div class="form-footer">
        <div class="checkbox-group">
          <input type="checkbox" id="consent" v-model="form.consent" required>
          <label for="consent">
            Я согласен с <a href="/terms/policy" target="_blank" class="policy-link">политикой конфиденциальности</a>.
          </label>
        </div>
        <button type="submit" class="submit-btn" :disabled="!isFormValid || isSubmitting">
          {{ isSubmitting ? 'Отправка...' : 'Отправить Сигнал' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed, h, onMounted, onUnmounted } from 'vue';

// --- Компонент анимированных подсказок (встроен для простоты) ---
const RotatingPhrases = {
  props: {
    phrases: Array,
    rotationIntervalMs: {
      type: Number,
      default: 7000
    }
  },
  setup(props) {
    const currentPhraseIndex = ref(0);
    let intervalId = null;

    const cyclePhrases = () => {
      currentPhraseIndex.value = (currentPhraseIndex.value + 1) % props.phrases.length;
    };

    onMounted(() => {
      if (props.phrases && props.phrases.length > 1) {
        intervalId = setInterval(cyclePhrases, props.rotationIntervalMs);
      }
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });
    
    // Используем render-функцию для большей гибкости
    return () => h('div', { class: 'rotating-phrase-container' }, [
      h('transition', { name: 'fade', mode: 'out-in' }, 
        () => h('p', { key: currentPhraseIndex.value, class: 'rotating-phrase' }, props.phrases[currentPhraseIndex.value])
      )
    ]);
  }
};

// --- Фразы-подсказки для каждого вопроса ---
const phrasesForQuestion1 = [
  'Что вы почувствовали в первую очередь?',
  'Какое впечатление осталось после визита?',
  'Оправдались ли ваши ожидания?',
];
const phrasesForQuestion2 = [
  'Что именно произошло? Опишите ситуацию.',
  'Кто-то из персонала был вовлечен?',
  'Это связано с продуктом, сервисом или атмосферой?',
];
const phrasesForQuestion3 = [
  'Что могло бы предотвратить эту ситуацию?',
  'Как бы вы поступили на месте менеджера?',
  'Какое одно изменение сделало бы ваш опыт идеальным?',
];

// --- Логика основной формы ---
const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  name: '',
  telegramPhone: '',
  consent: false
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

const isFormValid = computed(() => {
  return form.emotionalRelease.trim() &&
         form.factualAnalysis.trim() &&
         form.constructiveSuggestions.trim() &&
         form.name.trim() &&
         form.telegramPhone.trim() &&
         form.consent;
});

async function submitForm() {
  if (!isFormValid.value) return;
  isSubmitting.value = true;

  const formData = {
    _subject: `Новый Сигнал от ${form.name}`,
    "Имя": form.name,
    "1. Эмоции и впечатления": form.emotionalRelease,
    "2. Факты (что пошло не так)": form.factualAnalysis,
    "3. Предложения по исправлению": form.constructiveSuggestions,
    "Контакт в Telegram для ответа": form.telegramPhone,
  };

  try {
    const response = await fetch('https://formspree.io/f/mdkzjopz', { // Ваш URL
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error('Ошибка сервера');
    formSubmitted.value = true;
  } catch (error) {
    console.error('Ошибка отправки:', error);
    alert('Не удалось отправить отзыв. Попробуйте позже.');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* --- ОБЩИЕ СТИЛИ ФОРМЫ --- */
.form-wrapper {
  max-width: 640px;
  margin: 40px auto;
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.personal-data-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

/* --- СТИЛИ БЛОКОВ С ВОПРОСАМИ --- */
.question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
  border-bottom: 4px solid var(--accent-color, #444);
  transition: transform 0.2s ease;
}
.question-block:focus-within {
  transform: translateY(-4px);
  border-color: var(--accent-color);
}
.question-block.compact {
  padding: 1rem;
}

.question-label {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
}

textarea,
input[type="text"],
input[type="tel"] {
  width: 100%;
  background-color: #1E1E20;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  margin-top: 0.75rem;
}
textarea:focus,
input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}
::placeholder {
  color: #666;
  font-style: italic;
}

/* --- СТИЛИ АНИМИРОВАННЫХ ПОДСКАЗОК --- */
.rotating-phrase-container {
  background-color: #333336;
  border-radius: 10px;
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  overflow: hidden;
}
.rotating-phrase {
  font-size: 0.85rem;
  font-weight: 500;
  color: #b0b0b0;
  width: 100%;
  margin: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 1rem;
  width: calc(100% - 2rem);
}

/* --- РАЗДЕЛИТЕЛЬ И ФУТЕР --- */
.section-divider {
  margin: 2.5rem 0;
  text-align: center;
  position: relative;
  color: #777;
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
}
.section-divider::before, .section-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(50% - 60px);
  height: 1px;
  background: linear-gradient(to right, transparent, #444, transparent);
}
.section-divider::before { left: 0; background: linear-gradient(to right, transparent, #444); }
.section-divider::after { right: 0; background: linear-gradient(to left, transparent, #444); }

.form-footer {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.checkbox-group input {
  accent-color: var(--accent-color, #3DDC84);
}
.checkbox-group label {
  font-size: 0.8rem;
  color: #999;
}
.policy-link {
  color: #b0b0b0;
  text-decoration: none;
}
.policy-link:hover { text-decoration: underline; }

.submit-btn {
  background: linear-gradient(45deg, #A972FF, #3DDC84);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* --- УСПЕШНОЕ СООБЩЕНИЕ --- */
.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  animation: fadeIn 0.5s ease-out;
}
.success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(45deg, #A972FF, #3DDC84);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  animation: popIn 0.5s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) backwards;
}
.success-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}
.success-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.5rem 0;
}
.success-text p {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }

@media (max-width: 768px) {
  .form-wrapper { padding: 1.5rem; }
  .personal-data-section { grid-template-columns: 1fr; }
  .form-footer { flex-direction: column; align-items: stretch; }
  .submit-btn { width: 100%; }
}
</style>
