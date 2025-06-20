import Card from "../../../components/bootstrap/Card.jsx";
import {useNavigate} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../../utils/consts.js";
import {CompetitionFormElements} from "../../../components/form_impl/CompetitionForm.jsx";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";

export const AdminChampsCreate = () => {

    const form = useForm({
        defaultValues: {
            startedAt: new Date().toISOString().slice(0, 16),
            endedAt: new Date().toISOString().slice(0, 16)
        }
    });


    const navigate = useNavigate();

    const onSubmit = (data) => {
        // Convert date strings to ISO format
        const formattedData = {
            ...data,
            startedAt: new Date(data.startedAt).toISOString(),
            endedAt: new Date(data.endedAt).toISOString()
        };

        console.log(formattedData);

        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        axios.post('/api/competitions', data, conf)
            .then(() => navigate("/admin/champs"))
    };


    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Создание соревнования"/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <MasterForm form={form} onSubmit={onSubmit}>
                    <CompetitionFormElements/>
                    <button type="submit" className="btn btn-success ">Добавить</button>
                </MasterForm>
            </Card>
        </>
    );
};
