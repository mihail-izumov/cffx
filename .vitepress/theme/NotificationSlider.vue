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
  // Перезапускаем таймер после ручного переключения
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
      <transition name="brew-slide-up" mode="out-in">
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
  text-align: center;
}

/* Индикаторы */
.brew-indicators {
  display: flex;
  gap: 8px;
  margin-right: 1rem;
  align-items: center;
}

.brew-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: rgba(23, 26, 32, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.brew-indicator:hover {
  background-color: rgba(23, 26, 32, 0.5);
  transform: scale(1.2);
}

.brew-indicator.active {
  background-color: #171a20;
  transform: scale(1.1);
}

/* Анимации */
.brew-slide-up-enter-active, 
.brew-slide-up-leave-active { 
  transition: all 0.4s ease; 
}

.brew-slide-up-enter-from { 
  opacity: 0; 
  transform: translateY(20px); 
}

.brew-slide-up-leave-to { 
  opacity: 0; 
  transform: translateY(-20px); 
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .brew-notification-text {
    padding: 0 0.5rem;
    font-size: 14px;
  }
  
  .brew-indicators {
    margin-right: 0.5rem;
    gap: 6px;
  }
  
  .brew-indicator {
    width: 6px;
    height: 6px;
  }
}
</style>
