import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";

const ChampsPage = () => {

    const defaultState = [
        {
            id: 1,
            name: "hi"
        },
        {
            id: 13,
            name: "hiler"
        }
    ]

    const [champs, setChamps] = useState(defaultState);


    return (
        <div className="row">
            <div className="col-12">
                <div className="jumbotron bg-light table-bordered table-hover p-3">
                    <h4>Соревнования</h4>
                    <p></p>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
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
                                            <th className="col-1" scope="row">{champ.id}</th>
                                            <td className="col-9">{champ.name}</td>
                                            <td className="col-2">
                                                <Link to={`/teacher/champs/${champ.id}`} className="mr-3">Управление</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ChampsPage;