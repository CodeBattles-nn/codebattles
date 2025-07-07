import Card from "../../components/bootstrap/Card.jsx";
import {useState} from "react";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {useForm} from "react-hook-form";
import constants from "../../utils/consts.js";
import axios from "axios";
import {MasterForm} from "../../components/forms/MasterForm.jsx";
import {InputFormElement} from "../../components/forms/InputFormElement.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const ChangePassword = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const form = useForm();

    const onSubmit = (data) => {
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        };


        setLoading(true);
        axios.post(`/api/users/change-password`, data, conf)
            .then(() => navigate(`/profile`))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    };

    const newPassword = form.watch('newPassword', '');

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('changePassword.breadcrumbs.profile')}/>
            </BreadcrumbsRoot>

            <Card>
                <h2>{t('changePassword.title')}</h2>
                {
                    error &&
                    <div className="alert alert-danger" role="alert">
                        {t('changePassword.errorMessage')}
                    </div>
                }

                <MasterForm form={form} onSubmit={onSubmit}>
                    <InputFormElement
                        name={"currentPassword"}
                        type="password"
                        displayName={t('changePassword.form.currentPassword.label')}
                        args={{required: t('changePassword.form.currentPassword.required')}}
                    />
                    <InputFormElement
                        name={"newPassword"}
                        type="password"
                        displayName={t('changePassword.form.newPassword.label')}
                        args={{required: t('changePassword.form.newPassword.required')}}
                    />

                    <InputFormElement
                        displayName={t("Repeat Password")}
                        name='newPasswordDublicate'
                        type="password"
                        args={{
                            required: t("Repeat Password"),
                            validate: (value) =>
                                value === newPassword || t("Passwords doesnt equals"),
                        }}
                    />

                    <div className="d-flex gap-2">
                        <button className="btn btn-primary" disabled={loading}>
                            {loading ? t('changePassword.buttons.changing') : t('changePassword.buttons.change')}
                        </button>
                        <button className="btn btn-danger" role="button" onClick={() => navigate("/profile")}>
                            {t('changePassword.buttons.cancel')}
                        </button>
                    </div>
                </MasterForm>
            </Card>
        </>
    );
};