import React from 'react';
import {InputFormElement} from "../forms/InputFormElement.jsx";

export const CompetitionProblemsFormEdit = () => {
    return (
        <>
            <InputFormElement displayName="Название" name={"slug"} args={{required: "Название обязательно"}}/>
            <InputFormElement displayName="Приоритет" type="number" name={"priority"}
                              args={{required: "Приоритет обязателен"}}/>
        </>
    );
};

