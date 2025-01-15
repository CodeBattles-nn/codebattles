import Card from "./bootstrap/Card.jsx";

import "./css/ProblemExample.css"

// eslint-disable-next-line react/prop-types
const ProblemExample = ({in_data, out_data}) => {
    return (
        <div className="my-5">
            <div>
                <h6 className="width-inner">Входные данные</h6>
                <button className="btn example__btn btn-sm btn-outline-secondary">Копировать</button>
            </div>
            <Card>
                <div style={{whiteSpace: "break-spaces"}}>
                    {in_data}
                </div>
            </Card>
            <h6>Выходные данные</h6>
            <Card>
                <div style={{whiteSpace: "break-spaces"}}>
                    {out_data}
                </div>
            </Card>
        </div>
    );
};

export default ProblemExample;
