<template>
<div class="organizer-section">
  <h2>Организация</h2>
  <div class="organizer-card">
    <div class="organizer-header">
      <h3>ПО ВСЕМ ВОПРОСАМ И ПРЕДЛОЖЕНИЯМ</h3>
      <div class="organizer-name">ЕВГЕНИЙ ИВАХНЕНКО</div>
    </div>
    
    <div class="contact-info">
      <div class="contact-item">
        <span class="contact-label">📞 Телефон:</span>
        <a href="tel:+79958330295" class="contact-value phone">+7 (995) 833-02-95</a>
      </div>
      
      <div class="contact-item">
        <span class="contact-label">💬 Telegram:</span>
        <a href="https://t.me/COFFEESHEF" class="contact-value telegram" target="_blank">@COFFEESHEF</a>
      </div>
    </div>
    
    <div class="contact-actions">
      <a href="https://t.me/COFFEESHEF" class="contact-button primary" target="_blank">
        📱 Написать в Telegram
      </a>
      <a href="tel:+79958330295" class="contact-button secondary">
        📞 Позвонить
      </a>
    </div>
  </div>
</div>
</template>

<style scoped>
.organizer-section {
  margin: 2rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

.organizer-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  font-weight: 700;
  text-align: center;
}

.organizer-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  max-width: 500px;
  margin: 0 auto;
}

.organizer-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.organizer-header h3 {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  margin-bottom: 0.75rem;
  letter-spacing: 0.5px;
}

.organizer-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.contact-info {
  margin-bottom: 1.5rem;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.contact-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.contact-value {
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.contact-value.phone {
  color: var(--vp-c-text-1);
}

.contact-value.phone:hover {
  color: var(--vp-c-brand);
}

.contact-value.telegram {
  color: #0088cc;
}

.contact-value.telegram:hover {
  color: #006bb3;
}

.contact-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.contact-button {
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  text-align: center;
  white-space: nowrap;
}

.contact-button.primary {
  background: #84cc16;
  color: #000000;
  flex: 1;
}

.contact-button.primary:hover {
  background: #65a30d;
  transform: translateY(-1px);
}

.contact-button.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  flex: 1;
}

.contact-button.secondary:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
}

/* Адаптивность */
@media (max-width: 768px) {
  .organizer-card {
    margin: 0 1rem;
    padding: 1rem;
  }
  
  .contact-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .contact-actions {
    flex-direction: column;
  }
  
  .contact-button {
    width: 100%;
  }
  
  .organizer-name {
    font-size: 1.1rem;
  }
}
</style>
