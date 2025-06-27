import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {CompetitionCard} from "../../components/CompetitionCard.jsx";
import {competitionStatuses, getCompetitionStatusByDates} from "../../utils/competitionStatuses.js";
import CompetitionsListContainer from "../../components/CompetitionsListContainer.jsx";
import {useTranslation} from "react-i18next";

const ChampsPage = () => {
    const {t} = useTranslation()

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
                <BreadcrumbsElement name={t("userChamps.title")}/>
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
                                            <Link to={`/champs/${elem.id}/problems`} className="btn btn-success">{t("Enter")}</Link>
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
