<template>
  <div
    class="guide-banner"
  >
    <div class="banner-content">
      <div class="guide-banner__icon">
        <!-- SVG или <img> иконка -->
        <slot name="icon">
          <svg width="48" height="48" viewBox="0 0 48 48"><!-- ваша svg тут --></svg>
        </slot>
      </div>
      <div class="guide-banner__info">
        <div class="guide-banner__title-row">
          <span class="guide-banner__title">Экстра-удержание клиентов</span>
        </div>
        <div class="guide-banner__subtitle">
          Неочевидная логика устойчивого фитнес-бизнеса
        </div>
      </div>
      <button class="guide-banner__btn">Гид для фитнеса</button>
    </div>
  </div>
</template>

<style scoped>
.guide-banner {
  background: #232323;
  border-radius: 24px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  /* Минимизируем высоту контейнера */
}

.banner-content {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
  padding: 0; /* Уменьшаем отступы */
}

.guide-banner__icon {
  min-width: 58px; /* 20% больше от 48px, если раньше была 40px—сделайте 48px */
  min-height: 58px;
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: #292929;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px 0 0;
}

.guide-banner__info {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 4px;
}

.guide-banner__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.guide-banner__title {
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.1;
  /* Без переноса — если критично, можно добавить */
}

.guide-banner__subtitle {
  color: #b2b2b2;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.1;
}

.guide-banner__btn {
  background: transparent;
  border: 3px solid #ccff32;
  color: #ccff32;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 16px;
  padding: 10px 32px;
  margin-left: 16px;
  transition: 0.1s;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
}

/* Мобайл — всё то же что на десктопе! */
@media (max-width: 600px) {
  .guide-banner {
    padding: 12px 10px;
  }
  .banner-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .guide-banner__icon,
  .guide-banner__info,
  .guide-banner__btn {
    margin: 0;
  }
  .guide-banner__title-row {
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;
  }
  .guide-banner__info {
    order: 2;
    width: 100%;
  }
  .guide-banner__icon {
    order: 1;
    align-self: flex-start;
    /* Сохраняет размер! */
  }
  .guide-banner__btn {
    order: 3;
    align-self: stretch;
    width: 100%;
    margin-top: 8px;
  }
}

</style>
