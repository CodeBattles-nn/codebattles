import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import getApiAddress from "../utils/api";

const AuthedHeader = () => {


    const nav = useNavigate();

    const [logoutProcessing, setLogoutProcessing] = useState(false);

    const onLogoutBtnClicked = () => {
        setLogoutProcessing(true)
        fetch(getApiAddress() + "/api/logout")
            .then(() => nav("/login"))
            .finally(() => setLogoutProcessing(false))
    }

    return <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{height: "56px"}}>
        <div className="container-fluid">
            <Link to="/problems" className="navbar-brand" style={{"color": "red"}}>
                <img src="/logo200.png" width="30" height="30"
                     className="d-inline-block align-top mr-1" alt=""/>
                {/*CodeBattles*/}
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
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
                <ul className="navbar-nav  my-2 my-md-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/statuses">Помощь</Link>
                    </li>
                    <button className="btn btn-danger ml-2" onClick={onLogoutBtnClicked}
                            disabled={logoutProcessing}>Выход
                    </button>
                </ul>
            </div>
        </div>
    </nav>
};

export default AuthedHeader;