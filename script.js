// Alterna el menú móvil al hacer clic en el botón de navegación
const navToggleButton = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggleButton && siteNav) {
    // Escucha el clic en el botón para abrir/cerrar el menú
    navToggleButton.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        // Actualiza el atributo aria-expanded para accesibilidad
        navToggleButton.setAttribute('aria-expanded', String(isOpen));
    });
}

// Desplazamiento suave para enlaces internos (fallback para navegadores sin scroll suave por CSS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href') || '';
        const target = document.querySelector(targetId);
        if (target) {
            // Previene el comportamiento por defecto y realiza scroll suave
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Cierra el menú móvil si está abierto después de hacer clic en un enlace
        if (siteNav && siteNav.classList.contains('open')) {
            siteNav.classList.remove('open');
            navToggleButton?.setAttribute('aria-expanded', 'false');
        }
    });
});

// Manejador del formulario de contacto (solo demostración)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    // Escucha el envío del formulario
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Valida los campos requeridos
        if (!contactForm.checkValidity()) {
            formStatus && (formStatus.textContent = 'Por favor completa los campos requeridos.');
            formStatus && formStatus.classList.remove('status-success');
            formStatus && formStatus.classList.add('status-error');
            return;
        }
        // Muestra mensaje de envío y simula retardo
        formStatus && (formStatus.textContent = 'Enviando...');
        formStatus && formStatus.classList.remove('status-error');
        formStatus && formStatus.classList.add('status-success');
        await new Promise(r => setTimeout(r, 900));
        // Muestra mensaje de éxito y reinicia el formulario
        formStatus && (formStatus.textContent = '¡Gracias! Tu mensaje ha sido enviado.');
        contactForm.reset();
    });
}

// Actualiza el año en el pie de página automáticamente
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}

function copyEmail() {
    const email = 'albertodepablolopez@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const feedback = document.getElementById('email-feedback');
        feedback.style.display = 'inline';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}
