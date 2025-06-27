import Card from "../../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import { useTranslation } from 'react-i18next';

export const AdminCheckersPage = () => {

    const [data, update] = useCachedGetAPI("/api/checkers",() => {}, []);
    const { t } = useTranslation();

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired />

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminCheckers.checkers')}/>
            </BreadcrumbsRoot>

            <AdminHeader />

            {
                data?.map(elem => {
                    return <Card key={elem.id}>
                        <h2>{elem.displayName} | <small>{elem.languageHighlightName}</small></h2>
                        <Link to={`/admin/champs/${elem.id}/delete`} className="btn btn-danger me-2 disabled">{t('adminCheckers.delete')}</Link>
                        <Link to={`/admin/checkers/${elem.id}/edit`} className="btn btn-secondary me-2">{t('adminCheckers.edit')}</Link>
                    </Card>
                })
            }

            <Card>
                <Link to="/admin/checkers/create" className="btn btn-success">{t('adminCheckers.create')}</Link>
            </Card>
        </>
    );
};
