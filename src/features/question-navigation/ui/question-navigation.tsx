import { useNavigate } from 'react-router-dom';

import {useExamStore} from "store/exam.store.ts";

import styles from './question-navigation.module.css';

export const QuestionNavigation = () => {
    const navigate = useNavigate();

    const {
        questions,
        currentQuestion,
        answers,
        nextQuestion,
        calculateResult
    } = useExamStore();

    const isLastQuestion = currentQuestion === questions.length - 1;

    const isAnswerSelected = answers[currentQuestion] !== undefined;

    const handleClick = () => {
        if (!isAnswerSelected) return;

        if (isLastQuestion) {
            calculateResult();
            navigate('/result');
        } else {
            nextQuestion();
        }
    };

    return (
        <button
            disabled={!isAnswerSelected}
            onClick={handleClick}
            className={styles['button']}
        >
            {isLastQuestion ? 'Завершить' : 'Далее'}
        </button>
    );
};