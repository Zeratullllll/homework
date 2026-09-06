import { updateSliderView as thumbFunction, initMouseControl } from "./halls__slider-2.js";

const sliderTrack = document.querySelectorAll(".halls__track")[5];
const buttonNext = document.querySelector(".halls__slider--next");
const buttonPrev = document.querySelector(".halls__slider--prev");

const slides = [...sliderTrack.children];
let currentIndexDown = 0;
const slideWidth = slides[0].offsetWidth;
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
  updateSlidesClasses(currentIndexDown);
  updateSliderView(currentIndexDown);
}

export function updateSliderView(currentIndex) {
  currentIndexDown = currentIndex;
  updateSlidesClasses(currentIndex);
  slides.forEach((element) => {
    element.classList.remove("swiper-slide-thumb-active");
  });
  slides[currentIndex].classList.add("swiper-slide-thumb-active");
}

export function buttonsInit() {
  buttonNext.addEventListener("click", () => {
    if (currentIndexDown < slides.length - 1) {
      currentIndexDown++;

      updateSliderView(currentIndexDown);
    }
  });
  buttonPrev.addEventListener("click", () => {
    if (currentIndexDown > 0) {
      currentIndexDown--;

      updateSliderView(currentIndexDown);
    }
  });
}
slides.forEach((element) => {
  element.addEventListener("click", (event) => {
    for (let i = 0; i < slides.length; i++) {
      if (event.target.closest(".swiper-slide") === slides[i]) {
        currentIndexDown = i;
        updateSliderView(currentIndexDown);
        thumbFunction(currentIndexDown);
      }
    }
  });
});
