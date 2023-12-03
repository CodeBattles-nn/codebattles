import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import If from "../../components/If";
import {changeTheme} from "../../theme.dark";


const LoginPage = () => {
    const [id, setId] = useState(0);
    const [login, setLogin] = useState();
    const [passsword, setPasssword] = useState();

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    const onSend = async () => {
        await console.log("OMG")
        // setIsLoading(true)
        //
        // await apiAxios.post(getApiAddress() + '/api/login',
        //     {id: id, login: login, password: passsword}).then(
        //     () => {
        //         setErrorMsg("Успешный вход")
        //         navigate("/problems")
        //     })
        //     .catch(() => setErrorMsg("Неверные данные"))
        //     .finally(() => setIsLoading(false));

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
                            <h3 className="text-center text-info">
                                Интерфейс Администратора
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
                        </div>


                        <button
                            type="button"
                            onClick={() => onSend()}
                            className="btn btn-primary text-white"
                            disabled={isLoading}
                        >
                            Войти
                        </button>

                        <p/>

                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => changeTheme(true)}
                        >Dark
                        </button>

                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => changeTheme(false)}
                        >Light
                        </button>

                        <span className="material-symbols-outlined">
                        dark_mode
                        </span>
                        <span className="material-symbols-outlined">


                        light_mode
                        </span>

                        <span className="material-symbols-outlined">
routine
</span>

                    </form>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;