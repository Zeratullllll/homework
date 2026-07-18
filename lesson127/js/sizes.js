export const sizes = () => {
  const sizesList = document.querySelector('[data-sizes="list"]');
  const sizesButtons = document.querySelectorAll('[data-sizes="button"]');

  const handleSizeClick = (event) => {
    const target = event.target;

    if (!target?.classList.contains("product__size")) return;

    sizesButtons.forEach((button) => button.classList.remove("product__size--active"));
    target.classList.add("product__size--active");
  };

  sizesList.addEventListener("click", handleSizeClick);
};
