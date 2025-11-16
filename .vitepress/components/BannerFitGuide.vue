<template>
  <div class="fitness-guide-banner">
    <!-- Desktop & Mobile (одинаковая структура, только расположение меняется) -->
    <a href="/pro/guide/fitness" target="_blank" class="banner-link">
      <div class="content">
        <img src="/fitness-icon_ban.svg" alt="" class="icon" />
        <div class="text-block">
          <div class="title">Экстра-удержание клиентов</div>
          <div class="subtitle">
            <span class="desktop-only">Неочевидная логика устойчивого бизнеса</span>
            <span class="mobile-only">Неочевидная логика устойчивого<br>фитнес-бизнеса</span>
          </div>
        </div>
      </div>
      <div class="button">Гид для фитнеса</div>
    </a>
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

/* Убиваем ВитеПресс полностью */
.fitness-guide-banner a {
  all: unset;
  cursor: pointer;
  display: block;
  width: 100%;
}

/* Общий контейнер */
.banner-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 140px;
  padding: 0 28px;
  background: #2d2d2d;
  color: #fff;
  box-sizing: border-box;
}

.content {
  display: flex;
  align-items: center;
  gap: 18px;
}

.icon {
  width: 58px;   /* +20% от оригинальных 48px */
  height: 58px;
  flex-shrink: 0;
}

.title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
}

.subtitle {
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.4;
  margin-top: 4px;
}

.button {
  font-size: 18px;
  font-weight: 600;
  color: #bfff00;
  background: transparent;
  border: 2px solid #bfff00;
  border-radius: 8px;
  padding: 12px 28px;
  transition: all 0.2s ease;
}

.button:hover {
  background: #bfff00;
  color: #111;
}

/* Мобильная версия — почти как десктоп, но вертикально */
@media (max-width: 768px) {
  .banner-link {
    flex-direction: column;
    justify-content: center;
    height: auto;
    padding: 32px 24px;
    text-align: center;
    gap: 20px;
  }

  .content {
    flex-direction: column;
    gap: 12px;
  }

  .icon {
    width: 58px;
    height: 58px;
  }

  .title {
    font-size: 24px;
  }

  .subtitle {
    margin-top: 8px;
    font-size: 16px;
  }

  .button {
    width: 100%;
    max-width: 340px;
    padding: 16px;
  }

  .desktop-only {
    display: none;
  }
}

@media (min-width: 769px) {
  .mobile-only {
    display: none;
  }
}
</style>
