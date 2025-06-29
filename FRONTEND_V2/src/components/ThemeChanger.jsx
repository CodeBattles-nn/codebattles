const ThemeChanger = () => {

    const themeWatcher = () => {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            console.debug("switching to dark theme");
        }

        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: light)").matches
        ) {
            document.documentElement.setAttribute("data-bs-theme", "light");
            console.debug("switching to light theme");
        }
    };
    themeWatcher();

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", themeWatcher);

    window
        .matchMedia("(prefers-color-scheme: light)")
        .addEventListener("change", themeWatcher);

    return (
        <></>
    );
};

export default ThemeChanger;
