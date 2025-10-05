<template>
  <div class="pdf-button-container">
    <button
      @click="openPDF"
      class="pdf-button"
    >
      <span class="pdf-button-text">Слайды</span>
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
  </div>
</template>

<script setup>
const openPDF = () => {
  window.open('http://70e1aad645fc.hosting.myjino.ru/fest2025/NOT_FRANCHISE_The_Coffee_Market_in_Samara_Signal.pdf', '_blank')
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

/* Адаптивность для мобильных устройств */
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
}
</style>
