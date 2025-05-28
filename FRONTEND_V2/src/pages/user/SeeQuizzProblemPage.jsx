import {useEffect, useState} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useLocalStorage} from "usehooks-ts";
import {getCookie} from "../../utils/cookies.js";
import axios from "axios";
import Markdown from "../../components/wraps/Markdown.jsx";

const SeeQuizzProblemPage = () => {

    const battle_id = getCookie("battle_id")

    const {letter} = useParams();
    const navigate = useNavigate();

    // const [editorText, setEditorText] = useState(null)
    // const [isLoading, setIsLoading] = useState(false);

    const [questionNumber, setQuestionNumber] = useState(0)
    const [data, update] = useCachedGetAPI(`/api/problem/${letter}/quiz`)

    const [searchParams, setSearchParams] = useSearchParams();

    const [savedAnswers, setSavedAnswers] = useLocalStorage(`answer-storage/?b=${battle_id}&l=${letter}`, {});

    useEffect(() => {
        update();
    }, []);

    useEffect(() => {
        return () => {
            if (localStorage.getItem(`answer-storage/?b=${battle_id}&l=${letter}-completed`)) {
                navigate("/sends")
            }
        };
    }, []);


    console.log(data)

    useEffect(() => {
        const prevQuestion = searchParams.get("q");
        if (prevQuestion) {
            setQuestionNumber(Number.parseInt(prevQuestion))
        }

    }, []);

    useEffect(() => {

        setSearchParams({"q": questionNumber})
    }, [questionNumber]);

    const questions = data.tests || [];

    useEffect(() => {
        console.log(savedAnswers)
    }, [savedAnswers]);

    const onAnswerClicked = (id, text) => {

        const newAnswers = {...savedAnswers}
        newAnswers[id] = [text]
        setSavedAnswers(newAnswers)

    }

    const onSend = () => {
        const toSendData = {
            problem: letter,
            answers: savedAnswers
        }

        axios.post("/api/send/quiz", toSendData)
            .then(() => navigate("/sends"))
            .then(() => localStorage.setItem(`answer-storage/?b=${battle_id}&l=${letter}-completed`, "true"))
    }

    return (
        <>

            <div className="row">
                <div className="col-md-6 col-sm-12 d-flex align-items-stretch">
                    <Card>
                        <h2>Задача {letter}</h2>
                        <h3>{data.name}</h3>
                        <button className="btn btn-outline-success" onClick={onSend}>
                            Отправить задание на проверку
                        </button>
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
                        <nav aria-label="Page navigation example" className="my-3">
                            <ul className="pagination justify-content-center">
                                {
                                    questions.map((question, i) => {

                                        const activeClass = i === questionNumber ? ("active") : ("")

                                        const buttonClass = savedAnswers[question.id] ? ("text-warning") : ("")

                                        return <li key={`quizz-variant-${i}`} className={"page-item " + activeClass}>
                                            <button className={"page-link " + buttonClass}
                                                    onClick={() => setQuestionNumber(i)}>{i + 1}</button>
                                        </li>
                                    })
                                }


                            </ul>
                        </nav>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Card>
                        <h3 className="width-inner">№{questionNumber + 1}</h3>
                        <small className="width-inner me-3">/{questions.length}</small>
                        <Markdown text={questions[questionNumber]?.name}/>

                        {
                            questions[questionNumber]?.answers?.map((elem) => {

                                const selectedClass = savedAnswers[questions[questionNumber].id]?.includes(elem) ? ("bg-primary") : ""

                                return (
                                    <Card className={"btn btn-outline-secondary text-start " + selectedClass}
                                          key={elem.name}
                                          onClick={() => onAnswerClicked(questions[questionNumber].id, elem)}>
                                        <Markdown text={elem}/>
                                    </Card>
                                )
                            })
                        }


                        <button
                            className={"btn btn-outline-secondary justify-content-end mx-1 " + (questionNumber === 0 && "disabled")}
                            onClick={() => {
                                setQuestionNumber(questionNumber - 1)
                            }}>Предыдущий
                        </button>
                        <button
                            className={"btn btn-outline-secondary justify-content-end mx-1 " + (questionNumber === questions.length - 1 && "disabled")}
                            onClick={() => {
                                if (questionNumber === questions.length) {
                                    // console.log(savedAnswers)
                                }

                                setQuestionNumber(questionNumber + 1)
                            }
                            }>Следующий
                        </button>

                    </Card>
                </div>
            </div>

        </>
    );
};

export default SeeQuizzProblemPage;
