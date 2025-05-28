import React from 'react';
import {InputFormElement} from "../forms/InputFormElement.jsx";

export const CompetitionFormElements = () => {
    return (
        <>
            <InputFormElement
                name="name"
                displayName="Название"
                helpText="Название, которое показывается пользователю"
                args={{required: "Введите имя"}}
            />

            <InputFormElement
                name="description"
                displayName="Описание"
                helpText="Описание. Поддерживается Markdown"
                type="textarea"
                args={{required: "Введите описание"}}
            />

            <InputFormElement
                name="startedAt"
                displayName="Начало"
                helpText="Время начала соревнования"
                type="datetime-local"
                args={{required: "Введите время начала"}}
            />

            <InputFormElement
                name="endedAt"
                displayName="Конец"
                helpText="Время конца соревнования"
                type="datetime-local"
                args={{required: "Введите время окончания"}}
            />
        </>
    );
};

