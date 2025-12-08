<script setup>
import { ref, onMounted, computed } from 'vue'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEHAgAcoRx2pDzdIgRZ1RpzHYY4NZGbmb5XyuSImv0JMphoXSrFmwdVLyDe2xjjgOp1g/exec'

const INITIAL_BASE = {
  pageViews: 553,
  korzhLikes: 12,
  korzhSignals: 4
}

const isKorzhLiked = ref(false)
const stats = ref({ ...INITIAL_BASE })

const formatNumber = (num) => {
  const safeNum = Math.max(0, num || 0)
  if (safeNum >= 1000) {
    return (safeNum / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return safeNum.toString()
}

const loadFromCache = () => {
  try {
    const cached = localStorage.getItem('signal_stats_cache_v3')
    if (cached) {
      const parsed = JSON.parse(cached)
      stats.value = { ...stats.value, ...parsed }
    }
  } catch (e) { console.error(e) }
}

const saveToCache = () => {
  localStorage.setItem('signal_stats_cache_v3', JSON.stringify(stats.value))
}

const fetchStats = async () => {
  try {
    const response = await fetch(`${SCRIPT_URL}?action=get`)
    const data = await response.json()
    
    if (data.pageViews !== undefined) stats.value.pageViews = data.pageViews
    if (data.korzhLikes !== undefined) stats.value.korzhLikes = data.korzhLikes
    if (data.korzhSignals !== undefined) stats.value.korzhSignals = data.korzhSignals
    
    saveToCache()
  } catch (error) {
    console.error('Ошибка сервера')
  }
}

const incrementViews = async () => {
  stats.value.pageViews++
  saveToCache()
  try { await fetch(`${SCRIPT_URL}?action=incrementViews`) } catch (e) {}
}

const toggleKorzhLike = async () => {
  const wasLiked = isKorzhLiked.value
  isKorzhLiked.value = !wasLiked
  
  if (!wasLiked) {
    stats.value.korzhLikes++
    localStorage.setItem('korzh_liked_status', 'true')
    saveToCache()
    
    fetch(`${SCRIPT_URL}?action=addLike`).catch(() => {
      stats.value.korzhLikes-- 
      isKorzhLiked.value = false
    })
  } else {
    if (stats.value.korzhLikes > 0) stats.value.korzhLikes--
    localStorage.removeItem('korzh_liked_status')
    saveToCache()
    
    fetch(`${SCRIPT_URL}?action=removeLike`).catch(() => {
      stats.value.korzhLikes++
      isKorzhLiked.value = true
    })
  }

  // --- МАГИЯ СИНХРОНИЗАЦИИ (ОТПРАВКА) ---
  window.dispatchEvent(new CustomEvent('korzh-like-changed', {
    detail: { 
      liked: isKorzhLiked.value,
      newCount: stats.value.korzhLikes
    }
  }))
}

onMounted(async () => {
  loadFromCache()
  
  const hasLikedKorzh = localStorage.getItem('korzh_liked_status')
  if (hasLikedKorzh) isKorzhLiked.value = true

  // --- СЛУШАЕМ СОСЕДЕЙ (ПРИЕМ) ---
  window.addEventListener('korzh-like-changed', (e) => {
    // Обновляем статус лайка
    isKorzhLiked.value = e.detail.liked
    // Обновляем счетчик (чтобы цифры совпадали)
    stats.value.korzhLikes = e.detail.newCount
  })

  await fetchStats()

  const sessionViewed = sessionStorage.getItem('signal_session_viewed')
  if (!sessionViewed) {
    incrementViews()
    sessionStorage.setItem('signal_session_viewed', 'true')
  }
})

const formattedPageViews = computed(() => formatNumber(stats.value.pageViews))
</script>


<template>
  <div class="essential-apps">
    <div class="stats-header-block">
      <div class="global-stat-item">
        <img src="/eye-icon.svg" alt="Просмотры" class="eye-icon" />
        <span>{{ formattedPageViews }}</span>
      </div>
      <div class="global-stat-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart">
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
        </svg>
        <span>{{ stats.korzhLikes }}</span>
      </div>
      <div class="global-stat-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
        <span>{{ stats.korzhSignals }}</span>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" :fill="isKorzhLiked ? 'white' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
            </svg>
          </div>
        </div>

        <div class="app-icon">
          <div class="badge-wrapper">
            <img src="/korzh_badge.svg" alt="Корж" class="badge-image" />
          </div>
        </div>

        <p class="card-description bold-desc">Жить любить кофе пить</p>
        <p class="card-subtitle">Следите за тем, как Корж превращает локальную историю в успешную сеть эко-кофеен.</p>

        <div class="stats-row">
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
            </svg>
            <span>{{ stats.korzhLikes }}</span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            <span>{{ stats.korzhSignals }}</span>
          </div>
        </div>

        <div class="card-footer">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="play-btn">Поддержать Корж</a>
        </div>

        <div class="bubbles-container">
          <div class="bubble">
            <img src="/piggy-bank-icon.svg" alt="" class="bubble-icon" />
            Инвестиции в кофейни
          </div>
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag-icon lucide-flag"><path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/></svg>
            Самара
          </div>
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
            Вознаграждения
          </div>
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="bubble bubble-signal">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            Сигналы работают
          </a>
        </div>
      </div>

      <div class="app-card promo-card">
        <div class="promo-bg-icon"></div>
        <p class="promo-text">С поддержкой клиентов расти быстрее и увереннее.</p>
        <a href="/pro/index" class="promo-link">
          <img src="/favicon.svg" alt="" class="promo-link-icon" />
          Запустить Сигнал
        </a>
      </div>
    </div>

    <div class="actions-wrapper">
      <div class="actions">
        <a href="/invest/pulse" class="btn-create">
          Инвестировать Сигналы
          <span class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </span>
        </a>
        <a href="/pro/ltvcalc" class="btn-see-all">
          Все возможности
          <span class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </a>
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

.stats-header-block {
  background: #000000;
  border-radius: 50px;
  padding: 16px 32px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  min-height: 56px;
}

.global-stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
}

.eye-icon {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(0.85);
}

.actions-wrapper {
  background: #2a2a2a;
  border-radius: 50px;
  padding: 5px;
  margin-top: 40px;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.btn-create,
.btn-see-all {
  padding: 16px 32px;
  border-radius: 46px;
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
  background: #e0e0e0;
  color: #1a1a1a;
  border: none;
}

.btn-create:hover {
  background: #ffffff;
  transform: translateY(-2px);
  color: #000000;
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
  opacity: 0.1;
}

.btn-see-all:hover .icon-circle::before {
  opacity: 1;
}

.icon-circle svg {
  position: relative;
  z-index: 1;
  transition: stroke 0.3s ease;
}

.btn-create .icon-circle svg {
  stroke: #1a1a1a;
}

.btn-create:hover .icon-circle svg {
  stroke: #000000;
}

.btn-see-all:hover .icon-circle svg {
  stroke: #1a1a1a;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  align-items: stretch;
}

/* === НОВЫЙ СТИЛЬ ДЛЯ КАРТОЧЕК С ГЛАСС-БОРДЕРОМ === */
.app-card {
  position: relative;
  background: #2a2a2a; /* Основной фон */
  border-radius: 24px;
  padding: 24px; /* Обычный отступ */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  
  /* Важно: убираем дефолтный бордер */
  border: none; 
  /* Создаем отступ для рамки (1px), чтобы контент не прилипал */
  box-shadow: inset 0 0 0 1px transparent; 
  z-index: 1;
}

/* Псевдо-элемент для градиентной рамки */
.app-card::before {
  content: "";
  position: absolute;
  inset: 0; /* Растягиваем на всю карточку */
  border-radius: 24px; /* Такой же радиус */
  padding: 1px; /* Толщина рамки! */
  
  /* Градиент рамки: Слева-Сверху (Белый) -> Вправо-Вниз (Прозрачный) */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0) 100%);
  
  /* Маска чтобы вырезать центр и оставить только рамку */
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  
  pointer-events: none; /* Чтобы клики проходили сквозь */
  z-index: -1; /* Кладем ПОД контент, но НАД фоном (фоном управляет родитель) */
}

/* Чтобы фон родителя не перекрывал рамку, используем отдельный фон для контента, если нужно,
   но в данном случае проще сделать background на родителе и ::before поверх него */
   
.app-card {
  /* Обновленный фон: чтобы рамка была видна, фон должен быть внутри border-radius.
     Но из-за ::before с padding:1px, лучше сделать так: */
  background-clip: padding-box; 
}

.app-card.korzh-card {
  padding-bottom: 24px;
}

.app-card.promo-card {
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 24px;
  position: relative;
  overflow: hidden;
}

.promo-bg-icon {
  position: absolute;
  width: 560px;
  height: 560px;
  top: -100px;
  right: -140px;
  background-image: url('/favicon.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.04;
  pointer-events: none;
  filter: drop-shadow(0 0 30px rgba(255,255,255,0.05));
  mask-image: radial-gradient(ellipse 70% 70% at 60% 40%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 80%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 60% 40%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 80%, transparent 100%);
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
  color: #9e9e9e;
  text-decoration: none !important;
  border-bottom: none !important;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.promo-link-icon {
  width: 18px;
  height: 18px;
  filter: brightness(0) invert(0.65);
  transition: filter 0.3s ease;
}

.promo-link:hover .promo-link-icon {
  filter: brightness(0) invert(1);
}

.promo-link:hover {
  color: #ffffff !important;
  text-decoration: none !important;
  border-bottom: none !important;
}

.app-card:hover {
  transform: translateY(-4px);
  /* Легкое белое свечение при наведении */
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.03); 
}

/* При ховере делаем рамку чуть ярче */
.app-card:hover::before {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
}

.app-card.korzh-card:hover .badge-image {
  filter: none;
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

.badge-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  overflow: hidden;
}

.badge-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 24px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
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
  font-weight: 500;
  color: #b0b0b0;
  margin: 8px 0 0 0;
  text-align: center;
  line-height: 1.5;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 12px 0;
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 500;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-footer {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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
  border-color: #ffffff;
  background: #ffffff;
  color: #1a1a1a;
  transform: translateY(-2px);
}

.bubbles-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
}

.bubble {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: #424242; 
  color: #adadad; 
  padding: 6px 10px;
  border-radius: 14px;
  font-size: 12px; 
  font-weight: 500;
  line-height: 1;
  cursor: default;
  text-decoration: none !important;
  transition: all 0.2s ease;
  min-height: 28px;
}

.bubble-icon {
  width: 14px;
  height: 14px;
  filter: brightness(0) invert(0.7);
}

.bubble.bubble-signal {
  background-color: #7a7a7a;
  color: #e0e0e0;
  cursor: pointer;
  text-decoration: none !important;
  box-sizing: border-box;
  border: 2px solid transparent;
}

.bubble.bubble-signal:hover {
  background-color: #ffffff;
  color: #1a1a1a;
  text-decoration: none !important;
  border: 2px solid transparent;
}

.bubble.bubble-signal:hover,
.bubble.bubble-signal:active,
.bubble.bubble-signal:visited,
.bubble.bubble-signal:focus {
  text-decoration: none !important;
  outline: none !important;
  box-shadow: none !important;
}

@media (max-width: 768px) {
  .essential-apps {
    margin: 32px 0;
  }

  .stats-header-block {
    flex-direction: row;
    gap: 24px;
    padding: 16px;
    border-radius: 50px;
  }

  .actions-wrapper {
    padding: 5px;
    border-radius: 35px !important; 
  }

  .actions {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .btn-create,
  .btn-see-all {
    border-radius: 30px !important;
  }

  .apps-grid {
    grid-template-columns: 1fr;
  }

  .app-icon {
    height: 140px;
  }

  .app-card.promo-card {
    gap: 12px;
    padding: 20px;
  }

  .promo-bg-icon {
    width: 250px;
    height: 250px;
    top: -20px;
    right: -30px;
    opacity: 0.06;
  }

  .promo-text {
    max-width: 90%;
  }
}
</style>
