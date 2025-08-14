<template>
  <div class="brands-container">
    <!-- КАРТОЧКА: Симулятор города -->
    <div class="brand-card">
      <h3>Симулятор города</h3>
      <p class="description-main">
        Цифровая копия реального города с точными данными о локациях, конкурентах и проходимости
      </p>
      <p class="description-goals">
        Вы можете тестировать гипотезы, анализировать форматы и видеть прогноз выручки без финансовых рисков
      </p>
    </div>

    <!-- КАРТОЧКА: Тестирование бизнес-моделей -->
    <div class="brand-card">
      <h3>Тестирование бизнес-моделей</h3>
      <p class="description-main">
        Проверка различных концепций: от классической кофейни до коворкинга с кофе
      </p>
      <p class="description-goals">
        Симулятор показывает, какая модель принесет максимальную прибыль в конкретной локации
      </p>
    </div>

    <!-- КАРТОЧКА: Доступ к Кофейному Протоколу -->
    <div class="brand-card">
      <h3>Доступ к Кофейному Протоколу</h3>
      <p class="description-main">
        Открытая база знаний с проверенными практиками: оборудование, поставщики, персонал, маркетинг
      </p>
      <p class="description-goals">
        Коллективный опыт сотен кофеен, структурированный для немедленного применения
      </p>
    </div>

    <!-- КАРТОЧКА: Поддержка Анны при старте -->
    <div class="brand-card">
      <h3>Поддержка Анны при старте</h3>
      <p class="description-main">
        Персональная помощь создателя методологии BREW в интерпретации вашей первой симуляции
      </p>
      <p class="description-goals">
        Разъяснение результатов и рекомендации по действиям для максимально эффективного старта
      </p>
    </div>

    <!-- КАРТОЧКА: Ежемесячный обзор рынка -->
    <div class="brand-card">
      <h3>Ежемесячный обзор рынка</h3>
      <p class="description-main">
        Аналитический отчет о ключевых трендах, изменениях в поведении потребителей и сдвигах в отрасли
      </p>
      <p class="description-goals">
        Стратегическая информация для принятия опережающих решений
      </p>
    </div>

    <!-- КАРТОЧКА: Доступ к Индексу Роста -->
    <div class="brand-card">
      <h3>Доступ к Индексу Роста</h3>
      <p class="description-main">
        Система объективной оценки эффективности кофейных компаний на основе 15 ключевых метрик
      </p>
      <p class="description-goals">
        Отслеживайте динамику конкурентов и бенчмаркируйте собственные результаты
      </p>
    </div>

    <!-- КАРТОЧКА: Анализ компаний в фокусе -->
    <div class="brand-card">
      <h3>Анализ компаний в фокусе</h3>
      <p class="description-main">
        Подробные кейсы успешных и провальных проектов с анализом ключевых факторов роста или падения
      </p>
      <p class="description-goals">
        Возможность учиться на чужом опыте и избегать типичных ловушек
      </p>
    </div>

    <!-- КАРТОЧКА: Обновления симулятора -->
    <div class="brand-card">
      <h3>Обновления симулятора</h3>
      <p class="description-main">
        Регулярное добавление новых городов, локаций и функций
      </p>
      <p class="description-goals">
        Первый доступ к бета-версиям и участие в тестировании новых возможностей
      </p>
    </div>

    <!-- КАРТОЧКА: Персональные рекомендации -->
    <div class="brand-card">
      <h3>Персональные рекомендации</h3>
      <p class="description-main">
        Индивидуальные советы от Анны, встроенные непосредственно в интерфейс симулятора
      </p>
      <p class="description-goals">
        Анализ ваших конкретных сценариев с предложениями по оптимизации и росту
      </p>
    </div>

    <!-- КАРТОЧКА: Участие в обратной связи -->
    <div class="brand-card">
      <h3>Участие в обратной связи</h3>
      <p class="description-main">
        Предлагайте новые функции и влияйте на приоритеты разработки через опросы и интервью
      </p>
      <p class="description-goals">
        Ваш опыт помогает улучшать платформу для всех участников
      </p>
    </div>

    <!-- КАРТОЧКА: Приоритетный доступ к Чекапам -->
    <div class="brand-card">
      <h3>Приоритетный доступ к Чекапам</h3>
      <p class="description-main">
        Первоочередная запись на комплексную диагностику бизнеса от команды BREW
      </p>
      <p class="description-goals">
        Глубокий анализ с персональными рекомендациями по оптимизации и масштабированию
      </p>
    </div>

    <!-- КАРТОЧКА: Место в совете BREW -->
    <div class="brand-card">
      <h3>Место в совете BREW</h3>
      <p class="description-main">
        Участие в стратегических решениях платформы, влияние на выбор партнеров и направления исследований
      </p>
      <p class="description-goals">
        Статус сооснователя экосистемы и право формировать правила игры для всей отрасли
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Контейнер для сетки. Адаптивный, 3 колонки на больших экранах */
.brands-container {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); /* Уменьшена мин. ширина */
  gap: 16px !important;
  padding: 4px 0 12px 0 !important;
  margin: 24px 0 !important;
}

/* --- СТИЛИ КАРТОЧКИ --- */
.brand-card {
  background-color: #f5f5f7 !important;
  border-radius: 12px !important;
  padding: 20px 16px !important;
  border: none !important;
  display: flex;
  flex-direction: column;
}

/* В тёмной теме фон карточки */
:root.dark .brand-card {
    background-color: #2d2d30 !important;
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.brand-card h3 {
  color: #1a1a1a !important;
  font-size: 15px !important; /* Уменьшен шрифт */
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
}

:root.dark .brand-card h3 {
    color: #ffffff !important;
}

/* --- СТИЛИ ТЕКСТА --- */
/* Первая строка описания */
.description-main {
  color: #1a1a1a !important;
  font-size: 13px !important; /* Уменьшен шрифт */
  line-height: 1.6 !important;
  margin: 0 0 4px 0 !important;
  flex-grow: 1;
}

:root.dark .description-main {
    color: #ffffff !important; /* Изменен цвет на белый */
}

/* Текст с целями - серый */
.description-goals {
  color: #6b7280 !important;
  font-size: 12px !important; /* Уменьшен шрифт */
  line-height: 1.6 !important;
  margin: 0 !important;
}

:root.dark .description-goals {
    color: #8e8e93 !important;
}

/* Стиль для слова "Цели" (если понадобится) */
.description-goals strong {
  font-weight: 600;
  color: inherit !important;
}
</style>
