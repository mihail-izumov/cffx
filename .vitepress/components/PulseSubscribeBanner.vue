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
  max-width: 720px;
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
.title-mobile  { display: none; }

/* ЖИДКОЕ СТЕКЛО APPLE 2025 — с заметной лаймовой обводкой и внутренним размытием */
.glass-pill {
  pointer-events: auto;
  position: relative;
  isolation: isolate;
  background: rgba(28, 28, 32, 0.58);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 9999px;
  padding: 1.15rem 3.8rem;
  font-weight: 600;
  font-size: clamp(1.1rem, 2.3vw, 1.22rem);
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.7);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
  box-shadow: 
    0 12px 40px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.08);
}

/* Заметная живая лаймовая обводка по всему периметру */
.glass-pill::before {
  content: '';
  position: absolute;
  inset: -2.5px;
  border-radius: 9999px;
  padding: 2.5px;
  background: linear-gradient(90deg, #b5f240, #e0ff80, #95d428, #b5f240);
  background-size: 300% 300%;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  animation: borderFlow 7s linear infinite;
  z-index: -1;
}

/* Внутреннее свечение + лёгкое боковое сияние (как у Apple) */
.glass-pill::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 9999px;
  background: linear-gradient(180deg,
    rgba(181,242,64,0.14) 0%,
    rgba(181,242,64,0.04) 30%,
    transparent 70%
  );
  pointer-events: none;
  z-index: -1;
}

/* Лёгкое боковое свечение (опционально, но очень красиво) */
.glass-pill > span {
  position: absolute;
  top: 50%;
  width: 30%;
  height: 60%;
  background: linear-gradient(90deg, transparent, rgba(181,242,64,0.08), transparent);
  filter: blur(12px);
  transform: translateY(-50%);
  opacity: 0.6;
  pointer-events: none;
}
.glass-pill > span:first-of-type { left: 0; }
.glass-pill > span:last-of-type { right: 0; }

.glass-pill:hover {
  transform: translateY(-8px);
  background: rgba(35,35,40,0.75);
  box-shadow: 
    0 24px 60px rgba(0,0,0,0.6),
    0 0 40px rgba(181,242,64,0.25);
}

.glass-pill:active {
  transform: translateY(-3px);
}

@keyframes borderFlow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .title-desktop { display: none; }
  .title-mobile  { display: block; }
  .banner-overlay { padding: 1.6rem; }
  .banner-inner { gap: 1.9rem; }
  .glass-pill {
    padding: 1.05rem 3.2rem;
    font-size: 1.16rem;
  }
}
</style>
