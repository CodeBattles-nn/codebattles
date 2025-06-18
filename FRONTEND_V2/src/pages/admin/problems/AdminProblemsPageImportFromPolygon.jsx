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

export const AdminProblemsPageImportFromPolygon = () => {
    const navigate = useNavigate()

    const {register, handleSubmit, reset} = useForm();

    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);

    const [problemJSON, setProblemJSON] = useState({})

    const onAddOnPlatform = () => {
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        axios.post('/api/problems', problemJSON, conf)
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
                <BreadcrumbsElement name="Задачи" url="/admin/problems"/>
                <BreadcrumbsElement name="Импорт из Polygon"/>
            </BreadcrumbsRoot>

            <AdminHeader />

            <Card>
                <h2 className="mb-3">Импорт задачи из 
                    <a href="https://polygon.codeforces.com/" target="_blank" rel="noreferrer">Polygon</a></h2>
                <Card>
                    <p>Загрузите zip файл из Polygon.</p>
                    <p>Problems → (выберите нужную ) → Packages → Create package (Full)</p>
                    <p>Скачайте архив после создания</p>
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
                            Загрузить и просмотреть
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
                            Очистить
                        </button>
                    </div>
                </form>
                {
                    error && <div className="alert alert-danger">
                        Ошибка обработки архива
                    </div>
                }
                {
                    done && <>
                        <div className="alert alert-success">
                            Архив успешно обработан. (Найдена задача &ldquo;{problemJSON.name}&ldquo;)
                        </div>
                        <button className="btn btn-success" onClick={onAddOnPlatform}>Добавить задачу на платформу</button>
                    </>
                }

            </Card>

        </>
    );
};
