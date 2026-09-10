const API_BASE = 'http://localhost:3000';

function getToken() {
    return localStorage.getItem('token');
}

function requireAuthOrRedirect() {
    if (!getToken()) {
        window.location.replace('/admin/login.html');
        return false;
    }

    return true;
}

async function apiFetch(endpoint, options = {}) {
    const headers = {...options.headers};
    const token = getToken();

    if(token) headers['Authorization'] = `Bearer ${token}`;
    if(options.body && !(options.body instanceof FormData)){
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.replace('/admin/login.html');
        return;
    }

    return response;
}
