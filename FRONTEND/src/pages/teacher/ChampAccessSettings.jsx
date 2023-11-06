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
                <div className="jumbotron theme-bg-light  p-3">
                    <h4>Соревнование {"{name}"} | Настройки доступа</h4>

                    <hr/>
                    <br/>

                    <h4>Редакторы</h4>

                    <div className="table-responsive mt-4">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">ID редактора</th>
                                <th scope="col">ФИО</th>
                                <th scope="col">Действие</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                champs.map((champ) => {
                                    return (
                                        <tr key={champ}>
                                            <th className="col-2" scope="row">{champ.letter}</th>
                                            <th className="col" scope="row">{champ.id}</th>
                                            <th className="col-1" scope="row">
                                                <Link to="">Удалить</Link>
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
                                    ID человека
                                    <input type="number" className="form-control theme-bg-light"/>
                                </label>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-success">Добавить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ChampsPage;