import { useTranslation } from 'react-i18next';
import Card from "../../components/bootstrap/Card.jsx";
import ResponsiveTable from "../../components/bootstrap/ResponsiveTable.jsx";

const StatusCodesPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Card>
                <h3 className="mb-4">{t('statusCodes.title')}</h3>
                <ResponsiveTable>
                    <thead>
                    <tr>
                        <th scope="col">{t('statusCodes.tableHeaders.name')}</th>
                        <th scope="col">{t('statusCodes.tableHeaders.reason')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="table-danger theme-text-dark">
                        <th scope="row">{t('statusCodes.statusCodes.WRONG_ANSWER.name')}</th>
                        <td>{t('statusCodes.statusCodes.WRONG_ANSWER.description')}</td>
                    </tr>
                    <tr className="table-success theme-text-dark">
                        <th scope="row">{t('statusCodes.statusCodes.SUCCESS.name')}</th>
                        <td>{t('statusCodes.statusCodes.SUCCESS.description')}</td>
                    </tr>
                    <tr className="table-info theme-text-dark">
                        <th scope="row">{t('statusCodes.statusCodes.RUNTIME_ERROR.name')}</th>
                        <td>{t('statusCodes.statusCodes.RUNTIME_ERROR.description')}</td>
                    </tr>
                    <tr className="table-info theme-text-dark">
                        <th scope="row">{t('statusCodes.statusCodes.COMPILATION_ERROR.name')}</th>
                        <td>{t('statusCodes.statusCodes.COMPILATION_ERROR.description')}</td>
                    </tr>
                    <tr className="table-warning theme-text-dark">
                        <th scope="row">{t('statusCodes.statusCodes.TIME_LIMIT.name')}</th>
                        <td>{t('statusCodes.statusCodes.TIME_LIMIT.description')}</td>
                    </tr>
                    <tr className="table-active undefined">
                        <th scope="row">{t('statusCodes.statusCodes.NOT_EXECUTED.name')}</th>
                        <td>{t('statusCodes.statusCodes.NOT_EXECUTED.description')}</td>
                    </tr>
                    </tbody>
                </ResponsiveTable>
            </Card>
        </>
    );
};

export default StatusCodesPage;