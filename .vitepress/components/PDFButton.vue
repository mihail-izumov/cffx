<template>
  <div class="pdf-button-container">
    <button
      @click="openPDF"
      class="pdf-button"
    >
      <div class="pdf-button-icon-container">
        <svg 
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      </div>
      <span class="pdf-button-text">Открыть отчёт</span>
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
  background: linear-gradient(135deg, #f59e0b, #fcd34d);
  color: #422006;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.pdf-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
}

.pdf-button-icon-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(154, 91, 24, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.pdf-button:hover .pdf-button-icon-container {
  background: rgba(205, 122, 32, 0.8);
  transform: scale(1.05);
}

.pdf-button-icon {
  transition: transform 0.3s ease;
  stroke: #422006;
}

.pdf-button:hover .pdf-button-icon {
  transform: translateX(2px);
}

.pdf-button-text {
  color: #422006;
  font-weight: 600;
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
