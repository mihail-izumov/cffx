<template>
  <section class="signal-sla dark compact">
    <!-- ЕДИНЫЙ БЛОК: ВИДЖЕТЫ + ОСНОВНЫЕ ПОЛЯ КОМПАНИИ -->
    <div class="card">
      <div class="widget-row">
        <!-- Общепит -->
        <button class="widget-card" :class="{ active: state.widget==='cafe' }" @click="onWidgetChange('cafe')">
          <div class="widget-head">
            <img :src="WIDGETS.cafe.icon" alt="Общепит" class="widget-icon" />
            <div>
              <div class="w-title">Общепит</div>
              <ul class="checks" v-if="state.widget==='cafe'">
                <li v-for="b in WIDGETS.cafe.benefits" :key="'c'+b"><input type="checkbox" checked disabled /><span>{{ b }}</span></li>
              </ul>
            </div>
          </div>
        </button>
        <!-- Фитнес -->
        <button class="widget-card" :class="{ active: state.widget==='fitness' }" @click="onWidgetChange('fitness')">
          <div class="widget-head">
            <img :src="WIDGETS.fitness.icon" alt="Фитнес" class="widget-icon" />
            <div>
              <div class="w-title">Фитнес</div>
              <ul class="checks" v-if="state.widget==='fitness'">
                <li v-for="b in WIDGETS.fitness.benefits" :key="'f'+b"><input type="checkbox" checked disabled /><span>{{ b }}</span></li>
              </ul>
            </div>
          </div>
        </button>
      </div>

      <!-- Поля компании под карточками, все на всю ширину -->
      <div class="company-fields">
        <label class="row big-input"><input style="display:none" /><span>Название компании</span></label>
        <input class="company big" v-model="state.company.name" type="text" :placeholder="WIDGETS[state.widget].defaultCompany" />

        <label class="row">
          <input style="display:none" /><span>Кол-во локаций</span>
          <input class="range long white" type="range" min="1" max="50" step="1" v-model.number="state.company.locations" />
          <span class="inline-value">{{ state.company.locations }}</span>
        </label>

        <label class="row">
          <input style="display:none" />
          <span v-if="isCafe">Гости/мес</span><span v-else>Клиенты/мес</span>
          <input class="range long white" type="range" :min="sliderGuestsMin" :max="sliderGuestsMax" :step="sliderGuestsStep" v-model.number="state.company.guests_or_clients" />
          <span class="inline-value">{{ state.company.guests_or_clients }}</span>
        </label>

        <label class="row">
          <input style="display:none" />
          <span v-if="isCafe">Средний чек (₽)</span><span v-else>Абонемент/мес (₽)</span>
          <input class="range long white" type="range" :min="sliderMoneyMin" :max="sliderMoneyMax" :step="sliderMoneyStep" v-model.number="state.company.avg_check_or_subscription" />
          <span class="inline-value">{{ state.company.avg_check_or_subscription }} ₽</span>
        </label>

        <!-- Retention + LTV блоки внизу -->
        <div class="ltv-ret-block">
          <div class="ret-block">
            <label class="row"><input style="display:none" /><span>Текущий retention: <strong>{{ state.company.retention_pct }}%</strong></span></label>
            <input class="range long white" type="range" min="0" max="100" v-model.number="state.company.retention_pct" />
            <div class="hint small">{{ plannedText }}</div>
            <a class="linklike same" href="/pro/ltvcalc" target="_blank" rel="noopener">Как считаем</a>
          </div>

          <div class="ltv-block">
            <div class="ltv-title">Инструмент контроля LTV</div>
            <div class="ltv-grid">
              <button v-for="opt in ltvOptions" :key="opt" class="ltv-card" :class="{active: state.company.ltv_cards.includes(opt)}" type="button" @click="toggleLtvCard(opt)">
                <span>{{ opt }}</span>
              </button>
            </div>
            <input v-if="state.company.ltv_cards.includes('Другое')" v-model="state.company.ltv_tool_other" type="text" class="fullwidth ltv-other" placeholder="Опишите инструмент" />
          </div>
        </div>
      </div>
    </div>

    <!-- Источники стандартов -->
    <div class="card">
      <h3>Источники стандартов для Сигнала</h3>
      <div class="radio-left">
        <label class="row"><input type="radio" value="internal" v-model="state.standards_source" /><span>Внутренние стандарты</span></label>
        <label class="row"><input type="radio" value="signal" v-model="state.standards_source" /><span>Стандарты Сигнала</span></label>
      </div>
      <div class="divider"></div>
      <label class="row"><input type="checkbox" v-model="state.has_full_classification" /><span>Собственная классификация: скрипты</span></label>
      <div v-if="state.has_full_classification" class="checks-grid-2col">
        <label v-for="s in availableScripts" :key="s" class="row">
          <input type="checkbox" :value="s" v-model="state.client_scripts" /><span>{{ s }}</span>
        </label>
      </div>
    </div>

    <!-- Цели -->
    <div class="card">
      <h3>Цели</h3>
      <div class="goals-row">
        <div><div class="goal-title">Операционные</div>
          <div class="goal-line">Полное закрытие: {{ state.goals.full_close_time_hours }} ч; Без эскалации: {{ state.goals.resolved_without_escalation_pct }}%</div>
        </div>
        <button class="linklike same" @click="openModal('goals_ops')">Изменить</button>
      </div>
      <div class="goals-row">
        <div><div class="goal-title">Качество</div>
          <div class="goal-line">Точность: {{ state.goals.reco_accuracy_pct }}%; Получение NPS: {{ state.goals.nps_collected_pct }}%; NPS: {{ state.goals.nps_avg }}</div>
        </div>
        <button class="linklike same" @click="openModal('goals_quality')">Изменить</button>
      </div>
      <div class="goals-row">
        <div><div class="goal-title">Бизнес</div>
          <div class="goal-line">Возврат: {{ state.goals.returns_after_complaint_pct }}%; Компенсация: {{ state.goals.avg_compensation_rub }} ₽</div>
        </div>
        <button class="linklike same" @click="openModal('goals_business')">Изменить</button>
      </div>
    </div>

    <!-- Таймер NPS карточками -->
    <div class="card">
      <h3>Таймер запроса NPS</h3>
      <div class="nps-cards">
        <button v-for="c in npsCards" :key="c.value" class="nps-card" :class="{active: state.nps.step===c.value}" @click="selectNps(c.value)">
          {{ c.label }}
        </button>
      </div>
      <div v-if="state.nps.step===-1" class="grid1">
        <label class="row"><input style="display:none" /><span>Своё (ч)</span><input type="number" min="1" step="1" v-model.number="state.nps.custom_hours" /></label>
      </div>
    </div>

    <!-- Режим работы -->
    <div class="card">
      <h3>Режим работы</h3>
      <div class="radio-left grid2">
        <div class="row"><input type="radio" value="wk_9_18" v-model="state.work_hours.mode" /><span>Будни 9–18 МСК</span></div>
        <div class="row"><input type="radio" value="wk_9_18_we" v-model="state.work_hours.mode" /><span>9–18 МСК + выходные</span></div>
      </div>
      <div class="row" style="margin-top:8px;">
        <input class="radio-big" type="radio" value="extended" v-model="state.work_hours.mode" />
        <span>Расширенный режим — <button class="linklike same" type="button" @click="openModal('workhours')">Настроить</button></span>
      </div>
    </div>

    <!-- Категории A–Г (бейджи + ответственный) -->
    <div class="card">
      <h3>Категории A–Г</h3>
      <div class="mini-ag">
        <div class="mini-badge">Кат. А — 4 часа<div class="mini-sub">{{ ownerLabel(state.categories_map.A.owner) }}</div></div>
        <div class="mini-badge">Кат. Б — 2 часа<div class="mini-sub">{{ ownerLabel(state.categories_map.B.owner) }}</div></div>
        <div class="mini-badge">Кат. В — 1 час<div class="mini-sub">{{ ownerLabel(state.categories_map.C.owner) }}</div></div>
        <div class="mini-badge">Кат. Г — 15 минут<div class="mini-sub">{{ ownerLabel(state.categories_map.D.owner) }}</div></div>
      </div>
      <button class="linklike same" @click="openModal('categories')">Изменить роли и темы</button>
    </div>

    <!-- Шаблон тикета -->
    <div class="card">
      <h3>Шаблон тикета</h3>
      <div class="goal-line">Базовые поля: {{ state.ticket_template.base_fields_ru.join(', ') }}</div>
      <div class="goal-line">Дополнительные поля: {{ state.ticket_template.extra_fields.join(', ') || 'не выбрано' }}</div>
      <button class="linklike same" @click="openModal('ticket')">Изменить шаблон</button>
    </div>

    <!-- Контакты -->
    <div class="card">
      <h3>Контактные данные</h3>
      <div class="grid2">
        <label class="row"><input style="display:none" /><span>Имя</span><input v-model="state.contact.name" type="text" placeholder="Иван Петров" /></label>
        <label class="row"><input style="display:none" /><span>Телефон</span><input v-model="state.contact.phone" type="text" placeholder="+7 (999) 123-45-67" /></label>
      </div>
    </div>

    <!-- САММАРИ: SLA ТИТУЛЬНЫЙ БЛОК -->
    <div class="card summary onecol lime-outline">
      <h2 class="sla-title lime">{{ slaTitle }}</h2>
      <h2 class="price">₽30.000</h2>
      <div class="price-note">One-time payment</div>
      <div class="sla-groups no-checks">
        <div class="sla-group">
          <div class="sla-group-title">Почти готово</div>
          <div class="sla-text">{{ SLA_READY.join(', ') }}</div>
          <button class="linklike same" @click="openModal('sla_ready')">Почти готово</button>
        </div>
        <div class="sla-group">
          <div class="sla-group-title">потом</div>
          <div class="sla-text">{{ SLA_LATER.join(', ') }}</div>
          <button class="linklike same" @click="openModal('sla_later')">Доработать и согласовать</button>
        </div>
      </div>
      <div class="cta-row">
        <button class="primary full strong lime-btn" @click="submitForm">Отправить на сборку</button>
        <button class="primary full strong white-btn" type="button">Save for later</button>
      </div>
    </div>

    <!-- МОДАЛКИ -->
    <Teleport to="body">
      <Transition name="pricing-modal">
        <div v-if="isModalOpen" class="pricing-modal-overlay" @click="closeModal">
          <div class="pricing-modal-window" @click.stop>
            <button class="pricing-modal-close" @click="closeModal" aria-label="Закрыть"><CloseIcon /></button>

            <!-- Категории А/Б/В/Г -->
            <template v-if="modalKind==='categories'">
              <div class="pricing-modal-header">НАСТРОЙКИ</div>
              <h2 class="pricing-modal-title">Категории А/Б/В/Г</h2>
              <div class="pricing-modal-body">
                <div class="owner-grid spaced">
                  <div v-for="k in ['A','B','C','D']" :key="k" class="owner-col surface">
                    <h2 class="cat-h2">Категория {{ k==='A'?'А':k==='B'?'Б':k==='C'?'В':'Г' }}</h2>
                    <label class="row surface"><input style="display:none" /><span>Ответственный</span>
                      <select v-model="(state.categories_map as any)[k].owner" class="select-arrow">
                        <option value="team">Команда</option><option value="manager">Управляющий</option><option value="custom">Другое</option>
                      </select>
                    </label>
                    <label v-if="(state.categories_map as any)[k].owner==='custom'" class="row surface"><input style="display:none" /><span>Контакт</span>
                      <input v-model="(state.categories_map as any)[k].contact" type="text" placeholder="@handle или телефон" />
                    </label>
                    <div class="hint small black">Темы (без ограничений)</div>
                    <div class="topics-grid compact3">
                      <button v-for="name in currentTopics" :key="name" type="button" class="topic-card small" :class="{ selected: (state.categories_map as any)[k].topics.includes(name) }"
                        @click="(() => { const arr = (state.categories_map as any)[k].topics as string[], i = arr.indexOf(name); if(i>=0){arr.splice(i,1)} else {arr.push(name)} })()">
                        <input type="checkbox" :checked="(state.categories_map as any)[k].topics.includes(name)" /><span class="t-name black">{{ name }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Шаблон тикета -->
            <template v-else-if="modalKind==='ticket'">
              <div class="pricing-modal-header">ШАБЛОН</div><h2 class="pricing-modal-title">Тикет</h2>
              <div class="pricing-modal-body">
                <h2 class="section-h2">Базовые поля</h2>
                <div class="surface pad black">{{ state.ticket_template.base_fields_ru.join(', ') }}</div>
                <h2 class="section-h2" style="margin-top:16px;">Дополнительные поля</h2>
                <div class="extras-grid">
                  <button v-for="f in availableExtraFields()" :key="f" type="button" class="extra-card" :class="{active: state.ticket_template.extra_fields.includes(f)}" @click="toggleExtraField(f)">{{ f }}</button>
                </div>
                <div class="hint small black">Можно выбрать не более 2 полей</div>
              </div>
            </template>

            <!-- Операционные цели -->
            <template v-else-if="modalKind==='goals_ops'">
              <div class="pricing-modal-header">ЦЕЛИ</div><h2 class="pricing-modal-title">Операционные</h2>
              <div class="pricing-modal-body spaced-large">
                <div class="goal-block surface black"><label class="row surface"><input style="display:none" /><span>Полное закрытие (ч): <strong>{{ state.goals.full_close_time_hours }}</strong></span></label><input class="range long white" type="range" min="1" max="24" v-model.number="state.goals.full_close_time_hours" /></div>
                <div class="goal-block surface black"><label class="row surface"><input style="display:none" /><span>Без эскалации: <strong>{{ state.goals.resolved_without_escalation_pct }}%</strong></span></label><input class="range long white" type="range" min="0" max="100" v-model.number="state.goals.resolved_without_escalation_pct" /></div>
              </div>
            </template>
            
            <!-- Цели качества -->
            <template v-else-if="modalKind==='goals_quality'">
              <div class="pricing-modal-header">ЦЕЛИ</div><h2 class="pricing-modal-title">Качество</h2>
              <div class="pricing-modal-body spaced-large">
                <div class="goal-block surface black"><label class="row surface"><input style="display:none" /><span>Точность рекомендаций: <strong>{{ state.goals.reco_accuracy_pct }}%</strong></span></label><input class="range long white" type="range" min="0" max="100" v-model.number="state.goals.reco_accuracy_pct" /></div>
                <div class="goal-block surface black"><label class="row surface"><input style="display:none" /><span>Получение NPS: <strong>{{ state.goals.nps_collected_pct }}%</strong></span></label><input class="range long white" type="range" min="0" max="100" v-model.number="state.goals.nps_collected_pct" /></div>
                <div class="goal-block surface black"><label class="row surface"><input style="display:none" /><span>Средний NPS: <strong>{{ state.goals.nps_avg }}</strong></span></label><input class="range long white" type="range" min="1" max="10" v-model.number="state.goals.nps_avg" /></div>
              </div>
            </template>
            
            <!-- Бизнес-цели -->
            <template v-else-if="modalKind==='goals_business'">
              <div class="pricing-modal-header">ЦЕЛИ</div><h2 class="pricing-modal-title">Бизнес</h2>
              <div class="pricing-modal-body spaced-large">
                <div class="goal-block surface black"><label class="row surface"><input style="display:none" /><span>Возврат после жалобы: <strong>{{ state.goals.returns_after_complaint_pct }}%</strong></span></label><input class="range long white" type="range" min="0" max="100" v-model.number="state.goals.returns_after_complaint_pct" /></div>
                <div class="goal-block surface black"><label class="row surface"><input style="display:none" /><span>Средняя компенсация (₽): <strong>{{ state.goals.avg_compensation_rub }}</strong></span></label><input class="range long white" type="range" min="0" max="5000" step="10" v-model.number="state.goals.avg_compensation_rub" /></div>
              </div>
            </template>

            <!-- SLA — Почти готово -->
            <template v-else-if="modalKind==='sla_ready'"><div class="pricing-modal-header">СТРУКТУРА</div><h2 class="pricing-modal-title">Почти готово</h2><div class="pricing-modal-body"><div class="surface pad black">{{ SLA_READY.join(', ') }}</div></div></template>
            <!-- SLA — потом -->
            <template v-else-if="modalKind==='sla_later'"><div class="pricing-modal-header">СТРУКТУРА</div><h2 class="pricing-modal-title">потом</h2><div class="pricing-modal-body"><div class="surface pad black">{{ SLA_LATER.join(', ') }}</div></div></template>

            <!-- Расширенный режим — время -->
            <template v-else>
              <div class="pricing-modal-header">ГРАФИК</div><h2 class="pricing-modal-title">Расширенный режим</h2>
              <div class="pricing-modal-body spaced-large">
                <div class="grid2">
                  <div class="surface pad black"><h4>Будни</h4><label class="row surface"><input style="display:none" /><span>От</span><input v-model="state.work_hours.weekdays.from" type="time" /></label><label class="row surface"><input style="display:none" /><span>До</span><input v-model="state.work_hours.weekdays.to" type="time" /></label></div>
                  <div class="surface pad black"><h4>Выходные</h4><label class="row surface"><input style="display:none" /><span>От</span><input v-model="state.work_hours.weekends.from" type="time" /></label><label class="row surface"><input style="display:none" /><span>До</span><input v-model="state.work_hours.weekends.to" type="time" /></label></div>
                </div>
              </div>
            </template>

          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* Базовая тема */
.signal-sla.dark {
  --bg: transparent; --card:#151719; --muted:#9aa3ad; --text:#e8eaed; --line:#2a2d31;
  --green:#4ade80; --green-10: rgba(77, 222, 128, 0.05); --lime:#c5f946;
  background: var(--bg); color: var(--text); padding-bottom: 20px; font-size: 14px;
  max-width: 980px; margin: 0 auto; overflow-wrap:anywhere;
}
h2,h3,h4{margin:0 0 6px} h2{font-size:22px} h3{font-size:16px} h4{font-size:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 14px;margin:12px 0}
.grid1{display:grid;grid-template-columns:1fr;gap:10px} .grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.row{display:flex;align-items:center;gap:10px} .row span{min-width:max-content}
input[type="text"], input[type="number"], input[type="time"], select{
  padding:8px 10px;border-radius:10px;background:#0b0c0e;color:var(--text);border:1px solid var(--line);font-size:14px
}
.select-arrow{appearance:auto} .company.big{font-size:18px} .fullwidth{width:100%}

/* Белые минималистичные ползунки */
.range.white{width:100%;-webkit-appearance:none;background:transparent;height:24px}
.range.white::-webkit-slider-runnable-track{height:4px;background:#ffffff;border-radius:999px}
.range.white::-moz-range-track{height:4px;background:#ffffff;border-radius:999px}
.range.white::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#ffffff;margin-top:-7px;border:none}
.range.white::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#ffffff;border:none}
.inline-value{color:#fff;font-size:13px;min-width:40px;text-align:right}

/* Виджеты и поля компании */
.widget-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.widget-card{border:1px solid var(--line);border-radius:12px;padding:12px;background:#0d0f12;text-align:left;cursor:pointer}
.widget-card.active{border-color:#fff;background:#1a1d20}
.widget-head{display:flex;gap:12px;align-items:flex-start}
.widget-icon{width:56px;height:56px;object-fit:contain;flex-shrink:0}
.w-title{font-weight:700;margin:0 0 4px}
.checks{list-style:none;padding:0;margin:0} .checks li{display:flex;align-items:center;gap:8px;margin:2px 0}
.checks input{pointer-events:none;accent-color:var(--green);width:16px;height:16px}
.checks span{font-size:13px;color:#e0e0e0}
.company-fields{display:grid;grid-template-columns:1fr;gap:10px}
.ltv-ret-block{display:grid;grid-template-columns:1fr;gap:16px;margin-top:6px}
.ltv-title{font-weight:600;margin-bottom:6px}
.ltv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.ltv-card{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:#0d0f12;text-align:left;cursor:pointer}
.ltv-card.active{border-color:#fff;background:#1a1d20}
.ltv-other{margin-top:10px}
.linklike{background:transparent;border:none;color:#fff;text-decoration:underline;text-decoration-style:dashed;cursor:pointer;padding:0}
.linklike.same{font-size:13px}
.hint{color:var(--muted);font-size:12px} .divider{height:1px;background:var(--line);margin:10px 0}

/* Цели */
.goal-title{font-weight:700;color:#fff;font-size:14px;margin-bottom:2px}
.goal-line{font-size:13px;color:#c0c0c0}
.goals-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid var(--line)}
.goals-row:first-of-type{border-top:none}

/* NPS карточки */
.nps-cards{display:flex;gap:8px;flex-wrap:wrap}
.nps-card{border:1px solid var(--line);border-radius:12px;padding:8px 12px;background:#0d0f12;color:#e8eaed;cursor:pointer}
.nps-card.active{border-color:#fff;background:#1a1d20}

/* Категории A–Г бейджи */
.mini-ag{display:flex;gap:8px;flex-wrap:wrap}
.mini-badge{background:#0b0c0e;border:1px solid var(--line);border-radius:12px;padding:8px 10px;font-size:12px}
.mini-sub{color:#9aa3ad;font-size:11px;margin-top:2px}

/* SLA титульный блок */
.lime{color:var(--lime)}
.lime-outline{border-color:var(--lime) !important;background:var(--green-10)}
.sla-title{margin:0 0 6px} .price{margin:0;color:#fff} .price-note{color:#c0c0c0;font-size:16px;margin-bottom:8px}
.sla-groups{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px}
.sla-group{background:rgba(12,12,14,0.7);border:1px solid var(--line);border-radius:12px;padding:12px}
.sla-group-title{font-weight:700;margin-bottom:6px}
.no-checks .sla-text{font-size:13px;color:#e0e0e0}

/* CTA */
button.primary{padding:14px 16px;border-radius:12px;border:1px solid #fff;cursor:pointer}
button.full{width:100%} button.strong{font-weight:700;font-size:18px}
.lime-btn{background:var(--lime);color:#000;border-color:var(--lime)}
.white-btn{background:#ffffff;color:#000;border-color:#ffffff}
.cta-row{display:grid;grid-template-columns:1fr;gap:8px;margin-top:10px}

/* Модальные окна (Apple surfaces) */
.pricing-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px}
.pricing-modal-window{background:#f5f5f7;border-radius:28px;width:880px;max-width:100%;max-height:90vh;box-shadow:0 20px 60px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden}
.pricing-modal-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:#1d1d1f;border:none;color:#f5f5f7;cursor:pointer}
.pricing-modal-header{font-size:1rem;color:#6e6e73;margin:60px 80px 12px 80px;font-weight:500;letter-spacing:0.08em}
.pricing-modal-title{font-size:2.135rem;font-weight:600;color:#1d1d1f;margin:0 80px 24px 80px}
.pricing-modal-body{padding:0 80px 60px;overflow-y:auto}
.surface{background:#edeef0;border-radius:12px;padding:8px 10px}
.pad{padding:14px 12px} .black{color:#1d1d1f !important}
.owner-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.owner-grid.spaced{gap:24px}
.owner-col{display:grid;gap:10px}
.cat-h2,.section-h2{font-size:19px;font-weight:600;color:#1d1d1f;margin:0 0 10px 0}
.hint.small.black{color:#6e6e73}

/* Темы в модалке */
.topics-grid.compact3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}
.topic-card{display:flex;align-items:center;gap:8px;padding:8px;border:1px solid #d2d3d6;border-radius:10px;background:#f1f2f4}
.topic-card.small{padding:6px 8px}
.topic-card.selected{border-color:#86efac;background:#e7f7ee}
.topic-card input[type="checkbox"]{accent-color:var(--green);width:16px;height:16px}

/* Доп. поля (карточки, до 2) */
.extras-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.extra-card{border:1px solid #d2d3d6;border-radius:10px;padding:10px;background:#f1f2f4;color:#1d1d1f;cursor:pointer;text-align:center}
.extra-card.active{border-color:#16a34a;background:#dcfce7}

/* Ползунки в модалках */
.spaced-large{display:grid;grid-template-columns:1fr;gap:18px}

/* Радио-кнопки */
.radio-left .row, .radio-left{display:flex;align-items:center;gap:12px}
.radio-left input[type="radio"], .radio-big{accent-color:var(--green);width:16px;height:16px}

/* Адаптив */
@media (max-width:1024px){
  .widget-row, .sla-groups, .owner-grid, .ltv-grid, .nps-cards{grid-template-columns:1fr}
  .pricing-modal-header, .pricing-modal-title, .pricing-modal-body{margin-left:24px;margin-right:24px;padding-left:0;padding-right:0}
  .extras-grid, .topics-grid.compact3{grid-template-columns:1fr 1fr}
}
</style>
