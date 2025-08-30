<script setup>
import { ref } from 'vue'

// Данные для сетей кофеен
const establishments = {
  korzh: {
    name: 'Корж',
    totalReviews: '4,520',
    branches: [
      { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/' },
      { address: 'Революционная, 101В, к1', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858/' },
      { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618', yandexUrl: 'https://yandex.ru/maps/51/samara/house/9_ya_proseka_5_ya_malaya_liniya_3b/YUkYdw5hQUAAQFtpfX52dXVgZw==/' },
      { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/' },
      { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/' },
      { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045', yandexUrl: 'https://yandex.ru/maps/51/samara/house/dachnaya_ulitsa_2k2/YUkYdwNhSEcOQFtpfX5xcHpkZQ==/' },
      { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071', yandexUrl: 'https://yandex.ru/maps/51/samara/chain/korz/23062014558/' },
      { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/' }
    ],
    status: 'Лидер 👑',
    index: 98,
  }
}

// Внутреннее состояние для переключения экранов
const showBranchList = ref(false);

const establishment = establishments.korzh; // Для простоты используем "Корж"

// A/B тестирование для выбора сервиса
const getRandomService = () => Math.random() < 0.5 ? 'gis' : 'yandex';

// Переход к отзыву
const goToReviews = (branch) => {
  const service = getRandomService();
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl;
  
  if (window.gtag) {
    window.gtag('event', 'review_redirect', {
      establishment: establishment.name,
      address: branch.address,
      service: service === 'gis' ? '2ГИС' : 'Яндекс.Карты'
    });
  }
  
  window.open(url, '_blank');
}
</script>

<template>
  <div class="reviews-widget-content">
    <!-- Первый экран: главная информация -->
    <div v-if="!showBranchList">
      <div class="widget-header">
        <h2 class="header-title">Сделайте Индекс Роста еще точнее</h2>
        <p class="header-subtitle">Выберите кофейню и оставьте честный отзыв</p>
      </div>

      <div class="main-card">
        <div class="establishment-header">
          <h3 class="cafe-name">{{ establishment.name }}</h3>
          <div class="status-badge">{{ establishment.status }}</div>
        </div>
        
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
        
        <button @click="showBranchList = true" class="review-button">
          <span class="button-text">ОСТАВИТЬ ОТЗЫВ</span>
          <svg class="button-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Второй экран: список филиалов -->
    <div v-else>
       <div class="modal-header-branches">
          <h2 class="modal-title">{{ establishment.name }}</h2>
       </div>
        <div class="modal-content">
          <p class="modal-subtitle">Выберите филиал для оставления отзыва:</p>
          
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                   <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </button>
          </div>
          
          <div class="modal-footer">
            <p class="redirect-info">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
/* ЗАГОЛОВОК */
.widget-header {
  text-align: center;
  margin: 0 0 30px 0;
}
.header-title {
  color: white;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 10px 0;
}
.header-subtitle {
  color: var(--vp-c-text-2);
  font-size: 15px;
  margin: 0;
}

/* ГЛАВНАЯ КАРТОЧКА С ОТСТУПАМИ */
.main-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
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
  margin-bottom: 28px;
}
.cafe-name {
  margin: 0;
  color: #00ff88;
  font-size: 26px;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
}
.status-badge {
  background: linear-gradient(135deg, #00d4aa, #00ff88);
  color: #001a1a;
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 212, 170, 0.4);
}

/* СТАТИСТИКА С ОБЪЕМОМ */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 18px;
  margin-bottom: 28px;
}
.stat-card {
  background: var(--vp-c-bg-mute);
  border: 3px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
/* ЭФФЕКТ ОБЪЕМА И ОБВОДКА ПРИ НАВЕДЕНИИ */
.stat-card:hover {
  transform: translateY(-8px) rotateX(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  border-color: #00d4aa;
}

.stat-icon {
  font-size: 40px;
  margin-bottom: 12px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}
.stat-value {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
  line-height: 1;
}
.branches-card .stat-value { color: #00a86b; }
.index-card .stat-value { color: #00ff88; }
.reviews-card .stat-value { color: #ffd700; }
.stat-label {
  font-size: 11px;
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
  border-radius: 18px;
  padding: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 12px 32px rgba(0, 212, 170, 0.4);
}
.review-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 212, 170, 0.5);
}
.button-text {
  color: #001a1a;
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.button-icon {
  color: #001a1a;
  transition: transform 0.3s ease;
}
.review-button:hover .button-icon {
  transform: translateX(5px);
}

/* ЭКРАН СПИСКА ФИЛИАЛОВ */
.modal-header-branches {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
  margin-bottom: 20px;
}
.modal-title {
  margin: 0;
  color: #00ff88;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}
.modal-content {
  overflow-y: auto;
  flex-grow: 1;
}
.modal-subtitle {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
  font-weight: 600;
}
.branches-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.branch-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 18px;
  margin-bottom: 12px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}
.branch-item:hover {
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.1), var(--vp-c-bg-soft));
  border-color: #00d4aa;
  transform: translateX(8px);
  box-shadow: 0 8px 20px rgba(0, 212, 170, 0.2);
}
.branch-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}
.branch-number {
  background: linear-gradient(135deg, #00d4aa, #00ff88);
  color: #001a1a;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
}
.branch-address {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 16px;
}
.branch-action {
  color: #00d4aa;
  transition: transform 0.3s ease;
}
.branch-item:hover .branch-action {
  transform: translateX(4px);
}
.modal-footer {
  padding-top: 20px;
  border-top: 2px solid var(--vp-c-border);
  text-align: center;
  margin-top: 20px;
}
/* УВЕЛИЧЕННАЯ ИНФОРМАЦИЯ О ПЕРЕНАПРАВЛЕНИИ */
.redirect-info {
  margin: 0;
  color: #00ff88;
  font-size: 16px;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  line-height: 1.4;
}

/* АДАПТИВНОСТЬ */
@media (max-width: 768px) {
  .header-title { font-size: 22px; }
  .main-card { padding: 24px; }
  .stats-grid { grid-template-columns: 1fr; gap: 16px; }
  .stat-card { flex-direction: row; padding: 20px; text-align: left; min-height: 80px; }
  .stat-icon { font-size: 44px; margin: 0 20px 0 0; }
  .stat-value { font-size: 28px; margin-bottom: 4px; }
  .stat-label { text-align: left; font-size: 13px; }
  .review-button { padding: 28px; }
  .button-text { font-size: 18px; }
}
@media (max-width: 480px) {
  .main-card { padding: 20px; }
  .cafe-name { font-size: 22px; }
  .status-badge { padding: 6px 16px; font-size: 11px; }
  .stat-icon { font-size: 40px; margin-right: 16px; }
  .stat-value { font-size: 26px; }
  .review-button { padding: 24px; }
  .button-text { font-size: 16px; }
}
</style>
