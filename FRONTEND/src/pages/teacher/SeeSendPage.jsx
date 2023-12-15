import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {cssClassByStatus} from "../../utils/colors";
import SyntaxHighlight from "../../components/wraps/SyntaxHightlight";
import PageTitle from "../../components/PageTitle";
import apiAxios from "../../apiAxios";
import getApiAddress from "../../utils/api";

const SeeSendPage = () => {

    const [data, setData] = useState({tests: []});

    const {id, user_id, letter} = useParams();

    useEffect(() => {
        const params = new URLSearchParams([['problem', letter], ['user_id', user_id]]);
        apiAxios.get(getApiAddress() + `/api/teacher/champs/${id}/stats/search`, {params})
            .then((r) => {
                    console.log(r.data)
                    setData(r.data)
                }
            )
    }, []);

    return (
        <div className="jumbotron theme-bg-light  p-3">
            <PageTitle title={`Посылка #${id}`}/>
            <h3>Просмотр посылки</h3>
            <p><b>Язык:</b> {data.lang}</p>
            <p><b>Исходный код:</b></p>
            <SyntaxHighlight lang={data.lang_id}>
                {data.program}
            </SyntaxHighlight>

            <p><b>Тесты: </b></p>
            <div className="table-responsive">
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

                    {
                        data.tests.map(test => {
                            return (
                                <tr className={cssClassByStatus[test.msg]}>
                                    <th scope="row">{test.id}</th>
                                    <td>{test.time}</td>
                                    <td>{test.msg}</td>
                                    <td>
                                        <p style={{"white-space": "pre-line"}}>{test.out}</p>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </div>

        </div>

    )
};

export default SeeSendPage;