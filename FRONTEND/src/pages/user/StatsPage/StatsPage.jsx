import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import getApiAddress from "../../../utils/api";
import {getCookie} from "../../../utils/cookie";

import "./stats.css"
import apiAxios from "../../../apiAxios";

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


    return <main style={{"background-color": "#ffe0b2", "min-height": '94vh'}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 col-lg-12 content-container">

                    <div className="container py-4">
                        <div className="jumbotron bg-light table-bordered table-hover p-3">
                            <h4>Положение</h4>
                            <p></p>
                            <div className="table-responsive">
                                <table className="table table-striped">
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

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        [...data.users].map((user) => {
                                            let tableClassName = ""
                                            if (user.user_id == myUserId) {
                                                tableClassName = "table-primary"
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

};

export default StatsPage;