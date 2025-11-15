import { useNavigate } from "react-router-dom";
import { useExamStore } from "store";

import { StrokeButton } from "shared/ui";

export const RestartExamButton = () => {
    const navigate = useNavigate();
    const { restart } = useExamStore();

    const handleClick = () => {
        restart();
        navigate("/");
    };

    return <StrokeButton onClick={handleClick}>На главный экран</StrokeButton>;
};