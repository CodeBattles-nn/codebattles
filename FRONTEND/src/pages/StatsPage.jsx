import React from 'react';
import {Link} from "react-router-dom";

const StatsPage = (props) => {
    return <main style={{"background-color": "#ffe0b2", "min-height": '94vh'}}>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 col-lg-12 content-container">

                    <div class="container py-4">
                        <div class="jumbotron bg-light table-bordered table-hover p-3">
                            <h4>Положение</h4>
                            <p></p>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">№</th>
                                        <th scope="col">Пользователь</th>
                                        <th scope="col">Всего</th>


                                        <th scope="col"><Link to="/problem/{{col}}">col</Link></th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="{{user[4]}}">
                                        <th scope="row">user[0]</th>
                                        <td>user[1]</td>
                                        <td>user[2]</td>

                                        <td class="p-1">
                                            <div style={{"text-align": "center"}} class="text-center">
                                                <p class="int p-0 m-0">col</p>
                                                <p style={{"font-size": "small"}} class="p-0"></p>
                                            </div>
                                        </td>


                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </main>

};

export default StatsPage;