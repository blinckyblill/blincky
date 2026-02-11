// BlinckyBill Keukens - script.js

// Year in footer
(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

// Mobile nav toggle
(() => {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("[data-nav]");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
})();

// Portfolio filters
(() => {
  const gallery = document.getElementById("gallery");
  const chips = document.querySelectorAll(".chip[data-filter]");
  if (!gallery || !chips.length) return;

  const items = Array.from(gallery.querySelectorAll(".g-item"));

  function applyFilter(tag) {
    items.forEach((el) => {
      const t = el.getAttribute("data-tag") || "";
      const show = tag === "all" || t === tag;
      el.style.display = show ? "" : "none";
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      applyFilter(chip.getAttribute("data-filter") || "all");
    });
  });
})();

// Modal (image + zoom on click)
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPh = document.getElementById("modalPh");

window.openModal = function (title, desc, imageSrc) {
  if (!modal || !modalTitle || !modalDesc || !modalPh) return;

  modalTitle.textContent = title || "";
  modalDesc.textContent = desc || "";

  // Insert image
  modalPh.innerHTML = `<img src="${imageSrc}" alt="${title || "foto"}">`;

  // Zoom toggle on click
  const img = modalPh.querySelector("img");
  if (img) {
    img.addEventListener("click", () => {
      img.classList.toggle("is-zoomed");
    });
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

window.closeModal = function () {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  // Reset modal content (also clears zoom)
  if (modalPh) modalPh.innerHTML = "";
};

// Close modal on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") window.closeModal?.();
});

// WhatsApp contact form (optional, if you added it in contact.html)
(() => {
  const waForm = document.getElementById("waForm");
  if (!waForm) return;

  waForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("waName")?.value.trim() || "";
    const phone = document.getElementById("waPhone")?.value.trim() || "";
    const msg = document.getElementById("waMsg")?.value.trim() || "";

    const text =
      `Hoi BlinckyBill Keukens!\n\n` +
      `Naam: ${name}\n` +
      (phone ? `Telefoon: ${phone}\n` : "") +
      `\nBericht:\n${msg}`;

    const url = `https://wa.me/31616698106?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
})();
