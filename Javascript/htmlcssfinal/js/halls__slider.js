import { updateSliderView as updateSliderViewDown } from "./halls__slider-extra.js";

const buttonNext = document.querySelector(".halls__slider--next");
const buttonPrev = document.querySelector(".halls__slider--prev");
const getSliderTrack = () => {
  document.querySelector(".halls__slider-wrap:not(.slider-disabled) .halls__track").classList.add("hren");
  return document.querySelector(".halls__slider-wrap:not(.slider-disabled) .halls__track");
};

function getSlides() {
  return [...getSliderTrack().children];
}
let slides = 0;
let currentIndexTop = 0;

const getSlideWidth = () => {
  slides = getSlides();
  return slides[0].offsetWidth;
};
function updateSlidesClasses(currentIndex) {
  slides = getSlides();
  slides.forEach((element) => {
    element.classList.remove("swiper-slide-active", "swiper-slide-prev", "swiper-slide-next");
  });
  slides[currentIndex].classList.add("swiper-slide-active");
  currentIndex != 0 ? slides[currentIndex - 1].classList.add("swiper-slide-prev") : 0;
  currentIndex != slides.length - 1 ? slides[currentIndex + 1].classList.add("swiper-slide-next") : 0;
}

export function sliderInit() {
  currentIndexTop = 0;
  sliderCounterUpdate();
  getSliderTrack().style.width = `${getSlides().length * 100}%`;
  slides = getSlides();
  slides.forEach((element) => {
    element.classList.add("swiper-slide");
  });
  updateSlidesClasses(currentIndexTop);
  updateSliderView(currentIndexTop);
}

export function updateSliderView(currentIndex, deltaX = 0) {
  currentIndexTop = currentIndex;
  if (!deltaX) {
    getSliderTrack().style.transition = "transform 0.3s";
  }
  const moveSlides = `${-1 * currentIndex * getSlideWidth()}px`;
  getSliderTrack().style.transform = `translateX(calc(${moveSlides} + ${deltaX}px) )`;
  updateSlidesClasses(currentIndex);
  sliderCounterUpdate();
}

export default function sliderCounterUpdate() {
  slides = getSlides();
  document.querySelector(".slider__counter").innerHTML =
    `<span class="slider__now-count">${currentIndexTop + 1}</span> из ${slides.length}`;
}
function next() {
  if (currentIndexTop < slides.length - 1) {
    currentIndexTop++;
    updateSliderView(currentIndexTop);
  }
}
function prev() {
  if (currentIndexTop > 0) {
    currentIndexTop--;
    updateSliderView(currentIndexTop);
  }
}
export function buttonsInit() {
  buttonNext.removeEventListener("click", next);
  buttonPrev.removeEventListener("click", prev);

  slides = getSlides();
  buttonNext.addEventListener("click", next);
  buttonPrev.addEventListener("click", prev);
}
let isDragging = false;
let cursorStartPosition = 0;
let cursorEndPosition = 0;
function pointerdown(event) {
  isDragging = true;
  cursorStartPosition = event.clientX;
  getSliderTrack().style.transition = "none";
  event.preventDefault();
}
function pointermove(event) {
  if (isDragging) {
    const currentCursorPosition = event.clientX;
    let deltaX = currentCursorPosition - cursorStartPosition;

    updateSliderView(currentIndexTop, deltaX);
  }
}
function pointerup(event) {
  if (!isDragging) return false;
  isDragging = false;
  cursorEndPosition = event.clientX;
  const slidersCountChange = Math.round(-(cursorEndPosition - cursorStartPosition) / getSlideWidth());
  currentIndexTop += slidersCountChange;
  currentIndexTop = currentIndexTop > slides.length - 1 ? slides.length - 1 : currentIndexTop < 0 ? 0 : currentIndexTop;
  updateSliderView(currentIndexTop);
  updateSliderViewDown(currentIndexTop);
}
export function initMouseControl() {
  getSliderTrack().removeEventListener("pointerdown", pointerdown);
  window.removeEventListener("pointermove", pointermove);
  window.removeEventListener("pointerup", pointerup);

  getSliderTrack().addEventListener("pointerdown", pointerdown);
  window.addEventListener("pointermove", pointermove);
  window.addEventListener("pointerup", pointerup);
}
