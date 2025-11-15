interface ImportMetaEnv {
    readonly VITE_GEMINI_AI_FLASH: string;
    readonly VITE_GEMINI_AI_PRO: string;
    readonly VITE_PROXY_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}