import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {useExamStore} from "store/exam.store.ts";

import {QuestionNavigation} from "features/question-navigation";
import {FinishExamButton} from "features/finish-exam";

import styles from './test.module.css';

export const Test = () => {
    const navigate = useNavigate();

    const {
        questions,
        currentQuestion,
        answers,
        selectAnswer
    } = useExamStore();

    useEffect(() => {
        if (questions.length === 0) {
            navigate('/');
        }
    }, [questions, navigate]);

    if (questions.length === 0) {
        return <div>Загрузка...</div>;
    }

    // 2. Переименовал, чтобы было понятнее
    const currentQuestionData = questions[currentQuestion];

    if (!currentQuestionData) {
        return <div>Загрузка вопроса...</div>;
    }

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <div className={styles['counter']}>
                    Вопрос {currentQuestion + 1} из {questions.length}
                </div>
            </div>

            <div className={styles['body']}>
                <div className={styles['question-container']}>
                    <h3 className={styles['question']}>{currentQuestionData.text}</h3>
                    <div className={styles['options-list']}>
                        {currentQuestionData.options.map((option, idx) => {
                            const isSelected = answers[currentQuestion] === option.score;
                            const labelClass = `${styles['option']} ${isSelected ? styles['selected'] : ''}`;

                            return (
                                <label key={idx} className={labelClass}>
                                    <input
                                        type="radio"
                                        name={`q-${currentQuestion}`}
                                        className={styles['option-radio']}
                                        checked={isSelected}
                                        onChange={() => selectAnswer(option.score)}
                                    />
                                    <span className={styles['option-text']}>{option.text}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className={styles['navigation']}>
                    <FinishExamButton/>
                    <QuestionNavigation />
                </div>
            </div>
        </div>
    );
};