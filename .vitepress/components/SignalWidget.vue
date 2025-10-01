<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import SignalBranchSelector from './SignalBranchSelector.vue'
import SignalCafeCard from './SignalCafeCard.vue'

const cafeNames = ['Корж', 'MOSAIC', 'Surf', 'Skuratov', 'Белотурка', 'Кэрри']

const cafes = {
  'Корж': {
    name: 'Корж',
    yandex2gis: 51,
    yandex2gisPercent: 94,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '2',
    signalsPercent: 100,
    isConnected: true,
    branches: [
      { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/reviews' },
      { address: 'Революционная, 101В', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858//reviews' },
      { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/152008652145/reviews' },
      { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/reviews' },
      { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/reviews' },
      { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/144063441903/reviews' },
      { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/102178077269/reviews' },
      { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/reviews' }
    ]
  },
  'MOSAIC': {
    name: 'MOSAIC',
    yandex2gis: 194,
    yandex2gisPercent: 42,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Бывшая гостиница "Националь" ', gisUrl: 'https://2gis.ru/samara/firm/70000001077330664/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/151180373582/reviews/' },
      { address: 'Волжский просп., 50', gisUrl: 'https://2gis.ru/samara/firm/70000001074565560/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/241776381665/reviews/' },
      { address: 'Речной вокзал', gisUrl: 'https://2gis.ru/samara/firm/70000001074565559/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/26968768492/reviews/' },
      { address: 'Максима Горького, 82', gisUrl: 'https://2gis.ru/samara/firm/70000001065476074/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/130707944684/reviews/' },
      { address: 'Волжский просп., 40', gisUrl: 'https://2gis.ru/samara/firm/70000001052939655/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/26968768492/reviews/' },
      { address: 'ЖК Ботанический', gisUrl: 'https://2gis.ru/samara/firm/70000001035366800/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/186171163289/reviews/' },
      { address: 'ТЦ Аквариум ', gisUrl: 'https://2gis.ru/samara/firm/70000001034344804/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/40452073764/reviews/' },
      { address: 'ТЦ Аврора', gisUrl: 'https://2gis.ru/samara/firm/70000001046644341/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/121248491329/reviews/' },
      { address: 'ТЦ Самолет', gisUrl: 'https://2gis.ru/samara/firm/70000001027292047/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/241817444822/reviews/' },
      { address: 'Волгина, 127А', gisUrl: 'https://2gis.ru/samara/firm/70000001026465823/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/189131333340/reviews/' },
      { address: 'БЦ ЗИМ', gisUrl: 'https://2gis.ru/samara/firm/70000001027292024/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/131060566066/reviews/' },
      { address: '5-я просека', gisUrl: 'https://2gis.ru/samara/firm/70000001037266527/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/59004397239/reviews/' },
      { address: 'Красноармейский спуск', gisUrl: 'https://2gis.ru/samara/firm/70000001074565722/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/87795478653/reviews/' },
      { address: 'Напротив ЦСКА', gisUrl: 'https://2gis.ru/samara/firm/70000001088760179/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/62781566656/reviews/' }
    ]
  },
  'Skuratov': {
    name: 'Skuratov',
    yandex2gis: 44,
    yandex2gisPercent: 89,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Самарская, 190', gisUrl: 'https://2gis.ru/samara/firm/70000001062410566/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov/150151107830/reviews/' },
      { address: 'Молодогвардейская, 80', gisUrl: 'https://2gis.ru/samara/firm/70000001063379108/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/112256596811/reviews/' },
      { address: 'Максима Горького, 129', gisUrl: 'https://2gis.ru/samara/firm/70000001094239079/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/222229699719/reviews/' },
      { address: 'Красноармейская, 133', gisUrl: 'https://2gis.ru/samara/firm/70000001052366972/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/9331047841/reviews/' },
      { address: 'Первомайская, 29', gisUrl: 'https://2gis.ru/samara/firm/70000001043589620/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/64247746809/reviews/' },
      { address: 'Куйбышева, 68/70', gisUrl: 'https://2gis.ru/samara/firm/70000001036538224/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/203299963607/reviews/' }
    ]
  },
  'Surf': {
    name: 'Surf',
    yandex2gis: 12,
    yandex2gisPercent: 100,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Некрасовская, 57', gisUrl: 'https://2gis.ru/samara/firm/70000001036632385/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee/130764135504/reviews/' },
      { address: 'Полевая, 54', gisUrl: 'https://2gis.ru/samara/firm/70000001047142182/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee_x_pool/179188509748/reviews/' },
      { address: 'Куйбышева, 100', gisUrl: 'https://2gis.ru/samara/firm/70000001082424572/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee/13215597722/reviews/' }
    ]
  },
  'Белотурка': {
    name: 'Белотурка',
    yandex2gis: 135,
    yandex2gisPercent: 1,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Куйбышева, 99', gisUrl: 'https://2gis.ru/samara/firm/70000001075213346/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/21345450545/reviews/' },
      { address: 'Молодогвардейская, 153', gisUrl: 'https://2gis.ru/samara/firm/70000001094600683/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/71041285330/reviews/' },
      { address: 'Ново-Садовая, 106', gisUrl: 'https://2gis.ru/samara/firm/70000001095659001/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/56246021902/reviews/' },
      { address: 'Московское шоссе, 41 (РДЦ)', gisUrl: 'https://2gis.ru/samara/firm/70000001090546275/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/34710016395/reviews/' },
      { address: 'Московское шоссе, 81Б (Парк Хаус)', gisUrl: 'https://2gis.ru/samara/firm/70000001100074136/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/90354199231/reviews/' }
    ]
  },
  'Кэрри': {
    name: 'Кэрри',
    yandex2gis: 101,
    yandex2gisPercent: 97,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Ново-Садовая ул., 160М', gisUrl: 'https://2gis.ru/samara/firm/70000001070543566/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/202386458956/reviews/' },
      { address: 'Московское шоссе, 252', gisUrl: 'https://2gis.ru/samara/firm/70000001028380476/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/158033026774/reviews/' },
      { address: 'Дачная ул., 2, корп. 1', gisUrl: 'https://2gis.ru/samara/firm/70000001020794652/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/75305070589/reviews/' },
      { address: 'Дыбенко, 30 (Космопорт)', gisUrl: 'https://2gis.ru/samara/firm/70000001027327015/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/25856651419/reviews/' }
    ]
  }
}

const cafeProfiles = {
  'корж': { responseTime: { base: 2.3, min: 1.8, max: 2.8 }, resolutionTime: { base: 17.5, min: 15, max: 20 } },
  'mosaic': { responseTime: { base: 1.4, min: 1.0, max: 1.9 }, resolutionTime: { base: 14.7, min: 12, max: 17 } },
  'skuratov': { responseTime: { base: 1.6, min: 1.2, max: 2.1 }, resolutionTime: { base: 15.2, min: 13, max: 18 } },
  'surf': { responseTime: { base: 3.1, min: 2.5, max: 3.8 }, resolutionTime: { base: 20.3, min: 18, max: 23 } },
  'белотурка': { responseTime: { base: 2.7, min: 2.2, max: 3.2 }, resolutionTime: { base: 18.8, min: 16, max: 22 } },
  'кэрри': { responseTime: { base: 2.0, min: 1.5, max: 2.6 }, resolutionTime: { base: 16.4, min: 14, max: 19 } }
}

const getCafeConfig = (cafeName) => {
  const normalized = cafeName?.toLowerCase() || ''
  return cafeProfiles[normalized] || { responseTime: { base: 2, min: 1, max: 3 }, resolutionTime: { base: 15, min: 12, max: 18 } }
}

const selectedCafe = ref(cafeNames[0] || 'Корж')

const establishment = computed(() => cafes[selectedCafe.value] || {
  name: '',
  yandex2gis: 0,
  yandex2gisPercent: 0,
  smartReviews: 0,
  smartReviewsPercent: 0,
  signals: '0',
  signalsPercent: 0,
  isConnected: false,
  branches: []
})

const cafeConfig = computed(() => getCafeConfig(selectedCafe.value))

const systemMetrics = ref({
  responseTime: cafeConfig.value.responseTime.base,
  resolutionTime: cafeConfig.value.resolutionTime.base,
  lastUpdate: Date.now()
})

const showLeftGradient = ref(false)
const showRightGradient = ref(false)
const showBranchList = ref(false)
const widgetContentRef = ref(null)
const switchersRef = ref(null)
const showInfoModal = ref(false)
const showGrowthModal = ref(false)

let metricsIntervalId = null

const fetchSystemStatus = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50))
    const currentConfig = cafeConfig.value
    const now = Date.now()
    const hourOfDay = new Date().getHours()
    const isBusinessHours = hourOfDay >= 9 && hourOfDay <= 21
    const loadFactor = isBusinessHours ? 0.8 : 1.2
    const responseVariation = (Math.random() - 0.5) * 0.15 * loadFactor
    const resolutionVariation = (Math.random() - 0.5) * 1.2 * loadFactor

    systemMetrics.value.responseTime = Math.max(
      currentConfig.responseTime.min,
      Math.min(currentConfig.responseTime.max,
        systemMetrics.value.responseTime + responseVariation
      )
    )

    systemMetrics.value.resolutionTime = Math.max(
      currentConfig.resolutionTime.min,
      Math.min(currentConfig.resolutionTime.max,
        systemMetrics.value.resolutionTime + resolutionVariation
      )
    )

    systemMetrics.value.lastUpdate = now
  } catch (error) {
    // ignore
  }
}

const handleSwitcherScroll = () => {
  if (!switchersRef.value) return
  
  const container = switchersRef.value
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth
  const clientWidth = container.clientWidth
  
  showLeftGradient.value = scrollLeft > 5
  showRightGradient.value = scrollLeft < (scrollWidth - clientWidth - 5)
}

const openInvestLink = () => {
  window.open('/signals', '_blank')
}

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    showInfoModal.value = false
    showGrowthModal.value = false
  }
}

watch(selectedCafe, (newName) => {
  const newConfig = getCafeConfig(newName)
  systemMetrics.value.responseTime = newConfig.responseTime.base
  systemMetrics.value.resolutionTime = newConfig.resolutionTime.base
  systemMetrics.value.lastUpdate = Date.now()
  fetchSystemStatus()
})

onMounted(() => {
  metricsIntervalId = setInterval(fetchSystemStatus, 45000)
  fetchSystemStatus()
  window.addEventListener('keydown', onKeydown)
  
  nextTick(() => {
    handleSwitcherScroll()
  })
})

onUnmounted(() => {
  clearInterval(metricsIntervalId)
  window.removeEventListener('keydown', onKeydown)
})

watch(showBranchList, (newValue) => {
  if (newValue) {
    nextTick(() => {
      if (widgetContentRef.value) {
        widgetContentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }
})
</script>

<template>
  <div class="signal2-widget-content" ref="widgetContentRef">
    <div class="signal2-cafe-switchers-container">
      <div 
        class="signal2-cafe-switchers" 
        ref="switchersRef"
        @scroll="handleSwitcherScroll"
      >
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Корж' }"
          @click="selectedCafe = 'Корж'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
          </svg>
          Корж
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'MOSAIC' }"
          @click="selectedCafe = 'MOSAIC'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
          MOSAIC
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Surf' }"
          @click="selectedCafe = 'Surf'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
          Surf
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Skuratov' }"
          @click="selectedCafe = 'Skuratov'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
          Skuratov
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Белотурка' }"
          @click="selectedCafe = 'Белотурка'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
          Белотурка
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Кэрри' }"
          @click="selectedCafe = 'Кэрри'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
          Кэрри
        </button>
      </div>
      
      <div 
        class="signal2-switchers-gradient signal2-switchers-gradient-left"
        :class="{ 'signal2-gradient-visible': showLeftGradient }"
      ></div>
      <div 
        class="signal2-switchers-gradient signal2-switchers-gradient-right"
        :class="{ 'signal2-gradient-visible': showRightGradient }"
      ></div>
    </div>

    <div v-if="establishment">
      <SignalBranchSelector
        v-if="showBranchList"
        :cafe-name="establishment.name"
        :branches="establishment.branches"
        @close="showBranchList = false"
      />

      <SignalCafeCard
        v-else
        :establishment="establishment"
        :cafe-config="cafeConfig"
        :system-metrics="systemMetrics"
        @show-branches="showBranchList = true"
        @open-info-modal="showInfoModal = true"
        @open-growth-modal="showGrowthModal = true"
      />
    </div>

    <div v-if="showInfoModal" class="signal2-modal-overlay" @click.self="showInfoModal = false">
      <div class="signal2-modal" role="dialog" aria-modal="true" id="signal2-signal-dialog" aria-label="Ваши отзывы меняют всё">
        <div class="signal2-modal-header">
          <div class="signal2-modal-title">Ваши отзывы меняют всё.</div>
        </div>
        <div class="signal2-modal-body">
          Каждый отзыв делает любимую кофейню еще лучше, а Сигнал помогает решить Вашу проблему за 24 часа. Почувствуйте силу настоящих перемен.
          <br /><br />
          <a href="https://cffx.ru/signals.html" target="_blank" class="signal2-modal-link signal2-no-vitepress-style">Как Работает Сигнал</a>
        </div>
        <div class="signal2-modal-footer">
          <button class="signal2-modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>

    <div v-if="showGrowthModal" class="signal2-modal-overlay" @click.self="showGrowthModal = false">
      <div class="signal2-modal" role="dialog" aria-modal="true" aria-label="Умные Отзывы">
        <div class="signal2-modal-header">
          <div class="signal2-modal-title">Умные Отзывы</div>
        </div>
        <div class="signal2-modal-body">
          Мы передаем ваш отзыв нужному менеджеру и стараемся помочь. Мы не гарантируем ответ, но сделаем всё, чтобы ваш голос был услышан.<br><br>
          Укажите ваш контакт в Телеграм, чтобы ИИ-ассистент Анна сообщила вам, когда будет готов ответ.<br><br>
          Если у вашей кофейни подключен Сигнал, вы гарантировано получите ответ за 24 часа.<br><br>
          <span @click="openInvestLink" class="signal2-modal-link">Как работает ⚡ Сигнал</span>
        </div>
        <div class="signal2-modal-footer">
          <button class="signal2-modal-ok" type="button" @click="showGrowthModal = false">Понятно</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signal2-widget-content { padding: 32px 0; }
.signal2-cafe-switchers-container { position: relative; margin-bottom: 32px; }
.signal2-cafe-switchers { display: flex; gap: 12px; padding-bottom: 12px; flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: thin; scrollbar-color: rgba(70, 70, 70, 0.8) transparent; }
.signal2-cafe-switchers::-webkit-scrollbar { height: 2px; }
.signal2-cafe-switchers::-webkit-scrollbar-track { background: transparent; }
.signal2-cafe-switchers::-webkit-scrollbar-thumb { background-color: rgba(70, 70, 70, 0.8); border-radius: 10px; }
.signal2-cafe-switchers::-webkit-scrollbar-thumb:hover { background-color: rgba(85, 85, 85, 0.9); }
.signal2-switcher { border-radius: 50px; padding: 12px 20px; font-size: 15px; font-weight: 700; cursor: pointer; border: none; transition: all 0.3s ease; white-space: nowrap; display: flex; align-items: center; gap: 8px; min-width: fit-content; position: relative; overflow: hidden; background: rgba(70, 70, 70, 0.6); color: rgba(255, 255, 255, 0.9); }
.signal2-switcher::before { content: ''; position: absolute; left: -200%; top: 0; width: 200%; height: 100%; background: linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 60%, transparent 70%, transparent 100%); transition: all 1.2s ease; }
.signal2-switcher:hover::before { left: 100%; }
@media (max-width: 768px) { .signal2-switcher::before, .signal2-switcher:hover::before { display: none; } }
.signal2-switcher.active { background: rgba(255, 255, 255, 0.95); color: #333; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
.signal2-switcher.active::before { display: none; }
.signal2-switcher-icon { width: 16px; height: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.signal2-switchers-gradient { position: absolute; top: 0; bottom: 12px; width: 60px; pointer-events: none; z-index: 2; opacity: 0; transition: opacity 0.6s ease; }
.signal2-switchers-gradient.signal2-gradient-visible { opacity: 1; }
.signal2-switchers-gradient-left { left: 0; background: linear-gradient( to right, #1b1b1f 0%, #1b1b1f 20%, rgba(27, 27, 31, 0.95) 40%, rgba(27, 27, 31, 0.8) 60%, rgba(27, 27, 31, 0.5) 80%, transparent 100% ); }
.signal2-switchers-gradient-right { right: 0; background: linear-gradient( to left, #1b1b1f 0%, #1b1b1f 20%, rgba(27, 27, 31, 0.95) 40%, rgba(27, 27, 31, 0.8) 60%, rgba(27, 27, 31, 0.5) 80%, transparent 100% ); }
:deep(.signal2-no-vitepress-style) { text-decoration: underline !important; text-decoration-color: rgba(255, 255, 255, 0.3) !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-no-vitepress-style:hover) { text-decoration: underline !important; text-decoration-color: rgba(255, 255, 255, 0.6) !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-no-vitepress-style:visited), :deep(.signal2-no-vitepress-style:focus), :deep(.signal2-no-vitepress-style:active) { text-decoration: underline !important; text-decoration-color: rgba(255, 255, 255, 0.3) !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-modal-link.signal2-no-vitepress-style) { text-decoration: underline !important; text-decoration-color: #a3e635 !important; border-bottom: none !important; background: none !important; }
:deep(.signal2-modal-link.signal2-no-vitepress-style:hover) { text-decoration: underline !important; text-decoration-color: #c5f946 !important; border-bottom: none !important; background: none !important; }
.signal2-modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.signal2-modal { background: var(--vp-c-bg, #111); color: var(--vp-c-text-1, #fff); border: 1px solid var(--vp-c-border, rgba(255, 255, 255, 0.12)); border-radius: 12px; width: min(520px, 96vw); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4); padding: 32px; }
.signal2-modal-header { display: flex; align-items: center; justify-content: flex-start; gap: 12px; }
.signal2-modal-title { font-weight: 700; font-size: 16px; }
.signal2-modal-body { margin-top: 16px; font-size: 14px; color: var(--vp-c-text-1); line-height: 1.5; }
.signal2-modal-link { color: #a3e635; text-decoration: underline; text-decoration-color: #a3e635 !important; font-weight: 600; transition: all 0.3s ease; cursor: pointer; }
.signal2-modal-link:hover { color: #c5f946; text-decoration: underline; text-decoration-color: #c5f946 !important; }
.signal2-modal-footer { margin-top: 24px; display: flex; justify-content: flex-end; }
.signal2-modal-ok { background: var(--vp-c-bg-mute, #222); border: 1px solid var(--vp-c-border); color: var(--vp-c-text-1); border-radius: 8px; padding: 10px 16px; cursor: pointer; font-weight: 500; }
.signal2-modal-ok:hover { background: var(--vp-c-bg-soft, #333); }

@media (max-width: 768px) {
  .signal2-widget-content { padding: 24px 0; }
}
@media (max-width: 480px) {
  .signal2-widget-content { padding: 20px 0; }
  .signal2-modal { padding: 24px; }
  .signal2-modal-body { margin-top: 12px; }
  .signal2-modal-footer { margin-top: 20px; }
}
</style>
