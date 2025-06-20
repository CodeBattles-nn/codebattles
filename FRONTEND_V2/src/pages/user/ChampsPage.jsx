import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {CompetitionCard} from "../../components/CompetitionCard.jsx";
import {competitionStatuses, getCompetitionStatusByDates} from "../../utils/competitionStatuses.js";
import CompetitionsListContainer from "../../components/CompetitionsListContainer.jsx";

const ChampsPage = () => {

    const [data, update] = useCachedGetAPI("/api/competitions/me", () => {
    }, []);

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования"/>
            </BreadcrumbsRoot>

            <CompetitionsListContainer>
                {
                    data?.map(elem => {
                        const status = getCompetitionStatusByDates(elem.startedAt, elem.endedAt)

                        return <>
                            <div className='col d-flex align-items-stretch'>
                                <CompetitionCard
                                    key={elem.id}
                                    id={elem.id}
                                    name="11111"
                                    startedAt={elem.startedAt}
                                    endedAt={elem.endedAt}
                                    description={elem.description}>
                                    {status === competitionStatuses.IN_PROGRESS &&
                                        <>
                                            <Link to={`/champs/${elem.id}/problems`} className="btn btn-success">Войти</Link>
                                        </>}
                                </CompetitionCard>
                            </div>
                        </>
                    })
                }
            </CompetitionsListContainer>

        </>
    );
};

export default ChampsPage;
