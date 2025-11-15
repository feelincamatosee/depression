import { useNavigate } from 'react-router-dom';

import {useExamStore} from "store";

import styles from './restart-exam.module.css';

export const RestartExamButton = () => {
    const navigate = useNavigate();
    const { restart } = useExamStore();

    const handleClick = () => {
        restart();
        navigate('/');
    };

    return (
        <button onClick={handleClick} className={styles.button}>
            На главный экран
        </button>
    );
}