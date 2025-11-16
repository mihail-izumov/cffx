<template>
  <div class="fitness-guide-banner">
    <!-- Desktop -->
    <div class="desktop">
      <div class="left">
        <img src="/fitness-icon_ban.svg" alt="" class="icon" />
        <div class="text">
          <div class="title">Экстра-удержание клиентов</div>
          <div class="subtitle">Неочевидная логика устойчивого бизнеса</div>
        </div>
      </div>

      <a href="/pro/guide/fitness" target="_blank" class="btn">
        Гид для фитнеса
      </a>
    </div>

    <!-- Mobile -->
    <div class="mobile">
      <img src="/fitness-icon_ban.svg" alt="" class="icon" />
      <div class="title">Экстра-удержание<br><strong>клиентов</strong></div>
      <div class="subtitle">Неочевидная логика устойчивого<br>фитнес-бизнеса</div>
      <a href="/pro/guide/fitness" target="_blank" class="btn">
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<script setup>
// ok></script>

<style scoped>
.fitness-guide-banner {
  font-family: 'Inter', sans-serif;
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
}

/* Убиваем ВитеПресс навсегда */
.fitness-guide-banner a {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* Десктоп — 160px высота, точно как в задании */
.desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  padding: 0 32px;
  background: #2d2d2d;
  color: #fff;
}

.left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.desktop .title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.desktop .subtitle {
  font-size: 16px;
  color: #aaaaaa;
  margin: 4px 0 0 0;
}

.desktop .btn {
  font-size: 18px;
  font-weight: 600;
  color: #bfff00;
  background: transparent;
  border: 2px solid #bfff00;
  border-radius: 8px;
  padding: 12px 24px;
  transition: all 0.2s ease;
}

.desktop .btn:hover {
  background: #bfff00;
  color: #111;
}

/* Мобильная версия — точно как в твоём оригинальном задании */
.mobile {
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 40px;
  background: #2d2d2d;
  color: #fff;
  text-align: center;
  gap: 16px;
}

.mobile .icon {
  width: 48px;
  height: 48px;
}

.mobile .title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.1;
  margin: 0;
}

.mobile .title strong {
  font-size: 42px;
  font-weight: 600;
  display: block;
  line-height: 1;
}

.mobile .subtitle {
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.4;
  margin: 8px 0 24px 0;
}

.mobile .btn {
  width: 100%;
  background: transparent;
  color: #bfff00;
  font-size: 16px;
  font-weight: 600;
  padding: 14px;
  border: 2px solid #bfff00;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.mobile .btn:hover {
  background: #bfff00;
  color: #111;
}

@media (max-width: 768px) {
  .desktop { display: none; }
  .mobile { display: flex; }
}
</style>
