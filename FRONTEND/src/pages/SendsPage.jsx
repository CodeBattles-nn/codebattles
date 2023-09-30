import React from 'react';
import {Link} from "react-router-dom";

const SendsPage = (props) => {
    return <main style={{"min-height": "93vh","background-color": "#ffe0b2"}}>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 col-lg-12 content-container">

                    <div class="container py-4">
                        <div class="jumbotron bg-light table-bordered table-hover p-3">
                            <h4>Посылки</h4>
                            <p></p>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">№</th>
                                        <th scope="col">Время посылки</th>
                                        <th scope="col">Задача</th>
                                        <th scope="col">Баллы</th>
                                        <th scope="col">Статус</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>


                                    <tr>
                                        <th scope="row">send[0]</th>
                                        <td>send[3]</td>
                                        <td><Link to="/problem/{{send[1]}}">send[1]. send[2]</Link></td>
                                        <td class="int text-center">send[5]</td>
                                        <td>send[4]</td>
                                        <td>
                                            <Link to="/send/{{send[0]}}">Вердикт</Link>
                                        </td>

                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <footer class="pt-3 mt-4 text-muted border-top">
                        &copy; 2023, CodeBattles
                    </footer>
                </div>

            </div>
        </div>
    </main>
};

export default SendsPage;