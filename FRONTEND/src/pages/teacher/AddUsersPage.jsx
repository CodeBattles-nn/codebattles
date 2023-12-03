import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";
import {toast} from "react-toastify";
import {nonImplemeneted} from "../../utils/toast";

const ChampsPage = () => {

    const {id, user_id} = useParams();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    let usersFormText = "";

    const onSend = async () => {
        setIsLoading(true)
        const redirectToUsersPage = () => navigate(`/teacher/champs/${id}/users`);

        if (usersFormText.trim() === "") {
            redirectToUsersPage()
            return
        }

        apiAxios.post(getApiAddress() + `/api/teacher/champs/${id}/add_users`, {users: usersFormText.trim()}).then((data) => {

            console.log(data)
        })
            .then(redirectToUsersPage)
            .finally(() => setIsLoading(false));

    }

    return (<div className="row">
            <div className="col-12">
                <div className="jumbotron theme-bg-light  p-3">
                    <h4>Добавить пользователей</h4>
                    <form className="p-3">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Введите пользователей (Каждый пользователь на
                                новой строке)</label>
                            <textarea className="form-control" name="users" id="exampleFormControlTextarea1"
                                      onChange={(event) => usersFormText = event.target.value} rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-success" onClick={onSend}
                                    disabled={isLoading}>
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
};

export default ChampsPage;