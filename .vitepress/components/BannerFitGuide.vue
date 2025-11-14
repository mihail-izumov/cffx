<script setup>
const openGuide = () => {
  window.open('/pro/guide/fitness', '_blank')
}
</script>

<template>
  <!-- Десктоп -->
  <div class="promo-block desktop">
    <img src="/image.png" alt="Пиксельный огонь" class="promo-icon" />
    <div class="promo-content">
      <div class="promo-title">Экстра-удержание клиентов</div>
      <div class="promo-subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
    </div>
    <button class="promo-btn" @click="openGuide">
      Гид для фитнеса
    </button>
  </div>

  <!-- Мобильная версия -->
  <div class="promo-block mobile">
    <img src="/image.png" alt="Пиксельный огонь" class="promo-icon" />
    <div class="promo-content">
      <div class="promo-title">Экстра-удержание клиентов</div>
      <div class="promo-subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
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
  background: #222;
  color: #fff;
  border-radius: 24px;
  font-family: 'Inter', system-ui, sans-serif;
  margin-bottom: 24px;
  width: 100%;
}
.promo-block.desktop {
  min-height: 160px;
  padding: 24px 32px;
  flex-direction: row;
}
.promo-block.mobile {
  flex-direction: column;
  min-height: 120px;
  padding: 18px 16px;
}
.promo-icon {
  width: 56px;
  height: 56px;
  margin-right: 22px;
}
.promo-block.mobile .promo-icon {
  margin-bottom: 8px;
  margin-right: 0;
}
.promo-content {
  flex: 1;
  min-width: 0;
}
.promo-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 6px;
  line-height: 1.15;
}
.promo-block.mobile .promo-title {
  font-size: 1.3rem;
  text-align: left;
}
.promo-subtitle {
  font-size: 1.12rem;
  color: #aaa;
  margin-bottom: 0;
}
.promo-block.mobile .promo-subtitle {
  font-size: 1rem;
}
.promo-btn {
  margin-left: 32px;
  padding: 12px 32px;
  border: 2px solid #d5ff44;
  background: transparent;
  border-radius: 16px;
  color: #d5ff44;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.16s, color 0.16s;
}
.promo-btn:hover {
  border-color: #fae800;
  color: #fae800;
}
.promo-block.mobile .promo-btn {
  margin-left: 0;
  margin-top: 18px;
  width: 100%;
  font-size: 1.12rem;
  padding: 10px 0;
}
/* Скрытие/показ версий */
.desktop { display: flex; }
.mobile { display: none; }
@media (max-width: 650px) {
  .desktop { display: none; }
  .mobile { display: flex; }
}
</style>
