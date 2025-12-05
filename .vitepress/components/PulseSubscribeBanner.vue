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

        <button class="glass-pill" @click="handleButtonClick">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ЗУМ ФОНА — теперь точно работает */
.banner-content:hover .banner-image {
  transform: scale(1.05);
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
  text-shadow: 0 3px 12px rgba(0,0,0,0.8);
  line-height: 1.32;
  max-width: 700px;
}

.title-desktop { display: block; }
.title-mobile  { display: none; }

/* САМАЯ КРАСИВАЯ КНОПКА 2025 */
.glass-pill {
  pointer-events: auto;
  position: relative;
  background: rgba(15, 15, 17, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.6px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  padding: 0.95rem 3.4rem;
  font-weight: 600;
  font-size: clamp(1.05rem, 2.2vw, 1.18rem);
  color: #c0ff5a;
  cursor: pointer;
  transition: all 0.5s ease;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
}

/* Живой лаймовый градиентный бордер */
.glass-pill::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(90deg, 
    #b5f240, 
    #d0ff70 30%, 
    #95d428 60%, 
    #b5f240
  );
  background-size: 200% 100%;
  border-radius: 9999px;
  z-index: -1;
  animation: borderFlow 5s ease infinite;
}

/* Тонкое внутреннее свечение — прижато к верху */
.glass-pill::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 40%;
  background: linear-gradient(to bottom, 
    rgba(181,242,64,0.22) 0%,
    transparent 100%
  );
  border-radius: 9999px;
  pointer-events: none;
}

.glass-pill:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(181,242,64,0.22);
  background: rgba(20,20,22,0.55);
}

.glass-pill:active {
  transform: translateY(-2px);
}

@keyframes borderFlow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .title-desktop { display: none; }
  .title-mobile  { display: block; }
  .banner-overlay { padding: 1.5rem; }
  .banner-text    { margin-bottom: 2.5rem; }
  .glass-pill {
    padding: 0.9rem 2.8rem;
    font-size: 1.12rem;
  }
}

.banner-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.15rem);
  color: rgba(255,255,255,0.92);
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  max-width: 560px;
  margin: 0;
}
</style>
