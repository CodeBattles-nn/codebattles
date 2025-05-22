import React, {useContext, useId} from 'react';
import {FormContext} from "./FormContext.jsx";
import PropTypes from "prop-types";

export const TextFormElement = ({displayName, name, args}) => {
    const formInputId = useId()

    const form = useContext(FormContext);

    const {
        register,
        formState: {errors}
    } = form


    return (
        <div className="mb-3">
            <label htmlFor={formInputId} className="form-label">{displayName}</label>
            <input
                id={formInputId}
                className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
                {...register(name, args)}
            />
            {errors[name] && (
                <div className="invalid-feedback">{errors[name].message}</div>
            )}
        </div>
    );
};


TextFormElement.propTypes = {
    displayName: PropTypes.string,
    name: PropTypes.string.isRequired,
    args: PropTypes.object,
}
