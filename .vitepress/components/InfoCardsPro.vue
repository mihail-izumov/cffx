<template>
  <!-- Контейнер для карточек -->
  <div class="features-container-pro">
    <!-- 
      Динамически создаем карточки, проходя по массиву 'cards'.
      :key - обязательный атрибут для производительности Vue.
    -->
    <div 
      v-for="card in cards" 
      :key="card.title" 
      class="feature-card-pro"
    >
      <div class="card-image-wrapper">
        <img :src="card.imgSrc" :alt="card.imgAlt" class="card-image">
      </div>
      <div class="card-content">
        <h4>{{ card.title }}</h4>
        <p>{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Данные для карточек. Легко редактировать и расширять.
const cards = [
  {
    title: 'Ваш бренд – Ваши правила',
    description: 'Мы не навязываем бренд, поставщиков или меню. Сигнал усиливает вашу уникальность, а не стирает ее. 100% контроля и творческой свободы остаются у вас.',
    imgSrc: '/benefits-*.*-ban.svg',
    imgAlt: 'Полная автономия'
  },
  {
    title: 'Без роялти и скрытых платежей',
    description: 'Классические франшизы забирают часть вашей прибыли. С Сигналом вы платите фиксированную сумму, и вся дополнительная прибыль, полученная с помощью наших технологий, остается у вас.',
    imgSrc: '/benefits-100-ban.svg',
    imgAlt: 'Рациональная экономика'
  },
  {
    title: 'Доступ к коллективному разуму',
    description: 'Вместо того чтобы совершать собственные ошибки, вы учитесь на сотнях чужих успехов и провалов. Сигнал дает доступ к аналитике и данным, которые раньше были доступны только крупным игрокам.',
    imgSrc: '/benefits-(0)-ban.svg',
    imgAlt: 'Информационное превосходство'
  }
];
</script>

<style scoped>
/* Атрибут "scoped" гарантирует, что эти стили не "протекут" за пределы компонента */

/* Контейнер для новых карточек */
.features-container-pro {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 32px 0;
}

/* Стили для новой карточки */
.feature-card-pro {
  background-color: #f6f6f7; /* Светлый фон для светлой темы */
  border-radius: 12px;
  overflow: hidden; /* Важно, чтобы скругление применилось к изображению */
  display: flex;
  flex-direction: column;
  border: none;
}

/* Стили для темной темы */
:root.dark .feature-card-pro {
  background-color: var(--vp-c-bg-soft);
}

/* Обертка для изображения */
.card-image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9; /* Гарантирует одинаковые пропорции картинок */
  background-color: #e0e0e0; /* Фон-заглушка на случай медленной загрузки */
}
:root.dark .card-image-wrapper {
    background-color: #2c2c2f;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Масштабирует изображение для заполнения контейнера */
  display: block;
}

/* Контент карточки (текст) */
.card-content {
  padding: 16px 20px 24px;
  flex-grow: 1; /* Позволяет блоку растягиваться, если карточки разной высоты */
}

/* Заголовок h4 в новой карточке */
.feature-card-pro h4 {
  color: var(--vp-c-text-1);
  font-size: 15px;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
}

/* Параграф в новой карточке */
.feature-card-pro p {
  color: var(--vp-c-text-2); 
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .features-container-pro {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
