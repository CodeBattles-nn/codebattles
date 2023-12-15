import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";
import PageTitle from "../../components/PageTitle";

const ProblemsPage = () => {

    const [problems, setProblems] = useState([]);


    useEffect(() => {
        apiAxios.get(getApiAddress() + "/api/teacher/problems").then(
            (r) => {
                console.log(r.data)
                setProblems(r.data)
            }
        )
    }, []);


    return (<><PageTitle title="Задачи"/>
            <div className="row">
                <div className="col-12">
                    <div className="jumbotron theme-bg-light  p-3">
                        <h4>Архив задач</h4>
                        <p></p>
                        <Link to="/teacher/problems/add" className="btn btn-success mb-3">Добавить задачу</Link>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Название</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    problems.map((problem) => {
                                        return (
                                            <tr key={1}>
                                                <th className="{{problem[2]}}" scope="row">{problem.id}</th>
                                                <td className="{{problem[2]}}"><Link
                                                    to={`/teacher/problems/${problem.id}`}>{problem.name}</Link></td>
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
        </>
    )
};

export default ProblemsPage;