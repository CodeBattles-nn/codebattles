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
        <FormContext.Provider value={form}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {children}
            </form>
        </FormContext.Provider>
    );
};

MasterForm.propTypes = {
    form: PropTypes.any.isRequired,
    onSubmit: PropTypes.func,
    children: PropTypes.node
};