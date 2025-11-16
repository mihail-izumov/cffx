<template>
  <div class="fitness-widget">
    <!-- Desktop -->
    <div class="desktop">
      <div class="left">
        <img src="/fitness-icon_ban.svg" alt="" class="icon" />
        <div class="text">
          <h3 class="title">Экстра-удержание клиентов</h3>
          <p class="subtitle">Неочевидная логика устойчивого бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="btn desktop-btn">
        Гид для фитнеса
      </a>
    </div>

    <!-- Mobile -->
    <div class="mobile">
      <img src="/fitness-icon_ban.svg" alt="" class="icon" />
      <h3 class="title">
        Экстра-удержание<br><span>клиентов</span>
      </h3>
      <p class="subtitle">
        Неочевидная логика устойчивого<br>фитнес-бизнеса
      </p>
      <a href="/pro/guide/fitness" target="_blank" class="btn mobile-btn">
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<script setup>
// ничего не нужно
</script>

<style scoped>
.fitness-widget {
  font-family: 'Inter', sans-serif;
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
}

/* Полное подавление всех стилей VitePress/Vue для ссылок */
.fitness-widget a {
  {
  all: unset !important;
  display: inline-block !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
}

/* Desktop — точно как на твоём последнем скриншоте */
.desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 108px;
  padding: 0 24px;
  background: #2d2d2d;
  color: #fff;
}

.left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.title {
  margin: 0;
  font-weight: 600;
  font-size: 28px;
  line-height: 1.2;
  color: #fff;
}

.subtitle {
  margin: 6px 0 0;
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.3;
}

.desktop-btn {
  color: #bfff00;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 28px;
  border: 2px solid #bfff00;
  border-radius: 12px;
  transition: all 0.25s ease;
}

.desktop-btn:hover {
  background: #bfff00;
  color: #111;
}

/* Mobile — точно как на твоём последнем скриншоте */
.mobile {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  gap: 20px;
  background: #2d2d2d;
  text-align: center;
  color: #fff;
}

.mobile .icon {
  width: 80px;
  height: 80px;
}

.mobile .title {
  font-weight: 600;
  font-size: 32px;
  line-height: 1;
  margin: 0;
}

.mobile .title span {
  font-size: 64px;
  display: block;
  line-height: 1;
}

.mobile .subtitle {
  font-size: 18px;
  color: #aaaaaa;
  line-height: 1.4;
  margin: 0;
}

.mobile-btn {
  background: #bfff00;
  color: #111;
  font-weight: 600;
  font-size: 20px;
  padding: 20px;
  border-radius: 16px;
  width: 100%;
  max-width: 360px;
  transition: background 0.25s ease;
}

.mobile-btn:hover {
  background: #a8e600;
}

/* Адаптивность */
@media (max-width: 768px) {
  .desktop { display: none; }
  .mobile { display: flex; }
}
</style>
