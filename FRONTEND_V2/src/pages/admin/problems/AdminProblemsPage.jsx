import Card from "../../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import { useTranslation } from 'react-i18next';

export const AdminProblemsPage = () => {

    const [data, update] = useCachedGetAPI("/api/problems", () => {
    }, []);

    const { t } = useTranslation();

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminProblems.problems')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">{t('adminProblems.id')}</th>
                        <th scope="col">{t('adminProblems.name')}</th>
                        <th scope="col">{t('adminProblems.desc')}</th>
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
                    <Link to="/admin/problems/create" className="btn btn-success">{t('adminProblems.createProblem')}</Link>
                    <Link to="/admin/problems/import/polygon" className="btn btn-info">{t('adminProblems.importFromPolygon')}</Link>
                </div>
            </Card>

        </>
    );
};
