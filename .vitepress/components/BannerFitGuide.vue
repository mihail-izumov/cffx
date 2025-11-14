<script setup>
const openGuide = () => {
  window.open('/pro/guide/fitness', '_blank')
}
</script>

<template>
  <!-- Десктоп -->
  <div class="promo-block desktop">
    <div class="promo-icon-block">
      <img src="/widget-fitness-icon.svg" alt="Пиксельный огонь" class="promo-icon" />
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
      <img src="/widget-fitness-icon.svg" alt="Пиксельный огонь" class="promo-icon" />
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
  color: #fff;
  border-radius: 36px;
  font-family: 'Inter', system-ui, sans-serif;
  margin-bottom: 36px;
  width: 100%;
  box-sizing: border-box;
}

.promo-block.desktop {
  min-height: 160px;
  max-width: 100%;
  padding: 32px 36px;
  flex-direction: row;
  box-sizing: border-box;
}

.promo-block.mobile {
  flex-direction: column;
  min-height: 160px;
  padding: 32px 18px;
  box-sizing: border-box;
}

.promo-icon-block {
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  margin-right: 24px;
  border: 3px solid #dbff46;
  border-radius: 16px;
}

.promo-icon {
  width: 72px;
  height: 72px;
  display: block;
  background: none;
}

.promo-content {
  flex: 1;
  min-width: 0;
}

.promo-title {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.12;
}

.promo-block.mobile .promo-title {
  font-size: 1.6rem;
  margin-bottom: 10px;
  text-align: center;
}

.promo-subtitle {
  font-size: 1.16rem;
  color: #a6a6a6;
  margin-bottom: 0;
}

.promo-block.mobile .promo-subtitle {
  font-size: 1.08rem;
  text-align: center;
}

.promo-btn {
  margin-left: 48px;
  padding: 18px 0;
  min-width: 320px;
  border: 3px solid #dbff46;
  background: transparent;
  border-radius: 22px;
  color: #dbff46;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.16s, color 0.16s;
  box-sizing: border-box;
}

.promo-btn:hover {
  border-color: #d2f800;
  color: #d2f800;
}

.promo-block.mobile .promo-btn {
  margin-left: 0;
  margin-top: 24px;
  width: 100%;
  font-size: 1.2rem;
  padding: 18px 0;
}

/* Скрытие/показ версий */
.desktop { display: flex; }
.mobile { display: none; }

@media (max-width: 720px) {
  .desktop { display: none; }
  .mobile { display: flex; }
}
</style>
