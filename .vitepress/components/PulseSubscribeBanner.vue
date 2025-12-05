<template>
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
            <span class="title-desktop">
              Еще больше возможностей быть ближе к бизнесу,<br>
              который вы любите.
            </span>
            <span class="title-mobile">
              Еще больше возможностей<br>
              быть ближе к бизнесу,<br>
              который вы любите.
            </span>
          </div>

          <p v-if="subtitle" class="banner-subtitle">{{ subtitle }}</p>
        </div>

        <button
          class="banner-button premium-liquid"
          @click="handleButtonClick"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  imageSrc: { type: String, default: '/subscribe_ban.jpg' },
  imageAlt: { type: String, default: 'Новости Сигнала в Телеграм' },
  title: {
    type: String,
    default: 'Еще больше возможностей быть ближе к бизнесу, который вы любите.'
  },
  subtitle: { type: String, default: '' },
  buttonText: { type: String, default: 'Подписаться в Телеграм' },
  buttonLink: { type: String, default: 'https://t.me/runScale' }
})

const emit = defineEmits(['button-click'])
const isHovered = ref(false)

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
  margin: 2.5rem 0;
  width: 100%;
}

.banner-content {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 840px;
  border-radius: max(16px, min(28px, 3.5vw));
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22,1,.36,1);
}

/* Зум ТОЛЬКО при наведении на кнопку — теперь работает идеально */
.premium-liquid:hover ~ .banner-image,
.premium-liquid:focus-visible ~ .banner-image {
  transform: scale(1.04);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  pointer-events: none;
}

.banner-text {
  text-align: center;
  margin-bottom: 3rem;
  pointer-events: auto;
}

.banner-intro {
  font-size: clamp(0.6rem, 1.1vw, 0.75rem);
  font-weight: 500;
  color: #b5f240;
  text-transform: uppercase;
  letter-spacing: 0.32em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
  margin: -1rem 0 1.2rem 0;
}

.banner-title {
  font-size: clamp(1.1rem, 2.6vw, 1.75rem);
  font-weight: 600;
  color: white;
  text-shadow: 0 3px 10px rgba(0,0,0,0.7);
  line-height: 1.32;
  max-width: 680px;
  margin: 0 0 1rem 0;
}

.title-desktop { display: block; }
.title-mobile  { display: none; }

/* === ПРЕМИАЛЬНАЯ КНОПКА 2025 === */
.banner-button {
  pointer-events: auto;
}

.premium-liquid {
  position: relative;
  background: rgba(30, 30, 32, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid rgba(181, 242, 64, 0.4);
  color: white;
  font-weight: 600;
  font-size: clamp(1.05rem, 2.2vw, 1.15rem);
  padding: 1rem 3.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.45s ease;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: liquidSubtle 9s ease infinite;
}

.premium-liquid::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(181, 242, 64, 0.12) 30%,
    rgba(181, 242, 64, 0.25) 50%,
    rgba(181, 242, 64, 0.12) 70%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.premium-liquid:hover {
  border-color: #b5f240;
  background: rgba(40, 40, 44, 0.7);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(181, 242, 64, 0.25);
}

.premium-liquid:hover::before {
  transform: translateX(100%);
}

.premium-liquid:active {
  transform: translateY(-1px);
}

@keyframes liquidSubtle {
  0%, 100% { background: rgba(30, 30, 32, 0.55); }
  50%      { background: rgba(35, 35, 38, 0.65); }
}

/* Мобильная версия */
@media (max-width: 768px) {
  .title-desktop { display: none; }
  .title-mobile  { display: block; }

  .banner-overlay { padding: 1.5rem; }
  .banner-text    { margin-bottom: 2.5rem; }

  .premium-liquid {
    padding: 0.9rem 2.8rem;
    font-size: 1.1rem;
  }
}

.banner-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.15rem);
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  max-width: 560px;
  margin: 0;
}
</style>
