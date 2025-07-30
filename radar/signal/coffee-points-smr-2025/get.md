# Оплата полного доступа к отчёту

Отчёт: **Рынок кофеен (Самара) // фокус на «Корж»**
Актуальность: 29.07.2025

<ClientOnly>
  <div class="payment-form-container" style="background-color: #ffffff; padding: 2rem 1rem; border-radius: 8px;">
    <link rel="stylesheet" href="https://yookassa.ru/integration/simplepay/css/yookassa_construct_form.css?v=1.25.0">
    <form class="yoomoney-payment-form" action="https://yookassa.ru/integration/simplepay/payment" method="post" accept-charset="utf-8">
        <div class="ym-products">
            <div class="ym-block-title ym-products-title">Товары</div>
            <div class="ym-product">
                <div class="ym-product-line">
                    <span class="ym-product-description"><span class="ym-product-count">1×</span>Отчёт Сигнал Радара – Корж, 29.07.2025</span>
                    <span class="ym-product-price" data-price="20000" data-id="615" data-count="1">20&nbsp;000,00&nbsp;₽</span>
                </div>
                <input disabled="" type="hidden" name="text" value="Отчёт Сигнал Радара – Корж, 29.07.2025">
                <input disabled="" type="hidden" name="price" value="20000">
                <input disabled="" type="hidden" name="quantity" value="1">
                <input disabled="" type="hidden" name="paymentSubjectType" value="commodity">
                <input disabled="" type="hidden" name="paymentMethodType" value="full_prepayment">
                <input disabled="" type="hidden" name="tax" value="1">
            </div>
        </div>
        <input value="" type="hidden" name="ym_merchant_receipt">
        <div class="ym-customer-info">
            <div class="ym-block-title">О покупателе</div>
            <input name="email" class="ym-input" placeholder="Телефон или Email для чека" type="text" value="">
        </div>
        <div class="ym-hidden-inputs">
            <input name="shopSuccessURL" type="hidden" value="https://drive.google.com/file/d/1-6ryIugzyfIKHej9u1_R7BQItw54C3Uq/view?usp=drive_link">
            <input name="shopFailURL" type="hidden" value="https://runscale.ru/radar/signal/payment">
        </div>
        <div class="ym-payment-btn-block ym-before-line ym-align-space-between">
            <div class="ym-input-icon-rub ym-display-none">
                <input name="sum" placeholder="0.00" class="ym-input ym-sum-input ym-required-input" type="number" step="any" value="20000">
            </div>
            <button data-text="Оплатить" class="ym-btn-pay ym-result-price">
                <span class="ym-text-crop">Оплатить</span>
                <span class="ym-price-output">20&nbsp;000,00&nbsp;₽</span>
            </button>
            <img src="https://yookassa.ru/integration/simplepay/img/iokassa-gray.svg?v=1.25.0" class="ym-logo" width="114" height="27" alt="ЮKassa">
        </div>
        <input name="shopId" type="hidden" value="1026515">
    </form>
  </div>
  <script src="https://yookassa.ru/integration/simplepay/js/yookassa_construct_form.js?v=1.25.0"></script>
</ClientOnly>
