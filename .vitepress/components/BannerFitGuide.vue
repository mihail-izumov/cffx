<template>
  <div class="fitness-widget">
    <!-- Desktop -->
    <div class="desktop">
      <div class="desktop-content">
        <img src="/widget-fitness-icon.svg" alt="Icon" class="icon" />
        <div class="desktop-text">
          <h3 class="title">Экстра-удержание клиентов</h3>
          <p class="subtitle">Неочевидная логика устойчивого бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="button desktop-button">
        Гид для фитнеса
      </a>
    </div>

    <!-- Mobile -->
    <div class="mobile">
      <div class="mobile-top">
        <img src="/widget-fitness-icon.svg" alt="Icon" class="icon" />
        <div class="mobile-text">
          <h3 class="title">Экстра-удержание клиентов</h3>
          <p class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="button mobile-button">
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<script setup>
// no logic needed
</script>

<style scoped>
/* -------------------------------------------------
   Общие стили
   ------------------------------------------------- */
.fitness-widget {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
}

/* Убираем любые подчёркивания и артефакты VitePress */
.fitness-widget a {
  text-decoration: none !important;
  color: inherit !important;
  outline: none !important;
}

/* -------------------------------------------------
   Desktop (≥ 769px)
   ------------------------------------------------- */
.desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  padding: 0 32px;
  background: #2d2d2d;
  color: #fff;
}

.desktop-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.icon {
  width: 115px;
  height: 115px;
  margin: 25px 0; /* 25px сверху и снизу */
  flex-shrink: 0;
}

.desktop-text .title {
  margin: 0;
  font-weight: 600;
  font-size: 42px;
  line-height: 1.2;
  color: #fff;
}

.desktop-text .subtitle {
  margin: 8px 0 0;
  font-size: 32px;
  line-height: 1.2;
  color: #aaaaaa;
}

.desktop-button {
  background: #bfff00;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 32px;
  border-radius: 8px;
  white-space: nowrap;
  transition: background 0.2s ease;
}

.desktop-button:hover {
  background: #a8e600;
}

/* -------------------------------------------------
   Mobile (< 769px)
   ------------------------------------------------- */
.mobile {
  display: none;
  flex-direction: column;
  height: 380px;
  padding: 32px 24px;
  gap: 32px;
  background: #2d2d2d;
  color: #fff;
  justify-content: space-between;
}

.mobile-top {
  display: flex;
  align-items: center;
  gap: 24px;
}

.mobile-text .title {
  margin: 0;
  font-weight: 600;
  font-size: 42px;
  line-height: 1.2;
  color: #fff;
}

.mobile-text .subtitle {
  margin: 8px 0 0;
  font-size: 32px;
  line-height: 1.2;
  color: #aaaaaa;
}

.mobile-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #bfff00;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 18px;
  padding: 16px;
  border-radius: 8px;
  transition: background 0.2s ease;
  width: 100%;
}

.mobile-button:hover {
  background: #a8e600;
}

/* -------------------------------------------------
   Адаптивность
   ------------------------------------------------- */
@media (max-width: 768px) {
  .desktop { display: none; }
  .mobile   { display: flex; }
}
</style>
