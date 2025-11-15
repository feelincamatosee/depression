
import { useNavigate } from 'react-router-dom';

import { useExamStore } from 'store';

import styles from './finish-exam-button.module.css';

export const FinishExamButton = () => {
    const navigate = useNavigate();
    const { calculateResult } = useExamStore();

    const handleClick = () => {
        calculateResult();
        navigate('/result');
    };

    return (
        <button
            onClick={handleClick}
            className={styles['button']}
            title="Завершить тест и посмотреть результаты"
        >
            Завершить
        </button>
    );
};