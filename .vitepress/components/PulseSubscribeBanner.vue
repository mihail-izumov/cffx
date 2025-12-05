<template>
  <div class="investor-banner">
    <div class="banner-content" :class="{ 'is-hovered': isHovered }">
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
          class="glass-pill"
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
  title: { type: String, default: 'Еще больше возможностей быть ближе к бизнесу, который вы любите.' },
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
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Зум фона только когда наводим на кнопку */
.banner-content.is-hovered .banner-image {
  transform: scale(1.045);
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

/* Кнопка — чистый лайм + тонкое свечение сверху + минимум размытия */
.glass-pill {
  pointer-events: auto;
  position: relative;
  background: rgba(25, 25, 28, 0.5);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border: 1.6px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  padding: 1rem 3.4rem;
  font-weight: 600;
  font-size: clamp(1.05rem, 2.2vw, 1.18rem);
  color: #d0ff70;
  cursor: pointer;
  transition: all 0.45s ease;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
}

/* Живой лаймовый бордер */
.glass-pill::before {
  content: '';
  position: absolute;
  inset: -1.6px;
  background: linear-gradient(90deg, #b5f240, #d4ff80, #95d428, #b5f240);
  background-size: 300% 100%;
  border-radius: 9999px;
  z-index: -1;
  animation: flow 6s ease infinite;
}

/* Очень тонкое свечение сверху (как у Apple) */
.glass-pill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 22%;
  background: linear-gradient(to bottom, rgba(181,242,64,0.18), transparent);
  border-radius: 9999px;
  pointer-events: none;
}

.glass-pill:hover {
  transform: translateY(-5px);
  background: rgba(35,35,38,0.65);
  box-shadow: 0 18px 45px rgba(181,242,64,0.28);
}

.glass-pill:active {
  transform: translateY(-1px);
}

@keyframes flow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

/* Мобильная версия */
@media (max-width: 768px) {
  .title-desktop { display: none; }
  .title-mobile  { display: block; }
  .banner-overlay { padding: 1.5rem; }
  .banner-text    { margin-bottom: 2.5rem; }
  .glass-pill {
    padding: 0.9rem 2.8rem;
    font-size: 1.1rem;
  }
}

.banner-subtitle {
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  color: rgba(255,255,255,0.9);
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
  max-width: 520px;
  margin: 0;
}
</style>
