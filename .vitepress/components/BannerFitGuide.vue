<template>
  <div class="fitness-widget-container">
    <!-- Desktop -->
    <div class="fitness-widget-desktop">
      <div class="fitness-widget-desktop-content">
        <img src="/fitness-icon_ban.svg" alt="Icon" class="fitness-widget-icon" />
        <div class="fitness-widget-desktop-text">
          <h3 class="fitness-widget-title">Экстра-удержание клиентов</h3>
          <p class="fitness-widget-subtitle">Неочевидная логика устойчивого бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="fitness-widget-button fitness-widget-desktop-button" @click.stop>
        Гид для фитнеса
      </a>
    </div>

    <!-- Mobile -->
    <div class="fitness-widget-mobile">
      <div class="fitness-widget-mobile-top">
        <img src="/fitness-icon_ban.svg" alt="Icon" class="fitness-widget-icon" />
        <div class="fitness-widget-mobile-text">
          <h3 class="fitness-widget-title">Экстра-удержание клиентов</h3>
          <p class="fitness-widget-subtitle">Неочевидная логика устойчивого фитнес-бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="fitness-widget-button fitness-widget-mobile-button" @click.stop>
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<script setup>
// no logic
</script>

<style scoped>
/* -------------------------------------------------
   Общие стили (изолированные классы для защиты от VitePress)
   ------------------------------------------------- */
.fitness-widget-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
}

/* Полностью изолируем ссылку от VitePress стилей */
.fitness-widget-button {
  text-decoration: none !important;
  color: inherit !important;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent !important;
  border-bottom: none !important;
}

.fitness-widget-button::before,
.fitness-widget-button::after {
  content: none !important;
}

/* -------------------------------------------------
   Desktop (≥ 769px)
   ------------------------------------------------- */
.fitness-widget-desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px; /* Уменьшена высота для соответствия отступам */
  padding: 0 24px;
  background: #2d2d2d;
  color: #fff;
}

.fitness-widget-desktop-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.fitness-widget-icon {
  width: 64px; /* Увеличен размер для соответствия отступам */
  height: 64px;
  flex-shrink: 0;
}

.fitness-widget-desktop-text .fitness-widget-title {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  color: #fff;
}

.fitness-widget-desktop-text .fitness-widget-subtitle {
  margin: 4px 0 0;
  font-size: 16px;
  line-height: 1.4;
  color: #aaaaaa;
}

.fitness-widget-desktop-button {
  background: transparent;
  color: #bfff00;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 24px;
  border: 2px solid #bfff00;
  border-radius: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.fitness-widget-desktop-button:hover {
  background: #bfff00;
  color: #1a1a1a; /* Тёмный цвет текста при hover */
}

/* -------------------------------------------------
   Mobile (< 769px)
   ------------------------------------------------- */
.fitness-widget-mobile {
  display: none;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  background: #2d2d2d;
  color: #fff;
}

.fitness-widget-mobile-top {
  display: flex;
  align-items: center;
  gap: 16px;
}

.fitness-widget-mobile-text .fitness-widget-title {
  margin: 0;
  font-weight: 600;
  font-size: 24px; /* Один в один с десктопом */
  line-height: 1.2;
  color: #fff;
}

.fitness-widget-mobile-text .fitness-widget-subtitle {
  margin: 4px 0 0;
  font-size: 16px; /* Один в один с десктопом */
  line-height: 1.4;
  color: #aaaaaa;
}

.fitness-widget-mobile-button {
  background: transparent;
  color: #bfff00;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 24px;
  border: 2px solid #bfff00;
  border-radius: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
  width: 100%;
  text-align: center;
}

.fitness-widget-mobile-button:hover {
  background: #bfff00;
  color: #1a1a1a; /* Тёмный цвет текста при hover */
}

/* -------------------------------------------------
   Адаптивность
   ------------------------------------------------- */
@media (max-width: 768px) {
  .fitness-widget-desktop { display: none; }
  .fitness-widget-mobile   { display: flex; }
}
</style>
