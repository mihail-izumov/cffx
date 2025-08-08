<template>
  <div class="simulator-grid">

    <!-- КАРТОЧКА СИМУЛЯТОРА: САМАРА -->
    <div class="simulator-card">
      <div class="card-header">
        <div class="card-city-title">симулятор // <span class="city-name">Самара</span></div>
        <div class="card-difficulty">🟢 Сложность: ★★☆</div>
      </div>

      <div class="scenario-line">Душа против системы</div>

      <div class="card-image-wrapper">
        <img src="/signal-krzh_skrtv.svg" alt="Симулятор Самары" class="card-image">
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
      <div class="card-header">
        <div class="card-city-title">симулятор // <span class="city-name">Новосибирск</span></div>
        <div class="card-difficulty">🟡 Сложность: ★★★</div>
      </div>
      <div class="scenario-line">Разлом Гиганта</div>
      <div class="card-image-wrapper">
        <img src="/signal-gtrnhs_skrtv.svg" alt="Симулятор Новосибирска" class="card-image">
      </div>
      <div class="card-specs">
        <div class="spec-item">
          <span class="spec-label">Игроки в фокусе</span>
          <span class="spec-value">Green House (внутренний конфликт) при участии Skuratov (эталон системы)</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Ядро симуляции</span>
          <span class="spec-value">~100 точек, где обещания сталкиваются с реальностью</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Вызов</span>
          <span class="spec-value">Как устранить разрыв между ярким маркетингом и операционным хаосом в масштабе федеральной сети?</span>
        </div>
      </div>
      <a href="/radar/signal/coffee-points-nsk-2025/launch" class="card-button card-button--secondary">Анонс →</a>
    </div>

  </div>
</template>

<style scoped>
:root {
  --brand-color: #C5F946;
  --panel-bg: #1c1c1e;
  --panel-border: #3a3a3c;
  --text-primary: #f2f2f7;
  --text-secondary: #8e8e93;
  --hover-color: #ffffff;
}

.simulator-grid {
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
  gap: 1.5rem; 
  margin: 2rem 0;
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
  min-height: 480px;
}

.simulator-card:hover {
  transform: translateY(-5px);
  border-color: var(--brand-color);
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}

.card-header {
  padding: 4px 2px 8px 2px;
  min-height: 40px; /* Резерв высоты */
}

.card-city-title {
  color: var(--text-secondary);
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.card-city-title .city-name {
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
}

.card-difficulty {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-top: 4px;
}

.scenario-line {
  color: var(--text-primary);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  margin: 8px 0 16px 0;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image-wrapper {
  width: 100%;
  height: 168px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-specs {
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex-grow: 1;
}

.spec-item {
  line-height: 1.45;
}

.spec-label {
  display: block;
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-bottom: 3px;
  font-weight: 500;
}

.spec-value {
  display: block;
  font-size: 0.94rem;
  font-weight: 500;
  color: var(--text-primary);
}

.card-button {
  margin-top: 20px;
  background-color: var(--brand-color);
  color: #000;
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.92rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  border: 2px solid transparent;
  box-sizing: border-box;
  display: block;
}

.card-button:hover {
  background-color: var(--hover-color);
  border-color: var(--hover-color);
  color: #000;
  transform: translateY(-1px);
}

.card-button.card-button--secondary {
  background-color: transparent;
  color: var(--brand-color);
  border-color: var(--brand-color);
}

.card-button.card-button--secondary:hover {
  background-color: var(--brand-color);
  color: #000;
}
</style>
