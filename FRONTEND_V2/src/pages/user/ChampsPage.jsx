import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {CompetitionCard} from "../../components/CompetitionCard.jsx";
import {competitionStatuses, getCompetitionStatusByDates} from "../../utils/competitionStatuses.js";
import CompetitionsListContainer from "../../components/CompetitionsListContainer.jsx";
import {useTranslation} from "react-i18next";
import Card from "../../components/bootstrap/Card.jsx";
import axios from "axios";
import constants from "../../utils/consts.js";

const ChampsPage = () => {
    const {t} = useTranslation()

    const [data, update] = useCachedGetAPI("/api/competitions/me", () => {
    }, []);
    const [publicChamps, updatePublicChamps] = useCachedGetAPI("/api/competitions/public", () => {
    }, []);

    useEffect(() => {
        update()
        updatePublicChamps()
    }, []);

    const navigate = useNavigate()

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
                                            <Link to={`/champs/${elem.id}/problems`}
                                                  className="btn btn-success">{t("Enter")}</Link>
                                        </>}
                                </CompetitionCard>
                            </div>
                        </>
                    })
                }
            </CompetitionsListContainer>

            <Card>
                <h4>
                    Public champs
                </h4>
            </Card>

            <CompetitionsListContainer>
                {
                    publicChamps?.map(elem => {
                        const status = getCompetitionStatusByDates(elem.startedAt, elem.endedAt)

                        const onClick = () => {
                            const conf = {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
                                }
                            }

                            axios.post(`/api/competitions/${elem.id}/publicJoin`, {}, conf).then(
                                () => {
                                    update()
                                    navigate(`/champs/${elem.id}/problems`);
                                }
                            )


                        }

                        if (data.some(item => item.id === elem.id)) return

                        return <>
                            <div className='col d-flex align-items-stretch'>
                                <CompetitionCard
                                    key={elem.id}
                                    id={elem.id}
                                    name="11111"
                                    startedAt={elem.startedAt}
                                    endedAt={elem.endedAt}
                                    description={elem.description}>
                                    {
                                        status === competitionStatuses.IN_PROGRESS &&
                                        <>
                                            <button className="btn btn-outline-primary"
                                                    onClick={onClick}>{t("join")}</button>
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
