import { Loader2 } from "lucide-react";
import { useExamStore } from "store";
import { useNavigate } from "react-router-dom";

import { StrokeButton } from "shared/ui";

import styles from "./start-exam-button.module.css";

export const StartExamButton = () => {
    const { isLoading, startExam } = useExamStore();
    const navigate = useNavigate();

    const handleStartExam = async () => {
        try {
            await startExam();
            navigate("/exam");
        } catch (error) {
            console.error("Failed to start exam:", error);
        }
    };

    return (
        <StrokeButton
            onClick={handleStartExam}
            disabled={isLoading}
            className={styles['start-exam-button']}
        >
            {isLoading ? (
                <>
                    Подготовка к тестированию
                    <Loader2 className={styles.loader} />
                </>
            ) : (
                "Начать"
            )}
        </StrokeButton>
    );
};