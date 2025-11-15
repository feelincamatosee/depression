import type {ExamResult, ExamMode} from "entities/exam";

const getSatiricalResultData = (score: number): ExamResult => {
    if (score < 30) return { title: "Не допущен", desc: "Вы подозрительно жизнерадостны...", colorClass: "error", stamp: "НЕ СДАЛ" };
    if (score < 70) return { title: "Любитель", desc: "У вас есть потенциал...", colorClass: "warning", stamp: "ТРОЕЧКА" };
    if (score < 110) return { title: "Эксперт Тоски", desc: "Поздравляем! Ваш уровень апатии...", colorClass: "info", stamp: "СДАНО" };
    return { title: "Магистр Бездны", desc: "Вы познали дзен пустоты...", colorClass: "purple", stamp: "ОТЛИЧНО" };
};

const getSeriousResultData = (score: number): ExamResult => {
    const scorePercent = (score / 30) * 100;

    if (scorePercent <= 20) return { title: "Нет симптомов", desc: "Ваши результаты не указывают...", colorClass: "success", stamp: "НОРМА" };
    if (scorePercent <= 40) return { title: "Легкая степень", desc: "Результаты указывают на легкие...", colorClass: "warning", stamp: "ВНИМАНИЕ" };
    if (scorePercent <= 60) return { title: "Умеренная степень", desc: "Результаты указывают на умеренные...", colorClass: "warning-heavy", stamp: "КОНСУЛЬТАЦИЯ" };
    return { title: "Тяжелая степень", desc: "Результаты указывают на выраженные...", colorClass: "error", stamp: "СРОЧНО" };
};

export const getResultData = (mode: ExamMode, score: number): ExamResult => {
    if (mode === 'satirical') {
        return getSatiricalResultData(score);
    }

    if (mode === 'serious') {
        return getSeriousResultData(score);
    }

    return {
        title: "Ошибка",
        desc: "Не удалось определить режим.",
        colorClass: "colorError",
        stamp: "ОШИБКА"
    };
}