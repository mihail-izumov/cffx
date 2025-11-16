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
      <div class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
      <div class="title">Экстра-удержание клиентов</div>
      <a href="/pro/guide/fitness" target="_blank" class="btn">
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<script setup>
// ok
</script>

<style scoped>
.fitness-guide-banner {
  font-family: 'Inter', sans-serif;
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
}

.fitness-guide-banner a {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* Десктоп */
.desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 16px; /* было 32px, стало в 2 раза меньше */
  background: #2d2d2d;
  color: #fff;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 58px; /* увеличено с 48px на 20% */
  height: 58px;
  flex-shrink: 0;
}

.desktop .title {
  font-size: 20px; /* было 24px, стало на 2 меньше */
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
  margin-right: 0; /* кнопка ближе к краю вслед за уменьшением паддинга */
}

.desktop .btn:hover {
  background: #bfff00;
  color: #111;
}

/* Мобильная версия */
.mobile {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 10px; /* вертикальный паддинг одинаковый сверху и снизу (18px) */
  background: #2d2d2d;
  color: #fff;
  min-width: 0;
}

.mobile .icon {
  width: 58px; /* также увеличена */
  height: 58px;
  margin-bottom: 3px; /* минимальный отступ до серого текста */
}

.mobile .subtitle {
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.27;
  margin: 0 0 3px 0; /* минимальный отступ снизу до заголовка */
  padding-left: 0; /* выровнено по иконке */
  text-align: left;
}

.mobile .title {
  font-size: 20px; /* на 2 кегля меньше */
  font-weight: 600;
  margin: 0 0 7px 0;
  line-height: 1.1;
  text-align: left;
}

.mobile .btn {
  width: 100%;
  background: transparent;
  color: #bfff00;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  border: 2px solid #bfff00;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-top: auto;
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
