document.addEventListener('DOMContentLoaded', () => {
    const correctHash = '8da1b3a64be6a1b28464323237655d6cfc518c2b4930b683db273d39a9a3b601';
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
