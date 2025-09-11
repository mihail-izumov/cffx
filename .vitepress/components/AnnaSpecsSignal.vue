<template>
  <div class="brands-container">
    <!-- ХАРАКТЕР -->
    <div class="brand-card character-card">
      <div class="tariff-badge character">ХАРАКТЕР</div>
      <h3>Понимает вас с полуслова</h3>
      <p class="description-main">Анна не судит и не критикует. Скажите «здесь паршиво» — она поймёт, что именно вас беспокоит</p>
      <p class="description-goals">Не требует развёрнутых объяснений</p>
    </div>
    
    <!-- НАВЫКИ -->
    <div class="brand-card skills-card">
      <div class="tariff-badge skills">НАВЫКИ</div>
      <h3>Говорит языком решений</h3>
      <p class="description-main">Ваше «бесит медленное обслуживание» Анна переводит в «оптимизировать время подачи заказов»</p>
      <p class="description-goals">Убирает негатив и добавляет конструктив — кофейни её слушают</p>
    </div>
    
    <!-- СВЯЗИ -->
    <div class="brand-card connections-card">
      <div class="tariff-badge connections">СВЯЗИ</div>
      <h3>Знает, к кому обратиться</h3>
      <p class="description-main">У Анны прямая линия к каждому менеджеру. Она знает, кто отвечает за что</p>
      <p class="description-goals">Доставляет ваши слова именно тому человеку, который может всё изменить</p>
    </div>
    
    <!-- ПАМЯТЬ -->
    <div class="brand-card memory-card">
      <div class="tariff-badge memory">ПАМЯТЬ</div>
      <h3>Следит за результатом</h3>
      <p class="description-main">Анна помнит каждый ваш сигнал и отслеживает, что с ним происходит</p>
      <p class="description-goals">Присылает уведомления, когда всё готово, и показывает результат в Индексе Роста</p>
    </div>
  </div>
</template>

<style scoped>
.brands-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 4px 0 12px 0;
  margin: 24px 0;
}

/* Мобильная адаптивность - на узких экранах делаем 1 колонку */
@media (max-width: 768px) {
  .brands-container {
    grid-template-columns: 1fr;
  }
}

.brand-card {
  border-radius: 12px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-top-width: 4px;
  position: relative;
}

/* СВЕТЛАЯ ТЕМА - карточки светлые */
.character-card {
  background-color: #f8f6f9 !important;
  border-color: #e0dde5 !important;
  border-top-color: #9A60A9 !important;
}

.skills-card {
  background-color: #f6f9f8 !important;
  border-color: #dde5e0 !important;
  border-top-color: #60A994 !important;
}

.connections-card {
  background-color: #f9f8f6 !important;
  border-color: #e5e2dd !important;
  border-top-color: #A98E60 !important;
}

.memory-card {
  background-color: #f6f8fa !important;
  border-color: #dde3e8 !important;
  border-top-color: #4A72A0 !important;
}

/* ТЕМНАЯ ТЕМА - карточки темные */
.dark .character-card {
  background-color: #2B272B !important;
  border-color: #383336 !important;
  border-top-color: #9A60A9 !important;
}

.dark .skills-card {
  background-color: #272B2A !important;
  border-color: #333836 !important;
  border-top-color: #60A994 !important;
}

.dark .connections-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top-color: #A98E60 !important;
}

.dark .memory-card {
  background-color: #252830 !important;
  border-color: #323544 !important;
  border-top-color: #4A72A0 !important;
}

/* Стили для бейджей */
.tariff-badge {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 6px;
  width: fit-content;
  border: none;
}

.tariff-badge.character {
  background-color: rgba(154, 96, 169, 0.25);
  color: #9A60A9;
}

.tariff-badge.skills {
  background-color: rgba(96, 169, 148, 0.25);
  color: #60A994;
}

.tariff-badge.connections {
  background-color: rgba(169, 142, 96, 0.25);
  color: #8b7348;
}

.tariff-badge.memory {
  background-color: rgba(74, 114, 160, 0.25);
  color: #4A72A0;
}

/* Заголовки */
.brand-card h3 {
  font-size: 15px;
  line-height: 1.4;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 700;
  border: none;
  padding: 0;
  color: #2c3e2c !important;
}

.description-main {
  color: #4a5a4a !important;
  font-size: 15px !important;
  line-height: 1.6;
  margin: 0 0 4px 0;
  flex-grow: 1;
}

.character-card .description-goals {
  color: #7a5a9a !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.skills-card .description-goals {
  color: #5a7a6a !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.connections-card .description-goals {
  color: #7a6e5a !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.memory-card .description-goals {
  color: #5a6a9a !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

/* ТЕМНАЯ ТЕМА - текст светлый */
.dark .brand-card h3 {
  color: #ffffff !important;
}

.dark .description-main {
  color: #f0f0f0 !important;
}

.dark .character-card .description-goals {
  color: #BD95BD !important;
}

.dark .skills-card .description-goals {
  color: #95BDB3 !important;
}

.dark .connections-card .description-goals {
  color: #BDB095 !important;
}

.dark .memory-card .description-goals {
  color: #95a9bd !important;
}
</style>

<style>
/* Глобальные стили для переопределения VitePress */
.vp-doc .brands-container .brand-card,
.vp-content .brands-container .brand-card {
  background-color: var(--vp-c-bg-soft) !important;
  border: 1px solid var(--vp-c-border) !important;
}

/* Принудительное применение фонов для каждого типа карточек */
.vp-doc .brands-container .character-card,
.vp-content .brands-container .character-card {
  background-color: #f8f6f9 !important;
  border-color: #e0dde5 !important;
  border-top: 4px solid #9A60A9 !important;
}

.vp-doc .brands-container .skills-card,
.vp-content .brands-container .skills-card {
  background-color: #f6f9f8 !important;
  border-color: #dde5e0 !important;
  border-top: 4px solid #60A994 !important;
}

.vp-doc .brands-container .connections-card,
.vp-content .brands-container .connections-card {
  background-color: #f9f8f6 !important;
  border-color: #e5e2dd !important;
  border-top: 4px solid #A98E60 !important;
}

.vp-doc .brands-container .memory-card,
.vp-content .brands-container .memory-card {
  background-color: #f6f8fa !important;
  border-color: #dde3e8 !important;
  border-top: 4px solid #4A72A0 !important;
}

/* Темная тема */
.dark .vp-doc .brands-container .character-card,
.dark .vp-content .brands-container .character-card {
  background-color: #2B272B !important;
  border-color: #383336 !important;
  border-top: 4px solid #9A60A9 !important;
}

.dark .vp-doc .brands-container .skills-card,
.dark .vp-content .brands-container .skills-card {
  background-color: #272B2A !important;
  border-color: #333836 !important;
  border-top: 4px solid #60A994 !important;
}

.dark .vp-doc .brands-container .connections-card,
.dark .vp-content .brands-container .connections-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top: 4px solid #A98E60 !important;
}

.dark .vp-doc .brands-container .memory-card,
.dark .vp-content .brands-container .memory-card {
  background-color: #252830 !important;
  border-color: #323544 !important;
  border-top: 4px solid #4A72A0 !important;
}

/* Дополнительная защита от переопределения фонов */
.brands-container .brand-card {
  background-color: var(--vp-c-bg-soft) !important;
}

.brands-container .character-card {
  background-color: #f8f6f9 !important;
}

.brands-container .skills-card {
  background-color: #f6f9f8 !important;
}

.brands-container .connections-card {
  background-color: #f9f8f6 !important;
}

.brands-container .memory-card {
  background-color: #f6f8fa !important;
}

.dark .brands-container .character-card {
  background-color: #2B272B !important;
}

.dark .brands-container .skills-card {
  background-color: #272B2A !important;
}

.dark .brands-container .connections-card {
  background-color: #2B2A27 !important;
}

.dark .brands-container .memory-card {
  background-color: #252830 !important;
}
</style>
