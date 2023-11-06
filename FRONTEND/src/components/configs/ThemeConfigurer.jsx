import React from 'react';
import {changeTheme} from "../../theme.dark";

const ThemeConfigurer = (props) => {


    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        const isDark = true;

        changeTheme(isDark)
    }


    return <></>
};

export default ThemeConfigurer;