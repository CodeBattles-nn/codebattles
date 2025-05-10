import Card from "../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";

export const AdminChampsDetailPage = () => {

    const {compId} = useParams()

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}`,() => {}, []);


    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired />

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования"/>
            </BreadcrumbsRoot>

            <AdminHeader />

            <Card key={data.id}>
                <h2>Управление</h2>

                <Link to="users" className="btn btn-info me-2"> Пользователи</Link>
                <Link to="problems" className="btn btn-info me-2"> Задания</Link>
                <Link to="rating" className="btn btn-info me-2"> Рейтинг</Link>


                <Card>
                    <h5><span className="badge text-bg-primary">Идет</span></h5>
                    <h2>{data.name}</h2>
                    <h3>{data.description}</h3>
                </Card>

                <hr className="my-5"/>

                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1">Название</label>
                        <input defaultValue={data.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">Название, которое показывается пользователю</small>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlTextarea1">Описание</label>
                        <textarea defaultValue={data.description} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        <small id="emailHelp" className="form-text text-muted">Описание. Поддерживается Markdown</small>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlTextarea1">Начало</label>
                        <input type="datetime-local" defaultValue={data.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">Время начала соревнования</small>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlTextarea1">Конец</label>
                        <input type="datetime-local" defaultValue={data.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">Время конца соревнования</small>
                    </div>
                    <button type="submit" className="btn btn-success disabled">Сохранить</button>
                </form>
                <hr className="my-5"/>
                <h3>Чекеры</h3>
                <div className="d-flex gap-2">
                    {
                        data?.checkers?.map(checker => {
                            return (<h4 key={checker.displayName}>
                                <span className="badge text-bg-secondary">{checker.displayName}</span>
                            </h4>)

                        })
                    }
                </div>
                <br />
                <Link to="checkers" className="btn btn-info my-2"> Редактировать чекеры</Link>


            </Card>
        </>
    );
};
