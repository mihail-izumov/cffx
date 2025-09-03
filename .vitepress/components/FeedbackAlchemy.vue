<template>
  <div class="form-container">
    <!-- Сообщение об успешной отправке -->
    <div v-if="formSubmitted" class="success-message">
      <h3>Спасибо! Ваш отзыв принят.</h3>
      <p>Мы ценим ваше время и обязательно используем эту информацию для улучшений.</p>
    </div>

    <!-- Основная форма, скрывается после отправки -->
    <form v-else @submit.prevent="submitForm">
      <div class="header">
        <h1>🌱 Сделаем лучше вместе</h1>
        <p>Ваш честный отзыв поможет этому месту стать еще лучше для всех гостей. Мы превратим каждое замечание в конкретное улучшение.</p>
      </div>

      <!-- Блок 1: Эмоции -->
      <div class="question-block">
        <label class="question-label">1. Что вас расстроило сегодня?</label>
        <p class="question-help">Опишите свои эмоции и впечатления. Мы понимаем — это важно выговориться.</p>
        <textarea v-model="form.emotionalRelease" rows="4" placeholder="Расскажите, что именно вас расстроило или разочаровало..." required></textarea>
      </div>

      <!-- Блок 2: Факты -->
      <div class="question-block">
        <label class="question-label">2. Что конкретно пошло не так?</label>
        <p class="question-help">Давайте разберем ситуацию по фактам — что, когда, где произошло.</p>
        <textarea v-model="form.factualAnalysis" rows="4" placeholder="Например: 'Ждал заказ 20 минут', 'Кофе был холодный', 'Персонал не обратил внимания'..." required></textarea>
      </div>

      <!-- Блок 3: Предложения -->
      <div class="question-block">
        <label class="question-label">3. Как бы вы это исправили?</label>
        <p class="question-help">Представьте: вы — владелец этого места. Что бы вы изменили завтра?</p>
        <textarea v-model="form.constructiveSuggestions" rows="4" placeholder="Например: 'Добавить таймер для контроля времени приготовления', 'Обучить персонал быстрее реагировать'..." required></textarea>
      </div>
      
      <!-- Блок 4: Ожидаемая польза -->
      <div class="question-block">
        <label class="question-label">4. Как эти изменения улучшат ваш опыт?</label>
        <p class="question-help">Помогите нам понять, почему эти изменения важны именно для вас.</p>
        <textarea v-model="form.expectedBenefits" rows="3" placeholder="Это поможет мне экономить время / получать больше удовольствия / чувствовать заботу..."></textarea>
      </div>

      <!-- Блок 5: Оценка важности -->
      <div class="question-block">
        <label class="question-label">5. Насколько это важно для вас?</label>
        <p class="question-help">Поможет нам расставить приоритеты при внедрении изменений.</p>
        <div class="rating-stars">
          <span v-for="star in 5" :key="star" class="star" :class="{ active: star <= form.importanceRating }" @click="setRating(star)">⭐</span>
        </div>
      </div>
      
      <!-- Новые поля для контактов -->
      <div class="question-block">
        <label for="name" class="question-label">Ваше имя</label>
        <p class="question-help">Чтобы мы знали, как к вам обращаться.</p>
        <input type="text" id="name" v-model="form.name" placeholder="Иван" required>
      </div>
      
      <div class="question-block">
        <label for="contact" class="question-label">Телефон или Email для связи</label>
        <p class="question-help">Если хотите узнать о результатах или получить персональную обратную связь.</p>
        <input type="text" id="contact" v-model="form.contact" placeholder="+7 (999) 000-00-00 или example@mail.com" required>
      </div>

      <!-- Блок согласия -->
       <div class="checkbox-group">
        <input type="checkbox" id="consent" v-model="form.consent" required>
        <label for="consent">
          Нажимая кнопку, вы соглашаетесь с 
          <a href="/terms/policy" target="_blank" class="policy-link">политикой конфиденциальности</a> и 
          <a href="/terms/privacy" target="_blank" class="policy-link">обработкой данных</a>.
        </label>
      </div>

      <!-- Кнопка отправки -->
      <button type="submit" class="submit-btn" :disabled="!isFormValid || isSubmitting">
        {{ isSubmitting ? 'Отправляем...' : 'Отправить предложения по улучшению' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

// Реактивное состояние для данных формы
const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  expectedBenefits: '',
  importanceRating: 0,
  name: '',
  contact: '',
  consent: false
});

// Состояние процесса отправки и успешной отправки
const isSubmitting = ref(false);
const formSubmitted = ref(false);

// Компьютед-свойство для валидации формы в реальном времени
const isFormValid = computed(() => {
  return form.emotionalRelease.trim() !== '' &&
         form.factualAnalysis.trim() !== '' &&
         form.constructiveSuggestions.trim() !== '' &&
         form.importanceRating > 0 &&
         form.name.trim() !== '' &&
         form.contact.trim() !== '' &&
         form.consent;
});

// Функция для установки рейтинга
function setRating(star) {
  form.importanceRating = star;
}

// Асинхронная функция отправки формы
async function submitForm() {
  if (!isFormValid.value) return;

  isSubmitting.value = true;

  // Формируем единое сообщение из всех полей для удобства
  const fullMessage = `
    Оценка важности: ${'⭐'.repeat(form.importanceRating)} (${form.importanceRating}/5)
    
    1. Эмоции и впечатления:
    ${form.emotionalRelease}
    
    2. Фактический разбор ситуации:
    ${form.factualAnalysis}
    
    3. Конструктивные предложения:
    ${form.constructiveSuggestions}
    
    4. Ожидаемая польза от изменений:
    ${form.expectedBenefits || 'Не указано'}
  `;

  const formData = {
    name: form.name,
    contact: form.contact,
    message: fullMessage,
    _subject: `Новый отзыв с сайта от ${form.name}`
  };

  try {
    const response = await fetch('https://formspree.io/f/mdkzjopz', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке на сервер');
    }
    
    // Показываем сообщение об успехе
    formSubmitted.value = true;
    
  } catch (error) {
    console.error('Ошибка отправки формы:', error);
    // Резервный вариант: отправка через почтовый клиент
    const mailtoBody = `Имя: ${formData.name}%0AКонтакт: ${formData.contact}%0AСообщение: ${encodeURIComponent(formData.message)}`;
    window.location.href = `mailto:theorchestramanco@gmail.com?subject=${encodeURIComponent(formData._subject)}&body=${mailtoBody}`;
    
  } finally {
    isSubmitting.value = false;
    // Очистку формы можно не делать, так как она скрывается
  }
}

</script>

<style scoped>
/* Основные стили контейнера и шрифтов */
.form-container {
  max-width: 600px;
  margin: 40px auto;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  font-family: 'SF Pro Display', -apple-system, sans-serif;
}

/* Стили заголовка */
.header {
  text-align: center;
  margin-bottom: 40px;
}
.header h1 {
  color: #1e3c72;
  margin-bottom: 10px;
  font-size: 28px;
}
.header p {
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}

/* Стили блоков с вопросами */
.question-block {
  margin-bottom: 32px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #4caf50;
}
.question-label {
  display: block; /* Улучшает компоновку */
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  font-size: 18px;
}
.question-help {
  font-size: 14px;
  color: #777;
  margin-bottom: 16px;
  font-style: italic;
}

/* Стили полей ввода */
textarea,
input[type="text"] {
  width: 100%;
  padding: 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
  font-family: inherit; /* Наследование шрифта */
}
textarea:focus,
input[type="text"]:focus {
  outline: none;
  border-color: #4caf50;
}

/* Стили рейтинга */
.rating-stars {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  cursor: pointer;
}
.star {
  font-size: 32px;
  color: #ddd;
  transition: color 0.2s;
}
.star.active {
  color: #ffd700;
}

/* Стили группы с чекбоксом (взяты из второго примера и адаптированы) */
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 30px;
  padding: 0 10px;
}
.checkbox-group input {
  margin-top: 3px;
  width: 1.2em;
  height: 1.2em;
  cursor: pointer;
}
.checkbox-group label {
  font-size: 14px;
  line-height: 1.4;
  color: #666;
}
.policy-link {
  color: #4caf50;
  text-decoration: none;
}
.policy-link:hover {
  text-decoration: underline;
}


/* Стили кнопки отправки */
.submit-btn {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s, opacity 0.3s;
}
.submit-btn:hover {
  transform: translateY(-2px);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: translateY(0);
}

/* Стили сообщения об успехе (адаптированы) */
.success-message {
  text-align: center;
  padding: 30px;
  background-color: #f0fff4;
  border-left: 5px solid #4caf50;
  border-radius: 8px;
}
.success-message h3 {
  color: #1e3c72;
  margin-top: 0;
}
.success-message p {
  color: #333;
}
</style>
