import type {ButtonHTMLAttributes, PropsWithChildren} from "react";

import styles from "./stroke-button.module.css";

type StrokeButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
}
>;

export const StrokeButton = ({children, className, ...rest}: StrokeButtonProps) => {
    const classes = [styles.button, className].filter(Boolean).join(" ");

    return (
        <button {...rest} className={classes}>
            {children}
        </button>
    );
};