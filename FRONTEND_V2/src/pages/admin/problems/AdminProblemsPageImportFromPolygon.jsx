import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import Card from "../../../components/bootstrap/Card.jsx";
import constants from "../../../utils/consts.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {polygonProcessStatuses, processPolygonFile} from "../../../services/polygon.js";
import { useTranslation } from 'react-i18next';
import {axiosInstance} from "../../../utils/settings.js";

export const AdminProblemsPageImportFromPolygon = () => {
    const navigate = useNavigate()

    const {register, handleSubmit, reset} = useForm();

    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);

    const [problemJSON, setProblemJSON] = useState({})

    const { t } = useTranslation();

    const onAddOnPlatform = () => {
        axiosInstance.post('/api/problems', problemJSON)
            .then(() => navigate("/admin/champs"))
    };


    const onSubmit = async (data) => {
        const file = data.zipFile[0];
        if (!file) return;

        const [status, config] = await processPolygonFile(file)
        if (status === polygonProcessStatuses.ERROR) {
            setError(true)
            setDone(false);
        } else {
            setError(false)
            setDone(true);

            setProblemJSON(config)
        }

        console.log(config)
    };

    return (
        <>
            <UserLoginRequired />

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminProblems.problems')} url="/admin/problems"/>
                <BreadcrumbsElement name={t('adminProblems.importFromPolygon')}/>
            </BreadcrumbsRoot>

            <AdminHeader />

            <Card>
                <h2 className="mb-3">{t('adminProblems.importFromPolygon')} 
                    <a href="https://polygon.codeforces.com/" target="_blank" rel="noreferrer">Polygon</a></h2>
                <Card>
                    <p>{t('adminProblems.uploadAndPreview')}</p>
                    <p>Problems → ({t("adminProblems.select")}) → Packages → Create package (Linux)</p>
                    <p>{t("adminProblems.downloadArhive")}</p>
                </Card>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                    <div className="mb-3">
                        <input
                            type="file"
                            accept=".zip"
                            {...register('zipFile', {required: true})}
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {t('adminProblems.uploadAndPreview')}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setDone(false)
                                setError(false);
                            }}
                            className="btn btn-outline-secondary"
                        >
                            {t('adminProblems.clear')}
                        </button>
                    </div>
                </form>
                {
                    error && <div className="alert alert-danger">
                        {t('adminProblems.errorProcessingArchive')}
                    </div>
                }
                {
                    done && <>
                        <div className="alert alert-success">
                            {t('adminProblems.archiveProcessed', { name: problemJSON.name })}
                        </div>
                        <button className="btn btn-success" onClick={onAddOnPlatform}>{t('adminProblems.addProblemToPlatform')}</button>
                    </>
                }

            </Card>

        </>
    );
};
