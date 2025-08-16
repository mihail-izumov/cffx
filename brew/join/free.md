---
outline: false
prev: false
next: false
---

# Подключение к B-R-E-W

<br>

<form id="myForm" class="custom-form">
  <div class="form-group">
    <label for="name">Имя:</label>
    <input type="text" id="name" name="name" class="form-input" required>
  </div>
  
  <div class="form-group">
    <label for="phone">Телефон (Телеграм):</label>
    <input type="tel" id="phone" name="phone" class="form-input" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" class="form-input">
  </div>
  
  <div class="form-group checkbox-group">
    <input type="checkbox" id="consent" name="consent" required>
    <label for="consent">
      Нажимая на кнопку, вы соглашаетесь с 
      <a href="/terms/policy" target="_blank" class="policy-link">политикой конфиденциальности</a>, 
      <a href="/terms/privacy" target="_blank" class="policy-link">согласием на обработку персональных данных</a>
    </label>
  </div>
  
  <button type="submit" class="submit-btn" disabled>
    Отправить заявку →
  </button>
</form>

<div id="successMessage" class="success-message" style="display: none;">
  Успешно. Анна отправит приглашение в Телеграм.
</div>

<style>
.custom-form {
  max-width: 500px;
  margin: 0;
  padding: 20px;
  background-color: #000000;
  border-radius: 5px;
  color: #ffffff;
}

.form-group {
  margin-bottom: 15px;
}

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

.checkbox-group input {
  margin-top: 3px;
  width: auto;
}

.checkbox-group label {
  font-size: 14px;
  line-height: 1.4;
}

.policy-link {
  color: #4CAF50;
  text-decoration: underline;
}

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

.submit-btn:hover {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.success-message {
  margin-top: 15px;
  color: white;
  font-weight: normal;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.success-message::before {
  content: "✓";
  color: white;
  font-size: 18px;
}
</style>

<script>
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
      const emailInput = document.getElementById('email');
      const checkbox = document.getElementById('consent');
      
      const checkFormValidity = () => {
        const nameValid = document.getElementById('name').value.trim() !== '';
        const phoneValid = document.getElementById('phone').value.trim() !== '';
        const consentValid = checkbox.checked;
        
        submitBtn.disabled = !(nameValid && phoneValid && consentValid);
      };
      
      requiredInputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
      });
      emailInput.addEventListener('input', checkFormValidity); 
      checkbox.addEventListener('change', checkFormValidity);
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (submitBtn.disabled) return;
        
        const formData = {
          name: form.name.value,
          phone: form.phone.value,
          email: form.email.value,
          consent: checkbox.checked ? 'Да' : 'Нет',
          // Ваша новая тема, но с обычным дефисом
          _subject: 'Подключение - Бесплатно'
        };
        
        form.reset();
        successMessage.style.display = 'flex';
        submitBtn.disabled = true;
        
        fetch('https://formspree.io/f/mdkzjopz', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) throw new Error('Ошибка сервера');
        })
        .catch(error => {
          console.error('Error:', error);
          const mailtoSubject = 'Рынок кофеен Новосибирска';
          const mailtoBody = `Имя: ${formData.name}%0AТелефон: ${formData.phone}%0AEmail: ${formData.email}`;
          window.location.href = `mailto:theorchestramanco@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
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

