<template>
  <div class="features-accordion">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="accordion-item"
      :class="{ 'is-open': openIndex === index }"
      :style="{ background: getGradient(index) }"
    >
      <div 
        class="accordion-header" 
        @click="toggle(index)"
      >
        <div class="header-content">
          <span class="icon">{{ openIndex === index ? '⊖' : '⊕' }}</span>
          <h3>{{ item.title }}</h3>
        </div>
        <div class="chevron" :class="{ rotated: openIndex === index }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
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
    content: 'Система автоматически распознаёт и классифицирует каждую проблему — от чистоты в зале до тона голоса сотрудника. Вы видите не хаос мнений, а ясную архитектуру боли и радости ваших клиентов. Это позволяет мгновенно отличать критические сбои от мелких недочетов.',
    gradient: {
      closed: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      open: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  },
  {
    title: '2. Протокол «Анна»',
    content: 'Наш ИИ-ассистент Анна работает по 10-этапному протоколу эмпатичного общения. Она не просто собирает факты — она гасит негатив, проявляет заботу и превращает разгневанного клиента в лояльного союзника. Вы можете адаптировать её тон голоса, чтобы он на 100% соответствовал вашему бренду.',
    gradient: {
      closed: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      open: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  },
  {
    title: '3. Матрица Эскалации',
    content: 'Вы сами решаете, кто и когда получает сигнал. Пролитый кофе — сообщение дежурному тренеру. Серьёзная угроза репутации — мгновенное уведомление лично вам. Это ваш пульт управления вниманием: вы фокусируетесь только на том, что действительно важно, и никогда не упускаете критических моментов.',
    gradient: {
      closed: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      open: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  },
  {
    title: '4. Система Тикетов',
    content: 'Каждая проблема автоматически превращается в тикет с уникальным номером, категорией и ответственным. Вы видите весь жизненный цикл проблемы: от первого сигнала до финального «спасибо» от клиента. Это полная прозрачность и гарантия того, что ни одна жалоба не будет забыта.',
    gradient: {
      closed: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      open: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  },
  {
    title: '5. Полномочия Системы',
    content: 'Вы проводите черту, где заканчивается автоматизация и начинается ваше человеческое решение. Анна может самостоятельно предлагать стандартные компенсации, но решения о крупных выплатах или нестандартных ситуациях всегда остаются за вами. Это автономность без потери контроля.',
    gradient: {
      closed: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      open: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  },
  {
    title: '6. Протоколы Компенсаций',
    content: 'Настройте логику выдачи бонусов за разные типы сбоев. Система сама предложит гостю сертификат или скидку в точном соответствии с вашими правилами. Это превращает любой сбой из проблемы в возможность продемонстрировать исключительный сервис.',
    gradient: {
      closed: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      open: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  },
  {
    title: '7. Метрики Успеха',
    content: 'Вы получаете доступ к дашборду, где в реальном времени отслеживаются ключевые показатели: среднее время решения проблемы, уровень удовлетворённости (NPS) после диалога, самые частые типы проблем. Вы управляете репутацией на основе данных, а не интуиции.',
    gradient: {
      closed: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      open: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  }
]

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const getGradient = (index) => {
  return openIndex.value === index 
    ? items[index].gradient.open 
    : items[index].gradient.closed
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
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.accordion-item {
  position: relative;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-item.is-open {
  flex: 1;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 2;
}

.accordion-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.icon {
  font-size: 24px;
  color: white;
  font-weight: bold;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.accordion-item.is-open .icon {
  transform: scale(1.1);
}

h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  opacity: 0.8;
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
  padding: 0 32px 32px 80px;
  color: white;
}

.accordion-content p {
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Адаптивность */
@media (max-width: 768px) {
  .accordion-header {
    padding: 20px 20px;
  }

  .header-content {
    gap: 12px;
  }

  .icon {
    width: 28px;
    height: 28px;
    font-size: 20px;
  }

  h3 {
    font-size: 16px;
  }

  .accordion-content {
    padding: 0 20px 24px 60px;
  }

  .accordion-content p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .header-content {
    gap: 8px;
  }

  .icon {
    width: 24px;
    height: 24px;
    font-size: 18px;
  }

  h3 {
    font-size: 15px;
  }

  .accordion-content {
    padding: 0 16px 20px 48px;
  }
}
</style>
