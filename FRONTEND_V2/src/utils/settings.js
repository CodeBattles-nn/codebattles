import axios from "axios";

const productionBuild = import.meta.env.VITE_ENV === "production";
if (!productionBuild) {
    axios.defaults.baseURL = `${document.location.protocol}//${document.location.hostname}:${8080}`
}
