import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../../utils/consts.js";
import {useNavigate} from "react-router-dom";
import Card from "../../../components/bootstrap/Card.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";
import {CheckerForm} from "../../../components/form_impl/CheckerForm.jsx";
import { useTranslation } from 'react-i18next';

export const AdminCheckersCreatePage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const form = useForm()

    const onSubmit = (data) => {
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        };

        axios.post("/api/checkers", data, conf)
            .then(() => navigate("/admin/checkers")) // Измените путь назначения при необходимости
            .catch((error) => console.error("Failed to create checker:", error));
    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminCheckers.checkers')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <MasterForm form={form} onSubmit={onSubmit}>
                    <CheckerForm/>
                    <button type="submit" className="btn btn-primary">{t('adminCheckers.create')}</button>
                </MasterForm>
            </Card>
        </>
    );
};
