import { defineConfig, DefaultTheme } from 'vitepress'
import pkg from '../package.json' assert { type: 'json' }
const { version } = pkg

export default defineConfig({
  title: 'Модуль Роста® – Расти по своим правилам',
  description: 'Эксперты по системному росту бизнеса. Помогаем владельцам компаний находить скрытые резервы прибыли через data-driven подход и глубокую диагностику процессов.',
  base: '/',
  outDir: '.vitepress/dist',
  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'Модуль Роста® – Расти по своим правилам',
      description: 'Расти по своим правилам с Модуль Роста®',
    },
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
            html += '<a href="' + link.href + '">' + link.text + '</a>';
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
          if (location.pathname !== '/') {
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
          document.querySelectorAll('.VPSocialLink[aria-label="apply-link"]').forEach(el => {
            el.href = '/apply';
            el.setAttribute('target', '_self');
            el.removeAttribute('rel');
          });
        }

        const init = () => {
          replaceFooter();
          updateApplyLinkTarget();
        };
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', init);
        } else {
          init();
        }
        window.addEventListener('load', init);
        setTimeout(init, 1000);
        setTimeout(init, 2000);
        let lastUrl = location.href;
        new MutationObserver(() => {
          if (location.href !== lastUrl) {
            lastUrl = location.href;
            setTimeout(init, 100);
          }
        }).observe(document, { subtree: true, childList: true });
      })();
    `],
    ['style', {}, `
      :root {
        --vp-c-brand-1: #2e6b5e;
        --vp-c-brand-2: #3a7d6e;
        --vp-c-brand-3: #2e6b5e;
        --vp-c-brand-soft: rgba(46, 107, 94, 0.14);
      }
      .VPNavBarTitle .logo { height: 32px !important; }
      .VPNavBarSocialLinks { min-width: 280px!important; justify-content: flex-end!important; gap:20px!important; }
      .VPSocialLink .vpi-social-github { display: none!important; }
      .VPSocialLink { display: inline-flex!important; align-items: center!important; justify-content: center!important; }
      .VPSocialLink[aria-label="login-link"]::after {
        content: "Войти"; font-size:14px; color:var(--vp-c-text-1);
        padding:6px 12px; border:1px solid var(--vp-c-divider); border-radius:6px;
        transition: all .3s; white-space: nowrap; margin:0 4px;
      }
      .VPSocialLink[aria-label="login-link"]:hover::after {
        background: var(--vp-c-bg-soft); border-color: var(--vp-c-brand);
      }
      .VPSocialLink[aria-label="apply-link"]::after {
        content: "Получить ответ"; font-size:14px; color:#fff;
        padding:6px 12px; border:1px solid var(--vp-c-brand); border-radius:6px;
        background: var(--vp-c-brand); transition: all .3s; white-space: nowrap; margin:0 4px;
      }
      .VPSocialLink[aria-label="apply-link"]:hover::after {
        background: var(--vp-c-brand-darker,var(--vp-c-brand)); transform: translateY(-1px);
      }
      .custom-footer-links { display:flex; flex-direction:column; gap:3px; align-items:center; }
      .footer-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; justify-content:center; }
      .footer-row a { color:var(--vp-c-text-2); text-decoration:none; transition:color .3s; }
      .footer-row a:hover { color:var(--vp-c-brand); }
      .dot-separator { color:var(--vp-c-text-3); font-weight:bold; }
      @media(max-width:768px){
        .VPNavBarSocialLinks { width:100%!important; flex-direction:column!important; gap:8px!important; padding:0 16px!important; }
        .VPSocialLink { width:100%!important; justify-content:center!important; }
        .VPSocialLink[aria-label="login-link"]::after,
        .VPSocialLink[aria-label="apply-link"]::after {
          width:100%!important; display:block!important; text-align:center; padding:10px 12px!important; margin:10!important;
        }
        .footer-row { flex-direction:column; gap:8px; }
        .dot-separator { display:none; }
      }
    `]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Модуль Роста',
    nav: nav(),
    sidebar: {
      '/about/': { items: sidebarAbout() },
      '/method/': { items: sidebarMethod() },
      '/technology/': { items: sidebarTechnology() },
      '/checkup/': { items: sidebarCheckup() },
      '/system/': { items: sidebarSystem() },
      '/journal/': { items: sidebarJournal() },
      '/radar/': { items: sidebarRadar() }
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
            footer: {
              selectText: 'выбрать',
              navigateText: 'навигация',
              closeText: 'закрыть'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://app.mplan.sbs', ariaLabel: 'login-link' },
      { icon: 'github', link: '/apply', ariaLabel: 'apply-link', target: '_self' }
    ]
  }
})

// Функции навигации и сайдбара

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Радар', items: [
        { text: 'Обзор', link: '/radar/overview' },
        { text: 'Индекс Скрытого Потенциала', link: '/radar/scale_index' },
        { text: 'Фильтр Потенциала', link: '/radar/filter' },
        { text: 'Кто Анна', link: '/radar/who-is-anna' },
        { text: 'Программа рекомендаций', link: '/radar/invite' }
      ]
    },
    { text: 'Продукты', items: [
        { text: 'Чекап', link: '/checkup/overview' },
        { text: 'Система роста бизнеса', link: '/system/overview' }
      ]
    },
    { text: 'Компания', items: [
        { text: 'О нас', link: '/about/overview' },
        { text: 'Метод', link: '/method/overview' },
        { text: 'Технологии', link: '/technology/overview' },
        { text: 'Клиенты и кейсы', link: '/about/clients/list' }
      ]
    }
  ]
}

function sidebarAbout(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Компания', collapsed: false, items: [
        { text: 'О нас', link: '/about/overview' },
        { text: 'Мы, Растем', link: '/about/mission' },
        { text: 'Мы, Растем', link: '/about/not-a-race' },
        { text: 'Контакт', link: '/about/contacts' }
      ]
    },
    { text: 'Клиенты', collapsed: false, items: [
        { text: 'Обзор', link: '/about/clients/list' },
        { text: 'Конкордия-Авто', link: '/about/clients/konkordiya-auto' }
      ]
    }
  ]
}

function sidebarMethod(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Метод', collapsed: false, items: [
        { text: 'Обзор', link: '/method/overview' },
        { text: '3 принципа здоровой аналитики', link: '/method/different' },
        { text: 'Метод эффективной трансформации', link: '/method/transform' },
        { text: 'Фрейм-менеджмент', link: '/method/frames' },
        { text: 'Сравнить', link: '/method/pro-et-contra' }
      ]
    }
  ]
}

function sidebarTechnology(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Технологии', collapsed: false, items: [
        { text: 'Обзор', link: '/technology/overview' },
        { text: 'Живая база знаний', link: '/technology/datahub' },
        { text: 'Аналитика 360°', link: '/technology/analytics-360' },
        { text: 'ИИ-ассистент продаж', link: '/technology/anna' },
        { text: 'Речевая аналитика', link: '/technology/wordpower' },
        { text: 'Дистанционные стратегические сессии', link: '/technology/vision-now' },
        { text: 'Живые стандарты', link: '/technology/live-standarts' }
      ]
    }
  ]
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
  return [
    { text: 'Система роста бизнеса', collapsed: false, items: [
        { text: 'Обзор', link: '/system/overview' },
        { text: '12-нед. интенсив', link: '/system/12-weeks' }
      ]
    }
  ]
}

function sidebarJournal(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Журнал', collapsed: false, items: [
        { text: 'Содержание', link: '/journal/contents/index' },
        { text: 'Кейсы', link: '/journal/contents/cases' },
        { text: 'Статьи', link: '/journal/contents/articles' },
        { text: 'Экспертиза', link: '/journal/contents/expertise' }
      ]
    }
  ]
}

function sidebarRadar(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Радар', collapsed: false, items: [
        { text: 'Обзор', link: '/radar/overview' },
        { text: 'Индекс Скрытого Потенциала', link: '/radar/scale_index' },
        { text: 'Фильтр Потенциала', link: '/radar/filter' },
        { text: 'Кто Анна', link: '/radar/who-is-anna' },
        { text: 'Программа рекомендаций', link: '/radar/invite' }
      ]
    }
  ]
}
