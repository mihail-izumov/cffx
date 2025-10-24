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
  <span>Покажем, как Сигнал</span><br class="mobile-break"> <span>усилит ваш сервис.</span>
</h1>

<p>
  Анализ и первая настройка <br class="mobile-break"><strong>за 48 часов. Бесплатно.</strong>
</p>

<div class="button-group">
  <a href="/pro/dialogs#начать-сегодня" class="btn btn-primary" rel="noopener noreferrer"><strong>Начать бесплатно</strong></a>
  <a href="/pro/dialogs#тарифы" class="btn btn-secondary" rel="noopener noreferrer">Тарифы и спецификация</a>
</div>

</div>

## Быстрый Старт

<DialogsFirst5Days />

# Настройте Сигнал

Систему Сигнала легко настроить. Адаптируем систему Сигнала как нужно именно вам. Можете полностью доверить ей безопасность обратной связи с клиентами.

### 7 точек контроля, которые подстраиваются под вашу уникальность.

<SignalConstructorModules />

## Начать Сегодня

<DialogsForm />

<style>
/* --- ОБЩИЕ СТИЛИ ДЛЯ ВСЕХ КНОПОК --- */
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
  margin: 10px 0;
}
.btn:hover {
  transform: translateY(-2px);
  text-decoration: none !important;
}

/* --- СТИЛЬ ОСНОВНОЙ КНОПКИ (ЯРКАЯ) --- */
.btn-primary {
  background-color: #C5F946; /* Яркий лаймовый */
  color: #000 !important;
}
.btn-primary:hover {
  background-color: #347b6c; /* Темный при наведении */
  color: white !important;
}

/* --- СТИЛЬ ВТОРИЧНОЙ КНОПКИ --- */
.btn-secondary {
  background-color: #f8f9fa;
  color: #333 !important;
  border: 2px solid #dee2e6;
}
.btn-secondary:hover {
  background-color: #e9ecef;
  border-color: #adb5bd;
}

/* --- КОНТЕЙНЕР ДЛЯ ГРУППЫ КНОПОК --- */
.button-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.button-group .btn {
  margin: 0; /* Убираем margin, используем gap */
}

/* --- МОБИЛЬНАЯ ВЕРСИЯ --- */
@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
    align-items: stretch; /* Кнопки занимают всю ширину */
    gap: 10px;
  }
  
  .button-group .btn {
    width: 100%; /* Кнопки на всю ширину на мобильных */
  }
}

/* --- Контейнер для отдельной кнопки --- */
.start-button-container {
  margin: 20px 0;
  text-align: left;
}
.start-button-container .btn {
  display: inline-block;
  margin: 0;
}
</style>

