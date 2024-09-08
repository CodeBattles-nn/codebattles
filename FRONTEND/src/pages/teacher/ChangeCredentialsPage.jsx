import {useForm} from "react-hook-form";
import apiAxios from "../../apiAxios";
import getApiAddress from "../../utils/api";
import {useState} from "react";

const ChangeCredentialsPage = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm()

    const [apiResult, setApiResult] = useState({text: "", cssclass: "", display: false})

    const onSubmit = (data) => {
        // console.log(data)

        const newResult = {...apiResult}

        apiAxios.post(getApiAddress() + '/api/teacher/changecred',
            data
        )
        .then(
            () => {
                newResult.text = "Успешная смена пароля"
                newResult.cssclass = "text-success"
            })
        .catch(() => {
            newResult.text = "Неверные данные"
            newResult.cssclass = "text-danger"
        })
        .finally(() => {
            newResult.display = true;
            setApiResult(newResult)
        });


    }

    return (<div className="row">
            <div className="col-12">
                <div className="jumbotron theme-bg-light  p-3">
                    <h4>Смена данных</h4>
                    <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Текущий логин</label>
                            <input className="form-control" {...register("login", {required: true})}></input>
                            {errors.login && <p className="text-danger">Это поле обязательно</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Текущий пароль</label>
                            <input className="form-control" name="users" id="exampleFormControlTextarea1"
                                   type="password"
                                   {...register("current_password", {required: true})} ></input>
                            {errors.current_password && <p className="text-danger">Это поле обязательно</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Новый пароль</label>
                            <input className="form-control" name="users" id="exampleFormControlTextarea1"
                                   type="password"
                                   {...register("password", {required: true})} ></input>
                            {errors.password && <p className="text-danger">Это поле обязательно</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Повтор пароля</label>
                            <input className="form-control" name="users" id="exampleFormControlTextarea1"
                                   type="password"
                                   {...register("confirm_password", {
                                       required: true,
                                       validate: (val) => {
                                           if (watch('password') != val) {
                                               return "Your passwords do no match";
                                           }
                                       }
                                   })} ></input>
                            {errors.confirm_password && <p className="text-danger">Пароли не совпадают</p>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-danger">Отправить
                            </button>
                        </div>

                        {
                            apiResult.display &&

                            <p className={apiResult.cssclass}>
                                {apiResult.text}
                            </p>
                        }

                    </form>
                </div>
            </div>
        </div>

    )
};

export default ChangeCredentialsPage;