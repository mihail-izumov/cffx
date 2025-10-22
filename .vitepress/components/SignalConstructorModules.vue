<template>
  <div class="anna-brands-container">
    <!-- МОДУЛЬ 1 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">МОДУЛЬ 1</div>
      <h3 class="anna-title">Классификация Проблем</h3>
      <p class="anna-description-main">Наша система автоматически распознает тип проблемы (сервис, чистота, еда, атмосфера) и присваивает ей уровень критичности.</p>
      <p class="anna-description-secondary"><strong>Ваш контроль:</strong> Вы можете добавить свои уникальные категории (например, «запах в зале» для фитнеса или «скорость room service» для отеля).</p>
      <p class="anna-description-goals anna-step-goals">Ни одна жалоба не теряется. Критичные проблемы решаются в первую очередь.</p>
    </div>
    
    <!-- МОДУЛЬ 2 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">МОДУЛЬ 2</div>
      <h3 class="anna-title">Алгоритм Анны</h3>
      <p class="anna-description-main">10-этапный сценарий, по которому наш ИИ-ассистент Анна общается с вашим гостем: от эмпатии и сбора деталей до контроля решения и запроса оценки.</p>
      <p class="anna-description-secondary"><strong>Ваш контроль:</strong> Мы можем скорректировать тон голоса Анны под ваш бренд (более формальный или более дружелюбный).</p>
      <p class="anna-description-goals anna-step-goals">Каждый недовольный гость чувствует себя услышанным и важным, что превращает его в лояльного клиента.</p>
    </div>
    
    <!-- МОДУЛЬ 3 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">МОДУЛЬ 3</div>
      <h3 class="anna-title">Скрипты и Шаблоны</h3>
      <p class="anna-description-main">Готовая библиотека фраз и шаблонов ответов для Анны по каждой категории проблем, основанная на лучших практиках клиентоориентированного сервиса.</p>
      <p class="anna-description-secondary"><strong>Ваш контроль:</strong> Вы можете отредактировать или утвердить ключевые фразы, чтобы они на 100% соответствовали вашему голосу бренда.</p>
      <p class="anna-description-goals anna-step-goals">Система говорит с вашими гостями так, как говорили бы вы сами, сохраняя уникальность вашего сервиса.</p>
    </div>
    
    <!-- МОДУЛЬ 4 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">МОДУЛЬ 4</div>
      <h3 class="anna-title">Матрица Эскалации</h3>
      <p class="anna-description-main">Чёткие правила, кому и в какой ситуации Анна отправляет тикет: мелкая проблема — дежурному тренеру, критическая (например, травма) — лично вам на телефон в течение 5 минут.</p>
      <p class="anna-description-secondary"><strong>Ваш контроль:</strong> Вы сами определяете, кто за что отвечает и какие ситуации считаются критичными.</p>
      <p class="anna-description-goals anna-step-goals">Вы не тонете в рутине, но никогда не упустите по-настоящему важную проблему. Полный контроль без микроменеджмента.</p>
    </div>
    
    <!-- МОДУЛЬ 5 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">МОДУЛЬ 5</div>
      <h3 class="anna-title">Полномочия и Ограничения</h3>
      <p class="anna-description-main">Правила, что Анна может делать сама (уточнять детали, предлагать стандартные решения), а где требуется ваше участие (решения о крупных компенсациях).</p>
      <p class="anna-description-secondary"><strong>Ваш контроль:</strong> Вы проводите черту: где заканчивается автоматизация и начинается ваше человеческое решение.</p>
      <p class="anna-description-goals anna-step-goals">Система работает автономно, но ключевые решения всегда за вами.</p>
    </div>
    
    <!-- МОДУЛЬ 6 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">МОДУЛЬ 6</div>
      <h3 class="anna-title">Система Компенсаций</h3>
      <p class="anna-description-main">Логика выдачи бонусов за проблемы: от бесплатного кофе за долгое ожидание до сертификата на следующее посещение за серьёзный сбой.</p>
      <p class="anna-description-secondary"><strong>Ваш контроль:</strong> Вы устанавливаете правила компенсаций. Система лишь предлагает их в нужный момент.</p>
      <p class="anna-description-goals anna-step-goals">Быстрое и справедливое решение проблемы превращает негатив в позитивный опыт.</p>
    </div>
    
    <!-- МОДУЛЬ 7 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">МОДУЛЬ 7</div>
      <h3 class="anna-title">Метрики и Отчётность</h3>
      <p class="anna-description-main">Какие показатели мы отслеживаем (SLA по времени ответа, NPS после решения проблемы) и как выглядят ваши еженедельные отчёты.</p>
      <p class="anna-description-secondary"><strong>Ваш контроль:</strong> Вы можете добавить 1-2 кастомные метрики, важные именно для вашего бизнеса.</p>
      <p class="anna-description-goals anna-step-goals">Вы видите эффективность системы в реальных цифрах и принимаете решения на основе данных.</p>
    </div>
  </div>
</template>

<style scoped>
/* ВСЕ СТИЛИ ПОЛНОСТЬЮ ИЗОЛИРОВАНЫ С УНИКАЛЬНЫМИ КЛАССАМИ */
/* Контейнер для горизонтальной прокрутки */
.anna-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.anna-brands-container::-webkit-scrollbar {
  height: 6px;
}

.anna-brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

.anna-brand-card {
  flex: 0 0 320px !important; /* Увеличена ширина для большего комфорта чтения */
  border-radius: 12px !important;
  padding: 24px 18px !important; /* Увеличены отступы */
  display: flex !important;
  flex-direction: column !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-top-width: 4px !important;
  position: relative !important;
  min-height: 280px !important; /* Увеличена минимальная высота */
}

/* СВЕТЛАЯ ТЕМА - все карточки одинаковые с лаймовым акцентом */
.anna-step-card {
  background-color: #f8faf6 !important;
  border-color: #e0e5dd !important;
  border-top-color: #C5F946 !important;
}

/* ТЕМНАЯ ТЕМА - все карточки одинаковые с лаймовым акцентом */
:root.dark .anna-step-card {
  background-color: #272B27 !important;
  border-color: #333833 !important;
  border-top-color: #C5F946 !important;
}

/* Стили для бейджей */
.anna-tariff-badge {
  display: inline-block !important;
  padding: 2px 8px !important; /* Увеличены отступы в бейдже */
  border-radius: 4px !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  margin-bottom: 8px !important; /* Увеличен отступ снизу */
  width: fit-content !important;
  border: none !important;
}

.anna-step {
  background-color: #506933 !important;
  color: #B4D053 !important;
}

/* Заголовки */
.anna-title {
  font-size: 16px !important; /* Немного увеличен размер */
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 10px !important; /* Увеличен отступ */
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #2c3e2c !important;
}

:root.dark .anna-title {
  color: #ffffff !important;
}

/* Основной текст (белый) */
.anna-description-main {
  color: #4a5a4a !important;
  font-size: 14px !important; /* Немного уменьшен для лучшей читаемости */
  line-height: 1.65 !important; /* Увеличена высота строки */
  margin: 0 0 10px 0 !important; /* Увеличен отступ */
}

:root.dark .anna-description-main {
  color: #f0f0f0 !important;
}

/* Дополнительный текст (серый, меньше) */
.anna-description-secondary {
  color: #888 !important;
  font-size: 13px !important;
  line-height: 1.6 !important; /* Увеличена высота строки */
  margin: 0 0 12px 0 !important; /* Увеличен отступ */
  flex-grow: 1 !important; /* Растягивает секцию для выравнивания футера */
}

:root.dark .anna-description-secondary {
  color: #aaa !important;
}

/* Цели с увеличенным размером и средней жирностью */
.anna-step-goals {
  color: #347b6c !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.65 !important; /* Увеличена высота строки */
  margin: 0 !important;
  padding-top: 4px !important; /* Добавлен верхний отступ для визуального разделения */
}

/* ТЕМНАЯ ТЕМА - цели */
:root.dark .anna-step-goals {
  color: #C5F946 !important;
}
</style>
