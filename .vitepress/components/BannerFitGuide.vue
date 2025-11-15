<template>
  <div class="fitness-widget">
    <!-- Desktop Version -->
    <div class="desktop-layout">
      <div class="content">
        <img src="/widget-fitness-icon.svg" alt="Fitness Icon" class="icon" />
        <div class="text">
          <h3>Экстра-удержание клиентов</h3>
          <p>Неочевидная логика устойчивого бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="button">
        Гид для фитнеса
      </a>
    </div>

    <!-- Mobile Version -->
    <div class="mobile-layout">
      <div class="content">
        <img src="/widget-fitness-icon.svg" alt="Fitness Icon" class="icon" />
        <div class="text">
          <h3>Экстра-удержание клиентов</h3>
          <p>Неочевидная логика устойчивого фитнес-бизнеса</p>
        </div>
      </div>
      <a href="/pro/guide/fitness" target="_blank" class="button">
        Гид для фитнеса
      </a>
    </div>
  </div>
</template>

<script setup>
// Компонент не требует логики
</script>

<style scoped>
.fitness-widget {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #1a1a1a;
  color: #fff;
  border-radius: 12px;
  overflow: hidden;
  max-width: 100%;
  margin: 0 auto;
}

.desktop-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  height: 160px;
  background-color: #2d2d2d;
}

.mobile-layout {
  display: none;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  background-color: #2d2d2d;
}

.content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.text h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
}

.text p {
  margin: 4px 0 0;
  font-size: 16px;
  color: #aaaaaa;
  line-height: 1.4;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #bfff00;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 24px;
  border: 2px solid #bfff00;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.button:hover {
  background-color: #bfff00;
  color: #1a1a1a;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }

  .mobile-layout {
    display: flex;
  }

  .text h3 {
    font-size: 20px;
  }

  .text p {
    font-size: 14px;
  }

  .button {
    width: 100%;
    font-size: 16px;
    padding: 14px;
  }
}
</style>
