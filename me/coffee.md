---
outline: false
prev: false
next: false
pageClass: centered-page
title: Отправьте Сигнал – Корж, Skuratov, Surf, Mosaic, Белотурка, Кэрри
description: Сигнал – тому кто решает
---
<SignalProductsSlider />

<div align="center">

<BadgeCounter />

<h1 class="responsive-heading">Ваш Сигнал — тому,<br>кто решает.</h1>

<div style="height: 25px;"></div>

<p>
  Без регистрации.<br class="mobile-break"> <strong>Результат — в течение дня.</strong>
</p>

</div>

<MainSignalWidgetsCoffee />


<style>
/* Утилита для переноса строк (без изменений) */
.mobile-break {
  display: none;
}

@media (max-width: 767px) {
  .mobile-break {
    display: inline;
  }
}
</style>

<style>
/* 
   Используем селектор ".vp-doc h1.responsive-heading".
   Это повышает специфичность (вес) стиля, чтобы гарантированно 
   перебить дефолтные 80px от Vitepress.
*/
.vp-doc h1.responsive-heading {
  font-size: 32px !important;
  line-height: 1.1 !important;
  margin-top: 0.5em !important;  /* Сброс стандартных отступов, если нужно */
  margin-bottom: 0.5em !important;
  padding-top: 0 !important;
  font-weight: 700 !important;
}

@media screen and (max-width: 768px) {
  .vp-doc h1.responsive-heading {
    font-size: 22px !important;
    line-height: 1.2 !important;
  }
}
</style>
