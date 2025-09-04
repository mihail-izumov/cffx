<template>
  <div class="form-container">
    <!-- Обновленное сообщение об успешной отправке -->
    <div v-if="formSubmitted" class="success-message">
      <div class="success-icon">
        <span>✓</span>
      </div>
      <div class="success-text">
        <h3>Сигнал принят!</h3>
        <p>Спасибо, что помогаете стать лучше. Ассистент Анна изучит ваш отзыв и свяжется с вами в Telegram по итогам.</p>
      </div>
    </div>

    <!-- Основная форма, скрывается после отправки -->
    <form v-else @submit.prevent="submitForm">
      <div class="header">
        <p>Ваш честный отзыв поможет этому месту стать еще лучше для всех гостей.</p>
      </div>

      <!-- Блок 1: Эмоции -->
      <div class="question-block">
        <label class="question-label">1. Что вас расстроило сегодня?</label>
        <p class="question-help">Опишите свои эмоции и впечатления.</p>
        <textarea v-model="form.emotionalRelease" rows="3" placeholder="Расскажите, что именно вас расстроило..." required></textarea>
      </div>

      <!-- Блок 2: Факты -->
      <div class="question-block">
        <label class="question-label">2. Что конкретно пошло не так?</label>
        <p class="question-help">Опишите факты — что, когда и где произошло.</p>
        <textarea v-model="form.factualAnalysis" rows="3" placeholder="Например: 'Ждал заказ 20 минут'..." required></textarea>
      </div>

      <!-- Блок 3: Предложения -->
      <div class="question-block">
        <label class="question-label">3. Как бы вы это исправили?</label>
        <p class="question-help">Ваше видение — наш план действий.</p>
        <textarea v-model="form.constructiveSuggestions" rows="3" placeholder="Например: 'Добавить таймер для контроля времени'..." required></textarea>
      </div>

      <!-- Блок 4: Оценка важности -->
      <div class="question-block">
        <label class="question-label">4. Насколько это важно для вас?</label>
        <p class="question-help">Это поможет нам верно расставить приоритеты.</p>
        <div class="rating-stars">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ 'active': star <= form.importanceRating }"
            @click="form.importanceRating = star"
            @mouseover="hoverRating = star"
            @mouseleave="hoverRating = 0"
          >
            {{ (hoverRating || form.importanceRating) >= star ? '★' : '☆' }}
          </span>
        </div>
      </div>
      
      <!-- Блок 5: Контактный телефон для Telegram -->
      <div class="question-block">
        <label for="telegramPhone" class="question-label">5. Ваш контакт в Telegram</label>
        <p class="question-help">На этот номер телефона, привязанный к Telegram, наш ИИ-ассистент Анна пришлёт результат разбора вашего отзыва.</p>
        <input type="tel" id="telegramPhone" v-model="form.telegramPhone" placeholder="+7 (999) 000-00-00" required>
      </div>

      <!-- Блок согласия -->
      <div class="checkbox-group">
        <input type="checkbox" id="consent" v-model="form.consent" required>
        <label for="consent">
          Я согласен с <a href="/terms/policy" target="_blank" class="policy-link">политикой конфиденциальности</a> и <a href="/terms/privacy" target="_blank" class="policy-link">обработкой данных</a>.
        </label>
      </div>

      <!-- Кнопка отправки -->
      <button type="submit" class="submit-btn" :disabled="!isFormValid || isSubmitting">
        {{ isSubmitting ? 'Отправка...' : 'Отправить Сигнал' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  importanceRating: 0,
  telegramPhone: '',
  consent: false
});

const hoverRating = ref(0);
const isSubmitting = ref(false);
const formSubmitted = ref(false);

const isFormValid = computed(() => {
  return form.emotionalRelease.trim() &&
         form.factualAnalysis.trim() &&
         form.constructiveSuggestions.trim() &&
         form.importanceRating > 0 &&
         form.telegramPhone.trim() &&
         form.consent;
});

async function submitForm() {
  if (!isFormValid.value) return;

  isSubmitting.value = true;

  // Формируем данные в "плоской" структуре, как ожидает Formspree
  const formData = {
    _subject: `Новый Сигнал (Важность: ${form.importanceRating}/5)`,
    "1. Эмоции и впечатления": form.emotionalRelease,
    "2. Факты (что пошло не так)": form.factualAnalysis,
    "3. Предложения по исправлению": form.constructiveSuggestions,
    "Оценка важности": `${'★'.repeat(form.importanceRating)} (${form.importanceRating}/5)`,
    "Контакт в Telegram для ответа": form.telegramPhone,
    "Согласие на обработку данных": form.consent ? "Да" : "Нет"
  };

  try {
    const response = await fetch('https://formspree.io/f/mdkzjopz', { // Ваш URL Formspree
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Не удалось прочитать ответ сервера' }));
      throw new Error(errorData.error || 'Server error');
    }
    
    formSubmitted.value = true;

  } catch (error) {
    console.error('Ошибка отправки формы:', error);
    alert(`Не удалось отправить отзыв. Ошибка: ${error.message}`);

  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* Основной контейнер и шрифты */
.form-container {
  max-width: 520px;
  background-color: #1A1A1A;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #2a2a2a;
  color: #E0E0E0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 20px auto; /* Центрирование по умолчанию для мобильных */
}

/* Выравнивание по левому краю для десктопной версии */
@media (min-width: 768px) {
  .form-container {
    margin: 20px 0;
  }
}

.header {
  text-align: center;
  margin-bottom: 24px;
}
.header p {
  color: #999;
  font-size: 15px;
  line-height: 1.5;
}

.question-block {
  margin-bottom: 20px;
  padding: 16px;
  background: #252525;
  border-radius: 10px;
  border-left: 3px solid #3DDC84;
}
.question-label {
  display: block;
  font-weight: 600;
  color: #f0f0f0;
  margin-bottom: 8px;
  font-size: 16px;
}
.question-help {
  font-size: 13px;
  color: #888;
  margin-bottom: 12px;
  line-height: 1.4;
}

textarea,
input[type="tel"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #3a3a3a;
  background-color: #1A1A1A;
  color: #E0E0E0;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
  resize: vertical;
}
textarea:focus,
input[type="tel"]:focus {
  outline: none;
  border-color: #3DDC84;
  box-shadow: 0 0 0 3px rgba(61, 220, 132, 0.2);
}

.rating-stars {
  display: flex;
  gap: 4px;
  cursor: pointer;
}
.star {
  font-size: 28px;
  color: #444;
  transition: color 0.2s, transform 0.2s;
  user-select: none;
}
.star:hover {
  transform: scale(1.1);
}
.star.active {
  color: #FFD700;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 24px 0;
  padding: 4px;
}
.checkbox-group input {
  margin-top: 3px;
  width: 1.1em;
  height: 1.1em;
  cursor: pointer;
  accent-color: #3DDC84;
}
.checkbox-group label {
  font-size: 12px;
  line-height: 1.4;
  color: #999;
}
.policy-link {
  color: #3DDC84;
  text-decoration: none;
}
.policy-link:hover {
  text-decoration: underline;
}

.submit-btn {
  background-color: #3DDC84;
  color: #1A1A1A;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s, opacity 0.3s;
}
.submit-btn:hover:not(:disabled) {
  background-color: #45ef94;
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Улучшенное сообщение об успехе */
.success-message {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background-color: #252525;
  border-radius: 12px;
  padding: 24px;
  animation: fadeIn 0.5s ease-out;
}
.success-icon {
  flex-shrink: 0;
}
.success-icon span {
  display: inline-block;
  font-size: 22px;
  color: #3DDC84;
  line-height: 1.2;
  font-weight: bold;
  animation: popIn 0.5s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) backwards;
}
.success-text h3 {
  color: #3DDC84;
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
}
.success-text p {
  color: #aaa;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* Анимации */
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
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
