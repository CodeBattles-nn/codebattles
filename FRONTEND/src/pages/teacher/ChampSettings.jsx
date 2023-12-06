import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";
import {toast} from "react-toastify";
import {nonImplemeneted} from "../../utils/toast";

const ChampsPage = () => {

    const {id, user_id} = useParams();

    let problem_letter = "A";
    let problem_id = 0;

    const [champVersion, setChampVersion] = useState(0);

    const OnSetNewProblem = () => {
        apiAxios.post(
            getApiAddress() + `/api/teacher/champs/${id}`,
            {
                problem: problem_letter,
                problem_id: problem_id
            }
        )
            .then((data) => {
                setChampVersion(champVersion + 1);
                toast.success("Успешно!")
            })
    };

    useEffect(() => {
        apiAxios.get(getApiAddress() + `/api/teacher/champs/${id}`).then(
            (data) => {
                setChamps(data.data)
                console.log(data)
            })
    }, [champVersion]);


    const [champs, setChamps] = useState({});


    const [deleteModalText, setDeleteModalText] = useState("")

    return (
        <div className="row">
            <div className="col-12">
                <div className="jumbotron theme-bg-light  p-3">
                    <h4>Соревнование <b>{champs.name} </b>| Настройки</h4>
                    <div>
                        <button className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">Удалить</button>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Удаление соревнования <b>{champs.name} </b></h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Вы точно хотите удалить соревнование? Это действие нельзя будет отменить
                                    </p>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Введите <b>{champs.name} </b> для удаления</label>
                                            <input type="text" className="form-control" id="recipient-name" onChange={ (event) => setDeleteModalText(event.target.value)} />
                                        </div>

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" disabled={deleteModalText !== champs.name}>
                                        Удалить 
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br/>
                    <div>
                        <Link className="mr-5" to={`users`}>Управление пользователями</Link>
                        <Link className="mr-5" to={"stats"}>Рейтинг</Link>
                        <Link to={"access"}>Управление доступом</Link>
                    </div>


                    <hr/>
                    <br/>

                    <h4>Задачи</h4>
                    <Link to="rikroll">Посмотреть все задачи</Link>

                    <div className="table-responsive mt-4">
                        <table className="table table-striped table-bordered ">
                            <thead>
                            <tr>
                                <th scope="col">Задача</th>
                                <th scope="col">id</th>
                                <th scope="col">Название</th>
                                <th scope="col">Действие</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                champs?.tasks?.map((champ) => {
                                    return (
                                        <tr key={champ}>
                                            <th className="col-1" scope="row">{champ.letter}</th>
                                            <th className="col-1" scope="row">{champ.id}</th>
                                            <td className="col">{champ.name}</td>
                                            <th className="col-1" scope="row">
                                                <Link to="" onClick={nonImplemeneted}>Просмотр
                                                </Link>
                                            </th>

                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <form style={{border: "1px solid #dfe0e1"}} className="p-3">
                            <div className="form-group">
                                <label className="w-100">
                                    Задача
                                    <select
                                        id="__problem-letter"
                                        name="letter"
                                        className="mb-2 form-control"
                                        onChange={(event) => problem_letter = event.target.value}
                                    >
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                        <option>E</option>
                                        <option>F</option>
                                        <option>G</option>
                                        <option>H</option>
                                    </select>
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="w-100">
                                    ID задачи
                                    <input type="number" className="form-control"
                                           onChange={(event) => problem_id = event.target.value}/>
                                </label>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-warning" onClick={OnSetNewProblem}>
                                    Установить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ChampsPage;