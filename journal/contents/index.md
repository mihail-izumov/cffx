## Будущее уже здесь

### Помогаем лучше чувствовать бизнес

<div class="cards">
  <div class="card">
    <strong>Чекап для бизнеса</strong><br>
    Находим скрытые разрывы в процессах, которые тормозят рост. Превращаем их в 3 конкретных улучшения за 30 дней. <br>
    <a href="/checkup/overview">Больше</a>
  </div>
  <div class="card">
    <strong>Бизнес — это не только цифры, но и эмоции</strong><br>
    Помогаем держать баланс между стратегией, людьми и клиентами; в деталях, чтобы бизнес устойчиво рос. <br>
    <a href="/about/balance">Больше</a>
  </div>
  <div class="card">
    <strong>Рост — это не гонка, а приключение</strong><br>
    Каждый бы хотел расти без стрессов и кризисов. Мы создаём сценарии роста, дарящие вдохновение. <br>
    <a href="/method/not-a-race">Больше</a>
  </div>
</div>


<style>
.tabs {
  display: flex;
  gap: .75rem;
  margin: 1rem 0 .5rem;
}
.tabs.small { gap: .5rem; }

.tabs button {
  padding: .45rem 1rem;
  background: none;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  cursor: pointer;
  color: var(--vp-c-text);
  transition: background-color .2s, color .2s;
  font-size: .95rem;
}
.tabs.small button {
  padding: .35rem .75rem;
  font-size: .85rem;
}

.tabs button.active {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-brand-emphasis);
  border-color: var(--vp-c-brand);
}

.tabs button:hover {
  background-color: var(--vp-c-bg-emphasis);
}

.tab-content {
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.card {
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  transition: box-shadow .15s;
}
.card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}
</style>
