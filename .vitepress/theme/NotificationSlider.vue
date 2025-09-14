<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const notifications = [
  { 
    text: 'Анализируйте рынок кофеен Самары с BREW', 
    hasButton: true,
    buttonText: 'Подробнее',
    buttonUrl: '/brew/membership'
  },
  { 
    text: 'Получите доступ к эксклюзивным данным и инсайтам', 
    hasButton: false 
  },
  { 
    text: 'Присоединяйтесь к платформе и опережайте конкурентов', 
    hasButton: false 
  }
]

const currentIndex = ref(0)
let timer = null

const currentNotification = computed(() => notifications[currentIndex.value])

const nextNotification = () => {
  currentIndex.value = (currentIndex.value + 1) % notifications.length
}

const goToSlide = (index) => {
  currentIndex.value = index
  restartTimer()
}

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const startTimer = () => {
  timer = setInterval(nextNotification, 5000)
}

const restartTimer = () => {
  clearInterval(timer)
  startTimer()
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="brew-notification-slider">
    <div class="brew-notification-content">
      <transition name="brew-fade" mode="out-in">
        <div class="brew-notification-wrapper" :key="currentIndex">
          <p class="brew-notification-text">
            {{ currentNotification.text }}
          </p>
          <button 
            v-if="currentNotification.hasButton" 
            @click="openLink(currentNotification.buttonUrl)"
            class="brew-button"
          >
            {{ currentNotification.buttonText }}
          </button>
        </div>
      </transition>
    </div>
    
    <!-- Индикаторы переключения -->
    <div class="brew-indicators">
      <button
        v-for="(_, index) in notifications"
        :key="index"
        class="brew-indicator"
        :class="{ 'active': currentIndex === index }"
        @click="goToSlide(index)"
        :aria-label="`Переключиться на уведомление ${index + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.brew-notification-slider {
  background: linear-gradient(90deg, #c4a373 0%, #f5dfb1 50%, #c4a373 100%);
  color: #171a20;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.brew-notification-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}

.brew-notification-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brew-notification-text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #171a20;
}

.brew-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171a20;
  color: #fff;
  border: none;
  padding: 0 14px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  height: 28px;
}

/* Индикаторы */
.brew-indicators {
  display: flex;
  gap: 6px;
  margin-right: 1rem;
  align-items: center;
}

.brew-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: rgba(23, 26, 32, 0.4);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.brew-indicator:hover {
  background-color: rgba(23, 26, 32, 0.6);
}

.brew-indicator.active {
  background-color: #171a20;
}

/* Fade анимация */
.brew-fade-enter-active, 
.brew-fade-leave-active { 
  transition: opacity 0.4s ease; 
}

.brew-fade-enter-from, 
.brew-fade-leave-to { 
  opacity: 0; 
}

/* Мобильная версия */
@media (max-width: 768px) {
  .brew-notification-slider {
    height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  
  .brew-notification-wrapper {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .brew-indicators {
    display: none; /* Скрываем индикаторы на мобильной версии для чистоты */
  }
}
</style>
