<script setup>
import { ref, onMounted } from 'vue'

const establishments = {
  korzh: {
    name: 'Корж',
    index: 98,
    reviews: '4,520',
    status: 'Лидер 👑',
    branches: [
      { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/' },
      { address: 'Революционная, 101В, к1', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858/' },
      { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618', yandexUrl: 'https://yandex.ru/maps/51/samara/house/9_ya_proseka_5_ya_malaya_liniya_3b/YUkYdw5hQUAAQFtpfX52dXVgZw==/' },
      { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/' },
      { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/' },
      { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045', yandexUrl: 'https://yandex.ru/maps/51/samara/house/dachnaya_ulitsa_2k2/YUkYdwNhSEcOQFtpfX5xcHpkZQ==/' },
      { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071', yandexUrl: 'https://yandex.ru/maps/51/samara/chain/korz/23062014558/' },
      { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/' }
    ]
  }
}

const selectedEstablishment = ref(establishments.korzh)
const showModal = ref(false)

const getRandomService = () => Math.random() < 0.5 ? 'gis' : 'yandex'

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function goToReviews(branch) {
  const service = getRandomService()
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
  
  if (window.gtag) {
    window.gtag('event', 'review_redirect', {
      establishment: selectedEstablishment.value.name,
      address: branch.address,
      service: service === 'gis' ? '2ГИС' : 'Яндекс.Карты'
    })
  }
  
  window.open(url, '_blank')
  closeModal()
}
</script>

<template>
<div class="reviews-widget">
  <!-- Заголовок -->
  <div class="widget-header">
    <h2 class="header-title">Сделайте Индекс Роста еще точнее</h2>
    <p class="header-subtitle">Выберите кофейню и оставьте честный отзыв</p>
  </div>

  <!-- Главная карточка -->
  <div class="main-card">
    <div class="establishment-header">
      <h3 class="cafe-name">{{ selectedEstablishment.name }}</h3>
      <div class="status-badge">{{ selectedEstablishment.status }}</div>
    </div>
    
    <!-- Статистические карточки с ВОССТАНОВЛЕННЫМИ эффектами -->
    <div class="stats-grid">
      <div class="stat-card branches-card">
        <div class="stat-icon">☕</div>
        <div class="stat-value">{{ selectedEstablishment.branches.length }}</div>
        <div class="stat-label">Точки</div>
      </div>
      
      <div class="stat-card index-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-value">{{ selectedEstablishment.index }}</div>
        <div class="stat-label">Индекс роста</div>
      </div>
      
      <div class="stat-card reviews-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-value">{{ selectedEstablishment.reviews }}</div>
        <div class="stat-label">Отзывы</div>
      </div>
    </div>
    
    <!-- Большая кнопка -->
    <button @click="openModal" class="review-button">
      <span class="button-text">ОСТАВИТЬ ОТЗЫВ</span>
      <svg class="button-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8L22 12L18 16"/>
        <path d="M2 12H22"/>
      </svg>
    </button>
  </div>

  <!-- Модальное окно -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showModal" class="modal-mask" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">{{ selectedEstablishment.name }}</h2>
            <button @click="closeModal" class="modal-close-btn">×</button>
          </div>
          
          <div class="modal-content">
            <p class="modal-subtitle">Выберите филиал для оставления отзыва:</p>
            
            <div class="branches-list">
              <button
                v-for="(branch, index) in selectedEstablishment.branches"
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
            
            <div class="modal-footer">
              <p class="redirect-info">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</div>
</template>

<style scoped>
/* Заголовок */
.widget-header {
  text-align: center;
  margin: 60px 0 40px 0;
}

.header-title {
  margin: 0 0 12px 0;
  color: white; /* БЕЛЫЙ цвет без эмодзи */
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
}

.header-subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
}

/* Главная карточка с отступами */
.main-card {
  background: linear-gradient(145deg, var(--vp-c-bg-soft), var(--vp-c-bg));
  border: 2px solid var(--vp-c-border);
  border-radius: 24px;
  padding: 32px;
  margin: 0 20px; /* ОТСТУПЫ по бокам */
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
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
  margin-bottom: 32px;
}

.cafe-name {
  margin: 0;
  color: #00ff88;
  font-size: 28px;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.status-badge {
  background: linear-gradient(135deg, #00d4aa, #00ff88);
  color: #001a1a;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 212, 170, 0.4);
}

/* ВОССТАНОВЛЕННЫЕ объемные статистические карточки */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
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
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); /* ВОССТАНОВЛЕНА ТЕНЬ */
  cursor: default;
}

/* ВОССТАНОВЛЕННЫЙ эффект наведения - подъем карточки */
.stat-card:hover {
  transform: translateY(-8px) rotateX(5deg); /* ВОССТАНОВЛЕН 3D ЭФФЕКТ */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); /* ВОССТАНОВЛЕНА УВЕЛИЧЕННАЯ ТЕНЬ */
}

/* ВОССТАНОВЛЕННАЯ цветная полоска сверху */
.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: transform 0.3s ease;
  transform: scaleX(0); /* СКРЫТА ПО УМОЛЧАНИЮ */
}

.branches-card::before {
  background: linear-gradient(90deg, #00a86b, #00d4aa);
}

.index-card::before {
  background: linear-gradient(90deg, #00ff88, #00d4aa);
}

.reviews-card::before {
  background: linear-gradient(90deg, #ffd700, #ffed4e);
}

/* ВОССТАНОВЛЕН эффект появления полоски при наведении */
.stat-card:hover::before {
  transform: scaleX(1); /* ПОЯВЛЯЕТСЯ ПРИ НАВЕДЕНИИ */
}

/* ВОССТАНОВЛЕН shimmer эффект */
.stat-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.6s;
  opacity: 0;
}

.stat-card:hover::after {
  animation: shimmer 1.5s ease-in-out;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
    opacity: 0;
  }
}

.stat-icon {
  font-size: 42px;
  margin-bottom: 12px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

/* ВОССТАНОВЛЕН эффект увеличения иконки при наведении */
.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.stat-value {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 8px;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

/* ВОССТАНОВЛЕН эффект увеличения значения при наведении */
.stat-card:hover .stat-value {
  transform: scale(1.05);
}

.branches-card .stat-value {
  color: #00a86b;
}

.index-card .stat-value {
  color: #00ff88;
}

.reviews-card .stat-value {
  color: #ffd700;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
}

/* Увеличенная кнопка */
.review-button {
  width: 100%;
  background: linear-gradient(135deg, #00d4aa, #00ff88);
  border: none;
  border-radius: 20px;
  padding: 28px 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 12px 32px rgba(0, 212, 170, 0.4);
}

.review-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.review-button:hover::before {
  left: 100%;
}

.review-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 212, 170, 0.5);
}

.button-text {
  color: #001a1a;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.button-icon {
  color: #001a1a;
  transition: transform 0.3s ease;
}

.review-button:hover .button-icon {
  transform: translateX(6px);
}

/* Модальное окно */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-container {
  background: var(--vp-c-bg);
  border-radius: 24px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  border: 2px solid var(--vp-c-border);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 2px solid var(--vp-c-border);
  background: linear-gradient(145deg, var(--vp-c-bg-soft), var(--vp-c-bg));
  min-height: 70px;
}

.modal-title {
  margin: 0;
  color: #00ff88;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.modal-close-btn {
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
  font-size: 18px;
}

.modal-close-btn:hover {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-color: #ef4444;
  color: white;
  transform: rotate(90deg);
}

.modal-content {
  overflow-y: auto;
  flex-grow: 1;
}

.modal-subtitle {
  margin: 0;
  padding: 24px 28px 16px;
  color: var(--vp-c-text-2);
  font-size: 16px;
  font-weight: 600;
}

.branches-list {
  padding: 0 20px 20px;
}

.branch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  margin: 12px 0;
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
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
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
  padding: 20px 28px 28px;
  border-top: 2px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.redirect-info {
  margin: 0;
  color: #00ff88;
  font-size: 18px; /* КРУПНЫЙ текст */
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  line-height: 1.4;
}

/* Анимации модального окна */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
  opacity: 0;
}

/* Мобильная адаптивность */
@media (max-width: 768px) {
  .widget-header {
    margin: 40px 0 30px 0;
  }
  
  .main-card {
    margin: 0 15px;
    padding: 24px;
  }
  
  /* Мобильные карточки становятся горизонтальными */
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .stat-card {
    flex-direction: row;
    padding: 20px;
    text-align: left;
    min-height: 80px;
  }
  
  .stat-icon {
    font-size: 48px;
    margin-bottom: 0;
    margin-right: 20px;
    flex-shrink: 0;
  }
  
  .stat-value {
    font-size: 32px;
    margin-bottom: 4px;
  }
  
  .stat-label {
    text-align: left;
    font-size: 14px;
  }
  
  .review-button {
    padding: 32px 28px;
  }
  
  .button-text {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .main-card {
    margin: 0 10px;
    padding: 20px;
  }
  
  .stat-icon {
    font-size: 44px;
    margin-right: 16px;
  }
  
  .stat-value {
    font-size: 28px;
  }
  
  .review-button {
    padding: 36px 24px;
  }
  
  .button-text {
    font-size: 20px;
  }
  
  .modal-mask {
    padding: 10px;
  }
}
</style>
