import React, {useEffect, useState} from 'react';
import getApiAddress from "../../utils/api";
import {useNavigate} from "react-router-dom";
import apiAxios from "../../apiAxios";
import If from "../../components/If";

const LoginPage = () => {
    const [login, setLogin] = useState();
    const [passsword, setPasssword] = useState();
    const [captchaUserInput, setCaptchaUserInput] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [captcha, setCaptcha] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        apiAxios.get(getApiAddress() + '/api/teacher/auth')
            .then((res) => {
                setCaptcha(res.data)
            })
            .catch(() => setErrorMsg("Неверные данные"))
            .finally(() => setIsLoading(false));

    }, [errorMsg]);

    const onSend = async () => {
        setIsLoading(true)

        await apiAxios.post(getApiAddress() + '/api/teacher/auth',
            {
                login: login || "",
                password: passsword || "",
                base64image: captcha.base64string,
                captchaValidate: captcha.validate,
                captchaUserInput: captchaUserInput.trim(),
            }
        )
            .then(
                () => {
                    setErrorMsg("Успешный вход")
                    navigate("/teacher/champs")
                })
            .catch(() => setErrorMsg("Неверные данные"))
            .finally(() => setIsLoading(false));


    };

    return (
        <div className="container">
            <div className="row" style={{"margin-top": "25%", justifyContent: "center"}}>
                <div className="col-md-8 col-sm-11 theme-bg-light p-5" style={{"border-radius": "15px"}}>
                    <h4 className="text-danger">
                        <If
                            condition={isLoading}
                            is_true={<p>Загрузка....</p>}
                            is_false={<p>{errorMsg}</p>}
                        />
                    </h4>
                    <form>
                        <div>
                            <h3 className="text-center text-primary">
                                Интерфейс Учителя
                            </h3>
                            <br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Логин</label>
                            <input className="form-control" name="login" aria-describedby="emailHelp"
                                   placeholder="Введите логин" onChange={
                                (e) => setLogin(e.target.value)
                            }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Пароль</label>
                            <input type="password" className="form-control" name="password"
                                   placeholder="Введите пароль" onChange={
                                (e) => setPasssword(e.target.value)
                            }/>
                            <img className="img border border-primary rounded mt-3 mb-2"
                                 src={`data:image/png;base64, ${captcha.base64string}`}/>
                            <input className="form-control" name="captcha"
                                   placeholder="Введите капчу" onChange={
                                (e) => setCaptchaUserInput(e.target.value)
                            }/>
                        </div>


                        <button
                            type="button"
                            onClick={() => onSend()}
                            className="btn btn-primary text-white"
                            disabled={isLoading}
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;