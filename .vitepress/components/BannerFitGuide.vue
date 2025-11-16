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
      <div class="row">
        <img src="/fitness-icon_ban.svg" alt="" class="icon" />
        <div class="title">Экстра-удержание клиентов</div>
      </div>
      <div class="subtitle">
        Кто удержал клиента? Вы или Система? Сигнал покажет сразу. Мы собрали. Вы управляете. Какая атмосфера в зале? Что гость хочет сказать о тренировке? Что важно сейчас? Настройте это.
      </div>
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
  padding: 0 16px;
  background: #2d2d2d;
  color: #fff;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 58px;
  height: 58px;
  flex-shrink: 0;
}

.desktop .title {
  font-size: 20px;
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

/* Мобильная версия */
.mobile {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 18px; /* одинаковый отступ слева, справа, сверху, снизу */
  background: #2d2d2d;
  color: #fff;
}

.mobile .row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.mobile .icon {
  width: 58px;
  height: 58px;
  flex-shrink: 0;
}

.mobile .title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  line-height: 1.1;
  /* равный отступ слева с иконкой и контейнером */
}

.mobile .subtitle {
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.27;
  margin: 8px 0 8px 0; /* минимальные одинаковые отступы сверху и снизу */
  padding-left: 0;
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
  margin-top: 0;
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
