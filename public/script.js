/**
 * Portafolio Profesional - Jesus Miguel Diaz Diaz
 * Script de interactividad, navegación activa y utilidades
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Resaltar enlace activo en la barra de navegación automáticamente
    highlightActiveNavLink();

    // 2. Manejo de botones para copiar texto (ej. correo o teléfono)
    setupCopyButtons();
});

function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else if (!link.classList.contains('navbar-cta')) {
            link.classList.remove('active');
        }
    });
}

function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy-target]');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy-target');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`¡Copiado al portapapeles: ${textToCopy}!`);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    });
}

function showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'copy-toast';
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> ${message}`;
    toast.style.display = 'flex';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}