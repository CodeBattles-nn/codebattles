import React from 'react';

const UnAuthedHeader = (props) => {
    return <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{height:"56px"}}>
        <div className="container-fluid">
            <a className="navbar-brand" style={{"color": "red"}}>CodeBattles</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                </ul>
            </div>
        </div>
    </nav>
};

export default UnAuthedHeader;