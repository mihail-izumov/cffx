<template>
  <div class="divider-custom" :style="dividerStyle"></div>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  width?: string | number
  thickness?: string | number
  margin?: string
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

const dividerStyle = computed(() => ({
  borderTopColor: props.color,
  borderTopWidth: typeof props.thickness === 'number' ? `${props.thickness}px` : props.thickness,
  width: typeof props.width === 'number' ? `${props.width}%` : props.width,
}))
</script>

<style scoped>
.divider-custom {
  border: none;
  border-top: solid;
  margin: v-bind('marginDesktop');
  height: 0;
}

@media (max-width: 768px) {
  .divider-custom {
    margin: v-bind('marginMobile');
  }
}
</style>
