import React from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";

const StatsPage = () => {
    return (
        <div>
            <Card>
                <h2 className="mb-3">Рейтинг</h2>
                <div className="border rounded-2 p-1">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Пользователь</th>
                            <th scope="col">Всего</th>
                            <th scope="col"><Link to="/problems/A">A</Link></th>
                            <th scope="col"><Link to="/problems/B">B</Link></th>
                            <th scope="col"><Link to="/problems/C">C</Link></th>
                            <th scope="col"><Link to="/problems/D">D</Link></th>
                            <th scope="col"><Link to="/problems/E">E</Link></th>
                            <th scope="col">Посл. Посылка</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="table-secondary">
                            <th scope="row">1</th>
                            <td>Лох &lt;3</td>
                            <td>400</td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p className="int p-0 m-0"></p>
                                    <p className="p-0" style={{"fontSize": "small"}}></p></div>
                            </td>
                            <td>03/09/2024, 15:43:50</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Лох &lt;3</td>
                            <td>400</td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p className="int p-0 m-0"></p>
                                    <p className="p-0" style={{"fontSize": "small"}}></p></div>
                            </td>
                            <td>03/09/2024, 15:43:50</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Лох &lt;3</td>
                            <td>400</td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p className="int p-0 m-0"></p>
                                    <p className="p-0" style={{"fontSize": "small"}}></p></div>
                            </td>
                            <td>03/09/2024, 15:43:50</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Лох &lt;3</td>
                            <td>400</td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p
                                    className="text-success p-0 m-0">100</p><p className="p-0" style={{"fontSize": "small"}}></p>
                                </div>
                            </td>
                            <td className="p-1">
                                <div className="text-center"><p className="int p-0 m-0"></p>
                                    <p className="p-0" style={{"fontSize": "small"}}></p></div>
                            </td>
                            <td>03/09/2024, 15:43:50</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </Card>
        </div>
    );
};

export default StatsPage;
