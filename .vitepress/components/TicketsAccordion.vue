<script setup>
import { ref } from 'vue';

const sections = [
  {
    title: 'Что делает тикет‑система',
    content: `
<p>Тикет‑система принимает обращение, передаёт Анне для переписки, формирует чёткое задание команде с нужными фактами и сроком ответа, контролирует время решения через систему уведомлений и фиксирует результат для клиента.</p>
<p>Анна ведёт диалог с клиентом, собирает детали, передаёт готовый тикет команде и возвращает решение клиенту понятным языком, а тикет‑система следит, чтобы ни одно обращение не потерялось и всё двигалось к результату в честные сроки.</p>
`
  },
  {
    title: 'Как работает связка Анна + Тикет‑система',
    content: `
<table>
<thead>
<tr>
<th>Этап</th>
<th>Что делает Анна</th>
<th>Что делает тикет‑система</th>
<th>Результат для команды</th>
<th>Результат для клиента</th>
</tr>
</thead>
<tbody>
<tr>
<td>Приём обращения</td>
<td>Приветствует, признаёт чувство, задаёт короткие вопросы</td>
<td>Регистрирует обращение, присваивает номер, фиксирует время</td>
<td>Нет лишних входящих, пока не собраны факты</td>
<td>Ощущение принятия и внимания</td>
</tr>
<tr>
<td>Сбор фактов</td>
<td>Уточняет детали, когда и где, признаёт эмоцию клиента</td>
<td>Даёт окно времени на диалог, чтобы тикет был точным</td>
<td>Приходит полная картина без возвратов на уточнение</td>
<td>Видит движение, не повторяется</td>
</tr>
<tr>
<td>Формирование тикета</td>
<td>Оформляет карточку: суть, время, место, рекомендации к действию и срок ответа</td>
<td>Автоматически создаёт тикет, запускает отсчёт времени ответа</td>
<td>Видит чёткую задачу, приоритет и время на ответ</td>
<td>Спокойно ждёт, зная, что задача передана</td>
</tr>
<tr>
<td>Контроль времени</td>
<td>Ждёт ответ команды</td>
<td>Регулярно проверяет, скоро ли срок или просрочка, отправляет напоминания команде</td>
<td>Получает напоминания до просрочки, не пропускает тикеты</td>
<td>Команда реагирует вовремя, не затягивается</td>
</tr>
<tr>
<td>Получение решения</td>
<td>Принимает ответ команды, оформляет итог клиенту простым языком</td>
<td>Фиксирует ответ команды, подтверждает связь</td>
<td>Видит подтверждение, что ответ зафиксирован</td>
<td>Получает понятное решение и результат</td>
</tr>
<tr>
<td>Закрытие</td>
<td>Просит короткую оценку опыта</td>
<td>Сохраняет оценку и переводит тикет в архив</td>
<td>Статистика качества и обратная связь</td>
<td>Завершённость и влияние на улучшения</td>
</tr>
</tbody>
</table>
`
  },
  {
    title: 'Как команда работает с тикетами',
    content: `
<p>Команда видит только готовые тикеты с ясной задачей, сроком ответа и рекомендациями к действию, плюс автоматические напоминания, которые приходят заранее, чтобы успеть ответить без просрочек.</p>
<p>Тикет‑система разгружает команду от сбора фактов, переспросов и контроля времени: всё необходимое уже собрано Анной, время отсчитывается автоматически, а команда концентрируется на реальном решении запроса, а не на ведении переписки.</p>
<table>
<thead>
<tr>
<th>Что видит команда в тикете</th>
<th>Зачем это нужно</th>
</tr>
</thead>
<tbody>
<tr><td>Номер тикета</td><td>Быстрая идентификация и ссылки</td></tr>
<tr><td>Суть обращения</td><td>Понятно, что случилось</td></tr>
<tr><td>Локация и время события</td><td>Где и когда смотреть</td></tr>
<tr><td>Имя клиента</td><td>Для персонализации ответа</td></tr>
<tr><td>Рекомендации к действию</td><td>Конкретные шаги, что проверить и сделать</td></tr>
<tr><td>Срок ответа</td><td>Понятный ориентир, к какому времени ответить</td></tr>
<tr><td>История переписки</td><td>Быстрый контекст без возвратов к клиенту</td></tr>
</tbody>
</table>
`
  },
  {
    title: 'Система уведомлений',
    content: `
<p>Уведомления приходят аккуратно и своевременно: за 30 минут до срока «скоро время ответа», при просрочке «ответ просрочен» и при фиксации ответа «ответ получен», причём каждое событие отправляется только один раз, без спама. Проверки идут в рабочие часы по будням, чтобы не беспокоить команду ночью и в выходные, а все накопленные напоминания доставляются утром в приоритетном порядке.</p>
<table>
<thead>
<tr>
<th>Уведомление</th>
<th>Когда приходит</th>
<th>Что делать команде</th>
</tr>
</thead>
<tbody>
<tr>
<td>Скоро время ответа</td>
<td>За 30 минут до срока</td>
<td>Подготовить ответ или сообщить новый срок</td>
</tr>
<tr>
<td>Ответ просрочен</td>
<td>Сразу после истечения срока</td>
<td>Дать ответ немедленно и вернуть связь с клиентом</td>
</tr>
<tr>
<td>Ответ получен</td>
<td>При фиксации ответа команды</td>
<td>Продолжать в том же темпе, связь стабильна</td>
</tr>
</tbody>
</table>
`
  },
  {
    title: 'Контроль процессов и времени',
    content: `
<p>Тикет‑система отсчитывает время от получения обращения до отправки тикета команде и от отправки до ответа команды, показывая, где узкие места и сколько занимает каждый шаг. Это позволяет честно видеть скорость реакции, управлять нагрузкой на команду и сокращать путь клиента к результату без угадываний и надежды «что всё хорошо».</p>
<table>
<thead>
<tr>
<th>Показатель</th>
<th>Что измеряет</th>
<th>Зачем команде</th>
</tr>
</thead>
<tbody>
<tr>
<td>Время сбора фактов</td>
<td>От получения обращения до отправки тикета</td>
<td>Баланс качества диалога и скорости запуска работ</td>
</tr>
<tr>
<td>Время ответа команды</td>
<td>От отправки тикета до ответа команды</td>
<td>Скорость реакции и соблюдение обещанных сроков</td>
</tr>
<tr>
<td>Доля просрочек</td>
<td>Процент тикетов, где ответ дан позже срока</td>
<td>Дисциплина команды и понимание нагрузки</td>
</tr>
</tbody>
</table>
`
  },
  {
    title: 'Типовые ситуации',
    content: `
<table>
<thead>
<tr>
<th>Ситуация</th>
<th>Как реагирует система</th>
<th>Что получает команда</th>
<th>Что получает клиент</th>
</tr>
</thead>
<tbody>
<tr>
<td>Обычный запрос</td>
<td>Анна собирает факты, тикет отправляется с понятным сроком, напоминание за 30 минут до срока</td>
<td>Чёткий тикет без лишних вопросов и своевременное напоминание</td>
<td>Быстрый и точный результат без затяжек</td>
</tr>
<tr>
<td>Клиент молчит</td>
<td>Анна отправляет тикет без диалога, если ответа нет, команда решает по доступным данным</td>
<td>Прозрачный статус «тикет без диалога» и рекомендации к действию</td>
<td>Результат даже при молчании, без задержки</td>
</tr>
<tr>
<td>Приближается срок</td>
<td>Система напоминает за 30 минут, команда успевает ответить или назначить новый срок</td>
<td>Честное предупреждение без просрочки</td>
<td>Команда реагирует вовремя, нет ощущения забытости</td>
</tr>
<tr>
<td>Просрочка</td>
<td>Система сигналит «ответ просрочен», тикет переходит в критичный статус</td>
<td>Видимость проблемы и приоритет исправления</td>
<td>Быстрое восстановление связи и честное обновление срока</td>
</tr>
</tbody>
</table>
`
  },
  {
    title: 'Что в коробке',
    content: `
<p>Готовая инфраструктура контроля обращений, которая разгружает команду от сбора фактов, переписки и отслеживания сроков, оставляя время на реальное решение запросов клиентов.</p>
<p>Каждый элемент снимает операционную нагрузку и делает процесс прозрачным, предсказуемым и быстрым.</p>
<table>
<thead>
<tr>
<th>Элемент</th>
<th>Что это</th>
<th>Что даёт команде</th>
<th>Что даёт клиенту</th>
</tr>
</thead>
<tbody>
<tr>
<td>Приём обращений 24/7</td>
<td>Регистрация и нумерация всех обращений</td>
<td>Ни одно обращение не теряется, даже ночью</td>
<td>Уверенность, что запрос принят в любое время</td>
</tr>
<tr>
<td>Связка Анна + Тикет</td>
<td>Анна ведёт переписку, тикет‑система контролирует сроки</td>
<td>Команда видит только готовые тикеты с полной картиной</td>
<td>Диалог и результат без перескоков между людьми</td>
</tr>
<tr>
<td>Окно сбора фактов</td>
<td>Время на уточнение деталей до отправки тикета</td>
<td>Тикеты приходят точными, без возвратов на уточнение</td>
<td>Решение «с первого раза» без повторов</td>
</tr>
<tr>
<td>Система уведомлений</td>
<td>Напоминания «скоро срок» и «просрочка»</td>
<td>Команда реагирует вовремя без забытых тикетов</td>
<td>Честные сроки и предсказуемость ответа</td>
</tr>
<tr>
<td>Подтверждения ответов</td>
<td>«Ответ получен» при фиксации</td>
<td>Видит, что связь стабильна и ответ зафиксирован</td>
<td>Понимание, что движение к результату есть</td>
</tr>
<tr>
<td>Рекомендации к действию</td>
<td>Короткие шаги «что проверить и сделать» в тикете</td>
<td>Не гадает, а действует по плану</td>
<td>Быстрее решение, меньше задержек</td>
</tr>
<tr>
<td>Контроль времени</td>
<td>Автоматический отсчёт и статистика</td>
<td>Видит узкие места и управляет нагрузкой</td>
<td>Быстрая доставка результата без затяжек</td>
</tr>
<tr>
<td>История и контекст</td>
<td>Полная переписка и версии в тикете</td>
<td>Любой исполнитель входит в контекст за секунды</td>
<td>Не повторяет одно и то же, время не тратится</td>
</tr>
</tbody>
</table>
<p>Тикет‑система Сигнала — это не просто «учёт обращений», а умный автопилот, который освобождает команду от рутины переписки, контроля сроков и сбора фактов, направляя всю энергию на реальное решение запросов клиентов и доставку лучшего результата в обещанное время.</p>
`
  }
];

const detailsRefs = ref([]);
const handleToggle = (index) => {
  const currentDetails = detailsRefs.value[index];
  if (currentDetails && currentDetails.open) {
    detailsRefs.value.forEach((details, i) => {
      if (i !== index && details && details.open) {
        details.open = false;
      }
    });
  }
};
</script>

<template>
  <div class="tickets-accordion-wrapper">
    <details 
      v-for="(section, index) in sections" 
      :key="index" 
      class="tickets-instruction-block"
      :ref="el => { if (el) detailsRefs[index] = el }"
      @toggle="handleToggle(index)"
    >
      <summary class="tickets-summary">
        <h3 class="tickets-title">{{ section.title }}</h3>
        <span class="tickets-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </span>
      </summary>
      <div class="tickets-content" v-html="section.content"></div>
    </details>
  </div>
</template>

<style scoped>
.tickets-accordion-wrapper {
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 0 !important;
}

.tickets-instruction-block {
  background: rgba(255, 255, 255, 0.03) !important;
  border: none !important;
  border-radius: 12px !important;
  margin-bottom: 12px !important;
  overflow: hidden !important;
  box-shadow: none !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.tickets-summary {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 16px 24px !important;
  cursor: pointer !important;
  list-style: none !important;
  user-select: none !important;
  background: transparent !important;
  border: none !important;
  margin: 0 !important;
  transition: none !important;
}

.tickets-summary::-webkit-details-marker,
.tickets-summary::marker,
.tickets-summary::before,
.tickets-summary::after {
  display: none !important;
  content: '' !important;
  width: 0 !important;
  height: 0 !important;
}

.tickets-instruction-block::-webkit-details-marker,
.tickets-instruction-block::marker,
.tickets-instruction-block::before,
.tickets-instruction-block::after {
  display: none !important;
  content: '' !important;
}

.tickets-summary > *:not(.tickets-title):not(.tickets-arrow) {
  display: none !important;
}

.tickets-title {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  border: none !important;
  line-height: 1.4 !important;
}

.tickets-title::before,
.tickets-title::after {
  display: none !important;
  content: '' !important;
}

.tickets-arrow {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  margin-left: 16px !important;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  color: #9ca3af !important;
}

.tickets-arrow svg {
  display: block !important;
  width: 20px !important;
  height: 20px !important;
}

.tickets-instruction-block[open] .tickets-arrow {
  transform: rotate(180deg) !important;
}

.tickets-content {
  padding: 0 24px 20px !important;
  color: #ffffff !important;
  line-height: 1.7 !important;
  background: transparent !important;
  border: none !important;
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tickets-content :deep(p) {
  margin: 0 0 16px !important;
  color: #ffffff !important;
}

.tickets-content :deep(table) {
  width: 100% !important;
  border-collapse: collapse !important;
  margin: 16px 0 !important;
  font-size: 14px !important;
  background: transparent !important;
}

.tickets-content :deep(th) {
  background: rgba(100, 100, 100, 0.15) !important;
  padding: 12px !important;
  text-align: left !important;
  font-weight: 600 !important;
  border: 1px solid rgba(120, 120, 120, 0.2) !important;
  color: #ffffff !important;
}

.tickets-content :deep(td) {
  padding: 12px !important;
  border: 1px solid rgba(100, 100, 100, 0.15) !important;
  color: #ffffff !important;
  background: transparent !important;
}

.tickets-content :deep(tr:hover) {
  background: rgba(100, 100, 100, 0.08) !important;
}
</style>
