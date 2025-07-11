import Card from "../../../components/bootstrap/Card.jsx";
import ResponsiveTable from "../../../components/bootstrap/ResponsiveTable.jsx";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {formatDate} from "../../../utils/format.js";
import {getCookie} from "../../../utils/cookies.js";
import {useTranslation} from 'react-i18next';

export const AdminChampsDetailRatingPage = () => {
    const { t } = useTranslation();

    const {compId} = useParams()

    const mine_user_id = getCookie("user_id")

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}/leaderboard`);
    const [problemsData, problrmsUpdate] = useCachedGetAPI(`/api/competitions/${compId}/problems`, null, []);

    useEffect(() => {
        update();
        problrmsUpdate()
    }, []);


    useEffect(() => {
        update()
    }, []);

    console.debug(data)

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminChamps.competitions')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <h2 className="mb-3">{t('adminChamps.rating')}</h2>
                <div className="border rounded-2 p-1">
                    <ResponsiveTable>
                        <thead>

                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">{t('stats.user')}</th>
                            {
                                problemsData?.map(compProb => {
                                    return <th key={"stats-letter-header" + compProb.id} scope="col">
                                        <small
                                            to={`/problems/${compProb.id}`}

                                        >{compProb.slug}
                                        </small>
                                    </th>
                                })
                            }
                            <th scope="col">{t('stats.total')}</th>
                            <th scope="col">{t('stats.lastSubmission')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data?.score?.map((scoreRow, i) => {
                                const groupedAnswers = Object.groupBy(
                                    data.data[scoreRow.userId],
                                    ({competitionproblemId}) => competitionproblemId
                                );

                                // const groupedAnswers = {}
                                // const user = 0

                                // console.debug(user)
                                console.debug(data.score)

                                return (
                                    <tr key={"stats-usr" + i}
                                        className={"-1" === mine_user_id ? ("table-secondary") : ('')}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{scoreRow.userX} (id={scoreRow.userId})</td>
                                        {/*<td>-1</td>*/}
                                        {
                                            problemsData?.map(compProb => {

                                                console.debug(compProb)

                                                return <td key={"stats-send" + compProb.id} scope="col">
                                                    <Link
                                                        to={`answer?userId=${scoreRow.userId}&compprobId=${compProb.id}`}
                                                        target="_blank"
                                                    >
                                                        {groupedAnswers[compProb.id]?.[0]?.maxScore}
                                                    </Link>
                                                </td>
                                            })
                                        }
                                        <td>{scoreRow.score}</td>
                                        <td>{formatDate(scoreRow.time)}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </ResponsiveTable>
                </div>

            </Card>
        </>
    );
};
