import React, {useEffect, useState} from 'react';
import {changeTheme} from "../theme.dark";

const ChangeThemeButton = (props) => {
    let prevState = localStorage.getItem("__theme");
    prevState = prevState ? prevState : "light";

    const [theme, setTheme] = useState(prevState);
    const icon_name = `${theme}_mode`;
    const is_dark = theme === "dark";


    useEffect(() => {
        console.log("145")
        localStorage.setItem("__theme", theme)
        changeTheme(is_dark)
    }, [theme]);

    useEffect(() => {
        changeTheme(is_dark)
    }, []);


    const onChangeTheme = () => {
        console.log("Change")
        setTheme(is_dark ? "light" : "dark")
    }


    const styles = {
        userSelect: "none",
        cursor: "pointer",
        filter: "invert(1)"
    }

    const wrapStyles = {
        display: "flex",
        flexFlow: "wrap",
        alignContent: "center",
        color: "rgba(255,255,255,.5)"
    }

    return (
        <div className="ml-4" onClick={onChangeTheme} style={wrapStyles}>
            <img color="white" src={`/icons/${icon_name}.webp`} style={styles}/>
        </div>
    )
};

export default ChangeThemeButton;