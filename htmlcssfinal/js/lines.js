function initLines() {
  const targetSections = document.querySelectorAll("[data-lines]");

  targetSections.forEach((section) => {
    if (section.querySelector(".lines-bg")) return;

    const linesBgHTML = `
      <div class="lines-bg" aria-hidden="true">
        <div class="line"></div>
        <div class="lines-spacer"></div>
        <div class="line"></div>
        <div class="lines-spacer"></div>
        <div class="line"></div>
        <div class="lines-spacer"></div>
        <div class="line"></div>
      </div>
    `;

    section.insertAdjacentHTML("afterbegin", linesBgHTML);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLines);
} else {
  initLines();
}