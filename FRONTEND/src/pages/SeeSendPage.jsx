import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import getApiAddress from "../utils/api";
import {cssClassByStatus} from "../utils/colors";

const SeeSendPage = (props) => {

    const [data, setData] = useState({tests:[]});

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(getApiAddress() + `/api/send/${id}`).then(
            (r) => {
                console.log(r.data)
                setData(r.data)
            }
        ).catch(() => navigate("/login"))
    }, []);


    return (
        <main style={{"background-color": "#ffe0b2", "min-height": " 94vh"}}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 col-lg-12 content-container">

                        <div className="container py-4">
                            <div className="jumbotron bg-light table-bordered table-hover p-3">
                                <h3>Анализ посылки</h3>
                                <p><b>Язык:</b> {data.lang}</p>
                                <p><b>Исходный код:</b></p>
                                <pre><code data-language="{{lang}}">{data.program}</code></pre>
                                <p><b>Тесты: </b></p>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th scope="col">№ Теста</th>
                                            <th scope="col">Время (ms)</th>
                                            <th scope="col">Вердикт</th>
                                            <th scope="col">Вывод</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            data.tests.map( test => {
                                                return (
                                                    <tr className={cssClassByStatus[test.msg]}>
                                                        <th scope="row">{test.id}</th>
                                                        <td>{test.time}</td>
                                                        <td>{test.msg}</td>
                                                        <td>
                                                            <p style={{"white-space": "pre-line"}}>{test.out}</p>
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

                </div>
            </div>

        </main>
    )
};

export default SeeSendPage;