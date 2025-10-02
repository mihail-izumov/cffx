<template>
  <svg
    :width="size" :height="size"
    viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
  >
    <!-- Жидкость (сначала, чтобы быть «под» контуром) -->
    <rect
      :x="innerX"
      :y="innerY + innerH - h"
      :width="innerW"
      :height="h"
      class="coffee-fill"
    />
    <!-- Корпус чашки и ручка -->
    <path d="M5 10h11v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V10z"/>
    <path d="M16 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/>
    <!-- Блюдце -->
    <path d="M6 21h12"/>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  stepIndex:   { type: Number, default: 0 },   // 0..stepsTotal-1
  stepsTotal:  { type: Number, default: 6 },
  size:        { type: [Number, String], default: 22 }
})

// Внутренняя прямоугольная область чашки (viewBox координаты)
const innerX = 5, innerY = 9, innerW = 11, innerH = 8

// Заметные ступени высоты (px) — без «невидимого» первого шага
const h = computed(() => {
  const i = Math.max(0, Math.min(props.stepIndex, props.stepsTotal - 1))
  const stepsPx = [0, 2, 4, 6, 7, 8]
  return stepsPx[i] ?? Math.round((innerH * i / (props.stepsTotal - 1)) * 10) / 10
})
</script>

<style scoped>
.coffee-fill {
  fill: currentColor;
  opacity: 1;
  transition: height .3s ease-in-out, y .3s ease-in-out;
}
</style>
