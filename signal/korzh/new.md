---
prev: false
next: false
title: Новый Сигнал в Корж
description: Где Начинается Ваша Кофейня
head:
  - - meta
    - property: "og:image"
      content: "https://cffx.ru/korzh_og_card.jpg"
---
<div class="back-button-container">
  <a href="/korzh" class="back-button">
    <svg class="back-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Назад к виджету
  </a>
</div>

<style scoped>
.back-button-container {
  max-width: 640px;
  margin: 20px auto 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #2a2a2e;
  border: 1px solid rgba(179, 157, 200, 0.4);
  color: #B39DC8;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.back-button:hover {
  background: #B39DC8;
  border-color: #B39DC8;
  color: #ffffff;
  transform: translateX(-3px);
}

.back-arrow {
  transition: transform 0.3s ease;
}

.back-button:hover .back-arrow {
  transform: translateX(-3px);
}

@media (max-width: 768px) {
  .back-button-container {
    padding: 0 1.5rem;
  }
}
</style>

<div align="center">

<br>

# Отправьте Сигнал в Корж

<p>
  Поделитесь моментом и сделайте вашу любимую кофейню еще лучше сегодня.
</p>

</div>
<SignalFormKorzh1 />
