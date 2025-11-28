<script setup lang="ts">
import { ref, computed } from 'vue'

// Значения ползунков теперь дробные для плавности (0.00 – 8.00)
const listeningValue = ref(3.5)
const changeValue = ref(4.2)

// Логика: определяем, к какому из 3 статусов (0, 1, 2) ближе всего ползунок
// 0–2.66 = Левый статус
// 2.66–5.33 = Средний статус
// 5.33–8.00 = Правый статус
const getStatusIndex = (val: number) => {
  const step = 8 / 3
  if (val < step) return 0 // Первый сегмент
  if (val < step * 2) return 1 // Второй сегмент
  return 2 // Третий сегмент
}

// Эти вычисляемые свойства можно использовать для отправки данных на бэкенд или логики
const listeningStatusIndex = computed(() => getStatusIndex(listeningValue.value))
const changeStatusIndex = computed(() => getStatusIndex(changeValue.value))

// Функция для динамического стиля градиента (закраска трека)
const sliderStyle = (value: number | string) => {
  const v = Number(value)
  const percentage = (v / 8) * 100

  return {
    background: `linear-gradient(
      to right,
      var(--track-active) 0%,
      var(--track-active) ${percentage}%,
      var(--track-bg) ${percentage}%,
      var(--track-bg) 100%
    )`,
  }
}
</script>

<template>
  <div class="readiness-wrapper">
    
    <!-- Карточка 1: Фиолетовая -->
    <div class="card card--purple">
      <div class="card-header">
        <div class="icon-circle icon-circle--purple">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-satellite-dish-icon lucide-satellite-dish"
          >
            <path d="M4 10a7.31 7.31 0 0 0 10 10Z" />
            <path d="m9 15 3-3" />
            <path d="M17 13a6 6 0 0 0-6-6" />
            <path d="M21 13A10 10 0 0 0 11 3" />
          </svg>
        </div>

        <div class="card-titles">
          <div class="card-title">Как слушают</div>
          <div class="card-subtitle card-subtitle--purple">ПОДКЛЮЧЕНЫ</div>
        </div>
      </div>

      <div class="card-body">
        <div class="slider-row">
          <!-- step="0.02" убирает дискретность, движение становится плавным -->
          <input
            type="range"
            min="0"
            max="8"
            step="0.02"
            v-model="listeningValue"
            class="slider slider--purple"
            :style="sliderStyle(listeningValue)"
          />
        </div>
        <div class="slider-labels">
          <span class="label-left" :class="{ 'active-text': listeningStatusIndex === 0 }">Подключены</span>
          <span class="label-center" :class="{ 'active-text': listeningStatusIndex === 1 }">Слышат</span>
          <span class="label-right" :class="{ 'active-text': listeningStatusIndex === 2 }">Отвечают</span>
        </div>
      </div>
    </div>

    <!-- Карточка 2: Бронзовая -->
    <div class="card card--bronze">
      <div class="card-header">
        <div class="icon-circle icon-circle--bronze">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-zap-icon lucide-zap"
          >
            <path
              d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
            />
          </svg>
        </div>

        <div class="card-titles">
          <div class="card-title">Как меняют</div>
          <div class="card-subtitle card-subtitle--bronze">ДЕЙСТВУЮТ</div>
        </div>
      </div>

      <div class="card-body">
        <div class="slider-row">
          <input
            type="range"
            min="0"
            max="8"
            step="0.02"
            v-model="changeValue"
            class="slider slider--bronze"
            :style="sliderStyle(changeValue)"
          />
        </div>
        <div class="slider-labels">
          <span class="label-left" :class="{ 'active-text': changeStatusIndex === 0 }">Открыты</span>
          <span class="label-center" :class="{ 'active-text': changeStatusIndex === 1 }">Действуют</span>
          <span class="label-right" :class="{ 'active-text': changeStatusIndex === 2 }">Меняют</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.readiness-wrapper {
  display: flex;
  gap: 16px;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.card {
  --card-radius: 16px;
  --track-bg: rgba(255, 255, 255, 0.18);
  --track-active: #ffffff;
  --thumb-size: 20px;

  position: relative;
  flex: 1 1 320px;
  max-width: 420px;
  padding: 16px 18px 18px; /* Десктопный отступ снизу */
  border-radius: var(--card-radius);
  color: #f9fafb;
  overflow: hidden;
  backdrop-filter: blur(18px);
}

.card--purple {
  background: radial-gradient(circle at 0 0, #7c3aed33, transparent 55%),
    radial-gradient(circle at 100% 100%, #22d3ee1f, transparent 60%),
    linear-gradient(135deg, #0b0b21, #15152f);
}

.card--bronze {
  background: radial-gradient(circle at 0 0, #f59e0b33, transparent 55%),
    radial-gradient(circle at 100% 100%, #f973161f, transparent 60%),
    linear-gradient(135deg, #14120c, #262012);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.icon-circle {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  backdrop-filter: blur(4px);
}

.icon-circle--purple {
  background: rgba(167, 139, 250, 0.20);
}

.icon-circle--bronze {
  background: rgba(251, 191, 36, 0.20);
}

.card-titles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px; /* Увеличенное расстояние между заголовком и подзаголовком */
}

.card-title {
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  color: #f3f4f6;
}

.card-subtitle {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1;
}

.card-subtitle--purple {
  color: #c084fc;
}

.card-subtitle--bronze {
  color: #fbbf24;
}

.card-body {
  margin-top: 4px;
}

.slider-row {
  display: flex;
  align-items: center;
  width: 100%;
}

/* Стили ползунка */
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
  margin: 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.5);
  cursor: pointer;
  background: radial-gradient(
    circle,
    var(--thumb-inner-color) 0%,
    var(--thumb-inner-color) 35%,
    #ffffff 36%,
    #ffffff 100%
  );
}

.slider::-moz-range-thumb {
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  border: 2px solid rgba(15, 23, 42, 0.2);
  cursor: pointer;
  background: radial-gradient(
    circle,
    var(--thumb-inner-color) 0%,
    var(--thumb-inner-color) 35%,
    #ffffff 36%,
    #ffffff 100%
  );
}

.slider::-moz-range-track {
  height: 6px;
  border-radius: 999px;
  background: transparent;
}

.slider--purple {
  --thumb-inner-color: #a855f7;
}

.slider--bronze {
  --thumb-inner-color: #fbbf24;
}

/* Подписи */
.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-top: 10px;
  color: rgba(229, 231, 235, 0.7);
  position: relative;
  height: 16px;
}

/* Опционально: подсвечивать активный текстовый статус */
.active-text {
  color: #ffffff;
  font-weight: 600;
  transition: color 0.2s ease;
}

.label-left {
  position: absolute;
  left: 0;
}

.label-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.label-right {
  position: absolute;
  right: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .readiness-wrapper {
    flex-direction: column;
    align-items: center;
  }
  
  .card {
    width: 100%;
    max-width: 100%;
    /* Уменьшенный отступ снизу на мобилке для компактности */
    padding-bottom: 10px; 
  }

  .card-header {
    margin-bottom: 14px; /* Чуть плотнее шапка на мобилке */
  }
}
</style>
