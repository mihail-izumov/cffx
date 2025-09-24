<template>
  <div>
    <!-- Кнопка -->
    <button 
      @click="openModal" 
      class="signal-button"
    >
      <span>Собрать Мой Отзыв</span>
      <div class="icon-container">
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
          class="text-cursor-icon"
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
      class="modal-overlay"
      @click="closeModal"
    >
      <div 
        class="modal-content"
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
  document.body.style.overflow = 'hidden' // Блокируем прокрутку
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto' // Восстанавливаем прокрутку
}

// Закрытие по Escape
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// Добавляем обработчик при монтировании
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Стили кнопки */
.signal-button {
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

.signal-button:hover {
  background: #e8e8ed;
  transform: translateY(-1px);
}

.signal-button:hover .icon-container {
  background: #d1d1d6;
  transform: scale(1.05);
}

.icon-container {
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

.text-cursor-icon {
  color: #6d6d70;
  transition: color 0.2s ease;
}

.signal-button:hover .text-cursor-icon {
  color: #48484a;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: #2c2c2e;
  border-radius: 16px;
  padding: 0;
  /* Фиксированная ширина как на экране "Эмоции" */
  width: 1280px;
  max-width: 95vw;
  min-height: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  color: white;
}

/* Адаптивность */
@media (max-width: 1320px) {
  .modal-content {
    width: 95vw;
  }
}

@media (max-width: 768px) {
  .signal-button {
    min-width: 200px;
    font-size: 14px;
    padding: 10px 16px;
  }
  
  .icon-container {
    width: 28px;
    height: 28px;
  }
  
  .text-cursor-icon {
    width: 16px;
    height: 16px;
  }
  
  .modal-content {
    width: 95vw;
    margin: 10px;
    min-height: 500px;
  }
}

/* Темная тема */
@media (prefers-color-scheme: dark) {
  .signal-button {
    background: #2c2c2e;
    color: #ffffff;
  }
  
  .signal-button:hover {
    background: #3a3a3c;
  }
  
  .icon-container {
    background: #3a3a3c;
  }
  
  .signal-button:hover .icon-container {
    background: #48484a;
  }
  
  .text-cursor-icon {
    color: #98989d;
  }
  
  .signal-button:hover .text-cursor-icon {
    color: #ffffff;
  }
}
</style>
