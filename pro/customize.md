---
outline: false
prev: false
next: false
title: Настройка Сигнала
description: Где Начинается Ваш Бизнес
notification: brew
---

<SignalProductsSlider />

<div align="center">

<h1 class="responsive-heading">Мы собрали.<br>Вы управляете.</h1>

<br>

<h1>
  <span>Ваш Сигнал. </span><br class="mobile-break"> <span>Не коробка, а конструктор. </span>
</h1>

<p>
  Адаптируем систему под ваши правила, а не наоборот. Просто скажите да/нет или измените модули системы.
</p>

</div>

<!-- Блок кнопок по центру экрана -->
<div class="centered-buttons">
  <div class="button-group">
    <a href="/pro/reserve" class="btn btn-primary" rel="noopener noreferrer"><strong>Отправить на сборку</strong></a>
    <a href="/pro/specs" class="btn btn-secondary" rel="noopener noreferrer">Тарифы и спецификация</a>
  </div>
</div>

<br>

<div align="center">
# Модули Сигнала подстраиваются под вашу уникальность.
</div>
<SignalConstructorModules />

<div align="center">
## Быстрый Старт
</div>
<DialogsFirst5Days />

<br>

<div align="center">
## Настройте сейчас. Запустите потом.
</div>
<!-- Блок кнопок по центру экрана -->
<div class="centered-buttons">
  <div class="button-group">
    <a href="/pro/reserve" class="btn btn-primary" rel="noopener noreferrer"><strong>Отправить на сборку</strong></a>
    <a href="/pro/specs" class="btn btn-secondary" rel="noopener noreferrer">Тарифы и спецификация</a>
  </div>
</div>

<style>
.centered-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5vh; /* Меньше отступы сверху/снизу */
  padding: 0;
}

/* Группа кнопок по центру */
.button-group {
  display: flex;
  gap: 10px;
}

/* Кнопки */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn:hover {
  transform: translateY(-2px);
  text-decoration: none !important;
}

/* Первая кнопка (яркая) */
.btn-primary {
  background-color: #C5F946;
  color: #000 !important;
  border: none;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active {
  background-color: #fff !important;
  color: #000 !important;
  border: none;
}
.btn-primary:hover strong,
.btn-primary:focus strong,
.btn-primary:active strong {
  color: #000 !important;
}

/* Вторая кнопка (нейтральная) */
.btn-secondary {
  background-color: #f8f9fa;
  color: #333 !important;
  border: 2px solid #dee2e6;
}
.btn-secondary:hover,
.btn-secondary:focus,
.btn-secondary:active {
  background-color: #e9ecef;
  border-color: #adb5bd;
  color: #333 !important;
}

/* Адаптив для мобильных */
@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .button-group .btn {
    width: 100%;
  }
  .centered-buttons {
    min-height: 5vh;
    padding: 7.5px 0;
  }
}
</style>

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
/* Checkup CTA Section - Perfect Single Line */
.checkup-cta-section {
  background-color: #2a2a2a;
  padding: 10px 12px 10px 20px;
  border-radius: 999px;
  margin: 24px 0;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
}

.checkup-price {
  color: #ffffff;
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
}

/* CTA Button - Same Size, Normal Weight */
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
}

.btn-cta:hover {
  background-color: #b3e63d;
  transform: translateY(-1px);
  text-decoration: none !important;
  box-shadow: 0 4px 12px rgba(197, 249, 70, 0.25);
}

/* Responsive - Full width on mobile */
@media (max-width: 767px) {
  .checkup-cta-section {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 16px 20px;
    gap: 12px;
    border-radius: 20px;
  }
  
  .checkup-price {
    font-size: 18px;
    text-align: center;
  }
  
  .btn-cta {
    width: 100%;
    padding: 12px 24px;
  }
}
</style>
