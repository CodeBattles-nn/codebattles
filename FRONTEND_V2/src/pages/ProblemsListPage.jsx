import React from 'react';
import Card from "../components/bootstrap/Card.jsx";

const ProblemsListPage = () => {
    return (
        <div>
            <Card>
                <h2 className="mb-3">Задачи</h2>
                <div className="border rounded-2 p-1">
                    <table className="table table-striped table-hover" style={{}}>
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Название</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row" className="">A</th>
                            <td><a href="#">Четность числа</a></td>

                        </tr>
                        <tr>
                            <th scope="row">B</th>
                            <td><a href="">Ужасная задача</a></td>

                        </tr>
                        <tr>
                            <th scope="row">C</th>
                            <td><a href="">Прямоугольник</a></td>
                        </tr>
                        <tr>
                            <th scope="row">D</th>
                            <td><a href="">Попугай</a></td>
                        </tr>
                        <tr>
                            <th scope="row">C</th>
                            <td><a href="">Список A</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </Card>
        </div>
    );
};

export default ProblemsListPage;
