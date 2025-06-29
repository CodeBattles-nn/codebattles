import Card from "../../../components/bootstrap/Card.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";
import {CheckerForm} from "../../../components/form_impl/CheckerForm.jsx";
import {useTranslation} from 'react-i18next';
import {axiosInstance} from "../../../utils/settings.js";

export const AdminCheckersEditPage = () => {
    const {checkId} = useParams()

    const navigate = useNavigate();

    const [competitionsProblem, updateData] = useCachedGetAPI(`/api/checkers/${checkId}/admin`, () => {
    }, []);

    const form = useForm();
    const { t } = useTranslation();

    useEffect(() => {
        updateData()
    }, []);

    useEffect(() => {
        form.reset({
            displayName: competitionsProblem.displayName,
            address: competitionsProblem.address,
            languageHighlightName: competitionsProblem.languageHighlightName
        })
    }, [competitionsProblem]);

    const onSubmit = (data) => {
        console.debug(data);
        axiosInstance.patch(`/api/checkers/${checkId}`, data)
            .then(() => navigate("/admin/champs"))



    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminCheckers.editChecker')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <MasterForm form={form} onSubmit={onSubmit}>
                    <CheckerForm />
                    <button type="submit" className="btn btn-primary">{t('adminCheckers.edit')}</button>
                </MasterForm>
            </Card>
        </>
    );
};
