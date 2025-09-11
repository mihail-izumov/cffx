<template>
  <div class="anna-brands-container">
    <!-- ХАРАКТЕР -->
    <div class="anna-brand-card anna-character-card">
      <div class="anna-tariff-badge anna-character">ХАРАКТЕР</div>
      <h3 class="anna-title">Понимает с полуслова</h3>
      <p class="anna-description-main">Не судит и не критикует. Скажите «здесь паршиво» — она поймёт, что именно вас беспокоит</p>
      <p class="anna-description-goals anna-character-goals">Не требует больших объяснений</p>
    </div>
    
    <!-- НАВЫКИ -->
    <div class="anna-brand-card anna-skills-card">
      <div class="anna-tariff-badge anna-skills">НАВЫКИ</div>
      <h3 class="anna-title">Говорит языком решений</h3>
      <p class="anna-description-main">Ваше «бесит медленное обслуживание» Анна переводит в «оптимизировать время подачи заказов»</p>
      <p class="anna-description-goals anna-skills-goals">Кофейни слушают Анну</p>
    </div>
    
    <!-- СВЯЗИ -->
    <div class="anna-brand-card anna-connections-card">
      <div class="anna-tariff-badge anna-connections">СВЯЗИ</div>
      <h3 class="anna-title">Знает, к кому обратиться</h3>
      <p class="anna-description-main">Доставляет ваш Сигнал именно тому, кто может всё изменить</p>
      <p class="anna-description-goals anna-connections-goals">Прямая линия с каждым управляющим</p>
    </div>
    
    <!-- ПАМЯТЬ -->
    <div class="anna-brand-card anna-memory-card">
      <div class="anna-tariff-badge anna-memory">ПАМЯТЬ</div>
      <h3 class="anna-title">Следит за результатом</h3>
      <p class="anna-description-main">Помнит каждый ваш сигнал и отслеживает, что с ним происходит</p>
      <p class="anna-description-goals anna-memory-goals">Присылает уведомления, когда всё готово</p>
    </div>
  </div>
</template>

<style scoped>
/* ВСЕ СТИЛИ ПОЛНОСТЬЮ ИЗОЛИРОВАНЫ С УНИКАЛЬНЫМИ КЛАССАМИ */

/* Контейнер для горизонтальной прокрутки */
.anna-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.anna-brands-container::-webkit-scrollbar {
  height: 6px;
}

.anna-brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

.anna-brand-card {
  flex: 0 0 300px !important; /* Фиксированная ширина для скролла */
  border-radius: 12px !important;
  padding: 20px 16px !important;
  display: flex !important;
  flex-direction: column !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-top-width: 4px !important;
  position: relative !important;
  min-height: 180px !important;
}

/* СВЕТЛАЯ ТЕМА - карточки светлые */
.anna-character-card {
  background-color: #f8f6f9 !important;
  border-color: #e0dde5 !important;
  border-top-color: #9A60A9 !important;
}

.anna-skills-card {
  background-color: #f6f9f8 !important;
  border-color: #dde5e0 !important;
  border-top-color: #60A994 !important;
}

.anna-connections-card {
  background-color: #f9f8f6 !important;
  border-color: #e5e2dd !important;
  border-top-color: #A98E60 !important;
}

.anna-memory-card {
  background-color: #f6f8fa !important;
  border-color: #dde3e8 !important;
  border-top-color: #4A72A0 !important;
}

/* ТЕМНАЯ ТЕМА - карточки темные */
:root.dark .anna-character-card {
  background-color: #2B272B !important;
  border-color: #383336 !important;
  border-top-color: #9A60A9 !important;
}

:root.dark .anna-skills-card {
  background-color: #272B2A !important;
  border-color: #333836 !important;
  border-top-color: #60A994 !important;
}

:root.dark .anna-connections-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top-color: #A98E60 !important;
}

:root.dark .anna-memory-card {
  background-color: #252830 !important;
  border-color: #323544 !important;
  border-top-color: #4A72A0 !important;
}

/* Стили для бейджей */
.anna-tariff-badge {
  display: inline-block !important;
  padding: 1px 6px !important;
  border-radius: 4px !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  margin-bottom: 6px !important;
  width: fit-content !important;
  border: none !important;
}

.anna-character {
  background-color: rgba(154, 96, 169, 0.25) !important;
  color: #9A60A9 !important;
}

.anna-skills {
  background-color: rgba(96, 169, 148, 0.25) !important;
  color: #60A994 !important;
}

.anna-connections {
  background-color: rgba(169, 142, 96, 0.25) !important;
  color: #8b7348 !important;
}

.anna-memory {
  background-color: rgba(74, 114, 160, 0.25) !important;
  color: #4A72A0 !important;
}

/* Заголовки */
.anna-title {
  font-size: 15px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #2c3e2c !important;
}

:root.dark .anna-title {
  color: #ffffff !important;
}

.anna-description-main {
  color: #4a5a4a !important;
  font-size: 15px !important;
  line-height: 1.6 !important;
  margin: 0 0 4px 0 !important;
  flex-grow: 1 !important;
}

:root.dark .anna-description-main {
  color: #f0f0f0 !important;
}

/* Цели с увеличенным размером и средней жирностью */
.anna-character-goals {
  color: #7a5a9a !important;
  font-size: 14px !important; /* Увеличен размер */
  font-weight: 500 !important; /* Средняя жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

.anna-skills-goals {
  color: #5a7a6a !important;
  font-size: 14px !important; /* Увеличен размер */
  font-weight: 500 !important; /* Средняя жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

.anna-connections-goals {
  color: #7a6e5a !important;
  font-size: 14px !important; /* Увеличен размер */
  font-weight: 500 !important; /* Средняя жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

.anna-memory-goals {
  color: #5a6a9a !important;
  font-size: 14px !important; /* Увеличен размер */
  font-weight: 500 !important; /* Средняя жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* ТЕМНАЯ ТЕМА - цели */
:root.dark .anna-character-goals {
  color: #BD95BD !important;
}

:root.dark .anna-skills-goals {
  color: #95BDB3 !important;
}

:root.dark .anna-connections-goals {
  color: #BDB095 !important;
}

:root.dark .anna-memory-goals {
  color: #95a9bd !important;
}
</style>
