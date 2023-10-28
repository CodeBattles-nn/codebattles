import React from 'react';

const Base = ({children}) => (
    <main className="container-fluid">
        <div className="row">
            <div className="col-md-8 col-lg-12 content-container">
                <div className="container py-4">
                    {children}
                </div>
            </div>
        </div>
    </main>

);

export default Base;