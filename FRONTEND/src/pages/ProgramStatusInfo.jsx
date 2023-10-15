import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import getApiAddress from "../utils/api";
import {cssClassByStatus} from "../utils/colors";

const ProgramStatusInfo = (props) => {


    const statuses = []

    statuses.push({
        name: "WRONG_ANSWER",
        desc: "Программа выдает неверный ответ (Скорее всего, ваша программа работает неправильно)"
    })
    statuses.push({name: "SUCCESS", desc: "Верный ответ"})
    statuses.push({name: "RUNTIME_ERROR", desc: "Ошибка во время работы программы (Возможно, вы отправили не ту программу. Попробуйте запустить ее на своем пк. Если это не помогает, у вас ошибка в программе)"})
    statuses.push({name: "COMPILATION_ERROR", desc: "Ошибка компиляции"})
    statuses.push({name: "TIME_LIMIT", desc: "Ваша программа привысила время на выполнение (Скорее всего, ваша программа написана неоптимально, из-за чего работает медленно)"})
    statuses.push({name: "NOT_EXECUTED", desc: "Программа не была запущена, т.к. в предыдущих тестах возникла TIME_LIMIT или MEMORY_LIMIT"})


    console.log(statuses)
    return (
        <main style={{"background-color": "#ffe0b2", "min-height": " 94vh"}}>
            <div className="container ">
                <div className="row">
                    <div className="col" style={{minHeight: "50px"}}></div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron bg-light table-bordered table-hover p-3">
                            <h4>Статусы выполнения программ</h4>
                            <p></p>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">Название</th>
                                        <th scope="col">Причина</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        statuses.map(status => {
                                            return <tr key={status} className={cssClassByStatus[status.name]}>
                                                <th scope="row">{status.name}</th>
                                                <td>{status.desc}</td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
};

export default ProgramStatusInfo;