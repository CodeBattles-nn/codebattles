import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";

const CreateChampPage = () => {

    const {id, user_id} = useParams();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    let usersFormText = "";

    const onSend = async () => {
        setIsLoading(true)
        const redirectToUsersPage = () => navigate(`/teacher/champs/`);

        if (usersFormText.trim() === "") {
            redirectToUsersPage()
            return
        }

        apiAxios.post(getApiAddress() + `/api/teacher/champs`, {name: usersFormText.trim()}).then((data) => {

            console.log(data)
        })
            .then(redirectToUsersPage)
            .finally(() => setIsLoading(false));

    }

    return (<div className="row">
            <div className="col-12">
                <div className="jumbotron theme-bg-light  p-3">
                    <h4>Добавить соревнование</h4>
                    <form className="p-3">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Введите название соревнования</label>
                            <textarea className="form-control" name="users" id="exampleFormControlTextarea1"
                                      onChange={(event) => usersFormText = event.target.value} rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-success" onClick={onSend}
                                    disabled={isLoading}>
                                Создать
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
};

export default CreateChampPage;