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
      <!--
        Область для заливки. Поднята вместе с чашей.
        (y-координаты уменьшены на 4px)
      -->
      <clipPath id="cup-liquid-clip-path">
        <path d="M5 4 H16 V13 A3 3 0 0 1 13 16 H8 A3 3 0 0 1 5 13 V4 Z" />
      </clipPath>
    </defs>

    <!--
      Жидкость. Также поднята на 4px.
    -->
    <rect
      class="coffee-fill"
      clip-path="url(#cup-liquid-clip-path)"
      x="5"
      :y="16 - h"
      width="11"
      :height="h"
    />

    <!--
      Контур чашки и ручка (подняты на 4px).
      Блюдце осталось на прежнем месте.
    -->
    <path d="M5 4 H16 V13 A3 3 0 0 1 13 16 H8 A3 3 0 0 1 5 13 V4 Z" />
    <path d="M16 6h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
    <path d="M5 20h11" />
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
