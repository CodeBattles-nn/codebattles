import {useEffect, useState} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../utils/consts.js";

const LoginPage = () => {

    let navigate = useNavigate();
    const {register, handleSubmit} = useForm()

    const [hasErrorInData, setHasErrorInData] = useState(false);

    const onSubmit = (data) => {
        // console.log(data)
        axios.post('/api/auth/login', data)
            .then((req) => localStorage.setItem(constants.LOCALSTORAGE_JWT, req.data.token))
            .then((dta) => console.log(dta))
            .then(() => localStorage.setItem(constants.LOCALSTORAGE_AUTH_KEY, "true"))
            .then(() => navigate("/champs"))
            .catch(() => setHasErrorInData(true))
    }

    useEffect(() => {
        if (localStorage.getItem(constants.LOCALSTORAGE_AUTH_KEY) === "true") navigate("/champs")
    }, []);

    return (
        <div style={{minHeight: "80dvh"}}>
            <Card className="p-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="mb-4">Войти в соревнование</h3>
                    {
                        hasErrorInData && (<p className="text-danger">Неправильные данные</p>)
                    }
                    {/*<div className="mb-3">*/}
                    {/*    <label htmlFor="exampleInputEmail1" className="form-label">ID соревнования</label>*/}
                    {/*    <input className="form-control" id="exampleInputEmail1" {...register("id")}*/}
                    {/*           aria-describedby="emailHelp"/>*/}
                    {/*</div>*/}
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Логин</label>
                        <input className="form-control" id="exampleInputEmail1" {...register("username")}
                               aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                        <input type="password" className="form-control"
                               id="exampleInputPassword1" {...register("password")}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Войти</button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
