import Card from "../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";
import {MasterForm} from "../../components/forms/MasterForm.jsx";
import {useForm} from "react-hook-form";
import constants from "../../utils/consts.js";
import axios from "axios";
import {CompetitionCard} from "../../components/CompetitionCard.jsx";
import {CompetitionFormElements} from "../../components/form_impl/CompetitionForm.jsx";

export const AdminChampsDetailPage = () => {

    const {compId} = useParams()

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}`, () => {
    }, []);


    useEffect(() => {
        update()
    }, []);

    const [done, setDone] = useState(false);

    console.log(data)

    let form = useForm();

    useEffect(() => {
        form.reset(data)
    }, [data]);

    const onSubmit = (data) => {
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        setDone(false)
        axios.put(`/api/competitions/${compId}`, data, conf)
            .then(() => setDone(true))
            .then(() => update())
    }

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования"/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card key={data.id}>
                <h2>Управление</h2>

                <Link to="users" className="btn btn-info me-2"> Пользователи</Link>
                <Link to="problems" className="btn btn-info me-2"> Задания</Link>
                <Link to="rating" className="btn btn-info me-2"> Рейтинг</Link>


                <CompetitionCard
                    name={data.name}
                    description={data.description}
                    id={data.id}
                />

                <hr className="my-5"/>
                {
                    done &&
                    <div className="alert alert-success" role="alert">
                        Данные успешно сохранены
                    </div>
                }

                <MasterForm form={form} onSubmit={onSubmit}>
                    <CompetitionFormElements />

                    <button type="submit" className="btn btn-success ">Сохранить</button>
                </MasterForm>
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
                <br/>
                <Link to="checkers" className="btn btn-info my-2"> Редактировать чекеры</Link>


            </Card>
        </>
    );
};
