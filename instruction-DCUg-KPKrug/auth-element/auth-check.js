document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('isAuthenticated')) {
        window.location.href = '../instruction-DCUg-KPKrug/auth.html';
    }
});