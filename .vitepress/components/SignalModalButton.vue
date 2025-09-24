<template>
  <div class="signal-modal-wrapper">
    <!-- Кнопка -->
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
      class="signal-modal-overlay"
      @click="closeModal"
    >
      <div 
        class="signal-modal-content"
        @click.stop
      >
        <!-- Контейнер для изоляции компонента -->
        <div class="signal-configurator-container">
          <SignalT9Configurator />
        </div>
        
        <!-- Кнопка закрытия -->
        <button 
          class="signal-modal-close"
          @click="closeModal"
          aria-label="Закрыть"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
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

// Закрытие по Escape
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Wrapper - изолированный контейнер */
.signal-modal-wrapper {
  display: inline-block;
  /* Сброс возможных наследуемых стилей */
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* Стили кнопки - только для этого компонента */
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
  box-sizing: border-box;
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
  font-family: inherit;
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
  box-sizing: border-box;
}

.signal-modal-text-cursor-icon {
  color: #6d6d70;
  transition: color 0.2s ease;
  display: block;
}

.signal-modal-button:hover .signal-modal-text-cursor-icon {
  color: #48484a;
}

/* Модальное окно - изолированные стили */
.signal-modal-overlay {
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
  padding: 20px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.signal-modal-content {
  background: #1e1e20;
  border-radius: 24px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  /* Оптимальные размеры для компонента */
  width: min(800px, 95vw);
  height: min(700px, 90vh);
  max-width: 95vw;
  max-height: 90vh;
  overflow: hidden;
  box-sizing: border-box;
}

/* Контейнер для изоляции компонента SignalT9Configurator */
.signal-configurator-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  /* Сброс всех возможных стилей */
  border: none;
  background: transparent;
  box-sizing: border-box;
  /* Изоляция от родительских стилей */
  all: revert;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* Кнопка закрытия */
.signal-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.signal-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

/* Адаптивность только для модального окна */
@media (max-width: 850px) {
  .signal-modal-content {
    width: 95vw;
    height: 90vh;
  }
}

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
  
  .signal-modal-content {
    width: 95vw;
    height: 85vh;
    border-radius: 16px;
  }
  
  .signal-modal-overlay {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .signal-modal-content {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  
  .signal-modal-overlay {
    padding: 0;
  }
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

/* Стили прокрутки для контейнера компонента */
.signal-configurator-container::-webkit-scrollbar {
  width: 8px;
}

.signal-configurator-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.signal-configurator-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.signal-configurator-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
