import React from 'react';

const SeeSendPage = (props) => {
    return (
        <main style={{"background-color": "#ffe0b2", "min-height": " 94vh"}}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 col-lg-12 content-container">

                        <div className="container py-4">
                            <div className="jumbotron bg-light table-bordered table-hover p-3">
                                <h3>Анализ посылки</h3>
                                <p><b>Язык:</b> lang</p>
                                <p><b>Исходный код:</b></p>
                                <pre><code data-language="{{lang}}">program</code></pre>
                                <p><b>Тесты: </b></p>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th scope="col">№ Теста</th>
                                            <th scope="col">Время (ms)</th>
                                            <th scope="col">Вердикт</th>
                                            <th scope="col">Вывод</th>
                                        </tr>
                                        </thead>
                                        <tbody>


                                        <tr className="{{test[4]}}">
                                            <th scope="row">test[0]</th>
                                            <td>test[1]</td>
                                            <td>test[2]</td>
                                            <td>
                                                <p style={{"white-space": "pre-line"}}>test[3]</p>
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
    )
};

export default SeeSendPage;