---
outline: false
---

# B-R-E-W

## Открытая платформа, чтобы масштабировать ваш кофейный бизнес. Бесплатно и навсегда.

Каждый владелец кофейни знает это чувство: ты один на один с рынком. Принимаешь решения, основываясь на интуиции и чужих советах. Этот путь полон дорогих ошибок.

Мы создали открытую платформу B-R-E-W, чтобы положить этому конец.

<div class="button-group">
  <a href="/brew/join" class="btn btn-primary" rel="noopener noreferrer">Подключиться</a>
  <a href="https://www.perplexity.ai/page/meta-franshiza-b-r-e-w-Tl5xfN_GREy2qFe4qDqSSg" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">НЕ франшиза</a>
</div>

<div style="text-align: center; margin: 2rem 0;">
  <img 
    src="/brew_intro_ban.svg" 
    alt="BREW intro"
    style="
      width: 100%;
      max-width: 800px;
      height: auto;
      border-radius: max(12px, min(24px, 3vw));
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    "
    onmouseover="this.style.transform='scale(1.02)'"
    onmouseout="this.style.transform='scale(1)'"
  />
</div>

## Новый способ строить и масштабировать кофейный бизнес

<div class="features-container">
  <div class="feature-card">
    <h3>Клонировать успех</h3>
    <p>Разберите бизнес-модели лидеров на атомы и заберите лучшие решения себе. Изучите стратегии конкурентов и адаптируйте их под свою нишу.</p>
  </div>
  
  <div class="feature-card">
    <h3>Найти точки роста</h3>
    <p>Превратите слабые места в источники силы, а жалобы клиентов — в дополнительную выручку. Найдите скрытые возможности для развития бизнеса.</p>
  </div>
  
  <div class="feature-card">
    <h3>Проверить на любом рынке</h3>
    <p>Узнайте, как ваша кофейня поведет себя в Самаре, Москве или на Луне. Сделайте свою идею неуязвимой и готовой к масштабированию.</p>
  </div>
</div>

## Видеть больше, угадывать меньше

Подключитесь к коллективному разуму кофейной индустрии. Масштабируйте свою сеть. Без паушальных взносов и роялти.

<script setup>
import { ref } from 'vue'
const activeTab = ref('problem')
</script>

<!-- Блок с кнопками для переключения вкладок -->
<div class="tabs">
  <button :class="{ active: activeTab === 'problem' }" @click="activeTab = 'problem'">
    🎯 Исправить проблему
  </button>
  <button :class="{ active: activeTab === 'advantage' }" @click="activeTab = 'advantage'">
    💪 Усилить преимущество
  </button>
  <button :class="{ active: activeTab === 'competitors' }" @click="activeTab = 'competitors'">
    🔍 Изучить конкурентов
  </button>
  <button :class="{ active: activeTab === 'growth' }" @click="activeTab = 'growth'">
    🚀 Найти рост
  </button>
</div>

<!-- Контент для вкладок -->
<div class="tab-content">

  <!-- Вкладка 1: Исправить проблему -->
  <div v-show="activeTab === 'problem'">
    <p><strong>Превратите жалобы клиентов в точки кратного роста</strong></p>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Диалог с Сигналом</th>
          <th>Какую задачу решаете</th>
          <th>Пример из Самары</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Увеличить скорость обслуживания</strong></td>
          <td>Устраняете потерю выручки в самые прибыльные часы.</td>
          <td>31% жалоб на медлительность — системная проблема распределения персонала в пики.</td>
        </tr>
        <tr>
          <td><strong>Стабилизировать продукт</strong></td>
          <td>Преодолеваете «плавающее» качество, разрушающее доверие.</td>
          <td>«Корж» страдал от нестабильного кофе (18% критики). Нужны стандарты, как у Skuratov.</td>
        </tr>
        <tr>
          <td><strong>Найти правильную цену</strong></td>
          <td>Решаете дилемму «дорого vs справедливо».</td>
          <td>37% считают «Корж» дорогим. Требуется гибкая стратегия для разных сегментов.</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Результат:</strong> Мгновенная диагностика того, что забирает ваши деньги прямо сейчас.</p>
  </div>

  <!-- Вкладка 2: Усилить преимущество -->
  <div v-show="activeTab === 'advantage'">
    <p><strong>Превратите магию в технологию</strong></p>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Диалог с Сигналом</th>
          <th>Какую задачу решаете</th>
          <th>Пример из Самары</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Масштабировать атмосферу</strong></td>
          <td>Превращаете неуловимый «уют» в воспроизводимый чек-лист.</td>
          <td>«Корж» — лидер по атмосфере (9/10). Декомпозиция от тактичности персонала до дизайна.</td>
        </tr>
        <tr>
          <td><strong>Построить систему</strong></td>
          <td>Внедряете процессы для предсказуемого качества.</td>
          <td>Skuratov — эталон системности (9/10 кофе). Строгие стандарты плюс стабильность.</td>
        </tr>
        <tr>
          <td><strong>Создать культ бренда</strong></td>
          <td>Строите преданное «племя» через уникальную эстетику.</td>
          <td>Surf Coffee — культ «серф-вайба». Не для всех, но с невероятной лояльностью ядра.</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Результат:</strong> Деконструируете чужие успехи. Делаете интуицию управляемой.</p>
  </div>

  <!-- Вкладка 3: Изучить конкурентов -->
  <div v-show="activeTab === 'competitors'">
    <p><strong>Получить объективную карту поля боя</strong></p>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Диалог с Сигналом</th>
          <th>Какую задачу решаете</th>
          <th>Пример из Самары</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Реальный лидер по продукту</strong></td>
          <td>Видите, кто действительно выигрывает, а кто создает видимость.</td>
          <td>Skuratov — объективный лидер по качеству кофе (9/10) vs атмосферные лидеры.</td>
        </tr>
        <tr>
          <td><strong>Экономика впечатлений</strong></td>
          <td>Понимаете, кто побеждает за эмоции и за счет чего.</td>
          <td>«Корж», Surf, White Cup делят лидерство по атмосфере, но разными путями.</td>
        </tr>
        <tr>
          <td><strong>Цена и скорость</strong></td>
          <td>Определяете стратегию: эффективность или премиальность.</td>
          <td>Coffee Balance — лидер по цене/качеству (8/10), жертвуя другими параметрами.</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Результат:</strong> Конец «туману войны». Четкое понимание, где вы и куда двигаться.</p>
  </div>

  <!-- Вкладка 4: Найти рост -->
  <div v-show="activeTab === 'growth'">
    <p><strong>Обнаружить скрытые сокровища</strong></p>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Диалог с Сигналом</th>
          <th>Какую задачу решаете</th>
          <th>Пример из Самары</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Монетизировать главное УТП</strong></td>
          <td>Превращаете лучший продукт в генератор прибыли.</td>
          <td>Выпечка «Коржа» (9/10) — недоиспользованная суперсила для роста среднего чека.</td>
        </tr>
        <tr>
          <td><strong>Найти новые ниши</strong></td>
          <td>Находите сегменты для обслуживания существующими активами.</td>
          <td>Готовый сегмент «цифровых кочевников» = B2B-продукт «кофейня как офис».</td>
        </tr>
        <tr>
          <td><strong>Подготовиться к экспансии</strong></td>
          <td>Используете один город как модель для системного входа в другие.</td>
          <td>Самарский кейс — типичная структура для десятков городов России.</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Результат:</strong> Новые источники дохода без лишних трат.</p>
  </div>
</div>

## Клонируйте успех

Применяйте лучший опыт рынка, чтобы расти по своим правилам.

<BrandCards />

→ [Все компании в фокусе](/radar/overview)


## Ваш личный стратегический тренажер

Мы не говорим вам, *как* варить кофе. Мы даем **умную систему**, чтобы ваша кофейня стала прибыльным и предсказуемым активом.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <div class="project-card">
    <div>
      <h3 style="color: #C5F946; margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Кто начинает с нуля</h3>
      <p style="margin: 0; line-height: 1.6; color: var(--vp-c-text-1);">Вы мечтаете о своей кофейне. Вы хотите избежать дорогих ошибок и запустить бизнес, который сразу начнет приносить радость, а не проблемы. B-R-E-W — это ваш самый короткий путь от идеи до первой прибыли. <br><br> Мы уже сделали всю сложную работу за вас.</p>
    </div>
    <a href="/brew/membership" class="project-button">
      Начать Бесплатно →
    </a>
  </div>

  <div class="project-card">
    <div>
      <h3 style="color: #C5F946; margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Кто уже в игре</h3>
      <p style="margin: 0; line-height: 1.6; color: var(--vp-c-text-1);">У вас уже есть кофейня, и скорее всего даже не одна. Вы знаете цену успеху и устали от операционной рутины. Вы хотите расти, систематизировать хаос и превратить свой бизнес в актив, который работает на вас. <br><br> B-R-E-W — это ваша операционная система для масштабирования.</p>
    </div>
    <a href="/brew/membership" class="project-button">
      Стать Инсайдером →
    </a>
  </div>

</div>


<style>
/* Контейнер для карточек */
.features-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 32px 0;
}

/* --- ОБНОВЛЁННЫЕ СТИЛИ КАРТОЧКИ --- */
.feature-card {
  /* 
    Изменено: Установлен конкретный светло-серый фон для светлой темы,
    чтобы карточка была видна на белом фоне страницы без обводки.
  */
  background-color: #f6f6f7;
  /* Изменено: Обводка убрана по вашему запросу. */
  border: none;
  border-radius: 12px;
  padding: 24px 20px;
  height: 100%;
}

/* Стили для ТЁМНОЙ темы */
:root.dark .feature-card {
  /* 
    Для тёмной темы используем стандартную переменную VitePress,
    она создаёт отличный контраст.
  */
  background-color: var(--vp-c-bg-soft);
}

/* --- ОБНОВЛЁННЫЕ СТИЛИ ЗАГОЛОВКА --- */
.feature-card h3 {
  /* 
    Изменено: Цвет для светлой темы теперь тёмный для лучшей читаемости.
    Используем переменную основного текста.
  */
  color: var(--vp-c-text-1);
  font-size: 15px;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
}

/* Цвет заголовка для ТЁМНОЙ темы */
:root.dark .feature-card h3 {
  /* Возвращаем ваш яркий цвет для тёмной темы, где он отлично смотрится */
  color: #c5f946;
}

.feature-card p {
  color: var(--vp-c-text-2); 
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .features-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>


<style>
/* --- КОНТЕЙНЕР ДЛЯ ГРУППЫ КНОПОК --- */
.button-group {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 24px 0;
}

/* --- ОБЩИЕ СТИЛИ ДЛЯ ВСЕХ КНОПОК --- */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}
.btn:hover {
  transform: translateY(-2px);
  text-decoration: none !important;
}

/* --- СТИЛЬ ОСНОВНОЙ КНОПКИ (ЯРКАЯ) --- */
.btn-primary {
  background-color: #C5F946 !important;
  color: #000 !important;
  border: none !important;
  box-shadow: none !important;
}
.btn-primary:hover {
  background-color: #b2de34 !important;
}

/* --- СТИЛИ ВТОРИЧНОЙ КНОПКИ --- */

/* СТИЛИ ДЛЯ СВЕТЛОЙ ТЕМЫ (почти сливается со светлым фоном) */
.button-group .btn-secondary {
  background-color: #f6f6f7 !important; /* Принудительно перебиваем стили VitePress */
  color: #666 !important;
  border: 1px solid #e5e5e5 !important;
  box-shadow: none !important;
}
.button-group .btn-secondary:hover {
  background-color: #eaeaeb !important;
  border-color: #ddd !important;
  color: #333 !important;
}

/* СТИЛИ ДЛЯ ТЕМНОЙ ТЕМЫ (как было - почти сливается с тёмным фоном) */
html.dark .button-group .btn-secondary {
  background-color: #2f2f32 !important;
  color: #a1a1aa !important;
  border: 1px solid #434349 !important;
  box-shadow: none !important;
}
html.dark .button-group .btn-secondary:hover {
  background-color: #434349 !important;
  border-color: #555 !important;
  color: #e0e0e0 !important;
}
</style>


<div class="brew-specs-container">

  <h1 class="main-specs-title">Характеристики <br> B-R-E-W</h1>

  <!-- Ключевые показатели -->
  <div class="specs-section">
    <h2 class="section-title">Ключевые показатели</h2>
    <div class="specs-grid four-cols">
      <div class="spec-item">
        <span class="spec-value">3,000 – 50,000</span>
        <p class="spec-label">Отзывов в базе (зависит от города)</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">20+</span>
        <p class="spec-label">Диалоговых сценариев (для каждого сигнала)</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">5-10 сек</span>
        <p class="spec-label">Среднее время ответа на запрос</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">24/7</span>
        <p class="spec-label">Доступность платформы</p>
      </div>
    </div>
  </div>

  <!-- Платформа B-R-E-W -->
  <div class="specs-section">
    <h2 class="section-title">Платформа B-R-E-W</h2>
    <div class="specs-grid four-cols">
      <div class="spec-item">
        <span class="spec-value">Мета-франшиза</span>
        <p class="spec-label">Тип</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">
          <a href="/brew/protocol">Открытая</a>
          </span>
        <p class="spec-label">Модель доступа</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">Бесплатно, навсегда</span>
        <p class="spec-label">Стоимость</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">(B)aseline, (R)oadmap, (E)xecute, (W)in</span>
        <p class="spec-label">Ключевой принцип</p>
      </div>
    </div>
  </div>

  <!-- Аналитическое ядро: Кофейный Протокол -->
  <div class="specs-section">
    <h2 class="section-title">Аналитическое ядро: Кофейный Протокол</h2>
    <div class="specs-grid three-cols">
      <div class="spec-item">
        <span class="spec-value">Отзывы реальных клиентов</span>
        <p class="spec-label">Источник данных</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">Обработка естественного языка (NLP)</span>
        <p class="spec-label">Метод анализа</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">
          <a href="/radar/who-is-anna">Анна</a>
          </span>
        <p class="spec-label">ИИ-ассистент</p>
      </div>
    </div>
    <div class="criteria-section">
      <span class="spec-value-full">Качество кофе, Атмосфера, Сервис, Скорость, Выпечка, Цена/качество, Дизайн, Локация, Бренд, Чистота</span>
      <p class="spec-label">10 ключевых критериев анализа</p>
    </div>
  </div>

  <!-- Симулятор Роста -->
  <div class="specs-section">
    <h2 class="section-title">Симулятор Роста</h2>
    <div class="specs-grid four-cols">
        <div class="spec-item">
            <span class="spec-value">
            <a href="/radar/signal/log">Сигналы Радара</a>
            </span>
            <p class="spec-label">Инструмент</p>
        </div>
        <div class="spec-item">
            <span class="spec-value">Тестирование бизнес-моделей</span>
            <p class="spec-label">Назначение</p>
        </div>
        <div class="spec-item">
            <span class="spec-value">Самара // Фокус на «Корж»</span>
            <p class="spec-label">Доступные сигналы</p>
        </div>
        <div class="spec-item">
            <span class="spec-value">Новосибирск, Москва, СПб, Сочи +</span>
            <p class="spec-label">Работает Радар</p>
        </div>
    </div>
  </div>

  <!-- Интерфейс и Взаимодействие -->
  <div class="specs-section">
    <h2 class="section-title">Интерфейс и Взаимодействие</h2>
    <div class="specs-grid three-cols">
      <div class="spec-item">
        <span class="spec-value">Диалоговый чат в Perplexity (Web/App)</span>
        <p class="spec-label">Основной интерфейс</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">Обмен ссылками на сессии или их части по выбору пользователя</span>
        <p class="spec-label">Совместная работа</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">Диалог, таблицы, чек-листы</span>
        <p class="spec-label">Формат вывода</p>
      </div>
    </div>
  </div>

  <!-- Расширенные услуги -->
  <div class="specs-section">
    <h2 class="section-title">Расширенные услуги</h2>
    <div class="specs-grid three-cols">
      <div class="spec-item">
        <span class="spec-value">
          <a href="/about/company">Модуль Роста®</a>
          </span>
        <p class="spec-label">Система-партнер</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">
          <a href="/checkup/overview">Чекап</a>, 
          <a href="/system/overview">Система Роста Бизнеса</a>
        </span>
        <p class="spec-label">Доступные услуги</p>
      </div>
      <div class="spec-item">
        <span class="spec-value">По запросу, после работы с платформой</span>
        <p class="spec-label">Условия доступа</p>
      </div>
    </div>
  </div>

</div>

<style>
  .brew-specs-container {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    background-color: #000;
    color: #fff;
    padding: 64px 24px;
    max-width: 1128px;
    margin: 0 auto;
    border-radius: 16px;
  }
  .main-specs-title {
    font-size: 36px;
    font-weight: 600;
    text-align: left;
    margin: 0 0 56px 0;
  }
  .specs-section {
    margin-bottom: 56px;
  }
  .section-title {
    font-size: 28px;
    font-weight: 500;
    color: #fff;
    margin: 0 0 24px 0;
    padding: 0;
  }
  .specs-grid {
    display: grid;
    gap: 32px;
    padding-left: 0;
  }
  .specs-grid.four-cols {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  .specs-grid.three-cols {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  .spec-item .spec-label {
    font-size: 14px;
    font-weight: 500;
    color: #5c5e62;
    line-height: 1.4;
    margin: 0;
    padding: 0;
  }
  .spec-item .spec-value {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    line-height: 1.4;
    margin-bottom: 4px;
  }
  .criteria-section {
    margin-top: 32px;
  }
  .criteria-section .spec-label {
    font-size: 14px;
    font-weight: 500;
    color: #5c5e62;
    line-height: 1.4;
    margin: 0;
    padding: 0;
  }
  .criteria-section .spec-value-full {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    line-height: 1.4;
    margin-bottom: 4px;
    overflow-wrap: break-word;
    word-break: break-word;
  }
</style>

<br>

<div style="text-align: center; margin: 2rem 0;">
  <img 
    src="/brew_outro_ban.webp" 
    alt="BREW intro"
    style="
      width: 100%;
      max-width: 800px;
      height: auto;
      border-radius: max(12px, min(24px, 3vw));
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    "
    onmouseover="this.style.transform='scale(1.02)'"
    onmouseout="this.style.transform='scale(1)'"
  />
</div>

### Ваша Умная Кофейня. Начинается Здесь.

<style>
/* --- ОБЩИЕ СТИЛИ ДЛЯ ВСЕХ КНОПОК --- */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  margin: 10px 0;
}

.btn:hover {
  transform: translateY(-2px);
  text-decoration: none !important;
}

/* --- СТИЛЬ ОСНОВНОЙ КНОПКИ (ЯРКАЯ) --- */
.btn-primary {
  background-color: #C5F946; /* Яркий лаймовый */
  color: #000 !important;
}

.btn-primary:hover {
  background-color: #347b6c; /* Темный при наведении */
  color: white !important;
}

/* --- Контейнер для отдельной кнопки --- */
.start-button-container {
  margin: 20px 0;
  text-align: left;
}

.start-button-container .btn {
  display: inline-block;
  margin: 0;
}
</style>
