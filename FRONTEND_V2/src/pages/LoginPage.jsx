import React from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link, useNavigate} from "react-router-dom";

const LoginPage = () => {

    let navigate = useNavigate();

    return (
        <div style={{minHeight: "80dvh"}}>
            <Card className="p-5">
                <form>
                    <h3 className="mb-4">Войти в соревнование</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">ID соревнования</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Логин</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={ () => navigate("/problems")}>Войти</button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
