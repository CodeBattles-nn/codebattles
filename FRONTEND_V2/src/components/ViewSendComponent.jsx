import React from 'react';
import LazySyntaxHighlight from "./lazy/LazySyntaxHightlight.jsx";
import ResponsiveTable from "./bootstrap/ResponsiveTable.jsx";
import Card from "./bootstrap/Card.jsx";
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';

export const ViewSendComponent = ({data}) => {
    const { t } = useTranslation();

    const colorsByResult = {
        "WRONG_ANSWER": "table-danger",
        "SUCCESS": "table-success",
        "RUNTIME_ERROR": "table-info",
        "COMPILATION_ERROR": "table-info",
        "TIME_LIMIT": "table-warning",
        "NOT_EXECUTED": "table-active",
    }

    const tests = JSON.parse(data?.result || "{}")

    return (
        <Card>
            <h3>{t('viewSend.analysis')}</h3>
            <p><b>{t('viewSend.language')}:</b> {data?.checker?.displayName}</p>
            <b>{t('viewSend.sourceCode')}:</b>
            <LazySyntaxHighlight lang={data?.checker?.languageHighlightName}>
                {data.code}
            </LazySyntaxHighlight>
            <div className="my-4"></div>
            <ResponsiveTable>
                <thead>
                <tr>
                    <th scope="col">{t('viewSend.testNumber')}</th>
                    <th scope="col">{t('viewSend.timeMs')}</th>
                    <th scope="col">{t('viewSend.verdict')}</th>
                    <th scope="col">{t('viewSend.output')}</th>
                </tr>
                </thead>
                <tbody className="theme-text-dark">
                {
                    tests?.results?.map((test, i) => {
                        return (
                            <tr className={colorsByResult[test.msg]} key={"see-send-test-id-" + test.id}>
                                <th scope="row">{i + 1}</th>
                                <td>{test.time}</td>
                                <td>{t(`viewSend.verdictTypes.${test.msg}`)}</td>
                                <td><p className="text-lines">{test.out}</p></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </ResponsiveTable>
        </Card>
    );
};

ViewSendComponent.propTypes = {
    data: PropTypes.object,
}