import React from 'react';
import Card from "./bootstrap/Card.jsx";
import PropTypes from "prop-types";

export const CompetitionCard = ({name, description, children, id}) => {
    return (
        <Card>
            <h5><span className="badge text-bg-primary">Идет</span></h5>
            <div className="d-flex align-items-start gap-2">
                <h2 className="text">{name}</h2><small className="text-muted">id={id || "0000"}</small>
            </div>
            <p className="text-muted">{description}</p>

            {children}
        </Card>
    );
};

CompetitionCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node,
    id: PropTypes.string,
}