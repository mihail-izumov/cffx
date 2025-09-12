<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const notifications = [
  'Анализируйте рынок кофеен Самары с BREW', 
  'Получите доступ к эксклюзивным данным и инсайтам', 
  'Присоединяйтесь к платформе и опережайте конкурентов'
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
        <p class="brew-notification-text" :key="currentIndex">
          {{ currentNotification }}
        </p>
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
  background-color: #f0e6d2;
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
}

.brew-notification-text {
  margin: 0;
  padding: 0 1rem;
  font-size: 14px;
  text-align: center;
}

/* Индикаторы */
.brew-indicators {
  display: flex;
  gap: 6px;
  margin-right: 1rem;
  align-items: center;
}

.brew-indicator {
  width: 6px;
  height: 6px;
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
</style>
