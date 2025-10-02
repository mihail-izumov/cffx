<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <defs>
      <!-- Маска, которая обрезает углы на низких уровнях заливки -->
      <mask id="cup-bottom-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <!-- Вырезаем уголки, которые "выпирают" на 2-м шаге -->
        <circle v-if="h < 4" cx="5" :cy="17" r="1.5" fill="black" />
        <circle v-if="h < 4" cx="16" :cy="17" r="1.5" fill="black" />
      </mask>
    </defs>

    <!-- Заливка: скруглённый прямоугольник, обрезанный маской -->
    <rect
      class="coffee-fill"
      :x="innerX"
      :y="innerY + innerH - h"
      :width="innerW"
      :height="h"
      rx="1.2"
      ry="1.2"
      mask="url(#cup-bottom-mask)"
    />

<!-- Контур чашки, ручки и блюдца (рисуются поверх заливки) -->
<path d="M5 2h11v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V2z" />
<path d="M16 2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
<path d="M5 15h13" />

  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  stepIndex: { type: Number, default: 0 },
  stepsTotal: { type: Number, default: 6 },
  size: { type: [Number, String], default: 22 },
})

// Координаты внутренней части чашки
const innerX = 5,
  innerY = 8,
  innerW = 11,
  innerH = 9

// Высота заливки с заметными ступенями
const h = computed(() => {
  const i = Math.max(0, Math.min(props.stepIndex, props.stepsTotal - 1))
  const stepsPx = [0, 2, 4, 6, 7.5, 9]
  return stepsPx[i] ?? 0
})
</script>

<style scoped>
.coffee-fill {
  fill: currentColor;
  stroke: none;
  transition: height 0.3s ease-in-out, y 0.3s ease-in-out;
}
</style>
