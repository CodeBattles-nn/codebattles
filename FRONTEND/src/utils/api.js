import {toast} from "react-toastify";

const API_PORT = 2500

export function getApiAddress() {
    return `${document.location.protocol}//${document.location.hostname}:${API_PORT}`
}

export function serverErrorToast() {

    const options = {
        autoClose: false,
        theme: "colored"
    };

    toast.error("Ошибка на стороне сервера! ", options)
}

export function noInternetToast() {

    const options = {
        autoClose: 15000,
        theme: "colored"
    };

    toast.error("Ошибка подключения! Проверьте соединение ", options)
}

export default getApiAddress;