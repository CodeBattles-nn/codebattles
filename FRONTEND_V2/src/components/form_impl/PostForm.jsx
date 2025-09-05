import React from 'react';
import {InputFormElement} from "../forms/InputFormElement.jsx";
import {useTranslation} from 'react-i18next';
import {TextareaFormElement} from "../forms/TextareaFormElement.jsx";
import {CheckboxFormElement} from "../forms/CheckboxFormElement.jsx";

export const PostForm = () => {
  const {t} = useTranslation();
  return (
    <>
      <InputFormElement
        name="title"
        displayName={t('posts.param_title')}
        helpText={t('posts.param_title_help')}
        args={{required: t('posts.param_title_required')}}
      />

      <TextareaFormElement
        name="content"
        displayName={t('posts.param_content')}
        helpText={t('posts.param_content_help')}
        args={{required: t('posts.param_content_required')}}
      />

      <CheckboxFormElement
        name="showAtMain"
        displayName={t('posts.param_mainpage')}
        helpText={t('posts.param_mainpage_help')}
      />


    </>
  );
};

