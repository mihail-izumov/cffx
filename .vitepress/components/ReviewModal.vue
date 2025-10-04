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
/* Глобальные стили для модального окна - БЕЗ scoped */
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
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.signal2-modal-scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px 16px 16px;
}

.signal2-modal-close-section {
  flex-shrink: 0;
  padding: 20px 16px 24px 16px;
  background: #1e1e20;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
}

.signal2-modal-close-button {
  background-color: #272727;
  border: none;
  color: #888;
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.signal2-modal-close-button:hover {
  background-color: #333333;
  color: #fff;
  transform: translateY(-2px);
}

/* Мобильные стили */
@media (max-width: 768px) {
  .signal2-review-modal-overlay {
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }

  .signal2-review-modal-content {
    margin-top: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
    height: auto;
    max-height: none;
  }

  .signal2-modal-scrollable-content {
    padding-bottom: 70px !important;
  }

  .signal2-modal-close-section {
    position: static;
    flex-shrink: 0;
    padding: 16px 16px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom));
  }

  .signal2-modal-close-button {
    width: 100%;
    justify-content: center;
    font-size: 14px;
    padding: 12px 20px;
  }
}
</style>
