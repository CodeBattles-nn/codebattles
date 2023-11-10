import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import getApiAddress from "../../../utils/api";
import {getCookie} from "../../../utils/cookie";

import "./stats.css"
import apiAxios from "../../../apiAxios";
import PageTitle from "../../../components/PageTitle";

const StatsPage = () => {
    const [data, setData] = useState({cols: "", users: []});

    useEffect(() => {
        apiAxios.get(getApiAddress() + "/api/stats").then(
            (r) => {
                console.log(r.data)
                setData(r.data)
            }
        )
    }, []);

    const myUserId = getCookie("user_id");


    return <div className="jumbotron theme-bg-light  p-3">
        <PageTitle title="Рейтинг"/>
        <h4>Рейтинг</h4>
        <p></p>
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Всего</th>

                    {
                        [...data.cols].map((col) => {
                            return (
                                <th scope="col"><Link to={`/problem/${col}`}>{col}</Link></th>
                            )
                        })
                    }
                    <th scope="col">Посл. Посылка</th>

                </tr>
                </thead>
                <tbody>

                {
                    [...data.users].map((user) => {
                        let tableClassName = ""
                        if (user.user_id == myUserId) {
                            tableClassName = "table-primary theme-text-dark"
                        }

                        return (
                            <tr className={tableClassName}>
                                <th scope="row">{user.position}</th>
                                <td>{user.name}</td>
                                <td>{user.score}</td>
                                {
                                    [...user.problems_score].map((problem_score) => {
                                        return (
                                            <td className="p-1">
                                                <div style={{"text-align": "center"}}
                                                     className="text-center">
                                                    <p className="int p-0 m-0">{problem_score}</p>
                                                    <p style={{"font-size": "small"}}
                                                       className="p-0"></p>
                                                </div>
                                            </td>
                                        )
                                    })
                                }
                                <td>{user.last_send}</td>

                            </tr>
                        )
                    })
                }


                </tbody>
            </table>
        </div>
    </div>


};

export default StatsPage;