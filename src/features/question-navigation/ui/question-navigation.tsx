import { useNavigate } from "react-router-dom";
import { useExamStore } from "store";
import { StrokeButton } from "shared/ui";

export const QuestionNavigation = () => {
    const navigate = useNavigate();

    const {
        questions,
        currentQuestion,
        answers,
        nextQuestion,
        calculateResult,
    } = useExamStore();

    const isLastQuestion = currentQuestion === questions.length - 1;
    const isAnswerSelected = answers[currentQuestion] !== undefined;

    const handleClick = () => {
        if (!isAnswerSelected) return;

        if (isLastQuestion) {
            calculateResult();
            navigate("/result");
        } else {
            nextQuestion();
        }
    };

    return (
        <StrokeButton disabled={!isAnswerSelected} onClick={handleClick}>
            {isLastQuestion ? "Завершить" : "Далее"}
        </StrokeButton>
    );
};