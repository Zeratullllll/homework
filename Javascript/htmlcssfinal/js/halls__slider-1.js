import { updateSliderView as updateSliderViewDown } from "./halls__slider-extra-1.js";

const sliderTrack = document.querySelectorAll(".halls__track")[2];
const buttonNext = document.querySelector(".halls__slider--next");
const buttonPrev = document.querySelector(".halls__slider--prev");

const slides = [...sliderTrack.children];
sliderTrack.style.width = `${slides.length * 100}%`;
let currentIndexTop = 0;
const getSlideWidth = () => slides[0].offsetWidth;
function updateSlidesClasses(currentIndex) {
  slides.forEach((element) => {
    element.classList.remove("swiper-slide-active", "swiper-slide-prev", "swiper-slide-next");
  });
  slides[currentIndex].classList.add("swiper-slide-active");
  currentIndex != 0 ? slides[currentIndex - 1].classList.add("swiper-slide-prev") : 0;
  currentIndex != slides.length - 1 ? slides[currentIndex + 1].classList.add("swiper-slide-next") : 0;
}

export function sliderInit() {
  slides.forEach((element) => {
    element.classList.add("swiper-slide");
  });
  updateSlidesClasses(currentIndexTop);
  sliderCounterUpdate();
}

export function updateSliderView(currentIndex, deltaX = 0) {
  currentIndexTop = currentIndex;
  if (!deltaX) {
    sliderTrack.style.transition = "transform 0.3s";
  }
  const moveSlides = `${-1 * currentIndex * getSlideWidth()}px`;
  sliderTrack.style.transform = `translateX(calc(${moveSlides} + ${deltaX}px) )`;
  updateSlidesClasses(currentIndex);
  sliderCounterUpdate();
}

export default function sliderCounterUpdate() {
  document.querySelector(".slider__counter").innerHTML =
    `<span class="slider__now-count">${currentIndexTop + 1}</span> из ${slides.length}`;
}
export function buttonsInit() {
  buttonNext.addEventListener("click", () => {
    if (currentIndexTop < slides.length - 1) {
      currentIndexTop++;
      updateSliderView(currentIndexTop);
    }
  });
  buttonPrev.addEventListener("click", () => {
    if (currentIndexTop > 0) {
      currentIndexTop--;
      updateSliderView(currentIndexTop);
    }
  });
}
export function initMouseControl() {
  let isDragging = false;
  let cursorStartPosition = 0;
  let cursorEndPosition = 0;

  sliderTrack.addEventListener("pointerdown", (event) => {
    isDragging = true;
    cursorStartPosition = event.clientX;
    sliderTrack.style.transition = "none";
    event.preventDefault();
  });
  window.addEventListener("pointermove", (event) => {
    if (isDragging) {
      const currentCursorPosition = event.clientX;
      let deltaX = currentCursorPosition - cursorStartPosition;

      updateSliderView(currentIndexTop, deltaX);
    }
  });
  window.addEventListener("pointerup", (event) => {
    if (!isDragging) return false;
    isDragging = false;
    cursorEndPosition = event.clientX;
    const slidersCountChange = Math.round(-(cursorEndPosition - cursorStartPosition) / getSlideWidth());
    currentIndexTop += slidersCountChange;
    currentIndexTop =
      currentIndexTop > slides.length - 1 ? slides.length - 1 : currentIndexTop < 0 ? 0 : currentIndexTop;
    updateSliderView(currentIndexTop);
    updateSliderViewDown(currentIndexTop);
  });
}
