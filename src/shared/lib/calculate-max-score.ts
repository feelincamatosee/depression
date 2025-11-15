import type {AIQuestion} from "../../entities/question/types";

export const calculateMaxScore = (questions: AIQuestion[]): number => {
    if (!questions || questions.length === 0) {
        return 0;
    }

    return questions.reduce((totalScore, question) => {
        const optionScores = question.options.map(opt => opt.score);
        const maxScoreForThisQuestion = Math.max(...optionScores);

        return totalScore + maxScoreForThisQuestion;
    }, 0);
};