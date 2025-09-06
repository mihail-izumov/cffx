<template>
  <div class="investor-banner">
    <div class="banner-content">
      <img 
        :src="imageSrc" 
        :alt="imageAlt"
        class="banner-image"
      />
      <div class="banner-overlay">
        <div class="banner-text">
          <div class="banner-title">{{ title }}</div>
          <p v-if="subtitle" class="banner-subtitle">{{ subtitle }}</p>
        </div>
        <button 
          class="banner-button"
          @click="handleButtonClick"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    default: '/brew_intro_ban.jpg'
  },
  imageAlt: {
    type: String,
    default: 'Investment banner'
  },
  title: {
    type: String,
    default: 'Join a new generation of investors'
  },
  subtitle: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'Подписаться на Пульс'
  },
  buttonLink: {
    type: String,
    default: 'https://t.me/runScale'
  }
})

const emit = defineEmits(['button-click'])

const handleButtonClick = () => {
  if (props.buttonLink && props.buttonLink !== '#') {
    window.open(props.buttonLink, '_blank')
  }
  emit('button-click')
}
</script>

<style scoped>
.investor-banner {
  text-align: center;
  margin: 2rem 0;
  width: 100%;
}

.banner-content {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 800px;
}

.banner-image {
  width: 100%;
  height: auto;
  border-radius: max(12px, min(24px, 3vw));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: block;
}

.banner-content:hover .banner-image {
  transform: scale(1.02);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: max(12px, min(24px, 3vw));
}

.banner-text {
  text-align: center;
  margin-bottom: 2rem;
}

.banner-title {
  font-size: clamp(1.1rem, 2.5vw, 1.8rem);
  font-weight: 500;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0 0 1rem 0;
  line-height: 1.3;
  max-width: 600px;
}

.banner-subtitle {
  font-size: clamp(0.85rem, 1.8vw, 1.1rem);
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  margin: 0;
  max-width: 500px;
}

.banner-button {
  background: linear-gradient(135deg, #c3f53c 0%, #a8e632 100%);
  color: #2d3748;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(195, 245, 60, 0.3);
}

.banner-button:hover {
  background: linear-gradient(135deg, #a8e632 0%, #95d428 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(195, 245, 60, 0.4);
}

.banner-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(195, 245, 60, 0.3);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .banner-overlay {
    padding: 1rem;
  }
  
  .banner-text {
    margin-bottom: 1.5rem;
  }
  
  .banner-button {
    padding: 0.6rem 1.5rem;
  }
}
</style>
