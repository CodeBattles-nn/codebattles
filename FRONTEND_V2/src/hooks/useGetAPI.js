import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import constants from "../utils/consts.js";
import {axiosInstance} from "../utils/settings.js";

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


    const [hasData, updateHasData] = useState(false)

    useEffect(() => {
        return () => {
            updateHasData(data === defaultState)
        };
    }, [data, defaultState]);


    const apiGetData = () => {
        axiosInstance
            .get(url)
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

    return [data, updateCallback, hasData];
}

export default useCachedGetAPI;