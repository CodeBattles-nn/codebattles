import React, {useState} from 'react';
import If from "./If";
import AuthedHeader from "./AuthedHeader";
import UnAuthedHeader from "./UnAuthedHeader";
import {useAppContext} from "../hooks/useAppContext";

function HeaderSelector(props) {

    const {authed} = useAppContext();

    console.log(useAppContext())

    return (
        <If
            condition={authed}
            is_true={<AuthedHeader/>}
            is_false={<UnAuthedHeader/>}
        />
    );
}

export default HeaderSelector;