import Card from "../../../../components/bootstrap/Card.jsx";
import ResponsiveTable from "../../../../components/bootstrap/ResponsiveTable.jsx";
import useCachedGetAPI from "../../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../../components/AdminHeader.jsx";
import {DeleteButton} from "../../../../components/DeleteButton.jsx";
import {useTranslation} from 'react-i18next';

export const AdminChampsDetailProblemsPage = () => {
    const { t } = useTranslation();

    let {compId} = useParams();

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}/problems`, () => {
    }, []);

    useEffect(() => {
        update();
    }, []);

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminChamps.competitions')}/>
            </BreadcrumbsRoot>

            <AdminHeader />

            <Card>
                <h2 className="mb-3">{t('adminProblems.problems')}</h2>
                <div className="border rounded-2 p-1">
                    <ResponsiveTable>
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">{t('adminProblems.name')}</th>
                            <th scope="col">***</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            data.map(data => {

                                const link_icon_css_class = (`bi-braces`)

                                return (
                                    <tr key={data.id} className="">
                                        <th scope="row" className="">
                                            {data.slug}
                                        </th>
                                        <td><Link to={`${data.id}`}>
                                            <i className={"bi me-2 " + link_icon_css_class}></i>
                                            {data.problem?.name}
                                        </Link></td>
                                        <td>
                                            <DeleteButton url={`/api/competitionsProblems/${data.id}`} />
                                            {" "}
                                            <Link to={`${data.id}/edit`} className="btn btn-secondary mx-2" >{t('adminProblems.edit')}</Link>
                                        </td>

                                    </tr>)
                            })
                        }

                        </tbody>
                    </ResponsiveTable>
                </div>

            </Card>

            <Card>
                <Link to="link"> {t('adminProblems.createProblem')}</Link>
            </Card>
        </>
    );
};
