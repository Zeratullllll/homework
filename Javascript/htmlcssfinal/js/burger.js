const burgerIcon = document.querySelector(".header__burger");
const mobileMenu = document.querySelector(".mobile-menu");

export function burgerInit() {
  burgerIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("mobile-menu--open");
    burgerIcon.classList.toggle("header__burger--open");
  });
}
