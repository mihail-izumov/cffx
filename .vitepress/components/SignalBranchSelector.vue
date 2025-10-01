<script setup>
import { ref } from 'vue'

const props = defineProps({
  cafeName: {
    type: String,
    required: true
  },
  branches: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close', 'branch-selected'])

const getRandomService = () => Math.random() < 0.5 ? 'gis' : 'yandex'

const goToReviews = (branch) => {
  const service = getRandomService()
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
  window.open(url, '_blank')
  emit('branch-selected', branch)
}
</script>

<template>
  <div class="signal2-branches-view">
    <div class="signal2-branches-header">
      <button @click="emit('close')" class="signal2-internal-close-btn signal2-back-btn" aria-label="Вернуться назад">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </button>
      <div class="signal2-branches-title-text">{{ cafeName }}</div>
      <div style="width: 44px;"></div>
    </div>
    
    <div class="signal2-branches-content">
      <p class="signal2-branches-subtitle">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>
      <div class="signal2-branches-list">
        <button 
          v-for="(branch, index) in branches" 
          :key="index" 
          @click="goToReviews(branch)" 
          class="signal2-branch-item"
        >
          <div class="signal2-branch-info">
            <div class="signal2-branch-number">{{ index + 1 }}</div>
            <div class="signal2-branch-address">{{ branch.address }}</div>
          </div>
          <div class="signal2-branch-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signal2-branches-view {
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  padding: 24px;
}

.signal2-branches-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
}

.signal2-branches-title-text {
  margin: 0;
  color: white;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  flex-grow: 1;
}

.signal2-internal-close-btn {
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-border);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.signal2-back-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-text-2);
  color: white;
}

.signal2-branches-content {
  flex-grow: 1;
}

.signal2-branches-subtitle {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: var(--vp-c-text-2);
}

.signal2-branches-list {
  padding: 0;
}

.signal2-branch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px;
  margin-bottom: 12px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.signal2-branch-item:hover {
  background: var(--vp-c-bg-soft);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transform: translateX(4px);
}

.signal2-branch-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}

.signal2-branch-number {
  background: rgba(70, 70, 70, 0.8);
  color: rgba(255, 255, 255, 0.9);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: none;
}

.signal2-branch-item:hover .signal2-branch-number {
  background: rgba(85, 85, 85, 0.9);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
}

.signal2-branch-address {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.signal2-branch-action {
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease;
  margin-left: 12px;
}

.signal2-branch-item:hover .signal2-branch-action {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .signal2-branches-title-text {
    font-size: 22px;
  }
  
  .signal2-branches-subtitle {
    font-size: 14px;
  }
}
</style>
