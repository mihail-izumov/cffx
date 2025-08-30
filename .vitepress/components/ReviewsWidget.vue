<script setup>
import { ref, defineEmits } from 'vue'

const establishment = {
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
const showBranchList = ref(false)
const emit = defineEmits(['close'])

const getRandomService = () => Math.random() < 0.5 ? 'gis' : 'yandex'
const goToReviews = (branch) => {
  const service = getRandomService()
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
  window.open(url, '_blank')
}
</script>

<template>
  <div class="reviews-widget-content">
    <!-- Первый экран -->
    <div v-if="!showBranchList">
      <div class="widget-header">
        <div>
          <h2 class="header-title">Сделайте Индекс Роста еще точнее</h2>
          <p class="header-subtitle">Выберите кофейню и оставьте честный отзыв</p>
        </div>
        <button @click="$emit('close')" class="internal-close-btn" aria-label="Закрыть окно">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18"/><path d="M6 6L18 18"/>
          </svg>
        </button>
      </div>
      <div class="main-card">
        <div class="establishment-header">
          <h3 class="cafe-name">{{ establishment.name }}</h3>
          <div class="status-badge">{{ establishment.status }}</div>
        </div>
        
        <div class="stats-grid">
          <div class="stat-card branches-card">
            <div class="stat-content">
              <div class="stat-icon">☕</div>
              <div class="stat-value">{{ establishment.branches.length }}</div>
              <div class="stat-label">Кофейни</div>
            </div>
          </div>
          
          <div class="stat-card index-card">
            <div class="stat-content">
              <div class="stat-icon">⚡</div>
              <div class="stat-value">{{ establishment.index }}</div>
              <div class="stat-label">Индекс роста</div>
            </div>
          </div>
          
          <div class="stat-card reviews-card">
            <div class="stat-content">
              <div class="stat-icon">🏆</div>
              <div class="stat-value">{{ establishment.totalReviews }}</div>
              <div class="stat-label">Отзывы</div>
            </div>
          </div>
        </div>
        
        <button @click="showBranchList = true" class="review-button">
          <span class="button-text">Оставить отзыв</span>
          <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Второй экран -->
    <div v-else>
      <div class="branches-header">
        <h2 class="branches-title">{{ establishment.name }}</h2>
        <button @click="$emit('close')" class="internal-close-btn" aria-label="Закрыть окно">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18"/><path d="M6 6L18 18"/>
          </svg>
        </button>
      </div>
      <div class="branches-content">
        <p class="branches-subtitle">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>
        <div class="branches-list">
          <button v-for="(branch, index) in establishment.branches" :key="index" @click="goToReviews(branch)" class="branch-item">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ОБЩИЕ СТИЛИ КОНТЕЙНЕРА */
.reviews-widget-content {
  padding: 32px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

/* ЗАГОЛОВКИ */
.widget-header, .branches-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.header-title, .branches-title {
  margin: 0;
  color: white;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
}
.header-subtitle {
  margin-top: 8px;
  font-size: 15px;
  color: var(--vp-c-text-2);
}
.branches-header {
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
  margin-bottom: 20px;
}
.branches-title {
  color: #FFFFFF;
}

/* КНОПКА ЗАКРЫТИЯ */
.internal-close-btn {
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-border);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.internal-close-btn:hover {
  background: linear-gradient(135deg, #991b1b, #ef4444);
  border-color: #ef4444;
  color: white;
  transform: rotate(90deg);
}

/* ГЛАВНАЯ КАРТОЧКА */
.main-card {
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  padding: 24px;
}
.establishment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.cafe-name {
  margin: 0;
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 600;
}
.status-badge {
  background: rgba(197, 249, 70, 0.15);
  color: #C5F946;
  border: 1px solid rgba(197, 249, 70, 0.2);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* СТАТИСТИЧЕСКИЕ КАРТОЧКИ */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
.stat-card {
  position: relative;
  border-radius: 22px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}
.stat-card:hover {
  transform: translateY(-8px);
}
.stat-card::before { /* Градиентная рамка */
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 2px;
  background: var(--border-gradient);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: filter 0.4s ease;
  z-index: 3;
}
.stat-card:hover::before {
  filter: brightness(2) saturate(1.5);
}

/* ЦВЕТА ДЛЯ КАРТОЧЕК */
.branches-card { 
  --border-gradient: linear-gradient(135deg, #3730a3, #8b5cf6, #c4b5fd);
  --glow-color: rgba(139, 92, 246, 0.25);
  --glow-hover-color: rgba(139, 92, 246, 0.6);
}
.index-card { 
  --border-gradient: linear-gradient(135deg, #4d7c0f, #a3e635, #C5F946);
  --glow-color: rgba(197, 249, 70, 0.25);
  --glow-hover-color: rgba(197, 249, 70, 0.6);
}
.reviews-card { 
  --border-gradient: linear-gradient(135deg, #b45309, #f59e0b, #fcd34d);
  --glow-color: rgba(245, 158, 11, 0.25);
  --glow-hover-color: rgba(245, 158, 11, 0.6);
}

.stat-content {
  background: radial-gradient(circle at 50% 0%, var(--glow-color) 0%, transparent 70%);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  z-index: 2;
}
.stat-card:hover .stat-content {
  background: radial-gradient(circle at 50% 0%, var(--glow-hover-color) 0%, transparent 70%);
  box-shadow: 0 25px 50px -10px rgba(0,0,0,0.4);
}
.stat-icon, .stat-value, .stat-label {
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.stat-icon {
  font-size: 28px;
  opacity: 0.8;
  height: 32px;
}
.stat-card:hover .stat-icon {
  transform: scale(1.2);
}
.stat-value {
  font-family: 'Inter', sans-serif;
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  margin: 12px 0;
  text-shadow: 
    0 0 20px rgba(0, 0, 0, 0.7),
    0 0 10px rgba(0, 0, 0, 0.7);
}
.stat-card:hover .stat-value {
  transform: scale(1.15);
  text-shadow: 
    0 0 30px rgba(0, 0, 0, 0.8),
    0 0 15px rgba(0, 0, 0, 0.8);
}
.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.stat-card:hover .stat-label {
  transform: scale(1.05);
}

/* КНОПКА CTA */
.review-button { 
  width: 100%; 
  background: linear-gradient(135deg, #a3e635, #C5F946); 
  border: none; 
  border-radius: 16px; 
  padding: 18px 24px; 
  margin-top: 24px;
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 12px; 
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
  box-shadow: 0 8px 24px rgba(197, 249, 70, 0.25); 
}
.review-button:hover { 
  transform: translateY(-4px) scale(1.02); 
  box-shadow: 0 14px 35px rgba(197, 249, 70, 0.35); 
}
.button-text { color: #1d2c00; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.button-icon { color: #1d2c00; transition: transform 0.3s ease; }
.review-button:hover .button-icon { transform: translateX(4px); }

/* СПИСОК ФИЛИАЛОВ */
.branches-content { flex-grow: 1; }
.branches-subtitle { margin: 0 0 16px 0; font-size: 16px; color: var(--vp-c-text-2); }
.branches-list { padding: 0; }
.branch-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 18px; margin-bottom: 12px; background: var(--vp-c-bg-soft); border: 2px solid var(--vp-c-border); border-radius: 16px; cursor: pointer; transition: all 0.3s ease; text-align: left; }
.branch-item:hover { background: linear-gradient(135deg, rgba(197, 249, 70, 0.05), var(--vp-c-bg-soft)); border-color: #C5F946; box-shadow: 0 8px 20px rgba(197, 249, 70, 0.1); }
.branch-info { display: flex; align-items: center; gap: 16px; flex: 1; overflow: hidden; }
.branch-number { background: linear-gradient(135deg, #a3e635, #C5F946); color: #1d2c00; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; box-shadow: 0 4px 12px rgba(197, 249, 70, 0.3); }
.branch-address { font-weight: 600; font-size: 16px; color: var(--vp-c-text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.branch-action { color: #C5F946; transition: transform 0.3s ease; margin-left: 12px; }
.branch-item:hover .branch-action { transform: translateX(4px); }

/* АДАПТИВНОСТЬ */
@media (max-width: 768px) {
  .reviews-widget-content { padding: 24px; max-height: calc(100vh - 60px); }
  .main-card { padding: 16px; }
  .stats-grid { grid-template-columns: 1fr; gap: 12px; }
  .stat-card { border-radius: 18px; }
  .stat-content { padding: 12px; border-radius: 16px; min-height: auto; }
  .stat-icon { font-size: 24px; height: 28px; }
  .stat-value { font-size: 2.8rem; margin: 8px 0; }
  .stat-label { font-size: 10px; }
  .review-button { padding: 20px 24px; margin-top: 20px; border-radius: 18px; }
  .button-text { font-size: 20px; }
}
@media (max-width: 480px) {
  .reviews-widget-content { padding: 20px; max-height: calc(100vh - 40px); }
  .header-title { font-size: 22px; }
  .header-subtitle { font-size: 14px; }
  .branches-title { font-size: 22px; }
  .branches-subtitle { font-size: 14px; }
  .cafe-name { font-size: 20px; }
  .status-badge { padding: 4px 12px; font-size: 10px; }
}
</style>
