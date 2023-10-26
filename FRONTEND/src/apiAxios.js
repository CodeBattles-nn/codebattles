import axios from "axios";

const apiAxios = axios.create({
    withCredentials: true
})

export default apiAxios;