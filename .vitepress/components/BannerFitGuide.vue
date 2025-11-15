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
      <div class="mobile-top">
        <img src="/fitness-icon_ban.svg" alt="" class="icon" />
      </div>
      <div class="mobile-title">Экстра-удержание<br><span>клиентов</span></div>
      <div class="mobile-subtitle">Неочевидная логика устойчивого<br>фитнес-бизнеса</div>
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
  border-radius: 12px;
  overflow: hidden;
}

/* УБИВАЕМ ВСЕ АРТЕФАКТЫ VITEPRESS РАЗ И НАВСЕГДА */
.fitness-widget a */
.fitness-widget a {
  text-decoration: none !important;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent !important;
  position: relative !important;
}

.fitness-widget a::before,
.fitness-widget a::after {
  content: none !important;
}

/* Desktop */
.desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 124px; /* именно такая высота на твоём скриншоте */
  padding: 0 28px;
  background: #2d2d2d;
  color: #fff;
}

.left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.icon {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
}

.title {
  margin: 0;
  font-weight: 600;
  font-size: 26px;
  line-height: 1.2;
}

.subtitle {
  margin: 6px 0 0;
  font-size: 16px;
  color: #aaaaaa;
}

.desktop-btn {
  background: transparent;
  color: #bfff00;
  font-weight: 600;
  font-size: 18px;
  padding: 11px 28px;
  border: 2px solid #bfff00;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.desktop-btn:hover {
  background: #bfff00;
  color: #111;
}

/* Mobile */
.mobile {
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 40px;
  background: #2d2d2d;
  text-align: center;
  color: #fff;
}

.mobile-top {
  margin-bottom: 8px;
}

.mobile-title {
  font-weight: 600;
  font-size: 28px;
  line-height: 1.1;
  margin: 0 0 12px 0;
}

.mobile-title span {
  font-size: 48px;
  display: block;
}

.mobile-subtitle {
  font-size: 18px;
  color: #aaaaaa;
  line-height: 1.4;
  margin-bottom: 32px;
}

.mobile-btn {
  background: #bfff00;
  color: #111;
  font-weight: 600;
  font-size: 18px;
  padding: 18px;
  border-radius: 12px;
  width: 100%;
  max-width: 340px;
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
