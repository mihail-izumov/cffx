<script setup>
import { ref } from 'vue'
const activeTab = ref('dolhoe-ohidanie') // фикс: старт всегда с первой вкладки!
</script>

<template>
  <div class="signal-mr-tabs">
    <button
      :class="['signal-mr-btn', { 'signal-mr-active': activeTab === 'dolhoe-ohidanie' }]"
      @click="activeTab = 'dolhoe-ohidanie'"
      type="button"
    >Долгое ожидание</button>
    <button
      :class="['signal-mr-btn', { 'signal-mr-active': activeTab === 'bally' }]"
      @click="activeTab = 'bally'"
      type="button"
    >Начисление баллов</button>
    <button
      :class="['signal-mr-btn', { 'signal-mr-active': activeTab === 'oshibka' }]"
      @click="activeTab = 'oshibka'"
      type="button"
    >Ошибка в заказе</button>
    <button
      :class="['signal-mr-btn', { 'signal-mr-active': activeTab === 'nekomplektnost' }]"
      @click="activeTab = 'nekomplektnost'"
      type="button"
    >Некомплектность</button>
    <button
      :class="['signal-mr-btn', { 'signal-mr-active': activeTab === 'sertifikat' }]"
      @click="activeTab = 'sertifikat'"
      type="button"
    >Сертификат</button>
    <button
      :class="['signal-mr-btn', { 'signal-mr-active': activeTab === 'izmeneniya' }]"
      @click="activeTab = 'izmeneniya'"
      type="button"
    >Реальные изменения</button>
  </div>

  <div class="signal-mr-panel">
    <div v-show="activeTab === 'dolhoe-ohidanie'" class="signal-mr-content">
      <h3>Долгое ожидание</h3>
      <h4>СИГНАЛ 201-883</h4>
      <p class="signal-mr-intro">Алина, здравствуйте 👋</p>
      <p class="signal-mr-p">Понимаю ваше разочарование. Долгое ожидание без объяснений создаёт дискомфорт, особенно когда непонятно, сколько ещё ждать.</p>
      <h4>Помогите уточнить детали:</h4>
      <ul>
        <li>В какое время был визит?</li>
        <li>Сколько примерно пришлось ждать?</li>
        <li>Что заказали?</li>
        <li>Обращались ли к персоналу с вопросом о времени ожидания?</li>
      </ul>
      <p class="signal-mr-p">Передаю информацию управляющему для проверки. Через 4 часа управляющий свяжется с вами для обсуждения ситуации.</p>
      <p class="signal-mr-p">Ваше предложение о таймере ожидания с номерами заказов в приложении очень ценно. Обязательно включу его в отчёт для команды разработки 📱</p>
      <div class="signal-mr-result">
        <p><strong>— Анна</strong><br>ИИ-ассистент | Сигнал</p>
      </div>
    </div>

    <div v-show="activeTab === 'bally'" class="signal-mr-content">
      <h3>Начисление баллов</h3>
      <h4>СИГНАЛ 994-569</h4>
      <p class="signal-mr-intro">Виктория, здравствуйте! 👋</p>
      <p class="signal-mr-p">Понимаю, насколько неприятно, когда возникают проблемы с баллами — это ваше вознаграждение за лояльность. Проблемы с начислением баллов — это недопустимо.</p>
      <h4>Чтобы точно разобраться:</h4>
      <ul>
        <li>Когда именно это произошло? (дата и примерное время покупки)</li>
        <li>Что именно произошло — баллы не списались при оплате или не начислились после покупки?</li>
        <li>Какая была сумма покупки?</li>
      </ul>
      <p class="signal-mr-p">Жду вашего ответа, чтобы передать всю информацию команде кофейни «Космическая» для разбора.</p>
      <div class="signal-mr-result">
        <p><strong>— Анна</strong><br>ИИ-ассистент | Сигнал</p>
      </div>
    </div>

    <div v-show="activeTab === 'oshibka'" class="signal-mr-content">
      <h3>Ошибка в заказе</h3>
      <h4>СИГНАЛ 971-484</h4>
      <p class="signal-mr-intro">Ольга, здравствуйте! 👋<br>Спасибо за обратную связь.</p>
      <p class="signal-mr-p">Понимаю ваше разочарование и сожалею о доставленных неудобствах. Ошибка в заказе — это недопустимо.</p>
      <h4>Чтобы точно разобраться:</h4>
      <ul>
        <li>Когда это произошло? (дата и примерное время)</li>
        <li>Что именно было не так с заказом?</li>
        <li>Заказ был на месте или с собой?</li>
      </ul>
      <p class="signal-mr-p">Жду вашего ответа, чтобы передать всю информацию команде кофейни «Космическая» для разбора.</p>
      <div class="signal-mr-result">
        <p><strong>— Анна</strong><br>ИИ-ассистент | Сигнал</p>
      </div>
    </div>

    <div v-show="activeTab === 'nekomplektnost'" class="signal-mr-content">
      <h3>Некомплектность</h3>
      <h4>СИГНАЛ 500-794</h4>
      <p class="signal-mr-intro">Лера, здравствуйте! 👋</p>
      <p class="signal-mr-p">
        Спасибо, что поделились впечатлениями, это очень ценно для нас.<br>
        Очень жаль, что в круассане оказалось меньше крема, чем вы ожидали. Понимаю, как это могло испортить впечатление от десерта.<br>
        Чтобы я могла точнее передать детали управляющему, подскажите, пожалуйста, крем почти отсутствовал или его было просто меньше, чем обычно?<br>
        Я уже готовлю тикет для команды кофейни, чтобы они разобрались в ситуации.
      </p>
      <div class="signal-mr-result">
        <p><strong>— Анна</strong><br>ИИ-ассистент | Сигнал</p>
      </div>
    </div>

    <div v-show="activeTab === 'sertifikat'" class="signal-mr-content">
      <h3>Сертификат</h3>
      <h4>СИГНАЛ 978-746</h4>
      <p class="signal-mr-intro">Ирина, добрый вечер! 👋</p>
      <p class="signal-mr-p">Управляющий кофейни разобрался с ситуацией и принял решение. В качестве компенсации за дискомфорт во время визита отправляю сертификат номиналом 500₽, номер 99282.</p>
      <p class="signal-mr-p">Сертификат можно использовать в любой кофейне «Космическая» без ограничений по сроку действия.</p>
      <p class="signal-mr-p">Приносим извинения за неудобства и благодарим за обратную связь — она помогает нам становиться лучше. Будем рады видеть снова!</p>
      <div class="signal-mr-result">
        <p><strong>— Анна</strong><br>ИИ-ассистент | Сигнал</p>
      </div>
    </div>

    <div v-show="activeTab === 'izmeneniya'" class="signal-mr-content">
      <h3>Реальные изменения</h3>
      <h4>СИГНАЛ 978-746</h4>
      <p class="signal-mr-intro">Елена, Поняла вас! 👍 Реальные изменения важнее сертификатов.</p>
      <h4>Что уже сделано:</h4>
      <p class="signal-mr-p">Ваш Сигнал передан управляющему как приоритетный — требует его личного решения, а не стандартного ответа. Это значит: проверка климат-контроля в зоне у окна за дальним столиком выполняется человеком, который может изменить ситуацию.</p>
      <h4>Что будет дальше:</h4>
      <p class="signal-mr-p">Управляющий проверит температуру, выяснит причину (сквозняк/обогрев) и примет решение о физических изменениях. Как только будет конкретный результат — сообщу.</p>
      <p class="signal-mr-p">Сертификат 500₽ (99282) — за дискомфорт, пока проблема решается.</p>
      <div class="signal-mr-result">
        <p><strong>— Анна</strong><br>ИИ-ассистент | Сигнал</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signal-mr-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 18px;
  margin-bottom: 14px;
}
.signal-mr-btn {
  appearance: none;
  border: 2px solid rgba(255,255,255,0.19);
  background: none;
  color: rgba(255,255,255,0.93);
  padding: 15px 28px;
  border-radius: 18px;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.04;
  cursor: pointer;
  transition: 
    background .18s cubic-bezier(.51,.01,.34,1.02),
    border-color .18s cubic-bezier(.51,.01,.34,1.02), 
    color .18s cubic-bezier(.51,.01,.34,1.02), 
    box-shadow .18s cubic-bezier(.51,.01,.34,1.02);
  box-shadow: none;
  outline: none;
  position: relative;
}
.signal-mr-btn:hover {
  background: rgba(200,255,90,0.07);
  border-color: #aadc47;
  color: #fbfffc;
  box-shadow: 0 0 0 2px #c8ff5a6e inset;
}
.signal-mr-active {
  color: #151a06 !important;
  background: #c8ff5a;
  border-color: #c8ff5a !important;
  box-shadow: 0 0 0 2px #b8f35bce inset;
  z-index: 2;
}
.signal-mr-panel {
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  border-radius: 16px;
  padding: 26px 20px;
}
.signal-mr-content {
  color: rgba(255,255,255,0.92);
  font-size: 13px;
  line-height: 1.46;
}
.signal-mr-p {
  margin: 0 0 14px 0;
  font-size: 15px;
  color: rgba(255,255,255,0.96);
  line-height: 1.7;
}
.signal-mr-intro {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 17px;
  color: #f3fbe4;
}
.signal-mr-content h3 {
  margin: 0 0 13px;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #d9f89c;
}
.signal-mr-content h4 {
  margin: 15px 0 10px;
  font-size: 13px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.04em;
  font-weight: 600;
}
.signal-mr-content strong {
  font-weight: 600;
  color: #fff;
}
.signal-mr-content ul, .signal-mr-content ol {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
}
.signal-mr-content ul:not(:last-child),
.signal-mr-content ol:not(:last-child) {
    margin-bottom: 16px;
}
.signal-mr-content li {
  position: relative;
  padding-left: 16px;
  margin-bottom: 9px;
  font-size: 15px;
  color: rgba(255,255,255,0.89);
  line-height: 1.4;
}
.signal-mr-content ul > li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #bce256;
}
.signal-mr-content ol {
  padding-left: 18px;
  list-style: decimal;
}
.signal-mr-content ol li {
    padding-left: 5px;
}
.signal-mr-result {
    background-color: rgba(200,255,90,0.06);
    border: 1px solid rgba(200,255,90,0.13);
    padding: 13px 15px;
    border-radius: 10px;
    margin-top: 20px;
}
.signal-mr-result p {
    margin: 0 0 12px 0;
    line-height: 1.5;
}
.signal-mr-result p:last-child {
    margin: 0;
}
</style>
