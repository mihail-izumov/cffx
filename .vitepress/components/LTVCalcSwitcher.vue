<template>
  <div class="signal-dashboard-wrapper">
    <!-- Tesla-style переключатель: Общепит / Фитнес -->
    <div class="signal-theme-toggle">
      <button
        class="signal-theme-btn"
        :class="{ active: selectedTheme === 'cafe' }"
        @click="selectedTheme = 'cafe'"
      >
        Общепит
      </button>
      <button
        class="signal-theme-btn"
        :class="{ active: selectedTheme === 'fitness' }"
        @click="selectedTheme = 'fitness'"
      >
        Фитнес
      </button>
      <div class="signal-theme-slider" :style="{ left: sliderLeft }"></div>
    </div>

    <!-- ДЭШБОРД: Показываем только выбранный -->
    <transition name="fade" mode="out-in">
      <div v-if="selectedTheme === 'cafe'" key="cafe">
        <DashboardCafeSignalsMap />
      </div>
      <div v-else key="fitness">
        <DashboardGymSignalsMap />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LTVCalc from './LTVCalc.vue'
import LTVFitCalc from './LTVFitCalc.vue'

const selectedTheme = ref('cafe') // 'cafe' | 'fitness'

const sliderLeft = computed(() => {
  return selectedTheme.value === 'cafe' ? '6px' : 'calc(50% + 6px)'
})
</script>

<style scoped>
/* === Обёртка === */
.signal-dashboard-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 0;
  font-family: inherit;
}

/* === Tesla-style переключатель === */
.signal-theme-toggle {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 360px;
  margin: 0 auto 2rem auto;
  background: #2a2a2e;
  border-radius: 16px;
  padding: 6px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.signal-theme-btn {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #ccc;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 2;
  border-radius: 12px;
}

.signal-theme-btn.active {
  color: #000;
  font-weight: 700;
}

.signal-theme-slider {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  width: calc(50% - 12px);
  background: #fff;
  border-radius: 12px;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* === Анимация переключения дэшбордов === */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.32s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* === Адаптивность переключателя === */
@media (max-width: 480px) {
  .signal-theme-toggle {
    max-width: 300px;
    padding: 5px;
  }
  .signal-theme-btn {
    padding: 10px 12px;
    font-size: 0.92rem;
  }
  .signal-theme-slider {
    width: calc(50% - 10px);
  }
}
</style>
