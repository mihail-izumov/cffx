---
outline: false
prev: false
next: false
title: Отправьте Сигнал в Корж
description: Где Начинается Ваша Кофейня
head:
  - - meta
    - property: "og:image"
      content: "https://cffx.ru/korzh_og_card.jpg"
---

<div align="center">
  <span class="korzh-badge">Где начинается ваша кофейня</span> <br>
  <h1 class="responsive-heading-signal-industries">Корж на связи</h1>
  <p>
    <strong>Каждая чашка кофе </strong> делает <br class="mobile-break">Вашу любимую кофейню еще лучше.
  </p>
</div>

<style>
/* БАЗОВЫЙ (десктоп >768px) */
.vp-doc h1.responsive-heading-signal-industries {
  font-size: 46px !important;
  line-height: 1.1 !important;
  margin: 0 0 20px 0 !important;
  font-weight: 700 !important;
}

/* Таблеты 769px+ — нет изменений */
@media (min-width: 769px) {
  .vp-doc h1.responsive-heading-signal-industries {
    font-size: 46px !important;
    line-height: 1.1 !important;
  }
}

/* Мобильные ≤768px — УМЕНЬШАЕМ размер */
@media (max-width: 768px) {
  .vp-doc h1.responsive-heading-signal-industries {
    font-size: 32px !important;  /* ← ИЗМЕНИЛИ на меньший */
    line-height: 1.3 !important;
    margin-bottom: 12px !important;
  }
}

/* Очень маленькие экраны ≤480px */
@media (max-width: 480px) {
  .vp-doc h1.responsive-heading-signal-industries {
    font-size: 28px !important;  /* ← Еще меньше */
    line-height: 1.3 !important;
  }
}
</style>



<style>
/* По умолчанию скрываем тег <br> с классом .mobile-break */
.mobile-break {
  display: none;
}

/* Показываем <br> только на мобильных устройствах (экраны до 767px включительно) */
@media (max-width: 767px) {
  .mobile-break {
    display: inline;
  }
}

/* НОВОЕ: Убираем ограничение ширины VitePress для виджета */
.vp-doc {
  max-width: 100% !important;
}

.vp-doc .content-container,
.vp-doc .container {
  max-width: 100% !important;
}
</style>

<KorzhWidget2/>

<br>

<ShareButton/>

<br>

<div align="center">

# Хотите отправить подарок?

Доставляем подарки команде Коржа. Просто поздравить или сказать "Спасибо".

</div>

<KorzhGiftsSlider/>

<br>

<div align="center">

# Поделитесь настроением

Сделайте фото и добавьте несколько теплых слов. Ваш сториз увидят друзья, а команде будет приятно.

</div>

<KorzhCardsSlider/>

<br>

<div align="center">

# Инвестируйте в новые кофейни

Станьте частью истории успеха.

</div>

<InvestKorzhBanner />

<br>

<SignalWidgetBadge />
