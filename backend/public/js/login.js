document.getElementById('loginForm').addEventListener('submit', async(e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMsg');

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
            })
        });

        const data = await res.json();

        if (!res.ok) {
            errorMessage.textContent = data.message || 'Login failed';
            return;
        }

        localStorage.setItem('token', data.token);
        window.location.replace('/admin/dashboard.html');
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again later.';
    }
});
