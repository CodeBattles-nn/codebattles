import React from 'react';
import {InputFormElement} from "../forms/InputFormElement.jsx";
import { useTranslation } from 'react-i18next';

export const CompetitionProblemsFormEdit = () => {
    const { t } = useTranslation();
    return (
        <>
            <InputFormElement displayName={t('adminChamps.problemSlug')} name={"slug"} args={{required: t('adminChamps.problemSlugRequired')}}/>
            <InputFormElement displayName={t('adminChamps.priority')} type="number" name={"priority"}
                              args={{required: t('adminChamps.priorityRequired')}}/>
        </>
    );
};

