document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");
  const closeBtnAlt = document.getElementById("closePopupBtn");

  function closeModal() {
    modal.classList.add("modal--hidden");
  }

  closeBtn.addEventListener("click", closeModal);
  closeBtnAlt.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("modal--hidden")) {
      closeModal();
    }
  });
});
