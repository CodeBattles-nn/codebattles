import React, {useEffect, useState} from 'react';
import getApiAddress from "../../utils/api";
import {useNavigate} from "react-router-dom";
import apiAxios from "../../apiAxios";
import If from "../../components/If";
import PageTitle from "../../components/PageTitle";
import {useAppContext} from "../../hooks/useAppContext";

const LoginPage = () => {
    const [id, setId] = useState(0);
    const [login, setLogin] = useState();
    const [passsword, setPasssword] = useState();

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const {setAuthed} = useAppContext();

    useEffect(() => {
        apiAxios.get(getApiAddress() + "/api/problems").then(
            (r) => {
                console.log(r.data)
            }
        )
    }, []);

    const onSend = async () => {
        setIsLoading(true)

        await apiAxios.post(getApiAddress() + '/api/login',
            {id: id, login: login, password: passsword}).then(
            () => {
                setErrorMsg("Успешный вход")
                setAuthed(true)
                navigate("/problems")
            })
            .catch(() => setErrorMsg("Неверные данные"))
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="container">
            <PageTitle title="CodeBattles"/>
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
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">ID соревнования</label>
                            <input className="form-control" name="id" aria-describedby="emailHelp"
                                   placeholder="Введите id" onChange={
                                (e) => setId(e.target.value)
                            }/>
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