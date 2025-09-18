<template>
  <div class="stz-tabs-root" data-stz="strategy-tabs">
    <!-- Кнопки вкладок -->
    <div class="stz-tabs-list" role="tablist" aria-label="Режимы анализа">
      <button
        class="stz-tab-btn"
        :class="{ 'is-active': activeTab === 'problem' }"
        @click="activeTab = 'problem'"
        role="tab"
        :aria-selected="activeTab === 'problem'"
      >
        🎯 Исправить проблему
      </button>
      <button
        class="stz-tab-btn"
        :class="{ 'is-active': activeTab === 'advantage' }"
        @click="activeTab = 'advantage'"
        role="tab"
        :aria-selected="activeTab === 'advantage'"
      >
        💪 Усилить преимущество
      </button>
      <button
        class="stz-tab-btn"
        :class="{ 'is-active': activeTab === 'competitors' }"
        @click="activeTab = 'competitors'"
        role="tab"
        :aria-selected="activeTab === 'competitors'"
      >
        🔍 Изучить конкурентов
      </button>
      <button
        class="stz-tab-btn"
        :class="{ 'is-active': activeTab === 'growth' }"
        @click="activeTab = 'growth'"
        role="tab"
        :aria-selected="activeTab === 'growth'"
      >
        🚀 Найти рост
      </button>
    </div>

    <!-- Контент вкладок -->
    <div class="stz-panels">
      <!-- Исправить проблему -->
      <div v-show="activeTab === 'problem'" role="tabpanel" class="stz-panel">
        <p class="stz-p"><strong>Превратите жалобы клиентов в точки кратного роста</strong></p>
        <div class="stz-table-wrap">
          <table class="stz-table" aria-label="Исправить проблему">
            <thead class="stz-thead">
              <tr class="stz-tr">
                <th class="stz-th">Диалог с Сигналом</th>
                <th class="stz-th">Какую задачу решаете</th>
                <th class="stz-th">Пример из Самары</th>
              </tr>
            </thead>
            <tbody class="stz-tbody">
              <tr class="stz-tr">
                <td class="stz-td"><strong>Увеличить скорость обслуживания</strong></td>
                <td class="stz-td">Устраняете потерю выручки в самые прибыльные часы.</td>
                <td class="stz-td">31% жалоб на медлительность — системная проблема распределения персонала в пики.</td>
              </tr>
              <tr class="stz-tr">
                <td class="stz-td"><strong>Стабилизировать продукт</strong></td>
                <td class="stz-td">Преодолеваете «плавающее» качество, разрушающее доверие.</td>
                <td class="stz-td">«Корж» страдал от нестабильного кофе (18% критики). Нужны стандарты, как у Skuratov.</td>
              </tr>
              <tr class="stz-tr">
                <td class="stz-td"><strong>Найти правильную цену</strong></td>
                <td class="stz-td">Решаете дилемму «дорого vs справедливо».</td>
                <td class="stz-td">37% считают «Корж» дорогим. Требуется гибкая стратегия для разных сегментов.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="stz-p"><strong>Результат:</strong> Мгновенная диагностика того, что забирает ваши деньги прямо сейчас.</p>
      </div>

      <!-- Усилить преимущество -->
      <div v-show="activeTab === 'advantage'" role="tabpanel" class="stz-panel">
        <p class="stz-p"><strong>Превратите магию в технологию</strong></p>
        <div class="stz-table-wrap">
          <table class="stz-table" aria-label="Усилить преимущество">
            <thead class="stz-thead">
              <tr class="stz-tr">
                <th class="stz-th">Диалог с Сигналом</th>
                <th class="stz-th">Какую задачу решаете</th>
                <th class="stz-th">Пример из Самары</th>
              </tr>
            </thead>
            <tbody class="stz-tbody">
              <tr class="stz-tr">
                <td class="stz-td"><strong>Масштабировать атмосферу</strong></td>
                <td class="stz-td">Превращаете неуловимый «уют» в воспроизводимый чек-лист.</td>
                <td class="stz-td">«Корж» — лидер по атмосфере (9/10). Декомпозиция от тактичности персонала до дизайна.</td>
              </tr>
              <tr class="stz-tr">
                <td class="stz-td"><strong>Построить систему</strong></td>
                <td class="stz-td">Внедряете процессы для предсказуемого качества.</td>
                <td class="stz-td">Skuratov — эталон системности (9/10 кофе). Строгие стандарты плюс стабильность.</td>
              </tr>
              <tr class="stz-tr">
                <td class="stz-td"><strong>Создать культ бренда</strong></td>
                <td class="stz-td">Строите преданное «племя» через уникальную эстетику.</td>
                <td class="stz-td">Surf Coffee — культ «серф-вайба». Не для всех, но с невероятной лояльностью ядра.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="stz-p"><strong>Результат:</strong> Деконструируете чужие успехи. Делаете интуицию управляемой.</p>
      </div>

      <!-- Изучить конкурентов -->
      <div v-show="activeTab === 'competitors'" role="tabpanel" class="stz-panel">
        <p class="stz-p"><strong>Получить объективную карту поля боя</strong></p>
        <div class="stz-table-wrap">
          <table class="stz-table" aria-label="Изучить конкурентов">
            <thead class="stz-thead">
              <tr class="stz-tr">
                <th class="stz-th">Диалог с Сигналом</th>
                <th class="stz-th">Какую задачу решаете</th>
                <th class="stz-th">Пример из Самары</th>
              </tr>
            </thead>
            <tbody class="stz-tbody">
              <tr class="stz-tr">
                <td class="stz-td"><strong>Реальный лидер по продукту</strong></td>
                <td class="stz-td">Видите, кто действительно выигрывает, а кто создает видимость.</td>
                <td class="stz-td">Skuratov — объективный лидер по качеству кофе (9/10) vs атмосферные лидеры.</td>
              </tr>
              <tr class="stz-tr">
                <td class="stz-td"><strong>Экономика впечатлений</strong></td>
                <td class="stz-td">Понимаете, кто побеждает за эмоции и за счет чего.</td>
                <td class="stz-td">«Корж», Surf, White Cup делят лидерство по атмосфере, но разными путями.</td>
              </tr>
              <tr class="stz-tr">
                <td class="stz-td"><strong>Цена и скорость</strong></td>
                <td class="stz-td">Определяете стратегию: эффективность или премиальность.</td>
                <td class="stz-td">Coffee Balance — лидер по цене/качеству (8/10), жертвуя другими параметрами.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="stz-p"><strong>Результат:</strong> Конец «туману войны». Четкое понимание, где вы и куда двигаться.</p>
      </div>

      <!-- Найти рост -->
      <div v-show="activeTab === 'growth'" role="tabpanel" class="stz-panel">
        <p class="stz-p"><strong>Обнаружить скрытые сокровища</strong></p>
        <div class="stz-table-wrap">
          <table class="stz-table" aria-label="Найти рост">
            <thead class="stz-thead">
              <tr class="stz-tr">
                <th class="stz-th">Диалог с Сигналом</th>
                <th class="stz-th">Какую задачу решаете</th>
                <th class="stz-th">Пример из Самары</th>
              </tr>
            </thead>
            <tbody class="stz-tbody">
              <tr class="stz-tr">
                <td class="stz-td"><strong>Монетизировать главное УТП</strong></td>
                <td class="stz-td">Превращаете лучший продукт в генератор прибыли.</td>
                <td class="stz-td">Выпечка «Коржа» (9/10) — недоиспользованная суперсила для роста среднего чека.</td>
              </tr>
              <tr class="stz-tr">
                <td class="stz-td"><strong>Найти новые ниши</strong></td>
                <td class="stz-td">Находите сегменты для обслуживания существующими активами.</td>
                <td class="stz-td">Готовый сегмент «цифровых кочевников» = B2B-продукт «кофейня как офис».</td>
              </tr>
              <tr class="stz-tr">
                <td class="stz-td"><strong>Подготовиться к экспансии</strong></td>
                <td class="stz-td">Используете один город как модель для системного входа в другие.</td>
                <td class="stz-td">Самарский кейс — типичная структура для десятков городов России.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="stz-p"><strong>Результат:</strong> Новые источники дохода без лишних трат.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('problem')
</script>

<style scoped>
/* Корневые переменные компонента */
.stz-tabs-root {
  --stz-brand: var(--vp-c-brand-1);
  --stz-bg: var(--vp-c-bg);
  --stz-bg-soft: var(--vp-c-bg-soft);
  --stz-bg-alt: var(--vp-c-bg-alt);
  --stz-text: var(--vp-c-text-1);
  --stz-divider: var(--vp-c-divider);
  --stz-radius: 12px;
  --stz-gap: 8px;
}

/* Сброс внутри компонента, без влияния на глобальные элементы */
.stz-tabs-root :where(.stz-tab-btn, .stz-table, .stz-th, .stz-td, .stz-p) {
  all: unset;
  box-sizing: border-box;
}

/* Восстановление нужных свойств */
.stz-tabs-root {
  width: 100%;
  box-sizing: border-box;
  color: var(--stz-text);
  background: transparent;
}

/* Список вкладок */
.stz-tabs-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--stz-gap);
  margin: 0 0 12px 0;
}

/* Кнопки вкладок */
.stz-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--stz-divider);
  background: var(--stz-bg-soft);
  color: var(--stz-text);
  font-weight: 600;
  line-height: 1.2;
  transition: background .2s ease, color .2s ease, border-color .2s ease, box-shadow .2s ease;
}

.stz-tab-btn:hover {
  border-color: var(--stz-brand);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--stz-brand) 20%, transparent);
}

.stz-tab-btn.is-active {
  background: var(--stz-brand);
  border-color: var(--stz-brand);
  color: #fff;
}

/* Панели */
.stz-panels {}

.stz-panel {
  display: block;
}

.stz-p {
  display: block;
  margin: 12px 0;
}

/* Таблица */
.stz-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--stz-radius);
}

.stz-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--stz-divider);
  border-radius: var(--stz-radius);
  background: var(--stz-bg);
  color: var(--stz-text);
  overflow: hidden;
  display: table;
}

.stz-thead .stz-th {
  background: var(--stz-bg-alt);
  color: var(--stz-text);
  text-align: left;
  padding: 10px 12px;
  font-weight: 700;
  border-bottom: 1px solid var(--stz-divider);
}

.stz-tbody .stz-td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--stz-divider);
  vertical-align: top;
}

.stz-tbody .stz-tr:last-child .stz-td {
  border-bottom: none;
}

/* Адаптив */
@media (max-width: 640px) {
  .stz-tabs-list {
    gap: 6px;
  }
  .stz-tab-btn {
    padding: 7px 10px;
    font-size: 14px;
  }
}
</style>
