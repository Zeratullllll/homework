import {
  sliderInit as addSlidesClassesHalls,
  buttonsInit as buttonsInitHalls,
  initMouseControl as initMouseControl1,
} from "./halls__slider.js";
import {
  sliderInit as addSlidesClassesHallsExtra,
  buttonsInit as buttonsInitHallsExtra,
} from "./halls__slider-extra.js";

const buttonsTab = [...document.querySelectorAll("button[data-hall]")];

const itemsTab = [...document.querySelectorAll("[data-hall]:not(button)")];

export function tabsInit() {
  itemsTab.forEach((item) => {
    if (item.dataset.hall === "1") {
      item.classList.remove("slider-disabled");
      if (item.matches(".halls__slider-wrap")) {
        item.style.display = "block";
      } else {
        item.style.display = "flex";
      }
    } else {
      item.style.display = "none";
      item.classList.add("slider-disabled");
    }
  });
  buttonsTab.forEach((button) => {
    button.addEventListener("click", (event) => {
      const dataId = event.target.dataset.hall;
      itemsTab.forEach((item) => {
        if (item.dataset.hall === dataId) {
          item.classList.remove("slider-disabled");
          if (item.matches(".halls__slider-wrap")) {
            item.style.display = "block";
          } else {
            item.style.display = "flex";
          }
        } else {
          item.style.display = "none";
          item.classList.add("slider-disabled");
        }
      });
      addSlidesClassesHalls();
      buttonsInitHalls();
      initMouseControl1();

      addSlidesClassesHallsExtra();
      buttonsInitHallsExtra();
    });
  });
}
