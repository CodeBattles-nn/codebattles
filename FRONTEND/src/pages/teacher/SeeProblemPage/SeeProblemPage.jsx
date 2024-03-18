import React, {useEffect, useState} from 'react';

import "./example.css"
import "./style.css"
import "./utils.css"
import {useNavigate, useParams} from "react-router-dom";
import getApiAddress from "../../../utils/api";
import {toast} from "react-toastify";

import "react-ace"
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import Markdown from "../../../components/wraps/Markdown";
import apiAxios from "../../../apiAxios";
import CodeEditor from "../../../components/wraps/CodeEditor";
import PageTitle from "../../../components/PageTitle";


const SeeProblemPage = () => {
    const [info, setInfo] = useState({langs: {}, examples: []});

    const {id} = useParams();

    const navigate = useNavigate();

    const [lang, setLang] = useState(1);

    let editorCode;

    useEffect(() => {
        apiAxios.get(getApiAddress() + `/api/teacher/problems/${id}`).then(
            (r) => {
                if (! r.data.langs) r.data.langs = {}
                if (! r.data.examples) r.data.examples = []

                console.log(r.data)

                setInfo(r.data)
            }
        )
    }, []);

    useEffect(() => {


        setInfo({
            "description": "\u041f\u0435\u0442\u044f \u0438 \u0412\u0430\u0441\u044f \u0438\u0433\u0440\u0430\u044e\u0442 \u0432 \u0444\u0443\u0442\u0431\u043e\u043b. \u041f\u0435\u0442\u044f \u0437\u0430\u0431\u0438\u043b \u0410 \u0433\u043e\u043b\u043e\u0432, \u0430 \u0412\u0430\u0441\u044f - \u0412 \u0433\u043e\u043b\u043e\u0432.\u0412\u0430\u0448\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u043f\u043e\u0441\u0447\u0438\u0442\u0430\u0442\u044c, \u0441\u043a\u043e\u043b\u044c\u043a\u043e\u0432\u0441\u0435\u0433\u043e \u0433\u043e\u043b\u043e\u0432 \u0431\u044b\u043b\u043e \u0437\u0430\u0431\u0438\u0442\u043e \u0432 \u0434\u0430\u043d\u043d\u043e\u0439 \u0438\u0433\u0440\u0435 :)",
            "examples": [
                [
                    "12\n13",
                    "25"
                ],
                [
                    "3\n2",
                    "5"
                ],
                [
                    "3\n15",
                    "18"
                ]
            ],
            "in_data": "\u041d\u0430 \u0432\u0432\u043e\u0434 \u043f\u043e\u0434\u0430\u044e\u0442\u0441\u044f \u0434\u0432\u0430 \u0447\u0438\u0441\u043b\u0430 \u043d\u0430 \u0440\u0430\u0437\u043d\u044b\u0445 \u0441\u0442\u0440\u043e\u043a\u0430\u0445. A - \u0447\u0438\u0441\u043b\u043e \u0433\u043e\u043b\u043e\u0432,\n\u0437\u0430\u0431\u0438\u0442\u044b\u0445 \u041f\u0435\u0442\u0435\u0439. B - \u0412\u0430\u0441\u0435\u0439.\n0 \u2264 \u0410 \u2264 10^9\n0 \u2264 B \u2264 10^9",
            "langs": {
                "Java 17": 2,
                "Python 3.8": 1
            },
            "letter": "A",
            "name": "\u0424\u0443\u0442\u0431\u043e\u043b",
            "out_data": "\u0412\u044b\u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u0431\u0449\u0435\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0433\u043e\u043b\u043e\u0432 \u0432 \u0438\u0433\u0440\u0435",
            "success": true
        })

    }, []);

    useEffect(() => {
        if (info.langs.length > 0) {
            setLang(info.langs[0])
        }
        console.log(info.langs)
    }, [info]);


    console.log(info)

    return <>
        <PageTitle title={`Задача id=` + id }/>

        <div className="p-3 mb-4 bg-danger theme-text-light rounded-3 text-center">
            Просмотр в режиме учителя
        </div>

        <div className="row align-items-md-stretch" style={{rowGap: "1em"}}>
            <div className="col-md-6">
                <div className="h-60 p-3 theme-bg-light rounded-3">
                    <h2 style={{"color": "#6c757d;"}}>Задача id={id}</h2>
                    <h3>{info.name}</h3>
                </div>
            </div>
            <div className="col-md-6">
                <div className="h-100 p-3 theme-bg-light rounded-3">
                    <h2>Ограничения</h2>
                    <p style={{"white-space": "pre-line"}}>
                        Время выполнения: 1000мс
                        Память: 256мб
                    </p>
                </div>
            </div>
        </div>

        <p></p>

        <div className=" mb-4 theme-bg-light rounded-3">
            <div className="container-fluid py-5">
                <div className="col-md-12 fs-4">
                    <h4>Задача</h4>
                    <Markdown text={info.description}/>
                    <h4>Входные данные</h4>
                    <Markdown text={info.in_data}/>
                    <h4>Выходные данные</h4>
                    <Markdown text={info.out_data}/>
                </div>


            </div>
        </div>

        <div className="jumbotron theme-bg-light">
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

        <div className="p-3 mb-4 bg-danger theme-text-light rounded-3 text-center opacity-50">
            Отправка недоступна в этом режиме
        </div>

    </>;
};

export default SeeProblemPage;