import React from 'react';
import {Link} from "react-router-dom";

const AuthedHeader = (props) => {
    return <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" style={{"color": "red"}}>CodeBattles</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/problems">Задачи</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/stats">Положение</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sends">Посылки</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
};

export default AuthedHeader;