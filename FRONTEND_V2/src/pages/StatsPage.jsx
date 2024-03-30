import React, {useEffect} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import {getCookie} from "../utils/cookies.js";

const StatsPage = () => {

    const [data, update] = useCachedGetAPI("http://localhost:2500/api/stats");

    useEffect(() => {
        update();
    }, []);

    const mine_user_id = getCookie("user_id")
    // console.log(mine_user_id)

    return (
        <div>
            <Card>
                <h2 className="mb-3">Рейтинг</h2>
                <div className="border rounded-2 p-1">
                    <table className="table table-striped table-bordered">
                        <thead>

                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Пользователь</th>
                            <th scope="col">Всего</th>
                            {
                                data?.cols?.split('').map(letter => {
                                    return <th scope="col"><Link to={`/problems/${letter}`}>{letter}</Link></th>
                                })
                            }
                            <th scope="col">Посл. Посылка</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data?.users?.map(user => {
                                return (
                                    <tr className={user.user_id == mine_user_id ? ( "table-secondary") : ('')} >
                                        <th scope="row">{user.position}</th>
                                        <td>{user.name}</td>
                                        <td>{user.score}</td>
                                        {
                                            user.problems_score.map(problem_score => {
                                                return (
                                                    <td className="p-1">
                                                        <div className="text-center">
                                                            <p className="text-success p-0 m-0">
                                                                {problem_score}
                                                            </p>
                                                            <p className="p-0 m-0" style={{"fontSize": "small"}}>
                                                                {/*-1*/}
                                                            </p>
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

            </Card>
        </div>
    );
};

export default StatsPage;
