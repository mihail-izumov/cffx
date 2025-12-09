<script setup>
import { ref, onMounted, onUnmounted, computed, defineAsyncComponent } from 'vue'

const InvestKorzhConfigurator2 = defineAsyncComponent(() =>
  import('./InvestKorzhConfigurator2.vue')
)

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEHAgAcoRx2pDzdIgRZ1RpzHYY4NZGbmb5XyuSImv0JMphoXSrFmwdVLyDe2xjjgOp1g/exec'

const INITIAL_BASE = {
  pageViewsKorzh: 123,
  korzhLikes: 17,
  korzhSignals: 4
}

const stats = ref({ ...INITIAL_BASE })
const isLiked = ref(false)

const showEarlyAccessModal = ref(false)
const showShareModal = ref(false)
const showCopyToast = ref(false)
const showCopyTooltip = ref(false)
const showTelegramTooltip = ref(false)

const props = defineProps({
  id: {
    type: String,
    default: 'early-access'
  }
})

const formatNumber = (num) => {
  const safeNum = Math.max(0, num || 0)
  return safeNum >= 1000 
    ? (safeNum / 1000).toFixed(1).replace(/\.0$/, '') + 'K' 
    : safeNum.toString()
}

const loadFromCache = () => {
  try {
    const cached = localStorage.getItem('korzh_wide_stats_v1')
    if (cached) stats.value = { ...stats.value, ...JSON.parse(cached) }
  } catch (e) {}
}

const saveToCache = () => {
  localStorage.setItem('korzh_wide_stats_v1', JSON.stringify(stats.value))
}

const fetchStats = async () => {
  try {
    const res = await fetch(`${SCRIPT_URL}?action=get`)
    const data = await res.json()
    if (data.pageViewsKorzh !== undefined) stats.value.pageViewsKorzh = data.pageViewsKorzh
    if (data.korzhLikes !== undefined) stats.value.korzhLikes = data.korzhLikes
    if (data.korzhSignals !== undefined) stats.value.korzhSignals = data.korzhSignals
    saveToCache()
  } catch (e) {}
}

const incrementViews = async () => {
  stats.value.pageViewsKorzh++
  saveToCache()
  try { await fetch(`${SCRIPT_URL}?action=incrementViewsKorzh`) } catch (e) {}
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  const STORAGE_KEY = 'korzh_liked_status'
  
  if (isLiked.value) {
    stats.value.korzhLikes++
    localStorage.setItem(STORAGE_KEY, 'true')
    fetch(`${SCRIPT_URL}?action=addLike`).catch(() => { stats.value.korzhLikes--; isLiked.value = false })
  } else {
    if (stats.value.korzhLikes > 0) stats.value.korzhLikes--
    localStorage.removeItem(STORAGE_KEY)
    fetch(`${SCRIPT_URL}?action=removeLike`).catch(() => { stats.value.korzhLikes++; isLiked.value = true })
  }
  
  saveToCache()

  window.dispatchEvent(new CustomEvent('korzh-like-changed', {
    detail: { liked: isLiked.value, newCount: stats.value.korzhLikes }
  }))
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showShareModal.value = false
    showCopyToast.value = true
    setTimeout(() => showCopyToast.value = false, 3000)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

const shareTelegram = () => {
  const text = "Проверьте новую возможность поддержать Корж"
  const url = window.location.href
  window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

// Функции управления модалкой
const openEarlyAccessModal = () => {
  showEarlyAccessModal.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeEarlyAccessModal = () => {
  showEarlyAccessModal.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'auto'
  }
}

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    if (showEarlyAccessModal.value) closeEarlyAccessModal()
    if (showShareModal.value) showShareModal.value = false
  }
}

// Проверка хэша
const checkHashForModal = () => {
  if (typeof window !== 'undefined' && window.location.hash === `#${props.id}`) {
    openEarlyAccessModal()
  }
}

onMounted(async () => {
  loadFromCache()
  
  if (localStorage.getItem('korzh_liked_status')) {
    isLiked.value = true
  }

  window.addEventListener('korzh-like-changed', (e) => {
    isLiked.value = e.detail.liked
    stats.value.korzhLikes = e.detail.newCount
  })
  
  fetchStats()
  
  if (!sessionStorage.getItem('korzh_wide_session')) {
    incrementViews()
    sessionStorage.setItem('korzh_wide_session', 'true')
  }

  window.addEventListener('keydown', onKeydown)
  
  // ЛОГИКА ОТКРЫТИЯ ПО ССЫЛКЕ
  checkHashForModal()
  window.addEventListener('hashchange', checkHashForModal)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('hashchange', checkHashForModal)
  }
})

const formattedViews = computed(() => formatNumber(stats.value.pageViewsKorzh))
</script>

<template>
  <div class="wide-widget-container">
    
    <div class="wide-card">
      <div class="card-top">
        <img src="/korzh_badge.svg" alt="Корж" class="logo-img" />
        <h1 
          class="card-title" 
          :id="id" 
          style="scroll-margin-top: 80px; position: relative;"
        >
          Корж побеждает в сердцах
          <a class="header-anchor" :href="`#${id}`" @click="openEarlyAccessModal"></a>
        </h1>
      </div>

      <div class="bubbles-row">
        <div class="bubble">
          <img src="/piggy-bank-icon.svg" alt="" class="bubble-icon" />
          Инвестиции в кофейни
        </div>
        <div class="bubble">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/></svg>
          Самара
        </div>
        <div class="bubble">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
          Вознаграждения
        </div>
        <a href="/korzh" target="_blank" rel="noopener noreferrer" class="bubble bubble-signal">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
          Сигналы работают
        </a>
      </div>

      <p class="card-text">
        Корж — это душа кофейной Самары. Благодаря легендарным круассанам и искренней заботе о гостях, они выросли в семью из 8 уютных локаций с особым характером. Скоро команда планирует привлечь инвестиции для открытия новых кофеен, чтобы делиться своей атмосферой и любовью к качеству с еще большим количеством гостей.
      </p>

      <a href="https://korzhcoffee.ru" target="_blank" class="website-link">korzhcoffee.ru</a>

      <div class="stats-block">
        <div class="stat-item">
          <img src="/eye-icon.svg" alt="Просмотры" class="stat-icon" />
          <span>{{ formattedViews }}</span>
        </div>
       <div class="stat-item like-trigger" @click="toggleLike">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            :fill="isLiked ? 'white' : 'none'" 
            :stroke="isLiked ? 'none' : 'currentColor'" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{{ stats.korzhLikes }}</span>
        </div>
        <div class="stat-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
          <span>{{ stats.korzhSignals }}</span>
        </div>
      </div>

      <div class="actions-wrapper">
        <div class="actions">
          <button class="btn-create" @click="openEarlyAccessModal">
            Ранний доступ
            <span class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
            </span>
          </button>
          <button class="btn-see-all" @click="showShareModal = true">
            Поделиться
            <span class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
            </span>
          </button>
        </div>
      </div>

    </div>

    <!-- МОДАЛКА РАННИЙ ДОСТУП -->
    <div 
      v-if="showEarlyAccessModal" 
      class="signal2-review-modal-overlay"
      @click="closeEarlyAccessModal"
    >
      <div 
        class="signal2-review-modal-content"
        @click.stop
      >
        <button
          @click="closeEarlyAccessModal"
          class="signal2-modal-close-icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <div class="signal2-modal-scrollable-content">
          <InvestKorzhConfigurator2 />
        </div>
      </div>
    </div>

    <!-- МОДАЛКА SHARE -->
    <div v-if="showShareModal" class="modal-overlay blur-bg" @click.self="showShareModal = false">
      <div class="modal-card white-theme relative">
        <button class="modal-close-icon dark" @click="showShareModal = false">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <h3>Поделитесь</h3>
        <p>Пригласите друзей следить за инвестициями в Корж</p>
        
        <div class="share-buttons">
          <div 
            class="share-btn-circle" 
            @click="copyLink"
            @mouseenter="showCopyTooltip = true"
            @mouseleave="showCopyTooltip = false"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <div v-if="showCopyTooltip" class="tooltip">Скопировать ссылку</div>
          </div>

          <div 
            class="share-btn-circle telegram" 
            @click="shareTelegram"
            @mouseenter="showTelegramTooltip = true" 
            @mouseleave="showTelegramTooltip = false"
            style="background: #f0f0f0;" 
          >
            <div 
              class="niftybutton-telegram-black-white" 
              style="display: inline-flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 50%; color: rgb(0, 0, 0); transition: 0.3s; opacity: 1; padding: 18px; pointer-events: none;"
            >
              <svg class="niftybutton-telegram" data-donate="true" data-tag="tel" data-name="Telegram" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet" style="display: block; fill: rgb(0, 0, 0); width: 100%; height: 100%; color: rgb(0, 0, 0);" role="img" aria-label="telegram-black-white"><title>Telegram social icon</title>
                <path d="M 200.894531 323.863281 L 192.425781 442.988281 C 204.542969 442.988281 209.792969 437.78125 216.085938 431.53125 L 272.894531 377.238281 L 390.613281 463.445312 C 412.203125 475.476562 427.414062 469.140625 433.238281 443.585938 L 510.507812 81.515625 L 510.527344 81.492188 C 517.375 49.578125 498.988281 37.097656 477.953125 44.929688 L 23.765625 218.816406 C -7.230469 230.847656 -6.761719 248.128906 18.496094 255.957031 L 134.613281 292.074219 L 404.332031 123.308594 C 417.023438 114.902344 428.566406 119.550781 419.070312 127.957031 Z M 200.894531 323.863281 " fill="#000000" style="fill: rgb(0, 0, 0);"></path>
              </svg>
            </div>
            <div v-if="showTelegramTooltip" class="tooltip">Отправить в Telegram</div>
          </div>

        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showCopyToast" class="toast-notification">
        <div class="check-circle">✓</div>
        <div>
          <strong>Ссылка скопирована в буфер.</strong><br>
          Ею может воспользоваться любой, у кого она есть.
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* СТИЛИ */
.wide-widget-container {
  width: 100%;
  max-width: 100%;
  margin: 48px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.wide-card {
  position: relative;
  background: #2a2a2a;
  border-radius: 24px;
  padding: 40px;
  border: none;
  box-shadow: inset 0 0 0 1px transparent;
  z-index: 1;
  background-clip: padding-box;
}

.wide-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0) 100%);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: -1;
}

.wide-card:hover::before {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.logo-img {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  object-fit: cover;
  flex-shrink: 0;
}

.card-title {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  text-align: left;
}

.card-text {
  font-size: 22px;
  font-weight: 400;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 16px;
}

.website-link {
  display: inline-block;
  font-size: 22px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.website-link:hover {
  color: #fff;
  border-color: #fff;
}

.bubbles-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.bubble {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: #424242;
  color: #adadad;
  padding: 6px 10px;
  border-radius: 9999px;
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

.stats-block {
  background: #000000;
  border-radius: 50px;
  padding: 10px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-bottom: 24px;
  min-height: 48px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
}

.like-trigger {
  cursor: pointer;
}

.stat-icon {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(0.85);
}

.actions-wrapper {
  background: #2a2a2a;
  border-radius: 50px;
  padding: 5px;
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
  border: none;
}

.btn-create {
  background: #e0e0e0;
  color: #1a1a1a;
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
  background: #3a3a3a; 
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

/* МОДАЛКА */
.signal2-review-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.signal2-review-modal-content {
  background: #1e1e20;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
}

.signal2-modal-close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.2s;
  opacity: 0.6;
  z-index: 10;
}

.signal2-modal-close-icon:hover {
  opacity: 1;
}

.signal2-modal-scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 40px; 
}

/* Modal Overlay общие стили */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay.blur-bg {
  backdrop-filter: blur(10px);
  background: rgba(0,0,0,0.6);
}

.modal-card {
  background: #1a1a1a;
  padding: 40px;
  border-radius: 24px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  color: #fff;
  position: relative;
}

.modal-card.white-theme {
  background: #fff;
  color: #000;
}

.relative {
  position: relative;
}

.modal-close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.2s;
  opacity: 0.6;
}

.modal-close-icon:hover {
  opacity: 1;
}

.modal-close-icon.dark {
  color: #000;
}

.modal-card h3 {
  margin-top: 12px;
  font-size: 24px;
  margin-bottom: 16px;
}

.modal-card p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 32px;
  opacity: 0.8;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.share-btn-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  color: #000;
}

.share-btn-circle:hover {
  transform: scale(1.1);
  background: #e0e0e0;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: #fff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  margin-bottom: 10px;
}

.toast-notification {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 16px 24px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 2000;
}

.check-circle {
  width: 24px;
  height: 24px;
  background: #fff;
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .wide-widget-container {
    margin: 32px 0;
  }

  .wide-card {
    padding: 24px;
  }

  .card-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .card-title {
    font-size: 28px;
  }

  .card-text {
    font-size: 18px;
  }

  .website-link {
    font-size: 18px;
  }

  .stats-block {
    flex-direction: row;
    gap: 24px;
    padding: 16px;
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

  /* МОБИЛЬНАЯ ВЕРСИЯ МОДАЛКИ (Early Access) */
  .signal2-review-modal-overlay {
    /* 1. Жестко центрируем по горизонтали */
    justify-content: center !important;
    /* 2. Прижимаем к верху (flex-start) */
    align-items: flex-start !important;
    /* 3. Отступ 0, чтобы прижать к самому верху */
    padding-top: 0 !important;
  }

  .signal2-review-modal-content {
    /* Сбрасываем лишние марджины */
    margin: 0 auto !important;
    width: 94% !important;
    max-width: 94% !important;
    /* Раз прижато к верху, можно дать больше места */
    max-height: 90vh;
    
    /* Опционально: если прижато к верху, можно убрать верхние скругления */
    /* border-top-left-radius: 0 !important; */
    /* border-top-right-radius: 0 !important; */
  }
  
  .signal2-modal-scrollable-content {
    padding: 24px;
  }
}
</style>
