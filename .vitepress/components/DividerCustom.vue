<template>
  <div class="divider-custom" :style="inlineStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  width?: string | number
  thickness?: string | number
  marginDesktop?: string
  marginMobile?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'rgba(255, 255, 255, 0.15)',
  width: '100%',
  thickness: '1px',
  marginDesktop: '20px 0',
  marginMobile: '15px 0',
})

const inlineStyle = computed(() => {
  const thicknessValue = typeof props.thickness === 'number' 
    ? `${props.thickness}px` 
    : props.thickness

  const widthValue = typeof props.width === 'number' 
    ? `${props.width}%` 
    : props.width

  return {
    borderTopColor: props.color,
    borderTopWidth: thicknessValue,
    borderTopStyle: 'solid',
    width: widthValue,
    margin: props.marginDesktop,
    border: 'none',
    height: '0',
  }
})
</script>

<style scoped>
@media (max-width: 768px) {
  .divider-custom {
    margin: v-bind('marginMobile') !important;
  }
}
</style>
