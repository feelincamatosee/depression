import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {useExamStore} from "store";

import {Result} from "widgets";

export const ResultPage = () => {
    const { mode } = useExamStore();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!mode) {
            navigate('/');
        }
    }, [mode, navigate]);

    if (!mode) {
        return null;
    }

    return (
            <Result />
    );
};