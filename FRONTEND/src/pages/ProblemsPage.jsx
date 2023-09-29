import React from 'react';

const ProblemsPage = (props) => {
    return (
        <main style={{"background-color": "#ffe0b2", "min-height": " 94vh"}}>
            <div className="container ">
                <div className="row">
                    <div className="col" style={{minHeight: "50px"}}></div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron bg-light table-bordered table-hover p-3">
                            <h4>Задачи</h4>
                            <p></p>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Название</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr>
                                        <th className="{{problem[2]}}" scope="row">problem[0]</th>
                                        <td className="{{problem[2]}}"><a
                                            href="/problem/{{problem[0]}}">problem[1]</a></td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
};

export default ProblemsPage;