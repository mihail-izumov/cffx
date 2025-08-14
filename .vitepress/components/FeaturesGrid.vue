<template>
  <div class="features-grid">
    <!-- Карточка 1: Анализ компаний -->
    <div class="feature-card">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>
      <h3 class="feature-title">Анализ компаний в фокусе</h3>
      <p class="feature-description">
        Подробные кейсы успешных и провальных проектов: что делали правильно, какие ошибки совершали, ключевые факторы роста или падения. Учитесь на чужом опыте.
      </p>
      <a href="#" class="feature-button">Подробнее →</a>
    </div>

    <!-- Карточка 2: Обновления симулятора -->
    <div class="feature-card">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"></path></svg>
      </div>
      <h3 class="feature-title">Обновления симулятора</h3>
      <p class="feature-description">
        Регулярное добавление новых городов, локаций и функций. Первый доступ к бета-версиям инструментов и участие в тестировании новых возможностей.
      </p>
      <a href="#" class="feature-button">Подробнее →</a>
    </div>

    <!-- Карточка 3: Персональные рекомендации -->
    <div class="feature-card">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </div>
      <h3 class="feature-title">Персональные рекомендации</h3>
      <p class="feature-description">
        Индивидуальные советы от Анны, встроенные в интерфейс симулятора. Анализ ваших сценариев с предложениями по оптимизации и росту.
      </p>
      <a href="#" class="feature-button">Подробнее →</a>
    </div>

    <!-- Карточка 4: Обратная связь -->
    <div class="feature-card">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </div>
      <h3 class="feature-title">Участие в обратной связи</h3>
      <p class="feature-description">
        Предлагайте новые функции и влияйте на приоритеты разработки через опросы и интервью. Ваш опыт помогает улучшать платформу для всех.
      </p>
      <a href="#" class="feature-button">Подробнее →</a>
    </div>

    <!-- Карточка 5: Доступ к Чекапам -->
    <div class="feature-card">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </div>
      <h3 class="feature-title">Приоритетный доступ к Чекапам</h3>
      <p class="feature-description">
        Первоочередная запись на комплексную диагностику бизнеса от команды BREW с персональными рекомендациями по оптимизации.
      </p>
      <a href="#" class="feature-button">Подробнее →</a>
    </div>

    <!-- Карточка 6: Место в совете BREW -->
    <div class="feature-card">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      </div>
      <h3 class="feature-title">Место в совете BREW</h3>
      <p class="feature-description">
        Участвуйте в стратегических решениях платформы, влияйте на выбор партнеров и формируйте правила игры для всей отрасли.
      </p>
      <a href="#" class="feature-button">Подробнее →</a>
    </div>
  </div>
</template>

<style scoped>
/* Сетка для карточек. 
   'auto-fit' автоматически подбирает количество колонок.
   'minmax(320px, 1fr)' означает, что колонка будет не меньше 320px, 
   а на больших экранах займет равную часть доступного пространства (1fr).
   Это обеспечивает адаптивность и убирает горизонтальный скролл.
*/
.features-grid {
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
  gap: 1.5rem; 
  margin: 2rem 0;
}

.feature-card {
  background-color: #2d2d30;
  border: 2px solid #444444;
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column; /* Элементы внутри карточки выстраиваются в колонку */
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.feature-card:hover {
  transform: translateY(-6px);
  border-color: #C5F946;
  box-shadow: 0 12px 35px rgba(197, 249, 70, 0.15);
  background-color: #353538;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: #C5F946; /* Цвет иконки */
}

.feature-title {
  color: #ffffff;
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  margin: 0 0 16px 0;
  min-height: 52px; /* Резервируем место под 2 строки заголовка */
  border: none; /* Убираем стандартные стили для h3 в VitePress */
  padding: 0;
}

.feature-description {
  color: #a8a8a8;
  font-size: 0.94rem; /* 15px */
  line-height: 1.6;
  text-align: center;
  margin: 0;
  flex-grow: 1; /* Этот трюк заставляет описание занять все доступное место, отодвигая кнопку вниз */
}

.feature-button {
  margin-top: 24px;
  background-color: transparent;
  color: #C5F946;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 2px solid #555555;
  box-sizing: border-box;
  display: block;
}

.feature-button:hover {
  background-color: #C5F946;
  border-color: #C5F946;
  color: #000000;
  transform: translateY(-2px);
}
</style>
