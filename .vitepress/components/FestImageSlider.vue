<style module>
.imageSlider {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.sliderContainer {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  background: #2c2c2c;
  touch-action: pan-y pinch-zoom;
}

.sliderImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.sliderImage:first-child {
  position: relative;
}

.sliderImage.active {
  opacity: 1;
  z-index: 1;
}

/* Точки для десктопа */
.sliderDots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2c2c2c;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #383838; /* Добавил легкую границу для видимости неактивных точек */
}

.dot:hover {
  background-color: #4a4a4a;
  transform: scale(1.2);
}

.dot.active {
  /* ЗАМЕНА: вместо #c6f945 ставим светло-графитовый/серебристый, чтобы было видно на темном */
  background-color: #9CA3AF; 
  width: 12px;
  height: 12px;
}

/* Интерактивная полоса прогресса для мобильных */
.sliderProgressBar {
  display: none;
  width: 100%;
  height: 3.5px;
  background-color: #2c2c2c;
  border-radius: 2px;
  margin-top: 16px;
  overflow: hidden;
  cursor: pointer;
  touch-action: none;
}

.progressFill {
  height: 100%;
  /* ЗАМЕНА: вместо #c6f945 ставим светло-графитовый */
  background-color: #9CA3AF;
  transition: width 0.3s ease;
  border-radius: 4px;
  pointer-events: none;
}

/* Медиа-запрос для мобильных устройств */
@media (max-width: 768px) {
  .sliderDots {
    display: none;
  }
  
  .sliderProgressBar {
    display: block;
  }
}
</style>
