import {useState} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../utils/consts.js";
import {MasterForm} from "../../components/forms/MasterForm.jsx";
import {InputFormElement} from "../../components/forms/InputFormElement.jsx";
import {useTranslation} from "react-i18next";
import {useProfileStore} from "../../components/store/useProfileStore.js";

const RegisterPage = () => {
    const navigate = useNavigate();
    const updateFromServer = useProfileStore((state) => state.updateFromServer)
    const form = useForm();

    const {
        formState: {isSubmitting}
    } = form

    const [apiError, setApiError] = useState("");

    const onSubmit = async (data) => {
        setApiError(""); // сбрасываем ошибку перед новым запросом
        try {
            const response = await axios.post('/api/auth/register', data);
            const {token} = response.data;
            localStorage.setItem(constants.LOCALSTORAGE_JWT, token);
            localStorage.setItem(constants.LOCALSTORAGE_AUTH_KEY, "true");
            updateFromServer()
            navigate("/champs");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setApiError(t("Wrong login or password"));
            }if (error.response && error.response.status === 409) {
                setApiError(t("Username is already taken"));
            } else {
                setApiError(t( "Error. Try later"));
            }
        }
    };

    const {t} = useTranslation()

    const password = form.watch('password', '');

    return (
        <div style={{minHeight: "80dvh"}} className="d-flex justify-content-center align-content-center flex-wrap">

           <div className='container'>
              <div className="row">
                  <div className="col-1 col-lg-2"/>
                  <div className="col">
                      <Card className="p-5">
                          <h3 className="mb-4">{t("Register")}</h3>
                          {apiError &&
                              <div className="alert alert-danger" role="alert">
                                  {apiError}
                              </div>
                          }
                          <MasterForm form={form} onSubmit={onSubmit}>
                              <InputFormElement
                                  displayName={t("Login")}
                                  name='username'
                                  args={{required: t( "Enter login")}}
                              />

                              <InputFormElement
                                  displayName={t("Name")}
                                  name='name'
                                  type="name"
                                  args={{required: t("Enter Name")}}
                              />

                              <InputFormElement
                                  displayName={t("Password")}
                                  name='password'
                                  type="password"
                                  args={{
                                      required: t( "Enter password"),
                                      minLength: {
                                          value: 6,
                                          message: t("Min6"),
                                      },
                                  }}
                              />

                              <InputFormElement
                                  displayName={t("Repeat Password")}
                                  name='newpassword'
                                  type="newpassword"
                                  args={{
                                      required: t("Repeat Password"),
                                      validate: (value) =>
                                          value === password || t("Passwords doesnt equals"),
                                  }}
                              />



                              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                  {isSubmitting ? t( "Register..."): t("Register")}
                              </button>
                          </MasterForm>
                          <div className="mt-2">
                              <Link  to="/">{t("Login")}</Link>
                          </div>
                      </Card>
                  </div>
                  <div className="col-1 col-lg-2"/>
              </div>
           </div>
        </div>
    );
};

export default RegisterPage;
