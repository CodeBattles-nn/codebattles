import {useEffect} from 'react';
import Card from "../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import UserLoginRequired from "../components/UserLoginRequired.jsx";

const ProblemsListPage = () => {

    const [data, update] = useCachedGetAPI("/api/problems");

    useEffect(() => {
        update();
    });

    return (
        <>
            <UserLoginRequired/>
            <Card>
                <h2 className="mb-3">Задачи</h2>
                <div className="border rounded-2 p-1">
                    <table className="table table-striped table-hover" style={{}}>
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
                                return (<tr key={"problems-page-key" + letter}>
                                    <th scope="row" className="">{letter}</th>
                                    <td><Link to={`/problems/${letter}`}>{data.problems[letter]}</Link></td>

                                </tr>)
                            })
                        }

                        </tbody>
                    </table>
                </div>

            </Card>
        </>
    );
};

export default ProblemsListPage;
