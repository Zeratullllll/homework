import { updateSliderView as thumbFunction, initMouseControl } from "./halls__slider.js";

const buttonNext = document.querySelector(".halls__slider--next");
const buttonPrev = document.querySelector(".halls__slider--prev");

function getSliderTrack() {
  return document.querySelectorAll(".halls__slider-wrap:not(.slider-disabled) .halls__track")[1];
}
function getSlides() {
  return [...getSliderTrack().children];
}
let slides = 0;
let currentIndexDown = 0;
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
  getSlides().forEach((element) => {
    element.addEventListener("click", findSlide);
  });
  function findSlide(event) {
    for (let i = 0; i < slides.length; i++) {
      if (event.target.closest(".swiper-slide") === slides[i]) {
        currentIndexDown = i;
        updateSliderView(currentIndexDown);
        thumbFunction(currentIndexDown);
      }
    }
  }
  currentIndexDown = 0;
  getSlides().forEach((element) => {
    element.addEventListener("click", findSlide);
  });
  slides = getSlides();
  slides.forEach((element) => {
    element.classList.add("swiper-slide");
  });
  updateSlidesClasses(currentIndexDown);
  updateSliderView(currentIndexDown);
}

export function updateSliderView(currentIndex) {
  slides = getSlides();
  currentIndexDown = currentIndex;
  updateSlidesClasses(currentIndex);
  slides.forEach((element) => {
    element.classList.remove("swiper-slide-thumb-active");
  });
  slides[currentIndex].classList.add("swiper-slide-thumb-active");
}
function next() {
  if (currentIndexDown < slides.length - 1) {
    currentIndexDown++;

    updateSliderView(currentIndexDown);
  }
}
function prev() {
  if (currentIndexDown > 0) {
    currentIndexDown--;

    updateSliderView(currentIndexDown);
  }
}
export function buttonsInit() {
  buttonNext.removeEventListener("click", next);
  buttonPrev.removeEventListener("click", prev);
  slides = getSlides();
  buttonNext.addEventListener("click", next);
  buttonPrev.addEventListener("click", prev);
}
