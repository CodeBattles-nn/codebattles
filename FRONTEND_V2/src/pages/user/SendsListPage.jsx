import React, {useEffect} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {Link, useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import ResponsiveTable from "../../components/bootstrap/ResponsiveTable.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import {formatDate} from "../../utils/format.js";
import {useTranslation} from 'react-i18next';
import LoadingWrapper, {Loader} from "../../components/LoadingWrapper.jsx";

const SendsLoader = <>
    <p className="placeholder-glow">
        <span className="placeholder col-12"></span>
        <span className="placeholder col-9"></span>

    </p>
    <p className="placeholder-glow">
        <span className="placeholder col-12"></span>
        <span className="placeholder col-8"></span>
    </p>
</>
const SendsListPage = () => {
    const {t} = useTranslation();
    const {compId} = useParams();
    const [data, update, loading] = useCachedGetAPI(`/api/competitions/${compId}/sends`, () => {}, []);

    useEffect(() => {
        update();
    }, []);

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('sends.competitions')} url="/champs"/>
                <BreadcrumbsElement name={t('sends.submissions')}/>
            </BreadcrumbsRoot>

            <Card>
                <h2 className="mb-3">{t('sends.submissions')}</h2>
                <div className="border rounded-2 p-1">
                    <LoadingWrapper loading={loading} loader={SendsLoader}>
                        <ResponsiveTable>
                            <thead>
                            <tr>
                                <th scope="col">{t('sends.submissionNumber')}</th>
                                <th scope="col">{t('sends.submissionTime')}</th>
                                <th scope="col">{t('sends.problem')}</th>
                                <th scope="col" className="text-center">{t('sends.points')}</th>
                                <th scope="col">{t('sends.status')}</th>
                                <th scope="col">{t('sends.verdict')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map(send => {
                                return (
                                    <tr key={"send-id-" + send.id}>
                                        <th scope="row" className="">{send.id}</th>
                                        <td>{formatDate(send.createdAt)}</td>
                                        <td>
                                            <Link to={`/champs/${compId}/problems/${send?.competitionsProblems?.id}`}>
                                                {send?.competitionsProblems?.slug}. {send?.competitionsProblems?.problem.name}
                                            </Link>
                                        </td>
                                        <td className="text-center text-success">{send.score}</td>
                                        <td>{send.status}</td>
                                        <td>
                                            <Link to={`/champs/${compId}/sends/${send.id}`}>
                                                {t('sends.viewVerdict')}
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </ResponsiveTable>
                    </LoadingWrapper>
                </div>
            </Card>
        </>
    );
};

export default SendsListPage;