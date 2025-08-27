<script setup>
import { ref } from 'vue'

// Устанавливаем первую вкладку активной по умолчанию
const activeTab = ref('suppliers')
</script>

<template>
  <div class="tabs-mr">
    <button :class="{ active: activeTab === 'suppliers' }" @click="activeTab = 'suppliers'">
      Типы поставщиков
    </button>
    <button :class="{ active: activeTab === 'beans' }" @click="activeTab = 'beans'">
      Типы зерна
    </button>
  </div>
  <div class="panel-mr">
    <!-- Вкладка: Типы поставщиков -->
    <div v-show="activeTab === 'suppliers'" class="content-mr">
      <p><strong>Собственная обжарка ⚡:</strong> Локальный крафтовый обжарщик. <br><em>Примеры: Mosaic, UCO, White Cup, Lumos, Green Stag, Shu, Кофеваркин.</em></p>
      <p><strong>Федеральные сети 🏭:</strong> Сети с полным циклом обжарки. <br><em>Примеры: Skuratov Coffee Roasters, Surf Coffee Roasters, Stars Coffee Roasters.</em></p>
      <p><strong>Контрактная обжарка 🤝:</strong> Обжарка на стороне под своим брендом. <br><em>Примеры: Cofix, Coffee Like.</em></p>
      <p><strong>Внешние поставщики 📦:</strong> Крупные федеральные поставщики. <br><em>Примеры: Tasty Coffee, LEON (Coffee Bean).</em></p>
      <p><strong>Региональные поставщики 🔄:</strong> Несколько локальных поставщиков. <br><em>Примеры: UCO + Soldiers + Сварщица (8 Атомов), Алеф Трейд, "Разное".</em></p>
      <p><strong>Экспериментальные 🧪:</strong> Тестовые и необычные лоты. <br><em>Примеры: Muwa.</em></p>
    </div>

    <!-- Вкладка: Типы зерна -->
    <div v-show="activeTab === 'beans'" class="content-mr">
      <p><strong>Свой бренд 🏷️:</strong> Собственный бренд с уникальной рецептурой, упаковкой и позиционированием под маркой заведения (Private Brand).</p>
      <p><strong>Без бренда ⚪:</strong> Стандартное зерно без брендинга поставщика, в нейтральной упаковке (White Label).</p>
      <p><strong>Спешелти ⭐:</strong> Высококачественное зерно с уникальными характеристиками, часто лимитированные лоты и микроурожаи (Specialty).</p>
      <p><strong>Коммерция 📦:</strong> Массовое коммерческое зерно стандартного качества для широкого рынка (Commercial).</p>
      <p><strong>Эксперимент 🧪:</strong> Тестовые и экспериментальные лоты, часто для дегустаций и специальных мероприятий (Experimental).</p>
    </div>
  </div>
</template>

<style scoped>
.tabs-mr {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.tabs-mr button {
  appearance: none;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.92);
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
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
.panel-mr {
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  padding: 15px 16px;
}
.content-mr {
  color: rgba(255,255,255,0.92);
  font-size: 13px;
  line-height: 1.46;
}
/* Сделаем чуть больше отступ между параграфами для читаемости */
.content-mr p:not(:last-child) {
  margin-bottom: 12px;
}
.content-mr p {
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.88);
  line-height: 1.46;
}
.content-mr strong {
  font-weight: 600;
  color: #fff;
}
.content-mr em {
  font-style: normal;
  color: rgba(255,255,255,0.6);
}
</style>
