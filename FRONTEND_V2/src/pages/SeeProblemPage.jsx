import React from 'react';
import Card from "../components/bootstrap/Card.jsx";
import ProblemExample from "../components/ProblemExample.jsx";
import CodeEditor from "../components/wraps/CodeEditor.jsx";

const SeeProblemPage = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <h2>Задача A</h2>
                        <h3>Четность числа</h3>
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
                            <p>Маша и Даша спорят, кто больше разбирается в
                                математике. При этом, Даша не знает почти ничего. Помогите ей выиграть спор. Ваша задача
                                написать программу, определяющую четность числа</p>

                            <h4 className="mt-5">Входные данные</h4>
                            <p>-10^6 &lt;=
                                N &lt;= 10^6</p>

                            <h4 className="mt-5">Выходные данные</h4>
                            <p>Вывести "YES", если число четное. "NO" - если
                                нечетное. (Вывод выполняется без ковычек)</p>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Card>
                        <h3>Примеры</h3>
                        <ProblemExample in_data="1" out_data="NO"/>
                        <ProblemExample in_data="2" out_data="YES"/>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Card>
                        <h4 className="mb-3">Отправить решение</h4>
                        <p>Вставьте код здесь</p>
                        <select className="form-select">
                            <option>Python 3.9</option>
                            <option>Java 17</option>
                            <option>Pascal</option>
                        </select>

                        <CodeEditor className="my-5 rounded-2" />

                        <button className="btn btn-success">Отправить</button>
                    </Card>
                </div>
            </div>

        </div>
    );
};

export default SeeProblemPage;
