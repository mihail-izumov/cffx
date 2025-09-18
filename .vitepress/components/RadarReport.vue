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
      💪 Суперсилы конкурентов
    </button>
    <button :class="{ active: activeTab === 'competitors' }" @click="activeTab = 'competitors'">
      🔍 Конкурентная карта
    </button>
    <button :class="{ active: activeTab === 'growth' }" @click="activeTab = 'growth'">
      🚀 10 критериев оценки
    </button>
  </div>
  <div class="tab-content-mr">
    <div v-show="activeTab === 'problem'">
      <h3>Критические проблемы</h3>
      <table class="custom-table-mr">
        <thead>
          <tr>
            <th>Проблема</th>
            <th>Решение</th>
            <th>Контекст</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Скорость обслуживания</strong></td><td>Как увеличить скорость в 2 раза </td><td>31% жалоб = прямая потеря выручки</td></tr>
          <tr>
            <td><strong>Нестабильность кофе</strong></td><td>Как стандартизировать качество </td><td>18% критики подрывает доверие к бренду</td></tr>
          <tr>
            <td><strong>Ценовая дилемма</strong></td><td>Как найти правильную цену </td><td>37% считают «дорого» — риск оттока массового сегмента</td></tr>
        </tbody>
      </table>
    </div>
    <div v-show="activeTab === 'advantage'">
      <h3>Суперсилы конкурентов</h3>
      <p><strong>Декомпозиция ключевых конкурентных преимуществ</strong></p>
      <table class="custom-table-mr">
        <thead>
          <tr>
            <th>Решение</th>
            <th>Кокурент</th>
            <th>Суперсила</th>
            <th>Секрет успеха</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Как масштабировать уют </td>
            <td><strong>Корж</strong></td>
            <td>Эмоциональная связь (9/10)</td>
            <td>«Домашняя» атмосфера + персональный сервис</td>
          </tr>
          <tr>
            <td>Как построить систему </td>
            <td><strong>Skuratov</strong></td>
            <td>Системность (9/10 кофе)</td>
            <td>Стандартизация процессов + стабильность</td>
          </tr>
          <tr>
            <td>Как создать культ бренда </td>
            <td><strong>Surf Coffee</strong></td>
            <td>Нишевый брендинг (9/10 дизайн)</td>
            <td>«Племя» молодежи + субкультурная эстетика</td>
          </tr>
          <tr>
            <td>Как монетизировать локацию </td>
            <td><strong>White Cup</strong></td>
            <td>Уникальность места (9/10 атмосфера)</td>
            <td>«Дворик как в Европе» + destination place</td>
          </tr>
          <tr>
            <td>Как доминировать по цене </td>
            <td><strong>Coffee Balance</strong></td>
            <td>Ценовое позиционирование (8/10 цена/качество)</td>
            <td>«Доступное качество» + массовый сегмент</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="activeTab === 'competitors'">
      <h3>Конкурентная карта</h3>
      <p><strong>Объективное позиционирование игроков по 10 ключевым критериям</strong></p>
      <table class="custom-table-mr">
        <thead>
          <tr>
            <th>Решение</th>
            <th>Критерий</th>
            <th>🥇 Лидер</th>
            <th>🥈 Второе место</th>
            <th>🥉 Третье место</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Сравнить качество </td>
            <td>Качество кофе</td>
            <td>Skuratov (9)</td>
            <td>Корж, Surf, White Cup (8)</td>
            <td>Coffee Balance (6)</td>
          </tr>
          <tr>
            <td>Сравнить атмосферу </td>
            <td>Атмосфера</td>
            <td>Корж, Surf, White Cup (9)</td>
            <td>Skuratov (8)</td>
            <td>Coffee Balance (7)</td>
          </tr>
          <tr>
            <td>Сравнить сервис </td>
            <td>Сервис</td>
            <td><strong>Корж (9)</strong></td>
            <td>Skuratov, White Cup (8)</td>
            <td>Surf, Coffee Balance (7)</td>
          </tr>
          <tr>
            <td>Сравнить скорость </td>
            <td>Скорость</td>
            <td>Skuratov, White Cup (8)</td>
            <td>Корж, Surf (7)</td>
            <td>Coffee Balance (6)</td>
          </tr>
          <tr>
            <td>Сравнить выпечку </td>
            <td>Выпечка</td>
            <td><strong>Корж (9)</strong></td>
            <td>Surf (8)</td>
            <td>Остальные (6-7)</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="activeTab === 'growth'">
      <h3>Оценки гостей по 10 критериям</h3>
      <table class="custom-table-mr">
        <thead>
          <tr>
            <th>Решение</th>
            <th>Точка роста</th>
            <th class="col-result">Результат</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>Скорость  Выручка </td>
            <td>Операционная эффективность</td>
            <td class="col-result">План устранения потерь от медленного сервиса</td>
            </tr>
          <tr>
            <td>Единый стандарт </td>
            <td>Стандартизация качества</td>
            <td class="col-result">Система контроля качества продукта</td>
            </tr>
          <tr>
            <td>Оцифровка атмосферы </td>
            <td>Масштабирование атмосферы</td>
            <td class="col-result">Чеклист элементов «уюта» для новых точек</td>
            </tr>
          <tr>
            <td>От лидерства к чеку </td>
            <td>Монетизация УТП</td>
            <td class="col-result">Кампании на основе восторженных отзывов</td>
            </tr>
          <tr>
            <td>Кто ваши клиенты </td>
            <td>Сегментация аудитории</td>
            <td class="col-result">4 сценария потребления + персональные предложения</td>
            </tr>
          <tr>
            <td>Расстановка сил </td>
            <td>Конкурентное позиционирование</td>
            <td class="col-result">Карта сил и слабостей всех игроков</td>
            </tr>
          <tr>
            <td>Парадокс лояльности </td>
            <td>Управление лояльностью</td>
            <td class="col-result">Анализ «любящих критиков»</td>
            </tr>
          <tr>
            <td>Цена как стратегия </td>
            <td>Гибкое ценообразование</td>
            <td class="col-result">Стратегии для разных сегментов</td>
            </tr>
          <tr>
            <td>Скрытые ниши </td>
            <td>B2B-возможности</td>
            <td class="col-result">Монетизация сегмента «цифровых кочевников»</td>
            </tr>
          <tr>
            <td>Масштабирование </td>
            <td>Региональная экспансия</td>
            <td class="col-result">Самара как модель для других городов</td>
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
</style>
