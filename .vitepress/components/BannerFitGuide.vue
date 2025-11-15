<script setup>
const openGuide = () => {
  window.open('/pro/guide/fitness', '_blank')
}
</script>

<template>
  <!-- Десктоп -->
  <div class="promo-block desktop">
    <div class="promo-icon-block">
      <img src="/widget-fitness-icon.svg" alt="Огонь" class="promo-icon" />
    </div>
    <div class="promo-content">
      <div class="promo-title">Экстра-удержание клиентов</div>
      <div class="promo-subtitle">
        Неочевидная логика устойчивого фитнес-бизнеса
      </div>
    </div>
    <button class="promo-btn" @click="openGuide">
      Гид для фитнеса
    </button>
  </div>

  <!-- Мобильная версия -->
  <div class="promo-block mobile">
    <div class="promo-icon-block">
      <img src="/widget-fitness-icon.svg" alt="Огонь" class="promo-icon" />
    </div>
    <div class="promo-content">
      <div class="promo-title">Экстра-удержание клиентов</div>
      <div class="promo-subtitle">
        Неочевидная логика устойчивого фитнес-бизнеса
      </div>
    </div>
    <button class="promo-btn" @click="openGuide">
      Гид для фитнеса
    </button>
  </div>
</template>

<style scoped>
.promo-block {
  display: flex;
  align-items: center;
  background: #232323;
  border-radius: 28px;
  width: 100%;
  font-family: 'Inter', system-ui, sans-serif;
  box-sizing: border-box;
  color: #fff;
}
.promo-block.desktop {
  min-height: 160px;
  max-width: 100%;
  padding: 16px 32px;
  flex-direction: row;
}
.promo-block.mobile {
  flex-direction: column;
  min-height: 156px;
  padding: 18px 12px 24px 12px;
}
.promo-icon-block {
  width: 98px;
  height: 98px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border-radius: 16px;
  border: 2.8px solid #d5ff44;
  margin-right: 18px;
  margin-bottom: 0;
}
.promo-block.mobile .promo-icon-block {
  margin-right: 0;
  margin-bottom: 10px;
  align-self: flex-start;
}
.promo-icon {
  width: 64px;
  height: 64px;
  display: block;
}
.promo-content {
  flex: 1;
  min-width: 0;
}
.promo-title {
  font-size: 2rem;
  font-weight: 700;
  white-space: nowrap;
  margin-bottom: 7px;
  line-height: 1.16;
}
.promo-subtitle {
  font-size: 1.1rem;
  color: #acacac;
  white-space: nowrap;
  margin-bottom: 0;
}
.promo-block.mobile .promo-title,
.promo-block.mobile .promo-subtitle {
  text-align: left;
}
.promo-btn {
  margin-left: 24px;
  padding: 13px 38px;
  border: 2.5px solid #d5ff44;
  background: transparent;
  border-radius: 17px;
  color: #d5ff44;
  font-size: 1.37rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.16s, color 0.16s;
  box-sizing: border-box;
}
.promo-btn:hover {
  border-color: #f6ff44;
  color: #f6ff44;
}
.promo-block.mobile .promo-btn {
  margin-left: 0;
  margin-top: 22px;
  width: 100%;
  font-size: 1.17rem;
  padding: 12px 0;
}
/* Адаптация для мобильного */
.desktop { display: flex; }
.mobile { display: none; }
@media (max-width: 650px) {
  .desktop { display: none; }
  .mobile { display: flex; }
}
</style>
