import {useEffect, useState} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import ProblemExample from "../components/ProblemExample.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import {useForm} from "react-hook-form";
import axios from "axios";
import LazyCodeEditor from "../components/lazy/LazyCodeEditor.jsx";
import UserLoginRequired from "../components/UserLoginRequired.jsx";

const SeeProblemPage = () => {

    const {letter} = useParams();
    const navigate = useNavigate();
    const [data, update] = useCachedGetAPI(`/api/problem/${letter}`);
    const [editorText, setEditorText] = useState(null)
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        update()
    });

    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        data.src = document.getElementsByClassName("ace_content")[0].innerText
        console.log(data)

        setEditorText(data.src)
        // alert(JSON.stringify(data))

        axios.post('http://localhost:2500/api/send', data)
            .then(() => {
                setTimeout(() => {
                    navigate("/sends")
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
                        <h2>Задача {letter}</h2>
                        <h3>{data.name}</h3>
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
                            <p>{data.description}</p>

                            <h4 className="mt-5">Входные данные</h4>
                            <p>{data.in_data}</p>

                            <h4 className="mt-5">Выходные данные</h4>
                            <p>{data.out_data}</p>
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
                            <input hidden value={letter} {...register("problem")}/>
                            <select className="form-select" {...register("cars")}>
                                {

                                    Object.keys(data.langs || {}).map(lang => {
                                        return <option key={"lang" + lang} selected
                                                       value={data.langs[lang]}>{lang}</option>
                                    })
                                }
                            </select>
                            <LazyCodeEditor
                                className="my-5 rounded-2"
                                value = {editorText || "print('Hello, world')"}
                            />

                            <button className="btn btn-success" disabled={isLoading}>
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
