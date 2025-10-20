<template>
  <div class="feature-accordion">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="accordion-item"
    >
      <!-- Кнопка-заголовок, по которой кликаем -->
      <button
        class="pill-button"
        @click="toggle(index)"
        :aria-expanded="openIndex === index"
      >
        <div class="pill-icon-wrapper">
          <span class="pill-icon">{{ openIndex === index ? '−' : '+' }}</span>
        </div>
        <span class="pill-title">{{ item.title }}</span>
      </button>

      <!-- Контент, который появляется и исчезает -->
      <transition name="collapse">
        <div v-show="openIndex === index" class="content-box-wrapper">
          <div class="content-box">
            <p class="content-text">{{ item.content }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const items = ref([
  { id: 1, title: '1. Архитектура Проблем', content: 'Система автоматически распознаёт и классифицирует каждую проблему — от чистоты в зале до тона голоса сотрудника. Вы видите не хаос мнений, а ясную архитектуру боли и радости ваших клиентов. Это позволяет мгновенно отличать критические сбои от мелких недочетов.' },
  { id: 2, title: '2. Протокол «Анна»', content: 'Наш ИИ-ассистент Анна работает по 10-этапному протоколу эмпатичного общения. Она не просто собирает факты — она гасит негатив, проявляет заботу и превращает разгневанного клиента в лояльного союзника. Вы можете адаптировать её тон голоса, чтобы он на 100% соответствовал вашему бренду.' },
  { id: 3, title: '3. Матрица Эскалации', content: 'Вы сами решаете, кто и когда получает сигнал. Пролитый кофе — сообщение дежурному тренеру. Серьёзная угроза репутации — мгновенное уведомление лично вам. Это ваш пульт управления вниманием: вы фокусируетесь только на том, что действительно важно, и никогда не упускаете критических моментов.' },
  { id: 4, title: '4. Система Тикетов', content: 'Каждая проблема автоматически превращается в тикет с уникальным номером, категорией и ответственным. Вы видите весь жизненный цикл проблемы: от первого сигнала до финального «спасибо» от клиента. Это полная прозрачность и гарантия того, что ни одна жалоба не будет забыта.' },
  { id: 5, title: '5. Полномочия Системы', content: 'Вы проводите черту, где заканчивается автоматизация и начинается ваше человеческое решение. Анна может самостоятельно предлагать стандартные компенсации, но решения о крупных выплатах или нестандартных ситуациях всегда остаются за вами. Это автономность без потери контроля.' },
  { id: 6, title: '6. Протоколы Компенсаций', content: 'Настройте логику выдачи бонусов за разные типы сбоев. Система сама предложит гостю сертификат или скидку в точном соответствии с вашими правилами. Это превращает любой сбой из проблемы в возможность продемонстрировать исключительный сервис.' },
  { id: 7, title: '7. Метрики Успеха', content: 'Вы получаете доступ к дашборду, где в реальном времени отслеживаются ключевые показатели: среднее время решения проблемы, уровень удовлетворённости (NPS) после диалога, самые частые типы проблем. Вы управляете репутацией на основе данных, а не интуиции.' }
])

function toggle(index) {
  // Если кликнули по уже открытому элементу — закрываем его. Иначе — открываем новый.
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
/* Общий контейнер */
.feature-accordion {
  max-width: 600px;
  margin: auto;
  padding: 16px;
  background-color: #000;
  border-radius: 28px; /* Немного увеличим радиус для цельного вида */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 8px; /* Отступ между элементами аккордеона */
}

.accordion-item {
  width: 100%;
}

/* Стилизация кнопки-заголовка */
.pill-button {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  background-color: #1C1C1E;
  border: none;
  border-radius: 20px;
  color: #F2F2F7;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  user-select: none;
  transition: background-color 0.2s ease;
}

.pill-button:hover {
  background-color: #2C2C2E;
}

/* Иконка "+"/"-" */
.pill-icon-wrapper {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background-color: rgba(120, 120, 128, 0.3);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pill-icon {
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  color: #8A8A8E;
}

/* Стилизация выпадающего блока с контентом */
.content-box-wrapper {
  overflow: hidden; /* Обязательно для анимации высоты */
}

.content-box {
  margin-top: 8px; /* Отступ сверху от кнопки */
  background-color: #1C1C1E;
  border-radius: 20px;
  padding: 20px 24px;
}

.content-text {
  margin: 0;
  color: #EAEAEB;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}

/* Анимация схлопывания/раскрытия */
.collapse-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px; /* Задаем максимальную высоту для анимации */
}

.collapse-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
</style>
