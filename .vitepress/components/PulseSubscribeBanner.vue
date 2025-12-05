<template>
  <div class="investor-banner">
    <div class="banner-content" :class="{ 'is-hovered': isHovered }">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="banner-image"
      />
      <div class="banner-overlay">
        <div class="banner-inner">
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

.banner-content.is-hovered .banner-image {
  transform: scale(1.045);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.banner-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.2rem;
  width: 100%;
  max-width: 700px;
  text-align: center;
}

.banner-intro {
  font-size: clamp(0.62rem, 1.1vw, 0.76rem);
  font-weight: 500;
  color: #b5f240;
  text-transform: uppercase;
  letter-spacing: 0.34em;
  text-shadow: 0 2px 10px rgba(0,0,0,0.7);
}

.banner-title {
  font-size: clamp(1.15rem, 2.7vw, 1.8rem);
  font-weight: 600;
  color: white;
  text-shadow: 0 4px 16px rgba(0,0,0,0.8);
  line-height: 1.3;
  margin: 0;
}

.title-desktop { display: block; }
.title-mobile { display: none; }

.glass-pill {
  pointer-events: auto;
  position: relative;
  background: rgba(20, 20, 24, 0.68);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: none;
  border-radius: 9999px;
  padding: 1.05rem 3.6rem;
  font-weight: 600;
  font-size: clamp(1.08rem, 2.3vw, 1.2rem);
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.6);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
  box-shadow: 0 10px 35px rgba(0,0,0,0.45);
}

/* Чуть более заметная лаймовая обводка */
.glass-pill::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 9999px;
  padding: 2px;
  background: linear-gradient(90deg, #b5f240, #d0ff70, #95d428, #b5f240);
  background-size: 300% 300%;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  animation: flow 8s linear infinite;
  z-index: -1;
}

.glass-pill::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 4px;
  right: 4px;
  height: 32%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.14), transparent);
  border-radius: 9999px;
  pointer-events: none;
}

.glass-pill:hover {
  transform: translateY(-7px);
  background: rgba(30,30,35,0.8);
  box-shadow: 0 22px 55px rgba(0,0,0,0.55), 0 0 30px rgba(181,242,64,0.18);
}

.glass-pill:active {
  transform: translateY(-2px);
}

@keyframes flow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

@media (max-width: 768px) {
  .title-desktop { display: none; }
  .title-mobile { display: block; }
  .banner-overlay { padding: 1.6rem; }
  .banner-inner { gap: 1.9rem; }
  }
  .glass-pill {
    padding: 1rem 3rem;
    font-size: 1.15rem;
  }
}
</style>
