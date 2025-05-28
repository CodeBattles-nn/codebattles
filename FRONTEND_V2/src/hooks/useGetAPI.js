import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import constants from "../utils/consts.js";

const defaultEmptyFunction = () => {
};
const defaultUrl = "https://www.reddit.com/r/reactjs.json"

const LOCALSTORAGE_PREFIX = "__api_cache="

function useCachedGetAPI(
    url = defaultUrl,
    onError = defaultEmptyFunction,
    defaultState = {}
) {
    const [data, setData] = useState(defaultState);
    const navigate = useNavigate()

    const apiGetData = () => {
        axios
            .get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
                    }
                })
            .then(({data}) => {
                setData(data)
                localStorage.setItem(LOCALSTORAGE_PREFIX + url, JSON.stringify(data))
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.setItem(constants.LOCALSTORAGE_AUTH_KEY, "false")
                    navigate("/")
                } else {
                    onError(error)
                }
            })
    }

    const getData = () => {
        const savedValue = localStorage.getItem(LOCALSTORAGE_PREFIX + url)
        if (savedValue == null) {
            apiGetData();
        } else {
            setData(JSON.parse(savedValue))
        }
    }

    const updateCallback = () => {
        apiGetData();
    }

    useEffect(() => {
        getData();
    }, []);

    return [data, updateCallback];
}

export default useCachedGetAPI;