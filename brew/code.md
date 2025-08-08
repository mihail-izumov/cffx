<div class="features-container">
  <div class="feature-card">
    <h3>(B)aseline / База</h3>
    <p>Узнайте рынок до того, как вложили первый рубль. Наш <strong>Кофейный Протокол</strong> — это открытая база знаний, которая показывает, что на самом деле работает, а что нет.</p>
  </div>
  
  <div class="feature-card">
    <h3>(R)oadmap / Карта</h3>
    <p>Постройте свой уникальный путь к успеху. Наши <strong>Сигналы Радара</strong> вскрывают сильные и слабые стороны конкурентов, позволяя вам создать безупречную стратегию.</p>
  </div>
  
  <div class="feature-card">
    <h3>(E)xecute / Действие</h3>
    <p>Превратите план в результат. Следуйте четкой системе, которая срезает углы и защищает от ошибок, оставляя вам главное — творчество и общение с гостями.</p>
  </div>

  <div class="feature-card">
    <h3>(W)in / Победа</h3>
    <p>Постройте бизнес, который служит вашим целям. Масштабируйте одну кофейню, стройте сеть или создавайте собственную франшизу — BREW дает вам для этого всю необходимую <strong>поддержку</strong>.</p>
  </div>
</div>

<div class="start-button-container">
  <a href="/brew/about" class="btn btn-primary" rel="noopener noreferrer">Узнать Больше →</a>
</div>

<br><br>

<style>
/* Контейнер для карточек */
.features-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Изменено: 2 столбца вместо 3 */
  gap: 16px;
  margin: 32px 0;
}

/* --- ОБНОВЛЁННЫЕ СТИЛИ КАРТОЧКИ --- */
.feature-card {
  /* 
    Изменено: Установлен конкретный светло-серый фон для светлой темы,
    чтобы карточка была видна на белом фоне страницы без обводки.
  */
  background-color: #f6f6f7;
  /* Изменено: Обводка убрана по вашему запросу. */
  border: none;
  border-radius: 12px;
  padding: 24px 20px;
  height: 100%;
}

/* Стили для ТЁМНОЙ темы */
:root.dark .feature-card {
  /* 
    Для тёмной темы используем стандартную переменную VitePress,
    она создаёт отличный контраст.
  */
  background-color: var(--vp-c-bg-soft);
}

/* --- ОБНОВЛЁННЫЕ СТИЛИ ЗАГОЛОВКА --- */
.feature-card h3 {
  /* 
    Изменено: Цвет для светлой темы теперь тёмный для лучшей читаемости.
    Используем переменную основного текста.
  */
  color: var(--vp-c-text-1);
  font-size: 15px;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
}

/* Цвет заголовка для ТЁМНОЙ темы */
:root.dark .feature-card h3 {
  /* Возвращаем ваш яркий цвет для тёмной темы, где он отлично смотрится */
  color: #c5f946;
}

.feature-card p {
  color: var(--vp-c-text-2); 
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .features-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
