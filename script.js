// Mobile nav toggle + footer year + portfolio filter + modal
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.querySelector("[data-nav]");
if (toggleBtn && nav) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

// Portfolio filters
const chips = document.querySelectorAll(".chip");
const items = document.querySelectorAll(".g-item");
if (chips.length && items.length) {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const filter = chip.getAttribute("data-filter");
      items.forEach((it) => {
        const tag = it.getAttribute("data-tag");
        const show = filter === "all" || tag === filter;
        it.style.display = show ? "" : "none";
      });
    });
  });
}

// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPh = document.getElementById("modalPh");

window.openModal = function (title, desc, placeholder) {
  if (!modal) return;
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalPh.textContent = placeholder;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

window.closeModal = function () {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

// Close modal on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") window.closeModal?.();
});
// WhatsApp contact form (no backend needed)
const waForm = document.getElementById("waForm");

if (waForm) {
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
}

