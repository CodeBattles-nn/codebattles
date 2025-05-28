import Card from "../../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";

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
                        <div className="d-flex gap-2">
                            <h2>{elem.name}</h2><small className=""> id=<x className="text-danger">{elem.id}</x></small>
                        </div>

                        <h3>{elem.description}</h3>
                        <Link to={`/admin/problems/${elem.id}/edit`} className="btn btn-warning me-2">Управлять</Link>
                    </Card>
                })
            }

            <Card>
                <Link to="/admin/problems/create" className="btn btn-success" >создать</Link>
            </Card>
        </>
    );
};
