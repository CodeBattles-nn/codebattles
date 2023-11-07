import {useState} from "react";
import {Context} from "../context/context";

export const AppContextProvider = ({children, ...props}) => {
    const context = useCreateAppContext(props);
    return <Context.Provider value={context}>{children}</Context.Provider>;

}

const useCreateAppContext = function (props) {
    const [authed, setAuthed] = useState(props.authed || true);


    return {
        authed,
        setAuthed,
    }
}
