import React, {useEffect, useState} from 'react';

import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";

import "react-ace"
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import PageTitle from "../../components/PageTitle";
import If from "../../components/If";


const SeeProblemQuestionPage = () => {

    const {letter} = useParams();

    const [questionNumber, setQuestionNumber] = useState(0)

    const [searchParams, setSearchParams] = useSearchParams();

    const [answers, setAnswers] = useState({})

    useEffect(() => {
        const prevQuestion = searchParams.get("q");
        if (prevQuestion) {
            setQuestionNumber(Number.parseInt(prevQuestion))
        }

    }, []);

    useEffect(() => {

        setSearchParams({"q": questionNumber})
    }, [questionNumber]);

    const defaultData = [
        {
            title: "Мощность алфавита считается по формуле",
            type: "select",
            variants: [
                "N = k/2",
                "15 = 15 + 9",
                "AlexGyver",
                "Нет такого понятия",
                "Я бобер",
                "N = 2^i",
            ]
        },
        {
            title: "Мощность алфавита считается по формуле 2",
            type: "multiselect",
            variants: [
                "N = k/2",
                "15 = 15 + 9",
                "AlexGyver",
                "Нет такого понятия",
                "Я бобер",
            ]
        },
        {
            title: "5 + 5 = ?  (ОТВЕТ ПИСАТЬ ЦИФРАМИ)",
            type: "integer",
            variants: []
        },
    ]

    const [data, setData] = useState(defaultData)

    let currentQuestion = data[questionNumber];

    return <>
        <PageTitle title={`Задача ${letter}`}/>


        <div className=" mb-4 theme-bg-light rounded-3">
            <div className="container-fluid py-3">
                <div className="col-md-12 fs-4">
                    <h2 style={{"color": "#6c757d;"}}>Задача {letter}</h2>
                </div>


            </div>
        </div>

        <div className="mb-4 theme-bg-light rounded-3 p-3" style={{minHeight: "150px"}}>
            <nav aria-label="Page navigation example " className="d-none  d-xl-block">
                <ul className="pagination justify-content-center pagination-lg">


                    {defaultData.map((e, num) => {
                        return <li className={questionNumber == num ? ("page-item active") : ("page-item")}>
                            <btn onClick={() => {
                                setQuestionNumber(num)
                            }} className="page-link" href="#">{num + 1}</btn>
                        </li>
                    })}


                </ul>
            </nav>
            <h2>Вопрос #{questionNumber + 1}<small className="text-secondary">/{data.length}</small></h2>
            <button className="btn btn-outline-primary mr-1"
                    onClick={() => setQuestionNumber(Math.max(0, questionNumber - 1))}>назад
            </button>
            <button className="btn btn-outline-primary mr-1"
                    onClick={() => setQuestionNumber(Math.min(questionNumber + 1, defaultData.length - 1))}>след
            </button>
            <div className="my-5"></div>
            <h5>
                {currentQuestion.title}
            </h5>
            <form>
                <If condition={currentQuestion.type === "select"} is_true={
                    <div className="form-group">
                        <select className="form-control" id="exampleFormControlSelect1">
                            {
                                currentQuestion.variants.map((elem) => {
                                    return <option>{elem}</option>
                                })
                            }
                        </select>
                    </div>
                }/>
                <If condition={currentQuestion.type === "multiselect"} is_true={
                    <div className="form-group">
                        {/*<small>ЧТОБЫ ВЫБРАТЬ НЕСКОЛЬКО ВАРИАНТОВ, НАЖИМАЙТЕ НА НИХ С ЗАЖАТОЙ КНОПКОЙ Ctrl</small>*/}
                        <br/>
                        <form>
                            {
                                currentQuestion.variants.map((elem) => {
                                    return <div>
                                        <input type="checkbox"/> {elem}
                                    </div>
                                })
                            }
                        </form>
                    </div>
                }/>
                <If condition={currentQuestion.type === "integer"} is_true={
                    <div class="form-group">
                        <input type="number" class="form-control" pattern="\d*"/>
                    </div>

                }/>

            </form>


        </div>

    </>;
};

export default SeeProblemQuestionPage;