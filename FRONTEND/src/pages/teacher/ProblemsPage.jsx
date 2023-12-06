import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";
import PageTitle from "../../components/PageTitle";

const ProblemsPage = () => {

    const [problems, setProblems] = useState([]);
    const [css, setCss] = useState({});


    useEffect(() => {
        return () => {
            setProblems([
                {
                    "description": "Петя и Вася играют в футбол. Петя забил А голов, а Вася - В голов.Ваша задача посчитать, скольковсего голов было забито в данной игре :)",
                    "id": 1,
                    "name": "Футбол"
                },
                {
                    "description": "Маша и Даша спорят, кто больше разбирается в математике. При этом, Даша не знает почти ничего. Помогите ей выиграть спор. Ваша задача написать программу, определяющую четность числа",
                    "id": 2,
                    "name": "Четность числа"
                }
            ])
        };
    }, []);


    // useEffect(() => {
    //     apiAxios.get(getApiAddress() + "/api/problems").then(
    //         (r) => {
    //             console.log(r.data)
    //             setProblems(r.data.problems)
    //             setCss(r.data.colors)
    //         }
    //     )
    // }, []);


    return (<><PageTitle title="Задачи"/>
        <div className="row">
            <div className="col-12">
                <div className="jumbotron theme-bg-light  p-3">
                    <h4>Архив задач</h4>
                    <p></p>
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
                                problems.map( (problem) => {

                                    // let css_class = css[letter];
                                    //
                                    // if (css_class !== ""){
                                    //     css_class += " theme-text-dark"
                                    // }

                                    return (
                                        <tr key={1} >
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