const HOST = "/api-sabana";

export const getAccessToken = async () => {
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
    const data = await response.json();
    return data.access_token;
};

export const fetchCursosInList = async (token, idsCursos = ["000233", "000236"]) => {
    const url = `${HOST}/api/improve-api/api-client/course/courses-in-list`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_curso: idsCursos })
    });
    const result = await response.json();
    return Object.values(result.data || {});
};