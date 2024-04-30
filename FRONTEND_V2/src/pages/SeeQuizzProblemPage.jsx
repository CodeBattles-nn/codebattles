import {useEffect, useState} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import {useLocalStorage} from "usehooks-ts";
const SeeQuizzProblemPage = () => {

    const {letter} = useParams();
    // const navigate = useNavigate();
    const [data, update] = useCachedGetAPI(`/api/problem/${letter}`);
    // const [editorText, setEditorText] = useState(null)
    // const [isLoading, setIsLoading] = useState(false);

    const [questionNumber, setQuestionNumber] = useState(0)

    const [searchParams, setSearchParams] = useSearchParams();

    const [savedAnswers, setSavedAnswers] = useLocalStorage("test-storage", {});

    useEffect(() => {
        update();
    }, []);


    useEffect(() => {
        const prevQuestion = searchParams.get("q");
        if (prevQuestion) {
            setQuestionNumber(Number.parseInt(prevQuestion))
        }

    }, []);

    useEffect(() => {

        setSearchParams({"q": questionNumber})
    }, [questionNumber]);

    const questions = [
        {
            id: 1,
            name: "Ты абоба",
            answers: [
                "Абобус",
                "Абобус 2",
                "Абобус 3",
            ]
        },
        {
            id: 12,
            name: "Ты абоб а 2",
            answers: [
                "Абобус",
                "Абобус 2",
                "Абобус 3",
            ]
        },
        {
            id: 13,
            name: "4^(0.5)",
            answers: [
                "4",
                "2",
                "1",
                "Че за",
            ]
        },
        {
            id: 133,
            name: "Готов работать за еду?",
            answers: [
                "Дв",
            ]
        },
    ]

    useEffect(() => {
        console.log(savedAnswers)
    }, [savedAnswers]);

    const onAnswerClicked = (id, text) => {
        console.log(id + " " + text)

        const newAnswers = {...savedAnswers}
        newAnswers[id] = [text]
        setSavedAnswers(newAnswers)

    }

    return (
        <>
            
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
                        <nav aria-label="Page navigation example" className="my-3">
                            <ul className="pagination justify-content-center">
                                {
                                    questions.map((_, i) => {

                                        const activeClass = i === questionNumber ? ("active") : ("")

                                        return <li key={`quizz-variant-${i}`} className={"page-item " + activeClass}>
                                            <btn className="page-link"
                                                 onClick={() => setQuestionNumber(i)}>{i + 1}</btn>
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
                        <h3 className="width-inner">{questions[questionNumber].name}</h3>

                        {
                            questions[questionNumber].answers.map((elem) => {

                                const selectedClass = savedAnswers[questions[questionNumber].id]?.includes(elem) ? ("bg-primary") : ""

                                return (
                                    <Card className={"btn btn-outline-secondary text-start " + selectedClass}
                                          key={elem.name}
                                          onClick={() => onAnswerClicked(questions[questionNumber].id, elem)}>
                                        {elem}
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
                        <button  className={"btn btn-outline-secondary justify-content-end mx-1 " + (questionNumber === questions.length - 1 && "disabled")} onClick={() => {
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
