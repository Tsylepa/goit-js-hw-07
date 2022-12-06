import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
const galleryMarkup = createGallery(galleryItems);

gallery.insertAdjacentHTML("beforeend", galleryMarkup);
gallery.addEventListener("click", openOriginal);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </div>`;
    })
    .join("");
}

function openOriginal(e) {
  e.preventDefault();

  const isImg = e.target.classList.contains("gallery__image");

  if (!isImg) {
    return;
  }

  const original = basicLightbox.create(
    `<img src="${e.target.dataset.source}">`
  );

  original.show();

  document.addEventListener("keydown", onEscKeyPress);
  original.element().addEventListener("click", closeOriginal);

  function onEscKeyPress(e) {
    if (e.code === "Escape") {
      closeOriginal();
    }
  }

  function closeOriginal() {
    original.close();
    document.removeEventListener("keydown", onEscKeyPress);
  }
}
