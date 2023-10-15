import React, {useEffect, useState} from 'react';

import axios from "axios";

import "./utils.css"
import "./bs-jumbotron.css"
import "./style.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import getApiAddress from "../../utils/api";
import {toast} from "react-toastify";

const SeeProblemPage = (props) => {
    const [info, setInfo] = useState({langs: {}, examples: []});

    const {letter} = useParams();

    const navigate = useNavigate();

    const [lang, setLang] = useState(1);
    const [code, setCode] = useState();



    const onSend = async () => {
        await axios.post(getApiAddress() + '/api/send',
            {src: code, cars: lang, problem: letter}).then(
            (r) => {
                navigate("/sends")
            }
        )
    };

    useEffect(() => {
        axios.get(getApiAddress() + `/api/problem/${letter}`).then(
            (r) => {
                console.log(r.data)
                setInfo(r.data)
            }
        ).catch(() => navigate("/login"))
    }, []);

    useEffect(() => {
        if (info.langs.length > 0) {
            setLang(info.langs[0])
        }
        console.log(info.langs)
    }, [info]);


    console.log(info)

    return <>
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-8 col-lg-12 content-container">

                    <div className="container py-4">


                        <div className="row align-items-md-stretch">
                            <div className="col-md-6">
                                <div className="h-60 p-3 text-white bg-dark rounded-3">
                                    <h2 style={{"color": "#6c757d;"}}>Задача {info.letter}</h2>
                                    <h3>{info.name}</h3>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="h-100 p-3 bg-light border rounded-3">
                                    <h2>Ограничения</h2>
                                    <p style={{"white-space": "pre-line"}}>
                                        Время выполнения: 1000мс
                                        Память: 256мб
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p></p>

                        <div className="p-5 mb-4 bg-light rounded-3">
                            <div className="container-fluid py-5">
                                <div className="col-md-12 fs-4">
                                    <h4>Задача</h4>
                                    <p style={{"white-space": "pre-line"}}>{info.description}</p>
                                    <h4>Входные данные</h4>
                                    <p style={{"white-space": "pre-line"}}>{info.in_data}</p>
                                    <h4>Выходные данные</h4>
                                    <p style={{"white-space": "pre-line"}}>{info.out_data}</p>
                                </div>


                            </div>
                        </div>

                        <div className="jumbotron bg-light">
                            <h2>Примеры</h2>

                            {
                                info.examples.map((data, index) => {
                                    const [input_data, output_data] = data

                                    const example_id = `example_${index}`

                                    const copyFunction = () => {
                                        const copyText = document.getElementById(example_id);

                                        toast.success('Успешно скопировано');

                                        console.log(copyText)
                                        navigator.clipboard.writeText(copyText.innerText);
                                    }

                                    return (
                                        <div className="example" key={example_id}>
                                            <div className="width-wrap">
                                                <h6 className="m-1 width-inner">Входные данные</h6>
                                                <button className="copy-btn" onClick={copyFunction}>Скопировать</button>
                                            </div>

                                            <p className=" m-0 console" id={example_id}>{input_data}</p>
                                            <h6 className="m-1">Выходные данные</h6>
                                            <p className="m-0 console">{output_data}</p>

                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="row align-items-md-stretch">
                            <div className="col-md-12">
                                <div className="h-100 p-5 text-white bg-dark rounded-3">
                                    <h2>Отправить решение</h2>
                                    <p>Вставьте код здесь</p>
                                    <form id="sendform">
                                        <div className="mb-3">
                                            <input type="hidden" name="problem" value="{{problem_letter}}"/>
                                            <select
                                                id="cars"
                                                name="cars"
                                                className="mb-2"
                                                style={{"height": "15%;"}}
                                                onSelect={e => {
                                                    console.log("Hi")
                                                    setLang(e.target.value)
                                                }}
                                            >

                                                {
                                                    Object.keys(info.langs).map((name) => {
                                                        const key = info?.langs[name]


                                                        return (
                                                            <option key={key} value={key}>{name}</option>
                                                        )


                                                    }, info?.langs)
                                                }


                                            </select>
                                            <textarea name="src" className="form-control"
                                                      id="exampleFormControlTextarea1"
                                                      rows="5"
                                                      form="sendform"
                                                      onChange={e => setCode(e.target.value)}
                                            >

                                            </textarea>
                                            <p></p>
                                            <button onClick={onSend} type="button"
                                                    className="btn btn-success">Отправить
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                    <p></p>


                </div>

            </div>
        </div>

    </>;
};

export default SeeProblemPage;