document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // 1. POPUP DE EDICIÓN DE PERFIL (avatar del top)
  // ============================================================
  const modal = document.getElementById("editPopup");
  const closeBtn = document.getElementById("closePopup");
  const avatarTrigger = document.getElementById("avatarTrigger");
  const editForm = document.getElementById("editForm");

  avatarTrigger.addEventListener("click", function () {
    modal.classList.remove("modal--hidden");
  });

  function closeModal() {
    modal.classList.add("modal--hidden");
  }
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("modal--hidden")) {
      closeModal();
    }
  });

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name =
      document.getElementById("name").value.trim() || "Saeyoung Choi";
    const bio =
      document.getElementById("bio").value.trim() ||
      "🧡 hacker · amante de los coches · gatos 🐱";
    document.querySelector(".profile__name").textContent = name;
    document.querySelector(".profile__bio p:first-child").textContent = bio;
    closeModal();
  });

  // ============================================================
  // 2. GENERAR HISTORIAS DINÁMICAMENTE
  // ============================================================
  const storiesContainer = document.getElementById("storiesContainer");
  const storyTemplate = document.getElementById("story-template");

  const storiesData = [
    {
      type: "coches",
      label: "Coches",
      icon: "images/icons/car-svgrepo-com.svg",
      content: `<div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
        <img src="images/707-car.jpg" style="width:45%; border-radius:16px;" />
        <img src="images/honda_nsx_1993.jpg" style="width:45%; border-radius:16px;" />
        <img src="images/mustang-dark-horse.jpg" style="width:45%; border-radius:16px;" />
      </div>`,
    },
    {
      type: "gatos",
      label: "Gatos",
      icon: "images/icons/cat-face-svgrepo-com.svg",
      content: `<div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
        <img src="images/elizabeth.jpg" style="width:45%; border-radius:16px;" />
        <img src="images/images_eli.jpg" style="width:45%; border-radius:16px;" />
      </div>`,
    },
    {
      type: "hacking",
      label: "Hacking",
      icon: "images/icons/laptop-device-pc-svgrepo-com.svg",
      content: `<div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
        <img src="images/hacking.webp" style="width:45%; border-radius:16px;" />
        <img src="images/707.png" style="width:45%; border-radius:16px;" />
      </div>`,
    },
    {
      type: "juegos",
      label: "Juegos",
      icon: "images/icons/game-svgrepo-com.svg",
      content: `<div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
        <img src="images/lolol.jpg" style="width:45%; border-radius:16px;" />
        <img src="images/707.png" style="width:45%; border-radius:16px;" />
      </div>`,
    },
    {
      type: "comida",
      label: "Comida",
      icon: "images/icons/food-wine-cheese-bread-national-culture-paris-svgrepo-com.svg",
      content: `<div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
        <img src="images/chips.jpg" style="width:45%; border-radius:16px;" />
      </div>`,
    },
    {
      type: "ropa",
      label: "Ropa",
      icon: "images/icons/clothes-shirt-svgrepo-com.svg",
      content: `<div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
        <img src="images/maid_707.jpg" style="width:45%; border-radius:16px;" />
      </div>`,
    },
  ];

  storiesData.forEach((story) => {
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
  // 3. POPUP DE HISTORIAS (delegación)
  // ============================================================
  const storyPopup = document.getElementById("storyPopup");
  const closeStoryBtn = document.getElementById("closeStoryPopup");
  const storyContent = document.getElementById("storyContent");

  function closeStoryModal() {
    storyPopup.classList.add("modal--hidden");
  }
  closeStoryBtn.addEventListener("click", closeStoryModal);
  storyPopup.addEventListener("click", function (e) {
    if (e.target === storyPopup) closeStoryModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !storyPopup.classList.contains("modal--hidden")) {
      closeStoryModal();
    }
  });

  document.addEventListener("click", function (e) {
    const storyDiv = e.target.closest(".story");
    if (!storyDiv) return;
    const type = storyDiv.dataset.story;
    const storyData = storiesData.find((s) => s.type === type);
    if (storyData) {
      storyContent.innerHTML = storyData.content;
      storyPopup.classList.remove("modal--hidden");
    }
  });

  // ============================================================
  // 4. PUBLICACIONES (CRUD)
  // ============================================================
  const postsContainer = document.getElementById("postsContainer");
  let posts = [];
  let renderTimeout = null;

  function loadPosts() {
    const saved = localStorage.getItem("posts");
    if (saved) {
      posts = JSON.parse(saved);
    } else {
      posts = [
        {
          id: 1,
          image: "images/mustang-dark-horse.jpg",
          caption:
            "🏎️ Mi nuevo juguete: Mustang Dark Horse 2024. Velocidad, estilo y tecnología. Como debe ser.",
          likes: 1234,
          liked: false,
          date: new Date().toLocaleDateString(),
        },
        {
          id: 2,
          image: "images/707-car.jpg",
          caption: "Mi primer amor: Mazda RX-7. Siempre en mi corazón.",
          likes: 890,
          liked: false,
          date: new Date().toLocaleDateString(),
        },
      ];
    }
    renderPosts();
  }

  function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  function renderPosts() {
    // Limpiar timeout anterior para evitar renders múltiples
    if (renderTimeout) {
      clearTimeout(renderTimeout);
      renderTimeout = null;
    }
    // Usar requestAnimationFrame para optimizar
    renderTimeout = requestAnimationFrame(() => {
      if (posts.length === 0) {
        postsContainer.innerHTML =
          '<p style="text-align:center; color:#b39286; padding:30px;">No hay publicaciones aún. ¡Agrega una!</p>';
        return;
      }
      let html = "";
      for (const post of posts) {
        const caption = post.caption || "";
        const truncated =
          caption.length > 100 ? caption.slice(0, 100) + "..." : caption;
        const isLong = caption.length > 100;
        html += `
          <article class="post" data-id="${post.id}">
            <div class="post__header">
              <img src="images/saeyoung_choi.jpg" alt="Avatar" class="post__avatar" />
              <span class="post__username">@707_luciel</span>
              <span class="post__date">${post.date || "hace un momento"}</span>
              <button class="post__delete-btn" aria-label="Eliminar publicación">⋯</button>
            </div>
            <div class="post__image">
              <img src="${post.image}" alt="Publicación" loading="lazy" />
            </div>
            <div class="post__content">
              <p class="post__text ${isLong ? "post__text--truncated" : ""}">
                ${isLong ? truncated : caption}
              </p>
              ${isLong ? `<button class="post__text-more" data-expand="true">Ver más</button>` : ""}
              <div class="post__actions">
                <button class="post__like-btn ${post.liked ? "liked" : ""}" data-id="${post.id}">
                  <img src="images/icons/heart-svgrepo-com.svg" alt="Me gusta" class="icon" />
                  <span class="like-count">${post.likes}</span>
                </button>
                <span>
                  <img src="images/icons/comment-svgrepo-com.svg" alt="Comentarios" class="icon" />
                  ${Math.floor(Math.random() * 50)}
                </span>
                <span>
                  <img src="images/icons/arrow-up-right-from-square-svgrepo-com.svg" alt="Compartir" class="icon" />
                  ${Math.floor(Math.random() * 30)}
                </span>
              </div>
            </div>
          </article>
        `;
      }
      postsContainer.innerHTML = html;
      renderTimeout = null;
    });
  }

  // ============================================================
  // 5. VALIDAR URL DE IMAGEN
  // ============================================================
  function validateImageUrl(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  // ============================================================
  // 6. AÑADIR PUBLICACIÓN (con validación)
  // ============================================================
  const addBtn = document.getElementById("addPostBtn");
  const urlInput = document.getElementById("postImageUrl");
  const captionInput = document.getElementById("postCaption");
  const messageEl = document.getElementById("addPostMessage");

  addBtn.addEventListener("click", async function () {
    const imageUrl = urlInput.value.trim();
    const caption = captionInput.value.trim();
    messageEl.textContent = "";

    if (!imageUrl) {
      messageEl.textContent = "⚠️ Por favor, ingresa una URL de imagen.";
      return;
    }

    // Validar que la imagen existe
    messageEl.textContent = "⏳ Verificando imagen...";
    addBtn.disabled = true;
    const isValid = await validateImageUrl(imageUrl);
    addBtn.disabled = false;

    if (!isValid) {
      messageEl.textContent =
        "❌ La imagen no se pudo cargar. Verifica la URL.";
      return;
    }

    // Agregar publicación
    const newPost = {
      id: Date.now(),
      image: imageUrl,
      caption: caption || "Sin descripción",
      likes: 0,
      liked: false,
      date: new Date().toLocaleDateString(),
    };
    posts.unshift(newPost);
    savePosts();
    renderPosts();
    urlInput.value = "";
    captionInput.value = "";
    messageEl.textContent = "✅ Publicación agregada correctamente.";
    setTimeout(() => (messageEl.textContent = ""), 3000);
  });

  // ============================================================
  // 7. ELIMINAR, LIKE Y VER MÁS (delegación)
  // ============================================================
  postsContainer.addEventListener("click", function (e) {
    // Eliminar
    const deleteBtn = e.target.closest(".post__delete-btn");
    if (deleteBtn) {
      const postElement = deleteBtn.closest(".post");
      const id = parseInt(postElement.dataset.id);
      if (confirm("¿Eliminar esta publicación?")) {
        posts = posts.filter((p) => p.id !== id);
        savePosts();
        renderPosts();
      }
      return;
    }

    // Like
    const likeBtn = e.target.closest(".post__like-btn");
    if (likeBtn) {
      const id = parseInt(likeBtn.dataset.id);
      const post = posts.find((p) => p.id === id);
      if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        savePosts();
        renderPosts();
      }
      return;
    }

    // Ver más
    const moreBtn = e.target.closest(".post__text-more");
    if (moreBtn) {
      const postElement = moreBtn.closest(".post");
      const textEl = postElement.querySelector(".post__text");
      const isExpanded = textEl.classList.contains("post__text--expanded");
      if (isExpanded) {
        textEl.classList.remove("post__text--expanded");
        moreBtn.textContent = "Ver más";
      } else {
        textEl.classList.add("post__text--expanded");
        moreBtn.textContent = "Ver menos";
      }
    }
  });

  // ============================================================
  // 8. INICIALIZAR
  // ============================================================
  loadPosts();
});
