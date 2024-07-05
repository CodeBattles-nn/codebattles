import axios from "axios";

axios.defaults.withCredentials = true

const isProd = import.meta.env.VITE_ENV === "production";
if (!isProd) {
    // axios.defaults.baseURL =`${document.location.protocol}//${document.location.hostname}:2500`
}

axios.defaults.baseURL =`${document.location.protocol}//${document.location.hostname}:${document.location.port}`
