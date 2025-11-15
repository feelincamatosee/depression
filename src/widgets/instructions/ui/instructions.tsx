import {useExamStore} from "store";
import {useNavigate} from "react-router-dom";

import {StartExamButton} from "features/start-exam";
import {StrokeButton} from "shared/ui";

import styles from './instructions.module.css';

export const Instructions = () => {
    const { mode, error, isLoading  } = useExamStore();
    const navigate = useNavigate()

    const instructions = {
        satirical: {
            colorClass: styles.satirical,
            text: (
                <p>
                    Экзаменационная работа состоит из <strong>20 заданий</strong>,
                    проверяющих вашу устойчивость к радости.
                </p>
            ),
            rules: [
                "Проходите тест трезвым: грусть должна быть натуральной.",
                "Если у вас отличное настроение — вернитесь позже, когда оно пройдёт.",
                "Не используйте позитивные аффирмации во время теста — это считается допингом.",
                "Разрешается рефлексировать, но в умеренных количествах.",
                "Если появится смысл жизни — не волнуйтесь, это временно.",
                "Не спорьте с тестом — он обидчивый.",
                "Если услышите внутренний голос — уточните, не внутренний ли это критик.",
                "В случае внезапного просветления сделайте вдох — оно обычно проходит."
            ]
        },
        serious: {
            colorClass: styles.serious,
            text: (
                <p>
                    Вам будет предложено <strong>20 вопросов (сгенерированных AI)</strong>,
                    касающихся вашего самочувствия за последние 2 недели.
                </p>
            ),
            rules: [
                'Отвечайте честно. Тест анонимен.',
                <strong>Внимание:</strong>,
                'Этот тест не является диагнозом. Он предназначен только для скрининга.'
            ],
        },
    };

    const data = instructions[mode as 'satirical' | 'serious'];
    if (!data) return null;

    return (
        <div className={styles['container']}>
            <div className={`${styles['bar']} ${data.colorClass}`}></div>

            <h2 className={styles['title']}>Инструкция по выполнению работы</h2>

            <div className={styles['content']}>
                {data.text}
                <ul className={styles['rules-list']}>
                    {data.rules.map((rule, index) => (
                        <li key={index} className={styles['rules-list__rule']}>{rule}</li>
                    ))}
                </ul>
            </div>

            {error && (
                <div className={styles['error']}>
                    <div className={styles['error-title']}>Ошибка</div>
                    <p className={styles['error-message']}>{error}</p>
                </div>
            )}

            <div className={styles['actions']}>
                <StrokeButton
                    onClick={() => navigate("/")}
                    disabled={isLoading}
                >
                    Назад
                </StrokeButton>

                <StartExamButton />
            </div>
        </div>
    );
};