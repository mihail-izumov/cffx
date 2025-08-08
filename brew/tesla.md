<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <!-- КАРТОЧКА СИМУЛЯТОРА: САМАРА (ОБНОВЛЕННАЯ) -->
  <div class="simulator-card">
    <div class="card-image-wrapper">
      <img src="https://i.postimg.cc/mDw1xVz3/samara-korzh.jpg" alt="Симулятор Самары" class="card-image">
    </div>
    <div class="card-content">
      <h3 class="card-title">🟢 САМАРА ★★☆</h3>
      <div class="card-specs">
        <div>
          <span class="spec-label">Сценарий</span>
          <span class="spec-value">⚔️ Душа против системы</span>
        </div>
        <div>
          <span class="spec-label">Ядро</span>
          <span class="spec-value">~20 точек</span>
        </div>
        <div>
          <span class="spec-label">Игроки</span>
          <span class="spec-value">Корж, Skuratov, Surf...</span>
        </div>
      </div>
    </div>
    <a href="/simulator/samara" class="card-button">
      Войти →
    </a>
  </div>

  <!-- КАРТОЧКА СИМУЛЯТОРА: НОВОСИБИРСК (ОБНОВЛЕННАЯ) -->
  <div class="simulator-card">
    <div class="card-image-wrapper">
      <img src="https://i.postimg.cc/x15tDnzj/novosibirsk-skuratov-greenhouse.jpg" alt="Симулятор Новосибирска" class="card-image">
    </div>
    <div class="card-content">
      <h3 class="card-title">🟡 НОВОСИБИРСК ★★★</h3>
      <div class="card-specs">
        <div>
          <span class="spec-label">Сценарий</span>
          <span class="spec-value">🎯 Массовость vs Премиум</span>
        </div>
        <div>
          <span class="spec-label">Ядро</span>
          <span class="spec-value">~100 точек</span>
        </div>
        <div>
          <span class="spec-label">Игроки</span>
          <span class="spec-value">Green House vs Skuratov</span>
        </div>
      </div>
    </div>
    <a href="/simulator/novosibirsk" class="card-button-secondary">
      Следить →
    </a>
  </div>

</div>

<style>
  /* Базовый стиль карточки */
  .simulator-card {
    background-color: #2a2a2e; /* Нейтральный темный фон, работает на обеих темах */
    border: 1px solid #444; /* Тонкая граница для контраста */
    border-radius: 16px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 380px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .simulator-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }

  /* Изображение */
  .card-image-wrapper {
    width: 100%;
    height: 180px; /* Фиксированная высота для единообразия */
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Изображение заполняет блок без искажений */
  }

  /* Контентная часть */
  .card-content {
    padding: 0 4px;
  }
  
  .card-title {
    color: #ffffff;
    margin: 0 0 16px 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  /* Спецификации (ключевые данные) */
  .card-specs {
    display: grid;
    gap: 12px;
  }

  .spec-label {
    display: block;
    font-size: 0.8rem;
    color: #9e9e9e; /* Приглушенный цвет для меток */
    margin-bottom: 2px;
  }
  
  .spec-value {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #ffffff;
  }

  /* Кнопки */
  .card-button, .card-button-secondary {
    background-color: #C5F946;
    color: #000;
    padding: 12px 16px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    display: block;
    margin-top: 1.5rem;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
  }

  .card-button-secondary {
     background-color: transparent;
     color: #C5F946;
     border: 1px solid #C5F946;
  }

  .card-button:hover {
    background-color: #ffffff !important;
    transform: scale(1.03);
    text-decoration: none !important;
  }

  .card-button-secondary:hover {
    background-color: #C5F946 !important;
    color: #000 !important;
    transform: scale(1.03);
    text-decoration: none !important;
  }
</style>
