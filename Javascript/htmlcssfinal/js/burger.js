export default class BurgerMenu {
  constructor(config, headerFixedInstance = null) {
    this.config = config;
    this.burgerButton = document.querySelector(`.${this.config.BURGER}`);
    this.burgerMenu = document.querySelector(`.${this.config.HEADER_MENU}`);
    this.body = document.querySelector(`.${this.config.PAGE_BODY}`);
    this.headerFixedInstance = headerFixedInstance;
    this.main = document.querySelector(`.${this.config.MAIN}`);

    this.touchStartX = 0;

    if (!this.burgerButton || !this.burgerMenu || !this.body) {
      console.error("BurgerMenu: Не найдены необходимые DOM элементы!");
      return;
    }

    this.isMobileView = window.innerWidth <= this.config.BREAKPOINT;

    this.onBurgerClick = this.onBurgerClick.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    this.manageEvents();
    window.addEventListener("resize", this.onWindowResize);
  }

  manageEvents() {
    if (this.isMobileView) {
      this.initEvents();
    } else {
      this.removeEvents();
      this.hideBurgerMenu();
    }
  }

  initEvents() {
    this.burgerButton.addEventListener("click", this.onBurgerClick);
    this.body.addEventListener("click", this.onBodyClick);

    this.burgerMenu.addEventListener("touchstart", this.handleTouchStart);
    this.burgerMenu.addEventListener("touchmove", this.handleTouchMove);
    this.burgerMenu.addEventListener("touchend", this.handleTouchEnd);
  }

  removeEvents() {
    this.burgerButton.removeEventListener("click", this.onBurgerClick);
    this.body.removeEventListener("click", this.onBodyClick);

    this.burgerMenu.removeEventListener("touchstart", this.handleTouchStart);
    this.burgerMenu.removeEventListener("touchmove", this.handleTouchMove);
    this.burgerMenu.removeEventListener("touchend", this.handleTouchEnd);
  }

  onWindowResize() {
    const isNowMobileView = window.innerWidth <= this.config.BREAKPOINT;
    if (this.isMobileView !== isNowMobileView) {
      this.isMobileView = isNowMobileView;
      this.manageEvents();
    }
  }

  onBurgerClick(event) {
    event.stopPropagation();

    const isOpen = this.burgerButton.classList.toggle(this.config.BURGER_OPEN);
    this.burgerButton.setAttribute("aria-label", isOpen ? this.config.lABEL.CLOSE : this.config.lABEL.OPEN);
    this.burgerButton.setAttribute("aria-expanded", isOpen);

    this.burgerMenu.classList.toggle(this.config.HEADER_MENU_OPEN, isOpen);
    this.body.classList.toggle(this.config.PAGE_BODY_NO_SCROLL, isOpen);

    if (this.main) {
      this.main.style.pointerEvents = isOpen ? "none" : "";
    }
  }

  hideBurgerMenu() {
    const wasOpen = this.isBurgerMenuOpen();
    this.burgerButton.classList.remove(this.config.BURGER_OPEN);
    this.burgerButton.setAttribute("aria-label", this.config.lABEL.OPEN);
    this.burgerButton.setAttribute("aria-expanded", "false");

    this.burgerMenu.classList.remove(this.config.HEADER_MENU_OPEN);
    this.body.classList.remove(this.config.PAGE_BODY_NO_SCROLL);

    if (this.main) {
      this.main.style.pointerEvents = "";
    }
  }

  isBurgerMenuOpen() {
    return this.burgerMenu.classList.contains(this.config.HEADER_MENU_OPEN);
  }

  onBodyClick(event) {
    const target = event.target;
    const isLinkInMenu = target.classList.contains(this.config.MENU_LINK);
    const isMenuOpen = this.isBurgerMenuOpen();

    const isClickOutsideMenu =
      !target.closest(`.${this.config.HEADER_MENU}`) && !target.closest(`.${this.config.BURGER}`);

    if ((isLinkInMenu && this.isMobileView) || (isMenuOpen && isClickOutsideMenu)) {
      this.hideBurgerMenu();
    }
  }

  handleTouchStart(event) {
    if (!this.isBurgerMenuOpen()) return;
    this.touchStartX = event.changedTouches[0].screenX;
    this.burgerMenu.style.transition = "none";
  }

  handleTouchMove(event) {
    if (!this.isBurgerMenuOpen() || !this.touchStartX) return;
    const currentX = event.changedTouches[0].screenX;
    const translateX = Math.max(0, currentX - this.touchStartX);
    this.burgerMenu.style.transform = `translateX(${translateX}px)`;
  }

  handleTouchEnd(event) {
    if (!this.isBurgerMenuOpen() || !this.touchStartX) return;
    const touchEndX = event.changedTouches[0].screenX;
    const swipeDistance = touchEndX - this.touchStartX;

    this.burgerMenu.style.transition = "";
    this.burgerMenu.style.transform = "";

    if (swipeDistance > 70) {
      this.hideBurgerMenu();
    }

    this.touchStartX = 0;
  }
}