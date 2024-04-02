import consts from "../utils/consts.js";
import ConditionalRedirect from "./ConditionalRedirect.jsx";

const UserLoginRequired = () => {
    const url = "/";
    const isLogined = localStorage.getItem(consts.LOCALSTORAGE_AUTH_KEY) === "true";

    return (
        <ConditionalRedirect url={url} booleanValue={!isLogined}/>
    );
};

export default UserLoginRequired;
