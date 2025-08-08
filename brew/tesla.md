<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <!-- САМАРА -->
  <div class="simulator-card">
    <div class="card-header">
      <div class="simulator-line">Симулятор Самары</div>
      <div class="difficulty-line">🟢 ★★☆</div>
      <div class="scenario-line">⚔️ Душа против системы</div>
    </div>

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

  <!-- НОВОСИБИРСК -->
  <div class="simulator-card">
    <div class="card-header">
      <div class="simulator-line">Симулятор Новосибирска</div>
      <div class="difficulty-line">🟡 ★★★</div>
      <div class="scenario-line">🎯 Массовость против премиума</div>
    </div>

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
  :root{
    --brand: #C5F946;
    --bg: #1b1c1f;        /* плотная сплошная заливка под обе темы */
    --panel: #232428;     /* панель карточки */
    --border: #3a3b41;
    --text-1: #f2f3f7;    /* первичный текст */
    --text-2: #9aa0a6;    /* вторичный текст */
  }

  .simulator-card{
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    min-height: 460px;
    box-sizing: border-box;
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  .simulator-card:hover{
    transform: translateY(-4px);
    border-color: var(--brand);
    box-shadow: 0 10px 28px rgba(0,0,0,.25);
  }

  /* Верхняя зона: симулятор/звезды/сценарий */
  .card-header{
    padding: 6px 4px 10px 4px; /* используем верхнее пространство */
  }
  .simulator-line{
    color: var(--text-2);
    font-size: .84rem;      /* малый, как у Polestar/Tesla */
    letter-spacing: .02em;
    margin-bottom: 4px;
  }
  .difficulty-line{
    color: var(--text-2);
    font-size: .78rem;      /* ещё меньше звезды */
    margin-bottom: 8px;
  }
  .scenario-line{
    color: var(--text-1);
    font-size: 1.22rem;     /* самая крупная фраза */
    font-weight: 600;
    line-height: 1.3;
  }

  /* Изображение */
  .card-image-wrapper{
    width: 100%;
    height: 168px;
    border-radius: 12px;
    overflow: hidden;
    margin: 14px 0 18px 0;
  }
  .card-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Спецификации */
  .card-specs{
    display: grid;
    gap: 12px;
    flex: 1 1 auto; /* тянется, чтобы кнопка упиралась вниз */
  }
  .spec-item{ line-height: 1.45; }
  .spec-label{
    display:block;
    color: var(--text-2);
    font-size:.76rem;
    margin-bottom:2px;
    font-weight:500;
  }
  .spec-value{
    display:block;
    color: var(--text-1);
    font-size:.92rem;
    font-weight:500;
  }

  /* Кнопки */
  .card-button{
    margin-top: 18px;
    background: var(--brand);
    color:#000;
    padding: 12px 16px;
    border-radius: 10px;
    font-weight: 700;
    font-size: .92rem;
    text-align:center;
    text-decoration:none;
    transition: background .25s ease, color .25s ease, transform .2s ease, border-color .2s ease;
    border: 2px solid transparent;   /* резерв, чтобы не дёргалось */
    box-sizing: border-box;
  }
  .card-button:hover{
    background:#fff;
    color:#000;
    transform: translateY(-1px);
  }

  .card-button--secondary{
    background: transparent;
    color: var(--brand);
    border-color: var(--brand);       /* видимая рамка без обрезания */
  }
  .card-button--secondary:hover{
    background: var(--brand);
    color:#000;
  }

  /* Контекстный фон секции (если нужен подложка для блока) */
  body{ 
    background: var(--bg);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; /* Для лучшего рендеринга на демо */
  }
</style>
