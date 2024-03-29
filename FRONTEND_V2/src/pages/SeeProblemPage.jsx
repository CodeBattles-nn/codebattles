import React from 'react';
import Card from "../components/bootstrap/Card.jsx";

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

        </div>
    );
};

export default SeeProblemPage;
