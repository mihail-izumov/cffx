<template>
  <div class="fw-container">
    <!-- Desktop -->
    <div class="fw-desktop">
      <div class="fw-desktop-content">
        <img src="/fitness-icon_ban.svg" alt="Icon" class="fw-icon" />
        <div class="fw-desktop-text">
          <h3 class="fw-title">Экстра-удержание клиентов</h3>
          <p class="fw-subtitle">Неочевидная логика устойчивого бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="fw-button fw-desktop-btn" @click.stop>
        Гид для фитнеса
      </a>
    </div>

    <!-- Mobile -->
    <div class="fw-mobile">
      <div class="fw-mobile-top">
        <img src="/fitness-icon_ban.svg" alt="Icon" class="fw-icon" />
      </div>
      <div class="fw-mobile-text">
        <h3 class="fw-title">Экстра-удержание клиентов</h3>
        <p class="fw-subtitle">Неочевидная логика устойчивого фитнес-бизнеса</p>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="fw-button fw-mobile-btn" @click.stop>
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
   Изоляция от VitePress: уникальные префиксы + !important
   ------------------------------------------------- */
.fw-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  max-width: 100%;
}

/* Полная защита от VitePress */
.fw-button {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-decoration: none !important;
  color: inherit !important;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent !important;
  border: none !important;
  cursor: pointer !important;
}

.fw-button::before,
.fw-button::after {
  content: none !important;
}

/* -------------------------------------------------
   Desktop (≥ 769px)
   ------------------------------------------------- */
.fw-desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 16px;
  background: #2d2d2d;
  color: #fff;
}

.fw-desktop-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fw-icon {
  width: 56px;
  height: 56px;
  margin: 8px 0;
  flex-shrink: 0;
}

.fw-desktop-text .fw-title {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  color: #fff;
}

.fw-desktop-text .fw-subtitle {
  margin: 2px 0 0;
  font-size: 16px;
  line-height: 1.4;
  color: #aaaaaa;
}

.fw-desktop-btn {
  background: transparent;
  color: #bfff00;
  font-weight: 600;
  font-size: 18px;
  padding: 8px 20px;
  border: 2px solid #bfff00;
  border-radius: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.fw-desktop-btn:hover {
  background: #bfff00;
  color: #1a1a1a;
}

/* -------------------------------------------------
   Mobile (< 769px)
   ------------------------------------------------- */
.fw-mobile {
  display: none;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
  background: #2d2d2d;
  color: #fff;
}

.fw-mobile-top {
  display: flex;
  justify-content: flex-start;
}

.fw-mobile-text {
  text-align: left;
}

.fw-mobile-text .fw-title {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  color: #fff;
}

.fw-mobile-text .fw-subtitle {
  margin: 4px 0 0;
  font-size: 16px;
  line-height: 1.4;
  color: #aaaaaa;
}

.fw-mobile-btn {
  background: #bfff00;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 18px;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  transition: background 0.2s ease;
}

.fw-mobile-btn:hover {
  background: #a8e600;
  color: #1a1a1a;
}

/* -------------------------------------------------
   Адаптивность
   ------------------------------------------------- */
@media (max-width: 768px) {
  .fw-desktop { display: none; }
  .fw-mobile   { display: flex; }
}
</style>
