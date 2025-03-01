import Card from "../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";

export const AdminCheckersPage = () => {

    const [data, update] = useCachedGetAPI("/api/checkers",() => {}, []);

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired />

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Чекеры"/>
            </BreadcrumbsRoot>

            <AdminHeader />

            {
                data?.map(elem => {
                    return <Card key={elem.id}>
                        <h2>{elem.displayName} | <small>{elem.languageHighlightName}</small></h2>
                        <Link to={`/admin/champs/${elem.id}/edit`} className="btn btn-danger me-2 disabled">Удалить</Link>
                    </Card>
                })
            }
        </>
    );
};
