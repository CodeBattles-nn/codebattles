import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";
import {toast} from "react-toastify";
import {nonImplemeneted} from "../../utils/toast";

const ChampsPage = () => {

    const {id, user_id} = useParams();


    useEffect(() => {
        apiAxios.get(getApiAddress() + `/api/teacher/champs/${id}`).then(
            (data) => {
                // setErrorMsg("Успешный вход")
                // navigate("/teacher/champs")
                setChamps(data.data)
                console.log(data)
            })
        // .catch(() => setErrorMsg("Неверные данные"))
        // .finally(() => setIsLoading(false));
    }, []);


    const [champs, setChamps] = useState({});


    return (
        <div className="row">
            <div className="col-12">
                <div className="jumbotron theme-bg-light  p-3">
                    <h4>Соревнование <b>{champs.name} </b>| Настройки</h4>
                    <div>
                        <button className="btn btn-outline-danger">Удалить</button>
                    </div>
                    <br/>
                    <div>
                        <Link className="mr-5" to={`users`}>Управление пользователями</Link>
                        <Link className="mr-5" to={"stats"}>Рейтинг</Link>
                        <Link to={"access"}>Управление доступом</Link>
                    </div>


                    <hr/>
                    <br/>

                    <h4>Задачи</h4>
                    <Link to="rikroll">Посмотреть все задачи</Link>

                    <div className="table-responsive mt-4">
                        <table className="table table-striped table-bordered ">
                            <thead>
                            <tr>
                                <th scope="col">Задача</th>
                                <th scope="col">id</th>
                                <th scope="col">Название</th>
                                <th scope="col">Действие</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                champs?.tasks?.map((champ) => {
                                    return (
                                        <tr key={champ}>
                                            <th className="col-1" scope="row">{champ.letter}</th>
                                            <th className="col-1" scope="row">{champ.id}</th>
                                            <td className="col">{champ.name}</td>
                                            <th className="col-1" scope="row">
                                                <Link to="" onClick={nonImplemeneted}>Просмотр
                                                </Link>
                                            </th>

                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <form style={{border: "1px solid #dfe0e1"}} className="p-3">
                            <div className="form-group">
                                <label className="w-100">
                                    Задача
                                    <select
                                        id="__problem-letter"
                                        name="letter"
                                        className="mb-2 form-control"
                                    >
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                        <option>E</option>
                                        <option>F</option>
                                        <option>G</option>
                                        <option>H</option>
                                    </select>
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="w-100">
                                    ID задачи
                                    <input type="number" className="form-control"/>
                                </label>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-warning" onClick={nonImplemeneted}>
                                    Установить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ChampsPage;