---
outline: false
prev: false
next: false
pageClass: centered-page
title: Отправьте Сигнал – Корж, Skuratov, Surf, Mosaic, Белотурка, Кэрри
description: Сигнал – тому кто решает
---
<SignalItemsSlider />

<div align="center">

<BadgeCounter />

<h1 class="responsive-heading">Ваш Сигнал — тому,<br>кто решает в ресторане.</h1>

<p>
  Без регистрации.<br class="mobile-break"> <strong>Результат — в течение дня.</strong>
</p>

</div>

<MainSignalWidgetsCoffee />

<br>

<RadarWorksBadge />


<style>
/* БАЗОВЫЙ СТИЛЬ (Десктоп) */
.vp-doc h1.responsive-heading {
  font-size: 52px !important;
  line-height: 1.1 !important;
  margin: 0 0 20px 0 !important;
  padding-top: 0 !important;
  font-weight: 700 !important;
}

/* ПЛАНШЕТЫ (от 601px до 768px) 
   Используем min-width, чтобы это правило НЕ касалось телефонов */
@media screen and (min-width: 601px) and (max-width: 768px) {
  .vp-doc h1.responsive-heading {
    font-size: 32px !important;
    line-height: 1.2 !important;
    margin-bottom: 15px !important;
  }
}

/* ТЕЛЕФОНЫ (всё, что меньше 600px) 
   Увеличили порог с 480 до 600, чтобы точно поймать все мобильные */
@media screen and (max-width: 600px) {
  .vp-doc h1.responsive-heading {
    font-size: 15px !important;
    line-height: 1.2 !important;
    margin-bottom: 15px !important;
    /* ВРЕМЕННО: Красный фон для проверки. Если фон красный — медиа-запрос работает! */
    /* background-color: red !important; */
  }
}
</style>
