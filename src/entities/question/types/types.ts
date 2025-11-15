export interface QuestionOption {
    text: string;
    score: number;
}

export interface RawAIQuestion {
    id?: number;
    text: string;
    options: QuestionOption[];
}

export interface AIQuestion {
    id: number;
    text: string;
    options: QuestionOption[];
}
