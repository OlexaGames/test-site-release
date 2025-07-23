document.addEventListener('DOMContentLoaded', () => {
    const correctHash = '8da1b3a64be6a1b28464323237655d6cfc518c2b4930b683db273d39a9a3b601';
    const form = document.getElementById('loginForm');
    const error = document.getElementById('error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        error.textContent = '';
        error.style.display = 'none';
        const password = document.getElementById('password').value;
        const hashedPassword = CryptoJS.SHA256(password).toString();

        if (hashedPassword === correctHash) {
            sessionStorage.setItem('isAuthenticated', 'true');
            window.location.href = '../instruction-DCUg-KPKrug/main.html';
        } else {
            error.textContent = 'Неверный пароль!';
            error.style.display = 'block';
            document.getElementById('password').value = '';
        }
    });
});