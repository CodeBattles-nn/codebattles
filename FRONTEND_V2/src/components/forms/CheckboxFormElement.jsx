import React, {useContext, useId} from 'react';
import {FormContext} from "./FormContext.jsx";
import PropTypes from "prop-types";

export const CheckboxFormElement = ({
                                        displayName,
                                        name,
                                        args,
                                        helpText,
                                        readonly = false,
                                        disabled = false,
                                    }) => {
    const formInputId = useId()

    const form = useContext(FormContext);

    const {
        register,
    } = form


    return (
        <div className="mb-3">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" {...register(name, args)} id={formInputId} readOnly={readonly} disabled={disabled}/>
                <label className="form-check-label" htmlFor={formInputId}>
                    {displayName}
                </label>

            </div>
            <small className="form-text text-muted">{helpText}</small>
        </div>
    );
};


CheckboxFormElement.propTypes = {
    displayName: PropTypes.string,
    name: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
}
