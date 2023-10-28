import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";

const ProblemsPage = () => {

    const [problems, setProblems] = useState({});
    const [css, setCss] = useState({});


    useEffect(() => {
        apiAxios.get(getApiAddress() + "/api/problems").then(
            (r) => {
                console.log(r.data)
                setProblems(r.data.problems)
                setCss(r.data.colors)
            }
        )
    }, []);


    return (
        <div className="row">
            <div className="col-12">
                <div className="jumbotron bg-light table-bordered table-hover p-3">
                    <h4>Задачи</h4>
                    <p></p>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Название</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                Object.keys(problems).map((letter) => {
                                    return (
                                        <tr key={letter} className={css[letter]}>
                                            <th className="{{problem[2]}}" scope="row">{letter}</th>
                                            <td className="{{problem[2]}}"><Link
                                                to={`/problem/${letter}`}>{problems[letter]}</Link></td>
                                        </tr>
                                    )
                                }, problems)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ProblemsPage;