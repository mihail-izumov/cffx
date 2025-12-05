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
          <div class="banner-intro">ОСТАНЕМСЯ НА СВЯЗИ?</div>

          <div class="banner-title">
            <!-- Десктопная версия (≥769px) -->
            <span class="title-desktop">
              Еще больше возможностей быть ближе к бизнесу,<br>
              который вы любите.
            </span>

            <!-- Мобильная версия (≤768px) -->
            <span class="title-mobile">
              Еще больше возможностей<br>
              быть ближе к бизнесу,<br>
              который вы любите.
            </span>
          </div>

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
    default: '/subscribe_ban.jpg'
  },
  imageAlt: {
    type: String,
    default: 'Новости Сигнала в Телеграм'
  },
  title: {
    type: String,
    default: 'Еще больше возможностей быть ближе к бизнесу, который вы любите.'
  },
  subtitle: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'Подписаться в Телеграм'
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
  box-shadow: 0 4px 12px rgba(0, 0, 0.1);
  transition: transform 0.3s ease;
  display: block;
}

.banner-content:hover .banner-image {
  transform: scale(1.02);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: max(12px, min(24px, 3vw));
}

.banner-text {
  text-align: center;
  margin-bottom: 2.5rem;
}

.banner-intro {
  font-size: clamp(0.55rem, 1vw, 0.7rem);
  font-weight: 400;
  color: #b5f240;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: -1rem 0 1rem 0;
}

.banner-title {
  font-size: clamp(0.9rem, 2vw, 1.5rem);
  font-weight: 500;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0 0 1rem 0;
  line-height: 1.35;
  max-width: 600px;
}

/* Управление переносами /
.title-desktop {
  display: block;
}

.title-mobile {
  display: none;
}

@media (max-width: 768px) {
  .title-desktop {
    display: none;
  }
  .title-mobile {
    display: block;
  }

  .banner-overlay {
    padding: 1rem;
  }
  .banner-text {
    margin-bottom: 2rem;
  }
  .banner-button {
    padding: 0.6rem 1.8rem;
  }
}

.banner-subtitle {
  font-size: clamp(0.85rem, 1.8vw, 1.1rem);
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  margin: 0;
  max-width: 500px;
}

.banner-button {
  background: linear-gradient(135deg, #b5f240 0%, #95d428 100%);
  color: #2d3748;
  border: none;
  padding: 0.75rem 3rem;
  border-radius: 12px;
  font-size: clamp(1rem, 2vw, 1.1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(181, 242, 64, 0.3);
}

.banner-button:hover {
  background: linear-gradient(135deg, #95d428 0%, #85c41f 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(181, 242, 64, 0.4);
}

.banner-button:active {
  transform: translateY(0);
}
</style>
