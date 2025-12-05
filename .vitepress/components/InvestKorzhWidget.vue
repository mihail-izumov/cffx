<script setup>
import { ref, onMounted } from 'vue'

const _GRID_COLS = 4
const _GRID_ROWS = 3
const _GRID_GAP = 2
const _GRID_PADDING = 2

const _baseValue = _GRID_COLS * _GRID_ROWS
const _secondaryValue = _GRID_GAP * _GRID_PADDING

const isLiked = ref(false)
const currentLikes = ref(_baseValue)
const lightningCount = _secondaryValue

onMounted(() => {
  const hasLiked = localStorage.getItem('korzh_liked_status')
  
  if (hasLiked) {
    isLiked.value = true
    currentLikes.value = _baseValue + 1
  } else {
    currentLikes.value = _baseValue
  }
})

const toggleLike = () => {
  isLiked.value = !isLiked.value

  if (isLiked.value) {
    currentLikes.value = _baseValue + 1
    localStorage.setItem('korzh_liked_status', 'true')
  } else {
    currentLikes.value = _baseValue
    localStorage.removeItem('korzh_liked_status')
  }
}
</script>

<template>
  <div class="essential-apps">
    <div class="header">
      <div class="actions">
        <a href="/pro/customize" class="btn-create">
          Настроить Свой Сигнал
          <span class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 7h10v10"/>
              <path d="M7 17 17 7"/>
            </svg>
          </span>
        </a>
        <a href="/pro/ltvcalc" class="btn-see-all">
          LTV Калькулятор
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
      <div class="app-card korzh-card">
        <div class="card-header">
          <span class="app-name">ОБЩЕПИТ</span>
          
          <div 
            class="like-btn" 
            :class="{ 'is-liked': isLiked }"
            @click="toggleLike"
            title="Нравится"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" 
              viewBox="0 0 24 24" 
              :fill="isLiked ? 'white' : 'none'" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="lucide lucide-heart-icon lucide-heart"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
            </svg>
          </div>
        </div>

        <div class="app-icon">
          <img src="/dialogs-widgets-cafe-icon.svg" alt="Общепит" style="width: 100%; height: 100%; object-fit: contain;" />
        </div>

        <p class="card-description bold-desc">
          Не говорим вам, как варить кофе. Даем умную систему, чтобы в вашей кофейне было больше постоянных гостей.
        </p>

        <div class="stats-row">
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
            </svg>
            <span>{{ currentLikes }}</span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
            <span>{{ lightningCount }}</span>
          </div>
        </div>

        <div class="card-footer">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="play-btn">Тест-драйв</a>
        </div>

        <div class="bubbles-container">
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
            Вознаграждения
          </div>
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            Сигналы работают
          </div>
          <div class="bubble">
            Инвестиции
          </div>
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>ircle cx="12" cy="10" r="3"/></svg>
            Самара
          </div>
        </div>
      </div>

      <div class="app-card">
        <div class="card-header">
          <span class="app-name">ФИТНЕС</span>
          <div class="like-info">
            <span class="like-count">[СуперСпорт]</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
        </div>
        <div class="app-icon">
          <img src="/dialogs-widgets-fitness-icon.svg" alt="Фитнес" style="width: 100%; height: 100%; object-fit: contain;" />
        </div>
        <p class="card-description">50% ваших новых клиентов боятся заходить в зал. Знаем, как это исправить.</p>
        <div class="card-footer">
          <a href="/supersport" target="_blank" rel="noopener noreferrer" class="play-btn">Тест-драйв</a>
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

.app-card.korzh-card {
  grid-template-rows: auto auto auto auto auto 1fr;
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

.like-btn {
  cursor: pointer;
  color: #9e9e9e;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
}

.like-btn:hover {
  color: #fff;
  background: transparent;
}

.like-btn.is-liked {
  color: white; 
}

.app-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  margin-bottom: 16px;
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

.card-description.bold-desc {
  font-size: 15px; 
  font-weight: 600;
  margin: 0; 
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 24px 0; 
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 500;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
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

.bubbles-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.bubble {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #383838; 
  color: #757575; 
  padding: 6px 12px; 
  border-radius: 14px;
  font-size: 12px; 
  font-weight: 500;
  line-height: 1;
  cursor: default; 
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

  .card-description {
    font-size: 16px;
    margin: 0 0 16px 0;
    padding: 0 8px;
  }
}
</style>
