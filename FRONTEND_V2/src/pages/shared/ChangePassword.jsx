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

export const ChangePassword = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const form = useForm()

    const onSubmit = (data) => {
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        };

        setLoading(true)
        axios.post(`/api/users/change-password`, data, conf)
            .then(() => navigate(`/profile`))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Профиль"/>
            </BreadcrumbsRoot>


            <Card>
                <h2>Смена пароля</h2>
                {
                    error &&
                    <div className="alert alert-danger" role="alert">
                        Неправильный текущий пароль
                    </div>
                }

                <MasterForm form={form} onSubmit={onSubmit}>
                    <InputFormElement
                        name={"currentPassword"}
                        displayName="Текущий пароль"
                        args={{required: "Текущий пароль обязательный"}}
                    />
                    <InputFormElement
                        name={"newPassword"}
                        displayName="Новый пароль"
                        args={{required: "Новый пароль обязательный"}}
                    />
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary" disabled={loading}>Сменить</button>
                        <button className="btn btn-danger" role="button" onClick={() => navigate("/profile")}>Отмена</button>
                    </div>
                </MasterForm>
            </Card>
        </>
    );
};
