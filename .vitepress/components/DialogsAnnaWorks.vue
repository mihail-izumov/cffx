<template>
  <div class="anna-brands-container">
    <!-- РАДАР -->
    <div class="anna-brand-card anna-character-card">
      <div class="anna-tariff-badge anna-character">РАДАР</div>
      <h3 class="anna-title">Перехватывает 96% скрытого недовольства</h3>
      <p class="anna-description-main">96% недовольных гостей кофейни уходят без жалоб, унося 27,000 ₽ LTV. QR-код на столе перехватывает недовольство за 30 секунд до ухода гостя.</p>
      <p class="anna-description-goals anna-character-goals">Находит тех, кто молчит</p>
    </div>
    
    <!-- ФИЛЬТР -->
    <div class="anna-brand-card anna-skills-card">
      <div class="anna-tariff-badge anna-skills">ФИЛЬТР</div>
      <h3 class="anna-title">Блокирует негатив до публикации</h3>
      <p class="anna-description-main">Один публичный отзыв = потеря 3 потенциальных гостей (81,000 ₽ упущенной прибыли). Умная форма превращает эмоции в конструктив.</p>
      <p class="anna-description-goals anna-skills-goals">Останавливает утечку репутации</p>
    </div>
    
    <!-- ДЕЖУРСТВО -->
    <div class="anna-brand-card anna-connections-card">
      <div class="anna-tariff-badge anna-connections">ДЕЖУРСТВО</div>
      <h3 class="anna-title">Работает круглосуточно</h3>
      <p class="anna-description-main">95% гостей остаются лояльными при решении проблемы в первый час. Анна работает 24/7, уточняет детали за 3 часа, отправляет готовый тикет в Telegram.</p>
      <p class="anna-description-goals anna-connections-goals">Не спит и не устает</p>
    </div>
    
    <!-- АЛХИМИЯ -->
    <div class="anna-brand-card anna-memory-card">
      <div class="anna-tariff-badge anna-memory">АЛХИМИЯ</div>
      <h3 class="anna-title">Превращает жалобы в лояльность</h3>
      <p class="anna-description-main">Гости с решенными проблемами становятся на 30% лояльнее обычных. Каждая решенная жалоба = LTV 35,100 ₽ вместо потерянных 27,000 ₽.</p>
      <p class="anna-description-goals anna-memory-goals">Превращает врагов в друзей</p>
    </div>

    <!-- ДЕТЕКТОР -->
    <div class="anna-brand-card anna-character-card">
      <div class="anna-tariff-badge anna-character">ДЕТЕКТОР</div>
      <h3 class="anna-title">Находит всех недовольных</h3>
      <p class="anna-description-main">На каждый видимый негатив приходится 25 невидимых потерь (1 из 26 жалуется). Диалоги с Анной выявляют всех 26.</p>
      <p class="anna-description-goals anna-character-goals">Видит невидимое недовольство</p>
    </div>

    <!-- СТОП-КРАН -->
    <div class="anna-brand-card anna-skills-card">
      <div class="anna-tariff-badge anna-skills">СТОП-КРАН</div>
      <h3 class="anna-title">Останавливает сарафанное радио</h3>
      <p class="anna-description-main">Каждый недовольный гость рассказывает 15 знакомым о плохом опыте. Вместо 15 негативных историй получается 1 история о заботе.</p>
      <p class="anna-description-goals anna-skills-goals">Меняет негатив на позитив</p>
    </div>

    <!-- ПРОФИЛАКТИКА -->
    <div class="anna-brand-card anna-connections-card">
      <div class="anna-tariff-badge anna-connections">ПРОФИЛАКТИКА</div>
      <h3 class="anna-title">Защищает от повторных потерь</h3>
      <p class="anna-description-main">92% гостей уходят навсегда после 2-3 плохих взаимодействий. Анна фиксирует контекст, закрывает тикет с NPS-оценкой.</p>
      <p class="anna-description-goals anna-connections-goals">Исключает повторные ошибки</p>
    </div>

    <!-- ИНВЕСТИЦИЯ -->
    <div class="anna-brand-card anna-memory-card">
      <div class="anna-tariff-badge anna-memory">ИНВЕСТИЦИЯ</div>
      <h3 class="anna-title">Окупается с первых клиентов</h3>
      <p class="anna-description-main">ROI систем управления жалобами достигает 1000%. 30,000 ₽/мес за Диалоги с Анной = сохранение 1-2 гостей.</p>
      <p class="anna-description-goals anna-memory-goals">Превращает затраты в доходы</p>
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
