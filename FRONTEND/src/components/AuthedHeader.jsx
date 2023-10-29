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

    return <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{minHeight: "56px"}}>
        <div className="container-fluid">
            <Link to="/problems" className="navbar-brand" style={{"color": "red"}}>
                <img src="/logo200.png" width="30" height="30"
                     className="d-inline-block align-top mr-1" alt=""/>
                {/*CodeBattles*/}
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className="nav-link" to="/problems">Задачи</Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className="nav-link" to="/stats">Положение</Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className="nav-link" to="/sends">Посылки</Link>
                    </li>
                </ul>
                <ul className="navbar-nav  my-2 my-md-0">
                    <li className="nav-item mr-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className="nav-link" to="/statuses">Помощь</Link>
                    </li>
                    <div data-toggle="collapse" data-target=".navbar-collapse.show">
                        <button className="btn btn-danger" onClick={onLogoutBtnClicked}
                                disabled={logoutProcessing}

                        >Выход
                        </button>
                    </div>

                </ul>
            </div>
        </div>
    </nav>
};

export default AuthedHeader;