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
              <div class="stat-label">Точки</div>
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
}

/* ЗАГОЛОВОК ПЕРВОГО ЭКРАНА */
.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.header-title {
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

/* ЗАГОЛОВОК СПИСКА ФИЛИАЛОВ (ВТОРОЙ ЭКРАН) */
.branches-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
  margin-bottom: 20px;
}
.branches-title {
  margin: 0;
  color: #00ff88;
  font-size: 26px;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
}

/* СТИЛЬ ДЛЯ ВНУТРЕННЕЙ КНОПКИ ЗАКРЫТИЯ */
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
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-color: #ef4444;
  color: white;
  transform: rotate(90deg);
}

/* КАРТОЧКА НА ПЕРВОМ ЭКРАНЕ */
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
  color: #00ff88;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}
.status-badge {
  background: linear-gradient(135deg, #00d4aa, #00ff88);
  color: #001a1a;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* СТАТИСТИЧЕСКИЕ КАРТОЧКИ В СТИЛЕ ASTON MARTIN / TESLA */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
.stat-card {
  position: relative;
  padding: 2px;
  border-radius: 22px;
  background: transparent;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.stat-card:hover {
  transform: translateY(-8px);
}
.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 2px;
  background: var(--gradient-border);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: all 0.3s ease;
  z-index: 1;
}
.stat-card:hover::before {
  transform: scale(1.02);
  filter: brightness(1.3);
}
.branches-card { --gradient-border: linear-gradient(135deg, #00A86B, #00d4aa); }
.index-card { --gradient-border: linear-gradient(135deg, #00FF88, #00d4aa); }
.reviews-card { --gradient-border: linear-gradient(135deg, #FFD700, #ffed4e); }

.stat-content {
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 70%), var(--vp-c-bg-soft);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3);
  transition: box-shadow 0.3s ease;
}
.stat-card:hover .stat-content {
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5);
}
.stat-icon {
  font-size: 28px;
  opacity: 0.8;
  height: 32px;
  transition: transform 0.3s ease;
}
.stat-card:hover .stat-icon {
  transform: scale(1.1);
}
.stat-value {
  font-family: 'Inter', sans-serif;
  font-size: 3.2rem;
  font-weight: 500;
  line-height: 1;
  color: #fff;
  margin: 12px 0;
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.3);
}
.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ОСНОВНАЯ КНОПКА CTA */
.review-button { 
  width: 100%; 
  background: linear-gradient(135deg, #00d4aa, #00ff88); 
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
  box-shadow: 0 8px 24px rgba(0, 212, 170, 0.3); 
}
.review-button:hover { 
  transform: translateY(-4px) scale(1.02); 
  box-shadow: 0 14px 35px rgba(0, 212, 170, 0.4); 
}
.button-text { color: #001a1a; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.button-icon { color: #001a1a; transition: transform 0.3s ease; }
.review-button:hover .button-icon { transform: translateX(4px); }

/* СПИСОК ФИЛИАЛОВ */
.branches-content { flex-grow: 1; }
.branches-subtitle { margin: 0 0 16px 0; font-size: 16px; color: var(--vp-c-text-2); }
.branches-list { padding: 0; }
.branch-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 18px; margin-bottom: 12px; background: var(--vp-c-bg-soft); border: 2px solid var(--vp-c-border); border-radius: 16px; cursor: pointer; transition: all 0.3s ease; text-align: left; }
.branch-item:hover { background: linear-gradient(135deg, rgba(0, 212, 170, 0.1), var(--vp-c-bg-soft)); border-color: #00d4aa; box-shadow: 0 8px 20px rgba(0, 212, 170, 0.2); }
.branch-info { display: flex; align-items: center; gap: 16px; flex: 1; overflow: hidden; }
.branch-number { background: linear-gradient(135deg, #00d4aa, #00ff88); color: #001a1a; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3); }
.branch-address { font-weight: 600; font-size: 16px; color: var(--vp-c-text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.branch-action { color: #00d4aa; transition: transform 0.3s ease; margin-left: 12px; }
.branch-item:hover .branch-action { transform: translateX(4px); }

/* АДАПТИВНОСТЬ */
@media (max-width: 768px) {
  .reviews-widget-content { padding: 24px; }
  .main-card { padding: 16px; }
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .stat-card {
    padding: 2px;
    border-radius: 18px;
  }
  .stat-content {
    padding: 12px;
    border-radius: 16px;
    min-height: auto;
  }
  .stat-icon {
    font-size: 24px;
    height: 28px;
  }
  .stat-value {
    font-size: 2.8rem;
    margin: 8px 0;
  }
  .stat-label {
    font-size: 10px;
  }
  .review-button {
    padding: 20px 24px;
    margin-top: 20px;
    border-radius: 18px;
  }
  .button-text {
    font-size: 20px;
  }
}
@media (max-width: 480px) {
  .reviews-widget-content { padding: 20px; }
  .header-title { font-size: 22px; }
  .header-subtitle { font-size: 14px; }
  .branches-title { font-size: 22px; }
  .branches-subtitle { font-size: 14px; }
  .cafe-name { font-size: 20px; }
  .status-badge { padding: 4px 12px; font-size: 10px; }
}
</style>
