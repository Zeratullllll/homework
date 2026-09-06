import BurgerMenu from "./burger.js";
import Modal from "./modal.js";

try {
  new BurgerMenu({
    BURGER: "header__burger",
    BURGER_OPEN: "header__burger--open",
    HEADER_MENU: "mobile-menu",
    HEADER_MENU_OPEN: "mobile-menu--open",
    lABEL: {
      OPEN: "Открыть меню",
      CLOSE: "Закрыть меню",
    },
    PAGE_BODY: "page__body",
    PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
    MENU_LINK: "menu__link",
    BREAKPOINT: 992,
    MAIN: "main",
  });

  new Modal({
    PAGE_BODY: "page__body",
    PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
  });
} catch (error) {
  console.error(error);
}