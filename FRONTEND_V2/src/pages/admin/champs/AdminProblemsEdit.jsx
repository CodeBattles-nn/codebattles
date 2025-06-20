import Card from "../../../components/bootstrap/Card.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import constants from "../../../utils/consts.js";
import axios from "axios";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";

export const AdminProblemsEdit = () => {
    const {probcompId} = useParams()

    const navigate = useNavigate();

    const [competitionsProblem, updateData] = useCachedGetAPI(`/api/competitionsProblems/${probcompId}`, () => {
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    useEffect(() => {
        updateData()
    }, []);

    useEffect(() => {
        reset({
            priority: competitionsProblem.priority,
            slug: competitionsProblem.slug
        })
    }, [competitionsProblem]);

    const onSubmit = (data) => {
        console.log(data);

        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        axios.patch(`/api/competitionsProblems/${probcompId}`, data, conf)
            .then(() => navigate("/admin/champs"))


    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Создание соревнования"/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
                    <div className="mb-3">
                        <label className="form-label">Slug</label>
                        <input
                            type="text"
                            className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                            {...register("slug", {required: "Slug обязателен"})}
                        />
                        {errors.slug && <div className="invalid-feedback">{errors.slug.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Priority</label>
                        <input
                            type="number"
                            className={`form-control ${errors.priority ? "is-invalid" : ""}`}
                            {...register("priority", {
                                required: "Приоритет обязателен",
                                valueAsNumber: true,
                                min: {value: 0, message: "Минимум 0"}
                            })}
                        />
                        {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                </form>
            </Card>
        </>
    );
};
