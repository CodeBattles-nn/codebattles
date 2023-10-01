import React from 'react';

import "./utils.css"
import "./bs-jumbotron.css"
import "./style.css"

const SeeProblemPage = (props) => {
    return <>
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-8 col-lg-12 content-container">

                    <div className="container py-4">


                        <div className="row align-items-md-stretch">
                            <div className="col-md-6">
                                <div className="h-60 p-3 text-white bg-dark rounded-3">
                                    <h2 style={{"color": "#6c757d;"}}>Задача problem_letter</h2>
                                    <h3>problem_name</h3>
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
                                    <p style={{"white-space": "pre-line"}}>problem_description</p>
                                    <h4>Входные данные</h4>
                                    <p style={{"white-space": "pre-line"}}>in_data</p>
                                    <h4>Выходные данные</h4>
                                    <p style={{"white-space": "pre-line"}}>out_data</p>
                                </div>


                            </div>
                        </div>

                        <div className="jumbotron bg-light">
                            <h2>Примеры</h2>


                            <div className="example">
                                <div className="width-wrap">
                                    <h6 className="m-1 width-inner">Входные данные</h6>
                                    <button className="copy-btn">Скопировать</button>
                                </div>

                                <p className=" m-0 console" id="code1">example[0]</p>
                                <h6 className="m-1">Выходные данные</h6>
                                <p className="m-0 console">example[1]</p>
                            </div>


                        </div>

                        <div className="row align-items-md-stretch">
                            <div className="col-md-12">
                                <div className="h-100 p-5 text-white bg-dark rounded-3">
                                    <h2>Отправить решение</h2>
                                    <p>Вставьте код здесь</p>
                                    <form action="/send" method="post" id="sendform">
                                        <div className="mb-3">
                                            <input type="hidden" name="problem" value="{{problem_letter}}"/>
                                            <select id="cars" name="cars" style={{"height": "15%;"}}>

                                                <option value="{{server[1]}}">server[0]</option>

                                            </select>
                                            <textarea name="src" className="form-control" id="exampleFormControlTextarea1"
                                                      rows="5"
                                                      form="sendform"></textarea>
                                            <p></p>
                                            <button className="btn btn-success">Отправить</button>
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