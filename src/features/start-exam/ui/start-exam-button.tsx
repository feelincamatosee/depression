import {Loader2} from 'lucide-react';

import {useExamStore} from 'store';
import {useNavigate} from "react-router-dom";

import styles from './start-exam-button.module.css';

export const StartExamButton = () => {
    const {isLoading} = useExamStore();
    const navigate = useNavigate()

    const { startExam } = useExamStore();

    const handleStartExam = async () => {
        try {
            await startExam();
            navigate('/exam');
        } catch (error) {
            console.error("Failed to start exam:", error);
        }
    };

    return (
        <button
            onClick={handleStartExam}
            disabled={isLoading}
            className={styles['button']}
        >
            {isLoading ? <>Подготовка к тестированию <Loader2 className={styles['loader']}/></> : 'Начать'}
        </button>
    );
};