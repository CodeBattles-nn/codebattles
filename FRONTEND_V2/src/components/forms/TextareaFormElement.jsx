import React, {useContext, useId} from 'react';
import {FormContext} from "./FormContext.jsx";
import PropTypes from "prop-types";

export const TextareaFormElement = ({displayName, name, args, helpText, readonly = false, disabled = false}) => {
    const formInputId = useId()

    const form = useContext(FormContext);

    const {
        register,
        formState: {errors}
    } = form


    return (
        <div className="mb-3">
            <label htmlFor={formInputId} className="form-label">{displayName}</label>
            <textarea
                id={formInputId}
                className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
                {...register(name, args)}
                disabled={disabled}
                readOnly={readonly}
            />
            {helpText &&
                <small className="form-text text-muted">{helpText}</small>
            }

            {errors[name] && (
                <div className="invalid-feedback">{errors[name].message}</div>
            )}
        </div>
    );
};


TextareaFormElement.propTypes = {
    displayName: PropTypes.string,
    name: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    args: PropTypes.object,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
}
