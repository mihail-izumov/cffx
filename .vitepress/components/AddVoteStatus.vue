<script setup lang="ts">
import { ref } from 'vue'

const listeningValue = ref(3) // 0–8, по 3 шага на каждый сегмент
const changeValue = ref(3)

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
    <!-- Карточка 1 -->
    <div class="card card--purple">
      <div class="card-header">
        <div class="icon-circle">
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
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            v-model="listeningValue"
            class="slider"
            :style="sliderStyle(listeningValue)"
          />
        </div>
        <div class="slider-labels">
          <span>Подключены</span>
          <span>Слышат</span>
          <span>Отвечают</span>
        </div>
      </div>
    </div>

    <!-- Карточка 2 -->
    <div class="card card--bronze">
      <div class="card-header">
        <div class="icon-circle">
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
            step="1"
            v-model="changeValue"
            class="slider"
            :style="sliderStyle(changeValue)"
          />
        </div>
        <div class="slider-labels">
          <span>Открыты</span>
          <span>Действуют</span>
          <span>Меняют</span>
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
}

.card {
  --card-radius: 16px;
  --track-bg: rgba(255, 255, 255, 0.18);
  --track-active: #ffffff;
  --thumb-size: 18px;

  position: relative;
  flex: 1 1 320px;
  max-width: 420px;
  padding: 16px 18px 18px;
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
  gap: 10px;
  margin-bottom: 18px;
}

.icon-circle {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.7);
  color: #e5e7eb;
}

.card-titles {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 14px;
  line-height: 1.2;
  font-weight: 500;
}

.card-subtitle {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 2px;
  font-weight: 600;
}

.card-subtitle--purple {
  color: #a855f7;
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
}

/* Базовый трек + подсветка выбранной области */
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--track-active) 0%,
    var(--track-active) 40%,
    var(--track-bg) 40%,
    var(--track-bg) 100%
  );
  outline: none;
  cursor: pointer;
  transition: background 120ms ease-out;
}

/* Ползунок */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.85);
}

.slider::-moz-range-thumb {
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 999px;
  background: #ffffff;
  border: 2px solid rgba(15, 23, 42, 0.85);
}

.slider::-moz-range-track {
  height: 6px;
  border-radius: 999px;
  background: transparent;
}

/* Подписи к 3 зонам (0–2, 3–5, 6–8) */
.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-top: 10px;
  color: rgba(229, 231, 235, 0.8);
}

.slider-labels span {
  flex: 1;
  text-align: center;
}

/* Адаптивность: на мобильном карточки одна под другой */
@media (max-width: 768px) {
  .readiness-wrapper {
    flex-direction: column;
  }
}
</style>
