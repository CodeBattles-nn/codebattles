import React from 'react';
import {InputFormElement} from "../forms/InputFormElement.jsx";
import { useTranslation } from 'react-i18next';

export const CheckerForm = () => {
    const { t } = useTranslation();
    return (
        <>
            <InputFormElement
                name="displayName"
                displayName={t('adminCheckers.name')}
                helpText={t('adminCheckers.nameHelp')}
                args={{required: t('adminCheckers.nameRequired')}}
            />

            <InputFormElement
                name="languageHighlightName"
                displayName={t('adminCheckers.languageHighlightName')}
                helpText={t('adminCheckers.languageHighlightNameHelp')}
                args={{required: t('adminCheckers.languageHighlightNameRequired')}}
            />

            <InputFormElement
                name="address"
                displayName={t('adminCheckers.address')}
                args={{required: t('adminCheckers.addressRequired')}}
            />

        </>
    );
};

