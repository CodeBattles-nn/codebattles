import {useEffect} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {useParams} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import LazySyntaxHighlight from "../components/lazy/LazySyntaxHightlight.jsx";

const SeeSendPage = () => {

    const {id} = useParams();
    const [data, update] = useCachedGetAPI(`http://localhost:2500/api/send/${id}`);

    useEffect(() => {
        update()
    }, []);

    return (<Card>
            <h3>Анализ посылки</h3>
            <p><b>Язык:</b> {data.lang}</p>
            <b>Исходный код:</b>
            <LazySyntaxHighlight lang={data.lang_id}>
                {data.program}
            </LazySyntaxHighlight>
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
                {
                    data?.tests?.map(test => {
                        return (
                            <tr className="" key={"see-send-test-id-" + test.id}>
                                <th scope="row">{test.id}</th>
                                <td>{test.time}</td>
                                <td>{test.msg}</td>
                                <td><p className="text-lines">{test.out}</p></td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
        </Card>

    );
};

export default SeeSendPage;
