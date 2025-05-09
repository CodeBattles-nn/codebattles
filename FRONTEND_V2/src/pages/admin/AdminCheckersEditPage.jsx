import Card from "../../components/bootstrap/Card.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import constants from "../../utils/consts.js";
import axios from "axios";
import useCachedGetAPI from "../../hooks/useGetAPI.js";

export const AdminCheckersEditPage = () => {


    const {checkId} = useParams()

    const navigate = useNavigate();

    const [competitionsProblem, updateData] = useCachedGetAPI(`/api/checkers/${checkId}/admin`, () => {
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
            displayName: competitionsProblem.displayName,
            address: competitionsProblem.address,
            languageHighlightName: competitionsProblem.languageHighlightName
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

        axios.patch(`/api/checkers/${checkId}`, data, conf)
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
                <form onSubmit={handleSubmit(onSubmit)} className="p-4" style={{ maxWidth: '500px' }}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Display Name</label>
                        <input
                            {...register("displayName", { required: "Display Name is required" })}
                            className={`form-control ${errors.displayName ? 'is-invalid' : ''}`}
                        />
                        {errors.displayName && <div className="invalid-feedback">{errors.displayName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Language Highlight Name</label>
                        <input
                            {...register("languageHighlightName", { required: "Language Highlight Name is required" })}
                            className={`form-control ${errors.languageHighlightName ? 'is-invalid' : ''}`}
                        />
                        {errors.languageHighlightName && <div className="invalid-feedback">{errors.languageHighlightName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Address</label>
                        <input
                            {...register("address", { required: "Address is required" })}
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </Card>
        </>
    );
};
