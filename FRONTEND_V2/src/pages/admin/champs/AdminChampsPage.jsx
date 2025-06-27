import Card from "../../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {CompetitionCard} from "../../../components/CompetitionCard.jsx";
import CompetitionsListContainer from "../../../components/CompetitionsListContainer.jsx";
import { useTranslation } from 'react-i18next';

export const AdminChampsPage = () => {
    const { t } = useTranslation();

    const [data, update] = useCachedGetAPI("/api/competitions", () => {
    }, []);

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminChamps.competitions')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <CompetitionsListContainer>
                {
                    data?.map(elem => {
                        return <div className='col d-flex align-items-stretch' key={elem.id}>
                            <CompetitionCard
                                id={elem.id}
                                name={elem.name}
                                startedAt={elem.startedAt}
                                endedAt={elem.endedAt}
                                description={elem.description}>
                                    <Link to={`/admin/champs/${elem.id}/edit`} className="btn btn-warning me-2">{t('adminChamps.manage')}</Link>
                            </CompetitionCard>
                        </div>
                    })
                }

            </CompetitionsListContainer>

            <Card>
                <Link to="/admin/champs/create" className="btn btn-primary">{t('adminChamps.createCompetition')}</Link>
            </Card>
        </>
    )
        ;
};
