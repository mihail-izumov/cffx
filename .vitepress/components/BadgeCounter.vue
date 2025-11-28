<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(0)
let timer = null

const updateCount = () => {
  const now = new Date()
  // Получаем текущее время в минутах с начала дня (0 - 1440)
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes()
  
  // Логика:
  // Весь день (1440 минут) делим на отрезки по 90 минут.
  // 1440 / 90 = 16 интервалов (от 0 до 15).
  // Нам нужно распределить значение от 0 до 47 по этим интервалам.
  
  const intervalIndex = Math.floor(minutesSinceMidnight / 90)
  const totalIntervals = 15 // Максимальный индекс интервала (16-й шаг - это конец дня)
  
  // Линейная интерполяция: (текущий_интервал / всего_интервалов) * макс_значение
  // Используем Math.min, чтобы не превысить 47
  const calculated = Math.round((intervalIndex / totalIntervals) * 47)
  
  count.value = Math.min(47, Math.max(0, calculated))
}

onMounted(() => {
  updateCount()
  // Проверяем время каждую минуту, чтобы обновить значение при смене 90-минутного интервала
  timer = setInterval(updateCount, 60 * 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="signal-badge">
    <div class="signal-content">
      <!-- Ваша SVG иконка -->
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="signal-icon"
      >
        <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/>
      </svg>
      
      <span class="signal-text">
        {{ count }} Сигналов отправлено сегодня
      </span>
    </div>
  </div>
</template>

<style scoped>
.signal-badge {
  /* Стили для имитации первого скриншота (badge container) */
  display: inline-flex;
  align-items: center;
  background-color: #191B1A; /* Тёмный фон со скриншота 1 */
  border-radius: 9999px;     /* Полное скругление (pill shape) */
  padding: 10px 20px;        /* Отступы как на макете */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  border: 1px solid rgba(255, 255, 255, 0.05); /* Очень легкая обводка для контраста, если нужно */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.signal-content {
  display: flex;
  align-items: center;
  gap: 10px; /* Расстояние между иконкой и текстом */
  
  /* Лаймовый цвет текста и иконки со скриншота 2 */
  color: #D3FF5C; 
}

.signal-text {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  /* Отключаем выделение текста для UI элементов */
  user-select: none;
}

.signal-icon {
  /* Убеждаемся, что иконка наследует цвет */
  color: inherit;
  display: block;
}
</style>
