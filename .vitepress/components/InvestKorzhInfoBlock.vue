<script setup>
import { ref, onMounted, computed } from 'vue'

// КОНФИГУРАЦИЯ
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEHAgAcoRx2pDzdIgRZ1RpzHYY4NZGbmb5XyuSImv0JMphoXSrFmwdVLyDe2xjjgOp1g/exec'

// Базовые значения (из таблицы)
const INITIAL_BASE = {
  pageViewsKorzh: 123, // Строка 6, ячейка C6
  korzhLikes: 17,      // Строка 4
  korzhSignals: 4      // Строка 5
}

// Состояние
const stats = ref({ ...INITIAL_BASE })
const isLiked = ref(false)
const showFollowModal = ref(false)
const showShareModal = ref(false)
const showCopyToast = ref(false)
const showCopyTooltip = ref(false)

// Форматирование чисел (1200 -> 1.2K)
const formatNumber = (num) => {
  const safeNum = Math.max(0, num || 0)
  return safeNum >= 1000 
    ? (safeNum / 1000).toFixed(1).replace(/\.0$/, '') + 'K' 
    : safeNum.toString()
}

// --- ЛОГИКА ДАННЫХ (Кэш + Сеть) ---
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
  if (isLiked.value) {
    stats.value.korzhLikes++
    localStorage.setItem('korzh_liked_wide', 'true')
    fetch(`${SCRIPT_URL}?action=addLike`).catch(() => { stats.value.korzhLikes--; isLiked.value = false })
  } else {
    if (stats.value.korzhLikes > 0) stats.value.korzhLikes--
    localStorage.removeItem('korzh_liked_wide')
    fetch(`${SCRIPT_URL}?action=removeLike`).catch(() => { stats.value.korzhLikes++; isLiked.value = true })
  }
  saveToCache()
}

// --- ЛОГИКА ШЕРИНГА ---
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showShareModal.value = false // Закрываем модалку
    showCopyToast.value = true   // Показываем уведомление внизу
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

onMounted(async () => {
  loadFromCache()
  if (localStorage.getItem('korzh_liked_wide')) isLiked.value = true
  
  await fetchStats()
  
  if (!sessionStorage.getItem('korzh_wide_session')) {
    incrementViews()
    sessionStorage.setItem('korzh_wide_session', 'true')
  }
})

const formattedViews = computed(() => formatNumber(stats.value.pageViewsKorzh))
</script>

<template>
  <div class="wide-widget-container">
    
    <!-- ОСНОВНАЯ КАРТОЧКА -->
    <div class="wide-card">
      <!-- ВЕРХНЯЯ ЧАСТЬ: Фото + Заголовок -->
      <div class="card-top">
        <div class="logo-wrapper">
          <img src="/korzh_badge.svg" alt="Корж" class="logo-img" />
        </div>
        <h1 class="card-title">Жить любить кофе пить</h1>
      </div>

      <!-- ТЕКСТ ОПИСАНИЯ -->
      <p class="card-text">
        Garage Barcelona is one of Spain’s leading craft breweries. With Untappd top-ranked IPAs they have increased their revenue via two Garage bars and distribution across 34 countries worldwide. They are raising funds for brewery expansion and to open a new flagship bar in the centre of Barcelona
      </p>

      <!-- ССЫЛКА -->
      <a href="https://korzhcoffee.ru" target="_blank" class="website-link">korzhcoffee.ru</a>

      <!-- БАБЛЫ (В одну строку) -->
      <div class="bubbles-row">
        <div class="bubble">
          <img src="/piggy-bank-icon.svg" alt="" class="bubble-icon" />
          Инвестиции в кофейни
        </div>
        <div class="bubble">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/></svg>
          Самара
        </div>
        <div class="bubble">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
          Вознаграждения
        </div>
        <a href="/korzh" class="bubble bubble-signal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
          Сигналы работают
        </a>
      </div>

      <!-- ЧЕРНЫЙ БЛОК СТАТИСТИКИ -->
      <div class="stats-block">
        <div class="stat-item">
          <img src="/eye-icon.svg" class="stat-icon" />
          <span>{{ formattedViews }}</span>
        </div>
        <div class="stat-item like-trigger" @click="toggleLike">
          <svg width="20" height="20" viewBox="0 0 24 24" :fill="isLiked ? 'white' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
          <span>{{ stats.korzhLikes }}</span>
        </div>
        <div class="stat-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
          <span>{{ stats.korzhSignals }}</span>
        </div>
      </div>

      <!-- НИЖНИЕ КНОПКИ -->
      <div class="actions-block">
        <button class="btn-primary" @click="showFollowModal = true">
          Получать обновления
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>ircle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        </button>
        <button class="btn-secondary" @click="showShareModal = true">
          Поделиться
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">ircle cx="18" cy="5" r="3"/>ircle cx="6" cy="12" r="3"/>ircle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>
    </div>

    <!-- МОДАЛКА: FOLLOW -->
    <div v-if="showFollowModal" class="modal-overlay" @click.self="showFollowModal = false">
      <div class="modal-card">
        <h3>Получайте новости первым когда появятся возможности инвестировать в новые кофейни Корж</h3>
        <p>Following allows you to stay up to date with everything a company is doing meaning you'll never miss out on an investment opportunity. Create an account to follow GARAGE BARCELONA.</p>
        <button class="modal-close" @click="showFollowModal = false">Закрыть</button>
      </div>
    </div>

    <!-- МОДАЛКА: SHARE -->
    <div v-if="showShareModal" class="modal-overlay blur-bg" @click.self="showShareModal = false">
      <div class="modal-card white-theme">
        <h3>Поделитесь</h3>
        <p>Пригласите друзей следить за инвестициями в Корж</p>
        
        <div class="share-buttons">
          <!-- Кнопка Копировать -->
          <div 
            class="share-btn-circle" 
            @click="copyLink"
            @mouseenter="showCopyTooltip = true"
            @mouseleave="showCopyTooltip = false"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <div v-if="showCopyTooltip" class="tooltip">Скопировать ссылку</div>
          </div>

          <!-- Кнопка Telegram -->
          <div class="share-btn-circle telegram" @click="shareTelegram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- TOAST УВЕДОМЛЕНИЕ -->
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
.wide-widget-container {
  width: 100%;
  max-width: 800px; /* Широкая карточка */
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* --- КАРТОЧКА --- */
.wide-card {
  background: #2a2a2a;
  border-radius: 24px;
  padding: 40px;
  position: relative;
  border: 1px solid transparent;
  
  /* Glassmorphism эффект из прошлого кода */
  background-image: 
    linear-gradient(#2a2a2a, #2a2a2a), 
    linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(255, 255, 255, 0) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

/* Верхняя часть */
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.logo-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  overflow: hidden;
  background: #333;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  font-size: 42px; /* Увеличил, чтобы было красиво, 82px может быть слишком крупно */
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-align: right;
  max-width: 70%;
  line-height: 1.1;
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
  font-size: 18px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  margin-bottom: 32px;
  transition: all 0.3s ease;
}

.website-link:hover {
  color: #fff;
  border-color: #fff;
}

/* Баблы */
.bubbles-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.bubble {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #424242;
  color: #adadad;
  padding: 8px 14px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none !important;
}

.bubble-icon {
  width: 16px; height: 16px;
  filter: brightness(0) invert(0.7);
}

/* Черный блок статистики */
.stats-block {
  background: #000;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 32px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e0e0e0;
  font-weight: 600;
  font-size: 18px;
}

.like-trigger {
  cursor: pointer;
}

.stat-icon {
  width: 20px; height: 20px;
  filter: brightness(0) invert(0.85);
}

/* Кнопки */
.actions-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.btn-primary, .btn-secondary {
  padding: 18px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #C5F946; /* Лайм */
  color: #000;
}

.btn-primary:hover {
  background: #d4ff6b;
}

.btn-secondary {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.2);
}

/* --- МОДАЛЬНЫЕ ОКНА --- */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
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
}

.modal-card.white-theme {
  background: #fff;
  color: #000;
}

.modal-card h3 {
  margin-top: 0;
  font-size: 24px;
  margin-bottom: 16px;
}

.modal-card p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 32px;
  opacity: 0.8;
}

.modal-close {
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
}

/* Шаринг кнопки */
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

/* --- TOAST NOTIFICATION --- */
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
  width: 24px; height: 24px;
  background: #fff;
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Адаптив */
@media (max-width: 768px) {
  .card-top { flex-direction: column; gap: 20px; }
  .card-title { text-align: left; max-width: 100%; font-size: 32px; }
  .stats-block { flex-wrap: wrap; gap: 20px; }
  .actions-block { grid-template-columns: 1fr; }
}
</style>
