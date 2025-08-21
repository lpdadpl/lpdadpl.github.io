// Toggle mobile menu
const navToggleButton = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggleButton && siteNav) {
    navToggleButton.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggleButton.setAttribute('aria-expanded', String(isOpen));
    });
}

// Smooth scroll for internal links (fallback for browsers without CSS smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href') || '';
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (siteNav && siteNav.classList.contains('open')) {
            siteNav.classList.remove('open');
            navToggleButton?.setAttribute('aria-expanded', 'false');
        }
    });
});

// Contact form handler (demo-only)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
            formStatus && (formStatus.textContent = 'Por favor completa los campos requeridos.');
            formStatus && formStatus.classList.remove('status-success');
            formStatus && formStatus.classList.add('status-error');
            return;
        }
        formStatus && (formStatus.textContent = 'Enviando...');
        formStatus && formStatus.classList.remove('status-error');
        formStatus && formStatus.classList.add('status-success');
        await new Promise(r => setTimeout(r, 900));
        formStatus && (formStatus.textContent = '¡Gracias! Tu mensaje ha sido enviado.');
        contactForm.reset();
    });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}


