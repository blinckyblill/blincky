// BlinckyBill Keukens — site-interacties (menu, galerij, modal, WhatsApp-formulier)
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Mobiel menu
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('[data-nav]');
function setNav(open) {
  nav.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
  navToggle.textContent = open ? '×' : '☰';
}
if (navToggle && nav) {
  navToggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('click', e => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !navToggle.contains(e.target)) setNav(false);
  });
}

// Galerijfilters
const chips = document.querySelectorAll('.chip[data-filter]');
const galleryItems = document.querySelectorAll('.g-item[data-tag]');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
  chip.classList.add('active');
  chip.setAttribute('aria-pressed', 'true');
  const filter = chip.dataset.filter;
  galleryItems.forEach(item => { item.hidden = filter !== 'all' && item.dataset.tag !== filter; });
}));

// Foto-modal
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
let previousFocus = null;
function closeModal() {
  if (!modal || !modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (previousFocus) previousFocus.focus();
}
galleryItems.forEach(item => item.addEventListener('click', () => {
  if (!modal) return;
  previousFocus = document.activeElement;
  modalImage.src = item.dataset.image;
  modalImage.alt = item.dataset.title;
  modalTitle.textContent = item.dataset.title;
  modalDesc.textContent = item.dataset.desc;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeModal(); if (nav && navToggle && nav.classList.contains('open')) setNav(false); }
});

// Offerteformulier → WhatsApp
const waForm = document.getElementById('waForm');
if (waForm) waForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('waName').value.trim();
  const phone = document.getElementById('waPhone').value.trim();
  const location = document.getElementById('waLocation').value.trim();
  const service = document.getElementById('waService').value;
  const message = document.getElementById('waMsg').value.trim();
  const text = `Goedendag BlinckyBill Keukens,\n\nNaam: ${name}\nTelefoon: ${phone || '-'}\nLocatie: ${location || '-'}\nDienst: ${service}\n\nBericht:\n${message}`;
  const url = `https://wa.me/31616698106?text=${encodeURIComponent(text)}`;
  const win = window.open(url, '_blank');
  if (win) win.opener = null;
  else window.location.href = url; // pop-up geblokkeerd → zelfde tabblad
});
