const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  document.body.classList.toggle('modal-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  toggle?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.classList.remove('modal-open');
}));

document.querySelectorAll('.wa-link').forEach((link) => {
  const message = link.dataset.message;
  if (message) link.href = `https://wa.me/2348116781186?text=${encodeURIComponent(message.replaceAll('%0A', '\n'))}`;
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((el) => {
  if (observer) observer.observe(el);
  else el.classList.add('visible');
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();

document.querySelectorAll('[data-modal-open]').forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(`[data-modal="${button.dataset.modalOpen}"]`);
    modal?.showModal();
    document.body.classList.add('modal-open');
  });
});

document.querySelectorAll('[data-modal]').forEach((modal) => {
  const close = () => {
    modal.close();
    document.body.classList.remove('modal-open');
  };
  modal.querySelector('[data-modal-close]')?.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });
  modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
});
