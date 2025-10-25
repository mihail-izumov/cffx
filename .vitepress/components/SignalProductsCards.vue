<style scoped>
/* ... весь предыдущий CSS остаётся без изменений до модального окна ... */

/* МОДАЛЬНОЕ ОКНО ---------------------------------------------------------- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.modal-content {
  background: #f5f5f7;
  border-radius: 28px;
  width: 920px;
  height: 720px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #1d1d1f;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #f5f5f7;
  z-index: 10;
}

.modal-close:hover {
  background: #2d2d2f;
  transform: scale(1.05);
}

.modal-header {
  font-size: 1rem;
  color: #6e6e73;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  padding: 60px 80px 0;
}

.modal-title {
  font-size: 2.75rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 32px 0;
  line-height: 1.1;
  padding: 0 80px;
}

.modal-body {
  padding: 0 80px 60px;
  overflow-y: auto;
  flex: 1;
}

/* АККОРДЕОН --------------------------------------------------------------- */
.modal-accordion-item {
  margin-bottom: 12px;
  background: #e8e8ed;
  border-radius: 12px;
  overflow: hidden;
}

.modal-accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: none;
}

.accordion-icon {
  font-size: 1.25rem;
  color: #1d1d1f;
  flex-shrink: 0;
}

.accordion-title {
  flex: 1;
  font-size: 1.2rem;
  font-weight: 550;
  color: #1d1d1f;
  line-height: 1.4;
}

.chevron-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: #6e6e73;
}

.chevron-icon.is-rotated {
  transform: rotate(180deg);
}

.modal-accordion-content {
  padding: 0 20px 20px 20px;
  font-size: 1.125rem;
  color: #6e6e73;
  line-height: 1.65;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ССЫЛКА "УЗНАТЬ БОЛЬШЕ" -------------------------------------------------- */
.modal-learn-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1d1d1f;
  font-size: 1.125rem;
  font-weight: 500;
  text-decoration: none;
  margin-top: 32px;
  transition: color 0.2s ease;
}

.modal-learn-more:hover {
  color: #6e6e73;
}

.modal-learn-more:hover .arrow-right-icon {
  transform: translateX(6px);
}

.arrow-right-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

/* КАСТОМНЫЙ СКРОЛЛБАР ------------------------------------------------------ */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #d1d1d6;
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #b8b8bd;
}

/* АНИМАЦИЯ МОДАЛЬНОГО ОКНА ------------------------------------------------ */
.modal-enter-active {
  transition: opacity 0.5s ease;
}

.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active .modal-content {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from .modal-content {
  transform: scale(0.95) translateY(20px);
}

.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}

/* МОБИЛЬНАЯ ВЕРСИЯ -------------------------------------------------------- */
@media (max-width: 768px) {
  .feature-item {
    font-size: 1.125rem !important;
    line-height: 1.4 !important;
  }
  
  .checkmark-icon {
    width: 20px !important;
    height: 20px !important;
  }
  
  .pricing-card {
    padding: 32px 20px !important;
  }
  
  .card-subtitle {
    font-size: 1.125rem !important;
    max-width: none !important;
  }

  .modal-content {
    width: 100%;
    height: 90vh;
    border-radius: 20px;
  }

  .modal-header {
    padding: 40px 24px 0;
    font-size: 0.875rem;
  }

  .modal-title {
    font-size: 2rem;
    padding: 0 24px;
  }

  .modal-body {
    padding: 0 24px 40px;
  }

  .accordion-title {
    font-size: 1.0625rem;
  }

  .modal-accordion-content {
    font-size: 1rem;
  }

  .modal-learn-more {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .feature-item {
    font-size: 1.075rem !important;
    line-height: 1.35 !important;
  }

  .modal-content {
    height: 95vh;
  }

  .modal-title {
    font-size: 1.75rem;
  }

  .accordion-title {
    font-size: 1rem;
  }

  .modal-accordion-content {
    font-size: 0.9375rem;
  }
}
</style>
