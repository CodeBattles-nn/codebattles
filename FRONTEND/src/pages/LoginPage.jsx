import React, {useEffect, useState} from 'react';
import axios from "axios";
import getApiAddress from "../utils/api";
import {useNavigate} from "react-router-dom";

const LoginPage = (props) => {
    const [id, setId] = useState(0);
    const [login, setLogin] = useState();
    const [passsword, setPasssword] = useState();

    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const onSend = async () => {
        await axios.post(getApiAddress() + '/api/login',
            {id: id, login: login, password: passsword}).then(
            (r) => {
                setErrorMsg("Успешный вход")
                navigate("/problems")
            }
        ).catch(r => setErrorMsg("Неверные данные"));
    };

    return (
        <div className="container" style={{"background-color": "#ffe0b2"}}>
            <div className="row" style={{"margin-top": "25%"}}>
                <div className="col-2"></div>
                <div className="col-8 bg-light p-5" style={{"border-radius": "15px"}}>
                    <h4 className="text-danger">{errorMsg}</h4>
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


                        <button type="button" onClick={() => onSend()} className="btn btn-primary text-white">Войти
                        </button>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
};

export default LoginPage;