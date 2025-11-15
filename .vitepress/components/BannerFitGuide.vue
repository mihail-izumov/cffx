<template>
  <div class="fitness-widget">
    <!-- Desktop -->
    <a href="/pro/guide/fitness" target="_blank" class="desktop">
      <div class="desktop-content">
        <img src="/widget-fitness-icon.svg" alt="Icon" class="icon" />
        <div class="desktop-text">
          <h3 class="title">Экстра-удержание клиентов</h3>
          <p class="subtitle">Неочевидная логика устойчивого бизнеса</p>
        </div>
      </div>
      <div class="desktop-button">Гид для фитнеса</div>
    </a>

    <!-- Mobile -->
    <a href="/pro/guide/fitness" target="_blank" class="mobile">
      <div class="mobile-top">
        <img src="/widget-fitness-icon.svg" alt="Icon" class="icon" />
        <div class="mobile-text">
          <h3 class="title">Экстра-удержание клиентов</h3>
          <p class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</p>
        </div>
      </div>
      <div class="mobile-button">Гид для фитнеса</div>
    </a>
  </div>
</template>

<script setup>
// ничего не нужно
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

/* убираем любые подчёркивания от VitePress */
.fitness-widget a {
  text-decoration: none !important;
  color: inherit !important;
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
  gap: 16px;
}

.icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.desktop-text .title {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  color: #fff;
}

.desktop-text .subtitle {
  margin: 4px 0 0;
  font-size: 16px;
  line-height: 1.4;
  color: #aaaaaa;
}

.desktop-button {
  background: #bfff00;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 24px;
  border-radius: 8px;
  white-space: nowrap;
}

/* hover без артефактов */
.desktop:hover .desktop-button {
  background: #a8e600;
}

/* -------------------------------------------------
   Mobile (< 769px)
   ------------------------------------------------- */
.mobile {
  display: none;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  background: #2d2d2d;
  color: #fff;
}

.mobile-top {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mobile-text .title {
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  color: #fff;
}

.mobile-text .subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 1.4;
  color: #aaaaaa;
}

.mobile-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: #bfff00;
  font-weight: 600;
  font-size: 16px;
  padding: 14px;
  border: 2px solid #bfff00;
  border-radius: 8px;
}

/* hover без артефактов */
.mobile:hover .mobile-button {
  background: #bfff00;
  color: #1a1a1a;
}

/* -------------------------------------------------
   Адаптивность
   ------------------------------------------------- */
@media (max-width: 768px) {
  .desktop { display: none; }
  .mobile   { display: flex; }
}
</style>
