import React from 'react';
import {cssClassByStatus} from "../../utils/colors";
import PageTitle from "../../components/PageTitle";
import {Link} from "react-router-dom";

const ProgramStatusInfo = () => {


    const statuses = []

    statuses.push({
        name: "WRONG_ANSWER",
        desc: "Программа выдает неверный ответ (Скорее всего, ваша программа работает неправильно)",
        class: "theme-text-dark"
    })
    statuses.push({
        name: "SUCCESS",
        desc: "Верный ответ",
        class: "theme-text-dark"
    })
    statuses.push({
        name: "RUNTIME_ERROR",
        desc: "Ошибка во время работы программы (Возможно, вы отправили не ту программу. Попробуйте запустить ее на своем пк. Если это не помогает, у вас ошибка в программе)",
        class: "theme-text-dark"
    })
    statuses.push({
        name: "COMPILATION_ERROR",
        desc: "Ошибка компиляции",
        class: "theme-text-dark"
    })
    statuses.push({
        name: "TIME_LIMIT",
        desc: "Ваша программа привысила время на выполнение (Скорее всего, ваша программа написана неоптимально, из-за чего работает медленно)",
        class: "theme-text-dark"
    })
    statuses.push({
        name: "NOT_EXECUTED",
        desc: "Программа не была запущена, т.к. в предыдущих тестах возникла TIME_LIMIT или MEMORY_LIMIT"
    })


    console.log(statuses)
    return (
        <div className="row">
            <div className="col-12">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb theme-bg-light">
                        <li className="breadcrumb-item"><Link to="/problems">Задачи</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Помощь</li>
                    </ol>
                </nav>
                <div className="jumbotron theme-bg-light  p-3">
                    <PageTitle title="Помощь"/>
                    <h4>Статусы выполнения программ</h4>
                    <p></p>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Название</th>
                                <th scope="col">Причина</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                statuses.map(status => {
                                    return <tr key={status} className={cssClassByStatus[status.name] + " " + status.class}>
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
    )
};

export default ProgramStatusInfo;