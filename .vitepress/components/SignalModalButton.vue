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
        <SignalT9Configurator />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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

import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Wrapper */
.signal-modal-wrapper {
  display: inline-block;
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

/* Оверлей модального окна */
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
}

/* Контейнер модального окна - возвращаем нужные отступы */
.signal-modal-content {
  background: #1e1e20;
  border-radius: 16px;
  padding: 32px;
  /* Фиксированные размеры */
  width: 650px;
  height: 680px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: white;
}

/* Убираем принудительное центрирование ТОЛЬКО для текстовых элементов */
.signal-modal-content :deep(h1),
.signal-modal-content :deep(h2), 
.signal-modal-content :deep(h3),
.signal-modal-content :deep(h4),
.signal-modal-content :deep(p),
.signal-modal-content :deep(span),
.signal-modal-content :deep(label),
.signal-modal-content :deep(.title),
.signal-modal-content :deep(.subtitle),
.signal-modal-content :deep(.description),
.signal-modal-content :deep(.example-text),
.signal-modal-content :deep(.hint-text) {
  text-align: initial !important;
}

/* Адаптивность */
@media (max-width: 700px) {
  .signal-modal-content {
    width: 95vw;
    height: 85vh;
    padding: 24px;
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
    padding: 20px;
    height: 80vh;
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
</style>
