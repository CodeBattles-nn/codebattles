import Card from "../../../../components/bootstrap/Card.jsx";
import {useNavigate, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import constants from "../../../../utils/consts.js";
import axios from "axios";
import {MasterForm} from "../../../../components/forms/MasterForm.jsx";
import {InputFormElement} from "../../../../components/forms/InputFormElement.jsx";
import {CompetitionProblemsFormEdit} from "../../../../components/form_impl/CompetitionProblemsFormEdit.jsx";
import { useTranslation } from 'react-i18next';
import {axiosInstance} from "../../../../utils/settings.js";

export const AdminChampsDetailProblemsLinkPage = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const {compId} = useParams()

    const form = useForm();

    const {register,} = form

    const onSubmit = (data) => {
        console.log(data);
        axiosInstance.post('/api/competitionsProblems', data)
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
                    <input type="number" {...register("competition_id", {value: compId})} hidden />
                    <CompetitionProblemsFormEdit />
                    <InputFormElement name={"problem_id"} displayName={t('adminProblems.id')} args={{required: t('adminProblems.idRequired')}} />
                    <button type="submit" className="btn btn-primary">{t('adminChamps.add')}</button>
                </MasterForm>
            </Card>
        </>
    );
};
