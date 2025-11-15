<template>
  <div class="fitness-banner">

    <!-- DESKTOP -->
    <div class="banner-desktop">
      <div class="icon-wrap">
        <img src="/fitness-icon_ban.svg" alt="icon" class="icon" />
      </div>

      <div class="text-block">
        <h2 class="title">Экстра-удержание клиентов</h2>
        <p class="subtitle">Неочевидная логика устойчивого фитнеса</p>
      </div>

      <a
        href="/pro/guide/fitness"
        target="_blank"
        rel="noopener noreferrer"
        class="guide-btn"
      >
        Гид для фитнеса
      </a>
    </div>

    <!-- MOBILE -->
    <div class="banner-mobile">
      <div class="top-row">
        <div class="icon-wrap">
          <img src="/fitness-icon_ban.svg" alt="icon" class="icon" />
        </div>

        <h2 class="title">Экстра-удержание клиентов</h2>
      </div>

      <p class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</p>

      <a
        href="/pro/guide/fitness"
        target="_blank"
        rel="noopener noreferrer"
        class="guide-btn mobile"
      >
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<style scoped>
.fitness-banner {
  width: 100%;
  font-family: var(--vp-font-family-base, Inter, sans-serif);
  display: flex;
  flex-direction: column;
}

/* --------------------- DESKTOP ---------------------- */
.banner-desktop {
  display: flex;
  align-items: center;
  background: #242424;
  border-radius: 16px;
  padding: 24px;
  gap: 28px;
}

.icon-wrap {
  background: #333333;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 42px;
  height: 42px;
}

.text-block {
  display: flex;
  flex-direction: column;
}

.title {
  margin: 0;
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  margin: 6px 0 0;
  color: #9d9d9d;
  font-size: 20px;
}

.guide-btn {
  margin-left: auto;
  padding: 18px 32px;
  border-radius: 16px;
  border: 3px solid #ccff00;
  color: #ccff00;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.guide-btn:hover {
  opacity: 0.7;
}

/* --------------------- MOBILE ---------------------- */
.banner-mobile {
  display: none;
  flex-direction: column;
  background: #242424;
  border-radius: 16px;
  padding: 22px;
  gap: 14px;
}

.top-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.guide-btn.mobile {
  width: 100%;
  text-align: center;
}

/* --------------------- ADAPTIVE ---------------------- */
@media (max-width: 680px) {
  .banner-desktop {
    display: none;
  }
  .banner-mobile {
    display: flex;
  }

  .title {
    font-size: 26px;
  }
  .subtitle {
    font-size: 18px;
  }
}
</style>
