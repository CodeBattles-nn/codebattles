import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getCookie} from "../../../utils/cookie";

import "./stats.css"
import PageTitle from "../../../components/PageTitle";
import apiAxios from "../../../apiAxios";
import getApiAddress from "../../../utils/api";

const StatsPage = () => {
    const [data, setData] = useState({cols: "", users: []});

    const {id} = useParams();


    useEffect(() => {
        apiAxios.get(getApiAddress() + `/api/teacher/champs/${id}/stats`).then(
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
        {/*<p>Для просмотра всех посылок участника кликните на его имя</p>*/}
        <p>Для просмотра посылки участника по задаче нажмите на счет за задачу участника</p>
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
                                <th scope="col">{col}</th>
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
                                <td>
                                    {/*<Link to={`/teacher/champs/${id}/users/${user.user_id}/sends`}>*/}
                                    {user.name}
                                    {/*</Link>*/}
                                </td>
                                <td>{user.score}</td>
                                {
                                    [...user.problems_score].map((problem_score, i) => {
                                        return (
                                            <td className="p-1">
                                                <div style={{"text-align": "center"}}
                                                     className="text-center">
                                                    <p className="p-0 m-0">
                                                        <Link
                                                            target="_blank"
                                                            to={`/teacher/champs/${id}/users/${user.user_id}/sends/${data.cols[i]}`}
                                                        >
                                                            {problem_score}
                                                        </Link>
                                                    </p>
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