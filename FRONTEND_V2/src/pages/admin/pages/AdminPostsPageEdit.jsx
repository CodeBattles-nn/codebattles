import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import React, {useEffect} from "react";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import Card from "../../../components/bootstrap/Card.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";
import {useTranslation} from 'react-i18next';
import {PostForm} from "../../../components/form_impl/PostForm.jsx";
import {axiosInstance} from "../../../utils/settings.js";

export const AdminPostsPageEdit = () => {

    const navigate = useNavigate()

    const {postId} = useParams()

    const [data, update] = useCachedGetAPI(`/api/posts/${postId}`, () => {
    }, []);

    useEffect(() => {
        form.reset({...data})
    }, [data]);

    useEffect(() => {
        update()
    }, []);


    console.debug(data)

    const form = useForm({})

    const { t } = useTranslation();

    const onSubmit = (data) => {
        axiosInstance.put(`/api/posts/${postId}`, data)
            .then(() => navigate("/admin/posts"))
    };


    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('posts.posts')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <div className="container mt-4">
                    <h3>{t('posts.edit')}</h3>
                    <MasterForm form={form} onSubmit={onSubmit}>
                        <PostForm/>
                        <button type="submit" className="btn btn-primary">{t('posts.submit')}</button>
                    </MasterForm>
                </div>
            </Card>
        </>
    );
};
