/* Healing Body & Soul — shared interactions */
const menuBtn = document.getElementById('menuBtn');
const closeMenu = document.getElementById('closeMenu');
const navOverlay = document.getElementById('navOverlay');
const closeNav = () => {
  if (navOverlay) {
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
};
if (menuBtn) menuBtn.addEventListener('click', () => {
  if (navOverlay) {
    navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  }
});
if (closeMenu) closeMenu.addEventListener('click', closeNav);
if (navOverlay) navOverlay.addEventListener('click', e => {
  if (e.target === navOverlay) closeNav();
});
document.querySelectorAll('.nav-menu a').forEach(a => a.addEventListener('click', closeNav));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealItems.forEach(el => observer.observe(el));
} else revealItems.forEach(el => el.classList.add('visible'));

// Prevent visitors from selecting a past appointment date.
const appointmentDate = document.getElementById('date');
if (appointmentDate) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  appointmentDate.min = `${yyyy}-${mm}-${dd}`;
}

// Send appointment requests to the clinic's official WhatsApp number.
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
  appointmentForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData(appointmentForm);
    const clinicWhatsApp = '2349091206001';
    const name = form.get('name') || '';
    const phone = form.get('phone') || '';
    const email = form.get('email') || '';
    const service = form.get('service') || '';
    const date = form.get('date') || '';
    const time = form.get('time') || '';
    const message = form.get('message') || '';
    const text = [
      'Hello Healing Body & Soul, I would like to request an appointment.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : '',
      `Service: ${service}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
      message ? `Wellness goals/questions: ${message}` : ''
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/${clinicWhatsApp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
