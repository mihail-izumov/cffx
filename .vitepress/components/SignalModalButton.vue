<template>
  <div class="signal-modal-wrapper">
    <!-- Кнопка в навигации -->
    <button 
      @click="openModal" 
      class="signal-modal-button"
    >
      <span class="signal-modal-button-text">Собрать Мой Отзыв</span>
      <div class="signal-modal-icon-container">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          class="signal-modal-text-cursor-icon"
        >
          <path d="M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1"/>
          <path d="M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5"/>
          <path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"/>
          <path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"/>
          <path d="M9 7v10"/>
        </svg>
      </div>
    </button>

    <!-- Модальное окно -->
    <div 
      v-if="isModalOpen" 
      class="signal2-review-modal-overlay"
      @click="closeModal"
    >
      <div 
        class="signal2-review-modal-content"
        @click.stop
      >
        <div class="signal2-modal-scrollable-content">
          <SignalT9Configurator />
        </div>
        
        <div class="signal2-modal-close-section">
          <!-- Крестик для мобильной версии -->
          <button @click="closeModal" class="signal2-modal-close-icon" aria-label="Закрыть">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
          <button @click="closeModal" class="signal2-modal-close-button">Закрыть и вернуться</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  
  // Регистрируем глобальную функцию для открытия модалки из конфига
  if (typeof window !== 'undefined') {
    window.openSignalModal = openModal
    console.log('✓ window.openSignalModal registered')
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  
  // Очищаем глобальную функцию при размонтировании
  if (typeof window !== 'undefined' && window.openSignalModal === openModal) {
    delete window.openSignalModal
  }
})
</script>

<style scoped>
/* Wrapper */
.signal-modal-wrapper {
  display: inline-block;
}

/* Стили кнопки в навигации */
.signal-modal-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f7;
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 220px;
  gap: 12px;
}

.signal-modal-button:hover {
  background: #e8e8ed;
  transform: translateY(-1px);
}

.signal-modal-button:hover .signal-modal-icon-container {
  background: #d1d1d6;
  transform: scale(1.05);
}

.signal-modal-button-text {
  flex: 1;
  text-align: left;
}

.signal-modal-icon-container {
  background: #e8e8ed;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.signal-modal-text-cursor-icon {
  color: #6d6d70;
  transition: color 0.2s ease;
}

.signal-modal-button:hover .signal-modal-text-cursor-icon {
  color: #48484a;
}

/* Стили модального окна — ПОЛНАЯ КОПИЯ финальной версии */
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

:deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(p), :deep(span), :deep(label), :deep(.title), :deep(.subtitle), :deep(.description), :deep(.example-text), :deep(.hint-text) { 
  text-align: initial !important; 
  padding-left: 0 !important; 
  padding-right: 0 !important; 
}

:deep(.container), :deep(.content) { 
  padding-left: 0 !important; 
  padding-right: 0 !important; 
  margin-left: 0 !important; 
  margin-right: 0 !important; 
}

:deep(.form-section), :deep(.form-group), :deep(.section-wrapper) { 
  margin-bottom: clamp(10px, 2vw, 10px) !important; 
}

:deep(.card), :deep(.block), :deep(.content-block) { 
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

/* Базовые стили — крестик скрыт на десктопе */
.signal2-modal-close-icon { display: none; }

@media (max-width: 768px) {
  .signal-modal-button {
    min-width: 200px;
    font-size: 14px;
    padding: 10px 16px;
  }
  
  .signal-modal-icon-container {
    width: 28px;
    height: 28px;
  }
  
  .signal-modal-text-cursor-icon {
    width: 16px;
    height: 16px;
  }
  
  .signal2-review-modal-overlay { padding: 4px; }
  .signal2-review-modal-content { 
    width: 95vw; 
    height: clamp(85vh, 90vh, 85vh); 
    max-width: 95vw; 
    max-height: clamp(85vh, 90vh, 85vh); 
  }
  .signal2-modal-scrollable-content { padding: 20px 12px 12px 12px; }
  .signal2-modal-close-button { 
    width: 100%; 
    justify-content: center; 
    font-size: 14px; 
    padding: 12px 20px; 
  }
  .signal2-modal-close-section { padding: 12px; }
  
  /* Крестик для мобильной версии */
  .signal2-modal-close-icon {
    display: flex !important;
    position: fixed !important;
    top: 2vh !important;
    right: 2.5vw !important;
    width: 44px !important;
    height: 44px !important;
    background: #1a1a1c !important;
    border: none !important;
    border-radius: 8px !important;
    color: #4a4a4c !important;
    cursor: pointer !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.3s ease;
    z-index: 10001 !important;
    backdrop-filter: none !important;
    opacity: 1 !important;
  }

  .signal2-modal-close-icon:hover {
    background: #252527 !important;
    color: #6a6a6c !important;
    transform: scale(1.05) !important;
  }

  .signal2-modal-close-icon svg {
    stroke-width: 2.5 !important;
  }

  /* Скрываем текстовую кнопку на мобильных */
  .signal2-modal-close-button {
    display: none;
  }
  
  /* Убираем фон секции */
  .signal2-modal-close-section {
    padding: 0;
    border-top: none;
    background: transparent;
  }
}

@media screen and (max-height: 700px) {
  .signal2-review-modal-content { height: 80vh !important; max-height: 80vh !important; }
}

@media screen and (max-height: 600px) {
  .signal2-review-modal-content { height: 75vh !important; max-height: 75vh !important; }
}

/* Темная тема только для кнопки */
@media (prefers-color-scheme: dark) {
  .signal-modal-button {
    background: #2c2c2e;
    color: #ffffff;
  }
  
  .signal-modal-button:hover {
    background: #3a3a3c;
  }
  
  .signal-modal-icon-container {
    background: #3a3a3c;
  }
  
  .signal-modal-button:hover .signal-modal-icon-container {
    background: #48484a;
  }
  
  .signal-modal-text-cursor-icon {
    color: #98989d;
  }
  
  .signal-modal-button:hover .signal-modal-text-cursor-icon {
    color: #ffffff;
  }
}
</style>
