document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // 1. POPUP DE EDICIÓN DE PERFIL (se abre con el avatar del top)
  // ============================================================
  const modalEdit = document.getElementById("editPopup");
  const closeEditBtn = document.getElementById("closePopup");
  const avatarTrigger = document.getElementById("avatarTrigger");
  const editForm = document.getElementById("editForm");

  // Abrir
  avatarTrigger.addEventListener("click", function () {
    modalEdit.classList.remove("modal--hidden");
  });

  // Cerrar
  function closeEditModal() {
    modalEdit.classList.add("modal--hidden");
  }
  closeEditBtn.addEventListener("click", closeEditModal);
  modalEdit.addEventListener("click", function (e) {
    if (e.target === modalEdit) closeEditModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalEdit.classList.contains("modal--hidden")) {
      closeEditModal();
    }
  });

  // Guardar cambios
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name =
      document.getElementById("name").value.trim() || "Saeyoung Choi";
    const bio =
      document.getElementById("bio").value.trim() ||
      " hacker · amante de los coches · gatos ";
    document.querySelector(".profile__name").textContent = name;
    document.querySelector(".profile__bio p:first-child").textContent = bio;
    closeEditModal();
  });

  // ============================================================
  // 2. GENERAR HISTORIAS DINÁMICAMENTE (con múltiples imágenes)
  // ============================================================
  const storiesContainer = document.getElementById("storiesContainer");
  const storyTemplate = document.getElementById("story-template");

  // Datos de historias (cada una puede tener varias imágenes)
  const storiesData = [
    {
      type: "coches",
      label: "Coches",
      icon: "images/icons/car-svgrepo-com.svg",
      images: [
        "images/707-car.jpg",
        "images/mustang-dark-horse.jpg",
        "images/honda nsx 1993.jpg",
      ],
    },
    {
      type: "gatos",
      label: "Gatos",
      icon: "images/icons/cat-face-svgrepo-com.svg",
      images: [
        "images/elizabeth.jpg",
        "images/images_eli.jpg",
        "images/elizabeth.jpg",
      ],
    },
    {
      type: "hacking",
      label: "Hacking",
      icon: "images/icons/laptop-device-pc-svgrepo-com.svg",
      images: ["images/hacking.webp", "images/707.png"],
    },
    {
      type: "juegos",
      label: "Juegos",
      icon: "images/icons/game-svgrepo-com.svg",
      images: ["images/lolol.jpg", "images/707.png"],
    },
    {
      type: "comida",
      label: "Comida",
      icon: "images/icons/food-wine-cheese-bread-national-culture-paris-svgrepo-com.svg",
      images: ["images/chips.jpg"],
    },
    {
      type: "ropa",
      label: "Ropa",
      icon: "images/icons/clothes-shirt-svgrepo-com.svg",
      images: [
        "images/maid_707.jpg",
        "images/seven_green.webp",
        "images/elegant_clothes.jpg",
      ],
    },
  ];

  // Generar cada historia en el DOM
  storiesData.forEach(function (story) {
    const clone = storyTemplate.content.cloneNode(true);
    const storyDiv = clone.querySelector(".story");
    const iconImg = clone.querySelector(".story__icon");
    const labelSpan = clone.querySelector(".story__label");

    storyDiv.dataset.story = story.type;
    iconImg.src = story.icon;
    iconImg.alt = story.label;
    labelSpan.textContent = story.label;

    storiesContainer.appendChild(clone);
  });

  // ============================================================
  // 3. POPUP DE HISTORIAS (muestra las imágenes)
  // ============================================================
  const modalStory = document.getElementById("storyPopup");
  const closeStoryBtn = document.getElementById("closeStoryPopup");
  const storyContent = document.getElementById("storyContent");

  function closeStoryModal() {
    modalStory.classList.add("modal--hidden");
  }
  closeStoryBtn.addEventListener("click", closeStoryModal);
  modalStory.addEventListener("click", function (e) {
    if (e.target === modalStory) closeStoryModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalStory.classList.contains("modal--hidden")) {
      closeStoryModal();
    }
  });

  // Delegación: al hacer clic en una historia, mostrar sus imágenes
  document.addEventListener("click", function (e) {
    const storyDiv = e.target.closest(".story");
    if (!storyDiv) return;
    const type = storyDiv.dataset.story;
    const storyData = storiesData.find(function (s) {
      return s.type === type;
    });
    if (storyData) {
      // Construir HTML con todas las imágenes
      let html = "";
      storyData.images.forEach(function (imgSrc) {
        html += '<img src="' + imgSrc + '" alt="' + storyData.label + '" />';
      });
      storyContent.innerHTML = html;
      modalStory.classList.remove("modal--hidden");
    }
  });

  // ============================================================
  // 4. POPUP PARA NUEVA PUBLICACIÓN (con carga de imagen local)
  // ============================================================
  const modalPost = document.getElementById("newPostPopup");
  const closePostBtn = document.getElementById("closePostPopup");
  const addPostBtn = document.getElementById("addPostBtn");
  const postForm = document.getElementById("newPostForm");
  const postsContainer = document.getElementById("postsContainer");

  // Abrir popup al hacer clic en "+ Publicar"
  addPostBtn.addEventListener("click", function () {
    modalPost.classList.remove("modal--hidden");
  });

  // Cerrar popup
  function closePostModal() {
    modalPost.classList.add("modal--hidden");
  }
  closePostBtn.addEventListener("click", closePostModal);
  modalPost.addEventListener("click", function (e) {
    if (e.target === modalPost) closePostModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalPost.classList.contains("modal--hidden")) {
      closePostModal();
    }
  });

  // Enviar nueva publicación
  postForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("postImage");
    const textInput = document.getElementById("postText");
    const file = fileInput.files[0];
    const text = textInput.value.trim() || "Sin descripción";

    if (!file) {
      alert("Por favor selecciona una imagen.");
      return;
    }

    // Leer la imagen como URL para mostrarla
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result;

      // Crear nueva publicación
      const newPost = document.createElement("section");
      newPost.className = "post";
      newPost.innerHTML = `
        <div class="post__header">
          <img src="images/saeyoung_choi.jpg" alt="Avatar" class="post__avatar" />
          <span class="post__username">@707_luciel</span>
          <span class="post__date">ahora mismo</span>
        </div>
        <div class="post__image">
          <img src="${imageUrl}" alt="Nueva publicación" />
        </div>
        <div class="post__content">
          <p class="post__text">${text}</p>
          <div class="post__actions">
            <span><img src="images/icons/heart-svgrepo-com.svg" alt="Me gusta" class="icon" /> 0</span>
            <span><img src="images/icons/comment-svgrepo-com.svg" alt="Comentarios" class="icon" /> 0</span>
            <span><img src="images/icons/arrow-up-right-from-square-svgrepo-com.svg" alt="Compartir" class="icon" /> 0</span>
          </div>
        </div>
      `;

      // Insertar al inicio del contenedor
      postsContainer.prepend(newPost);

      // Resetear formulario y cerrar popup
      postForm.reset();
      closePostModal();
    };

    reader.readAsDataURL(file);
  });
});
