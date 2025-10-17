---
outline: false
prev: false
next: false
pageClass: centered-page
title: Наша система
notification: brew
description: Безупречная работа с Сигналами

---

# Наша система
## Безупречная работа с Сигналами

  <div class="project-card">
    <div>
      <h3 style="color: #C5F946; margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Тикет-система</h3>
      <p style="margin: 0; line-height: 1.6; color: var(--vp-c-text-1);">Устойчивые системы в бизнесе начинаются с ясности в голове основателя. Первый шаг к такому мышлению — навести порядок в собственном мире.</p>
    </div>
    <a href="/system/tickets" class="project-button">
      Получить доступ за ₽1990 →
    </a>
  </div>

<style>
.project-card {
  background: rgba(52, 123, 108, 0.3);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
}

.project-button {
  background-color: #347b6c;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  display: block;
  margin-top: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.project-button:hover {
  background-color: #C5F946 !important;
  color: #000 !important;
  transform: translateY(-2px);
  text-decoration: none !important;
  font-weight: 700 !important;
}
</style>

## Для новых проектов

Люди видят то, что хотят видеть. Одни ищут быстрые решения, другие — гарантии. Я ищу тех, кто создает бизнесы нового типа — с маленькими командами, но потенциалом единорогов.

**Опишите видение → Обсудим возможности**

<br>
<form id="myForm" class="custom-form">
  <!-- Поля формы остаются без изменений -->
  <div class="form-group">
    <label for="name">Имя:</label>
    <input type="text" id="name" name="name" class="form-input" placeholder="Как к вам обращаться?" required>
  </div>
  <div class="form-group">
    <label for="contact">Удобный способ связи (Telegram или Email):</label>
    <input type="text" id="contact" name="contact" class="form-input" placeholder="Где удобнее получить ответ?" required>
  </div>
  <div class="form-group">
    <label for="pointA">Точка А — где вы сейчас?</label>
    <textarea id="pointA" name="pointA" class="form-input" rows="4" placeholder="Кратко опишите, что вас беспокоит или волнует." required></textarea>
  </div>
  <div class="form-group">
    <label for="pointB">Точка Б — куда хотите прийти?</label>
    <textarea id="pointB" name="pointB" class="form-input" rows="4" placeholder="Какой перемены или состояния вы ждёте?" required></textarea>
  </div>
  <div class="form-group">
    <label for="obstacle">Главное препятствие (необязательно):</label>
    <textarea id="obstacle" name="obstacle" class="form-input" rows="3" placeholder="Что, по вашему ощущению, мешает изменить ситуацию?"></textarea>
  </div>
  <div class="form-group checkbox-group">
    <input type="checkbox" id="consent" name="consent" required>
    <label for="consent">
      Нажимая на кнопку, вы соглашаетесь с 
      <a href="/terms/policy" target="_blank" class="policy-link">политикой конфиденциальности</a> и 
      <a href="/terms/privacy" target="_blank" class="policy-link">согласием на обработку персональных данных</a>.
    </label>
  </div>
  
  <button type="submit" class="submit-btn" disabled>
    Получить разбор →
  </button>
</form>

<div id="successMessage" class="success-message" style="display: none;">
  Ваш запрос принят. Готовлю разбор вашей ситуации и скоро вернусь с ответом.
</div>

<style>
.custom-form {
  /* Убираем ограничение по ширине, чтобы форма заняла весь контейнер */
  max-width: none; 
  margin: 0;
  padding: 20px;
  background-color: #000000;
  border-radius: 5px;
  color: #ffffff;
}
.form-group { margin-bottom: 15px; }
.form-input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #000000;
  color: #ffffff;
  resize: vertical; 
}
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 20px;
}
.checkbox-group input { margin-top: 3px; width: auto; }
.checkbox-group label { font-size: 14px; line-height: 1.4; }
.policy-link { color: #4CAF50; text-decoration: underline; }
.submit-btn {
  background-color: #ffffff;
  color: #000000;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  font-weight: bold;
  transition: opacity 0.3s;
}
.submit-btn:hover { opacity: 0.9; }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.success-message {
  margin-top: 15px;
  /* Цвет фона, как у ссылок, для единства стиля */
  background-color: #4CAF50; 
  color: white;
  font-weight: normal;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  /* Добавляем внутренние отступы для красоты */
  padding: 15px;
  border-radius: 5px;
}
.success-message::before {
  content: "✓";
  color: white;
  font-size: 18px;
}
</style>

<script>
// Скрипт остается без изменений, его логика уже безупречна
export default {
  mounted() {
    this.initForm();
  },
  methods: {
    initForm() {
      if (typeof document === 'undefined') return;
      
      const form = document.getElementById('myForm');
      if (!form) return;
      
      const successMessage = document.getElementById('successMessage');
      const submitBtn = form.querySelector('.submit-btn');
      const requiredInputs = Array.from(form.querySelectorAll('[required]'));
      
      const checkFormValidity = () => {
        const allRequiredFilled = requiredInputs.every(input => {
          if (input.type === 'checkbox') return input.checked;
          return input.value.trim() !== '';
        });
        submitBtn.disabled = !allRequiredFilled;
      };
      
      requiredInputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
      });
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (submitBtn.disabled) return;
        
        const formData = {
          name: form.name.value,
          contact: form.contact.value,
          pointA: form.pointA.value,
          pointB: form.pointB.value,
          obstacle: form.obstacle.value,
          consent: form.consent.checked ? 'Да' : 'Нет',
          _subject: `Новая заявка с сайта orxaos.sbs`
        };
        
        form.reset();
        successMessage.style.display = 'flex';
        submitBtn.disabled = true;
        
        fetch('https://formspree.io/f/mdkzjopz', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        .catch(error => {
          console.error('Error:', error);
          const mailtoBody = `Имя: ${formData.name}%0AКонтакт: ${formData.contact}%0AТочка А: ${formData.pointA}%0AТочка Б: ${formData.pointB}%0AПрепятствие: ${formData.obstacle}`;
          window.location.href = `mailto:theorchestramanco@gmail.com?subject=Заявка с сайта orxaos.sbs&body=${mailtoBody}`;
        })
        .finally(() => {
          setTimeout(() => {
            successMessage.style.display = 'none';
            checkFormValidity();
          }, 15000);
        });
      });
      
      checkFormValidity();
    }
  }
}
</script>

