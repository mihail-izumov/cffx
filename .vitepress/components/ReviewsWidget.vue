<script setup>
import { ref } from 'vue'

// Данные для сетей кофеен. Сейчас здесь только "Корж", но можно легко добавить другие.
const establishments = {
  korzh: {
    name: 'Корж',
    totalReviews: '4,520', // из Индекса Роста
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
        yandexUrl: 'https://yandex.ru/maps/51/samara/chain/korz/23062014558/' // Общая ссылка на сеть
      },
      { 
        address: 'Ново-Садовая, 106б',
        gisUrl: 'https://2gis.ru/samara/firm/70000001027391770',
        yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/'
      }
    ],
    status: 'Лидер 👑', // из Индекса Роста
    index: 98,         // из Индекса Роста
    type: 'Независимая сеть' // из Индекса Роста
  }
  // Здесь можно будет добавить другие кофейни, например, mosaic: { ... }
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
</script>

<template>
<!-- Заголовок виджета -->
<div class="widget-header">
  <h2>Помогите нам составить честный рейтинг</h2>
  <p class="subtitle">Выберите кофейню и оставьте свой отзыв</p>
</div>

<!-- Сетка с карточками заведений -->
<div class="establishments-grid">
  <div 
    v-for="(establishment, key) in establishments" 
    :key="key"
    class="establishment-card"
    @click="openModal(establishment)"
  >
    <div class="card-header">
      <h3>{{ establishment.name }}</h3>
      <div class="status-badge">{{ establishment.status }}</div>
    </div>
    
    <div class="card-stats">
      <div class="stat">
        <span class="stat-label">Индекс роста:</span>
        <span class="stat-value index">{{ establishment.index }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Отзывов:</span>
        <span class="stat-value reviews">{{ establishment.totalReviews }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Филиалов:</span>
        <span class="stat-value branches">{{ establishment.branches.length }}</span>
      </div>
    </div>
    
    <div class="card-action">
      <span>Оставить отзыв →</span>
    </div>
  </div>
</div>

<!-- Модальное окно с филиалами -->
<Teleport to="body">
  <Transition name="modal">
    <div v-if="showModal" class="modal-mask" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <div class="modal-title-block">
            <h2>{{ currentEstablishment?.name }}</h2>
            <div class="modal-badges">
              <span class="badge status">{{ currentEstablishment?.status }}</span>
              <span class="badge type">{{ currentEstablishment?.type }}</span>
            </div>
          </div>
          <button @click="closeModal" class="close-button" aria-label="Закрыть окно">×</button>
        </div>
        
        <div class="modal-content">
          <p class="modal-subtitle">Выберите филиал, чтобы оставить отзыв:</p>
          
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
                <span class="action-text">Оставить отзыв</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin: 0 0 40px 0;
}

.establishment-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
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
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.card-header h3 {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 22px;
  font-weight: 600;
}

.status-badge {
  background: linear-gradient(135deg, var(--vp-c-brand-2), var(--vp-c-brand-1));
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
}

.stat-value.index {
  color: var(--vp-c-brand-1);
}

.stat-value.reviews {
  color: var(--vp-c-green-1);
}

.stat-value.branches {
  color: var(--vp-c-blue-1);
}

.card-action {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 14px;
  border-top: 1px solid var(--vp-c-border);
  padding-top: 16px;
}

/* Модальное окно */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-container {
  background: var(--vp-c-bg);
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: relative;
  padding: 28px 28px 20px;
  border-bottom: 1px solid var(--vp-c-border);
  flex-shrink: 0;
}

.modal-title-block h2 {
  margin: 0 40px 12px 0;
  color: var(--vp-c-brand-1);
  font-size: 26px;
  font-weight: 700;
}

.modal-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.badge.status {
  background: linear-gradient(135deg, var(--vp-c-brand-2), var(--vp-c-brand-1));
  color: white;
}

.badge.type {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
}

.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
  background: var(--vp-c-bg-mute);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.close-button:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: rotate(90deg);
}

.modal-content {
  overflow-y: auto;
  flex-grow: 1;
}

.modal-subtitle {
  margin: 0;
  padding: 20px 28px 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.branches-list {
  padding: 0 16px;
}

.branch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  margin: 8px 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.branch-item:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateX(8px);
}

.branch-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.branch-number {
  background: var(--vp-c-brand-1);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.address-text {
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 15px;
}

.branch-action {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
}

.modal-footer {
  padding: 16px 28px;
  border-top: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
  text-align: center;
}

.ab-info {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
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
  transform: scale(0.95);
  opacity: 0;
}

/* Адаптивность */
@media (max-width: 640px) {
  .modal-mask { padding: 0; }
  .modal-container {
    border-radius: 0;
    max-height: 100vh;
    height: 100vh;
  }
}
</style>
