const Header = () => {
    return (
        <nav className="navbar  navbar-expand-lg">
            <div className="container">
                <div className="fs-2 me-2 nav-link">
                    <a className="nav-link navbar-brand fs-4" href="/">
                        <img className="mb-1" src="/logo200.png" width="30" height="30" alt="logo" />
                    </a>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Задачи</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/stats">Рейтинг</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/sends">Посылки</a>
                        </li>

                    </ul>
                    <a className="nav-link mx-2" href="/mentor">Посылки</a>
                    <button className="btn btn-danger">Выход</button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
