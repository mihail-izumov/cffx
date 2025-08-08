# Симулятор // Рынок кофеен Новосибирска

## Разлом гиганта: Битва титанов

**Что происходит, когда ваша компания становится слишком большой, чтобы выполнять собственные обещания?**

В отличие от [Самары](/radar/signal/coffee-points-smr-2025/dashboard), где разные компании воплощают разные философии («душа» и «система»), в Новосибирске драма происходит внутри одного гиганта — Green House.

### Официальная Мечта
Green House декларирует ценности премиального качества, безупречного сервиса и «команды-семьи». Они обещают гостю счастье и стабильность.

### Реальность
Анализ 48000+ отзывов показывает системный сбой. Нестабильное качество напитков, медленное обслуживание из-за перегрузки, выгорание и текучка персонала. Ключевое противоречие Green House — это колоссальный разрыв между маркетинговым обещанием и операционным исполнением. Их система не выдерживает собственного масштаба.

Skuratov здесь выступает не как «премиум-антипод», а как живое доказательство того, что федеральная сеть может сохранять стабильное качество. Он лишь подсвечивает внутренний разлом Green House.

## Август 2025

Мы готовим к запуску новый симулятор на основе реального кейса федеральной сети Green House. <br>

В фокусе Радара сегодня – ключевой конфликт современного бизнеса на примере Green House. Колоссальный разрыв между ярким маркетинговым образом и операционной реальностью. <br>

Эта симуляция будет полезна для тех, кто готов перейти от тактики захвата рынка к стратегии удержания власти.

## Первым войти в симуляцию

# Контакт
<br>
<form id="myForm" class="custom-form">
  <div class="form-group">
    <label for="name">Имя:</label>
    <input type="text" id="name" name="name" class="form-input" required>
  </div>
  
  <div class="form-group">
    <label for="phone">Телефон:</label>
    <input type="tel" id="phone" name="phone" class="form-input" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email (необязательно):</label>
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
    Отправить →
  </button>
</form>

<div id="successMessage" class="success-message" style="display: none;">
  Заявка успешно отправлена. Скоро свяжемся.
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
          // --- ИЗМЕНЕНИЕ ЗДЕСЬ ---
          // Добавляем метку прямо в тему письма
          _subject: 'Новая заявка со страницы "Контакты"'
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
          // Тему для резервного письма тоже можно обновить
          const mailtoSubject = 'Симулятор – Рынок кофеен Новосибирска';
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
