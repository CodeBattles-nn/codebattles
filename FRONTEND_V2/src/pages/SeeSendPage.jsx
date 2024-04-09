import {useEffect} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {useParams} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import LazySyntaxHighlight from "../components/lazy/LazySyntaxHightlight.jsx";
import UserLoginRequired from "../components/UserLoginRequired.jsx";
import ResponsiveTable from "../components/bootstrap/ResponsiveTable.jsx";

const SeeSendPage = () => {

    const {id} = useParams();
    const [data, update] = useCachedGetAPI(`/api/send/${id}`);

    useEffect(() => {
        update()
    }, []);

    const colorsByResult = {
        "WRONG_ANSWER" : "table-danger",
        "SUCCESS" : "table-success",
        "RUNTIME_ERROR" : "table-info",
        "COMPILATION_ERROR" : "table-info",
        "TIME_LIMIT" : "table-warning",
        "NOT_EXECUTED" : "table-active",
    }

    return (<>
            <UserLoginRequired/>
            <Card>
                <h3>Анализ посылки</h3>
                <p><b>Язык:</b> {data.lang}</p>
                <b>Исходный код:</b>
                <LazySyntaxHighlight lang={data.lang_id}>
                    {data.program}
                </LazySyntaxHighlight>
                <div className="my-4"></div>
                <ResponsiveTable>
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
                        data?.tests?.map(test => {
                            return (
                                <tr className={colorsByResult[test.msg]} key={"see-send-test-id-" + test.id}>
                                    <th scope="row">{test.id}</th>
                                    <td>{test.time}</td>
                                    <td>{test.msg}</td>
                                    <td><p className="text-lines">{test.out}</p></td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </ResponsiveTable>
            </Card>
        </>
    );
};

export default SeeSendPage;
