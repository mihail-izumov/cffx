<script setup>
// Скрипт остается без изменений
import { ref, computed, onMounted, onUnmounted } from 'vue'
const notifications = ['Анализируйте рынок кофеен Самары с BREW', 'Получите доступ к эксклюзивным данным и инсайтам', 'Присоединяйтесь к платформе и опережайте конкурентов']
const currentIndex = ref(0)
let timer = null
const currentNotification = computed(() => notifications[currentIndex.value])
const nextNotification = () => { currentIndex.value = (currentIndex.value + 1) % notifications.length }
onMounted(() => { timer = setInterval(nextNotification, 5000) })
onUnmounted(() => { clearInterval(timer) })
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
  overflow: hidden;
  /* Возвращаем sticky */
  position: sticky;
  top: 0;
  z-index: 20; 
}
/* Остальные стили без изменений */
.brew-notification-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.brew-notification-text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  padding: 0 1rem;
}
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
</style>
