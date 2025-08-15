# Подключитесь к Умной Кофейне

<div style="text-align: center; margin: 2rem 0;">
  <img 
    src="/brew_intro_ban.svg" 
    alt="BREW intro"
    style="
      width: 100%;
      max-width: 800px;
      height: auto;
      border-radius: max(12px, min(24px, 3vw));
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    "
    onmouseover="this.style.transform='scale(1.02)'"
    onmouseout="this.style.transform='scale(1)'"
  />
</div>

## Два способа начать игру по своим правилам

<MembershipCards />

### Что внутри

<TariffFeatures />

<style>
.enterprise-table {
  background: #2a2a2a;
  border-radius: 16px;
  border: 2px solid #404040;
  padding: 24px;
  margin: 32px 0;
}

.enterprise-table .custom-title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  text-align: center;
  border: none;
  padding: 0;
}

.enterprise-table table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  margin-bottom: 24px;
}

.enterprise-table th {
  color: #ffffff;
  padding: 16px 20px;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 2px solid #404040;
  background: #1a1a1a;
}

.enterprise-table th:first-child {
  text-align: left;
}

.enterprise-table th:last-child {
  text-align: center;
  color: #9aff00;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.enterprise-table td {
  padding: 0;
  color: #e0e0e0;
  border-bottom: 1px solid #333333;
  background: transparent;
  height: 60px;
}

.enterprise-table td:first-child {
  font-size: 14px;
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  line-height: 1.4;
}

.enterprise-table td:last-child {
  text-align: center;
  color: #9aff00;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.enterprise-table tr:last-child td {
  border-bottom: none;
}

.enterprise-table tr:hover td {
  background: transparent;
}

.checkmark {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #9aff00;
  border-radius: 50%;
  position: relative;
}

.checkmark::after {
  content: '✓';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #1a1a1a;
  font-weight: bold;
  font-size: 12px;
}

.partner-button {
  width: 100%;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid #9aff00;
  background: transparent;
  color: #9aff00;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  box-sizing: border-box;
}

.partner-button:hover {
  background: #9aff00;
  color: #1a1a1a;
}
</style>

<div class="enterprise-table">
  <div class="custom-title">Для новых лидеров рынка</div>
  
  <table>
    <thead>
      <tr>
        <th>Преимущества</th>
        <th>₽390000/год</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Все, что в Симуляторе и Инсайдере, плюс:</td>
        <td><span class="checkmark"></span></td>
      </tr>
      <tr>
        <td>Персональные рекомендации для пользователей симулятора</td>
        <td><span class="checkmark"></span></td>
      </tr>
      <tr>
        <td>Участие в обратной связи по платформе</td>
        <td><span class="checkmark"></span></td>
      </tr>
      <tr>
        <td>Приоритетный доступ к Чекапам</td>
        <td><span class="checkmark"></span></td>
      </tr>
      <tr>
        <td>Место в совете BREW</td>
        <td><span class="checkmark"></span></td>
      </tr>
    </tbody>
  </table>
  
  <button class="partner-button">Приглашение для партнёра</button>
</div>
