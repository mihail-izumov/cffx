<script setup>
import { ref } from 'vue'
const activeTab = ref('problem')
</script>

<template>
  <!-- Блок с кнопками для переключения вкладок -->
  <div class="tabs">
    <button :class="{ active: activeTab === 'problem' }" @click="activeTab = 'problem'">
      🎯 Критические проблемы
    </button>
    <button :class="{ active: activeTab === 'advantage' }" @click="activeTab = 'advantage'">
      💪 Суперсилы лидеров
    </button>
    <button :class="{ active: activeTab === 'competitors' }" @click="activeTab = 'competitors'">
      🔍 Конкурентная карта
    </button>
    <button :class="{ active: activeTab === 'growth' }" @click="activeTab = 'growth'">
      🚀 Готовые запросы
    </button>
  </div>

  <!-- Контент для вкладок -->
  <div class="tab-content">

    <!-- Вкладка 1: Критические проблемы -->
    <div v-show="activeTab === 'problem'">
      <h3>РАЗДЕЛ А: Критические проблемы</h3>
      <table class="custom-table">
        <thead>
          <tr>
            <th>Диалог</th>
            <th>Проблема</th>
            <th>Влияние</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#10" target="_blank" rel="noopener">Как увеличить скорость в 2 раза →</a></strong></td>
            <td><strong><a href="/radar/signal/coffee-points-smr-2025/dashboard#а1-скорость-обслуживания">Скорость обслуживания</a></strong></td>
            <td>31% жалоб = прямая потеря выручки</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#11" target="_blank" rel="noopener">Как стандартизировать качество →</a></strong></td>
            <td><strong><a href="/radar/signal/coffee-points-smr-2025/dashboard#а2-нестабильность-качества">Нестабильность кофе</a></strong></td>
            <td>18% критики подрывает доверие к бренду</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#12" target="_blank" rel="noopener">Как найти правильную цену →</a></strong></td>
            <td><strong><a href="/radar/signal/coffee-points-smr-2025/dashboard#а3-восприятие-цены">Ценовая дилемма</a></strong></td>
            <td>37% считают «дорого» — риск оттока массового сегмента</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Вкладка 2: Суперсилы лидеров -->
    <div v-show="activeTab === 'advantage'">
      <h3>РАЗДЕЛ Б: Суперсилы лидеров («Зеленая зона»)</h3>
      <p><strong>Декомпозиция ключевых конкурентных преимуществ</strong></p>
      <table class="custom-table">
        <thead>
          <tr>
            <th>Диалог</th>
            <th>Сеть</th>
            <th>Суперсила</th>
            <th>Секрет успеха</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#13" target="_blank" rel="noopener">Как масштабировать уют →</a></strong></td>
            <td><strong><a href="/radar/signal/coffee-points-smr-2025/dashboard.html#б1-«корж»-технология-создания-эмоциональнои-связи">Корж</a></strong></td>
            <td>Эмоциональная связь (9/10)</td>
            <td>«Домашняя» атмосфера + персональный сервис</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#14" target="_blank" rel="noopener">Как построить систему →</a></strong></td>
            <td><strong><a href="/radar/signal/coffee-points-smr-2025/dashboard#б2-skuratov-coffee-сила-в-системе-и-стабильности">Skuratov</a></strong></td>
            <td>Системность (9/10 кофе)</td>
            <td>Стандартизация процессов + стабильность</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#15" target="_blank" rel="noopener">Как создать культ бренда →</a></strong></td>
            <td><strong><a href="/radar/signal/coffee-points-smr-2025/dashboard#б3-surf-coffee-мастерство-нишевого-брендинга">Surf Coffee</a></strong></td>
            <td>Нишевый брендинг (9/10 дизайн)</td>
            <td>«Племя» молодежи + субкультурная эстетика</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#16" target="_blank" rel="noopener">Как монетизировать локацию →</a></strong></td>
            <td><strong><a href="/radar/signal/coffee-points-smr-2025/dashboard#б4-white-cup-сила-уникального-места">White Cup</a></strong></td>
            <td>Уникальность места (9/10 атмосфера)</td>
            <td>«Дворик как в Европе» + destination place</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#17" target="_blank" rel="noopener">Как доминировать по цене →</a></strong></td>
            <td><strong><a href="/radar/signal/coffee-points-smr-2025/dashboard#б5-coffee-balance-стратегия-ценового-позиционирования">Coffee Balance</a></strong></td>
            <td>Ценовое позиционирование (8/10 цена/качество)</td>
            <td>«Доступное качество» + массовый сегмент</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Вкладка 3: Конкурентная карта -->
    <div v-show="activeTab === 'competitors'">
      <h3>РАЗДЕЛ В: Конкурентная карта</h3>
      <p><strong>Объективное позиционирование игроков по 10 ключевым критериям</strong></p>
      <table class="custom-table">
        <thead>
          <tr>
            <th>Диалог</th>
            <th>Критерий</th>
            <th>🥇 Лидер</th>
            <th>🥈 Второе место</th>
            <th>🥉 Третье место</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#18" target="_blank" rel="noopener">Сравнить качество →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в1-сравнение-по-качеству-кофе">Качество кофе</a></td>
            <td>Skuratov (9)</td>
            <td>Корж, Surf, White Cup (8)</td>
            <td>Coffee Balance (6)</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#19" target="_blank" rel="noopener">Сравнить атмосферу →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в2-сравнение-по-атмосфере">Атмосфера</a></td>
            <td>Корж, Surf, White Cup (9)</td>
            <td>Skuratov (8)</td>
            <td>Coffee Balance (7)</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#20" target="_blank" rel="noopener">Сравнить сервис →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в3-сравнение-по-сервису">Сервис</a></td>
            <td><strong>Корж (9)</strong></td>
            <td>Skuratov, White Cup (8)</td>
            <td>Surf, Coffee Balance (7)</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#21" target="_blank" rel="noopener">Сравнить скорость →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в4-сравнение-по-скорости">Скорость</a></td>
            <td>Skuratov, White Cup (8)</td>
            <td>Корж, Surf (7)</td>
            <td>Coffee Balance (6)</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#22" target="_blank" rel="noopener">Сравнить выпечку →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в5-сравнение-по-выпечке">Выпечка</a></td>
            <td><strong>Корж (9)</strong></td>
            <td>Surf (8)</td>
            <td>Остальные (6-7)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Вкладка 4: Готовые запросы -->
    <div v-show="activeTab === 'growth'">
      <h3>РАЗДЕЛ Г: 10 готовых запросов для исследования конкретных бизнес-задач</h3>
      <table class="custom-table">
        <thead>
          <tr>
            <th>Диалог</th>
            <th>Точка роста</th>
            <th>Результат</th>
            <th>Для кого</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#0" target="_blank" rel="noopener">Скорость → Выручка →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г1-операционная-эффективность">Операционная эффективность</a></td>
            <td>План устранения потерь от медленного сервиса</td>
            <td>CEO, Ops-директор</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#1" target="_blank" rel="noopener">Единый стандарт →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г2-стандартизация-продукта">Стандартизация качества</a></td>
            <td>Система контроля качества продукта</td>
            <td>Технологи, R&amp;D</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#2" target="_blank" rel="noopener">Оцифровка атмосферы →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г3-масштабирование-бренда">Масштабирование атмосферы</a></td>
            <td>Чеклист элементов «уюта» для новых точек</td>
            <td>Бренд-менеджеры</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#3" target="_blank" rel="noopener">От лидерства к чеку →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г4-монетизация-утп">Монетизация УТП</a></td>
            <td>Кампании на основе восторженных отзывов</td>
            <td>Маркетологи</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#4" target="_blank" rel="noopener">Кто ваши клиенты →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г5-сегментация-аудитории">Сегментация аудитории</a></td>
            <td>4 сценария потребления + персональные предложения</td>
            <td>Стратеги</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#5" target="_blank" rel="noopener">Расстановка сил →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г6-конкурентное-позиционирование">Конкурентное позиционирование</a></td>
            <td>Карта сил и слабостей всех игроков</td>
            <td>Аналитики</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#6" target="_blank" rel="noopener">Парадокс лояльности →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г7-управление-лояльностью">Управление лояльностью</a></td>
            <td>Анализ «любящих критиков»</td>
            <td>HR, Customer Success</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#7" target="_blank" rel="noopener">Цена как стратегия →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г8-ценовая-стратегия">Гибкое ценообразование</a></td>
            <td>Стратегии для разных сегментов</td>
            <td>Финдиректор</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#8" target="_blank" rel="noopener">Скрытые ниши →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г9-b2b-возможности">B2B-возможности</a></td>
            <td>Монетизация сегмента «цифровых кочевников»</td>
            <td>Развитие бизнеса</td>
          </tr>
          <tr>
            <td><strong><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#9" target="_blank" rel="noopener">Масштабирование →</a></strong></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г10-региональная-экспансия">Региональная экспансия</a></td>
            <td>Самара как модель для других городов</td>
            <td>Инвесторы</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.tabs button {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #191c1b;
  color: #c8ff5a;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.tabs button.active {
  background: #c8ff5a;
  color: #191c1b;
  border-color: #c8ff5a;
}
.tabs button:not(.active):hover {
  background: #232624;
}
.tab-content {
  background: #161716;
  border: 1px solid #232624;
  padding: 18px;
  border-radius: 12px;
}
.custom-table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
}
.custom-table th, .custom-table td {
  border: 1px solid #232624;
  padding: 10px 12px;
  color: #c8ff5a;
}
.custom-table th {
  background: #232624;
  color: #c8ff5a;
  text-align: left;
  font-weight: 700;
}
.custom-table tbody td a {
  color: #c8ff5a;
  border-bottom: 1px dashed rgba(200,255,90,0.45);
  text-decoration: none;
}
.custom-table tbody td a:hover {
  opacity: .9;
}
</style>
