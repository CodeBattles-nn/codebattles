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
            navigate("/login")
            setAuthed(false);
        } else if (error.response?.status === 404) {
            toast.warn("Запрашиваемая страница не найдена!", {autoClose: 5000})
            navigate("/problems")
        }else if (error.response?.status >= 500) {
            serverErrorToast();
            navigate("/problems")
        } else {
            noInternetToast();
        }

        return Promise.reject(error);

    });

    return <></>
}

export default AxiosConfigurer;