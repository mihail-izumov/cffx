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

        <!-- Кнопка с жидкой анимацией -->
        <button
          class="banner-button liquid-btn"
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
  display: block;
  transition: transform 0.4s ease; /* плавный зум */
}

/* Зум картинки ТОЛЬКО при наведении на кнопку */
.banner-content:hover .banner-image {
  transform: none !important; /* отключаем старый зум */
}
.liquid-btn:hover ~ .banner-image,
.liquid-btn:focus ~ .banner-image {
  transform: scale(1.04);
}

/* Оверлей */
.banner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: max(12px, min(24px, 3vw));
  pointer-events: none; /* чтобы не мешал наведению на кнопку */
}

.banner-text {
  text-align: center;
  margin-bottom: 2.5rem;
  pointer-events: auto;
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

.title-desktop { display: block; }
.title-mobile  { display: none; }

/* Жидкая кнопка — огонь 2025 */
.banner-button {
  pointer-events: auto; /* включаем клики */
}
.liquid-btn {
  position: relative;
  background: linear-gradient(-45deg, #b5f240, #95d428, #85c41f, #b5f240);
  background-size: 400% 400%;
  color: #1a1a1a;
  border: none;
  padding: 0.85rem 3.4rem;
  border-radius: 16px;
  font-size: clamp(1.05rem, 2.2vw, 1.2rem);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 6px 20px rgba(181, 242, 64, 0.45);
  animation: liquidFlow 7s ease infinite;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(0,0,0,0.15);
  z-index: 2;
}

.liquid-btn::before {
  content: '';
  position: absolute;
  inset: -3px;
  background: linear-gradient(45deg, #d0ff70, #a0e040, #90d430, #d0ff70);
  border-radius: 19px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease;
  animation: liquidFlow 5s ease infinite reverse;
}

.liquid-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 32px rgba(181, 242, 64, 0.65);
  animation-duration: 2.8s;
}

.liquid-btn:hover::before {
  opacity: 0.7;
}

.liquid-btn:active {
  transform: translateY(-2px);
}

@keyframes liquidFlow {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

/* Мобильная версия */
@media (max-width: 768px) {
  .title-desktop { display: none; }
  .title-mobile  { display: block; }

  .banner-overlay { padding: 1rem; }
  .banner-text    { margin-bottom: 2rem; }
  .liquid-btn {
    padding: 0.75rem 2.6rem;
    font-size: 1.1rem;
  }
}

.banner-subtitle {
  font-size: clamp(0.85rem, 1.8vw, 1.1rem);
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  margin: 0;
  max-width: 500px;
}
</style>
