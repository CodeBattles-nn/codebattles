import React from 'react';
import Card from "./bootstrap/Card.jsx";
import PropTypes from "prop-types";
import {
    competitionStatusesCssColor, competitionStatusesCssColorText,
    competitionStatusesTranslate,
    getCompetitionStatusByDates
} from "../utils/competitionStatuses.js";

export const CompetitionCard = ({name, description, children, id, startedAt, endedAt}) => {
    let status = getCompetitionStatusByDates(startedAt,endedAt)

    if (startedAt === undefined || endedAt === undefined) {
        status = undefined
    }


    const statusCssBg = competitionStatusesCssColor[status]
    const statusCssText = competitionStatusesCssColorText[status]
    const statusText = competitionStatusesTranslate[status]


    return (
        <Card>
            <h5><span className={`badge ${statusCssBg} ${statusCssText}`}>{statusText}</span></h5>
            <div className="d-flex align-items-start gap-2">
                <h2 className="text">{name}</h2><small className="text-muted">id={id || "0000"}</small>
            </div>
            <p className="text-muted">{description}</p>

            <small className="text-muted"><i className="bi bi-clock me-1"></i>Начало: {startedAt}</small>
            <br />
            <small className="text-muted"><i className="bi bi-clock me-1"></i>Конец: {endedAt} </small>
            <p className="mb-2"/>
            {children}
        </Card>
    );
};

CompetitionCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node,
    id: PropTypes.string,
    startedAt: PropTypes.string,
    endedAt: PropTypes.string,
}