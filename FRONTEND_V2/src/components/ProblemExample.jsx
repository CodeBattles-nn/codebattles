import React from 'react';
import Card from "./bootstrap/Card.jsx";

import "./css/ProblemExample.css"

const ProblemExample = ({in_data, out_data}) => {
    return (
        <div className="my-5">
            <div>
                <h6 className="width-inner">Входные данные</h6>
                <button className="btn example__btn btn-sm btn-outline-secondary">Копировать</button>
            </div>
            <Card>
                {in_data}
            </Card>
            <h6>Выходные данные</h6>
            <Card>
                {out_data}
            </Card>
        </div>
    );
};

export default ProblemExample;
