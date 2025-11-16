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
      <div class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
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

/* Мобильная версия — как десктоп по размерам, в два ряда: иконка+заголовок, ниже subtitle, еще ниже кнопка */
.mobile {
  display: none;
  flex-direction: column;
  align-items: stretch;
  padding: 20px 18px 26px;
  background: #2d2d2d;
  color: #fff;
  text-align: left;
  gap: 12px;
}

.mobile .row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.mobile .icon {
  width: 48px;
  height: 48px;
}

.mobile .title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  line-height: 1.1;
}

.mobile .subtitle {
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.4;
  margin: 8px 0 0 60px; /* склонен выравнивать с заголовком/иконкой */
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
  margin-top: 18px;
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
<template>
  <div class="banner">
    <div class="icon-block">
      <img src="/path-to-your-icon.svg" alt="icon" class="icon" />
    </div>
    <div class="content-block">
      <div class="title">Экстра-удержание клиентов</div>
      <div class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
    </div>
    <button class="guide-btn">Гид для фитнеса</button>
  </div>
</template>

<style scoped>
.banner {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  background: #232325;
  border-radius: 28px;
  /* уменьшена высота контейнера для плотности */
}

.icon-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  background: #232325;
  border-radius: 16px;
  /* уменьшено со всех сторон */
}

.icon {
  width: 48px; /* допустим, раньше было 40px, стало +20% */
  height: 48px;
}

/* Контент */
.content-block {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 2.3rem;
  font-weight: bold;
  color: #fff;
  line-height: 1.15;
}

.subtitle {
  font-size: 1.4rem;
  color: #A1A1AA;
  margin-top: 4px;
}

/* Кнопка */
.guide-btn {
  font-size: 2rem;
  font-weight: 600;
  color: #D7FF36;
  background: transparent;
  border: 3px solid #D7FF36;
  border-radius: 16px;
  padding: 14px 36px 12px 36px;
  margin-left: 24px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

/* Мобильный вид */
@media (max-width: 640px) {
  .banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }
  .icon-block {
    margin-bottom: 0;
    /* Оставляем размеры иконки такими же */
  }
  .content-block {
    width: 100%;
  }
  .title {
    margin-top: 8px;
    /* Размер остаётся таким же */
  }
  .subtitle {
    margin-top: 8px;
    /* Переносим под заголовок */
  }
  .guide-btn {
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>
