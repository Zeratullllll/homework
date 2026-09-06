const swiper = new Swiper(".reservation__slider", {
  slidesPerView: "auto",
  spaceBetween: 61,
  centeredSlides: false,
  initialSlide: 0,

  navigation: {
    nextEl: ".reservation__slider--next",
    prevEl: ".reservation__slider--prev",
  },

  breakpoints: {
    768: {
      spaceBetween: 106,
      centeredSlides: true,
      initialSlide: 2,
    },
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
  const counterContainer = document.querySelector(".reservation__arrows .slider__counter");
  if (!counterContainer) return;

  const totalSlides = swiperInstance.slides.filter(
    (slide) => !slide.classList.contains("swiper-slide-duplicate"),
  ).length;

  const currentSlide = swiperInstance.realIndex + 1;
  counterContainer.innerHTML = `<span class="slider__now-count">${currentSlide}</span> из ${totalSlides}`;
}