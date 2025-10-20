<template>
  <DefaultLayout>
    <template #doc-before>
      <div v-if="shouldShowBanner" class="notification-container">
        <NotificationSlider v-if="frontmatter.notification === 'brew'" />
        <GeneralNotification v-else />
      </div>
    </template>

    <!-- ИЗМЕНЕНИЕ: Добавляем компонент в слот подвала -->
    <template #vp-layout-bottom>
      <div class="custom-footer-slogan">
        <RotatingSlogan />
      </div>
    </template>
  </DefaultLayout>
  
  <!-- Модальное окно -->
  <SignalModalButton />
</template>

<script setup>
import { computed, watch, onMounted, nextTick } from 'vue'
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'
import SignalModalButton from '../components/SignalModalButton.vue'

// --- ИЗМЕНЕНИЕ: Импортируем ваш новый компонент ---
import RotatingSlogan from '../components/RotatingSlogan.vue'

const DefaultLayout = DefaultTheme.Layout
const { frontmatter } = useData()
const router = useRouter()

const shouldShowBanner = computed(() => 
  frontmatter.value?.notification === 'brew' || frontmatter.value?.notification === 'general'
)

watch(shouldShowBanner, (newVal) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.classList.add('has-banner')
    } else {
      document.body.classList.remove('has-banner')
    }
  }
}, { immediate: true })

// Обработка мобильной кнопки "Отправить Сигнал"
onMounted(() => {
  if (typeof window === 'undefined') return
  
  const setupMobileSignalButton = () => {
    // Проверяем, что это мобильное устройство
    if (window.innerWidth > 768) {
      return
    }
    
    // Ждём, пока window.openSignalModal станет доступна
    let attempts = 0
    const checkModal = setInterval(() => {
      attempts++
      
      if (window.openSignalModal) {
        clearInterval(checkModal)
        
        // Находим кнопку в мобильном меню
        const signalLinks = document.querySelectorAll('.VPNavScreen .VPSocialLink[aria-label="signal-link"]')
        
        if (signalLinks.length === 0) {
          return
        }
        
        signalLinks.forEach((link) => {
          if (link.dataset.signalProcessed) {
            return
          }
          link.dataset.signalProcessed = 'true'
          
          link.removeAttribute('href')
          link.style.position = 'relative'
          
          const overlay = document.createElement('button')
          overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            cursor: pointer;
            z-index: 100;
            -webkit-tap-highlight-color: transparent;
          `
          overlay.setAttribute('aria-label', 'Отправить Сигнал')
          
          overlay.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            const navScreen = document.querySelector('.VPNavScreen')
            if (navScreen) {
              navScreen.classList.remove('open')
            }
            
            document.body.classList.remove('overflow-hidden')
            
            const menuButton = document.querySelector('.VPNavBarHamburger button')
            if (menuButton) {
              menuButton.setAttribute('aria-expanded', 'false')
            }
            
            setTimeout(() => {
              if (window.openSignalModal) {
                window.openSignalModal()
              }
            }, 100)
          })
          
          link.appendChild(overlay)
        })
      } else if (attempts > 50) {
        clearInterval(checkModal)
      }
    }, 100)
  }
  
  nextTick(() => {
    setTimeout(setupMobileSignalButton, 500)
  })
  
  const observer = new MutationObserver(() => {
    if (window.innerWidth <= 768) {
      setupMobileSignalButton()
    }
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  router.onAfterRouteChanged = () => {
    if (window.innerWidth <= 768) {
      setTimeout(setupMobileSignalButton, 300)
    }
  }
})
</script>

<style>
/* --- ИЗМЕНЕНИЕ: Стили для контейнера слогана --- */
.custom-footer-slogan {
  /* Убираем отступ у стандартного футера, чтобы наш компонент встал на его место */
  margin-top: -32px;
  padding-bottom: 32px;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* ФИКСИРОВАННАЯ ВЫСОТА - ключ к решению проблемы прыжков */
.notification-container {
  max-width: 688px;
  width: 100%;
  margin: 16px auto 48px auto;
  padding: 0;
  box-sizing: border-box;
  height: 44px;
  overflow: hidden;
}

.notification-container > * {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

body.has-banner .VPDoc {
  margin-top: 0;
  padding-top: 16px;
}

.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .notification-container {
    max-width: 100%;
    margin: 12px 0 36px 0;
    height: 72px;
  }
  
  body.has-banner .VPDoc {
    padding-top: 20px;
  }
  
  .VPNavScreen .VPSocialLink[aria-label="signal-link"]::after {
    pointer-events: none !important;
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-container {
    max-width: calc(100% - 24px);
    margin: 14px 12px 42px 12px;
    height: 58px;
  }
  
  body.has-banner .VPDoc {
    padding-top: 18px;
  }
}
</style>
