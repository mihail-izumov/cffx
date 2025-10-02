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
      <!-- Область заливки (сделана шире) -->
      <clipPath id="cup-liquid-clip-path">
        <path d="M4 4 H18 V13 A3 3 0 0 1 15 16 H7 A3 3 0 0 1 4 13 V4 Z" />
      </clipPath>
    </defs>

    <!-- Заливка (сделана шире) -->
    <rect
      class="coffee-fill"
      clip-path="url(#cup-liquid-clip-path)"
      x="4"
      :y="16 - h"
      width="14"
      :height="h"
    />

    <!-- Контур чашки, ручка и блюдце (сделаны шире) -->
    <path d="M4 4 H18 V13 A3 3 0 0 1 15 16 H7 A3 3 0 0 1 4 13 V4 Z" />
    <path d="M18 6h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
    <path d="M4 20h14" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  stepIndex: { type: Number, default: 0 },
  stepsTotal: { type: Number, default: 6 },
  size: { type: [Number, String], default: 22 },
})

// Этот блок остается без изменений
const h = computed(() => {
  const i = Math.max(0, Math.min(props.stepIndex, props.stepsTotal - 1))
  const stepsPx = [0, 3, 5, 7, 9, 11, 12]
  return stepsPx[i] ?? 0
})
</script>

<style scoped>
/* Этот блок остается без изменений */
.coffee-fill {
  fill: currentColor;
  stroke: none;
  transition: height 0.3s ease-in-out, y 0.3s ease-in-out;
}
</style>
