import { useNavigate } from 'react-router-dom';
import { Frown, BrainCircuit } from 'lucide-react';

import {useExamStore} from "store/exam.store.ts";

import styles from './modes.module.css';

export const Modes = () => {
    const navigate = useNavigate();
    const { setMode } = useExamStore();

    const handleSelect = (mode: 'satirical' | 'serious') => {
        setMode(mode);
        navigate('/instructions');
    };

    return (
        <div className={styles['container']}>
            <h1 className={styles['title']}>Пространство рефлексии</h1>
            <p className={styles['subtitle']}>Выберите режим:</p>

            <div className={styles['modes']}>
                <button
                    onClick={() => handleSelect('satirical')}
                    className={`${styles['button']} ${styles['satirical']}`}
                >
                    <Frown size={32} className={styles['icon']} />
                    <h2 className={styles['button-title']}>Ирония</h2>
                    <p className={styles['button-description']}>
                        Взглянуть на реальность с сарказмом.
                    </p>
                </button>

                <button
                    onClick={() => handleSelect('serious')}
                    className={`${styles['button']} ${styles['serious']}`}
                >
                    <BrainCircuit size={32} className={styles['icon']} />
                    <h2 className={styles['button-title']}>Анализ</h2>
                    <p className={styles['button-description']}>
                        Пройти клинический скрининг-опросник.
                    </p>
                </button>
            </div>
        </div>
    );
};