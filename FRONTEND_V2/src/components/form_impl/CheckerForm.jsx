import React from 'react';
import {InputFormElement} from "../forms/InputFormElement.jsx";

export const CheckerForm = () => {
    return (
        <>
            <InputFormElement
                name="displayName"
                displayName="Название"
                helpText="Название, которое показывается пользователю"
                args={{required: "Введите имя"}}
            />

            <InputFormElement
                name="languageHighlightName"
                displayName="Имя языка программирования"
                helpText="Имя языка для подсветки синтаксиса"
                args={{required: "Введите имя для подсветки синтаксиса"}}
            />

            <InputFormElement
                name="address"
                displayName="Адрес чекера"
                args={{required: "Адрес чекера обязателен"}}
            />

        </>
    );
};

