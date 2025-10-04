<template>
  <div v-if="isOpen" class="signal2-review-modal-overlay" @click="$emit('close')">
    <div class="signal2-review-modal-content" @click.stop>
      <div class="signal2-modal-scrollable-content">
        <slot />
      </div>
      <div class="signal2-modal-close-section">
        <button @click="$emit('close')" class="signal2-modal-close-button">
          Закрыть и вернуться
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean
})

defineEmits(['close'])
</script>

<style>
/* ВСЕ стили модального окна здесь - один раз, без scoped */
.signal2-review-modal-overlay { /* базовые стили */ }
.signal2-review-modal-content { /* базовые стили */ }
/* ...и т.д., включая @media запросы */
</style>
