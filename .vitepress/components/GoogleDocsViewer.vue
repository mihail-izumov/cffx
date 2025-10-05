<template>
  <div class="pdf-button-container">
    <button
      @click="togglePDF"
      class="pdf-button"
    >
      <span class="pdf-button-text">{{ isOpen ? 'Закрыть' : 'Слайды' }}</span>
      <div class="pdf-button-icon-container">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="pdf-button-icon"
        >
          <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
          <path d="M2 15h10"/>
          <path d="m9 18 3-3-3-3"/>
        </svg>
      </div>
    </button>

    <Teleport to="body" v-if="isOpen">
      <div class="pdf-modal-overlay" @click="togglePDF">
        <div class="pdf-modal-container" @click.stop>
          <button class="pdf-modal-close" @click="togglePDF">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="pdf-viewer-wrapper">
            <!-- Простой текст загрузки -->
            <div class="pdf-loading">
              <p class="loading-text">Загрузка презентации</p>
            </div>
            
            <!-- iframe с отступом сверху -->
            <iframe 
              :src="pdfUrl"
              class="pdf-iframe"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const pdfUrl = 'https://drive.google.com/file/d/1NePcnHaJranV7Ul0b6mShLzCPf3EespV/preview'

const togglePDF = () => {
  isOpen.value = !isOpen.value
  
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.pdf-button-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pdf-button {
  background: linear-gradient(135deg, #84cc16, #bef264);
  color: #1a2e05;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(132, 204, 22, 0.3);
}

.pdf-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(132, 204, 22, 0.4);
}

.pdf-button-text {
  color: #1a2e05;
  font-weight: 600;
}

.pdf-button-icon-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.pdf-button:hover .pdf-button-icon-container {
  background: rgba(255, 255, 255, 0.45);
  transform: scale(1.05);
}

.pdf-button-icon {
  transition: transform 0.3s ease;
  stroke: #1a2e05;
}

.pdf-button:hover .pdf-button-icon {
  transform: translateX(2px);
}

.pdf-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-top: 80px; /* ДОБАВЛЕНО: отступ сверху на десктопе */
}

.pdf-modal-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: calc(90vh - 60px); /* ИЗМЕНЕНО: высота минус отступ */
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.pdf-modal-close {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 10000;
  background: rgba(132, 204, 22, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pdf-modal-close:hover {
  background: #84cc16;
  transform: scale(1.1);
}

.pdf-modal-close svg {
  stroke: white;
}

.pdf-viewer-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #1a1a1a;
  padding-top: 70px; /* ДОБАВЛЕНО: внутренний отступ для iframe */
}

/* Экран загрузки - простой текст */
.pdf-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.loading-text {
  color: #84cc16;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.pdf-iframe {
  width: 100%;
  height: calc(100% - 70px); /* ИЗМЕНЕНО: высота минус отступ */
  border: none;
  position: relative;
  z-index: 2;
  background: #1a1a1a;
}

@media (max-width: 768px) {
  .pdf-button {
    width: 100%;
    justify-content: center;
    font-size: 14px;
    padding: 12px 20px;
    min-width: auto;
  }

  .pdf-button-icon-container {
    width: 28px;
    height: 28px;
  }

  .pdf-modal-overlay {
    padding: 0;
    padding-top: 60px;
  }

  .pdf-modal-container {
    max-width: 100%;
    height: calc(100vh - 60px);
    border-radius: 0;
  }

  .pdf-modal-close {
    top: 15px;
    left: 15px;
    width: 36px;
    height: 36px;
  }

  .loading-text {
    font-size: 16px;
  }
}
</style>
