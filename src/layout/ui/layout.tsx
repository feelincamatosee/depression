import {Outlet} from 'react-router-dom';
import {Footer, Header} from "widgets";

import {Suspense} from "react";

import styles from "./layout.module.css";

export const Layout = () => {
    return (
        <div className={styles['layout']}>
            <Header/>

            <main className={styles['outlet']}>
                <Suspense
                    fallback={
                        <div className={styles['loader']}>
                            Загрузка страницы...
                        </div>}
                >
                    <Outlet/>
                </Suspense>
            </main>

            <Footer/>
        </div>
    );
};

