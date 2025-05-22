import React from 'react';
import {FormContext} from "./FormContext.jsx";
import PropTypes from "prop-types";

const emptyFunction = () => {
}

export const MasterForm = (
    {form, onSubmit = emptyFunction, children}
) => {

    const {
        handleSubmit,
    } = form

    return (
        <FormContext.Provider value={handleSubmit}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

MasterForm.propTypes = {
    form: PropTypes.any,
    onSubmit: PropTypes.func,
    children: PropTypes.node
};