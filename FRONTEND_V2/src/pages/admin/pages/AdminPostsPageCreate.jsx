import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import React, {useEffect} from "react";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import Card from "../../../components/bootstrap/Card.jsx";
import {useNavigate} from "react-router-dom";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";
import {useTranslation} from 'react-i18next';
import {axiosInstance} from "../../../utils/settings.js";
import {PostForm} from "../../../components/form_impl/PostForm.jsx";

export const AdminPostsPageCreate = () => {

    const navigate = useNavigate()
    const { t } = useTranslation();

    const [data, update] = useCachedGetAPI("/api/posts", () => {
    }, []);

    useEffect(() => {
        update()
    }, []);

    console.debug(data)

    const form = useForm({})

    const onSubmit = (data) => {
        axiosInstance.post('/api/posts', data)
            .then(() => navigate("/admin/champs"))
    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('!adminProblems.problems')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <div className="container mt-4">
                    <h3>{t('posts.create')}</h3>
                    <MasterForm form={form} onSubmit={onSubmit}>
                        <PostForm />
                        <button type="submit" className="btn btn-primary">{t('posts.submit')}</button>
                    </MasterForm>
                </div>
            </Card>
        </>
    );
};
