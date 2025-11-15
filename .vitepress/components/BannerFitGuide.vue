<script setup>
const openGuide = () => {
  window.open('/pro/guide/fitness', '_blank')
}
</script>

<template>
  <!-- Десктоп -->
  <div class="promo desktop">
    <div class="icon-wrap">
      <img src="/widget-fitness-icon.svg" alt="Огонь фитнес" />
    </div>
    <div class="text-content">
      <div class="title">Экстра-удержание клиентов</div>
      <div class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
    </div>
    <button class="fitness-btn" @click="openGuide">Гид для фитнеса</button>
  </div>

  <!-- Мобильная -->
  <div class="promo mobile">
    <div class="icon-wrap">
      <img src="/widget-fitness-icon.svg" alt="Огонь фитнес" />
    </div>
    <div class="text-content">
      <div class="title">Экстра-удержание клиентов</div>
      <div class="subtitle">Неочевидная логика устойчивого фитнес-бизнеса</div>
    </div>
    <button class="fitness-btn" @click="openGuide">Гид для фитнеса</button>
  </div>
</template>

<style scoped>
.promo {
  display: flex;
  align-items: center;
  background: #232323;
  border-radius: 28px;
  width: 100%;
  box-sizing: border-box;
}

.desktop {
  min-height: 160px;
  padding: 28px 40px 28px 24px;
  flex-direction: row;
}

.mobile {
  min-height: 160px;
  flex-direction: column;
  padding: 24px 12px 24px 12px;
  align-items: stretch;
  display: none;
}

.icon-wrap {
  width: 112px;
  height: 112px;
  background: #232323;
  border: 3px solid #d5ff44;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
  flex-shrink: 0;
}

.icon-wrap img {
  width: 72px;
  height: 72px;
}

.text-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 2.15rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.07;
  white-space: nowrap; /* Чтобы не разбивалось! */
  margin-bottom: 11px;
}

.subtitle {
  color: #adadad;
  font-size: 1.15rem;
  font-family: 'Inter', system-ui, sans-serif;
  white-space: nowrap;
}

.fitness-btn {
  margin-left: 40px;
  padding: 0 48px;
  height: 70px;
  border: 3px solid #d5ff44;
  border-radius: 22px;
  color: #d5ff44;
  font-size: 1.55rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;
  background: transparent;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: all 0.18s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fitness-btn:hover {
  border-color: #eaff9a;
  color: #eaff9a;
}

@media (max-width: 700px) {
  .desktop { display: none; }
  .mobile { display: flex; }
  .icon-wrap {
    margin: 0 auto 14px auto;
    width: 88px;
    height: 88px;
  }
  .icon-wrap img {
    width: 52px;
    height: 52px;
  }
  .text-content {
    align-items: center;
    margin-bottom: 24px;
  }
  .title {
    font-size: 1.18rem;
    margin-bottom: 7px;
    white-space: nowrap;
    text-align: center;
  }
  .subtitle {
    font-size: 0.96rem;
    text-align: center;
    white-space: pre-line;
  }
  .fitness-btn {
    margin: 0;
    width: 100%;
    padding: 0;
    height: 56px;
    font-size: 1.18rem;
  }
}
</style>
