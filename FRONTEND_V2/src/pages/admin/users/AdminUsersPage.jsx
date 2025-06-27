import React, {useEffect} from 'react';
import Card from "../../../components/bootstrap/Card.jsx";
import useGetAPI from "../../../hooks/useGetAPI.js";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';


export function AdminUsersPage() {

    const [users, update] = useGetAPI("/api/users", () => {
    }, [])

    const { t } = useTranslation();

    useEffect(() => {
        update()
    }, []);

    return (
        <>
            <AdminHeader />

            <Card>
                <h3>{t('adminUsers.users')}</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('adminUsers.name')}</th>
                        <th scope="col">{t('adminUsers.login')}</th>
                        <th scope="col">...</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(elem => {
                            return <tr id={elem.id} key={elem.id}>
                                <th scope="row">{elem.id}</th>
                                <td>{t('adminUsers.nameUnavailable')}</td>
                                <td>{elem.username}</td>
                                <td>
                                    <button className="btn btn-warning" disabled>{t('adminUsers.edit')}</button>
                                </td>
                            </tr>
                        })
                    }

                    </tbody>
                </table>
            </Card>

            <Card>
                <Link to="/admin/users/create" className="btn btn-success">{t('adminUsers.add')}</Link>
            </Card>


        </>
    );
}
