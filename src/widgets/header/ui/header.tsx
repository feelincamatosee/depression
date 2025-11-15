import { Frown, BrainCircuit } from 'lucide-react';
import {useLocation} from "react-router-dom";

import {useExamStore} from "store";

import styles from './header.module.css';

export const Header = () => {
    const {mode} = useExamStore()

    const { pathname } = useLocation();

    if (pathname === "/") return null;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.egeHeader}>
                    <div className={styles.brand}>
                        <div className={styles.icon}>
                            {mode === 'satirical' ? <Frown size={28} /> : <BrainCircuit size={28} />}
                        </div>
                        <div>
                            <h1 className={styles.title}>
                                {mode === 'satirical' ? "РосПечалНадзор" : "Центр Психометрии"}
                            </h1>
                            <p className={styles.subtitle}>
                                {mode === 'satirical' ? "Федеральная служба по контролю настроения" : "Оценка ментального благополучия"}
                            </p>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <p className={styles['info-title']}>
                            {mode === 'satirical' ? "ЕГЭ-2025" : "Опросник PHQ-A"}
                        </p>
                        <p className={styles['info-subtitle']}>
                            {mode === 'satirical' ? "Публичный скрининг" : "Анонимный скрининг"}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};