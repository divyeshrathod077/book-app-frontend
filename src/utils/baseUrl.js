const getBaseUrl = () => {
    return import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
}

export default getBaseUrl;