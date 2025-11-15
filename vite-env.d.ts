interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string;
    readonly VITE_GEMINI_AI_FLASH: string;
    readonly VITE_GEMINI_AI_PRO: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}