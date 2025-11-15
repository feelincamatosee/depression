import axios from 'axios';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY не найден. Проверьте .env файл.");
}

const API_URL = "https://generativelanguage.googleapis.com/v1beta/";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        key: apiKey,
    };
    return config;
});