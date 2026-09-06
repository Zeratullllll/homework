const modal = document.querySelector(".modal");
const modalButtons = document.querySelectorAll("[data-modal-button]");

export function initModalButtons() {
  modalButtons.forEach((element) => {
    element.addEventListener("click", modalHandle);
  });
}
function onModalButtonClick(event) {
  const button = event.target.closest("[data-modal-button]");
  const target = button.dataset.modalButton;
  const targetModal = document.querySelector(`[data-modal-window="${target}"]`);
  return targetModal;
}

function toggleOpenClasses(modal, modalWindow) {
  modal.classList.toggle("modal--open");
  modalWindow.classList.toggle("modal__window--open");
}

function toggleModal(modalWindow) {
  const modal = document.querySelector(".modal");
  toggleOpenClasses(modal, modalWindow);
}

function modalHandle(event) {
  toggleModal(onModalButtonClick(event));
}

export function initCloseModal() {
  modal.addEventListener("click", (event) => {
    const currentModal = modal.querySelector(".modal__window--open");
    if (!currentModal) {
      return;
    }
    if (!currentModal.contains(event.target) || event.target.closest(".modal__close")) {
      toggleOpenClasses(modal, currentModal);
    }
  });
}
