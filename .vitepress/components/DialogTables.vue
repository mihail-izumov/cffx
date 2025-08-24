<script setup>
import { ref } from 'vue'
const tab = ref('a')
</script>

<div class="tabs-mr">
  <button :class="{ active: tab === 'a' }" @click="tab = 'a'" type="button">А. Критические проблемы</button>
  <button :class="{ active: tab === 'b' }" @click="tab = 'b'" type="button">Б. Суперсилы лидеров</button>
  <button :class="{ active: tab === 'c' }" @click="tab = 'c'" type="button">В. Конкурентная карта</button>
  <button :class="{ active: tab === 'd' }" @click="tab = 'd'" type="button">Г. 10 готовых запросов</button>
</div>

<div v-if="tab === 'a'">
<!-- Раздел А: Критические проблемы -->
| **Диалог** | **Проблема** | **Влияние** |
|---|---|---|
| **[Как увеличить скорость в 2 раза →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#10)** | **[Скорость обслуживания](/radar/signal/coffee-points-smr-2025/dashboard#а1-скорость-обслуживания)** | 31% жалоб = прямая потеря выручки |
| **[Как стандартизировать качество →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#11)** | **[Нестабильность кофе](/radar/signal/coffee-points-smr-2025/dashboard#а2-нестабильность-качества)** | 18% критики подрывает доверие к бренду |
| **[Как найти правильную цену →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#12)** | **[Ценовая дилемма](/radar/signal/coffee-points-smr-2025/dashboard#а3-восприятие-цены)** | 37% считают «дорого» — риск оттока массового сегмента |
</div>

<div v-if="tab === 'b'">
<!-- Раздел Б: Суперсилы лидеров -->
#### РАЗДЕЛ Б: Суперсилы лидеров («Зеленая зона»)
Декомпозиция ключевых конкурентных преимуществ

| **Диалог** | **Сеть** | **Суперсила** | **Секрет успеха** |
|---|---|---|---|
| **[Как масштабировать уют →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#13)** | **[Корж](/radar/signal/coffee-points-smr-2025/dashboard.html#б1-«корж»-технология-создания-эмоциональнои-связи)** | Эмоциональная связь (9/10) | «Домашняя» атмосфера + персональный сервис |
| **[Как построить систему →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#14)** | **[Skuratov](/radar/signal/coffee-points-smr-2025/dashboard#б2-skuratov-coffee-сила-в-системе-и-стабильности)** | Системность (9/10 кофе) | Стандартизация процессов + стабильность |
| **[Как создать культ бренда →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#15)** | **[Surf Coffee](/radar/signal/coffee-points-smr-2025/dashboard#б3-surf-coffee-мастерство-нишевого-брендинга)** | Нишевый брендинг (9/10 дизайн) | «Племя» молодежи + субкультурная эстетика |
| **[Как монетизировать локацию →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#16)** | **[White Cup](/radar/signal/coffee-points-smr-2025/dashboard#б4-white-cup-сила-уникального-места)** | Уникальность места (9/10 атмосфера) | «Дворик как в Европе» + destination place |
| **[Как доминировать по цене →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#17)** | **[Coffee Balance](/radar/signal/coffee-points-smr-2025/dashboard#б5-coffee-balance-стратегия-ценового-позиционирования)** | Ценовое позиционирование (8/10 цена/качество) | «Доступное качество» + массовый сегмент |
</div>

<div v-if="tab === 'c'">
<!-- Раздел В: Конкурентная карта -->
#### РАЗДЕЛ В: Конкурентная карта
Объективное позиционирование игроков по 10 ключевым критериям

| **Диалог** | **Критерий** | **🥇 Лидер** | **🥈 Второе место** | **🥉 Третье место** |
|---|---|---|---|---|
| **[Сравнить качество →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#18)** | [Качество кофе](/radar/signal/coffee-points-smr-2025/dashboard#в1-сравнение-по-качеству-кофе) | Skuratov (9) | Корж, Surf, White Cup (8) | Coffee Balance (6) |
| **[Сравнить атмосферу →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#19)** | [Атмосфера](/radar/signal/coffee-points-smr-2025/dashboard#в2-сравнение-по-атмосфере) | Корж, Surf, White Cup (9) | Skuratov (8) | Coffee Balance (7) |
| **[Сравнить сервис →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#20)** | [Сервис](/radar/signal/coffee-points-smr-2025/dashboard#в3-сравнение-по-сервису) | **Корж (9)** | Skuratov, White Cup (8) | Surf, Coffee Balance (7) |
| **[Сравнить скорость →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#21)** | [Скорость](/radar/signal/coffee-points-smr-2025/dashboard#в4-сравнение-по-скорости) | Skuratov, White Cup (8) | Корж, Surf (7) | Coffee Balance (6) |
| **[Сравнить выпечку →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#22)** | [Выпечка](/radar/signal/coffee-points-smr-2025/dashboard#в5-сравнение-по-выпечке) | **Корж (9)** | Surf (8) | Остальные (6-7) |
</div>

<div v-if="tab === 'd'">
<!-- Раздел Г: 10 готовых запросов -->
#### РАЗДЕЛ Г: 10 готовых запросов для исследования конкретных бизнес-задач

| **Диалог** | **Точка роста** | **Результат** | **Для кого** |
|---|---|---|---|
| **[Скорость → Выручка →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#0)** | [Операционная эффективность](/radar/signal/coffee-points-smr-2025/dashboard#г1-операционная-эффективность) | План устранения потерь от медленного сервиса | CEO, Ops-директор |
| **[Единый стандарт →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#1)** | [Стандартизация качества](/radar/signal/coffee-points-smr-2025/dashboard#г2-стандартизация-продукта) | Система контроля качества продукта | Технологи, R&D |
| **[Оцифровка атмосферы →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#2)** | [Масштабирование атмосферы](/radar/signal/coffee-points-smr-2025/dashboard#г3-масштабирование-бренда) | Чеклист элементов «уюта» для новых точек | Бренд-менеджеры |
| **[От лидерства к чеку →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#3)** | [Монетизация УТП](/radar/signal/coffee-points-smr-2025/dashboard#г4-монетизация-утп) | Кампании на основе восторженных отзывов | Маркетологи |
| **[Кто ваши клиенты →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#4)** | [Сегментация аудитории](/radar/signal/coffee-points-smr-2025/dashboard#г5-сегментация-аудитории) | 4 сценария потребления + персональные предложения | Стратеги |
| **[Расстановка сил →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#5)** | [Конкурентное позиционирование](/radar/signal/coffee-points-smr-2025/dashboard#г6-конкурентное-позиционирование) | Карта сил и слабостей всех игроков | Аналитики |
| **[Парадокс лояльности →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#6)** | [Управление лояльностью](/radar/signal/coffee-points-smr-2025/dashboard#г7-управление-лояльностью) | Анализ «любящих критиков» | HR, Customer Success |
| **[Цена как стратегия →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#7)** | [Гибкое ценообразование](/radar/signal/coffee-points-smr-2025/dashboard#г8-ценовая-стратегия) | Стратегии для разных сегментов | Финдиректор |
| **[Скрытые ниши →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#8)** | [B2B-возможности](/radar/signal/coffee-points-smr-2025/dashboard#г9-b2b-возможности) | Монетизация сегмента «цифровых кочевников» | Развитие бизнеса |
| **[Масштабирование →](https://www.perplexity.ai/search/vystupi-v-roli-konsultanta-po-DWXYrOxdTxChS3Akfde6_g#9)** | [Региональная экспансия](/radar/signal/coffee-points-smr-2025/dashboard#г10-региональная-экспансия) | Самара как модель для других городов | Инвесторы |
</div>


<style scoped>
.tabs-mr {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}
.tabs-mr button {
  padding: 7px 18px;
  border-radius: 8px;
  border: 1px solid rgba(200,255,90,0.28);
  background: #191c1b;
  color: #c8ff5a;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.15s;
  margin-right: 0;
}
.tabs-mr button.active {
  background: #c8ff5a;
  color: #191c1b;
  border-color: #c8ff5a;
}
.tabs-mr button:not(.active):hover {
  background: #232624;
}
</style>
