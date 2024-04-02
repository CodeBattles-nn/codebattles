import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import getApiAddress from "../utils/api";
import ChangeThemeButton from "./ChangeThemeButton";
import {useAppContext} from "../hooks/useAppContext";
import apiAxios from "../apiAxios";

const AuthedHeader = () => {


    const nav = useNavigate();

    const {setAuthed} = useAppContext();

    const [logoutProcessing, setLogoutProcessing] = useState(false);

    const onLogoutBtnClicked = () => {
        setLogoutProcessing(true)
        apiAxios.post(getApiAddress() + "/api/logout")
            .then(() => {
                nav("/login")
                setAuthed(false)
            })
            .finally(() => setLogoutProcessing(false))
    }

    return <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{minHeight: "56px"}}>
        <ChangeThemeButton />
    </nav>
};

export default AuthedHeader;