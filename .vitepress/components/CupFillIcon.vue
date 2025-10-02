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
        Этот clipPath определяет видимую область для заливки.
        Он в точности повторяет внутренний контур чашки.
      -->
      <clipPath id="cup-liquid-clip-path">
        <path d="M5 8 H16 V17 A3 3 0 0 1 13 20 H8 A3 3 0 0 1 5 17 V8 Z" />
      </clipPath>
    </defs>

    <!--
      Жидкость: простой прямоугольник, который анимируется по высоте
      и обрезается по форме clipPath.
    -->
    <rect
      class="coffee-fill"
      clip-path="url(#cup-liquid-clip-path)"
      x="5"
      :y="20 - h"
      width="11"
      :height="h"
    />

    <!-- Контур чашки, ручки и блюдца (рисуется поверх заливки) -->
    <path d="M5 8 H16 V17 A3 3 0 0 1 13 20 H8 A3 3 0 0 1 5 17 V8 Z" />
    <path d="M16 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
    <path d="M5 21h13" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  stepIndex: { type: Number, default: 0 },
  stepsTotal: { type: Number, default: 6 },
  size: { type: [Number, String], default: 22 }
})

// Вычисляем высоту жидкости с учетом шагов
const h = computed(() => {
  const i = Math.max(0, Math.min(props.stepIndex, props.stepsTotal - 1));
  // Ступени подобраны для хорошей видимости, особенно на первом шаге
  const stepsPx = [0, 3, 5, 7, 9, 11, 12];
  return stepsPx[i] ?? 0;
});
</script>

<style scoped>
.coffee-fill {
  fill: currentColor;
  stroke: none;
  /* Анимируем только высоту и позицию, чтобы было плавно */
  transition: height 0.3s ease-in-out, y 0.3s ease-in-out;
}
</style>
