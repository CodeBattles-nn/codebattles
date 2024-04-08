import React from 'react';

const ResponsiveTable = ({children}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                {children}
            </table>
        </div>
    );
};

export default ResponsiveTable;
