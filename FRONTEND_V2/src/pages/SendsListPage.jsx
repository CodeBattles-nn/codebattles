import React from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";

const SendsListPage = () => {
    return (
        <div>
            <Card>
                <h2 className="mb-3">Посылки</h2>
                <div className="border rounded-2 p-1">
                    <table className="table table-striped table-hover" style={{}}>
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Время посылки</th>
                            <th scope="col">Задача</th>
                            <th scope="col" className="text-center">Баллы</th>
                            <th scope="col">Статус</th>
                            <th scope="col">Баллы</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row" className="">1</th>
                            <td>02/29/2024, 12:24:42</td>
                            <td><Link to="/problems/A">A. Четность числа</Link></td>
                            <td className="text-center text-success">0</td>
                            <td>Протестировано</td>
                            <td><Link to="/sends/1">Вердикт</Link></td>

                        </tr>
                       <tr>
                            <th scope="row" className="">2</th>
                            <td>02/29/2024, 12:24:42</td>
                            <td><Link to="/problems/A">A. Четность числа</Link></td>
                            <td className="text-center text-success">50</td>
                            <td>Протестировано</td>
                            <td><Link to="/sends/1">Вердикт</Link></td>

                        </tr>
                       <tr>
                            <th scope="row" className="">3</th>
                            <td>02/29/2024, 12:24:42</td>
                            <td><Link to="/problems/A">A. Четность числа</Link></td>
                            <td className="text-center text-success">100</td>
                            <td>Протестировано</td>
                            <td><Link to="/sends/1">Вердикт</Link></td>

                        </tr>
                       <tr>
                            <th scope="row" className="">4</th>
                            <td>02/29/2024, 12:24:42</td>
                            <td><Link to="/problems/A">A. Четность числа</Link></td>
                            <td className="text-center text-success">100</td>
                            <td>Протестировано</td>
                            <td><Link to="/sends/1">Вердикт</Link></td>

                        </tr>

                        </tbody>
                    </table>
                </div>

            </Card>
        </div>
    );
};

export default SendsListPage;
