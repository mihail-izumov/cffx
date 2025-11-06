<template>
  <div class="essential-apps">
    <div class="header">
      <div class="actions">
        <a href="/pro/customize" class="btn-create">
          Настроить Свой Сигнал
          <span class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 7h10v10"/>
              <path d="M7 17 17 7"/>
            </svg>
          </span>
        </a>
        <a href="/pro/ltvcalc" class="btn-see-all">
          LTV Калькулятор
          <span class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </a>
      </div>
    </div>

    <div class="apps-grid">
      <div class="app-card">
        <div class="card-header">
          <span class="app-name">ОБЩЕПИТ</span>
          <div class="like-info">
            <span class="like-count">[Корж]</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
        </div>
        <div class="app-icon">
          <img src="/widget-cafe-icon.svg" alt="Общепит" class="icon-svg" />
        </div>
        <p class="card-description">Не говорим вам, как варить кофе. Даем умную систему, чтобы ваша кофейня стала прибыльным и предсказуемым активом.</p>
        <div class="card-footer">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="play-btn">Тест-драйв</a>
        </div>
      </div>

      <div class="app-card">
        <div class="card-header">
          <span class="app-name">ФИТНЕС</span>
          <div class="like-info">
            <span class="like-count">[СуперСпорт]</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
        </div>
        <div class="app-icon">
          <img src="/widget-fitness-icon.svg" alt="Фитнес" class="icon-svg" />
        </div>
        <p class="card-description">50% ваших новых клиентов боятся заходить в зал. Знаем, как это исправить.</p>
        <div class="card-footer">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="play-btn">Тест-драйв</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-svg {
  width: 160px;
  height: 160px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .icon-svg {
    width: 140px;
    height: 140px;
  }
}
</style>
