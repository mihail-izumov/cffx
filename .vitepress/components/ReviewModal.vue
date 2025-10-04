<template>
  <div v-if="isOpen" class="signal2-review-modal-overlay" @click="$emit('close')">
    <div class="signal2-review-modal-content" @click.stop>
      <div class="signal2-modal-scrollable-content">
        <slot name="content"></slot>
      </div>
      <div class="signal2-modal-close-section">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

defineEmits(['close'])

watch(() => props.isOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto'
})
</script>

<style scoped>
.signal2-review-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 8px;
  box-sizing: border-box;
}

.signal2-review-modal-content {
  background: #1e1e20;
  border-radius: 16px;
  width: 650px;
  height: clamp(85vh, 90vh, 85vh);
  max-width: 95vw;
  max-height: clamp(85vh, 90vh, 85vh);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.signal2-modal-scrollable-content {
  flex: 1; /* Ключевое свойство, чтобы занимать все место */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.signal2-modal-close-section {
  flex-shrink: 0; /* Не сжиматься */
  padding: 20px 16px 24px 16px;
  background: #1e1e20;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .signal2-review-modal-overlay {
    padding: 0;
    align-items: flex-end; /* Выравнивание по низу на мобильных */
  }
  .signal2-review-modal-content {
    width: 100%;
    height: 90vh; /* Занимать почти весь экран */
    max-height: 90vh;
    border-radius: 16px 16px 0 0;
  }
  .signal2-modal-close-section {
    padding-bottom: calc(24px + env(safe-area-inset-bottom));
  }
}
</style>
