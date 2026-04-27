async function callAPI() {
    try {
        // Get access token
        const tokenResponse = await fetch('https://soc-api-gateway.unisabana.edu.co/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: "78c7c133-1c34-4321-b7d7-94421b731782",
                client_secret: "a3dc736d-e2a5-49e6-a481-9e6b9dbf80a8",
                grant_type: "client_credentials"
            })
        });
        const tokenData = await tokenResponse.json();
        const token = tokenData.access_token;

        // Call the API
        const apiResponse = await fetch('https://soc-api-gateway.unisabana.edu.co/api/improve-api/api-client/course/courses-in-list', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_curso: ["000233", "000236"] })
        });
        const apiData = await apiResponse.json();
        console.log(JSON.stringify(apiData, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

callAPI();