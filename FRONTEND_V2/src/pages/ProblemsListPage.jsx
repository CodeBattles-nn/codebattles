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
                                return (<tr key={"problems-page-key" + letter} className={data?.colors?.[letter]}>
                                    <th scope="row" className="">{letter}</th>
                                    <td><Link to={`/problems/${letter}`}>{data.problems[letter]}</Link></td>

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
