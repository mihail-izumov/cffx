<template>
  <div class="features-accordion">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="accordion-item"
      :class="{ 'is-open': openIndex === index }"
    >
      <div 
        class="accordion-header" 
        @click="toggle(index)"
      >
        <div class="header-content">
          <div class="icon-wrapper">
            <span class="icon">{{ openIndex === index ? '−' : '+' }}</span>
          </div>
          <h3>{{ item.title }}</h3>
        </div>
        <div class="chevron" :class="{ rotated: openIndex === index }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      
      <transition 
        name="accordion"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
      >
        <div v-show="openIndex === index" class="accordion-body">
          <div class="accordion-content">
            <p>{{ item.content }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const items = [
  {
    title: '1. Архитектура Проблем',
    content: 'Система автоматически распознаёт и классифицирует каждую проблему — от чистоты в зале до тона голоса сотрудника. Вы видите не хаос мнений, а ясную архитектуру боли и радости ваших клиентов. Это позволяет мгновенно отличать критические сбои от мелких недочетов.'
  },
  {
    title: '2. Протокол «Анна»',
    content: 'Наш ИИ-ассистент Анна работает по 10-этапному протоколу эмпатичного общения. Она не просто собирает факты — она гасит негатив, проявляет заботу и превращает разгневанного клиента в лояльного союзника. Вы можете адаптировать её тон голоса, чтобы он на 100% соответствовал вашему бренду.'
  },
  {
    title: '3. Матрица Эскалации',
    content: 'Вы сами решаете, кто и когда получает сигнал. Пролитый кофе — сообщение дежурному тренеру. Серьёзная угроза репутации — мгновенное уведомление лично вам. Это ваш пульт управления вниманием: вы фокусируетесь только на том, что действительно важно, и никогда не упускаете критических моментов.'
  },
  {
    title: '4. Система Тикетов',
    content: 'Каждая проблема автоматически превращается в тикет с уникальным номером, категорией и ответственным. Вы видите весь жизненный цикл проблемы: от первого сигнала до финального «спасибо» от клиента. Это полная прозрачность и гарантия того, что ни одна жалоба не будет забыта.'
  },
  {
    title: '5. Полномочия Системы',
    content: 'Вы проводите черту, где заканчивается автоматизация и начинается ваше человеческое решение. Анна может самостоятельно предлагать стандартные компенсации, но решения о крупных выплатах или нестандартных ситуациях всегда остаются за вами. Это автономность без потери контроля.'
  },
  {
    title: '6. Протоколы Компенсаций',
    content: 'Настройте логику выдачи бонусов за разные типы сбоев. Система сама предложит гостю сертификат или скидку в точном соответствии с вашими правилами. Это превращает любой сбой из проблемы в возможность продемонстрировать исключительный сервис.'
  },
  {
    title: '7. Метрики Успеха',
    content: 'Вы получаете доступ к дашборду, где в реальном времени отслеживаются ключевые показатели: среднее время решения проблемы, уровень удовлетворённости (NPS) после диалога, самые частые типы проблем. Вы управляете репутацией на основе данных, а не интуиции.'
  }
]

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const enter = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
  setTimeout(() => {
    el.style.height = el.scrollHeight + 'px'
    el.style.opacity = '1'
  }, 10)
}

const afterEnter = (el) => {
  el.style.height = 'auto'
}

const leave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  setTimeout(() => {
    el.style.height = '0'
    el.style.opacity = '0'
  }, 10)
}
</script>

<style scoped>
.features-accordion {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #000000;
  padding: 0;
}

.accordion-item {
  position: relative;
  background: rgba(45, 45, 45, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.accordion-item:first-child {
  border-radius: 20px 20px 0 0;
}

.accordion-item:last-child {
  border-bottom: none;
  border-radius: 0 0 20px 20px;
}

.accordion-item:first-child:last-child {
  border-radius: 20px;
}

.accordion-item.is-open {
  background: rgba(58, 58, 58, 0.7);
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 2;
}

.accordion-header:hover {
  background: rgba(255, 255, 255, 0.03);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.accordion-item.is-open .icon-wrapper {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

.icon {
  font-size: 20px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: -0.01em;
}

.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(255, 255, 255, 0.6);
  opacity: 0.7;
  flex-shrink: 0;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.accordion-body {
  overflow: hidden;
  transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-content {
  padding: 0 24px 24px 72px;
}

.accordion-content p {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 400;
  letter-spacing: -0.01em;
}

/* Адаптивность */
@media (max-width: 768px) {
  .accordion-header {
    padding: 18px 20px;
  }

  .header-content {
    gap: 14px;
  }

  .icon-wrapper {
    width: 30px;
    height: 30px;
  }

  .icon {
    font-size: 18px;
  }

  h3 {
    font-size: 16px;
  }

  .accordion-content {
    padding: 0 20px 20px 64px;
  }

  .accordion-content p {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .features-accordion {
    max-width: 100%;
  }

  .accordion-item:first-child {
    border-radius: 16px 16px 0 0;
  }

  .accordion-item:last-child {
    border-radius: 0 0 16px 16px;
  }

  .accordion-item:first-child:last-child {
    border-radius: 16px;
  }

  .accordion-header {
    padding: 16px 18px;
  }

  .header-content {
    gap: 12px;
  }

  .icon-wrapper {
    width: 28px;
    height: 28px;
  }

  .icon {
    font-size: 17px;
  }

  h3 {
    font-size: 15px;
  }

  .accordion-content {
    padding: 0 18px 18px 58px;
  }

  .accordion-content p {
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
