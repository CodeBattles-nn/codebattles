import React from 'react';
import Card from "../components/bootstrap/Card.jsx";

const SeeSendPage = () => {
    return (
        <>
            <Card>
                <h3 className="mb-4">Статусы выполнения программ</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Причина</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="table-danger theme-text-dark">
                        <th scope="row">WRONG_ANSWER</th>
                        <td>Программа выдает неверный ответ (Скорее всего, ваша программа работает неправильно)</td>
                    </tr>
                    <tr className="table-success theme-text-dark">
                        <th scope="row">SUCCESS</th>
                        <td>Верный ответ</td>
                    </tr>
                    <tr className="table-info theme-text-dark">
                        <th scope="row">RUNTIME_ERROR</th>
                        <td>Ошибка во время работы программы (Возможно, вы отправили не ту программу. Попробуйте
                            запустить ее на своем пк. Если это не помогает, у вас ошибка в программе)
                        </td>
                    </tr>
                    <tr className="table-info theme-text-dark">
                        <th scope="row">COMPILATION_ERROR</th>
                        <td>Ошибка компиляции</td>
                    </tr>
                    <tr className="table-warning theme-text-dark">
                        <th scope="row">TIME_LIMIT</th>
                        <td>Ваша программа привысила время на выполнение (Скорее всего, ваша программа написана
                            неоптимально, из-за чего работает медленно)
                        </td>
                    </tr>
                    <tr className="table-active undefined">
                        <th scope="row">NOT_EXECUTED</th>
                        <td>Программа не была запущена, т.к. в предыдущих тестах возникла TIME_LIMIT или MEMORY_LIMIT
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Card>
        </>
    );
};

export default SeeSendPage;
