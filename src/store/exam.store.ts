import { create } from 'zustand';

import type {AIQuestion} from "entities/question";
import type {ExamMode} from "entities/exam";
import {ExamService} from "services";

import { calculateMaxScore } from 'shared/lib';

interface ExamStore {
    mode: ExamMode;
    questions: AIQuestion[];
    currentQuestion: number;
    answers: Record<number, number>;
    score: number;
    maxScore: number;
    isLoading: boolean;
    error: string | null;

    setMode: (selectedMode: ExamMode) => void;
    startExam: () => Promise<void>;
    selectAnswer: (scoreValue: number) => void;
    nextQuestion: () => void;
    calculateResult: () => void;
    restart: () => void;
}

export const useExamStore =create<ExamStore>((set, get) => ({
    mode: null,
    questions: [],
    currentQuestion: 0,
    answers: {},
    score: 0,
    maxScore: 0,
    isLoading: false,
    error: null,

    setMode: (selectedMode) => {
        set({ mode: selectedMode, error: null });
    },

    startExam: async () => {
        const mode = get().mode;
        set({ isLoading: true, error: null, answers: {}, currentQuestion: 0, score: 0 });

        try {

            switch (mode){
                case "satirical":
                {
                    const satiricalQuestions = await ExamService.getSatiricalQuestions();
                    const max = calculateMaxScore(satiricalQuestions);

                    set({
                        questions: satiricalQuestions,
                        maxScore: max,
                        isLoading: false,
                    });

                    break;
                }

                case "serious":
                {
                    const clinicalQuestions = await ExamService.getSeriouslyQuestions();
                    const max = calculateMaxScore(clinicalQuestions);

                    set({
                        questions: clinicalQuestions,
                        maxScore: max,
                        isLoading: false,
                    });

                    break;
                }
            }
        } catch (err) {
            set({ isLoading: false, error: "Failed to load questions" });
            throw err;
        }
    },

    selectAnswer: (scoreValue) => {
        set((state) => ({
            answers: { ...state.answers, [state.currentQuestion]: scoreValue },
        }));
    },

    nextQuestion: () => {
        set((state) => ({ currentQuestion: state.currentQuestion + 1 }));
    },

    calculateResult: () => {
        const totalScore = Object.values(get().answers).reduce((a, b) => a + b, 0);
        set({ score: totalScore });
    },


    restart: () => {
        set({
            mode: null,
            questions: [],
            currentQuestion: 0,
            answers: {},
            score: 0,
            maxScore: 0,
            error: null
        });
    },
}));