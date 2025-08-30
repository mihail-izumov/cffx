<script setup>
import { ref } from 'vue'

const establishment = {
  name: 'Корж',
  totalReviews: '4,520',
  branches: [
    { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara', yandexUrl: 'https://yandex.ru/maps' },
    { address: 'Революционная, 101В, к1', gisUrl: 'https://2gis.ru/samara', yandexUrl: 'https://yandex.ru/maps' },
    { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara', yandexUrl: 'https://yandex.ru/maps' },
    { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara', yandexUrl: 'https://yandex.ru/maps' },
    { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara', yandexUrl: 'https://yandex.ru/maps' },
    { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara', yandexUrl: 'https://yandex.ru/maps' },
    { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara', yandexUrl: 'https://yandex.ru/maps' },
    { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara', yandexUrl: 'https://yandex.ru/maps' }
  ],
  status: 'Лидер 👑',
  index: 98,
}

const showBranchList = ref(false)

const getRandomService = () => Math.random() < 0.5 ? 'gis' : 'yandex'

const goToReviews = (branch) => {
  const service = getRandomService()
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
  window.open(url, '_blank')
}
</script>

<template>
  <div class="reviews-widget">
    <!-- Первый экран: главные карточки -->
    <div v-if="!showBranchList" class="main-screen">
      <div class="widget-header">
        <h2 class="header-title">Сделайте Индекс Роста еще точнее</h2>
        <p class="header-subtitle">Выберите кофейню и оставьте честный отзыв</p>
      </div>

      <div class="main-card">
        <div class="establishment-header">
          <h3 class="cafe-name">{{ establishment.name }}</h3>
          <div class="status-badge">{{ establishment.status }}</div>
        </div>
        
        <!-- Сетка статистики -->
        <div class="stats-grid">
          <div class="stat-card branches-card">
            <div class="stat-icon">☕</div>
            <div class="stat-value">{{ establishment.branches.length }}</div>
            <div class="stat-label">Точки</div>
          </div>
          
          <div class="stat-card index-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-value">{{ establishment.index }}</div>
            <div class="stat-label">Индекс роста</div>
          </div>
          
          <div class="stat-card reviews-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-value">{{ establishment.totalReviews }}</div>
            <div class="stat-label">Отзывы</div>
          </div>
        </div>
        
        <!-- Большая кнопка -->
        <button @click="showBranchList = true" class="review-button">
          <span class="button-text">ОСТАВИТЬ ОТЗЫВ</span>
          <svg class="button-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8L22 12L18 16"/>
            <path d="M2 12H22"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Второй экран: список филиалов -->
    <div v-else class="branches-screen">
      <div class="branches-header">
        <h2 class="branches-title">{{ establishment.name }}</h2>
      </div>
      
      <div class="branches-content">
        <p class="branches-subtitle">Выберите филиал для оставления отзыва:</p>
        
        <div class="branches-list">
          <button
            v-for="(branch, index) in establishment.branches"
            :key="index"
            @click="goToReviews(branch)"
            class="branch-item"
          >
            <div class="branch-info">
              <div class="branch-number">{{ index + 1 }}</div>
              <div class="branch-address">{{ branch.address }}</div>
            </div>
            <div class="branch-action">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8L22 12L18 16"/>
                <path d="M2 12H22"/>
              </svg>
            </div>
          </button>
        </div>
        
        <div class="branches-footer">
          <p class="redirect-info">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* АДАПТАЦИЯ ПОД КОНТЕЙНЕР ТАБЛИЦЫ */
.reviews-widget {
  padding: 20px; /* Добавляем отступы внутри */
  min-height: 400px;
}

/* ЗАГОЛОВОК */
.widget-header {
  text-align: center;
  margin-bottom: 20px;
}
.header-title {
  color: white;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 8px 0;
}
.header-subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin: 0;
}

/* ГЛАВНАЯ КАРТОЧКА */
.main-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.main-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #00d4aa, #00ff88);
}

.establishment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.cafe-name {
  margin: 0;
  color: #00ff88;
  font-size: 22px;
  font-weight: 700;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
}
.status-badge {
  background: linear-gradient(135deg, #00d4aa, #00ff88);
  color: #001a1a;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 3px 12px rgba(0, 212, 170, 0.4);
}

/* СТАТИСТИЧЕСКИЕ КАРТОЧКИ С ОБЪЕМОМ */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.stat-card {
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
/* ВОССТАНОВЛЕННЫЙ ЭФФЕКТ ОБЪЕМА */
.stat-card:hover {
  transform: translateY(-6px) rotateX(3deg);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
}
.branches-card:hover {
  border-color: #00a86b;
  box-shadow: 0 16px 32px rgba(0, 168, 107, 0.2);
}
.index-card:hover {
  border-color: #00ff88;
  box-shadow: 0 16px 32px rgba(0, 255, 136, 0.2);
}
.reviews-card:hover {
  border-color: #ffd700;
  box-shadow: 0 16px 32px rgba(255, 215, 0, 0.2);
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
.stat-value {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 4px;
  line-height: 1;
}
.branches-card .stat-value { color: #00a86b; }
.index-card .stat-value { color: #00ff88; }
.reviews-card .stat-value { color: #ffd700; }
.stat-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* БОЛЬШАЯ КНОПКА */
.review-button {
  width: 100%;
  background: linear-gradient(135deg, #00d4aa, #00ff88);
  border: none;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 212, 170, 0.4);
}
.review-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 212, 170, 0.5);
}
.button-text {
  color: #001a1a;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.button-icon {
  color: #001a1a;
  transition: transform 0.3s ease;
}
.review-button:hover .button-icon {
  transform: translateX(4px);
}

/* ЭКРАН ФИЛИАЛОВ */
.branches-header {
  margin-bottom: 16px;
}
.branches-title {
  margin: 0;
  color: #00ff88;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
}
.branches-content {
  flex: 1;
}
.branches-subtitle {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 600;
}
.branches-list {
  margin-bottom: 20px;
}
.branch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  margin-bottom: 10px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}
.branch-item:hover {
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.1), var(--vp-c-bg-soft));
  border-color: #00d4aa;
  transform: translateX(6px);
  box-shadow: 0 6px 16px rgba(0, 212, 170, 0.2);
}
.branch-info {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}
.branch-number {
  background: linear-gradient(135deg, #00d4aa, #00ff88);
  color: #001a1a;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0, 212, 170, 0.3);
}
.branch-address {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 15px;
}
.branch-action {
  color: #00d4aa;
  transition: transform 0.3s ease;
}
.branch-item:hover .branch-action {
  transform: translateX(3px);
}
.branches-footer {
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-border);
  text-align: center;
}
.redirect-info {
  margin: 0;
  color: #00ff88;
  font-size: 14px;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(0, 255, 136, 0.5);
  line-height: 1.4;
}

/* МОБИЛЬНАЯ АДАПТИВНОСТЬ */
@media (max-width: 768px) {
  .reviews-widget { padding: 16px; }
  .header-title { font-size: 20px; }
  .main-card { padding: 20px; }
  .stats-grid { grid-template-columns: 1fr; gap: 12px; }
  .stat-card { 
    flex-direction: row; 
    padding: 16px; 
    text-align: left;
    min-height: 70px;
  }
  .stat-icon { 
    font-size: 36px; 
    margin: 0 16px 0 0;
  }
  .stat-value { font-size: 24px; margin-bottom: 2px; }
  .stat-label { text-align: left; font-size: 11px; }
  .review-button { padding: 18px; }
  .button-text { font-size: 16px; }
}

@media (max-width: 480px) {
  .main-card { padding: 16px; }
  .cafe-name { font-size: 20px; }
  .status-badge { padding: 4px 12px; font-size: 10px; }
  .stat-card { padding: 14px; min-height: 65px; }
  .stat-icon { font-size: 32px; margin-right: 14px; }
  .stat-value { font-size: 22px; }
  .review-button { padding: 16px; }
  .button-text { font-size: 15px; }
}
</style>
