import {Link} from "react-router-dom";
import Card from "./bootstrap/Card.jsx";

export const AdminHeader = () => {
    return (
        <Card>
            <Link to="/admin/champs" className="btn">соревнования</Link>
            <a className="btn disabled border-0" aria-disabled={true}>задачи</a>
            <Link to="/admin/checkers" className="btn">чекеры</Link>
            <Link to="/champs" className="btn">интерфейс ученика</Link>
        </Card>
    );
};

