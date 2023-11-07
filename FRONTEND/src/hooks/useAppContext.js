import {useContext} from "react";
import {Context} from "../context/context";

export function useAppContext() {
    const context = useContext(Context);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}