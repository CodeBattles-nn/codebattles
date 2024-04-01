import React from 'react';
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ConditionalRedirect = ({url, booleanValue}) => {
    const navigate = useNavigate();

    if (booleanValue) navigate(url);

    return (
        <></>
    );
};

export default ConditionalRedirect;
