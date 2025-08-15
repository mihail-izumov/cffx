<template>
  <div class="yookassa-wrapper">
    <form
      class="yoomoney-payment-form"
      action="https://yookassa.ru/integration/simplepay/payment"
      method="post"
      accept-charset="utf-8"
      target="_blank"
    >
      <!-- ...ваша форма... -->
    </form>
  </div>
</template>

<script setup>
// Подключение скриптов/стилей ЮKassa — оставляем без изменений
import { onMounted } from 'vue'
onMounted(() => {
  if (!document.querySelector('link[href*="yookassa_construct_form.css"]')) {
    const link = document.createElement('link')
    link.rel  = 'stylesheet'
    link.href = 'https://yookassa.ru/integration/simplepay/css/yookassa_construct_form.css?v=1.26.0'
    document.head.appendChild(link)
  }
  if (!document.querySelector('script[src*="yookassa_construct_form.js"]')) {
    const script = document.createElement('script')
    script.src   = 'https://yookassa.ru/integration/simplepay/js/yookassa_construct_form.js?v=1.26.0'
    script.async = true
    document.body.appendChild(script)
  }
})
</script>

<style scoped>
/* 1. Контейнер без отступов слева/справа и на всю ширину */
.yookassa-wrapper {
  width: 100%;
  padding: 0;
  margin: 0;
  background: #ffffff; /* жёстко белый фон */
}

/* 2. Сброс отступов у самой формы */
.yookassa-wrapper .yoomoney-payment-form {
  margin: 0;
  padding: 1rem;      /* вы можете настроить внутренние отступы по своему вкусу */
  background: #ffffff;
  box-sizing: border-box;
  width: 100%;
}

/* 3. Принудительный белый фон полей, чтобы не «подсвечивались» в тёмной теме */
.yookassa-wrapper .yoomoney-payment-form .ym-input {
  background: #ffffff !important;
  color: #000000 !important;
  border: 1px solid #d9d9d9 !important;
}

/* 4. Кнопка на всю ширину */
.yookassa-wrapper .yoomoney-payment-form .ym-payment-btn-block {
  display: flex;
}
.yookassa-wrapper .yoomoney-payment-form .ym-payment-btn-block button.ym-btn-pay {
  flex: 1;
  margin: 0;
}
</style>
