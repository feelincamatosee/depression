import { Skull, CheckCircle } from 'lucide-react';
import { useExamStore } from 'store/exam.store';
import {getResultData} from "entities/exam";
import {RestartExamButton} from "features/restart-exam";

import styles from './result.module.css';

export const Result = () => {
    const { mode, score, maxScore } = useExamStore();
    const resultData = getResultData(mode, score);

    return (
        <div className={styles.container}>
            <div className={styles.certificate}>

                <div className={styles['icon-ring']}>
                    {mode === 'satirical' ? <Skull size={40} /> : <CheckCircle size={40} />}
                </div>

                <h2 className={styles['main-title']}>
                    Ваши результаты
                </h2>

                <div className={styles['score-block']}>
                    <p className={styles['score-label']}>Первичный балл:</p>
                    <div className={styles.score}>
                        {score} <span className={styles['max-score']}>/ {maxScore}</span>
                    </div>
                </div>

                <div className={styles['result-box']}>
                    <h3 className={styles['result-title']}>
                        {resultData.title}
                    </h3>
                    <p className={styles['result-description']}>
                        {resultData.desc}
                    </p>
                </div>

                <div className={styles.actions}>
                    <RestartExamButton />
                </div>

                <p className={styles.disclaimer}>
                    {mode === 'serious' && "Не является медицинским диагнозом. Обратитесь к специалисту."}
                </p>
            </div>
        </div>
    );
};