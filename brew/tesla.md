<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <!-- КАРТОЧКА СИМУЛЯТОРА: САМАРА -->
  <div class="simulator-card">
    <div class="card-header-row">
      <div class="card-header-left">
        <span class="status-dot">🟢</span>
        <span class="card-city-title">Симулятор Самары</span>
      </div>
      <div class="card-header-right">
        <span class="card-difficulty">Сложность: ★★☆</span>
      </div>
    </div>

    <div class="scenario-line">⚔️ Душа против системы</div>

    <div class="card-image-wrapper">
      <img src="https://i.postimg.cc/mDw1xVz3/samara-korzh.jpg" alt="Симулятор Самары" class="card-image">
    </div>

    <div class="card-specs">
      <div class="spec-item">
        <span class="spec-label">Игроки в фокусе</span>
        <span class="spec-value">Корж, Skuratov, Surf Coffee, White Cup, Coffee Balance</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Ядро симуляции</span>
        <span class="spec-value">~20 точек, формирующих эпицентр конкуренции</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Вызов</span>
        <span class="spec-value">Как масштабировать уют, не потеряв магию бренда?</span>
      </div>
    </div>

    <a href="/simulator/samara" class="card-button">Войти →</a>
  </div>

  <!-- КАРТОЧКА СИМУЛЯТОРА: НОВОСИБИРСК -->
  <div class="simulator-card">
    <div class="card-header-row">
      <div class="card-header-left">
        <span class="status-dot">🟡</span>
        <span class="card-city-title">Симулятор Новосибирска</span>
      </div>
      <div class="card-header-right">
        <span class="card-difficulty">Сложность: ★★★</span>
      </div>
    </div>

    <div class="scenario-line">🎯 Массовость против премиума</div>

    <div class="card-image-wrapper">
      <img src="https://i.postimg.cc/x15tDnzj/novosibirsk-skuratov-greenhouse.jpg" alt="Симулятор Новосибирска" class="card-image">
    </div>

    <div class="card-specs">
      <div class="spec-item">
        <span class="spec-label">Игроки в фокусе</span>
        <span class="spec-value">Green House (массовость) vs. Skuratov (качество)</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Ядро симуляции</span>
        <span class="spec-value">~100 точек двух ключевых титанов рынка</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Вызов</span>
        <span class="spec-value">Найти асимметричный ответ федеральному гиганту, вскрыв его внутренние противоречия</span>
      </div>
    </div>

    <a href="/simulator/novosibirsk" class="card-button card-button--secondary">Следить →</a>
  </div>

</div>

<style>
  :root {
    --brand-color: #C5F946;
    --panel-bg: #1c1c1e;     /* плотная заливка под обе темы */
    --panel-border: #3a3a3c;
    --text-1: #f2f2f7;
    --text-2: #8e8e93;
  }

  .simulator-card {
    background-color: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-radius: 18px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
    box-sizing: border-box;
    min-height: 460px;
  }

  .simulator-card:hover {
    transform: translateY(-5px);
    border-color: var(--brand-color);
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  }

  /* Шапка в одну строку: статус + город слева, сложность справа */
  .card-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 4px 2px 8px 2px;
  }
  .card-header-left {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0; /* для безопасного усечения текста */
  }
  .status-dot {
    flex: 0 0 auto;
    font-size: 1rem;
    line-height: 1;
  }
  .card-city-title {
    color: var(--text-2);
    font-size: 0.84rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-header-right {
    flex: 0 0 auto;
    color: var(--text-2);
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .card-difficulty {
    opacity: 0.95;
  }

  /* Главный сценарий */
  .scenario-line {
    color: var(--text-1);
    font-size: 1.22rem;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    margin: 8px 8px 14px 8px;
  }

  /* Изображение */
  .card-image-wrapper {
    width: 100%;
    height: 168px;
    border-radius: 12px;
    overflow: hidden;
    margin: 6px 0 18px 0;
  }
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Спецификации */
  .card-specs {
    display: grid;
    gap: 12px;
    flex: 1 1 auto;
  }
  .spec-item { line-height: 1.45; }
  .spec-label {
    display: block;
    font-size: 0.76rem;
    color: var(--text-2);
    margin-bottom: 2px;
    font-weight: 500;
  }
  .spec-value {
    display: block;
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--text-1);
  }

  /* Кнопки */
  .card-button {
    margin-top: 18px;
    background-color: var(--brand-color);
    color: #000;
    padding: 12px 16px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.92rem;
    text-align: center;
    text-decoration: none;
    transition: background .25s ease, color .25s ease, transform .2s ease, border-color .2s ease;
    border: 2px solid transparent; /* резерв, чтобы не дёргалось */
    box-sizing: border-box;
  }
  .card-button:hover {
    background: #fff !important;
    color: #000 !important;
    transform: translateY(-1px);
  }

  .card-button--secondary {
    background: transparent;
    color: var(--brand-color);
    border-color: var(--brand-color);
  }
  .card-button--secondary:hover {
    background: var(--brand-color) !important;
    color: #000 !important;
  }
</style>
