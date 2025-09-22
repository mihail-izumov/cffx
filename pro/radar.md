---
outline: false
prev: false
next: false
title: Радар
notification: brew
---

# Радар

## Анализ конкурентов в реальном времени

### Видеть рынок → Находить возможности → Расти в выручке

<div class="button-group">
  <a href="/pro/radar.от-хаоса-—-к-росту" class="btn btn-primary" rel="noopener noreferrer"><strong>Подключить</strong></a>
  <a href="/invest/sim" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Тест-драйв</a>
</div>

## Видеть больше, угадывать меньше

### Анализ конкурентов через отзывы 2ГИС/Яндекс

Не просто отчеты, а четкая карта сильных и слабых сторон кофейни. Пошаговый план изменений, основанный на реальных данных, а не на догадках.

<br>

<RadarStrategyTabs />

## Как работает

Каждый день вы принимаете десятки решений: какое меню предложить, как обучить персонал, куда вложить деньги, почему клиенты не возвращаются. При этом опираетесь на собственные ощущения, мнения сотрудников или советы знакомых. 

Но ваши гости уже знают ответы на все вопросы. Они каждый день оставляют сотни честных отзывов о вас и ваших конкурентах. 

**Радар превращает этот хаос мнений в четкую карту действий для роста выручки вашей кофейни.**

<DialogsHowItWorks />

## Что ожидать в первые 30 дней

Фокусируемся на вас, потому что нет одинаковых кофеен. Используем сигналы рынка, чтобы узнать, где конкуренты зарабатывают ваши деньги, и что сделать, чтобы их гости стали вашими. 
<br>

<BrewFirst30Days />

## Где конкуренты зарабатывают ваши деньги

<RadarFeatures />

## Тарифы

<RadarTarifs />

<div align="center">
  
## От хаоса — к росту

</div>

<RadarForm />

<style>
/* --- СТИЛИ ДЛЯ ТАБЛИЦ --- */

/* Контейнер таблицы оборачиваем для скролла */
.radar-signals-table {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Общие правила для таблицы "Сигналы Радара" */
.radar-signals-table table {
  width: 100%;
  /* Минимальная ширина гарантирует, что таблица не сожмется и появится скролл на мобильных */
  min-width: 650px; 
  table-layout: fixed;
  border-collapse: collapse;
}

/* Стили для ячеек для аккуратного вида */
.radar-signals-table th,
.radar-signals-table td {
  padding: 12px 15px;
  vertical-align: top; /* Выравнивание по верху — лучший вариант при разной высоте строк */
  text-align: left;
}

/* Столбец 1 ("Период"): Фиксированная ширина, без переноса */
.radar-signals-table td:nth-child(1) {
  width: 130px;
  white-space: nowrap;
}

/* Столбец 2 ("Сигнал Радара"): ГЛАВНОЕ ИЗМЕНЕНИЕ. 
   Убираем сложное ограничение по строкам и просто разрешаем тексту свободно переноситься. */
.radar-signals-table td:nth-child(2) {
  width: 350px;
  white-space: normal; /* Разрешаем перенос текста */
  word-break: break-word; /* Разрешаем перенос для длинных слов */
}

/* Столбец 3 ("Статус"): Фиксированная ширина, без переноса */
.radar-signals-table td:nth-child(3) {
  width: 170px;
  white-space: nowrap;
}

/* Таблица сравнения "ДО/ПОСЛЕ" (остается без изменений) */
.comparison-table table {
  table-layout: fixed;
  width: 100%;
}
.comparison-table td {
  width: 50%;
  word-break: break-word;
}

/* --- ОБЩИЕ СТИЛИ ДЛЯ ВСЕХ КНОПОК (остаются без изменений) --- */
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

/* --- СТИЛЬ 1: ОСНОВНАЯ КНОПКА (ЯРКАЯ) --- */
.btn-primary {
  background-color: #C5F946; /* Яркий лаймовый */
  color: #000 !important;
}

.btn-primary:hover {
  background-color: #347b6c; /* Темный при наведении */
  color: white !important;
}

/* --- СТИЛЬ 2: ВТОРОСТЕПЕННАЯ КНОПКА (ТЕМНАЯ) --- */
.btn-secondary {
  background-color: #347b6c; /* Темный */
  color: white !important;
}

.btn-secondary:hover {
  background-color: #C5F946; /* Яркий при наведении */
  color: #000 !important;
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
