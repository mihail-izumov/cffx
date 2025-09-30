import { defineConfig, DefaultTheme } from 'vitepress'
import pkg from '../package.json' assert { type: 'json' }
const { version } = pkg

export default defineConfig({
  title: 'Сигнал',
  appearance: 'force-dark',
  
  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'Сигнал',
      description: 'Где Начинается Ваша Кофейня',
    },
  },
  
  transformPageData(pageData) {
    return pageData
  },
  
  transformHead: ({ pageData }) => {
    const head = []
    const pageTitle = pageData.frontmatter.title || pageData.title || 'Сигнал'
    const pageDescription = pageData.frontmatter.description || pageData.description || 'Где Начинается Ваша Кофейня'
    const hasCustomImage = pageData.frontmatter.head && 
      pageData.frontmatter.head.some(tag => 
        tag[0] === 'meta' && 
        tag[1].property === 'og:image'
      )
    head.push(['meta', { property: 'og:title', content: pageTitle }])
    head.push(['meta', { property: 'og:description', content: pageDescription }])
    if (!hasCustomImage) {
      head.push(['meta', { property: 'og:image', content: 'https://cffx.ru/cffx_og_card.jpg' }])
      head.push(['meta', { name: 'twitter:image', content: 'https://cffx.ru/cffx_og_card.jpg' }])
    }
    head.push(['meta', { name: 'twitter:card', content: 'summary' }])
    head.push(['meta', { name: 'twitter:title', content: pageTitle }])
    head.push(['meta', { name: 'twitter:description', content: pageDescription }])
    return head
  },
  
  buildEnd(siteConfig) {
    // Выполняется после сборки
  },
  
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Сигнал' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['script', {}, `
    (function() {
      function createFooterContent() {
        const links = [
          { text: 'Обновления', href: '/changelog' },
          { text: 'Поддержка', href: '/support' },
          { text: 'Фестиваль', href: '/fest' },
          { text: 'Условия использования', href: '/terms' },
          { text: 'Телеграм-канал', href: 'https://t.me/runscale', target: '_blank' },
          { text: 'Контакт', href: '/about/contacts' }
        ];
        let html = '<hr style="border: 0; border-top: 1px solid var(--vp-c-divider); margin: 24px 0;">';
        html += '<div class="custom-footer-links"><div class="footer-row">';
        links.slice(0, 3).forEach((link, i) => {
          if (i > 0) html += '<span class="dot-separator">•</span>';
          html += '<a href="' + link.href + '"' + (link.target ? ' target="' + link.target + '" rel="noopener noreferrer"' : '') + '>' + link.text + '</a>';
        });
        html += '</div><div class="footer-row">';
        links.slice(3).forEach((link, i) => {
          if (i > 0) html += '<span class="dot-separator">•</span>';
          html += '<a href="' + link.href + '"' + (link.target ? ' target="' + link.target + '" rel="noopener noreferrer"' : '') + '>' + link.text + '</a>';
        });
        html += '</div></div>';
        html += '<div style="margin-top: 24px; text-align: center;">';
        html += '<div style="color: white; font-size: 14px;">Где Начинается Ваша Кофейня</div>';
        html += '<div style="color: var(--vp-c-text-2); margin-top: 4px; font-size: 14px; text-align: center;">© Сигнал 2025 • Компания <a href="https://runscale.ru" target="_blank" style="color: inherit; text-decoration: underline;">Модуля Роста®</a></div>';
        return html;
      }
      function replaceFooter() {
        let footer = document.querySelector('.VPFooter');
        if (!footer) {
          footer = document.createElement('footer');
          footer.className = 'VPFooter';
          document.body.appendChild(footer);
        }
        footer.innerHTML = createFooterContent();
        if (window.location.pathname !== '/') {
          footer.style.position = 'relative';
          footer.style.bottom = '70px';
          footer.style.zIndex = '10';
          footer.style.marginBottom = '-70px';
        } else {
          footer.style.position = '';
          footer.style.bottom = '';
          footer.style.zIndex = '';
          footer.style.paddingBottom = '30px';
        }
      }
      function updateSocialLinkTargets() {
        // Для ссылки "Как Работает" - убрать target="_blank"
        const signalLinks = document.querySelectorAll('.VPSocialLink[aria-label="signal-link"]');
        signalLinks.forEach(signalLink => {
          signalLink.setAttribute('target', '_self');
          signalLink.removeAttribute('rel');
        });
        // Для "Как Работает" (login-link) убрать target и rel (не открывать в новом окне)
        const applyLinks = document.querySelectorAll('.VPSocialLink[aria-label="login-link"]');
        applyLinks.forEach(applyLink => {
          applyLink.setAttribute('target', '_self'); 
          applyLink.removeAttribute('rel');
          const newLink = document.createElement('a');
          newLink.href = applyLink.href;
          newLink.className = applyLink.className;
          newLink.setAttribute('aria-label', 'login-link');
          newLink.setAttribute('target', '_self');
          Array.from(applyLink.attributes).forEach(attr => {
            if (attr.name !== 'href' && attr.name !== 'target' && attr.name !== 'rel') {
              newLink.setAttribute(attr.name, attr.value);
            }
          });
          applyLink.parentNode.replaceChild(newLink, applyLink);
        });
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { replaceFooter(); updateSocialLinkTargets(); });
      } else { replaceFooter(); updateSocialLinkTargets(); }
      window.addEventListener('load', () => { replaceFooter(); updateSocialLinkTargets(); });
      setTimeout(() => { replaceFooter(); updateSocialLinkTargets(); }, 1000);
      setTimeout(() => { replaceFooter(); updateSocialLinkTargets(); }, 2000);
      let lastUrl = location.href;
      new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
          lastUrl = url;
          setTimeout(() => { replaceFooter(); updateSocialLinkTargets(); }, 100);
        }
      }).observe(document, { subtree: true, childList: true });
    })();
    `],
    
    ['style', {}, `
    /* Цветовые переменные лаймовой гаммы для кнопок */
    :root{
      --lime-soft: rgba(197, 249, 70, 0.1);
      --lime-medium: rgba(163, 230, 53, 0.2);
      --lime-bright: #c5f946;
      --lime-dark: #85a931;
      --graphite: #6e6e6e; /* светлый графитовый */
    }
    
    /* Эффект liquid fluid для кнопок */
    @keyframes liquid-fliud {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    .VPSocialLink {
      width: auto !important;
      height: auto !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      cursor: pointer;
      transition: all 0.3s ease !important;
      white-space: nowrap !important;
      margin: 0 !important;
      padding: 0 !important; /* сброс внутреннего отступа */
    }
    
    /* Кнопка "Как Работает" - графитовый цвет, без рамки, сохранив все исходные размеры и padding */
    .VPSocialLink[aria-label="login-link"]::after {
      content: "Как Работает";
      font-size: 14px !important;
      color: var(--graphite) !important;
      background: transparent !important;
      border: none !important;
      border-radius: 6px !important;
      padding: 6px 12px !important;
      font-weight: 400 !important;
      transition: color 0.3s ease !important;
      white-space: nowrap !important;
      margin: 0 !important;
      flex-shrink: 0 !important;
      box-shadow: none !important;
    }
    
    .VPSocialLink[aria-label="login-link"]:hover::after {
      color: var(--lime-bright) !important;
      background: transparent !important;
      font-weight: 600 !important;
    }
    
    /* Кнопка "Отправить ⚡ Сигнал" - лаймовая с эффектом liquid fluid */
    .VPSocialLink[aria-label="signal-link"]::after {
      content: "Отправить ⚡ Сигнал";
      font-size: 14px !important;
      color: #000 !important;
      padding: 8px 16px !important;
      border-radius: 6px !important;
      font-weight: 600 !important;
      border: none !important; /* убрана рамка */
      background-image: linear-gradient(-45deg, var(--lime-bright), var(--lime-dark), var(--lime-bright), var(--lime-dark));
      background-size: 400% 400%;
      animation: liquid-fliud 6s ease infinite;
      transition: all 0.3s ease !important;
      white-space: nowrap !important;
      margin: 0 !important;
      flex-shrink: 0 !important;
    }
    
    .VPSocialLink[aria-label="signal-link"]:hover::after {
      background-image: linear-gradient(-45deg, var(--lime-dark), var(--lime-bright), var(--lime-dark), var(--lime-bright));
      color: #000 !important;
      font-weight: 700 !important;
      transform: translateY(-2px);
    }
  `]
  ],
  
  base: '/',
  outDir: '.vitepress/dist',
  description: 'Где Начинается Ваша Кофейня',
  
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: "Сигнал",
    sidebarMenuLabel: 'Меню',
    outlineTitle: 'На этой странице',
    returnToTopLabel: 'Наверх',
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    
    notFound: {
      title: 'СТРАНИЦА НЕ НАЙДЕНА',
      quote: 'Но если вы не измените направление, и если вы продолжите искать, вы можете в конечном итоге оказаться там, куда вы направляетесь.',
      linkText: 'Вернуться домой'
    },
    
    sidebar: {
      '/pro/': { items: sidebarBrew() },
      '/invest/': { items: sidebarPulse() },
      '/terms/': { items: sidebarTerms() }
    },
    search: {
      provider: 'local',
      options: {
        placeholder: 'Поиск…',
        translations: {
          button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
          modal: {
            displayDetails: 'Показать подробные результаты',
            resetButtonTitle: 'Сбросить поиск',
            backButtonTitle: 'Закрыть поиск',
            noResultsText: 'Результаты не найдены для',
            footer: { selectText: 'Выбрать', navigateText: 'Навигация', closeText: 'Закрыть' }
          }
        }
      }
    },
    nav: nav(),
    socialLinks: [
      { 
        icon: { 
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor"/></svg>' 
        }, 
        link: 'https://t.me/runscale' 
      },
      { 
        icon: { svg: '' }, 
        link: '/signals', 
        ariaLabel: 'login-link' 
      },
      { 
        icon: { svg: '' }, 
        link: '/signal/new', 
        ariaLabel: 'signal-link' 
      }
    ],
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Кофейни', link: '/me' },
    {
      text: 'Инвестиции',
      items: [
        { text: 'Пульс', link: '/invest/pulse' },
        { text: 'Индекс', link: '/invest/smr' },
        { text: 'Прогноз Выручки', link: '/invest/calc' },
        { text: 'Симулятор Самары', link: '/invest/sim' },
        { text: 'Кофейни // Россия', link: '/invest/vision' }
      ]
    },
    {
      text: 'Для Бизнеса',
      items: [
        { text: '→ Начать', link: '/pro' },  
        { text: 'Диалоги', link: '/pro/dialogs' },
        { text: 'Радар', link: '/pro/radar' }
      ]
    }
  ]
}

function sidebarBrew(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Умная Кофейня',
      collapsed: false,
      items: [
        { text: '→ Начать', link: '/pro' },  
        { text: 'Диалоги', link: '/pro/dialogs' },
        { text: 'Радар', link: '/pro/radar' }
      ]
    }
  ]
}

function sidebarPulse(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Инвестиции',
      collapsed: false,
      items: [
        { text: 'Пульс', link: '/invest/pulse' },
        { text: 'Индекс', link: '/invest/smr' },
        { text: 'Прогноз Выручки', link: '/invest/calc' },
        { text: 'Симулятор Самары', link: '/invest/sim' },
        { text: 'Кофейни // Россия', link: '/invest/vision' }
      ]
    }
  ]
}

function sidebarTerms(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Условия использования', 
      collapsed: false, 
      items: [
        { text: 'Соглашения', link: '/terms' },
        { text: 'Политика конфиденциальности', link: '/terms/policy' },
        { text: 'Согласие на обработку данных', link: '/terms/privacy' },
        { text: 'Оферта', link: '/terms/oferta' }
      ]
    }]
}
