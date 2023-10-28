import React from 'react';
import {ToastContainer} from "react-toastify";

const ToastConfig = (props) => (
    <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        {...props}
    />
);

export default ToastConfig;