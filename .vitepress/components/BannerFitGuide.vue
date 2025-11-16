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
