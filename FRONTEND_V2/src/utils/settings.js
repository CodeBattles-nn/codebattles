import axios from "axios";

axios.defaults.withCredentials = true

const isProd = import.meta.env.VITE_ENV === "production";
if (!isProd) {
    axios.defaults.baseURL = 'http://localhost:2500';
}