const HOST = "/api-sabana";
let cachedToken = null;
let cachedTokenExpiresAt = 0;

export const getAccessToken = async () => {
    const now = Date.now();
    if (cachedToken && cachedTokenExpiresAt > now) {
        return cachedToken;
    }

    const url = `${HOST}/oauth2/token`;
    const credentials = {
        client_id: "78c7c133-1c34-4321-b7d7-94421b731782",
        client_secret: "a3dc736d-e2a5-49e6-a481-9e6b9dbf80a8",
        grant_type: "client_credentials"
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || 'Error al obtener token');
        error.response = {
            status: response.status,
            data: errorData
        };
        throw error;
    }

    const data = await response.json();
    cachedToken = data.access_token;
    const expiresInMs = typeof data.expires_in === 'number'
        ? data.expires_in * 1000
        : 4 * 60 * 1000;
    cachedTokenExpiresAt = Date.now() + expiresInMs - 60 * 1000;

    return cachedToken;
};

export const fetchCursosInRange = async (
    token,
    fechaInicio = "01-03-2026",
    fechaFin = "11-05-2026"
) => {
    const url = `${HOST}/api/improve-api/api-client/course/courses-updated-in-range?fecha_inicio=${encodeURIComponent(fechaInicio)}&fecha_fin=${encodeURIComponent(fechaFin)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || 'Error en la solicitud');
        error.response = {
            status: response.status,
            data: errorData
        };
        throw error;
    }

    const result = await response.json();
    return Object.values(result.data || {});
};