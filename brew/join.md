# Подключитесь к Умной Кофейне

## Два способа начать игру по своим правилам

<MembershipCards />

### Что внутри

<TariffFeatures />

<style>
.enterprise-table {
  background: var(--vp-c-bg-alt);
  border-radius: 16px;
  border: 2px solid var(--vp-c-border);
  padding: 24px;
  margin: 32px 0;
}

.enterprise-table table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  margin-bottom: 24px;
}

.enterprise-table th {
  color: var(--vp-c-text-1);
  padding: 16px 20px;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 2px solid var(--vp-c-border);
  background: transparent;
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
  padding: 16px 20px;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-border);
  vertical-align: middle;
  background: transparent;
  height: auto;
  line-height: 1.4;
}

.enterprise-table td:first-child {
  font-size: 14px;
  text-align: left;
}

.enterprise-table td:last-child {
  text-align: center;
  color: #9aff00;
  font-size: 18px;
  font-weight: 600;
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
