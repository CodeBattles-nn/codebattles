import {useEffect} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {Link, useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {getCookie} from "../../utils/cookies.js";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import ResponsiveTable from "../../components/bootstrap/ResponsiveTable.jsx";
import {formatDate} from "../../utils/format.js";
import {useTranslation} from 'react-i18next';

const StatsPage = () => {
    const {t} = useTranslation();
    const {compId} = useParams();
    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}/leaderboard`);
    const [problemsData, problrmsUpdate] = useCachedGetAPI(`/api/competitions/${compId}/problems`, null, []);

    useEffect(() => {
        update();
        problrmsUpdate();
    }, []);

    const mine_user_id = getCookie("user_id");

    return (
        <>
            <UserLoginRequired/>
            <Card>
                <h2 className="mb-3">{t('stats.leaderboard')}</h2>
                <div className="border rounded-2 p-1">
                    <ResponsiveTable>
                        <thead>
                        <tr>
                            <th scope="col">{t('stats.position')}</th>
                            <th scope="col">{t('stats.user')}</th>
                            {
                                problemsData?.map(compProb => {
                                    return (
                                        <th key={"stats-letter-header" + compProb.id} scope="col">
                                            <Link to={`/champs/${compId}/problems/${compProb.id}`}>
                                                {compProb.slug}
                                            </Link>
                                        </th>
                                    )
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

                                return (
                                    <tr
                                        key={"stats-usr" + i}
                                        className={mine_user_id === "-1" ? "table-secondary" : ''}
                                    >
                                        <th scope="row">{i + 1}</th>
                                        <td>{scoreRow.userX}</td>
                                        {
                                            problemsData?.map(compProb => {
                                                return (
                                                    <td key={"stats-send" + compProb.id} scope="col">
                                                        {groupedAnswers[compProb.id]?.[0]?.maxScore}
                                                    </td>
                                                )
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

export default StatsPage;