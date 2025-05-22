import {useEffect, useState} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../utils/consts.js";
import {MasterForm} from "../../components/forms/MasterForm.jsx";
import {InputFormElement} from "../../components/forms/InputFormElement.jsx";

const LoginPage = () => {
    const navigate = useNavigate();

    const form = useForm();

    const {
        formState: {isSubmitting}
    } = form

    const [apiError, setApiError] = useState("");

    const onSubmit = async (data) => {
        setApiError(""); // сбрасываем ошибку перед новым запросом
        try {
            const response = await axios.post('/api/auth/login', data);
            const {token} = response.data;
            localStorage.setItem(constants.LOCALSTORAGE_JWT, token);
            localStorage.setItem(constants.LOCALSTORAGE_AUTH_KEY, "true");
            navigate("/champs");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setApiError("Неправильный логин или пароль.");
            } else {
                setApiError("Произошла ошибка. Попробуйте снова позже.");
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem(constants.LOCALSTORAGE_AUTH_KEY) === "true") {
            navigate("/champs");
        }
    }, [navigate]);

    return (
        <div style={{minHeight: "80dvh"}}>

            <Card className="p-5">
                <h3 className="mb-4">Войти в соревнование</h3>
                {apiError &&
                    <div className="alert alert-danger" role="alert">
                        {apiError}
                    </div>
                }
                <MasterForm form={form} onSubmit={onSubmit}>
                    <InputFormElement
                        displayName="Логин"
                        name='username'
                        args={{required: "Введите логин"}}
                    />
                    <InputFormElement
                        displayName="Пароль"
                        name='password'
                        args={{required: "Введите пароль"}}
                    />

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? "Входим..." : "Войти"}
                    </button>
                </MasterForm>
            </Card>
        </div>
    );
};

export default LoginPage;
