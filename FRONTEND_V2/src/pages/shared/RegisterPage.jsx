import {useEffect, useState} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../utils/consts.js";
import {MasterForm} from "../../components/forms/MasterForm.jsx";
import {InputFormElement} from "../../components/forms/InputFormElement.jsx";

export const RegisterPage = () => {
    const navigate = useNavigate();

    const form = useForm();

    const {
        formState: {isSubmitting}
    } = form

    const [apiError, setApiError] = useState("");

    const onSubmit = async (data) => {
        setApiError("");
        try {
            const response = await axios.post('/api/auth/register', data);
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
        <div style={{minHeight: "80dvh"}} className="d-flex justify-content-center align-content-center flex-wrap">

           <div className='container'>
              <div className="row">
                  <div className="col-1 col-lg-2"/>
                  <div className="col">
                      <Card className="p-5">
                          <h3 className="mb-4">Регистрация</h3>
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
                                  displayName="Имя"
                                  name='password'
                                  type="password"
                                  args={{required: "Введите имя"}}
                              />
                              <InputFormElement
                                  displayName="Пароль"
                                  name='password'
                                  type="password"
                                  args={{required: "Введите пароль"}}
                              />
                              <InputFormElement
                                  displayName="Повтор пароль"
                                  name='password'
                                  type="password"
                                  args={{required: "Введите повтор пароля"}}
                              />

                              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                  {isSubmitting ? "Входим..." : "Войти"}
                              </button>
                          </MasterForm>
                      </Card>
                  </div>
                  <div className="col-1 col-lg-2"/>
              </div>
           </div>
        </div>
    );
};
