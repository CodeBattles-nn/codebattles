
import "./css/Header.css"
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                <div className="fs-2 me-2 nav-link">
                    <Link className="nav-link navbar-brand fs-4" to="/">
                        <img className="mb-1" src="/logo200.png" width="30" height="30" alt="logo" />
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/problems">Задачи</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/stats">Рейтинг</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sends">Посылки</Link>
                        </li>

                    </ul>
                    <Link className="nav-link mx-2" to="/statuses">Помощь</Link>
                    <button className="btn btn-danger">Выход</button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
