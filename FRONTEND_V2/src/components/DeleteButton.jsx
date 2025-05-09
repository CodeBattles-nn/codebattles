import React, {useState} from 'react';
import constants from "../utils/consts.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const DeleteButton = ({
                                 url,
                                 callback = () => {
                                 }
                             }) => {

    const [disabled, setDisabled] = useState(false)

    const navigate = useNavigate()

    const conf = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
        }
    }

    const onClick = () => {
        setDisabled(true)

        axios.delete(url, conf)
            .then(() => navigate("/admin/champs"))
            .finally(() => setDisabled(false))
    }

    return (
        <button className="btn btn-danger"
                type="button"
                disabled={disabled}
                onClick={onClick}
        >
            {
                disabled && <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                </>
            }
            {
                !disabled && <>
                    <span role="status"> Удалить</span>
                </>
            }

        </button>
    );
};

