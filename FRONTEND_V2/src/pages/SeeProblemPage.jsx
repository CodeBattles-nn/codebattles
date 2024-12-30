import {useEffect, useState} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import ProblemExample from "../components/ProblemExample.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import {useForm} from "react-hook-form";
import axios from "axios";
import LazyCodeEditor from "../components/lazy/LazyCodeEditor.jsx";
import UserLoginRequired from "../components/UserLoginRequired.jsx";
import Markdown from "../components/wraps/Markdown.jsx";
import constants from "../utils/consts.js";

const SeeProblemPage = () => {

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


    const {register, handleSubmit} = useForm()

    const onSubmit = (formData) => {
        formData.src = document.getElementsByClassName("ace_content")[0].innerText
        console.log(formData)

        setEditorText(formData.src)
        // alert(JSON.stringify(data))

        const defaultLang = champData?.checkers[0]?.id
        if (formData.checker === "") {
            formData.checker = defaultLang
        }

        console.log(defaultLang)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        axios.post(`/api/competitions/${compId}/send`, formData, config)
            .then(() => {
                setTimeout(() => {
                    navigate(`/champs/${compId}/sends`)
                    setIsLoading(false)
                }, 1000)
            })

        setIsLoading(true)

    }

    return (
        <>
            <UserLoginRequired/>
            <div className="row">
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <h2>Задача {'A'}</h2>
                        <h3>{data.problem?.name}</h3>
                    </Card>
                </div>
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <h3>Ограничения</h3>
                        <p>
                            Время выполнения: 1000мс
                            <br/>
                            Память: 256мб
                        </p>
                    </Card>
                </div>


            </div>
            <div className="row">
                <div className="col">
                    <Card>
                        <div>
                            <h4>Задача</h4>
                            <Markdown text={data.problem?.description}/>

                            <h4 className="mt-5">Входные данные</h4>
                            <Markdown text={data.problem?.inData}/>

                            <h4 className="mt-5">Выходные данные</h4>
                            <Markdown text={data.problem?.outData}/>
                        </div>
                    </Card>
                </div>
            </div>
            {
                (data?.examples === undefined || data?.examples?.length > 0) &&
                <div className="row">
                    <div className="col">
                        <Card>
                            <h3>Примеры</h3>
                            {
                                data?.examples?.map(example => {
                                    const in_data = example[0]
                                    const out_data = example[1]

                                    return <ProblemExample
                                        key={`example-${in_data}--${out_data}`}
                                        in_data={in_data}
                                        out_data={out_data}
                                    />
                                })
                            }
                        </Card>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col">
                    <Card>
                        <h4 className="mb-3">Отправить решение</h4>
                        <p>Вставьте код здесь</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input hidden value={id} {...register("id")}/>
                            <input hidden value={compId} {...register("compId")}/>
                            <select className="form-select" {...register("checker")}>
                                {

                                    champData?.checkers?.map(lang => {


                                        return <option key={"lang" + lang} value={lang.id}>
                                            {lang.displayName}
                                            {/*{JSON.stringify(lang)}*/}
                                        </option>
                                    })
                                }
                            </select>
                            <LazyCodeEditor
                                className="my-5 rounded-2"
                                value={editorText || "print('Hello, world')"}
                            />

                            <button className="btn btn-success" disabled={isLoading}>
                                {/*<button className="btn btn-success" disabled>*/}
                                Отправить
                                {
                                    isLoading ?
                                        (<span className="spinner-border spinner-border-sm mx-2"
                                               aria-hidden="true"></span>) :
                                        (<></>)


                                }
                            </button>
                        </form>
                    </Card>
                </div>
            </div>

        </>
    );
};

export default SeeProblemPage;
