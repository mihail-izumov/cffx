<template>
  <div class="essential-apps">
    <div class="container">
      <div class="header">
        <div class="title-section">
          <h2>Essential Apps (Alpha)</h2>
          <p class="subtitle">Make your homescreen yours - build apps and browse community creations.</p>
        </div>
        <div class="actions">
          <button class="btn-create">
            Create your app
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="btn-see-all">
            See all
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="apps-grid">
        <div class="app-card">
          <div class="card-header">
            <span class="app-name">КОРЖ</span>
            <div class="like-info">
              <span class="like-count">[840]</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="app-icon">
            <div class="icon-big-eyes">
              <div class="eye"></div>
              <div class="eye"></div>
            </div>
          </div>
          <div class="card-footer">
            <a href="/korzh" class="play-btn">Play</a>
          </div>
        </div>

        <div class="app-card">
          <div class="card-header">
            <span class="app-name">TICTAP PLAY</span>
            <div class="like-info">
              <span class="like-count">[612]</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
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
          <div class="card-footer">
            <a href="/korzh" class="play-btn">Play</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.essential-apps {
  width: 100%;
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px;
}

.header {
  margin-bottom: 40px;
}

.title-section {
  margin-bottom: 24px;
}

.title-section h2 {
  font-size: 42px;
  font-weight: 400;
  color: #f5f5f5;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
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

.btn-create {
  background: #ffd600;
  color: #1a1a1a;
  border: none;
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
}

.btn-create:hover {
  background: #ffed4e;
  transform: translateY(-2px);
}

.btn-see-all {
  background: transparent;
  color: #e0e0e0;
  border: 2px solid #424242;
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
}

.btn-see-all:hover {
  border-color: #616161;
  background: #2a2a2a;
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
}

.app-card:hover {
  transform: translateY(-4px);
  border-color: #4a4a4a;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
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
  padding: 4px;
}

.like-count {
  font-family: monospace;
}

.app-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  margin-bottom: 24px;
}

.icon-big-eyes {
  width: 200px;
  height: 200px;
  background: #1a1a1a;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.eye {
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 50%;
}

.icon-tictap {
  width: 200px;
  height: 200px;
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
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.play-btn:hover {
  border-color: #ffd600;
  background: #ffd600;
  color: #1a1a1a;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    padding: 32px 16px;
  }

  .title-section h2 {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .apps-grid {
    grid-template-columns: 1fr;
  }

  .app-icon {
    min-height: 240px;
  }

  .icon-big-eyes,
  .icon-tictap {
    width: 180px;
    height: 180px;
  }

  .grid-3x3 {
    width: 140px;
    height: 140px;
  }
}
</style>
