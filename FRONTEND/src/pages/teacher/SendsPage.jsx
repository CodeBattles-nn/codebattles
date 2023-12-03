import React, {useState} from 'react';
import {Link} from "react-router-dom";
import If from "../../components/If";
import PageTitle from "../../components/PageTitle";

const SendsPage = () => {
    const [sends, setSends] = useState({sends: []});


    // useEffect(() => {
    //     apiAxios.get(getApiAddress() + "/api/sends").then(
    //         (r) => {
    //             console.log(r.data)
    //             setSends(r.data)
    //         }
    //     )
    // }, []);

    return <div className="jumbotron theme-bg-light p-3">
        <PageTitle title="Посылки"/>
        <h4>Посылки</h4>
        <p></p>
        <div className="table-responsive">
            <table className="table table-striped table-bordered ">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Время посылки</th>
                    <th scope="col">Задача</th>
                    <th scope="col">Баллы</th>
                    <th scope="col">Статус</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>


                {
                    [...sends.sends].map((send) => {
                        return (

                            <tr>
                                <th scope="row">{send.id}</th>
                                <td>{send.send_time}</td>
                                <td><Link
                                    to={`/problem/${send.letter}`}>{send.letter}. {send.name}</Link>
                                </td>
                                <td className="int text-center">{send.score}</td>
                                <td>{send.state}</td>
                                <td>
                                    <If
                                        condition={send.program_checked}
                                        is_true={<Link to={`/send/${send.id}`}>Вердикт</Link>}
                                    />
                                </td>

                            </tr>

                        )
                    })
                }

                </tbody>
            </table>
        </div>
    </div>

};

export default SendsPage;