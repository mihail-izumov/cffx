import { defineConfig, DefaultTheme } from 'vitepress'
import pkg from '../package.json' assert { type: 'json' }
const { version } = pkg
export default defineConfig({
  title: 'Отзывы, Тикет-система, Индекс Роста | Сигнал',
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
  buildEnd(siteConfig) {
    // Этот хук выполняется после сборки
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['script', {}, `
    (function() {
      function createFooterContent() {
        const links = [
          { text: 'Обновления', href: '/changelog' },
          { text: 'Поддержка', href: '/support' },
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
        // --- Correction for the "signal-link" button ---
        const signalLinks = document.querySelectorAll('.VPSocialLink[aria-label="signal-link"]');
        signalLinks.forEach(signalLink => {
          signalLink.setAttribute('target', '_self');
          signalLink.removeAttribute('rel');
        });
        // --- Original functionality for "apply-link" ---
        const applyLinks = document.querySelectorAll('.VPSocialLink[aria-label="apply-link"]');
        applyLinks.forEach(applyLink => {
          applyLink.href = '/apply';
          applyLink.setAttribute('target', '_self');
          applyLink.removeAttribute('rel');
          const newLink = document.createElement('a');
          newLink.href = '/apply';
          newLink.className = applyLink.className;
          newLink.setAttribute('aria-label', 'apply-link');
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
    .VPSwitchAppearance{display:none!important}
    .VPSocialLink[aria-label="login-link"]::after{font-weight:600!important}
    .VPHero .name,.VPHero .text,.VPHero .tagline{color:white!important}
    .VPHero .tagline a{color:var(--vp-c-brand-2)!important;text-decoration:none;transition:all .3s ease}
    .VPHero .tagline a:hover{color:var(--vp-c-brand-1)!important;text-decoration:underline}
    .VPHero .VPButton{background-color:var(--vp-c-brand-1)!important;border-color:var(--vp-c-brand-1)!important;color:white!important;transition:all .3s ease;text-decoration:none!important}
    .VPHero .VPButton:hover{background-color:var(--vp-c-brand-2)!important;border-color:var(--vp-c-brand-2)!important;color:#000!important;transform:translateY(-2px);text-decoration:none!important}
    .VPContent a{color:var(--vp-c-brand-2);text-decoration:none;border-bottom:1px solid transparent;transition:all .3s ease}
    .VPContent a:hover{color:var(--vp-c-brand-1);border-bottom-color:var(--vp-c-brand-1)}
    .VPFeature .title,.VPFeature .link-text{transition:color .25s ease-in-out}
    .VPFeature .link-text{color:var(--vp-c-brand-1)}
    a.VPFeature.link:hover .title,a.VPFeature.link:hover .link-text{color:var(--vp-c-brand-2)}
    html:not(.dark) .VPFeature{background-color:#202124!important;border-color:#3c3c3c!important}
    html:not(.dark) .VPFeature .title{color:#C5F946!important}
    html:not(.dark) .VPFeature .details{color:rgba(235,235,245,.6)!important}
    html:not(.dark) .VPFeature .link-text{color:#347b6c!important}
    html:not(.dark) .VPFeature .link-text .icon{fill:#347b6c!important}
    html:not(.dark) a.VPFeature.link:hover{background-color:#2f2f2f!important;border-color:#555!important}
    
    /* Переопределение базовых CSS переменных VitePress */
    :root{
      --vp-c-brand-1:#347b6c;
      --vp-c-brand-2:#C5F946;
      --vp-c-brand-3:#347b6c;
      --vp-c-brand-soft:rgba(52,123,108,.14);
      /* Заменяем серые цвета на зелёные */
      --vp-c-bg-mute:rgba(52,123,108,.1);
      --vp-c-bg-soft:rgba(52,123,108,.1);
      --vp-c-divider:rgba(52,123,108,.2);
      --vp-c-gutter:rgba(52,123,108,.1);
      /* Переопределяем цвета текста для единообразия */
      --vp-c-text-2:#b3b3b3;
    }
    
    .VPNavBarTitle .logo{height:32px!important;width:auto!important}
    
    /* Исправление навигации - принудительно белые цвета */
    .VPNavBar .VPNavBarMenu .VPNavBarMenuLink{color:white!important}
    .VPNavBar .VPNavBarMenu .VPNavBarMenuLink:hover{color:var(--vp-c-brand-2)!important}
    .VPNavBar .VPNavBarMenu .VPNavBarMenuLink.active{color:var(--vp-c-brand-2)!important}
    .VPNavBar .VPNavBarMenu .VPNavBarMenuLink.has-dropdown{color:white!important}
    .VPNavBar .VPNavBarMenu .VPNavBarMenuLink.has-dropdown:hover{color:var(--vp-c-brand-2)!important}
    
    /* Выпадающее меню - исправленные цвета ховера */
    .VPMenuGroup .title{color:var(--vp-c-brand-2)!important}
    .VPMenuItem .text{color:white!important}
    .VPMenuItem:hover .text{color:var(--vp-c-brand-2)!important}
    .VPMenuItem:hover{background-color:rgba(197,249,70,.1)!important}
    
    /* Телеграм иконка - принудительно белая (это действительно github иконка в конфиге) */
    .VPSocialLinks .VPSocialLink svg{fill:white!important}
    .VPSocialLinks .VPSocialLink:hover svg{fill:var(--vp-c-brand-2)!important}
    .VPSocialLinks .VPSocialLink:first-child svg{fill:white!important}
    .VPSocialLinks .VPSocialLink:first-child:hover svg{fill:var(--vp-c-brand-2)!important}
    
    @media (min-width:961px){
      .VPNavBar .content{gap:0!important}
      .VPNavBarMenu{margin-right:0!important}
      .VPNavBarSocialLinks{min-width:auto!important;justify-content:flex-end!important;gap:16px!important;margin-left:0!important;flex-shrink:0!important}
      .VPSocialLink:not(:last-child){margin-right:4px!important}
    }
    @media (max-width:960px) and (min-width:769px){
      .VPNavBar .content{gap:0!important}
      .VPNavBarMenu{margin-right:0!important}
      .VPNavBarSocialLinks{margin-left:4px!important;gap:12px!important;flex-shrink:0!important}
      .VPSocialLink:not(:last-child){margin-right:2px!important}
    }
    @media (max-width:768px){
      .VPNavBar .VPNavBarSocialLinks{display:none!important}
      .VPNavScreen{overflow-y:auto!important}
      .VPNavScreen .VPNavScreenMenu{padding-bottom:16px!important}
      .VPNavScreen .VPNavScreenSocialLinks,.VPNavScreen .VPNavScreenAppearance{margin:16px!important;padding:16px!important;border:1px solid var(--vp-c-divider)!important;border-radius:8px!important;background:var(--vp-c-bg-soft)!important}
      .VPNavScreen .VPNavScreenAppearance{display:none!important}
      .VPNavScreen .VPNavScreenSocialLinks{display:flex!important;flex-direction:column!important;gap:12px!important}
      .VPNavScreen .VPSocialLink{display:flex!important;align-items:center!important;justify-content:center!important;padding:12px!important;background:var(--vp-c-bg)!important;border-radius:6px!important;border:1px solid var(--vp-c-divider)!important;transition:all .3s ease!important;text-decoration:none!important}
      .VPNavScreen .VPSocialLink:hover{background:var(--vp-c-bg-mute)!important;border-color:var(--vp-c-brand)!important}
      .VPNavScreen .VPSocialLink[aria-label="login-link"]::after{content:"Кабинет"!important;font-size:16px!important;font-weight:600!important;color:var(--vp-c-text-1)!important}
      .VPNavScreen .VPSocialLink[aria-label="signal-link"]::after{content:"Отправить ⚡ Сигнал"!important;font-size:16px!important;font-weight:600!important;color:white!important;background:var(--vp-c-brand-1)!important;border-radius:6px!important;padding:6px 12px!important}
      .footer-row{flex-direction:column!important;gap:8px!important}
      .dot-separator{display:none!important}
    }
    
    /* Стили кнопок - исправлены цвета + молния между слов */
    .VPSocialLink .vpi-social-github{display:none!important}
    .VPSocialLink{width:auto!important;height:auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important}
    .VPSocialLink[aria-label="login-link"]::after{content:"Кабинет";font-size:14px;color:white!important;padding:6px 12px;border:1px solid var(--vp-c-brand-1);border-radius:6px;background:transparent;transition:all .3s ease;white-space:nowrap;margin:0;flex-shrink:0}
    .VPSocialLink[aria-label="login-link"]:hover::after{background:var(--vp-c-bg-soft);border-color:var(--vp-c-brand-2);color:var(--vp-c-brand-2)!important}
    .VPSocialLink[aria-label="signal-link"]::after{content:"Отправить ⚡ Сигнал";font-size:14px;color:white;padding:8px 16px;border:1px solid var(--vp-c-brand-1);border-radius:6px;background:var(--vp-c-brand-1);transition:all .3s ease;white-space:nowrap;margin:0;flex-shrink:0;font-weight:600}
    .VPSocialLink[aria-label="signal-link"]:hover::after{background:var(--vp-c-brand-2);border-color:var(--vp-c-brand-2);color:#000}
    
    .custom-footer-links{display:flex;flex-direction:column;gap:3px;align-items:center}
    .footer-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center}
    .footer-row a{color:var(--vp-c-text-2);text-decoration:none;transition:color .3s ease}
    .footer-row a:hover{color:var(--vp-c-brand)}
    .dot-separator{color:var(--vp-c-text-3);font-weight:bold}
    .VPFooter .copyright{margin-top:2px!important}
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
      '/brew/': { items: sidebarBrew() },
      '/pulse/': { items: sidebarPulse() },
      '/radar/signal/coffee-points-nsk-2025/': { items: [] },
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
            footer: { selectText: 'выбрать', navigateText: 'навигация', closeText: 'закрыть' }
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
        link: 'https://app.mplan.sbs', 
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
    { text: 'Как работает', link: '/signals' },
    { text: 'Кофейни', link: '/smr' },
    { text: 'Пульс', link: '/pulse/invest' },
    {
      text: 'Для Бизнеса',
      items: [
        { text: 'Возможности', link: '/brew/run' },  
        { text: '→ Подключиться', link: '/brew/membership' }, 
        { text: 'Тикет-система', link: '/brew/tickets' },
        { text: 'Анализ конкурентов', link: '/brew/reports' }
      ]
    }
  ]
}
function sidebarBrew(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Для Бизнеса',
      collapsed: false,
      items: [
        { text: 'Возможности', link: '/brew/run' },  
        { text: '→ Подключиться', link: '/brew/membership' },  
        { text: 'Тикет-система', link: '/brew/tickets' },
        { text: 'Анализ конкурентов', link: '/brew/reports' }
      ]
    }
  ]
}
function sidebarPulse(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Пульс',
      collapsed: false,
      items: [
        { text: 'Инвестиции', link: '/pulse/invest' },
        { text: 'Прогноз дохода', link: '/pulse/calc' },
        { text: 'Диалоги с данными', link: '/pulse/sim' }
      ]
    }
  ]
}
function sidebarTerms(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Условия использования', collapsed: false, items: [
        { text: 'Соглашения', link: '/terms' },
        { text: 'Политика конфиденциальности', link: '/terms/policy' },
        { text: 'Согласие на обработку данных', link: '/terms/privacy' },
        { text: 'Оферта', link: '/terms/oferta' }
      ]
    }]
}
