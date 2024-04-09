import {useEffect, useState} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import UserLoginRequired from "../components/UserLoginRequired.jsx";

const SeeQuizzProblemPage = () => {

    const {letter} = useParams();
    // const navigate = useNavigate();
    const [data, update] = useCachedGetAPI(`/api/problem/${letter}`);
    // const [editorText, setEditorText] = useState(null)
    // const [isLoading, setIsLoading] = useState(false);

    const [questionNumber, setQuestionNumber] = useState(0)

    const [searchParams, setSearchParams] = useSearchParams();

    // const [savedAnswers, setSavedAnswers] = useState({});

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
            id: 1,
            name: "Ты абоб а 2",
            answers: [
                "Абобус",
                "Абобус",
                "Абобус",
                "Абобус",
                "Абобус 2",
                "Абобус 3",
            ]
        }
    ]


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
                        <nav aria-label="Page navigation example" className="my-3">
                            <ul className="pagination justify-content-center">
                                {
                                    questions.map((_, i) => {
                                        return <li key={`quizz-variant-${i}`} className="page-item"><a className="page-link" href="#">{i + 1}</a>
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
                        <h3 className="width-inner">{questionNumber + 1}</h3>
                        <small className="width-inner">/{questions.length} </small>
                        <h3 className="width-inner">{questions[questionNumber].name}</h3>

                        {
                            questions[questionNumber].answers.map((elem) => {
                                return (
                                    <Card className="btn btn-outline-secondary text-start" key={elem.name}>
                                        {elem}
                                    </Card>
                                )
                            })
                        }


                        <button className="btn btn-outline-secondary justify-content-end mx-1" onClick={() => {
                            setQuestionNumber(questionNumber - 1)
                        }}>Предыдущий
                        </button>
                        <button className="btn btn-outline-secondary justify-content-end mx-1" onClick={() => {
                            if (questionNumber === questions.length){
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
