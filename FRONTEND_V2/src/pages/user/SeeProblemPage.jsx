import {useEffect, useState} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import ProblemExample from "../../components/ProblemExample.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useForm} from "react-hook-form";
import axios from "axios";
import LazyCodeEditor from "../../components/lazy/LazyCodeEditor.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import Markdown from "../../components/wraps/Markdown.jsx";
import constants from "../../utils/consts.js";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import {useTranslation} from 'react-i18next';
import {axiosInstance} from "../../utils/settings.js";

const SeeProblemPage = () => {
    const {t} = useTranslation();
    const lastChecker = localStorage.getItem("lastChecker") || "";

    const {compId, id} = useParams();
    const navigate = useNavigate();
    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}/problems/${id}`);
    const [champData, champUpdate] = useCachedGetAPI(`/api/competitions/${compId}`);
    const [editorText, setEditorText] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        update();
        champUpdate();
    }, []);

    const {register, handleSubmit, setValue} = useForm(
        {
            defaultValues: {
                checker: lastChecker
            }
        }
    )

    const onSubmit = (formData) => {
        formData.src = document.getElementsByClassName("ace_content")[0].innerText
        console.log(formData)

        setEditorText(formData.src)

        const defaultLang = champData?.checkers[0]?.id
        if (formData.checker === "") {
            formData.checker = defaultLang
        }

        console.log(defaultLang)
        axiosInstance.post(`/api/competitions/${compId}/send`, formData)
            .then(() => {
                setTimeout(() => {
                    navigate(`/champs/${compId}/sends`)
                    setIsLoading(false)
                }, 1000)
            })

        setIsLoading(true)
        localStorage.setItem("lastChecker", formData.checker);
    }

    useEffect(() => {
        const savedChecker = localStorage.getItem("lastChecker");
        if (savedChecker) {
            setValue("checker", savedChecker);
        }
    }, [champData]);

    return (
        <>
            <UserLoginRequired/>

            <div className="row">
                <div className="col">
                    <BreadcrumbsRoot>
                        <BreadcrumbsElement name={t('seeProblem.competitions')} url="/champs"/>
                        <BreadcrumbsElement name={t('seeProblem.problems')} url={`/champs/${compId}/problems`} active={true}/>
                        <BreadcrumbsElement name={data.slug} active={true}/>
                    </BreadcrumbsRoot>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <h2>{data.slug} </h2>
                        <h3>{data.problem?.name}</h3>
                    </Card>
                </div>
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <h3>{t('seeProblem.constraints')}</h3>
                        <p>
                            {t('seeProblem.executionTime')}: 1000{t('seeProblem.ms')}
                            <br/>
                            {t('seeProblem.memory')}: 256{t('seeProblem.mb')}
                        </p>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Card>
                        <div>
                            <h4>{t('seeProblem.problem')}</h4>
                            <Markdown text={data.problem?.description}/>

                            <h4 className="mt-5">{t('seeProblem.inputData')}</h4>
                            <Markdown text={data.problem?.inData}/>

                            <h4 className="mt-5">{t('seeProblem.outputData')}</h4>
                            <Markdown text={data.problem?.outData}/>
                        </div>
                    </Card>
                </div>
            </div>

            {(JSON.parse(data?.problem?.examples || "[]").length > 0) &&
                <div className="row">
                    <div className="col">
                        <Card>
                            <h3>{t('seeProblem.examples')}</h3>
                            {JSON.parse(data?.problem?.examples || "[]").map(example => {
                                const in_data = example.in
                                const out_data = example.out

                                return <ProblemExample
                                    key={`example-${in_data}--${out_data}`}
                                    in_data={in_data}
                                    out_data={out_data}
                                />
                            })}
                        </Card>
                    </div>
                </div>
            }

            <div className="row">
                <div className="col">
                    <Card>
                        <h4 className="mb-3">{t('seeProblem.submitSolution')}</h4>
                        <p>{t('seeProblem.pasteCode')}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input hidden value={id} {...register("id")}/>
                            <input hidden value={compId} {...register("compId")}/>
                            <select className="form-select" {...register("checker")}>
                                {champData?.checkers?.map(lang => (
                                    <option key={"lang" + lang} value={lang.id}>
                                        {lang.displayName}
                                    </option>
                                ))}
                            </select>
                            <LazyCodeEditor
                                className="my-5 rounded-2"
                                value={editorText || "print('Hello, world')"}
                            />

                            <button className="btn btn-success" disabled={isLoading}>
                                {t('seeProblem.submit')}
                                {isLoading && (
                                    <span className="spinner-border spinner-border-sm mx-2" aria-hidden="true"></span>
                                )}
                            </button>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default SeeProblemPage;