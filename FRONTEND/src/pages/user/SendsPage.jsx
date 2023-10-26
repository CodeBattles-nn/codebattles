import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";

const SendsPage = () => {
    const [sends, setSends] = useState({sends: []});


    useEffect(() => {
        apiAxios.get(getApiAddress() + "/api/sends").then(
            (r) => {
                console.log(r.data)
                setSends(r.data)
            }
        )
    }, []);

    return <main style={{"min-height": "93vh", "background-color": "#ffe0b2"}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 col-lg-12 content-container">

                    <div className="container py-4">
                        <div className="jumbotron bg-light table-bordered table-hover p-3">
                            <h4>Посылки</h4>
                            <p></p>
                            <div className="table-responsive">
                                <table className="table table-striped">
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
                                                        {
                                                            send.program_checked ? (
                                                                <Link to={`/send/${send.id}`}>Вердикт</Link>) : (<></>)
                                                        }

                                                    </td>

                                                </tr>

                                            )
                                        })
                                    }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </main>
};

export default SendsPage;