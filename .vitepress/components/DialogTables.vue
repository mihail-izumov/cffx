<script setup>
import { ref } from 'vue'
const activeTab = ref('problem')
</script>

<template>
  <div class="tabs-mr">
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

  <div class="tab-content-mr">
    <div v-show="activeTab === 'problem'">
      <h3>РАЗДЕЛ А: Критические проблемы</h3>
      <table class="custom-table-mr">
        <thead>
          <tr>
            <th>Диалог</th>
            <th>Проблема</th>
            <th>Влияние</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#10" target="_blank">Как увеличить скорость в 2 раза →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#а1-скорость-обслуживания"><strong>Скорость обслуживания</strong></a></td>
            <td>31% жалоб = прямая потеря выручки</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#11" target="_blank">Как стандартизировать качество →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#а2-нестабильность-качества"><strong>Нестабильность кофе</strong></a></td>
            <td>18% критики подрывает доверие к бренду</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#12" target="_blank">Как найти правильную цену →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#а3-восприятие-цены"><strong>Ценовая дилемма</strong></a></td>
            <td>37% считают «дорого» — риск оттока массового сегмента</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-show="activeTab === 'advantage'">
      <h3>РАЗДЕЛ Б: Суперсилы лидеров («Зеленая зона»)</h3>
      <p><strong>Декомпозиция ключевых конкурентных преимуществ</strong></p>
      <table class="custom-table-mr">
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
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#13" target="_blank">Как масштабировать уют →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard.html#б1-«корж»-технология-создания-эмоциональнои-связи"><strong>Корж</strong></a></td>
            <td>Эмоциональная связь (9/10)</td>
            <td>«Домашняя» атмосфера + персональный сервис</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#14" target="_blank">Как построить систему →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#б2-skuratov-coffee-сила-в-системе-и-стабильности"><strong>Skuratov</strong></a></td>
            <td>Системность (9/10 кофе)</td>
            <td>Стандартизация процессов + стабильность</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#15" target="_blank">Как создать культ бренда →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#б3-surf-coffee-мастерство-нишевого-брендинга"><strong>Surf Coffee</strong></a></td>
            <td>Нишевый брендинг (9/10 дизайн)</td>
            <td>«Племя» молодежи + субкультурная эстетика</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#16" target="_blank">Как монетизировать локацию →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#б4-white-cup-сила-уникального-места"><strong>White Cup</strong></a></td>
            <td>Уникальность места (9/10 атмосфера)</td>
            <td>«Дворик как в Европе» + destination place</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#17" target="_blank">Как доминировать по цене →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#б5-coffee-balance-стратегия-ценового-позиционирования"><strong>Coffee Balance</strong></a></td>
            <td>Ценовое позиционирование (8/10 цена/качество)</td>
            <td>«Доступное качество» + массовый сегмент</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-show="activeTab === 'competitors'">
      <h3>РАЗДЕЛ В: Конкурентная карта</h3>
      <p><strong>Объективное позиционирование игроков по 10 ключевым критериям</strong></p>
      <table class="custom-table-mr">
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
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#18" target="_blank">Сравнить качество →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в1-сравнение-по-качеству-кофе">Качество кофе</a></td>
            <td>Skuratov (9)</td>
            <td>Корж, Surf, White Cup (8)</td>
            <td>Coffee Balance (6)</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#19" target="_blank">Сравнить атмосферу →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в2-сравнение-по-атмосфере">Атмосфера</a></td>
            <td>Корж, Surf, White Cup (9)</td>
            <td>Skuratov (8)</td>
            <td>Coffee Balance (7)</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#20" target="_blank">Сравнить сервис →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в3-сравнение-по-сервису">Сервис</a></td>
            <td><strong>Корж (9)</strong></td>
            <td>Skuratov, White Cup (8)</td>
            <td>Surf, Coffee Balance (7)</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#21" target="_blank">Сравнить скорость →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в4-сравнение-по-скорости">Скорость</a></td>
            <td>Skuratov, White Cup (8)</td>
            <td>Корж, Surf (7)</td>
            <td>Coffee Balance (6)</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#22" target="_blank">Сравнить выпечку →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#в5-сравнение-по-выпечке">Выпечка</a></td>
            <td><strong>Корж (9)</strong></td>
            <td>Surf (8)</td>
            <td>Остальные (6-7)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-show="activeTab === 'growth'">
      <h3>РАЗДЕЛ Г: 10 готовых запросов для исследования конкретных бизнес-задач</h3>
      <table class="custom-table-mr">
        <thead>
          <tr>
            <th>Диалог</th>
            <th>Точка роста</th>
            <th class="col-result">Результат</th>
            <th class="col-who">Для кого</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#0" target="_blank">Скорость → Выручка →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г1-операционная-эффективность">Операционная эффективность</a></td>
            <td class="col-result">План устранения потерь от медленного сервиса</td>
            <td class="col-who">CEO, Ops-директор</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#1" target="_blank">Единый стандарт →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г2-стандартизация-продукта">Стандартизация качества</a></td>
            <td class="col-result">Система контроля качества продукта</td>
            <td class="col-who">Технологи, R&amp;D</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#2" target="_blank">Оцифровка атмосферы →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г3-масштабирование-бренда">Масштабирование атмосферы</a></td>
            <td class="col-result">Чеклист элементов «уюта» для новых точек</td>
            <td class="col-who">Бренд-менеджеры</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#3" target="_blank">От лидерства к чеку →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г4-монетизация-утп">Монетизация УТП</a></td>
            <td class="col-result">Кампании на основе восторженных отзывов</td>
            <td class="col-who">Маркетологи</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#4" target="_blank">Кто ваши клиенты →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г5-сегментация-аудитории">Сегментация аудитории</a></td>
            <td class="col-result">4 сценария потребления + персональные предложения</td>
            <td class="col-who">Стратеги</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#5" target="_blank">Расстановка сил →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г6-конкурентное-позиционирование">Конкурентное позиционирование</a></td>
            <td class="col-result">Карта сил и слабостей всех игроков</td>
            <td class="col-who">Аналитики</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#6" target="_blank">Парадокс лояльности →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г7-управление-лояльностью">Управление лояльностью</a></td>
            <td class="col-result">Анализ «любящих критиков»</td>
            <td class="col-who">HR, Customer Success</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#7" target="_blank">Цена как стратегия →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г8-ценовая-стратегия">Гибкое ценообразование</a></td>
            <td class="col-result">Стратегии для разных сегментов</td>
            <td class="col-who">Финдиректор</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#8" target="_blank">Скрытые ниши →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г9-b2b-возможности">B2B-возможности</a></td>
            <td class="col-result">Монетизация сегмента «цифровых кочевников»</td>
            <td class="col-who">Развитие бизнеса</td>
          </tr>
          <tr>
            <td><a href="https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#9" target="_blank">Масштабирование →</a></td>
            <td><a href="/radar/signal/coffee-points-smr-2025/dashboard#г10-региональная-экспансия">Региональная экспансия</a></td>
            <td class="col-result">Самара как модель для других городов</td>
            <td class="col-who">Инвесторы</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.tabs-mr {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.tabs-mr button {
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
.tabs-mr button:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.18);
}
.tabs-mr button.active {
  color: #0a0a0a;
  background: #c8ff5a;
  border-color: #c8ff5a;
  box-shadow: 0 0 0 2px rgba(200,255,90,0.25) inset;
}
.tab-content-mr {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 18px;
}
.custom-table-mr {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  font-size: 15px;
}
.custom-table-mr th,
.custom-table-mr td {
  border: 1px solid rgba(255,255,255,0.08);
  padding: 10px 12px;
}
.custom-table-mr th {
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.custom-table-mr tbody td {
  color: rgba(255,255,255,0.88);
}
.custom-table-mr tbody td a {
  color: #c8ff5a;
  text-decoration: none;
  border-bottom: 1px dashed rgba(200,255,90,0.46);
  font-weight: 600;
}
.custom-table-mr tbody td a:hover {
  opacity: .9;
}
.custom-table-mr .col-result {
  color: #fff;
  font-weight: 600;
}
.custom-table-mr .col-who {
  color: #bbb;
  font-weight: 400;
}
</style>
