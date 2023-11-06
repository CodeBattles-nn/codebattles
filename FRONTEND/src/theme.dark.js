const light = {
    "--theme-light": "var(--theme-color-light)",
    "--theme-dark": "var(--theme-color-dark)",
    "--theme-bg": "var(--theme-color-bg-light)",
}
const dark = {
    "--theme-light": "var(--theme-color-dark)",
    "--theme-dark": "var(--theme-color-light)",
    "--theme-bg": "var(--theme-color-bg-dark)",
}

export const changeTheme = async (isDark = true) => {

    const styles = isDark ? dark : light;

    for (const [key, value] of Object.entries(styles)) {
        document.documentElement.style.setProperty(key, value)
    }


}