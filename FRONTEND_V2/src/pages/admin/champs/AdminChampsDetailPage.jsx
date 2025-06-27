import Card from "../../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";
import {useForm} from "react-hook-form";
import constants from "../../../utils/consts.js";
import axios from "axios";
import {CompetitionCard} from "../../../components/CompetitionCard.jsx";
import {CompetitionFormElements} from "../../../components/form_impl/CompetitionForm.jsx";
import { useTranslation } from 'react-i18next';

export const AdminChampsDetailPage = () => {
    const { t } = useTranslation();

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
                <BreadcrumbsElement name={t('adminChamps.competitions')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card key={data.id}>
                <h2>{t('adminChamps.manage')}</h2>

                <Link to="users" className="btn btn-info me-2"> {t('adminChamps.users')}</Link>
                <Link to="problems" className="btn btn-info me-2"> {t('adminChamps.problems')}</Link>
                <Link to="rating" className="btn btn-info me-2"> {t('adminChamps.rating')}</Link>


                <CompetitionCard
                    name={data.name}
                    description={data.description}
                    id={data.id}
                    startedAt={data.startedAt}
                    endedAt={data.endedAt}
                />

                <hr className="my-5"/>
                {
                    done &&
                    <div className="alert alert-success" role="alert">
                        {t('adminChamps.dataSaved')}
                    </div>
                }

                <MasterForm form={form} onSubmit={onSubmit}>
                    <CompetitionFormElements />

                    <button type="submit" className="btn btn-success ">{t('adminChamps.save')}</button>
                </MasterForm>
                <hr className="my-5"/>
                <h3>{t('adminChamps.checkers')}</h3>
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
                <Link to="checkers" className="btn btn-info my-2"> {t('adminChamps.editCheckers')}</Link>


            </Card>
        </>
    );
};
