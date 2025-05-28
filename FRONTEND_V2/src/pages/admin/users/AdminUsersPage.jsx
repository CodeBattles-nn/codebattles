import React, {useEffect} from 'react';
import Card from "../../../components/bootstrap/Card.jsx";
import useGetAPI from "../../../hooks/useGetAPI.js";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {Link} from "react-router-dom";


export function AdminUsersPage() {

    const [users, update] = useGetAPI("/api/users", () => {
    }, [])

    useEffect(() => {
        update()
    }, []);

    return (
        <>
            <AdminHeader />

            <Card>
                <h3>Пользователи</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Имя</th>
                        <th scope="col">login</th>
                        <th scope="col">...</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(elem => {
                            return <tr id={elem.id} key={elem.id}>
                                <th scope="row">{elem.id}</th>
                                <td>ИМЯНЕДОСТУПНО</td>
                                <td>{elem.username}</td>
                                <td>
                                    <button className="btn btn-warning" disabled>Изменить</button>
                                </td>
                            </tr>
                        })
                    }

                    </tbody>
                </table>
            </Card>

            <Card>
                <Link to="/admin/users/create" className="btn btn-success">Добавить</Link>
            </Card>


        </>
    );
}
