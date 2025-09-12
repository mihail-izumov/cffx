<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 1. Массив с вашими уведомлениями
const notifications = [
  'Secure the $7,500 Federal Tax Credit. Take delivery by September 30.',
  'Grok AI now available in all new Model 3 vehicles. Learn more.',
  'Schedule a Demo Drive today and experience the future.'
]

// 2. Переменная для отслеживания текущего индекса
const currentIndex = ref(0)
let timer = null

// 3. Вычисляемое свойство для получения текущего сообщения
const currentNotification = computed(() => {
  return notifications[currentIndex.value]
})

// 4. Функция для переключения на следующее сообщение
const nextNotification = () => {
  currentIndex.value = (currentIndex.value + 1) % notifications.length
}

// 5. Запускаем таймер при монтировании компонента
onMounted(() => {
  // Меняем сообщение каждые 5 секунд (5000 миллисекунд)
  timer = setInterval(nextNotification, 5000)
})

// 6. Очищаем таймер при размонтировании, чтобы избежать утечек памяти
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="notification-slider">
    <!-- Обертка для центрирования и анимации -->
    <div class="notification-content">
      <!-- 
        Используем transition для плавной смены текста.
        'mode="out-in"' сначала убирает старый элемент, потом добавляет новый.
        ':key' обязателен, чтобы Vue понимал, что элемент изменился.
      -->
      <transition name="slide-up" mode="out-in">
        <p class="notification-text" :key="currentIndex">
          {{ currentNotification }}
        </p>
      </transition>
    </div>
  </div>
</template>

<style>
.notification-slider {
  background-color: #f0e6d2; /* Цвет фона как на скриншоте */
  color: #171a20; /* Темный цвет текста */
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 44px; /* Фиксированная высота для стабильности */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Скрываем все, что выходит за пределы высоты */
}

.notification-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.notification-text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  padding: 0 1rem;
}

/* Анимация появления/исчезновения текста */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
