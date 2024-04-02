import {useEffect} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import UserLoginRequired from "../components/UserLoginRequired.jsx";

const SendsListPage = () => {

    const [data, update] = useCachedGetAPI("/api/sends");

    useEffect(() => {
        update();
    });

    return (
        <>
            <UserLoginRequired />
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

                        {data?.sends?.map(send => {
                            return (
                                <tr key={"send-id-" + send.id}>
                                    <th scope="row" className="">{send.id}</th>
                                    <td>{send.send_time}</td>
                                    <td><Link to={`/problems/${send.letter}`}>{send.letter}. {send.name}</Link></td>
                                    <td className="text-center text-success">{send.score}</td>
                                    <td>{send.state}</td>
                                    <td><Link to={`/sends/${send.id}`}>Вердикт</Link></td>

                                </tr>)
                        })}
                        </tbody>
                    </table>
                </div>

            </Card>
        </>
    );
};

export default SendsListPage;
