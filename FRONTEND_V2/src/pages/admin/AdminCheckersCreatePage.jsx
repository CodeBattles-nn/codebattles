import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../utils/consts.js";
import {useNavigate} from "react-router-dom";
import Card from "../../components/bootstrap/Card.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";

export const AdminCheckersCreatePage = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            displayName: "",
            languageHighlightName: "",
            address: ""
        }
    });

    const onSubmit = (data) => {
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        };

        axios.post("/api/checkers", data, conf)
            .then(() => navigate("/admin/checkers")) // Измените путь назначения при необходимости
            .catch((error) => console.error("Failed to create checker:", error));
    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Чекеры"/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <div className="container mt-4">
                    <h3>Создать чекер</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Display Name</label>
                            <input
                                className="form-control"
                                {...register("displayName", {required: "Display name is required"})}
                            />
                            {errors.displayName && (
                                <div className="text-danger">{errors.displayName.message}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Language Highlight Name</label>
                            <input
                                className="form-control"
                                {...register("languageHighlightName", {required: "Language name is required"})}
                            />
                            {errors.languageHighlightName && (
                                <div className="text-danger">{errors.languageHighlightName.message}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                className="form-control"
                                {...register("address", {required: "Address is required"})}
                            />
                            {errors.address && (
                                <div className="text-danger">{errors.address.message}</div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Card>
        </>
    );
};
