import { defineConfig, DefaultTheme } from 'vitepress'
import pkg from '../package.json' assert { type: 'json' }
const { version } = pkg

export default defineConfig({
  title: 'Модуль Роста® – Расти по своим правилам',
  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'Модуль Роста® – Расти по своим правилам',
      description: 'Находим то, что другие упускают.',
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
        { text: 'Журнал', href: '/journal/contents/index' },
        { text: 'Телеграм-канал', href: 'https://t.me/runscale', target: '_blank' },
        { text: 'Поддержка', href: '/support' },
        { text: 'Условия использования', href: '/terms' },
        { text: 'Контакт', href: '/about/contacts' },
        { text: 'Orxaos', href: 'https://orxaos.sbs', target: '_blank' }
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
      html += '<div style="color: white; font-size: 14px;">Расти по своим правилам</div>';
      html += '<div style="color: var(--vp-c-text-2); margin-top: 4px; font-size: 14px; text-align: center;">© Модуль Роста® 2010 — 2025</div>';
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

    function updateApplyLinkTarget() {
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
      document.addEventListener('DOMContentLoaded', () => {
        replaceFooter();
        updateApplyLinkTarget();
      });
    } else {
      replaceFooter();
      updateApplyLinkTarget();
    }

    window.addEventListener('load', () => {
      replaceFooter();
      updateApplyLinkTarget();
    });
    setTimeout(() => {
      replaceFooter();
      updateApplyLinkTarget();
    }, 1000);
    setTimeout(() => {
      replaceFooter();
      updateApplyLinkTarget();
    }, 2000);

    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(() => {
          replaceFooter();
          updateApplyLinkTarget();
        }, 100);
      }
    }).observe(document, { subtree: true, childList: true });
  })();
`],
    ['style', {}, `
    /* === СТИЛИ ДЛЯ HERO-СЕКЦИИ === */
    .VPHero .name,
    .VPHero .text,
    .VPHero .tagline {
      color: white !important;
    }
    /* === КОНЕЦ СТИЛЕЙ ДЛЯ HERO-СЕКЦИИ === */

    /* === СТИЛИ ДЛЯ ССЫЛОК И КНОПОК НА ГЛАВНОЙ СТРАНИЦЕ === */
    /* Ссылки в hero-секции (не кнопки) */
    .VPHero .tagline a {
      color: var(--vp-c-brand-2) !important;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .VPHero .tagline a:hover {
      color: var(--vp-c-brand-1) !important;
      text-decoration: underline;
    }

    /* Кнопки действий в hero-секции */
    .VPHero .VPButton {
      background-color: var(--vp-c-brand-1) !important;
      border-color: var(--vp-c-brand-1) !important;
      color: white !important;
      transition: all 0.3s ease;
      text-decoration: none !important;
    }

    .VPHero .VPButton:hover {
      background-color: var(--vp-c-brand-2) !important;
      border-color: var(--vp-c-brand-2) !important;
      color: #000 !important;
      transform: translateY(-2px);
      text-decoration: none !important;
    }

    /* Ссылки в основном контенте главной страницы */
    .VPContent a {
      color: var(--vp-c-brand-2);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease;
    }

    .VPContent a:hover {
      color: var(--vp-c-brand-1);
      border-bottom-color: var(--vp-c-brand-1);
    }
    
    /* === ИСПРАВЛЕННЫЕ СТИЛИ ДЛЯ КАРТОЧЕК, ЧТОБЫ ОНИ ВСЕГДА БЫЛИ ТЕМНЫМИ === */
    /* Фиксируем темный фон для карточек в любой теме */
    .VPFeature {
      background-color: #202124 !important;
      border: 1px solid #3c3c3c !important;
    }
    
    /* ЗАГОЛОВОК КАРТОЧКИ: всегда ярко-зеленый */
    .VPFeature .title {
      color: var(--vp-c-brand-2) !important;
    }
    
    /* ОПИСАНИЕ В КАРТОЧКЕ: всегда светло-серый */
    .VPFeature .details {
      color: var(--vp-c-text-dark-2) !important;
    }
    
    /* ССЫЛКА В КАРТОЧКЕ: всегда приглушенный зеленый */
    .VPFeature .link-text {
      color: var(--vp-c-brand-1) !important;
    }
    
    .VPFeature .link-text .icon {
      fill: var(--vp-c-brand-1) !important;
    }
    
    /* --- СТИЛИ ПРИ НАВЕДЕНИИ НА КАРТОЧКУ --- */
    a.VPFeature.link:hover {
      background-color: #2f2f2f !important;
      border-color: #555 !important;
    }
    
    /* При наведении меняем цвет только у ссылки */
    a.VPFeature.link:hover .link-text {
      color: var(--vp-c-brand-2) !important;
    }
    a.VPFeature.link:hover .link-text .icon {
      fill: var(--vp-c-brand-2) !important;
    }
    /* === КОНЕЦ СТИЛЕЙ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ === */

    :root {
      --vp-c-brand-1: #347b6c; /* Новый, более яркий зеленый */
      --vp-c-brand-2: #C5F946;
      --vp-c-brand-3: #347b6c;
      --vp-c-brand-soft: rgba(52, 123, 108, 0.14);
    }
    .VPNavBarTitle .logo {
      height: 32px !important;
      width: auto !important;
    }
    .VPNavBarSocialLinks {
      min-width: 280px !important;
      justify-content: flex-end !important;
      gap: 20px !important;
      margin-left: 0px !important;
    }
    .VPSocialLink .vpi-social-github {
      display: none !important;
    }
    .VPSocialLink {
      width: auto !important;
      height: auto !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .VPSocialLink[aria-label="login-link"]::after {
      content: "Войти";
      font-size: 14px;
      color: var(--vp-c-text-1);
      padding: 6px 12px;
      border: 1px solid var(--vp-c-divider);
      border-radius: 6px;
      background: transparent;
      transition: all 0.3s ease;
      white-space: nowrap;
      margin: 0 4px;
    }
    .VPSocialLink[aria-label="login-link"]:hover::after {
      background: var(--vp-c-bg-soft);
      border-color: var(--vp-c-brand);
    }
    .VPSocialLink[aria-label="apply-link"]::after {
      content: "Получить ответ";
      font-size: 14px;
      color: white;
      padding: 6px 12px;
      border: 1px solid var(--vp-c-brand);
      border-radius: 6px;
      background: var(--vp-c-brand);
      transition: all 0.3s ease;
      white-space: nowrap;
      margin: 0 4px;
    }
    .VPSocialLink[aria-label="apply-link"]:hover::after {
      background: var(--vp-c-brand-2) !important; /* Ярко-зеленый фон */
      border-color: var(--vp-c-brand-2) !important;
      color: #000 !important; /* Черный текст для читаемости */
      transform: translateY(-1px);
    }
    .custom-footer-links {
      display: flex;
      flex-direction: column;
      gap: 3px;
      align-items: center;
    }
    .footer-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .footer-row a {
      color: var(--vp-c-text-2);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    .footer-row a:hover {
      color: var(--vp-c-brand);
    }
    .dot-separator {
      color: var(--vp-c-text-3);
      font-weight: bold;
    }
    .VPFooter .copyright {
      margin-top: 2px !important;
    }
    @media (max-width: 768px) {
      .VPNavBarSocialLinks {
        width: 100% !important;
        min-width: 100% !important;
        flex-direction: column !important;
        gap: 8px !important;
        padding: 0 16px !important;
        box-sizing: border-box !important;
        margin-left: 8 !important;
      }
      .VPSocialLink {
        width: 100% !important;
        display: flex !important;
        justify-content: center !important;
        box-sizing: border-box !important;
      }
      .VPSocialLink[aria-label="login-link"]::after,
      .VPSocialLink[aria-label="apply-link"]::after {
        width: 100% !important;
        display: block !important;
        text-align: center;
        padding: 10px 12px !important;
        margin: 10 !important;
        box-sizing: border-box !important;
      }
      .footer-row {
        flex-direction: column;
        gap: 8px;
      }
      .dot-separator {
        display: none;
      }
    }
    `]
  ],
  base: '/',
  outDir: '.vitepress/dist',
  description: 'Эксперты по системному росту бизнеса. Помогаем владельцам компаний находить скрытые резервы прибыли через data-driven подход и глубокую диагностику процессов.',
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: "Модуль Роста®",
    
    sidebarMenuLabel: 'Меню',
    outlineTitle: 'На этой странице',
    returnToTopLabel: 'Наверх',
    
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    
    sidebar: {
      '/about/': { items: sidebarAbout() },
      '/method/': { items: sidebarMethod() },
      '/technology/': { items: sidebarTechnology() },
      '/checkup/': { items: sidebarCheckup() },
      '/system/': { items: sidebarSystem() },
      '/journal/': { items: sidebarJournal() },
      '/radar/': { items: sidebarRadar() },
      '/clients/': { items: sidebarClients() }
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
      { icon: 'github', link: 'https://app.mplan.sbs', ariaLabel: 'login-link' },
      { icon: 'github', link: '/apply', ariaLabel: 'apply-link', target: '_self'  }
    ],
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Продукты', items: [
        { text: 'Чекап', link: '/checkup/overview' },
        { text: 'Система роста бизнеса', link: '/system/overview' }
      ]
    },
    { text: 'Радар', items: [
        { text: 'Индекс Роста', link: '/radar/overview' },
        { text: 'Сигнал Радара', link: '/radar/signal/log' },
        { text: 'Программа рекомендаций', link: '/radar/invite' }
      ]
    },
    { text: 'Компания', items: [
        { text: 'Кто мы', link: '/about/company' },
        { text: 'Метод', link: '/method/overview' },
        { text: 'Технологии', link: '/technology/overview' },
        { text: 'Клиенты', link: '/clients/list' }
      ]
    }
  ]
}

function sidebarAbout(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Компания', collapsed: false, items: [
        { text: 'Кто мы', link: '/about/company' },
        { text: 'Мы, Растем', link: '/about/mission' },
        { text: 'Не только цифры, но и эмоции', link: '/about/balance' },
        { text: 'Контакт', link: '/about/contacts' }
      ]
    }]
}

function sidebarMethod(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Метод', collapsed: false, items: [
        { text: 'Обзор', link: '/method/overview' },
        { text: '3 принципа здоровой аналитики', link: '/method/the-three-principles' },
        { text: 'Метод эффективной трансформации', link: '/method/transform' },
        { text: 'Фрейм-менеджмент', link: '/method/frames' },
        { text: 'Рост – это не гонка, а приключение', link: '/method/not-a-race' },
        { text: 'Сравнить', link: '/method/pro-et-contra' }
      ]
    }]
}

function sidebarTechnology(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Технологии', collapsed: false, items: [
        { text: 'Обзор', link: '/technology/overview' },
        { text: 'Живая база знаний', link: '/technology/datahub' },
        { text: 'Аналитика 360°', link: '/technology/analytics-360' },
        { text: 'ИИ-ассистент продаж', link: '/technology/anna' },
        { text: 'Речевая аналитика', link: '/technology/wordpower' },
        { text: 'Дистанционные стратегические сессии', link: '/technology/vision-now' },
        { text: 'Живые Стандарты', link: '/technology/live-standarts' },
      ]
    }]
}

function sidebarCheckup(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Бизнес-чекап', collapsed: false, items: [
        { text: 'Обзор', link: '/checkup/overview' },
        { text: 'Детали чекапа', link: '/checkup/specs' },
        { text: 'Глубокий чекап', link: '/checkup/deep' },
        { text: 'Платите за движение', link: '/checkup/pay-as-you-go' },
        { text: 'Чек-лист готовности', link: '/checkup/checklist' }
      ]
    },
    { text: 'Подготовка к чекапу', collapsed: false, items: [
        { text: 'Обзор', link: '/checkup/prep/overview' },        
        { text: '1 - Скрытые проблемы, которые блокируют рост', link: '/checkup/prep/01-hidden-problems-blocking-growth' },
        { text: '2 - Почему мы запрашиваем готовые отчёты, а не доступы к системам', link: '/checkup/prep/02-why-we-request-ready-reports-not-system-access' },
        { text: '3 - Почему важно смотреть на весь бизнес, а не на «локальные проблемы»', link: '/checkup/prep/03-system-diagnostics-vs-one-time-solutions' },
        { text: '4 - Чекап как первый шаг к фрейм-менеджменту', link: '/checkup/prep/04-checkup-for-data-driven-decisions' },
        { text: '5 - ИИ-аналитика в модели RAG: как живая база знаний меняет подход', link: '/checkup/prep/05-ai-analytics-rag-management' },
        { text: '6 - 10 разделов аналитики: анатомия вашего бизнеса', link: '/checkup/prep/06-10-diagnostic-sections' },
        { text: '7 - Три принципа здоровой аналитики на практике', link: '/checkup/prep/07-three-reliable-analytics-principles' },
        { text: '8 - Как превратить аналитику в ресурс роста – Итоги серии', link: '/checkup/prep/08-analytics-transparent-management' }
      ]
    }
  ]
}

function sidebarSystem(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Система роста бизнеса', collapsed: false, items: [
        { text: 'Обзор', link: '/system/overview' },
        { text: '12-нед. интенсив', link: '/system/12-weeks' }
      ]
    }]
}

function sidebarJournal(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Журнал', collapsed: false, items: [
        { text: 'Содержание', link: '/journal/contents/index' },        
        { text: 'Кейсы', link: '/journal/contents/cases' },
        { text: 'Статьи', link: '/journal/contents/articles' }
      ]
    }]
}

function sidebarRadar(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Радар', collapsed: false, items: [
        { text: 'Индекс Роста', link: '/radar/overview' },
        { text: 'Критерии для расчета индекса', link: '/radar/scale_index' },
        { text: 'Сигнал Радара', link: '/radar/signal/log' },
        { text: 'Фильтр Потенциала', link: '/radar/filter' },
        { text: 'Кто Анна', link: '/radar/who-is-anna' },
        { text: 'Программа рекомендаций', link: '/radar/invite' }
      ]
    }]
}

function sidebarClients(): DefaultTheme.SidebarItem[] {
  return [{
      text: 'Клиенты', collapsed: false, items: [
        { text: 'Обзор', link: '/clients/list' },
        { text: 'Конкордия-Авто', link: '/clients/konkordiya-auto' },
        { text: 'Блумкидс', link: '/clients/bloomkids' },
        { text: 'Чишминский Молочный Завод', link: '/clients/chishminskiy' },
        { text: 'Ермолаевъ', link: '/clients/ermolaev' },
        { text: 'FIZ Культура', link: '/clients/fiz-kultura.md' },
        { text: 'Фонд им. Дмитрия Хворостовского', link: '/clients/hvorostovsky-foundation' },
        { text: 'Milimon', link: '/clients/milimon.md' },
        { text: 'SM Live', link: '/clients/sm-live' },
        { text: 'SMSTRETCHING', link: '/clients/smstretching' },
        { text: 'СУПЕРЛЕНД', link: '/clients/superland' },
        { text: 'WOODLED', link: '/clients/woodled' },
        { text: 'World Plastics Summit 2022', link: '/clients/world-plastics-summit-2022' },
      ]
    }]
}
