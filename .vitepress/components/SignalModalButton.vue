<template>
  <div>
    <!-- Кнопка -->
    <button 
      @click="openModal" 
      class="signal-button"
    >
      <span>Compare iPhone cameras</span>
      <div class="plus-icon">
        <span>+</span>
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
        <button @click="closeModal" class="close-button">×</button>
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
  min-width: 200px;
  gap: 12px;
}

.signal-button:hover {
  background: #e8e8ed;
  transform: translateY(-1px);
}

.plus-icon {
  background: #007aff;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 300;
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
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #f0f0f0;
  color: #333;
}

/* Адаптивность */
@media (max-width: 768px) {
  .signal-button {
    min-width: 180px;
    font-size: 14px;
    padding: 10px 16px;
  }
  
  .plus-icon {
    width: 24px;
    height: 24px;
    font-size: 16px;
  }
  
  .modal-content {
    margin: 10px;
    padding: 20px;
    max-width: calc(100vw - 20px);
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
  
  .modal-content {
    background: #1c1c1e;
    color: #ffffff;
  }
  
  .close-button {
    color: #ffffff;
  }
  
  .close-button:hover {
    background: #3a3a3c;
  }
}
</style>
