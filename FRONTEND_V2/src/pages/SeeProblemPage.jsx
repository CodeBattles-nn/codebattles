import React, {useEffect} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import ProblemExample from "../components/ProblemExample.jsx";
import CodeEditor from "../components/wraps/CodeEditor.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../utils/consts.js";

const SeeProblemPage = () => {

    const {letter} = useParams();
    const navigate = useNavigate();
    const [data, update] = useCachedGetAPI(`http://localhost:2500/api/problem/${letter}`);

    let codeEditorText = ""

    useEffect(() => {
        update()
    }, []);

    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        data.src = document.getElementsByClassName("ace_content")[0].innerText
        console.log(data)
        // alert(JSON.stringify(data))

        axios.post('http://localhost:2500/api/send', data)
            .then(() => window.location.href = "/sends")

    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <h2>Задача {letter}</h2>
                        <h3>{data.name}</h3>
                    </Card>
                </div>
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <h3>Ограничения</h3>
                        <p>
                            Время выполнения: 1000мс
                            <br/>
                            Память: 256мб
                        </p>
                    </Card>
                </div>


            </div>
            <div className="row">
                <div className="col">
                    <Card>
                        <div>
                            <h4>Задача</h4>
                            <p>{data.description}</p>

                            <h4 className="mt-5">Входные данные</h4>
                            <p>{data.in_data}</p>

                            <h4 className="mt-5">Выходные данные</h4>
                            <p>{data.out_data}</p>
                        </div>
                    </Card>
                </div>
            </div>
            {
                (data?.examples === undefined || data?.examples?.length > 0) &&
                <div className="row">
                    <div className="col">
                        <Card>
                            <h3>Примеры</h3>
                            {
                                data?.examples?.map(example => {
                                    return <ProblemExample in_data={example[0]} out_data={example[1]}/>
                                })
                            }
                        </Card>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col">
                    <Card>
                        <h4 className="mb-3">Отправить решение</h4>
                        <p>Вставьте код здесь</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input hidden value={letter} {...register("problem")}/>
                            <select className="form-select" {...register("cars")}>
                                {

                                    Object.keys(data.langs || {}).map(lang => {
                                        return <option key={"lang" + lang} selected value={data.langs[lang]}>{lang}</option>
                                    })
                                }
                            </select>
                            <CodeEditor className="my-5 rounded-2"/>

                            <button className="btn btn-success">Отправить</button>
                        </form>
                    </Card>
                </div>
            </div>

        </div>
    );
};

export default SeeProblemPage;