document.addEventListener('DOMContentLoaded', () => {
    const correctHash = '0b45d3f1c5c6b8a4f0b3e8a2c9d1e0f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7';
    const form = document.getElementById('loginForm');
    const error = document.getElementById('error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const hashedPassword = CryptoJS.SHA256(password).toString();

        if (hashedPassword === correctHash) {
            sessionStorage.setItem('isAuthenticated', 'true');
            const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/test-site-release/instruction-DCUg-KPKrug/main.html';
            window.location.href = redirectUrl;
            sessionStorage.removeItem('redirectAfterLogin');
        } else {
            error.textContent = 'Неверный пароль!';
            error.style.display = 'block';
            document.getElementById('password').value = '';
        }
    });
});
