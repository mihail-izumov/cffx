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
.simulator-grid {
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
  gap: 1.5rem; 
  margin: 2rem 0;
}

.simulator-card {
  background-color: #2d2d30; /* Светлее чем фон страницы */
  border: 2px solid #444444; /* Заметная рамка */
  border-radius: 18px;
  padding: 20px; /* Больше внутреннего пространства */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
  box-sizing: border-box;
  min-height: 480px;
}

.simulator-card:hover {
  transform: translateY(-6px);
  border-color: #C5F946; /* Яркая рамка при наведении */
  box-shadow: 0 12px 35px rgba(197, 249, 70, 0.15); /* Зеленое свечение */
  background-color: #353538; /* Еще светлее при наведении */
}

.card-header {
  padding: 6px 4px 12px 4px;
  min-height: 40px;
}

.card-city-title {
  color: #a8a8a8;
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.card-city-title .city-name {
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
}

.card-difficulty {
  color: #a8a8a8;
  font-size: 0.8rem;
  margin-top: 6px;
}

.scenario-line {
  color: #ffffff;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  margin: 12px 0 18px 0;
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
  margin-bottom: 22px;
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
  gap: 16px;
  flex-grow: 1;
}

.spec-item {
  line-height: 1.45;
}

.spec-label {
  display: block;
  font-size: 0.78rem;
  color: #a8a8a8;
  margin-bottom: 4px;
  font-weight: 500;
}

.spec-value {
  display: block;
  font-size: 0.94rem;
  font-weight: 500;
  color: #ffffff;
}

.card-button {
  margin-top: 24px;
  background-color: #C5F946;
  color: #000000;
  padding: 14px 18px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.94rem;
  text-align: center;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 2px solid #C5F946;
  box-sizing: border-box;
  display: block;
}

.card-button:hover {
  background-color: #ffffff;
  border-color: #ffffff;
  color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
}

.card-button--secondary {
  background-color: transparent;
  color: #C5F946;
  border-color: #C5F946;
}

.card-button--secondary:hover {
  background-color: #C5F946;
  color: #000000;
  border-color: #C5F946;
}
</style>
