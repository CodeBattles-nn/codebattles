import React from 'react';
import Card from "../components/bootstrap/Card.jsx";
import SyntaxHighlight from "../components/wraps/SyntaxHighlight.jsx";

const SeeSendPage = () => {
    return (
            <Card>
                <h3>Анализ посылки</h3>
                <p><b>Язык:</b> Python 3.8</p>
                <b>Исходный код:</b>
                <SyntaxHighlight lang="python">
                    print("Hello")
                </SyntaxHighlight>
                <div className="my-4"></div>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">№ Теста</th>
                        <th scope="col">Время (ms)</th>
                        <th scope="col">Вердикт</th>
                        <th scope="col">Вывод</th>
                    </tr>
                    </thead>
                    <tbody className="theme-text-dark">
                    <tr className="table-info">
                        <th scope="row">1</th>
                        <td>24</td>
                        <td>RUNTIME_ERROR</td>
                        <td><p className="text-lines">File "/adir/24/main.py", line 1
                            dg23 70dhg
                            ^
                            SyntaxError: invalid syntax</p></td>
                    </tr>
                    <tr className="table-info">
                        <th scope="row">2</th>
                        <td>16</td>
                        <td>RUNTIME_ERROR</td>
                        <td><p className="text-lines">File "/adir/25/main.py", line 1
                            dg23 70dhg
                            ^
                            SyntaxError: invalid syntax</p></td>
                    </tr>
                    <tr className="table-info">
                        <th scope="row">3</th>
                        <td>17</td>
                        <td>RUNTIME_ERROR</td>
                        <td><p className="text-lines">File "/adir/26/main.py", line 1<br/>
                            dg23 70dhg<br/>
                            ^<br/>
                            SyntaxError: invalid syntax</p></td>
                    </tr>
                    <tr className="table-info">
                        <th scope="row">4</th>
                        <td>14</td>
                        <td>RUNTIME_ERROR</td>
                        <td><p className="text-lines">File "/adir/27/main.py", line 1
                            dg23 70dhg
                            ^
                            SyntaxError: invalid syntax</p></td>
                    </tr>
                    <tr className="table-info">
                        <th scope="row">5</th>
                        <td>14</td>
                        <td>RUNTIME_ERROR</td>
                        <td><p className="text-lines">File "/adir/28/main.py", line 1
                            dg23 70dhg
                            ^
                            SyntaxError: invalid syntax</p></td>
                    </tr>
                    <tr className="table-info">
                        <th scope="row">6</th>
                        <td>16</td>
                        <td>RUNTIME_ERROR</td>
                        <td><p className="text-lines">File "/adir/29/main.py", line 1
                            dg23 70dhg
                            ^
                            SyntaxError: invalid syntax</p></td>
                    </tr>
                    </tbody>
                </table>
            </Card>

    );
};

export default SeeSendPage;
