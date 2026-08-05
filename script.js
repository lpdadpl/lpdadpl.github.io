document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('siteHeader');
    const nav = document.getElementById('siteNav');
    const toggle = document.getElementById('navToggle');
    const year = document.getElementById('year');

    if (year) year.textContent = new Date().getFullYear();

    const closeMenu = () => {
        nav?.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    toggle?.addEventListener('click', () => {
        const open = !nav?.classList.contains('open');
        nav?.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    });

    nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 12), { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach((element) => element.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
});
