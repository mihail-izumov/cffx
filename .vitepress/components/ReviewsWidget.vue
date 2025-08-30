<script setup>
import { ref, onMounted } from 'vue'

// Данные для сетей кофеен
const establishments = {
  korzh: {
    name: 'Корж',
    totalReviews: '4,520',
    branches: [
      { 
        address: 'Куйбышева, 103',
        gisUrl: 'https://2gis.ru/samara/firm/70000001100403006',
        yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/'
      },
      { 
        address: 'Революционная, 101В, к1',
        gisUrl: 'https://2gis.ru/samara/firm/70000001079219341',
        yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858/'
      },
      { 
        address: '9 просека 5-я малая линия, 3б',
        gisUrl: 'https://2gis.ru/samara/firm/70000001074923618',
        yandexUrl: 'https://yandex.ru/maps/51/samara/house/9_ya_proseka_5_ya_malaya_liniya_3b/YUkYdw5hQUAAQFtpfX52dXVgZw==/'
      },
      { 
        address: 'Льва Толстого, 30Б',
        gisUrl: 'https://2gis.ru/samara/firm/70000001052357057',
        yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/'
      },
      { 
        address: 'Самарская, 270',
        gisUrl: 'https://2gis.ru/samara/firm/70000001043471927',
        yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/'
      },
      { 
        address: 'Дачная, 2к2',
        gisUrl: 'https://2gis.ru/samara/firm/70000001045453045',
        yandexUrl: 'https://yandex.ru/maps/51/samara/house/dachnaya_ulitsa_2k2/YUkYdwNhSEcOQFtpfX5xcHpkZQ==/'
      },
      { 
        address: 'Ульяновская, 19',
        gisUrl: 'https://2gis.ru/samara/firm/70000001033411071',
        yandexUrl: 'https://yandex.ru/maps/51/samara/chain/korz/23062014558/'
      },
      { 
        address: 'Ново-Садовая, 106б',
        gisUrl: 'https://2gis.ru/samara/firm/70000001027391770',
        yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/'
      }
    ],
    status: 'Лидер 👑',
    index: 98,
    type: 'Независимая сеть'
  }
}

// Состояние модального окна
const showModal = ref(false)
const currentEstablishment = ref(null)

// A/B тестирование - случайный выбор сервиса
const getRandomService = () => {
  return Math.random() < 0.5 ? 'gis' : 'yandex'
}

// Функции управления модальным окном
const openModal = (establishment) => {
  currentEstablishment.value = establishment
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  currentEstablishment.value = null
}

// Функция для открытия popup по URL параметру
const checkUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const openEstablishment = urlParams.get('open')
  
  if (openEstablishment && establishments[openEstablishment]) {
    openModal(establishments[openEstablishment])
    
    // Убираем параметр из URL после открытия
    const url = new URL(window.location)
    url.searchParams.delete('open')
    window.history.replaceState({}, '', url)
  }
}

// Переход к оставлению отзыва с A/B тестированием
const goToReviews = (branch) => {
  const service = getRandomService()
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
  
  // Опционально: отправка события в систему аналитики
  if (window.gtag) {
    window.gtag('event', 'review_redirect', {
      establishment: currentEstablishment.value.name,
      address: branch.address,
      service: service === 'gis' ? '2ГИС' : 'Яндекс.Карты'
    })
  }
  
  window.open(url, '_blank')
  closeModal()
}

// Проверяем URL параметры при загрузке компонента
onMounted(() => {
  checkUrlParams()
})
</script>

<template>
<!-- Заголовок виджета -->
<div class="widget-header">
  <h2>🎯 Сделайте Индекс Роста еще точнее</h2>
  <p class="subtitle">Выберите кофейню и оставьте честный отзыв</p>
</div>

<!-- Сетка с карточками заведений -->
<div class="establishments-grid">
  <div 
    v-for="(establishment, key) in establishments" 
    :key="key"
    class="establishment-card"
  >
    <!-- Заголовок с названием и статусом -->
    <div class="card-header">
      <h3 class="cafe-name">{{ establishment.name }}</h3>
      <div class="status-badge">{{ establishment.status }}</div>
    </div>
    
    <!-- Статистика в виде отдельных карточек -->
    <div class="card-stats">
      <div class="stat-card branches-card">
        <div class="stat-icon">🏢</div>
        <div class="stat-content">
          <div class="stat-value">{{ establishment.branches.length }}</div>
          <div class="stat-label">Точки</div>
        </div>
      </div>
      
      <div class="stat-card index-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-content">
          <div class="stat-value">{{ establishment.index }}</div>
          <div class="stat-label">Индекс роста</div>
        </div>
      </div>
      
      <div class="stat-card reviews-card">
        <div class="stat-icon">⭐</div>
        <div class="stat-content">
          <div class="stat-value">{{ establishment.totalReviews }}</div>
          <div class="stat-label">Отзывы</div>
        </div>
      </div>
    </div>
    
    <!-- Большая кнопка действия -->
    <button 
      @click="openModal(establishment)"
      class="main-action-button"
    >
      <span class="action-text">Оставить отзыв</span>
      <div class="action-icon">→</div>
    </button>
  </div>
</div>

<!-- Модальное окно с филиалами -->
<Teleport to="body">
  <Transition name="modal">
    <div v-if="showModal" class="modal-mask" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <div class="modal-title-block">
            <h2 class="modal-cafe-name">{{ currentEstablishment?.name }}</h2>
            <div class="modal-badges">
              <span class="badge status">{{ currentEstablishment?.status }}</span>
              <span class="badge type">{{ currentEstablishment?.type }}</span>
            </div>
          </div>
          <button @click="closeModal" class="close-button" aria-label="Закрыть окно">×</button>
        </div>
        
        <div class="modal-content">
          <p class="modal-subtitle">Выберите филиал для оставления отзыва:</p>
          
          <div class="branches-list">
            <button
              v-for="(branch, index) in currentEstablishment?.branches"
              :key="index"
              @click="goToReviews(branch)"
              class="branch-item"
            >
              <div class="branch-info">
                <div class="branch-number">{{ index + 1 }}</div>
                <div class="branch-address">
                  <span class="address-text">{{ branch.address }}</span>
                </div>
              </div>
              <div class="branch-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </button>
          </div>
          
          <div class="modal-footer">
            <p class="ab-info">
              <small>💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</Teleport>
</template>

<style scoped>
.widget-header {
  text-align: center;
  margin-bottom: 32px;
}

.widget-header h2 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand-1);
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
}

.establishments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
  margin: 0 0 40px 0;
}

.establishment-card {
  background: linear-gradient(145deg, var(--vp-c-bg-soft), var(--vp-c-bg));
  border: 2px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 28px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.establishment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-2), var(--vp-c-brand-1));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.establishment-card:hover::before {
  transform: scaleX(1);
}

.establishment-card:hover {
  border-color: var(--vp-c-brand-1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.cafe-name {
  margin: 0;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 22px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
  border: none;
  display: inline-block;
}

.modal-cafe-name {
  margin: 0 40px 16px 0;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
  display: inline-block;
}

.status-badge {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Статистические карточки в стиле F1 Clash - объемные как игровые предметы */
.card-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  background: var(--vp-c-bg-mute);
  border: 3px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 24px 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-card:hover {
  transform: translateY(-8px) rotateX(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: transform 0.3s ease;
}

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

.branches-card::before {
  background: linear-gradient(90deg, #f97316, #ea580c);
}

.index-card::before {
  background: linear-gradient(90deg, #eab308, #ca8a04);
}

.reviews-card::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-icon {
  font-size: 36px;
  margin-bottom: 12px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.stat-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-value {
  transform: scale(1.05);
}

.branches-card .stat-value {
  color: #ea580c;
}

.index-card .stat-value {
  color: #ca8a04;
}

.reviews-card .stat-value {
  color: #059669;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
}

/* Большая кнопка действия */
.main-action-button {
  width: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border: none;
  border-radius: 16px;
  padding: 20px 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(var(--vp-c-brand-1), 0.3);
}

.main-action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.main-action-button:hover::before {
  left: 100%;
}

.main-action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(var(--vp-c-brand-1), 0.4);
}

.main-action-button:active {
  transform: translateY(0);
}

.action-text {
  color: white;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.action-icon {
  color: white;
  font-size: 24px;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.main-action-button:hover .action-icon {
  transform: translateX(4px);
}

/* Модальное окно */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
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
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  border: 2px solid var(--vp-c-border);
}

.modal-header {
  position: relative;
  padding: 32px 32px 24px;
  border-bottom: 2px solid var(--vp-c-border);
  flex-shrink: 0;
  background: linear-gradient(145deg, var(--vp-c-bg-soft), var(--vp-c-bg));
}

.modal-badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.status {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.badge.type {
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
}

.close-button {
  position: absolute;
  top: 28px;
  right: 28px;
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-border);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.close-button:hover {
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
  padding: 24px 32px 16px;
  color: var(--vp-c-text-2);
  font-size: 16px;
  font-weight: 600;
}

.branches-list {
  padding: 0 20px;
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
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft));
  border-color: var(--vp-c-brand-1);
  transform: translateX(8px);
  box-shadow: 0 8px 20px rgba(var(--vp-c-brand-1), 0.2);
}

.branch-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.branch-number {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1), 0.3);
}

.address-text {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.branch-action {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand-1);
  transition: transform 0.3s ease;
}

.branch-item:hover .branch-action {
  transform: translateX(4px);
}

.modal-footer {
  padding: 20px 32px;
  border-top: 2px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
  text-align: center;
}

.ab-info {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
  font-weight: 500;
}

/* Анимации */
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

/* Адаптивность */
@media (max-width: 768px) {
  .establishments-grid {
    grid-template-columns: 1fr;
  }
  
  .establishment-card {
    padding: 24px;
  }
  
  .card-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .stat-card {
    padding: 20px 16px 16px;
  }
  
  .main-action-button {
    padding: 18px 24px;
  }
  
  .action-text {
    font-size: 16px;
  }
  
  .stat-icon {
    font-size: 32px;
  }
  
  .stat-value {
    font-size: 20px;
  }
}

@media (max-width: 640px) {
  .modal-mask { 
    padding: 0; 
  }
  
  .modal-container {
    border-radius: 0;
    max-height: 100vh;
    height: 100vh;
  }
  
  .modal-header {
    padding: 24px;
  }
  
  .modal-cafe-name {
    font-size: 20px;
    margin: 0 40px 12px 0;
  }
  
  .branch-item {
    padding: 16px;
  }
}
</style>
