<script setup>
const openGuide = () => {
  window.open('/pro/guide/fitness', '_blank')
}
</script>

<template>
  <!-- Десктоп -->
  <div class="promo desktop">
    <img class="promo-icon" src="/widget-fitness-icon.svg" alt="" draggable="false" />
    <div class="promo-content">
      <div class="promo-title">Экстра-удержание клиентов</div>
      <div class="promo-subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
    </div>
    <button class="promo-btn" @click="openGuide">Гид для фитнеса</button>
  </div>

  <!-- Мобильная версия -->
  <div class="promo mobile">
    <img class="promo-icon" src="/widget-fitness-icon.svg" alt="" draggable="false" />
    <div class="promo-content">
      <div class="promo-title">Экстра-удержание клиентов</div>
      <div class="promo-subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
    </div>
    <button class="promo-btn" @click="openGuide">Гид для фитнеса</button>
  </div>
</template>

<style scoped>
.promo {
  width: 100%;
  background: #232323;
  border-radius: 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0;
}

.desktop {
  min-height: 160px;
  flex-direction: row;
  padding: 28px 32px;
}

.mobile {
  flex-direction: column;
  align-items: stretch;
  padding: 28px 16px 24px 16px;
  min-height: 160px;
  display: none;
}

.promo-icon {
  width: 88px;
  height: 88px;
  border: 3px solid #d5ff44;
  border-radius: 16px;
  background: #232323;
  margin-right: 24px;
  flex-shrink: 0;
  display: block;
  box-sizing: border-box;
}

.mobile .promo-icon {
  margin: 0 auto 16px auto;
}

.promo-content {
  flex: 1;
  min-width: 0;
}

.promo-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;
  font-size: 2.15rem;
  line-height: 1.08;
  color: #fff;
  margin-bottom: 12px;
  white-space: nowrap;
}

.promo-subtitle {
  font-family: 'Inter', system-ui, sans-serif;
  color: #9c9c9c;
  font-size: 1.14rem;
  font-weight: 400;
  white-space: nowrap;
}

.promo-btn {
  margin-left: 36px;
  padding: 0 48px;
  height: 72px;
  border: 3px solid #d5ff44;
  border-radius: 22px;
  color: #d5ff44;
  background: transparent;
  font-size: 1.38rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.16s, color 0.16s;
  letter-spacing: 0.01em;
  box-sizing: border-box;
}

.promo-btn:hover {
  border-color: #eaff9a;
  color: #eaff9a;
}

@media (max-width: 710px) {
  .desktop { display: none; }
  .mobile { display: flex; }
  .promo-icon {
    width: 68px;
    height: 68px;
    margin-right: 0;
    margin-bottom: 12px;
  }
  .promo-content {
    align-items: center;
    margin-bottom: 16px;
  }
  .promo-title {
    font-size: 1.18rem;
    text-align: center;
    margin-bottom: 6px;
    white-space: normal;
  }
  .promo-subtitle {
    font-size: 0.95rem;
    text-align: center;
    white-space: normal;
  }
  .promo-btn {
    margin: 0;
    margin-top: 22px;
    width: 100%;
    padding: 0;
    height: 54px;
    font-size: 1.13rem;
  }
}
</style>
