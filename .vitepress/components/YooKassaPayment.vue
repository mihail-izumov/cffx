<template>
  <div class="yookassa-raw-wrapper">
    <link
      rel="stylesheet"
      href="https://yookassa.ru/integration/simplepay/css/yookassa_construct_form.css?v=1.26.0"
    />
    <form
      class="yoomoney-payment-form"
      action="https://yookassa.ru/integration/simplepay/payment"
      method="post"
      accept-charset="utf-8"
      target="_blank"
    >
      <div class="ym-products">
        <div class="ym-block-title ym-products-title">Товары</div>
        <div class="ym-product">
          <div class="ym-product-line">
            <span class="ym-product-description">
              <span class="ym-product-count">1×</span>B-R-E-W Инсайдер на 1 мес.
            </span>
            <span
              class="ym-product-price"
              data-price="12500"
              data-id="456"
              data-count="1"
            >12&nbsp;500,00&nbsp;₽</span>
          </div>
          <input disabled type="hidden" name="text" value="B-R-E-W Инсайдер на 1 мес." />
          <input disabled type="hidden" name="price" value="12500" />
          <input disabled type="hidden" name="quantity" value="1" />
          <input disabled type="hidden" name="paymentSubjectType" value="commodity" />
          <input disabled type="hidden" name="paymentMethodType" value="full_prepayment" />
          <input disabled type="hidden" name="tax" value="1" />
        </div>
      </div>

      <input value="" type="hidden" name="ym_merchant_receipt" />

      <div class="ym-customer-info">
        <div class="ym-block-title">О покупателе</div>
        <input name="cps_email" class="ym-input" placeholder="Email" type="text" value="" />
        <input name="cps_phone" class="ym-input" placeholder="Телефон" type="text" value="" />
        <input name="custName" class="ym-input" placeholder="ФИО" type="text" value="" />
      </div>

      <div class="ym-hidden-inputs">
        <input
          name="shopSuccessURL"
          type="hidden"
          value="https://runscale.ru/brew/welcome"
        />
        <input
          name="shopFailURL"
          type="hidden"
          value="https://runscale.ru/brew/join/payment-failed"
        />
      </div>

      <input
        name="customerNumber"
        type="hidden"
        value="Добро пожаловать в B-R-E-W"
      />

      <div class="ym-payment-btn-block ym-before-line ym-align-space-between">
        <div class="ym-input-icon-rub ym-display-none">
          <input
            name="sum"
            placeholder="0.00"
            class="ym-input ym-sum-input ym-required-input"
            type="number"
            step="any"
            value="12500"
          />
        </div>
        <button data-text="Оплатить" class="ym-btn-pay ym-result-price">
          <span class="ym-text-crop">Оплатить</span>
          <span class="ym-price-output">12&nbsp;500,00&nbsp;₽</span>
        </button>
        <img
          src="https://yookassa.ru/integration/simplepay/img/iokassa-gray.svg?v=1.26.0"
          class="ym-logo"
          width="114"
          height="27"
          alt="ЮKassa"
        />
      </div>

      <input name="shopId" type="hidden" value="1026515" />
    </form>
    <script src="https://yookassa.ru/integration/simplepay/js/yookassa_construct_form.js?v=1.26.0"></script>
  </div>
</template>

<script setup>
// Ничего не меняем: подключаем скрипт и стили через HTML-теги внутри шаблона
</script>

<style scoped>
.yookassa-raw-wrapper {
  width: 100%;
  padding: 0;
  margin: 0;
  background: #ffffff;
}
.yookassa-raw-wrapper > form {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
