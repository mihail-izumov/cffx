<template>
  <div class="slider-container">
    <!-- Card 1: Purple - Listening -->
    <div class="card card-purple">
      <div class="header">
        <div class="icon-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M4 10a7.31 7.31 0 0 0 10 10Z"/>
            <path d="m9 15 3-3"/>
            <path d="M17 13a6 6 0 0 0-6-6"/>
            <path d="M21 13A10 10 0 0 0 11 3"/>
          </svg>
        </div>
        <div class="text-block">
          <h3 class="title">Как слушают</h3>
          <p class="subtitle">ПОДКЛЮЧЕНЫ</p>
        </div>
      </div>
      
      <div class="slider-wrapper">
        <input 
          type="range" 
          v-model="sliderValue1" 
          min="0" 
          max="8" 
          class="slider slider-purple"
          @input="handleSlider1Input"
        />
        <div class="slider-labels">
          <div class="label label-left">{{ labels1[0] }}</div>
          <div class="label label-center">{{ labels1[1] }}</div>
          <div class="label label-right">{{ labels1[2] }}</div>
        </div>
      </div>
    </div>

    <!-- Card 2: Bronze - Change -->
    <div class="card card-bronze">
      <div class="header">
        <div class="icon-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
          </svg>
        </div>
        <div class="text-block">
          <h3 class="title">Как меняют</h3>
          <p class="subtitle">ДЕЙСТВУЮТ</p>
        </div>
      </div>
      
      <div class="slider-wrapper">
        <input 
          type="range" 
          v-model="sliderValue2" 
          min="0" 
          max="8" 
          class="slider slider-bronze"
          @input="handleSlider2Input"
        />
        <div class="slider-labels">
          <div class="label label-left">{{ labels2[0] }}</div>
          <div class="label label-center">{{ labels2[1] }}</div>
          <div class="label label-right">{{ labels2[2] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sliderValue1 = ref(4)
const sliderValue2 = ref(4)
const labels1 = ['Подключены', 'Слышат', 'Отвечают']
const labels2 = ['Открыты', 'Действуют', 'Меняют']

const handleSlider1Input = () => {
  // Handle slider change if needed
}

const handleSlider2Input = () => {
  // Handle slider change if needed
}
</script>

<style scoped>
.slider-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .slider-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.card {
  border-radius: 12px;
  padding: 24px;
  backdrop-filter: blur(8px);
}

.card-purple {
  background: linear-gradient(135deg, rgba(88, 28, 135, 0.1) 0%, rgba(124, 58, 255, 0.1) 100%);
  border: 1px solid rgba(124, 58, 255, 0.2);
}

.card-bronze {
  background: linear-gradient(135deg, rgba(92, 64, 51, 0.1) 0%, rgba(180, 131, 84, 0.1) 100%);
  border: 1px solid rgba(180, 131, 84, 0.2);
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  flex-shrink: 0;
  color: white;
}

.card-purple .icon-circle {
  background: rgba(124, 58, 255, 0.15);
}

.card-bronze .icon-circle {
  background: rgba(180, 131, 84, 0.15);
}

.icon {
  width: 32px;
  height: 32px;
}

.text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.subtitle {
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
}

.card-purple .subtitle {
  color: #a78bfa;
}

.card-bronze .subtitle {
  color: #d4a574;
}

.slider-wrapper {
  position: relative;
  padding: 0 8px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  margin-bottom: 36px;
}

/* Track styling */
.slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.slider::-moz-range-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  border: none;
}

/* Purple slider - filled track */
.slider-purple::-webkit-slider-runnable-track {
  background: linear-gradient(90deg, 
    rgba(124, 58, 255, 0.3) 0%, 
    rgba(124, 58, 255, 0.3) calc((var(--value, 0) / 8) * 100%), 
    rgba(255, 255, 255, 0.1) calc((var(--value, 0) / 8) * 100%), 
    rgba(255, 255, 255, 0.1) 100%
  );
}

/* Bronze slider - filled track */
.slider-bronze::-webkit-slider-runnable-track {
  background: linear-gradient(90deg, 
    rgba(180, 131, 84, 0.3) 0%, 
    rgba(180, 131, 84, 0.3) calc((var(--value, 0) / 8) * 100%), 
    rgba(255, 255, 255, 0.1) calc((var(--value, 0) / 8) * 100%), 
    rgba(255, 255, 255, 0.1) 100%
  );
}

/* Thumb styling */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Inner colored circle for purple */
.slider-purple::-webkit-slider-thumb::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #7c3aff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Inner colored circle for bronze */
.slider-bronze::-webkit-slider-thumb::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #b48354;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.slider-labels {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.label {
  text-align: center;
  font-weight: 500;
}

.label-left {
  text-align: left;
  padding-left: 4px;
}

.label-center {
  text-align: center;
}

.label-right {
  text-align: right;
  padding-right: 4px;
}
</style>
