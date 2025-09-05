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
import {axiosInstance} from "../../utils/settings.js";
import LoadingWrapper from "../../components/LoadingWrapper.jsx";

const ChampsPage = () => {
    const {t} = useTranslation()

    const [data, update, champsLoading] = useCachedGetAPI("/api/competitions/me", () => {
    }, []);

    const [posts, updatePosts, loadingPosts] = useCachedGetAPI("/api/posts/main", () => {
    }, []);

    const [publicChamps, updatePublicChamps, publicChampsLoading] = useCachedGetAPI("/api/competitions/public", () => {
    }, []);

    useEffect(() => {
        update()
        updatePosts()
        updatePublicChamps()
    }, []);

    const navigate = useNavigate()

    console.debug(data)

    return (
        <>
          <Card>
            <p className="my-2">
              {t("posts.posts")}
            </p>
          </Card>

            <UserLoginRequired/>

          <LoadingWrapper loading={publicChampsLoading}>
            <CompetitionsListContainer>
              {
                posts.map((post)=>{
                  return <div key={post.id} className='col d-flex align-items-stretch'>
                    <Card>
                      <h5>{post.title}</h5>
                      <Link to={`/posts/${post.id}`} className="btn btn-outline-primary">{t("posts.read")}</Link>
                    </Card>
                  </div>
                })
              }
            </CompetitionsListContainer>
          </LoadingWrapper>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t("userChamps.title")}/>
            </BreadcrumbsRoot>

            <LoadingWrapper loading={champsLoading}>
                <CompetitionsListContainer>

                    {data?.map(elem => {
                        const status = getCompetitionStatusByDates(elem.startedAt, elem.endedAt)

                        return <>
                            <div className='col d-flex align-items-stretch'>
                                <CompetitionCard
                                    key={elem.id}
                                    id={elem.id}
                                    name={elem.name}
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
                    })}
                </CompetitionsListContainer>
            </LoadingWrapper>

            <Card>
                <p className="my-2">
                    {t("userChamps.publicComp")}
                </p>
            </Card>

            <LoadingWrapper loading={publicChampsLoading}>
                <CompetitionsListContainer>
                    {
                        publicChamps?.map(elem => {
                            const status = getCompetitionStatusByDates(elem.startedAt, elem.endedAt)

                            const onClick = () => {
                                axiosInstance.post(`/api/competitions/${elem.id}/publicJoin`).then(
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
            </LoadingWrapper>

        </>
    );
};

export default ChampsPage;
