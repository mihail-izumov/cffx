<script setup>
import { ref } from 'vue'
const activeTab = ref('competitors')
</script>
<template>
  <div class="stz-root" data-stz="strategy-tabs">
    <!-- Кнопки вкладок -->
    <div class="stz-tabs-mr" role="tablist" aria-label="Режимы анализа">
      <button
        :class="{ active: activeTab === 'competitors' }"
        @click="activeTab = 'competitors'"
        role="tab"
        :aria-selected="activeTab === 'competitors'"
      >
        🔍 Изучить конкурентов
      </button>
      <button
        :class="{ active: activeTab === 'problem' }"
        @click="activeTab = 'problem'"
        role="tab"
        :aria-selected="activeTab === 'problem'"
      >
        🎯 Исправить проблему
      </button>
      <button
        :class="{ active: activeTab === 'advantage' }"
        @click="activeTab = 'advantage'"
        role="tab"
        :aria-selected="activeTab === 'advantage'"
      >
        💪 Усилить преимущество
      </button>
      <button
        :class="{ active: activeTab === 'growth' }"
        @click="activeTab = 'growth'"
        role="tab"
        :aria-selected="activeTab === 'growth'"
      >
        🚀 Найти рост
      </button>
    </div>
    <!-- Контент -->
    <div class="stz-content-mr">
      <!-- Вкладка 1: Изучить конкурентов -->
      <div v-show="activeTab === 'competitors'" role="tabpanel">
        <p><strong>Объективное позиционирование игроков по 10 ключевым критериям</strong></p>
        <table class="stz-table-mr" aria-label="Изучить конкурентов">
          <thead>
            <tr>
              <th>Решение</th>
              <th>🥇 Лидер</th>
              <th>🥈 Второе место</th>
              <th>🥉 Третье место</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Сравнить качество</td>
              <td>Skuratov (9)</td>
              <td>Корж, Surf, White Cup (8)</td>
              <td>Coffee Balance (6)</td>
            </tr>
            <tr>
              <td>Сравнить атмосферу</td>
              <td>Корж, Surf, White Cup (9)</td>
              <td>Skuratov (8)</td>
              <td>Coffee Balance (7)</td>
            </tr>
            <tr>
              <td>Сравнить сервис</td>
              <td>Корж (9)</td>
              <td>Skuratov, White Cup (8)</td>
              <td>Surf, Coffee Balance (7)</td>
            </tr>
            <tr>
              <td>Сравнить скорость</td>
              <td>Skuratov, White Cup (8)</td>
              <td>Корж, Surf (7)</td>
              <td>Coffee Balance (6)</td>
            </tr>
            <tr>
              <td>Сравнить выпечку</td>
              <td>Корж (9)</td>
              <td>Surf (8)</td>
              <td>Остальные (6-7)</td>
            </tr>
          </tbody>
        </table>
        
        <!-- Блок результата для конкурентов -->
        <div class="stz-result-block">
          <strong>Результат:</strong> Четкая карта позиций конкурентов — только факты из отзывов клиентов.
        </div>
      </div>
      
      <!-- Вкладка 2: Исправить проблему -->
      <div v-show="activeTab === 'problem'" role="tabpanel">
        <p><strong>Превратите жалобы клиентов в точки кратного роста</strong></p>
        <table class="stz-table-mr" aria-label="Исправить проблему">
          <thead>
            <tr>
              <th>Контекст</th>
              <th>Проблема</th>
              <th>Решение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>31% жалоб = прямая потеря выручки</td>
              <td><strong>Увеличить скорость обслуживания</strong></td>
              <td>Устраняете потерю выручки в самые прибыльные часы</td>
            </tr>
            <tr>
              <td>18% критики подрывает доверие к бренду</td>
              <td><strong>Стабилизировать продукт</strong></td>
              <td>Преодолеваете «плавающее» качество, разрушающее доверие</td>
            </tr>
            <tr>
              <td>37% считают «дорого» — риск оттока массового сегмента</td>
              <td><strong>Найти правильную цену</strong></td>
              <td>Решаете дилемму «дорого vs справедливо»</td>
            </tr>
          </tbody>
        </table>
        
        <!-- Блок результата для проблем -->
        <div class="stz-result-block">
          <strong>Результат:</strong> Мгновенная диагностика того, что забирает ваши деньги прямо сейчас.
        </div>
      </div>
      
      <!-- Вкладка 3: Усилить преимущество -->
      <div v-show="activeTab === 'advantage'" role="tabpanel">
        <p><strong>Превратите магию в технологию</strong></p>
        <table class="stz-table-mr" aria-label="Усилить преимущество">
          <thead>
            <tr>
              <th>Кофейня</th>
              <th>Суперсила</th>
              <th>Секрет успеха</th>
              <th>Решение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Корж</td>
              <td>Эмоциональная связь (9/10)</td>
              <td>«Домашняя» атмосфера + персональный сервис</td>
              <td><strong>Масштабировать атмосферу</strong></td>
            </tr>
            <tr>
              <td>Skuratov</td>
              <td>Системность (9/10 кофе)</td>
              <td>Стандартизация процессов + стабильность</td>
              <td><strong>Построить систему</strong></td>
            </tr>
            <tr>
              <td>Surf Coffee</td>
              <td>Нишевый брендинг (9/10 дизайн)</td>
              <td>«Племя» молодежи + субкультурная эстетика</td>
              <td><strong>Создать культ бренда</strong></td>
            </tr>
            <tr>
              <td>White Cup</td>
              <td>Уникальность места (9/10 атмосфера)</td>
              <td>«Дворик как в Европе» + destination place</td>
              <td><strong>Монетизировать локацию</strong></td>
            </tr>
            <tr>
              <td>Coffee Balance</td>
              <td>Ценовое позиционирование (8/10 цена/качество)</td>
              <td>«Доступное качество» + массовый сегмент</td>
              <td><strong>Доминировать по цене</strong></td>
            </tr>
          </tbody>
        </table>
        
        <!-- Блок результата для преимуществ -->
        <div class="stz-result-block">
          <strong>Результат:</strong> Точное понимание своих уникальных сильных сторон и план как использовать их для роста выручки.
        </div>
      </div>
      
      <!-- Вкладка 4: Найти рост -->
      <div v-show="activeTab === 'growth'" role="tabpanel">
        <p><strong>Обнаружить скрытые сокровища</strong></p>
        <table class="stz-table-mr" aria-label="Найти рост">
          <thead>
            <tr>
              <th>Инсайты</th>
              <th>Какую задачу решаете</th>
              <th>Контекст</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Монетизировать главное УТП</strong></td>
              <td>Превращаете лучший продукт в генератор прибыли</td>
              <td>Выпечка «Коржа» (9/10) — недоиспользованная суперсила для роста среднего чека</td>
            </tr>
            <tr>
              <td><strong>Найти новые ниши</strong></td>
              <td>Находите сегменты для обслуживания существующими активами</td>
              <td>Готовый сегмент «цифровых кочевников» = B2B-продукт «кофейня как офис»</td>
            </tr>
            <tr>
              <td><strong>Подготовиться к экспансии</strong></td>
              <td>Используете один город как модель для системного входа в другие</td>
              <td>Самарский кейс — типичная структура для десятков городов России</td>
            </tr>
          </tbody>
        </table>
        
        <!-- Блок результата для роста -->
        <div class="stz-result-block">
          <strong>Результат:</strong> Конкретные возможности роста выручки, которые скрыты от стандартной аналитики.
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Уникальный корень */
.stz-root {
  /* без внешних отступов и фона — интегрируется в страницу */
}
/* Панель табов: стиль из примера (tabs-mr) */
.stz-tabs-mr {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.stz-tabs-mr button {
  appearance: none;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.92);
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: all .2s ease;
}
.stz-tabs-mr button:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.18);
}
.stz-tabs-mr button.active {
  color: #0a0a0a;
  background: #c8ff5a;
  border-color: #c8ff5a;
  box-shadow: 0 0 0 2px rgba(200,255,90,0.25) inset;
}
/* Контейнер контента: стиль из примера (tab-content-mr) */
.stz-content-mr {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 18px;
}
/* Таблица: стиль из примера (custom-table-mr) */
.stz-table-mr {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  font-size: 15px;
}
.stz-table-mr th,
.stz-table-mr td {
  border: 1px solid rgba(255,255,255,0.08);
  padding: 10px 12px;
}
.stz-table-mr th {
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.stz-table-mr tbody td {
  color: rgba(255,255,255,0.88);
}
.stz-table-mr tbody td a {
  color: #c8ff5a;
  text-decoration: none;
  border-bottom: 1px dashed rgba(200,255,90,0.46);
  font-weight: 600;
}
.stz-table-mr tbody td a:hover {
  opacity: .9;
}
.stz-table-mr .col-result {
  color: #fff;
  font-weight: 600;
}

/* Стиль для блока результата */
.stz-result-block {
  margin-top: 16px;
  padding: 16px 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: rgba(255,255,255,0.95);
  font-size: 15px;
  line-height: 1.4;
}

.stz-result-block strong {
  color: #c8ff5a;
  font-weight: 700;
}
</style>
