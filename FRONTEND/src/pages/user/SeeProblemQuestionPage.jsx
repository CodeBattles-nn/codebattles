import React, {useState} from 'react';

import {useNavigate, useParams} from "react-router-dom";
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
            title: "5 + 5 = ?",
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

                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item bg-danger"><a className="page-link" href="#">2</a></li>
                    <li className="page-item active"><a className="page-link active" href="#">3 </a></li>
                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                    <li className="page-item"><a className="page-link" href="#">6</a></li>
                    <li className="page-item"><a className="page-link" href="#">7</a></li>
                    <li className="page-item"><a className="page-link" href="#">8</a></li>
                    <li className="page-item"><a className="page-link" href="#">9</a></li>


                </ul>
            </nav>
            <h2>Вопрос #{questionNumber + 1}<small className="text-secondary">/{data.length}</small></h2>
            <br/>
            <h5>
                {currentQuestion.title}
            </h5>
            <form>
                <If condition={currentQuestion.type === "select"} is_true={
                    <div className="form-group">
                        <select className="form-control" id="exampleFormControlSelect1">
                            {
                                currentQuestion.variants.map( (elem) => {
                                    return <option>{elem}</option>
                                })
                            }
                        </select>
                    </div>
                }/>
                <If condition={currentQuestion.type === "multiselect"} is_true={
                    <div className="form-group">
                        <small>ЧТОБЫ ВЫБРАТЬ НЕСКОЛЬКО ВАРИАНТОВ, НАЖИМАЙТЕ НА НИХ С ЗАЖАТОЙ КНОПКОЙ Ctrl</small>
                        <br/>
                        <select multiple className="form-control" style={{minHeight: "200px"}}>
                            <option>N = k/2</option>
                            <option>15 = 15 + 9</option>
                            <option>AlexGyver</option>
                            <option>Нет такого понятия</option>
                            <option>Я бобер</option>
                        </select>

                    </div>
                }/>
                <If condition={currentQuestion.type === "integer"} is_true={
                    <div class="form-group">
                        <input type="number" class="form-control"/>
                    </div>

                }/>

            </form>
            <button onClick={() => setQuestionNumber(questionNumber - 1)}>назад</button>
            <button onClick={() => setQuestionNumber(questionNumber + 1)}>след</button>

        </div>

    </>;
};

export default SeeProblemQuestionPage;