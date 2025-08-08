<div class="features-container-brew">
  <div class="feature-card-brew">
    <h3>(B)aseline / База</h3>
    <p>Узнайте рынок до того, как вложили первый рубль. Наш <strong>Кофейный Протокол</strong> — это открытая база знаний, которая показывает, что на самом деле работает, а что нет.</p>
  </div>
  
  <div class="feature-card-brew">
    <h3>(R)oadmap / Карта</h3>
    <p>Постройте свой уникальный путь к успеху. Наши <strong>Сигналы Радара</strong> вскрывают сильные и слабые стороны конкурентов, позволяя вам создать безупречную стратегию.</p>
  </div>
  
  <div class="feature-card-brew">
    <h3>(E)xecute / Действие</h3>
    <p>Превратите план в результат. Следуйте четкой системе, которая срезает углы и защищает от ошибок, оставляя вам главное — творчество и общение с гостями.</p>
  </div>

  <div class="feature-card-brew">
    <h3>(W)in / Победа</h3>
    <p>Постройте бизнес, который служит вашим целям. Масштабируйте одну кофейню, стройте сеть или создавайте собственную франшизу — BREW дает вам для этого всю необходимую <strong>поддержку</strong>.</p>
  </div>
</div>

<style>
/* Контейнер для карточек - используем уникальные классы */
.features-container-brew {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 16px !important;
  margin: 32px 0 !important;
}

/* --- СТИЛИ КАРТОЧКИ --- */
.feature-card-brew {
  background-color: #f6f6f7 !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 24px 20px !important;
  height: 100% !important;
}

/* Стили для ТЁМНОЙ темы */
:root.dark .feature-card-brew {
  background-color: var(--vp-c-bg-soft) !important;
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.feature-card-brew h3 {
  color: var(--vp-c-text-1) !important;
  font-size: 15px !important;
  line-height: 1.3 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 600 !important;
}

/* Цвет заголовка для ТЁМНОЙ темы */
:root.dark .feature-card-brew h3 {
  color: #c5f946 !important;
}

.feature-card-brew p {
  color: var(--vp-c-text-2) !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

/* Мобильная адаптация */
@media (max-width: 640px) {
  .features-container-brew {
    grid-template-columns: 1fr !important;
  }
}
</style>
