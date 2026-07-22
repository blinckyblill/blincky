const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('[data-nav]');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.textContent = open ? '×' : '☰';
  });
}

const chips = document.querySelectorAll('.chip[data-filter]');
const galleryItems = document.querySelectorAll('.g-item[data-tag]');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(item => item.classList.remove('active'));
  chip.classList.add('active');
  const filter = chip.dataset.filter;
  galleryItems.forEach(item => { item.hidden = filter !== 'all' && item.dataset.tag !== filter; });
}));

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
function closeModal(){
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
galleryItems.forEach(item => item.addEventListener('click', () => {
  if (!modal) return;
  modalImage.src = item.dataset.image;
  modalImage.alt = item.dataset.title;
  modalTitle.textContent = item.dataset.title;
  modalDesc.textContent = item.dataset.desc;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

const waForm = document.getElementById('waForm');
if (waForm) waForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('waName').value.trim();
  const phone = document.getElementById('waPhone').value.trim();
  const location = document.getElementById('waLocation').value.trim();
  const service = document.getElementById('waService').value;
  const message = document.getElementById('waMsg').value.trim();
  const text = `Goedendag BlinckyBill Keukens,\n\nNaam: ${name}\nTelefoon: ${phone || '-'}\nLocatie: ${location || '-'}\nDienst: ${service}\n\nBericht:\n${message}`;
  window.open(`https://wa.me/31616698106?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
