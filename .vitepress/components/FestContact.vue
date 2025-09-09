<template>
<div class="organizer-section">
  <div class="organizer-card">
    <div class="organizer-header">
      <div class="organizer-subtitle">ПО ВСЕМ ВОПРОСАМ И ПРЕДЛОЖЕНИЯМ</div>
      <div class="organizer-name">ЕВГЕНИЙ ИВАХНЕНКО</div>
    </div>
    
    <div class="contact-actions">
      <a href="https://t.me/COFFEESHEF" class="contact-button primary" target="_blank">
        Написать в Telegram
      </a>
      <a href="tel:+79958330295" class="contact-button secondary">
        +7 (995) 833-02-95
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

.organizer-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  width: 100%;
  max-width: none;
}

.organizer-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.organizer-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  margin-bottom: 0.75rem;
  letter-spacing: 0.5px;
}

.organizer-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.contact-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
}

.contact-button {
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
}

.contact-button.primary {
  background: #347b6c;
  color: white;
  border: 1px solid #347b6c;
}

.contact-button.primary:hover {
  background: #C5F946;
  border-color: #C5F946;
  color: #000000;
  transform: translateY(-2px);
}

.contact-button.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.contact-button.secondary:hover {
  background: var(--vp-c-bg-mute);
  border-color: #347b6c;
  color: #347b6c;
}

/* Адаптивность */
@media (max-width: 768px) {
  .organizer-card {
    padding: 1rem;
  }
  
  .contact-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .organizer-name {
    font-size: 1.2rem;
  }
}
</style>
