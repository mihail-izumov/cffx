<template>
  <div class="form-container">
    <div class="header">
      <h1>🌱 Сделаем лучше вместе</h1>
      <p>Ваш честный отзыв поможет этому месту стать еще лучше для всех гостей. Мы превратим каждое замечание в конкретное улучшение.</p>
    </div>

    <form @submit.prevent="submitForm">
      <div class="question-block">
        <label class="question-label">1. Что вас расстроило сегодня?</label>
        <p class="question-help">Опишите свои эмоции и впечатления. Мы понимаем — это важно выговориться.</p>
        <textarea v-model="form.emotionalRelease" rows="4" placeholder="Расскажите, что именно вас расстроило или разочаровало..." required></textarea>
      </div>

      <div class="question-block">
        <label class="question-label">2. Что конкретно пошло не так?</label>
        <p class="question-help">Давайте разберем ситуацию по фактам — что, когда, где произошло.</p>
        <textarea v-model="form.factualAnalysis" rows="4" placeholder="Например: 'Ждал заказ 20 минут', 'Кофе был холодный', 'Персонал не обратил внимания'..." required></textarea>
      </div>

      <div class="question-block">
        <label class="question-label">3. Как бы вы это исправили?</label>
        <p class="question-help">Представьте: вы — владелец этого места. Что бы вы изменили завтра?</p>
        <textarea v-model="form.constructiveSuggestions" rows="4" placeholder="Например: 'Добавить таймер для контроля времени приготовления', 'Обучить персонал быстрее реагировать'..." required></textarea>
      </div>

      <div class="question-block">
        <label class="question-label">4. Как эти изменения улучшат ваш опыт?</label>
        <p class="question-help">Помогите нам понять, почему эти изменения важны именно для вас.</p>
        <textarea v-model="form.expectedBenefits" rows="3" placeholder="Это поможет мне экономить время / получать больше удовольствия / чувствовать заботу..."></textarea>
      </div>

      <div class="question-block">
        <label class="question-label">5. Насколько это важно для вас?</label>
        <p class="question-help">Поможет нам расставить приоритеты при внедрении изменений.</p>
        <div class="rating-stars">
          <span v-for="star in 5" :key="star" class="star" :class="{ active: star <= form.importanceRating }" @click="setRating(star)">⭐</span>
        </div>
      </div>

      <div class="question-block">
        <label class="question-label">6. Как с вами связаться? (необязательно)</label>
        <p class="question-help">Если хотите узнать о результатах или получить персональную обратную связь.</p>
        <input v-model="form.contactInfo" type="text" placeholder="Ваше имя и телефон/email" />
      </div>

      <button type="submit" class="submit-btn">Отправить предложения по улучшению</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  expectedBenefits: '',
  importanceRating: 0,
  contactInfo: ''
})

function setRating(star) {
  form.importanceRating = star
}

function submitForm() {
  if (!form.importanceRating) {
    alert('Пожалуйста, поставьте оценку важности.')
    return
  }
  alert('Спасибо! Ваш отзыв принят в работу. Следите за изменениями в Индексе Роста.')
  // TODO: добавить логику отправки формы в backend
  resetForm()
}

function resetForm() {
  form.emotionalRelease = ''
  form.factualAnalysis = ''
  form.constructiveSuggestions = ''
  form.expectedBenefits = ''
  form.importanceRating = 0
  form.contactInfo = ''
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  font-family: 'SF Pro Display', -apple-system, sans-serif;
}

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

.question-block {
  margin-bottom: 32px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #4caf50;
}

.question-label {
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

textarea,
input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

textarea:focus,
input:focus {
  outline: none;
  border-color: #4caf50;
}

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
  transition: transform 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
}
</style>
