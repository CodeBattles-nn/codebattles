import React from 'react';
import {useNavigate} from "react-router-dom";
import apiAxios from "../../apiAxios";
import {noInternetToast, serverErrorToast} from "../../utils/api";
import {useAppContext} from "../../hooks/useAppContext";
import {toast} from "react-toastify";

const AxiosConfigurer = () => {
    const navigate = useNavigate();

    const {setAuthed} = useAppContext();

    apiAxios.interceptors.response.use((response) => response, (error) => {
        // whatever you want to do with the error

        console.log(error)

        if (error.response?.status === 403) {
            const redirect_url = error.response?.data?.redirect;
            let use_redirect = error.response?.data?.use_redirect;
            if (use_redirect === undefined || use_redirect === null) use_redirect = true;

            console.log(use_redirect + "|")

            console.log(error.response)

            if (use_redirect) {
                if (redirect_url) {
                    navigate(redirect_url)
                } else {
                    navigate("/teacher")
                }
            }


            setAuthed(false);
        } else if (error.response?.status === 404) {
            toast.warn("Запрашиваемая страница не найдена!", {autoClose: 5000})
            // navigate("/problems")
        } else if (error.response?.status >= 500) {
            serverErrorToast();
            navigate("/teacher")
        } else {
            noInternetToast();
        }

        return Promise.reject(error);

    });

    return <></>
}

export default AxiosConfigurer;