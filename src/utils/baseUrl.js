const getBaseUrl = () => {
    const url = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
    // Remove trailing slash to prevent double slashes when concatenating with /api/
    return url.replace(/\/$/, '');
}

export default getBaseUrl;