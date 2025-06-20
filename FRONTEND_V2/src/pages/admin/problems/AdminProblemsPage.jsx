import Card from "../../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";

export const AdminProblemsPage = () => {

    const [data, update] = useCachedGetAPI("/api/problems", () => {
    }, []);

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Задачи"/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Desc</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data?.map(elem => {
                            return (
                                <tr key={elem.id}>
                                    <th scope="row">{elem.id}</th>
                                    <td>
                                        <Link to={`/admin/problems/${elem.id}/edit`}>
                                            {elem.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <div style={{maxWidth: "50ch"}} className=" text-truncate">
                                            {elem.description}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>

                <div className='d-flex gap-2'>
                    <Link to="/admin/problems/create" className="btn btn-success">создать</Link>
                    <Link to="/admin/problems/import/polygon" className="btn btn-info">импортировать из Polygon</Link>
                </div>
            </Card>

        </>
    );
};
