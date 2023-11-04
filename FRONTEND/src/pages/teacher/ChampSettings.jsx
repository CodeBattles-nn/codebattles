import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";

const ChampsPage = () => {

    const defaultState = [
        {
            id: 2,
            letter: "A",
            name: "hi"
        },
        {
            letter: "B",
            id: 1,
            name: "hiler"
        }
    ]

    const [champs, setChamps] = useState(defaultState);


    return (
        <div className="row">
            <div className="col-12">
                <div className="jumbotron bg-light table-bordered table-hover p-3">
                    <h4>Соревнование {"{name}"} | Настройки</h4>
                    <div>
                        <button className="btn btn-outline-danger">Удалить</button>
                    </div>
                    <br/>
                    <div>
                        <Link className="mr-5" to={"/aboba"}>Управление пользователями</Link>
                        <Link to={"/aboba"}>Управление доступом</Link>
                    </div>


                    <hr/>
                    <br/>

                    <h4>Задачи</h4>
                    <Link to="rikroll">Посмотреть все задачи</Link>

                    <div className="table-responsive mt-4">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Задача</th>
                                <th scope="col">id</th>
                                <th scope="col">Название</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                champs.map((champ) => {
                                    return (
                                        <tr key={champ}>
                                            <th className="col-1" scope="row">{champ.letter}</th>
                                            <th className="col-1" scope="row">{champ.id}</th>
                                            <td className="col">{champ.name}</td>
                                            <th className="col-1" scope="row">
                                                <Link to="">Просмотр</Link>
                                            </th>

                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <form style={{border: "1px solid #dfe0e1"}} className="p-3">
                            <div className="form-group">
                                <label>Задача</label>
                                <select
                                    id="cars"
                                    name="cars"
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
                            </div>
                            <div className="form-group">
                                <label>ID задачи</label>
                                <input type="number" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-warning">
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