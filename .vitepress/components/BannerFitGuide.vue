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
      <div class="fw-mobile-content">
        <img src="/fitness-icon_ban.svg" alt="Icon" class="fw-icon" />
        <div class="fw-mobile-text">
          <h3 class="fw-title">Экстра-удержание<br><span class="big">клиентов</span></h3>
          <p class="fw-subtitle">Неочевидная логика устойчивого фитнес-бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="fw-button fw-mobile-btn" @click.stop>
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<style scoped>
.fw-container {
  font-family: 'Inter', sans-serif;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
}

.fw-button {
  text-decoration: none !important;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

.fw-button::before, .fw-button::after { content: none !important; }

/* Desktop */
.fw-desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  padding: 0 32px;
  background: #2d2d2d;
  color: #fff;
}

.fw-desktop-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.fw-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.fw-title {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  color: #fff;
}

.fw-subtitle {
  margin: 4px 0 0;
  font-size: 16px;
  color: #aaaaaa;
}

.fw-desktop-btn {
  background: transparent;
  color: #bfff00;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 24px;
  border: 2px solid #bfff00;
  border-radius: 8px;
  transition: all 0.2s;
}

.fw-desktop-btn:hover {
  background: #bfff00;
  color: #1a1a1a;
}

/* Mobile */
.fw-mobile {
  display: none;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  background: #2d2d2d;
  color: #fff;
}

.fw-mobile-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.big {
  font-size: 42px;
  line-height: 1;
  display: block;
}

.fw-mobile-btn {
  background: #bfff00;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 18px;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  transition: background 0.2s;
}

.fw-mobile-btn:hover {
  background: #a8e600;
}

@media (max-width: 768px) {
  .fw-desktop { display: none; }
  .fw-mobile { display: flex; }
}
</style>
