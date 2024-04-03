import "./css/Header.css"
import {Link, useNavigate} from "react-router-dom";
import constants from "../utils/consts.js";

const Header = () => {

    let navigate = useNavigate();

    let isAuthed = localStorage.getItem(constants.LOCALSTORAGE_AUTH_KEY) === "true"

    const onLogoutButtonClick = () => {
        localStorage.setItem(constants.LOCALSTORAGE_AUTH_KEY, "false")
        navigate("/")
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
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            isAuthed &&

                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/problems">Задачи</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/stats">Рейтинг</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sends">Посылки</Link>
                                </li>
                            </>

                        }
                        <a className="nav-link mx-5" target="_blank" href="/teacher">Учителю</a>
                    </ul>
                    <Link className="nav-link mx-2" to="/statuses">Помощь</Link>

                    {
                        isAuthed && <button className="btn btn-danger" onClick={onLogoutButtonClick}>Выход</button>
                    }


                </div>
            </div>
        </nav>
    );
};

export default Header;
