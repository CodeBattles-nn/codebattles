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

export const AdminChampsDetailProblemsLinkPage = () => {

    const navigate = useNavigate();

    const {compId} = useParams()

    const form = useForm();

    const {register,} = form

    const onSubmit = (data) => {
        console.log(data);

        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        axios.post('/api/competitionsProblems', data, conf)
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
                    <input type="number" {...register("competition_id", {value: compId})} hidden />
                    <CompetitionProblemsFormEdit />
                    <InputFormElement name={"problem_id"} displayName={"ID задачи"} args={{required: "ID задачи обязателен"}} />
                    <button type="submit" className="btn btn-primary">Добавить</button>
                </MasterForm>
            </Card>
        </>
    );
};
