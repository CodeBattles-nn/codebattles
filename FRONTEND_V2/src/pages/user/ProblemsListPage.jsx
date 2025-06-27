import {useEffect, useState} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {Link, useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import ResponsiveTable from "../../components/bootstrap/ResponsiveTable.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import {getCssClassBySendScore} from "../../utils/format.js";
import {useTranslation} from "react-i18next";

const ProblemsListPage = () => {
    const {t} = useTranslation()

    let {compId} = useParams();

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}/problems`, () => {
    }, []);

    const [sends, updateSends] = useCachedGetAPI(`/api/competitions/${compId}/sends`, () => {
    }, []);

    const [sendsMap, setSendsMap] = useState({})

    useEffect(() => {
        update();
        updateSends()
    }, []);


    useEffect(() => {
        const localSendMap = {}

        sends.forEach(entry => {
            const compProbId = entry.competitionsProblems.id;
            const score = entry.score ?? 0;

            if (!(compProbId in localSendMap) || score > localSendMap[compProbId]) {
                localSendMap[compProbId] = score;
            }
        });

        setSendsMap(localSendMap)
        console.log(localSendMap)

    }, [sends]);

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t("problemsList.champs")} url="/champs"/>
                <BreadcrumbsElement name={t("problemsList.title")}/>
            </BreadcrumbsRoot>

            <Card>
                <h2 className="mb-3">{t("problemsList.title")}</h2>
                <div className="border rounded-2 p-1">
                    <ResponsiveTable>
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">{t("problemsList.name")}</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            data.map(data => {

                                const link_icon_css_class = (`bi-braces`)
                                const table_css_class = getCssClassBySendScore(sendsMap[data.id])

                                return (
                                    <tr key={data.id} className={table_css_class}>
                                        <th scope="row">
                                            {data.slug}
                                        </th>
                                        <td><Link to={`${data.id}`}>
                                            <i className={"bi me-2 " + link_icon_css_class}></i>
                                            {data.problem?.name}
                                        </Link></td>

                                    </tr>)
                            })
                        }

                        </tbody>
                    </ResponsiveTable>
                </div>

            </Card>
        </>
    );
};

export default ProblemsListPage;
