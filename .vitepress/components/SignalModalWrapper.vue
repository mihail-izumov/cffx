<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'

const isReviewModalOpen = ref(false)

const openReviewModal = () => {
  isReviewModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeReviewModal = () => {
  isReviewModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isReviewModalOpen.value) {
    closeReviewModal()
  }
}

onMounted(() => {
  (window as any).openSignalModal = openReviewModal
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div v-if="isReviewModalOpen" class="signal2-review-modal-overlay" @click="closeReviewModal">
    <div class="signal2-review-modal-content" @click.stop>
      <div class="signal2-modal-scrollable-content">
        <SignalT9Configurator />
      </div>
      
      <div class="signal2-modal-close-section">
        <button @click="closeReviewModal" class="signal2-modal-close-button">
          Закрыть и вернуться
        </button>
      </div>
    </div>
  </div>
</template>

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

.signal2-modal-scrollable-content :deep(h1),
.signal2-modal-scrollable-content :deep(h2),
.signal2-modal-scrollable-content :deep(h3),
.signal2-modal-scrollable-content :deep(h4),
.signal2-modal-scrollable-content :deep(p),
.signal2-modal-scrollable-content :deep(span),
.signal2-modal-scrollable-content :deep(label),
.signal2-modal-scrollable-content :deep(.title),
.signal2-modal-scrollable-content :deep(.subtitle),
.signal2-modal-scrollable-content :deep(.description),
.signal2-modal-scrollable-content :deep(.example-text),
.signal2-modal-scrollable-content :deep(.hint-text) {
  text-align: initial !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.signal2-modal-scrollable-content :deep(.container),
.signal2-modal-scrollable-content :deep(.content) {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.signal2-modal-scrollable-content :deep(.form-section),
.signal2-modal-scrollable-content :deep(.form-group),
.signal2-modal-scrollable-content :deep(.section-wrapper) {
  margin-bottom: clamp(10px, 2vw, 10px) !important;
}

.signal2-modal-scrollable-content :deep(.card),
.signal2-modal-scrollable-content :deep(.block),
.signal2-modal-scrollable-content :deep(.content-block) {
  margin-bottom: clamp(8px, 1.6vw, 8px) !important;
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
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: none;
  animation: none;
}

.signal2-modal-close-button:hover {
  background-color: #333333;
  color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  transform: translateY(-2px);
}

/* Мобильная версия */
@media (max-width: 768px) {
  .signal2-review-modal-overlay {
    padding: 4px;
  }
  
  .signal2-review-modal-content {
    width: 95vw;
    height: clamp(85vh, 90vh, 85vh);
    max-width: 95vw;
    max-height: clamp(85vh, 90vh, 85vh);
  }
  
  .signal2-modal-scrollable-content {
    padding: 20px 12px 12px 12px;
  }
  
  .signal2-modal-close-button {
    width: 100%;
    justify-content: center;
    font-size: 14px;
    padding: 12px 20px;
  }
  
  .signal2-modal-close-section {
    padding: 12px;
  }
}

@media (max-width: 700px) {
  .signal2-review-modal-content {
    width: 95vw;
    height: 85vh;
  }
  
  .signal2-modal-scrollable-content {
    padding: 20px 12px 12px 12px;
  }
}

@media (max-width: 480px) {
  .signal2-review-modal-content {
    height: 85vh;
  }
  
  .signal2-modal-scrollable-content {
    padding: 16px 10px 10px 10px;
  }
}

@media screen and (max-height: 700px) {
  .signal2-review-modal-content {
    height: 80vh !important;
    max-height: 80vh !important;
  }
}

@media screen and (max-height: 600px) {
  .signal2-review-modal-content {
    height: 75vh !important;
    max-height: 75vh !important;
  }
}
</style>
