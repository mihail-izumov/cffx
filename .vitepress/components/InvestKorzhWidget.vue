<script setup>
import { ref, onMounted, computed } from 'vue'

const _GRID_COLS = 4
const _GRID_ROWS = 3
const _GRID_GAP = 2
const _GRID_PADDING = 2

const _baseLikes = _GRID_COLS * _GRID_ROWS
const _baseLightning = _GRID_GAP * _GRID_PADDING

const isKorzhLiked = ref(false)
const korzhLikes = ref(_baseLikes)

const pageViews = ref(0)

onMounted(() => {
  const hasLikedKorzh = localStorage.getItem('korzh_liked_status')
  if (hasLikedKorzh) {
    isKorzhLiked.value = true
    korzhLikes.value = _baseLikes + 1
  } else {
    korzhLikes.value = _baseLikes
  }

  const storedViews = localStorage.getItem('signal_page_views')
  let currentViews = storedViews ? parseInt(storedViews, 10) : 0
  currentViews++
  pageViews.value = currentViews
  localStorage.setItem('signal_page_views', currentViews.toString())
})

const toggleKorzhLike = () => {
  isKorzhLiked.value = !isKorzhLiked.value
  if (isKorzhLiked.value) {
    korzhLikes.value = _baseLikes + 1
    localStorage.setItem('korzh_liked_status', 'true')
  } else {
    korzhLikes.value = _baseLikes
    localStorage.removeItem('korzh_liked_status')
  }
}

const totalLikes = computed(() => korzhLikes.value) 
const totalLightning = computed(() => _baseLightning) 
</script>

<template>
  <div class="essential-apps">

    <div class="header">
      <div class="actions">
        <a href="/invest/pulse" class="btn-create">
          Инвестировать Сигналы
          <span class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 7h10v10"/>
              <path d="M7 17 17 7"/>
            </svg>
          </span>
        </a>
        <a href="/pro/ltvcalc" class="btn-see-all">
          Все возможности
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
          <span class="app-name">КОРЖ</span>
          
          <div 
            class="like-btn" 
            :class="{ 'is-liked': isKorzhLiked }"
            @click="toggleKorzhLike"
            title="Нравится"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" 
              viewBox="0 0 24 24" 
              :fill="isKorzhLiked ? 'white' : 'none'" 
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
          <img src="/korzh_badge.svg" alt="Корж" />
        </div>

        <p class="card-description bold-desc">
          Жить любить кофе пить
        </p>
        
        <p class="card-subtitle">
          Сеть кофеен №1 в Самаре. Лидер Индекса роста Сигнала.
        </p>

        <div class="stats-row">
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
            </svg>
            <span>{{ korzhLikes }}</span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            <span>{{ _baseLightning }}</span>
          </div>
        </div>

        <div class="card-footer">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="play-btn">Поддержать Корж</a>
        </div>

        <div class="bubbles-container">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="bubble bubble-inverted">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            Сигналы работают
          </a>
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
            Вознаграждения
          </div>
          <div class="bubble">
            Инвестиции в кофейни
          </div>
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag-icon lucide-flag"><path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/></svg>
            Самара
          </div>
        </div>
      </div>

      <div class="app-card promo-card">
        <div class="promo-bg-icon"></div>
        <p class="promo-text">
          Получите поддержку клиентов, чтобы расти быстрее конкурентов.
        </p>
        <a href="/pro/index" class="promo-link">
          Запустить Сигнал
        </a>
      </div>
    </div>

    <div class="stats-footer-block">
      <div class="global-stat-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>ircle cx="12" cy="12" r="3"/></svg>
        <span>{{ pageViews }}</span>
      </div>
      <div class="global-stat-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart">
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
        </svg>
        <span>{{ totalLikes }}</span>
      </div>
      <div class="global-stat-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
        <span>{{ totalLightning }}</span>
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
  color: #1a1a1a;
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
  grid-template-rows: auto auto auto auto auto auto 1fr;
}

.app-card.promo-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 24px;
  position: relative;
  overflow: hidden;
}

.promo-bg-icon {
  position: absolute;
  width: 200px;
  height: 200px;
  bottom: -50px;
  right: -50px;
  background-image: url('/favicon.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.08;
  pointer-events: none;
  mask-image: linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,1) 100%);
  -webkit-mask-image: linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,1) 100%);
}

.promo-text {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.6;
  max-width: 80%;
  position: relative;
  z-index: 1;
}

.promo-link {
  color: #C5F946;
  opacity: 0.7;
  text-decoration: none !important;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #C5F946;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.promo-link:hover {
  color: #C5F946 !important;
  opacity: 1;
  border-bottom-color: #C5F946 !important;
  text-decoration: none !important;
}

.promo-link:hover,
.promo-link:active,
.promo-link:visited,
.promo-link:focus {
  text-decoration: none !important;
  border-bottom: 1px solid #C5F946 !important;
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

.app-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 24px;
}

.card-description.bold-desc {
  font-size: 16px; 
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  text-align: center;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-subtitle {
  font-size: 13px;
  font-weight: 300;
  color: #b0b0b0;
  margin: 8px 0 0 0;
  text-align: center;
  line-height: 1.5;
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
  background-color: #424242; 
  color: #adadad; 
  padding: 6px 12px; 
  border-radius: 14px;
  font-size: 12px; 
  font-weight: 500;
  line-height: 1;
  cursor: default;
  text-decoration: none !important;
  transition: background-color 0.2s ease;
}

.bubble.bubble-inverted {
  background-color: #C5F946;
  color: #1a1a1a;
  cursor: pointer;
  text-decoration: none !important;
}

.bubble.bubble-inverted:hover {
  background-color: #d4ff6b;
  text-decoration: none !important;
}

.bubble.bubble-inverted:hover,
.bubble.bubble-inverted:active,
.bubble.bubble-inverted:visited,
.bubble.bubble-inverted:focus {
  text-decoration: none !important;
}

.stats-footer-block {
  background: #000000;
  border-radius: 50px;
  padding: 16px 32px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  min-height: 56px;
}

.global-stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
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

  .stats-footer-block {
    flex-direction: row;
    gap: 24px;
    padding: 16px;
    border-radius: 50px;
  }
}
</style>
