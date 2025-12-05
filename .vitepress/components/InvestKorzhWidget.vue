<script setup>
import { ref, onMounted } from 'vue'

// Начальное значение счетчика
const INITIAL_LIKES = 12
const isLiked = ref(false)
const currentLikes = ref(INITIAL_LIKES)

// Статичный счетчик молнии (можно менять здесь)
const lightningCount = 4

onMounted(() => {
  // Проверяем, голосовал ли пользователь ранее
  const hasLiked = localStorage.getItem('korzh_liked_status')
  
  if (hasLiked) {
    isLiked.value = true
    currentLikes.value = INITIAL_LIKES + 1
  }
})

const handleLike = () => {
  if (isLiked.value) return

  isLiked.value = true
  currentLikes.value++
  localStorage.setItem('korzh_liked_status', 'true')
}
</script>

<template>
  <div class="essential-apps">
    <div class="header">
      <div class="actions">
        <a href="/pro/customize" class="btn-create">
          Настроить Свой Сигнал
          <span class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 7h10v10"/>
              <path d="M7 17 17 7"/>
            </svg>
          </span>
        </a>
        <a href="/pro/ltvcalc" class="btn-see-all">
          LTV Калькулятор
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
      <!-- ЛЕВАЯ КАРТОЧКА (Измененная) -->
      <div class="app-card korzh-card">
        <div class="card-header">
          <span class="app-name">ОБЩЕПИТ</span>
          
          <!-- Кнопка лайка -->
          <div 
            class="like-btn" 
            :class="{ 'is-liked': isLiked }"
            @click="handleLike"
            title="Нравится"
          >
            <!-- Иконка после нажатия (залитая) -->
            <svg v-if="isLiked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
            </svg>
            
            <!-- Иконка до нажатия (+ сердце) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-plus-icon lucide-heart-plus">
              <path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49"/>
              <path d="M15 15h6"/><path d="M18 12v6"/>
            </svg>
          </div>
        </div>

        <div class="app-icon">
          <img src="/dialogs-widgets-cafe-icon.svg" alt="Общепит" style="width: 100%; height: 100%; object-fit: contain;" />
        </div>

        <!-- Текст жирнее и больше -->
        <p class="card-description bold-desc">
          Не говорим вам, как варить кофе. Даем умную систему, чтобы в вашей кофейне было больше постоянных гостей.
        </p>

        <!-- Счетчики под текстом -->
        <div class="stats-row">
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake-icon lucide-heart-handshake">
              <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/>
            </svg>
            <span>{{ currentLikes }}</span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
            <span>{{ lightningCount }}</span>
          </div>
        </div>

        <div class="card-footer">
          <a href="/korzh" target="_blank" rel="noopener noreferrer" class="play-btn">Тест-драйв</a>
        </div>

        <!-- Баблы (Chips) -->
        <div class="bubbles-container">
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
            Вознаграждения
          </div>
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            Сигналы работают
          </div>
          <div class="bubble">
            Инвестиции
          </div>
          <div class="bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>ircle cx="12" cy="10" r="3"/></svg>
            Самара
          </div>
        </div>
      </div>

      <!-- ПРАВАЯ КАРТОЧКА (Без изменений) -->
      <div class="app-card">
        <div class="card-header">
          <span class="app-name">ФИТНЕС</span>
          <div class="like-info">
            <span class="like-count">[СуперСпорт]</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
        </div>
        <div class="app-icon">
          <img src="/dialogs-widgets-fitness-icon.svg" alt="Фитнес" style="width: 100%; height: 100%; object-fit: contain;" />
        </div>
        <p class="card-description">50% ваших новых клиентов боятся заходить в зал. Знаем, как это исправить.</p>
        <div class="card-footer">
          <a href="/supersport" target="_blank" rel="noopener noreferrer" class="play-btn">Тест-драйв</a>
        </div>
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
  /* Специфичные стили для левой карточки, чтобы flex правильно работал с новым контентом */
  grid-template-rows: auto auto auto auto auto 1fr;
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

.like-info {
  color: #9e9e9e;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.like-count {
  font-family: inherit;
}

/* Стили для кнопки лайка */
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
  background: rgba(255, 255, 255, 0.1);
}

.like-btn.is-liked {
  cursor: default;
  color: white; /* Иконка полностью белая */
}

/* Иконка заливается белым при ховере, если еще не лайкнули */
.like-btn:not(.is-liked):hover svg {
  fill: white;
}

.app-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  margin-bottom: 16px;
}

.card-description {
  font-size: 13px;
  color: #f5f5f5;
  text-align: center;
  margin: 0 0 16px 0;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Новый класс для увеличенного текста */
.card-description.bold-desc {
  font-size: 15px; /* 13px + 2px */
  font-weight: 600;
}

/* Секция счетчиков */
.stats-row {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-bottom: 16px;
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 500;
  padding: 0 4px;
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

/* Стили для Баблов */
.bubbles-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 16px; /* Отступ от кнопки */
}

.bubble {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #383838; /* Чуть ярче чем #2a2a2a */
  color: #757575; /* Слабо читаемый, но читаемый */
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  transition: color 0.2s ease;
}

.bubble:hover {
  color: #a0a0a0; /* Чуть светлее при наведении для удобства */
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

  .card-description {
    font-size: 16px;
    margin: 0 0 16px 0;
    padding: 0 8px;
  }
}
</style>
