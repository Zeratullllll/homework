var swiper = new Swiper(".halls__slider--down", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});

var swiper2 = new Swiper(".halls__slider--top", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".halls__slider--next",
    prevEl: ".halls__slider--prev",
  },
  thumbs: {
    swiper: swiper,
  },
  on: {
    init: function () {
      updateCounter(this);
    },
    slideChange: function () {
      updateCounter(this);
    },
  },
});

function updateCounter(swiperInstance) {
  const currentElem = document.querySelector(".slider__now-count");
  const totalElem = document.querySelector(".slider__total-count");

  if (currentElem && totalElem) {
    currentElem.textContent = swiperInstance.realIndex + 1;
    totalElem.textContent = swiperInstance.slides.length;
  }
}