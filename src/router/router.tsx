import { lazy } from "react";
import {createBrowserRouter} from "react-router-dom";

import {Layout} from "layout";

const Home = lazy(() =>
    import('pages/home').then(module => ({
        default: module.HomePage
    }))
);
const Introduction = lazy(() =>    import('pages/introduction').then(module => ({
    default: module.Introduction
})));
const Exam = lazy(() =>    import('pages/exam').then(module => ({
    default: module.ExamPage
})));
const Result = lazy(() =>    import('pages/result').then(module => ({
    default: module.ResultPage
})));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            { path: '/', element: <Home/> },
            { path: '/instructions', element: <Introduction/> },
            { path: '/exam', element: <Exam/> },
            { path: '/result', element: <Result/> },
        ],
    },
]);