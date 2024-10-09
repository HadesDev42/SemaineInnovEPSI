const API_BASE_URL = 'http://localhost:8000/api/trainings/'; // Remplacez par votre URL API

export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'appel API :", error);
        throw error;
    }
};

export const postData = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi des données :", error);
        throw error;
    }
};
