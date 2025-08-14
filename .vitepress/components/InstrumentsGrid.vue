<template>
  <div class="cards-grid">
    <!-- Карточка 1: Кофейный Протокол -->
    <div class="product-card">
      <div class="card-content">
        <h3 class="card-title">Кофейный Протокол</h3>
        <p class="card-description">
          Открытая база знаний, содержащая коллективный опыт сотен кофеен. От выбора зерна до найма бариста — все, что нужно для создания бизнеса, который любят клиенты и боятся конкуренты.
        </p>
      </div>
      <a href="https://runscale.ru/brew/protocol.html" rel="noopener noreferrer" class="card-button">
        Больше
      </a>
    </div>
    <!-- Карточка 2: Индекс Роста -->
    <div class="product-card">
      <div class="card-content">
        <h3 class="card-title">Индекс Роста</h3>
        <p class="card-description">
          Единственная в отрасли система оценки, которая измеряет не размер, а потенциал роста компании. Попасть в Индекс — значит стать видимым для инвесторов, партнеров и лучших талантов рынка.
        </p>
      </div>
      <a href="https://runscale.ru/radar/overview.html" rel="noopener noreferrer" class="card-button">
        Больше
      </a>
    </div>
  </div>
</template>
<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.product-card {
  background-color: #2d2d30;
  border: 2px solid #444444;
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Распределяет пространство между контентом и кнопкой */
  transition: all 0.3s ease;
  box-sizing: border-box;
  min-height: 280px; /* Адаптированная высота */
}
.product-card:hover {
  transform: translateY(-6px);
  border-color: #C5F946;
  box-shadow: 0 12px 35px rgba(197, 249, 70, 0.15);
  background-color: #353538;
}
.card-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Позволяет этому блоку занять все доступное пространство */
}
.card-title {
  color: #ffffff;
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 16px 0;
  border: none; /* Убираем стандартную нижнюю границу для h3 в VitePress */
  padding: 0;
}
.card-description {
  color: #c7c7c7;
  font-size: 0.94rem; /* 15px */
  line-height: 1.6;
  margin: 0;
  flex-grow: 1; /* Описание растягивается, чтобы кнопка была внизу */
}
.card-button {
  margin-top: 24px;
  background-color: #C5F946;
  color: #000000;
  padding: 14px 18px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.94rem;
  text-align: center;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 2px solid #C5F946;
  display: block;
}
.card-button:hover {
  background-color: #ffffff;
  border-color: #ffffff;
  color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
}
</style>
