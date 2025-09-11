<template>
  <div class="consultation-section">
    <div class="consultation-container">
      <p class="consultation-description">Начните инвестировать в кофейный рынок прямо сейчас</p>
      
      <form id="consultationForm" class="consultation-form">
        <div class="form-row">
          <div class="form-group">
            <input type="text" id="name" name="name" class="form-input" placeholder="Имя" required>
          </div>
          
          <div class="form-group">
            <input type="tel" id="phone" name="phone" class="form-input" placeholder="Телефон" required>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <input type="email" id="email" name="email" class="form-input" placeholder="Email" required>
          </div>
          
          <div class="form-group">
            <select id="investment" name="investment_size" class="form-select" required>
              <option value="">Размер инвестиций</option>
              <option value="300-500k">300-500 тыс ₽</option>
              <option value="500k-1m">500 тыс - 1 млн ₽</option>
              <option value="1-3m">1-3 млн ₽</option>
              <option value="3-5m">3-5 млн ₽</option>
              <option value="5-10m">5-10 млн ₽</option>
              <option value="10-20m">10-20 млн ₽</option>
            </select>
            <div id="investmentHint" class="investment-hint"></div>
          </div>
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
          Записаться на консультацию
        </button>
      </form>
      
      <div id="successMessage" class="success-message" style="display: none;">
        Заявка успешно отправлена. Скоро свяжемся с вами для назначения консультации.
      </div>
    </div>
  </div>
</template>

<style scoped>
.consultation-section {
  background: #0a0a0a;
  padding: 30px 0;
  min-height: auto;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.consultation-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 8px;
}

.consultation-description {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;
  text-align: center;
  padding-left: 0;
}

.consultation-form {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  border: 1px solid #333;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
}

.form-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.form-group {
  flex: 1;
}

.form-group.checkbox-group {
  flex: none;
  width: 100%;
}

.form-input,
.form-select {
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  border: 1px solid #333;
  border-radius: 6px;
  font-size: 13px;
  background: #000000;
  color: #ffffff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input::placeholder {
  color: #666666;
  opacity: 1;
}

.form-input:focus::placeholder {
  opacity: 0;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;
  padding-right: 28px;
  color: #666666;
}

.form-select:focus,
.form-select:valid {
  color: #ffffff;
}

.form-select option {
  background: #000000;
  color: #ffffff;
  padding: 6px;
}

.form-select option:first-child {
  color: #666666;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #347b6c;
  box-shadow: 0 0 0 2px rgba(52, 123, 108, 0.2);
}

.investment-hint {
  margin-top: 8px;
  margin-bottom: 4px;
  font-size: 11px;
  color: #ffffff;
  height: 28px;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  line-height: 1.2;
  display: flex;
  align-items: flex-start;
}

.investment-hint:empty {
  opacity: 0;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 15px;
  margin-top: 4px;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  min-width: 14px;
  height: 14px;
  accent-color: #347b6c;
  margin: 0;
  flex-shrink: 0;
}

.checkbox-group label {
  font-size: 11px;
  line-height: 1.3;
  color: #cccccc;
  margin: 0;
}

.policy-link {
  color: #347b6c;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.policy-link:hover {
  color: #C5F946;
}

.submit-btn {
  background: linear-gradient(135deg, #347b6c 0%, #C5F946 100%);
  color: #000000;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  transition: opacity 0.3s ease, transform 0.2s ease;
  text-transform: none;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  margin-top: 12px;
  color: #347b6c;
  font-weight: 500;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: rgba(52, 123, 108, 0.1);
  border: 1px solid rgba(52, 123, 108, 0.3);
  border-radius: 6px;
}

.success-message::before {
  content: "✓";
  color: #347b6c;
  font-size: 14px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .consultation-section {
    padding: 25px 0 50px 0;
  }
  
  .consultation-container {
    padding: 0 6px;
  }
  
  .consultation-description {
    font-size: 18px;
    margin-bottom: 25px;
    padding-left: 0;
    text-align: center;
  }
  
  .consultation-form {
    padding: 20px;
  }
  
  .form-row {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .form-input,
  .form-select {
    padding: 14px 16px;
    font-size: 16px;
  }
  
  .form-select {
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 40px;
  }
  
  .investment-hint {
    margin-top: 12px;
    margin-bottom: 6px;
    font-size: 13px;
    height: 40px;
  }
  
  .checkbox-group {
    flex-direction: row;
    gap: 8px;
    margin-top: 8px;
    margin-bottom: 20px;
    align-items: center;
  }
  
  .checkbox-group input[type="checkbox"] {
    margin: 0;
    margin-right: 4px;
    min-width: 16px;
    height: 16px;
  }
  
  .checkbox-group label {
    font-size: 13px;
    line-height: 1.4;
  }
  
  .submit-btn {
    padding: 16px 20px;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .success-message {
    margin-bottom: 20px;
  }
}
</style>

<script>
export default {
  name: 'ConsultationForm',
  mounted() {
    this.initForm();
  },
  methods: {
    initForm() {
      // Проверка выполнения в браузере
      if (typeof document === 'undefined') return;
      
      const form = document.getElementById('consultationForm');
      if (!form) return;
      
      const successMessage = document.getElementById('successMessage');
      const submitBtn = form.querySelector('.submit-btn');
      const requiredInputs = Array.from(form.querySelectorAll('[required]'));
      const checkbox = document.getElementById('consent');
      const investmentSelect = document.getElementById('investment');
      const investmentHint = document.getElementById('investmentHint');
      
      // Обновленный словарь подсказок для размеров инвестиций
      const investmentHints = {
        '300-500k': 'Поможем выбрать идеальную локацию и избежать ошибок новичков',
        '500k-1m': 'Обеспечим быструю окупаемость и стабильный рост прибыли',
        '1-3m': 'Покажем, как превратить одну успешную кофейню в прибыльную сеть',
        '3-5m': 'Построим систему масштабирования и захвата городского рынка',
        '5-10m': 'Обеспечим доминирование в вашем регионе через данные и аналитику',
        '10-20m': 'Станете федеральным игроком с нашими аналитическими инструментами'
      };
      
      // Обработчик изменения размера инвестиций
      investmentSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const hint = investmentHints[selectedValue] || '';
        investmentHint.textContent = hint;
        checkFormValidity();
      });
      
      // Функция проверки валидности формы
      const checkFormValidity = () => {
        const nameValid = document.getElementById('name').value.trim() !== '';
        const phoneValid = document.getElementById('phone').value.trim() !== '';
        const emailValid = document.getElementById('email').value.trim() !== '';
        const investmentValid = investmentSelect.value !== '';
        const consentValid = checkbox.checked;
        
        submitBtn.disabled = !(nameValid && phoneValid && emailValid && investmentValid && consentValid);
      };
      
      // Назначение обработчиков событий
      requiredInputs.forEach(input => {
        if (input.type === 'checkbox') {
          input.addEventListener('change', checkFormValidity);
        } else {
          input.addEventListener('input', checkFormValidity);
        }
      });
      
      // Обработка отправки формы
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (submitBtn.disabled) return;
        
        const formData = {
          name: form.name.value,
          phone: form.phone.value,
          email: form.email.value,
          investment_size: form.investment_size.value,
          consent: checkbox.checked ? 'Да' : 'Нет',
          _subject: 'Запрос на персональную консультацию'
        };
        
        // Блокируем кнопку во время отправки
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправляем...';
        
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
          
          // Очищаем форму после успешной отправки
          form.reset();
          investmentHint.textContent = ''; // Очищаем подсказку
          successMessage.style.display = 'flex';
          
        })
        .catch(error => {
          console.error('Error:', error);
          // Резервная отправка через mailto
          const mailtoBody = `Имя: ${formData.name}%0AТелефон: ${formData.phone}%0AEmail: ${formData.email}%0AРазмер инвестиций: ${formData.investment_size}`;
          window.location.href = `mailto:theorchestramanco@gmail.com?subject=Запрос на консультацию&body=${mailtoBody}`;
        })
        .finally(() => {
          // Восстанавливаем кнопку
          submitBtn.textContent = 'Записаться на консультацию';
          
          // Скрываем сообщение через 15 секунд
          setTimeout(() => {
            successMessage.style.display = 'none';
            checkFormValidity();
          }, 15000);
        });
      });
      
      // Инициальная проверка
      checkFormValidity();
    }
  }
}
</script>
