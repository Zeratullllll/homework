import { burgerInit } from "./burger.js";
import { initCloseModal, initModalButtons } from "./modal.js";
import {
  addSlidesClasses as addSlidesClassesReservation,
  buttonsInit as buttonsInitReservation,
  initMouseControl,
} from "./reservation-slider.js";

import {
  sliderInit as addSlidesClassesHalls,
  buttonsInit as buttonsInitHalls,
  initMouseControl as initMouseControl1,
} from "./halls__slider.js";
import {
  sliderInit as addSlidesClassesHallsExtra,
  buttonsInit as buttonsInitHallsExtra,
} from "./halls__slider-extra.js";

import { tabsInit } from "./halls-tabs.js";

burgerInit();

initCloseModal();
initModalButtons();

addSlidesClassesHalls();
buttonsInitHalls();
initMouseControl1();

addSlidesClassesHallsExtra();
buttonsInitHallsExtra();

addSlidesClassesReservation();
buttonsInitReservation();
initMouseControl();

tabsInit();
