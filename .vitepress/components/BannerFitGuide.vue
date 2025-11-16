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
      <div class="title">Экстра-удержание клиентов</div>
      <div class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
      <a href="/pro/guide/fitness" target="_blank" class="btn">
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.fitness-guide-banner {
  font-family: 'Inter', sans-serif;
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
}

/* Полная защита от VitePress */
.fitness-guide-banner a {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* Desktop */
.desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 138px;                 /* уменьшено с 160px → иконка ближе к краям */
  padding: 0 32px;
  background: #2d2d2d;
  color: #fff;
}

.left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.icon {
  width: 58px;                   /* +20% от оригинальных 48px */
  height: 58px;
  flex-shrink: 0;
}

.title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  color: #fff;
}

.subtitle {
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.4;
  margin-top: 4px;
}

.btn {
  font-size: 18px;
  font-weight: 600;
  color: #bfff00;
  background: transparent;
  border: 2px solid #bfff00;
  border-radius: 8px;
  padding: 12px 28px;
  transition: all 0.2s ease;
}

.btn:hover {
  background: #bfff00;
  color: #111;
}

/* Mobile — теперь точно как ты просил: иконка + заголовок в одном ряду, подзаголовок под ними */
.mobile {
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 28px 24px 36px;
  background: #2d2d2d;
  color: #fff;
  text-align: center;
  gap: 16px;
}

.mobile .icon {
  width: 58px;
  height: 58px;
}

.mobile .title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
}

.mobile .subtitle {
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.4;
  margin: 0;
}

.mobile .btn {
  width: 100%;
  max-width: 340px;
  font-size: 18px;
  padding: 16px;
}

@media (max-width: 768px) {
  .desktop { display: none; }
  .mobile { display: flex; }
}
</style>
