import Card from "../../components/bootstrap/Card.jsx";
import {useEffect, useState} from "react";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {useForm} from "react-hook-form";
import constants from "../../utils/consts.js";
import axios from "axios";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {Link} from "react-router-dom";

export const Profile = () => {
    const [userProfile, updateData] = useCachedGetAPI(`/api/profile`, () => {
    }, []);

    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        if (userProfile) {
            reset({
                id: userProfile.id,
                username: userProfile.username,
                name: userProfile.name,
                roles: userProfile.roles?.join(', ')
            });
        }
    }, [userProfile]);

    const onSubmit = (data) => {
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        };

        setLoading(true)
        setShowSuccess(false)

        axios.put(`/api/profile`, {name: data.name}, conf)
            .then(() => setShowSuccess(true))
            .finally(() => setLoading(false))
    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Профиль"/>
            </BreadcrumbsRoot>


            <Card>
                <h2>Профиль</h2>
                <Link className="btn btn-sm btn-info my-2" to="/profile/change-password">Сменить пароль</Link>
                {
                    showSuccess &&
                    <div className="alert alert-success" role="alert">
                        Изменения сохранены
                    </div>
                }

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <label className="form-label">ID</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            {...register("id")}
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Логин</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            {...register("username")}
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Имя</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            {...register("name", {required: "Имя обязательно"})}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Роли</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            {...register("roles")}
                            disabled
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        Сохранить
                    </button>
                </form>
            </Card>
        </>
    );
};
