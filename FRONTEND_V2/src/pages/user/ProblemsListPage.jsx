import {useEffect} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {Link, useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import ResponsiveTable from "../../components/bootstrap/ResponsiveTable.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";

const ProblemsListPage = () => {

    let { compId } = useParams();

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}/problems`, () => {}, []);

    useEffect(() => {
        update();
    }, []);

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования" url="/champs"/>
                <BreadcrumbsElement name="Задачи"/>
            </BreadcrumbsRoot>

            <Card>
                <h2 className="mb-3">Задачи</h2>
                <div className="border rounded-2 p-1">
                    <ResponsiveTable>
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Название</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            data.map(data => {

                                const link_icon_css_class = (`bi-braces`)

                                return (
                                    <tr key={data.id} className="">
                                    <th scope="row" className="">
                                        {data.slug}
                                    </th>
                                    <td><Link to={`${data.id}`}>
                                        <i className={"bi me-2 "+ link_icon_css_class}></i>
                                        {data.problem?.name}
                                    </Link></td>

                                </tr>)
                            })
                        }

                        </tbody>
                    </ResponsiveTable>
                </div>

            </Card>
        </>
    );
};

export default ProblemsListPage;
