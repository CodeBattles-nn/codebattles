import React from 'react';

const If = (
    {
        condition = true,
        is_true = <></>,
        is_false = <></>,
    }
) => {
    return <>
        {condition ? (is_true) : (is_false)}
    </>
};

export default If;