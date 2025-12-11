---
outline: false
prev: false
next: false
pageClass: centered-page
title: Наша система
notification: brew
description: Безупречная работа с Сигналами

---

# Наша система

## Безупречная работа с Сигналами

<br>

  <div class="project-card">
    <div>
      <h3 style="color: #C5F946; margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Умная тикет-система</h3>
      <p style="margin: 0; line-height: 1.6; color: var(--vp-c-text-1);">Заботится одновременно о госте и кофейне. Атоматически отслеживает время ответа и напоминает управляющему, когда нужно действовать.</p>
    </div>
    <a href="/system/tickets" class="project-button">
      Как работает →
    </a>
  </div>

<br>

## Бесплатные инструменты

<div class="projects-grid">
  
  <!-- Карточка 1 -->
  <div class="project-card">
    <div>
      <h3 style="color: #C5F946; margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Умная тикет-система</h3>
      <p style="margin: 0; line-height: 1.6; color: var(--vp-c-text-1);">Заботится одновременно о госте и кофейне. Автоматически отслеживает время ответа и напоминает управляющему, когда нужно действовать.</p>
    </div>
    <a href="/system/tickets" class="project-button">
      Как работает →
    </a>
  </div>

  <!-- Карточка 2 -->
  <div class="project-card">
    <div>
      <h3 style="color: #C5F946; margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Вторая система</h3>
      <p style="margin: 0; line-height: 1.6; color: var(--vp-c-text-1);">Заботится одновременно о госте и кофейне. Автоматически отслеживает время ответа и напоминает управляющему, когда нужно действовать.</p>
    </div>
    <a href="/system/tickets" class="project-button">
      Как работает →
    </a>
  </div>

</div>

<!-- Важный отступ перед нижней карточкой -->
<br>

  <div class="project-card">
    <div>
      <h3 style="color: #C5F946; margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Умная тикет-система</h3>
      <p style="margin: 0; line-height: 1.6; color: var(--vp-c-text-1);">Заботится одновременно о госте и кофейне. Атоматически отслеживает время ответа и напоминает управляющему, когда нужно действовать.</p>
    </div>
    <a href="/system/tickets" class="project-button">
      Как работает →
    </a>
  </div>

<style>
/* Сетка для колонок */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Ровно 2 колонки */
  gap: 24px; /* Расстояние между карточками */
  margin: 24px 0;
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr; /* 1 колонка на телефоне */
  }
}

/* Стили карточки */
.project-card {
  background: rgba(52, 123, 108, 0.3);
  border: 1px solid rgba(52, 123, 108, 0.5); /* Добавил легкую обводку для четкости */
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  backdrop-filter: blur(5px); /* Эффект матового стекла (опционально) */
}

.project-button {
  background-color: #347b6c;
  color: white !important; /* Force white text initially */
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  display: block;
  margin-top: 1.5rem;
  text-decoration: none !important;
  transition: all 0.3s ease;
}

.project-button:hover {
  background-color: #C5F946 !important;
  color: #000 !important;
  transform: translateY(-2px);
}
</style>

