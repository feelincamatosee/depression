import { isAxiosError } from "axios";
import { api, type ApiResponse } from "shared/api";
import { AIQuestion, RawAIQuestion } from "entities/question";

import { SATIRICAL_PROMPT, SERIOUSLY_PROMPT } from "shared/constants/prompts";

export class ExamService {
    private static readonly AI_MODEL_FLASH = import.meta.env.VITE_GEMINI_AI_FLASH;
    private static readonly AI_MODEL_PRO = import.meta.env.VITE_GEMINI_AI_PRO;

    private static readonly GENERATION_CONFIG = {
        responseMimeType: "application/json",
        responseSchema: {
            type: "ARRAY",
            items: {
                type: "OBJECT",
                properties: {
                    id: { "type": "NUMBER" },
                    text: { "type": "STRING" },
                    options: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                text: { "type": "STRING" },
                                score: { "type": "NUMBER" }
                            },
                            required: ["text", "score"]
                        }
                    }
                },
                required: ["id", "text", "options"]
            }
        }
    };

    public static async getSeriouslyQuestions(): Promise<AIQuestion[]> {
        const payload = {
            modelName: this.AI_MODEL_PRO,
            contents: [{ parts: [{ text: SERIOUSLY_PROMPT }] }],
            generationConfig: this.GENERATION_CONFIG,
        };

        try {
            const response = await api.post<ApiResponse>('generate', payload);

            const jsonText = response.data.candidates[0].content.parts[0].text;
            const parsedJson = JSON.parse(jsonText) as RawAIQuestion[];

            return parsedJson.map((q, idx) => ({
                ...q,
                id: q.id || idx + 1,
            }));

        } catch (error) {
            console.error("Axios error in ExamService.getSeriouslyQuestions:", error);
            if (isAxiosError(error) && error.response) {
                console.error("Error data:", error.response.data);
            }
            throw new Error("API call failed in ExamService. Check console.");
        }
    }

    public static async getSatiricalQuestions(): Promise<AIQuestion[]> {
        const payload = {
            modelName: this.AI_MODEL_FLASH,
            contents: [{ parts: [{ text: SATIRICAL_PROMPT }] }],
            generationConfig: this.GENERATION_CONFIG,
        };

        try {
            const response = await api.post<ApiResponse>('generate', payload);

            const jsonText = response.data.candidates[0].content.parts[0].text;
            const parsedJson = JSON.parse(jsonText) as RawAIQuestion[];

            return parsedJson.map((q, idx) => ({
                ...q,
                id: q.id || idx + 1,
            }));

        } catch (error) {
            console.error("Axios error in ExamService.getSatiricalQuestions:", error);
            if (isAxiosError(error) && error.response) {
                console.error("Error data:", error.response.data);
            }
            throw new Error("API call failed in ExamService. Check console.");
        }
    }
}