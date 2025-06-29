import Card from "../../../../components/bootstrap/Card.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import constants from "../../../../utils/consts.js";
import axios from "axios";
import useCachedGetAPI from "../../../../hooks/useGetAPI.js";
import {MasterForm} from "../../../../components/forms/MasterForm.jsx";
import {CompetitionProblemsFormEdit} from "../../../../components/form_impl/CompetitionProblemsFormEdit.jsx";
import { useTranslation } from 'react-i18next';
import {axiosInstance} from "../../../../utils/settings.js";

export const AdminChampsDetailProblemsEditPage = () => {
    const {probcompId} = useParams()
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [competitionsProblem, updateData] = useCachedGetAPI(`/api/competitionsProblems/${probcompId}`, () => {
    }, []);

    const form = useForm();

    useEffect(() => {
        updateData()
    }, []);

    useEffect(() => {
        form.reset({
            priority: competitionsProblem.priority,
            slug: competitionsProblem.slug
        })
    }, [competitionsProblem]);

    const onSubmit = (data) => {
        console.debug(data);

        axiosInstance.patch(`/api/competitionsProblems/${probcompId}`, data)
            .then(() => navigate("/admin/champs"))


    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminChamps.createCompetition')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <MasterForm form={form} onSubmit={onSubmit}>
                    <CompetitionProblemsFormEdit/>
                    <button type="submit" className="btn btn-primary">
                        {t('adminChamps.save')}
                    </button>
                </MasterForm>
            </Card>
        </>
    );
};
