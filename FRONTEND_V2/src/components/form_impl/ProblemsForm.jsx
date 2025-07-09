import React from 'react';
import { InputFormElement } from "../forms/InputFormElement.jsx";
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import {TextareaFormElement} from "../forms/TextareaFormElement.jsx";

export const ProblemsForm = ({ form, testsArray, examplesArray }) => {
    const { t } = useTranslation();
    const {
        register,
    } = form;

    const { fields: testFields, append: appendTest, remove: removeTest } = testsArray;
    const { fields: exampleFields, append: appendExample, remove: removeExample } = examplesArray;

    return (
        <>
            <InputFormElement
                displayName={t('adminProblems.name')}
                name={"name"}
                args={{ required: t('adminProblems.nameRequired') }}
            />
            <TextareaFormElement
                displayName={t('adminProblems.description')}
                name={"description"}
                args={{ required: t('adminProblems.descriptionRequired') }}
            />
            <TextareaFormElement displayName={t('adminProblems.inData')} name={"inData"} />
            <TextareaFormElement displayName={t('adminProblems.outData')} name={"outData"} />

            {/* Tests Section */}
            <div className="mb-3">
                <label className="form-label">{t('adminProblems.tests')}</label>
                {testFields.map((item, index) => (
                    <div key={item.id} className="row mb-2">
                        <div className="col">
                            <textarea
                                className="form-control"
                                rows={3}
                                placeholder={t('adminProblems.testIn')}
                                {...register(`tests.${index}.in`)}
                            />
                        </div>
                        <div className="col">
                            <textarea
                                className="form-control"
                                rows={3}
                                placeholder={t('adminProblems.testOut')}
                                {...register(`tests.${index}.out`)}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-danger"
                                    onClick={() => removeTest(index)}>
                                {t('adminProblems.removeTest')}
                            </button>
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary"
                        onClick={() => appendTest({ in: "", out: "" })}>
                    {t('adminProblems.addTest')}
                </button>
            </div>

            {/* Examples Section */}
            <div className="mb-3">
                <label className="form-label">{t('adminProblems.examples')}</label>
                {exampleFields.map((item, index) => (
                    <div key={item.id} className="row mb-2">
                        <div className="col">
                            <textarea
                                className="form-control"
                                rows={3}
                                placeholder={t('adminProblems.exampleIn')}
                                {...register(`examples.${index}.in`)}
                            />
                        </div>
                        <div className="col">
                            <textarea
                                className="form-control"
                                rows={3}
                                placeholder={t('adminProblems.exampleOut')}
                                {...register(`examples.${index}.out`)}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-danger"
                                    onClick={() => removeExample(index)}>
                                {t('adminProblems.removeExample')}
                            </button>
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary"
                        onClick={() => appendExample({ in: "", out: "" })}>
                    {t('adminProblems.addExample')}
                </button>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary">{t('adminProblems.submit')}</button>
        </>
    );
};

ProblemsForm.propTypes = {
    form: PropTypes.object,
    testsArray: PropTypes.object,
    examplesArray: PropTypes.object,
};
