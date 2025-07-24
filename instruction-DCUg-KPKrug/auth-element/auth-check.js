document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('isAuthenticated')) {
        window.location.href = '/test-site-release/instruction-DCUg-KPKrug/auth.html';
    }
});
