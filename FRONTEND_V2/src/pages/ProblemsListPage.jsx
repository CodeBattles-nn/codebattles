import React from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";

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
                            <td><Link to="/problems/A">Четность числа</Link></td>

                        </tr>
                        <tr>
                            <th scope="row">B</th>
                            <td><Link to="/problems/B">Ужасная задача</Link></td>

                        </tr>
                        <tr>
                            <th scope="row">C</th>
                            <td><Link to="/problems/C">Прямоугольник</Link></td>
                        </tr>
                        <tr>
                            <th scope="row">D</th>
                            <td><Link to="/problems/D">Попугай</Link></td>
                        </tr>
                        <tr>
                            <th scope="row">E</th>
                            <td><Link to="/problems/E">Список A</Link></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </Card>
        </div>
    );
};

export default ProblemsListPage;
