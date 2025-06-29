import axios from "axios";
import constants from "./consts.js";


let BASE_URL = ""
if (import.meta.env.VITE_DEBUG){
    console.table(["DEBUG IS ON"], ["DEBUG IS ON"])
    BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:2500"

}



axios.defaults.baseURL = BASE_URL
export const axiosInstance = axios.create(
    {
        baseURL:BASE_URL
    }
)

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(constants.LOCALSTORAGE_JWT);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


