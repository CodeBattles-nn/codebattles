import {useEffect} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import UserLoginRequired from "../components/UserLoginRequired.jsx";
import ResponsiveTable from "../components/bootstrap/ResponsiveTable.jsx";

const ProblemsListPage = () => {

    const [data, update] = useCachedGetAPI("/api/problems");

    useEffect(() => {
        update();
    }, []);

    return (
        <>
            <UserLoginRequired/>
            <Card>
                <h2 className="mb-3">Задачи</h2>
                <div className="border rounded-2 p-1">
                    <ResponsiveTable>
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Название</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            data.problems &&
                            Object.keys(data.problems).map(letter => {
                                const is_quiz = data?.is_quizes?.[letter]
                                const link = is_quiz ? (`/problems/${letter}/quizz`) : (`/problems/${letter}`)
                                const link_icon_css_class = is_quiz ? (`bi-card-checklist`) : (`bi-braces`)

                                return (<tr key={"problems-page-key" + letter} className={data?.colors?.[letter]}>
                                    <th scope="row" className="">
                                        {letter}
                                    </th>
                                    <td><Link to={link}>
                                        <i className={"bi me-2 " + link_icon_css_class}></i>
                                        {data.problems[letter]}
                                    </Link></td>

                                </tr>)
                            })
                        }

                        </tbody>
                    </ResponsiveTable>
                </div>

            </Card>
        </>
    );
};

export default ProblemsListPage;
