import Card from "../../components/bootstrap/Card.jsx";
import {useNavigate} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import constants from "../../utils/consts.js";
import axios from "axios";

export const AdminChampsDetailProblemsLinkPage = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        axios.post('/api/competitionsProblems', data, conf)
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="slug" className="form-label">Slug</label>
                        <input
                            id="slug"
                            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                            {...register("slug", {required: "Slug is required"})}
                        />
                        {errors.slug && <div className="invalid-feedback">{errors.slug.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="priority" className="form-label">Priority</label>
                        <input
                            type="number"
                            id="priority"
                            className={`form-control ${errors.priority ? 'is-invalid' : ''}`}
                            {...register("priority", {valueAsNumber: true, required: "Priority is required"})}
                        />
                        {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="competition_id" className="form-label">Competition ID</label>
                        <input
                            type="number"
                            id="competition_id"
                            className={`form-control ${errors.competition_id ? 'is-invalid' : ''}`}
                            {...register("competition_id", {
                                valueAsNumber: true,
                                required: "Competition ID is required"
                            })}
                        />
                        {errors.competition_id &&
                            <div className="invalid-feedback">{errors.competition_id.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="problem_id" className="form-label">Problem ID</label>
                        <input
                            type="number"
                            id="problem_id"
                            className={`form-control ${errors.problem_id ? 'is-invalid' : ''}`}
                            {...register("problem_id", {valueAsNumber: true, required: "Problem ID is required"})}
                        />
                        {errors.problem_id && <div className="invalid-feedback">{errors.problem_id.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Добавить</button>
                </form>
            </Card>
        </>
    );
};
