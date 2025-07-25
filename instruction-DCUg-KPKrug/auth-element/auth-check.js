document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('isAuthenticated')) {
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = '/test-site-release/instruction-DCUg-KPKrug/auth.html';
    }
});
