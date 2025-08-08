<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <!-- КАРТОЧКА СИМУЛЯТОРА: САМАРА -->
  <div class="simulator-card">
    <div class="card-image-wrapper">
      <img src="https://i.postimg.cc/mDw1xVz3/samara-korzh.jpg" alt="Симулятор Самары" class="card-image">
    </div>
    <div class="card-content">
      <h3 class="card-title">🟢 САМАРА ★★☆</h3>
      <div class="card-specs">
        <div class="spec-item">
          <span class="spec-label">Сценарий</span>
          <span class="spec-value">⚔️ Душа против системы</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Ключевой вызов</span>
          <span class="spec-value">Как масштабировать уют, не потеряв магию бренда?</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Ядро симуляции</span>
          <span class="spec-value">~20 точек, формирующих эпицентр конкуренции</span>
        </div>
         <div class="spec-item">
          <span class="spec-label">Игроки в фокусе</span>
          <span class="spec-value">Корж, Skuratov, Surf Coffee, White Cup, Coffee Balance</span>
        </div>
      </div>
    </div>
    <a href="/simulator/samara" class="card-button">
      → Начать симуляцию
    </a>
  </div>

  <!-- КАРТОЧКА СИМУЛЯТОРА: НОВОСИБИРСК -->
  <div class="simulator-card">
    <div class="card-image-wrapper">
      <img src="https://i.postimg.cc/x15tDnzj/novosibirsk-skuratov-greenhouse.jpg" alt="Симулятор Новосибирска" class="card-image">
    </div>
    <div class="card-content">
      <h3 class="card-title">🟡 НОВОСИБИРСК ★★★</h3>
      <div class="card-specs">
        <div class="spec-item">
          <span class="spec-label">Сценарий</span>
          <span class="spec-value">🎯 Массовость против премиума</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Ключевой вызов</span>
          <span class="spec-value">Найти асимметричный ответ гиганту, вскрыв его противоречия</span>
        </div>
         <div class="spec-item">
          <span class="spec-label">Ядро симуляции</span>
          <span class="spec-value">~100 точек двух ключевых титанов рынка</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Игроки в фокусе</span>
          <span class="spec-value">Green House (массовость) vs. Skuratov (качество)</span>
        </div>
      </div>
    </div>
    <a href="/simulator/novosibirsk" class="card-button card-button--secondary">
      📦 Уведомить о запуске
    </a>
  </div>

</div>

<style>
  :root {
    --brand-color: #C5F946;
    --dark-bg: #1c1c1e;
    --dark-border: #3a3a3c;
    --text-primary: #f2f2f7;
    --text-secondary: #8e8e93;
  }

  /* Базовый стиль карточки */
  .simulator-card {
    background-color: var(--dark-bg);
    border: 1px solid var(--dark-border);
    border-radius: 18px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    min-height: 420px; /* Увеличена для баланса */
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .simulator-card:hover {
    transform: translateY(-5px);
    border-color: var(--brand-color);
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  }

  /* Изображение */
  .card-image-wrapper {
    width: 100%;
    height: 160px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px; /* Больше воздуха */
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Контентная часть */
  .card-content {
    flex-grow: 1; /* Занимает все доступное пространство */
    display: flex;
    flex-direction: column;
  }
  
  .card-title {
    color: var(--text-primary);
    margin: 0 0 20px 0;
    font-size: 1.1rem; /* Уменьшен */
    font-weight: 600;
  }

  /* Спецификации (ключевые данные) */
  .card-specs {
    display: flex;
    flex-direction: column;
    gap: 16px; /* Больше расстояние между элементами */
    flex-grow: 1;
  }
  
  .spec-item {
    line-height: 1.5;
  }

  .spec-label {
    display: block;
    font-size: 0.75rem; /* Уменьшен */
    color: var(--text-secondary);
    margin-bottom: 4px;
    font-weight: 500;
  }
  
  .spec-value {
    display: block;
    font-size: 0.9rem; /* Уменьшен */
    font-weight: 500;
    color: var(--text-primary);
  }

  /* Кнопки */
  .card-button {
    background-color: var(--brand-color);
    color: #000;
    padding: 12px 16px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    text-align: center;
    display: block;
    margin-top: 24px; /* Больше отступ сверху */
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid transparent; /* Резерв места для рамки */
    box-sizing: border-box;
  }

  .card-button:hover {
    background-color: #ffffff !important;
    transform: scale(1.02);
    text-decoration: none !important;
  }
  
  /* Вторичная (контурная) кнопка */
  .card-button.card-button--secondary {
     background-color: transparent;
     color: var(--brand-color);
     border: 2px solid var(--brand-color);
  }

  /* Исправление бага с ховером */
  .card-button.card-button--secondary:hover {
    background-color: var(--brand-color) !important;
    color: #000 !important;
  }
</style>
