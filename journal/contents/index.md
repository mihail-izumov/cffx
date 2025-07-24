# Журнал Модуля Роста®

<div class="cards">
  <div class="card">
    <strong>Кейсы</strong><br>
    За 15 лет через наши руки прошло 80 проектов в 15 городах России, Франции и Монако. Некоторые стали историями успеха, другие — ценными уроками. <br>
    <a href="/journal/contents/cases">Читать</a>
  </div>
  <div class="card">
    <strong>Публикации</strong><br>
    Полное погружение в био-цифровой джаз Модуля Роста®. Здесь говорим о важном в деталях. От рефлексии на основе данных до страхов в отношениях с клиентами. <br>
    <a href="/journal/contents/articles">Читать</a>
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
