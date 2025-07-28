import "./css/Header.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useTranslation} from 'react-i18next';
import {useProfileStore} from "./store/useProfileStore.js";

const Header = () => {
    const { t } = useTranslation();
    let navigate = useNavigate();

    const updateFromServer = useProfileStore((state) => state.updateFromServer)
    const profile = useProfileStore((state) => state.profile)
    const clearProfile = useProfileStore((state) => state.clearProfile)

    let isAuthed = profile.id

    console.debug("PROFILE")
    console.debug(profile)

    const params = useLocation()
    const compId = params.pathname.split("/")[2]

    useEffect(()=> {
        updateFromServer()
    }, []);

    const onLogoutButtonClick = () => {
        localStorage.clear()
        navigate("/")
        clearProfile()
    }

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                <div className="fs-2 me-2 nav-link">
                    <Link className="nav-link navbar-brand fs-4" to="/">
                        <img className="mb-1" src="/logo200.png" width="30" height="30" alt="logo"/>
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label={t('header.toggle_navigation')}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            compId && compId !== "champs" && <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to={`/champs/`}>{t('header.competitions')}</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to={`/champs/${compId}/problems`}>{t('header.problems')}</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to={`/champs/${compId}/stats`}>{t('header.rating')}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/champs/${compId}/sends`}>{t('header.submissions')}</Link>
                                </li>
                            </>
                        }
                        {
                            params.pathname === "/profile" && <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to={`/champs/`}>{t('header.competitions')}</Link>
                                </li>
                            </>
                        }
                    </ul>

                    {
                        isAuthed &&
                        <Link className="nav-link mx-2" to="/profile">{t('header.profile')}</Link>
                    }

                    {
                        profile.isAdmin &&
                        <Link className="nav-link mx-2" to="/admin/champs">{t('header.admin_panel')}</Link>
                    }

                    <Link className="nav-link mx-2" to="/statuses">{t('header.help')}</Link>
                    <Link className="mx-2 btn btn-outline-secondary text-white" to="/lang">{t('header.lang')}</Link>

                    {
                        isAuthed &&
                        <button className="btn btn-danger" onClick={onLogoutButtonClick}>{t('header.logout')}</button>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Header;