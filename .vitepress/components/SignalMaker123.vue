<template>
  <div class="features-container-pro">
    <div 
      v-for="(card, index) in cards" 
      :key="card.title" 
      class="feature-card-pro"
    >
      <div class="card-image-wrapper">
        <img :src="card.imgSrc" :alt="card.imgAlt" class="card-image">
      </div>
      <div class="card-content">
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
        <!-- Ссылка только в первой карточке -->
        <a
          v-if="index === 0"
          href="/pro/customize"
          class="card-link-custom"
        >
          Настроить <br> Свой Сигнал
          <span class="arrow-icon-custom" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const cards = [
  {
    title: '1. Сейчас: зарезервируйте место.',
    description: '₽30,000 (полностью возмещаемый) занимайте свое место в очереди – больше не нужно ничего настраивать. Мы сообщим, когда придет время для теста.',
    imgSrc: '/benefits-*.*-ban.svg',
    imgAlt: 'Зарезервируйте место'
  },
  {
    title: '2. Позже: Тест-драйв системы',
    description: 'Через 2-3 дня, выделите команду запуска, чтобы протестировать ваши Сигналы, например, работу виджета, ответы Анны и тикеты для команды.',
    imgSrc: '/benefits-100-ban.svg',
    imgAlt: 'Тест-драйв системы'
  },
  {
    title: '3. Уточнить настройки?',
    description: 'Адаптируем настройки под Ваш Бизнес перед запуском Сигнала за небольшую экстра-плату. Уточните важные детали в диалогах Анны и тикетах.',
    imgSrc: '/benefits-(0)-ban.svg',
    imgAlt: 'Уточнить настройки'
  }
];
</script>

<style scoped>
.features-container-pro {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 16px !important;
  margin: 32px 0 !important;
}

.feature-card-pro {
  background-color: #f6f6f7 !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  border: none !important;
}

:root.dark .feature-card-pro {
  background-color: var(--vp-c-bg-soft) !important;
}

.card-image-wrapper {
  width: 100% !important;
  aspect-ratio: 16 / 9 !important;
  background-color: #e0e0e0 !important;
}
:root.dark .card-image-wrapper {
    background-color: #2c2c2f !important;
}
.card-image {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}
.card-content {
  padding: 16px 20px 24px !important;
  flex-grow: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  text-align: left !important;
}
.feature-card-pro h4 {
  color: var(--vp-c-text-1) !important;
  font-size: 15px !important;
  line-height: 1.3 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 600 !important;
}
.feature-card-pro p {
  color: var(--vp-c-text-2) !important; 
  font-size: 12px !important;
  line-height: 1.5 !important;
  margin: 0 !important;
  flex-grow: 1 !important;
}
.card-link-custom {
  display: inline-block !important;
  text-align: left !important;
  margin-top: 18px !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 1.15 !important;
  color: #c5f946 !important;
  text-decoration: none !important;
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  letter-spacing: normal !important;
  padding: 0 !important;
  position: relative !important;
  z-index: 2 !important;
  cursor: pointer !important;
}
.card-link-custom br {
  display: block !important;
  content: "" !important;
  margin-bottom: -4px !important;
}
.arrow-icon-custom {
  display: inline-block !important;
  vertical-align: middle !important;
  transition: transform 0.22s cubic-bezier(.4,0,.2,1) !important;
  margin-left: 7px !important;
}
.card-link-custom:hover .arrow-icon-custom,
.card-link-custom:focus .arrow-icon-custom {
  transform: translateX(8px) !important;
}
.arrow-icon-custom svg {
  stroke: #c5f946 !important;
  display: block !important;
}
@media (max-width: 768px) {
  .features-container-pro {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}
</style>
