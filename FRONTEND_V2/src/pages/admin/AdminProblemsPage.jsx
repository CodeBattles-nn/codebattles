import Card from "../../components/bootstrap/Card.jsx";
import ResponsiveTable from "../../components/bootstrap/ResponsiveTable.jsx";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";

export const AdminProblemsPage = () => {

    const [data, update] = useCachedGetAPI("/api/problems",() => {}, []);

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired />

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Задачи"/>
            </BreadcrumbsRoot>

            <AdminHeader />

            {
                data?.map(elem => {
                    return <Card key={elem.id}>
                        {/*<h5><span className="badge text-bg-primary">Идет</span></h5>*/}
                        <h2>{elem.name}</h2>
                        <h3>{elem.description}</h3>
                        <Link to={`/admin/champs/${elem.id}/edit`} className="btn btn-warning me-2 disabled">Управлять</Link>
                    </Card>
                })
            }
        </>
    );
};
