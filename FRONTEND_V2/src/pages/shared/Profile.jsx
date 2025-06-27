import Card from "../../components/bootstrap/Card.jsx";
import {useEffect, useState} from "react";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {useForm} from "react-hook-form";
import constants from "../../utils/consts.js";
import axios from "axios";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Profile = () => {
    const { t } = useTranslation();
    const [userProfile, updateData] = useCachedGetAPI(`/api/profile`, () => {}, []);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        if (userProfile) {
            reset({
                id: userProfile.id,
                username: userProfile.username,
                name: userProfile.name,
                roles: userProfile.roles?.join(', ')
            });
        }
    }, [userProfile]);

    const onSubmit = (data) => {
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        };

        setLoading(true);
        setShowSuccess(false);

        axios.put(`/api/profile`, {name: data.name}, conf)
            .then(() => setShowSuccess(true))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('profile.breadcrumbs.profile')}/>
            </BreadcrumbsRoot>

            <Card>
                <h2>{t('profile.title')}</h2>
                <Link className="btn btn-sm btn-info my-2" to="/profile/change-password">
                    {t('profile.changePasswordButton')}
                </Link>
                {
                    showSuccess &&
                    <div className="alert alert-success" role="alert">
                        {t('profile.successMessage')}
                    </div>
                }

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">{t('profile.formFields.id.label')}</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            {...register("id")}
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('profile.formFields.username.label')}</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            {...register("username")}
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('profile.formFields.name.label')}</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            {...register("name", {required: t('profile.formFields.name.required')})}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('profile.formFields.roles.label')}</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            {...register("roles")}
                            disabled
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? t('profile.buttons.saving') : t('profile.buttons.save')}
                    </button>
                </form>
            </Card>
        </>
    );
};