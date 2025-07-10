import {useEffect, useState} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import ProblemExample from "../../components/ProblemExample.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useForm} from "react-hook-form";
import LazyCodeEditor from "../../components/lazy/LazyCodeEditor.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import Markdown from "../../components/wraps/Markdown.jsx";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import {useTranslation} from 'react-i18next';
import {axiosInstance} from "../../utils/settings.js";
import LoadingWrapper, {SingleLineBigLoader, SingleLineMediumLoader} from "../../components/LoadingWrapper.jsx";

const SeeProblemPage = () => {
    const {t} = useTranslation();
    const lastChecker = localStorage.getItem("lastChecker") || "";

    const {compId, id} = useParams();
    const navigate = useNavigate();
    const [data, update, loading] = useCachedGetAPI(`/api/competitions/${compId}/problems/${id}`);
    const [champData, champUpdate] = useCachedGetAPI(`/api/competitions/${compId}`);
    const [editorText, setEditorText] = useState("print('Hello, world')")
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
        console.debug(formData)

        setEditorText(formData.src)

        const defaultLang = champData?.checkers[0]?.id
        if (formData.checker === "") {
            formData.checker = defaultLang
        }

        console.debug(defaultLang)
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            setEditorText(content);
        };
        reader.readAsText(file);
    };

    return (
        <>
            <UserLoginRequired/>

            <div className="row">
                <div className="col">
                    <BreadcrumbsRoot>
                        <BreadcrumbsElement name={t('seeProblem.competitions')} url="/champs"/>
                        <BreadcrumbsElement name={t('seeProblem.problems')} url={`/champs/${compId}/problems`}
                                            active={true}/>
                        <BreadcrumbsElement name={data.slug} active={true}/>
                    </BreadcrumbsRoot>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <LoadingWrapper loading={loading} loader={SingleLineBigLoader}>
                            <h2>{data.slug} </h2>
                        </LoadingWrapper>
                        <LoadingWrapper loading={loading} loader={SingleLineMediumLoader}>
                            <h3>{data.problem?.name}</h3>
                        </LoadingWrapper>

                    </Card>
                </div>
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <LoadingWrapper loading={loading}>
                            <h3>{t('seeProblem.constraints')}</h3>
                            <p>
                                {t('seeProblem.executionTime')}: 1000{t('seeProblem.ms')}
                                <br/>
                                {t('seeProblem.memory')}: 256{t('seeProblem.mb')}
                            </p>
                        </LoadingWrapper>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Card>
                        <div>
                            <h4>{t('seeProblem.problem')}</h4>
                            <LoadingWrapper loading={loading} loader={SingleLineMediumLoader}>
                                <Markdown text={data.problem?.description}/>
                            </LoadingWrapper>

                            <h4 className="mt-5">{t('seeProblem.inputData')}</h4>
                            <LoadingWrapper loading={loading} loader={SingleLineMediumLoader}>
                                <Markdown text={data.problem?.inData}/>
                            </LoadingWrapper>

                            <h4 className="mt-5">{t('seeProblem.outputData')}</h4>
                            <LoadingWrapper loading={loading} loader={SingleLineMediumLoader}>
                                <Markdown text={data.problem?.outData}/>
                            </LoadingWrapper>
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
                            <LoadingWrapper loading={loading} loader={SingleLineBigLoader}>
                                <select className="form-select" {...register("checker")}>
                                    {champData?.checkers?.map(lang => (
                                        <option key={"lang" + lang} value={lang.id}>
                                            {lang.displayName}
                                        </option>
                                    ))}
                                </select>
                            </LoadingWrapper>
                            <LoadingWrapper loading={loading}>
                                <LazyCodeEditor
                                    className="my-5 rounded-2"
                                    value={editorText}
                                    onChange={setEditorText}
                                />
                            </LoadingWrapper>

                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">{t("seeProblem.orFileUpload")}</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    onChange={handleFileUpload}
                                />
                            </div>

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