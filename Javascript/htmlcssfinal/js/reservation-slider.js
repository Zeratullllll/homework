const sliderTrack = document.querySelector(".reservation__track");
const buttonNext = document.querySelector(".reservation__slider--next");
const buttonPrev = document.querySelector(".reservation__slider--prev");

const slides = [...sliderTrack.children];
let currentIndex = window.innerWidth <= 768 ? 0 : 2;
const getSlideWidth = () => slides[0].offsetWidth + 100;

function updateSlidesClasses() {
  slides.forEach((element) => {
    element.classList.remove("swiper-slide-active", "swiper-slide-prev", "swiper-slide-next");
  });
  slides[currentIndex].classList.add("swiper-slide-active");
  currentIndex != 0 ? slides[currentIndex - 1].classList.add("swiper-slide-prev") : 0;
  currentIndex != slides.length - 1 ? slides[currentIndex + 1].classList.add("swiper-slide-next") : 0;
}

export function addSlidesClasses() {
  slides.forEach((element) => {
    element.classList.add("swiper-slide");
  });
  updateSlidesClasses();
  updateSliderView();
}

function updateSliderView(dragDelta = 0) {
  if (!dragDelta) {
    sliderTrack.style.transition = "transform 0.3s";
  }
  const centerOffset = `calc(50% - ${getSlideWidth() / 2}px - ${currentIndex * getSlideWidth()}px)`;
  sliderTrack.style.transform = `translateX(calc(${centerOffset} + ${dragDelta}px))`;
  updateSlidesClasses();
  document.querySelectorAll(".slider__counter")[1].innerHTML =
    `<span class="slider__now-count">${currentIndex + 1}</span> из ${slides.length}`;
}

export function buttonsInit() {
  buttonNext.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;

      updateSliderView();
    }
  });
  buttonPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;

      updateSliderView();
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
      updateSliderView(deltaX);
    }
  });
  window.addEventListener("pointerup", (event) => {
    if (!isDragging) return false;
    isDragging = false;
    cursorEndPosition = event.clientX;
    const slidersCountChange = Math.round(-(cursorEndPosition - cursorStartPosition) / getSlideWidth());

    currentIndex += slidersCountChange;
    currentIndex = currentIndex > slides.length - 1 ? slides.length - 1 : currentIndex < 0 ? 0 : currentIndex;
    updateSliderView();
  });
}
