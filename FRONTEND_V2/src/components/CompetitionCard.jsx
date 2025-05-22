import React from 'react';
import Card from "./bootstrap/Card.jsx";
import PropTypes from "prop-types";

export const CompetitionCard = ({name, description, children}) => {
    return (
        <Card>
            <h5><span className="badge text-bg-primary">Идет</span></h5>
            <h2>{name}</h2>
            <p className="text-muted">{description}</p>

            {children}
        </Card>
    );
};

CompetitionCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node,
}