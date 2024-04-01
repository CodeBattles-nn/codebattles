import React from 'react';
import {useNavigate} from "react-router-dom";
import consts from "../utils/consts.js";
import ConditionalRedirect from "./ConditionalRedirect.jsx";

// eslint-disable-next-line react/prop-types
const UserLoginRequired = () => {
    const url = "/";
    const isLogined = localStorage.getItem(consts.LOCALSTORAGE_AUTH_KEY) === "true";

    return (
        <ConditionalRedirect url={url} booleanValue={!isLogined}/>
    );
};

export default UserLoginRequired;
