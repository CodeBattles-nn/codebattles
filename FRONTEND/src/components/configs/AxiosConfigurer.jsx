import React from 'react';
import {useNavigate} from "react-router-dom";
import apiAxios from "../../apiAxios";
import {noInternetToast, serverErrorToast} from "../../utils/api";
import {useAppContext} from "../../hooks/useAppContext";

const AxiosConfigurer = () => {
    const navigate = useNavigate();

    const {setAuthed} = useAppContext();

    apiAxios.interceptors.response.use((response) => response, (error) => {
        // whatever you want to do with the error

        console.log(error)

        if (error.response?.status === 403) {
            navigate("/login")
        } else if (error.response?.status >= 500) {
            serverErrorToast();
            navigate("/login")
        } else {
            noInternetToast();
        }

        setAuthed(false);

        return Promise.reject(error);

    });

    return <></>
}

export default AxiosConfigurer;