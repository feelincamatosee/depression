import styles from "./footer.module.css";

import {MusicPlayer} from "widgets/music-player";

export const Footer = () => {

    return (
        <footer className={styles['footer']}>

            <div className={styles.container}>
                <MusicPlayer/>
            </div>

        </footer>
    );
};
