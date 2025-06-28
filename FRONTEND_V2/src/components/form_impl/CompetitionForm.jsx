import React from 'react';
import {InputFormElement} from "../forms/InputFormElement.jsx";
import { useTranslation } from 'react-i18next';
import {CheckboxFormElement} from "../forms/CheckboxFormElement.jsx";

export const CompetitionFormElements = () => {
    const { t } = useTranslation();
    return (
        <>
            <InputFormElement
                name="name"
                displayName={t('adminChamps.name')}
                helpText={t('adminChamps.nameHelp')}
                args={{required: t('adminChamps.nameRequired')}}
            />

            <InputFormElement
                name="description"
                displayName={t('adminChamps.description')}
                helpText={t('adminChamps.descriptionHelp')}
                type="textarea"
                args={{required: t('adminChamps.descriptionRequired')}}
            />

            <InputFormElement
                name="startedAt"
                displayName={t('adminChamps.startedAt')}
                helpText={t('adminChamps.startedAtHelp')}
                type="datetime-local"
                args={{required: t('adminChamps.startedAtRequired')}}
            />

            <InputFormElement
                name="endedAt"
                displayName={t('adminChamps.endedAt')}
                helpText={t('adminChamps.endedAtHelp')}
                type="datetime-local"
                args={{required: t('adminChamps.endedAtRequired')}}
            />

            <CheckboxFormElement
                name="public"
                displayName={t('adminChamps.public')}
                helpText={t('adminChamps.publicHelp')}
                type="checkbox"
            />
            <CheckboxFormElement
                name="showInput"
                displayName={t('adminChamps.showInput')}
                helpText={t('adminChamps.showInputHelp')}
                type="checkbox"
            />
            <CheckboxFormElement
                name="showOutput"
                displayName={t('adminChamps.showOutput')}
                helpText={t('adminChamps.showOutputHelp')}
                type="checkbox"
            />
            <CheckboxFormElement
                name="showRating"
                displayName={t('adminChamps.showRating')}
                helpText={t('adminChamps.showRatingHelp')}
                type="checkbox"
            />
        </>
    );
};

