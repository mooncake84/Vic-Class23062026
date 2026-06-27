document.addEventListener("DOMContentLoaded", function () {
  // ===== Elementos del DOM =====
  const modal = document.getElementById("editPopup");
  const closeBtn = document.getElementById("closePopup");
  const avatarTrigger = document.getElementById("avatarTrigger");
  const editForm = document.getElementById("editForm");
  const nameInput = document.getElementById("name");
  const bioInput = document.getElementById("bio");

  // ===== Abrir el pop‑up al hacer clic en el avatar (barra superior) =====
  avatarTrigger.addEventListener("click", function () {
    modal.classList.remove("modal--hidden");
  });

  // ===== Función para cerrar el pop‑up =====
  function closeModal() {
    modal.classList.add("modal--hidden");
  }

  // ===== Cerrar con la X =====
  closeBtn.addEventListener("click", closeModal);

  // ===== Cerrar haciendo clic fuera del contenido (fondo oscuro) =====
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ===== Cerrar con la tecla ESC =====
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("modal--hidden")) {
      closeModal();
    }
  });

  // ===== Guardar cambios (actualizar nombre y descripción en el perfil) =====
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Tomar valores, con valores por defecto si están vacíos
    const newName = nameInput.value.trim() || "Saeyoung Choi";
    const newBio =
      bioInput.value.trim() || "🧡 hacker · amante de los coches · gatos 🐱";

    // Actualizar el nombre en la vista
    const nameElement = document.querySelector(".profile__name");
    if (nameElement) {
      nameElement.textContent = newName;
    }

    // Actualizar la primera línea de la biografía (el primer <p> dentro de .profile__bio)
    const bioParagraph = document.querySelector(".profile__bio p:first-child");
    if (bioParagraph) {
      bioParagraph.textContent = newBio;
    }

    // Cerrar el pop‑up después de guardar
    closeModal();
  });
});
