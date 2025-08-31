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

const activeChoice = ref('ticket') // 'ticket' или 'review'

const getRandomService = () => Math.random() < 0.5 ? 'gis' : 'yandex'
const goToReviews = (branch) => {
  const service = getRandomService()
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
  window.open(url, '_blank')
}

const handleChoice = (choice) => {
  activeChoice.value = choice
  if (choice === 'ticket') {
    emit('close')
    window.location.href = '/brew/overview'
  } else if (choice === 'review') {
    showBranchList.value = true
  }
}
</script>

<template>
  <div class="reviews-widget-content">
    <!-- Первый экран -->
    <div v-if="!showBranchList">
      <div class="widget-header">
        <div>
          <h2 class="header-title">Сделайте Индекс Роста еще точнее</h2>
          <p class="header-subtitle">Выберите действие, чтобы продолжить</p>
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
        
        <!-- ПЕРЕКЛЮЧАТЕЛЬ В СТИЛЕ TESLA -->
        <div class="toggle-container">
          <div class="toggle-background">
            <button @click="handleChoice('ticket')" :class="['toggle-button', { 'active': activeChoice === 'ticket' }]">
              Отправить тикет
            </button>
            <button @click="handleChoice('review')" :class="['toggle-button', { 'active': activeChoice === 'review' }]">
              Оставить отзыв
            </button>
          </div>
        </div>

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
/* ... (здесь все стили до кнопок, они не меняются) */

/* ПЕРЕКЛЮЧАТЕЛЬ TESLA-STYLE */
.toggle-container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
.toggle-background {
  display: flex;
  background-color: var(--vp-c-bg-mute);
  border-radius: 16px;
  padding: 6px;
  border: 1px solid var(--vp-c-divider);
}
.toggle-button {
  flex: 1;
  padding: 12px 24px;
  border: none;
  background-color: transparent;
  color: var(--vp-c-text-2);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}
.toggle-button.active {
  background: linear-gradient(135deg, #a3e635, #C5F946);
  color: #1d2c00;
  box-shadow: 0 4px 12px rgba(197, 249, 70, 0.3);
  transform: scale(1.05);
}
.toggle-button:not(.active):hover {
  background-color: var(--vp-c-bg-soft);
}

/* ... (здесь все стили после кнопок, они не меняются) */

/* СТИЛИ СПИСКА ФИЛИАЛОВ (остаются без изменений) */
.branches-content { flex-grow: 1; }
.branches-subtitle { margin: 0 0 16px 0; font-size: 16px; color: var(--vp-c-text-2); }
.branches-list { padding: 0; }
.branch-item { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
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
  background: linear-gradient(135deg, rgba(197, 249, 70, 0.05), var(--vp-c-bg-soft)); 
  border-color: #C5F946; 
  box-shadow: 0 8px 20px rgba(197, 249, 70, 0.1);
  transform: translateX(4px);
}
.branch-info { display: flex; align-items: center; gap: 16px; flex: 1; overflow: hidden; }
.branch-number { 
  background: linear-gradient(135deg, #a3e635, #C5F946); 
  color: #1d2c00; 
  width: 32px; 
  height: 32px; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 14px; 
  font-weight: 700; 
  flex-shrink: 0; 
  transition: all 0.3s ease;
  box-shadow: none;
}
.branch-item:hover .branch-number {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(197, 249, 70, 0.5);
}
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
  .toggle-button { padding: 10px 16px; font-size: 14px; }
}
@media (max-width: 480px) {
  .reviews-widget-content { padding: 20px; max-height: calc(100vh - 40px); }
  .header-title { font-size: 22px; }
  .header-subtitle { font-size: 14px; }
  .branches-title { font-size: 22px; }
  .branches-subtitle { font-size: 14px; }
  .cafe-name { font-size: 20px; }
  .status-badge { padding: 4px 12px; font-size: 10px; }
  .toggle-background { flex-direction: column; gap: 6px; }
}
</style>
