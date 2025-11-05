<style scoped>
.signal-sla.dark{--bg:transparent;--card:#151719;--muted:#9aa3ad;--text:#e8eaed;--line:#2a2d31;--green:#4ade80;--green-10:rgba(77,222,128,0.05);--lime:#c5f946;background:var(--bg);color:var(--text);padding-bottom:20px;font-size:14px;max-width:980px;margin:0 auto;overflow-wrap:anywhere}
h2,h3,h4{margin:0 0 6px}h2{font-size:22px}h3{font-size:16px}h4{font-size:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 14px;margin:12px 0}
.required{color:var(--lime);font-weight:700}
.grid1{display:grid;grid-template-columns:1fr;gap:10px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.row{display:flex;align-items:center;gap:8px}.row span{min-width:max-content}
input[type="text"],input[type="number"],input[type="time"],select{padding:8px 10px;border-radius:10px;background:#0b0c0e;color:var(--text);border:1px solid var(--line);font-size:13px;flex:1}
.time-input{color:#fff !important}.time-row{flex-wrap:wrap}
.time-input-wrapper{position:relative;display:flex;align-items:center;width:100%}
.clock-icon{position:absolute;left:10px;color:#999;flex-shrink:0;pointer-events:none}
.time-input-wrapper input[type="time"]{padding-left:32px !important}
.select-wrapper{position:relative;flex:1;display:flex;align-items:center}
.select-arrow{appearance:none;width:100%;padding:8px 28px 8px 10px !important;background:#0b0c0e;padding-right:28px !important;cursor:pointer}
.chevron-icon{position:absolute;right:8px;pointer-events:none;color:#999;flex-shrink:0}
.company.big{font-size:18px}.fullwidth{width:100%}
.range.white{width:100%;-webkit-appearance:none;background:transparent;height:24px}
.range.white::-webkit-slider-runnable-track{height:4px;background:#fff;border-radius:999px}
.range.white::-moz-range-track{height:4px;background:#fff;border-radius:999px}
.range.white::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fff;margin-top:-7px;border:none}
.range.white::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#fff;border:none}
.range.black{width:100%;-webkit-appearance:none;background:transparent;height:24px}
.range.black::-webkit-slider-runnable-track{height:4px;background:#555;border-radius:999px}
.range.black::-moz-range-track{height:4px;background:#555;border-radius:999px}
.range.black::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#1a1a1a;margin-top:-7px;border:none}
.range.black::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#1a1a1a;border:none}
.inline-value{color:#fff;font-size:13px;min-width:40px;text-align:right}
.widget-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.widget-card{border:1px solid var(--line);border-radius:12px;padding:12px;background:#0d0f12;text-align:left;cursor:pointer;display:flex;align-items:center;gap:12px;font-size:14px}
.widget-card.active{border-color:var(--lime);background:#1a1d20}
.widget-icon{width:56px;height:56px;object-fit:contain;flex-shrink:0}
.w-title{font-weight:700}
.company-fields{display:grid;grid-template-columns:1fr;gap:10px}
.retention-block{display:grid;gap:4px}
.ltv-block{margin-top:6px}
.ltv-title{font-weight:600;margin-bottom:6px;font-size:13px}
.ltv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.ltv-card{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:#0d0f12;text-align:left;cursor:pointer;font-size:13px}
.ltv-card.active{border-color:var(--lime);background:#1a1d20}
.ltv-other{margin-top:10px;font-size:13px}
.linklike{background:transparent;border:none;color:var(--lime);text-decoration:underline;text-decoration-style:dashed;cursor:pointer;padding:0;font-size:14px}
.linklike-calc{background:transparent;border:none;color:var(--lime);text-decoration:none;cursor:pointer;padding:0;font-size:13px;display:inline-flex;align-items:center;gap:4px;margin-top:6px}
.linklike-calc:hover{text-decoration:underline}
.ext-icon{width:12px;height:12px}
.hint{color:var(--muted);font-size:12px}.divider{height:1px;background:var(--line);margin:10px 0}
.goal-title{font-weight:700;color:#fff;font-size:14px;margin-bottom:2px}
.goal-line{font-size:13px;color:#c0c0c0}
.goals-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid var(--line);gap:8px}
.goals-row:first-of-type{border-top:none}
.goals-col{min-width:0;flex:1}
.nps-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.nps-card{border:1px solid var(--line);border-radius:12px;padding:10px 16px;background:#0d0f12;color:#e8eaed;cursor:pointer;text-align:center;font-size:13px}
.nps-card.active{border-color:var(--lime);background:#1a1d20}
.mini-ag{display:flex;gap:8px;flex-wrap:wrap}
.mini-ag.full-width{width:100%;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}
.mini-badge{background:#0b0c0e;border:1px solid var(--line);border-radius:12px;padding:8px 10px;font-size:13px}
.mini-sub{color:#9aa3ad;font-size:13px;margin-top:2px}
.field-label{color:#fff;font-weight:700;font-size:13px}
.lime{color:var(--lime)}
.lime-outline{border-color:var(--lime)!important;background:var(--green-10)}
.sla-title{margin:0 0 6px;border-bottom:none !important}.price{margin:0;color:#fff}.price-note{color:#c0c0c0;font-size:13px;margin-bottom:16px}
.sla-cards{display:grid;gap:12px;margin-top:12px}
.sla-card{background:rgba(12,12,14,0.7);border:1px solid var(--line);border-radius:12px;padding:14px}
.sla-card.dashed{border:2px dashed var(--lime);background:transparent}
.sla-card-title{font-size:16px;font-weight:700;margin:0 0 6px}
.sla-card-desc{font-size:12px;color:rgba(255,255,255,0.7);line-height:1.4}
.sla-card-calc{font-size:13px;color:#fff;margin-bottom:6px;font-weight:600}
.sla-subgroup{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid var(--line)}
.sla-subgroup-title{font-weight:600;font-size:13px}
.contact-in-summary{background:rgba(12,12,14,0.7);border:1px solid var(--line);margin:16px 0 20px}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.terms-row{display:flex;align-items:flex-start;gap:8px;margin-bottom:20px;font-size:12px;line-height:1.4}
.terms-row input[type="checkbox"]{accent-color:var(--lime);width:16px;height:16px;margin-top:2px;flex-shrink:0}
.terms-row a{color:var(--lime);text-decoration:underline}
.submit-message{padding:12px 16px;border-radius:12px;margin-bottom:10px;font-size:13px;font-weight:600;text-align:center;animation:slideDown 0.3s ease}
.submit-message.success{background:rgba(74,222,128,0.15);color:#4ade80;border:1px solid rgba(74,222,128,0.3)}
.submit-message.error{background:rgba(255,71,87,0.15);color:#ff4757;border:1px solid rgba(255,71,87,0.3)}
button.primary{padding:14px 16px;border-radius:12px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:flex-start;gap:10px;font-size:16px}
button.full{width:100%}button.strong{font-weight:700}
.btn-text{flex:1;text-align:left}
.btn-icon{transition:transform 0.2s ease;flex-shrink:0;width:22px;height:22px}
button.primary:hover .btn-icon{transform:translateX(3px)}
.lime-btn{background:var(--lime);color:#000}
.white-btn{background:#fff;color:#000}
.cta-row{display:grid;grid-template-columns:1fr;gap:8px;margin-top:10px}
.pricing-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px}
.pricing-modal-window{background:#f5f5f7;border-radius:28px;width:880px;max-width:100%;max-height:90vh;box-shadow:0 20px 60px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden;position:relative}
.pricing-modal-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:#1d1d1f;border:none;color:#f5f5f7;cursor:pointer;z-index:11;display:flex;align-items:center;justify-content:center}
.pricing-modal-header{font-size:1rem;color:#6e6e73;margin:60px 80px 12px 80px;font-weight:500;letter-spacing:0.08em}
.pricing-modal-title{font-size:2.135rem;font-weight:600;color:#1d1d1f;margin:0 80px 24px 80px;line-height:1.15}
.pricing-modal-body{padding:0 80px 60px;overflow-y:auto;max-height:calc(90vh - 200px)}
.surface{background:#edeef0;border-radius:12px;padding:8px 10px}
.pad{padding:14px 12px}
.black{color:#1d1d1f!important}
.owner-col-single{display:grid;gap:20px}
.owner-block{padding:16px}
.owner-block-full{width:100%}
.cat-h2,.section-h2{font-size:19px;font-weight:600;color:#1d1d1f;margin:0 0 10px 0;line-height:1.15}
.topics-grid.compact3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
.topic-card{display:flex;align-items:center;gap:8px;padding:8px;border:1px solid #d2d3d6;border-radius:10px;background:#f1f2f4;cursor:pointer;font-size:11px;line-height:1.2}
.topic-card.small{padding:6px 8px}
.topic-card.selected{border-color:var(--lime);background:#e7f7ee}
.topic-card:disabled{opacity:0.4;cursor:not-allowed}
.topic-card input[type="checkbox"]{accent-color:var(--green);width:16px;height:16px;pointer-events:none}
.topic-left{text-align:left}
.extras-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.extra-card{border:1px solid #d2d3d6;border-radius:10px;padding:10px;background:#f1f2f4;color:#1d1d1f;cursor:pointer;text-align:center;font-size:12px}
.extra-card.active{border-color:var(--lime);background:#dcfce7}
.spaced-large{display:grid;grid-template-columns:1fr;gap:18px}
.spaced-large-full{display:grid;grid-template-columns:1fr;gap:18px}
.radio-left .row,.radio-left{display:flex;align-items:center;gap:12px}
.radio-left input[type="radio"],.radio-big{accent-color:var(--lime);width:18px;height:18px;border-radius:50%}
.checks-grid-full{display:grid;grid-template-columns:1fr;gap:8px;margin-top:8px}
.checks-grid-full input[type="checkbox"]{accent-color:var(--lime)}
.sla-detail-cards{display:grid;gap:10px}
.sla-detail-card{background:#edeef0;border-radius:10px;padding:12px;color:#1d1d1f;font-size:12px;line-height:1.5;display:flex;align-items:flex-start;gap:8px}
.detail-check{flex-shrink:0;margin-top:2px}

/* ТОЛЬКО ПРАВКИ ДЛЯ МОДАЛКИ "РАСШИРЕННЫЙ РЕЖИМ" */
.workhours-block{display:flex;flex-direction:column;gap:12px}
.workhours-title{color:#1d1d1f;margin:0 0 8px 0;font-size:15px;font-weight:600}
.workhours-label{color:#1d1d1f;font-weight:500;font-size:13px}

@keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
button:disabled{opacity:0.6;cursor:not-allowed}
@media(max-width:1024px){
  .signal-sla.dark{font-size:13px}
  button.primary{font-size:15px}
  .widget-row,.ltv-grid{grid-template-columns:1fr}
  .nps-cards{grid-template-columns:repeat(2,1fr)}
  .contact-grid{grid-template-columns:1fr}
  .goals-row{gap:4px;flex-wrap:wrap}
  .goals-col{flex-basis:100%}
  .linklike{font-size:13px;color:var(--lime)}
  .pricing-modal-header,.pricing-modal-title,.pricing-modal-body{margin-left:24px;margin-right:24px;padding-left:0;padding-right:0}
  .extras-grid,.topics-grid.compact3{grid-template-columns:1fr 1fr}
  .card{padding:14px 12px;margin:10px 0}
  .sla-cards{gap:10px;margin-top:10px}
  .spaced-large-full{grid-template-columns:1fr}
  .fullwidth-mobile{width:100%}
  .radio-left{flex-direction:column;align-items:flex-start}
  .contact-in-summary{margin:16px 0 12px}
  .terms-row{margin-bottom:20px}
  .pricing-modal-title{font-size:1.6rem}
  .pricing-modal-header{margin:40px 24px 10px}
  .cat-h2,.section-h2{font-size:16px;line-height:1.1}
  .owner-block-full{width:100%;max-width:100%}
  .mini-ag.full-width{grid-template-columns:repeat(2,1fr);gap:8px}
  
  /* ТОЛЬКО ПРАВКИ ДЛЯ МОБИЛКИ "РАСШИРЕННЫЙ РЕЖИМ" */
  .pricing-modal-body .workhours-block .row{background:#edeef0 !important;border:none;padding:10px 12px;border-radius:10px}
  .pricing-modal-body .workhours-block .row span{color:#1d1d1f}
  .pricing-modal-body .workhours-block .time-input-wrapper input[type="time"]{appearance:none;-webkit-appearance:none;background:transparent;border:none;color:#1d1d1f;cursor:pointer;font-size:14px;font-weight:600}
  .pricing-modal-body .workhours-block .time-input-wrapper input[type="time"]::-webkit-calendar-picker-indicator{display:none}
  .pricing-modal-body .workhours-block .clock-icon{color:#999}
  .workhours-block{gap:10px;padding:12px}
  .workhours-title{margin:0 0 6px;font-size:14px}
  .workhours-label{font-size:12px}
  .time-row{gap:6px}
  .time-row span{min-width:auto}
}
</style>
