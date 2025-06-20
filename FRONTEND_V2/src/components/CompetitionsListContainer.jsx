import React from 'react';
import PropTypes from "prop-types";

const CompetitionsListContainer = ({children}) => {
    return (
        <div className="row g-0 gap-3 row-cols-1 row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
            {children}
        </div>
    );
};


CompetitionsListContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default CompetitionsListContainer;