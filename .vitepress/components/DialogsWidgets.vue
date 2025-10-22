<template>
  <div class="essential-apps">
    <div class="header">
      <div class="title-section">
        <h2>Виджет Сигнала</h2>
        <p class="subtitle">Ваша система обратной связи может быть какой угодно. Даже чатом в Телеграм.</p>
      </div>
      <div class="actions">
        <button class="btn-create">
          Настроить Свой Сигнал
          <span class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 7h10v10"/>
              <path d="M7 17 17 7"/>
            </svg>
          </span>
        </button>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="btn-see-all">
          Спецификации и цены
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
          <span class="app-name">РЕСТОРАНЫ/КОФЕЙНИ</span>
          <div class="like-info">
            <span class="like-count">[840]</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
        </div>
        <div class="app-icon">
          <div class="icon-big-eyes">
            <div class="eye"></div>
            <div class="eye"></div>
          </div>
        </div>
        <p class="card-description">Не говорим вам, как варить кофе.</p>
        <div class="card-footer">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="play-btn">Play</a>
        </div>
      </div>

      <div class="app-card">
        <div class="card-header">
          <span class="app-name">ФИТНЕС</span>
          <div class="like-info">
            <span class="like-count">[612]</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
        </div>
        <div class="app-icon">
          <div class="icon-tictap">
            <div class="grid-3x3">
              <div class="cell cross"></div>
              <div class="cell dot"></div>
              <div class="cell empty"></div>
              <div class="cell cross"></div>
              <div class="cell empty"></div>
              <div class="cell empty"></div>
              <div class="cell empty"></div>
              <div class="cell empty"></div>
              <div class="cell dot"></div>
            </div>
          </div>
        </div>
        <p class="card-description">50% ваших новых клиентов боятся заходить в зал. Знаем, как это исправить.</p>
        <div class="card-footer">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="play-btn">Play</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.essential-apps {
  background-color: #1a1a1a;
  color: #e0e0e0;
  margin: 48px 0;
  padding: 0;
}

.header {
  margin-bottom: 40px;
}

.title-section {
  margin-bottom: 24px;
}

.title-section h2 {
  border-top: none !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.subtitle {
  font-size: 18px;
  color: #9e9e9e;
  margin: 0;
  font-weight: 400;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.btn-create,
.btn-see-all {
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  text-decoration: none;
}

.btn-create {
  background: #C5F946;
  color: #1a1a1a;
  border: none;
}

.btn-create:hover {
  background: #d4ff6b;
  transform: translateY(-2px);
}

.btn-see-all {
  background: transparent;
  color: #e0e0e0;
  border: 2px solid #424242;
}

.btn-see-all:hover {
  border-color: #616161;
  background: #2a2a2a;
  color: #e0e0e0;
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 32px;
  height: 32px;
}

.icon-circle::before {
  content: '';
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-create .icon-circle::before {
  background: #1a1a1a;
}

.btn-see-all .icon-circle::before {
  background: #e0e0e0;
}

.btn-create:hover .icon-circle::before {
  opacity: 1;
}

.btn-see-all:hover .icon-circle::before {
  opacity: 1;
}

.icon-circle svg {
  position: relative;
  z-index: 1;
  transition: stroke 0.3s ease;
}

.btn-create:hover .icon-circle svg {
  stroke: #C5F946;
}

.btn-see-all:hover .icon-circle svg {
  stroke: #1a1a1a;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.app-card {
  background: #2a2a2a;
  border-radius: 24px;
  padding: 24px;
  transition: all 0.3s ease;
  border: 1px solid #3a3a3a;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  height: 100%;
}

.app-card:hover {
  background: #323232;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.app-name {
  font-size: 14px;
  font-weight: 500;
  color: #b0b0b0;
  letter-spacing: 0.5px;
}

.like-info {
  color: #9e9e9e;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.like-count {
  font-family: inherit;
}

.app-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  margin-bottom: 16px;
}

.icon-big-eyes {
  width: 160px;
  height: 160px;
  background: #1a1a1a;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.eye {
  width: 50px;
  height: 50px;
  background: #f5f5f5;
  border-radius: 50%;
}

.icon-tictap {
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-3x3 {
  width: 160px;
  height: 160px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  background: #f5f5f5;
  padding: 16px;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.cell {
  background: #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cell.cross::before,
.cell.cross::after {
  content: '';
  position: absolute;
  width: 60%;
  height: 2px;
  background: #424242;
}

.cell.cross::before {
  transform: rotate(45deg);
}

.cell.cross::after {
  transform: rotate(-45deg);
}

.cell.dot::after {
  content: '';
  width: 16px;
  height: 16px;
  background: #ff5252;
  border-radius: 50%;
}

.card-description {
  font-size: 13px;
  color: #f5f5f5;
  text-align: center;
  margin: 0 0 16px 0;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-footer {
  display: flex;
  align-items: center;
}

.play-btn {
  width: 100%;
  background: transparent;
  color: #e0e0e0;
  border: 2px solid #424242;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.play-btn:hover {
  border-color: #C5F946;
  background: #C5F946;
  color: #1a1a1a;
  transform: translateY(-2px);
}

.app-card:has(.play-btn:hover) {
  transform: translateY(-4px);
  border-color: #4a4a4a;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .essential-apps {
    margin: 32px 0;
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .apps-grid {
    grid-template-columns: 1fr;
  }

  .app-icon {
    height: 140px;
  }

  .icon-big-eyes,
  .icon-tictap {
    width: 140px;
    height: 140px;
  }

  .eye {
    width: 40px;
    height: 40px;
  }

  .grid-3x3 {
    width: 140px;
    height: 140px;
  }

  .card-description {
    font-size: 16px;
    margin: 0 0 16px 0;
    padding: 0 8px;
  }
}
</style>
