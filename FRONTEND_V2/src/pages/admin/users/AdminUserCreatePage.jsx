import React, {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import Card from "../../../components/bootstrap/Card.jsx";
import axios from "axios";
import constants from "../../../utils/consts.js";
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';


export function AdminUserCreatePage() {
    const {register, handleSubmit, setValue} = useForm();
    const [passLength, setPassLength] = useState(12);
    const [useSpecials, setUseSpecials] = useState(true);
    const modalRef = useRef(null);
    const { t } = useTranslation();

    let navigate = useNavigate();

    const generatePassword = () => {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        const chars = charset + (useSpecials ? specials : '');
        return Array.from({length: passLength}, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    };


    const applyPassword = () => {
        const newPass = generatePassword();
        setValue('mpassword', newPass);
        // eslint-disable-next-line
        const modal = bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();
    };

    const onSubmit = (data) => {
        axios
            .post(`/api/users`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
                    }
                })
            .then(() => {
                navigate(`/admin/users`)
            })
    }

    return (
        <>
            <div
                className="modal fade"
                id="passwordModal"
                tabIndex="-1"
                ref={modalRef}
                aria-labelledby="passwordModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="passwordModalLabel">{t('adminUsers.passwordGenerationSettings')}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label={t('adminUsers.cancel')}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">{t('adminUsers.passwordLength')}</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    min="6"
                                    max="50"
                                    value={passLength}
                                    onChange={(e) => setPassLength(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={useSpecials}
                                    onChange={(e) => setUseSpecials(e.target.checked)}
                                    id="useSpecialsCheck"
                                />
                                <label className="form-check-label" htmlFor="useSpecialsCheck">
                                    {t('adminUsers.includeSpecialCharacters')}
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('adminUsers.cancel')}</button>
                            <button type="button" className="btn btn-primary" onClick={applyPassword}>
                                {t('adminUsers.generateAndApply')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Card>
                <h3>{t('adminUsers.userForm')}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">

                    <div className="mb-3">
                        <label className="form-label">{t('adminUsers.login')}</label>
                        <input className="form-control" {...register('musername')} required/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('adminUsers.password')}</label>
                        <div className="input-group">
                            <input type="text" className="form-control" {...register('mpassword')} required/>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#passwordModal"
                            >
                                {t('adminUsers.generate')}
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('adminUsers.name')}</label>
                        <input className="form-control" {...register('name')} required/>
                    </div>

                    <button type="submit" className="btn btn-success">{t('adminUsers.submit')}</button>
                </form>
            </Card>
        </>
    );
}
