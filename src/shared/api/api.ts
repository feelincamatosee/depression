import axios from 'axios';

const PROXY_URL = import.meta.env.VITE_PROXY_URL

export const api = axios.create({
    baseURL: PROXY_URL,
    headers: {
        "Content-Type": "application/json",
    },
});