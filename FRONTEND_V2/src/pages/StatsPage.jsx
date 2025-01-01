import {useEffect} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link, useParams} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import {getCookie} from "../utils/cookies.js";
import UserLoginRequired from "../components/UserLoginRequired.jsx";
import ResponsiveTable from "../components/bootstrap/ResponsiveTable.jsx";
import log from "eslint-plugin-react/lib/util/log.js";
import {formatDate} from "../utils/format.js";

const StatsPage = () => {

    const {compId} = useParams()

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}/leaderboard`);
    const [problemsData, problrmsUpdate] = useCachedGetAPI(`/api/competitions/${compId}/problems`, null, []);

    useEffect(() => {
        update();
        problrmsUpdate()
    }, []);

    const mine_user_id = getCookie("user_id")
    // console.log(mine_user_id)

    return (
        <>
            <UserLoginRequired/>
            <Card>
                <h2 className="mb-3">Рейтинг</h2>
                <div className="border rounded-2 p-1">
                    <ResponsiveTable>
                        <thead>

                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Пользователь</th>
                            {
                                problemsData?.map(compProb => {
                                    return <th key={"stats-letter-header" + compProb.id} scope="col"><Link
                                        to={`/problems/${compProb.id}`}>{compProb.slug}</Link>
                                    </th>
                                })
                            }
                            <th scope="col">Всего</th>
                            <th scope="col">Посл. Посылка</th>
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

                                // console.log(user)
                                console.log(data.score)

                                return (
                                    <tr key={"stats-usr" + i}
                                        className={"-1" === mine_user_id ? ("table-secondary") : ('')}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{scoreRow.userId}</td>
                                        {/*<td>-1</td>*/}
                                        {
                                            problemsData?.map(compProb => {

                                                console.log(compProb)

                                                return <td key={"stats-send" + compProb.id} scope="col">
                                                    {groupedAnswers[compProb.id]?.[0]?.maxScore}
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

export default StatsPage;
