import {useEffect} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {Link, useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import ResponsiveTable from "../../components/bootstrap/ResponsiveTable.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import {formatDate} from "../../utils/format.js";

const SendsListPage = () => {

    const {compId} = useParams()

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}/sends`, () => {
    }, []);

    useEffect(() => {
        update();
    }, []);

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования" url="/champs"/>
                <BreadcrumbsElement name="Посылки"/>
            </BreadcrumbsRoot>

            <Card>
                <h2 className="mb-3">Посылки</h2>
                <div className="border rounded-2 p-1">
                    <ResponsiveTable>
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

                        {data?.map(send => {
                            return (
                                <tr key={"send-id-" + send.id}>
                                    <th scope="row" className="">{send.id}</th>
                                    <td>{formatDate(send.createdAt)}</td>
                                    <td>
                                        <Link to={`/champs/${compId}/problems/${send?.competitionsProblems?.id}`}>
                                            {send?.competitionsProblems?.slug}. {send?.competitionsProblems?.problem.name}
                                        </Link>
                                    </td>
                                    <td className="text-center text-success">{send.score}</td>
                                    <td>{send.status}</td>
                                    <td>
                                        <Link to={`/champs/${compId}/sends/${send.id}`}>Вердикт</Link>
                                    </td>

                                </tr>)
                        })}
                        </tbody>
                    </ResponsiveTable>
                </div>

            </Card>
        </>
    );
};

export default SendsListPage;
