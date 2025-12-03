---
outline: false
prev: false
next: false
title: Диалоги
description: Где Начинается Ваш Бизнес
notification: brew
---

<SignalProductsSlider />

<div align="center">

<h1 class="responsive-heading">Сигнал<br>Диалоги</h1>

<br>

<h1>
  <span>Ваша система обратной связи может быть какой угодно.</span><br class="mobile-break"> <span>Даже чатом в Телеграм.</span>
</h1>

<div class="checkup-cta-section">
  <a href="/pro/specs" class="checkup-price" target="_blank" rel="noopener noreferrer">От ₽65,500/мес</a>
  <a href="/pro/reserve" class="btn-cta">Запустить Сигнал в Декабре</a>
</div>

<div style="border-top: 1px solid rgba(255, 255, 255, 0.15); margin-top: 50px; margin-bottom: 60px;"></div>

# Недовольные сервисом клиенты стали слишком дорогими. Мы это изменили.

</div>

<DialogsSteps />
<br>
<div align="center">
  
# Точный Сигнал за 30 секунд.

**Все данные из реальных инцидентов:** умная система подсказок основана на реальных случаях и анализе ситуаций.

</div>

<DialogsTestT9 />
<DialogsT9 />

<div style="text-align: center; margin: 2rem 0;">
  <img 
    src="/SignalVSReview.jpg" 
    alt="SignalVSReview"
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

<br>
<div align="center">
  
# Диалоги с Анной, а не ботом.

### Внимательный и точный ИИ-ассистент Анна ведёт до результата. Понимает с полуслова.

Персональный ИИ-ассистент снимает первичный негатив, определяет реальную причину недовольства и переводит расплывчатые жалобы в конкретные задачи. <br>[Как работает →](/pro/anna)

</div>

<br>

<AnnaQuotes />

<div style="height: 60px;"></div>

<div align="center">

# Тикеты в Телеграм как обычно.

Разгружают команду и гарантирует быструю доставку лучшего решения. <br> [Как работает →](/pro/tickets)
<br>

</div>

<TicketsExamples />

<div style="height: 50px;"></div>

<div align="center">

# Статистика Сигналов каждый месяц.

</div>

<DialogsStatisticsSlider />

<div align="center">

<div style="height: 50px;"></div>

# Настройте сейчас. Запустите потом.

Адаптируем систему под ваши правила. Просто скажите да/нет или измените модули системы. <strong>На все - 1 минута.</strong>

</div>

<DialogsWidgets />

<BannerFitGuide />

<style>
.responsive-heading {
  font-size: 80px !important;
  line-height: 0.9 !important;
}

@media screen and (max-width: 768px) {
  .responsive-heading {
    font-size: 65px !important;
    line-height: 1.1 !important;
  }
}

@media screen and (max-width: 480px) {
  .responsive-heading {
    font-size: 50px !important;
    line-height: 1.1 !important;
  }
}
</style>

<style>
.checkup-cta-section {
  background-color: #2a2a2a;
  padding: 10px 12px 10px 20px;   /* десктоп */
  border-radius: 999px;
  margin: 24px 0;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
}

/* --- Цена/ссылка --- */
.checkup-price {
  color: #ffffff;
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
  text-decoration: none;   /* нет подчеркивания по умолчанию */
  border-bottom: none;
  transition: color 0.2s, border-bottom 0.2s;
  outline: none;
}
.checkup-price:hover,
.checkup-price:focus-visible {
  text-decoration: underline;   /* или border-bottom: 1.5px solid #C5F946; */
  /* border-bottom: 1.5px solid #C5F946; */
}
.checkup-price:focus,
.checkup-price:active {
  outline: none;
  text-decoration: none;   /* сбрасываем underline при active/focus */
  border-bottom: none;
}

/* --- Кнопка --- */
.btn-cta {
  background-color: #C5F946;
  color: #000 !important;
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  display: inline-block;
  line-height: 1;
  box-sizing: border-box;
}
.btn-cta:hover {
  background-color: #b3e63d;
  transform: translateY(-1px);
  text-decoration: none !important;
  box-shadow: 0 4px 12px rgba(197, 249, 70, 0.25);
}

/* --- Мобильная адаптация --- */
@media (max-width: 767px) {
  .checkup-cta-section {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 12px;
    border-radius: 20px;
    align-items: center;
    box-sizing: border-box;
    padding: 16px 18px !important; /* ключ к отступам! */
  }
  .checkup-price {
    font-size: 18px;
    text-align: center;
    width: 100%;
  }
  .btn-cta {
    width: 100%;
    max-width: 100%;
    padding: 12px 24px;
    display: block;
    text-align: center;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 1.2;
    white-space: normal;
    margin: 0;
  }
}
</style>
